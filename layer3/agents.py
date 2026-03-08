"""
Layer 3: Understanding Layer — Agent Runner

Orchestrates 3 agents in parallel against a meeting transcript.

Usage:
    python agents.py --input transcript.json --output layer3_output.json

"""

import json
import os
import sys
import time
import argparse
import threading
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

import google.genai as genai
from google.genai import types as genai_types
from openai import OpenAI
from pydantic import ValidationError
from dotenv import load_dotenv

from models import (
    Utterance, DiscourseOutput, CommitmentOutput, RiskOutput, Layer3Output
)
from prompts import (
    DISCOURSE_SYSTEM_PROMPT,
    COMMITMENT_SYSTEM_PROMPT,
    RISK_SYSTEM_PROMPT,
    TASK_AGENT_SYSTEM_PROMPT,
)


load_dotenv()

# ─── Client Configuration ─────────────────────────────────────────────────────

# Primary: Gemini direct API
_gemini = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
PRIMARY_MODEL = "gemini-2.5-flash" 

# Fallback: Llama 3.3 70B
_openrouter = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY", ""),
)
FALLBACK_MODEL = "meta-llama/llama-3.3-70b-instruct"

MAX_RETRIES = 3
RETRY_DELAY = 2.0


# ─── Terminal UI ──────────────────────────────────────────────────────────────

class C:
    """ANSI color constants (256-color terminal)."""
    RST = "\033[0m";  BOLD = "\033[1m";  DIM  = "\033[2m"
    IND  = "\033[38;5;99m"    # indigo  — ScrumFlow brand
    CYN  = "\033[38;5;51m"    # cyan    — accent
    AMB  = "\033[38;5;214m"   # amber   — decisions / warnings
    GRN  = "\033[38;5;78m"    # emerald — success
    RED  = "\033[38;5;197m"   # rose    — errors
    DIM2 = "\033[38;5;245m"   # muted   — secondary text
    WHT  = "\033[38;5;255m"   # white   — primary text
    D    = "\033[38;5;111m"   # Discourse  agent
    CO   = "\033[38;5;183m"   # Commitment agent
    RI   = "\033[38;5;215m"   # Risk       agent
    TA   = "\033[38;5;120m"   # Task       agent


def _w(t):
    sys.stdout.write(t); sys.stdout.flush()


def print_banner():
    """Cinematic branded startup banner."""
    bar = f"{C.IND}{'=' * 60}{C.RST}"
    _w(f"\n{bar}\n")
    _w(f"  {C.IND}|{C.RST}  {C.BOLD}{C.IND}ScrumFlow{C.RST}{C.BOLD}{C.CYN}.ai{C.RST}"
       f"  {C.DIM2}--  AAES v1.0  --  Autonomous Agent Pipeline{C.RST}   {C.IND}|{C.RST}\n")
    _w(f"  {C.IND}|{C.RST}  {C.DIM2}  Transcript  ->  Decisions  ->  Tasks  ->  Allocations"
       f"{C.RST}   {C.IND}|{C.RST}\n")
    _w(f"{bar}\n\n")


def print_phase(num, title, sub=""):
    """Numbered phase header with colored label."""
    _w(f"\n  {C.BOLD}{C.IND}[Phase {num}]{C.RST}  {C.BOLD}{C.WHT}{title}{C.RST}")
    if sub:
        _w(f"  {C.DIM2}{sub}{C.RST}")
    _w(f"\n  {C.DIM2}{'-' * 54}{C.RST}\n")


def print_info(label, value):
    _w(f"  {C.DIM2}  {label:<22}{C.RST}{C.WHT}{value}{C.RST}\n")


def print_summary(output: dict):
    """Rich framed pipeline summary panel."""
    meta   = output.get("meeting_metadata", {})
    tasks  = output.get("tasks", [])
    allocs = output.get("allocation_suggestions", [])
    risks  = output.get("risk_quantification", {})
    W = 56

    def blank():
        _w(f"  {C.IND}|{C.RST}{' ' * W}{C.IND}|{C.RST}\n")

    def row(label, val, col=None):
        col = col or C.WHT
        raw = f"   {label:<26}{val}"
        pad = max(W - len(raw) - 1, 1)
        _w(f"  {C.IND}|{C.RST}   {C.DIM2}{label:<26}{C.RST}{col}{C.BOLD}{val}{C.RST}"
           f"{' ' * pad}{C.IND}|{C.RST}\n")

    def section(title):
        pad = max(W - len(title) - 5, 1)
        _w(f"  {C.IND}|{C.RST}   {C.BOLD}{C.CYN}{title}{C.RST}{' ' * pad}{C.IND}|{C.RST}\n")

    top = f"  {C.IND}+{'=' * W}+{C.RST}"
    mid = f"  {C.IND}+{'-' * W}+{C.RST}"
    bot = f"  {C.IND}+{'=' * W}+{C.RST}"

    _w(f"\n{top}\n")
    section(">> AAES Pipeline Complete")
    _w(f"{mid}\n"); blank()
    row("  Duration",          f"{meta.get('duration_minutes', 0):.1f} min")
    row("  Decisions made",    str(meta.get('decision_count', 0)),                    C.AMB)
    row("  Decision density",  f"{meta.get('decision_density', 0):.3f} /min",         C.AMB)
    row("  Tasks extracted",   str(meta.get('task_creation_count', len(tasks))),      C.GRN)
    blank(); _w(f"{mid}\n")
    section(">> Top Allocation Suggestions")
    _w(f"{mid}\n"); blank()
    for a in allocs[:4]:
        task  = a.get("task_title", a.get("task_id", ""))[:22]
        owner = a.get("suggested_assignee", {}).get("name", "?")[:14]
        conf  = a.get("confidence_score", 0)
        cc    = C.GRN if conf >= 80 else (C.AMB if conf >= 60 else C.RED)
        row(f"  {task}", f"{owner}  {conf}%", cc)
    blank(); _w(f"{mid}\n")
    section(">> Risk Signals")
    _w(f"{mid}\n"); blank()
    for key, label in [
        ("total_dependency_risks", "  Dependency"),
        ("total_resource_risks",   "  Resource"),
        ("total_deadline_risks",   "  Deadline"),
    ]:
        v = risks.get(key, 0)
        row(label, str(v), C.RED if v > 2 else C.AMB)
    blank(); _w(f"{bot}\n")


class AgentAnimation:
    """Per-agent colored spinner shown while the LLM call is in flight."""
    _STYLES = {
        "Discourse":  ("|/-\\", C.D),
        "Commitment": ("oO0O", C.CO),
        "Risk":       (".oOo", C.RI),
        "Task":       ("+x+x", C.TA),
    }
    _lock = threading.Lock()

    def __init__(self, name: str, enabled: bool = True):
        self.name    = name
        self.enabled = enabled
        self.running = False
        self.thread  = None
        self.t0      = 0.0
        frames_str, self.color = self._STYLES.get(name, ("-\\|/", C.IND))
        self.frames  = list(frames_str)
        self.fi      = 0

    def _loop(self):
        dots = ["   ", ".  ", ".. ", "..."]
        d = 0
        while self.running:
            f = self.frames[self.fi % len(self.frames)]
            e = time.time() - self.t0
            with self._lock:
                _w(f"\r  {self.color}{f}{C.RST}  "
                   f"{C.BOLD}{self.color}{self.name} Agent{C.RST}"
                   f"  {C.DIM2}processing{dots[d % 4]}{C.RST}"
                   f"  {C.DIM}{e:.1f}s{C.RST}          ")
            self.fi += 1; d += 1
            time.sleep(0.12)

    def start(self):
        if not self.enabled: return
        self.t0 = time.time(); self.running = True
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()

    def stop(self, success=True):
        if not self.enabled: return
        self.running = False
        if self.thread: self.thread.join(timeout=1.5)
        e   = time.time() - self.t0
        sym = f"{C.GRN}[ OK ]" if success else f"{C.RED}[ !! ]"
        sc  = C.GRN if success else C.RED
        lbl = "complete" if success else "FAILED"
        with self._lock:
            _w(f"\r  {sym}{C.RST}  "
               f"{C.BOLD}{self.color}{self.name} Agent{C.RST}  "
               f"{sc}{lbl}{C.RST}  {C.DIM}{e:.1f}s{C.RST}          \n")


# ─── Utilities ────────────────────────────────────────────────────────────────


def load_transcript(json_path: str) -> list[dict]:
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict):
        return data.get("conversation", data.get("utterances", []))
    return data 

_MIN_WORDS = 3


_NOISE_MARKERS = {"[inaudible]", "[noise]", "[music]", "[laughter]", "[applause]", "[crosstalk]"}

_PURE_FILLERS = {
    "haan", "hmm", "hm", "uh", "um", "okay", "ok", "right",
    "bye", "thanks", "nahi", "oh", "ah", "err", "ha",
}


def _is_noise_utterance(text: str) -> bool:
    stripped = text.strip()
    if not stripped:
        return True
    # Punctuation-only
    if all(not c.isalnum() for c in stripped):
        return True
    # Whisper noise marker
    if stripped.lower() in _NOISE_MARKERS:
        return True
    # Tokenise to content words only
    words = [w.strip(".,!?;:\"'()[]").lower() for w in stripped.split()]
    content = [w for w in words if w and any(c.isalnum() for c in w)]
    if len(content) < _MIN_WORDS:
        return True
    return False


def build_numbered_utterances(utterances: list[dict]) -> list[dict]:

    result = []
    idx = 0
    for u in utterances:
        raw = u.get("text", u.get("content", u.get("transcript", ""))) or ""
        text = raw.strip()
        if _is_noise_utterance(text):
            continue
        sid   = u.get("speaker_id", u.get("speaker", "SPEAKER_00"))
        label = u.get("speaker_label", sid)
        result.append({
            "index"       : idx,
            "speaker_id"  : sid,
            "speaker_name": label,
            "start_time"  : u.get("start_time", u.get("start", 0.0)),
            "end_time"    : u.get("end_time",   u.get("end",   0.0)),
            "text"        : text,
        })
        idx += 1
    return result


def _call_gemini(system_prompt: str, user_message: str, agent_name: str) -> str:
    response = _gemini.models.generate_content(
        model=PRIMARY_MODEL,
        contents=user_message,
        config=genai_types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.1,
            max_output_tokens=16384,  # increased: complex meetings need more tokens
            response_mime_type="application/json",
        ),
    )
    return response.text.strip()


def _call_openrouter(system_prompt: str, user_message: str, agent_name: str) -> str:
    response = _openrouter.chat.completions.create(
        model=FALLBACK_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        temperature=0.1,
        max_tokens=16384,  # increased to match Gemini ceiling
        response_format={"type": "json_object"},
        extra_headers={
            "HTTP-Referer": "https://scrumflow.ai",
            "X-Title": f"ScrumFlow Layer3 {agent_name}",
        },
    )
    return response.choices[0].message.content.strip()


# ─── JSON Repair Utility ──────────────────────────────────────────────────────

def _repair_truncated_json(raw: str) -> str:
    """
    Attempt to salvage a JSON string that was cut off mid-output by the model.
    Strategy: strip trailing incomplete token, then close any open arrays/objects.
    Returns the repaired string, or raises ValueError if unrecoverable.
    """
    text = raw.strip()

    # Remove trailing incomplete string (ends with odd backslash or open quote)
    # Walk back to the last complete value separator: } ] or a quoted-string end
    for cutoff_char in (',', '{', '[', '"'):
        idx = text.rfind(cutoff_char)
        if idx != -1:
            # Try closing from just before this char
            candidate = text[:idx].rstrip().rstrip(',')
            break
    else:
        candidate = text

    # Count open braces/brackets to determine what needs closing
    opens = []
    in_string = False
    escape = False
    for ch in candidate:
        if escape:
            escape = False
            continue
        if ch == '\\' and in_string:
            escape = True
            continue
        if ch == '"':
            in_string = not in_string
            continue
        if in_string:
            continue
        if ch in ('{', '['):
            opens.append(ch)
        elif ch == '}' and opens and opens[-1] == '{':
            opens.pop()
        elif ch == ']' and opens and opens[-1] == '[':
            opens.pop()

    # Close all unclosed containers in reverse order
    closing = ''.join(']' if c == '[' else '}' for c in reversed(opens))
    repaired = candidate + closing

    # Final validation
    json.loads(repaired)  # raises if still broken
    return repaired


def call_agent(
    system_prompt: str,
    utterances_json: str,
    agent_name: str,
    use_fallback: bool = False,
    concise_hint: bool = False,
) -> str:
    hint = (
        "\n\nIMPORTANT: Be concise. Limit each text field to 120 characters max. "
        "Only include items with confidence >= 0.7. Return valid, complete JSON."
        if concise_hint else ""
    )
    user_message = f"Analyze the following meeting utterances:{hint}\n\n{utterances_json}"
    call_fn = _call_openrouter if use_fallback else _call_gemini
    model_label = FALLBACK_MODEL if use_fallback else PRIMARY_MODEL

    for attempt in range(MAX_RETRIES):
        try:
            return call_fn(system_prompt, user_message, agent_name)
        except Exception as e:
            wait = RETRY_DELAY * (2 ** attempt)
            print(f"[{agent_name}] {model_label} attempt {attempt + 1} failed: {e}. Retrying in {wait:.1f}s...")
            time.sleep(wait)
            if attempt == MAX_RETRIES - 1 and not use_fallback:
                print(f"[{agent_name}] Gemini failed. Switching to fallback ({FALLBACK_MODEL})...")
                return call_agent(system_prompt, utterances_json, agent_name, use_fallback=True)
            if attempt == MAX_RETRIES - 1:
                raise


def parse_and_validate(raw_json: str, model_class, agent_name: str):
    """
    Parse and validate JSON. On failure, attempt _repair_truncated_json before giving up.
    """
    def _try_load(text: str):
        data = json.loads(text)
        return model_class(**data)

    # First attempt — clean parse
    try:
        return _try_load(raw_json)
    except json.JSONDecodeError as e:
        print(f"  [!] {agent_name}: JSON parse error ({e}). Attempting repair...")
        try:
            repaired = _repair_truncated_json(raw_json)
            result = _try_load(repaired)
            print(f"  [✓] {agent_name}: JSON repaired successfully.")
            return result
        except Exception as repair_err:
            raise ValueError(
                f"[{agent_name}] Model returned invalid JSON (repair also failed): {e}\n"
                f"Repair error: {repair_err}\nRaw (first 600 chars):\n{raw_json[:600]}"
            )
    except ValidationError as e:
        raise ValueError(f"[{agent_name}] Schema validation failed:\n{e}\nRaw:\n{raw_json[:500]}")


# ─── Three Agent Functions ────────────────────────────────────────────────────

def _run_agent_with_concise_fallback(system_prompt, utterances_json, agent_name, model_class, verbose=True):
    """
    Run an agent with spinner animation. On JSON parse error retry once in
    concise mode (shorter fields, higher confidence threshold).
    """
    anim = AgentAnimation(agent_name, enabled=verbose)
    anim.start()
    try:
        raw = call_agent(system_prompt, utterances_json, agent_name)
        try:
            result = parse_and_validate(raw, model_class, agent_name)
            anim.stop(success=True)
            return result
        except ValueError as first_err:
            if "invalid JSON" in str(first_err) or "repair" in str(first_err):
                anim.stop(success=False)
                if verbose:
                    _w(f"  {C.AMB}[!] {agent_name}: retrying in concise mode...{C.RST}\n")
                anim2 = AgentAnimation(agent_name, enabled=verbose)
                anim2.start()
                raw2 = call_agent(system_prompt, utterances_json, agent_name, concise_hint=True)
                result = parse_and_validate(raw2, model_class, agent_name)
                anim2.stop(success=True)
                return result
            anim.stop(success=False)
            raise
    except Exception:
        anim.stop(success=False)
        raise


def run_discourse_agent(utterances_json: str, verbose: bool = True) -> DiscourseOutput:
    return _run_agent_with_concise_fallback(
        DISCOURSE_SYSTEM_PROMPT, utterances_json, "Discourse", DiscourseOutput, verbose
    )


def run_commitment_agent(utterances_json: str, verbose: bool = True) -> CommitmentOutput:
    return _run_agent_with_concise_fallback(
        COMMITMENT_SYSTEM_PROMPT, utterances_json, "Commitment", CommitmentOutput, verbose
    )


def run_risk_agent(utterances_json: str, verbose: bool = True) -> RiskOutput:
    return _run_agent_with_concise_fallback(
        RISK_SYSTEM_PROMPT, utterances_json, "Risk", RiskOutput, verbose
    )


def run_task_agent(layer3_output: Layer3Output, verbose: bool = True) -> dict:
    anim = AgentAnimation("Task", enabled=verbose)
    anim.start()
    try:
        agent_input = {
            "commitments": [
                c.model_dump() if hasattr(c, "model_dump") else c
                for c in layer3_output.commitments.commitments
            ],
            "decisions": [
                d.model_dump() if hasattr(d, "model_dump") else d
                for d in layer3_output.commitments.decisions
            ],
            "risks": [
                r.model_dump() if hasattr(r, "model_dump") else r
                for r in layer3_output.risks.risks
            ],
        }
        input_json = json.dumps(agent_input, ensure_ascii=False, indent=2)
        raw = call_agent(TASK_AGENT_SYSTEM_PROMPT, input_json, "TaskAgent")
        try:
            result = json.loads(raw)
            anim.stop(success=True)
            if verbose:
                tc = len(result.get("tasks", []))
                ec = len(result.get("dependency_edges", []))
                _w(f"  {C.DIM2}    -> {tc} tasks, {ec} dependency edges{C.RST}\n")
            return result
        except json.JSONDecodeError as e:
            anim.stop(success=False)
            raise ValueError(f"[TaskAgent] Invalid JSON: {e}\nRaw:\n{raw[:500]}")
    except Exception:
        anim.stop(success=False)
        raise


# ─── Orchestrator ─────────────────────────────────────────────────────────────

def run_layer3(utterances: list[dict], verbose: bool = True) -> Layer3Output:
    numbered = build_numbered_utterances(utterances)
    utterances_json = json.dumps(numbered, ensure_ascii=False, indent=2)

    if verbose:
        print_info("Utterances sent", str(len(numbered)))
        print_info("Primary model",   PRIMARY_MODEL)
        print_info("Fallback model",  FALLBACK_MODEL)
        _w(f"\n  {C.DIM2}Running 3 agents in parallel...{C.RST}\n\n")

    results = {}
    errors  = {}

    agent_fns = {
        "discourse":  (run_discourse_agent,  utterances_json, verbose),
        "commitment": (run_commitment_agent, utterances_json, verbose),
        "risk":       (run_risk_agent,       utterances_json, verbose),
    }

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {
            executor.submit(fn, arg, v): name
            for name, (fn, arg, v) in agent_fns.items()
        }
        for future in as_completed(futures):
            name = futures[future]
            try:
                results[name] = future.result()
            except Exception as e:
                errors[name] = str(e)
                if verbose:
                    _w(f"  {C.RED}[!!]{C.RST}  {C.RED}{name.capitalize()} Agent FAILED: {e}{C.RST}\n")

    if errors:
        raise RuntimeError("One or more agents failed:\n" +
                           "\n".join(f"  {k}: {v}" for k, v in errors.items()))

    return Layer3Output(
        discourse=results["discourse"],
        commitments=results["commitment"],
        risks=results["risk"],
    )


# ─── CLI Entry Point ──────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Run Layer 3 Understanding Layer agents")
    parser.add_argument("--input", required=True, help="Path to Layer 1 JSON transcript file ({\"conversation\": [...]} format)")
    parser.add_argument("--output", default="layer3_output.json", help="Path to save Layer 3 JSON output")
    parser.add_argument("--quiet", action="store_true", help="Suppress verbose output")
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        raise FileNotFoundError(f"Transcript file not found: {input_path}")

    utterances = load_transcript(str(input_path))
    print(f"Loaded {len(utterances)} utterances from {input_path}")

    start_time = time.time()
    output = run_layer3(utterances, verbose=not args.quiet)
    elapsed = time.time() - start_time

    # Save output
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output.model_dump(), f, ensure_ascii=False, indent=2)

    print(f"Layer 3 output saved → {output_path}")
    print(f"Total runtime: {elapsed:.2f}s")


if __name__ == "__main__":
    main()

'use client';

import { useState, useMemo } from 'react';
import {
    PREVIOUS_MEETINGS, PROJECTS, MEETING_DETAILS, MeetingDetail,
} from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import {
    ArrowUpDown, ChevronUp, ChevronDown, Download, X,
    MessageSquare, CheckSquare, ArrowRight, Users, Mic, MicOff,
} from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey = 'date' | 'importanceScore' | 'decisionDensity' | 'taskCreated' | 'daysToDeadline';
const TIER_BADGE: Record<string, string> = {
    high: 'badge-blue', medium: 'badge-amber', low: 'badge-gray',
};

// ─── Small helpers ────────────────────────────────────────────────────────────

function ImportanceBar({ value }: { value: number }) {
    const color = value >= 85 ? '#3b82f6' : value >= 70 ? '#8b5cf6' : value >= 55 ? '#f59e0b' : '#4a5980';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 100, transition: 'width 0.6s ease' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color, minWidth: 32, textAlign: 'right' }}>{value}</span>
        </div>
    );
}

function PieTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="chart-tooltip">
            <div style={{ fontWeight: 600, color: payload[0].payload.color }}>{payload[0].name}</div>
            <div className="chart-tooltip-value">{payload[0].value}%</div>
        </div>
    );
}

// ─── Meeting Detail Panel ─────────────────────────────────────────────────────

function SpeakerTimeline({ detail }: { detail: MeetingDetail }) {
    const dur = detail.duration;
    // Deduplicate unique speakers
    const speakerMap = Object.fromEntries(detail.speakers.map(s => [s.id, s]));

    return (
        <div>
            {/* Timeline track */}
            <div style={{ position: 'relative', height: 44, background: 'var(--bg-elevated)', borderRadius: 8, overflow: 'hidden', marginBottom: 6 }}>
                {detail.timeline.map((seg, i) => (
                    <div
                        key={i}
                        title={`${speakerMap[seg.speaker]?.name ?? seg.speaker}: ${seg.start}–${seg.end}m`}
                        style={{
                            position: 'absolute',
                            left: `${(seg.start / dur) * 100}%`,
                            width: `${((seg.end - seg.start) / dur) * 100}%`,
                            top: 0, bottom: 0,
                            background: seg.color,
                            opacity: 0.8,
                            cursor: 'default',
                        }}
                    />
                ))}
                {detail.silenceIntervals.map((s, i) => (
                    <div
                        key={i}
                        title={`Silence: ${((s.end - s.start) * 60).toFixed(0)}s`}
                        style={{
                            position: 'absolute',
                            left: `${(s.start / dur) * 100}%`,
                            width: `${((s.end - s.start) / dur) * 100}%`,
                            top: 0, bottom: 0,
                            background: 'rgba(74,89,128,0.55)',
                        }}
                    />
                ))}
            </div>

            {/* Time axis */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                {[0, Math.round(dur * 0.25), Math.round(dur * 0.5), Math.round(dur * 0.75), dur].map(t => (
                    <span key={t} style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{t}m</span>
                ))}
            </div>

            {/* Speaker legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {detail.speakers.map(s => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, opacity: 0.85 }} />
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.id}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(74,89,128,0.55)' }} />
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Silence</span>
                </div>
            </div>
        </div>
    );
}

function MeetingDetailPanel({ detail, onClose, meetingTitle }: {
    detail: MeetingDetail;
    onClose: () => void;
    meetingTitle: string;
}) {
    const [tab, setTab] = useState<'overview' | 'speakers' | 'transcript'>('overview');

    const totalSilence = detail.silenceIntervals.reduce((acc, s) => acc + (s.end - s.start), 0);
    const silencePct = Math.round((totalSilence / detail.duration) * 100);
    const speakingPct = 100 - silencePct;

    const pieData = detail.speakers.map(s => ({ name: s.id, value: s.pct, color: s.color }));

    return (
        <div
            className="detail-sidebar"
            style={{
                width: 480,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                animation: 'slideInRight 0.22s cubic-bezier(0.2, 0.9, 0.3, 1)',
                borderLeft: '1px solid var(--border)',
                background: 'var(--bg-secondary)',
                height: '100%',
                position: 'relative',
                flexShrink: 0,
            }}
        >
            {/* Header */}
            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--accent-blue-light)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 3 }}>
                            {detail.id}  ·  {detail.duration} min
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{meetingTitle}</div>
                    </div>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}>
                        <X size={15} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="tabs" style={{ marginTop: 14 }}>
                    {([
                        { key: 'overview', label: 'Overview' },
                        { key: 'speakers', label: 'Speaker Analysis' },
                        { key: 'transcript', label: 'Transcript' },
                    ] as const).map(t => (
                        <button
                            key={t.key}
                            className={`tab ${tab === t.key ? 'active' : ''}`}
                            onClick={() => setTab(t.key)}
                            style={{ fontSize: 12 }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>

                {/* ── OVERVIEW TAB ── */}
                {tab === 'overview' && (
                    <>
                        {/* Summary */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                Meeting Overview
                            </div>
                            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                                {detail.overview}
                            </p>
                        </div>

                        {/* Key Discussion Points */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <MessageSquare size={11} /> Key Discussion Points
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                {detail.keyPoints.map((pt, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                            <span style={{ fontSize: 9, fontWeight: 700, color: '#60a5fa' }}>{i + 1}</span>
                                        </div>
                                        <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{pt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Decisions */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <CheckSquare size={11} /> Decisions Made
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {detail.decisions.map((d, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '7px 10px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 7 }}>
                                        <CheckSquare size={11} style={{ color: '#34d399', flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{d}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Items */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                Action Items
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {detail.actionItems.map((a, i) => (
                                    <div key={i} style={{ padding: '8px 10px', background: 'var(--bg-elevated)', borderRadius: 7, border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-amber)' }}>{a.owner}</span>
                                            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>Due {a.due}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45 }}>{a.task}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <ArrowRight size={11} /> Next Steps
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {detail.nextSteps.map((ns, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                        <ArrowRight size={11} style={{ color: 'var(--accent-violet)', flexShrink: 0, marginTop: 3 }} />
                                        <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{ns}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* ── SPEAKER ANALYSIS TAB ── */}
                {tab === 'speakers' && (
                    <>
                        {/* Donut chart */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Users size={11} /> Speaking Time Distribution</span>
                            </div>
                            <div style={{ height: 180 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" paddingAngle={2}>
                                            {pieData.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} stroke="transparent" />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<PieTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Speaker bars */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                {[...detail.speakers].sort((a, b) => b.pct - a.pct).map(s => (
                                    <div key={s.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                                                <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.id}</span>
                                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>— {s.name}</span>
                                            </div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{s.pct}%</div>
                                        </div>
                                        <div style={{ height: 5, background: 'rgba(255,255,255,0.04)', borderRadius: 100, overflow: 'hidden' }}>
                                            <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: 100 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ height: 1, background: 'var(--border)' }} />

                        {/* Speaker stats table */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                Speaking Stats
                            </div>
                            <table className="data-table" style={{ fontSize: 12 }}>
                                <thead>
                                    <tr>
                                        <th>Speaker</th>
                                        <th>Turns</th>
                                        <th>Interruptions</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...detail.speakers].sort((a, b) => b.pct - a.pct).map(s => (
                                        <tr key={s.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent-blue-light)', fontSize: 11 }}>{s.id}</span>
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.turns}</td>
                                            <td>
                                                <span style={{ color: s.interruptions > 3 ? 'var(--accent-rose)' : s.interruptions > 1 ? 'var(--accent-amber)' : 'var(--text-muted)', fontWeight: 600 }}>
                                                    {s.interruptions}
                                                </span>
                                            </td>
                                            <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{s.pct}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ height: 1, background: 'var(--border)' }} />

                        {/* Timeline */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
                                Speaking Timeline
                            </div>
                            <SpeakerTimeline detail={detail} />
                        </div>

                        <div style={{ height: 1, background: 'var(--border)' }} />

                        {/* Silence / Speaking analysis */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MicOff size={11} /> Silence / Speaking Analysis</span>
                            </div>

                            {/* Big stat row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
                                {[
                                    { label: 'Speaking', value: `${speakingPct}%`, icon: <Mic size={13} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
                                    { label: 'Silence', value: `${silencePct}%`, icon: <MicOff size={13} />, color: '#4a5980', bg: 'rgba(74,89,128,0.1)' },
                                    { label: 'Gaps', value: `${detail.silenceIntervals.length}`, icon: null, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
                                ].map(s => (
                                    <div key={s.label} style={{ padding: '10px 10px', background: s.bg, border: `1px solid ${s.color}28`, borderRadius: 8, textAlign: 'center' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Silence gap list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {detail.silenceIntervals.map((s, i) => {
                                    const dur = (s.end - s.start) * 60;
                                    return (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                                            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                                                {s.start}:00 – {s.end}:00
                                            </span>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: dur > 90 ? '#f43f5e' : '#4a5980' }}>
                                                {dur}s
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}

                {/* ── TRANSCRIPT TAB ── */}
                {tab === 'transcript' && (
                    <>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>
                                Diarized Transcript
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
                                Speaker-attributed excerpt · {detail.transcript.length} segments shown
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {detail.transcript.map((line, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                        {/* Avatar */}
                                        <div style={{
                                            width: 28, height: 28, borderRadius: '50%',
                                            background: `${line.color}22`, border: `2px solid ${line.color}55`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0, marginTop: 1,
                                        }}>
                                            <span style={{ fontSize: 8, fontWeight: 700, color: line.color, fontFamily: 'JetBrains Mono, monospace' }}>
                                                {line.speakerId.split('-')[1]}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: line.color }}>{line.speakerName}</span>
                                                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{line.timestamp}</span>
                                            </div>
                                            <div style={{
                                                fontSize: 12.5,
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.6,
                                                padding: '8px 11px',
                                                background: 'var(--bg-elevated)',
                                                borderRadius: '0 8px 8px 8px',
                                                border: '1px solid var(--border)',
                                                borderLeft: `2px solid ${line.color}60`,
                                            }}>
                                                {line.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: 14, padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 8, textAlign: 'center' }}>
                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                    Showing key segments  ·  Full transcript available on export
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MeetingImportancePage() {
    const [sortKey, setSortKey] = useState<SortKey>('importanceScore');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [filterProject, setFilterProject] = useState('all');
    const [filterTier, setFilterTier] = useState('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);

    function handleSort(key: SortKey) {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
    }

    const filtered = useMemo(() => PREVIOUS_MEETINGS
        .filter(m => {
            if (filterProject !== 'all' && m.projectId !== filterProject) return false;
            if (filterTier !== 'all' && m.budgetTier !== filterTier) return false;
            if (dateFrom && m.date < dateFrom) return false;
            if (dateTo && m.date > dateTo) return false;
            return true;
        })
        .sort((a, b) => {
            const av = a[sortKey] as number | string;
            const bv = b[sortKey] as number | string;
            if (typeof av === 'number' && typeof bv === 'number')
                return sortDir === 'asc' ? av - bv : bv - av;
            return sortDir === 'asc'
                ? String(av).localeCompare(String(bv))
                : String(bv).localeCompare(String(av));
        }), [filterProject, filterTier, dateFrom, dateTo, sortKey, sortDir]);

    function exportCSV() {
        const rows = [
            ['ID', 'Title', 'Project', 'Date', 'Budget Tier', 'Days to Deadline', 'Decision Density', 'Importance Score', 'Tasks Created'],
            ...filtered.map(m => [m.id, m.title, m.project, m.date, m.budgetTier, m.daysToDeadline, m.decisionDensity, m.importanceScore, m.taskCreated]),
        ];
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'meeting_importance.csv'; a.click();
        URL.revokeObjectURL(url);
    }

    function SortIcon({ col }: { col: SortKey }) {
        if (sortKey !== col) return <ArrowUpDown size={11} style={{ opacity: 0.35 }} />;
        return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
    }

    const activeDetail = selectedMeeting ? MEETING_DETAILS[selectedMeeting] : null;
    const activeMeeting = selectedMeeting ? PREVIOUS_MEETINGS.find(m => m.id === selectedMeeting) : null;

    return (
        <>
            <TopHeader title="Meeting Intelligence" subtitle="Previous Meeting Importance" />

            {/* Full-height flex layout so sidebar fills height */}
            <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>

                {/* Left: main content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }} className="animate-fade">
                    <div className="page-header">
                        <div>
                            <h1>Previous Meeting Importance</h1>
                            <p>Historical meeting records with importance scoring — click a meeting name to view full intelligence</p>
                        </div>
                        <div className="page-header-actions">
                            <button className="btn btn-secondary btn-sm" onClick={exportCSV}>
                                <Download size={13} /> Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Formula card */}
                    <div className="card" style={{ marginBottom: 20, borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.03)' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>
                                    Importance Score Formula
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#a78bfa', background: 'rgba(99,102,241,0.08)', padding: '6px 10px', borderRadius: 6 }}>
                                    Score = 0.4×BudgetTier + 0.3×DecisionDensity + 0.2×DaysToDeadline + 0.1×TasksCreated
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 22 }}>
                                {[
                                    { label: 'High budget', val: '40pts max' },
                                    { label: 'Decision density', val: '30pts max' },
                                    { label: 'Urgency', val: '20pts max' },
                                    { label: 'Output', val: '10pts max' },
                                ].map(f => (
                                    <div key={f.label} style={{ fontSize: 10.5, color: 'var(--text-muted)', background: 'var(--bg-elevated)', borderRadius: 6, padding: '4px 8px' }}>
                                        <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{f.label}</span> — {f.val}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="filter-bar" style={{ marginBottom: 16 }}>
                        <span className="filter-label">Filter</span>
                        <select className="select" value={filterProject} onChange={e => setFilterProject(e.target.value)}>
                            <option value="all">All Projects</option>
                            {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <select className="select" value={filterTier} onChange={e => setFilterTier(e.target.value)}>
                            <option value="all">Any Budget Tier</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <input type="date" className="input" style={{ width: 130, fontSize: 12 }} value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>to</span>
                        <input type="date" className="input" style={{ width: 130, fontSize: 12 }} value={dateTo} onChange={e => setDateTo(e.target.value)} />
                        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} records</span>
                    </div>

                    {/* Table */}
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Meeting</th>
                                    <th>Project</th>
                                    <th onClick={() => handleSort('date')} className={sortKey === 'date' ? 'sorted' : ''} style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Date <SortIcon col="date" /></div>
                                    </th>
                                    <th>Tier</th>
                                    <th onClick={() => handleSort('daysToDeadline')} className={sortKey === 'daysToDeadline' ? 'sorted' : ''} style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Urgency <SortIcon col="daysToDeadline" /></div>
                                    </th>
                                    <th onClick={() => handleSort('decisionDensity')} className={sortKey === 'decisionDensity' ? 'sorted' : ''} style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Decision Density <SortIcon col="decisionDensity" /></div>
                                    </th>
                                    <th onClick={() => handleSort('taskCreated')} className={sortKey === 'taskCreated' ? 'sorted' : ''} style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Tasks Created <SortIcon col="taskCreated" /></div>
                                    </th>
                                    <th onClick={() => handleSort('importanceScore')} className={sortKey === 'importanceScore' ? 'sorted' : ''} style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Importance Score <SortIcon col="importanceScore" /></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(m => {
                                    const proj = PROJECTS.find(p => p.id === m.projectId);
                                    const isSelected = selectedMeeting === m.id;
                                    return (
                                        <tr
                                            key={m.id}
                                            style={{
                                                background: isSelected ? 'rgba(59,130,246,0.07)' : undefined,
                                                outline: isSelected ? '1px solid rgba(59,130,246,0.3)' : undefined,
                                            }}
                                        >
                                            <td>
                                                <span className="mono" style={{ color: 'var(--text-muted)', fontSize: 11 }}>{m.id}</span>
                                            </td>
                                            <td>
                                                {/* Clickable meeting name */}
                                                <button
                                                    style={{
                                                        background: 'none', border: 'none', cursor: 'pointer',
                                                        fontWeight: 600, fontSize: 13, color: isSelected ? '#60a5fa' : 'var(--text-primary)',
                                                        textAlign: 'left', padding: 0,
                                                        transition: 'color 0.15s',
                                                        textDecoration: isSelected ? 'none' : 'underline',
                                                        textDecorationColor: 'rgba(139,157,195,0.3)',
                                                    }}
                                                    onClick={() => setSelectedMeeting(isSelected ? null : m.id)}
                                                >
                                                    {m.title}
                                                </button>
                                                {MEETING_DETAILS[m.id] && (
                                                    <span style={{ fontSize: 10, color: 'var(--accent-blue-light)', marginLeft: 6, opacity: 0.7 }}>→ full intel</span>
                                                )}
                                            </td>
                                            <td>
                                                <span className="badge" style={{ background: `${proj?.color}18`, color: proj?.color, fontSize: 10 }}>
                                                    {m.project.split(' ')[0]}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.date}</td>
                                            <td>
                                                <span className={`badge ${TIER_BADGE[m.budgetTier]}`} style={{ fontSize: 10 }}>
                                                    {m.budgetTier}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{
                                                    fontSize: 12, fontWeight: 600,
                                                    color: m.daysToDeadline <= 5 ? 'var(--accent-rose)' : m.daysToDeadline <= 14 ? 'var(--accent-amber)' : 'var(--text-muted)',
                                                }}>
                                                    {m.daysToDeadline}d
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: m.decisionDensity > 2 ? '#60a5fa' : 'var(--text-secondary)' }}>
                                                    {m.decisionDensity}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{m.taskCreated}</span>
                                            </td>
                                            <td style={{ minWidth: 160 }}>
                                                <ImportanceBar value={m.importanceScore} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: detail panel */}
                {activeDetail && activeMeeting && (
                    <MeetingDetailPanel
                        detail={activeDetail}
                        meetingTitle={activeMeeting.title}
                        onClose={() => setSelectedMeeting(null)}
                    />
                )}
            </div>
        </>
    );
}

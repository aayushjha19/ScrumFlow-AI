// ─── Projects ────────────────────────────────────────────────────────────────
export const PROJECTS = [
    { id: 'P-007', name: 'ScrumFlow.ai', color: '#6366f1', status: 'active', budget: 180000, budgetTier: 'medium' },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const DASHBOARD_METRICS = {
    activeProjects: 1,
    upcomingMeetings: 3,
    pendingAllocations: 6,
    acceptanceRate: 86.0,
};

export const RECENT_ALLOCATIONS = [
    { id: 'ALLOC-004', taskId: 'AUTO-T-001', assignee: 'Harsh', confidence: 78, status: 'pending', timestamp: '2026-03-08T10:00:00Z' },
    { id: 'ALLOC-001', taskId: 'AUTO-T-005', assignee: 'Sara Iyer', confidence: 86, status: 'pending', timestamp: '2026-03-08T10:05:00Z' },
    { id: 'ALLOC-002', taskId: 'AUTO-T-006', assignee: 'Sara Iyer', confidence: 86, status: 'pending', timestamp: '2026-03-08T10:10:00Z' },
    { id: 'ALLOC-003', taskId: 'AUTO-T-003', assignee: 'Aadity', confidence: 62, status: 'pending', timestamp: '2026-03-08T10:15:00Z' },
    { id: 'ALLOC-005', taskId: 'AUTO-T-008', assignee: 'Neha Joshi', confidence: 83, status: 'pending', timestamp: '2026-03-08T10:20:00Z' },
];

export const RECENT_MEETINGS_IMPORTANCE = [
    { id: 'M-202', title: 'Demo Video Planning', project: 'ScrumFlow.ai', importanceScore: 88, projectId: 'P-007' },
];

export const ACCURACY_TREND = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2026, 0, i + 22).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    accuracy: Math.round(75 + Math.random() * 15 + i * 0.2),
    overrideRate: Math.round(15 + Math.random() * 10 - i * 0.15),
}));

// ─── Meetings ─────────────────────────────────────────────────────────────────
// All upcoming meetings are ScrumFlow.ai project checkpoints
export const UPCOMING_MEETINGS = [
    {
        id: 'M-203', title: 'ScrumFlow.ai Internal Review — Draft Video', projectId: 'P-007', project: 'ScrumFlow.ai',
        date: '2026-03-10', time: '17:00', duration: 30, budgetTier: 'medium',
        daysToDeadline: 1, importanceScore: 91,
        participants: ['Mayank Sharma', 'Aadity', 'Harsh'],
        description: 'Internal review of Harsh draft video. All feedback to be given inline. Go/no-go decision for final submission.',
    },
    {
        id: 'M-204', title: 'ScrumFlow.ai Article Review & Submission Prep', projectId: 'P-007', project: 'ScrumFlow.ai',
        date: '2026-03-11', time: '10:00', duration: 45, budgetTier: 'medium',
        daysToDeadline: 2, importanceScore: 84,
        participants: ['Mayank Sharma', 'Aadity'],
        description: 'Final review of the submission article. Aadity cleanup pass completed, Mayank final sign-off. Submit together with video.',
    },
    {
        id: 'M-205', title: 'ScrumFlow.ai Demo Submission & Debrief', projectId: 'P-007', project: 'ScrumFlow.ai',
        date: '2026-03-12', time: '14:00', duration: 20, budgetTier: 'medium',
        daysToDeadline: 3, importanceScore: 75,
        participants: ['Mayank Sharma', 'Aadity', 'Harsh'],
        description: 'Submit the final video and article. Quick debrief on what went well and retrospective for future sprints.',
    },
];

export const PREVIOUS_MEETINGS = [
    {
        // ── Real meeting: extracted by AAES pipeline from scrumMeetAudio_aligned_output ──
        id: 'M-202', title: 'ScrumFlow.ai Demo Video Planning', project: 'ScrumFlow.ai', projectId: 'P-007',
        date: '2026-03-08', budgetTier: 'medium', daysToDeadline: 3,
        decisionDensity: 1.34, importanceScore: 88, taskCreated: 12,
    },
];

// ─── Speaker Metrics — ScrumFlow.ai Demo Video Planning (M-202, 8 min) ─────
export const SPEAKERS = [
    { id: 'SPEAKER_00', name: 'Mayank Sharma', speakingPct: 48, turns: 22, interruptions: 2, color: '#6366f1' },
    { id: 'SPEAKER_01', name: 'Aadity', speakingPct: 34, turns: 18, interruptions: 3, color: '#06b6d4' },
    { id: 'SPEAKER_02', name: 'Harsh', speakingPct: 18, turns: 10, interruptions: 1, color: '#f59e0b' },
];

export const SPEAKER_TIMELINE = [
    { speaker: 'SPEAKER_00', start: 0, end: 2, color: '#6366f1' },
    { speaker: 'SPEAKER_01', start: 2, end: 3, color: '#06b6d4' },
    { speaker: 'SPEAKER_02', start: 3, end: 4, color: '#f59e0b' },
    { speaker: 'SPEAKER_00', start: 4, end: 5, color: '#6366f1' },
    { speaker: 'SPEAKER_01', start: 5, end: 6, color: '#06b6d4' },
    { speaker: 'SPEAKER_00', start: 6, end: 7, color: '#6366f1' },
    { speaker: 'SPEAKER_02', start: 7, end: 8, color: '#f59e0b' },
];

// ─── Silence Metrics — ScrumFlow.ai Demo Video Planning (M-202) ─────────────
export const SILENCE_METRICS = {
    totalDuration: '0:42',
    avgGap: 4.1,
    frequency: 6,
    longestGap: 8,
};

export const SILENCE_HISTOGRAM = [
    { bucket: '2-4s', count: 3 },
    { bucket: '4-6s', count: 2 },
    { bucket: '6-8s', count: 1 },
    { bucket: '8-10s', count: 0 },
    { bucket: '>10s', count: 0 },
];

// ─── Task Graph Nodes — ScrumFlow.ai AUTO-T dependency chain ─────────────
export const GRAPH_NODES = [
    { id: 'AUTO-T-001', label: 'Draft Video', status: 'open', complexity: 7, x: 500, y: 300 },
    { id: 'AUTO-T-002', label: 'Motion BG', status: 'open', complexity: 2, x: 100, y: 100 },
    { id: 'AUTO-T-003', label: 'Mock Data', status: 'open', complexity: 2, x: 200, y: 200 },
    { id: 'AUTO-T-004', label: 'Screen Recording', status: 'open', complexity: 3, x: 350, y: 200 },
    { id: 'AUTO-T-005', label: 'Logo + Tagline', status: 'open', complexity: 2, x: 100, y: 300 },
    { id: 'AUTO-T-006', label: 'Architecture Diagram', status: 'open', complexity: 1, x: 100, y: 420 },
    { id: 'AUTO-T-008', label: 'Article 1st Pass', status: 'open', complexity: 2, x: 300, y: 480 },
    { id: 'AUTO-T-009', label: 'Article Cleanup', status: 'open', complexity: 3, x: 500, y: 480 },
    { id: 'AUTO-T-010', label: 'Music Track', status: 'open', complexity: 2, x: 100, y: 540 },
    { id: 'AUTO-T-011', label: 'Calendar Entry', status: 'open', complexity: 1, x: 650, y: 200 },
    { id: 'AUTO-T-012', label: 'YT References', status: 'open', complexity: 1, x: 650, y: 100 },
];

export const GRAPH_EDGES = [
    { from: 'AUTO-T-002', to: 'AUTO-T-001' },
    { from: 'AUTO-T-003', to: 'AUTO-T-001' },
    { from: 'AUTO-T-004', to: 'AUTO-T-001' },
    { from: 'AUTO-T-005', to: 'AUTO-T-001' },
    { from: 'AUTO-T-006', to: 'AUTO-T-001' },
    { from: 'AUTO-T-010', to: 'AUTO-T-001' },
    { from: 'AUTO-T-003', to: 'AUTO-T-004' },
    { from: 'AUTO-T-008', to: 'AUTO-T-009' },
];

// ─── Tasks ────────────────────────────────────────────────────────────────────
// ── Real tasks extracted by AAES pipeline — ScrumFlow.ai Demo Video Planning (2026-03-08) ──
export const TASKS = [
    {
        id: 'AUTO-T-001', title: 'Deliver first draft of demo video', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 7, complexityLabel: 'High', blocking: 0, blockedBy: 6,
        crossTeamImpact: 3, historicalCompletion: 85, status: 'open',
        age: 0, estimatedHours: 16,
        dependencies: ['AUTO-T-002', 'AUTO-T-003', 'AUTO-T-004', 'AUTO-T-005', 'AUTO-T-006', 'AUTO-T-010'],
        assignee: 'Harsh',
        description: 'Edit and deliver the first full draft of the ScrumFlow.ai demo video by 6 PM today. Incorporate: logo intro animation, 5-second team intro, website demo with feature highlights (blue theme), and static architecture overview slide. Complex After Effects animations are out of scope.',
    },
    {
        id: 'AUTO-T-002', title: 'Select and confirm motion background', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 2, complexityLabel: 'Low', blocking: 1, blockedBy: 0,
        crossTeamImpact: 1, historicalCompletion: 88, status: 'open',
        age: 0, estimatedHours: 4,
        dependencies: [],
        assignee: 'Aadity',
        description: 'Review motion background options shared on Telegram and confirm the blue-themed option to Harsh by 12 noon today. This blocks video editing from starting.',
    },
    {
        id: 'AUTO-T-003', title: 'Update website mock data with realistic entries', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 2, complexityLabel: 'Low', blocking: 1, blockedBy: 0,
        crossTeamImpact: 1, historicalCompletion: 88, status: 'open',
        age: 0, estimatedHours: 4,
        dependencies: [],
        assignee: 'Aadity',
        description: 'Replace generic placeholder entries on the website with realistic mock data. Priority task — must complete before screen recording. Deadline: 12:30 PM today.',
    },
    {
        id: 'AUTO-T-004', title: 'Record clean screen walkthrough of the website', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 3, complexityLabel: 'Low', blocking: 1, blockedBy: 1,
        crossTeamImpact: 2, historicalCompletion: 88, status: 'open',
        age: 0, estimatedHours: 8,
        dependencies: ['AUTO-T-003'],
        assignee: 'Aadity',
        description: 'Record a 1080p @ 30fps screen walkthrough: meeting calendar → transcription view → allocation engine → learning dashboard. Depends on mock data update. Deadline: 1 PM today.',
    },
    {
        id: 'AUTO-T-005', title: 'Design and finalize ScrumFlow.ai logo and tagline', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 2, complexityLabel: 'Low', blocking: 1, blockedBy: 0,
        crossTeamImpact: 2, historicalCompletion: 91, status: 'open',
        age: 0, estimatedHours: 5,
        dependencies: [],
        assignee: 'Mayank',
        description: 'Design the ScrumFlow.ai logo and finalize the tagline. Send both to Harsh via Telegram by 11 AM today. Hard blocker for intro animation.',
    },
    {
        id: 'AUTO-T-006', title: 'Create architecture flowchart on Eraser.io', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 1, complexityLabel: 'Low', blocking: 1, blockedBy: 0,
        crossTeamImpact: 1, historicalCompletion: 91, status: 'open',
        age: 0, estimatedHours: 5,
        dependencies: [],
        assignee: 'Mayank',
        description: 'Build a static architecture flowchart on Eraser.io: 3 × EC2 machines, RDS, ScrumFlow API layer. AWS/RDS logos. Static in video. Send to Harsh by 1:30 PM.',
    },
    {
        id: 'AUTO-T-008', title: 'Perform first pass of the article', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 2, complexityLabel: 'Low', blocking: 1, blockedBy: 0,
        crossTeamImpact: 1, historicalCompletion: 91, status: 'open',
        age: 0, estimatedHours: 5,
        dependencies: [],
        assignee: 'Mayank',
        description: 'Write the first pass of the submission article using PRD, conversation logs, and MeetMinds exports. Deadline: tonight. Aadity cleanup depends on this.',
    },
    {
        id: 'AUTO-T-009', title: 'Article content cleanup and segregation', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 3, complexityLabel: 'Low', blocking: 0, blockedBy: 1,
        crossTeamImpact: 1, historicalCompletion: 88, status: 'open',
        age: 0, estimatedHours: 4,
        dependencies: ['AUTO-T-008'],
        assignee: 'Aadity',
        description: 'Segregate useful content from raw PRD and chat data, clean up article after Mayank first pass. Moved to tomorrow morning.',
    },
    {
        id: 'AUTO-T-010', title: 'Select and send royalty-free background music track', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 2, complexityLabel: 'Low', blocking: 1, blockedBy: 0,
        crossTeamImpact: 1, historicalCompletion: 91, status: 'open',
        age: 0, estimatedHours: 2,
        dependencies: [],
        assignee: 'Mayank',
        description: 'Pick a royalty-free tech/ambient background music track (blue aesthetic) and send to Harsh by 2 PM today.',
    },
    {
        id: 'AUTO-T-011', title: "Add today's meeting entry to calendar mock data", projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 1, complexityLabel: 'Low', blocking: 0, blockedBy: 0,
        crossTeamImpact: 1, historicalCompletion: 88, status: 'open',
        age: 0, estimatedHours: 2,
        dependencies: [],
        assignee: 'Aadity',
        description: "Add a calendar entry for today's ScrumFlow.ai demo planning meeting to the website mock data.",
    },
    {
        id: 'AUTO-T-012', title: 'Share YouTube reference video links on Telegram', projectId: 'P-007', project: 'ScrumFlow.ai',
        complexity: 1, complexityLabel: 'Low', blocking: 0, blockedBy: 0,
        crossTeamImpact: 1, historicalCompletion: 91, status: 'open',
        age: 0, estimatedHours: 1,
        dependencies: [],
        assignee: 'Mayank',
        description: 'Share YouTube links of similar-style demo videos on Telegram by 11:30 AM for Harsh to align visual direction.',
    },
];

// ─── Allocations ──────────────────────────────────────────────────────────────
// ── Real allocation suggestions — AAES pipeline output (ScrumFlow.ai Demo Video Planning) ──
export const PENDING_ALLOCATIONS = [
    {
        id: 'ALLOC-001', taskId: 'AUTO-T-005', taskTitle: 'Design and finalize ScrumFlow.ai logo and tagline',
        assignee: { name: 'Sara Iyer', role: 'Systems Architect', id: 'E-09' },
        skillMatch: 100, loadFit: 58, confidence: 86,
        reasoning: [
            'Skill match: 100% (documentation, architecture, brand-identity)',
            'Workload: 12h/week current load + 5h task = 17h vs 40h capacity (58% fit)',
            'Historical completion rate: 95% across Systems Architect task types',
            'Highest combined score among available team members',
        ],
        alternatives: [
            { name: 'Neha Joshi', id: 'E-07', skillMatch: 100, loadFit: 48 },
            { name: 'Deepika Singh', id: 'E-11', skillMatch: 100, loadFit: 43 },
        ],
    },
    {
        id: 'ALLOC-002', taskId: 'AUTO-T-006', taskTitle: 'Create architecture flowchart on Eraser.io',
        assignee: { name: 'Sara Iyer', role: 'Systems Architect', id: 'E-09' },
        skillMatch: 100, loadFit: 58, confidence: 86,
        reasoning: [
            'Skill match: 100% (3/3 required skills: architecture, system-design, Eraser.io)',
            'Workload: 12h/week current load + 5h task = 17h vs 40h capacity (58% fit)',
            'Historical completion rate: 95% across Systems Architect task types',
            'Highest combined score — only member with both architecture and Eraser.io skills',
        ],
        alternatives: [
            { name: 'Mayank Sharma', id: 'E-01', skillMatch: 67, loadFit: 38 },
            { name: 'Neha Joshi', id: 'E-07', skillMatch: 33, loadFit: 48 },
        ],
    },
    {
        id: 'ALLOC-003', taskId: 'AUTO-T-003', taskTitle: 'Update website mock data with realistic entries',
        assignee: { name: 'Aadity', role: 'Frontend Engineer', id: 'E-02' },
        skillMatch: 50, loadFit: 65, confidence: 62,
        reasoning: [
            'Skill match: 50% (1/2 required skills: frontend, mock-data)',
            'Workload: 10h/week current load + 4h task = 14h vs 40h capacity (65% fit)',
            'Historical completion rate: 88% across Frontend Engineer task types',
            'Transcript assigns this directly to Aadity — highest intent signal',
        ],
        alternatives: [
            { name: 'Sara Iyer', id: 'E-09', skillMatch: 50, loadFit: 60 },
            { name: 'Vikram Nair', id: 'E-08', skillMatch: 50, loadFit: 45 },
        ],
    },
    {
        id: 'ALLOC-004', taskId: 'AUTO-T-001', taskTitle: 'Deliver first draft of demo video',
        assignee: { name: 'Harsh', role: 'Video Editor', id: 'E-03' },
        skillMatch: 100, loadFit: 70, confidence: 78,
        reasoning: [
            'Skill match: 100% (video-editing, intro-animation, captions, highlight-overlay, 1080p-rendering)',
            'Workload: 8h/week current load + 16h task = 24h vs 40h capacity (70% fit)',
            'Historical completion rate: 85% across Video Editor task types',
            'Committed in meeting — transcript owner signal confirms assignment',
        ],
        alternatives: [
            { name: 'Arjun Kapoor', id: 'E-10', skillMatch: 100, loadFit: 55 },
        ],
    },
    {
        id: 'ALLOC-005', taskId: 'AUTO-T-008', taskTitle: 'Perform first pass of the article',
        assignee: { name: 'Neha Joshi', role: 'Content Writer', id: 'E-07' },
        skillMatch: 100, loadFit: 48, confidence: 83,
        reasoning: [
            'Skill match: 100% (content-writing, article-writing, technical-writing)',
            'Workload: 16h/week current load + 5h task = 21h vs 40h capacity (48% fit)',
            'Historical completion rate: 94% — highest among content-capable members',
            'Mayank committed in transcript but Neha is better skilled match for article quality',
        ],
        alternatives: [
            { name: 'Deepika Singh', id: 'E-11', skillMatch: 100, loadFit: 43 },
            { name: 'Sara Iyer', id: 'E-09', skillMatch: 100, loadFit: 58 },
        ],
    },
    {
        id: 'ALLOC-006', taskId: 'AUTO-T-010', taskTitle: 'Select and send royalty-free background music track',
        assignee: { name: 'Sara Iyer', role: 'Systems Architect', id: 'E-09' },
        skillMatch: 100, loadFit: 65, confidence: 89,
        reasoning: [
            'Skill match: 100% (documentation, research)',
            'Workload: 12h/week current load + 2h task = 14h vs 40h capacity (65% fit)',
            'Historical completion rate: 95% across task types',
            'Highest combined score — quick 2h task with immediate deadline impact',
        ],
        alternatives: [
            { name: 'Neha Joshi', id: 'E-07', skillMatch: 100, loadFit: 55 },
            { name: 'Deepika Singh', id: 'E-11', skillMatch: 100, loadFit: 50 },
        ],
    },
];

export const ACCEPTED_ALLOCATIONS = [
    { id: 'ALLOC-011', taskId: 'AUTO-T-002', assignee: 'Aadity', confidence: 88, status: 'active', acceptedDate: '2026-03-08' },
    { id: 'ALLOC-012', taskId: 'AUTO-T-011', assignee: 'Aadity', confidence: 88, status: 'active', acceptedDate: '2026-03-08' },
    { id: 'ALLOC-013', taskId: 'AUTO-T-012', assignee: 'Mayank', confidence: 91, status: 'done', acceptedDate: '2026-03-08' },
    { id: 'ALLOC-014', taskId: 'AUTO-T-004', assignee: 'Aadity', confidence: 88, status: 'active', acceptedDate: '2026-03-08' },
    { id: 'ALLOC-015', taskId: 'AUTO-T-009', assignee: 'Aadity', confidence: 88, status: 'active', acceptedDate: '2026-03-08' },
];

// ─── Learning ─────────────────────────────────────────────────────────────────
export const LEARNING_METRICS = {
    allocationAccuracy: 82.4,
    overrideRate: 17.6,
    modelDrift: 0.07,
    learningVelocity: 2.4,
    calibrationGap: 0.04,
};

export const OVERRIDE_REASONS = [
    { reason: 'Skill Mismatch', pct: 42, count: 31 },
    { reason: 'Priority Conflict', pct: 28, count: 21 },
    { reason: 'Strategic Decision', pct: 18, count: 13 },
    { reason: 'Manual Override', pct: 12, count: 9 },
];

export const ACCURACY_TREND_LEARN = Array.from({ length: 90 }, (_, i) => ({
    date: new Date(2025, 11, i - 29).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    accuracy: Math.min(100, Math.round(68 + i * 0.16 + (Math.random() - 0.4) * 4)),
    sampleSize: Math.round(40 + Math.random() * 20),
}));

// ─── Meeting Detail Intelligence ──────────────────────────────────────────────
export interface TranscriptLine {
    speakerId: string;
    speakerName: string;
    color: string;
    timestamp: string; // "mm:ss"
    text: string;
}

export interface MeetingDetail {
    id: string;
    overview: string;
    duration: number; // minutes
    keyPoints: string[];
    decisions: string[];
    actionItems: { owner: string; task: string; due: string }[];
    nextSteps: string[];
    speakers: { id: string; name: string; color: string; pct: number; turns: number; interruptions: number }[];
    timeline: { speaker: string; color: string; start: number; end: number }[];
    silenceIntervals: { start: number; end: number }[];
    transcript: TranscriptLine[];
}

export const MEETING_DETAILS: Record<string, MeetingDetail> = {
    'M-202': {
        id: 'M-202',
        duration: 8,
        overview: 'ScrumFlow.ai demo video planning meeting — Mayank, Aadity, aur Harsh ne milke Friday deadline ke liye ek comprehensive action plan banaya. Meeting mein 10 decisions liye gaye, 12 tasks assign hue, aur 5 critical risks identify kiye gaye. Video structure, asset deadlines, aur article cleanup — sab kuch finalize hua. Decision density: 1.34/min — highest for the ScrumFlow.ai project.',
        keyPoints: [
            'Demo video maximum 3 minutes hoga — Friday submission deadline pehle ready hona chahiye.',
            'Video structure decided: ScrumFlow logo + tagline anim (5s) → team intro → website demo → architecture overview.',
            'Screen recording 1080p @ 30fps hogi — sequence: calendar → transcription → allocation → learning dashboard.',
            'Architecture diagram Eraser.io pe banegi — 3x EC2, RDS, API layer — video mein static rahega, animation nahi.',
            'Complex After Effects animations out of scope — Harsh ki limitation accepted by team.',
            'Wednesday 5 PM pe internal review checkpoint set hua.',
            'Article cleanup deprioritized to tomorrow morning — aaj screen recording priority hai.',
        ],
        decisions: [
            'Video duration cap: 3 minutes maximum.',
            'Architecture diagram will remain static — no animation in video.',
            'Complex After Effects animations are out of scope for this video.',
            'Screen recording specs locked: 1080p at 30fps.',
            'Wednesday 5 PM internal review checkpoint confirmed.',
            'Article cleanup moved to tomorrow morning — not today.',
            'Blue theme for video background and motion graphics.',
            'Tagline: "Meetings se Tasks tak — Automatically" finalized.',
            'Recording sequence: calendar → transcription → allocation → learning dashboard.',
            'All assets to be shared via Telegram channel.',
        ],
        actionItems: [
            { owner: 'Mayank', task: 'Design ScrumFlow.ai logo + tagline and send to Harsh via Telegram', due: '11:00 AM today' },
            { owner: 'Mayank', task: 'Share YouTube reference video links on Telegram', due: '11:30 AM today' },
            { owner: 'Aadity', task: 'Select and confirm motion background (blue theme)', due: '12:00 PM today' },
            { owner: 'Aadity', task: 'Update website mock data with realistic entries', due: '12:30 PM today' },
            { owner: 'Aadity', task: 'Record 1080p @ 30fps screen walkthrough of website', due: '1:00 PM today' },
            { owner: 'Mayank', task: 'Create Eraser.io architecture flowchart (EC2 × 3, RDS, API layer)', due: '1:30 PM today' },
            { owner: 'Mayank', task: 'Select and send royalty-free background music (tech/ambient, blue)', due: '2:00 PM today' },
            { owner: 'Harsh', task: 'Deliver first draft of demo video', due: '6:00 PM today' },
            { owner: 'Mayank', task: 'Perform first pass of the article', due: 'Tonight' },
            { owner: 'Aadity', task: 'Article content cleanup and segregation', due: 'Tomorrow morning' },
        ],
        nextSteps: [
            'All assets must reach Harsh before their respective deadlines — delays directly block video editing.',
            'Internal review on Wednesday 5 PM — all three members to attend.',
            'Final video submission by Friday deadline.',
            'Article to be completed by Mayank tonight and cleaned up by Aadity tomorrow.',
        ],
        speakers: [
            { id: 'SPEAKER_00', name: 'Mayank Sharma', color: '#6366f1', pct: 48, turns: 22, interruptions: 2 },
            { id: 'SPEAKER_01', name: 'Aadity', color: '#06b6d4', pct: 34, turns: 18, interruptions: 3 },
            { id: 'SPEAKER_02', name: 'Harsh', color: '#f59e0b', pct: 18, turns: 10, interruptions: 1 },
        ],
        timeline: [
            { speaker: 'SPEAKER_00', color: '#6366f1', start: 0, end: 2 },
            { speaker: 'SPEAKER_01', color: '#06b6d4', start: 2, end: 3 },
            { speaker: 'SPEAKER_02', color: '#f59e0b', start: 3, end: 4 },
            { speaker: 'SPEAKER_00', color: '#6366f1', start: 4, end: 5 },
            { speaker: 'SPEAKER_01', color: '#06b6d4', start: 5, end: 6 },
            { speaker: 'SPEAKER_00', color: '#6366f1', start: 6, end: 7 },
            { speaker: 'SPEAKER_02', color: '#f59e0b', start: 7, end: 8 },
        ],
        silenceIntervals: [
            { start: 1, end: 2 }, { start: 4, end: 5 },
        ],
        transcript: [
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '00:12', text: "Okay guys, let's start. Aaj hum demo video ke baare mein baat karenge. Friday deadline hai toh hume aaj hi sab plan karna padega." },
            { speakerId: 'SPEAKER_01', speakerName: 'Aadity', color: '#06b6d4', timestamp: '00:38', text: "Haan, main ready hoon. Mujhe pata hai mera kya kya karna hai — mock data, screen recording. Batao kab tak chahiye." },
            { speakerId: 'SPEAKER_02', speakerName: 'Harsh', color: '#f59e0b', timestamp: '01:05', text: "Bhai, mujhe sabse pehle logo chahiye aur ek motion background — without that main editing shuru nahi kar sakta. Yeh meri hard dependency hai." },
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '01:30', text: "Samajh gaya. Logo main 11 baje tak de dunga. Tagline bhi finalize ho gayi hai — 'Meetings se Tasks tak — Automatically'. Yeh use karenge." },
            { speakerId: 'SPEAKER_01', speakerName: 'Aadity', color: '#06b6d4', timestamp: '02:00', text: "Motion background main dekh leta hoon — 12 baje tak confirm kar dunga Telegram pe. Blue theme rakhna hai na?" },
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '02:18', text: "Haan, blue theme hi rakhna hai puri video mein. Aadity, screen recording bhi aaj karni hai — 1080p, 30fps. Sequence important hai: calendar pehle, phir transcription, phir allocation engine, last mein learning dashboard." },
            { speakerId: 'SPEAKER_02', speakerName: 'Harsh', color: '#f59e0b', timestamp: '02:45', text: "Architecture diagram ka kya plan hai? Animation chahiye ya static?" },
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '03:00', text: "Static rakhte hain — Eraser.io pe banaunga. 3 EC2 machines, RDS, aur ScrumFlow API layer. AWS aur RDS logos dalunga. Animation ki zaroorat nahi." },
            { speakerId: 'SPEAKER_01', speakerName: 'Aadity', color: '#06b6d4', timestamp: '04:10', text: "Bhai meri ek concern hai — aaj bohot kuch hai mujhe. Mock data, recording, aur agar article bhi karna pada toh overload ho jayega." },
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '04:35', text: "Article cleanup kal subah kar lena. Aaj main first pass kar dunga raat ko — tum sirf recording aur mock data pe focus karo. Yeh decision final hai." },
            { speakerId: 'SPEAKER_02', speakerName: 'Harsh', color: '#f59e0b', timestamp: '05:00', text: "Complex After Effects animations nahi kar sakta mujhse — experience nahi hai. Toh woh out of scope hi rakhte hain." },
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '05:20', text: "Bilkul theek hai. Simple transitions aur logo animation hi use karenge — that's enough for a 3-minute video." },
            { speakerId: 'SPEAKER_01', speakerName: 'Aadity', color: '#06b6d4', timestamp: '05:48', text: "Review kab hoga? Pehle check-in set karte hain taaki last-minute chaos na ho." },
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '06:05', text: "Wednesday 5 PM pe internal review karenge — Harsh draft share karega, hum feedback denge. Usse pehle sab assets ready hone chahiye." },
            { speakerId: 'SPEAKER_02', speakerName: 'Harsh', color: '#f59e0b', timestamp: '07:30', text: "Background music bhi chahiye mujhe. Royalty-free, tech/ambient vibe — blue aesthetic ke saath match karna chahiye." },
            { speakerId: 'SPEAKER_00', speakerName: 'Mayank Sharma', color: '#6366f1', timestamp: '07:50', text: "Main 2 baje tak bhej dunga music. YouTube reference links bhi 11:30 baje tak share kar dunga Telegram pe — taaki tujhe idea mil sake video style ka." },
        ],
    },
    'M-201': {
        id: 'M-201',
        duration: 58,
        overview: 'Sprint Planning Q1 aligned the Atlas Platform team on 12 deliverables for the upcoming two-week sprint. Scope was locked for OAuth2 PKCE, DB migration phase 1, and performance baselines. The meeting achieved high decision density, reflecting strong preparedness from all participants.',
        keyPoints: [
            'OAuth2 PKCE implementation scoped to 3 endpoints — auth, refresh, and callback.',
            'DB migration Phase 1 limited to read-replica cutover to avoid downtime risk.',
            'CI pipeline threshold raised from 70% to 85% coverage for backend modules.',
            'Cross-team API contract review scheduled before Wednesday merge window.',
            'Dashboard load time target set at <1.2s for P95 on mobile.',
        ],
        decisions: [
            'Adopt PostgreSQL 16 connection pooling via PgBouncer in transaction mode.',
            'Move sprint velocity tracking from Jira to internal ScrumFlow dashboard.',
            'Freeze feature flags for Atlas auth module until T-441 is merged.',
            'Approve 8h buffer for dependency graph visualization task (T-447).',
        ],
        actionItems: [
            { owner: 'Sarah Chen', task: 'Draft OAuth2 PKCE spec document and share for async review', due: '2026-02-17' },
            { owner: 'James Okoye', task: 'Set up PgBouncer config on staging environment', due: '2026-02-18' },
            { owner: 'Marcus Webb', task: 'Run ML feature baseline benchmarks against new schema', due: '2026-02-20' },
            { owner: 'Priya Nair', task: 'Audit current feature flag usage across 3 modules', due: '2026-02-19' },
        ],
        nextSteps: [
            'Daily standup continues at 09:30 — blockers escalated same-day.',
            'Mid-sprint check-in on Feb 21 to review CI pass rate trend.',
            'External API partner notified of schema freeze window.',
        ],
        speakers: [
            { id: 'E-14', name: 'Sarah Chen', color: '#3b82f6', pct: 32, turns: 22, interruptions: 3 },
            { id: 'E-07', name: 'Marcus Webb', color: '#8b5cf6', pct: 28, turns: 18, interruptions: 5 },
            { id: 'E-22', name: 'James Okoye', color: '#06b6d4', pct: 21, turns: 14, interruptions: 2 },
            { id: 'E-31', name: 'Priya Nair', color: '#10b981', pct: 12, turns: 9, interruptions: 1 },
            { id: 'E-45', name: 'Emily Zhao', color: '#f59e0b', pct: 7, turns: 5, interruptions: 0 },
        ],
        timeline: [
            { speaker: 'E-14', color: '#3b82f6', start: 0, end: 8 },
            { speaker: 'E-07', color: '#8b5cf6', start: 8, end: 15 },
            { speaker: 'E-14', color: '#3b82f6', start: 17, end: 24 },
            { speaker: 'E-22', color: '#06b6d4', start: 24, end: 31 },
            { speaker: 'E-07', color: '#8b5cf6', start: 33, end: 39 },
            { speaker: 'E-31', color: '#10b981', start: 39, end: 44 },
            { speaker: 'E-14', color: '#3b82f6', start: 46, end: 53 },
            { speaker: 'E-45', color: '#f59e0b', start: 53, end: 57 },
            { speaker: 'E-22', color: '#06b6d4', start: 57, end: 58 },
        ],
        silenceIntervals: [
            { start: 15, end: 17 }, { start: 31, end: 33 },
            { start: 44, end: 46 }, { start: 7, end: 8 },
        ],
        transcript: [
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '00:12', text: "Alright, let's kick off. I want to start with the OAuth2 PKCE scope — we need to be crisp about what's in this sprint versus what's deferred." },
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '01:04', text: "Agreed. I'd say we scope it to three endpoints max — auth initiation, token exchange, and refresh. Anything beyond that bleeds into the security audit sprint." },
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '01:48', text: "That makes sense. What's the blocker on the DB side? Is PgBouncer config a prerequisite or can we run them in parallel?" },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '02:15', text: "They're independent at the connection layer, but the migration timing matters. Phase 1 is just read-replica cutover — no schema changes." },
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '03:02', text: "I flagged this last week — the feature flags for auth module need a freeze before T-441 merges, otherwise we'll have a race condition in staging." },
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '03:44', text: "Priya's right. Let's formalize that as a decision — freeze feature flags on Atlas auth until the PKCE PR is merged and tested." },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '04:30', text: "Locked. James, can you scope out the PgBouncer staging setup by Wednesday? That gives Marcus runway to run the ML benchmarks on the new schema." },
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '05:01', text: "Wednesday works. I'll also add a config-check script so we don't manually verify connection pool limits every deployment." },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '53:10', text: "One last thing — dashboard P95 target. Are we committing to 1.2s or is that aspirational?" },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '53:48', text: "Commitment. It goes into the sprint definition of done. Priya will verify it in the load test suite before the demo." },
        ],
    },

    'M-200': {
        id: 'M-200',
        duration: 52,
        overview: 'The Phoenix ML model review evaluated current pipeline performance against Q1 accuracy benchmarks. The team identified two underperforming feature groups — temporal embeddings and cross-project signal leakage — and agreed on remediation steps. Training data refresh timeline was extended by 5 days.',
        keyPoints: [
            'Model accuracy on skill-matching tasks dropped 3.2% since last sprint due to stale embeddings.',
            'Cross-project signal leakage identified as root cause for 18% of false positives.',
            'New feature group: recency-weighted completion scores for each employee-task domain.',
            'Evaluation harness needs isolation from production inference pipeline.',
            'Data enrichment from external HR system deferred to Q2 due to API contract delay.',
        ],
        decisions: [
            'Retrain embedding layer using last 90 days of allocation outcome data.',
            'Add data leakage detection step to CI pipeline for all model PRs.',
            'Extend training data label window from 14 to 30 days to improve recency signal.',
            'Monthly model drift alert threshold set at 0.12 (previously 0.15).',
        ],
        actionItems: [
            { owner: 'Marcus Webb', task: 'Rebuild temporal embedding with 90-day window and benchmark', due: '2026-02-20' },
            { owner: 'Emily Zhao', task: 'Write data leakage detection script and add to CI gate', due: '2026-02-18' },
            { owner: 'Marcus Webb', task: 'Document new recency weighting formula in model card', due: '2026-02-21' },
        ],
        nextSteps: [
            'Retrained model to be reviewed by Emily before Friday deployment window.',
            'Drift alert reconfigured in monitoring dashboard by end of day.',
            'Next model review in 3 weeks — tentatively Feb 6.',
        ],
        speakers: [
            { id: 'E-07', name: 'Marcus Webb', color: '#8b5cf6', pct: 41, turns: 24, interruptions: 2 },
            { id: 'E-45', name: 'Emily Zhao', color: '#f59e0b', pct: 38, turns: 20, interruptions: 1 },
            { id: 'E-31', name: 'Priya Nair', color: '#10b981', pct: 14, turns: 8, interruptions: 0 },
            { id: 'E-14', name: 'Sarah Chen', color: '#3b82f6', pct: 7, turns: 4, interruptions: 0 },
        ],
        timeline: [
            { speaker: 'E-07', color: '#8b5cf6', start: 0, end: 12 },
            { speaker: 'E-45', color: '#f59e0b', start: 13, end: 24 },
            { speaker: 'E-07', color: '#8b5cf6', start: 26, end: 34 },
            { speaker: 'E-31', color: '#10b981', start: 35, end: 42 },
            { speaker: 'E-45', color: '#f59e0b', start: 43, end: 49 },
            { speaker: 'E-14', color: '#3b82f6', start: 50, end: 52 },
        ],
        silenceIntervals: [
            { start: 12, end: 13 }, { start: 24, end: 26 }, { start: 34, end: 35 }, { start: 42, end: 43 },
        ],
        transcript: [
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '00:18', text: "Let me pull up the accuracy numbers first. We dropped from 87.4% to 84.2% on skill-match predictions since last sprint. That's a 3.2 point drop — significant enough to investigate before we expand the model." },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '01:10', text: "I dug into the false positives. About 18% of them share a pattern — predictions where the recommended engineer had never worked on that project, but had worked on an adjacent one. Classic signal leakage." },
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '02:00', text: "That's consistent with what I saw in the embedding space. The cross-project feature vector isn't being normalized correctly. We're essentially letting project B's history bleed into project A's prediction." },
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '02:55', text: "Can we add a CI gate for this? Something that checks for leakage on every model PR before it lands?" },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '03:30', text: "Yes — I'll write a detection script. It's basically a correlation check between held-out project features and predictions. I can have it done by Tuesday." },
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '04:12', text: "Perfect. Meanwhile I'll rebuild the temporal embedding layer with a 90-day window instead of 14. That should also fix the recency weighting issue we saw in the November data." },
        ],
    },

    'M-199': {
        id: 'M-199',
        duration: 47,
        overview: 'API Architecture Deep Dive resolved three open design questions for the Titan API Gateway — rate limiting strategy, auth token lifecycle, and service mesh routing. This was the highest decision-density meeting in the current quarter at 3.2 decisions/minute.',
        keyPoints: [
            'Token-bucket rate limiting chosen over leaky-bucket for burst tolerance at API edge.',
            'JWT expiry set to 15 minutes with rolling refresh to balance security and UX.',
            'Envoy selected as service mesh proxy — configuration managed via GitOps workflow.',
            'Idempotency keys required on all POST and PATCH endpoints from this sprint.',
            'Gateway health endpoint response time SLA set at <80ms P99.',
        ],
        decisions: [
            'Implement token-bucket rate limiter at the Nginx edge layer.',
            'Use Envoy sidecar pattern with Istio control plane for internal routing.',
            'All public API responses to include X-RateLimit-* headers.',
            'Deprecation policy: 6-month notice with automated client notifications.',
        ],
        actionItems: [
            { owner: 'James Okoye', task: 'Implement token-bucket rate limiter with configurable burst limits', due: '2026-02-17' },
            { owner: 'Sarah Chen', task: 'Write Envoy sidecar GitOps config template and review', due: '2026-02-19' },
            { owner: 'Emily Zhao', task: 'Add X-RateLimit header tests to API integration test suite', due: '2026-02-18' },
            { owner: 'James Okoye', task: 'Document JWT lifecycle decisions in API design doc', due: '2026-02-20' },
        ],
        nextSteps: [
            'Architecture decision record (ADR) to be filed in repo by Friday.',
            'Load test simulating 10k RPS scheduled for pre-release environment next week.',
            'Partner API clients notified of upcoming idempotency key requirement.',
        ],
        speakers: [
            { id: 'E-22', name: 'James Okoye', color: '#06b6d4', pct: 38, turns: 26, interruptions: 4 },
            { id: 'E-14', name: 'Sarah Chen', color: '#3b82f6', pct: 31, turns: 19, interruptions: 2 },
            { id: 'E-45', name: 'Emily Zhao', color: '#f59e0b', pct: 22, turns: 14, interruptions: 1 },
            { id: 'E-31', name: 'Priya Nair', color: '#10b981', pct: 9, turns: 6, interruptions: 0 },
        ],
        timeline: [
            { speaker: 'E-22', color: '#06b6d4', start: 0, end: 11 },
            { speaker: 'E-14', color: '#3b82f6', start: 12, end: 21 },
            { speaker: 'E-45', color: '#f59e0b', start: 22, end: 30 },
            { speaker: 'E-22', color: '#06b6d4', start: 31, end: 38 },
            { speaker: 'E-31', color: '#10b981', start: 39, end: 43 },
            { speaker: 'E-14', color: '#3b82f6', start: 44, end: 47 },
        ],
        silenceIntervals: [
            { start: 11, end: 12 }, { start: 21, end: 22 }, { start: 30, end: 31 }, { start: 38, end: 39 },
        ],
        transcript: [
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '00:20', text: "First agenda item: rate limiting. We've been going back and forth on leaky bucket vs token bucket. I want to make a call today." },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '01:08', text: "Token bucket handles burst traffic better. If a client legitimately needs to send 50 requests in 2 seconds and our limit is 100/min, leaky bucket would throttle them unnecessarily." },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '01:52', text: "Agreed. Token bucket it is. We can set the burst window at 10 seconds and configure per-client limits. That gives us flexibility without over-engineering." },
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '02:30', text: "Decided. Moving to JWT lifecycle. 15-minute expiry with rolling refresh — the security team signed off on this last week." },
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '03:15', text: "Rolling refresh means we need to handle the edge case where a refresh token is used twice within the window. We should invalidate the first token immediately on refresh." },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '03:58', text: "That's standard — single-use refresh tokens. We'll store the jti claim in Redis with a short TTL. James, can that go into the same PR as rate limiting?" },
        ],
    },

    'M-198': {
        id: 'M-198',
        duration: 41,
        overview: 'Dashboard Refinement session focused on resolving UX inconsistencies across the Nova Dashboard module. Four interaction patterns were standardized and the performance bottleneck in chart rendering was traced to unoptimized Recharts re-renders on filter changes.',
        keyPoints: [
            'Hover state behavior standardized: 150ms delay before tooltip appears across all charts.',
            'Chart skeleton loaders introduced for perceived performance improvement.',
            'Filter state now persisted in URL query params for shareability.',
            'Empty state illustrations redesigned — consistent icon + text pattern throughout.',
            'Mobile breakpoint threshold moved from 768px to 820px for tablet compatibility.',
        ],
        decisions: [
            'Memoize all chart components with React.memo and useMemo for filters.',
            'Replace inline SVGs with sprite sheet to reduce bundle size by ~18KB.',
            'Adopt SWR for data fetching with 30-second revalidation on dashboard panels.',
            'Deprecate legacy table component — migrate all instances to DataTable.jsx by sprint end.',
        ],
        actionItems: [
            { owner: 'Priya Nair', task: 'Audit all Recharts components and add React.memo wrappers', due: '2026-02-14' },
            { owner: 'Emily Zhao', task: 'Migrate 6 legacy table instances to DataTable.jsx', due: '2026-02-17' },
            { owner: 'Priya Nair', task: 'Implement URL-persisted filter state for dashboard filters', due: '2026-02-15' },
        ],
        nextSteps: [
            'Performance audit scheduled after memoization changes — target: <100ms re-render.',
            'UX review with stakeholders on empty state designs next Thursday.',
        ],
        speakers: [
            { id: 'E-31', name: 'Priya Nair', color: '#10b981', pct: 44, turns: 20, interruptions: 1 },
            { id: 'E-45', name: 'Emily Zhao', color: '#f59e0b', pct: 36, turns: 16, interruptions: 0 },
            { id: 'E-14', name: 'Sarah Chen', color: '#3b82f6', pct: 20, turns: 9, interruptions: 0 },
        ],
        timeline: [
            { speaker: 'E-31', color: '#10b981', start: 0, end: 14 },
            { speaker: 'E-45', color: '#f59e0b', start: 15, end: 26 },
            { speaker: 'E-14', color: '#3b82f6', start: 28, end: 35 },
            { speaker: 'E-31', color: '#10b981', start: 36, end: 41 },
        ],
        silenceIntervals: [
            { start: 14, end: 15 }, { start: 26, end: 28 }, { start: 35, end: 36 },
        ],
        transcript: [
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '00:30', text: "I profiled the filter interactions this morning. Every time a user changes a filter, the entire chart tree re-renders — we're talking 400ms+ for some panels. That's unacceptable." },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '01:20', text: "I saw that too. The root cause is that filter state lives at the page level and isn't memoized, so every child component re-renders on every keystroke." },
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '02:05', text: "React.memo on the chart components plus useMemo on the filtered dataset. That should cut re-renders by about 80% for static chart props." },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '02:50', text: "Let's also add skeleton loaders — even if the render is fast, users perceive it as slow if there's no feedback. The chart area should flash a skeleton on every filter change." },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '03:35', text: "And while we're at it — URL-persisted filters. If I filter by Atlas Platform and share the URL, the recipient should see the same filtered state. We're missing that entirely." },
        ],
    },

    'M-197': {
        id: 'M-197',
        duration: 55,
        overview: 'Quarterly Business Review for Ember Analytics covered Q1 OKR attainment, budget utilization, and roadmap re-prioritization. Revenue impact metrics from the analytics pipeline went live and were presented for the first time to leadership.',
        keyPoints: [
            'Q1 OKR attainment at 73% — on track for amber status with 6 weeks remaining.',
            'Event tracking pipeline processed 2.4M events/day in week 1 — 20% above forecast.',
            'Two features deprioritized: real-time cohort builder and custom retention windows.',
            'Infrastructure costs 12% over budget due to unplanned data egress charges.',
            'Customer NPS for analytics features: 48 (target: 52).',
        ],
        decisions: [
            'Prioritize anomaly detection feature for Q1 completion — drop cohort builder to Q2.',
            'Negotiate egress cost reduction with cloud provider — escalate to infrastructure team.',
            'Set NPS improvement target to 52 by end of Q1 with bi-weekly measurement.',
            'Freeze new feature intake until current sprint backlog drops below 40 items.',
        ],
        actionItems: [
            { owner: 'Marcus Webb', task: 'Prepare cloud egress cost analysis and vendor negotiation brief', due: '2026-02-14' },
            { owner: 'Emily Zhao', task: 'Scope anomaly detection MVP for Q1 sprint inclusion', due: '2026-02-12' },
            { owner: 'James Okoye', task: 'Set up bi-weekly NPS measurement pipeline', due: '2026-02-17' },
        ],
        nextSteps: [
            'Follow-up QBR with product leadership scheduled for Feb 21.',
            'Anomaly detection scope review in next sprint planning session.',
            'Cloud cost brief reviewed by CFO office before vendor call.',
        ],
        speakers: [
            { id: 'E-07', name: 'Marcus Webb', color: '#8b5cf6', pct: 35, turns: 18, interruptions: 2 },
            { id: 'E-22', name: 'James Okoye', color: '#06b6d4', pct: 28, turns: 15, interruptions: 1 },
            { id: 'E-45', name: 'Emily Zhao', color: '#f59e0b', pct: 24, turns: 12, interruptions: 0 },
            { id: 'E-31', name: 'Priya Nair', color: '#10b981', pct: 13, turns: 7, interruptions: 0 },
        ],
        timeline: [
            { speaker: 'E-07', color: '#8b5cf6', start: 0, end: 14 },
            { speaker: 'E-22', color: '#06b6d4', start: 15, end: 27 },
            { speaker: 'E-45', color: '#f59e0b', start: 29, end: 41 },
            { speaker: 'E-07', color: '#8b5cf6', start: 43, end: 50 },
            { speaker: 'E-31', color: '#10b981', start: 51, end: 55 },
        ],
        silenceIntervals: [
            { start: 14, end: 15 }, { start: 27, end: 29 }, { start: 41, end: 43 }, { start: 50, end: 51 },
        ],
        transcript: [
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '00:45', text: "Q1 OKR attainment is at 73%. We're amber — which means on track but not comfortable. The big variable is anomaly detection, which was scoped late." },
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '01:40', text: "The event pipeline is actually ahead of forecast — 2.4M events per day in week 1 versus the 2M we projected. That's a good signal for the infrastructure design." },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '02:30', text: "But that volume also contributed to the egress cost overrun. We're 12% over on infrastructure. The unplanned data egress from cross-region replication wasn't in the original estimate." },
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '03:20', text: "We should escalate the egress negotiation now rather than absorb it. I'll put together a brief for the vendor call — we're a significant enough customer for a discount conversation." },
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '51:10', text: "One thing I want to flag — NPS at 48 versus a target of 52. The gap is mostly in 'time-to-insight' feedback. Users love the data quality but find the UI slow on complex filters." },
        ],
    },

    'M-196': {
        id: 'M-196',
        duration: 62,
        overview: 'Infrastructure Scaling Plan session defined the Atlas Platform scaling strategy for projected 3x traffic growth in Q2. Auto-scaling policies, database connection limits, and CDN configuration were all finalized.',
        keyPoints: [
            'Horizontal pod auto-scaler configured for 2–12 replicas based on CPU/memory thresholds.',
            'Database connection pool size doubled from 50 to 100 per replica.',
            'Static assets moved to edge CDN — expected 40% reduction in origin load.',
            'Queue-based job system introduced to decouple heavy computation from request path.',
            'Canary deploy strategy adopted for all infrastructure changes going forward.',
        ],
        decisions: [
            'Set HPA scale-out threshold at 70% CPU, scale-in at 40%.',
            'Adopt Redis Cluster mode for session storage (replacing single-node Redis).',
            'CDN provider switched to CloudFront from Cloudflare for cost optimization.',
            'All infra changes must pass load test at 3x baseline before merging.',
        ],
        actionItems: [
            { owner: 'James Okoye', task: 'Configure HPA policies and test scale-out under synthetic load', due: '2026-02-10' },
            { owner: 'Sarah Chen', task: 'Migrate session storage to Redis Cluster in staging', due: '2026-02-12' },
            { owner: 'Marcus Webb', task: 'Set up CloudFront distribution and cache invalidation workflow', due: '2026-02-11' },
            { owner: 'Emily Zhao', task: 'Write load test suite for 3x baseline using k6', due: '2026-02-09' },
        ],
        nextSteps: [
            'Load test results reviewed in next architecture sync.',
            'Redis Cluster migration rollback plan documented before merge.',
            'CDN DNS cutover scheduled for non-peak window (Sunday 02:00 UTC).',
        ],
        speakers: [
            { id: 'E-22', name: 'James Okoye', color: '#06b6d4', pct: 36, turns: 22, interruptions: 3 },
            { id: 'E-14', name: 'Sarah Chen', color: '#3b82f6', pct: 30, turns: 18, interruptions: 2 },
            { id: 'E-07', name: 'Marcus Webb', color: '#8b5cf6', pct: 22, turns: 13, interruptions: 1 },
            { id: 'E-45', name: 'Emily Zhao', color: '#f59e0b', pct: 12, turns: 7, interruptions: 0 },
        ],
        timeline: [
            { speaker: 'E-22', color: '#06b6d4', start: 0, end: 16 },
            { speaker: 'E-14', color: '#3b82f6', start: 17, end: 31 },
            { speaker: 'E-07', color: '#8b5cf6', start: 33, end: 47 },
            { speaker: 'E-22', color: '#06b6d4', start: 48, end: 56 },
            { speaker: 'E-45', color: '#f59e0b', start: 57, end: 62 },
        ],
        silenceIntervals: [
            { start: 16, end: 17 }, { start: 31, end: 33 }, { start: 47, end: 48 }, { start: 56, end: 57 },
        ],
        transcript: [
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '00:35', text: "The baseline for this scaling plan is 3x our current peak traffic — roughly 18k RPM. Everything we decide today needs to hold at that number without manual intervention." },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '01:30', text: "HPA is the right answer for compute. The question is threshold calibration. 70% CPU for scale-out gives us headroom without being too conservative." },
            { speakerId: 'E-07', speakerName: 'Marcus Webb', color: '#8b5cf6', timestamp: '02:20', text: "Agreed on 70%. For scale-in I'd say 40% — let the pool shrink aggressively when demand drops, otherwise we're paying for idle replicas." },
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '03:10', text: "Redis Cluster mode is non-negotiable for session storage at this scale. Single-node Redis has been our biggest single point of failure risk for 6 months." },
            { speakerId: 'E-45', speakerName: 'Emily Zhao', color: '#f59e0b', timestamp: '57:40', text: "I'll write the k6 load test suite. What's the deadline before the CDN cutover window?" },
        ],
    },

    'M-195': {
        id: 'M-195',
        duration: 38,
        overview: 'Auth Service Integration session completed the design handoff for the Zenith Auth module integration with Atlas Platform. OAuth scopes, webhook callbacks, and error handling contracts were all agreed upon.',
        keyPoints: [
            'OAuth 2.0 scope set: read:profile, write:tasks, admin:team — no wildcard scopes allowed.',
            'Webhook delivery uses exponential backoff: 1s, 5s, 30s, then dead-letter queue.',
            'Auth error codes standardized to RFC 6749 error response format.',
            'Integration test environment provisioned with sandbox credentials.',
            'Token introspection endpoint available for resource server validation.',
        ],
        decisions: [
            'No wildcard OAuth scopes — explicit scope declaration required for all integrations.',
            'Dead-letter queue for failed webhooks with 72-hour retention.',
            'Shared error code registry to be maintained in API documentation.',
            'Integration certification process introduced before production access granted.',
        ],
        actionItems: [
            { owner: 'Sarah Chen', task: 'Document OAuth scope definitions in developer portal', due: '2026-02-07' },
            { owner: 'Priya Nair', task: 'Set up sandbox environment with test credentials for Atlas integration', due: '2026-02-06' },
            { owner: 'James Okoye', task: 'Implement dead-letter queue for webhook delivery failures', due: '2026-02-10' },
        ],
        nextSteps: [
            'Atlas Platform team to begin integration using sandbox credentials.',
            'First integration certification review scheduled for Feb 14.',
            'Error code registry PR open for review by all backend engineers.',
        ],
        speakers: [
            { id: 'E-14', name: 'Sarah Chen', color: '#3b82f6', pct: 42, turns: 18, interruptions: 1 },
            { id: 'E-31', name: 'Priya Nair', color: '#10b981', pct: 35, turns: 14, interruptions: 0 },
            { id: 'E-22', name: 'James Okoye', color: '#06b6d4', pct: 23, turns: 9, interruptions: 0 },
        ],
        timeline: [
            { speaker: 'E-14', color: '#3b82f6', start: 0, end: 12 },
            { speaker: 'E-31', color: '#10b981', start: 13, end: 24 },
            { speaker: 'E-22', color: '#06b6d4', start: 25, end: 33 },
            { speaker: 'E-14', color: '#3b82f6', start: 34, end: 38 },
        ],
        silenceIntervals: [
            { start: 12, end: 13 }, { start: 24, end: 25 }, { start: 33, end: 34 },
        ],
        transcript: [
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '00:22', text: "The main thing to nail today is scope granularity. Atlas needs at minimum read:profile and write:tasks. The admin:team scope is optional depending on the integration pattern." },
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '01:10', text: "No wildcards — that's a hard line from the security review. Every integration has to declare explicit scopes. We'll enforce this at the registration step." },
            { speakerId: 'E-22', speakerName: 'James Okoye', color: '#06b6d4', timestamp: '02:00', text: "Webhook delivery — I want to propose exponential backoff. Start at 1 second, then 5, then 30. After 3 failures, route to dead-letter queue with 72-hour retention." },
            { speakerId: 'E-14', speakerName: 'Sarah Chen', color: '#3b82f6', timestamp: '02:50', text: "That works. And the DLQ needs to be observable — we should expose a webhook failure dashboard so integrators can diagnose issues without calling support." },
            { speakerId: 'E-31', speakerName: 'Priya Nair', color: '#10b981', timestamp: '03:40', text: "Agreed. I'll make sure the sandbox environment is up by Thursday — Priya will send credentials directly to the Atlas integration lead." },
        ],
    },
};

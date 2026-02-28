// ─── Projects ────────────────────────────────────────────────────────────────
export const PROJECTS = [
    { id: 'P-001', name: 'Atlas Platform', color: '#3b82f6', status: 'active', budget: 480000, budgetTier: 'high' },
    { id: 'P-002', name: 'Phoenix ML', color: '#8b5cf6', status: 'active', budget: 220000, budgetTier: 'medium' },
    { id: 'P-003', name: 'Nova Dashboard', color: '#06b6d4', status: 'active', budget: 95000, budgetTier: 'low' },
    { id: 'P-004', name: 'Titan API Gateway', color: '#f59e0b', status: 'active', budget: 350000, budgetTier: 'high' },
    { id: 'P-005', name: 'Ember Analytics', color: '#10b981', status: 'active', budget: 140000, budgetTier: 'medium' },
    { id: 'P-006', name: 'Zenith Auth', color: '#f43f5e', status: 'completed', budget: 75000, budgetTier: 'low' },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const DASHBOARD_METRICS = {
    activeProjects: 5,
    upcomingMeetings: 8,
    pendingAllocations: 12,
    acceptanceRate: 82.4,
};

export const RECENT_ALLOCATIONS = [
    { id: 'A-2841', taskId: 'T-441', assignee: 'Sarah Chen', confidence: 91, status: 'accepted', timestamp: '2026-02-20T14:30:00Z' },
    { id: 'A-2840', taskId: 'T-438', assignee: 'Marcus Webb', confidence: 78, status: 'pending', timestamp: '2026-02-20T13:15:00Z' },
    { id: 'A-2839', taskId: 'T-435', assignee: 'Priya Nair', confidence: 65, status: 'overridden', timestamp: '2026-02-20T11:00:00Z' },
    { id: 'A-2838', taskId: 'T-432', assignee: 'James Okoye', confidence: 88, status: 'accepted', timestamp: '2026-02-20T09:20:00Z' },
    { id: 'A-2837', taskId: 'T-429', assignee: 'Emily Zhao', confidence: 74, status: 'rejected', timestamp: '2026-02-19T17:45:00Z' },
];

export const RECENT_MEETINGS_IMPORTANCE = [
    { id: 'M-201', title: 'Sprint Planning Q1', project: 'Atlas Platform', importanceScore: 94, projectId: 'P-001' },
    { id: 'M-200', title: 'ML Model Review', project: 'Phoenix ML', importanceScore: 87, projectId: 'P-002' },
    { id: 'M-199', title: 'API Architecture', project: 'Titan API Gateway', importanceScore: 82, projectId: 'P-004' },
    { id: 'M-198', title: 'Dashboard Refinement', project: 'Nova Dashboard', importanceScore: 71, projectId: 'P-003' },
    { id: 'M-197', title: 'Quarterly Business Review', project: 'Ember Analytics', importanceScore: 65, projectId: 'P-005' },
];

export const ACCURACY_TREND = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2026, 0, i + 22).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    accuracy: Math.round(75 + Math.random() * 15 + i * 0.2),
    overrideRate: Math.round(15 + Math.random() * 10 - i * 0.15),
}));

// ─── Meetings ─────────────────────────────────────────────────────────────────
export const UPCOMING_MEETINGS = [
    {
        id: 'M-210', title: 'Sprint Planning – Q1 Wk3', projectId: 'P-001', project: 'Atlas Platform',
        date: '2026-02-21', time: '10:00', duration: 60, budgetTier: 'high',
        daysToDeadline: 3, importanceScore: 88,
        participants: ['Sarah Chen', 'James Okoye', 'Marcus Webb', 'Priya Nair'],
        description: 'Plan tasks for the upcoming sprint within the Atlas Platform.',
    },
    {
        id: 'M-211', title: 'ML Pipeline Architecture Review', projectId: 'P-002', project: 'Phoenix ML',
        date: '2026-02-22', time: '14:00', duration: 90, budgetTier: 'medium',
        daysToDeadline: 7, importanceScore: 76,
        participants: ['Emily Zhao', 'Marcus Webb'],
        description: 'Review the ML pipeline design for Phoenix ML.',
    },
    {
        id: 'M-212', title: 'API Security Audit', projectId: 'P-004', project: 'Titan API Gateway',
        date: '2026-02-23', time: '11:00', duration: 45, budgetTier: 'high',
        daysToDeadline: 2, importanceScore: 95,
        participants: ['James Okoye', 'Emily Zhao', 'Sarah Chen'],
        description: 'Audit API security configurations and implement patches.',
    },
    {
        id: 'M-213', title: 'Nova Dashboard UX Review', projectId: 'P-003', project: 'Nova Dashboard',
        date: '2026-02-24', time: '13:00', duration: 60, budgetTier: 'low',
        daysToDeadline: 14, importanceScore: 62,
        participants: ['Priya Nair', 'Sarah Chen'],
        description: 'Review UX designs for the Nova Dashboard.',
    },
    {
        id: 'M-214', title: 'Analytics Data Pipeline', projectId: 'P-005', project: 'Ember Analytics',
        date: '2026-02-25', time: '09:30', duration: 75, budgetTier: 'medium',
        daysToDeadline: 10, importanceScore: 71,
        participants: ['Marcus Webb', 'James Okoye', 'Priya Nair'],
        description: 'Set up the analytics data pipeline for Ember Analytics.',
    },
    {
        id: 'M-215', title: 'Cross-team Dependency Review', projectId: 'P-001', project: 'Atlas Platform',
        date: '2026-02-26', time: '15:00', duration: 30, budgetTier: 'high',
        daysToDeadline: 5, importanceScore: 80,
        participants: ['Sarah Chen', 'James Okoye'],
        description: 'Review cross-team dependencies for Atlas Platform release.',
    },
    {
        id: 'M-216', title: 'Stakeholder Roadmap Sync', projectId: 'P-002', project: 'Phoenix ML',
        date: '2026-02-27', time: '10:00', duration: 90, budgetTier: 'medium',
        daysToDeadline: 20, importanceScore: 68,
        participants: ['Emily Zhao', 'Priya Nair', 'Marcus Webb'],
        description: 'Sync on roadmap priorities and timeline with stakeholders.',
    },
];

export const PREVIOUS_MEETINGS = [
    {
        id: 'M-201', title: 'Sprint Planning Q1', project: 'Atlas Platform', projectId: 'P-001',
        date: '2026-02-14', budgetTier: 'high', daysToDeadline: 5,
        decisionDensity: 2.8, importanceScore: 94, taskCreated: 12,
    },
    {
        id: 'M-200', title: 'ML Model Review', project: 'Phoenix ML', projectId: 'P-002',
        date: '2026-02-13', budgetTier: 'medium', daysToDeadline: 10,
        decisionDensity: 1.9, importanceScore: 87, taskCreated: 7,
    },
    {
        id: 'M-199', title: 'API Architecture Deep Dive', project: 'Titan API Gateway', projectId: 'P-004',
        date: '2026-02-12', budgetTier: 'high', daysToDeadline: 3,
        decisionDensity: 3.2, importanceScore: 92, taskCreated: 15,
    },
    {
        id: 'M-198', title: 'Dashboard Refinement', project: 'Nova Dashboard', projectId: 'P-003',
        date: '2026-02-10', budgetTier: 'low', daysToDeadline: 21,
        decisionDensity: 0.9, importanceScore: 71, taskCreated: 4,
    },
    {
        id: 'M-197', title: 'Quarterly Business Review', project: 'Ember Analytics', projectId: 'P-005',
        date: '2026-02-07', budgetTier: 'medium', daysToDeadline: 15,
        decisionDensity: 1.2, importanceScore: 65, taskCreated: 6,
    },
    {
        id: 'M-196', title: 'Infrastructure Scaling Plan', project: 'Atlas Platform', projectId: 'P-001',
        date: '2026-02-05', budgetTier: 'high', daysToDeadline: 7,
        decisionDensity: 2.4, importanceScore: 88, taskCreated: 10,
    },
    {
        id: 'M-195', title: 'Auth Service Integration', project: 'Zenith Auth', projectId: 'P-006',
        date: '2026-02-03', budgetTier: 'low', daysToDeadline: 30,
        decisionDensity: 0.7, importanceScore: 58, taskCreated: 3,
    },
];

// ─── Speaker Metrics ──────────────────────────────────────────────────────────
export const SPEAKERS = [
    { id: 'E-14', name: 'Sarah Chen', speakingPct: 32, turns: 22, interruptions: 3, color: '#3b82f6' },
    { id: 'E-07', name: 'Marcus Webb', speakingPct: 28, turns: 18, interruptions: 5, color: '#8b5cf6' },
    { id: 'E-22', name: 'James Okoye', speakingPct: 21, turns: 14, interruptions: 2, color: '#06b6d4' },
    { id: 'E-31', name: 'Priya Nair', speakingPct: 12, turns: 9, interruptions: 1, color: '#10b981' },
    { id: 'E-45', name: 'Emily Zhao', speakingPct: 7, turns: 5, interruptions: 0, color: '#f59e0b' },
];

export const SPEAKER_TIMELINE = [
    { speaker: 'E-14', start: 0, end: 8, color: '#3b82f6' },
    { speaker: 'E-07', start: 8, end: 15, color: '#8b5cf6' },
    { speaker: 'E-14', start: 17, end: 24, color: '#3b82f6' },
    { speaker: 'E-22', start: 24, end: 31, color: '#06b6d4' },
    { speaker: 'E-07', start: 33, end: 39, color: '#8b5cf6' },
    { speaker: 'E-31', start: 39, end: 44, color: '#10b981' },
    { speaker: 'E-14', start: 46, end: 53, color: '#3b82f6' },
    { speaker: 'E-45', start: 53, end: 57, color: '#f59e0b' },
    { speaker: 'E-22', start: 57, end: 60, color: '#06b6d4' },
];

// ─── Silence Metrics ──────────────────────────────────────────────────────────
export const SILENCE_METRICS = {
    totalDuration: '4:32',
    avgGap: 6.3,
    frequency: 18,
    longestGap: 14,
};

export const SILENCE_HISTOGRAM = [
    { bucket: '2-4s', count: 7 },
    { bucket: '4-6s', count: 5 },
    { bucket: '6-8s', count: 3 },
    { bucket: '8-10s', count: 2 },
    { bucket: '>10s', count: 1 },
];

// ─── Tasks ────────────────────────────────────────────────────────────────────
export const TASKS = [
    {
        id: 'T-441', title: 'Implement OAuth2 PKCE Flow', projectId: 'P-001', project: 'Atlas Platform',
        complexity: 8, complexityLabel: 'High', blocking: 3, blockedBy: 1,
        crossTeamImpact: 2, historicalCompletion: 74, status: 'active',
        age: 12, estimatedHours: 16, dependencies: ['T-430', 'T-433'], assignee: 'Sarah Chen',
        description: 'Implement OAuth2 PKCE flow for secure client-side authentication.',
    },
    {
        id: 'T-438', title: 'Design ML Feature Pipeline', projectId: 'P-002', project: 'Phoenix ML',
        complexity: 7, complexityLabel: 'High', blocking: 2, blockedBy: 0,
        crossTeamImpact: 3, historicalCompletion: 68, status: 'open',
        age: 18, estimatedHours: 32, dependencies: [], assignee: null,
        description: 'Design and implement the ML feature extraction pipeline.',
    },
    {
        id: 'T-435', title: 'Set up CI/CD Pipeline', projectId: 'P-004', project: 'Titan API Gateway',
        complexity: 5, complexityLabel: 'Med', blocking: 4, blockedBy: 1,
        crossTeamImpact: 1, historicalCompletion: 91, status: 'assigned',
        age: 22, estimatedHours: 8, dependencies: ['T-431'], assignee: 'Priya Nair',
        description: 'Configure CI/CD pipeline for automated deployment.',
    },
    {
        id: 'T-432', title: 'API Rate Limiting', projectId: 'P-004', project: 'Titan API Gateway',
        complexity: 4, complexityLabel: 'Med', blocking: 1, blockedBy: 2,
        crossTeamImpact: 0, historicalCompletion: 83, status: 'active',
        age: 9, estimatedHours: 6, dependencies: ['T-425', 'T-426'], assignee: 'James Okoye',
        description: 'Implement rate limiting for API endpoints.',
    },
    {
        id: 'T-429', title: 'Dashboard Performance Optimization', projectId: 'P-003', project: 'Nova Dashboard',
        complexity: 3, complexityLabel: 'Low', blocking: 0, blockedBy: 1,
        crossTeamImpact: 0, historicalCompletion: 95, status: 'blocked',
        age: 31, estimatedHours: 4, dependencies: ['T-415'], assignee: 'Emily Zhao',
        description: 'Optimize dashboard loading performance by 40%.',
    },
    {
        id: 'T-426', title: 'Analytics Event Tracking', projectId: 'P-005', project: 'Ember Analytics',
        complexity: 6, complexityLabel: 'Med', blocking: 2, blockedBy: 0,
        crossTeamImpact: 4, historicalCompletion: 79, status: 'open',
        age: 5, estimatedHours: 12, dependencies: [], assignee: null,
        description: 'Implement comprehensive event tracking for analytics.',
    },
    {
        id: 'T-422', title: 'Database Schema Migration', projectId: 'P-001', project: 'Atlas Platform',
        complexity: 9, complexityLabel: 'High', blocking: 5, blockedBy: 0,
        crossTeamImpact: 3, historicalCompletion: 61, status: 'open',
        age: 45, estimatedHours: 24, dependencies: [], assignee: null,
        description: 'Migrate legacy database schema to new normalized structure.',
    },
    {
        id: 'T-419', title: 'Email Notification Service', projectId: 'P-001', project: 'Atlas Platform',
        complexity: 2, complexityLabel: 'Low', blocking: 0, blockedBy: 1,
        crossTeamImpact: 1, historicalCompletion: 97, status: 'complete',
        age: 60, estimatedHours: 3, dependencies: ['T-410'], assignee: 'Sarah Chen',
        description: 'Build email notification microservice.',
    },
];

// ─── Task Graph Nodes ─────────────────────────────────────────────────────────
export const GRAPH_NODES = [
    { id: 'T-441', label: 'OAuth2 PKCE', status: 'active', complexity: 8, x: 400, y: 80 },
    { id: 'T-438', label: 'ML Pipeline', status: 'open', complexity: 7, x: 200, y: 200 },
    { id: 'T-435', label: 'CI/CD Setup', status: 'assigned', complexity: 5, x: 600, y: 200 },
    { id: 'T-432', label: 'Rate Limiting', status: 'active', complexity: 4, x: 400, y: 320 },
    { id: 'T-429', label: 'Dashboard Perf', status: 'blocked', complexity: 3, x: 150, y: 420 },
    { id: 'T-426', label: 'Event Tracking', status: 'open', complexity: 6, x: 600, y: 400 },
    { id: 'T-422', label: 'DB Migration', status: 'open', complexity: 9, x: 200, y: 80 },
    { id: 'T-419', label: 'Email Service', status: 'complete', complexity: 2, x: 700, y: 80 },
];

export const GRAPH_EDGES = [
    { from: 'T-422', to: 'T-441' },
    { from: 'T-441', to: 'T-432' },
    { from: 'T-432', to: 'T-429' },
    { from: 'T-438', to: 'T-429' },
    { from: 'T-435', to: 'T-432' },
    { from: 'T-426', to: 'T-435' },
    { from: 'T-419', to: 'T-435' },
];

// ─── Allocations ──────────────────────────────────────────────────────────────
export const PENDING_ALLOCATIONS = [
    {
        id: 'A-2840', taskId: 'T-438', taskTitle: 'Design ML Feature Pipeline',
        assignee: { name: 'Marcus Webb', role: 'Senior ML Engineer', id: 'E-07' },
        skillMatch: 87, loadFit: 72, confidence: 78,
        reasoning: [
            'Highest ML skill match in available pool (87%)',
            'Current task load (30h/week) near team median (32h)',
            'Previously completed 4 related ML pipeline tasks',
            'Certified in TensorFlow and Scikit-learn',
            'Available bandwidth of 10h/week for this sprint',
        ],
        alternatives: [
            { name: 'Emily Zhao', id: 'E-45', skillMatch: 71, loadFit: 85 },
            { name: 'Priya Nair', id: 'E-31', skillMatch: 63, loadFit: 90 },
        ],
    },
    {
        id: 'A-2843', taskId: 'T-422', taskTitle: 'Database Schema Migration',
        assignee: { name: 'James Okoye', role: 'Backend Engineer', id: 'E-22' },
        skillMatch: 94, loadFit: 68, confidence: 85,
        reasoning: [
            'Highest backend DB skill match in pool (94%)',
            'Led 3 previous schema migrations successfully',
            'Current load (28h/week) below team median (35h)',
            'Expert in PostgreSQL schema design patterns',
        ],
        alternatives: [
            { name: 'Sarah Chen', id: 'E-14', skillMatch: 82, loadFit: 55 },
            { name: 'Marcus Webb', id: 'E-07', skillMatch: 67, loadFit: 72 },
        ],
    },
    {
        id: 'A-2844', taskId: 'T-426', taskTitle: 'Analytics Event Tracking',
        assignee: { name: 'Emily Zhao', role: 'Data Engineer', id: 'E-45' },
        skillMatch: 79, loadFit: 88, confidence: 64,
        reasoning: [
            'Strong analytics domain expertise (segment, mixpanel)',
            'Lowest utilization in team (22h/week)',
            'Completed similar tracking task T-391 in sprint 8',
        ],
        alternatives: [
            { name: 'Priya Nair', id: 'E-31', skillMatch: 68, loadFit: 92 },
        ],
    },
];

export const ACCEPTED_ALLOCATIONS = [
    { id: 'A-2841', taskId: 'T-441', assignee: 'Sarah Chen', confidence: 91, status: 'active', acceptedDate: '2026-02-19' },
    { id: 'A-2839', taskId: 'T-435', assignee: 'Priya Nair', confidence: 65, status: 'active', acceptedDate: '2026-02-18', overridden: true },
    { id: 'A-2838', taskId: 'T-432', assignee: 'James Okoye', confidence: 88, status: 'done', acceptedDate: '2026-02-17' },
    { id: 'A-2835', taskId: 'T-419', assignee: 'Sarah Chen', confidence: 92, status: 'done', acceptedDate: '2026-02-15' },
    { id: 'A-2833', taskId: 'T-415', assignee: 'Marcus Webb', confidence: 71, status: 'blocked', acceptedDate: '2026-02-14' },
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

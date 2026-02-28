'use client';

import { useState } from 'react';
import { TASKS, PROJECTS } from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import { ArrowUpDown, ChevronUp, ChevronDown, X, GitBranch, History, Info } from 'lucide-react';

const STATUS_BADGE: Record<string, string> = {
    open: 'badge-gray',
    assigned: 'badge-blue',
    active: 'badge-cyan',
    blocked: 'badge-rose',
    complete: 'badge-green',
};

const COMPLEXITY_BADGE: Record<string, string> = {
    Low: 'badge-green',
    Med: 'badge-amber',
    High: 'badge-rose',
};

type SortKey = 'age' | 'complexity' | 'historicalCompletion' | 'crossTeamImpact';

export default function TaskOverviewPage() {
    const [sortKey, setSortKey] = useState<SortKey>('age');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [filterProject, setFilterProject] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterComplexity, setFilterComplexity] = useState('all');
    const [selectedTask, setSelectedTask] = useState<typeof TASKS[0] | null>(null);

    function handleSort(key: SortKey) {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
    }

    const filtered = TASKS
        .filter(t => {
            if (filterProject !== 'all' && t.projectId !== filterProject) return false;
            if (filterStatus !== 'all' && t.status !== filterStatus) return false;
            if (filterComplexity !== 'all' && t.complexityLabel !== filterComplexity) return false;
            return true;
        })
        .sort((a, b) => {
            const av = a[sortKey] as number;
            const bv = b[sortKey] as number;
            return sortDir === 'asc' ? av - bv : bv - av;
        });

    function SortIcon({ col }: { col: SortKey }) {
        if (sortKey !== col) return <ArrowUpDown size={11} style={{ opacity: 0.4 }} />;
        return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
    }

    return (
        <>
            <TopHeader title="Task Intelligence" subtitle="Task Overview" />
            <div className="page-content animate-fade">
                <div className="page-header">
                    <div>
                        <h1>Task Overview</h1>
                        <p>All active tasks with complexity scoring, dependencies, and historical completion rates</p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar">
                    <span className="filter-label">Filter</span>
                    <select className="select" value={filterProject} onChange={e => setFilterProject(e.target.value)}>
                        <option value="all">All Projects</option>
                        {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <select className="select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="open">Open</option>
                        <option value="assigned">Assigned</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                        <option value="complete">Complete</option>
                    </select>
                    <select className="select" value={filterComplexity} onChange={e => setFilterComplexity(e.target.value)}>
                        <option value="all">All Complexity</option>
                        <option value="Low">Low</option>
                        <option value="Med">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} tasks</span>
                </div>

                {/* Table */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Task ID</th>
                                <th>Title</th>
                                <th>Project</th>
                                <th onClick={() => handleSort('complexity')} className={sortKey === 'complexity' ? 'sorted' : ''}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Complexity <SortIcon col="complexity" /></div>
                                </th>
                                <th>Dependencies</th>
                                <th onClick={() => handleSort('crossTeamImpact')} className={sortKey === 'crossTeamImpact' ? 'sorted' : ''}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Cross-Team <SortIcon col="crossTeamImpact" /></div>
                                </th>
                                <th onClick={() => handleSort('historicalCompletion')} className={sortKey === 'historicalCompletion' ? 'sorted' : ''}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>History <SortIcon col="historicalCompletion" /></div>
                                </th>
                                <th>Status</th>
                                <th onClick={() => handleSort('age')} className={sortKey === 'age' ? 'sorted' : ''}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>Age <SortIcon col="age" /></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(t => {
                                const proj = PROJECTS.find(p => p.id === t.projectId);
                                return (
                                    <tr key={t.id} onClick={() => setSelectedTask(t)}>
                                        <td>
                                            <span className="mono" style={{ color: 'var(--accent-blue-light)' }}>{t.id}</span>
                                        </td>
                                        <td style={{ maxWidth: 180 }}>
                                            <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {t.title}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className="badge"
                                                style={{
                                                    background: `${proj?.color}18`,
                                                    color: proj?.color,
                                                    fontSize: 10,
                                                }}
                                            >
                                                {t.project.split(' ')[0]}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ display: 'flex', gap: 2 }}>
                                                    {Array.from({ length: 10 }, (_, i) => (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                width: 4, height: 12, borderRadius: 2,
                                                                background: i < t.complexity
                                                                    ? t.complexity > 7 ? 'var(--accent-rose)' : t.complexity > 4 ? 'var(--accent-amber)' : 'var(--accent-emerald)'
                                                                    : 'rgba(255,255,255,0.06)',
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <span className={`badge ${COMPLEXITY_BADGE[t.complexityLabel]}`} style={{ fontSize: 10 }}>
                                                    {t.complexityLabel}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="mono" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                                                {t.blocking}→{t.blockedBy}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                fontSize: 12, fontWeight: 600,
                                                color: t.crossTeamImpact > 2 ? 'var(--accent-violet)' : 'var(--text-secondary)',
                                            }}>
                                                {t.crossTeamImpact}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                fontSize: 12, fontWeight: 600,
                                                color: t.historicalCompletion > 85 ? 'var(--accent-emerald)' : t.historicalCompletion > 70 ? 'var(--accent-amber)' : 'var(--accent-rose)',
                                            }}>
                                                {t.historicalCompletion}%
                                            </span>
                                        </td>
                                        <td><span className={`badge ${STATUS_BADGE[t.status]}`}>{t.status}</span></td>
                                        <td>
                                            <span style={{ fontSize: 12, color: t.age > 30 ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                                                {t.age}d
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Task Detail Modal */}
                {selectedTask && (
                    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSelectedTask(null); }}>
                        <div className="modal" style={{ maxWidth: 560 }}>
                            <div className="modal-header">
                                <div>
                                    <div style={{ fontSize: 11, color: 'var(--accent-blue-light)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 3 }}>
                                        {selectedTask.id}
                                    </div>
                                    <div className="modal-title">{selectedTask.title}</div>
                                </div>
                                <button className="btn btn-ghost btn-icon" onClick={() => setSelectedTask(null)}>
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 }}>
                                    {selectedTask.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                                    {[
                                        { label: 'Project', value: selectedTask.project },
                                        { label: 'Status', value: <span className={`badge ${STATUS_BADGE[selectedTask.status]}`}>{selectedTask.status}</span> },
                                        { label: 'Complexity', value: `${selectedTask.complexity}/10 · ${selectedTask.complexityLabel}` },
                                        { label: 'Est. Hours', value: `${selectedTask.estimatedHours}h` },
                                        { label: 'Task Age', value: `${selectedTask.age} days` },
                                        { label: 'Historical Rate', value: `${selectedTask.historicalCompletion}%` },
                                        { label: 'Cross-Team Impact', value: `${selectedTask.crossTeamImpact} teams` },
                                        { label: 'Assignee', value: selectedTask.assignee || 'Unassigned' },
                                    ].map(row => (
                                        <div key={row.label} style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                                            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                                                {row.label}
                                            </div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{row.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {selectedTask.dependencies.length > 0 && (
                                    <div style={{ marginBottom: 16 }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                            Dependencies
                                        </div>
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                            {selectedTask.dependencies.map(dep => (
                                                <span key={dep} className="badge badge-violet">
                                                    <GitBranch size={10} /> {dep}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Complexity breakdown */}
                                <div style={{ padding: 12, background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            Complexity Breakdown
                                        </span>
                                        <span className="info-icon">?</span>
                                    </div>
                                    {[
                                        { factor: 'Dependency Count', weight: selectedTask.blocking + selectedTask.blockedBy, max: 10 },
                                        { factor: 'Estimated Hours', weight: Math.min(selectedTask.estimatedHours / 4, 10), max: 10 },
                                        { factor: 'Cross-Team Impact', weight: selectedTask.crossTeamImpact * 2, max: 10 },
                                    ].map(f => (
                                        <div key={f.factor} style={{ marginBottom: 8 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.factor}</span>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{Number(f.weight).toFixed(1)}/10</span>
                                            </div>
                                            <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 100 }}>
                                                <div style={{ width: `${(f.weight / f.max) * 100}%`, height: '100%', background: 'var(--accent-blue)', borderRadius: 100 }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-ghost btn-sm" onClick={() => setSelectedTask(null)}>Close</button>
                                <button className="btn btn-secondary btn-sm"><History size={13} /> Allocation History</button>
                                <button className="btn btn-primary btn-sm"><GitBranch size={13} /> View Dependencies</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

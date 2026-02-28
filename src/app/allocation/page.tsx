'use client';

import { useState } from 'react';
import { PENDING_ALLOCATIONS, ACCEPTED_ALLOCATIONS } from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import { Check, X, ChevronDown, ChevronUp, Info, ExternalLink, Edit3 } from 'lucide-react';

type AllocationCard = typeof PENDING_ALLOCATIONS[0];

const OVERRIDE_REASONS = [
    'Skill mismatch (model overestimated skill)',
    'Priority conflict (assignee needed elsewhere)',
    'Strategic decision (business factor)',
    'Manual override (other reason)',
];

function ScoreBar({ label, value, color = 'var(--accent-blue)' }: { label: string; value: number; color?: string }) {
    return (
        <div className="score-row">
            <span className="score-label">{label}</span>
            <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{
                    width: `${value}%`, height: '100%', borderRadius: 100, background: color,
                    transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', minWidth: 38, textAlign: 'right' }}>
                {value}%
            </span>
        </div>
    );
}

function OverrideModal({
    card, onClose, onConfirm,
}: {
    card: AllocationCard;
    onClose: () => void;
    onConfirm: (newAssignee: string, reason: string, notes: string) => void;
}) {
    const [selected, setSelected] = useState('');
    const [reason, setReason] = useState(OVERRIDE_REASONS[0]);
    const [notes, setNotes] = useState('');
    const allOptions = [
        ...card.alternatives,
        { name: 'Sarah Chen', id: 'E-14', skillMatch: 70, loadFit: 60 },
        { name: 'Emily Zhao', id: 'E-45', skillMatch: 55, loadFit: 80 },
    ];

    return (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal" style={{ maxWidth: 520 }}>
                <div className="modal-header">
                    <div className="modal-title">Modify Assignee</div>
                    <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={16} /></button>
                </div>
                <div className="modal-body">
                    {/* Original suggestion */}
                    <div style={{ padding: 12, background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                            Original Suggestion (Read-only)
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{card.assignee.name}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{card.assignee.role}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Confidence</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{card.confidence}%</div>
                            </div>
                        </div>
                    </div>

                    {/* New Assignee Dropdown */}
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Select New Assignee *</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {allOptions.map(opt => (
                                <div
                                    key={opt.id}
                                    onClick={() => setSelected(opt.name)}
                                    style={{
                                        padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                                        background: selected === opt.name ? 'rgba(59,130,246,0.12)' : 'var(--bg-elevated)',
                                        border: `1px solid ${selected === opt.name ? 'rgba(59,130,246,0.4)' : 'var(--border)'}`,
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{opt.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{opt.id}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                                        <span>Skill: <strong style={{ color: 'var(--text-primary)' }}>{opt.skillMatch}%</strong></span>
                                        <span>Load: <strong style={{ color: 'var(--text-primary)' }}>{opt.loadFit}%</strong></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Override reason */}
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Override Reason *</div>
                        <select
                            className="select"
                            style={{ width: '100%' }}
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                        >
                            {OVERRIDE_REASONS.map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Notes (optional)</div>
                        <textarea
                            className="input"
                            style={{ width: '100%', resize: 'vertical', minHeight: 72, lineHeight: 1.5 }}
                            placeholder="Additional context for this override..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
                    <button
                        className="btn btn-primary btn-sm"
                        disabled={!selected}
                        onClick={() => { if (selected) onConfirm(selected, reason, notes); onClose(); }}
                    >
                        Confirm Override
                    </button>
                </div>
            </div>
        </div>
    );
}

function RejectModal({ card, onClose, onConfirm }: { card: AllocationCard; onClose: () => void; onConfirm: () => void }) {
    const [reason, setReason] = useState(OVERRIDE_REASONS[0]);
    const [notes, setNotes] = useState('');

    return (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal" style={{ maxWidth: 420 }}>
                <div className="modal-header">
                    <div className="modal-title">Reject Allocation</div>
                    <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={16} /></button>
                </div>
                <div className="modal-body">
                    <div style={{ padding: 12, background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 8, marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{card.taskId} – {card.taskTitle}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Suggested: {card.assignee.name}</div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Rejection Reason *</div>
                        <select className="select" style={{ width: '100%' }} value={reason} onChange={e => setReason(e.target.value)}>
                            {OVERRIDE_REASONS.map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Notes</div>
                        <textarea
                            className="input"
                            style={{ width: '100%', resize: 'vertical', minHeight: 64 }}
                            placeholder="Why is this suggestion being rejected?"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger btn-sm" onClick={() => { onConfirm(); onClose(); }}>Confirm Rejection</button>
                </div>
            </div>
        </div>
    );
}

export default function AllocationPage() {
    const [allocations, setAllocations] = useState(PENDING_ALLOCATIONS);
    const [accepted, setAccepted] = useState(ACCEPTED_ALLOCATIONS);
    const [expandedAlts, setExpandedAlts] = useState<Record<string, boolean>>({});
    const [overrideModal, setOverrideModal] = useState<AllocationCard | null>(null);
    const [rejectModal, setRejectModal] = useState<AllocationCard | null>(null);

    function handleAccept(id: string) {
        const card = allocations.find(a => a.id === id)!;
        setAllocations(prev => prev.filter(a => a.id !== id));
        setAccepted(prev => [{
            id: card.id, taskId: card.taskId,
            assignee: card.assignee.name, confidence: card.confidence,
            status: 'active', acceptedDate: new Date().toISOString().split('T')[0],
        }, ...prev]);
    }

    function handleOverrideConfirm(card: AllocationCard, newAssignee: string, reason: string) {
        setAllocations(prev => prev.filter(a => a.id !== card.id));
        setAccepted(prev => [{
            id: card.id, taskId: card.taskId,
            assignee: newAssignee, confidence: card.confidence,
            status: 'active', acceptedDate: new Date().toISOString().split('T')[0],
            overridden: true,
        } as any, ...prev]);
    }

    function handleReject(card: AllocationCard) {
        setAllocations(prev => prev.filter(a => a.id !== card.id));
    }

    const STATUS_COLORS: Record<string, string> = { done: 'badge-green', active: 'badge-blue', blocked: 'badge-rose' };

    return (
        <>
            <TopHeader title="Allocation Engine" />
            <div className="page-content animate-fade">
                <div className="page-header">
                    <div>
                        <h1>Allocation Engine</h1>
                        <p>AI-generated task allocation suggestions with skill matching and workload analysis</p>
                    </div>
                    <div className="page-header-actions">
                        <span className="badge badge-amber">{allocations.length} Pending</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
                    {/* Pending Allocations */}
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                            Pending Suggestions
                            <span className="badge badge-amber">{allocations.length}</span>
                        </div>

                        {allocations.length === 0 ? (
                            <div className="card">
                                <div className="empty-state">
                                    <Check size={32} style={{ color: 'var(--accent-emerald)', opacity: 0.6 }} />
                                    <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>All caught up!</div>
                                    <div className="empty-state-text">No pending allocation suggestions</div>
                                </div>
                            </div>
                        ) : (
                            allocations.map(card => (
                                <div key={card.id} className="allocation-card animate-slide">
                                    <div className="allocation-card-header">
                                        <div style={{ flex: 1 }}>
                                            <div className="allocation-task-id">{card.taskId}</div>
                                            <div className="allocation-task-title">{card.taskTitle}</div>
                                        </div>
                                        <span className="badge badge-amber" style={{ flexShrink: 0 }}>Pending</span>
                                    </div>

                                    <div className="allocation-assignee">
                                        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{card.assignee.name}</span>
                                        <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>·</span>
                                        <span style={{ color: 'var(--text-muted)' }}>{card.assignee.role}</span>
                                        <span className="mono" style={{ marginLeft: 6, color: 'var(--accent-blue-light)', fontSize: 11 }}>{card.assignee.id}</span>
                                    </div>

                                    <div className="allocation-scores">
                                        <ScoreBar
                                            label="Skill Match"
                                            value={card.skillMatch}
                                            color={card.skillMatch > 80 ? 'var(--accent-emerald)' : card.skillMatch > 60 ? 'var(--accent-blue)' : 'var(--accent-amber)'}
                                        />
                                        <ScoreBar label="Load Fit" value={card.loadFit} color="var(--accent-cyan)" />
                                        <ScoreBar
                                            label="Confidence"
                                            value={card.confidence}
                                            color={card.confidence > 80 ? 'var(--accent-emerald)' : card.confidence > 50 ? 'var(--accent-amber)' : 'var(--accent-rose)'}
                                        />
                                    </div>

                                    <div className="allocation-reasoning">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <div className="reasoning-title">AI Reasoning</div>
                                            <span className={`badge ${card.confidence > 80 ? 'badge-green' : card.confidence > 50 ? 'badge-amber' : 'badge-rose'}`} style={{ fontSize: 10 }}>
                                                {card.confidence > 80 ? 'High' : card.confidence > 50 ? 'Medium' : 'Low'} Confidence
                                            </span>
                                        </div>
                                        <ul className="reasoning-list">
                                            {card.reasoning.map((r, i) => <li key={i}>{r}</li>)}
                                        </ul>
                                    </div>

                                    {/* Alternatives */}
                                    <button
                                        className="collapsible-trigger"
                                        onClick={() => setExpandedAlts(prev => ({ ...prev, [card.id]: !prev[card.id] }))}
                                    >
                                        {expandedAlts[card.id] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                        {expandedAlts[card.id] ? 'Hide' : 'Show'} Alternatives ({card.alternatives.length})
                                    </button>

                                    {expandedAlts[card.id] && (
                                        <div style={{ marginBottom: 14, padding: 12, background: 'var(--bg-elevated)', borderRadius: 8 }}>
                                            {card.alternatives.map(alt => (
                                                <div key={alt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(30,45,74,0.4)' }}>
                                                    <div>
                                                        <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-primary)' }}>{alt.name}</div>
                                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{alt.id}</div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                                                        <span style={{ color: 'var(--text-muted)' }}>Skill: <strong style={{ color: '#60a5fa' }}>{alt.skillMatch}%</strong></span>
                                                        <span style={{ color: 'var(--text-muted)' }}>Load: <strong style={{ color: '#22d3ee' }}>{alt.loadFit}%</strong></span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="allocation-actions">
                                        <button className="btn btn-success btn-sm" onClick={() => handleAccept(card.id)}>
                                            <Check size={13} /> Accept
                                        </button>
                                        <button className="btn btn-warning btn-sm" onClick={() => setOverrideModal(card)}>
                                            <Edit3 size={13} /> Modify Assignee
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => setRejectModal(card)}>
                                            <X size={13} /> Reject
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Accepted Allocations Log */}
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>
                            Recently Accepted (Last 7 Days)
                        </div>
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Assignee</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accepted.map((a: any) => (
                                        <tr key={a.id}>
                                            <td>
                                                <div>
                                                    <span className="mono" style={{ color: 'var(--accent-blue-light)', fontSize: 11 }}>{a.taskId}</span>
                                                    {a.overridden && (
                                                        <span className="badge badge-violet" style={{ marginLeft: 4, fontSize: 9 }}>Override</span>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{a.acceptedDate}</div>
                                            </td>
                                            <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                                                {a.assignee}
                                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{a.confidence}% conf.</div>
                                            </td>
                                            <td><span className={`badge ${STATUS_COLORS[a.status] || 'badge-gray'}`} style={{ fontSize: 10 }}>{a.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Info card */}
                        <div className="card" style={{ marginTop: 12, borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}>
                            <div className="card-title" style={{ marginBottom: 10 }}><Info size={13} /> Allocation Signals</div>
                            {[
                                { label: 'Skill Match', desc: 'Historical task completion + skill tag overlap' },
                                { label: 'Load Fit', desc: 'Current workload vs. capacity + task hours' },
                                { label: 'Confidence', desc: 'Model accuracy × data quality × signal certainty' },
                            ].map(s => (
                                <div key={s.label} style={{ padding: '8px 0', borderBottom: '1px solid rgba(30,45,74,0.4)' }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{s.label}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modals */}
                {overrideModal && (
                    <OverrideModal
                        card={overrideModal}
                        onClose={() => setOverrideModal(null)}
                        onConfirm={(newAssignee, reason, notes) => handleOverrideConfirm(overrideModal, newAssignee, reason)}
                    />
                )}
                {rejectModal && (
                    <RejectModal
                        card={rejectModal}
                        onClose={() => setRejectModal(null)}
                        onConfirm={() => handleReject(rejectModal)}
                    />
                )}
            </div>
        </>
    );
}

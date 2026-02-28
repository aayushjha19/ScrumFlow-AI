'use client';

import { useState } from 'react';
import { SPEAKERS, SPEAKER_TIMELINE, PREVIOUS_MEETINGS } from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import { Info, HelpCircle } from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const MEETING_DURATION = 60; // minutes

function CustomPieTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="chart-tooltip">
            <div style={{ fontWeight: 600, color: payload[0].payload.color, marginBottom: 3 }}>{payload[0].name}</div>
            <div className="chart-tooltip-value">{payload[0].value}%</div>
        </div>
    );
}

export default function SpeakerMetricsPage() {
    const [selectedMeeting, setSelectedMeeting] = useState(PREVIOUS_MEETINGS[0].id);
    const [showDefs, setShowDefs] = useState(false);

    const pieData = SPEAKERS.map(s => ({ name: s.id, value: s.speakingPct, color: s.color, fullName: s.name }));

    return (
        <>
            <TopHeader title="Meeting Intelligence" subtitle="Speaker Metrics" />
            <div className="page-content animate-fade">
                <div className="page-header">
                    <div>
                        <h1>Speaker Metrics</h1>
                        <p>Participation analysis, speaking time distribution, and speaker timelines</p>
                    </div>
                    <div className="page-header-actions">
                        <select
                            className="select"
                            value={selectedMeeting}
                            onChange={e => setSelectedMeeting(e.target.value)}
                        >
                            {PREVIOUS_MEETINGS.map(m => (
                                <option key={m.id} value={m.id}>{m.title}</option>
                            ))}
                        </select>
                        <div className="tooltip-wrap">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setShowDefs(v => !v)}
                            >
                                <HelpCircle size={13} /> Definitions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Definitions Panel */}
                {showDefs && (
                    <div className="card section-gap animate-fade" style={{ borderColor: 'rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.04)' }}>
                        <div className="card-header" style={{ marginBottom: 12 }}>
                            <div className="card-title"><Info size={14} /> Metric Definitions</div>
                            <button className="btn btn-ghost btn-sm" onClick={() => setShowDefs(false)}>Close</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                            {[
                                { term: 'Speaking Time %', def: 'Percentage of total meeting time a participant was speaking. Calculated as their total active speaking seconds divided by meeting duration.' },
                                { term: 'Speaking Turn Count', def: 'Number of distinct speaking segments. A turn ends when another participant begins speaking or there is silence > 2 seconds.' },
                                { term: 'Interruption Count', def: 'Number of times a participant began speaking while another was still speaking, within a 1-second window.' },
                                { term: 'Speaking Distribution Variance', def: 'Statistical variance in speaking time % across all participants. Lower variance = more balanced discussion.' },
                            ].map(d => (
                                <div key={d.term} style={{ padding: 12, background: 'var(--bg-elevated)', borderRadius: 8 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{d.term}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{d.def}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid-2 section-gap">
                    {/* Speaking Time Horizontal Bar Chart */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Speaking Time Distribution</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[...SPEAKERS].sort((a, b) => b.speakingPct - a.speakingPct).map(s => (
                                <div key={s.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                                            <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>
                                                {s.id}
                                            </span>
                                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>— {s.name}</span>
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{s.speakingPct}%</span>
                                    </div>
                                    <div style={{ height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 100, overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${s.speakingPct}%`,
                                            height: '100%',
                                            background: s.color,
                                            borderRadius: 100,
                                            transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Speaking Distribution</div>
                        </div>
                        <div style={{ height: 220 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={85}
                                        dataKey="value"
                                        paddingAngle={2}
                                    >
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} stroke="transparent" />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomPieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                            {SPEAKERS.map(s => (
                                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                                    <span style={{ color: 'var(--text-muted)' }}>{s.id} ({s.speakingPct}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Turn Count Table */}
                <div className="card section-gap">
                    <div className="card-header">
                        <div className="card-title">Speaking Turn Count</div>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Participant</th>
                                <th>Name</th>
                                <th>Speaking %</th>
                                <th>Turns</th>
                                <th>Interruptions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...SPEAKERS].sort((a, b) => b.turns - a.turns).map(s => (
                                <tr key={s.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                                            <span className="mono" style={{ color: 'var(--accent-blue-light)' }}>{s.id}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{s.name}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 50, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 100 }}>
                                                <div style={{ width: `${s.speakingPct}%`, height: '100%', background: s.color, borderRadius: 100 }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600 }}>{s.speakingPct}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.turns}</span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: 11, marginLeft: 3 }}>turns</span>
                                    </td>
                                    <td>
                                        <span style={{
                                            fontWeight: 600,
                                            color: s.interruptions > 3 ? 'var(--accent-rose)' : s.interruptions > 1 ? 'var(--accent-amber)' : 'var(--text-muted)',
                                        }}>{s.interruptions}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Timeline Visualization */}
                <div className="card section-gap">
                    <div className="card-header">
                        <div className="card-title">Speaking Timeline</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Meeting duration: {MEETING_DURATION} minutes</div>
                    </div>
                    <div className="timeline-wrap">
                        {SPEAKERS.map(s => {
                            const segments = SPEAKER_TIMELINE.filter(t => t.speaker === s.id);
                            return (
                                <div key={s.id} className="timeline-row">
                                    <div className="timeline-label">{s.id}</div>
                                    <div className="timeline-track" style={{ position: 'relative', height: 28 }}>
                                        {segments.map((seg, i) => (
                                            <div
                                                key={i}
                                                className="timeline-block"
                                                style={{
                                                    left: `${(seg.start / MEETING_DURATION) * 100}%`,
                                                    width: `${((seg.end - seg.start) / MEETING_DURATION) * 100}%`,
                                                    background: seg.color,
                                                    opacity: 0.85,
                                                    top: 2,
                                                    height: 'calc(100% - 4px)',
                                                    borderRadius: 4,
                                                }}
                                                title={`${s.id}: ${seg.start}:00 – ${seg.end}:00`}
                                            />
                                        ))}
                                        {/* Silence gaps (simplified) */}
                                        {[15, 31, 44].map(gap => (
                                            <div
                                                key={gap}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${(gap / MEETING_DURATION) * 100}%`,
                                                    width: `${(2 / MEETING_DURATION) * 100}%`,
                                                    top: 2,
                                                    height: 'calc(100% - 4px)',
                                                    background: 'rgba(74,89,128,0.25)',
                                                    borderRadius: 2,
                                                }}
                                                title={`Silence at ${gap}:00`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Time axis */}
                        <div className="timeline-row">
                            <div className="timeline-label" />
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                                {[0, 10, 20, 30, 40, 50, 60].map(t => (
                                    <span key={t} style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                                        {t}m
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                        {SPEAKERS.map(s => (
                            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 12, height: 8, borderRadius: 2, background: s.color, opacity: 0.85 }} />
                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.id}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ width: 12, height: 8, borderRadius: 2, background: 'rgba(74,89,128,0.4)' }} />
                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Silence</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

'use client';

import { useState } from 'react';
import { SILENCE_METRICS, SILENCE_HISTOGRAM, SPEAKER_TIMELINE } from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import { Timer, Clock, Activity, Waves, Settings } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const SILENCE_CARDS = [
    { label: 'Total Silence Duration', value: SILENCE_METRICS.totalDuration, icon: Timer, color: '#8b5cf6', bg: '#2e1b5f', unit: '' },
    { label: 'Average Silence Gap', value: SILENCE_METRICS.avgGap, icon: Clock, color: '#06b6d4', bg: '#0d3040', unit: 's' },
    { label: 'Silence Frequency', value: SILENCE_METRICS.frequency, icon: Activity, color: '#f59e0b', bg: '#3d2b0f', unit: ' gaps' },
    { label: 'Longest Silence Gap', value: SILENCE_METRICS.longestGap, icon: Waves, color: '#f43f5e', bg: '#3d0f1b', unit: 's' },
];

const MEETING_DURATION = 60;

function SilenceTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="chart-tooltip">
            <div className="chart-tooltip-label">{payload[0].payload.bucket}</div>
            <div className="chart-tooltip-value">{payload[0].value} gaps</div>
        </div>
    );
}

// Silence intervals in the meeting
const SILENCE_INTERVALS = [
    { start: 15, end: 17 },
    { start: 31, end: 33 },
    { start: 44, end: 46 },
    { start: 7, end: 9 },
    { start: 22, end: 24 },
    { start: 36, end: 37.5 },
    { start: 52, end: 56 },
];

// Speaker segments
const SPEAKERS_COLORS: Record<string, string> = {
    'E-14': '#3b82f6',
    'E-07': '#8b5cf6',
    'E-22': '#06b6d4',
    'E-31': '#10b981',
    'E-45': '#f59e0b',
};

export default function SilenceMetricsPage() {
    const [threshold, setThreshold] = useState(2);

    return (
        <>
            <TopHeader title="Meeting Intelligence" subtitle="Silence Metrics" />
            <div className="page-content animate-fade">
                <div className="page-header">
                    <div>
                        <h1>Silence Metrics</h1>
                        <p>Gap analysis and silence patterns for Sprint Planning Q1 · 60 min session</p>
                    </div>
                </div>

                {/* Metric Cards */}
                <div className="grid-4 section-gap">
                    {SILENCE_CARDS.map(c => {
                        const Icon = c.icon;
                        return (
                            <div className="metric-card" key={c.label}>
                                <div style={{ background: c.bg, borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                                    <Icon size={17} color={c.color} />
                                </div>
                                <div className="metric-value small">{c.value}{c.unit}</div>
                                <div className="metric-label">{c.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Timeline with Silence Gaps */}
                <div className="card section-gap">
                    <div className="card-header">
                        <div className="card-title">
                            <Activity size={15} /> Timeline Gap Visualization
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Grey = silence {'>'} {threshold}s</div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <div style={{ position: 'relative', height: 40, background: 'var(--bg-elevated)', borderRadius: 8, overflow: 'hidden' }}>
                            {/* Speaking segments */}
                            {SPEAKER_TIMELINE.map((seg, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        left: `${(seg.start / MEETING_DURATION) * 100}%`,
                                        width: `${((seg.end - seg.start) / MEETING_DURATION) * 100}%`,
                                        top: 0, bottom: 0,
                                        background: seg.color,
                                        opacity: 0.7,
                                    }}
                                    title={`${seg.speaker}: ${seg.start}:00–${seg.end}:00`}
                                />
                            ))}
                            {/* Silence gaps */}
                            {SILENCE_INTERVALS.map((s, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        left: `${(s.start / MEETING_DURATION) * 100}%`,
                                        width: `${((s.end - s.start) / MEETING_DURATION) * 100}%`,
                                        top: 0, bottom: 0,
                                        background: 'rgba(74,89,128,0.6)',
                                        border: '1px solid rgba(74,89,128,0.4)',
                                    }}
                                    title={`Silence: ${(s.end - s.start) * 60}s`}
                                />
                            ))}
                        </div>

                        {/* Time axis */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                            {[0, 10, 20, 30, 40, 50, 60].map(t => (
                                <span key={t} style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{t}m</span>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {Object.entries(SPEAKERS_COLORS).map(([id, color]) => (
                            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 12, height: 8, borderRadius: 2, background: color, opacity: 0.7 }} />
                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{id}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ width: 12, height: 8, borderRadius: 2, background: 'rgba(74,89,128,0.6)' }} />
                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Silence</span>
                        </div>
                    </div>
                </div>

                {/* Histogram + Config */}
                <div className="grid-2 section-gap">
                    {/* Histogram */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Silence Duration Distribution</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Bucket size: 2s</div>
                        </div>
                        <div style={{ height: 200 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={SILENCE_HISTOGRAM} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" />
                                    <XAxis dataKey="bucket" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
                                    <Tooltip content={<SilenceTooltip />} />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {SILENCE_HISTOGRAM.map((_, i) => (
                                            <Cell key={i} fill="#8b5cf6" fillOpacity={0.9 - i * 0.1} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Threshold Config */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title"><Settings size={14} /> Silence Threshold Configuration</div>
                        </div>
                        <div style={{ padding: '8px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Current Threshold</span>
                                <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {threshold}s
                                </span>
                            </div>
                            <input
                                type="range"
                                min={1} max={5} step={0.5}
                                value={threshold}
                                onChange={e => setThreshold(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--accent-violet)', marginBottom: 12 }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>1s (sensitive)</span>
                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>5s (lenient)</span>
                            </div>
                            <div style={{ marginTop: 16, padding: 12, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8 }}>
                                <div style={{ fontSize: 12, color: 'var(--accent-amber)', fontWeight: 600, marginBottom: 4 }}>⚠ Config Notice</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                    Changes apply to future meetings only. Historical data uses the threshold active at the time of meeting processing.
                                </div>
                            </div>
                            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn btn-primary btn-sm">
                                    Save Threshold
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

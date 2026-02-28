'use client';

import { useState } from 'react';
import { LEARNING_METRICS, OVERRIDE_REASONS, ACCURACY_TREND_LEARN } from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import { Download, AlertTriangle, TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine,
} from 'recharts';

type Period = '30' | '60' | '90' | 'all';

function GaugeChart({
    value, max = 100, target, label, sublabel, colorFn,
}: {
    value: number;
    max?: number;
    target: number;
    label: string;
    sublabel: string;
    colorFn: (v: number) => string;
}) {
    const pct = (value / max) * 100;
    const color = colorFn(value);
    const radius = 70;
    const circumference = Math.PI * radius; // half-circle
    const dashOffset = circumference * (1 - value / max);

    return (
        <div className="gauge-container">
            <div style={{ position: 'relative', width: 180, height: 100 }}>
                <svg width="180" height="100" viewBox="0 0 180 100">
                    {/* Background arc */}
                    <path
                        d={`M 10 90 A 80 80 0 0 1 170 90`}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth={14}
                        strokeLinecap="round"
                    />
                    {/* Value arc */}
                    <path
                        d={`M 10 90 A 80 80 0 0 1 170 90`}
                        fill="none"
                        stroke={color}
                        strokeWidth={14}
                        strokeLinecap="round"
                        strokeDasharray={`${(value / max) * 251.2} 251.2`}
                        strokeDashoffset={0}
                        style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    {/* Target marker */}
                    {(() => {
                        const angle = (target / max) * Math.PI;
                        const x = 90 - 80 * Math.cos(Math.PI - angle);
                        const y = 90 - 80 * Math.sin(Math.PI - angle);
                        const x1 = 90 - 70 * Math.cos(Math.PI - angle);
                        const y1 = 90 - 70 * Math.sin(Math.PI - angle);
                        return (
                            <line x1={x1} y1={y1} x2={x} y2={y}
                                stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" />
                        );
                    })()}
                    {/* Value text */}
                    <text x={90} y={75} textAnchor="middle" fill="white" fontSize={24} fontWeight={800} fontFamily="Inter, sans-serif">
                        {value}%
                    </text>
                    <text x={90} y={92} textAnchor="middle" fill="rgba(139,157,195,0.8)" fontSize={10} fontFamily="Inter, sans-serif">
                        target: {target}%
                    </text>
                </svg>
            </div>
            <div style={{ textAlign: 'center', marginTop: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{sublabel}</div>
            </div>
        </div>
    );
}

function AccuracyTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="chart-tooltip">
            <div className="chart-tooltip-label">{label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
                <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 700 }}>{payload[0]?.value}%</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>n={payload[0]?.payload?.sampleSize}</div>
        </div>
    );
}

function OverridesTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="chart-tooltip">
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{payload[0].payload.reason}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginTop: 4 }}>{payload[0].value}%</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{payload[0].payload.count} overrides</div>
        </div>
    );
}

export default function LearningPage() {
    const [period, setPeriod] = useState<Period>('90');

    const periodDays: Record<Period, number> = { '30': 30, '60': 60, '90': 90, 'all': 90 };
    const trendData = ACCURACY_TREND_LEARN.slice(-periodDays[period]);

    const thinned = trendData.filter((_, i) => i % Math.ceil(trendData.length / 20) === 0 || i === trendData.length - 1);

    function exportReport() {
        alert('Exporting learning_report_2026-02-20.pdf...\n(Demo mode — no actual file generated)');
    }

    return (
        <>
            <TopHeader title="Learning & Adaptation" />
            <div className="page-content animate-fade">
                <div className="page-header">
                    <div>
                        <h1>Model Performance & Override Analysis</h1>
                        <p>Track allocation model accuracy, override patterns, and learning velocity over time</p>
                    </div>
                    <div className="page-header-actions">
                        <button className="btn btn-secondary btn-sm" onClick={exportReport}>
                            <Download size={13} /> Export Report
                        </button>
                    </div>
                </div>

                {/* Gauge Row */}
                <div className="grid-2 section-gap">
                    <div className="card" style={{ display: 'flex', justifyContent: 'center' }}>
                        <GaugeChart
                            value={LEARNING_METRICS.allocationAccuracy}
                            target={80}
                            label="Allocation Accuracy"
                            sublabel="(Accepted + Not Overridden) / Total"
                            colorFn={v => v >= 80 ? '#10b981' : v >= 60 ? '#f59e0b' : '#f43f5e'}
                        />
                    </div>
                    <div className="card" style={{ display: 'flex', justifyContent: 'center' }}>
                        <GaugeChart
                            value={LEARNING_METRICS.overrideRate}
                            target={20}
                            label="Override Rate"
                            sublabel="Overridden / Total Suggestions"
                            colorFn={v => v <= 20 ? '#10b981' : v <= 30 ? '#f59e0b' : '#f43f5e'}
                        />
                    </div>
                </div>

                {/* Key Metrics Row */}
                <div className="grid-3 section-gap">
                    {[
                        {
                            icon: Target, label: 'Model Drift Score',
                            value: LEARNING_METRICS.modelDrift.toFixed(2),
                            unit: '', target: '< 0.10',
                            color: LEARNING_METRICS.modelDrift < 0.1 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                            bg: LEARNING_METRICS.modelDrift < 0.1 ? '#0f3323' : '#3d2b0f',
                            warn: LEARNING_METRICS.modelDrift > 0.15,
                        },
                        {
                            icon: TrendingUp, label: 'Learning Velocity',
                            value: `+${LEARNING_METRICS.learningVelocity}%`,
                            unit: '/month', target: '> 0%',
                            color: 'var(--accent-emerald)',
                            bg: '#0f3323',
                            warn: false,
                        },
                        {
                            icon: Zap, label: 'Calibration Gap',
                            value: LEARNING_METRICS.calibrationGap.toFixed(2),
                            unit: '', target: '< 0.05',
                            color: LEARNING_METRICS.calibrationGap < 0.05 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                            bg: LEARNING_METRICS.calibrationGap < 0.05 ? '#0f3323' : '#3d2b0f',
                            warn: false,
                        },
                    ].map(m => {
                        const Icon = m.icon;
                        return (
                            <div className="metric-card" key={m.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ background: m.bg, borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={17} color={m.color} />
                                    </div>
                                    {m.warn && <span className="badge badge-rose"><AlertTriangle size={10} /> Drift Alert</span>}
                                </div>
                                <div style={{ fontSize: 26, fontWeight: 800, color: m.color, letterSpacing: -0.5 }}>
                                    {m.value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>{m.unit}</span>
                                </div>
                                <div className="metric-label">{m.label}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Target: {m.target}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Accuracy Trend Chart */}
                <div className="card section-gap">
                    <div className="card-header">
                        <div>
                            <div className="card-title"><TrendingUp size={15} /> Accuracy Trend</div>
                            <div className="card-subtitle">Daily allocation accuracy over selected period</div>
                        </div>
                        <div className="tabs">
                            {(['30', '60', '90', 'all'] as Period[]).map(p => (
                                <button key={p} className={`tab ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>
                                    {p === 'all' ? 'All Time' : `${p}d`}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ height: 240 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={thinned} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" />
                                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
                                <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                                <Tooltip content={<AccuracyTooltip />} />
                                <ReferenceLine y={80} stroke="rgba(16,185,129,0.4)" strokeDasharray="4 3" label={{ value: 'Target 80%', fill: 'rgba(16,185,129,0.6)', fontSize: 10, position: 'right' }} />
                                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Override Reason Distribution */}
                <div className="card section-gap">
                    <div className="card-header">
                        <div>
                            <div className="card-title"><BarChart3 size={15} /> Override Reason Distribution</div>
                            <div className="card-subtitle">Breakdown of why allocations were overridden (last 90 days)</div>
                        </div>
                    </div>
                    <div style={{ height: 180 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={OVERRIDE_REASONS} layout="vertical" margin={{ top: 4, right: 30, left: 30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(30,45,74,0.5)" />
                                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                                <YAxis type="category" dataKey="reason" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} tickLine={false} axisLine={false} width={130} />
                                <Tooltip content={<OverridesTooltip />} />
                                <Bar dataKey="pct" radius={[0, 4, 4, 0]} maxBarSize={18}>
                                    {OVERRIDE_REASONS.map((_, i) => (
                                        <Cell key={i} fill={['#f59e0b', '#8b5cf6', '#3b82f6', '#4a5980'][i]} fillOpacity={0.85} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* What This Means */}
                <div className="card section-gap" style={{ borderColor: 'rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.03)' }}>
                    <div className="card-header">
                        <div className="card-title" style={{ fontSize: 15 }}>📖 What This Means</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                        {[
                            {
                                icon: '🎯',
                                text: `Accuracy ${LEARNING_METRICS.allocationAccuracy}%: The system correctly predicts ${Math.round(LEARNING_METRICS.allocationAccuracy)} of every 100 allocations without human override.`,
                            },
                            {
                                icon: '🔄',
                                text: `Override Rate ${LEARNING_METRICS.overrideRate}%: Humans modify ${Math.round(LEARNING_METRICS.overrideRate)} of every 100 suggestions. Target is ≤20%.`,
                            },
                            {
                                icon: '📈',
                                text: `Skill Mismatch (42% of overrides): This is the primary improvement opportunity — model should better match complex skill requirements.`,
                            },
                            {
                                icon: '🚀',
                                text: `Learning Velocity +${LEARNING_METRICS.learningVelocity}%/month: System is actively improving. At current rate, 90% accuracy expected within 4 months.`,
                            },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: 14, background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

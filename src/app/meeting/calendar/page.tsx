'use client';

import { useState } from 'react';
import { UPCOMING_MEETINGS, PROJECTS } from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, X } from 'lucide-react';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1; // Mon=0
}

const TIER_COLORS: Record<string, string> = {
    high: 'var(--accent-rose)',
    medium: 'var(--accent-amber)',
    low: 'var(--accent-emerald)',
};

const TIER_BG: Record<string, string> = {
    high: 'rgba(244,63,94,0.15)',
    medium: 'rgba(245,158,11,0.15)',
    low: 'rgba(16,185,129,0.15)',
};

export default function CalendarPage() {
    const today = new Date(2026, 1, 20); // Feb 20, 2026
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(1); // Feb
    const [view, setView] = useState<'month' | 'week'>('week');
    const [selectedMeeting, setSelectedMeeting] = useState<typeof UPCOMING_MEETINGS[0] | null>(null);
    const [filterProject, setFilterProject] = useState('all');
    const [filterTier, setFilterTier] = useState('all');

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    function prevMonth() {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
    }
    function nextMonth() {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
    }

    const filteredMeetings = UPCOMING_MEETINGS.filter(m => {
        if (filterProject !== 'all' && m.projectId !== filterProject) return false;
        if (filterTier !== 'all' && m.budgetTier !== filterTier) return false;
        return true;
    });

    function getMeetingsForDay(day: number) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return filteredMeetings.filter(m => m.date === dateStr);
    }

    function getProjectColor(projectId: string) {
        return PROJECTS.find(p => p.id === projectId)?.color || '#3b82f6';
    }

    // Week view: current week days
    const weekStart = 18; // Feb 18 (Mon)
    const weekDays = Array.from({ length: 7 }, (_, i) => weekStart + i);

    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    return (
        <>
            <TopHeader title="Meeting Intelligence" subtitle="Upcoming Calendar" />
            <div className="page-content animate-fade" style={{ display: 'flex', gap: 0, padding: 0, height: '100%' }}>
                <div style={{ flex: 1, padding: '24px 24px', overflow: 'auto' }}>
                    {/* Page Header */}
                    <div className="page-header">
                        <div>
                            <h1>Upcoming Meeting Calendar</h1>
                            <p>Track and manage all upcoming meetings across your projects</p>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="filter-bar">
                        <span className="filter-label">Filter</span>
                        <select
                            className="select"
                            value={filterProject}
                            onChange={e => setFilterProject(e.target.value)}
                        >
                            <option value="all">All Projects</option>
                            {PROJECTS.filter(p => p.status === 'active').map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <select
                            className="select"
                            value={filterTier}
                            onChange={e => setFilterTier(e.target.value)}
                        >
                            <option value="all">All Budget Tiers</option>
                            <option value="high">High Budget</option>
                            <option value="medium">Medium Budget</option>
                            <option value="low">Low Budget</option>
                        </select>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="tabs">
                                <button className={`tab ${view === 'week' ? 'active' : ''}`} onClick={() => setView('week')}>Week</button>
                                <button className={`tab ${view === 'month' ? 'active' : ''}`} onClick={() => setView('month')}>Month</button>
                            </div>
                            <button className="btn btn-secondary btn-sm" onClick={() => { setYear(2026); setMonth(1); }}>
                                Today
                            </button>
                        </div>
                    </div>

                    {/* Calendar Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <button className="btn btn-ghost btn-icon" onClick={prevMonth}><ChevronLeft size={16} /></button>
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', minWidth: 160 }}>
                            {MONTH_NAMES[month]} {year}
                        </h2>
                        <button className="btn btn-ghost btn-icon" onClick={nextMonth}><ChevronRight size={16} /></button>
                    </div>

                    {view === 'week' ? (
                        /* WEEK VIEW */
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            {/* Header */}
                            <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ padding: '10px 8px', borderRight: '1px solid var(--border)' }} />
                                {weekDays.map((day, i) => {
                                    const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
                                    const isToday = day === 20;
                                    return (
                                        <div key={day} style={{
                                            padding: '10px 8px',
                                            borderRight: i < 6 ? '1px solid var(--border)' : 'none',
                                            textAlign: 'center',
                                        }}>
                                            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{DAYS_OF_WEEK[i]}</div>
                                            <div style={{
                                                fontSize: 16, fontWeight: 700,
                                                color: isToday ? 'white' : 'var(--text-secondary)',
                                                background: isToday ? 'var(--accent-blue)' : 'transparent',
                                                width: 28, height: 28, borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                margin: '4px auto 0',
                                            }}>{day}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Time slots */}
                            {hours.map((hour) => (
                                <div
                                    key={hour}
                                    style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid rgba(30,45,74,0.4)', minHeight: 60 }}
                                >
                                    <div style={{
                                        padding: '8px 8px', borderRight: '1px solid var(--border)',
                                        fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace',
                                        paddingTop: 6,
                                    }}>{hour}</div>
                                    {weekDays.map((day, di) => {
                                        const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
                                        const meetings = filteredMeetings.filter(m => m.date === dateStr && m.time === hour);
                                        return (
                                            <div key={day} style={{ borderRight: di < 6 ? '1px solid rgba(30,45,74,0.3)' : 'none', padding: '4px' }}>
                                                {meetings.map(m => (
                                                    <div
                                                        key={m.id}
                                                        onClick={() => setSelectedMeeting(m)}
                                                        style={{
                                                            background: `${getProjectColor(m.projectId)}20`,
                                                            border: `1px solid ${getProjectColor(m.projectId)}40`,
                                                            borderLeft: `3px solid ${getProjectColor(m.projectId)}`,
                                                            borderRadius: 6,
                                                            padding: '4px 7px',
                                                            cursor: 'pointer',
                                                            marginBottom: 2,
                                                            transition: 'opacity 0.15s',
                                                        }}
                                                        onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                                                        onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                                                    >
                                                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {m.title}
                                                        </div>
                                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.duration}min</div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* MONTH VIEW */
                        <div>
                            <div className="calendar-grid" style={{ marginBottom: 4 }}>
                                {DAYS_OF_WEEK.map(d => (
                                    <div key={d} className="calendar-header-cell">{d}</div>
                                ))}
                            </div>
                            <div className="calendar-grid">
                                {/* empty leading cells */}
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} className="calendar-day other-month" />
                                ))}
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                    const meetings = getMeetingsForDay(day);
                                    const isToday = day === 20 && month === 1 && year === 2026;
                                    return (
                                        <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                                            <div className="calendar-day-num">{day}</div>
                                            {meetings.map(m => (
                                                <div
                                                    key={m.id}
                                                    className="meeting-pill"
                                                    style={{
                                                        background: `${getProjectColor(m.projectId)}22`,
                                                        color: getProjectColor(m.projectId),
                                                        border: `1px solid ${getProjectColor(m.projectId)}33`,
                                                    }}
                                                    onClick={() => setSelectedMeeting(m)}
                                                >
                                                    {m.title}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="detail-sidebar">
                    {selectedMeeting ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div className="detail-sidebar-title" style={{ marginBottom: 0 }}>Meeting Details</div>
                                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setSelectedMeeting(null)}>
                                    <X size={14} />
                                </button>
                            </div>
                            <div style={{
                                background: `${getProjectColor(selectedMeeting.projectId)}12`,
                                border: `1px solid ${getProjectColor(selectedMeeting.projectId)}25`,
                                borderRadius: 10,
                                padding: '14px',
                                marginBottom: 16,
                            }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.4 }}>
                                    {selectedMeeting.title}
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selectedMeeting.description}</div>
                            </div>
                            <div className="detail-row">
                                <span className="detail-row-label">Project</span>
                                <span className="detail-row-value" style={{ color: getProjectColor(selectedMeeting.projectId), fontWeight: 600 }}>
                                    {selectedMeeting.project}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-row-label">Date</span>
                                <span className="detail-row-value">{selectedMeeting.date} · {selectedMeeting.time}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-row-label">Duration</span>
                                <span className="detail-row-value">{selectedMeeting.duration} minutes</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-row-label">Budget Tier</span>
                                <span className="detail-row-value">
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 5,
                                        color: TIER_COLORS[selectedMeeting.budgetTier],
                                        fontWeight: 600, fontSize: 12,
                                    }}>
                                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: TIER_COLORS[selectedMeeting.budgetTier], display: 'inline-block' }} />
                                        {selectedMeeting.budgetTier.charAt(0).toUpperCase() + selectedMeeting.budgetTier.slice(1)}
                                    </span>
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-row-label">Days to Deadline</span>
                                <span className="detail-row-value" style={{
                                    color: selectedMeeting.daysToDeadline <= 3 ? 'var(--accent-rose)' :
                                        selectedMeeting.daysToDeadline <= 7 ? 'var(--accent-amber)' : 'var(--text-primary)',
                                    fontWeight: 600,
                                }}>
                                    {selectedMeeting.daysToDeadline} days
                                </span>
                            </div>
                            {selectedMeeting.importanceScore && (
                                <div className="detail-row">
                                    <span className="detail-row-label">Importance</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 50, height: 5, background: 'rgba(59,130,246,0.1)', borderRadius: 100, overflow: 'hidden' }}>
                                            <div style={{ width: `${selectedMeeting.importanceScore}%`, height: '100%', background: 'var(--accent-blue)', borderRadius: 100 }} />
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedMeeting.importanceScore}%</span>
                                    </div>
                                </div>
                            )}
                            <div style={{ marginTop: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                                    Participants ({selectedMeeting.participants.length})
                                </div>
                                {selectedMeeting.participants.map((p, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid rgba(30,45,74,0.3)' }}>
                                        <div style={{
                                            width: 24, height: 24, borderRadius: '50%',
                                            background: `hsl(${(i * 60) + 200}, 70%, 35%)`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0,
                                        }}>
                                            {p.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{p}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <Calendar size={32} className="empty-state-icon" />
                            <div className="empty-state-text">Click a meeting to view details</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

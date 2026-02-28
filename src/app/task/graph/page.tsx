'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { GRAPH_NODES, GRAPH_EDGES, PROJECTS } from '@/lib/mockData';
import { TopHeader } from '@/components/Navigation';
import { ZoomIn, ZoomOut, RotateCcw, Filter, X } from 'lucide-react';

type Node = typeof GRAPH_NODES[0];

const STATUS_FILL: Record<string, string> = {
    complete: '#10b981',
    active: '#3b82f6',
    open: '#4a5980',
    blocked: '#f43f5e',
    assigned: '#06b6d4',
};

const STATUS_LABEL: Record<string, string> = {
    complete: 'Completed',
    active: 'In Progress',
    open: 'Open',
    blocked: 'Blocked',
    assigned: 'Assigned',
};

export default function TaskGraphPage() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 30, y: 30 });
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterComplexity, setFilterComplexity] = useState(0);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const visibleNodes = GRAPH_NODES.filter(n => {
        if (filterStatus !== 'all' && n.status !== filterStatus) return false;
        if (filterComplexity > 0 && n.complexity < filterComplexity) return false;
        return true;
    });

    const visibleIds = new Set(visibleNodes.map(n => n.id));
    const visibleEdges = GRAPH_EDGES.filter(e => visibleIds.has(e.from) && visibleIds.has(e.to));

    function handleMouseDown(e: React.MouseEvent) {
        if ((e.target as SVGElement).closest('circle,rect')) return;
        setDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }

    function handleMouseMove(e: React.MouseEvent) {
        if (!dragging) return;
        setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }

    function handleWheel(e: React.WheelEvent) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(z => Math.max(0.5, Math.min(2, z + delta)));
    }

    function handleNodeClick(node: Node) {
        setSelectedNode(s => s?.id === node.id ? null : node);
        // center view on node
        setPan({ x: 400 - node.x * zoom, y: 250 - node.y * zoom });
    }

    const getBlockedBy = (id: string) => GRAPH_EDGES.filter(e => e.to === id).map(e => e.from);
    const getBlocks = (id: string) => GRAPH_EDGES.filter(e => e.from === id).map(e => e.to);

    return (
        <>
            <TopHeader title="Task Intelligence" subtitle="Dependency Graph" />
            <div className="page-content animate-fade" style={{ padding: 0, display: 'flex', gap: 0, height: '100%' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Toolbar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', flexShrink: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                            Task Dependency Graph
                        </span>
                        <div style={{ height: 16, width: 1, background: 'var(--border)', margin: '0 4px' }} />
                        <select
                            className="select"
                            style={{ fontSize: 12, padding: '4px 28px 4px 8px' }}
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="open">Open</option>
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                            <option value="complete">Complete</option>
                        </select>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                            Min complexity:
                            <input
                                type="number"
                                min={0} max={9}
                                value={filterComplexity}
                                onChange={e => setFilterComplexity(Number(e.target.value))}
                                style={{ width: 40, fontSize: 12, padding: '3px 6px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setZoom(z => Math.min(2, z + 0.1))}><ZoomIn size={14} /></button>
                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}><ZoomOut size={14} /></button>
                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => { setZoom(1); setPan({ x: 30, y: 30 }); }}>
                                <RotateCcw size={14} />
                            </button>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '4px 8px', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                                {Math.round(zoom * 100)}%
                            </span>
                        </div>
                    </div>

                    {/* Graph Canvas */}
                    <div style={{ flex: 1, overflow: 'hidden', background: 'var(--bg-primary)', position: 'relative' }}>
                        {/* Grid background */}
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(30,45,74,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

                        <svg
                            ref={svgRef}
                            width="100%"
                            height="100%"
                            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={() => setDragging(false)}
                            onMouseLeave={() => setDragging(false)}
                            onWheel={handleWheel}
                        >
                            <defs>
                                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L8,3 z" fill="rgba(74,89,128,0.7)" />
                                </marker>
                                <marker id="arrow-selected" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6" />
                                </marker>
                            </defs>

                            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                                {/* Edges */}
                                {visibleEdges.map((edge, i) => {
                                    const from = visibleNodes.find(n => n.id === edge.from);
                                    const to = visibleNodes.find(n => n.id === edge.to);
                                    if (!from || !to) return null;
                                    const isRelated = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to);
                                    return (
                                        <line
                                            key={i}
                                            x1={from.x} y1={from.y}
                                            x2={to.x - 20} y2={to.y}
                                            stroke={isRelated ? '#3b82f6' : 'rgba(74,89,128,0.5)'}
                                            strokeWidth={isRelated ? 2 : 1.5}
                                            markerEnd={isRelated ? 'url(#arrow-selected)' : 'url(#arrow)'}
                                            strokeDasharray={isRelated ? 'none' : '4 3'}
                                        />
                                    );
                                })}

                                {/* Nodes */}
                                {visibleNodes.map(node => {
                                    const fill = STATUS_FILL[node.status] || '#4a5980';
                                    const isSelected = selectedNode?.id === node.id;
                                    const isHovered = hoveredNode === node.id;
                                    const isHighComplexity = node.complexity > 7;

                                    return (
                                        <g
                                            key={node.id}
                                            transform={`translate(${node.x}, ${node.y})`}
                                            onClick={() => handleNodeClick(node)}
                                            onMouseEnter={() => setHoveredNode(node.id)}
                                            onMouseLeave={() => setHoveredNode(null)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {/* Selection ring */}
                                            {isSelected && (
                                                <circle r={28} fill="none" stroke="#3b82f6" strokeWidth={2} opacity={0.5} />
                                            )}
                                            {/* Node circle */}
                                            <circle
                                                r={20}
                                                fill={fill}
                                                fillOpacity={isHighComplexity ? 1 : 0.85}
                                                stroke={isSelected ? '#3b82f6' : isHighComplexity ? '#f97316' : `${fill}80`}
                                                strokeWidth={isSelected ? 2.5 : isHighComplexity ? 2 : 1.5}
                                            />
                                            {/* Complexity indicator ring */}
                                            {isHighComplexity && (
                                                <circle r={22} fill="none" stroke="#f97316" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.6} />
                                            )}
                                            {/* Task ID text */}
                                            <text
                                                textAnchor="middle" dominantBaseline="middle"
                                                fill="white" fontSize={7.5}
                                                fontFamily="JetBrains Mono, monospace"
                                                fontWeight={600}
                                            >
                                                {node.id}
                                            </text>
                                            {/* Label below */}
                                            <text
                                                y={28} textAnchor="middle"
                                                fill="rgba(139,157,195,0.9)" fontSize={9}
                                                fontFamily="Inter, sans-serif"
                                            >
                                                {node.label}
                                            </text>

                                            {/* Hover tooltip */}
                                            {(isHovered || isSelected) && (
                                                <g transform="translate(22, -36)">
                                                    <rect x={0} y={0} width={110} height={50} rx={6} fill="#1e2a42" stroke="rgba(59,130,246,0.3)" strokeWidth={1} />
                                                    <text x={6} y={14} fill="#e8edf5" fontSize={9} fontWeight={600}>{node.id}</text>
                                                    <text x={6} y={26} fill="#8b9dc3" fontSize={8}>{STATUS_LABEL[node.status]}</text>
                                                    <text x={6} y={38} fill="#8b9dc3" fontSize={8}>Complexity: {node.complexity}/10</text>
                                                </g>
                                            )}
                                        </g>
                                    );
                                })}
                            </g>
                        </svg>

                        {/* Legend */}
                        <div style={{
                            position: 'absolute', bottom: 16, left: 16,
                            background: 'rgba(15,19,32,0.9)', backdropFilter: 'blur(8px)',
                            border: '1px solid var(--border)', borderRadius: 10,
                            padding: '12px 14px',
                        }}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                                Node Status
                            </div>
                            {Object.entries(STATUS_FILL).map(([status, color]) => (
                                <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{STATUS_LABEL[status]}</span>
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #f97316' }} />
                                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>High Complexity (7+)</span>
                            </div>
                        </div>

                        {/* Controls hint */}
                        <div style={{
                            position: 'absolute', bottom: 16, right: selectedNode ? 316 : 16,
                            fontSize: 10, color: 'var(--text-muted)',
                            background: 'rgba(15,19,32,0.8)',
                            padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)',
                        }}>
                            Scroll to zoom · Drag to pan · Click node for details
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                {selectedNode && (
                    <div className="detail-sidebar" style={{ animation: 'slideIn 0.2s ease' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <div className="detail-sidebar-title" style={{ marginBottom: 0 }}>Node Details</div>
                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setSelectedNode(null)}>
                                <X size={14} />
                            </button>
                        </div>

                        <div style={{
                            background: `${STATUS_FILL[selectedNode.status]}12`,
                            border: `1px solid ${STATUS_FILL[selectedNode.status]}30`,
                            borderRadius: 10, padding: 14, marginBottom: 14,
                        }}>
                            <div style={{ fontSize: 11, color: STATUS_FILL[selectedNode.status], fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, marginBottom: 4 }}>
                                {selectedNode.id}
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedNode.label}</div>
                        </div>

                        <div className="detail-row">
                            <span className="detail-row-label">Status</span>
                            <span style={{ fontSize: 12, color: STATUS_FILL[selectedNode.status], fontWeight: 600 }}>
                                {STATUS_LABEL[selectedNode.status]}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-row-label">Complexity</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ display: 'flex', gap: 1 }}>
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <div key={i} style={{
                                            width: 5, height: 10, borderRadius: 1,
                                            background: i < selectedNode.complexity
                                                ? (selectedNode.complexity > 7 ? 'var(--accent-rose)' : 'var(--accent-amber)')
                                                : 'rgba(255,255,255,0.06)',
                                        }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedNode.complexity}/10</span>
                            </div>
                        </div>

                        {/* Blocks */}
                        {getBlocks(selectedNode.id).length > 0 && (
                            <div style={{ marginTop: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                                    Blocks ({getBlocks(selectedNode.id).length})
                                </div>
                                {getBlocks(selectedNode.id).map(id => (
                                    <div key={id} style={{
                                        padding: '6px 10px', background: 'rgba(59,130,246,0.08)',
                                        border: '1px solid rgba(59,130,246,0.2)', borderRadius: 6, marginBottom: 4,
                                        fontSize: 12, color: 'var(--accent-blue-light)', fontFamily: 'JetBrains Mono, monospace',
                                        cursor: 'pointer',
                                    }}
                                        onClick={() => {
                                            const node = GRAPH_NODES.find(n => n.id === id);
                                            if (node) handleNodeClick(node);
                                        }}
                                    >
                                        {id} →
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Blocked By */}
                        {getBlockedBy(selectedNode.id).length > 0 && (
                            <div style={{ marginTop: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                                    Blocked By ({getBlockedBy(selectedNode.id).length})
                                </div>
                                {getBlockedBy(selectedNode.id).map(id => (
                                    <div key={id} style={{
                                        padding: '6px 10px', background: 'rgba(244,63,94,0.08)',
                                        border: '1px solid rgba(244,63,94,0.2)', borderRadius: 6, marginBottom: 4,
                                        fontSize: 12, color: '#fb7185', fontFamily: 'JetBrains Mono, monospace',
                                        cursor: 'pointer',
                                    }}
                                        onClick={() => {
                                            const node = GRAPH_NODES.find(n => n.id === id);
                                            if (node) handleNodeClick(node);
                                        }}
                                    >
                                        ← {id}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ marginTop: 20 }}>
                            <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                                View Full Details
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

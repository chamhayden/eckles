import React, { useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  Handle,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const CourseNode = ({ data, selected }) => {
  const { title, status = 'available', onClick, totalMinute, duration } = data;
  const displayDuration = totalMinute ?? duration;

  const statusConfig = {
    locked: {
      bg: 'linear-gradient(145deg, #252540 0%, #1e1e35 100%)',
      border: '#3d3d60',
      glow: 'none',
      cursor: 'not-allowed',
      opacity: 0.55,
    },
    available: {
      bg: 'linear-gradient(145deg, #4158D0 0%, #3a4cbb 100%)',
      border: '#5a6fd6',
      glow: '0 4px 20px rgba(65, 88, 208, 0.25)',
      cursor: 'pointer',
      opacity: 1,
    },
    'in-progress': {
      bg: 'linear-gradient(145deg, #4158D0 0%, #3a4cbb 100%)',
      border: '#1735c9ff',
      cursor: 'pointer',
      opacity: 1,
    },
    completed: {
      bg: 'linear-gradient(145deg, #2ed573 0%, #26b862 100%)',
      border: '#57e28f',
      glow: '0 4px 20px rgba(46, 213, 115, 0.3)',
      cursor: 'pointer',
      opacity: 1,
    },
  };

  const cfg = statusConfig[status] || statusConfig.available;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: cfg.border,
          border: '2px solid #1a1a2e',
          width: 8,
          height: 8,
          top: -4,
        }}
      />
      <div
        onClick={() => status !== 'locked' && onClick?.()}
        style={{
          background: cfg.bg,
          border: `2px solid ${cfg.border}`,
          borderRadius: '14px',
          padding: '14px 24px',
          minWidth: '150px',
          maxWidth: '200px',
          cursor: cfg.cursor,
          opacity: cfg.opacity,
          boxShadow: cfg.glow,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: selected ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            textAlign: 'center',
            letterSpacing: '0.3px',
            lineHeight: 1.3,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {title}
        </div>
        {displayDuration !== undefined && (
          <div
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              textAlign: 'center',
              marginTop: '6px',
              fontWeight: 500,
            }}
          >
            {displayDuration} Minutes
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: cfg.border,
          border: '2px solid #1a1a2e',
          width: 8,
          height: 8,
          bottom: -4,
        }}
      />
    </>
  );
};

const Legend = () => (
  <div
    style={{
      position: 'absolute',
      top: 20,
      left: 80,
      background: 'rgba(20, 20, 40, 0.85)',
      backdropFilter: 'blur(12px)',
      padding: '14px 18px',
      borderRadius: '12px',
      border: '1px solid rgba(90, 111, 214, 0.25)',
      zIndex: 10,
    }}
  >
    <div
      style={{
        color: '#fff',
        fontSize: '11px',
        fontWeight: 700,
        marginBottom: '10px',
        letterSpacing: '0.5px',
      }}
    >
      Course Status
    </div>
    {[
      { label: 'completed', color: '#2ed573' },
      { label: 'in-progress', color: '#7b5cc9ff' },
      { label: 'available', color: '#4158D0' },
      { label: 'locked', color: '#3d3d60ff' },
    ].map(({ label, color }) => (
      <div
        key={label}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}
      >
        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: color }} />
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '10px' }}>{label}</span>
      </div>
    ))}
  </div>
);

const calculateLayout = (courses, config) => {
  const { nodeWidth, horizontalSpacing, verticalSpacing } = config;
  const parents = new Map(courses.map((c) => [c.id, c.prerequisites || []]));
  const levels = new Map();

  const getLevel = (id, stack = new Set()) => {
    if (levels.has(id)) return levels.get(id);
    if (stack.has(id)) return 0;
    stack.add(id);
    const prereqs = parents.get(id) || [];
    const level =
      prereqs.length === 0 ? 0 : Math.max(...prereqs.map((pid) => getLevel(pid, stack))) + 1;
    levels.set(id, level);
    return level;
  };

  courses.forEach((c) => getLevel(c.id));

  const levelGroups = new Map();
  courses.forEach((course) => {
    const lvl = levels.get(course.id);
    if (!levelGroups.has(lvl)) levelGroups.set(lvl, []);
    levelGroups.get(lvl).push(course);
  });

  const positions = new Map();
  [...levelGroups.keys()]
    .sort((a, b) => a - b)
    .forEach((level) => {
      const nodes = levelGroups.get(level);
      const totalW = nodes.length * nodeWidth + (nodes.length - 1) * horizontalSpacing;
      const startX = -totalW / 2 + nodeWidth / 2;
      nodes.forEach((course, i) => {
        positions.set(course.id, {
          x: startX + i * (nodeWidth + horizontalSpacing),
          y: level * verticalSpacing,
        });
      });
    });

  return positions;
};

const CourseRoadmap = ({ courses = [], config = {}, onCourseClick }) => {
  const cfg = {
    nodeWidth: 180,
    nodeHeight: 70,
    horizontalSpacing: 80,
    verticalSpacing: 200,
    showLegend: true,
    showControls: true,
    ...config,
  };

  const nodeTypes = useMemo(() => ({ courseNode: CourseNode }), []);
  const positions = useMemo(() => calculateLayout(courses, cfg), [courses, cfg]);

  const initialNodes = useMemo(
    () =>
      courses.map((course) => ({
        id: course.id,
        type: 'courseNode',
        position: positions.get(course.id) || { x: 0, y: 0 },
        data: { ...course, onClick: () => onCourseClick?.(course) },
      })),
    [courses, positions, onCourseClick]
  );

  const initialEdges = useMemo(() => {
    const edges = [];
    courses.forEach((course) => {
      (course.prerequisites || []).forEach((prereqId) => {
        const isLocked = course.status === 'locked';
        const isActive = course.status === 'in-progress';
        edges.push({
          id: `e-${prereqId}-${course.id}`,
          source: prereqId,
          target: course.id,
          type: 'default',
          animated: isActive,
          style: { stroke: isLocked ? '#3d3d60' : '#5a6fd6', strokeWidth: isActive ? 2.5 : 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isLocked ? '#3d3d60' : '#5a6fd6',
            width: 16,
            height: 16,
          },
        });
      });
    });
    return edges;
  }, [courses]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.4}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#12121f' }}
      >
        <Background color="#2a2a45" gap={24} size={1} variant="dots" />
        {cfg.showControls && <Controls style={{ background: '#1a1a30', borderColor: '#3d3d60' }} />}
      </ReactFlow>
      {cfg.showLegend && <Legend />}
    </div>
  );
};

export default CourseRoadmap;

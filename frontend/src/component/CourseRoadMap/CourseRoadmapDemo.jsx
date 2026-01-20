import React, { useState } from 'react';
import CourseRoadmap from './CourseRoadmap';

// ============ demo data ============
const sampleCourses = [
  { id: 'html', title: 'HTML Basics', prerequisites: [], status: 'completed', totalMinute: 15 },
  {
    id: 'css',
    title: 'CSS Styling',
    prerequisites: ['html'],
    status: 'completed',
    totalMinute: 20,
  },
  {
    id: 'js-basic',
    title: 'JavaScript Basics',
    prerequisites: ['html'],
    status: 'completed',
    totalMinute: 30,
  },
  {
    id: 'responsive',
    title: 'Responsive Design',
    prerequisites: ['css'],
    status: 'in-progress',
    totalMinute: 12,
  },
  {
    id: 'js-dom',
    title: 'DOM Manipulation',
    prerequisites: ['js-basic', 'css'],
    status: 'available',
    totalMinute: 18,
  },
  {
    id: 'es6',
    title: 'ES6+ New Features',
    prerequisites: ['js-basic'],
    status: 'available',
    totalMinute: 25,
  },
  {
    id: 'sass',
    title: 'Sass/SCSS',
    prerequisites: ['responsive'],
    status: 'locked',
    totalMinute: 10,
  },
  {
    id: 'react',
    title: 'React Framework',
    prerequisites: ['js-dom', 'es6'],
    status: 'locked',
    totalMinute: 40,
  },
  {
    id: 'vue',
    title: 'Vue Framework',
    prerequisites: ['js-dom', 'es6'],
    status: 'locked',
    totalMinute: 35,
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    prerequisites: ['es6'],
    status: 'locked',
    totalMinute: 28,
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    prerequisites: ['react', 'typescript'],
    status: 'locked',
    totalMinute: 22,
  },
  {
    id: 'nuxt',
    title: 'Nuxt.js',
    prerequisites: ['vue', 'typescript'],
    status: 'locked',
    totalMinute: 20,
  },
];

const CourseDetailModal = ({ course, onClose }) => {
  if (!course) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #1e1e35 0%, #16162a 100%)',
          borderRadius: '20px',
          padding: '32px',
          maxWidth: '400px',
          width: '90%',
          border: '1px solid rgba(90, 111, 214, 0.3)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <h2 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: '20px' }}>{course.title}</h2>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6 }}>
          <p>status: {course.status}</p>
          {course.totalMinute && <p>duration: {course.totalMinute} minutes</p>}
          {course.prerequisites?.length > 0 && <p>pre-course: {course.prerequisites.join(', ')}</p>}
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '10px 24px',
            background: 'linear-gradient(145deg, #5865F2 0%, #4752c4 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          close
        </button>
      </div>
    </div>
  );
};

// ============ Demo  ============
function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Roadmap */}
      <div style={{ width: '100%', height: '100%', paddingTop: '80px' }}>
        <CourseRoadmap
          courses={sampleCourses}
          onCourseClick={(course) => {
            setSelectedCourse(course);
            console.log('Selected:', course);
          }}
        />
      </div>

      {/* Modal */}
      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}


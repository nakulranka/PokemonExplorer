import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton">
      {Array(4).fill().map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      ))}
      <style>{`
        .skeleton { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; padding: 1rem; }
        .skeleton-card { background: #f5f5f5; border-radius: 8px; padding: 1rem; }
        .skeleton-image, .skeleton-text { background: linear-gradient(90deg, #f5f5f5 25%, #eee 50%, #f5f5f5 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
        .skeleton-image { width: 100px; height: 100px; margin: 0 auto; border-radius: 50%; }
        .skeleton-text { height: 1rem; margin: 0.5rem 0; border-radius: 4px; }
        @keyframes loading { to { background-position: 200% 0; } }
      `}</style>
    </div>
  );
};

export default SkeletonLoader;
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
          <style>{`
            .error-boundary { text-align: center; padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); margin: 1rem; }
            .error-boundary button { padding: 0.5rem 1rem; background: #ffccbc; border: none; border-radius: 4px; cursor: pointer; }
          `}</style>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
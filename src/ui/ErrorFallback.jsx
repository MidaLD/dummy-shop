function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="error-fallback-main">
      <div className="error-container">
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <button className="error-btn" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </main>
  );
}

export default ErrorFallback;

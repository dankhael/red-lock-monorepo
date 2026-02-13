import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <h3>Error</h3>
      <p>{message || 'Something went wrong. Please try again later.'}</p>
    </div>
  );
}

export default ErrorMessage; 
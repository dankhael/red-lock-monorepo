import React from 'react';

function ReactMarkdown({ children }) {
  return React.createElement('div', { 'data-testid': 'mock-markdown' }, children);
}

export default ReactMarkdown;

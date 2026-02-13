import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom components for different elements
          h1: ({node, ...props}) => <h1 className="markdown-h1" {...props} />,
          h2: ({node, ...props}) => <h2 className="markdown-h2" {...props} />,
          p: ({node, ...props}) => <p className="markdown-p" {...props} />,
          strong: ({node, ...props}) => <strong className="markdown-bold" {...props} />,
          em: ({node, ...props}) => <em className="markdown-italic" {...props} />,
          code: ({node, inline, ...props}) => (
            inline ? 
              <code className="markdown-inline-code" {...props} /> :
              <code className="markdown-code-block" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer; 
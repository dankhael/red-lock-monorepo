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
          h1: ({node, children, ...props}) => <h1 className="markdown-h1" {...props}>{children}</h1>,
          h2: ({node, children, ...props}) => <h2 className="markdown-h2" {...props}>{children}</h2>,
          p: ({node, ...props}) => <p className="markdown-p" {...props} />,
          strong: ({node, ...props}) => <strong className="markdown-bold" {...props} />,
          em: ({node, ...props}) => <em className="markdown-italic" {...props} />,
          // react-markdown v10 não passa mais `inline`: bloco = tem linguagem ou quebra de linha
          code: ({node, className, children, ...props}) => {
            const isBlock = /language-/.test(className || '') || String(children).includes('\n');
            return (
              <code className={isBlock ? 'markdown-code-block' : 'markdown-inline-code'} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer; 
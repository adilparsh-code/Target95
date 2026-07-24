"use client";

import Card from "./Card";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ExampleCard({ children, language = 'java' }) {
  return (
    <Card title="Example" icon="beaker">
      <div className="-m-6 -mt-2">
      <SyntaxHighlighter language={language} style={a11yDark} showLineNumbers>
        {children}
      </SyntaxHighlighter>
      </div>
    </Card>
  );
}
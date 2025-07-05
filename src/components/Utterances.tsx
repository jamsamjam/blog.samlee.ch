"use client";

import { useEffect, useRef } from 'react';

interface UtterancesProps {
  repo: string;
  theme?: 'github-light' | 'github-dark' | 'preferred-color-scheme';
  issueTerm?: 'pathname' | 'url' | 'title';
}

export default function Utterances({ 
  repo, 
  theme = 'preferred-color-scheme',
  issueTerm = 'pathname' 
}: UtterancesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove any existing utterances
    const existingScript = containerRef.current.querySelector('.utterances');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', issueTerm);
    script.setAttribute('theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');

    containerRef.current.appendChild(script);
  }, [repo, theme, issueTerm]);

  return <div ref={containerRef} className="utterances-container" />;
}

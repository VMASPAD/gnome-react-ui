'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';

type MdxCodeProps = React.ComponentProps<'code'> & {
  forceBlock?: boolean;
  language?: string;
};

type MdxPreProps = React.ComponentProps<'pre'> & {
  children?: React.ReactNode;
  'data-language'?: string;
};

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

function getLanguage(className?: string) {
  const match = /language-([\w-]+)/.exec(className ?? '');
  return match?.[1] ?? 'text';
}

function getLanguageLabel(language: string) {
  const lower = language.toLowerCase();
  if ([
    'bash',
    'sh',
    'zsh',
    'shell',
    'terminal',
    'console',
    'cmd',
    'powershell',
  ].includes(lower)) {
    return 'command';
  }

  return lower;
}

export function MdxCode({ className, children, forceBlock = false, language, ...props }: MdxCodeProps) {
  const resolvedLanguage = language ?? getLanguage(className);
  const extractedText = extractText(children);
  const looksLikeCommand = /^(npm|npm|yarn|bun|npx|pnpx|cargo|pip|go|deno|git)\b/i.test(
    extractedText.trim(),
  );
  const isBlock =
    forceBlock ||
    (className ?? '').includes('language-') ||
    Boolean(language) ||
    looksLikeCommand ||
    extractedText.includes('\n');
  const [copied, setCopied] = React.useState(false);

  if (!isBlock) {
    return (
      <code
        className="rounded-md border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-[0.78em] text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  }

  const label = looksLikeCommand ? 'command' : getLanguageLabel(resolvedLanguage);
  const code = extractedText.replace(/\n$/, '');

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="gnome-code-block" data-language={looksLikeCommand ? 'command' : resolvedLanguage}>
      <button type="button" onClick={onCopy} className="gnome-code-copy" aria-label="Copy code">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <pre className="gnome-code-pre">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export function MdxPre({ children, className, ...props }: MdxPreProps) {
  const childrenArray = React.Children.toArray(children);
  const codeNode = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === 'code',
  ) as React.ReactElement<React.ComponentProps<'code'> & { 'data-language'?: string }> | undefined;

  if (codeNode) {
    const codeProps = codeNode.props as React.ComponentProps<'code'> & {
      'data-language'?: string;
    };

    const mergedClassName = [className, codeProps.className].filter(Boolean).join(' ') || undefined;
    const language = props['data-language'] ?? codeProps['data-language'];

    return (
      <MdxCode className={mergedClassName} forceBlock language={language}>
        {codeProps.children}
      </MdxCode>
    );
  }

  return (
    <pre className={className} {...props}>
      {children}
    </pre>
  );
}

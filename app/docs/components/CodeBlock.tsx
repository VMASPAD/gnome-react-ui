"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check } from "lucide-react";

export function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);
  const match = /language-(\w+)/.exec(className ?? "");
  const language = match ? match[1] : "text";
  const code = String(children).replace(/\n$/, "");

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border bg-[oklch(0.16_0.02_330)]">
      <div className="flex items-center justify-between border-b border-white/8 bg-[oklch(0.19_0.02_330)] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_20)]" />
          <span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.18_80)]" />
          <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_150)]" />
          <span className="ml-2 font-mono text-[10px] font-medium uppercase tracking-widest text-white/30">
            {language}
          </span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-[11px] text-white/40 transition-colors hover:bg-white/8 hover:text-white/80"
        >
          {copied ? (
            <Check size={11} className="text-[oklch(0.65_0.18_150)]" />
          ) : (
            <Copy size={11} />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1.125rem 1rem",
          background: "transparent",
          fontSize: "0.8rem",
          lineHeight: "1.75",
          borderRadius: 0,
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/** Inline code — no client state needed but co-located for convenience. */
export function InlineCode({
  children,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code
      className="rounded-md border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-[0.78em] text-foreground"
      {...props}
    >
      {children}
    </code>
  );
}

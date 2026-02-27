"use client";

import * as React from "react";
import * as Icons from "lucide-react";

export function CopyLinkButton({ id }: { id: string }) {
  const [copied, setCopied] = React.useState(false);

  function copyLink() {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={copyLink}
      aria-label="Copy link to section"
      title="Copy link"
      className="ml-2 inline-flex items-center opacity-0 transition-opacity duration-100 group-hover:opacity-50 hover:!opacity-100"
    >
      {copied ? (
        <Icons.Check size={13} className="inline -mt-0.5 text-[oklch(0.65_0.18_150)]" />
      ) : (
        <Icons.Hash size={13} className="inline -mt-0.5 text-primary" />
      )}
    </button>
  );
}

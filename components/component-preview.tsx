import * as React from "react";

export default function ComponentPreview({ title, name, children }: { title: string, name: string, children: React.ReactNode }) {
  return (
    <div className="gnome-component-preview not-prose flex flex-col gap-2 my-6">
      {title && <div className="text-sm text-muted-foreground font-medium">{title}</div>}
      <div className="gnome-component-preview-surface not-prose border rounded-xl p-6 flex justify-center items-center bg-background shadow-sm min-h-[200px]">
        {children}
      </div>
    </div>
  );
}

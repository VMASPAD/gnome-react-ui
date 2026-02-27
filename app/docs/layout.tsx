// app/docs/layout.tsx  — Server Component (no "use client")
import { getAllDocMetas } from "./lib/docs";
import { DocsShell } from "./components/DocsShell";
import { DocsTopbar } from "./components/DocsTopbar";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocMetas();

  return (
    <DocsShell docs={docs} topbar={<DocsTopbar />}>
      {children}
    </DocsShell>
  );
}

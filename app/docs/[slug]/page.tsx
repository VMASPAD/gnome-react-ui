// app/docs/[slug]/page.tsx  — Server Component
import { notFound } from "next/navigation";
import { getDocSlugs, getDocRaw, slugToLabel, extractHeadings } from "../lib/docs";
import { DocsToc } from "../components/DocsToc";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slugToLabel(slug)} — GnomeUI`,
    description: `GnomeUI docs for the ${slugToLabel(slug)} component`,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getDocSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  // Dynamic import — Next.js compiles MDX into a React component at build time
  let Post: React.ComponentType;
  try {
    const mod = await import(`@/app/docs/mdx/${slug}.mdx`);
    Post = mod.default;
  } catch {
    notFound();
  }

  // Extract headings SERVER-SIDE (cached via React.cache).
  // Only the small Heading[] array is serialized to the client — not the full raw string.
  const raw = getDocRaw(slug);
  const headings = extractHeadings(raw);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Article — Server Component, streamed as static HTML */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10 lg:py-12">
          <Post />
        </div>
      </main>

      {/* TOC — client island: receives pre-computed Heading[] from server */}
      <DocsToc headings={headings} />
    </div>
  );
}

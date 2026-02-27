// app/docs/[slug]/page.tsx  — Server Component
import { notFound } from "next/navigation";
import { getDocSlugs, getDocRaw, slugToLabel } from "../lib/docs";
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

  // Dynamic import — Next.js compiles MDX into a React component
  let Post: React.ComponentType;
  try {
    const mod = await import(`@/app/docs/mdx/${slug}.mdx`);
    Post = mod.default;
  } catch {
    notFound();
  }

  const raw = getDocRaw(slug);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Article */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10 lg:py-12">
          <Post />
        </div>
      </main>

      {/* Table of Contents — client island for scroll-based active highlight */}
      <DocsToc raw={raw} />
    </div>
  );
}

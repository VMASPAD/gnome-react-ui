import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import rehypeSlug from 'rehype-slug';

export interface DocEntry {
  slug: string;
  label: string;
  // `content` will be the serialized MDX ready for `MDXRemote`
  content: MDXRemoteSerializeResult;
  // keep the raw mdx for heading extraction
  raw: string;
}

const MDX_DIR = path.join(process.cwd(), 'app/docs/mdx');

function stripTopLevelMdxImports(source: string): string {
  const lines = source.split(/\r?\n/);
  const output: string[] = [];

  let inFrontmatter = false;
  let frontmatterDone = false;
  let seenNonEmptyBodyLine = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!frontmatterDone && index === 0 && trimmed === '---') {
      inFrontmatter = true;
      output.push(line);
      continue;
    }

    if (inFrontmatter) {
      output.push(line);
      if (trimmed === '---') {
        inFrontmatter = false;
        frontmatterDone = true;
      }
      continue;
    }

    const isImportOrExport = /^(import|export)\s/.test(trimmed);
    const canStrip = !seenNonEmptyBodyLine && isImportOrExport;

    if (canStrip) {
      continue;
    }

    if (trimmed.length > 0) {
      seenNonEmptyBodyLine = true;
    }

    output.push(line);
  }

  return output.join('\n');
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function getAllDocs(): Promise<DocEntry[]> {
  const files = fs
    .readdirSync(MDX_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .sort();

  const entries = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(MDX_DIR, file), 'utf-8');
      const cleanedRaw = stripTopLevelMdxImports(raw);

      const mdxSource = await serialize(cleanedRaw, {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkMdx, remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      });

      return {
        slug,
        label: slugToLabel(slug),
        content: mdxSource,
        raw: cleanedRaw,
      };
    }),
  );

  return entries;
}

import fs from 'fs';
import path from 'path';
import { cache } from 'react';

const MDX_DIR = path.join(process.cwd(), 'app/docs/mdx');

// ── React.cache: memoizes per request — no duplicate fs I/O within a render ──

export const getDocSlugs = cache((): string[] =>
    fs
        .readdirSync(MDX_DIR)
        .filter((f) => f.endsWith('.mdx'))
        .sort()
        .map((f) => f.replace(/\.mdx$/, ''))
);

export function slugToLabel(slug: string): string {
    return slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

/** Returns the raw MDX text — cached per request. */
export const getDocRaw = cache((slug: string): string => {
    const filePath = path.join(MDX_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf-8');
});

export interface DocMeta {
    slug: string;
    label: string;
}

export const getAllDocMetas = cache((): DocMeta[] =>
    getDocSlugs().map((slug) => ({ slug, label: slugToLabel(slug) }))
);

// ── Heading extraction — runs on the server, result passed as serializable ──

export interface Heading {
    id: string;
    text: string;
    level: number;
}

/** Extract h1–h3 headings from raw MDX text (server-side only). */
export const extractHeadings = cache((raw: string): Heading[] => {
    const headings: Heading[] = [];
    const idCount = new Map<string, number>();
    // Strip fenced code blocks so headers inside them are ignored
    const stripped = raw.replace(/```[\s\S]*?```/g, '');
    const re = /^(#{1,3})\s+(.+)$/gm;
    let m: RegExpExecArray | null;
    while ((m = re.exec(stripped)) !== null) {
        const text = m[2].trim();
        const baseId = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
        const count = idCount.get(baseId) ?? 0;
        idCount.set(baseId, count + 1);
        headings.push({
            id: count === 0 ? baseId : `${baseId}-${count + 1}`,
            text,
            level: m[1].length,
        });
    }
    return headings;
});

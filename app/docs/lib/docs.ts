import fs from 'fs';
import path from 'path';

const MDX_DIR = path.join(process.cwd(), 'app/docs/mdx');

export function getDocSlugs(): string[] {
    return fs
        .readdirSync(MDX_DIR)
        .filter((f) => f.endsWith('.mdx'))
        .sort()
        .map((f) => f.replace(/\.mdx$/, ''));
}

export function slugToLabel(slug: string): string {
    return slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

/** Returns the raw MDX text for heading extraction (TOC). */
export function getDocRaw(slug: string): string {
    const filePath = path.join(MDX_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf-8');
}

export interface DocMeta {
    slug: string;
    label: string;
}

export function getAllDocMetas(): DocMeta[] {
    return getDocSlugs().map((slug) => ({ slug, label: slugToLabel(slug) }));
}

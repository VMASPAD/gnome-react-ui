import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'data/docs/mdx');
const DEST_DIR = path.join(process.cwd(), 'content/docs/components');

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.mdx'));

for (const file of files) {
    const compName = file.replace('.mdx', '');
    const slug = compName.toLowerCase();

    let content = fs.readFileSync(path.join(SRC_DIR, file), 'utf-8');

    // 1. Extract Title
    let title = compName;
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        title = titleMatch[1];
        // remove the markdown title as it's handled by frontmatter/fumadocs
        content = content.replace(titleMatch[0], '');
    }

    // 2. Extract Description (first paragraph)
    let description = `Documentation for ${title} component.`;
    const descMatch = content.match(/^\s*([^<#\n].+?)\n/m);
    if (descMatch && descMatch[1].trim().length > 0) {
        description = descMatch[1].trim();
        // we can leave description in content or remove it. Let's leave it.
    }

    // 3. Transform Tabs to ComponentPreview
    const tabsRegex = /<Tabs\.Root[\s\S]*?<Tabs\.Panel[^>]*value="code">([\s\S]*?)<\/Tabs\.Panel>[\s\S]*?<Tabs\.Panel[^>]*value="preview">([\s\S]*?)<\/Tabs\.Panel>[\s\S]*?<\/Tabs\.Root>/g;

    content = content.replace(tabsRegex, (match, code, preview) => {
        return `<ComponentPreview title="${title} component" name="${slug}">
  ${preview.trim()}
</ComponentPreview>

${code.trim()}
`;
    });

    // 4. Inject Frontmatter, Copy Button, and Installation at the top
    const frontmatter = `---
title: ${title}
description: ${description}
---

import CopyCommandButton from "@/components/copy-command-button";
import InstallationCommands from "@/components/installation-commands";
import ComponentPreview from "@/components/component-preview";

<div className="flex flex-col md:flex-row items-center justify-end gap-2 mb-2">
  <CopyCommandButton
        copyCommand="npm dlx shadcn@latest add gnome-ui/${slug}"
        command="npm dlx shadcn@latest add gnome-ui/${slug}"
  />
</div>

`;

    // Actually, we need to inject the Installation section somewhere. 
    // Let's put it before the first API Reference or at the bottom.
    const apiMatch = content.indexOf('## API');
    const installationContent = `\n## Installation\n\n---\n\n<InstallationCommands packageName="${slug}" />\n\n`;

    if (apiMatch !== -1) {
        content = content.slice(0, apiMatch) + installationContent + content.slice(apiMatch);
    } else {
        content = content + installationContent;
    }

    fs.writeFileSync(path.join(DEST_DIR, file), frontmatter + content);
}

console.log(`Migrated ${files.length} MDX files to ${DEST_DIR}`);

import fs from 'node:fs/promises';
import path from 'node:path';

const apiDir = path.join(process.cwd(),"app", "docs", 'mdx');

function stripFencedBlocks(text) {
  return text.replace(/```([\s\S]*?)```/g, '');
}

function stripInlineCode(text) {
  return text.replace(/`[^`]*`/g, '');
}

function findUnescaped(text) {
  const problems = [];
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // find raw braces
    if (line.includes('{') || line.includes('}')) {
      // ignore common patterns like &:amp; etc containing &amp;lt;
      problems.push({ line: i + 1, reason: 'Contains curly brace', content: line.trim() });
    }

    // find raw angle-bracket tags that are not entities like &lt;
    const ltMatches = [...line.matchAll(/<\/?[A-Za-z][^>]*>/g)];
    if (ltMatches.length > 0) {
      ltMatches.forEach((m) => {
        problems.push({ line: i + 1, reason: 'Looks like raw JSX/HTML tag', content: m[0] });
      });
    }
  }

  return problems;
}

async function run() {
  try {
    const entries = await fs.readdir(apiDir, { withFileTypes: true });
    const mdxFiles = entries.filter(e => e.isFile() && e.name.endsWith('.mdx')).map(e => e.name);

    if (mdxFiles.length === 0) {
      console.log('No mdx files in docs/api');
      return;
    }

    let totalProblems = 0;
    for (const file of mdxFiles) {
      const fp = path.join(apiDir, file);
      const raw = await fs.readFile(fp, 'utf8');

      const stripped = stripInlineCode(stripFencedBlocks(raw));
      const problems = findUnescaped(stripped);

      if (problems.length > 0) {
        totalProblems += problems.length;
        console.log(`\nFile: docs/api/${file} — ${problems.length} potential issue(s):`);
        problems.slice(0, 20).forEach(p => {
          console.log(`  L${p.line}: ${p.reason} -> ${p.content}`);
        });
      }
    }

    if (totalProblems === 0) {
      console.log('No obvious unescaped braces or tags found (outside code blocks).');
    } else {
      console.log(`\nTotal potential issues: ${totalProblems}`);
    }
  } catch (err) {
    console.error('Validator failed:', err);
    process.exit(1);
  }
}

run();

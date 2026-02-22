import fs from 'node:fs/promises';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';

const candidateDirs = [
  path.join(process.cwd(), 'docs', 'api'),
  path.join(process.cwd(), 'app', 'docs', 'mdx'),
];

let apiDir = null;
for (const d of candidateDirs) {
  try {
    const stat = await fs.stat(d).catch(() => null);
    if (stat && stat.isDirectory()) { apiDir = d; break; }
  } catch (e) {}
}

if (!apiDir) {
  console.log('No docs/api or app/docs/mdx directory found.');
  process.exit(0);
}

async function compileFile(filePath) {
  const source = await fs.readFile(filePath, 'utf8');
  try {
    await compile(source, { filepath: filePath, development: true });
    return null;
  } catch (err) {
    return err;
  }
}

async function run() {
  const entries = await fs.readdir(apiDir, { withFileTypes: true });
  const mdxFiles = entries.filter(e => e.isFile() && e.name.endsWith('.mdx')).map(e => e.name);

  if (mdxFiles.length === 0) {
    console.log('No mdx files in docs/api to compile.');
    return;
  }

  let hadError = false;
  for (const f of mdxFiles) {
    const fp = path.join(apiDir, f);
    const err = await compileFile(fp);
    if (err) {
      hadError = true;
      console.error('\n---');
      console.error(`File: ${path.relative(process.cwd(), fp)}`);
      if (err.position) {
        console.error(`Error at line ${err.position.start.line}, column ${err.position.start.column}`);
      }
      console.error('Error message:');
      console.error(err.stack || err.message || String(err));
    }
  }

  if (!hadError) console.log('All MDX files compiled successfully.');
}

run().catch(e => { console.error(e); process.exit(1); });

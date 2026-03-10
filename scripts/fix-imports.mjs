import fs from 'fs';
import path from 'path';

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // We are inside data/components/something/ or data/lib/something/
      // Count depth from data/
      const relToData = path.relative(path.join(process.cwd(), 'data'), path.dirname(fullPath));
      const depth = relToData === '' ? 0 : relToData.split(path.sep).length;
      const prefix = depth === 0 ? './' : '../'.repeat(depth);
      
      let modified = false;

      // Replace gnome-ui/XXX with prefix + components/XXX
      if (content.includes('gnome-ui/')) {
        content = content.replace(/gnome-ui\//g, prefix + 'components/');
        modified = true;
      }
      
      // Replace @/data/lib/XXX with prefix + lib/XXX
      if (content.includes('@/data/lib/')) {
        content = content.replace(/@\/data\/lib\//g, prefix + 'lib/');
        modified = true;
      }

      // Replace @/data/components/XXX with prefix + components/XXX
      if (content.includes('@/data/components/')) {
        content = content.replace(/@\/data\/components\//g, prefix + 'components/');
        modified = true;
      }
      
      // Replace @/lib/XXX with prefix + lib/XXX (leftover from old structure)
      if (content.includes('@/lib/')) {
        content = content.replace(/@\/lib\//g, prefix + 'lib/');
        modified = true;
      }

      // Replace @/components/XXX with prefix + components/XXX
      if (content.includes('@/components/')) {
        content = content.replace(/@\/components\//g, prefix + 'components/');
        modified = true;
      }

      // Replace @/utils/XXX with prefix + lib/XXX (if any)
      if (content.includes('@/utils/')) {
         content = content.replace(/@\/utils\//g, prefix + 'lib/');
         modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

fixImports(path.join(process.cwd(), 'data'));
console.log('Fixed imports in data directory');

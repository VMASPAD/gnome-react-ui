import docgen from 'react-docgen-typescript';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project root is parent of scripts directory
const projectRoot = path.resolve(__dirname, '..');
const componentsDir = path.join(projectRoot, 'app', 'components');
const outputDir = path.join(projectRoot, 'api');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const findTsxFiles = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
};

const tsxFiles = findTsxFiles(componentsDir);

const options = {
  savePropValueAsString: true,
  propFilter: (prop) => {
    if (prop.parent) {
      return !prop.parent.fileName.includes('node_modules');
    }
    return true;
  }
};

const componentDocs = docgen.parse(tsxFiles, options);

const groupedDocs = {};

componentDocs.forEach(doc => {
  const name = doc.displayName || path.basename(doc.filePath, '.tsx');
  
  const match = name.match(/^[A-Z][a-z0-9]+/); 
  const groupName = match ? match[0] : name;

  if (!groupedDocs[groupName]) {
    groupedDocs[groupName] = []; 
  }
  
  groupedDocs[groupName].push(doc);
});

Object.entries(groupedDocs).forEach(([groupName, docs]) => {
  const outputPath = path.join(outputDir, `${groupName}.json`);
  
  fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2));
  console.log(`Generated: api/${groupName}.json (Contains ${docs.length} componente/s)`);
});
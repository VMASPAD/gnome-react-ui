import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas relativas asumiendo que el script corre desde npm/scripts/
const originalComponentsDir = path.resolve(__dirname, '../../app');
const isolatedSrcDir = path.resolve(__dirname, '../src');
const isolatedComponentsDir = path.resolve(isolatedSrcDir, '');
const indexFile = path.resolve(isolatedSrcDir, 'index.ts');

// Carpetas que NO queremos incluir en el paquete NPM
const excludedFolders = ['ui', 'docs', 'utils', 'galery'];

// 1. Limpiar carpeta src/ anterior si existe
if (fs.existsSync(isolatedSrcDir)) {
  fs.rmSync(isolatedSrcDir, { recursive: true, force: true });
}

// 2. Crear nueva estructura base
fs.mkdirSync(isolatedComponentsDir, { recursive: true });

// 3. Leer las carpetas originales, comprobar que sean directorios y excluir las no deseadas
const allItems = fs.readdirSync(originalComponentsDir);
const validFolders = allItems.filter(item => {
  const itemPath = path.join(originalComponentsDir, item);
  return fs.statSync(itemPath).isDirectory() && !excludedFolders.includes(item);
});

// 4. Copiar únicamente las carpetas válidas al entorno aislado
validFolders.forEach(folder => {
  const srcPath = path.join(originalComponentsDir, folder);
  const destPath = path.join(isolatedComponentsDir, folder);
  fs.cpSync(srcPath, destPath, { recursive: true });
});

// 5. Crear el archivo index.ts solo con los componentes copiados
const exportsLines = validFolders.map(folder => `export * from './${folder}';`).join('\n');
fs.writeFileSync(indexFile, exportsLines);

console.log('✅ Entorno de NPM aislado preparado con éxito.');
console.log(`📦 Componentes incluidos: ${validFolders.join(', ') || 'Ninguno'}`);
console.log(`🚫 Carpetas omitidas: ${excludedFolders.join(', ')}`);
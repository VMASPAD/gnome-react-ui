import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas relativas asumiendo que el script corre desde npm/scripts/
const originalComponentsDir = path.resolve(__dirname, '../../components');
const isolatedSrcDir = path.resolve(__dirname, '../src');
const isolatedComponentsDir = path.resolve(isolatedSrcDir, 'components');
const indexFile = path.resolve(isolatedSrcDir, 'index.ts');

// 1. Limpiar carpeta src/ anterior si existe
if (fs.existsSync(isolatedSrcDir)) {
  fs.rmSync(isolatedSrcDir, { recursive: true, force: true });
}

// 2. Crear nueva carpeta src/components/ y copiar archivos
fs.mkdirSync(isolatedComponentsDir, { recursive: true });
fs.cpSync(originalComponentsDir, isolatedComponentsDir, { recursive: true });

// 3. Leer las subcarpetas copiadas (los componentes)
const folders = fs.readdirSync(isolatedComponentsDir).filter(file => {
  return fs.statSync(path.join(isolatedComponentsDir, file)).isDirectory();
});

// 4. Crear el archivo index.ts
const exportsLines = folders.map(folder => `export * from './components/${folder}';`).join('\n');
fs.writeFileSync(indexFile, exportsLines);

console.log('✅ Entorno de NPM aislado preparado. Componentes copiados y src/index.ts generado.');
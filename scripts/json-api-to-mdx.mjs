import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'api');
const outputDir = path.join(rootDir, 'app', 'docs', 'mdx');

// Escapa texto normal para que MDX no intente parsearlo como componentes React
const escapeText = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
};

// Limpia las descripciones específicamente para las celdas de la tabla
const formatTableDescription = (str) => {
  if (!str) return '—';
  let cleaned = str.replace(/```[\s\S]*?```/g, '');
  return escapeText(cleaned)
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, '<br/>');
};

// Simplifica los tipos complejos y limpia el código inline
const formatInlineCode = (str) => {
  if (!str) return '—';
  let t = String(str);

  // 1. Simplifica genéricos largos de React
  t = t.replace(/ReactElement<.*?>/g, 'ReactElement');
  t = t.replace(/ComponentRenderFn<.*?>/g, 'ComponentRenderFn');

  // 2. Simplifica firmas de funciones largas a (...) => retorno
  // Ej: (itemValue: Value, query: string, ...) => boolean  --->  (...) => boolean
  // Ej: string | ((state: State) => string)                --->  string | (...) => string
  if (t.includes('=>') && t.length > 20) {
    t = t.replace(/\(.*\)\s*=>/, '(...) =>');
  }

  // 3. Limpiamos los pipes y saltos de línea para que no rompan la tabla
  return t.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
};

const getDefaultValue = (prop) => {
  if (!prop.defaultValue) return '—';
  const val = prop.defaultValue.value !== undefined ? prop.defaultValue.value : prop.defaultValue;
  return typeof val === 'string' && val.trim() !== '' ? `\`${formatInlineCode(val)}\`` : '—';
};

const generatePropsTable = (props) => {
  const entries = Object.entries(props || {});
  if (entries.length === 0) return 'No props available.';

  let table = '| Prop | Type | Default | Description |\n';
  table += '| :--- | :--- | :--- | :--- |\n';

  entries.forEach(([name, data]) => {
    const propName = data.required ? `**${name}***` : `**${name}**`;
    const type = data.type?.name ? `\`${formatInlineCode(data.type.name)}\`` : '—';
    const defaultValue = getDefaultValue(data);
    const description = formatTableDescription(data.description);

    table += `| ${propName} | ${type} | ${defaultValue} | ${description} |\n`;
  });

  return table;
};

const generateMDX = (fileBaseName, data) => {
  let mdxContent = `---\ntitle: ${fileBaseName}\n---\n\n# ${fileBaseName}\n\n`;

  data.forEach((component) => {
    const displayName = component.displayName || 'Component';
    const rawDescription = component.description ? component.description.replace(/```[\s\S]*?```/g, '') : '';
    const description = escapeText(rawDescription);

    mdxContent += `## ${displayName}\n\n${description}\n\n### Props\n\n${generatePropsTable(component.props)}\n\n---\n\n`;
  });

  return mdxContent;
};

async function run() {
  await fs.mkdir(outputDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const jsonFiles = entries.filter((e) => e.isFile() && e.name.endsWith('.json'));

  if (jsonFiles.length === 0) {
    console.log('No JSON files found in api/.');
    return;
  }

  let count = 0;
  for (const file of jsonFiles) {
    const baseName = path.basename(file.name, '.json');
    try {
      const raw = await fs.readFile(path.join(sourceDir, file.name), 'utf8');
      const json = JSON.parse(raw);
      const mdx = generateMDX(baseName, json);
      
      await fs.writeFile(path.join(outputDir, `${baseName}.mdx`), mdx, 'utf8');
      console.log(`✅ Generated: ${baseName}.mdx`);
      count++;
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error.message);
    }
  }
  console.log(`\nDone. ${count} files generated.`);
}

run().catch(console.error);
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const output = path.join(process.cwd(), 'dist');
const htmlPath = path.join(output, 'index.html');
assert.ok(fs.existsSync(htmlPath), 'Expo não produziu dist/index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
assert.ok(html.includes('/appaula1/'), 'Falta o prefixo /appaula1/ no HTML exportado');
assert.ok(fs.existsSync(path.join(output, '.nojekyll')), 'Falta .nojekyll para GitHub Pages');
const localResources = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(x => x[1]).filter(x => /\.(js|css)(\?|$)/.test(x));
assert.ok(localResources.length > 0, 'Nenhum JavaScript ou CSS referenciado no HTML');
for (const src of localResources) {
  assert.ok(src.startsWith('/appaula1/'), 'URL de recurso fora do caminho base: ' + src);
  const relative = src.slice('/appaula1/'.length).split('?')[0];
  assert.ok(fs.existsSync(path.join(output, relative)), 'Recurso inexistente: ' + relative);
}
console.log('ASTRO CALC: HTML, baseUrl e arquivos estáticos validados (' + localResources.length + ' referências).');

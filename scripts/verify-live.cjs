const assert = require('node:assert/strict');
const url = process.env.PUBLIC_URL;
assert.ok(url && url.startsWith('https://'), 'GitHub Pages não retornou endereço HTTPS');
assert.ok(new URL(url).pathname.startsWith('/appaula1'), 'GitHub Pages apontou para o caminho errado: ' + url);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function getWithRetries(resource, tries = 15) {
  let lastError;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const response = await fetch(resource, { signal: AbortSignal.timeout(12000) });
      if (response.ok) return response.text();
      lastError = new Error(resource + ': HTTP ' + response.status);
    } catch (error) { lastError = error; }
    if (attempt < tries) await sleep(4000);
  }
  throw lastError;
}
(async () => {
  const html = await getWithRetries(url);
  assert.match(html, /ASTRO CALC/, 'Página HTML não contém o título esperado');
  const resources = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g)].map(x => x[1]);
  assert.ok(resources.length, 'Nenhum recurso JavaScript/CSS referenciado no HTML publicado');
  for (const resource of resources) {
    assert.ok(resource.startsWith('/appaula1/'), 'Caminho inválido: ' + resource);
    const assetUrl = new URL(resource, url);
    const body = await getWithRetries(assetUrl.toString(), 4);
    assert.ok(body.length > 0, 'Recurso vazio: ' + assetUrl);
  }
  console.log('Página pública funcionando: ' + url + ' (' + resources.length + ' JS/CSS validados).');
})().catch(error => { console.error(error); process.exitCode = 1; });

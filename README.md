# ASTRO CALC 🚀

Calculadora futurista desenvolvida em React Native, Expo SDK 54 e TypeScript. Uma única base de código para navegador, Android e iOS.

## Desenvolvimento local

Requer Node.js 20.19+ (recomendado Node 22) e npm.

```bash
npm install
npm run web
```

Para conferir a implementação:

```bash
npm run check
npm test
npm run export:web
node scripts/verify-web.cjs
```

Os arquivos da Web são gerados em `dist/`.

## Publicação automática no GitHub Pages

1. Acesse **Settings → Pages → Build and deployment** do repositório.
2. Configure **Source: GitHub Actions** (uma única vez, caso ainda não esteja configurado).
3. Abra **Actions → Publicar Web** e aguarde o job concluir com sucesso. Todo push em `main` dispara uma publicação.
4. Navegue para **https://clienteemporio0001-arch.github.io/appaula1/**.

O caminho de base é `/appaula1` em `expo.experiments.baseUrl`. O projeto usa `expo.web.output: single` porque não utiliza Expo Router. O workflow exporta com `expo export --platform web` e valida se o HTML e os recursos locais referenciam o subcaminho correto.

Os ícones decorativos, o astronauta e as letras utilizam SVG local e fontes do sistema, sem necessidade de CDN.

## Funcionalidades

Adição, subtração, multiplicação, divisão, porcentagem, números negativos e decimais, histórico da sessão, operações encadeadas, teclado físico e microanimações. Não há backend e não há persistência: o histórico some quando a página é atualizada.

**Fase 2:** somente Web; nenhuma build Android/iOS foi gerada.

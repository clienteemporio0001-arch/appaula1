# ASTRO CALC 🚀

Calculadora espacial em **Expo SDK 54 + React Native 0.81 + TypeScript**. Interface original com astronauta iridescente, sem backend ou autenticação. Suporte Web, Android e iOS por código compartilhado.

## Web

```bash
npm install
npm run web
npm run check
npm test
npm run export:web
```

A versão Web permanece em **https://clienteemporio0001-arch.github.io/appaula1/**. O GitHub Actions publica automaticamente usando `expo.experiments.baseUrl = "/appaula1"`, sem alterar o layout.

## Android: APK offline automatizado pelo GitHub Actions

O workflow [Gerar APK Android](.github/workflows/android-apk.yml) gera um **APK release instalável** sem precisar de senha Expo. Ele executa `npm install` (gerando ícone/splash locais), TypeScript, testes da calculadora, `expo prebuild --platform android --no-install`, e `./gradlew :app:assembleRelease` com Java 17. **Release** contém o JavaScript embutido, portanto a calculadora funciona offline sem Metro e sem um servidor Web.

A build é assinada com a chave de desenvolvimento padrão **apenas para testes**; não é uma assinatura para publicação na Play Store. Se precisar atualizar o APK no futuro, pode ser necessário desinstalar a versão anterior se a chave de assinatura mudar (isso apagará os dados locais do app, incluindo histórico temporário).

Após a execução terminar verde:
1. Abra [Actions → Gerar APK Android](https://github.com/clienteemporio0001-arch/appaula1/actions/workflows/android-apk.yml).
2. Abra a execução bem-sucedida e, em **Artifacts**, baixe `astro-calc-android-apk` (ZIP com APK).
3. Se a criação da Release for autorizada, acesse [Releases](https://github.com/clienteemporio0001-arch/appaula1/releases) para baixar o arquivo `ASTRO-CALC-v1.0.0-preview.apk` diretamente, sem ZIP.
4. No Android, abra o APK e autorize *Instalar aplicativos desconhecidos* para o app usado no download, se solicitado.

## Expo Application Services (EAS Build)

Foi incluído `eas.json` com **profile preview**, `distribution: internal` e `android.buildType: apk`. O perfil gera APK release oficial via Expo, também para instalação direta.

Para build oficial EAS, é necessário autenticar-se na sua própria conta Expo (sem armazenar senhas/tokens no código):

```bash
npm install
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

A CLI pode pedir uma configuração inicial de projeto EAS e credenciais Android. Faça isso diretamente no terminal de sua máquina. É possível automatizar depois com segredo `EXPO_TOKEN` no GitHub Actions; **não** coloque credenciais no repositório.

**Identidade nativa:** ASTRO CALC, `com.mmsolucoes.astrocalc`, versão 1.0.0, versionCode 1, orientação retrato, modo escuro, ícone e splash locais gerados a partir de `assets/astro-icon.svg`. O `postinstall` usa sharp para gerar PNGs antes do prebuild; os PNGs gerados não são versionados.

## Testes

`npm run check`, `npm test`, e `npx expo install --check` (dependências). Android precisa ser validado também no aparelho real. Não foi solicitado gerar build iOS.

# Iron Tipping v2

Hub de aplicativos para o dia a dia — links rápidos, notas, scripts de crise e base de comandos para equipes de TI e atendimento.

## Tecnologias
- [Electron](https://www.electronjs.org/) v45 — desktop cross-platform
- [electron-builder](https://www.electron.build/) v26 — empacotamento NSIS para Windows
- HTML5 / Sass / JS vanilla
- Google OAuth 2.0 (login opcional via popup nativa do Electron)

## Estrutura
```
IronTippig-v2/
├── electron/           # Processo principal e preload (IPC)
├── pages/              # Páginas carregadas via iframe
├── script/             # JS do frontend
├── sass/               # Estilos (compilado para css/main.css)
├── css/                # CSS gerado
├── src/                # Ícones e imagens
├── index.html          # Shell principal (sidebar + iframe)
└── package.json
```

## Primeiros passos

### Instalar dependências
```bash
npm install
```

### Rodar em desenvolvimento
```bash
npm run dev
```

### Gerar instalador Windows (NSIS x64)
```bash
npm run build
```
O instalador fica em `dist/Iron Tipping Setup 2.0.0.exe`.

### Scripts disponíveis
| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o app em produção |
| `npm run dev` | Inicia com `NODE_ENV=development` (abre DevTools) |
| `npm run build` | Gera o instalador NSIS para Windows |
| `npm test` | Não configurado |

## Autenticação Google
O app suporta login com Google via OAuth 2.0. O `GOOGLE_CLIENT_ID` está configurado no código para o projeto `social-login-335210`. Os tokens de sessão (`it_google_token`, `it_google_profile`) são mantidos em `localStorage` do navegador (escopo local do Electron).

## Build e release
Não há CI/CD configurado. Cada release é gerada localmente com `npm run build` e o `.exe` distribuído manualmente.

## Licença
MIT — veja o arquivo [LICENSE](LICENSE).

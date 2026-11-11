const { app, BrowserWindow, Menu, ipcMain, shell, dialog } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 900,
    minHeight: 600,
    title: 'Iron Tipping',
    icon: path.join(__dirname, '..', 'src', 'icons', 'relogio-alarma.png'),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  mainWindow.once('ready-to-show', () => mainWindow.show());

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

const template = [
  {
    label: 'Arquivo',
    submenu: [
      { label: 'Sair', accelerator: 'Alt+F4', click: () => app.quit() },
    ],
  },
  {
    label: 'Editar',
    submenu: [
      { label: 'Desfazer', role: 'undo' },
      { label: 'Refazer', role: 'redo' },
      { type: 'separator' },
      { label: 'Copiar', role: 'copy' },
      { label: 'Colar', role: 'paste' },
      { label: 'Selecionar Tudo', role: 'selectAll' },
    ],
  },
  {
    label: 'Exibir',
    submenu: [
      { label: 'Recarregar', accelerator: 'Ctrl+R', click: () => mainWindow && mainWindow.webContents.reload() },
      { label: 'Ferramentas do Desenvolvedor', accelerator: 'F12', click: () => mainWindow && mainWindow.webContents.toggleDevTools() },
      { type: 'separator' },
      { label: 'Zoom Actual', role: 'resetZoom' },
      { label: 'Aumentar', role: 'zoomIn' },
      { label: 'Diminuir', role: 'zoomOut' },
    ],
  },
  {
    label: 'Janela',
    submenu: [
      { label: 'Minimizar', accelerator: 'Ctrl+M', click: () => mainWindow && mainWindow.minimize() },
      { label: 'Maximizar/Restaurar', accelerator: 'Ctrl+Shift+M', click: () => mainWindow && (mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize()) },
      { label: 'Tela Cheia', accelerator: 'F11', click: () => mainWindow && (mainWindow.setFullScreen(!mainWindow.isFullScreen())) },
    ],
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Sobre o Iron Tipping',
        click: () => {
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Sobre',
            message: 'Iron Tipping',
            detail: 'Hub de aplicativo para o dia a dia.\nVersão Desktop (Electron) v' + app.getVersion() + '\nMIT License',
          });
        },
      },
      {
        label: 'Abrir site do projeto',
        click: () => shell.openExternal('https://github.com/JoseCassioSantos/IronTippig-v2'),
      },
    ],
  },
];

app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('app:get-version', () => app.getVersion());
ipcMain.handle('window:is-maximized', () => mainWindow ? mainWindow.isMaximized() : false);
ipcMain.on('window:minimize', () => mainWindow && mainWindow.minimize());
ipcMain.on('window:maximize', () => {
  if (mainWindow) mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
});
ipcMain.on('window:close', () => mainWindow && mainWindow.close());
ipcMain.on('external:open', (_, url) => shell.openExternal(url));

/* ---------- Google OAuth 2.0 (popup nativa Electron) ---------- */
ipcMain.handle('google:auth', async () => {
  const authWindow = new BrowserWindow({
    width: 500,
    height: 660,
    show: true,
    autoHideMenuBar: true,
    title: 'Entrar com o Google',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const GOOGLE_CLIENT_ID = "120517140208-65aa09eauf6tikprod7iciptntk2rm0u.apps.googleusercontent.com";
  // Redirect URI padrão para apps desktop/nativos (out-of-band)
  const GOOGLE_REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";
  const scope = "openid email profile";
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&` +
    `redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}&` +
    `access_type=offline&` +
    `prompt=consent`;

  authWindow.loadURL(authUrl);

  return new Promise((resolve, reject) => {
    let resolved = false;

    const cleanup = () => {
      if (!resolved && !authWindow.isDestroyed()) {
        try { authWindow.close(); } catch (e) { /* ignora */ }
      }
    };

    authWindow.webContents.on('did-navigate', (event, url) => {
      try {
        const urlObj = new URL(url);
        // Com redirect URI OOB, o Google mostra o código na página (query param 'code')
        if (urlObj.origin === 'urn:ietf:wg:oauth:2.0:oob' || urlObj.protocol === 'urn:') {
          const code = urlObj.searchParams.get('code');
          const error = urlObj.searchParams.get('error');

          if (error) {
            resolved = true;
            reject(new Error(`Erro do Google: ${error}`));
            cleanup();
            return;
          }

          if (code) {
            resolved = true;
            resolve(code);
            cleanup();
          }
        }
      } catch (e) {
        // ignora URLs que não podem ser parseadas
      }
    });

    // Também captura o código exibido na página (caso o Google o renderize no DOM)
    authWindow.webContents.on('dom-ready', () => {
      if (resolved) return;
      authWindow.webContents.executeJavaScript(`
        (() => {
          const text = document.body.innerText || '';
          const match = text.match(/code\\s*[:=]\\s*([A-Za-z0-9_-]+)/);
          return match ? match[1] : null;
        })()
      `).then((code) => {
        if (code && !resolved) {
          resolved = true;
          resolve(code);
          cleanup();
        }
      }).catch(() => {});
    });

    authWindow.on('closed', () => {
      if (!resolved) {
        resolved = true;
        reject(new Error('Janela de login fechada pelo usuário.'));
      }
    });
  });
});

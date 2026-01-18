const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(app.getPath('userData'), 'database.db'));

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS ranking (nombre TEXT, puntuacion INTEGER)');
});

ipcMain.on('guardar-puntuacion', (event, datos) => {
  const stmt = db.prepare('INSERT INTO ranking VALUES (?, ?)');
  stmt.run(datos.nombre, datos.puntuacion);
  stmt.finalize();
  console.log('¡Puntuación guardada!:', datos);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: './src/favicon.ico',
    accentColor: '#5e3b8b'
  });

  win.removeMenu();
  win.loadURL(`file://${path.join(__dirname, 'dist/lunar-clicker/browser/index.html')}`);
}

app.whenReady().then(createWindow);

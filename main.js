const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(app.getPath('userData'), 'database.db'));

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS ranking (nombre TEXT, score INTEGER)');
});

ipcMain.on('guardar-puntuacion', (event, datos) => {
  const stmt = db.prepare('INSERT INTO ranking VALUES (?, ?)');
  stmt.run(datos.nombre, datos.score);
  stmt.finalize();
  console.log('¡Puntuación guardada!:', datos);
});

ipcMain.handle('obtener-ranking', async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT nombre, score FROM ranking ORDER BY score DESC LIMIT 3'; // Consulta para ordenar por puntuación y recoger los 3 mejores
    
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows); // Devuelve un array con los 3 mejores
      }
    });
  });
});  

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    center: true,
    resizable: true,
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

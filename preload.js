const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  guardarPuntuacion: (datos) => ipcRenderer.send('guardar-puntuacion', datos),
  obtenerRanking: () => ipcRenderer.invoke('obtener-ranking')
});
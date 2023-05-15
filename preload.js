const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('axios', {
  openAI : (Input) => ipcRenderer.invoke('axios.openAI', Input)
})
const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    runKubectl: (command) => ipcRenderer.invoke('run-kubectl', command),
    ipcRenderer: {
        on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
        removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
    },
    shell: shell
});
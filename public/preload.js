const os = require("os");
const path = require("path");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // we can also expose variables, not just functions
});

// home dir
contextBridge.exposeInMainWorld("os", {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld("path", {
  join: (...args) => path.join(...args),
});

let indexBridge = {
  send: (channel, data) => ipcRenderer.send(channel, data),
  postMessage: (channel, data) => ipcRenderer.postMessage(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
  once: (channel, func) =>
    ipcRenderer.once(channel, (event, ...args) => func(...args)),
  removeListener: (channel, listener) =>
    ipcRenderer.removeListener(channel, listener),
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
};

contextBridge.exposeInMainWorld("indexBridge", indexBridge);

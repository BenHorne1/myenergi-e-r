const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

let mainWindow;

const isDev = process.env.NODE_ENV !== "production";

const UDLPort = 801;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: "MyEnergi",
    width: isDev ? 1300 : 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableBlinkFeatures: "Serial",
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //load the index.html from a url
  mainWindow.loadURL("http://localhost:3000");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// UDP

try {
  socket.bind(parseInt(UDLPort));
  console.log("listening on port", UDLPort);
} catch {}

socket.on("message", (msg, rinfo) => {
  //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  let JSONRecieved = JSON.parse(msg)
  console.log(JSONRecieved.SerialID)
  mainWindow.webContents.send(`UDP:RECIEVED${JSONRecieved.SerialID}`, {
    msg: msg,
    IPAddress: rinfo.address,
    port: rinfo.port,
  });
});

// udp send
ipcMain.on("UDP:send", (e, data) => {
  console.log("Sending UDP", data.msgToSend.length);
  try {
    socket.send(
      data.msgToSend,
      0,
      data.msgToSend.length,
      data.port,
      data.IPAddress
    );
  } catch {}
});

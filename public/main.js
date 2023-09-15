const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const installExtension = require("electron-devtools-installer");
const fs = require("fs");
const path = require("path");
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const os = require("os");

let mainWindow, UDPPort;
let saveLocation;
let address = "192.168.0.59";

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}

// load config

ipcMain.on("CONFIG_STARTUP", (e, data) => {
  console.log("reading config...", data);
  UDPPort = data.UDPPort;
  saveLocation = data.SaveLocation;
  console.log("UDPPOrt", saveLocation);

  // open UDP PORT
  try {
    //socket.bind(parseInt(UDPPort));
    socket.bind(parseInt(UDPPort), getIPAddress());
    console.log("listening on port", UDPPort);
    console.log("getting IP address !!!!!!", getIPAddress());
    mainWindow.webContents.send("IPADDRESS", {
      IP: getIPAddress(),
      Port: UDPPort
    });
  } catch {}
});

// get date of program openning
function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

const currentDate = new Date();
const formattedDate = formatDateToYYYYMMDD(currentDate);

const isDev = process.env.NODE_ENV !== "production";

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
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

  // Install Redux DevTools Extension
  installExtension
    .default(installExtension.REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

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

socket.on("message", (msg, rinfo) => {
  //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  let JSONRecieved = JSON.parse(msg);
  console.log(JSONRecieved.SerialID);
  mainWindow.webContents.postMessage(`UDP:RECIEVED${JSONRecieved.SerialID}`, {
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

// Append to CSV
function appendToCSV(filePath, csvLine) {
  // console.log("graphFileName", graphFileName);
  console.log("file path", filePath);
  fs.appendFile(filePath, csvLine, (err) => {
    if (err) {
      console.error("Error writing to CSV file:", err);
    } else {
      console.log("Data appended to CSV file:", csvLine);
    }
  });
}

// update csv

ipcMain.on("csv:logData", (e, data) => {
  console.log("Log data ", data);

  const time = new Date();
  const timeStr = time.toLocaleTimeString();

  let logFileName = formattedDate + data.serial + "log.csv";

  console.log(logFileName);
  appendToCSV(
    saveLocation + "\\" + logFileName,
    `${timeStr},${data.logData}\n`
  );
});

ipcMain.on("csv:graphData", (e, data) => {
  console.log("Graph data ", data);

  const time = new Date();
  const timeStr = time.toLocaleTimeString();

  let logFileName = formattedDate + data.serial + "GraphData.csv";

  console.log(logFileName);
  appendToCSV(
    saveLocation + "\\" + logFileName,
    `${timeStr},${data.graphData.v1},${data.graphData.v2},${data.graphData.v3},${data.graphData.v4},\n`
  );
});

// UDL Buttons

ipcMain.on("minClicked", (e, Data) => {
  console.log(Data.IPAddress);
  console.log(Data.port);
  socket.send("minClicked", 0, 10, Data.port, Data.IPAddress);
});

ipcMain.on("plusClicked", (e, Data) => {
  console.log(Data.IPAddress);
  console.log(Data.port);
  socket.send("plusClicked", 0, 11, Data.port, Data.IPAddress);
});

ipcMain.on("leftClicked", (e, Data) => {
  console.log(Data.IPAddress);
  console.log(Data.port);
  socket.send("leftClicked", 0, 11, Data.port, Data.IPAddress);
});

ipcMain.on("rightClicked", (e, Data) => {
  console.log(Data.IPAddress);
  console.log(Data.port);
  socket.send("rightClicked", 0, 12, Data.port, Data.IPAddress);
});

// Send JSON

ipcMain.on("UDP:SENDJSON", (e, Data) => {
  console.log("UDPSEND", Data);
  socket.send(Data.msg, 0, Data.msg.length, Data.port, Data.IPAddress);
});

// Update config.json

// UPDATING JSON CAUSES APP TO RESTART/RECOMPILE

ipcMain.on("SAVE_CONFIG", (e, data) => {
  console.log("saving config");
  //Update Config file

  objArray = {
    config: {
      UDPPort: data.UDPPort,
      SaveLocation: data.SaveLocation,
    },
  };

  console.log(objArray);
  const uri = "src\\config.json";

  const jsonString = [JSON.stringify(objArray, null, 2)];

  const writeFile = (uri, data) =>
    new Promise((resolve, reject) => {
      fs.writeFile(uri, data, (err) => {
        if (err) {
          return reject(`Error writing file: ${uri} --> ${err}`);
        }
        resolve(`Successfully wrote file: ${uri} ---> with data ${data}`);
      });
    });

  const asyncWriteFileMap = async (uri, seed) => {
    const promises = seed.map(async (data) => {
      await writeFile(uri, data)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    });
    const result = await Promise.all(promises);
  };
  asyncWriteFileMap(uri, jsonString);
});

// Update CSV save location

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
//const installExtension = require("electron-devtools-installer");
const fs = require("fs");
const path = require("node:path");
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const os = require("os");
const isDev = require("electron-is-dev");

const isDevMode = process.env.NODE_ENV !== "production";

let mainWindow;
let saveLocation;

const configPath = getConfigFilePath();
const congfigPreset = {
  config: {
    UDPPort: "8081",
    SaveLocation: "savelocation",
  },
};

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

// open UDP Port

function openPort(port) {
  console.log("Port", port);
  try {
    socket.bind(parseInt(port), getIPAddress());
    console.log("listening on port", port);
    console.log("getting IP address !!!!!!", getIPAddress());
    mainWindow.webContents.send("IPADDRESS", {
      IP: getIPAddress(),
      Port: port,
    });
  } catch {}
}

// get date of program openning
function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

const currentDate = new Date();
const formattedDate = formatDateToYYYYMMDD(currentDate);



function createConfig() {
  // check if config file is present

  fs.access(configPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Config does not exist");
      console.log("creating config file");
      try {
        fs.writeFileSync(
          configPath,
          JSON.stringify(congfigPreset, null, 2),
          "utf-8"
        );

        dialog.showMessageBox(mainWindow, {
          type: "info",
          message:
            "Config initialised. Please set directory path to save CSV files to",
          title: "Config initialised",
          buttons: ["OK"],
        });
      } catch (error) {
        console.error("Error creating config file: ", error);
      }
    } else {
      console.log("Config Exists");
    }
  });
}

function createWindow() {
  const preload = path.join(__dirname, "preload.js");

  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    title: "myenergi",
    width: isDevMode ? 1300 : 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableBlinkFeatures: "Serial",
      preload,
    },
  });

  // Serial Port

  mainWindow.webContents.session.on(
    "select-serial-port",
    (event, portList, webContents, callback) => {
      console.log("SELECT-SERIAL-PORT FIRED WITH", portList);

      mainWindow.webContents.send("port:list", portList);
      //Display some type of dialog so that the user can pick a port
      // dialog.showMessageBoxSync({

      // });
      // event.preventDefault();

      let selectedPort = portList.find((device) => {
        // Automatically pick a specific device instead of prompting user
        //return device.vendorId == 0x2341 && device.productId == 0x0043;

        // Automatically return the first device
        return true;
      });
      if (!selectedPort) {
        callback("");
      } else {
        callback(selectedPort.portId);
      }
    }
  );

  mainWindow.webContents.session.on("serial-port-added", (event, port) => {
    console.log("serial-port-added FIRED WITH", port);
    event.preventDefault();

    //mainWindow.webContents.send()
  });

  mainWindow.webContents.session.on("serial-port-removed", (event, port) => {
    console.log("serial-port-removed FIRED WITH", port);
    event.preventDefault();
  });

  mainWindow.webContents.session.on("select-serial-port-cancelled", () => {
    console.log("select-serial-port-cancelled FIRED.");
  });

  //load the index.html from a url
  //mainWindow.loadURL("http://localhost:3000");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./index.html")}`
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createConfig).then(createWindow);

// Install Redux DevTools Extension
// installExtension
//   .default(installExtension.REDUX_DEVTOOLS)
//   .then((name) => console.log(`Added Extension: ${name}`))
//   .catch((err) => console.log("An error occurred: ", err));

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
  console.log(data)
  try {
    socket.send(
      data.msgToSend,
      0,
      data.msgToSend.length,
      data.port,
      data.IPaddress
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
  //console.log(Data.address, ":", Data.port);
  socket.send(Data.msg, 0, Data.msg.length, Data.port, Data.address);
  //socket.send(Data.msg, 0, Data.msg.length, 111, '192.168.0.140');
});

// Update config.json

function getConfigFilePath() {
  const userDataPath = app.getPath("userData");
  return path.join(userDataPath, "config.json");
}

function saveConfig(config) {
  const configPath = getConfigFilePath();
  console.log("User data path", configPath);
  config = { config };
  saveLocation = config.config.SaveLocation;
  console.log("saving config", config);
  //const configPath = path.join(__dirname, '../src/config.json');
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    console.log("Configuration file saved successfully.");
  } catch (error) {
    console.error("Error saving configuration file:", error);
  }
}

function loadConfig() {
  const configPath = getConfigFilePath();

  try {
    const data = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    console.log(data.config.UDPPort);
    openPort(data.config.UDPPort);
    saveLocation = data.config.SaveLocation;
    return data;
  } catch (error) {
    if (error.code === "ENOENT") {
      // Handle the case where the file doesn't exist (e.g., provide default config)
      return {};
    }
    console.error("Error loading configuration file:", error);
    return {};
  }
}

ipcMain.on("SAVE_CONFIG", (e, data) => {
  saveConfig(data);
});

ipcMain.handle("loadConfig", () => {
  try {
    console.log("INVOKE!!!!!!!!!!");

    const data = loadConfig();
    console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
});

hosts = [
  "www.google.com.br",
  "www.folha.com.br",
  "www.mercadolivre.com.br",
  "www.facebook.com.br",
];
var pingList = [0, 0, 0, 0];
var [pingAvg, cpu, mem] = [0, 0, 0];
var index = 0;
const { app, BrowserWindow } = require("electron");
const os = require("os-utils");
const si = require("systeminformation");
const path = require("path");
var ping = require("ping");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// function execute(command, callback) {
//   exec(command, (error, stdout, stderr) => {
//       callback(stdout);
//   });
// };

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    maximize: true,
    center: true,
    backgroundColor: "#121212",
    frame: false,
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  //consultando a velocidade de cpu e memória
  setInterval(() => {
    os.cpuUsage(function (v) {
      cpu = 100 * v;
      mem = 100 - os.freememPercentage() * 100;
    });
  }, 900);

  //gerando a lista de tempos de ping
  setInterval(() => {
    hosts.forEach(function (host) {
      pingList = [];
      ping.promise
        .probe(host, {
          timeout: 6,
          extra: ["-n", 4],
        })
        .then(function (res) {
          //console.log(res);
          pingList.push(parseInt(res.avg));
        });
    });
  }, 1000);

  setInterval(() => {
    if (index === 0) {
      hosts = [
        "www.google.com",
        "www.amazon.com",
        "www.uol.com.br",
        "www.facebook.com.br",
      ];
      index = 1;
    } else if (index === 1) {
      hosts = [
        "www.google.com",
        "www.apptoptech.com.br",
        "sistemaathos.com.br",
        "www.amazon.com",
      ];
      index = 2;
    } else {
      hosts = [
        "www.sodimac.com.br",
        "www.apptoptech.com.br",
        "www.sistemaathos.com.br",
        "hidrel.net.br",
      ];
      index = 0;
    }
  }, 4000);

  //gerando valor médio para lista de pings
  setInterval(() => {
    if (pingList.length === 4) {
      //console.log(pingList);
      // console.log("Avg depois: "+ pingAvg/4);
      // console.log("Avg depois: "+ pingList);
      pingAvg = pingList.reduce(function (pingAvg, ping) {
        return (pingAvg += ping);
      }, 0);
    }
  }, 750);

  setInterval(() => {
    mainWindow.webContents.send("cpu", cpu);
    mainWindow.webContents.send("mem", mem);
    mainWindow.webContents.send("ping", pingAvg / hosts.length);
  }, 1000);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

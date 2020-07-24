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
  setTimeout(() => {
    si.getAllData().then(function (data) {
      mainWindow.webContents.send("cpuManufacturer", data.cpu.manufacturer);
      mainWindow.webContents.send("cpuBrand", data.cpu.brand);
      mainWindow.webContents.send("cpuCores", data.cpu.cores);
      mainWindow.webContents.send("cpuSpeed", data.cpu.speed);
      mainWindow.webContents.send(
        "baseboardManufacturer",
        data.baseboard.manufacturer
      );
      mainWindow.webContents.send("sysUpTime", data.time.uptime);
      mainWindow.webContents.send("baseboardModel", data.baseboard.model);
      mainWindow.webContents.send("baseboardSerial", data.baseboard.serial);
      mainWindow.webContents.send("chassisType", data.chassis.type);
      mainWindow.webContents.send("batteryHasBattery", data.battery.hasbattery);
      mainWindow.webContents.send("batteryIsCharging", data.battery.ischarging);
      mainWindow.webContents.send("batteryPercent", data.battery.percent);
      mainWindow.webContents.send("osinfoDistro", data.os.distro);
      mainWindow.webContents.send("osinfoBuild", data.os.build);
      mainWindow.webContents.send("osinfoArch", data.os.arch);
      mainWindow.webContents.send("osinfoHostname", data.os.hostname);
      mainWindow.webContents.send("dataNetDhcp", data.net[0].dhcp);
      mainWindow.webContents.send("dataNetIface", data.net[0].iface);
      mainWindow.webContents.send("dataNetIp4", data.net[0].ip4);
      mainWindow.webContents.send("dataNetSpeed", data.net[0].speed);
      mainWindow.webContents.send("dataNetIfaceName", data.net[0].ifaceName);

      if (data.memLayout.length > 0) {
        mainWindow.webContents.send("memLayoutSize0", data.memLayout[0].size);
        mainWindow.webContents.send("memLayoutBank0", data.memLayout[0].bank);
      } else {
        mainWindow.webContents.send("memLayoutSize0", false);
        mainWindow.webContents.send("memLayoutBank0", false);
      }
      if (data.memLayout.length > 1) {
        mainWindow.webContents.send("memLayoutSize1", data.memLayout[1].size);
        mainWindow.webContents.send("memLayoutBank1", data.memLayout[1].bank);
      } else {
        mainWindow.webContents.send("memLayoutSize1", false);
        mainWindow.webContents.send("memLayoutBank1", false);
      }
      if (data.memLayout.length > 2) {
        mainWindow.webContents.send("memLayoutSize2", data.memLayout[2].size);
        mainWindow.webContents.send("memLayoutBank2", data.memLayout[2].bank);
      } else {
        mainWindow.webContents.send("memLayoutSize2", false);
        mainWindow.webContents.send("memLayoutBank2", false);
      }
      if (data.memLayout.length > 3) {
        mainWindow.webContents.send("memLayoutSize3", data.memLayout[3].size);
        mainWindow.webContents.send("memLayoutBank3", data.memLayout[3].bank);
      } else {
        mainWindow.webContents.send("memLayoutSize3", false);
        mainWindow.webContents.send("memLayoutBank3", false);
      }
      if (data.diskLayout.length > 0) {
        mainWindow.webContents.send("diskLayoutName0", data.diskLayout[0].name);
        mainWindow.webContents.send("diskLayoutSize0", data.diskLayout[0].size);
        mainWindow.webContents.send("diskLayoutType0", data.diskLayout[0].type);
      } else {
        mainWindow.webContents.send("diskLayoutName0", false);
        mainWindow.webContents.send("diskLayoutSize0", false);
        mainWindow.webContents.send("diskLayoutType0", false);
      }
      if (data.diskLayout.length > 1) {
        mainWindow.webContents.send("diskLayoutName1", data.diskLayout[1].name);
        mainWindow.webContents.send("diskLayoutSize1", data.diskLayout[1].size);
        mainWindow.webContents.send("diskLayoutType1", data.diskLayout[1].type);
      } else {
        mainWindow.webContents.send("diskLayoutName1", false);
        mainWindow.webContents.send("diskLayoutSize1", false);
        mainWindow.webContents.send("diskLayoutType1", false);
      }
      if (data.diskLayout.length > 2) {
        mainWindow.webContents.send("diskLayoutName2", data.diskLayout[2].name);
        mainWindow.webContents.send("diskLayoutSize2", data.diskLayout[2].size);
        mainWindow.webContents.send("diskLayoutType2", data.diskLayout[2].type);
      } else {
        mainWindow.webContents.send("diskLayoutName2", false);
        mainWindow.webContents.send("diskLayoutSize2", false);
        mainWindow.webContents.send("diskLayoutType2", false);
      }
      if (data.diskLayout.length > 3) {
        mainWindow.webContents.send("diskLayoutName3", data.diskLayout[3].name);
        mainWindow.webContents.send("diskLayoutSize3", data.diskLayout[3].size);
        mainWindow.webContents.send("diskLayoutType3", data.diskLayout[3].type);
      } else {
        mainWindow.webContents.send("diskLayoutName3", false);
        mainWindow.webContents.send("diskLayoutSize3", false);
        mainWindow.webContents.send("diskLayoutType3", false);
      }

      mainWindow.webContents.send(
        "graphicsControllersModel",
        data.graphics.controllers[0].model
      );
      mainWindow.webContents.send(
        "graphicsControllersBus",
        data.graphics.controllers[0].bus
      );
      mainWindow.webContents.send(
        "graphicsControllersVram",
        data.graphics.controllers[0].vram
      );
      mainWindow.webContents.send(
        "graphicsDisplaysConnection",
        data.graphics.displays[0].connection
      );
      mainWindow.webContents.send(
        "graphicsDisplaysResolution",
        data.graphics.displays[0].resolutionx +
          " x " +
          data.graphics.displays[0].resolutiony
      );
      if (data.graphics.displays.length === 2) {
        mainWindow.webContents.send(
          "graphicsDisplaysConnection2",
          data.graphics.displays[1].connection
        );
        mainWindow.webContents.send(
          "graphicsDisplaysResolution2",
          data.graphics.displays[1].resolutionx +
            " x " +
            data.graphics.displays[1].resolutiony
        );
      } else {
        mainWindow.webContents.send("graphicsDisplaysConnection2", false);
        mainWindow.webContents.send("graphicsDisplaysResolution2", false);
      }
    }, 5000);
  });

  // si.getStaticData().then(function (data) {
  //   mainWindow.webContents.send(
  //     "baseboardManufacturer",
  //     data.baseboard.manufacturer
  //   );
  //   mainWindow.webContents.send("baseboardModel", data.baseboard.manufacturer);
  // });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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

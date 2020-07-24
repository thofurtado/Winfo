const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;
const info = ["cpu", "mem", "ping"];
var hue, saturation, loaderColor;
var luminosity = 80;

ipcRenderer.on("cpu", (event, data) => {
  $("#cpu").text(data.toFixed(2) + " %");
});

ipcRenderer.on("mem", (event, data) => {
  $("#mem").text(data.toFixed(2) + " %");
});

ipcRenderer.on("cpuBrand", (event, data) => {
  $("#cpuBrand").text(data);
});
ipcRenderer.on("cpuCores", (event, data) => {
  $("#cpuCores").text(data + " cores");
});
ipcRenderer.on("cpuSpeed", (event, data) => {
  $("#cpuSpeed").text(data + " Ghz");
});
ipcRenderer.on("cpuManufacturer", (event, data) => {
  $("#cpuManufacturer").text(data);
});
ipcRenderer.on("baseboardManufacturer", (event, data) => {
  $("#baseboardManufacturer").text(data);
});
ipcRenderer.on("baseboardModel", (event, data) => {
  $("#baseboardModel").text(data);
});
ipcRenderer.on("baseboardSerial", (event, data) => {
  $("#baseboardSerial").text(data);
});
ipcRenderer.on("chassisType", (event, data) => {
  $("#chassisType").text(data);
});
ipcRenderer.on("batteryHasBattery", (event, data) => {
  if (data) {
    $("#batteryHasBattery").text("Conectada");
  } else {
    $("#batteryHasBattery").text("Desconectada");
  }
});
ipcRenderer.on("batteryIsCharging", (event, data) => {
  if (data) {
    $("#batteryIsCharging").text("Carregando");
  } else {
    $("#batteryIsCharging").hide();
  }
});
ipcRenderer.on("batteryPercent", (event, data) => {
  if (data) {
    $("#batteryPercent").text(data + "%");
  } else {
    $("#batteryPercent").hide();
  }
});
ipcRenderer.on("osinfoDistro", (event, data) => {
  $("#osinfoDistro").text(data);
});
ipcRenderer.on("osinfoBuild", (event, data) => {
  $("#osinfoBuild").text(data);
});
ipcRenderer.on("osinfoArch", (event, data) => {
  $("#osinfoArch").text(data);
});
ipcRenderer.on("osinfoHostname", (event, data) => {
  $("#osinfoHostname").text(data);
});
ipcRenderer.on("graphicsControllersModel", (event, data) => {
  $("#graphicsControllersModel").text(data);
});
ipcRenderer.on("graphicsControllersBus", (event, data) => {
  $("#graphicsControllersBus").text(data);
});
ipcRenderer.on("graphicsControllersVram", (event, data) => {
  $("#graphicsControllersVram").text(data + "mb");
});
ipcRenderer.on("graphicsDisplaysResolution", (event, data) => {
  if (data) $("#graphicsDisplaysResolution").text(data);
});
ipcRenderer.on("graphicsDisplaysConnection", (event, data) => {
  $("#graphicsDisplaysConnection").text(ConnectionType(data));
});
ipcRenderer.on("graphicsDisplaysResolution2", (event, data) => {
  if (data) {
    $("#graphicsDisplaysResolution2").text(data);
  } else {
    $("#graphicsDisplaysResolution2").hide();
  }
});
ipcRenderer.on("graphicsDisplaysConnection2", (event, data) => {
  if (data) {
    $("#graphicsDisplaysConnection2").text(ConnectionType(data));
  } else {
    $("#graphicsDisplaysConnection2").hide();
  }
});
ipcRenderer.on("dataNetDhcp", (event, data) => {
  if (data) {
    $("#dataNetDhcp").text("DHCP");
  } else {
    $("#dataNetDhcp").text("FIXO");
  }
});
ipcRenderer.on("memLayoutBank0", (event, data) => {
  if (data) {
    $("#memLayoutBank0").text("Slot " + data[4]);
  } else {
    $("#memLayoutBank0").hide();
  }
});
ipcRenderer.on("memLayoutBank1", (event, data) => {
  if (data) {
    $("#memLayoutBank1").text("Slot " + data[4]);
  } else {
    $("#memLayoutBank1").hide();
  }
});
ipcRenderer.on("memLayoutBank2", (event, data) => {
  if (data) {
    $("#memLayoutBank2").text("Slot " + data[4]);
  } else {
    $("#memLayoutBank2").hide();
  }
});
ipcRenderer.on("memLayoutBank3", (event, data) => {
  if (data) {
    $("#memLayoutBank3").text("Slot " + data[4]);
  } else {
    $("#memLayoutBank3").hide();
  }
});

ipcRenderer.on("memLayoutSize0", (event, data) => {
  if (data) {
    $("#memLayoutSize0").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#memLayoutSize0").hide();
  }
});
ipcRenderer.on("memLayoutSize1", (event, data) => {
  if (data) {
    $("#memLayoutSize1").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#memLayoutSize1").hide();
  }
});
ipcRenderer.on("memLayoutSize2", (event, data) => {
  if (data) {
    $("#memLayoutSize2").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#memLayoutSize2").hide();
  }
});
ipcRenderer.on("memLayoutSize3", (event, data) => {
  if (data) {
    $("#memLayoutSize3").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#memLayoutSize3").hide();
  }
});
ipcRenderer.on("diskLayoutName0", (event, data) => {
  if (data) {
    $("#diskLayoutName0").text(data);
  } else {
    $("#diskLayoutName0").hide();
  }
});
ipcRenderer.on("diskLayoutName1", (event, data) => {
  if (data) {
    $("#diskLayoutName1").text(data);
  } else {
    $("#diskLayoutName1").hide();
  }
});
ipcRenderer.on("diskLayoutName2", (event, data) => {
  if (data) {
    $("#diskLayoutName2").text(data);
  } else {
    $("#diskLayoutName2").hide();
  }
});
ipcRenderer.on("diskLayoutName3", (event, data) => {
  if (data) {
    $("#diskLayoutName3").text(data);
  } else {
    $("#diskLayoutName3").hide();
  }
});
ipcRenderer.on("diskLayoutSize0", (event, data) => {
  if (data) {
    $("#diskLayoutSize0").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#diskLayoutSize0").hide();
  }
});
ipcRenderer.on("diskLayoutSize1", (event, data) => {
  if (data) {
    $("#diskLayoutSize1").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#diskLayoutSize1").hide();
  }
});
ipcRenderer.on("diskLayoutSize2", (event, data) => {
  if (data) {
    $("#diskLayoutSize2").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#diskLayoutSize2").hide();
  }
});
ipcRenderer.on("diskLayoutSize3", (event, data) => {
  if (data) {
    $("#diskLayoutSize3").text((data / 1024 / 1000 / 1000).toFixed(2) + " GB");
  } else {
    $("#diskLayoutSize3").hide();
  }
});
ipcRenderer.on("diskLayoutType0", (event, data) => {
  if (data) {
    $("#diskLayoutType0").text(data);
  } else {
    $("#diskLayoutType0").hide();
  }
});
ipcRenderer.on("diskLayoutType1", (event, data) => {
  if (data) {
    $("#diskLayoutType1").text(data);
  } else {
    $("#diskLayoutType1").hide();
  }
});
ipcRenderer.on("diskLayoutType2", (event, data) => {
  if (data) {
    $("#diskLayoutType2").text(data);
  } else {
    $("#diskLayoutType2").hide();
  }
});
ipcRenderer.on("diskLayoutType3", (event, data) => {
  if (data) {
    $("#diskLayoutType3").text(data);
  } else {
    $("#diskLayoutType3").hide();
  }
});
ipcRenderer.on("dataNetIface", (event, data) => {
  $("#dataNetIface").text(data);
});
ipcRenderer.on("dataNetIfaceName", (event, data) => {
  $("#dataNetIfaceName").text(data);
});
ipcRenderer.on("dataNetIp4", (event, data) => {
  $("#dataNetIp4").text(data);
});
ipcRenderer.on("dataNetSpeed", (event, data) => {
  $("#dataNetSpeed").text(data + "mbps");
});

ipcRenderer.on("sysUpTime", (event, data) => {
  hours = Math.floor(data / 3600);
  data %= 3600;
  minutes = Math.floor(data / 60);
  seconds = data % 60;
  $("#sysUpTime").text(hours + ":" + minutes + ":" + seconds);
});
document.getElementById("canvas").style.backgroundImage;
function ConnectionType(type) {
  if (type === "HD15") {
    return "VGA";
  } else if (type === "DVI") {
    return "DVI";
  } else if (type === "INTERNAL") {
    return "Integrado";
  } else {
    return type;
  }
}
function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

ipcRenderer.on("ping", (event, data) => {
  $("#ping").text(data.toFixed(0) + " ms");
  hue = parseInt(data * 2.66) + 160;
  saturation = parseInt(data * 0.33) + 70;
  loaderColor = HSLToHex(hue, saturation, luminosity);

  if (data === 0) {
    $(".loader").css("border-color", "gray");
  } else {
    if (data < 75) {
      $(".loader").css("border-color", loaderColor);
    } else {
      $(".loader").css("border-color", "#E61717");
    }
  }
});

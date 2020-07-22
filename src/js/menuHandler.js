const $ = require("jquery");
const { remote } = require("electron");

var win = remote.getCurrentWindow();

$(".close-container").click(function () {
  win.close();
});

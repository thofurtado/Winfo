const os = require("os-utils");
const si = require("systeminformation");
var ping = require("ping");
var hosts = [
  "www.google.com.br",
  "www.folha.com.br",
  "www.mercadolivre.com.br",
  "www.facebook.com.br",
];
var memoryUsage = 0;
var cpuUsage = 0;

class osControllers {
  async getCpuUsage(req, res) {
    const cpuUsage = os.cpuUsage(function (data) {
      return data;
    });
  }
}

module.exports = new osControllers();
//   getMemory() {
//     let startCount = Date.now();
//     os.cpuUsage(function (v) {
//       memoryUsage = 100 - os.freememPercentage() * 100;
//     });
//     let endCount = Date.now();
//     console.log("Demorou " + (endCount - startCount) + "s");
//     return memoryUsage;
//   }
//   // hosts.forEach(function (host) {
//   //   ping.promise
//   //     .probe(host, {
//   //       timeout: 6,
//   //       extra: ["-n", 4],
//   //     })
//   //     .then(function (res) {
//   //       pingList.push(parseInt(res.avg));
//   //     });
//   // });

//   // if (pingList.length === 4) {
//   //   pingAvg = pingList.reduce(function (pingAvg, ping) {
//   //     return (pingAvg += ping);
//   //   }, 0);
//   // }
// }

// module.exports = osController();

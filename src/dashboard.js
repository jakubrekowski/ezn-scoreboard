const app = new Vue({
  el: "#app",
  data: {
    pointsA: 0,
    pointsB: 0,
    setsA: 0,
    setsB: 0,
    faulsA: 0,
    faulsB: 0,
    time: "00:00",
    timeSet: "10",
    //  ui controls
    bleConnected: false,
    showProfileSelect: false,
    selectedProfile: 0,
    profile: ["Koszykówka", "Siatkówka", "Piłka ręczna / nożna"],
    timePause: true,
    timeStop: true,
  },
  methods: {
    startInterval(timeStop) {
      if (timeStop) {
        timeDown = this.timeSet * 60;
      }
    },
    pressStop() {
      this.timeStop = true;
      this.timePause = true;
      this.time = "00:00";
    },
    pressStart() {
      if (this.timeStop) {
        timeDown = this.timeSet * 60;
      }
      this.timePause = false;
      this.timeStop = false;
    },
    async connectBlue() {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "Scoreboard" }],
        // optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"],
      });

      this.bleConnected = true;

      server = await device.gatt.connect();

      if (!server.connected) {
        return;
      }

      service = await server.getPrimaryService(
        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
      );

      characteristics.lpoint = await service.getCharacteristic(
        "0a355012-692a-4722-a6a0-1370461b4b24"
      );
      characteristics.ladd1 = await service.getCharacteristic(
        "c44dd96e-4de9-45b6-9c43-d23ec9bcacbc"
      );
      characteristics.ladd2 = await service.getCharacteristic(
        "94fcc81f-8205-4a99-bf7a-22d10ae33d90"
      );
      characteristics.rpoint = await service.getCharacteristic(
        "c0a45579-03fb-4887-8609-f3d05a83c667"
      );
      characteristics.radd1 = await service.getCharacteristic(
        "d4ff2e42-9d3d-41f7-8b52-0e1b8dd49ac2"
      );
      characteristics.radd2 = await service.getCharacteristic(
        "ce5d94b6-9666-4404-83a6-4bd9b88b2dd2"
      );
      characteristics.tswich = await service.getCharacteristic(
        "3f7cb528-820e-45e9-9b5e-c359fde40c1e"
      );
      // characteristics.tvalue = await service.getCharacteristic('9dfde2a1-906a-4a4f-88d6-f361b719933d')

      // const characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8')

      // const textEncoder = new TextEncoder('utf-8')
      // const textDecoder = new TextDecoder('utf-8')

      // const value = await characteristic.readValue()
      // characteristic.writeValue(textEncoder.encode('papua nowa gwinea'))

      // console.log(textDecoder.decode(value))
    },
  },
});

// ble stack
let server,
  service,
  characteristics = {};

// time stack
setInterval(() => updateCountdown(), 1000);

let timeDown;

function updateCountdown() {
  if (!app.timePause) {
    if (timeDown === 0) {
      timer = null;
      app.timeStop = true;
      app.timePause = true;
      app.time = `00:00`;
      return;
    }

    let minutes = Math.floor(timeDown / 60);
    let seconds = timeDown % 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    app.time = `${minutes}:${seconds}`;
    timeDown--;
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then(function (reg) {
      console.log("Successfully registered service worker", reg);
    })
    .catch(function (err) {
      console.warn("Error whilst registering service worker", err);
    });
}

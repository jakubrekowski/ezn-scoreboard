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
    bleError: false,
    showProfileSelect: false,
    selectedProfile: 0,
    profile: ["Koszykówka", "Siatkówka", "Piłka ręczna / nożna"],
    timePause: true,
    timeStop: true,
  },
  methods: {
    startInterval(timeStop) {
      if (timeStop) {
        timeDown = this.timeSet * 60
      }
    },
    pressStop() {
      this.timeStop = true
      this.timePause = true
      this.time = "00:00"
    },
    pressStart() {
      if (this.timeStop) {
        timeDown = this.timeSet * 60
      }
      this.timePause = false
      this.timeStop = false
    },
    async LPointAdd() {
      await characteristics.lpoint.writeValue(new Int32Array([++this.pointsA]).buffer)
    },
    async LPointRem() {
      await characteristics.lpoint.writeValue(new Int32Array([--this.pointsA]).buffer)
    },
    async LPointR() {
      await characteristics.lpoint.writeValue(new Int32Array([0]).buffer)
      this.pointsA = 0
    },
    async LFaulsAdd() {
      await characteristics.ladd1.writeValue(new Int32Array([++this.faulsA]).buffer)
    },
    async LFaulsRem() {
      await characteristics.ladd1.writeValue(new Int32Array([--this.faulsA]).buffer)
    },
    async LFaulsR() {
      await characteristics.ladd1.writeValue(new Int32Array([0]).buffer)
      this.faulsA = 0
    },
    async LSetsAdd() {
      await characteristics.ladd2.writeValue(new Int32Array([++this.setsA]).buffer)
    },
    async LSetsRem() {
      await characteristics.ladd2.writeValue(new Int32Array([--this.setsA]).buffer)
    },
    async LSetsR() {
      await characteristics.ladd2.writeValue(new Int32Array([0]).buffer)
      this.setsA = 0
    },
    async RPointAdd() {
      await characteristics.rpoint.writeValue(new Int32Array([++this.pointsB]).buffer)
    },
    async RPointRem() {
      await characteristics.rpoint.writeValue(new Int32Array([--this.pointsB]).buffer)
    },
    async RPointR() {
      await characteristics.rpoint.writeValue(new Int32Array([0]).buffer)
      this.pointsB = 0
    },
    async RFaulsAdd() {
      await characteristics.radd1.writeValue(new Int32Array([++this.faulsB]).buffer)
    },
    async RFaulsRem() {
      await characteristics.radd1.writeValue(new Int32Array([--this.faulsB]).buffer)
    },
    async RFaulsR() {
      await characteristics.radd1.writeValue(new Int32Array([0]).buffer)
      this.faulsB = 0
    },
    async RSetsAdd() {
      await characteristics.radd2.writeValue(new Int32Array([++this.setsB]).buffer)
    },
    async RSetsRem() {
      await characteristics.radd2.writeValue(new Int32Array([--this.setsB]).buffer)
    },
    async RSetsR() {
      await characteristics.radd2.writeValue(new Int32Array([0]).buffer)
      this.setsB = 0
    },
    async connectBlue() {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ name: "Scoreboard" }],
          optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"],
        })
  
        this.bleConnected = true
  
        server = await device.gatt.connect()
  
        if (!server.connected) {
          return
        }
  
        service = await server.getPrimaryService(
          "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
        )
  
        characteristics.lpoint = await service.getCharacteristic(
          "0a355012-692a-4722-a6a0-1370461b4b24"
        )
        characteristics.ladd1 = await service.getCharacteristic(
          "c44dd96e-4de9-45b6-9c43-d23ec9bcacbc"
        )
        characteristics.ladd2 = await service.getCharacteristic(
          "94fcc81f-8205-4a99-bf7a-22d10ae33d90"
        )
        characteristics.rpoint = await service.getCharacteristic(
          "c0a45579-03fb-4887-8609-f3d05a83c667"
        )
        characteristics.radd1 = await service.getCharacteristic(
          "d4ff2e42-9d3d-41f7-8b52-0e1b8dd49ac2"
        )
        characteristics.radd2 = await service.getCharacteristic(
          "ce5d94b6-9666-4404-83a6-4bd9b88b2dd2"
        )
        characteristics.tmin = await service.getCharacteristic(
          "9dfde2a1-906a-4a4f-88d6-f361b719933d"
        )
        characteristics.tsec = await service.getCharacteristic(
          "82e1ab34-3f37-48b8-94ec-b8c289688110"
        )

        const pointsABuff = await characteristics.lpoint.readValue()
        this.pointsA = new Uint8Array(pointsABuff.buffer)[0]
        const faulsABuff = await characteristics.ladd1.readValue()
        this.faulsA = new Uint8Array(faulsABuff.buffer)[0]
        const setsABuff = await characteristics.ladd2.readValue()
        this.setsA = new Uint8Array(setsABuff.buffer)[0]
        const pointsBBuff = await characteristics.rpoint.readValue()
        this.pointsB = new Uint8Array(pointsBBuff.buffer)[0]
        const faulsBBuff = await characteristics.radd1.readValue()
        this.faulsB = new Uint8Array(faulsBBuff.buffer)[0]
        const setsBBuff = await characteristics.radd2.readValue()
        this.setsB = new Uint8Array(setsBBuff.buffer)[0]

        const time = {}
        const minutesBuff = await characteristics.tmin.readValue()
        time.minutes = new Uint8Array(minutesBuff.buffer)[0]
        const secondsBuff = await characteristics.tsec.readValue()
        time.seconds = new Uint8Array(secondsBuff.buffer)[0]

        this.time = `${time.minutes}:${time.seconds}`

        timeDown = time.minutes * 60 + time.seconds
  
        // const value = await characteristics.lpoint.readValue()
  
        // await characteristics.lpoint.writeValue(new Int32Array([15]).buffer)
  
        // const value1 = await characteristics.lpoint.readValue()
  
        // console.log(
        //   new Uint8Array(value.buffer)[0],
        //   new Uint8Array(value1.buffer)[0]
        // )
      } catch (err) {
        window.location.reload()
      }
    },
  },
})

// ble stack
let server,
  service,
  characteristics = {}

// time stack
setInterval(() => updateCountdown(), 1000)

let timeDown

async function updateCountdown() {
  if (!app.timePause) {
    if (timeDown === 0) {
      timer = null
      app.timeStop = true
      app.timePause = true
      app.time = `00:00`
      return
    }

    console.log(timeDown)

    let minutes = Math.floor(timeDown / 60)
    let seconds = timeDown % 60

    if (minutes < 10) {
      minutes = "0" + minutes
    }

    if (seconds < 10) {
      seconds = "0" + seconds
    }

    app.time = `${minutes}:${seconds}`
    await characteristics.tmin.writeValue(new Int32Array([minutes]).buffer)
    await characteristics.tsec.writeValue(new Int32Array([seconds]).buffer)
    timeDown--
  }
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.bleError) {
  app.bleError = true
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then(function (reg) {
      console.log("Successfully registered service worker", reg)
    })
    .catch(function (err) {
      console.warn("Error whilst registering service worker", err)
    })
}

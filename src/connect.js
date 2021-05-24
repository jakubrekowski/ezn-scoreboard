const app = new Vue({
  el: '#app',
  data: {

  },
  methods: {
    connectBlue() {
      navigator.bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }]
      })
        .then(device => console.log(device))
        .catch(err => console.error(err))
    }
  }
})


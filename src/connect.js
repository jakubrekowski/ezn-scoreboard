const app = new Vue({
  el: '#app',
  data: {

  },
  methods: {
    connectBlue() {
      navigator.bluetooth.requestDevice({
        filters: [{
          name: 'EZN Scoreboard'
        }]
      })
        .then(device => console.log(device))
        .catch(err => console.error(err))
    }
  }
})


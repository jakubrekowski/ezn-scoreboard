const app = new Vue({
  el: '#app',
  data: {
    pointsA: 0,
    pointsB: 0,
    setsA: 0,
    setsB: 0,
    faulsA: 0,
    faulsB: 0,
    time: '00:00',
    timeSet: '10',
    //  ui controls
    showProfileSelect: false,
    selectedProfile: 0,
    profile: [
      'Koszykówka',
      'Siatkówka',
      'Piłka ręczna / nożna'
    ],
    timePause: true,
    timeStop: true,
  },
  methods: {
    startInterval(timeStop) {
      if(timeStop) {
        timeDown = this.timeSet * 60
      } 
    },
    pressStop() {
      this.timeStop = true
      this.timePause = true
      this.time = '00:00'
    },
    pressStart() {
      if(this.timeStop) {
        timeDown = this.timeSet * 60
      } 
      this.timePause = false
      this.timeStop = false
    }
  }
})

setInterval(() => updateCountdown(), 1000)

let timeDown 

function updateCountdown() {
  if(!app.timePause) {
    if(timeDown === 0) {
      timer = null
      app.timeStop = true
      app.timePause = true
      app.time = `00:00`
      return
    }
    
    let minutes = Math.floor(timeDown / 60)
    let seconds = timeDown % 60
  
    if (minutes < 10) {
      minutes = '0' + minutes
    }
  
    if (seconds < 10) {
      seconds = '0' + seconds
    }
  
  
    app.time = `${minutes}:${seconds}`
    timeDown--
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js').then(function(reg) {
      console.log('Successfully registered service worker', reg);
  }).catch(function(err) {
      console.warn('Error whilst registering service worker', err);
  });
  }
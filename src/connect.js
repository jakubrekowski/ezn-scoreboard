const app = new Vue({
  el: '#app',
  data: {

  },
  methods: {
    async connectBlue() {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'EZN Scoreboard' }],
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
      })
      
      const server = await device.gatt.connect()
      const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b')
      const characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8')

      const textEncoder = new TextEncoder('utf-8')
      const textDecoder = new TextDecoder('utf-8')

      const value = await characteristic.readValue()
      characteristic.writeValue(textEncoder.encode('papua nowa gwinea'))

      console.log(textDecoder.decode(value))

      console.log(server, service, characteristic)
    }
  }
})


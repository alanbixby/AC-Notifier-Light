require('dotenv').config()
const chalk = require('chalk')
const { api } = require('node-hue-api')
const client = new (require('tplink-smarthome-api')).Client()
const LightState = require('node-hue-api').v3.lightStates.LightState

const { HUE_USERNAME, HUE_IP_ADDRESS, HUE_LIGHT_NAME, PLUG_IP_ADDRESS } = process.env

;(async () => {
  const hueApi = await api.createLocal(HUE_IP_ADDRESS).connect(HUE_USERNAME)
  const [{ data: { id } }] = await hueApi.lights.getLightByName(HUE_LIGHT_NAME) // Array and Object deconstructor?? why not!
  const tpPlug = await client.getDevice({ host: PLUG_IP_ADDRESS })

  console.log(`Connected to ${chalk.blue('AC-Notifier-Light')}`)

  let { relay_state: lastState } = await tpPlug.getSysInfo()

  setInterval(async () => {
    const { relay_state: plugState } = await tpPlug.getSysInfo()
    if (lastState !== plugState) {
      const lightState = new LightState().on(!!plugState)
      if (plugState) {
        lightState.brightness(0)
      }
      await hueApi.lights.setLightState(id, lightState)
      console.log(`Updated plug state to ${lastState ? chalk.red('OFF') : chalk.green('ON')}`)
    }
    lastState = plugState
  }, 1 * 500)
})()

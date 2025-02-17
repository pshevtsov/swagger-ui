import StandaloneLayout from "./layout"
import TopbarPlugin from "plugins/topbar"
import ConfigsPlugin from "corePlugins/configs"

// the Standalone preset

let preset = [
  //Remove topbar from view
  //TopbarPlugin,
  ConfigsPlugin,
  () => {
    return {
      components: { StandaloneLayout }
    }
  }
]

module.exports = preset

const path = require("path");
module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@pb": path.resolve(__dirname, './src/components'),
      },
    }
  }
}

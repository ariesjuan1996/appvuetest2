const fs = require ( "fs" );
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tiendita123/'
    : '/',

  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    compress: true,
    //https: true,
    hot: true,
    disableHostCheck: true 
    //host: 'tawa'
  },

}
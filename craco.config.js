const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#f16331",
              "@link-color": "#f16331",
              "@border-radius-base": "2px"
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};

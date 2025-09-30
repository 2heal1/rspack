const { ModuleFederationPlugin } = require("@rspack/core").container;

module.exports = {
  mode: "development",
  entry: {
    main: "./index.js"
  },
  output: {
    filename: "[name].js",
    library: { type: "commonjs-module" }
  },
  experiments: {
    asyncWebAssembly: true
  },
  module: {
    rules: [
      {
        test: /\.wat$/,
        type: "webassembly/async",
        use: [
          {
            loader: "@rspack/core/wasm-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "wasm-container",
      filename: "container.js",
      library: { type: "commonjs-module" },
      exposes: {
        "./wasm-module": "./wasm-loader.js",
        "./wasm-async": "./wasm-module.wat"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
    })
  ]
};
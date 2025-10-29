const { container } = require("@rspack/core");

const { ModuleFederationPlugin } = container;

/** @type {import("@rspack/core").Configuration} */
module.exports = {
	optimization: {
		chunkIds: "named",
		moduleIds: "named"
	},
	output: {
		chunkFilename: "[id].js"
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			filename: "container.[chunkhash:8].js",
			library: { type: "commonjs-module" },
			exposes: {
				"./expose-a": {
					import: "./module.js",
					name: "_federation_expose_a"
				}
			},
			remoteType: "script",
			remotes: {
				"@remote/alias": "remote@http://localhost:8000/remoteEntry.js"
			},
			shared: {
				react: {
					treeshake: true
				}
			}
		})
	]
};

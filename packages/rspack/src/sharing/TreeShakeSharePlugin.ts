import type { Compiler } from "../Compiler";
import type { Plugins } from "../config";
import type { ModuleFederationPluginOptions } from "../container/ModuleFederationPlugin";
import { IndependentSharePlugin } from "./IndependentSharePlugin";
import { OptimizeDependencyReferencedExportsPlugin } from "./OptimizeDependencyReferencedExportsPlugin";
import { normalizeSharedOptions } from "./SharePlugin";

export interface TreeshakeSharePluginOptions {
	mfConfig: ModuleFederationPluginOptions;
	plugins?: Plugins;
	reShake?: boolean;
}

export class TreeshakeSharePlugin {
	mfConfig: ModuleFederationPluginOptions;
	outputDir: string;
	plugins?: Plugins;
	reShake?: boolean;

	name = "TreeshakeSharePlugin";
	constructor(options: TreeshakeSharePluginOptions) {
		const { mfConfig, plugins, reShake } = options;
		this.mfConfig = mfConfig;
		this.outputDir = mfConfig.independentShareDir || "independent-packages";
		this.plugins = plugins;
		this.reShake = Boolean(reShake);
	}

	apply(compiler: Compiler) {
		const { mfConfig, outputDir, plugins, reShake } = this;
		const { name, shared, library } = mfConfig;
		if (!shared) {
			return;
		}
		const sharedOptions = normalizeSharedOptions(shared);
		if (!sharedOptions.length) {
			return;
		}

		if (!reShake) {
			new OptimizeDependencyReferencedExportsPlugin(
				sharedOptions,
				mfConfig.injectUsedExports,
				mfConfig.manifest
			).apply(compiler);
		}

		if (
			sharedOptions.some(
				([_, config]) => config.treeshake && config.import !== false
			)
		) {
			new IndependentSharePlugin({
				name: name,
				shared: shared,
				outputDir,
				plugins,
				treeshake: reShake,
				library
			}).apply(compiler);
		}
	}
}

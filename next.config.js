module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      /**
       * Developers packaging the IVS player into an app are required to resolve and import the following assets via URL:
       *
       * 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm'
       * 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';
       *
       * These assets must not be re-compiled during packaging. Your build tool must import these files as-is, untranspiled.
       * The webpack file-loader (https://webpack.js.org/loaders/file-loader/) accomplishes this.
       * Rollup's plugin-url (https://github.com/rollup/plugins/tree/master/packages/url) also seems to do this, but has not been tested.
       */
      test: /amazon-ivs-player[\/\\].*dist[\/\\]assets[\/\\]/,
      loader: "file-loader",
      type: "javascript/auto",
      options: {
        name: "[name].[ext]",
      },
    });
    return config;
  },
};

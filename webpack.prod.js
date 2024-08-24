const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

process.env["NODE_ENV"] = "production";

module.exports = merge([
  common,
  {
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [
        // Uncomment the line below to extend existing minimizers if needed
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },
    performance: {
      hints: 'warning', // You can use 'warning' or 'error'
      maxAssetSize: 3000000, // 3 MiB
      maxEntrypointSize: 3000000, // 3 MiB
      assetFilter: (assetFilename) => {
        return assetFilename.endsWith('.js') || assetFilename.endsWith('.css'); // Only apply the performance hints to JavaScript and CSS files
      },
    },
  },
]);

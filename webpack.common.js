const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "bundle.js", // Define the output file name here
    path: path.resolve(__dirname, "build"), // Set your build folder here
    clean: true, // Optional: Clean the build folder before each build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  performance: {
    maxAssetSize: 3000000, // 3 MB
    maxEntrypointSize: 3000000, // 3 MB
  },
};

const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ExtensionReloader = require("webpack-extension-reloader")

const pkg = require("./package.json")

function transformManifest (buffer, mode) {
  const manifest = JSON.parse(buffer.toString())
  manifest.version = pkg.version
  return JSON.stringify(manifest, null, 2)
}

module.exports = (env, argv) => ({
  devtool: "source-map",
  entry: {
    content: "./src/content",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([
      { context: "src", from: "**", ignore: ["*.js", "*.styl", "manifest.json"] },
      { context: "src", from: "manifest.json", transform: buffer => transformManifest(buffer, argv.mode) },
    ]),
    new ExtensionReloader({ entries: { contentScript: "content" } }),
  ],
  module: {
    rules: [
      {
        test: /\.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dst"),
    filename: "[name].js",
  },
})

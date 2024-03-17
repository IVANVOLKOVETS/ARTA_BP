const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const __base = path.resolve(__dirname, "..");
const __src = path.resolve(__base, "src");

module.exports = {
  entry: path.resolve(__src, "index.js"),

  output: {
    filename: "index.[contenthash].js",
    path: path.resolve(__base, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "ARTA",
      template: path.resolve(__src, "index.html"),
    }),
  ],

  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       use: ["style-loader", "css-loader"],
  //     },
  //   ],
  // },
};

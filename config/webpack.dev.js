const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  target: "web",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
  },
  module: {
    rules: [
          {
            test: /\.html$/i,
            use: ["html-loader"],
          },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
        ],
      },
    ],
  },
});

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const postcssCssnext = require("postcss-cssnext");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8080;
const PROXY = `http://${HOST}:${PORT}`;

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",

          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssCssnext({
                  features: {
                    autoprefixer: {
                      browsers: ["> 1%", "last 2 versions"]
                    }
                  }
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});

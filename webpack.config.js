const path = require("path"); // Es una dependencia de node.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//objeto para nuestras configuraciones
module.exports = {
  // punto de entrada: index.js
  entry: "./src/index.js",
  // output nuestro dist que prepara webpack
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", //donde esta el directorio del proyecto... sirve para el servidor de la nube. // file name: tambien bundle.js
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"], // svelt react otras extensiones. jsx etc
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"), // webpack prepara estas rutas pa utilizar los alias en los archivos JS.
    },
  },
  module: {
    // objeto con el arreglo rules.
    rules: [
      // reglas para dif tipos de archivos
      {
        test: /\.m?js$/, // extensiones que vamos a utilizar; regExp (mjs | js)
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/i, // reconocer css.
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // con objeto o arreglo.
      },

      {
        test: /\.png/,
        type: "asset/resource",
      },

      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            //donde estan los archivos etc
            limit: 10000,
            mimetype: "application/font-woff", //tipo de dato: tamano y formato del recurso
            name: "[name].[contenthash].[ext]", //respete la extension
            outputPath: "./assets/fonts/", // donde se envia.
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css", // para identificar la v del build
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ], // instancia del plugin
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

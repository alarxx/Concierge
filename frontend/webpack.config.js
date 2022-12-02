const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }, 
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/index.html"
  })],
  devServer: {
    compress: true,
    port: 9000,
    proxy: {
      '/': 'http://localhost:3000',
    },
  }
};
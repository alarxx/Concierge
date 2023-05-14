const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build-client'),
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
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },

      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'style-loader!css-loader',
      //       options: {
      //         modules: {
      //         //   // localIdentName:'[name]__[local]--[hash:base64:5]',
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
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
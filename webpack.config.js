const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');//Extraer css


module.exports = {
  entry: './src/main/resources/static/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/main/resources/static/public'),
  },
  plugins:[
      new MiniCssExtractPlugin({
          filename: 'bundle.css'
      })
  ],
  mode:'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};


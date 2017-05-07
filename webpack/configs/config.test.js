const config = require('config');
const path = require('path');
const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '../../');

module.exports = {
  devtool: 'inline-source-map',
  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config)
    })
  ],

  resolve: {
    // Allow us to import components in tests like:
    // import Example from 'components/Example'
    root: [rootPath, path.join(rootPath, 'src'), path.join(rootPath, 'test')],
    extensions: ['', '.js', '.json']
  },

  module: {
    // don't run babel-loader through the sinon module
    noParse: [
      /node_modules\/sinon\//
    ],
    preLoaders: [
      // transpile all files except testing sources with babel as usual
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: [path.join(rootPath, 'test')]
      },
      // transpile and instrument only testing sources with isparta
      {
        test: /\.js/,
        loader: 'isparta-loader',
        include: path.join(rootPath, 'src')
      }
    ],
    loaders: [
      // json (for cheerios, see https://github.com/airbnb/enzyme/issues/309)
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: rootPath
      },
      // CSS
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
        include: path.join(rootPath, 'src')
      }
    ]
  },

  isparta: {
    embedSource: true,
    noAutoWrap: true
  },

  externals: {
    // Required for enzyme to work properly
    jsdom: 'window',
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },

  postcss: [
    /* Autoprefix for different browser vendors */
    // eslint-disable-next-line global-require
    require('autoprefixer'),
    /* Enable css @imports like Sass/Less */
    // eslint-disable-next-line global-require
    require('postcss-import'),
    /* Enable nested css selectors like Sass/Less */
    // eslint-disable-next-line global-require
    require('postcss-nested'),
    /* Enable extending placeholder selectors like Sass */
    // eslint-disable-next-line global-require
    require('postcss-simple-extend'),
    /* Enable Sass-like variables */
    // eslint-disable-next-line global-require
    require('postcss-simple-vars')
  ]
};

const path = require('path');
const {
  HotModuleReplacementPlugin,
  DefinePlugin,
  optimize: {
    DedupePlugin,
    LoaderOptionsPlugin,
    CommonsChunkPlugin,
    UglifyJsPlugin
  }
} = require('webpack');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * options are the passed in variables
 * --env.ENV development --env.HMR
 */
module.exports = function webpackConfig(options) {

  const CONSTANTS = {
    ENV: options && options.ENV || 'development',
    IS_DEV: options && options.ENV === 'development',
    IS_PROD: options && options.ENV === 'production',
    IS_TEST: options && options.ENV === 'test',
    'process.env': {
      NODE_ENV: `"${options.ENV}"`
    },
    HMR: options && options.HMR,
    PORT: 3000,
    HOST: 'localhost',
    SRC_DIR: path.join(__dirname, 'src'),
    OUT_DIR: path.resolve(__dirname, 'build'),
    ASSETS_DIR: path.resolve(__dirname, 'src/assets'),
  };

  const config = {
    context: __dirname,

    entry: {
      vendor: './src/vendor',
      main: './src/main'
    },

    module: {
      loaders: [
        { test: /\.ts$/,   loader: 'awesome-typescript-loader', include: CONSTANTS.SRC_DIR },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.html/,  loader: 'raw-loader', exclude: [path.resolve(__dirname, 'src/index.html')] },
        { test: /\.css$/,  loader: 'raw-loader' },
        { test: /\.png$/,  loader: 'url-loader', query: {mimetype: 'image/png'} },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: {limit: 10000, mimetype: 'application/font-woff'} },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
      ]
    },

    plugins: [
      new ForkCheckerPlugin(),
      CONSTANTS.IS_TEST ? undefined : new CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
      new DefinePlugin(CONSTANTS),
      new HtmlWebpackPlugin({ template: 'src/index.html' })
    ].filter(p => !!p),

    resolve: {
      modules: [__dirname, CONSTANTS.SRC_DIR, 'node_modules'],
      extensions: ['', '.ts', '.js', '.json']
    },

    node: {
      global: true,
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    },

    sassLoader: {
      includePaths: [
        CONSTANTS.SRC_DIR,
        CONSTANTS.ASSETS_DIR,
      ]
    }
  };

  /*
    Development Config
   */

  if (CONSTANTS.IS_DEV || CONSTANTS.IS_TEST) {

    // Loader debug mode
    config.debug = true;

    // Add caching
    config.cache = true;

    // Set best devtool for development
    config.devtool = 'source-map';

    config.output = {
      path: CONSTANTS.OUT_DIR,
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].bundle.map',
      chunkFilename: '[id].chunk.js'
    };

    // configure dev server
    config.devServer = {
      contentBase: CONSTANTS.SRC_DIR,
      port: CONSTANTS.PORT,
      hot: CONSTANTS.HMR,
      inline: CONSTANTS.HMR,
      outputPath: CONSTANTS.OUT_DIR,
      historyApiFallback: true,
      proxy: {
        // Proxy to backend
        '/authenticate': {
          target: 'http://localhost:3001',
          secure: false
        },
        '/api/*': {
          target: 'http://localhost:3001',
          secure: false
        }
      }
    };

    // Add inline css module
    config.module.loaders.push(
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    );

    // Add hot module replacement
    if (options.HMR) {
      config.plugins.push(new HotModuleReplacementPlugin());
    }

    // Needs to be added after devServer.outputPath is set
    config.plugins.push(new CopyWebpackPlugin([{ from: CONSTANTS.ASSETS_DIR, to: 'assets' }]));
  }

  /*
   Production Config
   */

  if (CONSTANTS.IS_PROD) {
    config.debug = false;
    config.devtool = 'source-map';

    config.output = {
      path: CONSTANTS.OUT_DIR,
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    };

    // Extract css into it's own file
    config.module.loaders.push(
      { test: /\.component\.scss$/, loaders: ['raw-loader', 'css-loader', 'sass-loader'] }, // support styles: [require('athing.component.scss')]
      { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])}
    );

    // Add production plugins
    config.plugins.push(
      // Needs to be added after devServer.outputPath is set
      new CopyWebpackPlugin([{ from: CONSTANTS.ASSETS_DIR, to: 'assets' }]),

      // Plugin to replace a standard webpack chunkhash with md5
      new WebpackMd5Hash(),

      // Prevents the inclusion of duplicate code into your bundle and instead applies a copy of the function at runtime
      new DedupePlugin(),

      // Included with -p, makes things faster
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      // Minify javascript
      new UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8 : true, keep_fnames: true },
        compress: { screw_ie8: true, warnings: false },
        comments: false
      }),

      // Extract css into its own file, works in tandem with the above loader
      new ExtractTextPlugin('[name].[contenthash].css'),

      // Prepares compressed versions of assets to serve them with Content-Encoding
      new CompressionPlugin({ regExp: /\.css$|\.html$|\.js$|\.map$/, threshold: 2 * 1024 })
    );
  }

  return config;

};

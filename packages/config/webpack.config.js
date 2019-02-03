const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin')
const SizePlugin = require('size-plugin')

const { LOCAL, PATHS } = require('./paths')

module.exports = {
  node: {
    module: 'empty',
    net: 'empty',
    fs: 'empty',
  },
  entry: [path.join(PATHS.source, 'index')],
  output: {
    filename: 'index.js',
    path: PATHS.target,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    /**
     * Some commonly used modules/assets can be aliased.
     * See: https://webpack.js.org/configuration/resolve/#resolve-alias
     */
    alias: {
      Assets: path.resolve(__dirname, '../assets'),
      /**
       * Fix for: https://stackoverflow.com/questions/52013636/module-not-found-error-cant-resolve-reactdom
       */
      ReactDOM: path.resolve(__dirname, '../../node_modules/react'),
    },
    /**
     * Resolve regular JS files as well as JSX functional components.
     */
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    /**
     * Resolve modules from top-level modules directory, and from local packages,
     * in order to enable loading of local dependencies, like for example,
     * using @imports from ~assets in SCSS files.
     */
    modules: [
      path.resolve(PATHS.source),
      '../../node_modules/', // top-level modules.
      '../', // local modules.
      'node_modules',
    ],
    /**
     * Allow importing sources from symlinked packages.
     * Works together with 'path.resolve(PATHS.source)'
     * in resolve: { modules [] }.l
     */
    symlinks: false,
  },
  module: {
    rules: [
      /**
       * A Linter will run first to validate the code. The .eslintrc.json file
       * will be loaded from the top-level path of the monorepository,
       * however some eslint-* packages have to be installed locally.
       */
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: PATHS.source,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: PATHS.source,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                '@babel/plugin-proposal-decorators',
                {
                  decoratorsBeforeExport: false,
                },
              ],
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-regenerator',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: PATHS.source,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')({ browsers: ['last 2 versions'] })],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.target], {
      root: LOCAL,
    }),
    new TSLintPlugin({
      files: ['./src/*.ts*', './src/**/*.ts*'],
    }),
    new SizePlugin(),
  ],
  stats: {
    excludeModules: () => true,
  },
}

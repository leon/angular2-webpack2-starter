const specGlob = 'src/**/*.spec.ts';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/test.ts'],
    exclude: [
    ],
    preprocessors: {
      '**/*.ts': ['webpack']
    },
    webpack: require('./webpack.config')({ENV: 'test'}),
    webpackMiddleware: { noInfo: true },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  });
}

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/spec/simple.js'
    ],
    logLevel: config.LOG_WARN,
    browsers: ['ChromeHeadless'],
    reporters: ['mocha']
  });
};

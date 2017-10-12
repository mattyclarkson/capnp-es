const which = require('which');

const chrome = which.sync('chrome', {nothrow: true});
const chromium = which.sync('chromium', {nothrow: true});

if (!chrome && chromium) {
  process.env.CHROME_BIN = chromium;
}

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

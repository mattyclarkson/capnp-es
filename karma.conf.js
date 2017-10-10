module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/spec/simple.js'
    ],
    browsers: ['ChromeHeadless'],
    reporters: ['mocha']
  });
};

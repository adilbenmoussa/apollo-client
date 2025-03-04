define(['require', 'exports', './environment'], function(
  require,
  exports,
  environment_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  var haveWarned = Object.create({});
  function warnOnceInDevelopment(msg, type) {
    if (type === void 0) {
      type = 'warn';
    }
    if (!environment_1.isProduction() && !haveWarned[msg]) {
      if (!environment_1.isTest()) {
        haveWarned[msg] = true;
      }
      if (type === 'error') {
        console.error(msg);
      } else {
        console.warn(msg);
      }
    }
  }
  exports.warnOnceInDevelopment = warnOnceInDevelopment;
});
//# sourceMappingURL=warnOnce.js.map

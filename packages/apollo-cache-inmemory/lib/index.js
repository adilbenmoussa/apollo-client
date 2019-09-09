define([
  'require',
  'exports',
  'tslib',
  './inMemoryCache',
  './readFromStore',
  './writeToStore',
  './fragmentMatcher',
  './objectCache',
], function(
  require,
  exports,
  tslib_1,
  inMemoryCache_1,
  readFromStore_1,
  writeToStore_1,
  fragmentMatcher_1,
  objectCache_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.InMemoryCache = inMemoryCache_1.InMemoryCache;
  exports.defaultDataIdFromObject = inMemoryCache_1.defaultDataIdFromObject;
  tslib_1.__exportStar(readFromStore_1, exports);
  tslib_1.__exportStar(writeToStore_1, exports);
  tslib_1.__exportStar(fragmentMatcher_1, exports);
  tslib_1.__exportStar(objectCache_1, exports);
});
//# sourceMappingURL=index.js.map

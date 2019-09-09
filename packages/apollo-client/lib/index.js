define([
  'require',
  'exports',
  'tslib',
  './core/ObservableQuery',
  './core/networkStatus',
  './core/types',
  './errors/ApolloError',
  './ApolloClient',
], function(
  require,
  exports,
  tslib_1,
  ObservableQuery_1,
  networkStatus_1,
  types_1,
  ApolloError_1,
  ApolloClient_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  ApolloClient_1 = tslib_1.__importDefault(ApolloClient_1);
  exports.ObservableQuery = ObservableQuery_1.ObservableQuery;
  exports.NetworkStatus = networkStatus_1.NetworkStatus;
  tslib_1.__exportStar(types_1, exports);
  exports.isApolloError = ApolloError_1.isApolloError;
  exports.ApolloError = ApolloError_1.ApolloError;
  exports.ApolloClient = ApolloClient_1.default;
  exports.default = ApolloClient_1.default;
});
//# sourceMappingURL=index.js.map

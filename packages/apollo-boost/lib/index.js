define([
  'require',
  'exports',
  'tslib',
  'apollo-client',
  'apollo-link',
  'apollo-cache-inmemory',
  'apollo-link',
  'apollo-link-http',
  'apollo-link-error',
  'apollo-cache-inmemory',
  'graphql-tag',
  'apollo-client',
  'ts-invariant',
], function(
  require,
  exports,
  tslib_1,
  apollo_client_1,
  apollo_link_1,
  apollo_cache_inmemory_1,
  apollo_link_2,
  apollo_link_http_1,
  apollo_link_error_1,
  apollo_cache_inmemory_2,
  graphql_tag_1,
  apollo_client_2,
  ts_invariant_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  graphql_tag_1 = tslib_1.__importDefault(graphql_tag_1);
  apollo_client_2 = tslib_1.__importDefault(apollo_client_2);
  tslib_1.__exportStar(apollo_client_1, exports);
  tslib_1.__exportStar(apollo_link_1, exports);
  tslib_1.__exportStar(apollo_cache_inmemory_1, exports);
  exports.HttpLink = apollo_link_http_1.HttpLink;
  exports.gql = graphql_tag_1.default;
  var PRESET_CONFIG_KEYS = [
    'request',
    'uri',
    'credentials',
    'headers',
    'fetch',
    'fetchOptions',
    'clientState',
    'onError',
    'cacheRedirects',
    'cache',
    'name',
    'version',
    'resolvers',
    'typeDefs',
    'fragmentMatcher',
  ];
  var DefaultClient = (function(_super) {
    tslib_1.__extends(DefaultClient, _super);
    function DefaultClient(config) {
      if (config === void 0) {
        config = {};
      }
      var _this = this;
      if (config) {
        var diff = Object.keys(config).filter(function(key) {
          return PRESET_CONFIG_KEYS.indexOf(key) === -1;
        });
        if (diff.length > 0) {
          ts_invariant_1.invariant.warn(
            'ApolloBoost was initialized with unsupported options: ' +
              ('' + diff.join(' ')),
          );
        }
      }
      var request = config.request,
        uri = config.uri,
        credentials = config.credentials,
        headers = config.headers,
        fetch = config.fetch,
        fetchOptions = config.fetchOptions,
        clientState = config.clientState,
        cacheRedirects = config.cacheRedirects,
        errorCallback = config.onError,
        name = config.name,
        version = config.version,
        resolvers = config.resolvers,
        typeDefs = config.typeDefs,
        fragmentMatcher = config.fragmentMatcher;
      var cache = config.cache;
      ts_invariant_1.invariant(
        !cache || !cacheRedirects,
        'Incompatible cache configuration. When not providing `cache`, ' +
          'configure the provided instance with `cacheRedirects` instead.',
      );
      if (!cache) {
        cache = cacheRedirects
          ? new apollo_cache_inmemory_2.InMemoryCache({
              cacheRedirects: cacheRedirects,
            })
          : new apollo_cache_inmemory_2.InMemoryCache();
      }
      var errorLink = errorCallback
        ? apollo_link_error_1.onError(errorCallback)
        : apollo_link_error_1.onError(function(_a) {
            var graphQLErrors = _a.graphQLErrors,
              networkError = _a.networkError;
            if (graphQLErrors) {
              graphQLErrors.forEach(function(_a) {
                var message = _a.message,
                  locations = _a.locations,
                  path = _a.path;
                return ts_invariant_1.invariant.warn(
                  '[GraphQL error]: Message: ' +
                    message +
                    ', Location: ' +
                    (locations + ', Path: ' + path),
                );
              });
            }
            if (networkError) {
              ts_invariant_1.invariant.warn('[Network error]: ' + networkError);
            }
          });
      var requestHandler = request
        ? new apollo_link_2.ApolloLink(function(operation, forward) {
            return new apollo_link_2.Observable(function(observer) {
              var handle;
              Promise.resolve(operation)
                .then(function(oper) {
                  return request(oper);
                })
                .then(function() {
                  handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  });
                })
                .catch(observer.error.bind(observer));
              return function() {
                if (handle) {
                  handle.unsubscribe();
                }
              };
            });
          })
        : false;
      var httpLink = new apollo_link_http_1.HttpLink({
        uri: uri || '/graphql',
        fetch: fetch,
        fetchOptions: fetchOptions || {},
        credentials: credentials || 'same-origin',
        headers: headers || {},
      });
      var link = apollo_link_2.ApolloLink.from(
        [errorLink, requestHandler, httpLink].filter(function(x) {
          return !!x;
        }),
      );
      var activeResolvers = resolvers;
      var activeTypeDefs = typeDefs;
      var activeFragmentMatcher = fragmentMatcher;
      if (clientState) {
        if (clientState.defaults) {
          cache.writeData({
            data: clientState.defaults,
          });
        }
        activeResolvers = clientState.resolvers;
        activeTypeDefs = clientState.typeDefs;
        activeFragmentMatcher = clientState.fragmentMatcher;
      }
      _this =
        _super.call(this, {
          cache: cache,
          link: link,
          name: name,
          version: version,
          resolvers: activeResolvers,
          typeDefs: activeTypeDefs,
          fragmentMatcher: activeFragmentMatcher,
        }) || this;
      return _this;
    }
    return DefaultClient;
  })(apollo_client_2.default);
  exports.default = DefaultClient;
});
//# sourceMappingURL=index.js.map

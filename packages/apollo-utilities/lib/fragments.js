define(['require', 'exports', 'tslib', 'ts-invariant'], function(
  require,
  exports,
  tslib_1,
  ts_invariant_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function(definition) {
      if (definition.kind === 'OperationDefinition') {
        throw new ts_invariant_1.InvariantError(
          'Found a ' +
            definition.operation +
            ' operation' +
            (definition.name ? " named '" + definition.name.value + "'" : '') +
            '. ' +
            'No operations are allowed when using a fragment as a query. Only fragments are allowed.',
        );
      }
      if (definition.kind === 'FragmentDefinition') {
        fragments.push(definition);
      }
    });
    if (typeof actualFragmentName === 'undefined') {
      ts_invariant_1.invariant(
        fragments.length === 1,
        'Found ' +
          fragments.length +
          ' fragments. `fragmentName` must be provided when there is not exactly 1 fragment.',
      );
      actualFragmentName = fragments[0].name.value;
    }
    var query = tslib_1.__assign({}, document, {
      definitions: [
        {
          kind: 'OperationDefinition',
          operation: 'query',
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'FragmentSpread',
                name: {
                  kind: 'Name',
                  value: actualFragmentName,
                },
              },
            ],
          },
        },
      ].concat(document.definitions),
    });
    return query;
  }
  exports.getFragmentQueryDocument = getFragmentQueryDocument;
});
//# sourceMappingURL=fragments.js.map

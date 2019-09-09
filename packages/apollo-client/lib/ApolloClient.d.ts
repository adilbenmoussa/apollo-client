import { ApolloLink, FetchResult, GraphQLRequest } from 'apollo-link';
import { ExecutionResult, DocumentNode } from 'graphql';
import { ApolloCache, DataProxy } from 'apollo-cache';
import { QueryManager } from './core/QueryManager';
import { ApolloQueryResult, OperationVariables, Resolvers } from './core/types';
import { ObservableQuery } from './core/ObservableQuery';
import { FragmentMatcher } from './core/LocalState';
import { Observable } from './util/Observable';
import {
  QueryOptions,
  WatchQueryOptions,
  SubscriptionOptions,
  MutationOptions,
} from './core/watchQueryOptions';
import { DataStore } from './data/store';
export interface DefaultOptions {
  watchQuery?: Partial<WatchQueryOptions>;
  query?: Partial<QueryOptions>;
  mutate?: Partial<MutationOptions>;
}
export declare type ApolloClientOptions<TCacheShape> = {
  link?: ApolloLink;
  cache: ApolloCache<TCacheShape>;
  ssrForceFetchDelay?: number;
  ssrMode?: boolean;
  connectToDevTools?: boolean;
  queryDeduplication?: boolean;
  defaultOptions?: DefaultOptions;
  assumeImmutableResults?: boolean;
  resolvers?: Resolvers | Resolvers[];
  typeDefs?: string | string[] | DocumentNode | DocumentNode[];
  fragmentMatcher?: FragmentMatcher;
  name?: string;
  version?: string;
};
export default class ApolloClient<TCacheShape> implements DataProxy {
  link: ApolloLink;
  store: DataStore<TCacheShape>;
  cache: ApolloCache<TCacheShape>;
  readonly queryManager: QueryManager<TCacheShape>;
  disableNetworkFetches: boolean;
  version: string;
  queryDeduplication: boolean;
  defaultOptions: DefaultOptions;
  readonly typeDefs: ApolloClientOptions<TCacheShape>['typeDefs'];
  private devToolsHookCb;
  private resetStoreCallbacks;
  private clearStoreCallbacks;
  private localState;
  constructor(options: ApolloClientOptions<TCacheShape>);
  stop(): void;
  watchQuery<T = any, TVariables = OperationVariables>(
    options: WatchQueryOptions<TVariables>,
  ): ObservableQuery<T, TVariables>;
  query<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables>,
  ): Promise<ApolloQueryResult<T>>;
  mutate<T = any, TVariables = OperationVariables>(
    options: MutationOptions<T, TVariables>,
  ): Promise<FetchResult<T>>;
  subscribe<T = any, TVariables = OperationVariables>(
    options: SubscriptionOptions<TVariables>,
  ): Observable<FetchResult<T>>;
  readQuery<T = any, TVariables = OperationVariables>(
    options: DataProxy.Query<TVariables>,
    optimistic?: boolean,
  ): T | null;
  readFragment<T = any, TVariables = OperationVariables>(
    options: DataProxy.Fragment<TVariables>,
    optimistic?: boolean,
  ): T | null;
  writeQuery<TData = any, TVariables = OperationVariables>(
    options: DataProxy.WriteQueryOptions<TData, TVariables>,
  ): void;
  writeFragment<TData = any, TVariables = OperationVariables>(
    options: DataProxy.WriteFragmentOptions<TData, TVariables>,
  ): void;
  writeData<TData = any>(options: DataProxy.WriteDataOptions<TData>): void;
  __actionHookForDevTools(cb: () => any): void;
  __requestRaw(payload: GraphQLRequest): Observable<ExecutionResult>;
  initQueryManager(): QueryManager<TCacheShape>;
  resetStore(): Promise<ApolloQueryResult<any>[] | null>;
  clearStore(): Promise<any[]>;
  onResetStore(cb: () => Promise<any>): () => void;
  onClearStore(cb: () => Promise<any>): () => void;
  reFetchObservableQueries(
    includeStandby?: boolean,
  ): Promise<ApolloQueryResult<any>[]>;
  extract(optimistic?: boolean): TCacheShape;
  restore(serializedState: TCacheShape): ApolloCache<TCacheShape>;
  addResolvers(resolvers: Resolvers | Resolvers[]): void;
  setResolvers(resolvers: Resolvers | Resolvers[]): void;
  getResolvers(): Resolvers;
  setLocalStateFragmentMatcher(fragmentMatcher: FragmentMatcher): void;
}
//# sourceMappingURL=ApolloClient.d.ts.map

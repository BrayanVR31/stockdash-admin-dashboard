import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

const singleQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, //60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: (error) => false,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) return singleQueryClient();
  else {
    if (!browserQueryClient) browserQueryClient = singleQueryClient();
    return browserQueryClient;
  }
};

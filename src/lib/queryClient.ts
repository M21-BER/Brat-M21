import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
export { QueryClientProvider, queryClient, useQuery, useQueryClient };

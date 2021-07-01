import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getMyths } from '../api/getMyths';
import { getSolutions } from '../api/getSolutions';
import { getFeed } from '../api/getFeed';
import { useSession } from '../hooks/useSession';

// Query client provider to allow useQuery
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
    },
  },
});

const QueryProvider: React.FC = ({ children }) => {
  const { sessionId } = useSession();

  // Prefetch myths
  queryClient.prefetchQuery('myths', getMyths);

  // Prefetch solutions when we have sessionId
  queryClient.prefetchQuery(['solutions', sessionId], () => {
    if (sessionId) {
      return getSolutions(sessionId);
    }
  });

  // Prefetch feed when we have sessionId
  queryClient.prefetchQuery(['feed', sessionId], () => {
    if (sessionId) {
      return getFeed(sessionId);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;

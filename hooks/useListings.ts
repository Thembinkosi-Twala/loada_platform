// hooks/useListings.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseListingsProps {
  status?: 'available'; // You can add more statuses if needed
}

export const useListings = ({ status }: UseListingsProps) => {
  return useInfiniteQuery(
    ['listings', status],
    async ({ pageParam = 1 }) => {
      const response = await axios.get(`/api/containers`, {
        params: {
          page: pageParam,
          status // Add status filter to your API request
        }
      });
      return response.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/services/api";

type UseDataProps = {
  queryKey: string[];
  url: string;
  retry?: boolean;
  enabled?: boolean;
  staleTime?: number;
};

export function useData<T>({
  queryKey,
  url,
  enabled = true,
  staleTime = 0,
  retry = false,
}: UseDataProps) {
  return useQuery({
    queryKey,
    queryFn: () => getData<T>({ url }),
    enabled,
    staleTime,
    retry,
  });
}

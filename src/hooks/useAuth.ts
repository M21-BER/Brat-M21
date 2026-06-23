import { useQueryClient } from "@/lib/queryClient";
import { useNavigate } from "react-router-dom";
import LocalStorageSaver from "@/utils/local_storage";
import { TOKEN_KEY } from "@/utils/utils";
import { useData } from "./useData";
export function useAuth({
  queryKey,
  url,
  navigateTo = "/login",
  replaceOnNavigate = true,
}: {
  queryKey: string[];
  url: string;
  navigateTo?: string;
  replaceOnNavigate?: boolean;
}) {
  const queryClient = useQueryClient();
  const tokenData = LocalStorageSaver.getData<{
    token: string;
    userData?: any;
  }>(TOKEN_KEY);
  const token = tokenData?.token || null;
  const shouldFetch = !!token;
  const navigate = useNavigate();
  const query = useData<any>({
    queryKey,
    url,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: shouldFetch,
  });
  const setAuth = (data: any) => {
    queryClient.setQueryData(queryKey, data);
  };
  const logout = async () => {
    LocalStorageSaver.removeData(TOKEN_KEY);
    queryClient.removeQueries({ queryKey });
    navigate(navigateTo, { replace: replaceOnNavigate });
  };

  return {
    ...query,
    logout,
    setAuth,
    refetchUserData: query.refetch,
  };
}

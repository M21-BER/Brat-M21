import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "@/services/api";
import { useNavigate } from "react-router-dom";
import LocalStorageSaver from "@/utils/local_storage";
import { TOKEN_KEY } from "@/utils/utils";

export function useAuth() {
  const queryClient = useQueryClient();
  const tokenData = LocalStorageSaver.getData<{
    token: string;
    userData: any;
  }>(TOKEN_KEY);
  const token = tokenData?.token || null;
  const shouldFetch = !!token;
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["student_auth"],
    queryFn: () => getData<any>({ url: "student/auth" }),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: shouldFetch,
  });
  const setAuth = (data: any) => {
    queryClient.setQueryData(["student_auth"], data);
  };
  const logout = async () => {
    LocalStorageSaver.removeData(TOKEN_KEY);
    LocalStorageSaver.removeData("socketToken");
    queryClient.removeQueries({ queryKey: ["student_sauth"] });
    navigate("/login", { replace: true });
  };

  return {
    ...query,
    logout,
    setAuth,
    refetchUserData: query.refetch,
  };
}

import { useQuery } from "@tanstack/react-query";
import { useUserApi } from "@api/user.ts";
import { useAtom } from "jotai";
import { tokenAtom } from "@state/atoms.ts";

export const useFetchMeQuery = () => {
  const { fetchMe } = useUserApi();
  const [token] = useAtom(tokenAtom);

  return useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!token,
  });
}
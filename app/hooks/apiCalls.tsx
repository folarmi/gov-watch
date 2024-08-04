import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

interface UseDataOptions {
  url: string;
  queryKey: string[];
}

export const useCountriesData = () => {
  return useQuery<any>({
    queryKey: ["getAllCountries"],
    queryFn: async () => {
      const response = await api.get("/GetListOfCountries");
      return response?.data;
    },
  });
};

export const useGetData = ({ url, queryKey }: UseDataOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface UseDataOptions {
  url: string;
  queryKey: string[];
  enabled?: any;
}
interface UseGetDataByIdOptions {
  url: string;
  queryKey: string[];
  enabled?: any;
}

export interface UploadResponse {
  data: {
    remark: string;
    filePath: string;
  };
  status: number;
}

export interface UploadError {
  response: {
    data: {
      errors: {
        CreatedBy: string[];
        UploadFile: string[];
      };
    };
  };
}

type SuccessHandler = (data: UploadResponse) => void;
type ErrorHandler = (error: UploadError) => void;

interface MutationResponse {
  status: number;
  data: {
    remark: string;
    [key: string]: any;
  };
}

interface CustomMutationOptions<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  endpoint: string;
  method?: "get" | "post" | "put" | "delete";
  successMessage?: (data: TData) => string;
  errorMessage?: (error: TError) => string;
  onSuccessCallback?: (data: TData) => void;
  contentType?: "multipart/form-data" | "application/json";
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >;
}

export const useCountriesData = () => {
  return useQuery<any>({
    queryKey: ["getAllCountries"],
    queryFn: async () => {
      const response = await api.get("Countries/GetListOfCountries");
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

export const useGetData = ({ url, queryKey, enabled }: UseDataOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
    retry: false,
    // retry: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetDataById = ({
  url,
  queryKey,
  enabled,
}: UseGetDataByIdOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useUploadMutation = (
  onSuccessHandler?: SuccessHandler,
  onErrorHandler?: ErrorHandler
): UseMutationResult<UploadResponse, UploadError, FormData> => {
  return useMutation<UploadResponse, UploadError, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Uploads/UploadImage", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      toast(data?.remark);
      if (onSuccessHandler) {
        onSuccessHandler(data);
      }
    },
    onError: (error) => {
      const { CreatedBy, UploadFile } = error?.response?.data?.errors || {};
      if (CreatedBy) toast.error(CreatedBy[0]);
      if (UploadFile) toast.error(UploadFile[0]);
      if (onErrorHandler) {
        onErrorHandler(error);
      }
    },
  });
};

export const useCustomMutation = <
  TData = MutationResponse,
  TError = AxiosError,
  TVariables = unknown,
  TContext = unknown
>(
  options: CustomMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const {
    endpoint,
    successMessage,
    errorMessage,
    onSuccessCallback,
    method = "post",
    contentType = "application/json",
    ...mutationOptions
  } = options;

  // return useMutation<TData, TError, TVariables, TContext>({
  //   mutationFn: async (variables: TVariables) => {
  //     const response = await api[method]<TData>(endpoint, variables);
  //     return response.data;
  //   },
  //   // onSuccess: (data: any, variables, context) => {
  //   onSuccess: (data: any) => {
  //     if (data?.statusCode === 201) {
  //       if (successMessage) {
  //         toast(successMessage(data));
  //       }
  //       if (onSuccessCallback) {
  //         onSuccessCallback(data);
  //       }
  //     }
  //   },
  //   onError: (error: any) => {
  //     console.log(error?.response?.data);
  //     if (errorMessage) {
  //       toast.error(errorMessage(error));
  //     } else if (error?.response?.data?.remark) {
  //       toast.error(error.response.data.remark);
  //     } else if (error?.response?.data) {
  //       toast.error(error?.response?.data);
  //     }
  //   },

  //   ...mutationOptions,
  // });

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      if (contentType === "multipart/form-data") {
        const formData = new FormData();

        // Assuming variables is an object and needs to be appended to formData
        if (typeof variables === "object" && variables !== null) {
          for (const key in variables) {
            formData.append(key, (variables as any)[key]);
          }
        }

        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}:`, value);
        // }

        const response = await api[method]<TData>(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("jmk,mnbn", response.data);
        return response.data;
      } else {
        // Default to JSON handling
        const response = await api[method]<TData>(endpoint, variables, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      }
    },
    onSuccess: (data: any) => {
      if (data?.statusCode === 201) {
        if (successMessage) {
          toast(successMessage(data));
        }
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      }
    },
    onError: (error: any) => {
      if (errorMessage) {
        toast.error(errorMessage(error));
      } else if (error?.response?.data?.remark) {
        toast.error(error.response.data.remark);
      } else if (error?.response?.data) {
        toast.error(error?.response?.data);
      }
    },
    ...mutationOptions,
  });
};

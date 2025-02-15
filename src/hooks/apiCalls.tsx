/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface UseDataOptions
  extends Omit<UseQueryOptions<any, any>, "queryKey" | "queryFn"> {
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
  // data: {
  //   remark: string;
  //   filePath: string;
  // };
  status: number;
  statusCode?: number;
  filePath?: string;
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

type SuccessHandler = ((data: UploadResponse) => void) | undefined;
type ErrorHandler = ((error: UploadError) => void) | undefined;

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

export const useGetData = ({
  url,
  queryKey,
  enabled,
  ...rest
}: UseDataOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
    enabled,
    retry: false,
    // retry: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    ...rest,
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
  onErrorHandler?: ErrorHandler,
  method: "post" | "put" = "post"
): UseMutationResult<UploadResponse, UploadError, FormData> => {
  return useMutation<UploadResponse, UploadError, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await api[method](
        method === "post" ? "Uploads/UploadImage" : "Uploads/UpdateImage",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const config: Record<string, any> = {
        headers: {
          "Content-Type": contentType,
        },
      };

      if (method.toLowerCase() === "delete") {
        // Handle DELETE with a body
        const response = await api[method]<TData>(endpoint, variables, config);
        return response.data;
      }

      if (contentType === "multipart/form-data") {
        const formData = new FormData();
        if (typeof variables === "object" && variables !== null) {
          for (const key in variables) {
            formData.append(key, (variables as any)[key]);
          }
        }
        const response = await api[method]<TData>(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      }

      // Default JSON handling
      const response = await api[method]<TData>(endpoint, variables, config);
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data?.statusCode === 201 || data?.statusCode === 200) {
        if (successMessage) {
          toast(successMessage(data));
        }
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      }
    },
    // onError: (error: any) => {
    //   if (errorMessage) {
    //     toast.error(errorMessage(error));
    //   } else if (error?.response?.data?.remark) {
    //     toast.error(error.response.data.remark);
    //   } else if (error?.response?.data) {
    //     toast.error(error?.response?.data);
    //   }
    // },
    onError: (error: any) => {
      // If an errorMessage function is provided, use it to show the error message
      if (errorMessage) {
        toast.error(errorMessage(error));
      } else {
        // If errorMessage is not provided, handle different error formats

        // Check if it's an array of errors and display them using toast
        if (Array.isArray(error?.response?.data?.errors)) {
          error?.response?.data?.errors.forEach((errorMessage: string) => {
            toast.error(errorMessage);
          });
        } else if (error?.response?.data?.remark) {
          // Display a single remark error
          toast.error(error?.response?.data?.remark);
        } else if (error?.response?.data) {
          // Display the entire error object in toast
          toast.error(JSON.stringify(error?.response?.data));
        } else {
          // Display a generic error message if no specific error data is available
          toast.error("An error occurred.");
        }
      }
    },
    ...mutationOptions,
  });
};

export const uploadFile = async (
  uploadedFile: File,
  userId: string,
  uploadMutation: UseMutationResult<UploadResponse, unknown, FormData, unknown>
): Promise<string | null> => {
  if (!uploadedFile) return null;

  const formData = new FormData();
  formData.append("uploadFile", uploadedFile);
  formData.append("createdBy", userId);

  try {
    const uploadResponse = await uploadMutation.mutateAsync(formData);
    if (uploadResponse.statusCode !== 201) {
      throw new Error("File upload failed.");
    }
    return uploadResponse?.filePath || null;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const updateFileHandler = async (
  file: File | null,
  userId: string,
  publicId: string | undefined,
  updateUploadMutation: any
): Promise<string | null> => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("publicId", publicId || "");
  formData.append("uploadFile", file);
  formData.append("lastModifiedBy", userId);

  const result = await updateUploadMutation.mutateAsync(formData);
  return result.filePath; // Assuming the mutation returns the new file path
};

export const useGetImageDetails = (module: any) => {
  return useQuery<any>({
    queryKey: ["GetImageDetails"],
    queryFn: async () => {
      const response = await api.get(
        `Uploads/GetUpload?filePath=${module?.image || module?.categoryImage}`
      );
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

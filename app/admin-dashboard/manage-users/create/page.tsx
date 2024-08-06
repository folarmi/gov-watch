"use client";

import CustomButton from "@/app/component/CustomButton";
import CustomInput from "@/app/component/CustomInput";
import CustomSelect from "@/app/component/CustomSelect";
import AdminButton from "@/app/component/forms/AdminButton";
import { useCountriesData } from "@/app/hooks/apiCalls";
import api from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UserRegistrationForm: React.FC = () => {
  const { data: countriesData, isLoading: countriesDataIsLoading } =
    useCountriesData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userForm: [
        { firstName: "", lastName: "", email: "", country: "", password: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "userForm",
  });

  const countriesDataFormatted =
    countriesData &&
    countriesData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const registerMultipleUsersMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("CreateMultipleUsers", data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data?.data?.statusCode === 201) {
        toast("Kindly check your email for a verification link");
      }
      // router.push("/signin");
    },
    onError: (error: any) => {
      toast(error?.response?.data?.remark, {
        type: "error",
      });
    },
  });

  const submitForm = (data: any) => {
    const formattedData = data?.userForm?.map((item: any) => ({
      ...item,
      country: item?.country.value,
      confirmPassword: item?.password,
    }));
    registerMultipleUsersMutation.mutate(formattedData);

    // console.log(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="p-4 w-full mt-10">
      <h1 className="text-2xl font-bold mb-4">Register Multiple Users</h1>
      <div
        className="flex justify-end w-full mb-1"
        onClick={() =>
          append({
            firstName: "",
            lastName: "",
            email: "",
            country: "",
            password: "",
          })
        }
      >
        <AdminButton buttonText="Add New User" />
      </div>

      {fields.map((field, index) => {
        return (
          <>
            <section
              key={field.id}
              className="grid grid-cols-3 gap-4 w-full border border-gray-200 rounded-lg p-4 mb-4"
            >
              <CustomInput
                label="First name"
                name={`userForm.${index}.firstName`}
                control={control}
                className="col-span-1"
                rules={{ required: "First name is required" }}
              />

              <CustomInput
                label="Last name"
                name={`userForm.${index}.lastName`}
                control={control}
                className="col-span-1"
                rules={{ required: "Last name is required" }}
              />

              <CustomInput
                label="Email address"
                name={`userForm.${index}.email`}
                type="email"
                className="col-span-1"
                control={control}
                rules={{ required: "Email is required" }}
              />

              <CustomSelect
                name={`userForm.${index}.country`}
                options={countriesDataFormatted}
                isLoading={countriesDataIsLoading}
                label="Country"
                control={control}
                placeholder="Select Country"
              />

              <CustomInput
                label="Password"
                name={`userForm.${index}.password`}
                control={control}
                type="password"
                rules={{ required: "Password is required" }}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                className="cursor-pointer"
                onClick={() => remove(index)}
              >
                <rect width="24" height="24" fill="white" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 3h10a1 1 0 0 1 1 1v1h3a1 1 0 1 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1zm0 4v13h10V7H7zm2 2a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1z"
                  fill="red"
                />
              </svg>
            </section>
          </>
        );
      })}

      <CustomButton
        type="submit"
        className="mt-4"
        disabled={registerMultipleUsersMutation.isPending}
        loading={registerMultipleUsersMutation.isPending}
      >
        Register User
      </CustomButton>
    </form>
  );
};

export default UserRegistrationForm;

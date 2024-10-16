/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import CustomInput from "../component/CustomInput";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormValues } from "../types/generalTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CustomButton from "../component/CustomButton";
import CustomSelect from "../component/CustomSelect";
import { useCountriesData } from "../hooks/apiCalls";
import AuthLayout from "../component/AuthLayout";

const Signup = () => {
  const { handleSubmit, control } = useForm<RegisterFormValues>();
  const { data: countriesData, isLoading: countriesDataIsLoading } =
    useCountriesData();
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Authentication/Register", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.data?.statusCode === 201) {
        toast("Kindly check your email for a verification link");
        router.push("/verify-email");
      }
    },
    onError: (error: any) => {
      toast(error?.response?.data?.remark, {
        type: "error",
      });
    },
  });

  const countriesDataFormatted =
    countriesData &&
    countriesData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data: any) => {
    const formValues = {
      ...data,
      country: data.country.value,
    };
    // console.log(formValues);
    signUpMutation.mutate(formValues);
  };

  return (
    <AuthLayout
      header="Empowering Nigerians with information fostering citizenship participation in governance" 
      text="" 
      img="logo.svg" 
      banner="signup-Banner.svg"
      headerMarginTop="31rem">


      <div className="mb-24 md:mx-10 mx-6 w-96">
        <h1 className="font-bold text-4xl mb-2">Let's get started</h1>
        <p className="mb-9">Kindly fill in the required details below</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="First name"
            name="firstName"
            control={control}
            rules={{ required: "First name is required" }}
          />

          <CustomInput
            label="Last name"
            name="lastName"
            control={control}
            rules={{ required: "Last name is required" }}
          />

          <CustomInput
            label="Email address"
            name="email"
            type="email"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <CustomSelect
            name="country"
            options={countriesDataFormatted}
            isLoading={countriesDataIsLoading}
            label="Country"
            control={control}
            placeholder="Select Country"
          />

          <CustomInput
            label="Password"
            name="password"
            control={control}
            type="password"
            rules={{ required: "Password is required" }}
          />

          <CustomInput
            label="Confirm Password"
            name="confirmPassword"
            control={control}
            type="password"
            rules={{ required: "Confirm password" }}
          />

          <CustomButton
            type="submit"
            className="mt-4"
            disabled={signUpMutation.isPending}
            loading={signUpMutation.isPending}
          >
            Sign Up
          </CustomButton>

          <Link href="/signin" className="cursor-pointer">
            <p className="flex justify-center mt-5 text-sm">
              Already have an account?
              <span className="font-bold text-primary"> Sign In</span>
            </p>
          </Link>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormValues } from "../types/generalTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import CustomButton from "../component/CustomButton";
import CustomSelect from "../component/CustomSelect";
import { useCountriesData } from "../hooks/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useState } from "react";

const Signup = () => {
  const { handleSubmit, control } = useForm<RegisterFormValues>();
  const { handleSubmit: handleCorporateForm, control: controlCorporateForm } =
    useForm<RegisterFormValues>();

  const { data: countriesData, isLoading: countriesDataIsLoading } =
    useCountriesData();
  const navigate = useNavigate();
  const [isActiveTab, setIsActiveTab] = useState("Individual");
  const [tabs] = useState([
    {
      id: 1,
      name: "Individual",
    },
    {
      id: 2,
      name: "Corporate",
    },
  ]);

  const toggleActiveTab = (name: string) => {
    setIsActiveTab(name);
  };

  const signUpMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Authentication/Register", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.data?.statusCode === 201) {
        toast("Kindly check your email for a verification link");
        navigate("/VerifyEmail");
      }
    },
    onError: (error: any) => {
      console.log(error?.response?.data?.errors);
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
    };
    signUpMutation.mutate(formValues);
  };

  const submitCorporateForm = (data: any) => {
    const formValues = {
      ...data,
      isOrganization: true,
    };
    // console.log(formValues);
    signUpMutation.mutate(formValues);
  };

  return (
    <AuthLayout
      header="Empowering Netizens with information fostering citizenship participation in governance"
      text=""
      img="logo.svg"
      banner="signup-Banner.svg"
      headerMarginTop="31rem"
    >
      <div className="mb-24 md:mx-10 mx-6 md:w-96">
        <h1 className="font-bold text-4xl mb-2">Let's get started</h1>
        <p className="">Kindly fill in the required details below</p>

        <div className="flex items-center">
          {tabs?.map(({ id, name }) => {
            return (
              <ul
                key={id}
                onClick={() => toggleActiveTab(name)}
                className="flex flex-wrap text-sm font-medium text-center text-gray-500 my-4"
              >
                <li className="me-2">
                  <a
                    href="#"
                    className={`inline-block px-4 py-3 rounded-lg  ${
                      isActiveTab === name
                        ? "text-white bg-primary"
                        : "text-black"
                    }`}
                  >
                    {name}
                  </a>
                </li>
              </ul>
            );
          })}
        </div>

        {isActiveTab === "Individual" ? (
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

            <Link to="/sign-in" className="cursor-pointer">
              <p className="flex justify-center mt-5 text-sm">
                Already have an account?
                <span className="font-bold text-primary"> Sign In</span>
              </p>
            </Link>
          </form>
        ) : (
          <form onSubmit={handleCorporateForm(submitCorporateForm)}>
            <CustomInput
              label="Organization name"
              name="organizationName"
              control={controlCorporateForm}
              rules={{ required: "Organization name is required" }}
            />
            <CustomInput
              label="Email address"
              name="email"
              control={controlCorporateForm}
              rules={{ required: "Email name is required" }}
            />

            <CustomSelect
              name="country"
              options={countriesDataFormatted}
              isLoading={countriesDataIsLoading}
              label="Country"
              control={controlCorporateForm}
              placeholder="Select Country"
            />

            <CustomInput
              label="Password"
              name="password"
              control={controlCorporateForm}
              type="password"
              rules={{ required: "Password is required" }}
            />

            <CustomInput
              label="Confirm Password"
              name="confirmPassword"
              control={controlCorporateForm}
              type="password"
              rules={{ required: "Confirm password" }}
            />

            <CustomInput
              label="Social Media Link"
              name="socialMediaLink"
              control={controlCorporateForm}
            />

            <CustomButton
              type="submit"
              className="mt-4"
              disabled={signUpMutation.isPending}
              loading={signUpMutation.isPending}
            >
              Sign Up
            </CustomButton>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export { Signup };

"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleSubmit, control, getValues } = useForm<any>();

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`ChangePassword`, data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data?.data?.remark);
      if (data?.status === 200) {
        toast(data?.data?.remark);
        router.push("/signin");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.remark);
      // console.log(error?.response?.data?.remark);
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = {
      email: searchParams.get("email"),
      token: searchParams.get("token"),
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    resetPasswordMutation.mutate(formData);
  };

  return (
    <div className="flex justify-center gap-16 py-10">
      <div
        className="w-1/3 min-h-full bg-cover bg-center relative rounded-3xl hidden lg:block"
        style={{ backgroundImage: "url('/Signin-Banner.svg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary bg-opacity-75 rounded-3xl">
          <div className="mt-6 ml-7">
            <Image src="logo.svg" alt="logo" width={70} height={70} />
          </div>
          <h1 className="font-bold text-3xl px-7 mt-56 ">
            Be informed, Engaged And Empowered
          </h1>
          <p className="text-sm px-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi
            cupiditate voluptates blanditiis libero neque commodi quas quod
            itaque nam, at delectus amet voluptatibus iure in quibusdam est
            expedita corporis!
          </p>
        </div>
      </div>

      <div className="mb-36 md:mx-10 mx-12">
        <h1 className="font-bold text-4xl mb-2">Reset Password</h1>
        <p className="mb-9">
          Enter your email and we will share a link to create a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="New password"
            name="newPassword"
            type="password"
            control={control}
            rules={{ required: "Password is required" }}
            placeholder="Enter your new password"
          />

          <CustomInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            control={control}
            rules={{
              required: "Password is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            }}
            placeholder="Confirm new password"
          />

          <button
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            //disabled={!isFormFilled}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

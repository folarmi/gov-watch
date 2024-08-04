"use client";
import React from "react";
import CustomInput from "../component/CustomInput";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
// import { FormValues } from "../types/generalTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CustomButton from "../component/CustomButton";

const ForgotPassword = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<any>();

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`ForgotPassword?email=${data?.email}`);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast("Kindly check your email for a link to reset your password");
        router.push("/reset-password");
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    forgotPasswordMutation.mutate(data);
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
          <h1 className="font-bold text-3xl px-7 mt-52 ">
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

      <div className="mb-56 md:mx-10 mx-12">
        <h1 className="font-bold text-4xl mb-2">Forgot your password?</h1>
        <p className="mb-9">
          Enter your email and we will share a link to create a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email address"
            name="email"
            type="email"
            control={control}
            rules={{ required: "Email is required" }}
            placeholder="Enter your email"
          />

          <CustomButton
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            disabled={forgotPasswordMutation.isPending}
            loading={forgotPasswordMutation.isPending}
          >
            Sign In
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

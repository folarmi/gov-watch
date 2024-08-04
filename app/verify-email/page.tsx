"use client";

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CustomInput from "../component/CustomInput";
import { useForm } from "react-hook-form";
import Image from "next/image";
import CustomButton from "../component/CustomButton";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: searchParams.get("Email"),
      token: searchParams.get("Token"),
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("VerifyEmail", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast("Logged in sucessfully");
        router.push("/signin");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.remark);
    },
  });

  const onSubmit = (data: any) => {
    verifyEmailMutation.mutate(data);
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

      <div className="mb-24 md:mx-10 mx-12 w-[419px]">
        <h1 className="font-bold text-4xl mb-2">Verify Email</h1>
        <p className="mb-9">Please verify your email account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email address"
            name="email"
            type="email"
            control={control}
            readOnly
            // rules={{ required: "Email is required" }}
          />

          <CustomButton
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            disabled={verifyEmailMutation.isPending}
            loading={verifyEmailMutation.isPending}
          >
            Verify Email
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;

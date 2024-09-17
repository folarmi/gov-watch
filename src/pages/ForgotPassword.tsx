/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
// import { FormValues } from "../types/generalTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
import CustomButton from "../component/CustomButton";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<any>();

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`ForgotPassword?email=${data?.email}`);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast("Kindly check your email for a link to reset your password");
        navigate("/reset-password");
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
    <AuthLayout
      header="Be informed, Engaged And Empowered"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi
      cupiditate voluptates blanditiis libero neque commodi quas quod
      itaque nam, at delectus amet voluptatibus iure in quibusdam est
      expedita corporis!"
      img="logo.svg"
      banner="Signin-Banner.svg"
    >
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
    </AuthLayout>
  );
};

export { ForgotPassword };

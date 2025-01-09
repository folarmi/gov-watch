/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import CustomInput from "../component/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../component/CustomButton";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: searchParams.get("Email"),
      token: searchParams.get("Token"),
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Authentication/VerifyEmail", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast("Logged in sucessfully");
        navigate("/sign-in");
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
    <AuthLayout
      header="Be informed, Engaged And Empowered"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi
  cupiditate voluptates blanditiis libero neque commodi quas quod
  itaque nam, at delectus amet voluptatibus iure in quibusdam est
  expedita corporis!"
      img="logo.svg"
      banner="Signin-Banner.svg"
    >
      <div className="mb-64 md:mx-10 mx-2 w-auto md:w-[419px]">
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
            className={`mt-8 md:px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            disabled={verifyEmailMutation.isPending}
            loading={verifyEmailMutation.isPending}
          >
            Verify Email
          </CustomButton>
        </form>
      </div>
    </AuthLayout>
    // <Suspense fallback={<Loader />}>

    // </Suspense>
  );
};

const VerifyEmail = () => {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyEmailPage />
    </Suspense>
  );
};

export { VerifyEmail };

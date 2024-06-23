/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../types/generalTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import Link from "next/link";

const Signup = () => {
  const { handleSubmit, control } = useForm<FormValues>();

  const signUpMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Register", data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      // Toast.show(data?.data?.data?.message, {
      //   type: "success",
      //   placement: "top",
      // });
      // router.navigate("/login");
    },
    onError: (error: any) => {
      console.log(error);
      // Toast.show(error?.response?.data?.error, {
      //   type: "error",
      //   placement: "top",
      // });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUpMutation.mutate(data);
  };

  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');

  //const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //setEmail(e.target.value);
  // };

  //const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // setPassword(e.target.value);
  //};

  //const isFormFilled = email !== '' && password !== '';

  return (
    <div className="flex justify-center gap-16 py-10">
      <div
        className="w-1/3 min-h-full bg-cover bg-center relative rounded-3xl hidden lg:block"
        style={{ backgroundImage: "url('/signup-Banner.svg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary bg-opacity-75 rounded-3xl">
          <div className="mt-6 ml-7 pb-56">
            <Image src="logo.svg" alt="logo" width={70} height={70} />
          </div>
          <h1 className="font-extrabold text-3xl px-4 mt-96 ">
            Empowering Nigerians with information and fostering citizen
            participation in governance.
          </h1>
        </div>
      </div>

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

          {/* <CustomInput
            label="State of Residence"
            name="sor"
            control={control}
            rules={{ required: "State of Residience is required" }}
          /> */}

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

          <button
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            //disabled={!isFormFilled}
          >
            Sign In
          </button>

          <Link href="/signin">
            <p className="flex justify-center mt-5 text-sm">
              Already have an account?{" "}
              <span className="font-bold text-primary">Sign In</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// {
//   "firstName": "string",
//   "lastName": "string",
//   "email": "user@example.com",
//   "password": "z<>|&8\\s3nl-s,G'$f{ZkLy=::sG3eO9|Rok*es",
//   "confirmPassword": "string",
//   "bio": "string",
//   "phoneNumber": "string",
//   "socialMediaLink": "string",
//   "image": "string",
//   "otherInformation": "string",
//   "userId": "string",
//   "organizationName": "string",
//   "isOrganization": true
// }

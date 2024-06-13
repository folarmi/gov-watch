/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../types/generalTypes";
import Link from "next/link";

//const SignIn: React.FC = () => {
//const [email, setEmail] = useState('');
//const [password, setPassword] = useState('');

//const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//setEmail(e.target.value);
//};

//const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//setPassword(e.target.value);
//};

//const isFormFilled = email !== '' && password !== '';

const SignIn = () => {
    const { handleSubmit, control } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
      console.log(data);
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
          <h1 className="font-extrabold text-3xl px-4 mt-96 ">Empowering Nigerians with information and fostering citizen participation in governance.</h1>
        </div>
      </div>

      <div className="mb-24 md:mx-10 mx-6 w-96">
        <h1 className="font-bold text-4xl mb-2">Let's get started</h1>
        <p className="mb-9">
          Kindly fill in the required details below
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
            label="First name"
            name="fName"
            type="name"
            control={control}
            rules={{ required: "First name is required" }}
          />

          <CustomInput
            label="Last name"
            name="lName"
            type="name"
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

          <CustomInput
            label="State Of Residence"
            name="SOR"
            type="name"
            control={control}
            rules={{ required: "State of residence is required" }}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            control={control}
            rules={{ required: "Password is required" }}
          />

          <CustomInput
            label="Confirm Password"
            name="cPassword"
            type="password"
            control={control}
            rules={{ required: "Please confirm your password" }}
          />

          <button
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${true
              ? 'bg-primary' : 'bg-customgreen'}`}
            //disabled={!isFormFilled}
          >
            Sign In
          </button>
          <p className="flex justify-center mt-5 text-sm">
            Don't have an account?{" "}
            <span className="font-bold text-primary">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

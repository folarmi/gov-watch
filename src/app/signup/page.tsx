/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../types/generalTypes";

const Signup = () => {
  const { handleSubmit, control } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  //const [formData, setFormData] = useState({
  //fName: '',
  //lName: '',
  //email: '',
  //sor: '',
  //password: '',
  //cPassword: ''
  //});

  //const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //const { name, value } = e.target;
  // setFormData(prevState => ({ ...prevState, [name]: value }));
  //};

  //const isFormFilled = Object.values(formData).every(value => value !== '');

  return (
    <div className="flex justify-center gap-16 py-10">
      <div
        className="w-1/3 min-h-full bg-cover bg-center relative rounded-3xl hidden lg:block"
        style={{ backgroundImage: "url('/Signup-Banner.svg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-gray-200 opacity-75 rounded-3xl">
          <div className="mt-6 ml-7 pb-28">
            <Image src="logo.svg" alt="logo" width={70} height={70} />
          </div>
          <h1 className="font-bold text-3xl mt-96 px-5">
            Empowering Nigerians with information and fostering citizen
            participation in governance.
          </h1>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-4xl">Let's get started</h1>
        <p className="mb-9">Kindly fill in the required details below</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="First name"
            name="fName"
            control={control}
            rules={{ required: "First Name is required" }}
          />

          <CustomInput
            label="Last name"
            name="lName"
            control={control}
            rules={{ required: "Last Name is required" }}
          />

          <CustomInput
            label="Email 
            address"
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <CustomInput
            label="State of Residence"
            name="sor"
            control={control}
            rules={{ required: "State of Residience is required" }}
          />

          <CustomInput
            label="Password"
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
          />

          <CustomInput
            label="Confirm Password"
            name="cPassword"
            control={control}
            rules={{ required: "Confirm password" }}
          />

          <p className="font-bold text-sm ml-72">Forgot Password?</p>

          <button
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            //disabled={!isFormFilled}
          >
            Sign Up
          </button>
          <p className="flex justify-center mt-5 text-sm">
            Already have an account?{" "}
            <span className="font-bold text-primary">Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

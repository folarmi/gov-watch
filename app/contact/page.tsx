"use client";
import React from "react";
import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
// import { FormValues } from "../types/generalTypes";
import CustomTextArea from "../component/CustomTextArea";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import CustomButton from "../component/CustomButton";

const ContactUs = () => {
  const { handleSubmit, control } = useForm<any>();

  const contactUsMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("CreateContactUs", data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      toast("Wow so easy!");
      // Toast.show(data?.data?.data?.message, {
      //   type: "success",
      //   placement: "top",
      // });
      // router.navigate("/login");
    },
    onError: (error: any) => {
      console.log(error);
      toast(error?.response?.data?.remark, {
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    contactUsMutation.mutate(data);
  };

  return (
    <div className="lg:mx-12">
      <div className="sm:mx-16 mx-8">
        <h1 className="font-bold text-3xl text-green-700">CONTACT US</h1>
        <p className="font-semibold my-3">
          We value your feedback, concerns, and questions. Reach out to us and
          help us serve you better.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:my-24 lg:mx-48 flex flex-col gap-3 items-center shadow-2xl bg-gray-50 dark:bg-black_400 px-8 py-6"
      >
        <div className="w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <CustomInput
            name="name"
            label="Your Name"
            type="name"
            control={control}
            placeholder="Enter your name here"
            rules={{ required: "First name is required" }}
          />

          <CustomInput
            name="email"
            label="Email address"
            type="email"
            control={control}
            placeholder="Enter your email address here"
            rules={{ required: "Email is required" }}
          />

          <CustomInput
            name="subject"
            label="Subject of the message"
            type="name"
            control={control}
            placeholder="Enter your subject message here"
            rules={{ required: "Subject is required" }}
            required
          />

          <CustomTextArea
            name="message"
            placeholder="Write your message here"
            control={control}
            label="  Your message"
          />
        </div>

        <div className="w-1/2">
          <CustomButton
            disabled={contactUsMutation.isPending}
            loading={contactUsMutation.isPending}
          >
            Submit message
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;

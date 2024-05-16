"use client"
import React,{ useState } from "react";

const ContactUs = () => {

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() === "");
  };

  return (
    <div className="lg:mx-12">
      <div className="sm:mx-16 mx-8">
        <h1 className="font-bold text-3xl text-green-700">CONTACT US</h1>
        <p className="font-semibold my-3">
        We value your feedback, concerns, and questions. Reach out to us and help us serve you better.
        </p>
     </div>

      <form className="lg:my-24 lg:mx-48 flex flex-col gap-3 items-center shadow-2xl bg-gray-50 px-8 py-6">
        <div className="flex flex-col gap-2 mb-6 mt-16 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="name" className="text-sm font-semibold">Your Name</label>
          <input type="text" autoComplete="on" name="name" placeholder="Enter your name here" value={formData.name} onChange={handleInputChange} required className="h-14 rounded-2xl px-4 border-2 border-black bg-gray-50 text-sm"/>
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="email" className="text-sm font-semibold">Email address</label>
          <input type="email" autoComplete="on" name="email" placeholder="Enter your email address here" value={formData.email} onChange={handleInputChange} required className="h-14 rounded-2xl px-4 border-2 border-black bg-gray-50 text-sm"/>
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="subject" className="text-sm font-semibold">Subject of the message</label>
          <input type="text" autoComplete="on" name="subject" placeholder="Enter your subject message here" value={formData.subject} onChange={handleInputChange} required className="h-14 rounded-2xl px-4 border-2 border-black bg-gray-50 text-sm"/>
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="message" className="text-sm font-semibold">Your message</label>
          <textarea autoComplete="on" name="message" placeholder="Write your message here" value={formData.message} onChange={handleInputChange} required className="h-72 rounded-2xl px-4 pt-4 border-2 border-black bg-gray-50 text-sm"></textarea>
        </div>

        <button className={`mt-8 mb-20 px-32 py-4 rounded-2xl text-white ${isFormValid() ? "bg-customgreen" : "bg-primary transition-all duration-500"}`} disabled={!isFormValid()}>Submit message</button>
      </form>
    </div>
  );
};

export default ContactUs;

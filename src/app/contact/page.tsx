"use client";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() === "");
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

      <form className="lg:my-24 lg:mx-48 flex flex-col gap-3 items-center shadow-2xl bg-gray-50 px-8 py-6">
        <div className="flex flex-col gap-2 mb-6 mt-16 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="name" className="text-sm font-semibold">
            Your Name
          </label>
          <input
            type="text"
            autoComplete="on"
            name="name"
            placeholder="Enter your name here"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="h-14 rounded-2xl px-4 border-2 border-black bg-gray-50 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email address
          </label>
          <input
            type="email"
            autoComplete="on"
            name="email"
            placeholder="Enter your email address here"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="h-14 rounded-2xl px-4 border-2 border-black bg-gray-50 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="subject" className="text-sm font-semibold">
            Subject of the message
          </label>
          <input
            type="text"
            autoComplete="on"
            name="subject"
            placeholder="Enter your subject message here"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="h-14 rounded-2xl px-4 border-2 border-black bg-gray-50 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full lg:w-1/2 md:w-1/2 sm:w-1/2">
          <label htmlFor="message" className="text-sm font-semibold">
            Your message
          </label>
          <textarea
            autoComplete="on"
            name="message"
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleInputChange}
            required
            className="h-72 rounded-2xl px-4 pt-4 border-2 border-black bg-gray-50 text-sm"
          ></textarea>
        </div>

        <button
          className={`mt-8 mb-20 px-32 py-4 rounded-2xl text-white ${
            isFormValid()
              ? "bg-customgreen"
              : "bg-primary transition-all duration-500"
          }`}
          disabled={!isFormValid()}
        >
          Submit message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;

{
  /* <g id="EG">
  <path
    class="allPaths_12"
    d="M628.8 88.1L616.9 84.1L605.4 80.4L589.8 80.6L586.1 87.2L588.3 93.1L585.9 101.6L590.1 112.8L593 162L595.2 212.9H643.3H689.7H737.1L734.9 210.1L720.2 197.7L719.3 188.7L721.5 186.3L709.9 171L705.5 163.1L700.6 155.6L690.1 134L681.7 120.1L675.6 105.6L676.7 104.3L686.8 124.1L692.6 130.3L696.9 134.7L699.4 132.3L702.1 125.1L703.7 114.7L706.5 109.1L705 105.6L696.5 85.5L691.1 88.9L681.9 88.1L672.3 84.9L670 89.4L666.2 82.6L657.7 80.8L647.5 82L643 85.9L634.4 90.3L628.8 88.1Z"
    id="Egypt"
    stroke-linejoin="round"
    style="fill: var(--mapBackground);"
  ></path>
  <path
    class="allHiddenPaths"
    d="M641.176 143.639V145.27H642.954V145.795H641.176V147.475H643.164V148H640.539V143.114H643.164V143.639H641.176ZM647.824 144.535C647.689 144.25 647.493 144.031 647.236 143.877C646.979 143.718 646.681 143.639 646.34 143.639C645.999 143.639 645.691 143.718 645.416 143.877C645.145 144.031 644.931 144.255 644.772 144.549C644.618 144.838 644.541 145.174 644.541 145.557C644.541 145.94 644.618 146.276 644.772 146.565C644.931 146.854 645.145 147.078 645.416 147.237C645.691 147.391 645.999 147.468 646.34 147.468C646.816 147.468 647.208 147.326 647.516 147.041C647.824 146.756 648.004 146.371 648.055 145.886H646.109V145.368H648.734V145.858C648.697 146.259 648.571 146.628 648.356 146.964C648.141 147.295 647.859 147.559 647.509 147.755C647.159 147.946 646.769 148.042 646.34 148.042C645.887 148.042 645.474 147.937 645.101 147.727C644.728 147.512 644.431 147.216 644.212 146.838C643.997 146.46 643.89 146.033 643.89 145.557C643.89 145.081 643.997 144.654 644.212 144.276C644.431 143.893 644.728 143.597 645.101 143.387C645.474 143.172 645.887 143.065 646.34 143.065C646.858 143.065 647.315 143.193 647.712 143.45C648.113 143.707 648.405 144.068 648.587 144.535H647.824Z"
    id="EG_2"
  ></path>
</g>; */
}

// .mapContainer .allHiddenPaths {
//   stroke-width: .5;
//   pointer-events: none;
// }

// .mapContainer svg path {
//   fill: var(--mapBackground);
//   cursor: pointer;
// }

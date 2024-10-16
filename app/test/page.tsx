"use client";

import React, { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    snippet: "",
    article: "",
    image: null,
    imageCaption: "",
    contributorPublicId: "",
    category: "",
    state: "",
    ward: "",
    lcda: "",
    isFederal: false,
    title: "",
    tags: "",
    reference: "",
    authorName: "",
    link: "",
    isPromise: false,
    isPromisedFulfilled: false,
    datePromiseMade: "",
    promiseDeadline: "",
    datePromiseFulfilled: "",
    politicalActorName: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <form className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <label className="block text-gray-700">Snippet</label>
          <textarea
            name="snippet"
            value={formData.snippet}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Article</label>
          <textarea
            name="article"
            value={formData.article}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Image Caption</label>
          <input
            type="text"
            name="imageCaption"
            value={formData.imageCaption}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Contributor Public ID</label>
          <input
            type="text"
            name="contributorPublicId"
            value={formData.contributorPublicId}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {/* Add options here */}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {/* Add options here */}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Ward</label>
          <select
            name="ward"
            value={formData.ward}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {/* Add options here */}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">LCDA</label>
          <select
            name="lcda"
            value={formData.lcda}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {/* Add options here */}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Is Federal?</label>
          <input
            type="checkbox"
            name="isFederal"
            checked={formData.isFederal}
            onChange={() =>
              setFormData({ ...formData, isFederal: !formData.isFederal })
            }
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Reference</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Is Promise?</label>
          <input
            type="checkbox"
            name="isPromise"
            checked={formData.isPromise}
            onChange={() =>
              setFormData({ ...formData, isPromise: !formData.isPromise })
            }
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Is Promise Fulfilled?</label>
          <input
            type="checkbox"
            name="isPromisedFulfilled"
            checked={formData.isPromisedFulfilled}
            onChange={() =>
              setFormData({
                ...formData,
                isPromisedFulfilled: !formData.isPromisedFulfilled,
              })
            }
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div
          className="col-span-

1"
        >
          <label className="block text-gray-700">Date Promise Made</label>
          <input
            type="date"
            name="datePromiseMade"
            value={formData.datePromiseMade}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Promise Deadline</label>
          <input
            type="date"
            name="promiseDeadline"
            value={formData.promiseDeadline}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Date Promise Fulfilled</label>
          <input
            type="date"
            name="datePromiseFulfilled"
            value={formData.datePromiseFulfilled}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Political Actor Name</label>
          <input
            type="text"
            name="politicalActorName"
            value={formData.politicalActorName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;

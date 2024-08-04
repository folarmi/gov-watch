"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

const UserRegistrationForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { firstname: "", lastname: "", email: "" },
  ]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof User
  ) => {
    const newUsers = [...users];
    newUsers[index][field] = e.target.value;
    setUsers(newUsers);
  };

  const handleAddUser = () => {
    setUsers([...users, { firstname: "", lastname: "", email: "" }]);
  };

  const handleRemoveUser = (index: number) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Registered Users:", users);
    // Submit the users to your backend or API
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register Multiple Users</h1>
      {users.map((user, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="mb-2">
            <label
              htmlFor={`firstname-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Firstname
            </label>
            <input
              id={`firstname-${index}`}
              type="text"
              value={user.firstname}
              onChange={(e) => handleChange(e, index, "firstname")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor={`lastname-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Lastname
            </label>
            <input
              id={`lastname-${index}`}
              type="text"
              value={user.lastname}
              onChange={(e) => handleChange(e, index, "lastname")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor={`email-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id={`email-${index}`}
              type="email"
              value={user.email}
              onChange={(e) => handleChange(e, index, "email")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveUser(index)}
              className="mt-2 p-2 bg-red-500 text-white rounded-md"
            >
              Remove User
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddUser}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Add Another User
      </button>
      <button
        type="submit"
        className="mt-4 p-2 bg-green-500 text-white rounded-md w-full"
      >
        Register Users
      </button>
    </form>
  );
};

export default UserRegistrationForm;

"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    placeholder: string;
  }

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='font-semibold'>{label}</label>
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          className='h-9 w-96 rounded-lg border-2 border-black pl-6 pr-10'
          id={id}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
          <Image src={isPasswordVisible ? "eye.svg" : "eyeOff.svg"} alt="toggle visibility" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

const UserProfilePassword = () => {
  return (
    <div className="flex flex-col mx-64 my-9 shadow-2xl">
      <div className='px-7 py-10'>
        <div  className="flex flex-col items-center text-white bg-no-repeat border-b-2 border-black"
              style={{ backgroundImage: "url('/profileBackStyle.svg')" }}>
          <h1 className='font-medium text-3xl mt-9'>JANE-DOE</h1>
          <p>contributor</p>
          <Image src="profilePic.svg" alt="profile-pic" height={150} width={150} className='mt-20 mb-7 pb-3' />
        </div>

        <div className='flex gap-5 mt-20 mx-6'>
          <div className='flex flex-col gap-5'>
            <Link href="/userProfileAbout">
                <p className='border-2 border-black pl-3 pr-10 py-1 cursor-pointer rounded-md font-semibold text-lg'>
                    About
                </p>
            </Link>
            <p className='border-2 border-black pl-3 pr-3 py-1 cursor-pointer whitespace-nowrap rounded-md font-semibold bg-green-700 text-white text-lg'>
                Change Password
            </p>
          </div>

          <div className='border-2 border-green-600 px-4 py-7'>
            <form className='flex flex-col items-center gap-7 px-32'>
                <PasswordInput label="Enter Current Password" id="currentPassword" placeholder="Enter Your Password" />
                <PasswordInput label="Enter New Password" id="newPassword" placeholder="Enter New Password" />
                <PasswordInput label="Confirm New Password" id="confirmPassword" placeholder="Confirm New Password" />
                
                <button className='bg-primary text-white px-8 py-2 rounded-lg mb-10'>Save</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfilePassword;

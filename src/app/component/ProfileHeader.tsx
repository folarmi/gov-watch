import React, { useState } from 'react';
import logo from "../../../public/logo.svg";
import Bell from "../../../public/NotifictionBell.svg";
import ProfilePic from "../../../public/profilePic.svg";
import DropDown from "../../../public/DropDownIcon.svg";
import Image from "next/image";
import Link from 'next/link';

const ProfileHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='flex flex-row gap-96 mx-48 mt-6'>
        <Link href="/">
            <Image
                src={logo} 
                alt="Company logo" 
                className="w-8 md:w-20" />
        </Link>
      <div className='flex flex-row'>
        <div className='flex flex-row gap-32 border-r-2 pr-7'>
          <p className='flex items-center font-bold'>Dashboard</p>
          <Image 
            src={Bell} 
            alt="Notification bell" 
            className='w-6 cursor-pointer' />
        </div>
        <div className='flex flex-row gap-7 border-l-2 pl-7 relative'>
          <Image 
            src={ProfilePic} 
            alt="Profile pic" 
            className='w-14' />
          <div className='flex flex-col justify-center'>
            <p className='whitespace-nowrap font-bold'>Jane Doe</p>
            <p>User</p>
          </div>
          <Image 
            src={DropDown} 
            alt="Drop down" 
            height={30} 
            width={30} 
            className='flex items-center cursor-pointer' 
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className='absolute right-0 px-32 mt-16 w-48 bg-green-800 rounded-xl text-gray-100'>
              <div className='flex flex-col items-center'>
                <div className='mt-4 mb-2'>
                    <h1 className='font-bold text-xl whitespace-nowrap'>Jane Doe</h1>
                    <p>Contributor</p>
                </div>
                <button className='my-8 px-6 py-3 rounded-full items-center border-2 border-green-500 whitespace-nowrap'>View Profile</button> 
                <p className='px-4 py-2 cursor-pointer font-semibold whitespace-nowrap border-t border-b border-gray-400 pb-4'>Change to dark mode</p>
                <p className='px-4 py-2 cursor-pointer font-semibold mb-4'>Signout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ProfileHeader;

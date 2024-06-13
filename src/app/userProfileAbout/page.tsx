import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const userProfileAbout = () => {
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
            <p className='border-2 border-black pl-3 pr-10 py-1 cursor-pointer rounded-md font-semibold bg-green-700 text-white text-lg'>
              About
            </p>
            <Link href="/userProfilePassword">
              <p className='border-2 border-black pl-3 pr-3 py-1 cursor-pointer whitespace-nowrap rounded-md font-semibold text-lg'>
                Change Password
              </p>
            </Link>
          </div>

          <div className='border-2 border-green-600 px-4 py-7'>
            <div className='flex gap-6'>
             <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-lg'>BIO</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor temporibus, sunt tempora dignissimos accusamus esse iusto voluptate sint voluptatem adipisci quaerat a quis. Facere repellat blanditiis dolor rerum porro architecto.</p>
              </div>
              <Link href="/userProfileEdit">
                <div className='cursor-pointer'>
                  <Image src="editIcon.svg" alt="edit-icon" height={40} width={40} />
                </div>
              </Link>
            </div>

            <div className='mt-7'>
              <h1 className='font-bold text-lg mb-4'>DETAILS</h1>
              <form className='mx-5 '>
                <div className='flex'>
                  <label  htmlFor="email"
                          className='pl-6 pr-28 py-1 bg-slate-200 rounded-l-lg border-2 border-gray-400'>
                    Email
                  </label>
                  <input type="text" className='w-full rounded-r-lg border-2 border-gray-400 pl-10' />
                </div>

                <div className='flex mt-4'>
                  <label  htmlFor="socialMedia"
                          className='pl-6 pr-7 py-1 bg-slate-200 rounded-l-lg whitespace-nowrap border-2 border-gray-400'>
                    Social Media Link
                  </label>
                  <input type="text" className='w-full rounded-r-lg border-2 border-gray-400 pl-10' />
                </div>

                <div className='flex mt-4'>
                  <label  htmlFor="stateResidence"
                          className='pl-6 pr-3 py-1 bg-slate-200 rounded-l-lg whitespace-nowrap border-2 border-gray-400'>
                    State Of Residence
                  </label>
                  <input type="text" className='w-full rounded-r-lg border-2 border-gray-400 pl-10' />
                </div>

                <div className='flex mt-4'>
                  <label htmlFor="otherInfo"
                          className='pl-6 pr-5 py-1 bg-slate-200 rounded-l-lg whitespace-nowrap border-2 border-gray-400'>
                    Other Information
                  </label>
                  <input type="text" className='w-full rounded-r-lg border-2 border-gray-400 pl-10' />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default userProfileAbout;

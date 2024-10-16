import Image from 'next/image';
import React from 'react'

const publicationPage = () => {
  return (
    <div className='flex mx-16 mb-24'>
      <div className='flex flex-col mx-16'>
        <div className='bg-gradient-to-r from-green-400 to-green-700 flex flex-row gap-28 px-5 py-4'>
            <div className='bg-primary font-semibold text-white text-2xl rounded-xl px-2'>
                <p className='mt-4'>Promise</p>
            </div>
            <div className='flex flex-row bg-gray-900 text-white py-2 gap-2'>
                <div className='flex flex-col items-center ml-2'>
                    <p className='font-bold text-3xl'>00</p>
                    <p className='text-xs'>DAYS</p>
                </div>
                <Image src="columnIcon.svg" alt='column icon' height={8} width={8} />
                <div className='flex flex-col items-center'>
                    <p className='font-bold text-3xl'>00</p>
                    <p className='text-xs'>HOURS</p>
                </div>
                <Image src="columnIcon.svg" alt='column icon' height={8} width={8} />
                <div className='flex flex-col items-center'>
                    <p className='font-bold text-3xl'>00</p>
                    <p className='text-xs'>MINUTES</p>
                </div>
                <Image src="columnIcon.svg" alt='column icon' height={8} width={8} />
                <div className='flex flex-col items-center mr-2'>
                    <p className='font-bold text-3xl'>00</p>
                    <p className='text-xs'>SECONDS</p>
                </div>
            </div>
        </div>
        <h1 className='font-bold text-4xl mt-10 mb-5'>Vestibulum viverra. Conval llis et aliquet ultrices tristi</h1>
        <p className='text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus pariatur perspiciatis doloremque dignissimos hic distinctio velit minima nemo beatae repellat dolorum corrupti magni, ab, voluptatem rerum? Deleniti officiis sunt magnam.</p>
        <div className='flex flex-col justify-center items-center mx-14 mt-7 w-[400px]'>
            <Image src="publicImage.svg" alt='article image' height={400} width={500} />
            <div className='border-2 border-primary rounded-b-xl w-full px-4 py-2'>
                <p className='font-semibold'>1.1m likes</p>
                <div className='flex flex-row gap-60 my-3'>
                    <div className='flex flex-row gap-8'>
                        <Image src="heartIcon.svg" alt='heart icon' height={25} width={25} />
                        <Image src="chatIcon.svg" alt='chat icon' height={25} width={25} />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <Image src="bookmarkIcon.svg" alt='bookmark icon' height={25} width={25} />
                        <Image src="moreIcon.svg" alt='more icon' height={5} width={5} />
                    </div>
                </div>
                <p className='font-semibold text-xs italic'>22 jan 2024</p>
            </div>
        </div>
        <p className='font-xs italic pl-20 my-3'>published by <span className='font-semibold'>Admin</span></p>
        <div>
            <p className='text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quod et, dolores repellendus sapiente nihil placeat alias officiis iste veritatis dicta sit, in possimus? Vero repudiandae eum veritatis ratione aspernatur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate tempore molestias sit quas, itaque iusto expedita neque dignissimos incidunt eaque eligendi corrupti totam voluptates quisquam. Ex culpa minus deserunt facilis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusamus magnam vel assumenda dolorum, minima omnis vitae hic quam quibusdam consequatur est alias aliquam adipisci quos. Animi eius doloribus eos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quia minima reiciendis nam iusto? Dicta porro exercitationem sit eveniet libero at ea enim neque natus, tempora magnam. Voluptatibus, quas distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eaque odio repellendus soluta ut, laborum quasi obcaecati totam ad maiores, beatae ducimus tempore ex ullam, id voluptatibus. Veritatis, molestias? Incidunt.</p>
            <Image src="advertPlaceholder2.svg" alt='advert placeholder' height={250} width={250} className='-ml-1 w-full my-4'/>
        </div>
      </div>

      <div className="border-l-2 border-gray-300"></div>

      <div className='flex flex-col mx-14'>
        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias enim praesentium natus, minima voluptatum corporis cumque, deleniti odit excepturi, magnam ipsa numquam! Dolores reprehenderit maxime magnam velit nobis excepturi. Vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolores reiciendis molestiae? Est ab hic in, quasi nihil qui similique aut natus, reiciendis fugiat libero, optio omnis ad a maxime! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, fugit. Expedita facilis corporis quia, voluptate amet aliquam reprehenderit incidunt quasi harum est, minus corrupti necessitatibus, error sint ducimus ea quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos accusamus debitis dignissimos excepturi ipsa modi perspiciatis eum ratione exercitationem reiciendis doloribus recusandae, aspernatur in consectetur voluptates optio magni. Architecto, corrupti.</p>
        <Image src="advertPlaceholder3.svg" alt='advert placeholder' height={250} width={250} className='-ml-1 w-full my-4 '/>
        <p className='text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, odit? Voluptatibus culpa atque corporis ducimus dolores dicta distinctio veniam? Veniam repellendus nobis voluptates, sint deserunt maxime vero quas suscipit totam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, doloremque. Obcaecati, recusandae ipsum accusantium sapiente esse laborum. Optio animi, eveniet velit nulla, doloremque delectus aliquam sint sunt quas modi ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, necessitatibus a aliquam dolores excepturi eum quae deleniti et nam quaerat tempora aspernatur rerum provident, illo corporis omnis voluptates ipsam architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum dolorem ab, doloremque sequi tempora omnis itaque, soluta et, cumque similique laborum asperiores. Quisquam eum corporis voluptatem ad molestias excepturi?</p>
        <div>
            <p className='font-semibold text-xl my-2'>20 Comments</p>
            <div className="my-2 relative">
                <input 
                    type="text" 
                    className="pl-10 pr-4 py-2 border border-primary rounded w-full h-11 focus:outline-none"
                    placeholder="Add a comment..."
                />
                <Image src="/smileIcon.svg" alt="smile emoji" height={30} width={30} className="absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>

            <Image src="advertPlaceholder1.svg" alt='advert placeholder' height={250} width={250} className='mt-14'/>
        </div>
     </div>
    </div>
  )
}

export default publicationPage;

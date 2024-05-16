import Image from "next/image";

const About = () => {
  return (
    <div className="mx-8 sm:mx-12 md:mx-16 lg:mx-28">
      <h1 className="font-bold text-3xl text-green-700 mb-14">ABOUT US</h1>

      <div className="flex flex-row justify-between gap-8 sm:gap-16 md:gap-32 lg:gap-56">
        <div className="mr-17">
          <h2 className="font-bold text-2xl mb-5">OUR STORY</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nobis similique iure. Molestias facilis debitis, cupiditate temporibus iure quis iste deserunt id soluta eos praesentium, perferendis dolor esse ut placeat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, sit atque? Sunt eveniet aliquid at, temporibus labore dolorem animi praesentium, deleniti vel id facere itaque dicta vero accusantium qui architecto!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque minima dolore cupiditate inventore, eaque asperiores voluptate quos sapiente tempore, ex reprehenderit cum deserunt natus dolorem est, ipsam ducimus magni tempora.<br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nesciunt itaque, consectetur minima accusamus temporibus, iste sed consequatur cupiditate non veniam aliquid laboriosam ipsa doloribus similique placeat facere nemo officiis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam id accusamus molestiae voluptates velit harum temporibus aspernatur odio ipsa pariatur error reprehenderit et dolore consequuntur excepturi, aliquam quaerat sed quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae natus autem explicabo hic sint consequatur, sunt, delectus ipsa deserunt voluptas fugit magnam, quidem asperiores omnis? Neque ea similique molestiae?
          </p>
        </div>

        <div className="hidden lg:block">
          <Image src="material.svg" alt="material" width={2000} height={2000} />
        </div>
      </div>
    </div>
  );
};

export default About;

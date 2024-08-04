import Image from "next/image";
import Team from "../component/Team";

const About = () => {
  return (
    <div className="mb-28">
      <div className="mx-8 sm:mx-12 md:mx-16 lg:mx-28">
        <h1 className="font-bold text-4xl text-green-700 mb-14">ABOUT US</h1>

        <div className="flex flex-row justify-between gap-8 sm:gap-16 md:gap-32 lg:gap-56">
          <div className="mr-17 mb-16">
            <h2 className="font-bold text-2xl mb-5">OUR STORY</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              nobis similique iure. Molestias facilis debitis, cupiditate
              temporibus iure quis iste deserunt id soluta eos praesentium,
              perferendis dolor esse ut placeat. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Omnis, sit atque? Sunt eveniet
              aliquid at, temporibus labore dolorem animi praesentium, deleniti
              vel id facere itaque dicta vero accusantium qui architecto!. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Atque minima
              dolore cupiditate inventore, eaque asperiores voluptate quos
              sapiente tempore, ex reprehenderit cum deserunt natus dolorem est,
              ipsam ducimus magni tempora.
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              nesciunt itaque, consectetur minima accusamus temporibus, iste sed
              consequatur cupiditate non veniam aliquid laboriosam ipsa
              doloribus similique placeat facere nemo officiis. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Ullam id accusamus
              molestiae voluptates velit harum temporibus aspernatur odio ipsa
              pariatur error reprehenderit et dolore consequuntur excepturi,
              aliquam quaerat sed quidem. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi beatae natus autem explicabo hic sint
              consequatur, sunt, delectus ipsa deserunt voluptas fugit magnam,
              quidem asperiores omnis? Neque ea similique molestiae?
            </p>
          </div>

          <div className="hidden lg:block">
            <Image
              src="material.svg"
              alt="material"
              width={2000}
              height={2000}
            />
          </div>
        </div>
      </div>

      <div className="flex mx-6 md:mx-10 lg:mx-20 gap-7 lg:flex-row md:flex-row flex-col">
        <div className="bg-green-200 rounded-2xl">
          <h1 className="font-bold text-3xl text-green-700 mb-14 mt-11 flex justify-center">
            THE TEAM
          </h1>

          <div className="mx-6">
            <div className="mb-8">
              <Team
              img='Olabayo.svg'
              name="Olabayo Balogun"
              role="lorem ipsum dolor sit a met consectetur" />
            </div>
            <div className="mb-8 lg:pl-44 md:pl-24">
              <Team
                img="Folashayo.svg"
                name="Folashayo Akinyosoye"
                role="lorem ipsum dolor sit a met consectetur"
              />
            </div>
            <div className="mb-8">
             <Team
              img='Phebe.svg'
              name="Phebe Keshinro"
              role="lorem ipsum dolor sit a met consectetur" />
          </div>
            <div className="mb-24 lg:pl-44 md:pl-24">
              <Team
              img='Ayomide.svg'
              name="Ayomide Gbebu"
              role="lorem ipsum dolor sit a met consectetur" />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-14">
            <h1 className="font-bold text-2xl text-green-700 mb-4 flex justify-center">
              OUR MISSION
            </h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eius,
              corporis sed impedit nulla aut animi maiores dolorem laboriosam
              quae facere sunt, hic voluptatum non facilis, officia porro!
              Officia, impedit?
            </p>
          </div>

          <div className="mb-14">
            <h1 className="font-bold text-2xl text-green-700 mb-4 flex justify-center">
              OUR VISION
            </h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eius,
              corporis sed impedit nulla aut animi maiores dolorem laboriosam
              quae facere sunt, hic voluptatum non facilis, officia porro!
              Officia, impedit?
            </p>
          </div>

          <div>
            <h1 className="font-bold text-2xl text-green-700 mb-4 flex justify-center">
              OUR OBJECTIVE
            </h1>
            <ul className="list-disc list-inside flex flex-col justify-center text-center gap-4 text-sm">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

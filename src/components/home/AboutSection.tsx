"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20 items-center">
          
          {/* Mobile Order 1: Text Block */}
          {/* Desktop Order 2: Text Block on the right */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left z-20 max-w-2xl mx-auto lg:mx-0 pt-0 lg:pt-0">
            <h2 className="text-[3rem] sm:text-[3.5rem] lg:text-[4.5rem] font-serif text-[#02210a] leading-[1] tracking-wide mb-3">
              ABOUT US
            </h2>
            <h3 className="text-base sm:text-lg lg:text-xl font-serif text-[#4b7418] font-medium italic mb-6 px-4 lg:px-0">
              Crafting Memorable Adventures, Inspired by The Essence of Sri Lanka
            </h3>

            <p className="text-[#02210a]/60 text-xs sm:text-sm lg:text-base leading-loose mb-5 font-medium text-center lg:text-justify px-2 lg:px-0 max-w-lg mx-auto lg:mx-0">
              We are your local experts, passionate about revealing the hidden treasures, lush landscapes, and rich culture of Sri Lanka. From the misty mountains of Ella to the golden sandy beaches, we craft unforgettable journeys tailored specifically for you to experience the true essence of our island.
            </p>
            <p className="text-[#02210a]/60 text-xs sm:text-sm lg:text-base leading-loose font-medium text-center lg:text-justify px-2 lg:px-0 max-w-lg mx-auto lg:mx-0">
              With a commitment to authentic experiences, we blend pristine natural beauty with thousands of years of heritage, guaranteeing an adventure that is perfectly curated down to the last sunset.
            </p>
          </div>

          {/* Mobile Order 2: The Organic Bento Grid */}
          {/* Desktop Order 1: On the left */}
          <div className="order-2 lg:order-1 w-full relative h-auto lg:h-[600px] xl:h-[700px] mt-6 lg:mt-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-2 sm:gap-3 w-full h-full p-1">
              
              {/* Row 1 / Image 1 (Top Left) */}
              <div className="col-span-1 row-span-1 relative rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-video lg:aspect-auto">
                <Image src="/images/bento/bento_spa_1784154633142.webp" alt="Spa" fill className="object-cover" sizes="(max-width: 1023px) 50vw, (min-width: 1440px) 180px, 12.5vw" quality={70} />
              </div>

              {/* Row 1 / Image 2 (Top Mid 1) */}
              <div className="col-span-1 row-span-1 relative rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-video lg:aspect-auto">
                <Image src="/images/bento/bento_leopard_1784154642422.webp" alt="Wildlife Leopard" fill className="object-cover" sizes="(max-width: 1023px) 50vw, (min-width: 1440px) 180px, 12.5vw" quality={70} />
              </div>

              {/* Row 1 / Image 3 (Top Mid 2 - Pill) */}
              <div className="col-span-1 row-span-1 relative rounded-full overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-[2/1] lg:aspect-auto">
                <Image src="/images/bento/bento_buddha_1784154650820.webp" alt="Cultural Buddha" fill className="object-cover" sizes="(max-width: 1023px) 50vw, (min-width: 1440px) 180px, 12.5vw" quality={70} />
              </div>

              {/* Row 1 / Image 4 (Top Right) */}
              <div className="col-span-1 row-span-1 relative rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-video lg:aspect-auto">
                <Image src="/images/bento/bento_diver_1784154659345.webp" alt="Ocean Diver" fill className="object-cover" sizes="(max-width: 1023px) 50vw, (min-width: 1440px) 180px, 12.5vw" quality={70} />
              </div>

              {/* Row 2-3 / Image 5 (Huge Bottom Left) */}
              <div className="col-span-2 row-span-2 relative rounded-tl-[3rem] lg:rounded-tl-[5rem] rounded-br-[3rem] lg:rounded-br-[5rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-square lg:aspect-auto">
                <Image src="/images/bento/bento_path_1784154668042.webp" alt="Jungle Path" fill className="object-cover" sizes="(max-width: 1023px) 100vw, (min-width: 1440px) 360px, 25vw" quality={70} />
              </div>

              {/* Row 2 / Image 6 (Middle Stack Top) */}
              <div className="col-span-1 row-span-1 relative rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-[4/3] lg:aspect-auto">
                <Image src="/images/bento/bento_boat_1784154676533.webp" alt="Boat on Beach" fill className="object-cover" sizes="(max-width: 1023px) 50vw, (min-width: 1440px) 180px, 12.5vw" quality={70} />
              </div>
              
              {/* Row 2-3 / Image 8 (Tall Bottom Right) */}
              <div className="col-span-1 row-span-2 relative rounded-tl-[3rem] rounded-br-[3rem] lg:rounded-br-[5rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-[1/2] lg:aspect-auto">
                <Image src="/images/bento/bento_festival_1784154693446.webp" alt="Festival Culture" fill className="object-cover" sizes="(max-width: 1023px) 50vw, (min-width: 1440px) 180px, 12.5vw" quality={70} />
              </div>

              {/* Row 3 / Image 7 (Middle Stack Bottom) */}
              <div className="col-span-1 row-span-1 relative rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] z-10 hover:z-20 aspect-[4/3] lg:aspect-auto">
                <Image src="/images/bento/bento_ruins_1784154685035.webp" alt="Ancient Ruins" fill className="object-cover" sizes="(max-width: 1023px) 50vw, (min-width: 1440px) 180px, 12.5vw" quality={70} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

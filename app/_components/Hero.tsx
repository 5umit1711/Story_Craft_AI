import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="px-10 md:px-28 lg:px-44 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold py-6 text-gray-800">
            Craft stories in minutes
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Create funny and personalised stories for kids that ignite
            imagination.
          </p>
          <Link href="/create-story">
            <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg transition duration-300 hover:bg-indigo-500">
              Create Stories
            </button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full"></div>
          <Image
            className="relative z-10 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
            src="/hero.jpg"
            alt="Story"
            width={700}
            height={700}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

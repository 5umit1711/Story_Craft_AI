import Image from 'next/image';
import React from 'react';

const BookCover = ({name, title}: any) => {
  return (
    <div className="mx-auto bg-[#faf7f0] p-8 shadow-xl rounded-2xl mt-6 border border-gray-300 max-w-3xl relative">
      <Image
        src="/hero.jpg"
        alt="Book Cover"
        className="w-full h-60 object-cover rounded-lg shadow-lg"
        width={500}
        height={500}
      />

      <div className="mt-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-800">{title}</h2>
        <p className="text-lg font-serif text-gray-600 mt-2">by {name}</p>
      </div>

      <div className="absolute bottom-4 right-4 text-gray-500 italic text-sm">
        ~ Book Cover ~
      </div>
    </div>
  );
};

export default BookCover;

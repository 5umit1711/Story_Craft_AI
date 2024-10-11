"use client";

import { useRouter } from "next/navigation";
import React from "react";

const StoryCard = ({ story }: any) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-6 max-w-sm mx-auto border border-gray-200">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-32 w-full rounded-t-lg flex items-center justify-center">
        <h2 className="text-xl font-bold text-white text-center px-3 drop-shadow-md">
          {story?.output?.storyName}
        </h2>
      </div>
      <div className="p-4">
        <p className="text-gray-800 font-medium text-md mb-1">
          By {story?.userName}
        </p>
        <p className="text-gray-600 text-sm">
          A captivating story that will take you on an incredible journey...
        </p>
        <button
          className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm py-2 rounded-md hover:from-blue-500 hover:to-cyan-500 transition duration-200"
          onClick={() => router.push(`/view-story/${story.storyID}`)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default StoryCard;

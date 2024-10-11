"use client";

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookCover from "./_components/BookCover";
import StoryPages from "./_components/StoryPages";
import { Button } from "@nextui-org/button";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const ViewStory = () => {
  const { storyID } = useParams();
  const [story, setStory] = useState<any>({});

  useEffect(() => {
    getStory();
  }, []);

  const getStory = async () => {
    const res = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.storyID, String(storyID)));
    console.log(res[0]);
    setStory(res[0]);
  };

  return (
    <div className="p-8 md:px-20">
      <h1 className="font-bold text-2xl text-center p-2 bg-cyan-200 rounded-lg">
        Enjoy Reading...
      </h1>
      <div className="flex justify-center items-center relative">
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          className="mt-3 cursor-pointer"
        >
          <div>
            <BookCover
              name={story?.userName}
              title={story?.output?.storyName}
            />
          </div>
          {[...Array(story?.output?.chapters.length)].map((item, index) => (
            <div key={index} className="bg-white p-10 border-gray-300">
              <StoryPages storyChapter={story?.output?.chapters[index]} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default ViewStory;

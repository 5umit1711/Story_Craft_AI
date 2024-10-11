"use client";

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import StoryCard from "../dashboard/_components/StoryCard";

const Explore = () => {
  const [stories, setStories] = useState<any>([]);

  const getAllStories = async () => {
    const result = await db
      .select()
      .from(StoryData)
      .orderBy(desc(StoryData.id))
      .limit(12);

    console.log(result);
    setStories(result);
  };

  useEffect(() => {
    getAllStories();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-7xl mx-auto p-2">
        <h2 className="text-3xl font-extrabold text-center p-2 mt-2 text-gray-900">
          Explore More Stories
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Discover the latest stories from our community. Dive into a world of creativity.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories &&
            stories.map((item: any, index: number) => (
              <StoryCard key={index} story={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;

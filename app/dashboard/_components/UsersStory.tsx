"use client";

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import Loader from "./Loader";

const UsersStory = () => {
  const {user} = useUser();  
  const [stories, setStories] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserStory = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress || ""))
      .orderBy(desc(StoryData?.id));
      setStories(result);
    setLoading(false);
  };

  useEffect(()=>{
    user && getUserStory();
  }, [user]);


  return <div className="flex gap-6 m-4 justify-evenly flex-wrap">
    {stories && stories.map((item: any, index: number)=>(
        <StoryCard key={index} story={item}/>
    ))}
    {loading && <Loader/>}
  </div>;
};

export default UsersStory;

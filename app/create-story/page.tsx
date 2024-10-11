"use client";

import React, { useContext, useState } from "react";
import StorySubject from "./_components/StorySubject";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import { chatSession } from "@/config/geminiAI";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import axios from "axios";
import uniqid from "uniqid";
import { UserDetailContext } from "../_context/UserDetailContext";
import { db } from "@/config/db";
import { User } from "@/config/schema";
import { eq } from "drizzle-orm";

export interface fieldData {
  subject: string;
  ageGroup: string;
  storyType: string;
}

const CreateStory = () => {
  const [data, setData] = useState<fieldData>({
    subject: "",
    ageGroup: "",
    storyType: "",
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const unID = uniqid();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const notify = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const handleSubmit = async () => {
    if (userDetail?.credit <= 0) {
      notifyError(
        "You don't have enough credits to generate stories."
      );
      return;
    }
    try {
      setLoading(true);

      const PROMPT = `create a story on ${data.subject} for age group ${data.ageGroup}, 
      ${data.storyType} story. Give me 5 chapters with storyName and an array of chapters
      with each chapter having an chapterNumber, title and content all in JSON format with`;

      const result = await chatSession.sendMessage(PROMPT);
      const storyOutput = result?.response.text();

      const response = await axios.post("/api/insertData", {
        storyID: unID,
        storySubject: data.subject,
        ageGroup: data.ageGroup,
        storyType: data.storyType,
        output: storyOutput,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      });

      if (response.status === 200) {
        router.push(`/view-story/${response.data.at(0).storyID}`);
        notify("Story generated successfully!");
        await UpdateCredits();
      } else {
        notifyError("Error generating story. Please try again later");
      }
    } catch (error) {
      console.error("Error generating or saving the story:", error);
      notifyError("Error in server. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const UpdateCredits = async () => {
    try {
      const result = await db
        .update(User)
        .set({
          credit: Number(userDetail?.credit - 1),
        })
        .where(
          eq(User.userEmail, user?.primaryEmailAddress?.emailAddress || "")
        );
      setUserDetail({ ...userDetail, credit: Number(userDetail?.credit - 1) });
    } catch (error) {
      console.log("error in updating credits", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="font-extrabold text-5xl text-center mt-6 text-gray-800">
        Create Your Stories
      </h2>
      <p className="text-2xl text-center font-semibold text-gray-600 mt-4">
        Unlock your creativity with AI
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <StorySubject data={data} setData={setData} />
        <StoryType data={data} setData={setData} />
        <AgeGroup data={data} setData={setData} />
        <div className="">
          <Button
            disabled={loading}
            isLoading={loading}
            className="w-full md:w-auto bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-md"
            onClick={handleSubmit}
          >
            Generate
          </Button>
          <span className="block mt-1 p-2">Use 1 credit</span>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;

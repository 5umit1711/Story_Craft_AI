"use client";

import React from "react";
import { Textarea } from "@nextui-org/input";

const StorySubject = ({ data, setData }: any) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <label className="font-bold text-2xl text-gray-700">
        1: Subject of the story
      </label>
      <Textarea
        placeholder="Write the subject of the story"
        size="lg"
        className="h-[100px] mt-4 max-w-lg w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
        onChange={(e) =>
          setData({
            ...data,
            subject: e.target.value,
          })
        }
      />
    </div>
  );
};

export default StorySubject;

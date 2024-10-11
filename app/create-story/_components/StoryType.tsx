"use client";

import React, { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";

const StoryType = ({ data, setData }: any) => {
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <label className="font-bold text-2xl text-gray-700">
        2: Type of the Story
      </label>
      <div className="flex gap-8 mt-4">
        <Checkbox
          className="text-lg font-medium hover:scale-105 transition duration-300"
          isSelected={selectedType === "adventure"}
          onChange={() => {
            const newType = "adventure"; 
            setSelectedType(newType);
            setData({ ...data, storyType: newType });
          }}
        >
          Adventure
        </Checkbox>
        <Checkbox
          className="text-lg font-medium hover:scale-105 transition duration-300"
          isSelected={selectedType === "educational"}
          onChange={() => {
            const newType = "educational"; 
            setSelectedType(newType);
            setData({ ...data, storyType: newType });
          }}
        >
          Educational
        </Checkbox>
        <Checkbox
          className="text-lg font-medium hover:scale-105 transition duration-300"
          isSelected={selectedType === "sci-fi"}
          onChange={() => {
            const newType = "sci-fi"; 
            setSelectedType(newType);
            setData({ ...data, storyType: newType });
          }}
        >
          Sci-Fi
        </Checkbox>
      </div>
    </div>
  );
};

export default StoryType;

"use client";

import React, { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";

const AgeGroup = ({ data, setData }: any) => {
  const [ageGroup, setAgeGroup] = useState<string>("");

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <label className="font-bold text-2xl text-gray-700 mb-2 block">
        3: Select the age group
      </label>
      <div className="flex gap-8 mt-4">
        <Checkbox
          className="text-lg font-medium hover:scale-105 transition duration-300"
          isSelected={ageGroup === "0-10"}
          onChange={() => {
            const newType = "0-10";
            setAgeGroup(newType);
            setData({ ...data, ageGroup: newType });
          }}
        >
          0 - 10
        </Checkbox>
        <Checkbox
          className="text-lg font-medium hover:scale-105 transition duration-300"
          isSelected={ageGroup === "10-17"}
          onChange={() => {
            const newType = "10-17";
            setAgeGroup(newType);
            setData({ ...data, ageGroup: newType });
          }}
        >
          10 - 17
        </Checkbox>
        <Checkbox
          className="text-lg font-medium hover:scale-105 transition duration-300"
          isSelected={ageGroup === "above 18"}
          onChange={() => {
            const newType = "above 18";
            setAgeGroup(newType);
            setData({ ...data, ageGroup: newType });
          }}
        >
          above 18
        </Checkbox>
      </div>
    </div>
  );
};

export default AgeGroup;

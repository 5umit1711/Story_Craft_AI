"use client";

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const DashboardHeader = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  return (
    <div className="bg-gray-100 shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">My Stories</h1>

      <div className="text-lg text-gray-600">
        <span className="font-medium">Credits Left:</span>
        <span className="font-bold text-gray-800 ml-2">
          {userDetail?.credit}
        </span>
        <div className="mt-2">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md "
          onClick={()=>{router.push("/buy-credits")}}
          >
            Buy More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

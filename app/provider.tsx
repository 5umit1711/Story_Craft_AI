"use client";

import { db } from "@/config/db";
import { User } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { NextUIProvider} from "@nextui-org/react";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import axios from 'axios'
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userDetail, setUserDetail] = useState({});
  const { user } = useUser();

  const saveUser = async () => {
    const dbUser = await db
      .select()
      .from(User)
      .where(eq(User.userEmail, user?.primaryEmailAddress?.emailAddress || ""));

    if(!dbUser[0]){
      const res = await axios.post("/api/saveUser", {
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        credit: 7,
      })
      setUserDetail(res.data[0]);
    }else{
      setUserDetail(dbUser[0]);
    }
  };

  useEffect(() => {
    if (user) {
      saveUser();
    }
  }, [user]);

  return (  
      <PayPalScriptProvider options={{clientId: process.env.NEXT_PUBLIC_PAYPAL_ID as string}}>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <NextUIProvider>{children}</NextUIProvider>
      </UserDetailContext.Provider>
      </PayPalScriptProvider>
  );
};

export default Provider;

"use client";

import React, { useContext, useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { db } from "@/config/db";
import { User } from "@/config/schema";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const BuyCredits = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const Options = [
    {
      id: 1,
      price: 2,
      credits: 10,
    },
    {
      id: 2,
      price: 4,
      credits: 20,
    },
    {
      id: 3,
      price: 10,
      credits: 50,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [payPalPrice, setPayPalPrice] = useState<number>(0);

  const onPayment = async () => {
    const result = await db
      .update(User)
      .set({
        credit: userDetail.credit + Options[selectedOption - 1].credits,
      })
      .where(eq(User.userEmail, userDetail?.userEmail));

    if (result) {
      toast.success("Credits added successfully");
      setUserDetail({
        ...userDetail,
        credit: Number(userDetail.credit + Options[selectedOption - 1].credits),
      });
      router.push("/dashboard");
    } else {
      toast.error("Error in purchase. Try again later");
    }
  };

  useEffect(() => {
    if (selectedOption !== 0) {
      const price = Options[selectedOption - 1].price;
      setPayPalPrice(price);
    }
  }, [selectedOption]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="font-extrabold text-center text-3xl mb-4 text-gray-800">
        Add More Credits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {Options.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-md text-center shadow-md cursor-pointer transition-all duration-300 
              ${
                selectedOption === item.id
                  ? "border-blue-500 bg-blue-100 scale-105"
                  : "border-gray-300 bg-white hover:shadow-xl"
              }`}
              onClick={() => setSelectedOption(item.id)}
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Get {item.credits} credits
              </h3>
              <p className="text-sm text-gray-500">
                For {item.credits} stories
              </p>
              <p className="mt-3 text-lg font-bold text-gray-800">
                $ {item.price}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-md shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment</h3>
          <p className="text-gray-600 m-2">Pay with Paypal</p>
          {payPalPrice > 0 && (
            <PayPalButtons
              style={{ layout: "vertical" }}
              disabled={selectedOption === 0}
              // @ts-ignore
              onApprove={() => onPayment()}
              onCancel={() => toast.error("Payment cancelled")}
              createOrder={(data, action) => {
                // @ts-ignore
                return action.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: String(payPalPrice),
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;

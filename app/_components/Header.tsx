"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const MenuList = [
    { name: "Home", path: "/" },
    { name: "Create Story", path: "/create-story" },
    { name: "Explore", path: "/explore" },
  ];

  const handleButton = () => {
    router.push("/dashboard");
  };

  return (
    <Navbar
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg rounded-b-lg"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarBrand className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" height={40} width={40} />
          <h2 className="font-extrabold text-white text-2xl">Story Whirl</h2>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden md:flex space-x-8">
        {MenuList.map((menu, index) => (
          <NavbarItem
            className="text-white text-lg font-semibold cursor-pointer hover:text-yellow-400 transition duration-300"
            key={index}
          >
            <Link href={menu.path}>{menu.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          className="bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 active:scale-95 transition transform duration-300 ease-in-out shadow-md px-8 py-3"
          onClick={handleButton}
        >
          {isSignedIn ? "Dashboard" : "Get Started"}
        </Button>
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "ring-2 ring-yellow-400 hover:ring-yellow-500 transition-all duration-300", // Add a ring around the user avatar
            },
          }}
        />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

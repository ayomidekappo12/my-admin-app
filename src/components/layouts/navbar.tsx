"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="justify-between flex items-center bg-white w-full h-16 border-b-2 px-6">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={107}
            height={35}
            className="justify-around"
          />
        </Link>

        <Image
          src="/images/Rectangle 40.png"
          alt="logo"
          width={80}
          height={30}
          className="justify-around"
        />
      </div>
    </div>
  );
};

export default Navbar;

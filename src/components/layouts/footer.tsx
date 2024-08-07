"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const footer = () => {
  return (
    <div className="justify-between flex bg-brWhite w-full h-16 border-t-2 items-center">
      <div className="flex justify-around gap-1 sm:gap-3 my-4 items-center">
        <div className="flex">
          <Image
            src="/images/logo_box_greyed.svg"
            alt="logo"
            width={44}
            height={48}
            className="scale-75 w-8 h-8 my-1 mx-2 sm:mx-4"
          ></Image>
        </div>
        <div className="flex text-nav-blue font-medium text-sm my-2 mx-1">
          <ul className="flex list-none gap-4 sm:gap-6">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/help">Help</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-end my-4 gap-2 mx-2 sm:gap-3 sm:mx-6">
        <Image
          src="/images/linkedin_greyed.svg"
          alt="logo"
          width={50}
          height={50}
          className="h-6 w-6"
        ></Image>
      </div>
    </div>
  );
};

export default footer;

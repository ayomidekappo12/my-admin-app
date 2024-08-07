"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="justify-between flex items-center bg-white w-full h-18 border-b-2 px-6">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={107}
            height={35}
            className="justify-around"
          />
        </Link>
        <div className="flex flex-row items-center space-x-4 my-4">
          <div className="flex flex-row">
            <Link href={`/search`} className="md:hidden me-4">
              <Image
                src="/images/search.svg"
                alt="search"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </Link>

            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

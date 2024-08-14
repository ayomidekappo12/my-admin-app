"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen flex">
      <aside className="absolute top-0 left-0 z-40 w-64 hidden md:block">
        <div className="py-4 overflow-y-auto bg-white border-r border-[#F5F5F5] h-full">
          <ul className="space-y-2">
            <li>
              <Link
                href="/pages/admin"
                className={`flex items-center p-3 text-nav-blue border-r-4 px-6 ${
                  pathname === "/pages/admin"
                    ? ` border-[#FF4A47] bg-gray-100`
                    : `border-transparent`
                } group`}
              >
                <Image
                  src="/images/users.svg"
                  alt="admin"
                  width={24}
                  height={24}
                  className="h-5 w-5 me-2"
                  style={{ width: "24px", height: "auto" }}
                />
                <span className="ms-3">Admin</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="ml-0 md:ml-64 flex-1">{children}</main>
    </div>
  );
}

"use client";

import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const CustomNavbar = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  async function doLogout() {
    try {
      const result = await logout();
      console.log(result);
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout Error");
    }
  }

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#176B87] py-2 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 flex flex-wrap items-center justify-between">
      <div className="brand">
        <h1 className="text-2xl font-semibold text-white">
          <a href="#!">Task Manager</a>
        </h1>
      </div>

      {/* Burger Icon for Mobile */}
      <div className="block sm:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`sm:flex ${isMenuOpen ? 'flex' : 'hidden'}`}>
        <ul className="flex space-x-5">
          {context.user && (
            <>
              <li>
                <Link href={"/"} className="hover:text-blue-200 text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/add-task" className="hover:text-blue-200 text-white">
                  Add Task
                </Link>
              </li>
              <li>
                <Link href={"/show-tasks"} className="hover:text-blue-200 text-white">
                  Show Tasks
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="flex space-x-3 text-white">
          {context.user && (
            <>
              <li>
                <Link href={"#!"}>{context.user.name}</Link>
              </li>
              <li>
                <button onClick={doLogout}>Logout</button>
              </li>
            </>
          )}

          {!context.user && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;

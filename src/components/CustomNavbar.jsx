"use client";

import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
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

  return (
    <nav className="bg-[#176B87] h-16 py-2 px-36 flex justify-between items-center">
      <div className="brand">
        <h1 className="text-2xl font-semibold text-white">
          <a href="#!">Task Manager</a>
        </h1>
      </div>
      <div>
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
      </div>
      <div>
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

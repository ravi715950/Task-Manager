"use client";
import UserContext from "@/context/userContext";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const reset = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  const loginFormSubmitted = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(loginData);
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data !!", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    //valid data
    //login

    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Logged In");
      //redirect
      context.setUser(result.user);
      router.push("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5 ">
        <div className="py-5"></div>

        <h1 className="text-3xl text-center text-[#04364A] font-semibold">Login Here </h1>

        <form action="#!" onSubmit={loginFormSubmitted}>
          <div className="mt-3">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
              placeholder="Enter your email"
              id="user_email"
              name="user_email"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                });
              }}
              value={loginData.email}
            />
          </div>
          {/* password */}
          <div className="mt-5">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
              placeholder="Enter your password"
              id="user_password"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              value={loginData.password}
            />
          </div>

          <div className="mt-5 text-center">
            <button
              type="submit"
              className="px-5 py-2 bg-green-600  rounded hover:bg-green-400 text-white"
            >
             {loading ? "Loading..." : "Login"} 
             
            </button>
            
            <button
              type="button"
              className="px-5 py-2 bg-orange-600 ms-3 rounded hover:bg-orange-400 text-white"
              onClick={reset}
           >
              Reset
            </button>
          </div>
        </form>
      </div>
      {/* {JSON.stringify(loginData)} */}
    </div>
  );
};

export default Login;

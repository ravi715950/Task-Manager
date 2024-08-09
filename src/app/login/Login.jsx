"use client";
import UserContext from "@/context/userContext";
import { login } from "@/services/userService";
import Link from "next/link";
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

  

    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Logged In");
   
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
    <>
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#!" onSubmit={loginFormSubmitted} className="space-y-6">
            <div>
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="text-sm">
                  <p className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ravi@gmail.com
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(event) => {
                                setLoginData({
                                  ...loginData,
                                  email: event.target.value,
                                });
                              }}
                              value={loginData.email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <p className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ravi@123
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(event) => {
                                setLoginData({
                                  ...loginData,
                                  password: event.target.value,
                                });
                              }}
                              value={loginData.password}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               {loading ? "Loading..." : "Login"} 
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
            <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  //   <div className="grid grid-cols-1 md:grid-cols-12">
  //   <div className="md:col-span-4 md:col-start-5">
  //     <div className="py-5"></div>
  
  //     <h1 className="text-3xl text-center text-[#04364A] font-semibold">Login Here </h1>
  
  //     <form action="#!" onSubmit={loginFormSubmitted} className="px-4">
  //       <div className="mt-3">
  //         <label
  //           htmlFor="user_email"
  //           className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
  //         >
  //           Email
  //         </label>
  //         <input
  //           type="email"
  //           className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
  //           placeholder="Enter your email"
  //           id="user_email"
  //           name="user_email"
  //           onChange={(event) => {
  //             setLoginData({
  //               ...loginData,
  //               email: event.target.value,
  //             });
  //           }}
  //           value={loginData.email}
  //         />
  //       </div>
  //       {/* password */}
  //       <div className="mt-5">
  //         <label
  //           htmlFor="user_password"
  //           className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
  //         >
  //           Password
  //         </label>
  //         <input
  //           type="password"
  //           className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
  //           placeholder="Enter your password"
  //           id="user_password"
  //           onChange={(event) => {
  //             setLoginData({
  //               ...loginData,
  //               password: event.target.value,
  //             });
  //           }}
  //           value={loginData.password}
  //         />
  //       </div>
  
  //       <div className="mt-5 text-center">
  //         <button
  //           type="submit"
  //           className="w-full md:w-auto px-5 py-2 bg-green-600 rounded hover:bg-green-400 text-white"
  //         >
  //           {loading ? "Loading..." : "Login"} 
  //         </button>
          
  //         <button
  //           type="button"
  //           className="w-full md:w-auto mt-3 md:mt-0 md:ms-3 px-5 py-2 bg-orange-600 rounded hover:bg-orange-400 text-white"
  //           onClick={reset}
  //         >
  //           Reset
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  //   {/* {JSON.stringify(loginData)} */}
  // </div>
  
  );
};

export default Login;

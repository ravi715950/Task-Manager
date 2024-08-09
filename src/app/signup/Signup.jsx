"use client";
import React, { useState } from "react";
import signUpBanner from "../../assets/singup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { signUp } from "@/services/userService";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const doSignup = async (event) => {
    event.preventDefault();
setLoading(true);
    console.log(event);
    console.log(data);
    if (data.name.trim() === "" || data.name == null) {
      toast.warning("Name is required !!", {
        position: "top-center",
      });
      setLoading(false)
      return;
    }

    /// TODO: rest of the field

    /////
    // form submit
    try {
      const result = await signUp(data);

      console.log(result);

      toast.success("User is registered !!", {
        position: "top-center",
      });
      setLoading(false)
      router.push("/login");
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.error("Signup Error !! " + error.response.data.message, {
        position: "top-center",
      });
      setLoading(false)
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      profileURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
    });
  };

  return (
  //   <div className="grid grid-cols-1 md:grid-cols-12">
  //   <div className="md:col-span-4 md:col-start-5">
  //     <div className="py-5">
  //       <div className="flex justify-center m-5">
  //         <Image
  //           src={signUpBanner}
  //           alt="signup banner"
  //           style={{
  //             width: "40%",
  //           }}
  //         />
  //       </div>
  //       <h1 className="text-3xl text-center text-[#04364A]">Signup Here </h1>
  //       <form action="#!" className="mt-5 px-5" onSubmit={doSignup}>
  //         {/* name */}
  //         <div className="mt-3">
  //           <label
  //             htmlFor="user_name"
  //             className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
  //           >
  //             Name*
  //           </label>
  //           <input
  //             type="text"
  //             className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
  //             placeholder="Enter here"
  //             name="user_name"
  //             onChange={(event) => {
  //               setData({
  //                 ...data,
  //                 name: event.target.value,
  //               });
  //             }}
  //             value={data.name}
  //             required
  //           />
  //         </div>
  //         {/* email */}
  //         <div className="mt-3">
  //           <label
  //             htmlFor="user_email"
  //             className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
  //           >
  //             Email*
  //           </label>
  //           <input
  //             type="email"
  //             className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
  //             placeholder="Enter here"
  //             id="user_email"
  //             name="user_email"
  //             required
  //             onChange={(event) => {
  //               setData({
  //                 ...data,
  //                 email: event.target.value,
  //               });
  //             }}
  //             value={data.email}
  //           />
  //         </div>
  //         {/* password */}
  //         <div className="mt-3">
  //           <label
  //             htmlFor="user_password"
  //             className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
  //           >
  //             Password*
  //           </label>
  //           <input
  //             type="password"
  //             className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
  //             placeholder="Enter here"
  //             id="user_password"
  //             required
  //             onChange={(event) => {
  //               setData({
  //                 ...data,
  //                 password: event.target.value,
  //               });
  //             }}
  //             value={data.password}
  //           />
  //         </div>
  //         {/* about section */}
  //         <div className="mt-3">
  //           <label
  //             htmlFor="user_about"
  //             className="block text-sm font-medium mb-2 ps-2 text-[#04364A]"
  //           >
  //             About
  //           </label>
  //           <textarea
  //             className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A] text-white"
  //             placeholder="Enter here"
  //             id="user_about"
  //             name="user_about"
  //             rows={3}
  //             onChange={(event) => {
  //               setData({
  //                 ...data,
  //                 about: event.target.value,
  //               });
  //             }}
  //             value={data.about}
  //           ></textarea>
  //         </div>
  //         <div className="mt-3 text-center">
  //           <button
  //             type="submit"
  //             className="w-full md:w-auto px-5 py-2 bg-green-600 rounded hover:bg-green-400 text-white"
  //           >
  //             {loading ? "Loading..." : "Sign up"}
  //           </button>
  //           <button
  //             onClick={resetForm}
  //             type="button"
  //             className="w-full md:w-auto mt-3 md:mt-0 md:ms-3 px-5 py-2 bg-orange-600 rounded hover:bg-orange-400 text-white"
  //           >
  //             Reset
  //           </button>
  //         </div>
  
  //         {/* {JSON.stringify(data)} */}
  //       </form>
  //     </div>
  //   </div>
  // </div>

  <>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
   
       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Create your account
       </h2>
     </div>

     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
     <form action="#!" 
     onSubmit={doSignup} 
     className="space-y-3">
         <div>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
             Name
           </label>
           <div className="mt-2">
             <input
               id="name"
               name="name"
               type="text"
               onChange={(event) => {
                setData({
                               ...data,
                               name: event.target.value,
                             });
                           }}
                           value={data.name}
               required
               autoComplete="email"
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>
         <div>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
             Email address
           </label>
           <div className="mt-2">
             <input
               id="email"
               name="email"
               type="email"
               onChange={(event) => {
                setData({
                               ...data,
                               email: event.target.value,
                             });
                           }}
                           value={data.email}
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
            
           </div>
           <div className="mt-2">
             <input
               id="password"
               name="password"
               type="password"
               onChange={(event) => {
                setData({
                               ...data,
                               password: event.target.value,
                             });
                           }}
                           value={data.password}
               required
               autoComplete="current-password"
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>

         <div>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
             About
           </label>
           <div className="mt-2">
             <input
               id="about"
               name="about"
               type="about"
               onChange={(event) => {
                setData({
                               ...data,
                               about: event.target.value,
                             });
                           }}
                           value={data.about}
               required
               autoComplete="email"
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>

         <div>
           <button
             type="submit"
             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
            {loading ? "Loading..." : "Sign up"}
           </button>
         </div>
       </form>

       <p className="mt-10 text-center text-sm text-gray-500">
       Don’t have an account yet?{' '}
         <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
           Sign up
         </Link>
       </p>
     </div>
   </div>
 </>
  
  );
};

export default Signup;

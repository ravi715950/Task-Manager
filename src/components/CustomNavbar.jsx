// "use client";

// import UserContext from "@/context/userContext";
// import { logout } from "@/services/userService";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useContext, useState } from "react";
// import { toast } from "react-toastify";

// const CustomNavbar = () => {
//   const context = useContext(UserContext);
//   const router = useRouter();

//   async function doLogout() {
//     try {
//       const result = await logout();
//       console.log(result);
//       toast.success("Logout Successful");
//       router.push("/login");
//     } catch (error) {
//       console.log(error);
//       toast.error("Logout Error");
//     }
//   }

//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-[#176B87] py-2 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 flex flex-wrap items-center justify-between">
//       <div className="brand">
//         <h1 className="text-2xl font-semibold text-white">
//           <a href="/">Task Manager</a>
//         </h1>
//       </div>

//       {/* Burger Icon for Mobile */}
//       <div className="block sm:hidden">
//         <button
//           onClick={toggleMenu}
//           className="text-white focus:outline-none"
//           aria-label="Toggle Navigation"
//         >
//           <svg
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             ></path>
//           </svg>
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <div className={`sm:flex ${isMenuOpen ? 'flex' : 'hidden'}`}>
//         <ul className="flex space-x-5">
//           {context.user && (
//             <>
//               <li>
//                 <Link href={"/"} className="hover:text-blue-200 text-white">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/add-task" className="hover:text-blue-200 text-white">
//                   Add Task
//                 </Link>
//               </li>
//               <li>
//                 <Link href={"/show-tasks"} className="hover:text-blue-200 text-white mr-2">
//                   Show Tasks
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>

//         <ul className="flex space-x-3 text-white">
//           {context.user && (
//             <>
//               <li>
//                 <Link href={"#!"}>{context.user.name}</Link>
//               </li>
//               <li>
//                 <button onClick={doLogout}>Logout</button>
//               </li>
//             </>
//           )}

//           {!context.user && (
//             <>
//               <li>
//                 <Link href="/login">Login</Link>
//               </li>
//               <li>
//                 <Link href="/signup">Signup</Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default CustomNavbar;


'use client'
import UserContext from '@/context/userContext'
import { logout } from '@/services/userService'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Add Task', href: '/add-task', current: false },
  { name: 'Show Tasks', href: '/show-tasks', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CustomNavbar() {

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
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {/* <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              /> */}
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Task <span className='text-indigo-500'>Manager</span> </h2>
            </div>
            {context.user && (
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            )}
          </div>
          {context.user && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">       

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                  <MenuItem>
                <div   className="block px-4 py-2 capitalize text-sm text-gray-700 data-[focus]:bg-gray-100">
                 {context?.user?.user?.name}
                  </div>
                </MenuItem>
                <MenuItem>
                 
                  <div onClick={doLogout}  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Logout
                  </div>
                </MenuItem>
              
              </MenuItems>
            </Menu>
          </div>
)}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}


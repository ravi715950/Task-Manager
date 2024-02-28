"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#176B87] py-5 md:py-10">
    <div className="flex flex-col md:flex-row justify-around">
      <div className="text-center mb-5 md:mb-0">
        <h1 className="text-3xl text-white">Welcome to Task Manager</h1>
        <p className="text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, ab!
        </p>
      </div>
      <div className="text-center text-white">
        <h1 className="mb-3 md:mb-0">Important Links</h1>
        <ul>
          <li>
            <a href="#!" className="hover:text-blue-200">
              Facebook
            </a>
          </li>
          <li>
            <a href="#!" className="hover:text-blue-200">
              YouTube
            </a>
          </li>
          <li>
            <a href="#!" className="hover:text-blue-200">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;

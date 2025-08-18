import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between whitespace-nowrap border-b-2 border-solid border-b-[#222f49] px-7 py-3 text-white">
      <div className="flex gap-3 flex-row items-center">
        <div className="size-5 text-white">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="text-white font-bold leading-tight tracking-[-0.015em] text-xl">
          Ai Code Summarizer
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div class="flex items-center gap-9">
          <a
            className="relative group text-white text-sm font-medium leading-normal"
            href="#"
          >
            Home
            <span class="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            className="relative group text-white text-sm font-medium leading-normal"
            href="#"
          >
            Features
            <span class="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            className="relative group text-white text-sm font-medium leading-normal"
            href="#"
          >
            Pricing
            <span class="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            className="relative group text-white text-sm font-medium leading-normal"
            href="#"
          >
            Docs
            <span class="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <div className="cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#0d59f2] text-white text-sm font-bold leading-normal tracking-[0.015em] px-4 py-3 hover:bg-[#0d59f2d6]">
          Get Started
        </div>
      </div>
    </div>
  );
};

export default Header;

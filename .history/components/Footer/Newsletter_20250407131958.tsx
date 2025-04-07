import React from "react";
import { Button } from "../ui/button";

const Newsletter = () => {
  return (
    <div className=" bg-[#c14600]">
      <div className=" max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-20">
        <div className="text-4xl text-white font-semibold">
          Stay Updated in the Theatre Space
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 text-black rounded border bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23d5d5] w-full"
          />
          <Button type="submit" className="bg-[#1a1a1a] text-white">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

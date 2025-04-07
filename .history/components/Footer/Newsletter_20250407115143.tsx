import React from "react";
import { Button } from "../ui/button";

const Newsletter = () => {
  return (
    <div className=" bg-foreground">
      <div className=" max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-20">
        <div className="text-4xl text-white font-semibold">Stay Updated</div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 text-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <Button type="submit">Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

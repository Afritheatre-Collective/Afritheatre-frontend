import React from "react";
import { Button } from "../ui/button";

const Newsletter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-foreground">
      <div className="text-xl text-white font-semibold">Stay Updated</div>
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 text-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <Button type="submit">Subscribe</Button>
      </div>
    </div>
  );
};

export default Newsletter;

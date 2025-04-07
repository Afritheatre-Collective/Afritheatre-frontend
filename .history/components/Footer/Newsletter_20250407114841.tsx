import React from "react";

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
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;

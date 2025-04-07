import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className=" cursor-pointer">
      <Link href="/">
        <h2 className=" text-2xl font-semibold md:text-4xl md:font-bold italic">
          Afritheatre Collectives
        </h2>
      </Link>
    </div>
  );
};

export default Logo;

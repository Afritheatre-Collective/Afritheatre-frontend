import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className=" cursor-pointer">
      <Link href="/">
        <h2>Afritheatre Collectives</h2>
      </Link>
    </div>
  );
};

export default Logo;

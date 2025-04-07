import React from "react";
import { ModeToggle } from "../mode-toggle";
import Logo from "./Logo";

const MainHeader = () => {
  return (
    <header>
      <Logo />
      <ModeToggle />
    </header>
  );
};

export default MainHeader;

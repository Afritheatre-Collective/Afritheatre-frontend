"use client";
import React, { useState, ReactNode } from "react";
import { FaUser, FaBlog, FaBookOpen, FaBook, FaChartBar } from "react-icons/fa";

type MenuItem = {
  name: string;
  icon: ReactNode;
  id: "profile" | "blog" | "magazine" | "book" | "report";
};

type SidebarProps = {
  setSelected: (
    id: "profile" | "blog" | "magazine" | "book" | "report"
  ) => void;
};

const SideBar = ({ setSelected }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<
    "profile" | "blog" | "magazine" | "book" | "report"
  >("profile");

  const menuItems: MenuItem[] = [
    { name: "Profile", icon: <FaUser />, id: "profile" },
    { name: "Blog", icon: <FaBlog />, id: "blog" },
    { name: "Magazine", icon: <FaBookOpen />, id: "magazine" },
    { name: "Book", icon: <FaBook />, id: "book" },
    { name: "Report", icon: <FaChartBar />, id: "report" },
  ];

  const handleItemClick = (
    id: "profile" | "blog" | "magazine" | "book" | "report"
  ) => {
    setActiveItem(id);
    setSelected(id);
  };

  return (
    <div className="bg-gray-50 p-10 rounded-md">
      <div className="p-10 space-y-4">
        <h2 className="text-lg font-semibold mb-4">User Menu</h2>
        <hr className="border-gray-400" />
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full text-left py-6 px-12 rounded-md flex items-center gap-3 my-3 ${
              activeItem === item.id
                ? "bg-[#247373] text-white"
                : "hover:bg-gray-200 hover:text-black"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
        <hr className="border-gray-400" />
      </div>
    </div>
  );
};

export default SideBar;

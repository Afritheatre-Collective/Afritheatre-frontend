"use client";
import React, { useState, ReactNode } from "react";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaBuilding,
  FaChartBar,
  FaBlog,
} from "react-icons/fa";

// Define the type for the selected menu items
type MenuItem = {
  name: string;
  icon: ReactNode;
  id: "overview" | "users" | "theatre-data" | "venues" | "reports" | "blogs";
};

// Define the type for the props passed to Sidebar
type SidebarProps = {
  setSelected: (
    id: "overview" | "users" | "theatre-data" | "venues" | "reports" | "blogs"
  ) => void;
};

const SideBar = ({ setSelected }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<
    "overview" | "users" | "theatre-data" | "venues" | "reports" | "blogs"
  >("overview");

  const menuItems: MenuItem[] = [
    { name: "Overview", icon: <FaHome />, id: "overview" },
    { name: "Users", icon: <FaUser />, id: "users" },
    { name: "Theatre Data", icon: <FaClipboardList />, id: "theatre-data" },
    { name: "Venues", icon: <FaBuilding />, id: "venues" },
    { name: "Reports", icon: <FaChartBar />, id: "reports" },
    { name: "Blogs", icon: <FaBlog />, id: "blogs" },
  ];

  const handleItemClick = (
    id: "overview" | "users" | "theatre-data" | "venues" | "reports" | "blogs"
  ) => {
    setActiveItem(id);
    setSelected(id);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-md">
      <div className="p-10 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <hr className="border-gray-400" />
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full text-left p-6 rounded-md flex items-center gap-3 my-3 ${
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

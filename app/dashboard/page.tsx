"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import SideBar from "@/components/DashboardComponent/SideBar";
import React, { useState } from "react";

// Define the allowed values for the 'selected' state
type SelectedMenu =
  | "overview"
  | "users"
  | "theatre-data"
  | "venues"
  | "reports"
  | "blogs";

const Page = () => {
  // Set the initial state with one of the valid menu options
  const [selected, setSelected] = useState<SelectedMenu>("overview");

  return (
    <div className="bg-gray-100">
      <div className="pt-12 pb-12 flex justify-center min-h-screen items-start gap-6">
        <SideBar setSelected={setSelected} />
        <Dashboard selected={selected} />
      </div>
    </div>
  );
};

export default Page;

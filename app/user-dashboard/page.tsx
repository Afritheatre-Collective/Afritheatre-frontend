"use client";
import { useState } from "react";
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import SideBar from "@/components/UserDashboard/UserDashboardComponent/SideBar";

type SelectedMenu = "profile" | "blog" | "magazine" | "book" | "report";

const Page = () => {
  const [selected, setSelected] = useState<SelectedMenu>("profile");

  return (
    <div className="bg-gray-100">
      <div className="pt-12 pb-12 flex justify-center min-h-screen items-start gap-6">
        <SideBar setSelected={setSelected} />
        <UserDashboard selected={selected} />
      </div>
    </div>
  );
};

export default Page;

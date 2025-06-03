"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard/Dashboard";
import SideBar from "@/components/DashboardComponent/SideBar";

// Define the allowed values for the 'selected' state
type SelectedMenu =
  | "overview"
  | "users"
  | "theatre-data"
  | "venues"
  | "reports"
  | "blogs";

const Page = () => {
  const [selected, setSelected] = useState<SelectedMenu>("overview");

  {
    /* 
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();
    
   useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (token && userRole === "admin") {
      setIsAuthorized(true);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!isAuthorized) return null; */
  }

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

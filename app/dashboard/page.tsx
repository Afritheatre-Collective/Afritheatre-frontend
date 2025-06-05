"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard/Dashboard";
import SideBar from "@/components/DashboardComponent/SideBar";
import LoadingAnimation from "@/components/LoadingAnimation";

type SelectedMenu =
  | "overview"
  | "users"
  | "theatre-data"
  | "venues"
  | "reports"
  | "blogs";

const Page = () => {
  const [selected, setSelected] = useState<SelectedMenu>("overview");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        router.push("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          const error = await res.json();
          console.log("Auth failed:", error);
          router.push("/");
          return;
        }

        const user = await res.json();
        console.log("User from /me:", user);

        if (user.role === "admin") {
          setIsAuthorized(true);
        } else {
          console.log("Not an admin:", user.role);
          router.push("/");
          return;
        }
      } catch (err) {
        console.error("Failed to verify user:", err);
        router.push("/");
        return;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!isAuthorized) return null;

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

"use client";
import React from "react";
import DashboardOverview from "../DashboardComponent/DashboardOverview";
import AfriUsers from "../DashboardComponent/AfriUsers";
import TheatreData from "../DashboardComponent/TheatreData";
import Venues from "../DashboardComponent/Venues";
import Reports from "../DashboardComponent/Reports";
import Blogs from "../DashboardComponent/Blogs";

interface DashboardProps {
  selected:
    | "overview"
    | "users"
    | "theatre-data"
    | "venues"
    | "reports"
    | "blogs";
}

const Dashboard: React.FC<DashboardProps> = ({ selected }) => {
  const renderContent = () => {
    switch (selected) {
      case "overview":
        return <DashboardOverview />;
      case "users":
        return <AfriUsers />;
      case "theatre-data":
        return <TheatreData />;
      case "venues":
        return <Venues />;
      case "reports":
        return <Reports />;
      case "blogs":
        return <Blogs />;
      default:
        return <DashboardOverview />;
    }
  };

  // Add page titles
  const getPageTitle = () => {
    switch (selected) {
      case "overview":
        return "Dashboard Overview";
      case "users":
        return "User Management";
      case "theatre-data":
        return "Theatre Data";
      case "venues":
        return "Venue Management";
      case "reports":
        return "Reports & Analytics";
      case "blogs":
        return "Blog Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen rounded-md shadow-md w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">{getPageTitle()}</h1>
      {renderContent()}
    </div>
  );
};

export default Dashboard;

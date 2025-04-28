"use client";
import React from "react";
import DashboardOverview from "../DashboardComponent/DashboardOverview";
import AfriUsers from "../DashboardComponent/AfriUsers";
import TheatreData from "../DashboardComponent/TheatreData";

interface DashboardProps {
  selected: "overview" | "users" | "theatre-data";
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
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="p-8 bg-white rounded-md shadow-md w-full max-w-4xl">
      {renderContent()}
    </div>
  );
};

export default Dashboard;

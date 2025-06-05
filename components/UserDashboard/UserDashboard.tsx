"use client";
import React from "react";
import Profile from "./UserDashboardComponent/Profile";
import Blog from "./UserDashboardComponent/Blog";
import Magazine from "./UserDashboardComponent/Magazine";
import Book from "./UserDashboardComponent/Book";
import Report from "./UserDashboardComponent/Report";

interface UserDashboardProps {
  selected: "profile" | "blog" | "magazine" | "book" | "report";
}

const UserDashboard: React.FC<UserDashboardProps> = ({ selected }) => {
  const renderContent = () => {
    switch (selected) {
      case "profile":
        return <Profile />;
      case "blog":
        return <Blog />;
      case "magazine":
        return <Magazine />;
      case "book":
        return <Book />;
      case "report":
        return <Report />;
      default:
        return <Profile />;
    }
  };

  const getPageTitle = () => {
    switch (selected) {
      case "profile":
        return "User Profile";
      case "blog":
        return "User Blog Posts";
      case "magazine":
        return "Magazine Contributions";
      case "book":
        return "Book Listings";
      case "report":
        return "User Reports";
      default:
        return "User Dashboard";
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen rounded-md shadow-md w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{getPageTitle()}</h1>
      {renderContent()}
    </div>
  );
};

export default UserDashboard;

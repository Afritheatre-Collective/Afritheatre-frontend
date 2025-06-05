"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TheatreActivity {
  _id: string;
  companyName: string;
  county?: string;
  jobsCreated?: string;
  bookingPlatform?: string;
  directJobs?: string;
  indirectJobs?: string;
  eventName: string;
  createdAt?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Venue {
  _id: string;
  county: string;
  subCounty?: string;
  area?: string;
  name: string;
  capacity: number;
  mapLink?: string;
}

const DashboardOverview = () => {
  const [theatreData, setTheatreData] = useState<TheatreActivity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch theatre data
        const [theatreRes, usersRes, venuesRes] = await Promise.all([
          fetch("http://localhost:5000/api/theatre-activities"),
          fetch("http://localhost:5000/api/auth/users"),
          fetch("http://localhost:5000/api/venues"),
        ]);

        // Handle theatre data response
        const theatreJson = await theatreRes.json();
        if (!theatreRes.ok) {
          throw new Error(
            theatreJson.message || "Failed to fetch theatre data"
          );
        }
        setTheatreData(theatreJson.data || []);

        // Handle users data response
        const usersJson = await usersRes.json();
        if (!usersRes.ok) {
          throw new Error(usersJson.message || "Failed to fetch users");
        }
        setUsers(usersJson);

        // Handle venues data response
        const venuesJson = await venuesRes.json();
        if (!venuesRes.ok) {
          throw new Error(venuesJson.message || "Failed to fetch venues");
        }
        setVenues(Array.isArray(venuesJson) ? venuesJson : []);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading dashboard data...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  // Calculate statistics
  const uniqueCompanies = new Set(theatreData.map((item) => item.companyName))
    .size;
  const uniqueCounties = new Set(
    theatreData.map((item) => item.county).filter(Boolean)
  ).size;
  const totalJobs = theatreData.reduce(
    (sum, item) => sum + (parseInt(item.jobsCreated || "0") || 0),
    0
  );
  const totalUsers = users.length;
  const totalVenues = venues.length;
  const totalEvents = theatreData.length;

  // Mock data for blogs and reports (replace with actual API calls if available)
  const totalBlogs = 24;
  const totalReports = 15;

  // Prepare data for user registration chart - fixed version
  const userRegistrationData = users.reduce((acc, user) => {
    try {
      // Parse the date string into a Date object first
      const dateObj = new Date(user.createdAt);

      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        console.error("Invalid date:", user.createdAt);
        return acc;
      }

      // Format the date consistently (e.g., YYYY-MM-DD)
      const date = dateObj.toISOString().split("T")[0];

      acc[date] = (acc[date] || 0) + 1;
    } catch (error) {
      console.error("Error processing date:", error);
    }
    return acc;
  }, {} as Record<string, number>);

  const userChartData = Object.entries(userRegistrationData)
    .map(([date, count]) => ({
      date,
      users: count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueCompanies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Counties Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueCounties}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Jobs Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBlogs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalReports}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events Data Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Venues Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVenues}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Registration Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Registrations Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;

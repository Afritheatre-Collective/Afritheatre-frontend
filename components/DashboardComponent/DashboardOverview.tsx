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
  eventName: string; // Added missing property
  createdAt?: string; // Added missing property
  // ... other fields you might need
}

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

const DashboardOverview = () => {
  const [theatreData, setTheatreData] = useState<TheatreActivity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch theatre data
        const theatreRes = await fetch(
          "http://localhost:5000/api/theatre-activities"
        );
        const theatreJson = await theatreRes.json();
        if (!theatreRes.ok)
          throw new Error(
            theatreJson.message || "Failed to fetch theatre data"
          );
        setTheatreData(theatreJson.data || []);

        // Fetch users data
        const usersRes = await fetch("http://localhost:5000/api/auth/users");
        const usersJson = await usersRes.json();
        if (!usersRes.ok)
          throw new Error(usersJson.message || "Failed to fetch users");
        setUsers(usersJson);
      } catch (err: unknown) {
        // Changed from any to unknown
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
  const totalDirectJobs = theatreData.reduce(
    (sum, item) => sum + (parseInt(item.directJobs || "0") || 0),
    0
  );
  const totalIndirectJobs = theatreData.reduce(
    (sum, item) => sum + (parseInt(item.indirectJobs || "0") || 0),
    0
  );
  const totalUsers = users.length;

  // Prepare data for charts
  const companiesByCounty = theatreData.reduce((acc, item) => {
    if (!item.county) return acc;
    acc[item.county] = (acc[item.county] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countyChartData = Object.entries(companiesByCounty).map(
    ([county, count]) => ({
      name: county,
      companies: count,
    })
  );

  const bookingPlatforms = theatreData.reduce((acc, item) => {
    if (!item.bookingPlatform) return acc;
    acc[item.bookingPlatform] = (acc[item.bookingPlatform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const platformChartData = Object.entries(bookingPlatforms).map(
    ([platform, count]) => ({
      name: platform,
      count,
    })
  );

  // Get recent activities
  const recentActivities = [...theatreData]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
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
            <CardTitle>Counties Covered</CardTitle>
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
            <div className="text-sm text-gray-500">
              Direct: {totalDirectJobs} | Indirect: {totalIndirectJobs}
            </div>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Companies by County</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="companies" fill="#247373" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Theatre Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity._id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium">{activity.eventName}</h3>
                <div className="text-sm text-gray-600">
                  {activity.companyName} •{" "}
                  {activity.county || "No county specified"}
                </div>
                <div className="text-sm">
                  {activity.jobsCreated
                    ? `${activity.jobsCreated} jobs created`
                    : "No jobs data"}{" "}
                  •
                  {activity.bookingPlatform
                    ? ` Booked via ${activity.bookingPlatform}`
                    : " No booking platform"}
                </div>
                {activity.createdAt && (
                  <div className="text-xs text-gray-500">
                    Added on {new Date(activity.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;

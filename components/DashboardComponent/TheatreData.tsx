"use client";

import React, { useEffect, useState } from "react";

interface TheatreActivity {
  _id: string;
  month?: string;
  week?: string;
  date?: string;
  year?: string;
  time?: string;
  companyName: string;
  sector?: "public" | "private";
  companyStatus?: "new" | "existing";
  activityType?: "performance" | "capacity" | "outreach";
  nature?:
    | "frequent-regular"
    | "frequent-irregular"
    | "infrequent-regular"
    | "infrequent-irregular";
  eventName: string;
  county?: string;
  venue?: string;
  newVenue?: string;
  totalSessions?: string;
  jobsCreated?: string;
  indirectJobs?: string;
  directJobs?: string;
  entryType?: "free" | "paid";
  bookingPlatform?: string;
  newBookingPlatform?: string;
  paymentMethods?: string[];
  language?: string;
  otherLanguage?: string;
  contactPerson: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const TheatreData = () => {
  const [activities, setActivities] = useState<TheatreActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/theatre-activities");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch data");

        setActivities(data.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="p-4">Loading theatre data...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Theatre Activities</h1>
      {activities.length === 0 ? (
        <p>No theatre activity data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity) => (
            <div key={activity._id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold">{activity.eventName}</h2>
              <p>
                <strong>Company:</strong> {activity.companyName}
              </p>
              <p>
                <strong>Contact:</strong> {activity.contactPerson}
              </p>
              {activity.month && (
                <p>
                  <strong>Month:</strong> {activity.month}
                </p>
              )}
              {activity.week && (
                <p>
                  <strong>Week:</strong> {activity.week}
                </p>
              )}
              {activity.date && (
                <p>
                  <strong>Date:</strong> {activity.date}
                </p>
              )}
              {activity.year && (
                <p>
                  <strong>Year:</strong> {activity.year}
                </p>
              )}
              {activity.time && (
                <p>
                  <strong>Time:</strong> {activity.time}
                </p>
              )}
              {activity.sector && (
                <p>
                  <strong>Sector:</strong> {activity.sector}
                </p>
              )}
              {activity.companyStatus && (
                <p>
                  <strong>Company Status:</strong> {activity.companyStatus}
                </p>
              )}
              {activity.activityType && (
                <p>
                  <strong>Activity Type:</strong> {activity.activityType}
                </p>
              )}
              {activity.nature && (
                <p>
                  <strong>Nature:</strong> {activity.nature}
                </p>
              )}
              {activity.county && (
                <p>
                  <strong>County:</strong> {activity.county}
                </p>
              )}
              {activity.venue && (
                <p>
                  <strong>Venue:</strong> {activity.venue}
                </p>
              )}
              {activity.newVenue && (
                <p>
                  <strong>New Venue:</strong> {activity.newVenue}
                </p>
              )}
              {activity.totalSessions && (
                <p>
                  <strong>Total Sessions:</strong> {activity.totalSessions}
                </p>
              )}
              {activity.jobsCreated && (
                <p>
                  <strong>Jobs Created:</strong> {activity.jobsCreated}
                </p>
              )}
              {activity.indirectJobs && (
                <p>
                  <strong>Indirect Jobs:</strong> {activity.indirectJobs}
                </p>
              )}
              {activity.directJobs && (
                <p>
                  <strong>Direct Jobs:</strong> {activity.directJobs}
                </p>
              )}
              {activity.entryType && (
                <p>
                  <strong>Entry Type:</strong> {activity.entryType}
                </p>
              )}
              {activity.bookingPlatform && (
                <p>
                  <strong>Booking Platform:</strong> {activity.bookingPlatform}
                </p>
              )}
              {activity.newBookingPlatform && (
                <p>
                  <strong>New Booking Platform:</strong>{" "}
                  {activity.newBookingPlatform}
                </p>
              )}
              {activity.paymentMethods &&
                activity.paymentMethods.length > 0 && (
                  <p>
                    <strong>Payment Methods:</strong>{" "}
                    {activity.paymentMethods.join(", ")}
                  </p>
                )}
              {activity.language && (
                <p>
                  <strong>Language:</strong> {activity.language}
                </p>
              )}
              {activity.otherLanguage && (
                <p>
                  <strong>Other Language:</strong> {activity.otherLanguage}
                </p>
              )}
              {activity.email && (
                <p>
                  <strong>Email:</strong> {activity.email}
                </p>
              )}
              {activity.phone && (
                <p>
                  <strong>Phone:</strong> {activity.phone}
                </p>
              )}
              {activity.notes && (
                <p>
                  <strong>Notes:</strong> {activity.notes}
                </p>
              )}
              {activity.createdAt && (
                <p className="text-sm text-gray-500 mt-2">
                  Created on:{" "}
                  {new Date(activity.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TheatreData;

"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";

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
  const [filteredActivities, setFilteredActivities] = useState<
    TheatreActivity[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivity, setSelectedActivity] =
    useState<TheatreActivity | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/theatre-activities");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch data");

        setActivities(data.data || []);
        setFilteredActivities(data.data || []);
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

  useEffect(() => {
    const results = activities.filter(
      (activity) =>
        activity.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.contactPerson
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (activity.venue &&
          activity.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.county &&
          activity.county.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredActivities(results);
  }, [searchTerm, activities]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/theatre-activities/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete activity");

      // Remove the deleted activity from state
      setActivities(activities.filter((activity) => activity._id !== id));
      setFilteredActivities(
        filteredActivities.filter((activity) => activity._id !== id)
      );

      // Close the dialog if the deleted activity was the one being viewed
      if (selectedActivity?._id === id) {
        setSelectedActivity(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete activity"
      );
    }
  };

  if (loading) return <div className="p-4">Loading theatre data...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  const handleEdit = () => {
    if (!selectedActivity) return;

    // Example: Redirect to an edit page or open an edit form
    console.log("Editing activity:", selectedActivity);

    // You can implement navigation to an edit page or show an edit form dialog
    // For example, if using a router:
    // router.push(`/edit-activity/${selectedActivity._id}`);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Theatre Activities</h1>

      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>County</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No theatre activities found
                </TableCell>
              </TableRow>
            ) : (
              filteredActivities.map((activity) => (
                <TableRow key={activity._id}>
                  <TableCell className="font-medium">
                    {activity.companyName}
                  </TableCell>
                  <TableCell>{activity.contactPerson}</TableCell>
                  <TableCell>{activity.venue || "-"}</TableCell>
                  <TableCell>{activity.county || "-"}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="text-white"
                          size="sm"
                          onClick={() => setSelectedActivity(activity)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      {selectedActivity && (
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Activity Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold">
                                Event Information
                              </h3>
                              <p>Event Name: {selectedActivity.eventName}</p>
                              {selectedActivity.date && (
                                <p>Date: {selectedActivity.date}</p>
                              )}
                              {selectedActivity.time && (
                                <p>Time: {selectedActivity.time}</p>
                              )}
                              {selectedActivity.sector && (
                                <p>Sector: {selectedActivity.sector}</p>
                              )}
                              {selectedActivity.activityType && (
                                <p>
                                  Activity Type: {selectedActivity.activityType}
                                </p>
                              )}
                              {selectedActivity.nature && (
                                <p>Nature: {selectedActivity.nature}</p>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                Company Information
                              </h3>
                              <p>Company: {selectedActivity.companyName}</p>
                              {selectedActivity.companyStatus && (
                                <p>Status: {selectedActivity.companyStatus}</p>
                              )}
                              {selectedActivity.contactPerson && (
                                <p>Contact: {selectedActivity.contactPerson}</p>
                              )}
                              {selectedActivity.email && (
                                <p>Email: {selectedActivity.email}</p>
                              )}
                              {selectedActivity.phone && (
                                <p>Phone: {selectedActivity.phone}</p>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                Location Details
                              </h3>
                              {selectedActivity.county && (
                                <p>County: {selectedActivity.county}</p>
                              )}
                              {selectedActivity.venue && (
                                <p>Venue: {selectedActivity.venue}</p>
                              )}
                              {selectedActivity.newVenue && (
                                <p>New Venue: {selectedActivity.newVenue}</p>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                Other Information
                              </h3>
                              {selectedActivity.totalSessions && (
                                <p>
                                  Total Sessions:{" "}
                                  {selectedActivity.totalSessions}
                                </p>
                              )}
                              {selectedActivity.jobsCreated && (
                                <p>
                                  Jobs Created: {selectedActivity.jobsCreated}
                                </p>
                              )}
                              {selectedActivity.entryType && (
                                <p>Entry Type: {selectedActivity.entryType}</p>
                              )}
                              {selectedActivity.paymentMethods && (
                                <p>
                                  Payment Methods:{" "}
                                  {selectedActivity.paymentMethods.join(", ")}
                                </p>
                              )}
                              {selectedActivity.notes && (
                                <p>Notes: {selectedActivity.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button className="text-white" onClick={handleEdit}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(activity._id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TheatreData;

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
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TheatreActivity {
  _id: string;
  date: Date | string;
  companyName: string;
  sector: "public" | "private";
  companyStatus: "new" | "existing";
  activityType: "performance" | "capacity" | "outreach";
  nature:
    | "frequent-regular"
    | "frequent-irregular"
    | "infrequent-regular"
    | "infrequent-irregular";
  eventName: string;
  county: string;
  venue: string;
  newVenue: string;
  poster?: string;
  totalSessions: string;
  jobsCreated: string;
  indirectJobs: string;
  directJobs: string;
  entryType: "free" | "paid";
  bookingPlatform: string;
  newBookingPlatform: string;
  paymentMethods: string[];
  language: string;
  otherLanguage: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string;
  isPublic: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<TheatreActivity>>(
    {}
  );

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

      setActivities(activities.filter((activity) => activity._id !== id));
      setFilteredActivities(
        filteredActivities.filter((activity) => activity._id !== id)
      );

      if (selectedActivity?._id === id) {
        setSelectedActivity(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete activity"
      );
    }
  };

  const handleEditClick = (activity: TheatreActivity) => {
    setSelectedActivity(activity);
    setEditFormData({
      ...activity,
      date: activity.date
        ? new Date(activity.date).toISOString().split("T")[0]
        : "",
    });
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: keyof TheatreActivity, value: string) => {
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async () => {
    if (!selectedActivity) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/theatre-activities/${selectedActivity._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!res.ok) throw new Error("Failed to update activity");

      const updatedActivity = await res.json();

      setActivities(
        activities.map((activity) =>
          activity._id === selectedActivity._id
            ? updatedActivity.data
            : activity
        )
      );
      setFilteredActivities(
        filteredActivities.map((activity) =>
          activity._id === selectedActivity._id
            ? updatedActivity.data
            : activity
        )
      );

      setIsEditing(false);
      setSelectedActivity(updatedActivity.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update activity"
      );
    }
  };

  const handleTogglePublic = async (id: string, isPublic: boolean) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/theatre-activities/${id}/visibility`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPublic }),
        }
      );

      if (!res.ok) throw new Error("Failed to update visibility");

      const updatedActivity = await res.json();

      setActivities(
        activities.map((activity) =>
          activity._id === id ? updatedActivity.data : activity
        )
      );
      setFilteredActivities(
        filteredActivities.map((activity) =>
          activity._id === id ? updatedActivity.data : activity
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update visibility"
      );
    }
  };

  if (loading) return <div className="p-4">Loading theatre data...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 space-y-4">
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
              <TableHead>Publish</TableHead>
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
                        <DialogContent className="w-[95vw] max-w-[1800px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {isEditing ? "Edit Activity" : "Activity Details"}
                            </DialogTitle>
                          </DialogHeader>
                          {isEditing ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Basic Information */}
                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Basic Information
                                </h3>
                                <div className="space-y-2">
                                  <Label htmlFor="date">Date</Label>
                                  <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={(editFormData.date as string) || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="eventName">Event Name</Label>
                                  <Input
                                    id="eventName"
                                    name="eventName"
                                    value={editFormData.eventName || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="venue">Venue</Label>
                                  <Input
                                    id="venue"
                                    name="venue"
                                    value={editFormData.venue || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="newVenue">
                                    New Venue (if applicable)
                                  </Label>
                                  <Input
                                    id="newVenue"
                                    name="newVenue"
                                    value={editFormData.newVenue || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="county">County</Label>
                                  <Input
                                    id="county"
                                    name="county"
                                    value={editFormData.county || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>

                              {/* Company Information */}
                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Company Information
                                </h3>
                                <div className="space-y-2">
                                  <Label htmlFor="companyName">
                                    Company Name
                                  </Label>
                                  <Input
                                    id="companyName"
                                    name="companyName"
                                    value={editFormData.companyName || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Sector</Label>
                                  <Select
                                    value={editFormData.sector || ""}
                                    onValueChange={(value) =>
                                      handleSelectChange("sector", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select sector" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="public">
                                        Public
                                      </SelectItem>
                                      <SelectItem value="private">
                                        Private
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Company Status</Label>
                                  <Select
                                    value={editFormData.companyStatus || ""}
                                    onValueChange={(value) =>
                                      handleSelectChange("companyStatus", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Company Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="existing">
                                        Existing
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Activity Type</Label>
                                  <Select
                                    value={editFormData.activityType || ""}
                                    onValueChange={(value) =>
                                      handleSelectChange("activityType", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Activity Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="performance">
                                        Performance
                                      </SelectItem>
                                      <SelectItem value="capacity">
                                        Capacity
                                      </SelectItem>
                                      <SelectItem value="outreach">
                                        Outreach
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Activity Nature</Label>
                                  <Select
                                    value={editFormData.nature || ""}
                                    onValueChange={(value) =>
                                      handleSelectChange("nature", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Activity Nature" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="frequent-regular">
                                        Frequent - Regular
                                      </SelectItem>
                                      <SelectItem value="frequent-irregular">
                                        Frequent - Irregular
                                      </SelectItem>
                                      <SelectItem value="infrequent-regular">
                                        Infrequent - Regular
                                      </SelectItem>
                                      <SelectItem value="infrequent-irregular">
                                        Infrequent - Irregular
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Event Details */}
                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Event Details
                                </h3>
                                <div className="space-y-2">
                                  <Label htmlFor="totalSessions">
                                    Total Sessions
                                  </Label>
                                  <Input
                                    id="totalSessions"
                                    name="totalSessions"
                                    type="number"
                                    value={editFormData.totalSessions || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="jobsCreated">
                                    Total Jobs Created
                                  </Label>
                                  <Input
                                    id="jobsCreated"
                                    name="jobsCreated"
                                    type="number"
                                    value={editFormData.jobsCreated || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="directJobs">
                                    Direct Jobs
                                  </Label>
                                  <Input
                                    id="directJobs"
                                    name="directJobs"
                                    type="number"
                                    value={editFormData.directJobs || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="indirectJobs">
                                    Indirect Jobs
                                  </Label>
                                  <Input
                                    id="indirectJobs"
                                    name="indirectJobs"
                                    type="number"
                                    value={editFormData.indirectJobs || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Entry Type</Label>
                                  <Select
                                    value={editFormData.entryType || ""}
                                    onValueChange={(value) =>
                                      handleSelectChange("entryType", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Entry Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="free">Free</SelectItem>
                                      <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Contact & Other Info */}
                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Contact Information
                                </h3>
                                <div className="space-y-2">
                                  <Label htmlFor="contactPerson">
                                    Contact Person
                                  </Label>
                                  <Input
                                    id="contactPerson"
                                    name="contactPerson"
                                    value={editFormData.contactPerson || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={editFormData.email || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Phone</Label>
                                  <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={editFormData.phone || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="bookingPlatform">
                                    Booking Platform
                                  </Label>
                                  <Input
                                    id="bookingPlatform"
                                    name="bookingPlatform"
                                    value={editFormData.bookingPlatform || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="newBookingPlatform">
                                    New Booking Platform
                                  </Label>
                                  <Input
                                    id="newBookingPlatform"
                                    name="newBookingPlatform"
                                    value={
                                      editFormData.newBookingPlatform || ""
                                    }
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="language">Language</Label>
                                  <Input
                                    id="language"
                                    name="language"
                                    value={editFormData.language || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="otherLanguage">
                                    Other Language
                                  </Label>
                                  <Input
                                    id="otherLanguage"
                                    name="otherLanguage"
                                    value={editFormData.otherLanguage || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="notes">Notes</Label>
                                  <Textarea
                                    id="notes"
                                    name="notes"
                                    value={editFormData.notes || ""}
                                    onChange={handleInputChange}
                                    className="min-h-[100px]"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* View Mode - Display all fields */}
                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Basic Information
                                </h3>
                                <div className="space-y-2">
                                  <p className="font-medium">Date:</p>
                                  <p>
                                    {new Date(
                                      selectedActivity.date
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Event Name:</p>
                                  <p>{selectedActivity.eventName}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Venue:</p>
                                  <p>{selectedActivity.venue}</p>
                                </div>
                                {selectedActivity.newVenue && (
                                  <div className="space-y-2">
                                    <p className="font-medium">New Venue:</p>
                                    <p>{selectedActivity.newVenue}</p>
                                  </div>
                                )}
                                <div className="space-y-2">
                                  <p className="font-medium">County:</p>
                                  <p>{selectedActivity.county}</p>
                                </div>
                              </div>

                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Company Information
                                </h3>
                                <div className="space-y-2">
                                  <p className="font-medium">Company:</p>
                                  <p>{selectedActivity.companyName}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Sector:</p>
                                  <p>{selectedActivity.sector}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Status:</p>
                                  <p>{selectedActivity.companyStatus}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Activity Type:</p>
                                  <p>{selectedActivity.activityType}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Nature:</p>
                                  <p>{selectedActivity.nature}</p>
                                </div>
                              </div>

                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Event Details
                                </h3>
                                <div className="space-y-2">
                                  <p className="font-medium">Total Sessions:</p>
                                  <p>{selectedActivity.totalSessions}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Jobs Created:</p>
                                  <p>{selectedActivity.jobsCreated}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Direct Jobs:</p>
                                  <p>{selectedActivity.directJobs}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Indirect Jobs:</p>
                                  <p>{selectedActivity.indirectJobs}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Entry Type:</p>
                                  <p>{selectedActivity.entryType}</p>
                                </div>
                              </div>

                              <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold text-lg">
                                  Contact Information
                                </h3>
                                <div className="space-y-2">
                                  <p className="font-medium">Contact Person:</p>
                                  <p>{selectedActivity.contactPerson}</p>
                                </div>
                                {selectedActivity.email && (
                                  <div className="space-y-2">
                                    <p className="font-medium">Email:</p>
                                    <p>{selectedActivity.email}</p>
                                  </div>
                                )}
                                {selectedActivity.phone && (
                                  <div className="space-y-2">
                                    <p className="font-medium">Phone:</p>
                                    <p>{selectedActivity.phone}</p>
                                  </div>
                                )}
                                {selectedActivity.bookingPlatform && (
                                  <div className="space-y-2">
                                    <p className="font-medium">
                                      Booking Platform:
                                    </p>
                                    <p>{selectedActivity.bookingPlatform}</p>
                                  </div>
                                )}
                                {selectedActivity.newBookingPlatform && (
                                  <div className="space-y-2">
                                    <p className="font-medium">
                                      New Booking Platform:
                                    </p>
                                    <p>{selectedActivity.newBookingPlatform}</p>
                                  </div>
                                )}
                                {selectedActivity.language && (
                                  <div className="space-y-2">
                                    <p className="font-medium">Language:</p>
                                    <p>{selectedActivity.language}</p>
                                  </div>
                                )}
                                {selectedActivity.otherLanguage && (
                                  <div className="space-y-2">
                                    <p className="font-medium">
                                      Other Language:
                                    </p>
                                    <p>{selectedActivity.otherLanguage}</p>
                                  </div>
                                )}
                                {selectedActivity.notes && (
                                  <div className="space-y-2">
                                    <p className="font-medium">Notes:</p>
                                    <p className="whitespace-pre-wrap">
                                      {selectedActivity.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-background pb-4">
                            {isEditing ? (
                              <>
                                <Button
                                  variant="outline"
                                  onClick={() => setIsEditing(false)}
                                  className="min-w-[120px]"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="text-white min-w-[120px]"
                                  onClick={handleEditSubmit}
                                >
                                  Save Changes
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  className="text-white min-w-[120px]"
                                  onClick={() =>
                                    handleEditClick(selectedActivity)
                                  }
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleDelete(selectedActivity._id)
                                  }
                                  className="min-w-[120px]"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={activity.isPublic}
                      onCheckedChange={(checked) =>
                        handleTogglePublic(activity._id, checked)
                      }
                    />
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

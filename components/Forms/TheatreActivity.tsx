"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FileUploadComponent from "./FileUploadComponent";

// Renamed from FormData to TheatreFormData to avoid conflict
type TheatreFormData = {
  date: string;
  companyName: string;
  sector: string;
  companyStatus: string;
  activityType: string;
  nature: string;
  eventName: string;
  county: string;
  venue: string;
  newVenue: string;
  totalSessions: string;
  jobsCreated: string;
  indirectJobs: string;
  directJobs: string;
  entryType: string;
  bookingPlatform: string;
  newBookingPlatform: string;
  paymentMethods: string[];
  language: string;
  otherLanguage: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string;
  files: File[];
  fileUrls?: string[];
};

const TheatreActivity = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TheatreFormData>({
    date: "",
    companyName: "",
    sector: "",
    companyStatus: "",
    activityType: "",
    nature: "",
    eventName: "",
    county: "",
    venue: "",
    newVenue: "",
    totalSessions: "",
    jobsCreated: "",
    indirectJobs: "",
    directJobs: "",
    entryType: "",
    bookingPlatform: "",
    newBookingPlatform: "",
    paymentMethods: [],
    language: "",
    otherLanguage: "",
    contactPerson: "",
    email: "",
    phone: "",
    notes: "",
    files: [],
  });

  registerLocale("en", enUS);

  const handleChange = <K extends keyof TheatreFormData>(
    field: K,
    value: TheatreFormData[K]
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (formData: TheatreFormData) => {
    const loadingToastId = toast.loading("Submitting form...");

    try {
      // First upload files to S3 if there are any
      let fileUrls: string[] = [];
      if (formData.files.length > 0) {
        const uploadPromises = formData.files.map(async (file: File) => {
          const uploadFormData = new FormData();
          uploadFormData.append("file", file);

          const uploadResponse = await fetch(
            "http://localhost:5000/api/upload",
            {
              method: "POST",
              body: uploadFormData,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload file: ${file.name}`);
          }

          const uploadResult = await uploadResponse.json();
          return uploadResult.url;
        });

        fileUrls = await Promise.all(uploadPromises);
      }

      // Then submit the form data with file URLs
      const response = await fetch(
        "http://localhost:5000/api/theatre-activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            fileUrls,
            files: undefined, // Remove the actual File objects
          }),
        }
      );

      const contentType = response.headers.get("content-type");
      let responseData;

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || "Invalid server response");
      }

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            `Server error: ${response.status} ${response.statusText}`
        );
      }

      toast.success("Theatre activity submitted successfully!", {
        id: loadingToastId,
      });
      console.log("Success:", responseData);

      // Reset form after successful submission
      setFormData({
        date: "",
        companyName: "",
        sector: "",
        companyStatus: "",
        activityType: "",
        nature: "",
        eventName: "",
        county: "",
        venue: "",
        newVenue: "",
        totalSessions: "",
        jobsCreated: "",
        indirectJobs: "",
        directJobs: "",
        entryType: "",
        bookingPlatform: "",
        newBookingPlatform: "",
        paymentMethods: [],
        language: "",
        otherLanguage: "",
        contactPerson: "",
        email: "",
        phone: "",
        notes: "",
        files: [],
      });
      setStep(1);
    } catch (error) {
      console.error("Submission error:", error);

      let errorMessage = "Failed to submit form";
      if (error instanceof Error) {
        errorMessage = error.message;

        // Handle common error cases
        if (errorMessage.includes("Failed to fetch")) {
          errorMessage = "Network error - could not connect to server";
        } else if (errorMessage.includes("<!DOCTYPE html>")) {
          errorMessage = "Server returned an HTML error page";
        }
      }

      toast.error(errorMessage, {
        id: loadingToastId,
        duration: 10000,
        action: {
          label: "Retry",
          onClick: () => handleSubmit(formData),
        },
      });
    }
  };

  const renderSection1 = () => (
    <Card className="w-full max-w-2xl mb-10">
      <CardHeader>
        <CardTitle>Section 1: Activity Basics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <Label className="font-bold">Activity Date and Time</Label>
          <DatePicker
            selected={formData.date ? new Date(formData.date) : null}
            onChange={(date: Date | null) => {
              if (date) {
                handleChange("date", date.toISOString());
              }
            }}
            minDate={new Date()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select date and time"
            className="flex h-10 w-full mt-5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            locale="en"
            timeCaption="Time"
            shouldCloseOnSelect={false}
            isClearable
          />
        </div>

        <Label className="font-bold">Company Name</Label>
        <Input
          placeholder="Company Name"
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />

        <Label className="font-bold">Public or Private Sector</Label>
        <RadioGroup
          onValueChange={(value) => handleChange("sector", value)}
          defaultValue={formData.sector}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <RadioGroupItem value="public" id="public" />{" "}
            <Label htmlFor="public">Public</Label>
            <RadioGroupItem value="private" id="private" />{" "}
            <Label htmlFor="private">Private</Label>
          </div>
        </RadioGroup>

        <Label className="font-bold">Company Status</Label>
        <RadioGroup
          onValueChange={(value) => handleChange("companyStatus", value)}
          defaultValue={formData.companyStatus}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <RadioGroupItem value="new" id="new" />{" "}
            <Label htmlFor="new">New</Label>
            <RadioGroupItem value="existing" id="existing" />{" "}
            <Label htmlFor="existing">Existing</Label>
          </div>
        </RadioGroup>

        <Button onClick={() => setStep(2)} className="text-white">
          Next
        </Button>
      </CardContent>
    </Card>
  );

  const renderSection2 = () => (
    <Card className="w-full max-w-2xl mb-10">
      <CardHeader>
        <CardTitle>Section 2: Activity Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label className="font-bold">Type of Activity</Label>
        <RadioGroup
          onValueChange={(value) => handleChange("activityType", value)}
          defaultValue={formData.activityType}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <RadioGroupItem value="performance" id="performance" />{" "}
            <Label htmlFor="performance">Performance</Label>
            <RadioGroupItem value="capacity" id="capacity" />{" "}
            <Label htmlFor="capacity">Capacity Building Programs</Label>
            <RadioGroupItem value="outreach" id="outreach" />{" "}
            <Label htmlFor="outreach">Community Outreach & Engagements</Label>
          </div>
        </RadioGroup>

        <Label className="font-bold">Nature of Activity</Label>
        <RadioGroup
          onValueChange={(value) => handleChange("nature", value)}
          defaultValue={formData.nature}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <RadioGroupItem value="frequent-regular" id="frequent-regular" />{" "}
            <Label htmlFor="frequent-regular">Frequent-Regular</Label>
            <RadioGroupItem
              value="frequent-irregular"
              id="frequent-irregular"
            />{" "}
            <Label htmlFor="frequent-irregular">Frequent-Irregular</Label>
            <RadioGroupItem
              value="infrequent-regular"
              id="infrequent-regular"
            />{" "}
            <Label htmlFor="infrequent-regular">Infrequent-Regular</Label>
            <RadioGroupItem
              value="infrequent-irregular"
              id="infrequent-irregular"
            />{" "}
            <Label htmlFor="infrequent-irregular">Infrequent-Irregular</Label>
          </div>
        </RadioGroup>
        <Label className="font-bold">Event Name</Label>
        <Input
          placeholder="Event Name"
          value={formData.eventName}
          onChange={(e) => handleChange("eventName", e.target.value)}
        />

        <Label className="font-bold">County</Label>
        <Input
          placeholder="County"
          value={formData.county}
          onChange={(e) => handleChange("county", e.target.value)}
        />

        <Label>Select Venue</Label>
        <Select
          onValueChange={(value) => {
            handleChange("venue", value);
            // Clear newVenue when switching away from "other"
            if (value !== "other") {
              handleChange("newVenue", "");
            }
          }}
          value={formData.venue}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Venue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="venue1">Venue 1</SelectItem>
            <SelectItem value="venue2">Venue 2</SelectItem>
            <SelectItem value="venue3">Venue 3</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        {formData.venue === "other" && (
          <div className="mt-2">
            <Label>Specify Venue</Label>
            <Input
              placeholder="Enter venue name"
              value={formData.newVenue}
              onChange={(e) => handleChange("newVenue", e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-between mt-4">
          <Button onClick={() => setStep(1)} className="text-white">
            Back
          </Button>
          <Button onClick={() => setStep(3)} className="text-white">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSection3 = () => (
    <Card className="w-full max-w-2xl mb-10">
      <CardHeader>
        <CardTitle>Section 3: Employment & Entry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Total Sessions"
          value={formData.totalSessions}
          onChange={(e) => handleChange("totalSessions", e.target.value)}
        />
        <Input
          placeholder="Jobs Created"
          value={formData.jobsCreated}
          onChange={(e) => handleChange("jobsCreated", e.target.value)}
        />
        <Input
          placeholder="Indirect Jobs"
          value={formData.indirectJobs}
          onChange={(e) => handleChange("indirectJobs", e.target.value)}
        />
        <Input
          placeholder="Direct Jobs"
          value={formData.directJobs}
          onChange={(e) => handleChange("directJobs", e.target.value)}
        />

        <Label className="font-bold">Entry Type</Label>
        <RadioGroup
          onValueChange={(value) => handleChange("entryType", value)}
          defaultValue={formData.entryType}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <RadioGroupItem value="free" id="free" />{" "}
            <Label htmlFor="free">Free</Label>
            <RadioGroupItem value="paid" id="paid" />{" "}
            <Label htmlFor="paid">Paid</Label>
          </div>
        </RadioGroup>

        <Label>Booking Platform</Label>
        <Select
          onValueChange={(value) => {
            handleChange("bookingPlatform", value);
            // Clear newBookingPlatform when switching away from "other"
            if (value !== "other") {
              handleChange("newBookingPlatform", "");
            }
          }}
          value={formData.bookingPlatform}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Booking Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="platform1">Platform 1</SelectItem>
            <SelectItem value="platform2">Platform 2</SelectItem>
            <SelectItem value="platform3">Platform 3</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        {formData.bookingPlatform === "other" && (
          <div className="mt-2">
            <Label>Specify Booking Platform</Label>
            <Input
              placeholder="Enter booking platform name"
              value={formData.newBookingPlatform}
              onChange={(e) =>
                handleChange("newBookingPlatform", e.target.value)
              }
            />
          </div>
        )}

        <div className="flex justify-between mt-4">
          <Button onClick={() => setStep(2)} className="text-white">
            Back
          </Button>
          <Button onClick={() => setStep(4)} className="text-white">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSection4 = () => (
    <Card className="w-full max-w-2xl mb-10">
      <CardHeader>
        <CardTitle>Section 4: Contact & Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>Main Language</Label>
        <Select onValueChange={(value) => handleChange("language", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="kiswahili">Kiswahili</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {formData.language === "other" && (
          <Input
            placeholder="Other Language"
            value={formData.otherLanguage}
            onChange={(e) => handleChange("otherLanguage", e.target.value)}
          />
        )}
        <Input
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={(e) => handleChange("contactPerson", e.target.value)}
        />
        <Input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <Textarea
          placeholder="Special Notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
        <FileUploadComponent formData={formData} setFormData={setFormData} />
        <div className="flex justify-between mt-4">
          <Button onClick={() => setStep(3)} className="text-white">
            Back
          </Button>
          <Button onClick={() => setStep(5)} className="text-white">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSummary = () => (
    <Card className="w-full max-w-3xl mb-10">
      <CardHeader>
        <CardTitle>Summary of Submission</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {Object.entries(formData).map(([key, value]) => {
          if (key === "files") {
            return (
              <p key={key}>
                <strong>{key}:</strong>{" "}
                {Array.isArray(value) && value.length > 0
                  ? (value as File[]).map((file) => file.name).join(", ")
                  : "No files uploaded"}
              </p>
            );
          }

          return (
            <p key={key}>
              <strong>{key}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value || "N/A"}
            </p>
          );
        })}

        <div className="flex justify-between mt-4">
          <Button onClick={() => setStep(1)} className="text-white">
            Edit Submission
          </Button>
          <Button onClick={() => handleSubmit(formData)} className="text-white">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex justify-center mt-10">
      {step === 1 && renderSection1()}
      {step === 2 && renderSection2()}
      {step === 3 && renderSection3()}
      {step === 4 && renderSection4()}
      {step === 5 && renderSummary()}
    </div>
  );
};

export default TheatreActivity;

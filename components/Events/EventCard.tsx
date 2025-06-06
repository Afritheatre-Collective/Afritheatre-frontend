"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
}

interface EventCardProps {
  activity: TheatreActivity;
}

const EventCard = ({ activity }: EventCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {activity.poster && (
          <CardContent className="relative p-0 aspect-video">
            <Image
              src={activity.poster}
              alt={`Poster for ${activity.eventName}`}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </CardContent>
        )}
        <CardFooter className="flex flex-col items-start p-4 gap-2 flex-grow">
          <div className="space-y-2 w-full">
            <h3 className="font-semibold text-lg line-clamp-2">
              {activity.eventName}
            </h3>
            <p className="text-sm text-gray-600">{activity.companyName}</p>
            <p className="text-sm">
              <span className="font-medium">Date:</span>{" "}
              {format(new Date(activity.date), "PPP")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Location:</span> {activity.county}
            </p>
          </div>
          <Button
            className="mt-auto w-full text-white"
            onClick={() => setIsModalOpen(true)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>

      {/* Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{activity.eventName}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {activity.poster && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={activity.poster}
                    alt={`Poster for ${activity.eventName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Event Details</h4>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {format(new Date(activity.date), "PPP")}
                </p>
                <p>
                  <span className="font-medium">Venue:</span> {activity.venue}
                </p>
                {activity.newVenue && (
                  <p>
                    <span className="font-medium">New Venue:</span>{" "}
                    {activity.newVenue}
                  </p>
                )}
                <p>
                  <span className="font-medium">County:</span> {activity.county}
                </p>
                <p>
                  <span className="font-medium">Entry Type:</span>{" "}
                  {activity.entryType}
                </p>
                <p>
                  <span className="font-medium">Language:</span>{" "}
                  {activity.language}
                </p>
                {activity.otherLanguage && (
                  <p>
                    <span className="font-medium">Other Language:</span>{" "}
                    {activity.otherLanguage}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Company Information</h4>
                <p>
                  <span className="font-medium">Company:</span>{" "}
                  {activity.companyName}
                </p>
                <p>
                  <span className="font-medium">Sector:</span> {activity.sector}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {activity.companyStatus}
                </p>
                <p>
                  <span className="font-medium">Activity Type:</span>{" "}
                  {activity.activityType}
                </p>
                <p>
                  <span className="font-medium">Nature:</span> {activity.nature}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Contact Information</h4>
                <p>
                  <span className="font-medium">Contact Person:</span>{" "}
                  {activity.contactPerson}
                </p>
                {activity.email && (
                  <p>
                    <span className="font-medium">Email:</span> {activity.email}
                  </p>
                )}
                {activity.phone && (
                  <p>
                    <span className="font-medium">Phone:</span> {activity.phone}
                  </p>
                )}
              </div>

              {activity.notes && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Additional Notes</h4>
                  <p className="whitespace-pre-wrap">{activity.notes}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;

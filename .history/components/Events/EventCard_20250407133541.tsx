import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface EventCardProps {
  imageUrl: string;
  imageAlt: string;
  eventTitle: string;
  eventDate?: string;
  eventLocation?: string;
}

const EventCard = ({
  imageUrl,
  imageAlt,
  eventTitle,
  eventDate,
  eventLocation,
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="relative p-0 aspect-video">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 gap-1">
        <h3 className="font-semibold text-lg line-clamp-2">{eventTitle}</h3>
        {eventDate && (
          <p className="text-sm text-muted-foreground">{eventDate}</p>
        )}
        {eventLocation && (
          <p className="text-sm text-muted-foreground">{eventLocation}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;

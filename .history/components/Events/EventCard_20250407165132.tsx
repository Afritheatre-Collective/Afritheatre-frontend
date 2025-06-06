import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface EventCardProps {
  imageUrl: string;
  imageAlt: string;
  eventTitle: string;
}

const EventCard = ({ imageUrl, imageAlt, eventTitle }: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="relative p-0 aspect-video">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={500}
          height={500}
          className="object-cover"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start px-4 py-3 gap-1">
        <h3 className="font-semibold text-lg line-clamp-2">{eventTitle}</h3>
      </CardFooter>
    </Card>
  );
};

export default EventCard;

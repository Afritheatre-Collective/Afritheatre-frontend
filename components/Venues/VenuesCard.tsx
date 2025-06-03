import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { FaHouseUser, FaMapLocationDot } from "react-icons/fa6";

type Props = {
  imageUrl: string;
  title: string;
  capacity: number;
  location: string;
};

const VenuesCard = ({ imageUrl, title, capacity, location }: Props) => {
  return (
    <Card className="w-[350px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <CardDescription className="flex items-center gap-2">
          <FaHouseUser />
          Capacity: {capacity} people
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <FaMapLocationDot />
          {location}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default VenuesCard;

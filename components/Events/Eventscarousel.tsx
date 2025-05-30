"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import EventCard from "./EventCard"; // Import your EventCard component

const EventsCarousel = () => {
  const events = [
    {
      id: 1,
      imageUrl: "/events/test7.jpeg",
      imageAlt: "Tech conference",
      eventTitle: "Annual Tech Conference",
    },
    {
      id: 2,
      imageUrl: "/events/test9.jpeg",
      imageAlt: "Music festival",
      eventTitle: "Summer Music Festival",
    },
    {
      id: 3,
      imageUrl: "/events/test2.jpeg",
      imageAlt: "Art exhibition",
      eventTitle: "Modern Art Exhibition",
    },
    {
      id: 4,
      imageUrl: "/events/test3.jpeg",
      imageAlt: "Food fair",
      eventTitle: "International Food Fair",
    },
    {
      id: 5,
      imageUrl: "/events/test4.jpeg",
      imageAlt: "Sports tournament",
      eventTitle: "Community Sports Tournament",
    },
    {
      id: 6,
      imageUrl: "/events/test5.jpeg",
      imageAlt: "Book fair",
      eventTitle: "Literary Book Fair",
    },
    {
      id: 7,
      imageUrl: "/events/test6.jpeg",
      imageAlt: "Film premiere",
      eventTitle: "Independent Film Premiere",
    },
  ];

  return (
    <div className=" max-w-7xl mx-auto justify-center items-center">
      <div className="flex items-center py-6 px-6 gap-3">
        <div className="flex items-center">
          <div className="relative w-5 h-5 mr-1.5">
            <div className="absolute w-full h-full border-2 border-[#247373] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#c14600] rounded-full"></div>
          </div>

          <div className="flex gap-1">
            <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12"></div>
            <div className="w-1.5 h-4 bg-[#c14600] transform -skew-x-12"></div>
            <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12"></div>
          </div>
        </div>

        <h2 className="text-xl font-bold">Upcoming Events</h2>
      </div>
      <Carousel
        className="w-full py-3 px-4"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]}
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="basis-1/1 lg:basis-1/4 px-2"
            >
              <EventCard
                imageUrl={event.imageUrl}
                imageAlt={event.imageAlt}
                eventTitle={event.eventTitle}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default EventsCarousel;

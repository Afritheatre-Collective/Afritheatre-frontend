import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "./EventCard"; // Import your EventCard component

const EventsCarousel = () => {
  // Sample event data
  const events = [
    {
      id: 1,
      imageUrl: "/events/tech-conference.jpg",
      imageAlt: "Tech conference",
      eventTitle: "Annual Tech Conference",
    },
    {
      id: 2,
      imageUrl: "/events/music-festival.jpg",
      imageAlt: "Music festival",
      eventTitle: "Summer Music Festival",
    },
    {
      id: 3,
      imageUrl: "/events/art-exhibition.jpg",
      imageAlt: "Art exhibition",
      eventTitle: "Modern Art Exhibition",
    },
    {
      id: 4,
      imageUrl: "/events/food-fair.jpg",
      imageAlt: "Food fair",
      eventTitle: "International Food Fair",
    },
    {
      id: 5,
      imageUrl: "/events/sports-tournament.jpg",
      imageAlt: "Sports tournament",
      eventTitle: "Community Sports Tournament",
    },
    {
      id: 6,
      imageUrl: "/events/book-fair.jpg",
      imageAlt: "Book fair",
      eventTitle: "Literary Book Fair",
    },
    {
      id: 7,
      imageUrl: "/events/film-premiere.jpg",
      imageAlt: "Film premiere",
      eventTitle: "Independent Film Premiere",
    },
  ];

  return (
    <Carousel className="w-full py-32">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className="basis-1/3 px-2">
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
  );
};

export default EventsCarousel;

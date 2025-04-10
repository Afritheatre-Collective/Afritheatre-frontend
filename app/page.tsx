import EventsCarousel from "@/components/Events/Eventscarousel";
import Resources from "@/components/Resources/Resources";

export default function Home() {
  return (
    <div>
      <section>
        <EventsCarousel />
      </section>
      <section>
        <Resources />
      </section>
    </div>
  );
}

import EventsCarousel from "@/components/Events/Eventscarousel";
import Resources from "@/components/Resources/Resources";
import LandingPageStats from "@/components/Stats/LandingPageStats";

export default function Home() {
  return (
    <div>
      <section>
        <LandingPageStats />
      </section>
      <section>
        <EventsCarousel />
      </section>
      <section>
        <Resources />
      </section>
    </div>
  );
}

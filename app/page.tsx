import Resources from "@/components/Resources/Resources";
import LandingPageStats from "@/components/Stats/LandingPageStats";

export default function Home() {
  return (
    <div className="my-12">
      <section>
        <LandingPageStats />
      </section>
      <section>
        <Resources />
      </section>
    </div>
  );
}

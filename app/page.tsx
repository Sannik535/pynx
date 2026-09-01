import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/Newarrivals";
import Services from "@/components/home/Services";
import Trending from "@/components/home/Trending";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <Trending />
      <NewArrivals />
      <Featured />
      <Services />
    </main>
  );
}
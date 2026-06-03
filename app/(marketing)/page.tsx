import Hero from "@/components/sections/Hero";
import CountdownTimer from "@/components/sections/CountdownTimer";
import HowItWorks from "@/components/sections/HowItWorks";
import MemberTree from "@/components/sections/MemberTree";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CountdownTimer />
      <HowItWorks />
      <MemberTree />
      <Footer />
    </main>
  );
}

// import AnimatedBackground from "@/components/AnimatedBackground";
import HeroHighlightDemo from "@/components/AnimatedBackground";
import MainSection from "@/components/ContainerScroll";
import { NavbarDemo } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (

    <>
      <NavbarDemo/>
      <HeroHighlightDemo/>
      <div className="w-full h-screen"></div>
      <div></div>
      </>

  );
}

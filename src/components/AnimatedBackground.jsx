"use client";

import { TextGenerateEffect } from "./ui/text-generate-effect";
import { HeroHighlight } from "./ui/hero-highlight";
import HeroScrollDemo from "./ContainerScroll";
import FeaturesSectionDemo from "./featuresection";
import Payment from "./Payment";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function HeroHighlightDemo() {
  const words1 = `Beyond secure — better than any exam platform out there.`;
  const words2 = `Now Online Cheating Is Impossible`;

  const router = useRouter();
  const { user } = useUser(); // ✅ Clerk hook to get logged-in user

  const handleRedirect = () => {
    if (!user) {
      // If not logged in, send to sign-in
      router.push("/");
      return;
    }

    const role = user.publicMetadata?.role;

    // ✅ Role-based redirects
    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "teacher":
        router.push("/teacher");
        break;
      case "student":
        router.push("/student");
        break;
      case "coordinator":
        router.push("/coordinator");
        break;
      default:
        // If no role, maybe push to a default page
        router.push("/");
        break;
    }
  };

  return (
    <HeroHighlight>
      <section className="mt-48 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold">Online Exam Platform</h1>
        <br />
        <button
          onClick={handleRedirect}
          className="px-10 py-1 border-2 cursor-pointer border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
        >
          Onboard Now !!
        </button>
        <TextGenerateEffect words={words1} />
        <TextGenerateEffect duration={5} words={words2} />
        <div className="-mt-20">
          <HeroScrollDemo />
        </div>
      </section>
      <section
        id="features"
        className="min-h-screen flex items-center justify-center"
      >
        <FeaturesSectionDemo />
      </section>
      <section
        id="pricing"
        className="min-h-screen flex items-center justify-center"
      >
        <Payment />
      </section>
    </HeroHighlight>
  );
}

"use client";

import { HeroHighlight } from "./ui/hero-highlight";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { HeroScrollDemo } from "./HeroScrollDemo";
import Image from "next/image";
import { useEffect } from "react";

export default function HeroHighlightDemo() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  // ➤ STORE USER ROLE IN LOCALSTORAGE once Clerk loads
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const role = user?.publicMetadata?.role;
      if (role) {
        localStorage.setItem("userRole", role);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // ➤ REDIRECT USING LOCALSTORAGE (no need to check via user object)
  const handleRedirect = () => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    const role = localStorage.getItem("userRole");

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
        router.push("/");
        break;
    }
  };

  return (
    <HeroHighlight>
      <section className="relative overflow-hidden mt-10 py-30 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

            {/* Left Content */}
            <div className="text-center lg:text-left ml-20 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Smart Contract for Outcome-based University Tracking
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Revolutionize academic assessment with blockchain-powered transparency and secure CO-PO mapping.
              </p>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <Button
                  size="lg"
                  className="px-8"
                  onClick={handleRedirect}
                  disabled={!isLoaded}
                >
                  Get Started
                </Button>
                <Button variant="secondary" size="lg" className="px-8">
                  Request Demo
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <Image
                src="/dashboard.webp"
                alt="Exam Illustration"
                width={500}
                height={500}
                className="border-8 border-black rounded-lg"
              />
            </div>

          </div>
        </div>
      </section>

      <HeroScrollDemo />
    </HeroHighlight>
  );
}

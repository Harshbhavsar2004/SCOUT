"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TextGenerateEffect } from "./ui/text-generate-effect";
export default function HeroScrollDemo() {
  const words1 = `Online Exam Platform`;
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              <span className="text-4xl md:text-[6rem] font-bold  leading-none">
                Stop Cheating
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/next.svg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-contain h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconLayoutBoardSplitFilled,
  IconPencilPlus,
  IconEdit
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@clerk/nextjs";
import { NavbarLogo } from "@/components/ui/resizable-navbar";

export function SidebarDemo({ children }) {
  const { user } = useUser(); // Get logged-in user
  const [open, setOpen] = useState(false);

 const links = [
  {
    label: "Dashboard",
    href: "/teacher",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "CO-PO Mapping",
    href: "/teacher/co-po",
    icon: (
      <IconLayoutBoardSplitFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Create Exam",
    href: "/teacher/create-exam",
    icon: (
      <IconPencilPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Edit Exam",
    href: "/teacher/exam-list",
    icon: (
      <IconEdit className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "/teacher/settings",
    icon: (
      <IconSettings
        className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
      />
    ),
  },
];


  return (
    <div
    className={cn(
      "mx-auto flex w-full flex-1 h-screen overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800"
    )}
  >
    {/* Sidebar */}
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {<Logo />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          {user && (
            <SidebarLink
              link={{
                label: user.fullName || "User",
                icon: <UserButton />,
              }}
            />
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  
    {/* Main content */}
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
  
  );
}

export const Logo = () => (
  <NavbarLogo/>
);


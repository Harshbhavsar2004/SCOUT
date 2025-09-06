"use client";
import React from "react";
import { SidebarDemo } from "./sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarDemo>
      {children}
    </SidebarDemo>
  );
}

"use client";
import React from "react";
import { SidebarDemo } from "../dashboard/sidebar";

export default function MainLayout({ children }) {
  return (
    <SidebarDemo>
      {children}
    </SidebarDemo>
  );
}

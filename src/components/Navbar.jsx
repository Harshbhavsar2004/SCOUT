"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton
} from "@clerk/nextjs";

export function NavbarDemo() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {/* If signed in → show user button, else show login/signup */}
            <SignedIn>
              <UserButton signInUrl="/dashboard" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <NavbarButton variant="secondary">Login</NavbarButton>
              </SignInButton>
              <SignUpButton mode="modal">
                <NavbarButton variant="primary">Sign Up</NavbarButton>
              </SignUpButton>
            </SignedOut>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4">
              <SignedIn>
                <UserButton afterSignOutUrl="/Dashboard" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <NavbarButton variant="secondary" className="w-full">Login</NavbarButton>
                </SignInButton>
                <SignUpButton mode="modal">
                  <NavbarButton variant="primary" className="w-full">Sign Up</NavbarButton>
                </SignUpButton>
              </SignedOut>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

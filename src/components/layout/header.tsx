"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { courses } from "@/lib/courses";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { MathisiLogo } from "@/components/brand/logo";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <MathisiLogo className="h-11" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                Courses
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {courses.map((course) => (
                <DropdownMenuItem key={course.slug} asChild>
                  <Link href={`/courses/${course.slug}`}>{course.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/courses">All Courses</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:outline-none">About</Link>
          <Link href="/blogs" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:outline-none">Blogs</Link>
          <Link href="/pap" className="transition-colors hover:text-foreground/80 font-bold text-primary whitespace-nowrap focus:outline-none">Pay After Placement</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:outline-none">Contact</Link>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-card text-card-foreground">
              <div className="flex flex-col h-full">
                <div className="border-b border-border p-4">
                  <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <MathisiLogo className="h-8" />
                  </Link>
                </div>
                <nav className="flex flex-col space-y-4 p-4 text-lg">
                  <Link href="/courses" className="text-foreground/60 hover:text-foreground focus:outline-none" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
                  <Link href="/about" className="text-foreground/60 hover:text-foreground focus:outline-none" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link href="/blogs" className="text-foreground/60 hover:text-foreground focus:outline-none" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
                  <Link href="/pap" className="text-primary font-bold whitespace-nowrap focus:outline-none" onClick={() => setMobileMenuOpen(false)}>Pay After Placement</Link>
                  <Link href="/contact" className="text-foreground/60 hover:text-foreground focus:outline-none" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                </nav>
                <div className="mt-auto flex flex-col gap-4 border-t border-border p-4">
                  <Button variant="ghost" asChild>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

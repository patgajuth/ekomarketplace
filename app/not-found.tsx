"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <h1 className="display1 font-bold">404</h1>
      <p className="textL font-medium">Unfortunately, the page you are looking for could not be found.</p>
      <Link href="/" className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]">
        Return to the main page
      </Link>
    </div>
  );
}

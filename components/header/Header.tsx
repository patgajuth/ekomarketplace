"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Avatar from "../ui/Avatar";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { CartIcon } from "../icons";
import clsx from "clsx";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = !!session?.user;

  const linkBase = "transition-colors duration-200 hover:text-primary-700";
  const linkActive = "text-primary-700 font-semibold";

  return (
    <header className="flex flex-col gap-y-8 px-4 sm:px-8 lg:px-10 py-6 max-w-[1440px] mx-auto w-full eco-surface rounded-3xl mt-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Logo size="primary" />
        </Link>

        {isLoading ? null : isLoggedIn ? (
          <div className="flex items-center gap-x-7">
            <button
              onClick={() => router.push("/cart")}
              className={clsx(
                "flex justify-center items-center w-9 h-9 cursor-pointer rounded-full",
                "bg-[var(--color-tile)] text-[var(--textColor-secondary)] border border-[var(--color-border-primary)]",
                "transition-all duration-200 hover:bg-[var(--color-primary-50)] hover:border-primary-200 hover:shadow-md",
                "active:bg-[var(--color-primary-100)]"
              )}
            >
              <CartIcon />
            </button>
            <Link href="/profile">
              <Avatar />
            </Link>
          </div>
        ) : (
          <Button onClick={() => router.push("/login")} buttonStyle="fill">
            Zaloguj się
          </Button>
        )}
      </div>

      {isLoggedIn && (
        <nav className="flex gap-x-8 textM font-medium bg-[var(--color-eco-mist)]/70 border border-[var(--color-border-primary)] rounded-full px-6 py-2 w-max">
          <Link href="/" className={clsx(linkBase, pathname === "/" && linkActive)}>
            Start
          </Link>
          <Link href="/products" className={clsx(linkBase, pathname === "/products" && linkActive)}>
            Produkty
          </Link>
        </nav>
      )}
      <hr className="text-[var(--color-border-secondary)]" />
    </header>
  );
};

export default Header;

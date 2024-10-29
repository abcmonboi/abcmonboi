"use client";

import React from "react";

import { MoonStars, Sun, ChatDots } from "@phosphor-icons/react";

import Link from "next/link";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="header__controls flex justify-end">
      <button
        id="color-switcher"
        className="color-switcher header__switcher btn"
        type="button"
        role="switch"
        aria-label="light/dark mode"
        aria-checked="true"
        onClick={toggleTheme}
      >
        <em />
        <Sun
          className="absolute scale-0 transition-all dark:rotate-0 dark:scale-100 "
          weight="bold"
        />
        <MoonStars
          className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          weight="bold"
        />
      </button>

      <Link
        id="notify-trigger"
        className="header__trigger btn"
        href="mailto:example@example.com?subject=Message%20from%20your%20site"
      >
        <span className="trigger__caption ">{`Let's Talk`}</span>
        <div className="wrap-icon">
          <ChatDots weight="bold" />
        </div>
      </Link>
    </div>
  );
};

export default ModeToggle;

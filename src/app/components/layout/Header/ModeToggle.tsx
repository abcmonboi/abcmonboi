"use client";

import React, { useEffect, useState } from "react";

import { MoonStars, Sun, ChatDots } from "@phosphor-icons/react/dist/ssr";

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
        <div>
             <Sun weight="bold" className="absolute scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <MoonStars weight="bold" className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </div>
      </button>
      <Link
        id="notify-trigger"
        className="header__trigger btn"
        href="mailto:example@example.com?subject=Message%20from%20your%20site"
      >
        <span className="trigger__caption">{`Let's Talk`}</span>
        <ChatDots weight="bold" />
      </Link>
    </div>
  );
};

export default ModeToggle;

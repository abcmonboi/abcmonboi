"use client";

import React, { useEffect, useState } from "react";

import { MoonStars, Sun, ChatDots } from "@phosphor-icons/react/dist/ssr";

import Link from "next/link";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    setTheme(theme === "dark" ? "light" : "dark");
    setCurrentTheme(theme === "dark" ? "light" : "dark");
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
          {currentTheme === "dark" ? (
            <Sun weight="bold" />
          ) : (
            <MoonStars weight="bold" />
          )}
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

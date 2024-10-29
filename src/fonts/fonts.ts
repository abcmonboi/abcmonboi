import localFont from "next/font/local";

export const syne = localFont({
  src: [
    {
      path: "./Syne-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./Syne-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Syne-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Syne-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Syne-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-syne",
});

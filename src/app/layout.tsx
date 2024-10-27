import type { Metadata } from "next";
import { syne } from "@/app/fonts/fonts";
import "./globals.css";

import MainLayOut from "@/app/components/layout/MainLayOut";
import { ThemeProvider } from "@/app/components/theme-provider";

export const metadata: Metadata = {
  title: "AB - Personal Portfolio & Resume HTML Template",
  description:
    "Show yourself brightly with Braxton - unique and creative portfolio and resume template!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers no-applicationcache svg inlinesvg smil svgclippaths lenis lenis-smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${syne.className} `}>
        <ThemeProvider
          attribute="color-scheme"
          defaultTheme="dark"
          enableSystem
          enableColorScheme
        >
          <MainLayOut>{children}</MainLayOut>
        </ThemeProvider>
      </body>
    </html>
  );
}

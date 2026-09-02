"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gaPageView } from "@/lib/analytics/google-analytics";

/** Sends page_view on App Router navigations (initial load + client transitions). */
export function GoogleAnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    gaPageView(pathname);
  }, [pathname]);

  return null;
}

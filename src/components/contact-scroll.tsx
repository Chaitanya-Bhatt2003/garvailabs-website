"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToRequest() {
  const el = document.getElementById("request");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Scrolls to the request form when arriving via /contact#request (Next.js client nav). */
export function ContactRequestScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/contact" || window.location.hash !== "#request") return;
    const id = window.requestAnimationFrame(scrollToRequest);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#request") scrollToRequest();
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return null;
}

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { prefersWebCompose } from "@/lib/mailto";
import { site } from "@/lib/site";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * Company email link:
 * - Desktop → Gmail web compose (Chrome/Brave often have no mailto handler)
 * - Phone → mailto: opens the native mail / Gmail app
 */
export function CompanyEmailLink({ className, children }: Props) {
  const [useWebCompose, setUseWebCompose] = useState(true);

  useEffect(() => {
    setUseWebCompose(prefersWebCompose());
  }, []);

  if (useWebCompose) {
    return (
      <a
        href={site.gmailHref}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={site.mailtoHref} className={className}>
      {children}
    </a>
  );
}

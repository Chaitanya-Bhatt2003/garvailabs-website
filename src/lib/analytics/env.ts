/** Analytics run in production; opt in on localhost via NEXT_PUBLIC_ANALYTICS_ENABLE_DEV=true */
export function isAnalyticsEnvironment(): boolean {
  if (process.env.NODE_ENV === "production") return true;
  return (
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLE_DEV === "true" ||
    process.env.NEXT_PUBLIC_CLARITY_ENABLE_DEV === "true"
  );
}

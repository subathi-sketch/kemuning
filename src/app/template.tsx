"use client";

import { MotionConfig } from "motion/react";

/**
 * Honours the visitor's reduced-motion setting for every animation. It deliberately adds no entrance
 * fade of its own: a wrapper that starts at opacity 0 hides the server-rendered page until the
 * scripts load, which delays the largest paint and hides the content from crawlers that do not run them.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

"use client";

import { createContext, type RefObject } from "react";

/**
 * The home page scrolls sideways inside a container element. Components that animate with scroll
 * (parallax, reveals) read that container from here; elsewhere it is `null` and the window scrolls.
 */
export const ScrollRootContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

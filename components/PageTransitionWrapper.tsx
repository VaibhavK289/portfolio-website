"use client";

import { ReactNode } from "react";
import { PageTransition } from "@/components/animations";

interface PageTransitionWrapperProps {
  children: ReactNode;
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return <PageTransition>{children}</PageTransition>;
}

"use client";

import { useAnimations } from "@/animations/useAnimations";

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAnimations();
  return <>{children}</>;
}

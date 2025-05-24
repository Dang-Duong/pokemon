"use client";

import { useAnimations } from "@/src/app/animations/useAnimations";

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAnimations();
  return <>{children}</>;
}

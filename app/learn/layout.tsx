import type { ReactNode } from "react";
import { LearnPrefsProvider } from "@/components/LearnPrefsProvider";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearnPrefsProvider>{children}</LearnPrefsProvider>;
}

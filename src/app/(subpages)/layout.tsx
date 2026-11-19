import { SubpageShell } from "@/components/site/sub/SubpageShell";

export default function SubpagesLayout({ children }: { children: React.ReactNode }) {
  return <SubpageShell>{children}</SubpageShell>;
}

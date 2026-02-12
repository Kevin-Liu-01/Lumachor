import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Lumachor - Context Engine for AI | Studio-Quality Outputs",
  description:
    "The world's first Context Engine. Pick a use case or describe your need—Lumachor injects bulletproof context into every AI conversation. Works with OpenAI, Anthropic, and more.",
  openGraph: {
    title: "Lumachor - Context Engine for AI | Studio-Quality Outputs",
    description:
      "The world's first Context Engine. Pick a use case or describe your need—Lumachor injects bulletproof context into every AI conversation.",
    url: "https://lumachor.vercel.app/home",
  },
  alternates: {
    canonical: "https://lumachor.vercel.app/home",
  },
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>;
}

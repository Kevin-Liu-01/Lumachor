import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/seo";

export const experimental_ppr = true;

const homeTitle = "Lumachor - Context Engine for AI | Studio-Quality Outputs";
const homeDescription =
  "The world's first Context Engine. Pick a use case or describe your need\u2014Lumachor injects bulletproof context into every AI conversation. Works with OpenAI, Anthropic, and more.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: homeTitle,
    description: homeDescription,
    url: `${SITE_URL}/home`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Context Engine for AI`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [OG_IMAGE],
    creator: "@lumachor",
    site: "@lumachor",
  },
  alternates: {
    canonical: `${SITE_URL}/home`,
  },
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>;
}

import { cookies } from 'next/headers';
import { auth } from '../(auth)/auth';
import type { Metadata } from 'next';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: 'Context Library',
  description:
    'Browse and manage your AI contexts. Search, star, and organize bulletproof contexts for OpenAI, Anthropic, and other LLMs.',
};

export default async function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  // same cookie you use elsewhere to remember collapsed state
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={session?.user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

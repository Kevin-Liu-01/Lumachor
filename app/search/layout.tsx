import { cookies } from 'next/headers';
import { auth } from '../(auth)/auth';
import type { Metadata } from 'next';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: 'Search Chats',
  description:
    'Search across your AI conversation history. Find any chat by title or message content.',
};

export default async function SearchLayout({
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

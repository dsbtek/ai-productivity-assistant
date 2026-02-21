import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { UsageChart } from '@/components/usage-chart';
import { StatsCards } from '@/components/stats-cards';
import { RecentActivity } from '@/components/recent-activity';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const [usage, emailSummaries, codeAnalyses, qaInteractions] = await Promise.all([
    prisma.usage.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30,
    }),
    prisma.emailSummary.count({ where: { userId } }),
    prisma.codeAnalysis.count({ where: { userId } }),
    prisma.qAInteraction.count({ where: { userId } }),
  ]);

  const totalTokens = usage.reduce((sum: number, u: any) => sum + u.tokensUsed, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <StatsCards
        emailCount={emailSummaries}
        codeCount={codeAnalyses}
        qaCount={qaInteractions}
        totalTokens={totalTokens}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageChart data={usage} />
        <RecentActivity userId={userId} />
      </div>
    </div>
  );
}
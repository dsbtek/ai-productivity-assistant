import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Mail, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-3xl -mt-64 -mr-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-3xl -mb-64 -ml-64 pointer-events-none" />

      <main className="z-10 container mx-auto flex flex-col items-center justify-center px-4 text-center py-20 min-h-screen">
        <div className="inline-flex items-center rounded-full border border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 px-4 py-1.5 text-sm font-medium mb-12 backdrop-blur-md shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-3 animate-pulse" />
          Powered by Local Ollama & Cloud LLMs
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mb-8 leading-[1.1]">
          Supercharge your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">productivity</span> with Agentic AI.
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
          The ultimate workspace assistant. Summarize emails, explain complex codebases, and interact with private LLMs securely right from your own machine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24 w-full justify-center px-4">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 text-white border-0">
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a href="#" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-base font-medium border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-1">
              View Source
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <FeatureCard
            icon={<Mail className="w-8 h-8 text-blue-500 dark:text-blue-400" />}
            title="Email Summarizer"
            description="Extract key points and action items from lengthy email threads in seconds so you can clear your inbox faster."
          />
          <FeatureCard
            icon={<Code2 className="w-8 h-8 text-purple-500 dark:text-purple-400" />}
            title="Code Analysis"
            description="Understand undocumented code and find bugs with powerful LLM explanations embedded directly into your workflow."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-green-500 dark:text-green-400" />}
            title="100% Private"
            description="Run models locally using Ollama. Zero data leaves your machine, ensuring your intellectual property stays yours."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 backdrop-blur-sm">
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}

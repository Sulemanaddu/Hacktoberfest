import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThreeBackground from '@/components/ThreeBackground';
import { GitBranch, ArrowRight } from 'lucide-react';

const Index = () => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleAnalyze = () => {
    if (repoUrl.trim()) {
      console.log('Analyzing repository:', repoUrl);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 md:px-6">
        <div className="w-full max-w-2xl space-y-8 md:space-y-12">
          <div className="space-y-4 text-center md:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm md:px-6 md:py-2.5">
              <GitBranch className="h-4 w-4 text-primary md:h-5 md:w-5" />
              <span className="text-xs font-medium text-muted-foreground md:text-sm">
                For Open Source Beginnings
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              FirstPatch
            </h1>
            
            <p className="mx-auto max-w-xl text-base text-muted-foreground md:text-lg lg:text-xl">
              Discover easy and meaningful ways to contribute to open-source projects with AI-powered insights
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-primary/30 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
              <Input
                type="url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="relative h-12 border-border bg-card/80 text-sm backdrop-blur-sm placeholder:text-muted-foreground/60 md:h-14 md:text-base"
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            
            <Button
              onClick={handleAnalyze}
              disabled={!repoUrl.trim()}
              className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 md:h-14 md:text-lg"
            >
              Analyze Repository
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4 text-center text-sm text-muted-foreground md:grid-cols-3 md:gap-6 md:pt-8">
            <div className="rounded-lg border border-border/50 bg-card/30 p-4 backdrop-blur-sm md:p-6">
              <div className="font-semibold text-foreground">Smart Analysis</div>
              <div className="mt-1 text-xs md:text-sm">AI examines code & docs</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card/30 p-4 backdrop-blur-sm md:p-6">
              <div className="font-semibold text-foreground">Easy Issues</div>
              <div className="mt-1 text-xs md:text-sm">Find beginner tasks</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card/30 p-4 backdrop-blur-sm md:p-6">
              <div className="font-semibold text-foreground">Quick Start</div>
              <div className="mt-1 text-xs md:text-sm">Begin contributing today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

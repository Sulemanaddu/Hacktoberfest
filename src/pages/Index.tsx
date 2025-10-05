import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import ThreeBackground from '@/components/ThreeBackground';
import { GitBranch, ArrowRight, Loader2, Github, Clock, FileCode, Lightbulb } from 'lucide-react';

interface Suggestion {
  title: string;
  description: string;
  difficulty: string;
  type: string;
  files: string[];
  estimatedTime: string;
}

interface AnalysisResult {
  repository: {
    owner: string;
    name: string;
    description: string;
    stars: number;
    language: string;
    url: string;
  };
  suggestions: Suggestion[];
}

const Index = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: 'Invalid input',
        description: 'Please enter a GitHub repository URL',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-repo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ repoUrl }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze repository');
      }

      const data = await response.json();
      setResult(data);

      toast({
        title: 'Analysis complete!',
        description: `Found ${data.suggestions.length} contribution opportunities`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Analysis failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'documentation':
        return '📝';
      case 'code':
        return '💻';
      case 'testing':
        return '🧪';
      case 'ui':
        return '🎨';
      case 'config':
        return '⚙️';
      default:
        return '✨';
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ThreeBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 py-8 md:px-6">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center md:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm md:px-6 md:py-2.5">
              <GitBranch className="h-4 w-4 text-primary md:h-5 md:w-5" />
              <span className="text-xs font-medium text-muted-foreground md:text-sm">
                For Open Source Beginnings
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              FirstPatch
            </h1>

            <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base lg:text-lg">
              Discover easy and meaningful ways to contribute to open-source projects with AI-powered insights
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-3 md:space-y-4">
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-primary/30 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
              <Input
                type="url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                disabled={isAnalyzing}
                className="relative h-12 border-border bg-card/80 text-sm backdrop-blur-sm placeholder:text-muted-foreground/60 md:h-14 md:text-base"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!repoUrl.trim() || isAnalyzing}
              className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 md:h-14 md:text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin md:h-5 md:w-5" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Repository
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </>
              )}
            </Button>
          </div>

          {/* Feature Cards (only show when no results) */}
          {!result && (
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
          )}

          {/* Results Section */}
          {result && (
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              {/* Repository Info Card */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                        <Github className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="break-all">
                          {result.repository.owner}/{result.repository.name}
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-2 text-sm md:text-base">
                        {result.repository.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="self-start">
                      ⭐ {result.repository.stars}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Suggestions */}
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
                  <Lightbulb className="h-5 w-5 text-primary md:h-6 md:w-6" />
                  Contribution Opportunities
                </h2>

                <div className="grid gap-4">
                  {result.suggestions.map((suggestion, index) => (
                    <Card
                      key={index}
                      className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex flex-wrap items-start gap-3">
                          <span className="text-2xl">{getTypeIcon(suggestion.type)}</span>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base md:text-lg">
                              {suggestion.title}
                            </CardTitle>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className={getDifficultyColor(suggestion.difficulty)}>
                              {suggestion.difficulty}
                            </Badge>
                            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                              {suggestion.type}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground md:text-base">
                          {suggestion.description}
                        </p>

                        {suggestion.files && suggestion.files.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <FileCode className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Files:</span>
                            {suggestion.files.slice(0, 3).map((file, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {file}
                              </Badge>
                            ))}
                            {suggestion.files.length > 3 && (
                              <span className="text-muted-foreground">+{suggestion.files.length - 3} more</span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Est. time: {suggestion.estimatedTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

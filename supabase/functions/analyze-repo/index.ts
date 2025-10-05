import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { repoUrl } = await req.json();
    
    if (!repoUrl) {
      return new Response(
        JSON.stringify({ error: 'Repository URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse GitHub URL
    const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repoUrl.match(urlPattern);
    
    if (!match) {
      return new Response(
        JSON.stringify({ error: 'Invalid GitHub URL format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const [, owner, repo] = match;
    const repoName = repo.replace(/\.git$/, '');

    const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!GITHUB_TOKEN || !LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing repository: ${owner}/${repoName}`);

    // Fetch repository data from GitHub
    const headers = {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    };

    // Get repository info
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}`,
      { headers }
    );

    if (!repoResponse.ok) {
      const error = await repoResponse.text();
      console.error('GitHub API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch repository data' }),
        { status: repoResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const repoData = await repoResponse.json();

    // Get README
    let readmeContent = '';
    try {
      const readmeResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/readme`,
        { headers }
      );
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();
        readmeContent = atob(readmeData.content);
      }
    } catch (e) {
      console.log('No README found or error fetching it:', e);
    }

    // Get languages
    const languagesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/languages`,
      { headers }
    );
    const languages = languagesResponse.ok ? await languagesResponse.json() : {};

    // Get recent issues (to understand what kind of issues exist)
    const issuesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/issues?state=open&per_page=10`,
      { headers }
    );
    const issues = issuesResponse.ok ? await issuesResponse.json() : [];

    // Get repository structure (top-level files and folders)
    const contentsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/contents`,
      { headers }
    );
    const contents = contentsResponse.ok ? await contentsResponse.json() : [];

    // Prepare context for AI
    const repoContext = {
      name: repoData.name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      language: repoData.language,
      languages: Object.keys(languages).join(', '),
      readme: readmeContent.substring(0, 3000), // Limit README size
      openIssues: repoData.open_issues_count,
      existingIssues: issues.slice(0, 5).map((issue: any) => ({
        title: issue.title,
        labels: issue.labels.map((l: any) => l.name)
      })),
      structure: contents.slice(0, 20).map((item: any) => item.name).join(', '),
    };

    // Use Lovable AI (Gemini) to analyze and suggest contributions
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are FirstPatch AI, an expert at analyzing open-source repositories and suggesting beginner-friendly contribution opportunities. 
Your task is to analyze the repository and provide 5-7 actionable, beginner-friendly suggestions for first-time contributors.

Focus on:
- Documentation improvements (fixing typos, clarifying instructions, adding examples)
- Code cleanup (removing console.logs, fixing comments, improving variable names)
- Small feature additions (adding unit tests, improving error messages)
- UI/UX improvements (accessibility, responsive design tweaks)
- Configuration improvements (adding missing config files, updating dependencies)

Each suggestion should be:
- Specific and actionable
- Beginner-friendly (requiring minimal context)
- Low risk (unlikely to break existing functionality)
- Clearly explained with context

Return your response as a JSON array of suggestions with this structure:
[
  {
    "title": "Brief descriptive title",
    "description": "Detailed explanation of what needs to be done and why",
    "difficulty": "easy|medium",
    "type": "documentation|code|testing|ui|config",
    "files": ["list", "of", "relevant", "files"],
    "estimatedTime": "15-30 minutes"
  }
]`
          },
          {
            role: 'user',
            content: `Analyze this GitHub repository and suggest beginner-friendly contribution opportunities:

Repository: ${owner}/${repoName}
Description: ${repoContext.description || 'No description provided'}
Main Language: ${repoContext.language}
Languages Used: ${repoContext.languages}
Stars: ${repoContext.stars}
Open Issues: ${repoContext.openIssues}

README (first 3000 chars):
${repoContext.readme || 'No README found'}

Project Structure:
${repoContext.structure}

Existing Issues (sample):
${JSON.stringify(repoContext.existingIssues, null, 2)}

Please provide 5-7 specific, beginner-friendly contribution suggestions as a JSON array.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      const aiError = await aiResponse.text();
      console.error('AI API error:', aiError);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate suggestions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;

    // Parse the AI response to extract JSON
    let suggestions;
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = aiContent.match(/```json\n([\s\S]*?)\n```/) || 
                       aiContent.match(/\[([\s\S]*)\]/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        suggestions = JSON.parse(jsonStr);
      } else {
        suggestions = JSON.parse(aiContent);
      }
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      console.log('AI Response:', aiContent);
      
      // Fallback: return raw content
      suggestions = [{
        title: "Analysis Complete",
        description: aiContent,
        difficulty: "easy",
        type: "general",
        files: [],
        estimatedTime: "Varies"
      }];
    }

    return new Response(
      JSON.stringify({
        repository: {
          owner,
          name: repoName,
          description: repoData.description,
          stars: repoData.stargazers_count,
          language: repoData.language,
          url: repoData.html_url
        },
        suggestions
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-repo function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});


# FirstPatch - AI-Powered Open Source Contribution Platform

![GitHub repo size](https://img.shields.io/github/repo-size/Sulemanaddu/Hacktoberfest) 
![GitHub issues](https://img.shields.io/github/issues/Sulemanaddu/Hacktoberfest) 
![GitHub stars](https://img.shields.io/github/stars/Sulemanaddu/Hacktoberfest) 
![License](https://img.shields.io/github/license/Sulemanaddu/Hacktoberfest)

 **FirstPatch** is an AI-powered platform designed to help beginners find and contribute to open-source projects. It analyzes GitHub repositories and suggests beginner-friendly contribution opportunities with detailed explanations and estimated time requirements.

 **Live Demo:** [https://firstpatch.netlify.app/](https://firstpatch.netlify.app/)  
 **Detailed Documentation:** [https://deepwiki.com/Sulemanaddu/Hacktoberfest](https://deepwiki.com/Sulemanaddu/Hacktoberfest)

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Components](#components)
6. [API Functions](#api-functions)
7. [Setup Instructions](#setup-instructions)
8. [Environment Variables](#environment-variables)
9. [How It Works](#how-it-works)
10. [Deployment](#deployment)

---

## Project Overview
FirstPatch provides:  
-  **AI-powered repository analysis**  
-  Beginner-friendly contribution suggestions  
-  Detailed explanations of tasks  
-  Estimated time requirements  
-  Difficulty ratings for tasks  

---

## Architecture
Modern web architecture with:  
- **Frontend:** React + TypeScript + Vite  
- **Styling:** Tailwind CSS + shadcn/ui components  
- **State Management:** TanStack Query  
- **Backend:** Supabase Edge Functions  
- **AI Integration:** Gemini AI  
- **GitHub API:** Fetch repository info  

---

## Technology Stack

### Frontend
- **React**  
- **TypeScript**   
- **Vite**   
- **Tailwind CSS**   
- **shadcn/ui**   
- **Lucide React**   
- **TanStack Query**   
- **React Router DOM**   

### Backend & Services
- **Supabase**   
- **GitHub API**   
- **Gemini AI**   

### Dev Tools
- **ESLint**  
- **TypeScript ESLint**  
- **PostCSS**  
- **Autoprefixer**  

---

## Project Structure
```bash
FirstPatch/
├── backend/
│   ├── analyzers/
│   │   ├── docs_detector.py
│   │   ├── size_detector.py
│   │   ├── test_detector.py
│   │   └── todo_detector.py
│   ├── app.py
│   ├── github_client.py
│   ├── requirements.txt
│   ├── store.py
│   └── worker.py
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── ui/
│   │   └── ThreeBackground.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/
│   │   └── utils.ts
│   └── pages/
│       ├── Index.tsx
│       └── NotFound.tsx
├── supabase/
│   ├── config.toml
│   └── functions/
│       └── analyze-repo/
│           └── index.ts
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── README.md
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
````

---

## Components

### Main Components

#### `App.tsx`

* Wraps the app with `QueryClientProvider` for TanStack Query
* Provides `TooltipProvider` for tooltips
* Sets up routing with React Router DOM
* Includes toast notification providers

#### `Index.tsx` (`src/pages/Index.tsx`)

* Repository URL input field
* Analysis button with loading state
* Repository information display
* Contribution suggestions with detailed cards
* Difficulty and type badges
* Estimated time indicators
* Responsive design

#### `ThreeBackground.tsx`

* Animated particle system background
* Responsive design
* Smooth animation with `requestAnimationFrame`
* Canvas-based rendering

### UI Components (shadcn/ui)

Includes: Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toaster, Toggle, ToggleGroup, Tooltip, `useToast` hook

---

## API Functions

### Supabase Edge Function: `analyze-repo`

Located at `supabase/functions/analyze-repo/index.ts`

**Functionality:**

1. Validates GitHub URL format
2. Fetches repository info, README, languages, issues, and structure
3. Sends data to Gemini AI for analysis
4. Returns structured contribution suggestions

**Request Example:**

```json
{
  "repoUrl": "https://github.com/username/repository"
}
```

**Response Example:**

```json
{
  "repository": {
    "owner": "string",
    "name": "string",
    "description": "string",
    "stars": "number",
    "language": "string",
    "url": "string"
  },
  "suggestions": [
    {
      "title": "string",
      "description": "string",
      "difficulty": "easy|medium",
      "type": "documentation|code|testing|ui|config",
      "files": ["string"],
      "estimatedTime": "string"
    }
  ]
}
```

**AI Prompt Context:**

* Repository name, description, star count
* Languages used
* README content (first 3000 chars)
* Open issues and sample issues
* Top-level project structure

---

## Setup Instructions

### Prerequisites

* Node.js v18+
* npm, yarn, or bun
* GitHub account
* Supabase project access
* Gemini API key

### Installation

```bash
git clone <repository-url>
cd Hacktoberfest

# Install dependencies
npm install   # or yarn install or bun install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev   # or yarn dev or bun dev
```

Open in browser: [http://localhost:5173](http://localhost:5173)

### Scripts

* `npm run dev` – start dev server
* `npm run build` – build production version
* `npm run build:dev` – build development version
* `npm run lint` – check code with ESLint
* `npm run preview` – preview production build locally

---

## Environment Variables

**Frontend**

* `VITE_SUPABASE_URL`
* `VITE_SUPABASE_PUBLISHABLE_KEY`

**Supabase Edge Function**

* `GITHUB_TOKEN`
* `GEMINI_API`

---

## How It Works

1. User enters GitHub repo URL
2. App validates the URL
3. Sends URL to Supabase Edge Function
4. Function fetches repo data from GitHub API
5. Sends data to Gemini AI
6. AI generates contribution suggestions
7. Suggestions are returned in structured format
8. Frontend displays repository info and suggestions

**Categories:** Documentation, Code, Testing, UI, Config
**Difficulty:** Easy, Medium

---

## Deployment

### Manual Deployment

* Build app: `npm run build`
* Deploy `dist` folder to hosting platform
* Configure environment variables
* Deploy Supabase Edge Functions via CLI



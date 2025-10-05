# 🚀 FirstPatch - AI-Powered Open Source Contribution Platform

![GitHub repo size](https://img.shields.io/github/repo-size/Sulemanaddu/Hacktoberfest) ![GitHub issues](https://img.shields.io/github/issues/Sulemanaddu/Hacktoberfest) ![GitHub stars](https://img.shields.io/github/stars/Sulemanaddu/Hacktoberfest) ![License](https://img.shields.io/github/license/Sulemanaddu/Hacktoberfest)  

✨ **FirstPatch** is an AI-powered platform designed to help beginners find and contribute to open-source projects. It analyzes GitHub repositories and suggests beginner-friendly contribution opportunities with detailed explanations and estimated time requirements.

---

## 📌 Table of Contents
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

## 📝 Project Overview
FirstPatch provides:

- 🤖 **AI-powered repository analysis**  
- 🧩 Beginner-friendly contribution suggestions  
- 📖 Detailed explanations of tasks  
- ⏱ Estimated time requirements  
- 🌟 Difficulty ratings for tasks  

---

## 🏗 Architecture
Modern web architecture with:

- **Frontend:** React + TypeScript + Vite  
- **Styling:** Tailwind CSS + shadcn/ui components  
- **State Management:** TanStack Query  
- **Backend:** Supabase Edge Functions  
- **AI Integration:** Lovable AI (Gemini)  
- **GitHub API:** Fetch repository info  

---

## 🛠 Technology Stack

### Frontend
- **React** ⚛️  
- **TypeScript** 🟦  
- **Vite** ⚡  
- **Tailwind CSS** 🌬  
- **shadcn/ui** 🧩  
- **Lucide React** 🎨  
- **TanStack Query** 📡  
- **React Router DOM** 🛣  

### Backend & Services
- **Supabase** 🏢  
- **GitHub API** 🐱  
- **Lovable AI (Gemini)** 🤖  

### Dev Tools
- **ESLint**  
- **TypeScript ESLint**  
- **PostCSS**  
- **Autoprefixer**  

---

## 📁 Project Structure

```bash
first-path-ai/
├── .env
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
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
│   │   └── ThreeBackground.tsx
│   ├── components/ui/
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
├── supabase/
│   ├── config.toml
│   └── functions/
│       └── analyze-repo/
│           └── index.ts

## Components

### Main Components

#### `App.tsx`
The main application component that sets up routing, state management, and global providers:
- Wraps the application with QueryClientProvider for TanStack Query
- Provides TooltipProvider for tooltips
- Sets up routing with React Router DOM
- Includes toast notification providers

#### `Index.tsx` (src/pages/Index.tsx)
The main page component with the following features:
- Repository URL input field
- Analysis button with loading state
- Repository information display
- Contribution suggestions with detailed cards
- Difficulty and type badges
- Estimated time indicators
- Responsive design

#### `ThreeBackground.tsx`
An animated canvas background component that creates a particle system:
- Creates moving particles that connect when close to each other
- Responsive design that adapts to screen size
- Smooth animation using requestAnimationFrame
- Canvas-based rendering for performance

### UI Components (shadcn/ui)

The project uses shadcn/ui components which include:
- Accordion, Alert, AlertDialog
- AspectRatio, Avatar, Badge
- Breadcrumb, Button, Calendar
- Card, Carousel, Chart
- Checkbox, Collapsible, Command
- ContextMenu, Dialog, Drawer
- DropdownMenu, Form
- HoverCard, Input, InputOTP
- Label, Menubar, NavigationMenu
- Pagination, Popover, Progress
- RadioGroup, Resizable, ScrollArea
- Select, Separator, Sheet
- Sidebar, Skeleton, Slider
- Sonner, Switch, Table
- Tabs, Textarea, Toast, Toaster
- Toggle, ToggleGroup, Tooltip
- UseToast hook

## API Functions

### Supabase Edge Function: `analyze-repo`

Located at `supabase/functions/analyze-repo/index.ts`, this function performs the core functionality of the application:

#### Functionality:
1. **Repository Validation**: Validates GitHub URL format
2. **GitHub API Integration**: Fetches repository information, README, languages, issues, and structure
3. **AI Analysis**: Sends repository context to Lovable AI for analysis
4. **Response Generation**: Formats AI suggestions into structured data

#### Request Format:
```json
{
  "repoUrl": "https://github.com/username/repository"
}
```

#### Response Format:
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

#### AI Prompt Context:
The function sends repository information to the AI including:
- Repository name, description, and star count
- Primary language and all languages used
- README content (first 3000 characters)
- Open issues count and sample issues
- Project structure (top-level files and folders)

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, or bun
- GitHub account
- Access to Supabase project
- Access to Lovable AI service

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd first-path-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env` and fill in the required values (see Environment Variables section)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open the application**
   Visit `http://localhost:5173` in your browser

### Development Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the production version
- `npm run build:dev`: Builds the development version
- `npm run lint`: Runs ESLint to check for code issues
- `npm run preview`: Locally preview the production build

## Environment Variables

The application requires the following environment variables in a `.env` file:

- `VITE_SUPABASE_URL`: The URL of your Supabase project
- `VITE_SUPABASE_PUBLISHABLE_KEY`: The public API key for your Supabase project

The Supabase Edge Function requires:
- `GITHUB_TOKEN`: GitHub personal access token for API requests
- `GEMINI_API`: API key for the Gemini AI service

## How It Works

1. **User Input**: User enters a GitHub repository URL in the input field
2. **Validation**: The application validates the URL format
3. **API Request**: The frontend sends the repository URL to the Supabase Edge Function
4. **Repository Analysis**: The function fetches repository data from GitHub API
5. **AI Processing**: The repository data is sent to the Lovable AI service
6. **Suggestion Generation**: AI analyzes the repository and generates contribution suggestions
7. **Response Formatting**: The suggestions are formatted into structured data
8. **Display**: The frontend displays the repository information and contribution suggestions

### Contribution Suggestion Categories

The AI generates suggestions in the following categories:
- **Documentation**: Improving README, code comments, or documentation
- **Code**: Small code improvements, bug fixes, or refactoring
- **Testing**: Adding or improving unit tests
- **UI**: User interface improvements or accessibility enhancements
- **Config**: Configuration file improvements

### Difficulty Levels

Suggestions are categorized by difficulty:
- **Easy**: Tasks requiring minimal context and low risk of breaking functionality
- **Medium**: Tasks requiring some context but still approachable for beginners

## Deployment

The application can be deployed to various platforms:

### Manual Deployment
- Build the application using `npm run build`
- Deploy the `dist` folder to your preferred hosting platform
- Ensure environment variables are properly configured in the deployment environment
- For Supabase Edge Functions, deploy using the Supabase CLI

### Custom Domain
- Custom domains can be connected through the Lovable platform
- Navigate to Project > Settings > Domains and click Connect Domain

# FirstPatch - AI-Powered Open Source Contribution Platform

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

## Project Overview

FirstPatch is an AI-powered platform designed to help beginners find and contribute to open-source projects. The application analyzes GitHub repositories and suggests beginner-friendly contribution opportunities with detailed explanations and estimated time requirements.

The platform provides:
- Repository analysis using AI
- Beginner-friendly contribution suggestions
- Detailed explanations of tasks
- Estimated time requirements
- Difficulty ratings for tasks

## Architecture

FirstPatch follows a modern web application architecture with:
- Frontend: React/TypeScript with Vite
- Styling: Tailwind CSS with shadcn/ui components
- State Management: TanStack Query for server state
- Backend: Supabase Edge Functions
- AI Integration: Lovable AI (Gemini) for repository analysis

The application communicates with GitHub's API to fetch repository information and uses an AI service to analyze the repository and suggest contribution opportunities.

## Technology Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible UI components
- **Lucide React**: Icon library
- **TanStack Query**: Server state management
- **React Router DOM**: Client-side routing

### Backend & Services
- **Supabase**: Backend-as-a-Service (authentication, database, edge functions)
- **GitHub API**: For fetching repository data
- **Lovable AI (Gemini)**: AI service for repository analysis

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: ESLint plugin for TypeScript
- **PostCSS**: CSS processing tool
- **Autoprefixer**: CSS vendor prefixing

## Project Structure

```
first-path-ai/
├── .env                    # Environment variables
├── .gitignore             # Git ignore patterns
├── bun.lockb              # Bun lock file
├── components.json        # shadcn/ui configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project README
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.app.json      # TypeScript app configuration
├── tsconfig.json          # Main TypeScript configuration
├── tsconfig.node.json     # TypeScript node configuration
├── vite.config.ts         # Vite configuration
├── public/                # Static assets
│   ├── favicon.ico        # Favicon
│   ├── placeholder.svg    # Placeholder image
│   └── robots.txt         # Robots exclusion file
├── src/                   # Source code
│   ├── App.css            # Global styles
│   ├── App.tsx            # Main application component
│   ├── index.css          # CSS imports and base styles
│   ├── main.tsx           # Application entry point
│   ├── vite-env.d.ts      # Vite environment types
│   ├── components/        # Reusable UI components
│   │   └── ThreeBackground.tsx # Animated background component
│   ├── components/ui/     # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # External service integrations
│   │   └── supabase/      # Supabase integration
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Main page (home page)
│   │   └── NotFound.tsx   # 404 page
├── supabase/              # Supabase configuration
│   ├── config.toml        # Supabase configuration
│   └── functions/         # Supabase Edge Functions
│       └── analyze-repo/  # Repository analysis function
│           └── index.ts   # Function implementation
```

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

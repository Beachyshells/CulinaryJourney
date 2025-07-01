# CookingStory - AI-Powered Recipe Platform

## Overview

CookingStory is a full-stack web application that creates personalized recipe experiences for children using AI technology. The platform allows parents to create child profiles and generate age-appropriate, themed recipe cards through an interactive AI interview process. The application features a modern React frontend with a Node.js/Express backend, PostgreSQL database, and OpenAI integration for recipe generation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom Shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state, React hooks for local state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express session with PostgreSQL session store
- **API**: RESTful API with structured error handling

### Database Design
- **Provider**: Neon PostgreSQL (serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Tables**: 
  - Users (Replit Auth integration)
  - Children (user profiles for kids)
  - Recipes (generated recipe data)
  - Recipe Interviews (AI interview sessions)
  - Sessions (authentication sessions)

## Key Components

### Authentication System
- Replit-based authentication using OpenID Connect
- Passport.js strategy for authentication flow
- Session-based authentication with PostgreSQL session storage
- User profile management with subscription tracking

### AI Recipe Generation
- OpenAI GPT-4o integration for recipe creation
- Interactive interview system with dynamic questions
- Age-appropriate content generation
- Recipe image generation capabilities
- Personalized recipe recommendations based on child preferences

### Theme System
- Three theme options: Girls (pink/purple), Boys (blue/green), and Neutral (warm colors)
- Custom CSS variables for dynamic theming
- Printable recipe card templates
- Responsive design for mobile and desktop

### User Management
- Child profile creation and management
- Age-based recipe recommendations
- Preference tracking and dietary restrictions
- Recipe favoriting and printing functionality

## Data Flow

1. **User Authentication**: Users authenticate via Replit Auth, creating or retrieving user profiles
2. **Child Profile Creation**: Parents create profiles for their children with age, gender, and preferences
3. **Recipe Interview**: AI conducts interactive interviews to understand recipe requirements
4. **Recipe Generation**: OpenAI generates personalized recipes based on interview responses
5. **Recipe Storage**: Generated recipes are stored with child associations and metadata
6. **Recipe Display**: Themed recipe cards are rendered with print-optimized layouts

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **openai**: AI recipe generation
- **passport**: Authentication middleware
- **express-session**: Session management
- **@tanstack/react-query**: Server state management

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **react-hook-form**: Form management
- **zod**: Schema validation

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- tsx for backend TypeScript execution
- Database migrations via Drizzle Kit
- Environment variable configuration

### Production Build
- Vite builds frontend to `dist/public`
- esbuild bundles backend to `dist/index.js`
- Static file serving via Express
- PostgreSQL connection pooling via Neon

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API access
- `SESSION_SECRET`: Session encryption key
- `REPLIT_DOMAINS`: Authentication domain configuration

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 01, 2025. Initial setup
- July 01, 2025. Added gender-neutral theme option with warm colors (yellow/orange/green) for inclusive design
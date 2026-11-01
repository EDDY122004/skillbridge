# SkillBridge

SkillBridge is a web and mobile-first skills development and opportunity matching system designed for students, job seekers, freelancers, and beginners who want to build practical digital skills and discover opportunities that match their strengths.

## Project vision

The platform helps users to:
- create and manage personal profiles
- explore skill categories and related concepts
- access learning resources
- track skill development progress
- view opportunities and recommended roles
- identify missing skills and learning gaps

## Core features
- responsive landing page
- user dashboard
- skills exploration page
- dynamic skill detail pages
- opportunity matching logic
- admin overview page
- mock API for skill data access

## Tech stack
- Next.js
- TypeScript
- Tailwind CSS
- React
- Lucide Icons

## Local setup

```bash
npm install
npm run dev
```

Then visit:
- http://localhost:3000

## Main modules
- `/` — landing page
- `/explore` — skill discovery
- `/skills/[slug]` — concept and resource detail
- `/dashboard` — progress and opportunity match overview
- `/opportunities` — recommended jobs and roles
- `/profile` — learner profile
- `/admin` — system management overview

## Project development alignment

This implementation supports the final-year project objectives described in the proposal by covering:
- skill catalog formation
- related concept and resource organization
- user profiling and progress tracking
- opportunity matching logic
- responsive mobile-first interface design

## Future enhancements
- Supabase authentication and database integration
- secure role-based access for learners, providers, and admins
- real recommendation engine and skill matching filters
- conversation and mentoring modules
- mobile app packaging with PWA or native wrapper

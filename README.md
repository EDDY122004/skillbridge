# SkillBridge

SkillBridge is a mobile-first and web-based skills development and opportunity matching system designed for final-year project use.

## Overview
SkillBridge helps users discover practical skills, understand related concepts, access learning resources, track their progress, and match themselves to available opportunities. The system is designed for students, graduates, freelancers, and job seekers who want a more guided and practical learning experience.

## Key Features
- responsive landing page
- login and signup flow
- profile setup and editing
- skill exploration and detail pages
- learning resources and concept breakdowns
- progress tracking dashboard
- opportunity search and matching
- skill-gap analysis for learning improvement
- admin overview panel
- provider dashboard
- mobile-friendly bottom navigation
- PWA-ready metadata for app-like behavior

## Technology Stack
- Next.js
- TypeScript
- Tailwind CSS
- React
- Lucide Icons

## Run Locally
```bash
npm install
npm run dev
```

Then open:
- http://localhost:3000

## Main Pages
- `/` — landing page
- `/explore` — skills catalog
- `/skills/[slug]` — detailed skill page
- `/dashboard` — learner dashboard
- `/opportunities` — matched opportunities
- `/profile` — user profile management
- `/login` — login
- `/signup` — registration
- `/admin` — admin overview
- `/provider` — provider dashboard

## Demo Flow
1. Open the landing page.
2. Sign up or log in using the demo account.
3. Update the user profile and skills.
4. Explore available skills and learning resources.
5. Check dashboard progress and recommended opportunities.
6. View opportunities with match scores and missing skills.
7. Review provider and admin modules.

## Project Use Case
This prototype demonstrates a final-year project idea that solves the gap between learning and opportunity discovery. It brings together skill learning, progress monitoring, and career matching in a single system.

## Future Enhancements
- real database integration
- secure authentication and authorization
- role-based access control
- live CRUD operations for skills and opportunities
- deployment to Vercel or similar hosting
- AI-driven recommendation system
- mobile app packaging or PWA optimization

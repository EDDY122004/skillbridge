# SkillBridge setup and release checklist

## Local setup

1. Copy `.env.example` to `.env.local` and set your Supabase project URL and publishable/anon key. Never put a service-role key in a `NEXT_PUBLIC_*` variable or browser code.
2. In the Supabase SQL editor, run `supabase/schema.sql`.
3. Create or configure users in Supabase Auth. Newly registered users are learners by default; `requested_role` is only a request and is deliberately not trusted for authorization. Assign `app_metadata.role` to `provider` or `admin` only using a trusted administrator/server process. Admin/provider page access is enforced by middleware and database RLS.
4. Install and run: `npm install`, `npm run dev`.

## Database-backed features

- Auth uses Supabase email/password with SSR cookies.
- Middleware refreshes and verifies sessions and gates learner, provider, and admin areas.
- Profiles are stored per authenticated user with RLS.
- `/api/skills` reads the `skills` table when configured and serves prototype data when no Supabase env is present.
- `/api/opportunities` reads active records and allows approved providers/admins to submit pending listings.
- Tables and RLS policies for learner applications are included for the next UI iteration.

## Verification before deployment

- Run `npm run build` and `npm run lint` locally.
- Test signed-out redirects, learner access, provider approval, admin-only access, profile ownership, opportunity creation and RLS.
- Set the same two public Supabase environment variables in the deployment platform and configure Supabase Auth redirect URLs for the deployed domain.
- Verify email confirmation and password reset flows in the Supabase Auth settings.
- Do not use the former browser-stored demo passwords for real accounts. There is no client-side password storage or trusted role selection in the Supabase flow.

This repository's code changes cannot provision a Supabase project, set deployment secrets, or run the build in GitHub; complete those steps in the project owner account/CI.

# Plan: FitInAFart MVP - Complete Project Structure

Build a Next.js 16 fitness app with JWT auth and role-based routing. Below is the complete folder structure following Next.js App Router best practices, with `@/*` path aliases already configured.

## Target Folder Structure

```
fitinafart/
├── app/
│   ├── layout.tsx                    # Root layout (keep existing, add AuthProvider)
│   ├── globals.css                   # Global styles (keep existing)
│   ├── page.tsx                      # Login page (/) - CLIENT
│   │
│   ├── (protected)/                  # Route group for authenticated routes
│   │   ├── layout.tsx                # Auth guard layout - SERVER (checks JWT)
│   │   │
│   │   ├── register/
│   │   │   └── page.tsx              # Create users - CLIENT (Manager/PT only)
│   │   │
│   │   ├── clients/
│   │   │   └── page.tsx              # List clients - SERVER (PT only)
│   │   │
│   │   ├── new-program/
│   │   │   └── page.tsx              # Create workout program - CLIENT (PT only)
│   │   │
│   │   ├── new-exercise/
│   │   │   └── page.tsx              # Create exercise - CLIENT (PT only)
│   │   │
│   │   └── program/
│   │       ├── page.tsx              # List programs - SERVER (PT/Client)
│   │       └── [id]/
│   │           └── page.tsx          # Program details - SERVER (PT/Client)
│   │
│   └── api/                          # API routes for JWT cookie management
│       └── auth/
│           ├── login/route.ts        # POST: Set JWT cookie - SERVER
│           └── logout/route.ts       # POST: Clear JWT cookie - SERVER
│
├── components/
│   ├── forms/                        # Form components
│   │   ├── LoginForm.tsx             # CLIENT
│   │   ├── RegisterForm.tsx          # CLIENT
│   │   ├── ProgramForm.tsx           # CLIENT
│   │   └── ExerciseForm.tsx          # CLIENT
│   │
│   ├── layout/
│   │   └── Navbar.tsx                # CLIENT (needs auth state)
│   │
│   └── program/
│       ├── ProgramList.tsx           # SERVER
│       ├── ProgramCard.tsx           # SERVER
│       └── ExerciseItem.tsx          # SERVER
│
├── lib/
│   ├── api.ts                        # API client with base URL & auth headers
│   ├── auth.ts                       # JWT utilities (decode, get from cookie)
│   └── types.ts                      # TypeScript interfaces
│
├── context/
│   └── AuthContext.tsx               # CLIENT - Auth state provider
│
└── middleware.ts                     # Route protection middleware
```

## Steps

1. **Create lib utilities (~30min):** Add `lib/types.ts` with `User`, `Program`, `Exercise` interfaces. Create `lib/api.ts` with fetch wrapper using `33minators` prefix. Add `lib/auth.ts` for JWT decoding.

2. **Set up auth flow (~45min):** Create `app/api/auth/login/route.ts` to proxy login and set HTTP-only cookie. Add `context/AuthContext.tsx` and wrap app in `app/layout.tsx`. Create `middleware.ts` for route protection.

3. **Build login page (~30min):** Replace `app/page.tsx` with login form. Create `components/forms/LoginForm.tsx` as client component.

4. **Create protected layout (~20min):** Add `app/(protected)/layout.tsx` with auth check and `components/layout/Navbar.tsx` for navigation.

5. **Build PT pages (~1.5h):** Create `app/(protected)/register/page.tsx`, `app/(protected)/clients/page.tsx`, `app/(protected)/new-program/page.tsx`, `app/(protected)/new-exercise/page.tsx` with corresponding form components.

6. **Build program views (~45min):** Create `app/(protected)/program/page.tsx` and `app/(protected)/program/[id]/page.tsx` as server components fetching data.

## Files to Create (Priority Order)

| #   | File                                    | Type   | Purpose               |
| --- | --------------------------------------- | ------ | --------------------- |
| 1   | `lib/types.ts`                          | -      | TypeScript interfaces |
| 2   | `lib/api.ts`                            | -      | API fetch wrapper     |
| 3   | `lib/auth.ts`                           | -      | JWT utilities         |
| 4   | `context/AuthContext.tsx`               | Client | Auth state management |
| 5   | `app/api/auth/login/route.ts`           | Server | Login API route       |
| 6   | `app/api/auth/logout/route.ts`          | Server | Logout API route      |
| 7   | `middleware.ts`                         | Server | Route protection      |
| 8   | `components/forms/LoginForm.tsx`        | Client | Login form            |
| 9   | `app/page.tsx`                          | Client | Login page (replace)  |
| 10  | `components/layout/Navbar.tsx`          | Client | Navigation            |
| 11  | `app/(protected)/layout.tsx`            | Server | Protected wrapper     |
| 12  | `components/forms/RegisterForm.tsx`     | Client | Register form         |
| 13  | `app/(protected)/register/page.tsx`     | Client | Register page         |
| 14  | `app/(protected)/clients/page.tsx`      | Server | Clients list          |
| 15  | `components/forms/ProgramForm.tsx`      | Client | Program form          |
| 16  | `app/(protected)/new-program/page.tsx`  | Client | New program page      |
| 17  | `components/forms/ExerciseForm.tsx`     | Client | Exercise form         |
| 18  | `app/(protected)/new-exercise/page.tsx` | Client | New exercise page     |
| 19  | `app/(protected)/program/page.tsx`      | Server | Programs list         |
| 20  | `app/(protected)/program/[id]/page.tsx` | Server | Program details       |

## Server vs Client Components

| Component                   | Type       | Reason                        |
| --------------------------- | ---------- | ----------------------------- |
| Login/Register forms        | **Client** | Interactive forms, `useState` |
| `/clients` data display     | **Server** | SSR data fetch with JWT       |
| New program/exercise forms  | **Client** | Form interactions             |
| `/program`, `/program/[id]` | **Server** | SSR fetch, SEO                |
| Navbar                      | **Client** | Needs auth context            |

## Work Split for 2 Developers

### 🔵 Person A: Auth & Core Infrastructure

**Focus:** Authentication flow, shared utilities, login/register, and protected layout.

**Files to create (in order):**

- [x] `lib/types.ts` — Define all interfaces first (coordinate with B)
- [x] `lib/api.ts` — API wrapper - B will import this
- [x] `lib/auth.ts` — JWT utilities
- [x] **(is in auth.ts)** `context/AuthContext.tsx` — Auth state provider
- [x] `app/api/auth/login/route.ts` — Login API route
- [x]  `app/api/auth/logout/route.ts` — Logout API route
- [x] `proxy.ts` — Route protection
- [x] `components/forms/LoginForm.tsx` — Login form component
- [x] **changed to login.tsx - you’re redirected by the proxy when landing**`app/page.tsx` — Login page (replace existing)

**Estimated time:** ~2.5 hours

---

### 🟢 Person B: Feature Pages (Programs, Exercises, Clients)

**Focus:** All PT and Client feature pages. Wait for Person A to complete `lib/types.ts` and `lib/api.ts` first (~15min).

**Files to create (in order):**

- [ ] `components/forms/ProgramForm.tsx` — Program creation form
- [ ] `app/(protected)/new-program/page.tsx` — New program page
- [ ] `components/forms/ExerciseForm.tsx` — Exercise creation form
- [ ] `app/(protected)/new-exercise/page.tsx` — New exercise page
- [ ] `app/(protected)/clients/page.tsx` — Clients list (PT only)
- [ ] `components/program/ProgramCard.tsx` — Program display card
- [ ] `components/program/ExerciseItem.tsx` — Exercise display
- [x] `app/(protected)/program/page.tsx` — Programs list
- [x] `app/(protected)/program/[id]/page.tsx` — Program details

**Estimated time:** ~2.5 hours

---

### Coordination Points

1. **Sync at start:** Person A creates `lib/types.ts` first. Share interfaces before B starts.
2. **No conflicts:** A works in `lib/`, `context/`, `middleware.ts`, `app/page.tsx`, `app/api/`, `app/(protected)/layout.tsx`, `app/(protected)/register/`. B works only in `app/(protected)/clients/`, `app/(protected)/new-*`, `app/(protected)/program/`, and `components/program/`.
3. **Shared files to avoid editing simultaneously:**
   - `app/layout.tsx` - A wraps with AuthProvider
   - `components/layout/Navbar.tsx` - A creates, B can add links later
4. **Test together:** After ~2h, merge and test login → protected routes flow together.

---

### Timeline

| Time      | Person A                                | Person B                            |
| --------- | --------------------------------------- | ----------------------------------- |
| 0:00-0:15 | Create `lib/types.ts`, `lib/api.ts`     | Review API docs, plan forms         |
| 0:15-1:00 | Auth flow (routes, context, middleware) | Start `ProgramForm`, `ExerciseForm` |
| 1:00-1:30 | Login page + form                       | `new-program`, `new-exercise` pages |
| 1:30-2:00 | Protected layout + Navbar               | `clients` page                      |
| 2:00-2:30 | Register page + form                    | `program/` list + detail pages      |
| 2:30-3:00 | **SYNC: Merge & test together**         | **SYNC: Merge & test together**     |
| 3:00-4:00 | Bug fixes, polish                       | Bug fixes, polish                   |
| 4:00-5:00 | **Both:** Styling pass                  |
| 5:00-6:00 | **Both:** Deploy, record video, submit  |

---

## Further Considerations

1. **API Base URL:** You need the REST API endpoint URL. Add it to `.env.local` as `NEXT_PUBLIC_API_URL` or `API_URL` for server-only access.

2. **Role enum:** Define roles as `type Role = 'Manager' | 'PersonalTrainer' | 'Client'` in `types.ts` to match API responses.

3. **Skip UI components:** For MVP speed, skip the `components/ui/` folder and use plain HTML elements with Tailwind classes inline—create reusable components only in the final styling phase.

## Test Users (from README)

| Role             | Email                        | Password   |
| ---------------- | ---------------------------- | ---------- |
| Manager          | `33minators_boss@fitness.dk` | `asdfQWER` |
| Personal Trainer | `33minators_m@fit.dk`        | `aQ`       |
| Personal Trainer | `33minators_w@fit.dk`        | `aZ`       |
| Client           | `33minators_c1@fit.dk`       | `aA`       |
| Client           | `33minators_c2@fit.dk`       | `aA`       |

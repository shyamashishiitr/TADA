# TADA — Deep-Dive Research Report

> **Generated**: 2026-02-23  
> **Purpose**: Technology, UX, UI, AI & Monetization research for the TADA todo/productivity app  
> **Status**: Comprehensive analysis with actionable recommendations

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [UX Best Practices](#2-ux-best-practices)
3. [UI Design Trends 2025-2026](#3-ui-design-trends-2025-2026)
4. [AI Integration](#4-ai-integration)
5. [Monetization Strategy](#5-monetization-strategy)
6. [Final Recommended Stack](#6-final-recommended-stack)

---

## 1. Technology Stack

### 1.1 Frontend Framework: React vs Svelte vs SolidJS

#### React (v19+)
- **Ecosystem**: Unmatched. 16M+ weekly npm downloads. Largest library ecosystem in frontend.
- **Hiring**: Easiest to hire for. Dominant in job market.
- **Key features in React 19**: Server Components, Actions, `use()` hook, improved Suspense, document metadata support.
- **Bundle size**: ~6.4kB minified+gzipped (react + react-dom has grown, but tree-shaking helps).
- **Performance**: Virtual DOM adds overhead vs compiled frameworks, but React Compiler (formerly React Forget) in React 19 auto-memoizes, closing the gap significantly.
- **Best for**: Large teams, long-term projects, maximum library compatibility.

#### Svelte (v5 — "Runes")
- **Ecosystem**: Growing but still ~10x smaller than React's. Backed by Vercel.
- **Key features in Svelte 5**: Runes (fine-grained reactivity via `$state`, `$derived`, `$effect`), compiled output with no virtual DOM, smaller bundle sizes.
- **Bundle size**: Near-zero framework runtime. Components compile to vanilla JS. A typical Svelte app ships 30-60% less JS than equivalent React.
- **Performance**: Consistently top-tier in JS Framework Benchmark. No virtual DOM diffing.
- **DX**: Loved by developers — consistently ranked #1 in satisfaction surveys (State of JS).
- **Concern**: Smaller ecosystem. Fewer pre-built component libraries, especially for complex patterns like drag-and-drop.
- **Best for**: Performance-critical apps, small-to-medium teams, delightful DX.

#### SolidJS (v1.9+)
- **Ecosystem**: Smallest of the three. ~200K weekly downloads. Niche but passionate community.
- **Key features**: True fine-grained reactivity (no virtual DOM), JSX syntax (familiar to React devs), signals-based.
- **Bundle size**: ~7kB core, but extremely efficient updates.
- **Performance**: Fastest of all three in benchmarks. Raw DOM manipulation via fine-grained signals.
- **Concern**: Very small ecosystem. Limited component libraries. Harder to hire for. SolidStart (meta-framework) is still maturing.
- **Best for**: Maximum performance, small passionate teams, green-field projects.

#### 🏆 RECOMMENDATION: **React 19 with Next.js 15 (App Router)**

**Rationale**: For a product targeting real users with monetization goals, React's ecosystem dominance is decisive. The new React Compiler closes the performance gap with Svelte/Solid. Next.js 15 provides:
- Server Components for fast initial loads
- Excellent SEO for marketing/landing pages
- Edge runtime support
- Built-in image optimization
- Vercel deployment (or self-host)

**Alternative consideration**: If the team is small (1-3 devs) and wants maximum DX joy, Svelte 5 with SvelteKit is a compelling choice. The compiled output would give TADA a speed advantage that users can *feel*.

---

### 1.2 State Management: Zustand vs Jotai vs Redux Toolkit

#### Zustand (v5.x) — ⭐ 49K+ GitHub stars
- **Size**: ~1.1kB minified+gzipped
- **Philosophy**: Simplified Flux. Single store with hooks. No providers needed.
- **API**: `create((set, get) => ({...}))` — dead simple.
- **Strengths**:
  - No boilerplate
  - No context providers (avoids re-render issues)
  - Handles zombie child problem, React concurrency, context loss
  - Middleware system (persist, devtools, immer, subscribeWithSelector)
  - `persist` middleware is perfect for local-first: saves to localStorage/IndexedDB automatically
  - Transient updates (update without re-render) for real-time features
- **Weaknesses**: Less granular than atomic models for very large state trees.

#### Jotai (v2.x) — ⭐ 19K+ GitHub stars  
- **Size**: ~2kB core minified+gzipped
- **Philosophy**: Atomic state management (inspired by Recoil, but better). Bottom-up approach.
- **API**: `atom()` + `useAtom()` — feels like `useState` but global and derivable.
- **Strengths**:
  - Extremely granular re-renders (each atom independent)
  - Derived atoms: `atom((get) => get(countAtom) * 2)` — powerful composition
  - Async atoms built-in (fetch data as atoms)
  - Integrates with React Suspense natively
  - Great for complex, interconnected state (like a task graph with dependencies)
- **Weaknesses**: Slightly more conceptual overhead. Debugging many atoms can be harder.

#### Redux Toolkit (v2.x) — ⭐ 10K+ GitHub stars
- **Size**: ~11kB minified+gzipped (significantly larger)
- **Philosophy**: Opinionated Redux with reduced boilerplate.
- **Strengths**: Battle-tested, incredible devtools, RTK Query for API caching, massive community.
- **Weaknesses**: Still more boilerplate than Zustand/Jotai. Larger bundle. Overkill for most apps in 2025.

#### 🏆 RECOMMENDATION: **Zustand v5 (primary) + Jotai (for complex derived state)**

**Rationale**: Zustand for the main app store (tasks, projects, settings, UI state). Its `persist` middleware is a natural fit for local-first storage. Use Jotai atoms for computed/derived state where granular reactivity matters (e.g., filtered task views, real-time counters).

**Specific setup**:
```typescript
// Store for core app state
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useTaskStore = create(
  persist(
    immer((set, get) => ({
      tasks: [],
      addTask: (task) => set((state) => { state.tasks.push(task) }),
      // ...
    })),
    { name: 'tada-tasks', storage: createJSONStorage(() => indexedDB) }
  )
)
```

---

### 1.3 Database & Sync: Local-First Architecture

This is the most critical architectural decision for TADA. The goal: **instant local interactions + seamless cloud sync + offline support**.

#### Option A: PowerSync + Supabase (Postgres)
- **What it is**: PowerSync is a sync engine that sits between your backend Postgres database and client-side SQLite. It handles bi-directional sync automatically.
- **How it works**:
  1. Backend: Supabase (managed Postgres + Auth + Realtime + Storage)
  2. Sync layer: PowerSync Service watches Postgres change stream, partitions data per user, streams updates in real-time
  3. Client: PowerSync SDK manages an in-app SQLite database
  4. Writes go to local SQLite instantly → queued → uploaded to backend API → applied to Postgres
- **Client SDKs**: JavaScript/Web, React Native, Flutter, Kotlin, Swift, Node, Rust, .NET
- **Strengths**:
  - True offline-first: app works fully offline, syncs when connected
  - Uses SQLite on client (fast, proven, extensible, ORM support)
  - Uses Postgres on backend (the most capable relational DB)
  - Dynamic data partitioning (each user gets only their data)
  - Open source and source-available
  - Scales horizontally
  - Live queries with reactivity
  - PowerSync has official React/Next.js SDK
- **Pricing**: Free tier available, paid starts at usage-based pricing
- **Demo apps**: Official To-Do List demo with Supabase backend: https://github.com/powersync-ja/powersync-js/tree/main/demos/react-supabase-todolist

#### Option B: Automerge (CRDT)
- **What it is**: A CRDT (Conflict-free Replicated Data Type) library. JSON-like data structures that can be modified concurrently by different users and merged automatically without conflicts.
- **Philosophy**: "PostgreSQL for your local-first app" — handles persistence so developers avoid hard distributed computing problems.
- **Key milestone**: Automerge 3 achieved ~10x reduction in memory usage.
- **Strengths**:
  - True peer-to-peer capable (no central server required)
  - Automatic conflict resolution (mathematically proven)
  - Rust core compiled to WASM (fast)
  - Great for real-time collaboration
  - Backed by Ink & Switch (research lab behind "local-first software" movement)
- **Weaknesses**:
  - More complex to set up than PowerSync
  - No built-in auth/user management
  - You must build your own sync transport (WebSocket, WebRTC, etc.)
  - Document-oriented (not relational) — less natural for structured task data
  - Growing but smaller ecosystem than traditional DB approaches

#### Option C: Yjs (CRDT)
- **What it is**: Another CRDT framework, focused on shared data types for collaborative software.
- **Used by**: AFFiNE, Huly, Gitbook, Evernote, Cargo, Lessonspace — major production apps.
- **Strengths**:
  - Network agnostic (p2p supported)
  - Rich text editor integrations (ProseMirror, TipTap, Monaco, CodeMirror, Quill)
  - Offline editing, version snapshots, undo/redo, shared cursors
  - Scales to unlimited users, handles large documents
  - More mature ecosystem than Automerge for editor integrations
- **Weaknesses**: Similar to Automerge — need to build sync infrastructure yourself.

#### Option D: Electric SQL
- **What it is**: A reactive data platform for collaborative, multi-agent systems. Sync primitives that compose into end-to-end reactive sync stacks.
- **Philosophy**: Works with any web framework. Postgres-centric.
- **Strengths**: Composable sync primitives, managed cloud + open source, vendor agnostic.
- **Status**: Newer entrant, less battle-tested than PowerSync for production todo apps.

#### Option E: Supabase Alone (without sync engine)
- **What it is**: Managed Postgres + Realtime subscriptions + Auth + Storage + Edge Functions.
- **Strengths**: All-in-one BaaS, generous free tier (500MB DB, 50K monthly active users), excellent DX.
- **Weaknesses**: NOT truly offline-first. Realtime subscriptions require connection. No local SQLite cache out of the box.

#### 🏆 RECOMMENDATION: **PowerSync + Supabase**

**Rationale**: This gives TADA the best of both worlds:
- **Supabase** handles auth, backend Postgres, file storage, edge functions, and the developer dashboard
- **PowerSync** handles the hard part: bi-directional sync between Postgres and client SQLite
- Users get instant local responsiveness (SQLite) with automatic cloud sync
- Full offline support
- Relational data model (natural for tasks/projects/tags)
- Both are open source
- Official React SDK and To-Do List demo app to reference

**Architecture**:
```
User Device                    Cloud
┌─────────────────┐      ┌──────────────────┐
│  React App      │      │  Supabase        │
│  ┌───────────┐  │      │  ┌────────────┐  │
│  │ PowerSync │  │ ←──→ │  │  Postgres  │  │
│  │  SDK      │  │      │  │  + Auth     │  │
│  │  ┌─────┐  │  │      │  │  + Storage  │  │
│  │  │SQLite│  │  │      │  └────────────┘  │
│  │  └─────┘  │  │      │  ┌────────────┐  │
│  └───────────┘  │      │  │ PowerSync  │  │
│                 │      │  │  Service   │  │
└─────────────────┘      │  └────────────┘  │
                         └──────────────────┘
```

**If TADA later needs real-time collaboration** (shared lists/projects), consider adding Yjs on top for just the collaborative editing features. PowerSync handles the data sync; Yjs handles the real-time cursor/editing collaboration.

---

### 1.4 Animation: Motion (formerly Framer Motion) vs Alternatives

#### Motion (v12.34.x) — The clear winner
- **Rebrand**: Framer Motion has been rebranded to **Motion** (at motion.dev). Same library, same creator (Matt Perry), expanded beyond React.
- **Framework support**: React, JavaScript (vanilla), and Vue.
- **Size**: Modular — import only what you use. Core is reasonably sized.
- **Key features for TADA**:
  - `<AnimatePresence>` for exit animations (critical for completing/deleting tasks)
  - Layout animations (industry-leading) — for reordering tasks smoothly
  - Spring physics for natural-feeling interactions
  - Gesture support: hover, press, drag — feels native, not "webby"
  - Scroll-triggered animations
  - Independent transform animations (x, y, scale, rotate without wrapper elements)
  - Timeline/stagger for orchestrated sequences (great for list reveals)
- **Production**: Used by thousands of production apps. 18M+ downloads.
- **Current version**: 12.34.3 (Feb 20, 2026)
- **Premium**: Motion+ offers 330+ pre-built animations, visual IDE controls, AI-assisted animation, performance auditing.

#### Motion One (now merged into Motion)
- The lightweight vanilla JS animation library has been **absorbed into Motion's unified API**. There is no longer a separate "Motion One" — it's all `motion` now.

#### Alternative: GSAP
- More powerful for complex timeline animations, but licensing is restrictive for SaaS products. Best for marketing sites, not app UI.

#### 🏆 RECOMMENDATION: **Motion v12+ (`motion` package)**

```bash
npm install motion
```

**Key animations for TADA**:
```tsx
// Task completion with exit animation
<AnimatePresence>
  {tasks.map(task => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300, transition: { duration: 0.3 } }}
      layout // Auto-animate position changes when list reorders
    >
      <TaskCard task={task} />
    </motion.div>
  ))}
</AnimatePresence>
```

---

### 1.5 Drag & Drop: dnd-kit vs Pragmatic Drag and Drop

#### dnd-kit (v1.x — rewritten)
- **GitHub**: 16.6K stars — the most popular React DnD library
- **Major rewrite**: The new version has a completely new architecture:
  - Framework-agnostic core (`@dnd-kit/abstract`)
  - DOM layer (`@dnd-kit/dom`)
  - Framework adapters (React, etc.)
- **Features**:
  - Lists, grids, multiple containers, nested contexts, variable-sized items
  - Virtualization support
  - Keyboard, pointer, mouse, touch sensors
  - Fully customizable collision detection, animations, transitions
  - Accessibility: built-in keyboard support, ARIA attributes, screen reader instructions
  - Sortable plugin (`@dnd-kit/dom/sortable`)
- **Strengths**: Purpose-built for React, excellent accessibility, great docs, highly customizable.
- **Concern**: The v1 rewrite may still be stabilizing.

#### Pragmatic Drag and Drop (by Atlassian)
- **GitHub**: Atlassian's production DnD library powering Trello, Jira, Confluence
- **Core size**: ~4.7kB
- **Architecture**: Low-level toolchain using browser's native drag and drop API
- **Features**:
  - Framework agnostic (React, Svelte, Vue, Angular)
  - Headless — full rendering and style control
  - Incremental — only load what you need
  - Deferred loading compatible
  - Full cross-browser support (Firefox, Safari, Chrome, iOS, Android)
  - Virtualization support
  - Optional assistive technology controls
- **Strengths**: Battle-tested at massive scale (Trello!), tiny core, headless design.
- **Concern**: Less opinionated = more work to build polished interactions. Optional visual outputs are tied to Atlassian Design System.

#### 🏆 RECOMMENDATION: **dnd-kit v1 (new architecture)**

**Rationale**: For a todo app, drag-and-drop is a core interaction (reordering tasks, moving between lists/projects, kanban boards). dnd-kit provides:
- Better out-of-box sortable experience
- Built-in accessibility (critical for a todo app)
- More polished defaults for the kind of interactions TADA needs
- React-first with the new architecture
- Active community and maintainer

**If dnd-kit v1 proves unstable**, fall back to Pragmatic Drag and Drop — it's battle-proven at Atlassian scale.

```bash
npm install @dnd-kit/react   # React adapter
npm install @dnd-kit/dom      # DOM implementation  
```

---

### 1.6 Additional Technology Choices

| Category | Recommendation | Why |
|----------|---------------|-----|
| **Styling** | Tailwind CSS v4 + CSS Modules | Utility-first for speed; CSS Modules for component encapsulation |
| **Component Library** | shadcn/ui | Copy-paste components, full ownership, Tailwind-based, accessible by default |
| **Forms** | React Hook Form + Zod | Best performance (uncontrolled), Zod for schema validation |
| **Routing** | Next.js App Router | Built into Next.js 15, React Server Components |
| **Icons** | Lucide React | Tree-shakeable, consistent, 1000+ icons |
| **Date Handling** | date-fns v3 | Tree-shakeable, immutable, TypeScript-first |
| **Rich Text** | TipTap v2 (for task descriptions) | ProseMirror-based, extensible, collaborative-ready |
| **Testing** | Vitest + Playwright | Vitest for unit/integration, Playwright for E2E |
| **Monorepo** | Turborepo | By Vercel, caches builds, great with Next.js |
| **Package Manager** | pnpm | Faster, more efficient disk usage |
| **Type Safety** | TypeScript 5.x (strict mode) | Non-negotiable for production apps |
| **API Layer** | tRPC v11 | End-to-end type safety, great with Next.js |
| **Auth** | Supabase Auth (or Clerk) | Supabase Auth if using Supabase; Clerk for premium auth UX |
| **Email** | React Email + Resend | Beautiful transactional emails |
| **Analytics** | PostHog | Open source, product analytics + session replay |
| **Error Tracking** | Sentry | Industry standard |

---

## 2. UX Best Practices

### 2.1 Top 5 Todo Apps — Deep Analysis

#### Todoist — The Workhorse
- **Task entry speed**: "Quick Add" with natural language parsing. Type "Call dentist tomorrow at 3pm p1 #health" and it parses date, priority, and project instantly.
- **Views**: List, Calendar, Board — same project, different perspectives.
- **Key UX patterns**:
  - Frictionless capture: Global keyboard shortcut (Q) opens quick add from anywhere
  - Smart date parsing: "every weekday", "next monday", "in 3 days"
  - Inline editing: Click any task to edit in-place
  - Drag-and-drop scheduling in calendar view
  - Karma system: Gamification with daily/weekly goals and streaks
  - Filters: Powerful custom filters with query syntax
- **What makes it feel great**: Speed of input. You can get a thought into Todoist faster than any competitor. The NLP for dates is best-in-class.
- **Weakness**: Can feel utilitarian. Less delightful animations than Things 3.

#### Things 3 — The Design Masterpiece  
- **Apple Design Award winner (twice)**
- **Task entry speed**: "Magic Plus" button — tap to create, or drag it to insert at a specific position. On Mac: global hotkey creates task from any app.
- **Key UX patterns**:
  - **Beautiful to-dos**: Opening a task smoothly transforms into a "clean white piece of paper". Detail fields (tags, checklist, dates) are tucked away until needed.
  - **Today + This Evening**: Splits the day into two phases — brilliant for work/personal separation
  - **Upcoming view**: Calendar-style planning with drag-and-drop rescheduling
  - **Headings**: Divide projects into sections (headings). Drag a heading to move all its tasks.
  - **Checklists inside tasks**: Sub-steps without full sub-tasks
  - **Animation philosophy**: "Every animation is purposeful. It is fun. It's a fun app to be in."
  - **Magic Plus**: The floating + button can be dragged to insert tasks at exact positions
  - **Quick Find**: ⌘F searches everything instantly
- **What makes it feel great**: Tactile interactions. Every gesture has weight. Animations guide your eyes. The app feels like a physical object — paper-like, calm, intentional.
- **Design principle**: "Design is not an afterthought — it's a way of building apps."

#### TickTick — The Swiss Army Knife
- **Task entry speed**: NLP for date/time, voice input, widget add, browser extension, email integration, desktop shortcut.
- **Key UX patterns**:
  - **Multiple view modes**: List, Kanban, Timeline (lighter Gantt chart)
  - **Built-in Pomodoro timer**: Start a focus session directly from any task
  - **Habit tracker**: Integrated habit tracking with streaks
  - **Eisenhower Matrix**: Built-in priority matrix view
  - **Calendar integration**: Full calendar view with events + tasks merged
  - **Smart filters**: Tag-based filtering
  - **Location reminders** (iOS): Trigger reminders at specific locations
  - **Constant reminders**: Notifications keep ringing until handled
- **What makes it feel great**: Completeness. Everything you need is here. The Pomodoro + Habits integration turns a todo app into a full productivity system.

#### Linear — The Speed Standard
- **Not a traditional todo app** but the gold standard for keyboard-driven task management.
- **Key UX patterns**:
  - **Keyboard-first**: Nearly every action has a shortcut. `C` creates issue, `L` adds label, `P` sets priority, `/` searches.
  - **Command palette** (⌘K): Access any action without touching the mouse
  - **AI integration**: 
    - AI filter: "Show me all high-priority bugs from last week" in natural language
    - Linear Agent for Slack: Creates issues from Slack conversations
    - MCP server: Integrates with AI tools for product management
    - Triage Intelligence: Suggests related issues to avoid duplicates
  - **Instant analytics**: Real-time insights for any stream of work
  - **Cycles**: Time-boxed sprints for work planning
  - **Sub-issue hierarchy**: Issues → Sub-issues → Checklists
  - **Optimistic UI**: Every action feels instant — updates are applied locally before server confirmation
  - **Mobile**: Full mobile app for on-the-go management
- **What makes it feel great**: Speed. Linear loads in <1 second. Every interaction is instantaneous. The keyboard-first design means power users never touch the mouse. The UI is dense but not cluttered — information-rich without overwhelm.

#### Superlist — The Modern Entrant
- **From the creators of Wunderlist** (acquired by Microsoft → became Microsoft To Do)
- **Key UX patterns**:
  - **"Quick add from anywhere"**: Type or talk. "Dentist Friday at 2pm" parsed automatically.
  - **Talk input**: Voice-to-task with natural language understanding
  - **Recurring tasks**: Automatic recurring with full customization
  - **Widgets**: Home screen and lock screen widgets for instant capture
  - **Team sync**: Real-time collaboration on shared lists
  - **Beautiful design**: Playful, colorful, less corporate than Todoist
- **Positioning**: "In a sea of ultra-efficient productivity tools, Superlist brings a little more fun to getting things done."
- **What makes it feel great**: The blend of personal and team use. Voice input for frictionless capture. The playful design language.

---

### 2.2 Key UX Patterns TADA Must Implement

#### Task Entry Speed (the #1 differentiator)
1. **Global Quick Add**: `⌘/Ctrl + K` or a dedicated shortcut opens a floating input from anywhere in the app
2. **Natural Language Parsing**: "Buy milk tomorrow 5pm #shopping" → creates task with date, time, project
3. **Inline creation**: Press Enter at end of a task list to create new task inline (no modal)
4. **Voice input**: "Talk to add" with speech-to-text + NLP parsing
5. **Quick capture widget**: Desktop menubar widget, mobile home screen widget
6. **< 100ms from thought to task**: The time from pressing the shortcut to being able to type should be imperceptible

#### Keyboard Shortcuts (Linear-style)
Must-have shortcuts:
| Shortcut | Action |
|----------|--------|
| `⌘ + K` | Command palette (search everything) |
| `Q` or `N` | Quick add task |
| `Enter` | Create task (when in list) |
| `E` | Edit selected task |
| `⌘ + Enter` | Complete task |
| `Delete/Backspace` | Delete task |
| `⌘ + ↑/↓` | Reorder task |
| `Tab` | Indent (make subtask) |
| `Shift + Tab` | Outdent |
| `T` | Set today |
| `D` | Set date |
| `P` | Set priority |
| `L` | Set label/tag |
| `#` | Assign to project |
| `/` | Filter/search |
| `⌘ + 1-5` | Switch views |
| `?` | Show keyboard shortcuts |

#### Empty States
- **Don't show a blank page**: Every empty state should:
  - Celebrate the emptiness ("All done! 🎉" or "Clean slate. What's on your mind?")
  - Provide a clear CTA to add content
  - Include a keyboard shortcut hint
  - Use delightful illustration or animation
- **Progressive empty states**: First time → onboarding tips. Regular empty → celebration. Long empty → gentle re-engagement.

#### Onboarding
- **Zero-friction start**: No forced tutorial. Let users explore.
- **Progressive disclosure**: Reveal features as they become relevant.
- **Sample project**: Pre-populate with a "Getting Started" project that teaches features by doing.
- **Tooltip tours**: Light, dismissible tooltips pointing to key features (not blocking modals).
- **Keyboard shortcut discovery**: Show shortcuts contextually (e.g., when hovering over a button, show its shortcut).

#### Micro-Interactions
- **Task completion**: Satisfying checkmark animation. Circle fills, line through text animates, task slides away.
- **Priority swipe**: Swipe right to set priority, with color indication.
- **Drag reorder**: Smooth position transitions with spring physics. The grabbed item slightly scales up (1.02x) and gains a subtle shadow.
- **Undo toast**: Every destructive action shows an "Undo" toast for 5 seconds.
- **Pull to refresh**: Custom animation (not default browser).
- **Hover states**: Subtle background color shift + action icons appear.
- **Loading**: Skeleton screens, never spinners.

#### Haptic Feedback (Mobile)
- **Task complete**: Single strong tap (UIImpactFeedbackGenerator.style.medium)
- **Drag start**: Light tap
- **Drag over target**: Subtle selection tap
- **Drop**: Medium tap
- **Priority change**: Light tap
- **Delete**: Warning-style double tap
- **Pull to refresh threshold**: Notch tap when threshold is reached

---

## 3. UI Design Trends 2025-2026

### 3.1 Color Systems

#### The Dominant Trend: Muted, Sophisticated Palettes
- **Gone**: Flat neon colors, harsh saturated palettes
- **In**: Muted, slightly desaturated colors with depth. Think "watercolor" not "highlighter."
- **Specific trend**: "Digital Nature" — colors inspired by natural environments (sage greens, warm stones, soft sky blues, clay oranges)

#### Recommended Color System for TADA:

**Light Mode**:
```css
/* Base */
--background: hsl(0, 0%, 99%);          /* Near-white, warm */
--foreground: hsl(0, 0%, 9%);           /* Near-black, not pure */
--card: hsl(0, 0%, 100%);
--muted: hsl(240, 5%, 96%);
--muted-foreground: hsl(240, 4%, 46%);

/* Priority Colors (muted but distinct) */
--priority-urgent: hsl(0, 72%, 63%);     /* Soft red */
--priority-high: hsl(25, 95%, 63%);      /* Warm orange */
--priority-medium: hsl(48, 96%, 53%);    /* Golden yellow */
--priority-low: hsl(210, 40%, 58%);      /* Steel blue */

/* Accent */
--accent: hsl(252, 87%, 64%);           /* Vibrant purple — differentiation */
--accent-foreground: hsl(0, 0%, 100%);

/* Semantic */
--success: hsl(142, 71%, 45%);
--destructive: hsl(0, 84%, 60%);
```

**Dark Mode** (not just inverted — designed separately):
```css
--background: hsl(240, 10%, 6%);         /* Deep blue-black */
--foreground: hsl(0, 0%, 95%);
--card: hsl(240, 6%, 10%);
--muted: hsl(240, 4%, 16%);
--accent: hsl(252, 87%, 70%);           /* Slightly lighter purple */
```

**Key principle**: Use color purposefully. Every color should communicate meaning (priority, status, category). Don't use color decoratively.

---

### 3.2 Typography

#### The Trend: Variable Fonts + Generous Sizing
- **Primary font**: **Inter** (still dominant) or **Geist** (by Vercel — gaining rapid adoption, used in Next.js, v0, shadcn). Both are variable fonts with excellent legibility.
- **Alternative**: **Plus Jakarta Sans** for a slightly warmer, friendlier feel.
- **Monospace** (for dates, IDs): **Geist Mono** or **JetBrains Mono**

#### Recommended Type Scale:
```css
/* Fluid typography using clamp() */
--text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);     /* 11-12px */
--text-sm: clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem);    /* 13-14px */
--text-base: clamp(0.9rem, 0.85rem + 0.25vw, 1rem);      /* 14-16px */
--text-lg: clamp(1.05rem, 1rem + 0.25vw, 1.125rem);  /* 17-18px */
--text-xl: clamp(1.2rem, 1.1rem + 0.5vw, 1.25rem);      /* 19-20px */
--text-2xl: clamp(1.4rem, 1.3rem + 0.5vw, 1.5rem);      /* 22-24px */
--text-3xl: clamp(1.8rem, 1.6rem + 1vw, 2rem);           /* 29-32px */

/* Line heights */
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long-form notes */

/* Letter spacing */
--tracking-tight: -0.025em;  /* Headings */
--tracking-normal: 0;        /* Body */
--tracking-wide: 0.025em;    /* Labels, captions */
```

**Key principle**: Task titles should be the most prominent text. Use font weight (semibold 600) not size to create hierarchy within lists. Dates and metadata should be `text-sm` in `muted-foreground`.

---

### 3.3 Spacing System

#### The Trend: More Breathing Room
- **2025-2026 trend**: Generous whitespace. Apps like Linear, Things 3, and Notion use more padding than their 2020 counterparts.
- **4px base unit**: All spacing should be multiples of 4px.

```css
--space-1: 0.25rem;  /* 4px — icon gaps */
--space-2: 0.5rem;   /* 8px — tight padding */
--space-3: 0.75rem;  /* 12px — standard inline padding */
--space-4: 1rem;     /* 16px — standard block padding */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px — section spacing */
--space-8: 2rem;     /* 32px — large section spacing */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px — page margins */
--space-16: 4rem;    /* 64px — major sections */
```

**Task card padding**: 12px horizontal, 10px vertical (compact but not cramped).  
**Between tasks in a list**: 2px gap (dense but visually separated).  
**Section spacing**: 24px between groups (Today, Tomorrow, Upcoming).

---

### 3.4 Card Design

#### The Trend: Subtle, Almost Borderless
- **Gone**: Heavy shadows, thick borders, skeuomorphic cards
- **In**: Ultra-subtle borders (`1px solid hsl(0 0% 90%)`), minimal shadow on hover only, or pure background color differentiation

**Task Card Design Pattern**:
```css
.task-card {
  padding: 10px 12px;
  border-radius: 8px;
  background: transparent;  /* No background by default */
  border: none;
  transition: background 150ms ease;
}

.task-card:hover {
  background: hsl(0 0% 97%);  /* Barely visible highlight */
}

.task-card[data-dragging="true"] {
  background: white;
  box-shadow: 0 8px 32px hsl(0 0% 0% / 0.12);
  border-radius: 12px;
  transform: scale(1.02) rotate(1deg);
}
```

**Key insight from Things 3**: When you open/expand a task, it "smoothly transforms into a clear white piece of paper." The card elevates and expands with a spring animation. This is the gold standard.

---

### 3.5 Animations

#### The Trend: Purposeful Motion Design
- **Spring physics everywhere**: No more linear/ease-in-out. Spring animations feel natural.
- **Layout animations**: When items reorder, animate position (Motion's `layout` prop).
- **Shared layout animations**: When transitioning between views (list → detail), the task card morphs into the detail view.
- **Micro-delays for stagger**: List items appear with 30-50ms stagger for a cascading reveal.

**Recommended animation values**:
```typescript
// Spring configs
const springSnappy = { type: "spring", stiffness: 500, damping: 30 };   // Quick UI feedback
const springSmooth = { type: "spring", stiffness: 300, damping: 25 };   // List reordering
const springGentle = { type: "spring", stiffness: 200, damping: 20 };   // Page transitions
const springBouncy = { type: "spring", stiffness: 400, damping: 15 };   // Playful (complete task)

// Timing
const durationFast = 0.15;    // Hover states, color changes
const durationNormal = 0.25;  // Most transitions
const durationSlow = 0.4;     // Page transitions, modals
```

---

### 3.6 Dark Mode

#### The Trend: "Dark Mode First" Design
- Many designers now design dark mode first and adapt to light.
- **Key principles**:
  - Don't invert — redesign. Dark mode needs different color relationships.
  - Use slight warmth in dark backgrounds (not pure `#000`): `hsl(240, 10%, 6%)` or `hsl(220, 13%, 8%)`
  - Reduce white text contrast slightly: use `hsl(0, 0%, 90%)` not pure white
  - Shadows become glows in dark mode (or disappear entirely)
  - Borders become more important for structure
  - Accent colors should be slightly desaturated in dark mode
  - Use `@media (prefers-color-scheme: dark)` for system default, but always offer manual toggle

**OLED Black Mode** (stretch goal):
```css
[data-theme="black"] {
  --background: hsl(0, 0%, 0%);  /* True black for OLED */
  --card: hsl(0, 0%, 4%);
}
```

---

### 3.7 Specific Design Inspirations

| App/Site | What to Study |
|----------|--------------|
| **Things 3** | Task card animation, Magic Plus button, overall calm aesthetic |
| **Linear** | Information density, keyboard-first UI, dark mode, command palette |
| **Raycast** | Command palette design, extension system, smooth transitions |
| **Arc Browser** | Sidebar design, spaces concept, playful animations |
| **Notion Calendar** | Calendar integration with tasks, timeline view |
| **Vercel Dashboard** | Typography (Geist font), spacing, minimal card design |
| **Stripe Dashboard** | Color system, data visualization, light/dark toggle |
| **Apple Reminders** | iOS-native feel, smart lists, grouped by time |

---

## 4. AI Integration

### 4.1 Natural Language Task Parsing

This is the most impactful AI feature. Users should be able to type freely and have TADA understand intent.

#### Implementation Approach:

**Tier 1 — Rule-based NLP (ship immediately, zero cost)**:
Use a library like [chrono-node](https://github.com/wanasit/chrono) for date/time parsing combined with regex patterns for priorities and tags.

```typescript
import * as chrono from 'chrono-node';

function parseTaskInput(input: string) {
  // Parse dates: "tomorrow", "next friday", "jan 15", "in 3 days"
  const dateResults = chrono.parse(input);
  
  // Parse priority: "p1", "p2", "!!", "urgent"
  const priorityMatch = input.match(/(?:^|\s)(p[1-4]|!!|!|urgent|high|medium|low)(?:\s|$)/i);
  
  // Parse tags: "#shopping", "#work", "#health"
  const tags = [...input.matchAll(/#(\w+)/g)].map(m => m[1]);
  
  // Parse project: "/inbox", "/work"
  const projectMatch = input.match(/\/(\w+)/);
  
  // Clean title: remove parsed elements
  let title = input
    .replace(dateResults[0]?.text || '', '')
    .replace(priorityMatch?.[0] || '', '')
    .replace(/#\w+/g, '')
    .replace(/\/\w+/g, '')
    .trim();
    
  return { title, date: dateResults[0]?.date(), priority, tags, project };
}
```

**chrono-node** (https://github.com/wanasit/chrono): 
- 3.6K stars, actively maintained
- Handles: "tomorrow", "next Friday", "in 3 hours", "Dec 25", "every Monday"
- Multi-language support
- Zero API cost

**Tier 2 — LLM-powered parsing (premium feature)**:
For complex inputs like "Remind me to call Sarah about the project when I get home from work" or "Plan a birthday party for next month with a budget discussion first":

```typescript
// Use a lightweight model via API
async function aiParseTask(input: string) {
  const response = await fetch('/api/ai/parse-task', {
    method: 'POST',
    body: JSON.stringify({
      input,
      context: { existingProjects, existingTags, userTimezone }
    })
  });
  return response.json();
  // Returns: { title, date, priority, tags, project, subtasks, recurrence }
}
```

**Recommended models for parsing**:
- **Claude 3.5 Haiku** / **GPT-4o-mini**: Fast, cheap (~$0.0001 per parse), good enough for structured extraction
- **On-device**: Consider running a small model locally for privacy-conscious users (e.g., via WebLLM with a quantized Phi-3-mini)

---

### 4.2 Smart Scheduling

#### "AI Daily Planner"
When a user has many unscheduled tasks, TADA can suggest an optimal daily plan:

**Input**: User's tasks, due dates, priorities, estimated durations, calendar events (if integrated), historical completion patterns.

**Output**: A suggested daily schedule with time blocks.

**Implementation**:
1. **Simple algorithm first** (no AI needed):
   - Sort by: overdue → due today → high priority → medium → low
   - Estimate: If no duration set, assume 30 minutes
   - Slot into available time between calendar events
   - Cap at 6-8 tasks per day (based on research on daily task completion rates)

2. **AI-enhanced** (premium):
   - Learn from user patterns: "User completes creative tasks better in morning"
   - Suggest optimal ordering based on energy patterns
   - Auto-reschedule overdue tasks intelligently

---

### 4.3 Auto-Categorization

When a user creates a task, TADA can suggest:
- **Project**: Based on keywords and past categorization patterns
- **Tags**: Based on content analysis
- **Priority**: Based on urgency signals in language

**Implementation**: Use embeddings to match new tasks against existing task patterns:

```typescript
// Generate embedding for new task
const embedding = await getEmbedding(taskTitle);

// Find nearest neighbors in existing tasks
const similarTasks = await vectorSearch(embedding, { limit: 5 });

// Suggest the most common project/tags from similar tasks
const suggestedProject = mode(similarTasks.map(t => t.project));
const suggestedTags = topN(similarTasks.flatMap(t => t.tags), 3);
```

**Embedding options**:
- **Supabase Vector** (pgvector): If already using Supabase, add vector columns
- **OpenAI text-embedding-3-small**: $0.00002 per 1K tokens, very cheap
- **Nomic Embed** (open source): Can run locally

---

### 4.4 AI-Powered Features Roadmap

| Feature | Complexity | Value | Phase |
|---------|-----------|-------|-------|
| NLP date/time parsing (chrono) | Low | Very High | MVP |
| NLP priority/tag parsing (regex) | Low | High | MVP |
| Smart task suggestions in empty states | Low | Medium | v1.1 |
| AI daily planner (rule-based) | Medium | High | v1.1 |
| LLM task parsing (complex inputs) | Medium | High | v1.2 |
| Auto-categorization (embeddings) | Medium | Medium | v1.2 |
| AI project breakdown (big task → subtasks) | Medium | High | v1.3 |
| Voice input → task creation | Medium | Very High | v1.3 |
| AI weekly review / summary | Medium | High | v2.0 |
| Smart scheduling with calendar | High | Very High | v2.0 |
| Predictive due dates ("usually takes you 3 days") | High | Medium | v2.0 |

---

### 4.5 Voice Input

**Web Speech API** (built-in, free):
```typescript
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  const parsed = parseTaskInput(transcript); // Reuse NLP parser
};
```

**Premium alternative**: OpenAI Whisper API for better accuracy ($0.006/minute).

**UX pattern**: Hold a microphone button to record → release → show transcription in input field → user confirms or edits → task created. Show real-time transcription while speaking (interim results).

---

## 5. Monetization Strategy

### 5.1 Successful Open-Source Monetization Models

#### Cal.com — "Open Source Calendly"
- **Model**: Open-core with managed cloud
- **Pricing**:
  - **Individual**: Free forever (unlimited events, calendars, meetings)
  - **Teams**: $12/user/month (round-robin, collective events, managed events, analytics)
  - **Organizations**: $12/user/month (company-wide scheduling, sub-teams, SAML SSO)
  - **Enterprise**: Custom pricing (custom SLA, dedicated support)
- **Revenue drivers**: Team/org features are the primary upsell. Individual use is completely free.
- **Tech stack**: Next.js, tRPC, React, Tailwind CSS, Prisma — nearly identical to our recommended stack
- **Key insight**: They give away individual features generously. The paid features are specifically things teams need (round-robin, analytics, SSO). Self-hosting is available for all tiers.

#### Hoppscotch — "Open Source Postman"
- **Model**: Open-core + cloud hosted + enterprise self-hosted
- **Pricing**:
  - **Free**: Full-featured for individuals (PWA, offline support, all HTTP methods, theming)
  - **Teams/Cloud**: Paid collaboration features (team workspaces, shared collections, RBAC)
  - **Enterprise**: Self-hosted with support contracts
- **Key insight**: The core product is so good that enterprises adopt it bottom-up, then pay for team features and support.

#### Documenso — "Open Source DocuSign"
- **Model**: Freemium SaaS + self-hosted licensing
- **Pricing**:
  - **Free**: 5 documents/month, 10 recipients/document
  - **Individual**: $25/month (unlimited documents, API access)
  - **Teams**: $40/month (5 users included, +$8/additional, embedded signing)
  - **Platform**: $250/month (unlimited everything, whitelabel)
  - **Enterprise**: Custom (self-hosted licensing, compliance features)
- **Revenue mix**: SaaS subscriptions + self-hosted license fees + enterprise contracts
- **Key insight**: Free tier creates adoption funnel. Enterprise features (compliance, whitelabel, self-hosted) command premium pricing.

---

### 5.2 Recommended Monetization Strategy for TADA

#### Pricing Tiers:

**🆓 Free — "Personal"**
- Unlimited tasks and projects
- 3 projects max
- NLP date parsing
- Basic views (list, today, upcoming)
- Local-first with cloud sync
- Full offline support
- Basic keyboard shortcuts
- Light & dark mode
- Single device (web)
- Community support

**💜 Pro — $5/month ($48/year)**
- Everything in Free
- Unlimited projects
- All views (calendar, kanban, timeline)
- AI features (smart parsing, auto-categorization)
- Voice input
- AI daily planner
- Custom themes
- Priority support
- All platforms (web + mobile + desktop)
- File attachments (up to 100MB)
- Advanced filters
- Integrations (calendar, Slack, email)

**👥 Team — $8/user/month ($76/user/year)**
- Everything in Pro
- Shared projects & lists
- Real-time collaboration
- Team analytics
- Admin controls
- SSO (SAML/OIDC)
- API access
- Priority phone support

**🏢 Enterprise — Custom**
- Everything in Team
- Self-hosted option
- Custom SLA
- Dedicated account manager
- Custom integrations
- Compliance certifications
- White-label option

#### Revenue Strategy:

1. **Free tier must be genuinely useful** — not crippled. A single person should be able to use TADA for free indefinitely and love it. This drives word-of-mouth.

2. **Pro is the primary revenue driver**. Price it low enough ($5/mo) that it's an impulse purchase. The AI features and multi-platform access are the natural upsell.

3. **Team tier** unlocks collaboration. This is where B2B revenue starts.

4. **Enterprise** is for large organizations. Custom pricing allows high ACVs (Annual Contract Values).

5. **Annual discount**: 20% discount for annual billing. This improves cash flow and reduces churn.

#### Additional Revenue Streams:
- **Themes/customization marketplace** (community-created themes, small revenue share)
- **API access** (metered for high-volume users)
- **Affiliate partnerships** (productivity tools, calendar apps)
- **GitHub Sponsors / Open Collective** (community support for open-source development)

#### Key Metrics to Track:
- **Free → Pro conversion rate**: Target 5-8% (industry benchmark for freemium productivity tools)
- **Monthly churn rate**: Target <3% for Pro, <2% for Team
- **ARPU** (Average Revenue Per User): Target $6-8/month blended
- **LTV** (Lifetime Value): Target $150+ for Pro users
- **CAC** (Customer Acquisition Cost): Target <$30 (organic/word-of-mouth heavy)

---

## 6. Final Recommended Stack

### The TADA Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                         TADA Stack                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend                                                       │
│  ├── Framework:     React 19 + Next.js 15 (App Router)         │
│  ├── Language:      TypeScript 5.x (strict)                     │
│  ├── Styling:       Tailwind CSS v4 + shadcn/ui                │
│  ├── State:         Zustand v5 (primary) + Jotai (derived)     │
│  ├── Animation:     Motion v12 (formerly Framer Motion)        │
│  ├── Drag & Drop:   dnd-kit v1                                 │
│  ├── Forms:         React Hook Form + Zod                      │
│  ├── Rich Text:     TipTap v2                                  │
│  ├── Icons:         Lucide React                               │
│  ├── Date:          date-fns v3                                │
│  └── NLP:           chrono-node (dates) + custom (tags/priority)│
│                                                                 │
│  Data Layer                                                     │
│  ├── Local DB:      SQLite (via PowerSync SDK)                 │
│  ├── Sync Engine:   PowerSync                                  │
│  ├── Cloud DB:      Supabase (Postgres)                        │
│  ├── Auth:          Supabase Auth                              │
│  ├── File Storage:  Supabase Storage                           │
│  ├── Realtime:      PowerSync (sync) + Supabase Realtime       │
│  └── Vector Search: Supabase pgvector (for AI features)        │
│                                                                 │
│  API                                                            │
│  ├── Type-safe:     tRPC v11                                   │
│  └── Edge:          Supabase Edge Functions / Vercel Edge      │
│                                                                 │
│  AI                                                             │
│  ├── Parsing:       chrono-node + regex (free tier)            │
│  ├── LLM:          Claude Haiku / GPT-4o-mini (pro tier)      │
│  ├── Embeddings:   text-embedding-3-small (categorization)    │
│  ├── Voice:        Web Speech API (free) / Whisper (pro)      │
│  └── Vector Store: Supabase pgvector                          │
│                                                                 │
│  Infrastructure                                                 │
│  ├── Hosting:       Vercel (frontend) + Supabase (backend)    │
│  ├── Analytics:     PostHog                                    │
│  ├── Errors:        Sentry                                     │
│  ├── Email:         React Email + Resend                       │
│  ├── CI/CD:         GitHub Actions                             │
│  ├── Monorepo:      Turborepo + pnpm                          │
│  └── Testing:       Vitest + Playwright                        │
│                                                                 │
│  Mobile (Phase 2)                                               │
│  ├── Framework:     React Native + Expo                        │
│  ├── Sync:          PowerSync React Native SDK                 │
│  └── Navigation:    Expo Router                                │
│                                                                 │
│  Desktop (Phase 3)                                              │
│  └── Framework:     Electron or Tauri v2                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Implementation Phases:

**Phase 1 — MVP (Weeks 1-8)**
- Core task CRUD with Zustand + PowerSync + Supabase
- NLP date parsing (chrono-node)
- Today / Upcoming / Projects views
- Keyboard shortcuts (top 10)
- Motion animations (task completion, list reorder)
- Dark mode
- Supabase Auth (email + Google + GitHub)
- Basic drag-and-drop reordering
- Free tier functionality

**Phase 2 — Pro Features (Weeks 9-16)**
- AI parsing (LLM integration)
- Voice input
- Calendar view
- Kanban board
- Advanced filters
- AI daily planner
- Integrations (Google Calendar)
- Pro tier billing (Stripe)

**Phase 3 — Team & Mobile (Weeks 17-24)**
- Team workspaces (shared projects)
- Real-time collaboration
- React Native app (iOS + Android)
- Team billing
- Admin dashboard
- API access

**Phase 4 — Enterprise & Polish (Weeks 25-32)**
- SSO (SAML/OIDC)
- Self-hosted option
- Custom themes marketplace
- AI weekly reviews
- Desktop app
- Enterprise sales

---

### Cost Estimates (Monthly, at scale)

| Service | Free Tier | At 10K Users | At 100K Users |
|---------|-----------|-------------|---------------|
| Vercel (hosting) | Free | $20/mo | $150/mo |
| Supabase (DB + Auth) | Free (500MB) | $25/mo (Pro) | $300+/mo |
| PowerSync | Free tier | ~$100/mo | Custom |
| OpenAI API (AI features) | $0 | ~$50/mo | ~$300/mo |
| Resend (email) | Free (100/day) | $20/mo | $80/mo |
| Sentry | Free (5K events) | $26/mo | $80/mo |
| PostHog | Free (1M events) | Free | $450/mo |
| **Total** | **$0** | **~$241/mo** | **~$1,360/mo** |

At 100K users with 5% Pro conversion (5,000 paying users × $5/mo) = **$25,000/mo revenue** vs **$1,360/mo costs** = **~18x margin**.

---

### Key Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| dnd-kit v1 instability | Fall back to Pragmatic DnD |
| PowerSync pricing at scale | Self-host PowerSync (it's open source) |
| React 19 breaking changes | Pin versions, test thoroughly |
| AI API costs spike | Implement caching, rate limiting, use cheaper models for simple tasks |
| User data privacy concerns | Local-first by default, E2E encryption option, GDPR compliance |
| Competition (Todoist, Things) | Differentiate on: open source, AI-native, local-first, speed |

---

> **Document maintained by**: TADA Research Team  
> **Last updated**: 2026-02-23  
> **Next review**: Before Phase 1 kickoff
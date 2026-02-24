# TADA — UI/UX Research Document (2025-2026)
## Premium, Futuristic, Best-in-Class Consumer Todo/Productivity App

> **Last updated:** February 24, 2026
> **Purpose:** Drive a complete UI redesign of TADA to feel premium, futuristic, and best-in-class — NOT generic.

---

## Table of Contents
1. [Best Consumer App UIs of 2025-2026](#1-best-consumer-app-uis-of-2025-2026)
2. [Design Trends for 2025-2026](#2-design-trends-for-2025-2026)
3. [What Makes a Todo App Feel "Built for the Future"](#3-what-makes-a-todo-app-feel-built-for-the-future)
4. [Specific UI Component Patterns](#4-specific-ui-component-patterns)
5. [Color Palette Recommendations](#5-color-palette-recommendations)
6. [Typography Recommendations](#6-typography-recommendations)
7. [Motion & Animation Guidelines](#7-motion--animation-guidelines)

---

## 1. Best Consumer App UIs of 2025-2026

### What Makes These Apps Feel Premium

#### Linear (https://linear.app)
**The gold standard for "built for engineers who care about design."**
- **Why it feels premium:**
  - Monochromatic dark UI with precisely controlled accent colors — never more than 2-3 colors on screen at once
  - Keyboard-first interaction model — every action has a shortcut, and the app teaches you progressively
  - Instant command palette (Cmd+K) that feels like a conversation with the app
  - Transitions are *tight* — sub-200ms for everything, spring physics on modal opens
  - Issue creation is a *full-screen takeover* with rich markdown, not a cramped modal — this makes creation feel important
  - Status indicators use custom-designed icons with micro-animation (spinning for "in progress")
  - The sidebar collapses with a smooth width animation, not a jump
  - Hover states reveal contextual actions with staggered fade-ins
  - Data density is high but never feels cluttered — achieved through precise spacing (4px grid) and typographic hierarchy
  - "Designed for speed" tagline reflected in every interaction — nothing blocks, nothing lags
  - AI agents integrated directly into the workflow — not bolted on, but woven into the issue lifecycle

**Key takeaway for TADA:** Task creation should feel like a *moment*, not an afterthought. Full-width input, rich formatting, keyboard shortcuts from day one.

#### Raycast (https://raycast.com)
**The command-line for the GUI generation.**
- **Why it feels premium:**
  - The entire product is a command palette — radical commitment to keyboard-first
  - Sub-50ms response times — feels like it reads your mind
  - Iconography is custom, not generic — each extension has a distinct visual identity
  - Results appear as you type with no loading state — instant filtering
  - "It's not about saving time. It's about feeling like you're never wasting it." — this is the emotional framing TADA needs
  - Extensions system means the app grows with the user without becoming bloated
  - Native macOS rendering — no Electron jank, pure performance
  - Subtle blur/vibrancy on the backdrop — native glassmorphism done right (because it IS native)
  - AI chat integrated directly into the launcher — not a separate app, but a natural extension

**Key takeaway for TADA:** Speed is the feature. If the app ever makes the user wait, you've already lost. Command palette should be central, not secondary.

#### Things 3 (https://culturedcode.com/things/)
**The gold standard for personal task management design.**
- **Why it feels premium:**
  - Won the Apple Design Award **twice** — the only todo app with that distinction
  - "A joy to use and beautiful to look at" — every review mentions the *feeling* of using it
  - Animations are "purposeful" — every transition tells you where you came from and where you're going
  - Drag and drop is *legendary* — items lift with a shadow, compress slightly, and drop with a satisfying settle
  - The magic plus button: tap anywhere in a list to insert a task right there — no modal, no dialog, just inline creation
  - Progressive disclosure done perfectly: a task starts as just a title, then unfolds to reveal notes, dates, tags, checklists
  - Keyboard shortcuts on iPad that set a new standard for mobile productivity
  - "Like a clean, crisp piece of paper, ready whenever you need it" — restraint as design principle
  - Never feels messy regardless of list length — achieved through spacing, hierarchy, and *absence* of visual noise
  - No social features, no team collaboration, no analytics — ruthlessly personal

**Key takeaway for TADA:** The *absence* of features is itself a feature. Progressive disclosure > kitchen sink. The app should feel like a tool that respects the user's intelligence.

#### Superhuman (https://superhuman.com)
**Made email feel like a luxury product.**
- **Why it feels premium:**
  - Split-screen inbox with instant preview — information density without overwhelm
  - Full keyboard shortcut system with on-screen hints (Vim-inspired but approachable)
  - "AI that sounds like you" — AI features are personalized, not generic
  - Visual design is extremely restrained — mostly black, white, and one accent color
  - Onboarding is 1-on-1 with a human — signals that the product values your time enough to invest in teaching you
  - Status indicators (read receipts, open tracking) use subtle, non-intrusive UI
  - Cmd+K for everything — search, navigate, compose, configure
  - "Superpowers, everywhere you work" — the product frames itself as enhancement, not replacement
  - Integrated docs, calendar, and AI into one surface — convergence of productivity tools

**Key takeaway for TADA:** Frame the product as giving users *superpowers*, not just organizing tasks. The emotional positioning matters as much as the UI.

#### Amie (https://amie.so)
**Calendar + tasks + AI in a beautiful package.**
- **Why it feels premium:**
  - Notch-integrated recording UI on macOS — pushing platform integration to its limits
  - Meeting notes that understand business context, not just transcription
  - AI chat that's "like ChatGPT, but it has full context about my company and job"
  - One-click integrations that feel magical: "I'm sick, move everything to Thursday"
  - Shareable pages auto-generated from meeting context — AI-native CRM
  - Calm, restrained color palette with playful illustration moments
  - Multi-provider meeting support without asking the user to configure anything

**Key takeaway for TADA:** AI should understand the user's *context*, not just their words. "Move my tasks" should just work, with the AI inferring what you mean.

#### Todoist (https://todoist.com)
**The workhorse with surprising polish.**
- **Why it feels premium (in its 2025 redesign):**
  - "Same project, flexible views" — list, calendar, or board from the same data
  - Natural language parsing: "every tuesday at 3pm" just works in the task input
  - The "Overwhelmed → On top of it" tagline captures the emotional journey perfectly
  - Template system for common workflows — reduces friction for new project types
  - Cross-platform consistency: "simple and consistent interface (iOS, macOS, web)"
  - Filters and custom views for power users without cluttering the default experience
  - 350,000+ five-star reviews — the social proof of a product that *works*

**Key takeaway for TADA:** Natural language input is table stakes now. If your task input can't parse "Call dentist tomorrow at 2pm", you're already behind.

#### Craft (https://craft.do)
**Apple Design Award-winning docs + notes + tasks.**
- **Why it feels premium:**
  - "A premium writing experience that follows you across all your devices"
  - Paper-like textures and warm visual design — feels physical, not digital
  - Daily Notes as a first-class concept — the journal-as-productivity-tool
  - Whiteboard integration alongside docs — spatial thinking as a feature
  - Block-based editing with beautiful typography and rich media
  - Persona-driven onboarding: different use cases for podcasters, photographers, PMs, students
  - Calendar integration as a native feature, not an add-on

**Key takeaway for TADA:** Consider "Daily Notes" or a daily planning ritual as a core interaction. People want to start their day with intention.

#### Notion Calendar (formerly Cron)
- **Why it feels premium:**
  - Availability sharing as a core feature, not a Calendly clone
  - Multi-calendar overlay with color-coded accounts
  - Clean, minimal chrome — the calendar events ARE the interface
  - Time-blocking with drag-and-drop that feels native
  - Keyboard shortcuts for rapid navigation (J/K for day, H/L for week)
  - Sidebar tasks that connect to Notion databases

#### Arc Browser
- **Why it feels premium:**
  - Sidebar-first navigation — tabs are vertical, not horizontal
  - Spaces for context switching — different "modes" for different work contexts
  - Command bar that combines navigation, search, and actions
  - Boost feature for customizing any website's appearance
  - Split view for side-by-side browsing
  - "Easel" for spatial canvas of web content

---

## 2. Design Trends for 2025-2026

### 2.1 Glassmorphism vs. Clean Flat Design

**The verdict for 2025-2026: "Selective Depth" — neither pure flat nor full glassmorphism.**

The trend has matured. Here's what the best apps are actually doing:

| Approach | When to Use | Example |
|----------|-------------|---------|
| **Frosted glass / backdrop-blur** | Overlays, command palettes, modals that sit above content | Raycast's command palette, macOS notification center |
| **Subtle elevation (box-shadow)** | Cards, floating action buttons, dropdowns | Linear's issue cards, Things 3's task items |
| **Pure flat** | Primary content areas, lists, navigation | Todoist's task lists, Superhuman's inbox |
| **Gradient mesh backgrounds** | Hero sections, empty states, marketing-adjacent UI | Craft's onboarding, Arc's new tab page |

**TADA recommendation:** Use **frosted glass exclusively for overlays and command palette**. Main content should be clean flat with subtle 1-2px shadows for depth on interactive elements. This keeps the app feeling fast (no expensive blur computations on main content) while feeling premium on overlays.

```css
/* TADA overlay glass effect */
.overlay {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
}

/* Dark mode */
.overlay-dark {
  background: rgba(20, 20, 25, 0.78);
  backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

### 2.2 Micro-Interactions and Animations

**The 2025-2026 micro-interaction playbook:**

1. **Task completion:** Don't just check a box. The checkbox should:
   - Animate the checkmark drawing (SVG path animation, ~300ms)
   - Pulse a subtle color burst (radial gradient expanding outward)
   - The task text should strikethrough with a left-to-right line animation
   - The row should compress height and fade after a 1.5s delay (giving user time to undo)
   - A small confetti particle effect on milestone completions (10th task, etc.)

2. **Button press states:**
   - Scale down to 0.97 on press (not 0.95 — too dramatic)
   - Spring back with slight overshoot (stiffness: 400, damping: 17)
   - Background color darkens 5% on hover, 10% on press

3. **List reordering:**
   - Picked-up item scales to 1.03, gains a 12px shadow, slightly rotates (1-2°)
   - Other items animate to make space using layout animations
   - Drop target shows a subtle colored line indicator
   - Drop settles with a spring (stiffness: 300, damping: 25)

4. **Navigation transitions:**
   - Page transitions: content slides 20px horizontally with opacity fade (150ms)
   - Tab switches: content crossfades with 0ms delay (instant feel)
   - Sidebar open/close: width + content opacity animated together (200ms ease-out)

5. **Input focus:**
   - Border color transitions smoothly (150ms)
   - Subtle glow appears (box-shadow with accent color at 15% opacity)
   - Label animates up (if using floating labels)

6. **Toast notifications:**
   - Slide in from bottom-right with spring physics
   - Auto-dismiss with a shrinking progress bar at bottom
   - Hover pauses the auto-dismiss timer
   - Swipe to dismiss on mobile

### 2.3 Typography Trends

**2025-2026 typography is defined by:**

1. **Variable fonts everywhere:** Single font files that interpolate between weights. This enables:
   - Smooth weight transitions on hover (400 → 500 feels alive)
   - Responsive weight based on context (heavier in headers, lighter in dense lists)
   - Reduced load times (one file vs. multiple weight files)

2. **Large type for headers, tight type for data:**
   - App titles/headers: 28-36px, weight 600-700
   - Section headers: 18-20px, weight 600
   - Body/task text: 14-15px, weight 400-450
   - Metadata/timestamps: 12-13px, weight 400, reduced opacity (60-70%)

3. **Optical sizing:** Variable fonts with `opsz` axis that optimize letterforms for different sizes. At small sizes, letters are wider with more open counters. At large sizes, letters are more refined with higher contrast.

4. **Tabular numbers for data:** Using `font-variant-numeric: tabular-nums` for any numbers that might change (timers, counts, dates) so columns stay aligned.

5. **Tight letter-spacing for headers:** -0.02em to -0.04em for display text, giving it a more refined, editorial feel.

6. **Generous line-height for readability:** 1.5-1.6 for body text, 1.2-1.3 for headers.

### 2.4 Color Systems (Adaptive, Contextual Colors)

**The trend: "Contextual color" that responds to content and environment.**

1. **Time-of-day theming:**
   - Morning (6am-12pm): Warmer tones, slightly higher brightness
   - Afternoon (12pm-5pm): Neutral palette, full saturation
   - Evening (5pm-9pm): Warm amber shift, reduced blue light
   - Night (9pm-6am): Automatic dark mode with warm undertones
   
2. **Priority-driven color:**
   - Urgent tasks get warm/hot colors (but never aggressive red — use coral or amber)
   - Low priority gets cool colors (muted blue-gray)
   - Color intensity increases as deadlines approach

3. **Semantic color tokens (not raw values):**
   ```
   --color-surface-primary     (the main background)
   --color-surface-elevated    (cards, overlays — slightly lighter/darker)
   --color-surface-sunken      (input fields, inset areas)
   --color-text-primary        (main content)
   --color-text-secondary      (metadata, hints)
   --color-text-tertiary       (timestamps, very low priority info)
   --color-accent-primary      (CTAs, active states)
   --color-accent-subtle       (hover states, selected items)
   --color-status-success      (completed tasks)
   --color-status-warning      (approaching deadlines)
   --color-status-danger       (overdue)
   ```

4. **Project-specific accent colors:** Each project/area gets a user-chosen or auto-assigned color that tints the UI when that project is active. Linear does this exceptionally well.

### 2.5 Spatial Design / Depth / Layering

**The z-axis hierarchy for TADA:**

```
Z-Level 0: Base canvas (main content area)
Z-Level 1: Elevated cards (tasks, notes) — 1-2px shadow
Z-Level 2: Sidebar, toolbar — 4px shadow or border
Z-Level 3: Dropdowns, popovers — 8px shadow
Z-Level 4: Modals, command palette — 16px shadow + backdrop dim
Z-Level 5: Toast notifications — 24px shadow (floating above everything)
```

**Key principles:**
- Each z-level should have a slightly different background brightness (darker = further back)
- Shadows should be multi-layered for realism:
  ```css
  /* Premium shadow (not just one box-shadow) */
  .card {
    box-shadow: 
      0 1px 2px rgba(0,0,0,0.04),
      0 2px 4px rgba(0,0,0,0.04),
      0 4px 8px rgba(0,0,0,0.04);
  }
  ```
- Overlays should dim the background (not just blur it) to establish hierarchy
- Dragged elements should gain shadow to show they've "lifted off" the surface

### 2.6 Command Palette Patterns (Cmd+K)

**The 2025-2026 command palette is an AI-native universal interface.**

Best-in-class patterns (from Raycast, Linear, Superhuman):

1. **Architecture:**
   - Single entry point (Cmd+K) that handles: search, navigation, actions, and AI
   - Results grouped by category with clear section headers
   - Recent/frequent items shown by default (before any query)
   - Fuzzy matching with highlighted matched characters

2. **Design:**
   - Centered on screen, ~640px wide, max 480px tall
   - Frosted glass background with subtle border
   - Large input field (44px height) with search icon and clear button
   - Results as rows with icon, title, subtitle, and keyboard shortcut on the right
   - Active item highlighted with accent color background
   - Smooth scroll, not pagination

3. **Behavior:**
   - Opens in <100ms (no loading state)
   - Results filter as you type with <50ms latency
   - Arrow keys + Enter for selection
   - Tab for category navigation
   - Esc to close (or click outside)
   - Nested commands: type ">" for actions, "/" for navigation, "@" for mentions
   - AI mode: natural language that converts to actions ("move all tasks from today to tomorrow")

4. **TADA-specific commands:**
   ```
   "add task Buy groceries tomorrow"    → Creates task with date
   "show overdue"                        → Filters to overdue tasks
   "focus mode"                          → Enters distraction-free mode
   "plan my day"                         → AI-powered daily planning
   "move everything to next week"        → Bulk reschedule
   "what should I work on?"              → AI priority suggestion
   ```

### 2.7 Gesture-Based Interactions

**For web (desktop + mobile web):**

1. **Swipe gestures on task rows (mobile):**
   - Swipe right: Complete task (green indicator)
   - Swipe left: Postpone/reschedule (amber indicator)
   - Long swipe left: Delete (red indicator)
   - Each gesture reveals an icon + color that scales with swipe distance

2. **Drag gestures:**
   - Drag to reorder (with haptic-like visual feedback)
   - Drag to a different project/section
   - Drag to calendar to schedule (if calendar view is visible)
   - Drag task to sidebar navigation items to move between projects

3. **Pinch/zoom (mobile):**
   - Pinch to collapse/expand task detail levels
   - Pinch out on timeline to zoom into day view

4. **Pull to refresh:**
   - Custom animation (not the default browser one)
   - Shows sync status with a subtle indicator

### 2.8 Skeleton Loading States

**The 2025-2026 approach: "Optimistic UI first, skeleton as fallback."**

1. **For initial load:**
   - Skeleton should match the *exact layout* of the content it replaces
   - Use shimmer animation (gradient sweep) at 1.5s duration
   - Stagger skeleton row appearance (each row 50ms after the previous)
   - Round all skeleton shapes (no sharp rectangles)

2. **For subsequent loads:**
   - Prefer optimistic updates: show the result immediately, reconcile with server
   - If data must load, keep stale data visible with a subtle loading indicator (spinning icon in the header, not a full skeleton)

3. **Implementation:**
   ```tsx
   // Shimmer animation
   const shimmer = keyframes`
     0% { background-position: -200% 0; }
     100% { background-position: 200% 0; }
   `;
   
   const SkeletonLine = styled.div`
     height: 14px;
     border-radius: 7px;
     background: linear-gradient(
       90deg, 
       var(--color-surface-sunken) 25%, 
       var(--color-surface-elevated) 50%, 
       var(--color-surface-sunken) 75%
     );
     background-size: 200% 100%;
     animation: ${shimmer} 1.5s ease-in-out infinite;
   `;
   ```

### 2.9 Empty State Design

**Empty states are your best onboarding opportunity.**

1. **First-time empty state ("Zero state"):**
   - NOT just an illustration + "Nothing here yet"
   - Instead: a compelling call to action that teaches the product
   - Example for TADA's task list:
     - Headline: "Your day is wide open"
     - Subtext: "Type anything to add a task, or try: 'Plan my week'"
     - An inline input field RIGHT in the empty state (not a button that opens a modal)
     - Subtle animated gradient background that feels alive
     - Three suggested starter tasks (editable templates)

2. **Completed-all-tasks empty state:**
   - Celebratory! This is a reward moment.
   - "You did it. Everything's done." with a subtle particle animation
   - Show a summary: "4 tasks completed today"
   - Maybe a contextual suggestion: "Want to plan tomorrow?"

3. **Search-no-results empty state:**
   - Acknowledge the search term: "No tasks matching 'xyzzy'"
   - Offer alternatives: "Create a task called 'xyzzy'?" (one click)
   - Show recent tasks as fallback suggestions

4. **Error empty states:**
   - Friendly, not technical: "Something went sideways" not "Error 500"
   - Auto-retry with visual countdown
   - Manual retry button as fallback

### 2.10 Onboarding Flows

**The 2025-2026 onboarding trend: "Use the product to onboard into the product."**

1. **Progressive onboarding (NOT a tutorial wizard):**
   - Step 1: Ask for name and one thing they want to accomplish today → immediately creates their first task
   - Step 2: Show the task they just created, let them interact with it
   - Step 3: Contextual tooltips appear as they discover features (not all at once)
   - Step 4: After 3 days, suggest keyboard shortcuts based on their usage patterns

2. **Template-based onboarding:**
   - "What do you want to use TADA for?" → Personal / Work / Both
   - Pre-populate with relevant template projects
   - Let users delete/modify immediately — don't lock them into a flow

3. **Coachmarks, not tutorials:**
   - Subtle pulsing dots on undiscovered features
   - Click to get a 5-second explanation, not a 5-minute tutorial
   - Dismiss forever with one click
   - Track which features the user has discovered, don't repeat

4. **The "magic moment" should happen in <30 seconds:**
   - For TADA: Type something → see it become a task with AI-parsed date/priority → feel the satisfaction of organization
   - This is the hook. Everything else can wait.

---

## 3. What Makes a Todo App Feel "Built for the Future"

### 3.1 AI-Native Features

**AI should be invisible infrastructure, not a chatbot button.**

1. **Smart Categorization:**
   - Auto-detect project/context from task text: "Buy milk" → 🛒 Shopping, "Review PR #423" → 💻 Work
   - Learn from user corrections to improve over time
   - Never force — always suggest with one-tap accept/reject

2. **Natural Language Input (NLI):**
   - This is now **table stakes**. Every modern todo app has it.
   - "Call dentist next Tuesday at 2pm high priority" → Task: Call dentist | Date: Tue Feb 28 2:00 PM | Priority: High
   - Show parsing in real-time as the user types (Todoist does this well)
   - Support relative dates: "in 3 days", "next week", "end of month"
   - Support recurring: "every weekday at 9am", "first Monday of each month"

3. **AI Daily Planning:**
   - "Plan my day" generates a suggested schedule based on:
     - Task priorities and deadlines
     - Calendar availability (if integrated)
     - User's historical productivity patterns (when they complete the most tasks)
     - Energy level estimation (heavy tasks in the morning, light in the afternoon)
   - Presents as a suggestion, not a mandate — user can rearrange/reject

4. **Smart Suggestions:**
   - "You haven't looked at 'Taxes' in 3 weeks. Deadline is in 10 days."
   - "You usually complete design tasks on Wednesday. Move this there?"
   - "This task has been rescheduled 4 times. Break it into smaller steps?"
   - Surface in a dedicated "AI Suggestions" section or inline as subtle hints

5. **Conversational Task Refinement:**
   - After creating a vague task like "Plan vacation", AI offers:
     - "Want to break this down? I can suggest steps like: research destinations, check budget, book flights..."
   - This is progressive disclosure powered by AI

### 3.2 Ambient / Calm Computing Principles

**Based on Mark Weiser's calm computing and Amber Case's "Calm Technology" principles:**

1. **Information at the periphery:**
   - The app should convey status without demanding attention
   - A subtle ambient color or gradient that shifts based on:
     - Number of tasks remaining (vibrant when fresh, muted when clear)
     - Time pressure (warms up as deadlines approach)
   - Never use aggressive notifications for non-urgent items

2. **Respect attention:**
   - No badge counts by default (make them opt-in)
   - No push notifications for "You haven't opened TADA today!" — this is hostile UX
   - Daily digest (morning email or push) instead of per-task notifications
   - "Focus Mode" that hides everything except the current task

3. **Glanceable status:**
   - The app icon/favicon should convey state:
     - Green dot: all caught up
     - Amber dot: tasks due today
     - Red dot: overdue items
   - Dashboard view should be a 2-second glance, not a 2-minute read

4. **Appropriate urgency:**
   - Only overdue + high priority tasks should feel urgent
   - Everything else should feel like a helpful suggestion
   - Visual hierarchy enforces this: urgent items are bold + colored, everything else is neutral

### 3.3 Context-Aware UI

1. **Time of Day Adaptation:**
   ```
   Morning (6am-12pm):   "Good morning. Here's your day."
   Afternoon (12pm-5pm): "Afternoon check-in. 3 tasks remaining."
   Evening (5pm-9pm):    "Winding down. 1 task left for today."
   Night (9pm-6am):      Dark mode auto-enabled. "Planning for tomorrow?"
   ```

2. **Day-of-Week Awareness:**
   - Monday: "New week. Let's plan." → Show weekly overview
   - Friday: "Almost weekend. What needs to close out?"
   - Weekend: Relaxed UI, only show personal tasks by default

3. **Energy-Level Estimation:**
   - Track when users complete tasks (what times of day)
   - Suggest hard tasks during peak productivity hours
   - Suggest light tasks during low-energy periods
   - This is opt-in and explained transparently

### 3.4 Progressive Disclosure

**TADA should have 5 "depth levels" of complexity:**

| Level | User Type | What They See |
|-------|-----------|---------------|
| 1 | Brand new | Task input + simple list. Nothing else. |
| 2 | Week 1 | + Projects, dates, priorities visible |
| 3 | Month 1 | + Filters, tags, recurring tasks, keyboard shortcuts |
| 4 | Power user | + Custom views, automation, API, templates |
| 5 | Expert | + Scripting, webhooks, advanced filters, bulk operations |

**Key implementation principles:**
- Never show Level 3+ features to Level 1 users
- Unlock features through usage, not settings
- Always provide an escape hatch to manually enable features ("Show advanced options")
- The UI should literally have fewer elements on screen for new users

### 3.5 Conversational UI Elements

1. **AI Chat Sidebar:**
   - Not a chatbot window — a persistent assistant panel
   - "What's on my plate this week?" → Shows a summary
   - "I'm feeling overwhelmed" → Suggests deferring low-priority tasks
   - "What did I accomplish last week?" → Shows completion stats

2. **Inline AI Suggestions:**
   - Appear below the task input as subtle, dismissable chips
   - "Did you mean tomorrow?" when you type "tmrw"
   - "Add to Shopping?" when you type a grocery item
   - "This seems urgent — set high priority?" for time-sensitive language

3. **Natural Language Filters:**
   - Instead of complex filter UI: type "overdue tasks in Work project"
   - The filter input IS the command palette

### 3.6 Adaptive Layouts

1. **Screen-Size Responsive (not just breakpoints):**
   - Desktop (>1200px): Three-column layout (sidebar + list + detail)
   - Laptop (900-1200px): Two-column (sidebar + list, detail as overlay)
   - Tablet (600-900px): Single column with tab bar, sidebar as drawer
   - Mobile (<600px): Single column, bottom tab bar, swipe navigation

2. **Content-Density Responsive:**
   - Few tasks (<10): Spacious layout, large cards, visual emphasis
   - Many tasks (10-30): Compact list, smaller spacing
   - Very many tasks (30+): Dense table-like layout, horizontal scrolling for metadata

3. **User-Preference Responsive:**
   - "Compact mode" toggle in settings
   - Sidebar width is user-adjustable and remembered
   - Font size slider (not just accessibility — personal preference)

---

## 4. Specific UI Component Patterns

### 4.1 Task Input That Feels Magical

**The single most important interaction in the entire app.**

**Design inspiration:** Linear's issue creation + Things 3's quick entry + Todoist's natural language parsing

**Architecture:**
```
┌─────────────────────────────────────────────────────────┐
│ ✦  What needs to happen?                    ⌘ + Enter  │
│                                                         │
│  [ AI parsing preview appears here as you type ]        │
│                                                         │
│  ┌──────┐ ┌──────────┐ ┌────────┐ ┌───────┐            │
│  │📅 Date│ │🏷 Project │ │⚡Priority│ │🏷 Tags │            │
│  └──────┘ └──────────┘ └────────┘ └───────┘            │
│                                                         │
│  📎 Attach  |  📝 Add notes  |  ✅ Subtasks  |  🔁 Repeat │
└─────────────────────────────────────────────────────────┘
```

**Key behaviors:**
1. **Global shortcut** (Cmd+N or just `/`) opens a centered, floating input
2. **Auto-grows** as you type — starts as single line, expands to multi-line
3. **Real-time NLP parsing:** As you type "Call dentist Tuesday at 2pm", the date chips appear below the input in real-time, highlighted to show what was parsed
4. **Tab through metadata:** After typing the title, Tab moves to date picker, Tab to project, Tab to priority — all keyboard, no mouse required
5. **Rich text support:** Markdown formatting, @mentions, #tags inline
6. **Submit feels satisfying:** On Enter, the task "drops" into the list with a spring animation, the input clears with a subtle scale-down, and the new task briefly glows with the accent color
7. **Undo is always available:** Toast appears with "Task created" + Undo button for 5 seconds
8. **Multiple tasks in sequence:** After creating a task, the input stays focused for rapid entry. Esc to close.

**The anti-patterns to avoid:**
- ❌ Modal dialog with 8 required fields before you can save
- ❌ Separate "quick add" and "full add" — one input that progressively discloses
- ❌ "Create" button that's hard to find — input should be ALWAYS visible or one shortcut away
- ❌ Losing the input content on accidental Esc — draft should persist

### 4.2 Sidebar Navigation vs. Tab Navigation

**Recommendation for TADA: Sidebar on desktop, bottom tabs on mobile.**

**Desktop Sidebar Design:**
```
┌──────────────────┐
│  ✦ TADA          │  ← Logo/brand mark
│                  │
│  ☀️  Today    12  │  ← Smart list with count badge
│  📅 Upcoming  28  │
│  📥 Inbox      3  │
│  ✅ Completed    │
│                  │
│  ─── Projects ── │  ← Collapsible section
│  🔵 Work       8  │
│  🟣 Personal   5  │
│  🟢 Side Proj  2  │
│  + New Project   │
│                  │
│  ─── Tags ────── │
│  # urgent        │
│  # waiting       │
│                  │
│  ──────────────  │
│  ⚡ Focus Mode    │  ← Utility actions
│  🤖 AI Assistant  │
│  ⚙️  Settings     │
│                  │
│  ┌────────────┐  │
│  │ 👤 Username │  │  ← User profile at bottom
│  └────────────┘  │
└──────────────────┘
```

**Key design decisions:**
- Sidebar width: 240px default, collapsible to 64px (icons only), expandable to 320px
- Collapse/expand with a smooth width animation (200ms ease-out)
- Hover to temporarily expand when collapsed
- Active item: accent color background (low opacity) + accent color text
- Counts are right-aligned, using tabular numbers
- Project colors are customizable circles (not emoji — more elegant)
- Drag to reorder projects and tags

**Mobile Bottom Tabs:**
```
┌──────────────────────────────────┐
│  ☀️ Today  │  📥 Inbox  │  🔍 Search │  ⚙️ More  │
└──────────────────────────────────┘
```
- 4 tabs maximum (Things 3 principle)
- Active tab: filled icon + accent color, label visible
- Inactive tabs: outline icon + secondary color, label visible but muted
- Tab switch: instant crossfade on content, no slide animation (feels faster)

### 4.3 Card-Based vs. List-Based Task Views

**Recommendation: Default to list, offer card view as an option.**

**List View (Primary):**
```
┌─────────────────────────────────────────────────────────┐
│ ○  Buy groceries                    📅 Today   🔵 Personal │
│ ○  Review Q1 budget report          📅 Tomorrow 🟣 Work    │
│ ○  Call dentist                     📅 Feb 28   🔵 Personal │
│ ◉  Reply to Sarah's email           📅 Today   🟣 Work    │ ← In progress (filled)
│ ☑  Send invoice                     ✓ 2h ago   🟣 Work    │ ← Completed (dimmed)
└─────────────────────────────────────────────────────────┘
```
- Checkbox on left, task title, metadata on right
- Hover reveals inline action buttons (edit, postpone, priority)
- Click to expand inline (Things 3 pattern — don't navigate away)
- Swipe gestures on mobile
- Group by: Date / Project / Priority / None

**Card/Board View (Kanban-style, optional):**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   To Do      │ │  In Progress │ │    Done      │
│              │ │              │ │              │
│ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
│ │Buy groc. │ │ │ │Reply     │ │ │ │Invoice   │ │
│ │📅 Today   │ │ │ │Sarah's   │ │ │ │✓ 2h ago  │ │
│ └──────────┘ │ │ │email     │ │ │ └──────────┘ │
│ ┌──────────┐ │ │ │📅 Today   │ │ │              │
│ │Review    │ │ │ └──────────┘ │ │              │
│ │Q1 budget │ │ │              │ │              │
│ │📅 Tomorrow│ │ │              │ │              │
│ └──────────┘ │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
```
- Cards with subtle shadow and rounded corners (12px)
- Drag between columns with spring animation
- Card shows: title, date, project color dot, priority indicator
- Expanded card (on click): full task details in a slide-over panel

**Calendar View (Third option):**
- Weekly grid with tasks placed at their scheduled times
- Unscheduled tasks in a sidebar
- Drag tasks onto the calendar to schedule them
- Todoist and Notion Calendar do this well

### 4.4 Calendar Integration Patterns

**TADA should show calendar alongside tasks, not replace the calendar app.**

1. **Mini Calendar Widget:**
   - Small month view in the sidebar for date navigation
   - Dots under dates that have tasks
   - Click a date to filter tasks to that day

2. **Timeline/Agenda Sidebar:**
   - Right panel showing today's schedule: calendar events + tasks interleaved
   - Calendar events are non-editable (just reference)
   - Tasks can be dragged onto time slots
   - Time blocks show availability clearly

3. **Full Calendar View:**
   - Week view with time grid
   - Tasks appear as blocks at their scheduled time
   - All-day tasks at the top
   - Drag to create new tasks directly on the calendar
   - Color-coded by project

**Integration approach:**
- Google Calendar and Apple Calendar via API
- Read-only for calendar events (don't try to be a calendar app)
- Two-way sync for tasks with dates (task date changes update the calendar)
- Show "busy" blocks from calendar when planning tasks

### 4.5 Timeline / Agenda Views

**The "Today" view is the most-used screen in any todo app. It needs to be perfect.**

```
┌─────────────────────────────────────────────────────┐
│  ☀️  Tuesday, February 24                            │
│  "You have 6 tasks and 3 meetings today"            │
│                                                     │
│  ── Morning ──────────────────────────────────────  │
│  09:00  📅 Team standup (Google Calendar)            │
│  09:30  ○  Review PR #423                  🟣 Work   │
│  10:00  ○  Write design doc for v2         🟣 Work   │
│                                                     │
│  ── Afternoon ────────────────────────────────────  │
│  13:00  📅 1:1 with Manager (Google Calendar)       │
│  14:00  ○  Call dentist                   🔵 Personal│
│  15:00  📅 Design review (Google Calendar)          │
│                                                     │
│  ── Evening ──────────────────────────────────────  │
│  18:00  ○  Buy groceries                  🔵 Personal│
│                                                     │
│  ── Unscheduled Today ───────────────────────────  │
│  ○  Reply to Sarah's email               🟣 Work    │
│  ○  Read chapter 5                       🟢 Learning │
│                                                     │
│  ── Completed ───────────────────────────────────  │
│  ☑  Send invoice                    ✓ 9:15 AM       │
│  ☑  Water plants                    ✓ 7:30 AM       │
└─────────────────────────────────────────────────────┘
```

**Key design decisions:**
- Time-based grouping (Morning/Afternoon/Evening) not just a flat list
- Calendar events interleaved to show the full picture
- Unscheduled tasks have their own section (not lost)
- Completed tasks shown at bottom, collapsed by default
- The greeting changes based on time of day
- Count summary gives a glanceable sense of the day
- Empty time blocks suggest free time for deep work

### 4.6 Drag and Drop That Feels Buttery

**Implementation with Framer Motion + dnd-kit or @hello-pangea/dnd:**

1. **Pick-up animation:**
   ```tsx
   const dragVariants = {
     idle: { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", rotate: 0 },
     dragging: { 
       scale: 1.03, 
       boxShadow: "0 12px 28px rgba(0,0,0,0.15)", 
       rotate: 1.5,
       transition: { type: "spring", stiffness: 400, damping: 20 }
     },
     dropping: { 
       scale: 1, 
       boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
       rotate: 0,
       transition: { type: "spring", stiffness: 300, damping: 25 }
     }
   }
   ```

2. **Space-making animation:**
   - Other items animate smoothly to make space (layout animation)
   - Use `<LayoutGroup>` from Motion to synchronize all items
   - Gap appears with a subtle colored line indicator showing where the item will land

3. **Drop animation:**
   - Spring physics for the settle (stiffness: 300, damping: 25)
   - Brief background flash on the dropped item (100ms accent color pulse)
   - Other items animate back to position

4. **Cross-container drag:**
   - Dragging a task over a project in the sidebar highlights that project
   - Dropping completes the move with a confirmation toast
   - The task animates out of the original list and into the new one

5. **Touch-specific:**
   - Long-press (200ms) to initiate drag on mobile
   - Haptic feedback on pick-up and drop (via Haptic API)
   - Larger grab handle on mobile (at least 44px touch target)

### 4.7 Notification / Toast Design

**Toast notifications should be informative, dismissable, and never obstructive.**

```
┌──────────────────────────────────────────┐
│  ✅  Task completed: "Send invoice"       │
│  ┌────────────────────────────┐          │
│  │ ■■■■■■■■■■■■■░░░░░░░░░░░ │  Undo    │
│  └────────────────────────────┘          │
└──────────────────────────────────────────┘
```

**Design specifications:**
- Position: bottom-center (mobile) or bottom-right (desktop)
- Width: min 320px, max 480px
- Background: solid surface color (not transparent — readability matters)
- Border: 1px solid border color + 8px border-radius
- Shadow: Level 5 (floating)
- Entry: slide up + fade in with spring (stiffness: 500, damping: 30)
- Exit: slide down + fade out (150ms ease-in)
- Auto-dismiss: 5 seconds for info, 8 seconds for actions, never for errors
- Progress bar: thin line at bottom showing time remaining
- Stack: up to 3 visible, oldest dismissed automatically
- Pause timer on hover
- Swipe to dismiss on mobile

**Toast types:**
1. **Success** (green accent): Task completed, task created, sync complete
2. **Info** (blue accent): "3 tasks moved to Tomorrow"
3. **Warning** (amber accent): "Task is overdue"
4. **Error** (red accent): "Couldn't save. Retrying..." with manual retry button
5. **Undo** (neutral): Any destructive action gets 5s undo window

### 4.8 Settings / Preference Panels

**Design as a single-page layout with sections, not a multi-page wizard.**

```
┌─────────────────────────────────────────────────────┐
│  ← Settings                                         │
│                                                     │
│  ── Account ─────────────────────────────────────  │
│  👤 Profile photo, name, email                      │
│  🔗 Connected accounts (Google, Apple)              │
│                                                     │
│  ── Appearance ──────────────────────────────────  │
│  🎨 Theme: Light / Dark / System / Auto            │
│  🔤 Font size: [slider]                            │
│  📐 Density: Comfortable / Compact                 │
│  🎭 Accent color: [color picker]                   │
│                                                     │
│  ── Notifications ───────────────────────────────  │
│  🔔 Daily digest: On                               │
│  📱 Push notifications: [granular controls]         │
│  📧 Email summary: Weekly                           │
│                                                     │
│  ── AI & Smart Features ────────────────────────  │
│  🤖 Smart categorization: On                       │
│  💬 AI suggestions: On                              │
│  🗓 Auto-scheduling: Off                            │
│  🧠 Learn from my patterns: On                     │
│                                                     │
│  ── Keyboard Shortcuts ─────────────────────────  │
│  ⌨️ [searchable list of all shortcuts]              │
│                                                     │
│  ── Data & Privacy ──────────────────────────────  │
│  📤 Export all data                                 │
│  🗑 Delete account                                  │
└─────────────────────────────────────────────────────┘
```

**Key principles:**
- Searchable settings (Cmd+K should find settings too)
- Changes apply immediately (no "Save" button) with undo toast
- Toggle switches, not checkboxes (more modern, better touch targets)
- Group related settings with clear section headers
- "Recommended" badges on AI features during initial setup
- Preview changes in real-time where possible (theme, font size, accent color)

### 4.9 Profile / Avatar Elements

1. **Avatar design:**
   - 32px in sidebar, 40px in settings, 24px in comments/mentions
   - Rounded square (border-radius: 8px for 32px, proportional for other sizes) — NOT circle (feels more modern)
   - Fallback: Two-letter initials on a gradient background generated from the user's name
   - Subtle 1px border in surface color to separate from background

2. **Profile presence:**
   - In bottom-left of sidebar: Avatar + Name + status indicator
   - Click to open profile flyout: photo, name, email, plan type, theme toggle, sign out
   - Status options: 🟢 Active, 🟡 Away, 🔴 Do Not Disturb, ⚫ Invisible

3. **Gravatar / upload support:**
   - Allow photo upload with crop tool
   - Fall back to Gravatar/initials
   - Avatar updates reflect everywhere instantly

---

## 5. Color Palette Recommendations

### TADA Signature Palette: "Midnight Bloom"

**Philosophy:** Most productivity apps use either blue (generic) or purple (overused). TADA should feel distinctive. This palette is built around **deep navy** as the primary dark, **warm coral** as the primary accent, and **sage green** as the secondary accent. It's distinctive, warm, and premium without being garish.

### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-base` | `#FAFAF8` | Main background (warm white, not pure white) |
| `--surface-elevated` | `#FFFFFF` | Cards, elevated surfaces |
| `--surface-sunken` | `#F2F1EE` | Input backgrounds, inset areas |
| `--surface-overlay` | `rgba(255,255,255,0.80)` | Glassmorphism overlays |
| `--text-primary` | `#1A1A2E` | Main text (deep navy, not pure black) |
| `--text-secondary` | `#6B6B80` | Secondary text, metadata |
| `--text-tertiary` | `#9D9DAF` | Timestamps, hints |
| `--accent-primary` | `#E8634A` | Primary CTA, active states (warm coral) |
| `--accent-primary-hover` | `#D5533B` | Hover state |
| `--accent-primary-subtle` | `#FFF0ED` | Selected item background |
| `--accent-secondary` | `#5B8A72` | Secondary accent (sage green) — for success, completion |
| `--accent-secondary-subtle` | `#EFF5F1` | Completed task background |
| `--accent-tertiary` | `#7C6CBF` | Tertiary accent (soft violet) — for AI features |
| `--accent-tertiary-subtle` | `#F3F0FA` | AI suggestion background |
| `--border-default` | `#E8E7E4` | Default borders |
| `--border-subtle` | `#F0EFEC` | Subtle borders (between list items) |
| `--status-overdue` | `#D94F3D` | Overdue tasks |
| `--status-due-today` | `#E8914A` | Due today (amber) |
| `--status-upcoming` | `#4A90D9` | Future tasks (calm blue) |

### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-base` | `#121218` | Main background (deep navy-black) |
| `--surface-elevated` | `#1C1C28` | Cards, elevated surfaces |
| `--surface-sunken` | `#0C0C12` | Input backgrounds, inset areas |
| `--surface-overlay` | `rgba(28,28,40,0.85)` | Glassmorphism overlays |
| `--text-primary` | `#EDEDF0` | Main text (soft white, not pure white) |
| `--text-secondary` | `#8E8EA0` | Secondary text |
| `--text-tertiary` | `#5C5C6E` | Timestamps, hints |
| `--accent-primary` | `#F07B65` | Primary accent (lighter coral for dark bg) |
| `--accent-primary-hover` | `#F49280` | Hover state |
| `--accent-primary-subtle` | `rgba(240,123,101,0.12)` | Selected item background |
| `--accent-secondary` | `#6DAF8A` | Secondary (sage green, slightly brighter) |
| `--accent-secondary-subtle` | `rgba(109,175,138,0.10)` | Completed task background |
| `--accent-tertiary` | `#9B8ED9` | Tertiary (violet, slightly brighter) |
| `--accent-tertiary-subtle` | `rgba(155,142,217,0.10)` | AI suggestion background |
| `--border-default` | `#2A2A3A` | Default borders |
| `--border-subtle` | `#1E1E2E` | Subtle borders |

### Project Colors (8 distinct, accessible colors)

| Color | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| Coral | `#E8634A` | `#F07B65` | Default / first project |
| Ocean | `#3D7EC7` | `#5A99E0` | Work projects |
| Sage | `#5B8A72` | `#6DAF8A` | Personal / health |
| Amber | `#C98B2E` | `#E0A640` | Finance / urgent |
| Violet | `#7C6CBF` | `#9B8ED9` | Creative / learning |
| Rose | `#C75C8A` | `#E07AA5` | Relationships / social |
| Teal | `#3A9B9B` | `#4DBDBD` | Side projects |
| Slate | `#6B7A8D` | `#8899AA` | Miscellaneous |

### Why This Palette Works
1. **Warm coral accent** is distinctive — no major todo app uses it as primary
2. **Deep navy text** (not pure black) feels more refined and is easier on the eyes
3. **Sage green for success** feels organic and calming (vs. the aggressive green most apps use)
4. **Violet for AI** creates a distinct visual language for smart features
5. **Warm white background** (#FAFAF8) has a subtle warmth that feels premium (like Craft, Things 3)
6. **The dark mode has navy undertones** instead of pure gray — feels more intentional and unique

---

## 6. Typography Recommendations

### Primary Recommendation: **Inter** (with alternatives)

#### Option A: Inter (Safe, Proven, Premium)
- **Why:** Variable font with 9 weights, excellent at small sizes, used by Linear/Raycast/Vercel
- **Where:** https://fonts.google.com/specimen/Inter
- **Variable axes:** `wght` (100-900), `slnt` (-10-0), `opsz` (auto)
- **Risk:** Very popular — might feel "too Silicon Valley" for a consumer app

#### Option B: Geist (Modern, Distinctive) ⭐ RECOMMENDED
- **Why:** Created by Vercel, designed for interfaces, feels fresh in 2025-2026
- **Where:** https://vercel.com/font (free, open source)
- **Distinctive quality:** Slightly more geometric than Inter, with a unique personality
- **Pairs well with:** Geist Mono for code/numbers
- **Risk:** Newer, less battle-tested than Inter

#### Option C: Satoshi (Premium, Unique)
- **Why:** Geometric sans-serif that feels different from the Inter/SF Pro crowd
- **Where:** https://www.fontshare.com/fonts/satoshi (free for commercial use)
- **Distinctive quality:** Rounder, friendlier without being childish
- **Risk:** Not a Google Font (requires self-hosting)

#### Option D: Plus Jakarta Sans (Warm, Approachable)
- **Why:** Variable font with a warm, slightly rounded character — perfect for a consumer app
- **Where:** https://fonts.google.com/specimen/Plus+Jakarta+Sans
- **Distinctive quality:** Modern geometric with subtle warmth — more personality than Inter
- **Risk:** Less known, which is actually a benefit for distinctiveness

### Font Stack Recommendation

```css
/* Primary (for TADA, I recommend Geist or Plus Jakarta Sans) */
--font-sans: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, sans-serif;

/* Monospace (for time displays, numbers, code) */
--font-mono: 'Geist Mono', 'JetBrains Mono', 'SF Mono', 'Fira Code', 
             'Cascadia Code', monospace;
```

### Type Scale (Based on a 1.25 ratio)

```css
/* TADA Type Scale */
--text-xs:    0.75rem;   /* 12px — Timestamps, badges */
--text-sm:    0.875rem;  /* 14px — Metadata, secondary info */
--text-base:  1rem;      /* 16px — Body text, task titles */
--text-lg:    1.125rem;  /* 18px — Section headers */
--text-xl:    1.25rem;   /* 20px — Page titles */
--text-2xl:   1.5rem;    /* 24px — Feature headers */
--text-3xl:   1.875rem;  /* 30px — Marketing/hero text */
--text-4xl:   2.25rem;   /* 36px — App title/brand */

/* Font weights */
--font-normal:    400;   /* Body text */
--font-medium:    500;   /* Emphasized body, active nav items */
--font-semibold:  600;   /* Section headers, button labels */
--font-bold:      700;   /* Page titles, key numbers */

/* Letter spacing */
--tracking-tight:  -0.025em;  /* Headers */
--tracking-normal:  0;         /* Body */
--tracking-wide:    0.025em;  /* Uppercase labels, badges */

/* Line height */
--leading-tight:   1.25;   /* Headers, single-line items */
--leading-normal:  1.5;    /* Body text */
--leading-relaxed: 1.625;  /* Long-form content, notes */
```

### Typography Hierarchy in Practice

```
App Title (TADA):     36px / Bold / -0.03em tracking / Deep navy
Page Title:           24px / Bold / -0.025em / Deep navy  
Section Header:       18px / Semibold / -0.02em / Deep navy
Task Title:           16px / Medium / normal tracking / Primary text
Task Metadata:        14px / Normal / normal / Secondary text
Timestamp:            12px / Normal / 0.02em tracking / Tertiary text (mono)
Badge/Label:          11px / Semibold / 0.05em / Uppercase / Accent color
```

---

## 7. Motion & Animation Guidelines

### Core Principles

1. **Fast by default:** No animation should exceed 400ms. Most should be 150-250ms.
2. **Spring physics for spatial movement:** Anything that moves through space uses springs.
3. **Easing curves for opacity/color:** Fades and color changes use ease-out curves.
4. **Purpose over spectacle:** Every animation must answer "what does this help the user understand?"
5. **Respect reduced motion:** Always check `prefers-reduced-motion` and provide instant alternatives.

### TADA Animation Tokens

```tsx
// /lib/motion.ts — TADA animation constants

export const MOTION = {
  // Spring configurations
  spring: {
    snappy: { type: "spring", stiffness: 500, damping: 30 },    // Buttons, toggles
    smooth: { type: "spring", stiffness: 300, damping: 25 },     // List reordering, drops
    gentle: { type: "spring", stiffness: 200, damping: 20 },     // Page transitions, modals
    bouncy: { type: "spring", stiffness: 400, damping: 15 },     // Celebratory moments
  },
  
  // Duration-based configurations
  duration: {
    instant: { duration: 0.1, ease: "easeOut" },                 // Hover states
    fast:    { duration: 0.15, ease: "easeOut" },                 // Color changes, opacity
    normal:  { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },     // Most transitions
    slow:    { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },     // Complex transitions
    deliberate: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },  // Onboarding, first-time reveals
  },
  
  // Stagger configurations (for lists)
  stagger: {
    fast: 0.03,    // Dense lists (task items)
    normal: 0.05,  // Standard lists
    slow: 0.08,    // Feature reveals, onboarding
  },
} as const;
```

### Specific Animation Patterns

#### 1. Task Completion Animation
```tsx
// The most satisfying micro-interaction in the app
const TaskCheckbox = ({ completed, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.85 }}
      transition={MOTION.spring.snappy}
    >
      <motion.svg viewBox="0 0 24 24">
        {/* Circle border */}
        <motion.circle
          cx={12} cy={12} r={10}
          stroke={completed ? "var(--accent-secondary)" : "var(--border-default)"}
          strokeWidth={2}
          fill={completed ? "var(--accent-secondary)" : "transparent"}
          animate={{ 
            fill: completed ? "var(--accent-secondary)" : "transparent",
            stroke: completed ? "var(--accent-secondary)" : "var(--border-default)"
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Checkmark path - draws itself */}
        <motion.path
          d="M7 12.5l3 3 7-7"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: completed ? 1 : 0, 
            opacity: completed ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        />
      </motion.svg>
    </motion.button>
  );
};

// Task row completion
const TaskRow = ({ task }) => (
  <motion.div
    layout
    animate={{ 
      opacity: task.completed ? 0.5 : 1,
      x: task.completed ? 4 : 0  // Subtle shift right on completion
    }}
    transition={MOTION.spring.smooth}
  >
    {/* ... task content ... */}
  </motion.div>
);
```

#### 2. Command Palette (Cmd+K) Animation
```tsx
const CommandPalette = ({ isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ 
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.3)"
          }}
        />
        {/* Palette */}
        <motion.div
          className="palette"
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={MOTION.spring.snappy}
        >
          {/* Results animate in with stagger */}
          <motion.ul>
            {results.map((result, i) => (
              <motion.li
                key={result.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  ...MOTION.duration.fast, 
                  delay: i * MOTION.stagger.fast 
                }}
              />
            ))}
          </motion.ul>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
```

#### 3. Page/View Transitions
```tsx
// Wrap route content in this
const PageTransition = ({ children, direction = "forward" }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "forward" ? 20 : -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction === "forward" ? -20 : 20 }}
    transition={MOTION.duration.normal}
  >
    {children}
  </motion.div>
);
```

#### 4. Task Creation (Drop-in animation)
```tsx
// New task appears at top of list with this animation
const newTaskVariants = {
  initial: { 
    opacity: 0, 
    height: 0, 
    scale: 0.97,
    backgroundColor: "var(--accent-primary-subtle)" 
  },
  animate: { 
    opacity: 1, 
    height: "auto", 
    scale: 1,
    backgroundColor: "transparent",
    transition: {
      height: { ...MOTION.spring.smooth },
      opacity: { duration: 0.2 },
      scale: { ...MOTION.spring.snappy },
      backgroundColor: { duration: 1, delay: 0.3 }  // Glow fades slowly
    }
  }
};
```

#### 5. Sidebar Collapse/Expand
```tsx
const Sidebar = ({ collapsed }) => (
  <motion.nav
    animate={{ width: collapsed ? 64 : 240 }}
    transition={MOTION.spring.smooth}
    style={{ overflow: "hidden" }}
  >
    <motion.div
      animate={{ opacity: collapsed ? 0 : 1 }}
      transition={{ duration: collapsed ? 0.1 : 0.2, delay: collapsed ? 0 : 0.1 }}
    >
      {/* Text labels — hidden when collapsed */}
    </motion.div>
  </motion.nav>
);
```

#### 6. List Item Stagger (Initial Load)
```tsx
const TaskList = ({ tasks }) => (
  <motion.ul>
    {tasks.map((task, i) => (
      <motion.li
        key={task.id}
        layout  // Enable layout animations for reordering
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        transition={{
          ...MOTION.spring.smooth,
          delay: i * MOTION.stagger.fast,
          // Layout transition for reordering
          layout: { ...MOTION.spring.smooth }
        }}
      >
        <TaskRow task={task} />
      </motion.li>
    ))}
  </motion.ul>
);
```

#### 7. Drag and Drop
```tsx
const DraggableTask = ({ task }) => (
  <motion.div
    layoutId={task.id}
    drag
    dragSnapToOrigin
    whileDrag={{ 
      scale: 1.03, 
      boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
      rotate: 1.5,
      zIndex: 50,
      cursor: "grabbing"
    }}
    transition={MOTION.spring.smooth}
    style={{ cursor: "grab" }}
  />
);
```

#### 8. Toast Notification
```tsx
const Toast = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    transition={MOTION.spring.snappy}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={(_, info) => {
      if (Math.abs(info.offset.x) > 100) dismiss();
    }}
  />
);
```

#### 9. Hover Reveal (Inline Actions)
```tsx
const TaskActions = ({ visible }) => (
  <motion.div
    initial={{ opacity: 0, x: 8 }}
    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 8 }}
    transition={MOTION.duration.fast}
    style={{ pointerEvents: visible ? "auto" : "none" }}
  >
    <ActionButton icon="edit" />
    <ActionButton icon="calendar" />
    <ActionButton icon="more" />
  </motion.div>
);
```

#### 10. Focus Mode Transition
```tsx
// Everything except the current task fades and blurs
const FocusModeWrapper = ({ focusMode, children }) => (
  <motion.div
    animate={{ 
      filter: focusMode ? "blur(3px)" : "blur(0px)",
      opacity: focusMode ? 0.3 : 1 
    }}
    transition={MOTION.duration.slow}
  >
    {children}
  </motion.div>
);
```

### What Makes Animations Feel Alive vs. Sluggish

| ✅ Feels Alive | ❌ Feels Sluggish |
|----------------|-------------------|
| Spring physics with slight overshoot | Linear easing |
| 150-250ms duration | >400ms duration |
| Staggered entrance (30-50ms delay) | All items appear simultaneously |
| Layout animations for list changes | Jump cuts when items reorder |
| Scale to 0.97 on press (subtle) | Scale to 0.8 on press (too dramatic) |
| Opacity + transform combined | Opacity only (feels flat) |
| Immediate response, deferred animation | Delayed response (>100ms before visual feedback) |
| Exit animations (AnimatePresence) | Items just disappear |
| Interruptible (change direction mid-animation) | Locked until complete |
| Reduced motion alternative provided | Same animation regardless of preference |

### Reduced Motion Support

```tsx
// Always provide this
const prefersReducedMotion = usePrefersReducedMotion();

const transition = prefersReducedMotion 
  ? { duration: 0 }  // Instant
  : MOTION.spring.smooth;
```

### Performance Guidelines

1. **Only animate `transform` and `opacity`** — these are GPU-composited and don't trigger layout/paint
2. **Use `will-change: transform`** on elements that will animate frequently (sidebar, dragged items)
3. **Never animate `height` directly** — use `scale` or Motion's `layout` prop instead
4. **Keep animated elements out of the document flow** when possible (`position: absolute/fixed`)
5. **Use `layout="position"` instead of `layout`** when only position changes (better performance)
6. **Batch animations in `LayoutGroup`** to prevent multiple layout thrashes
7. **Set `layoutDependency`** to minimize unnecessary layout measurements

---

## 8. Summary — TADA Design DNA

### The TADA Design Principles

1. **Speed is the feature.** Everything responds in <100ms. Animations enhance speed, never impede it.
2. **Progressive disclosure, not progressive overwhelm.** New users see a clean slate. Power features emerge through use.
3. **AI is invisible infrastructure.** Smart features work silently. No chatbot mascots, no "AI" badges everywhere.
4. **Calm by default, urgent when necessary.** The app whispers most of the time and only raises its voice for truly important things.
5. **Keyboard-first, mouse-friendly, touch-native.** Every action has a shortcut. Nothing requires a mouse. Touch feels native.
6. **Distinctive, not different for the sake of it.** The coral + navy + sage palette is unique but not weird. The typography is premium but not flashy.

### The Competitive Positioning

```
Things 3: Beautiful but no AI, no collaboration, Apple-only
Todoist: Cross-platform workhorse but feels utilitarian
Linear: Incredible design but built for teams/engineering
Superhuman: Premium feel but email-first
Amie: Beautiful calendar but meeting-focused

TADA: The personal productivity app that feels like it was built in 2026.
      AI-native. Keyboard-first. Beautifully calm. Distinctively warm.
```

### Immediate Next Steps

1. **Build a Figma/design token file** from the color palette and typography in this doc
2. **Prototype the task creation flow** — this is the hero interaction
3. **Implement the command palette** — this is the power-user hook
4. **Set up the motion system** — the animation tokens above are ready to copy into code
5. **Create the "Today" view** — this is the default screen and first impression
6. **Test with real users** within 2 weeks — the design should evolve with feedback

---

*This research document is a living artifact. Update as TADA's design evolves and new trends emerge.*
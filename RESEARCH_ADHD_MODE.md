# TADA ADHD Mode — Research & Design Specification

> **Research Date:** February 23, 2026  
> **Purpose:** Comprehensive research to inform the design of TADA's "ADHD Mode" — a genuinely useful productivity experience for people with ADHD  
> **Status:** Ready for design & development review

---

## Table of Contents

1. [ADHD & Productivity Science](#1-adhd--productivity-science)
2. [Competitive Analysis: Existing ADHD Apps](#2-competitive-analysis-existing-adhd-apps)
3. [UX Patterns for ADHD](#3-ux-patterns-for-adhd)
4. [What ADHD Users Say](#4-what-adhd-users-say)
5. [Clinical Research & Evidence Base](#5-clinical-research--evidence-base)
6. [Design Recommendations for TADA's ADHD Mode](#6-design-recommendations-for-tadas-adhd-mode)
7. [Implementation Roadmap](#7-implementation-roadmap)

---

## 1. ADHD & Productivity Science

### 1.1 Executive Function: The Core Challenge

ADHD is fundamentally a disorder of executive function — the brain's self-management system. Understanding these specific deficits is critical for designing tools that actually help.

**Russell Barkley's Four Areas of Executive Function Impairment:**
1. **Nonverbal working memory** — Difficulty holding information in mind while using it
2. **Internalization of speech (verbal working memory)** — Trouble with self-talk and internal rule-following
3. **Self-regulation of affect/motivation/arousal** — Emotional dysregulation, inconsistent motivation
4. **Reconstitution (planning & generativity)** — Difficulty planning, problem-solving, and generating novel responses

**Tom Brown's Six Clusters of Executive Dysfunction:**
1. Organizing, prioritizing, and activating for tasks
2. Focusing, sustaining, and shifting attention
3. Regulating alertness, sustaining effort, and processing speed
4. Managing frustration and modulating emotions
5. Utilizing working memory and accessing recall
6. Monitoring and self-regulating action

> **Key insight from CHADD:** "Executive function impairments have an adverse effect on an individual's ability to begin, work on and complete tasks." People with ADHD may be "unable to delay responses, thus acting impulsively and without adequate consideration of future consequences."

> **Critical stat:** Research shows ADHD'ers experience approximately a **30% developmental delay in executive functioning** compared to non-ADHD peers (Barkley, 2008). This isn't about trying harder — it's about how the brain is wired.

### 1.2 Specific Challenges That Affect Task Management

#### Working Memory Deficits
- Forgetting what you were about to do mid-action
- Losing track of multi-step instructions
- "Out of sight, out of mind" — if a task isn't visible, it ceases to exist
- Difficulty mentally calculating time or holding schedules in mind

**Design implication:** Tasks and plans must be externalized and always visible. Never rely on users to remember.

#### Time Agnosia (formerly "Time Blindness")
From Tiimo's research: "Time agnosia is a profound disconnection from the passage of time. For many ADHD'ers, this isn't rare — it's a regular, frustrating, and often disorienting experience."

- **Temporal discounting:** ADHD brains prioritize immediate rewards over future outcomes
- **Underestimation of time passage** during focused tasks
- **Inability to "feel" time passing** — the internal clock doesn't sync with reality
- **Dopamine dysregulation** affects time perception; tasks stretch or compress unpredictably
- Hours can pass during hyperfocus without awareness of bodily needs

**Design implication:** Time must be made visible and physical. Analog/visual timers, countdown displays, and time estimation tools are essential — not just digital clocks.

#### Decision Paralysis (Analysis Paralysis)
- Too many choices creates a freeze response
- "When I see 15 tasks on my list, I do none of them"
- The cognitive load of prioritizing is itself paralyzing
- Unclear tasks feel impossible to start because the brain must simultaneously figure out what the task means, where to start, and how long it will take

**Design implication:** Reduce choices. Show one thing at a time. Make the "next step" obvious. Automate prioritization.

#### Task Initiation Difficulty ("The Wall of Awful")
The "Wall of Awful" is a concept describing the emotional barrier between an ADHD person and task completion. It's built from:
- Previous failures and shame
- Fear of failure or imperfection
- Emotional weight of past negative experiences
- Perceived enormity of the task

From Tiimo's task initiation research: "Getting started is often the hardest step... Planners and lists assume motivation is always available. ADHD doesn't work like that."

One ADHD coach's client described it: *"Mornings feel like traffic in my head. Every thought is trying to merge onto the same road, but nothing moves. I know what needs doing, but I can't start."*

**Key mechanisms behind task initiation difficulty:**
- **Dopamine-dependent motivation:** ADHD brains run on low dopamine; boring or unclear tasks don't trigger the internal motivation needed to start
- **Executive function overload:** Planning, prioritizing, sequencing, and regulating focus are already under strain
- **Emotional blocking:** Fear of failure, perfectionism, and past negative experiences create emotional barriers
- **Interest-based nervous system:** Instead of importance-based motivation, ADHD'ers rely on novelty, urgency, interest, or challenge

**Design implication:** Lower the activation energy to zero. "Just open the document" instead of "write the report." Micro-starts. Random task pickers. The 5-minute rule.

#### Hyperfocus (Double-Edged Sword)
- Can be incredibly productive when channeled correctly
- Dangerous when it leads to neglecting other responsibilities, health, or time awareness
- Difficult to redirect once locked in
- Users report losing entire days to hyperfocus on low-priority tasks while critical deadlines pass

**Design implication:** Don't interrupt hyperfocus — but provide gentle time awareness. Allow "focus mode" that protects flow while nudging with time checks.

#### Emotional Dysregulation
- Small setbacks feel catastrophic
- Missed tasks trigger shame spirals
- Streak systems that punish gaps are devastating
- Criticism (even from an app) can trigger Rejection Sensitive Dysphoria (RSD)
- The relationship between effort and emotional state is deeply intertwined

**Design implication:** NEVER shame. NEVER punish missed tasks. Celebrate what was done, not what wasn't. Tone is everything.

#### ADHD Paralysis (Task Paralysis)
From Tiimo's research, ADHD paralysis manifests in three types:
1. **Mental overload** — Too much information, too many tasks, brain shuts down
2. **Task paralysis** — Stuck on a specific task, can't start or continue
3. **Choice paralysis** — Frozen by too many options or decisions

These types often overlap, especially during periods of stress, burnout, or low stimulation.

### 1.3 The Dopamine Connection

ADHD brains process dopamine differently, which directly affects:
- **Motivation:** Tasks that are boring or low in stimulation don't trigger internal motivation
- **Reward processing:** Delayed rewards feel almost non-existent; immediate feedback is essential
- **Focus:** Sustained attention depends on dopamine availability
- **Task switching:** Moving between tasks requires dopamine-mediated flexibility

**Key insight:** The brain responds strongly to immediate feedback. Dopamine neurons signal "reward prediction errors" — when an action is followed by a positive outcome, the brain registers that action as worthwhile (Schultz, Dayan & Montague, 1997). This means small, immediate rewards after task completion can literally rewire motivation patterns.

**What this means for TADA:** Every micro-interaction should provide a dopamine hit. Checking off a task should FEEL good — animation, sound, visual celebration. But rewards must be authentic, not patronizing.

---

## 2. Competitive Analysis: Existing ADHD Apps

### 2.1 Goblin.tools

**What it is:** A collection of small, simple, single-task tools designed for neurodivergent people. AI-powered.

**Key Features:**
- Task breakdown (Magic To-Do): Paste a task, get it broken into manageable sub-steps
- Tone analysis for emails/messages
- Simple, single-purpose tools (each tool does ONE thing)
- Free on web, paid mobile apps
- AI-powered backend

**What they do well:**
- ✅ **Radical simplicity** — Each tool does exactly one thing
- ✅ Task decomposition is the killer feature — paste "clean the house" and get 12 specific steps
- ✅ Free and accessible
- ✅ No account required, no setup friction
- ✅ Designed BY neurodivergent people FOR neurodivergent people

**What's missing:**
- ❌ No integrated task management — it's a utility, not a planner
- ❌ No time awareness/timer features
- ❌ No progress tracking or motivation feedback
- ❌ No scheduling or calendar integration
- ❌ No social/accountability features
- ❌ Individual tools are siloed — no workflow connecting them

**TADA Opportunity:** Goblin.tools proves that AI-powered task breakdown is the #1 most-wanted feature. TADA should build this in natively, but CONNECT it to actual task management.

### 2.2 Tiimo

**What it is:** "A visual AI planner built for real life" — Apple iPhone App of the Year 2025. Built by and for neurodivergent people.

**Key Features:**
- Visual timeline for the entire day (color-coded blocks)
- AI Co-planner that breaks tasks into steps with time estimates
- Focus timer with visual countdown
- Mood tracking connected to schedule patterns
- Brain dump → structured plan converter
- Cross-platform (phone, tablet, watch, web)
- "Review today" feature for building time memory
- Widgets for at-a-glance schedule viewing

**What they do well:**
- ✅ **Visual timeline is exceptional** — Turns abstract schedules into something you can SEE
- ✅ AI that turns messy thoughts into actionable plans with time estimates
- ✅ Mood tracking reveals patterns ("I concentrate better on days I walk in the morning")
- ✅ Focus timer that makes time visible during tasks
- ✅ Founded on executive function research and neurodivergent-first design
- ✅ Flexible — adapts when plans change ("Running late? Co-planner reshuffles your day")
- ✅ Sensory design — calming colors, minimal visual noise

**What's missing:**
- ❌ Limited gamification / reward mechanisms
- ❌ No body doubling or social accountability features
- ❌ Can feel complex for new users despite being well-designed
- ❌ Subscription model ($$ barrier)
- ❌ No "just start" random task picker
- ❌ Limited integration with other tools/calendars in free tier

**User Quotes:**
- *"If you struggle with staying on track and building habits or routines, stop everything and try Tiimo."* — CoffeeAddict92
- *"This tiny app has changed my life and my relationship with time!"* — JazzAndTea
- *"Tiimo makes me feel 'in control' because I'm able to see my day visually and make scheduling a breeze."* — Ulrike230485

**TADA Opportunity:** Tiimo is the gold standard for visual planning + AI. TADA can differentiate by adding social features (body doubling, accountability), simpler UX with fewer features exposed at once, and gamification that Tiimo lacks.

### 2.3 Routinery

**What it is:** A habit/routine builder with voice-guided task sequences. 5 million+ users.

**Key Features:**
- Step-by-step routine playback with timers
- Reads tasks out loud and reminds you when it's time for the next one
- Skip tasks when needed (flexibility!)
- Pre-made routine templates
- Family/shared routines

**What they do well:**
- ✅ **Voice-guided routines are brilliant for ADHD** — No need to look at phone
- ✅ One task at a time display
- ✅ Timer for each step creates time awareness
- ✅ Ability to skip without guilt
- ✅ Pre-built templates reduce decision fatigue

**What's missing:**
- ❌ Primarily a routine/habit app, not a general task manager
- ❌ Limited flexibility for non-routine tasks
- ❌ No AI features
- ❌ No mood tracking or pattern recognition

**User Quotes:**
- *"It's great for people who get distracted and try to do too much at once but never finish anything. It helps you focus on one thing at a time until it's done."* — Valeria
- *"The app reads your tasks out loud and reminds you when it's time for the next one which makes it easier to stay focused."* — Kaito

**TADA Opportunity:** Voice guidance and "one task at a time" display are essential features to adopt. The ability to skip without shame is critical ADHD-friendly design.

### 2.4 Structured

**What it is:** A visual day planner combining tasks and calendar into a single timeline. 15M+ downloads, 500K+ pro users.

**Key Features:**
- Visual timeline of the entire day
- Calendar integration
- Cross-platform (phone, computer, smartwatch)
- Simple, clean interface
- Widgets for quick viewing

**What they do well:**
- ✅ **Beautiful, simple design** — Clean and not overwhelming
- ✅ Visual timeline combines calendar and tasks
- ✅ Cross-platform seamless sync
- ✅ No ads, doesn't sell data
- ✅ Low barrier to entry

**What's missing:**
- ❌ Not ADHD-specific — generic productivity app
- ❌ No AI features for task breakdown
- ❌ No focus timer
- ❌ No mood/energy tracking
- ❌ No gamification or celebrations
- ❌ No body doubling or social features

**User Quotes:**
- *"Just downloaded this app & setup my week. As someone who struggles with scheduling things, I've looked for a simple clean app for years."* — Instagram user
- *"I've tried countless planners, todo lists, calendars. Structured really combines it all in the best way and lets you bring 'structure' into your day."* — App Store Review

**TADA Opportunity:** Structured proves that simplicity and visual design win users. But it's a generic tool. TADA can be the "Structured but actually designed for ADHD brains."

### 2.5 Llama Life

**What it is:** A focus/task timer app — "Find Your Focus." Shows one task at a time with a visible countdown timer.

**Key Features:**
- One task at a time display (no list overwhelm)
- Visual countdown timer for each task
- Playful branding (llamas!)
- Simple, focused interface

**What they do well:**
- ✅ **Single-task focus** — Hides everything except what you're doing NOW
- ✅ Visible time countdown reduces time blindness
- ✅ Playful, non-intimidating branding
- ✅ Low cognitive load

**What's missing:**
- ❌ Very narrow feature set — timer + task list only
- ❌ No AI or smart features
- ❌ No planning or scheduling
- ❌ No social features
- ❌ Limited as a daily driver

**TADA Opportunity:** The single-task-at-a-time paradigm with visible countdown is a must-have for ADHD Mode. TADA should build this as a "Focus Mode" view within a more complete app.

### 2.6 Focusmate

**What it is:** Virtual body doubling platform — "Focused. Productive. Together." 12M+ completed sessions, 500M+ minutes of focus.

**Key Features:**
- 25, 50, and 75-minute video coworking sessions
- Matched with community members worldwide
- Declare your task at the start, celebrate at the end
- Favorite partners system
- No downloads needed (browser-based)

**The Science Behind Focusmate (from their research page):**
1. **Precommitment:** Booking a session in advance makes you more ambitious due to temporal discounting
2. **Implementation intentions:** The session IS the plan — "I've scheduled two Focusmate sessions for it"
3. **Social pressure:** Mere presence of another person improves performance by 16-32%
4. **Accountability:** Performance improvements of 230-310% in accountability experiments
5. **Specificity in task definition:** 90% of studies show significant positive impact from specific goals
6. **Dopamine hacking:** Breaking productivity into small steps (schedule → match → session → complete) creates multiple dopamine releases
7. **Serotonin & Oxytocin:** Social connection during sessions triggers positive brain chemistry

**What they do well:**
- ✅ **Body doubling actually works** — Research-backed, massive community
- ✅ Social accountability without judgment
- ✅ Structured sessions with clear start/end
- ✅ Multiple session lengths for different needs
- ✅ Free tier (3 sessions/week)

**What's missing:**
- ❌ Not a task manager — separate tool you must use alongside something else
- ❌ Requires video call (anxiety-inducing for some)
- ❌ No task breakdown or planning features
- ❌ Session times may not match your need
- ❌ Requires another person to be available

**TADA Opportunity:** TADA could integrate lightweight body doubling — not full video, but awareness of others working alongside you. "3 people are also working on their tasks right now" or friend accountability pings.

### 2.7 Habitica

**What it is:** Gamified task manager — RPG-style where completing tasks levels up your character.

**Key Features:**
- Tasks, habits, and dailies as RPG mechanics
- Character progression, gear, pets, mounts
- Party system for group accountability
- Health system — missed dailies damage your character

**What they do well:**
- ✅ Gamification provides strong dopamine hits for some users
- ✅ Social accountability through parties
- ✅ Rich reward system

**What they get WRONG for ADHD:**
- ❌ **Punishment mechanics are devastating** — Missing dailies damages your character, which triggers shame spirals
- ❌ Complex interface with many features — overwhelming
- ❌ Requires consistent daily engagement — exactly what ADHD people struggle with
- ❌ The RPG layer adds cognitive overhead to an already difficult task (managing tasks)
- ❌ Falling behind feels terrible — your character "dies"

**TADA Opportunity:** Gamification YES, but NEVER punishment. Celebrations and rewards only. Progress should be visible but gaps should be invisible. "You completed 3 tasks today!" not "You missed 5 dailies — your character lost 20 HP."

### 2.8 Competitive Landscape Summary

| Feature | Goblin.tools | Tiimo | Routinery | Structured | Llama Life | Focusmate | Habitica |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| AI Task Breakdown | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Visual Timeline | ❌ | ✅ | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| Focus Timer | ❌ | ✅ | ✅ | ❌ | ✅ | ⚠️ | ❌ |
| Single-Task View | ❌ | ⚠️ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Body Doubling | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ⚠️ |
| Gamification | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ |
| Mood Tracking | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Voice Guidance | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Shame-Free Design | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| Free/Accessible | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ |

**The gap TADA can fill:** No single app combines AI task breakdown + visual timeline + focus mode + body doubling + shame-free gamification + mood tracking. That's the opportunity.

---

## 3. UX Patterns for ADHD

### 3.1 Reducing Decision Fatigue

**The Problem:** Every decision depletes executive function. ADHD brains start with less capacity, so decision fatigue hits harder and earlier.

**Patterns that work:**
- **Smart defaults:** Pre-fill everything possible. Default task duration = 25 min. Default priority = auto-calculated. Default view = today only.
- **Maximum 3 choices:** Never present more than 3 options at a time. If showing priorities: High / Medium / Low. If showing views: Focus / Today / Week.
- **"Decide for me" button:** AI picks your next task based on priority, due date, energy level, and time available
- **Progressive disclosure:** Show the minimum UI needed. Advanced options are hidden behind "More..." or revealed through usage
- **One-tap actions:** Every common action should be one tap. Add task = one tap. Complete task = one tap. Start focus = one tap.
- **Templates and presets:** Don't make users build from scratch. Provide "Morning Routine," "Work Block," "Evening Wind-down" etc.

### 3.2 Handling the "Wall of Awful" (Task Initiation Anxiety)

**The Problem:** An emotional barrier of accumulated shame, fear, and overwhelm stands between the ADHD person and starting tasks.

**Patterns that work:**

**Micro-starts:**
- Instead of "Clean the kitchen," show "Put one mug in the sink"
- AI auto-generates the smallest possible first step
- "Just start" doesn't mean "do the whole thing" — it means "do the first 2-minute piece"
- One ADHD person explained: *"When I write 'do laundry,' I freeze. But if I see: pick up clothes, put them in basket, start the machine, I can at least get going. Once I start, I usually keep going."*

**The 5-Minute Rule:**
- Commit to just 5 minutes on a task
- Timer visible and counting down
- After 5 minutes, option to continue or stop (no judgment)
- Most people continue past the 5-minute mark once momentum builds

**Random Task Picker ("Just Start" Button):**
- Randomly selects a small, completable task from the user's list
- Removes the paralysis of choosing
- Weighted toward quick wins (< 15 min estimated)
- Can filter by energy level: "I can only handle easy stuff right now"

**Soft On-Ramps:**
- Play music before starting
- Say your first step out loud (optional voice prompt)
- 2-minute countdown timer before task begins
- Transition rituals: "Take 3 deep breaths, then we begin"

### 3.3 Body Doubling (Virtual Co-Working)

**The Science:** From Tiimo's research on body doubling:
- Creates structure through shared time and space
- Provides light accountability without judgment
- Reduces isolation during solo work
- **Mirror neurons** create shared momentum — the brain generates a sense of collective effort
- Increases dopamine through social connection and novelty
- Acts as **scaffolding for executive functions** like planning, initiation, and emotional regulation

From Focusmate's research: "The mere presence of another person improves human performance by 16 to 32 percent."

**Implementation options for TADA:**
1. **Lightweight presence indicators:** "Sarah and 12 others are also working right now" (no video required)
2. **Accountability pings:** Share your current task with a friend. They get notified when you complete it.
3. **Co-working rooms:** Join a virtual room where everyone's working on their tasks. Cameras optional.
4. **Check-in/check-out:** Start and end work sessions by sharing goals, then outcomes. Text-based, no video needed.
5. **Partner matching:** Like Focusmate but integrated — get matched with someone for a 25-min sprint

### 3.4 Gamification That Actually Works

**What works (dopamine-friendly):**
- ✅ **Celebrations on completion:** Confetti, satisfying sounds, animations. The "check" should feel AMAZING.
- ✅ **Progress visualization:** "You've completed 47 tasks this week" with visual growth (garden, building, etc.)
- ✅ **Streaks without shame:** Show streaks but DON'T show when they break. "You've been active 5 days this week!" not "You missed 2 days."
- ✅ **Level-up mechanics:** XP for completing tasks. Leveling up unlocks themes, sounds, avatar items.
- ✅ **"Personal best" framing:** "That's your best Tuesday ever!" instead of comparing to others
- ✅ **Tiny rewards:** After completing a task, option to take a 5-min reward break (curated: funny video, walk prompt, snack reminder)
- ✅ **Weekly "Winventory":** End-of-week celebration of everything accomplished. From Tiimo: "When you only focus on what's left to do, you miss everything you've done."

**What DOESN'T work for ADHD (avoid these):**
- ❌ **Punishment for missed tasks** (Habitica's HP loss)
- ❌ **Streak counters that show broken streaks** (shame trigger)
- ❌ **Leaderboards** (comparison is devastating for RSD)
- ❌ **Red/urgent styling for overdue items** (anxiety-inducing)
- ❌ **"You haven't completed anything today" messages** (triggering)
- ❌ **Requiring daily engagement to maintain progress** (sets up for failure)
- ❌ **Complex reward systems that add cognitive load** (another thing to manage)

### 3.5 Time Awareness Solutions

**Visual Timers:**
- Analog-style countdown (shrinking pie/circle) — makes time VISIBLE
- Color-coded time remaining: green → yellow → red (gentle, not alarming)
- Tiimo's approach: "Watch time pass with a countdown that keeps you anchored"
- Sand timer / hourglass animations appeal to ADHD brains

**Time Estimation:**
- AI-generated estimates for each task ("This usually takes about 25 minutes")
- Learning from user's actual completion times to improve estimates
- "How long do you think this will take?" prompt (builds time awareness skill)
- Compare estimate vs. actual after completion (gentle, educational, not punitive)
- From Tiimo: "Never guess time again — with task-specific time estimates, plan smarter and stop overcommitting"

**Time Awareness Nudges:**
- Gentle pulses/vibrations at intervals during focus mode ("You've been working for 30 minutes")
- "It's been 2 hours — have you had water?" (caring, not nagging)
- Visual "time spent" indicator that grows as you work
- Transition warnings: 5-minute warning before a scheduled switch

### 3.6 Task Breakdown (Auto-Decomposition)

**The gold standard (from Goblin.tools + Tiimo):**

Example: User types "Prepare for job interview"

AI generates:
1. ☐ Research the company (15 min)
2. ☐ Review the job description (10 min)
3. ☐ Write down 3 key experiences to mention (15 min)
4. ☐ Prepare 2 questions to ask them (10 min)
5. ☐ Choose and lay out interview outfit (10 min)
6. ☐ Plan your route and departure time (5 min)
7. ☐ Do a practice answer out loud (10 min)

**Key principles:**
- Each sub-task should be **completable in under 15 minutes**
- Each sub-task should be **concrete and actionable** (verb + noun)
- Include **time estimates** for each step
- Allow users to **modify, reorder, add, or remove steps**
- Support **partial completion** — 4 of 7 steps done is celebrated, not shamed
- **Recursive breakdown:** If a sub-task still feels too big, break IT down further

### 3.7 Sensory Considerations

**Reduced Visual Noise:**
- Clean, minimal interface with generous whitespace
- No blinking, flashing, or animated advertisements
- Muted, calming color palette as default (pastels, earth tones)
- High contrast option for readability
- Large, clear typography (minimum 16px body text)
- Consistent, predictable layout — nothing moves unexpectedly

**Sound Design:**
- Optional (always toggleable)
- Completion sounds should be satisfying but not jarring (soft chime, pop, whoosh)
- Timer sounds should be gentle (not alarming beeps)
- Nature/ambient sound options for focus mode
- Volume control separate from system volume
- NO sudden loud sounds ever

**Touch/Interaction:**
- Large touch targets (minimum 48x48px, ideally 56x56px)
- Generous spacing between interactive elements
- Swipe gestures for common actions (swipe to complete)
- Haptic feedback on completion (satisfying vibration)
- No precision-required interactions (no tiny checkboxes)

---

## 4. What ADHD Users Say

### 4.1 What ADHD Users Love About Existing Apps

Based on app reviews, community feedback, and user testimonials gathered during research:

> *"If you struggle with staying on track and building habits or routines, stop everything and try Tiimo."* — App Store user

> *"This tiny app has changed my life and my relationship with time!"* — Tiimo user JazzAndTea

> *"Not to be dramatic, but this app is life changing. It allows me to plan my morning routine and my afternoon work schedule. It gives me confidence that I am on top of my life."* — Tiimo user

> *"It's great for people who get distracted and try to do too much at once but never finish anything. It helps you focus on one thing at a time until it's done."* — Routinery user Valeria

> *"The app reads your tasks out loud and reminds you when it's time for the next one which makes it easier to stay focused. You can even skip tasks when you need to which is really nice."* — Routinery user Kaito

> *"Just downloaded this app & setup my week. As someone who struggles with scheduling things, I've looked for a simple clean app for years."* — Structured user

> *"I invested in the lifetime membership because this app has saved me at least two hours a week — which adds up to over 100 hours a year."* — Structured user

> *"One of the best productivity tools I've found. It is built around pre-commitment pacts — a psychological device that helps you get started and follow through on just about any task."* — Nir Eyal on Focusmate

> *"All my life, all I needed was Focusmate. Thank you for this amazing community. I feel powerful with my coworking mates."* — Focusmate user

### 4.2 What ADHD Users Hate About Todo Apps

Common complaints synthesized from user communities and reviews:

**1. "The list itself becomes the enemy"**
- Long task lists trigger overwhelm and paralysis
- Seeing everything you haven't done is anxiety-inducing
- Overdue items accumulating creates shame
- Users describe todo lists as "monuments to my failure"

**2. "Apps that nag make me want to uninstall"**
- Aggressive notification systems backfire
- "Reminder: you haven't done X" feels like a scolding parent
- Multiple daily notifications become noise and get disabled
- The tone of reminders matters enormously

**3. "I spend more time organizing the app than doing tasks"**
- Complex systems (tags, projects, contexts, priorities) become procrastination tools
- "Productivity porn" — endlessly tweaking the system instead of using it
- Setup friction means the app gets abandoned before it helps
- Too many features = cognitive overload

**4. "Streak anxiety"**
- Breaking a streak feels devastating with RSD
- Some users report MORE anxiety from streak-based apps
- The pressure to maintain creates avoidance of the app entirely
- "I stopped opening [app] because I couldn't face seeing my broken streak"

**5. "One-size-fits-all doesn't fit my brain"**
- Energy and focus fluctuate wildly day to day
- What works Monday may not work Friday
- Need different modes for different states (high energy vs. low energy)
- Rigid time-blocking fails because ADHD brains don't work in neat sequences

**6. "Where did all my tasks go?"**
- Out of sight = out of mind, but too visible = overwhelming
- Need the Goldilocks zone: current tasks visible, future tasks hidden but not forgotten
- Calendar integration often creates duplicates or sync issues
- Tasks completed but not acknowledged feel pointless

### 4.3 The Dream App (What Users Want)

Synthesized from community discussions, the "ideal ADHD todo app" would:

1. **Show me ONE thing at a time** — Hide the list, show the next action
2. **Break tasks down for me** — AI-powered decomposition into tiny steps
3. **Know how long things actually take** — Time estimation that learns from my patterns
4. **Celebrate me** — Confetti, sounds, positive reinforcement when I complete things
5. **Never shame me** — No red overdue items, no broken streak guilt, no "you didn't do anything today"
6. **Help me start** — "Just start" button, random task picker, 5-minute timer
7. **Make time visible** — Visual timers, countdown, time-spent indicators
8. **Adapt to my energy** — Different modes for different states
9. **Keep it simple** — Minimal interface, no complexity unless I want it
10. **Help me feel less alone** — Some form of accountability or community

---

## 5. Clinical Research & Evidence Base

### 5.1 Executive Function and ADHD

**Barkley's Model of ADHD and Self-Regulation:**
Russell Barkley's unified theory posits that ADHD is fundamentally a disorder of self-regulation and executive function, not merely attention. His research shows that individuals with ADHD "may be unable to delay responses, thus acting impulsively and without adequate consideration of future consequences — beneficial or negative" (Barkley, Murphy & Fischer, 2008).

**Brown's Model of Executive Function Clusters:**
Tom Brown's work demonstrates that executive function impairments in ADHD are highly interrelated and tend to show up together. Difficulties in his six clusters "lead to attentional deficits, as individuals have difficulty organizing tasks, getting started, remaining engaged, remaining alert, maintaining a level emotional state, applying working memory and recall, and self-monitoring and regulating actions" (Brown, 2005).

**Key References:**
- Barkley, R.A., Murphy, K.R., Fischer, M. (2008). *ADHD in Adults: What the Science Says*. Guilford Press.
- Brown, T.E. (2005). *Attention Deficit Disorder: The Unfocused Mind in Children and Adults*. Yale University Press.

### 5.2 Dopamine and Reward Processing

Research confirms ADHD is linked to differences in **dopamine transporter function**, affecting how efficiently dopamine is used in the brain. This underlies:
- Interest-based motivation (not importance-based)
- Difficulty sustaining effort on low-reward tasks
- Seeking novelty and stimulation
- Temporal discounting (preferring immediate over delayed rewards)

**Schultz, Dayan & Montague (1997)** demonstrated that dopamine neurons signal "reward prediction errors" — they respond when an action is followed by a positive outcome. This is the neurological basis for why small, immediate rewards after task completion can literally train motivation.

### 5.3 Social Facilitation and Body Doubling

**Research cited by Focusmate:**
- Mere presence of another person improves performance by **16 to 32%** on most tasks
- Accountability shows performance improvements of **230 to 310%** in public goods experiments
- Pre-commitment to a task makes individuals more ambitious and improves outcomes
- **90% of goal-setting studies** show significant positive impact from specific and challenging goals
- Implementation intentions (concrete plans for how/when to act) increase task completion efficacy

### 5.4 Self-Determination Theory and Motivation

**Deci & Ryan (2000)** — Self-Determination Theory shows motivation grows when people experience:
1. **Competence** — Feeling capable and effective
2. **Autonomy** — Having choice and control
3. **Relatedness** — Feeling connected to others

**Application to ADHD Mode:**
- Competence → Celebrate completions, show progress, never shame
- Autonomy → Let users customize their experience, choose what to work on, set their own pace
- Relatedness → Body doubling, accountability partners, community features

### 5.5 Environmental Scaffolding

Clinical consensus supports that ADHD management benefits most from **external scaffolding** rather than relying on internal executive function:
- Visual reminders and cues
- Breaking tasks into manageable steps
- Flexible routines (anchored but adaptable)
- Timers and transition signals
- Body doubling and co-regulation
- Environmental supports (reducing distractions, clear workspaces)

**Key clinical insight:** "The best executive functioning supports often remove the need to rely on memory, willpower, or emotion regulation in the first place." (Tiimo resource hub)

### 5.6 Time Perception in ADHD

Research shows ADHD'ers tend to:
- **Underestimate time duration** during tasks requiring focus
- Experience **temporal discounting** — future events feel less real/urgent
- Struggle with **prospective time management** — planning when to start in order to finish on time
- Have difficulty with **time reproduction tasks** — asked to signal when X minutes have passed, they consistently under or overestimate

**Practical implication:** External time markers (visual timers, transition warnings, time-spent counters) are not optional luxuries — they are essential accommodations.

---

## 6. Design Recommendations for TADA's ADHD Mode

### 6.1 Core Philosophy

> **TADA ADHD Mode should feel like a supportive friend who knows exactly what your brain needs — not another system demanding you conform to its logic.**

**Design Principles:**
1. **Reduce friction to zero** — Every barrier between intention and action must be eliminated
2. **Never shame, always celebrate** — The app's emotional tone must be warm, encouraging, forgiving
3. **Show less, not more** — Hide complexity, reveal one thing at a time
4. **Make time visible** — Externalize the internal clock ADHD brains lack
5. **Automate the boring parts** — Use AI to handle prioritization, breakdown, scheduling
6. **Respect energy fluctuations** — The same user needs different things at different times
7. **Build in dopamine hits** — Every interaction should feel satisfying

### 6.2 ADHD Mode: UI Changes

#### The Default View: "What's Next"
When ADHD Mode is enabled, the default view shows ONE task:

```
┌─────────────────────────────────────────┐
│                                         │
│        🎯 Your next thing:              │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │   Reply to Sarah's email        │   │
│   │   📧 Work · ⏱ ~10 min          │   │
│   │                                 │   │
│   │   [ ▶ Start ]  [ ⏭ Skip ]      │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   2 more tasks today · Feeling: 😊      │
│                                         │
│   [ 🎲 Surprise me ]  [ 📋 See all ]   │
│                                         │
└─────────────────────────────────────────┘
```

**Key elements:**
- **ONE task** prominently displayed (not a list)
- **Category + time estimate** shown (context without overwhelm)
- **Start button** — one tap to begin focus timer
- **Skip button** — no guilt, just moves to next (logged but never displayed negatively)
- **"Surprise me"** — random task picker for when they can't choose
- **"See all"** — opt-in to the full list (hidden by default)
- **Energy/mood indicator** — quick check-in that adapts task suggestions
- **Remaining count is minimal** — "2 more" not a full numbered list

#### Simplified Color Palette
```
Primary:      #6C63FF (Calming purple — not aggressive, not boring)
Background:   #FAFAFA (Warm off-white — easier on eyes than pure white)
Success:      #4CAF50 (Green for completion — positive association)
Accent:       #FFB74D (Warm amber — for highlights, not warnings)
Text:         #333333 (Soft black — easier to read than pure black)
Muted:        #9E9E9E (Gray for secondary info)

NEVER USE:    Red for overdue items
NEVER USE:    Aggressive orange/yellow for warnings
NEVER USE:    Flashing or pulsing elements
```

#### Touch Targets and Spacing
- **Minimum touch target:** 56x56dp (larger than Material Design's 48dp minimum)
- **Spacing between interactive elements:** 16dp minimum
- **Font size:** 18px minimum for body text in ADHD Mode
- **Primary action buttons:** Full-width on mobile, large and prominent
- **Swipe to complete:** Left-to-right swipe gesture with satisfying haptic feedback

### 6.3 Task Decomposition Feature

#### AI-Powered Task Breakdown ("Make it Tiny")

**User flow:**
1. User adds task: "Clean the apartment"
2. TADA shows: "Want me to break this down? 🪄"
3. One tap → AI generates sub-tasks:

```
🏠 Clean the apartment (~90 min total)

☐ Pick up items from the living room floor (10 min)
☐ Load dishes into dishwasher (10 min)  
☐ Wipe kitchen counters (5 min)
☐ Take out trash and recycling (5 min)
☐ Vacuum the living room (15 min)
☐ Clean the bathroom sink and toilet (15 min)
☐ Make the bed (5 min)
☐ Put away clean laundry (15 min)
☐ Quick sweep of the kitchen floor (10 min)

[ ✏️ Edit steps ]  [ ✅ Looks good ]  [ 🔄 Regenerate ]
```

**Implementation details:**
- Each step is **concrete, actionable, and under 15 minutes**
- Steps are **sequenced logically** (hardest aren't all at the beginning)
- **Time estimates** for each step AND total
- User can **edit, reorder, add, or delete** any step
- **"Break it down further"** option on any sub-step that still feels too big
- **Partial completion is always celebrated:** "You did 6 of 9 steps! That's 65% — amazing!"

#### Smart Suggestions
- Tasks that remain untouched for 3+ days get a gentle suggestion: "This has been sitting for a while. Want me to break it into smaller pieces?"
- If a user consistently skips a task, offer: "Seems like this one's tough to start. Want to try the 5-minute version?"

### 6.4 Time Awareness Tools

#### Visual Focus Timer
```
┌─────────────────────────────────────────┐
│                                         │
│   Reply to Sarah's email                │
│                                         │
│            ╭──────────╮                 │
│           │   7:23    │                 │
│           │ remaining │                 │
│            ╰──────────╯                 │
│      [████████████░░░░░]                │
│                                         │
│   Started: 2:15 PM                      │
│   You've been at it for 2m 37s          │
│                                         │
│   [ ⏸ Pause ]  [ ✅ Done ]  [ ⏭ Skip ] │
│                                         │
└─────────────────────────────────────────┘
```

- **Shrinking circle or bar** — visual representation of time passing
- **Color transitions:** Green → Yellow → Amber (no red — not alarming)
- **Elapsed time counter** — "You've been working for 25 minutes"
- **Gentle vibration** at time milestones (25 min, 50 min)
- **Hydration/stretch reminders** at configurable intervals

#### Time Estimation Trainer
- Before starting a task, prompt: "How long do you think this will take?"
- After completion, show: "You estimated 15 min, it actually took 22 min"
- Over time, build awareness: "You tend to underestimate by ~30%. Maybe add a buffer next time?"
- **Never punitive** — frame as "interesting data about your brain" not "you were wrong"
- Track improvement: "Your estimates have gotten 15% more accurate this month!"

### 6.5 Dopamine-Friendly Feedback System

#### Completion Celebrations
Every task completion triggers a **micro-celebration:**
- 🎉 Confetti animation (subtle, 1-2 seconds)
- 🔔 Satisfying sound effect (chooseable: chime, pop, whoosh, nature sound)
- 📳 Haptic feedback (medium vibration pulse)
- 💬 Random encouraging message:
  - "Nice one! 🎯"
  - "Look at you go! ✨"
  - "That's done and dusted 💪"
  - "One less thing on your mind 🧠"
  - "You're on a roll! 🌊"

**For bigger completions (multi-step tasks, all daily tasks done):**
- Bigger animation (fireworks, garden growing, building rising)
- Special sound
- Summary: "You crushed 7 tasks today. That's more than Tuesday — nice!"

#### Progress Visualization ("Your Garden")
Metaphor: Each completed task plants something in your digital garden.
- Small tasks = flowers
- Medium tasks = bushes  
- Big tasks = trees
- The garden grows over weeks/months
- Previous gardens are preserved (never torn down for missed days)
- Visiting your garden shows your accumulated accomplishments
- Optional: share garden screenshots with friends

**Alternative metaphors (user-chooseable):**
- 🏗 Building a city (each task adds a building)
- 🌌 Exploring space (each task maps a new star)
- 🎨 Creating art (each task adds a brushstroke to a painting)
- 📚 Filling a library (each task adds a book to your shelf)

#### Streaks Without Shame
- Show: "Active 5 of the last 7 days — solid week!"
- Show: "You've completed tasks 12 days this month 🌟"
- **NEVER show:** "Streak broken" or "0 days active" or "You missed yesterday"
- If the user returns after a gap: "Welcome back! Ready to pick up where you left off?"
- **Grace periods:** Weekends/holidays/sick days can be excluded from activity tracking (user preference)

#### Weekly Winventory
Every Sunday (configurable), TADA generates a "Winventory":
```
🏆 Your Week in Review

Tasks completed:    23 ✨
Total focus time:   4h 12m
Biggest win:        "Finished tax paperwork" 🎯
Most productive:    Wednesday (8 tasks!)
Estimate accuracy:  Getting better! (±22% → ±18%)

You're doing great. See you next week! 💚
```

### 6.6 Focus Mode ("The Tunnel")

When activated, the app strips away EVERYTHING except:
1. The current task
2. A visual timer
3. A "Done" button
4. A "Pause" button

**No lists. No navigation. No notifications from the app. Just the task and the timer.**

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│        Write introduction paragraph     │
│                                         │
│              ⏱ 18:42                    │
│           ━━━━━━━━━░░░░                 │
│                                         │
│                                         │
│     [ ⏸ Pause ]      [ ✅ Done ]       │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Additional Focus Mode features:**
- Optional ambient background sounds (rain, coffee shop, white noise, lo-fi)
- "Do Not Disturb" integration with phone OS
- Gentle nudge at end of timer: "Time's up! Take a breath. Continue or move on?"
- If user continues past timer: small "30 min" notification → "1 hour" → "Time for a break?"
- **Exit requires confirmation** to prevent accidental closure during hyperfocus

### 6.7 "Just Start" Button (Random Task Picker)

**The core feature for overcoming initiation paralysis:**

Prominently placed, always accessible. Tapping it:
1. Filters the user's task list for completable-now tasks (considers time, energy, location)
2. Randomly selects one
3. Presents it with a 5-minute timer pre-loaded
4. User can: Accept, Shuffle (get another), or Set their own

**Energy-aware version:**
```
How are you feeling?

[ 🔋 High energy ]  → Picks from challenging/important tasks
[ ⚡ Medium ]        → Picks from moderate tasks  
[ 🪫 Low battery ]  → Picks from quick wins only (< 10 min)
```

This single feature addresses:
- Decision paralysis (AI decides for you)
- Task initiation (5-minute commitment only)
- Overwhelm (shows ONE task)
- Energy matching (adapts to current state)

### 6.8 Gentle Reminders vs. Nagging

**The cardinal rule:** Reminders must feel like a supportive friend, not a disappointed parent.

**Tone guidelines:**

| Instead of... | Say... |
|---|---|
| "You haven't completed any tasks today" | "Hey! Your tasks are here whenever you're ready 💚" |
| "Reminder: Clean kitchen (OVERDUE)" | "Still thinking about the kitchen? No rush — maybe start with one thing?" |
| "You missed your 9am task" | "Morning didn't go as planned? That's okay. Here's what's next." |
| "Warning: 3 tasks overdue" | "You have some things from earlier. Want to tackle one or reschedule?" |
| "You need to..." | "When you're ready..." |
| "Don't forget!" | "Gentle reminder:" |

**Notification settings:**
- **Frequency options:** Minimal (1/day), Normal (3/day), Frequent (5/day)
- **Quiet hours:** Fully customizable (default: 10pm-8am)
- **Tone options:** Encouraging, Neutral, Minimal
- **Snooze options:** 15 min, 1 hour, Tomorrow, "Not today" (removes all reminders for the day)
- **"Not today" button:** Acknowledges that some days you can't, and that's perfectly valid

### 6.9 Body Doubling & Accountability Features

**Tier 1 — Passive (always on):**
- "127 people are working on their tasks right now 🌍"
- Anonymous, no interaction required, just the knowledge you're not alone

**Tier 2 — Friend Accountability:**
- Add a TADA friend
- Optionally share: what you're working on, when you complete something
- Send gentle encouragement to each other
- **Never** show what was NOT completed — only completions

**Tier 3 — Co-Working Sessions:**
- Schedule a 25/50-minute session with a friend or random match
- Text-based check-in at start: "I'm going to work on ___"
- Timer runs for both people
- Text-based check-out at end: "I got ___ done"
- Optional video/audio (but text-only by default — lower barrier)

### 6.10 Energy & Mood Tracking

**Quick daily check-in (optional):**
```
How's your energy right now?

[ 🔥 Great ]  [ 👍 Okay ]  [ 😴 Low ]  [ 💀 Terrible ]
```

This one tap:
- Adjusts task suggestions (lower energy → easier/shorter tasks)
- Adjusts notification tone (lower energy → fewer, gentler)
- Feeds into weekly patterns: "You tend to have more energy on Wednesdays. Consider scheduling harder tasks then."
- Builds self-awareness over time without adding cognitive load

### 6.11 Transitions & Routines Support

From the research: "ADHD challenges are often less about the task itself and more about switching from one thing to another."

**Transition rituals built into TADA:**
- Between tasks: 30-second breathing prompt (optional)
- End of work session: "Shutdown routine" — close laptop, tidy desk, stretch
- Before bed: "Wind-down routine" — review tomorrow, set clothes out, gratitude
- Each transition uses a distinct sound or visual cue to signal "shift"

**Pre-built routine templates:**
- ☀️ Morning Start (5-7 steps, ~30 min)
- 💼 Work Begin (3-5 steps, ~15 min)  
- 🌙 Evening Wind-Down (5-7 steps, ~30 min)
- 🧹 Quick Tidy (5 steps, ~15 min)

All customizable, all with per-step timers, all skip-friendly.

---

## 7. Implementation Roadmap

### Phase 1: Foundation (MVP ADHD Mode)
**Must-have features for launch:**

1. **Single-task "What's Next" view** — The default ADHD Mode home screen
2. **AI task breakdown** — Paste a task, get sub-steps with time estimates
3. **Visual focus timer** — Shrinking circle/bar with elapsed time
4. **Completion celebrations** — Confetti, sounds, encouraging messages
5. **"Just Start" button** — Random task picker with energy filter
6. **Shame-free design system** — No red overdue, no broken streaks, gentle tone
7. **Simplified color palette and large touch targets**
8. **Flexible reminders** — With tone control and "not today" option

### Phase 2: Intelligence
**Smart features that learn from the user:**

9. **Time estimation learning** — AI improves estimates based on actual completion times
10. **Energy-aware suggestions** — Quick mood check-in adjusts task recommendations
11. **Smart scheduling** — AI suggests when to do tasks based on energy patterns
12. **Weekly Winventory** — Automated celebration of accomplishments
13. **Pattern recognition** — "You're most productive on Wednesdays" insights

### Phase 3: Connection
**Social and accountability features:**

14. **Passive presence** — "X people are working right now"
15. **Friend accountability** — Share completions, send encouragement
16. **Co-working sessions** — Timed work sprints with text check-in/out
17. **Progress garden/visualization** — Long-term motivational metaphor

### Phase 4: Advanced
**Power features for committed users:**

18. **Voice-guided routines** — Routinery-style audio task sequences
19. **Transition rituals** — Built-in breathing/movement prompts between tasks
20. **Mood tracking with insights** — Patterns over weeks/months
21. **Customizable gamification** — Choose your metaphor (garden, city, space, etc.)
22. **Advanced body doubling** — Video/audio co-working sessions

---

## Appendix A: Key Design Do's and Don'ts

### DO ✅
- Show one task at a time as the default
- Celebrate every completion, no matter how small
- Use AI to reduce cognitive load (auto-prioritize, auto-break-down, auto-estimate)
- Make time visible with visual timers and countdowns
- Let users skip tasks without guilt or explanation
- Provide "decide for me" buttons everywhere possible
- Use warm, encouraging language in all communications
- Track and show progress (what's DONE, not what's remaining)
- Offer customizable sensory settings (sounds, colors, haptics)
- Design for bad days too — the app should still be usable at minimum capacity

### DON'T ❌
- Show long lists of tasks as the default view
- Use red for overdue items or any shame-colored indicators
- Display broken streaks or "0 tasks completed" messages
- Send notifications that feel like nagging or judgment
- Require complex setup before the app is useful
- Punish users for missing tasks, deadlines, or days
- Use small touch targets or cluttered interfaces
- Play loud or jarring sounds for any reason
- Compare users to others (no leaderboards)
- Require daily engagement to maintain progress or rewards

---

## Appendix B: Recommended Reading & Resources

1. **Barkley, R.A.** (2008). *ADHD in Adults: What the Science Says.* Guilford Press.
2. **Brown, T.E.** (2005). *Attention Deficit Disorder: The Unfocused Mind in Children and Adults.* Yale University Press.
3. **Deci, E.L. & Ryan, R.M.** (2000). "The 'What' and 'Why' of Goal Pursuits." *Psychological Inquiry*, 11(4), 227-268.
4. **Schultz, W., Dayan, P. & Montague, P.R.** (1997). "A Neural Substrate of Prediction and Reward." *Science*, 275(5306), 1593-1599.
5. **CHADD** — Children and Adults with ADHD: chadd.org/about-adhd/executive-function-skills/
6. **Tiimo Resource Hub** — Extensive research-backed articles on ADHD and neurodivergent planning: tiimoapp.com/resource-hub/
7. **Focusmate Science Page** — Research on body doubling and social accountability: focusmate.com/science/
8. **Goblin.tools** — Best-in-class example of AI task decomposition: goblin.tools

---

## Appendix C: Key Metrics to Track Post-Launch

1. **Task completion rate** — Do ADHD Mode users complete more tasks?
2. **App retention** — Do ADHD Mode users stick with the app longer?
3. **Session frequency** — How often do users open the app?
4. **"Just Start" usage** — How often is the random picker used?
5. **Task breakdown adoption** — What % of tasks get decomposed?
6. **Focus timer completion** — Do users finish their timed sessions?
7. **Skip rate** — How often do users skip tasks? (Not a negative — data point)
8. **Sentiment** — NPS scores, app store reviews specifically mentioning ADHD features
9. **Energy tracking participation** — What % opt in to energy check-ins?
10. **Social feature adoption** — Friend adds, co-working sessions, accountability pings

---

*This research document represents a synthesis of published research, competitive analysis, user community insights, and clinical best practices. TADA's ADHD Mode has the potential to be a genuine differentiator in the productivity app market — serving the 200+ million people globally living with ADHD who are currently underserved by mainstream task management tools.*
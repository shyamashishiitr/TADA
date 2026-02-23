# ADHD Mode — Feature Showcase

## 🧠 What is ADHD Mode?

ADHD Mode transforms TADA into a **distraction-free, focus-first experience** designed specifically for people with ADHD and executive function challenges.

Instead of overwhelming you with a long task list, ADHD Mode shows you **ONE task at a time** — the most important thing you need to do right now.

---

## ✨ Features

### 1. 🧠 **One-Click ADHD Mode Toggle**

**Location:** Top-right corner of the header  
**What it does:** Instantly switches between Normal and ADHD mode  
**Persists:** Your preference is saved automatically

**Visual:**
- 🧠 Brain emoji for easy recognition
- Gradient purple-pink button when active
- Clean outline button when inactive
- Hover animation for satisfying interaction

---

### 2. 🎯 **Focus View (Single-Task Display)**

**The Core Experience**

When ADHD mode is ON, you see:
- ✅ **ONE task at a time** — No list overwhelm
- ✅ **Big, centered, distraction-free** — Easy to read
- ✅ **Huge checkbox** (8rem x 8rem) — Impossible to miss
- ✅ **Task metadata** — Category, time estimate, energy level
- ✅ **Task counter** — "2 more tasks after this" or "This is your last task! 🎉"
- ✅ **Clear action buttons** — Just Start (random) or See All Tasks

**What you DON'T see:**
- ❌ Stats cards
- ❌ Category filters
- ❌ Full task list
- ❌ Add task input
- ❌ Visual clutter

**Result:** Pure focus. One thing. Right now.

---

### 3. 🎲 **"Just Start" Button**

**For when you're paralyzed by choice**

**Location:** Bottom of focus view  
**Visual:** Orange-to-pink gradient, large and inviting  
**Emoji:** 🎲 Dice

**How it works:**
1. Click "Just Start"
2. Pick your energy level:
   - 🔋 **High Energy** — Ready for challenging tasks
   - ⚡ **Medium Energy** — Can handle moderate work
   - 🪫 **Low Energy** — Need something small and easy
3. (Optional) Skip energy selection → "surprise me with anything"
4. TADA shows you a task that matches your current state

**Why it helps:**
- Removes decision fatigue
- Matches tasks to your energy level
- Gets you unstuck when you can't choose
- Perfect for executive function challenges

---

### 4. ⚡ **Energy Level Filter**

**Match tasks to how you feel RIGHT NOW**

**Location:** Top of ADHD Mode view  
**Options:**
- 🔋 **High Energy** (green gradient)
- ⚡ **Medium Energy** (yellow-orange gradient)
- 🪫 **Low Energy** (blue-purple gradient)

**Features:**
- One-click filtering
- Clear filter button when active
- Persists across sessions
- Updates task list instantly

**Use case:**
> "It's 3pm on Friday. I'm exhausted. I don't want to see 'Write quarterly report' right now — just show me the small stuff I can knock out quickly."

---

### 5. 🎉 **Celebration on Complete**

**Dopamine hit when you finish a task**

**Trigger:** Mark any task complete while in ADHD mode  
**Duration:** 3 seconds, auto-fades

**What happens:**
- 🎊 20 confetti emojis fall across the screen
- 🎯 Center message card with bounce animation
- 💜 Encouraging message (8 variations):
  - "🎉 Nice one! [Task] is done!"
  - "✨ Look at you go! [Task] crushed!"
  - "🌟 That's done and dusted! [Task] complete!"
  - "💪 You're on a roll! [Task] finished!"
  - "🎯 Nailed it! [Task] is history!"
  - "🔥 Way to go! [Task] conquered!"
  - "⚡ Boom! [Task] completed!"
  - "🌈 Awesome work! [Task] done!"

**Tone:** Warm, supportive, ZERO shame  
**Design principle:** Celebrate what you DID, not what you didn't do

---

### 6. 🗂️ **Energy Level Task Property**

**Tag tasks by the energy they require**

**New task field:** `energyLevel?: 'high' | 'medium' | 'low'`

**Visual badges in focus view:**
- 🔋 **High Energy** (green badge)
- ⚡ **Medium Energy** (yellow badge)
- 🪫 **Low Energy** (blue badge)

**Future:** Tasks can be manually tagged, and eventually AI could auto-suggest energy levels based on task content.

---

### 7. 🧹 **Reduced Clutter Mode**

**What gets hidden when ADHD mode is ON:**

❌ Stats cards (Active Tasks / Completed)  
❌ Category filters (All, Today, Week, Inbox, Someday)  
❌ Show/Hide completed toggle  
❌ Add task input  
❌ Full task list  

**What stays visible:**

✅ TADA header (for branding)  
✅ ADHD Mode toggle (to exit)  
✅ Keyboard shortcuts button  
✅ Dark mode toggle  
✅ Focus view (the ONE task)  

**Result:** Maximum signal, minimum noise.

---

## 🎨 Design Principles

### 1. **Reduce Friction to Zero**
- One-click toggle
- No setup required
- Instant gratification

### 2. **Never Shame, Always Celebrate**
- Positive reinforcement only
- No "you didn't do X" messages
- No red overdue warnings (yet)
- No broken streaks (planned: shame-free streaks)

### 3. **Show Less, Not More**
- Hide everything non-essential
- Progressive disclosure
- One thing at a time

### 4. **Make Time Visible**
- Energy level badges (time proxy)
- Time estimates shown (when available)
- Future: Visual countdown timer

### 5. **Respect Energy Fluctuations**
- Energy filter adapts to user state
- No rigid "you must do this now" messaging
- Skip button always available

### 6. **Build in Dopamine Hits**
- Confetti animations
- Satisfying sounds (future)
- Smooth transitions
- Gradient colors
- Large, tactile UI elements

---

## 🧪 How to Use ADHD Mode

### First-Time Setup (30 seconds)

1. Open TADA
2. Click the **🧠 ADHD Mode** button in the top-right
3. That's it. You're in ADHD mode.

### Daily Workflow

**Morning:**
1. Click 🧠 ADHD Mode
2. See your highest-priority task
3. Check the task: done!
4. 🎉 Celebration!
5. Next task appears automatically

**Afternoon (low energy):**
1. Click ⚡ **Low Energy** filter
2. See only quick, easy tasks
3. Knock out 3-4 small wins
4. Feel accomplished

**When stuck:**
1. Click 🎲 **Just Start**
2. Pick energy level (or skip)
3. Get a random task
4. Do the thing

### Switching Back to Normal Mode

- Click **📋 See All Tasks** (bottom of focus view)
- Or click **🧠 ADHD Mode** toggle again

---

## 🌙 Dark Mode Support

**All ADHD Mode components support dark mode:**
- Focus view
- Energy filter
- Celebration overlay
- Buttons and badges

**Styling:**
- Glassmorphism effects (backdrop-blur)
- Gradient backgrounds
- High contrast text
- Smooth color transitions

---

## 📱 Responsive Design

**Mobile:**
- Large touch targets (minimum 56x56dp)
- Generous spacing
- Readable fonts (18px minimum in focus view)
- One-column layout

**Desktop:**
- Centered focus view (max-width: 3xl)
- Hover effects on buttons
- Keyboard shortcuts support

---

## ⌨️ Keyboard Shortcuts

**In ADHD Mode:**
- `Cmd/Ctrl + K` — (Disabled) Normal quick add
- `?` — Show keyboard shortcuts help
- `Esc` — Close modals
- `Enter` — Complete task (future: when focus view has focus)

**Future shortcuts:**
- `Space` — Complete current task
- `Tab` — Skip to next task
- `J` — Just Start (random)

---

## 🔮 Future Enhancements (Phase 2+)

### Planned Features

1. **⏱️ Visual Focus Timer**
   - Shrinking circle countdown
   - Time-spent indicator
   - Gentle nudges at intervals
   - "You've been working for 25 minutes" reminders

2. **🪄 AI Task Breakdown**
   - "Make it Tiny" button
   - Paste "clean the apartment" → get 9 micro-steps
   - Each step < 15 minutes
   - Time estimates auto-generated

3. **📊 Time Estimation Learning**
   - "How long do you think this will take?"
   - Compare estimated vs. actual
   - Build time awareness over time
   - "You tend to underestimate by ~30%"

4. **✅ Subtask Support in Focus View**
   - Multi-step tasks show progressive checkboxes
   - Celebrate each sub-step completion
   - Visual progress bar

5. **👥 Body Doubling Lite**
   - "3 people are working right now" indicator
   - Optional: Share current task with friend
   - No video required — lightweight accountability

6. **📅 Weekly Winventory**
   - End-of-week celebration summary
   - "You completed 23 tasks this week! 🎉"
   - Streaks without shame
   - Pattern recognition: "You're most productive on Wednesdays"

7. **🎭 Routine Templates**
   - Pre-built morning/evening routines
   - Step-by-step with timers
   - Customize and save your own

8. **🔊 Voice Guidance**
   - Optional TTS task reading
   - "Your next task is: Reply to Sarah's email"
   - Accessibility++ for visual processing challenges

---

## 💡 Why ADHD Mode Matters

### The Problem

Traditional todo apps are designed for neurotypical brains:
- Long lists = overwhelming
- Multiple priorities = decision paralysis
- No energy awareness = set up for failure
- Punishment mechanics = shame spirals

**For ADHD brains, these apps become "monuments to failure."**

### The Solution

ADHD Mode is built on clinical research about executive function:
- **Working memory deficits** → Externalize everything
- **Decision paralysis** → Reduce choices to ONE
- **Task initiation difficulty** → Lower activation energy
- **Time agnosia** → Make time visible
- **Dopamine dysregulation** → Build in rewards
- **Emotional dysregulation** → Never shame

**ADHD Mode meets you where you are.**

---

## 🎓 Research Foundation

This feature is based on 1,100+ lines of research covering:
- Russell Barkley's executive function model
- Tom Brown's 6 clusters of EF dysfunction
- Dopamine neuroscience (Schultz, Dayan & Montague)
- Self-Determination Theory (Deci & Ryan)
- Competitive analysis: Tiimo, Goblin.tools, Routinery, Focusmate
- User testimonials from ADHD communities

**See:** `/RESEARCH_ADHD_MODE.md` for full details.

---

## 🏆 Success Metrics

**What "success" looks like:**

✅ Users with ADHD report feeling LESS overwhelmed  
✅ Task completion rate increases (vs. normal mode)  
✅ Users return to the app daily (not avoiding it)  
✅ Positive emotional response (celebration, not shame)  
✅ Reduced decision fatigue ("I knew what to do next")  

**Future:** Track metrics like:
- Average tasks completed per ADHD mode session
- Time spent in focus view before completion
- Energy filter usage patterns
- Celebration view rate

---

## 🙏 Acknowledgments

**Inspired by:**
- **Tiimo** — Visual timeline and AI co-planner
- **Goblin.tools** — Task breakdown magic
- **Routinery** — Voice-guided routines
- **Llama Life** — Single-task focus
- **Focusmate** — Body doubling science

**Designed for:**
- People with ADHD
- Anyone with executive function challenges
- People who feel overwhelmed by traditional todo apps
- Anyone who needs focus over features

---

## 📬 Feedback & Support

**Have ideas for ADHD Mode?**
- Open a GitHub issue
- Share your experience
- Suggest new features

**Remember:**
> Your brain isn't broken. You just need tools designed for how you actually work.

ADHD Mode is one of those tools. 💜

---

**Built with 💜 by OpenClaw Agent**  
**For people whose brains work differently — and that's a feature, not a bug.**

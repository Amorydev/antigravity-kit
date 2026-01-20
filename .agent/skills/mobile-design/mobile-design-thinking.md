# Mobile Design Thinking

> **This file prevents AI from using memorized patterns and forces genuine thinking.**
> Mechanisms to prevent standard AI training defaults in mobile development.
> **The mobile equivalent of frontend's layout decomposition approach.**

---

## 🧠 DEEP MOBILE THINKING PROTOCOL

### This Process is Mandatory Before Every Mobile Project

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEEP MOBILE THINKING                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1️⃣ CONTEXT SCAN                                               │
│     └── What are my assumptions for this project?               │
│         └── QUESTION these assumptions                          │
│                                                                 │
│  2️⃣ ANTI-DEFAULT ANALYSIS                                      │
│     └── Am I applying a memorized pattern?                      │
│         └── Is this pattern REALLY the best for THIS project?   │
│                                                                 │
│  3️⃣ PLATFORM DECOMPOSITION                                     │
│     └── Did I think about iOS and Android separately?           │
│         └── What are the platform-specific patterns?            │
│                                                                 │
│  4️⃣ TOUCH INTERACTION BREAKDOWN                                │
│     └── Did I analyze each interaction individually?            │
│         └── Did I apply Fitts' Law, Thumb Zone?                 │
│                                                                 │
│  5️⃣ PERFORMANCE IMPACT ANALYSIS                                │
│     └── Did I consider performance impact of each component?    │
│         └── Is the default solution performant?                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚫 AI MOBILE DEFAULTS (FORBIDDEN LIST)

### ⚠️ CRITICAL: Using These Patterns Automatically is FORBIDDEN!

The following patterns are "defaults" that AIs learned from training data.
Before using any of these, **STOP, QUESTION them, and CONSIDER ALTERNATIVES!**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                      🚫 AI MOBILE SAFE HARBOR                           │
│              (Default Patterns - Never Use Without Questioning)         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  NAVIGATION DEFAULTS:                                                   │
│  ├── Tab bar for every project → Would drawer/stack be better?         │
│  ├── Fixed 5 tabs → Are 3 enough? For 6+, use drawer instead?          │
│  ├── "Home" tab on left → What does user behavior say?                 │
│  ├── Hamburger menu → Is it outdated? Bottom nav better?               │
│  ├── Stack navigator everywhere → Is modal better for some flows?      │
│  └── Deep linking as afterthought → Should be planned from start?      │
│                                                                         │
│  STATE MANAGEMENT DEFAULTS:                                             │
│  ├── Redux everywhere → Is Zustand/Jotai/Recoil sufficient?            │
│  ├── Global state for everything → Isn't local state enough?           │
│  ├── Context Provider hell → Is atom-based (Jotai/Recoil) better?      │
│  ├── BLoC for every Flutter project → Is Riverpod more modern?         │
│  ├── Provider for all Flutter state → Should some be local?            │
│  ├── MobX with classes → Are hooks/functional better?                  │
│  └── ViewModel for everything (Compose) → Is remember{} enough?        │
│                                                                         │
│  LIST IMPLEMENTATION DEFAULTS:                                          │
│  ├── FlatList as default → Is FlashList 10x more performant?           │
│  ├── windowSize=21 → Is default (21) needed or wasteful?               │
│  ├── removeClippedSubviews=true → Does it help on this OS version?     │
│  ├── ListView.builder always → Is ListView.separated better for gaps?  │
│  ├── Infinite scroll everywhere → Is pagination clearer?               │
│  ├── LazyColumn for everything → Is Column with scrolling enough?      │
│  └── getItemLayout always → Only if fixed height, right?               │
│                                                                         │
│  UI PATTERN DEFAULTS:                                                   │
│  ├── FAB bottom-right → Is bottom-left more thumb-friendly?            │
│  ├── Pull-to-refresh on every list → Is it needed or just habit?       │
│  ├── Swipe-to-delete from left → Is right-to-left more intuitive?      │
│  ├── Bottom sheet for every modal → Is full screen clearer?            │
│  ├── Snackbar for all notifications → Is toast/alert better?           │
│  ├── Card for every list item → Is it visual bloat?                    │
│  ├── Rounded corners everywhere → Does it fit brand?                   │
│  └── Skeleton loaders always → Is spinner simpler/better?              │
│                                                                         │
│  FORM DEFAULTS:                                                         │
│  ├── Inline validation → Is submit-time validation clearer?            │
│  ├── Floating labels → Are they accessible/readable?                   │
│  ├── Auto-focus first field → Does it annoy users on mobile?           │
│  ├── Submit on Enter → Works on mobile keyboard?                       │
│  └── Red error text → Is it accessible (color-blind)?                  │
│                                                                         │
│  ANIMATION DEFAULTS:                                                    │
│  ├── 300ms duration → Is 200ms snappier? 500ms smoother?               │
│  ├── Ease-in-out curve → Is spring more natural?                       │
│  ├── Fade transition → Is slide/scale more engaging?                   │
│  ├── Hero animation everywhere → Is it overused?                       │
│  └── Page curl (iOS) → Is it dated now?                                │
│                                                                         │
│  API/DATA DEFAULTS:                                                     │
│  ├── Fetch on mount → Should it be lazy/on-demand?                     │
│  ├── Retry 3 times → Is exponential backoff better?                    │
│  ├── 10 second timeout → Is 5s or 30s more appropriate?                │
│  ├── Cache forever → Should it expire?                                 │
│  ├── Optimistic updates everywhere → When is it risky?                 │
│  └── REST API assumed → Is GraphQL/gRPC better here?                   │
│                                                                         │
│  PERFORMANCE DEFAULTS:                                                  │
│  ├── useCallback on everything → Is it premature optimization?         │
│  ├── React.memo wrapping all → Does it actually help here?             │
│  ├── useMemo for all calculations → Is the computation heavy enough?   │
│  ├── const constructors (Flutter) → Did you actually use const?        │
│  └── remember{} everywhere (Compose) → Is derivedStateOf needed?       │
│                                                                         │
│  STYLING DEFAULTS:                                                      │
│  ├── 16px base padding → Is 12px or 20px better for this UI?           │
│  ├── #007AFF blue (iOS) → Does it match brand colors?                  │
│  ├── Material blue 500 → Is custom color better?                       │
│  ├── System font → Is custom font worth the bundle size?               │
│  ├── 14px body text → Is 16px more readable on mobile?                 │
│  └── 24px headers → Is hierarchy clear enough?                         │
│                                                                         │
│  ACCESSIBILITY DEFAULTS:                                                │
│  ├── Skip accessibility → NEVER acceptable!                            │
│  ├── "Button" as accessibilityLabel → Is it descriptive enough?        │
│  ├── No semantic markup → Screen readers need it!                      │
│  ├── Color-only indicators → What about color-blind users?             │
│  └── Tiny touch targets → Did you meet 44pt/48dp minimum?              │
│                                                                         │
│  SECURITY DEFAULTS:                                                     │
│  ├── AsyncStorage for tokens → Use SecureStore/Keychain!               │
│  ├── HTTP in dev → Always HTTPS, even in dev!                          │
│  ├── No SSL pinning → Is it needed for this app?                       │
│  ├── Hardcoded secrets → Use environment variables!                    │
│  └── No input validation → ALWAYS validate user input!                 │
│                                                                         │
│  TESTING DEFAULTS:                                                      │
│  ├── "We'll test later" → Test-driven or at least parallel!            │
│  ├── Only unit tests → Integration/E2E tests needed too!               │
│  ├── Manual testing only → Automate regression testing!                │
│  ├── Test on emulator only → Real devices show real issues!            │
│  └── Skip accessibility testing → Use screen readers to test!          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🤔 HOW TO BREAK THE DEFAULT PATTERN

### Step 1: RECOGNIZE the default
When you're about to use a pattern, ask: **"Did I choose this, or is it just what I always do?"**

### Step 2: QUESTION the default
Ask these questions:
- **Why this pattern?** (What problem does it solve?)
- **What are the alternatives?** (List at least 2 other options)
- **What does the user actually need?** (Not what's trendy)
- **What are the trade-offs?** (Performance, complexity, UX)
- **Is this adding value or just complexity?**

### Step 3: CHOOSE consciously
Only use the pattern if you can defend it with specific reasons for THIS project.

---

## ✅ GOOD: Conscious Choices
```
User: "Create a todo app"

❌ BAD AI Response:
"I'll create a React Native app with Redux, tab navigation, 
FlatList, and bottom sheet for adding todos."

✅ GOOD AI Response:
"Before I start, let me clarify a few things:

1. **State management**: For a simple todo app, would Zustand or 
   even useState be sufficient? Redux might be overkill unless 
   you plan complex features.

2. **Navigation**: Do you need tabs, or would a single screen with 
   a modal be simpler?

3. **List**: FlashList is 10x faster than FlatList - should I use that?

4. **Add todo UI**: Bottom sheet, full modal, or inline form?

What feels right for your use case?"
```

---

## 🚨 RED FLAGS: You're Using Defaults

### Warning Signs:
- You didn't ask the user ANY questions before choosing
- You copied a pattern from your last project without thinking
- You can't explain WHY you chose this pattern over alternatives
- You're adding features "just in case" or "because everyone does it"
- You're using buzzwords without understanding trade-offs

### Self-Check Questions:
1. **Did I ask the user what they need?** ✓/✗
2. **Can I name 2 alternatives to this pattern?** ✓/✗
3. **Do I know the trade-offs of this choice?** ✓/✗
4. **Is this solving a real problem or adding complexity?** ✓/✗
5. **Would a simpler solution work just as well?** ✓/✗

If you answered ✗ to any of these, **STOP and RETHINK!**

---

## 📋 DECISION FRAMEWORK

Use this framework before choosing ANY pattern:
```
PATTERN: _______________________

1. PROBLEM: What specific problem am I solving?
   ________________________________________________

2. ALTERNATIVES: What are 3 other ways to solve this?
   A) ________________________________________________
   B) ________________________________________________
   C) ________________________________________________

3. TRADE-OFFS: What am I giving up with each option?
   A) ________________________________________________
   B) ________________________________________________
   C) ________________________________________________

4. USER NEED: What does the user actually need here?
   ________________________________________________

5. CHOICE: Which option best serves the user need?
   ________________________________________________

6. REASONING: Why is this better than the alternatives?
   ________________________________________________
```

---

## 💡 EXAMPLES: Breaking the Defaults

### Example 1: Navigation
```
❌ DEFAULT THINKING:
"Mobile app = Tab bar navigation"

✅ CONSCIOUS THINKING:
"What navigation pattern fits the user journey?
- Tab bar: Good for 3-5 equal-importance sections
- Drawer: Good for 6+ sections, secondary navigation
- Stack: Good for linear flows, onboarding
- Bottom sheet: Good for contextual actions

For THIS app (news reader):
- Users browse categories (8+ sections) → DRAWER
- Users read articles in sequence → STACK
- Tab bar would force hiding sections → BAD UX

DECISION: Drawer + Stack, NO tab bar"
```

### Example 2: State Management
```
❌ DEFAULT THINKING:
"React Native = Redux"

✅ CONSCIOUS THINKING:
"What state complexity do I have?
- Simple counter app → useState
- Form with 5 fields → useState + useReducer
- Shopping cart + user + products → Zustand
- Complex normalized data → Redux Toolkit

For THIS app (todo list):
- 1 list, local persistence, no auth → useState + AsyncStorage

DECISION: No state library needed, useState is enough"
```

### Example 3: List Performance
```
❌ DEFAULT THINKING:
"List = FlatList with all optimizations"

✅ CONSCIOUS THINKING:
"What's the list size and complexity?
- 10 items, simple → Regular ScrollView
- 100 items, simple → FlatList
- 1000+ items → FlashList
- Variable height, complex → FlatList + getItemLayout

For THIS app (contacts, 50-500 items):
- FlashList is 10x faster
- Setup cost: 1 line (estimatedItemSize)

DECISION: Use FlashList, not FlatList"
```

---

## 🎯 FINAL REMINDER

> **Every pattern you use should be a CONSCIOUS CHOICE, not a REFLEX.**

Ask yourself before every decision:
- **"Did I CHOOSE this, or did I DEFAULT to it?"**
- **"Can I defend this choice with reasons specific to THIS project?"**
- **"Is there a simpler solution I'm overlooking?"**

If you can't answer these confidently, **you're using defaults.**

**STOP. QUESTION. CHOOSE.**

---

## 🔍 COMPONENT DECOMPOSITION (MANDATORY)

### Decomposition Analysis for Every Screen

Before designing any screen, perform this analysis:

```
SCREEN: [Screen Name]
├── PRIMARY ACTION: [What is the main action?]
│   └── Is it in thumb zone? [Yes/No → Why?]
│
├── TOUCH TARGETS: [All tappable elements]
│   ├── [Element 1]: [Size]pt → Sufficient?
│   ├── [Element 2]: [Size]pt → Sufficient?
│   └── Spacing: [Gap]pt → Accidental tap risk?
│
├── SCROLLABLE CONTENT:
│   ├── Is it a list? → FlatList/FlashList [Why this choice?]
│   ├── Item count: ~[N] → Performance consideration?
│   └── Fixed height? → Is getItemLayout needed?
│
├── STATE REQUIREMENTS:
│   ├── Is local state sufficient?
│   ├── Do I need to lift state?
│   └── Is global required? [Why?]
│
├── PLATFORM DIFFERENCES:
│   ├── iOS: [Anything different needed?]
│   └── Android: [Anything different needed?]
│
├── OFFLINE CONSIDERATION:
│   ├── Should this screen work offline?
│   └── Cache strategy: [Yes/No/Which one?]
│
└── PERFORMANCE IMPACT:
    ├── Any heavy components?
    ├── Is memoization needed?
    └── Animation performance?
```

---

## 🎯 PATTERN QUESTIONING MATRIX

Ask these questions for every default pattern:

### Navigation Pattern Questioning

| Assumption | Question | Alternative |
|------------|----------|-------------|
| "I'll use tab bar" | How many destinations? | 3 → minimal tabs, 6+ → drawer |
| "5 tabs" | Are all equally important? | "More" tab? Drawer hybrid? |
| "Bottom nav" | iPad/tablet support? | Navigation rail alternative |
| "Stack navigation" | Did I consider deep links? | URL structure = navigation structure |

### State Pattern Questioning

| Assumption | Question | Alternative |
|------------|----------|-------------|
| "I'll use Redux" | How complex is the app? | Simple: Zustand, Server: TanStack |
| "Global state" | Is this state really global? | Local lift, Context selector |
| "Context Provider" | Will re-render be an issue? | Zustand, Jotai (atom-based) |
| "BLoC pattern" | Is the boilerplate worth it? | Riverpod (less code) |

### List Pattern Questioning

| Assumption | Question | Alternative |
|------------|----------|-------------|
| "FlatList" | Is performance critical? | FlashList (faster) |
| "Standard renderItem" | Is it memoized? | useCallback + React.memo |
| "Index key" | Does data order change? | Use item.id |
| "ListView" | Are there separators? | ListView.separated |

### UI Pattern Questioning

| Assumption | Question | Alternative |
|------------|----------|-------------|
| "FAB bottom-right" | User handedness? | Accessibility settings |
| "Pull-to-refresh" | Does this list need refresh? | Only when necessary |
| "Modal bottom sheet" | How much content? | Full screen modal might be better |
| "Swipe actions" | Discoverability? | Visible button alternative |

---

## 🧪 ANTI-MEMORIZATION TEST

### Ask Yourself Before Every Solution

```
┌─────────────────────────────────────────────────────────────────┐
│                    ANTI-MEMORIZATION CHECKLIST                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Did I pick this solution "because I always do it this way"?  │
│    → If YES: STOP. Consider alternatives.                       │
│                                                                 │
│  □ Is this a pattern I've seen frequently in training data?     │
│    → If YES: Is it REALLY suitable for THIS project?            │
│                                                                 │
│  □ Did I write this solution automatically without thinking?    │
│    → If YES: Step back, do decomposition.                       │
│                                                                 │
│  □ Did I consider an alternative approach?                      │
│    → If NO: Think of at least 2 alternatives, then decide.      │
│                                                                 │
│  □ Did I think platform-specifically?                           │
│    → If NO: Analyze iOS and Android separately.                 │
│                                                                 │
│  □ Did I consider performance impact of this solution?          │
│    → If NO: What is the memory, CPU, battery impact?            │
│                                                                 │
│  □ Is this solution suitable for THIS project's CONTEXT?        │
│    → If NO: Customize based on context.                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 CONTEXT-BASED DECISION PROTOCOL

### Think Differently Based on Project Type

```
DETERMINE PROJECT TYPE:
        │
        ├── E-Commerce App
        │   ├── Navigation: Tab (Home, Search, Cart, Account)
        │   ├── Lists: Product grids (memoized, image optimized)
        │   ├── Performance: Image caching CRITICAL
        │   ├── Offline: Cart persistence, product cache
        │   └── Special: Checkout flow, payment security
        │
        ├── Social/Content App
        │   ├── Navigation: Tab (Feed, Search, Create, Notify, Profile)
        │   ├── Lists: Infinite scroll, complex items
        │   ├── Performance: Feed rendering CRITICAL
        │   ├── Offline: Feed cache, draft posts
        │   └── Special: Real-time updates, media handling
        │
        ├── Productivity/SaaS App
        │   ├── Navigation: Drawer or adaptive (mobile tab, tablet rail)
        │   ├── Lists: Data tables, forms
        │   ├── Performance: Data sync
        │   ├── Offline: Full offline editing
        │   └── Special: Conflict resolution, background sync
        │
        ├── Utility App
        │   ├── Navigation: Minimal (stack-only possible)
        │   ├── Lists: Probably minimal
        │   ├── Performance: Fast startup
        │   ├── Offline: Core feature offline
        │   └── Special: Widget, shortcuts
        │
        └── Media/Streaming App
            ├── Navigation: Tab (Home, Search, Library, Profile)
            ├── Lists: Horizontal carousels, vertical feeds
            ├── Performance: Preloading, buffering
            ├── Offline: Download management
            └── Special: Background playback, casting
```

---

## 🔄 INTERACTION BREAKDOWN

### Analysis for Every Gesture

Before adding any gesture:

```
GESTURE: [Gesture Type]
├── DISCOVERABILITY:
│   └── How will users discover this gesture?
│       ├── Is there a visual hint?
│       ├── Will it be shown in onboarding?
│       └── Is there a button alternative? (MANDATORY)
│
├── PLATFORM CONVENTION:
│   ├── What does this gesture mean on iOS?
│   ├── What does this gesture mean on Android?
│   └── Am I deviating from platform convention?
│
├── ACCESSIBILITY:
│   ├── Can motor-impaired users perform this gesture?
│   ├── Is there a VoiceOver/TalkBack alternative?
│   └── Does it work with switch control?
│
├── CONFLICT CHECK:
│   ├── Does it conflict with system gestures?
│   │   ├── iOS: Edge swipe back
│   │   ├── Android: Back gesture
│   │   └── Home indicator swipe
│   └── Is it consistent with other app gestures?
│
└── FEEDBACK:
    ├── Is haptic feedback defined?
    ├── Is visual feedback sufficient?
    └── Is audio feedback needed?
```

---

## 🎭 SPIRIT OVER CHECKLIST (Mobile Edition)

### Passing the Checklist is Not Enough!

| ❌ Self-Deception | ✅ Honest Assessment |
|-------------------|----------------------|
| "Touch target is 44px" (but on edge, unreachable) | "Can user reach it one-handed?" |
| "I used FlatList" (but didn't memoize) | "Is scroll smooth?" |
| "Platform-specific nav" (but only icons differ) | "Does iOS feel like iOS, Android like Android?" |
| "Offline support exists" (but error message is generic) | "What can user actually do offline?" |
| "Loading state exists" (but just a spinner) | "Does user know how long to wait?" |

> 🔴 **Passing the checklist is NOT the goal. Creating great mobile UX IS the goal.**

---

## 📝 MOBILE DESIGN COMMITMENT

### Fill This at the Start of Every Mobile Project

```
📱 MOBILE DESIGN COMMITMENT

Project: _______________
Platform: iOS / Android / Both

1. Default pattern I will NOT use in this project:
   └── _______________
   
2. Context-specific focus for this project:
   └── _______________

3. Platform-specific differences I will implement:
   └── iOS: _______________
   └── Android: _______________

4. Area I will specifically optimize for performance:
   └── _______________

5. Unique challenge of this project:
   └── _______________

🧠 If I can't fill this commitment → I don't understand the project well enough.
   → Go back, understand context better, ask the user.
```

---

## 🚨 MANDATORY: Before Every Mobile Work

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRE-WORK VALIDATION                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Did I complete Component Decomposition?                      │
│  □ Did I fill the Pattern Questioning Matrix?                   │
│  □ Did I pass the Anti-Memorization Test?                       │
│  □ Did I make context-based decisions?                          │
│  □ Did I analyze Interaction Breakdown?                         │
│  □ Did I fill the Mobile Design Commitment?                     │
│                                                                 │
│  ⚠️ Do not write code without completing these!                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

> **Remember:** If you chose a solution "because that's how it's always done," you chose WITHOUT THINKING. Every project is unique. Every context is different. Every user behavior is specific. **THINK, then code.**

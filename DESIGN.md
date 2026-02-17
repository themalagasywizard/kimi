# Syph Design System - "Award Winning"

## 🎨 Visual Identity

### Core Palette
- **Primary:** `purple-500` (#8b5cf6) -> Used for active states, glows, and accents.
- **Secondary:** `zinc-950` (#09090b) -> Deep background color.
- **Text:** `white` / `zinc-400` -> High contrast for readability.
- **Accents:** `cyan-400` / `pink-500` -> Occasional gradients for "future" feel.

### Typography
- **Headings:** Sans-serif, bold, tight tracking (`tracking-tight`).
- **Body:** Inter (default sans), relaxed leading (`leading-relaxed`).
- **Monospace:** For technical terms ("SYPH LABS", data points).

### Effects
- **Glassmorphism:** `backdrop-blur-md` + `bg-white/5` + `border-white/10`.
- **Glows:** `box-shadow` with colored diffusion or radial gradients.
- **Transitions:** All interactions have `duration-300` or `duration-500` with `ease-out`.

## 🌀 Animation Strategy

### Three.js Hero
- **Concept:** "Neural Cloud".
- **Implementation:** A particle system (5000 points) rotating slowly in 3D space.
- **Interaction:** Subtle camera movement on mouse interaction (default controls).

### Scroll Reveals
- **Library:** Framer Motion.
- **Pattern:** Elements fade in (`opacity: 0 -> 1`) and slide up (`y: 20 -> 0`).
- **Stagger:** Lists (features, stats) use staggered delays (`index * 0.1`).

## 🧱 Component Architecture

### Layout
- `Navbar`: Fixed, glassmorphic, collapses on mobile.
- `Hero`: Full viewport height (`min-h-screen`), centered content, 3D background.
- `Grid`: Used for Features, Stats, Labs to create a structured, dashboard-like feel.

### Key Components
- `ThreeHero`: The background visual engine.
- `Card`: A reusable glass container with hover effects.
- `GradientText`: Used for key phrases ("Autonomous", "Intelligence").

## 🚀 Implementation Notes
- **Tailwind v4:** Using the new engine for instant HMR and smaller bundle size.
- **Performance:** 3D scene uses `InstancedMesh` (via `Points`) for 60fps performance.
- **Responsiveness:** All grids collapse to 1 column on mobile, 2-3 on desktop.

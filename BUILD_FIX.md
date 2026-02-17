# Build Errors Post-Mortem

**Date:** 2026-02-18  
**Issue:** Netlify build failed due to TypeScript errors

## Errors
```
src/components/Footer.tsx(1,1): error TS6192: All imports in import declaration are unused.
src/components/Navbar.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
src/components/ThreeHero.tsx(24,15): error TS2554: Expected 1 arguments, but got 0.
src/components/ThreeHero.tsx(27,13): error TS6133: 'state' is declared but its value is never read.
```

## Root Cause
- Unused imports left in code (lucide-react icons in Footer, React in Navbar)
- `useFrame` callback received unused `state` parameter
- Three.js component had incorrect prop usage

## Fixes Applied
1. **Footer.tsx** - Removed unused `{ Twitter, Linkedin, Github }` import
2. **Navbar.tsx** - Removed unused `React` import (not needed in React 17+)
3. **ThreeHero.tsx** - Changed `useFrame((state, delta)` to `useFrame((_, delta)` to ignore unused param

## Prevention
- **Always run `npx tsc --noEmit` before pushing** to catch TypeScript errors
- Configure IDE to warn on unused imports
- Add pre-push hook: `npm run build` should pass before git push

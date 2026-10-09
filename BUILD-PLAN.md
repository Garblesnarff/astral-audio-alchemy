# Astral Audio Alchemy — Build Plan
Repo: Garblesnarff/astral-audio-alchemy · local HEAD 63ff3510 (last pushed 2025-11-06)
Stack: Vite 5 + React 18 + TS + Tailwind/shadcn · Web Audio, no backend. ~14.6k LOC.

## Assessment (2026-10-09, nightly builder-wing run)
- Builds clean (`vite build` ✓), ESLint clean after fixes (0 errors), `tsc -p tsconfig.app.json` clean.
- Core architecture is real: `src/utils/audioEngine.ts` singleton facade over per-domain
  preset engines (astral, gateway, lucid, remote, alien, standard binaural), analyser node
  wired for visualizers, guides + controls + timer + visualizers per domain.
- Issues found & being fixed this run:
  - [x] 17 ESLint errors (empty interfaces, `any` casts, case-block declarations,
        prefer-const, ts-ignore, tailwind require) — fixed.
  - [x] 4 tsc errors from the lint fixes — fixed.
  - [ ] `src/utils/presets_old.ts` dead (no importers) — delete.
  - [ ] RemoteViewingControls stubs: startTargetFocus, setProtocol, freq handlers only
        console.log/local state — wire to audioEngine.
  - [ ] AstralProjectionControls stubs: vibration intensity, journey phase, return signal — wire up.
  - [ ] GatewayProcessControls possibly orphaned — wire in or remove.
  - [ ] index.html Lovable title/meta leftovers — replace with real branding.
  - [ ] Guide components: check for placeholder/thin content, fill gaps.

## Build priorities
1. Core loop works end-to-end: preset → play → binaural audio → timer → visualizer → complete.
2. No console errors; production build green.
3. No dead/placeholder UI; guides have real content.

## Done 2026-10-09 night run (all local, not pushed)
- Lint 0 errors, tsc clean, `vite build` green, built app serves (HTTP 200).
- Engine: autoplay-policy resume fix, live freq retuning, astral phase/vibration/
  return-signal APIs, remote target-focus cancel/running state, gateway resonant tuning.
- UI: all stub controls wired to the real engine (remote viewing protocol +
  target focus + freq sliders; astral journey phase + vibration + return signal;
  gateway controls un-orphaned into MainContent); Timer side-effect bug fixed.
- Branding: real title/meta/OG in index.html; Lovable leftovers removed
  (presets_old.ts, 3MB unused upload, lovable-tagger dep/plugin).
- Guides: safety disclaimer (lucid), how-to-use (gateway), protocol explainer
  (remote viewing), technique content (astral).
- Verified: Node smoke test with mocked Web Audio — 13 preset domains
  start/stop cleanly with live analyser (lane1-notes/smoke-audio-engine.ts).
- Full detail: lane1-notes/fix-summary.md.

## Remaining / future nights
- [ ] Real-browser click-through: pick a session → play → confirm audible
      binaural beat + animated visualizer + timer completion (needs a browser;
      subagent lane has no live-browser access — Rob or main agent to verify).
- [ ] Defensive `typeof OscillatorNode` guard in RemoteViewingProtocolManager
      cleanup path (only matters outside browsers).
- [ ] Code-split bundle per domain (currently one 657 kB JS chunk).
- [ ] Decide: commit + push to Garblesnarff/astral-audio-alchemy, or keep local
      until Rob reviews. (Standing rule: no pushes unless told — Rob's call.)
- [ ] Optional: rename the product itself (Rob permitted renames; "astral-audio-
      alchemy" is a mouthful — e.g. "Astral Alchemy" or "Wavegate"). Repo rename
      would be proposed, not done unilaterally.
- [ ] Optional: add a test framework + engine unit tests (repo has none).

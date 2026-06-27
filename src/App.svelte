<script lang="ts">
  import Nav from './lib/Nav.svelte';
  import ComparisonTable from './lib/ComparisonTable.svelte';
  import AnalysisTable from './lib/AnalysisTable.svelte';

  let activeSection = $state('intro');

  $effect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection = entry.target.id;
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<Nav {activeSection} />

<main class="lg:ml-62 min-h-screen">
  <!-- ── PAGE HEADER ── -->
  <header
    style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 4rem 0 3.5rem;"
  >
    <div class="mx-auto max-w-200 px-10 max-lg:px-5">
      <div class="mb-5 text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-teal-600">
        Lead Front-End Engineer · Technical Exercise
      </div>
      <h1
        class="m-0 mb-5 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-slate-50"
      >
        Platform Architecture<br /><span class="text-slate-400">realestate.co.nz</span>
      </h1>
      <p class="m-0 max-w-130 text-[0.95rem] leading-[1.65] text-slate-500">
        Lead Front-End Engineer technical exercise response. Built as an interactive page rather
        than a document.
      </p>
    </div>
  </header>

  <div class="mx-auto max-w-800px px-10 pb-20 max-lg:px-5">
    <!-- ══════════════════════════════════════
         00 · INTRODUCTION
    ══════════════════════════════════════ -->
    <section id="intro" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase text-teal-600">
        00 · Introduction
      </div>
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        What's in this response
      </h2>
      <p class="mb-7 text-[0.9375rem] leading-[1.75] text-slate-600">
        The brief asked for an architecture proposal covering two surfaces: a public listings site
        and an agent portal. This response works through that problem in layers — from mapping the
        two apps, to the architectural conclusions, to three areas covered in depth.
      </p>

      <div
        class="flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden"
      >
        {#each [{ label: '01 · Point of View', desc: 'Three principles that shape every decision in this response: vertical slices over full rebuilds, Web Components as the migration vehicle, and DevEx as a compounding investment.' }, { label: '02 · The Two Surfaces', desc: 'A parameter-by-parameter comparison of the public site and portal — session model, performance profile, SEO needs, AI roadmap. Each row maps to an architectural decision.' }, { label: '03 · Analysis', desc: 'Technical dimensions that drive the architecture: security, rendering strategy, component library, PWA potential, SEO/AEO, and team structure.' }, { label: '04 · Architecture', desc: 'The two-app conclusion — SSR + tiered ISR for the public site, CSR/SPA for the portal — and the shared content model that connects them.' }, { label: '↳ Rendering Strategy', desc: 'Why the public site needs two ISR cache tiers (not one), and how on-demand invalidation keeps portal saves and public listings in sync.' }, { label: '↳ Migration Strategy', desc: 'The case against a full rebuild. How Custom Web Components enable feature-by-feature migration that deploys into both the legacy codebase and the new one simultaneously.' }, { label: '↳ Risks', desc: 'Four risks to name before work starts: SEO regression, design system drift, cache/edit consistency, and portal data loss.' }] as item (item.label)}
          <div class="flex gap-4 px-5 py-4">
            <div class="w-44 shrink-0 text-[0.78rem] font-semibold text-slate-900">
              {item.label}
            </div>
            <div class="text-[0.82rem] leading-relaxed text-slate-500">{item.desc}</div>
          </div>
        {/each}
      </div>
    </section>

    <!-- ══════════════════════════════════════
         01 · OVERVIEW
    ══════════════════════════════════════ -->
    <section id="overview" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase text-teal-600">
        01 · Point of View
      </div>
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Three principles
      </h2>

      <div class="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        {#each [{ icon: '⟳', title: 'Vertical slices over full rebuilds', body: 'Full rebuilds introduce simultaneous risk across security, UI, and business logic. Rebuilding feature by feature — deployed and measured each time — keeps risk contained and ships value before the migration is complete.' }, { icon: '⬡', title: 'Web Components as the migration vehicle', body: 'Custom Web Components are framework-agnostic and drop into any codebase. A new feature can deploy into the legacy app and the new app simultaneously — no big-bang cutover required.' }, { icon: '◈', title: 'DevEx compounds', body: 'Shared types, enforced CI gates, and a governed component library pay forward. Each slice ships faster than the last because the infrastructure already exists.' }] as card (card.title)}
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div class="mb-2 text-[1.1rem] text-teal-600">{card.icon}</div>
            <h3 class="m-0 mb-2 text-[0.875rem] font-semibold text-slate-900">{card.title}</h3>
            <p class="m-0 text-[0.825rem] leading-relaxed text-slate-500">{card.body}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- ══════════════════════════════════════
         02 · THE TWO SURFACES
    ══════════════════════════════════════ -->
    <section id="surfaces" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase text-teal-600">
        02 · The Two Surfaces
      </div>
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        The two surfaces
      </h2>
      <p class="mb-7 text-[0.9375rem] leading-[1.75] text-slate-600">
        The two apps have different session models, performance requirements, and content
        characteristics. Each row below maps to a specific architectural decision.
      </p>
      <ComparisonTable />
    </section>

    <!-- ══════════════════════════════════════
         03 · ANALYSIS
    ══════════════════════════════════════ -->
    <section id="analysis" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase text-teal-600">
        03 · Analysis
      </div>
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Technical dimensions
      </h2>
      <p class="mb-7 text-[0.9375rem] leading-[1.75] text-slate-600">
        Each dimension below drives one or more decisions in the Architecture and Deep Dives
        sections.
      </p>
      <AnalysisTable />
      <div
        class="mt-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-4"
      >
        <span class="mt-0.5 shrink-0 text-green-600">↓</span>
        <p class="m-0 text-[0.85rem] leading-[1.55] text-green-800">
          These are two distinct applications, not one app with two modes. Custom Web Components
          appear in both columns as the connective tissue during migration.
        </p>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         04 · ARCHITECTURE
    ══════════════════════════════════════ -->
    <section id="architecture" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase text-teal-600">
        04 · Architecture
      </div>
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Two apps, one content model
      </h2>
      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        The two surfaces need different rendering strategies. A single approach either adds SSR
        complexity the portal doesn't need, or sacrifices the public site's SEO and performance
        characteristics.
      </p>

      <div class="my-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <div class="mb-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-slate-500">
            Public Search &amp; Listings
          </div>
          <div class="mb-4 text-[1.1rem] font-bold text-teal-700">SSR + Tiered ISR</div>
          <ul class="m-0 flex list-none flex-col gap-2 p-0">
            {#each ['Cold, unauthenticated visitors — first-load speed is business-critical', 'SEO and Core Web Vitals directly affect traffic acquisition', 'Content of mixed freshness — different caching for listings vs suburb data', 'Structured data for AI answer engines (AEO) and agent marketplaces'] as item (item)}
              <li class="flex gap-2 text-[0.82rem] leading-snug text-slate-700">
                <span class="shrink-0 font-bold text-teal-600">–</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
        <div class="rounded-xl border border-violet-200 bg-violet-50 p-6">
          <div class="mb-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-slate-500">
            Agent Portal
          </div>
          <div class="mb-4 text-[1.1rem] font-bold text-violet-700">CSR / SPA</div>
          <ul class="m-0 flex list-none flex-col gap-2 p-0">
            {#each ['Warm, authenticated, repeat sessions — no cold-load problem', 'No SEO requirement — SSR adds complexity with zero return', 'Interaction responsiveness and data reliability are the priority', 'PWA capabilities (offline drafting, push notifications) from day one'] as item (item)}
              <li class="flex gap-2 text-[0.82rem] leading-snug text-slate-700">
                <span class="shrink-0 font-bold text-violet-600">–</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <p class="mb-0 text-[0.9375rem] leading-[1.75] text-slate-600">
        Both surfaces operate on the same entities — listings, suburbs, agents — through a shared
        API. The portal writes; the public site reads. Defining that contract as shared TypeScript
        types before either frontend is built is the most valuable early investment. Custom Web
        Components bridge the two during migration — see Migration Strategy.
      </p>
    </section>

    <!-- ── DEEP DIVES HEADER ── -->
    <div class="border-b border-slate-100 pb-4 pt-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase text-teal-600">
        05 · Deep Dives
      </div>
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Deep dives
      </h2>
      <p class="mb-0 text-[0.9375rem] leading-[1.75] text-slate-600">
        Three areas where the conventional approach is either incomplete or wrong.
      </p>
    </div>

    <!-- ══════════════════════════════════════
         RENDERING STRATEGY
    ══════════════════════════════════════ -->
    <section id="rendering" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-widest uppercase text-slate-500">
        ↳ Rendering Strategy
      </div>
      <h3 class="m-0 mb-5 text-[1.2rem] font-bold tracking-tight text-slate-900">
        Two ISR tiers, not one
      </h3>
      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        Public site content has two distinct freshness profiles. A single ISR window either
        over-revalidates suburb pages or under-serves listing updates.
      </p>

      <div class="my-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-orange-200 bg-orange-50 p-5">
          <div class="mb-1 text-[0.65rem] font-bold tracking-widest uppercase text-orange-600">
            High-change content
          </div>
          <div class="mb-2 text-[0.9rem] font-semibold text-slate-900">Listing pages</div>
          <p class="mb-3 text-[0.82rem] leading-[1.55] text-slate-500">
            Status, price, and photos change throughout a sale cycle. A listing can move from Active
            to Under Offer within a day.
          </p>
          <div
            class="rounded-md bg-orange-100 px-3 py-2 text-[0.78rem] font-semibold leading-snug text-orange-900"
          >
            Short ISR window (minutes) + on-demand invalidation triggered by portal saves
          </div>
        </div>
        <div class="rounded-xl border border-sky-200 bg-sky-50 p-5">
          <div class="mb-1 text-[0.65rem] font-bold tracking-widest uppercase text-sky-600">
            Low-change content
          </div>
          <div class="mb-2 text-[0.9rem] font-semibold text-slate-900">
            Suburb pages, school zones, agent profiles
          </div>
          <p class="mb-3 text-[0.82rem] leading-[1.55] text-slate-500">
            School catchments don't shift week-to-week. Suburb statistics are updated periodically
            by a data pipeline, not by agents.
          </p>
          <div
            class="rounded-md bg-sky-100 px-3 py-2 text-[0.78rem] font-semibold leading-snug text-sky-900"
          >
            Long ISR window (hours or days) — CDN serves cached content aggressively
          </div>
        </div>
      </div>

      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        <strong class="font-semibold text-slate-900">On-demand ISR</strong> closes the gap. When an agent
        saves a listing, it triggers explicit cache invalidation for that listing's public URL. The CDN
        serves stale content until the save fires, then refreshes immediately — static performance with
        SSR freshness, no CDN bypass required.
      </p>
      <p class="mb-0 text-[0.9375rem] leading-[1.75] text-slate-600">
        <strong class="font-semibold text-slate-900">The portal needs none of this.</strong> Sessions
        are warm and authenticated. A SPA with optimistic UI will feel faster than an SSR equivalent at
        the same backend latency. SSR on the portal is complexity with no user benefit.
      </p>
    </section>

    <!-- ══════════════════════════════════════
         MIGRATION STRATEGY
    ══════════════════════════════════════ -->
    <section id="migration" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-widest uppercase text-slate-500">
        ↳ Migration Strategy
      </div>
      <h3 class="m-0 mb-5 text-[1.2rem] font-bold tracking-tight text-slate-900">
        Against full rebuilds
      </h3>
      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        Full rebuilds introduce three failure modes simultaneously:
      </p>

      <div class="my-7 overflow-hidden rounded-xl border border-slate-200">
        {#each [{ n: '01', title: 'Security surface resets to zero', body: 'The legacy app has years of hardened patches. The rewrite launches unproven, under time pressure, requiring a full audit at the worst possible moment.' }, { n: '02', title: 'UI regression at scale', body: 'Responsive fixes, browser workarounds, and layout edge cases accumulate in old code without documentation. A rewrite rediscovers them in production with no quick rollback.' }, { n: '03', title: 'Business logic lives in the code', body: "Validation rules, permission hierarchies, pricing edge cases — these aren't in specs. They're discovered when the rewrite gets them wrong in production." }] as risk, i (risk.n)}
          <div class="flex items-start gap-5 px-6 py-5 {i < 2 ? 'border-b border-slate-100' : ''}">
            <div
              class="w-8 shrink-0 text-[1.5rem] font-extrabold leading-snug tracking-tight text-slate-200"
            >
              {risk.n}
            </div>
            <div>
              <div class="mb-1 text-[0.875rem] font-bold text-slate-900">{risk.title}</div>
              <p class="m-0 text-[0.825rem] leading-relaxed text-slate-500">{risk.body}</p>
            </div>
          </div>
        {/each}
      </div>

      <!-- Section divider -->
      <div
        class="my-10 flex items-center gap-4 text-[0.75rem] font-bold tracking-[0.08em] uppercase text-slate-500"
      >
        <span class="h-px flex-1 bg-slate-200"></span>
        The alternative: vertical slices via Custom Web Components
        <span class="h-px flex-1 bg-slate-200"></span>
      </div>

      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        Rebuild <em>feature by feature</em>. Each new feature ships as a Custom Web Component that
        runs in the legacy codebase and the new one simultaneously.
      </p>

      <!-- Web Components explainer -->
      <div class="my-7 rounded-xl bg-slate-900 p-6">
        <div
          class="mb-5 flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.01em] text-slate-400"
        >
          <span
            class="rounded bg-teal-600/20 px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.08em] uppercase text-teal-300"
          >
            Web Components
          </span>
          Why this primitive specifically
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {#each [{ title: 'Framework-agnostic', body: 'Compiles to a standard custom element that drops into any environment — legacy React, vanilla JS, new Svelte app.', code: "customElements.define('rea-search', SearchComponent)" }, { title: 'Self-contained', body: 'Owns its logic, styles (Shadow DOM optional), and tests. Developed and deployed independently of the surrounding codebase.', code: null }, { title: 'Side-by-side deployment', body: 'Ships into the legacy app alongside the old implementation. Validate in production. Remove the old code once stable.', code: '<rea-search-filters />' }, { title: 'One component, two hosts', body: 'The same component runs in the legacy codebase during migration and in the new codebase after. Build once, ship everywhere.', code: null }] as feat (feat.title)}
            <div class="rounded-lg border border-slate-800 bg-white/4 p-4">
              <div class="mb-2 text-[0.82rem] font-semibold text-slate-100">{feat.title}</div>
              <p class="m-0 text-[0.8rem] leading-relaxed text-slate-400">
                {feat.body}{#if feat.code}&nbsp;<code
                    class="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[0.82em] text-teal-300"
                    >{feat.code}</code
                  >{/if}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        This is the <strong class="font-semibold text-slate-900">strangler fig pattern</strong> applied
        to the frontend — new code gradually replaces old, with no cutover moment where everything has
        to work simultaneously for the first time.
      </p>

      <!-- Slice flow -->
      <div class="my-8 flex flex-col">
        {#each [{ n: 1, title: 'Pick the highest-value slice', body: 'Search filters, listing creation, suburb detail — whichever is highest-traffic or highest-pain.' }, { n: 2, title: 'Build end-to-end as a Web Component', body: 'TypeScript types → component → tests → API contract. Full slice, in isolation.' }, { n: 3, title: 'Deploy into the legacy app', body: 'Run the new component in production alongside the old implementation. Validate with real traffic.' }, { n: 4, title: 'Remove the legacy implementation', body: 'Once validated, delete the old code. The platform is now incrementally newer.' }, { n: 5, title: 'Repeat', body: 'Each slice is cheaper than the last. The component library, shared types, and patterns already exist.' }] as step, i (step.n)}
          <div
            class="flex items-start gap-4 rounded-[0.625rem] border border-slate-200 bg-slate-50 px-5 py-[1.1rem]"
          >
            <div
              class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[0.75rem] font-bold text-white"
            >
              {step.n}
            </div>
            <div>
              <div class="mb-1 text-[0.875rem] font-semibold text-slate-900">{step.title}</div>
              <p class="m-0 text-[0.82rem] leading-[1.55] text-slate-500">{step.body}</p>
            </div>
          </div>
          {#if i < 4}
            <div class="py-0.5 pl-[1.65rem] text-[1.1rem] font-bold leading-none text-teal-600">
              ↓
            </div>
          {/if}
        {/each}
      </div>

      <p class="mb-0 text-[0.9375rem] leading-[1.75] text-slate-600">
        <strong class="font-semibold text-slate-900">Before the first slice:</strong> shared design tokens
        and shared TypeScript content types. Not complete — they grow with each slice — but stable enough
        that slice 2 doesn't undo slice 1's foundational decisions.
      </p>
    </section>

    <!-- ══════════════════════════════════════
         RISKS
    ══════════════════════════════════════ -->
    <section id="risks" class="py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-widest uppercase text-slate-500">
        ↳ Risks
      </div>
      <h3 class="m-0 mb-5 text-[1.2rem] font-bold tracking-tight text-slate-900">
        Risks to name upfront
      </h3>
      <p class="mb-7 text-[0.9375rem] leading-[1.75] text-slate-600">
        The vertical slice approach mitigates some of these structurally. The ones below still need
        explicit management regardless of approach.
      </p>

      <div class="flex flex-col">
        {#each [{ n: '01', title: 'SEO regression during migration', severity: 'Critical', severityClass: 'bg-red-100 text-red-600', numClass: 'text-red-400', body: 'Organic search is a primary acquisition channel. URL structure changes break link equity, SSR misconfiguration serves crawlers empty content, and Core Web Vitals regression hits rankings directly.', mitigation: 'Vertical slices migrate one URL pattern at a time with baselines established before the legacy route is retired. URL-level integration tests on every build. Synthetic CWV monitoring from day one. Redirect testing is a required gate before any URL change ships.' }, { n: '02', title: 'Design system drift', severity: 'High', severityClass: 'bg-orange-100 text-orange-600', numClass: 'text-orange-400', body: 'Two surfaces, different shipping cadences — the design language diverges until fixing it requires cross-team coordination. Compounds with every slice.', mitigation: 'Shared component library consumed by both surfaces. Visual regression tests (Chromatic or equivalent) on every PR. Design tokens managed centrally so a colour change propagates everywhere at once.' }, { n: '03', title: 'Cache vs. portal edit consistency', severity: 'High', severityClass: 'bg-orange-100 text-orange-600', numClass: 'text-orange-400', body: 'Agents saving a listing expect to see it live immediately. A 5-minute ISR window erodes trust in the portal.', mitigation: 'On-demand ISR triggered on save gives near-real-time public updates. A preview URL in the portal bypasses the CDN cache so agents can verify changes before the public page updates.' }, { n: '04', title: 'Portal data loss', severity: 'Medium / High', severityClass: 'bg-amber-100 text-amber-700', numClass: 'text-amber-400', body: 'A lost listing draft or overwritten concurrent edit is a trust problem, not a UX inconvenience. Portal data-loss incidents are not recoverable in the same way a slow page load is.', mitigation: 'Optimistic UI with rollback states. Auto-save with visible status. Conflict detection for concurrent edits. Resilient reconnection handling so a network drop does not lose draft content.' }] as risk (risk.n)}
          <div class="border-b border-slate-100 py-7 last:border-b-0">
            <div class="mb-4 flex items-start gap-4">
              <div
                class="w-10 shrink-0 text-[1.75rem] font-extrabold leading-none tracking-tight {risk.numClass}"
              >
                {risk.n}
              </div>
              <div>
                <div class="mb-1 text-[1rem] font-bold leading-snug text-slate-900">
                  {risk.title}
                </div>
                <span
                  class="inline-block rounded px-[0.45rem] py-[0.15rem] text-[0.65rem] font-bold tracking-[0.08em] uppercase {risk.severityClass}"
                >
                  {risk.severity}
                </span>
              </div>
            </div>
            <p class="mb-3 text-[0.875rem] leading-[1.75] text-slate-600">{risk.body}</p>
            <p class="mb-0 text-[0.875rem] leading-[1.75] text-slate-600">
              <strong class="font-semibold text-slate-900">Mitigation:</strong>
              {risk.mitigation}
            </p>
          </div>
        {/each}
      </div>
    </section>

    <!-- ── FOOTER ── -->
    <footer class="mt-4 border-t border-slate-100 py-8">
      <div class="text-[0.78rem] text-slate-400">
        Built with Svelte 5, Vite, and Tailwind CSS v4 ·
        <a
          href="https://github.com/moizp/realestate-test"
          target="_blank"
          rel="noopener noreferrer"
          class="text-teal-600 no-underline hover:underline"
        >
          Source on GitHub ↗
        </a>
      </div>
    </footer>
  </div>
</main>

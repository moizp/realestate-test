<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from './lib/Nav.svelte';
  import ComparisonTable from './lib/ComparisonTable.svelte';
  import AnalysisTable from './lib/AnalysisTable.svelte';

  let activeSection = $state('overview');

  onMount(() => {
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
        A response to the exercise brief — presented as an interactive page rather than a document,
        because a front-end lead should ship things that reflect the craft they're bringing to the
        role.
      </p>
    </div>
  </header>

  <div class="mx-auto max-w-800px px-10 pb-20 max-lg:px-5">
    <!-- ══════════════════════════════════════
         01 · OVERVIEW
    ══════════════════════════════════════ -->
    <section id="overview" class="border-b border-slate-100 py-14">
      <div class="mb-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase text-teal-600">
        01 · Overview
      </div>
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Point of view
      </h2>
      <p class="mb-0 text-[1rem] leading-[1.75] text-slate-600">
        My response is shaped by three convictions. I'd rather state them upfront than let them
        surface implicitly through the technical choices.
      </p>

      <div class="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        {#each [{ icon: '⟳', title: 'Vertical slices over full rebuilds', body: 'Total platform rewrites introduce compounding risk across security, UI, and business logic simultaneously. Rebuilding end-to-end feature slices — one at a time, deployed and measured — de-risks the migration and delivers value from day one rather than from launch day.' }, { icon: '⬡', title: 'Web Components as the migration vehicle', body: 'New features built as Custom Web Components are framework-agnostic and deploy into both the legacy codebase and the new one simultaneously. This is the mechanism that makes gradual migration viable — not a theoretical pattern but a practical deployment strategy.' }, { icon: '◈', title: 'DevEx is a strategic multiplier', body: "Shared TypeScript types, enforced CI gates, a well-governed component library, and fast local dev loops don't slow teams down — they compound. Investment in engineering fundamentals at the start makes every subsequent slice faster and safer to ship." }] as card}
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
        Mapping the problem space
      </h2>
      <p class="mb-7 text-[0.9375rem] leading-[1.75] text-slate-600">
        Before deciding anything about architecture, the brief needs translating into the dimensions
        that actually drive technical decisions. The table below is that translation — each row is a
        parameter that will later determine a specific architectural choice.
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
        With the session model and content characteristics mapped, the next step is to analyse the
        specific technical dimensions that will shape the architecture. Each row below drives one or
        more of the decisions in the sections that follow.
      </p>
      <AnalysisTable />
      <div
        class="mt-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-4"
      >
        <span class="mt-0.5 shrink-0 text-green-600">↓</span>
        <p class="m-0 text-[0.85rem] leading-[1.55] text-green-800">
          Two patterns emerge from the analysis: the surfaces are genuinely different applications
          (not one app with two modes), and Custom Web Components appear in both columns as the
          mechanism that connects them during migration.
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
        The analysis table points to a clear architectural fork. The wrong move is to pick one
        rendering strategy and one framework and force both surfaces into it — that either
        over-engineers the portal (with SSR complexity it doesn't need) or under-serves the public
        site (sacrificing the performance and SEO characteristics that drive business value).
      </p>

      <div class="my-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <div class="mb-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-slate-500">
            Public Search &amp; Listings
          </div>
          <div class="mb-4 text-[1.1rem] font-bold text-teal-700">SSR + Tiered ISR</div>
          <ul class="m-0 flex list-none flex-col gap-2 p-0">
            {#each ['Cold, unauthenticated visitors — first-load speed is business-critical', 'SEO and Core Web Vitals directly affect traffic acquisition', 'Content of mixed freshness — different caching for listings vs suburb data', 'Structured data for AI answer engines (AEO) and agent marketplaces'] as item}
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
            {#each ['Warm, authenticated, repeat sessions — no cold-load problem', 'No SEO requirement — SSR adds complexity with zero return', 'Interaction responsiveness and data reliability are the priority', 'PWA capabilities (offline drafting, push notifications) from day one'] as item}
              <li class="flex gap-2 text-[0.82rem] leading-snug text-slate-700">
                <span class="shrink-0 font-bold text-violet-600">–</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        The frontends diverge. The content model doesn't. Both surfaces operate on the same entities
        — listings, suburbs, agents — served through a shared API. The portal writes; the public
        site reads. Defining that contract as shared TypeScript types, before either frontend is
        built, is the highest-leverage early decision in the rebuild.
      </p>
      <p class="mb-0 text-[0.9375rem] leading-[1.75] text-slate-600">
        Custom Web Components are the bridge. New features built as Web Components deploy into both
        the legacy codebase and the new one simultaneously — enabling gradual migration without
        parallel maintenance of two full codebases. The deep dive below covers this in detail.
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
        Where I've gone deep
      </h2>
      <p class="mb-0 text-[0.9375rem] leading-[1.75] text-slate-600">
        Three areas I find most important — either because the risk is highest, or because the
        conventional approach tends to be wrong.
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
        Tiered freshness, not a single rendering model
      </h3>
      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        The standard answer to "SEO-critical, performance-critical" is "use SSR." That's right, but
        incomplete. The public site's content falls into two distinct freshness categories, and
        treating them identically wastes CDN efficiency and increases origin load.
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
        <strong class="font-semibold text-slate-900">On-demand ISR</strong> is the key mechanism. When
        an agent saves a listing in the portal, it triggers an explicit cache invalidation for that listing's
        public URL. The CDN serves stale content until the save event fires, then refreshes immediately.
        This gives the performance profile of a static site with the freshness of SSR — without requiring
        the public site to bypass the CDN on every request.
      </p>
      <p class="mb-0 text-[0.9375rem] leading-[1.75] text-slate-600">
        <strong class="font-semibold text-slate-900">The portal doesn't need any of this.</strong> Sessions
        are warm and authenticated. A well-built SPA with optimistic UI updates will feel faster to an
        agent editing a listing than an SSR equivalent with the same backend latency. SSR on the portal
        would be complexity for no user benefit.
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
        The case against a full rebuild
      </h3>
      <p class="mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        A total platform rewrite is the most common wrong answer to "our platform needs rebuilding."
        The instinct makes sense — start fresh, do it right — but full rebuilds introduce three
        categories of risk simultaneously:
      </p>

      <div class="my-7 overflow-hidden rounded-xl border border-slate-200">
        {#each [{ n: '01', title: 'Security surface explodes', body: "Every line of new code is a potential vulnerability. A full rebuild means a full security audit at launch, under time pressure, on a codebase that hasn't been hardened by production exposure. The legacy app has years of accumulated security patches; the rewrite starts from zero." }, { n: '02', title: 'UI regression is inevitable', body: 'Years of responsive layout fixes, browser compatibility workarounds, and edge-case handling live in the old code, often undocumented. A rewrite rediscovers all of them in production, at scale, under user pressure, with no quick rollback path.' }, { n: '03', title: 'Business logic is poorly documented', body: "Pricing edge cases, listing validation rules, agent permission hierarchies — these are rarely in specs. They're in the code, often discovered only when a rewrite gets them wrong. A full rewrite re-discovers them in production rather than in a test environment." }] as risk, i}
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
        Rather than rebuilding the platform all at once, the proposal is to rebuild it
        <em>feature by feature</em>, deploying each new feature as a Custom Web Component that works
        in both the legacy codebase and the new one.
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
          {#each [{ title: 'Framework-agnostic', body: 'A Svelte component compiled as a Custom Web Component drops into any environment — legacy React, legacy vanilla JS, new Svelte app. No adapter needed.', code: "customElements.define('rea-search', SearchComponent)" }, { title: 'Self-contained', body: 'Each component owns its logic, its styles (Shadow DOM optional), and its tests. It can be developed, reviewed, and deployed independently of the surrounding codebase.', code: null }, { title: 'Zero-risk deployment', body: 'Drop the new component into the legacy app alongside the old implementation. Run both in production. Validate. Remove the legacy code.', code: '<rea-search-filters />' }, { title: 'Same component, two hosts', body: 'The identical Web Component powers the old platform during migration and the new platform after. No duplication of effort — you build a feature once and it ships everywhere.', code: null }] as feat}
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
        to the frontend: new code wraps and gradually replaces the old, without requiring the old system
        to change around it, and without a cutover moment where everything has to work simultaneously
        for the first time.
      </p>

      <!-- Slice flow -->
      <div class="my-8 flex flex-col">
        {#each [{ n: 1, title: 'Pick the highest-value slice', body: 'Property search filters, listing creation flow, or suburb detail page — whichever is highest-traffic or highest-pain.' }, { n: 2, title: 'Build end-to-end as a Web Component', body: 'TypeScript types → component → tests → API contract. The full slice, in isolation.' }, { n: 3, title: 'Deploy into the legacy app', body: 'Drop the Web Component into the old codebase. Run it in production alongside or instead of the legacy equivalent. Validate with real traffic.' }, { n: 4, title: 'Retire the legacy code for that feature', body: 'Once the new component is validated, remove the old implementation. The platform is incrementally newer with each slice.' }, { n: 5, title: 'Repeat — each slice is faster than the last', body: 'The shared component library, shared types, and established patterns mean the second slice costs less than the first, and the tenth costs less than the second.' }] as step, i}
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
        <strong class="font-semibold text-slate-900"
          >What needs to exist before the first slice.</strong
        > The shared design system (tokens, base components) and the shared TypeScript content types need
        to be established first. Not complete — they grow with each slice — but stable enough that the
        first slice isn't making foundational decisions that the second slice has to undo. This pre-work
        is the only upfront investment before value starts shipping.
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
        Risks worth naming at the start
      </h3>
      <p class="mb-7 text-[0.9375rem] leading-[1.75] text-slate-600">
        These are the risks I'd surface at project kickoff, not mid-rebuild. The vertical slice
        approach mitigates several of them structurally — the ones below are the residual risks that
        still need explicit management.
      </p>

      <div class="flex flex-col">
        {#each [{ n: '01', title: 'SEO regression during migration', severity: 'Critical', severityClass: 'bg-red-100 text-red-600', numClass: 'text-red-400', body: 'Organic search is a primary acquisition channel. A 10% ranking drop during a migration is a direct, measurable revenue loss — not a technical inconvenience. The specific risks are URL structure changes that break link equity, SSR misconfiguration that serves crawlers thin or empty content, canonical URL errors during parallel serving, and Core Web Vitals regression.', mitigation: 'The vertical slice model helps here — each slice migrates one URL pattern at a time, with performance baselines established before the legacy route is retired. URL-level integration tests run on every build. Synthetic CWV monitoring is in place from day one, not post-launch. Redirect testing is a required gate before any URL structure change goes live.' }, { n: '02', title: 'Design system drift across two surfaces', severity: 'High', severityClass: 'bg-orange-100 text-orange-600', numClass: 'text-orange-400', body: 'Two surfaces, potentially different rendering strategies, components shipped at different cadences — the design language diverges gradually until fixing it requires cross-team coordination. This compounds with every slice.', mitigation: 'Shared component library consumed by both surfaces. Visual regression tests (Chromatic or equivalent) catching visual changes before merge. Design tokens managed centrally — a colour or spacing change propagates everywhere simultaneously rather than being patched in two places at different times.' }, { n: '03', title: 'Cache invalidation vs. portal edit consistency', severity: 'High', severityClass: 'bg-orange-100 text-orange-600', numClass: 'text-orange-400', body: "If the public site uses ISR with a 5-minute revalidation window, agents who save a listing won't see it live for up to 5 minutes. For agents expecting near-real-time publication, this erodes trust in the system.", mitigation: 'On-demand ISR triggered by the portal\'s save action gives near-real-time public updates for any explicit save. A "preview" URL in the portal that bypasses the CDN cache lets agents verify their changes before the public page updates.' }, { n: '04', title: 'Portal reliability — agents losing work', severity: 'Medium / High', severityClass: 'bg-amber-100 text-amber-700', numClass: 'text-amber-400', body: 'Agents use the portal for professional workflows. A lost listing draft or an overwritten concurrent edit is a real business problem, not a UX inconvenience. Unlike the public site where a slow page is an annoyance, a portal data-loss incident damages trust permanently.', mitigation: "Optimistic UI with clear rollback states. Auto-save with visible status indicators. Conflict detection for concurrent edits. Resilient offline/reconnection handling so a network interruption doesn't lose draft content." }] as risk}
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

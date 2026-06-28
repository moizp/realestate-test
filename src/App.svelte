<script lang="ts">
  import Nav from './lib/Nav.svelte';
  import ComparisonTable from './lib/ComparisonTable.svelte';

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

  const risks = [
    {
      n: '01',
      title: 'Big-bang rewrite',
      severity: 'Critical',
      severityClass: 'bg-red-100 text-red-600',
      numClass: 'text-red-400',
      body: 'A full rebuild creates a long period where nothing ships, followed by a high-risk launch: security surface resets to zero (years of hardened patches gone), UI edge cases are rediscovered in production with no rollback, and business logic embedded in the old code only surfaces when the rewrite gets it wrong.',
      mitigation:
        'Vertical slices. The legacy app stays live and valuable until each slice is validated in production. No cutover moment where everything has to work simultaneously for the first time.',
      ref: null,
    },
    {
      n: '02',
      title: 'SEO regression during migration',
      severity: 'Critical',
      severityClass: 'bg-red-100 text-red-600',
      numClass: 'text-red-400',
      body: 'Organic search is a primary acquisition channel. URL structure changes break link equity. SSR misconfiguration serves crawlers empty content. Core Web Vitals regression hits rankings directly.',
      mitigation:
        'Slices migrate one URL pattern at a time, with baselines locked before the legacy route is retired. Redirect testing is a required gate before any URL change ships. Synthetic CWV monitoring from day one.',
      ref: null,
    },
    {
      n: '03',
      title: 'Framework lock-in and skill narrowing',
      severity: 'High',
      severityClass: 'bg-orange-100 text-orange-600',
      numClass: 'text-orange-400',
      body: "React's idiosyncratic model — hooks rules, synthetic events, render cycles — trains React thinking rather than web platform thinking. Developers who have spent years inside its abstractions often find the underlying platform unfamiliar when it matters. AI coding assistants compound this: generated React code frequently violates hooks rules or introduces subtle render-cycle bugs that require deep framework knowledge to diagnose. The same task in Svelte or Astro — closer to the web platform — produces code that is more straightforward to review, test, and debug without internalising a framework's quirks. Large companies have quietly moved away from React for similar reasons.",
      mitigation:
        'Architect against the framework. Domain logic, state, and routing rules belong in plain TypeScript modules the framework merely calls. A component that delegates to a framework-agnostic module is portable; one that weaves framework primitives throughout is not.',
      ref: {
        text: 'When Silicon Valley quietly shuns React.js',
        url: 'https://www.linkedin.com/pulse/when-silicon-valley-quietly-shuns-reactjs-gontran-baerts-y3hke/',
      },
    },
    {
      n: '04',
      title: 'Design system drift',
      severity: 'High',
      severityClass: 'bg-orange-100 text-orange-600',
      numClass: 'text-orange-400',
      body: 'Two surfaces, different shipping cadences — the design language diverges until fixing it requires cross-team coordination. Compounds with every slice.',
      mitigation:
        'Shared component library consumed by both surfaces. UI designs managed centrally. Visual regression tests on every PR.',
      ref: null,
    },
    {
      n: '05',
      title: 'Framework runtime and dependency sprawl',
      severity: 'Medium',
      severityClass: 'bg-yellow-100 text-yellow-600',
      numClass: 'text-yellow-400',
      body: 'Frameworks that ship a JavaScript runtime to the browser (React, Vue, Angular) add baseline bundle weight before a single line of product code runs. Transitive dependencies compound this: a typical React project accumulates hundreds of sub-dependencies, each a potential CVE and each with its own breaking-change risk. The security surface grows with every npm install.',
      mitigation:
        'Prefer compile-to-vanilla frameworks (Svelte, Astro) that ship no runtime — the framework disappears at build time, leaving only product code in the browser. Reach for dependencies only when the web platform genuinely cannot. TypeScript-first domain logic (state, routing, validation in plain TS modules) keeps the critical path free of framework churn.',
      ref: null,
    },
  ];

  const teamFactors = [
    {
      title: 'Low conceptual overhead — by design',
      body: 'Framework fluency is built feature by feature, in production. Choosing frameworks with lower conceptual overhead (Svelte, Astro) over ones with idiosyncratic models (React hooks, synthetic events) reduces the learning tax on every developer. The first two or three slices establish component conventions, TypeScript patterns, and CI gates — by the time a critical feature migrates, nobody is learning the framework and the domain simultaneously.',
    },
    {
      title: 'Pairing and PR review as the upskilling loop',
      body: 'The lead architects each slice; others own the implementation under lead review. Learning happens inside delivery, not before it. This is the upskilling mechanism — it runs at normal sprint cadence without blocking progress or requiring dedicated training time.',
    },
    {
      title: 'EmberJS knowledge stays in use',
      body: 'The team maintains the legacy codebase while building new expertise slice by slice. Data model familiarity, edge-case awareness, and domain knowledge transfer directly — none of it is discarded.',
    },
    {
      title: 'Fluency as a by-product of shipping',
      body: 'By the time the last EmberJS route is retired, the team has production experience across every major feature area of the new stack. Framework fluency is earned through shipping, not assumed upfront.',
    },
  ];
</script>

<Nav {activeSection} />

<main class="lg:ml-62 min-h-screen">
  <!-- ── PAGE HEADER ── -->
  <header class=" bg-slate-300 px-1 pt-10 pb-10 max-lg:pt-20">
    <div class="mx-auto px-10 max-lg:px-5">
      <h1
        class="text-[clamp(1.5rem,4vw,2rem)] font-bold leading-[1.15] tracking-tight text-slate-800"
      >
        Lead Front-End Engineering Exercise
      </h1>
    </div>
  </header>

  <div class="mx-auto max-w-800px px-10 pb-20 max-lg:px-5">
    <!-- 00 · INTRODUCTION -->
    <section id="intro" class="border-b border-slate-100 py-10">
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Introduction
      </h2>
      <p class="mb-1 leading-[1.75] text-slate-600">
        This document maps the two web apps, outlines the architecture they require, and describes
        how to structure the work — covering value delivery, team factors, risks, and trade-offs.
      </p>
    </section>

    <!-- 01 · THE TWO APPS -->
    <section id="surfaces" class="border-b border-slate-100 py-10">
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        The Two Apps
      </h2>
      <p class="mb-7 leading-[1.75] text-slate-600">
        The two apps differ fundamentally in session model, audience, and performance requirements.
        Each row maps to one or more architectural decisions.
      </p>
      <ComparisonTable />

      <p class="mt-8 mb-4 text-[0.9375rem] leading-[1.75] text-slate-600">
        The rendering row above drives the single most consequential split in the architecture.
      </p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <div class="mb-1 text-[0.7rem] font-semibold tracking-[0.08em] text-slate-500 uppercase">
            Public Search &amp; Listings
          </div>
          <div class="mb-4 text-[1.1rem] font-bold text-teal-700">SSR + Tiered ISR</div>
          <ul class="m-0 flex list-none flex-col gap-2 p-0">
            {#each ['Cold, unauthenticated visitors — first-load speed is business-critical', 'SEO and Core Web Vitals directly affect traffic acquisition', 'Mixed content freshness — different cache TTLs for listings vs suburb data', 'Structured data for AI answer engines and agent marketplaces'] as item (item)}
              <li class="flex gap-2 text-[0.82rem] leading-snug text-slate-700">
                <span class="shrink-0 font-bold text-teal-600">–</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
        <div class="rounded-xl border border-violet-200 bg-violet-50 p-6">
          <div class="mb-1 text-[0.7rem] font-semibold tracking-[0.08em] text-slate-500 uppercase">
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
    </section>

    <!-- STRUCTURE OF WORK -->
    <section id="delivery" class="border-b border-slate-100 py-10">
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Structure of Work
      </h2>
      <p class="mb-4 leading-[1.75] text-slate-600">
        The existing web apps carry years of accumulated business logic, browser workarounds, and
        hardened security patches. They have matured over a long time after a lot of effort. The
        business goal is to continue delivering more value to users and timely respond to their
        feedback. The rebuild/rewrite is a side effect, not the objective. We can structure the
        modernising effort to focus on continuous value delivery informed by user feedback.
      </p>
      <p class="mb-7 leading-[1.75] text-slate-600">
        Rebuild one feature at a time — each vertical slice of the app (end-to-end feature) ships to
        real users before the next one starts, generating feedback that shapes what follows. This is
        the
        <strong class="font-semibold text-slate-900">strangler fig pattern</strong> applied to the frontend:
        new code gradually replaces old, with no cutover moment where everything has to work simultaneously
        for the first time.
      </p>

      <!-- Slice flow -->
      <div class="my-8 mx-10 flex flex-col">
        {#each [{ n: 1, title: 'Pick the highest-value slice', body: 'Whichever feature is highest-traffic or highest-pain — value and recoverable risk, not simplicity.' }, { n: 2, title: 'Build end-to-end as a Web Component', body: 'Shared TypeScript types → component → tests → API contract. Full slice, in isolation.' }, { n: 3, title: 'Deploy into the legacy app', body: 'Run the new component in production alongside the old. Validate with real traffic and real users.' }, { n: 4, title: 'Remove the legacy implementation', body: 'Once validated, delete the old code. The platform is incrementally newer.' }, { n: 5, title: 'Repeat', body: 'Each slice is cheaper than the last — the component library, shared types, and patterns already exist.' }] as step, i (step.n)}
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
            <div class="py-0.5 pl-[1.65rem] text-[1.1rem] leading-none font-bold text-teal-600">
              ↓
            </div>
          {/if}
        {/each}
      </div>

      <p class="mb-6 leading-[1.75] text-slate-600">
        <strong class="font-semibold text-slate-900">Before the first slice:</strong> shared design tokens
        and TypeScript content types for listings, suburbs, and agents. They grow with each slice — stable
        enough that slice 2 doesn't undo slice 1's decisions.
      </p>

      <p class="mb-6 leading-[1.75] text-slate-600">
        Custom Web Components are one vehicle for this. They map naturally to the <strong
          class="font-semibold text-slate-900">Island Architecture</strong
        > pattern — each component is a self-contained interactive island, framework-agnostic and independently
        deployable. New code written in Svelte can be used as a web component inside of the existing EmberJS
        application. But also, crucially, an existing EmberJS component can be wrapped as a Web Component
        and dropped into an Astro or SvelteKit page as an island, meaning legacy code can be delivered
        inside the new framework before it is replaced — not after.
      </p>

      <div class="overflow-hidden rounded-lg mx-10 border border-slate-200 bg-slate-50 p-6">
        <div class="mb-5 text-[0.8rem] font-bold tracking-[0.08em] text-slate-500 uppercase">
          Why Custom Web Components?
        </div>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {#each [{ title: 'Framework-agnostic', body: 'Compiles to a standard custom element — drops into EmberJS, any future stack, or a partner site.', code: "customElements.define('rea-search', SearchWidget)" }, { title: 'Self-contained', body: 'Owns its logic and tests. Developed and deployed independently of the surrounding codebase.', code: null }, { title: 'Side-by-side deployment', body: 'Ships into the legacy app alongside the old implementation. Validate with real traffic. Remove the old code once stable.', code: '<rea-search-filters />' }, { title: 'One component, two hosts', body: 'The same component runs in EmberJS during migration and in the new app after. No duplicate work.', code: null }] as feat (feat.title)}
            <div class="rounded-lg border border-slate-200 bg-white p-4">
              <div class="mb-1.5 text-[0.9rem] font-semibold text-slate-800">{feat.title}</div>
              <p class="m-0 text-[0.9rem] leading-relaxed text-slate-500">
                {feat.body}{#if feat.code}&nbsp;<code
                    class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.82em] text-teal-700"
                    >{feat.code}</code
                  >{/if}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <p class="mt-6 mb-0 leading-[1.75] text-slate-600">
        Web Components are a browser specification, not a library abstraction — which also matters
        for AI-assisted development. Coding assistants understand them precisely because the
        interface is standardised: attributes, properties, events, and lifecycle are defined by the
        spec, not by a framework version. Each component is a bounded, testable unit with a clear
        public surface. Combined with a consistent naming convention (<code
          class="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.88em] text-teal-700">rea-*</code
        >) and shared TypeScript types, AI-generated code can follow organisation conventions
        reliably — and when it breaks, the component boundary makes the problem easy to isolate.
      </p>
    </section>

    <!-- RISKS & TRADEOFFS -->
    <section id="risks" class="border-b border-slate-100 py-10">
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Risks &amp; Tradeoffs
      </h2>

      <div class="flex flex-col mx-10">
        {#each risks as risk (risk.n)}
          <div class="py-7">
            <div class="mb-4 flex items-start gap-4">
              <div
                class="w-10 shrink-0 text-[1.5rem] leading-none font-extrabold tracking-tight {risk.numClass}"
              >
                {risk.n}
              </div>
              <div>
                <span class="mb-1 text-[1rem] leading-snug font-bold text-slate-900">
                  {risk.title}
                </span>
                <span
                  class="inline-block rounded ml-2 px-[0.45rem] py-[0.15rem] text-[0.65rem] font-bold tracking-[0.08em] uppercase {risk.severityClass}"
                >
                  {risk.severity}
                </span>
              </div>
            </div>
            <p class="mb-3 text-[0.9rem] leading-[1.75] text-slate-600">{risk.body}</p>
            <p class="{risk.ref ? 'mb-2' : 'mb-0'} text-[0.9rem] leading-[1.75] text-slate-600">
              <strong class="font-semibold text-slate-900">Mitigation:</strong>
              {risk.mitigation}
            </p>
            {#if risk.ref}
              <p class="mb-0 text-[0.8rem] leading-[1.75] text-slate-400">
                Further reading: <a
                  href={risk.ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-teal-600 hover:underline">{risk.ref.text}</a
                >
              </p>
            {/if}
          </div>
        {/each}
      </div>
    </section>

    <!-- TEAM FACTORS -->
    <section id="team" class="border-b border-slate-100 py-10">
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Team Factors
      </h2>
      <p class="mb-7 leading-[1.75] text-slate-600">
        The existing team has deep product and domain knowledge — the hardest thing to acquire. The
        gap is framework expertise, which is the context for this hire. The new position's role can
        be to bring that expertise and create the conditions for the team to develop it through
        shipping. The upskilling is motivated by shipping features and learning in production,
        fixing the issues early and continuously.
      </p>

      <div
        class="flex flex-col mx-10 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200"
      >
        {#each teamFactors as item (item.title)}
          <div class="px-5 py-4 leading-relaxed text-slate-600">
            <span class="font-semibold text-slate-900">{item.title}:</span>
            {item.body}
          </div>
        {/each}
      </div>
    </section>

    <!-- CONCLUSION -->
    <section id="conclusion" class="border-t border-slate-200 py-10">
      <h2
        class="m-0 mb-5 text-[clamp(1.4rem,3vw,1.875rem)] font-bold tracking-tight text-slate-900"
      >
        Conclusion
      </h2>

      <div class="flex flex-col gap-5">
        <p class="m-0 leading-[1.75] text-slate-600">
          <strong class="font-semibold text-slate-900">Start with foundations:</strong> shared TypeScript
          content types and UI component designs before the first slice. They don't need to be complete
          and gradually grow — later decisions build on them and undoing them is expensive.
        </p>

        <p class="m-0 leading-[1.75] text-slate-600">
          <strong class="font-semibold text-slate-900">Pick slices by value, not safety:</strong> a medium-complexity,
          high-traffic feature teaches the stack under real conditions and generates real user feedback.
          A trivial feature teaches nothing useful; a critical one can't afford a regression. The first
          slice sets the patterns — it should be representative.
        </p>

        <p class="m-0 leading-[1.75] text-slate-600">
          <strong class="font-semibold text-slate-900">Name the tradeoff early:</strong> the slice approach
          is slower to show a "new platform" than a full rebuild. The counter is that every slice ships
          to real users on the legacy codebase — progress is visible before the new platform exists.
        </p>

        <p class="m-0 leading-[1.75] text-slate-600">
          <strong class="font-semibold text-slate-900"
            >If Next.js / React work has already begun:</strong
          > don't stop it. The slice approach is framework-agnostic — React components can be wrapped
          as Web Components, and shared types and designs work regardless of framework. A pragmatic path
          mixes in-flight React work with new Svelte or Astro slices, connected by the Web Components
          boundary. The architecture holds; only the component library needs to account for both.
        </p>

        <p class="m-0 leading-[1.75] text-slate-600">
          <strong class="font-semibold text-slate-900">On framework choice:</strong> Svelte and Astro
          are now strong alternatives with significantly lower conceptual overhead than React. Astro specifically
          brings Island Architecture as a first-class primitive — interactive components load per island,
          which aligns naturally with the slice approach. It also means existing EmberJS components can
          be wrapped as Web Components and delivered as Astro islands during the transition, before they
          are replaced. Frameworks closer to the web platform produce developers who better understand
          the web, not just the framework(s). The goal would be good engineers as opposed to good React
          engineers.
        </p>
      </div>
    </section>

    <!-- ── FOOTER ── -->
    <footer class="mt-4 border-t border-slate-100 py-8">
      <div class="text-[0.8rem] text-slate-400">
        By Moiz Penkar ·
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

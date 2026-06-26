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

<main>
  <!-- ── PAGE HEADER ── -->
  <header>
    <div class="header-inner">
      <div class="header-eyebrow">Lead Front-End Engineer · Technical Exercise</div>
      <h1>Platform Architecture<br /><span>realestate.co.nz</span></h1>
      <p class="header-sub">
        A response to the exercise brief — presented as an interactive page rather than a
        document, because a front-end lead should ship things that reflect the craft
        they're bringing to the role.
      </p>
    </div>
  </header>

  <div class="content">

    <!-- ══════════════════════════════════════
         01 · OVERVIEW
    ══════════════════════════════════════ -->
    <section id="overview">
      <div class="section-label">01 · Overview</div>
      <h2>Point of view</h2>
      <div class="prose lead-text">
        <p>
          My response is shaped by three convictions. I'd rather state them upfront
          than let them surface implicitly through the technical choices.
        </p>
      </div>

      <div class="pov-grid">
        <div class="pov-card">
          <div class="pov-icon">⟳</div>
          <h3>Vertical slices over full rebuilds</h3>
          <p>
            Total platform rewrites introduce compounding risk across security, UI, and
            business logic simultaneously. Rebuilding end-to-end feature slices — one
            at a time, deployed and measured — de-risks the migration and delivers value
            from day one rather than from launch day.
          </p>
        </div>
        <div class="pov-card">
          <div class="pov-icon">⬡</div>
          <h3>Web Components as the migration vehicle</h3>
          <p>
            New features built as Custom Web Components are framework-agnostic and
            deploy into both the legacy codebase and the new one simultaneously.
            This is the mechanism that makes gradual migration viable — not a
            theoretical pattern but a practical deployment strategy.
          </p>
        </div>
        <div class="pov-card">
          <div class="pov-icon">◈</div>
          <h3>DevEx is a strategic multiplier</h3>
          <p>
            Shared TypeScript types, enforced CI gates, a well-governed component
            library, and fast local dev loops don't slow teams down — they compound.
            Investment in engineering fundamentals at the start makes every
            subsequent slice faster and safer to ship.
          </p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         02 · THE TWO SURFACES
    ══════════════════════════════════════ -->
    <section id="surfaces">
      <div class="section-label">02 · The Two Surfaces</div>
      <h2>Mapping the problem space</h2>
      <div class="prose">
        <p>
          Before deciding anything about architecture, the brief needs translating
          into the dimensions that actually drive technical decisions. The table
          below is that translation — each row is a parameter that will later
          determine a specific architectural choice.
        </p>
      </div>

      <div class="table-container">
        <ComparisonTable />
      </div>
    </section>

    <!-- ══════════════════════════════════════
         03 · ANALYSIS
    ══════════════════════════════════════ -->
    <section id="analysis">
      <div class="section-label">03 · Analysis</div>
      <h2>Technical dimensions</h2>
      <div class="prose">
        <p>
          With the session model and content characteristics mapped, the next step
          is to analyse the specific technical dimensions that will shape the
          architecture. Each row below drives one or more of the decisions in the
          sections that follow.
        </p>
      </div>

      <div class="table-container">
        <AnalysisTable />
      </div>

      <div class="table-insight">
        <div class="insight-icon">↓</div>
        <p>
          Two patterns emerge from the analysis: the surfaces are genuinely different
          applications (not one app with two modes), and Custom Web Components appear
          in both columns as the mechanism that connects them during migration.
        </p>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         04 · ARCHITECTURE
    ══════════════════════════════════════ -->
    <section id="architecture">
      <div class="section-label">04 · Architecture</div>
      <h2>Two apps, one content model</h2>
      <div class="prose">
        <p>
          The analysis table points to a clear architectural fork. The wrong move
          is to pick one rendering strategy and one framework and force both surfaces
          into it — that either over-engineers the portal (with SSR complexity it
          doesn't need) or under-serves the public site (sacrificing the performance
          and SEO characteristics that drive business value).
        </p>
      </div>

      <div class="arch-split">
        <div class="arch-card public">
          <div class="arch-card-label">Public Search &amp; Listings</div>
          <div class="arch-card-strategy">SSR + Tiered ISR</div>
          <ul>
            <li>Cold, unauthenticated visitors — first-load speed is business-critical</li>
            <li>SEO and Core Web Vitals directly affect traffic acquisition</li>
            <li>Content of mixed freshness — different caching for listings vs suburb data</li>
            <li>Structured data for AI answer engines (AEO) and agent marketplaces</li>
          </ul>
        </div>
        <div class="arch-card portal">
          <div class="arch-card-label">Agent Portal</div>
          <div class="arch-card-strategy">CSR / SPA</div>
          <ul>
            <li>Warm, authenticated, repeat sessions — no cold-load problem</li>
            <li>No SEO requirement — SSR adds complexity with zero return</li>
            <li>Interaction responsiveness and data reliability are the priority</li>
            <li>PWA capabilities (offline drafting, push notifications) from day one</li>
          </ul>
        </div>
      </div>

      <div class="prose">
        <p>
          The frontends diverge. The content model doesn't. Both surfaces operate
          on the same entities — listings, suburbs, agents — served through a shared
          API. The portal writes; the public site reads. Defining that contract as
          shared TypeScript types, before either frontend is built, is the
          highest-leverage early decision in the rebuild.
        </p>
        <p>
          Custom Web Components are the bridge. New features built as Web Components
          deploy into both the legacy codebase and the new one simultaneously —
          enabling gradual migration without parallel maintenance of two full codebases.
          The deep dive below covers this in detail.
        </p>
      </div>
    </section>

    <!-- ── DEEP DIVES HEADER ── -->
    <div class="deep-dive-header">
      <div class="section-label">05 · Deep Dives</div>
      <h2>Where I've gone deep</h2>
      <div class="prose">
        <p>
          Three areas I find most important — either because the risk is highest,
          or because the conventional approach tends to be wrong.
        </p>
      </div>
    </div>

    <!-- ══════════════════════════════════════
         RENDERING STRATEGY
    ══════════════════════════════════════ -->
    <section id="rendering">
      <div class="deep-dive-section-label">↳ Rendering Strategy</div>
      <h3>Tiered freshness, not a single rendering model</h3>

      <div class="prose">
        <p>
          The standard answer to "SEO-critical, performance-critical" is "use SSR."
          That's right, but incomplete. The public site's content falls into two
          distinct freshness categories, and treating them identically wastes CDN
          efficiency and increases origin load.
        </p>
      </div>

      <div class="split-callout">
        <div class="callout-block high-change">
          <div class="callout-tag">High-change content</div>
          <div class="callout-title">Listing pages</div>
          <p>Status, price, and photos change throughout a sale cycle. A listing can move from Active to Under Offer within a day.</p>
          <div class="callout-strategy">
            Short ISR window (minutes) + on-demand invalidation triggered by portal saves
          </div>
        </div>
        <div class="callout-block low-change">
          <div class="callout-tag">Low-change content</div>
          <div class="callout-title">Suburb pages, school zones, agent profiles</div>
          <p>School catchments don't shift week-to-week. Suburb statistics are updated periodically by a data pipeline, not by agents.</p>
          <div class="callout-strategy">
            Long ISR window (hours or days) — CDN serves cached content aggressively
          </div>
        </div>
      </div>

      <div class="prose">
        <p>
          <strong>On-demand ISR</strong> is the key mechanism. When an agent saves a listing
          in the portal, it triggers an explicit cache invalidation for that listing's
          public URL. The CDN serves stale content until the save event fires, then
          refreshes immediately. This gives the performance profile of a static site
          with the freshness of SSR — without requiring the public site to bypass the
          CDN on every request.
        </p>
        <p>
          <strong>The portal doesn't need any of this.</strong> Sessions are warm and
          authenticated. A well-built SPA with optimistic UI updates will feel faster
          to an agent editing a listing than an SSR equivalent with the same backend
          latency. SSR on the portal would be complexity for no user benefit.
        </p>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         MIGRATION STRATEGY
    ══════════════════════════════════════ -->
    <section id="migration">
      <div class="deep-dive-section-label">↳ Migration Strategy</div>
      <h3>The case against a full rebuild</h3>

      <div class="prose">
        <p>
          A total platform rewrite is the most common wrong answer to "our platform
          needs rebuilding." The instinct makes sense — start fresh, do it right —
          but full rebuilds introduce three categories of risk simultaneously:
        </p>
      </div>

      <div class="risks-preview">
        <div class="risk-preview-item">
          <div class="risk-preview-number">01</div>
          <div>
            <div class="risk-preview-title">Security surface explodes</div>
            <p>
              Every line of new code is a potential vulnerability. A full rebuild
              means a full security audit at launch, under time pressure, on a
              codebase that hasn't been hardened by production exposure. The legacy
              app has years of accumulated security patches; the rewrite starts from zero.
            </p>
          </div>
        </div>
        <div class="risk-preview-item">
          <div class="risk-preview-number">02</div>
          <div>
            <div class="risk-preview-title">UI regression is inevitable</div>
            <p>
              Years of responsive layout fixes, browser compatibility workarounds,
              and edge-case handling live in the old code, often undocumented. A
              rewrite rediscovers all of them in production, at scale, under user
              pressure, with no quick rollback path.
            </p>
          </div>
        </div>
        <div class="risk-preview-item">
          <div class="risk-preview-number">03</div>
          <div>
            <div class="risk-preview-title">Business logic is poorly documented</div>
            <p>
              Pricing edge cases, listing validation rules, agent permission
              hierarchies — these are rarely in specs. They're in the code, often
              discovered only when a rewrite gets them wrong. A full rewrite
              re-discovers them in production rather than in a test environment.
            </p>
          </div>
        </div>
      </div>

      <div class="section-divider">The alternative: vertical slices via Custom Web Components</div>

      <div class="prose">
        <p>
          Rather than rebuilding the platform, the proposal is to rebuild it
          <em>feature by feature</em>, deploying each new feature as a Custom Web
          Component that works in both the legacy codebase and the new one.
        </p>
      </div>

      <div class="wc-explainer">
        <div class="wc-explainer-header">
          <div class="wc-badge">Web Components</div>
          Why this primitive specifically
        </div>
        <div class="wc-grid">
          <div class="wc-feature">
            <div class="wc-feature-title">Framework-agnostic</div>
            <p>A Svelte component compiled as a Custom Web Component (<code>customElements.define('rea-search', SearchComponent)</code>) drops into any environment — legacy React, legacy vanilla JS, new Svelte app. No adapter needed.</p>
          </div>
          <div class="wc-feature">
            <div class="wc-feature-title">Self-contained</div>
            <p>Each component owns its logic, its styles (Shadow DOM optional), and its tests. It can be developed, reviewed, and deployed independently of the surrounding codebase.</p>
          </div>
          <div class="wc-feature">
            <div class="wc-feature-title">Zero-risk deployment</div>
            <p>Drop <code>&lt;rea-search-filters /&gt;</code> into the legacy app alongside the old filters. Run both in production. Validate. Remove the legacy code. No big-bang cutover, no parallel maintenance.</p>
          </div>
          <div class="wc-feature">
            <div class="wc-feature-title">Same component, two hosts</div>
            <p>The identical Web Component powers the old platform during migration and the new platform after. No duplication of effort — you build a feature once and it ships everywhere.</p>
          </div>
        </div>
      </div>

      <div class="prose">
        <p>
          This is the <strong>strangler fig pattern</strong> applied to the frontend:
          new code wraps and gradually replaces the old, without requiring the old
          system to change around it, and without a cutover moment where everything
          has to work simultaneously for the first time.
        </p>
      </div>

      <div class="slice-flow">
        <div class="slice-step">
          <div class="slice-step-num">1</div>
          <div class="slice-step-content">
            <div class="slice-step-title">Pick the highest-value slice</div>
            <p>Property search filters, listing creation flow, or suburb detail page — whichever is highest-traffic or highest-pain.</p>
          </div>
        </div>
        <div class="slice-connector">↓</div>
        <div class="slice-step">
          <div class="slice-step-num">2</div>
          <div class="slice-step-content">
            <div class="slice-step-title">Build end-to-end as a Web Component</div>
            <p>TypeScript types → component → tests → API contract. The full slice, in isolation.</p>
          </div>
        </div>
        <div class="slice-connector">↓</div>
        <div class="slice-step">
          <div class="slice-step-num">3</div>
          <div class="slice-step-content">
            <div class="slice-step-title">Deploy into the legacy app</div>
            <p>Drop the Web Component into the old codebase. Run it in production alongside or instead of the legacy equivalent. Validate with real traffic.</p>
          </div>
        </div>
        <div class="slice-connector">↓</div>
        <div class="slice-step">
          <div class="slice-step-num">4</div>
          <div class="slice-step-content">
            <div class="slice-step-title">Retire the legacy code for that feature</div>
            <p>Once the new component is validated, remove the old implementation. The platform is incrementally newer with each slice.</p>
          </div>
        </div>
        <div class="slice-connector">↓</div>
        <div class="slice-step">
          <div class="slice-step-num">5</div>
          <div class="slice-step-content">
            <div class="slice-step-title">Repeat — each slice is faster than the last</div>
            <p>The shared component library, shared types, and established patterns mean the second slice costs less than the first, and the tenth costs less than the second.</p>
          </div>
        </div>
      </div>

      <div class="prose">
        <p>
          <strong>What needs to exist before the first slice.</strong> The shared
          design system (tokens, base components) and the shared TypeScript content
          types need to be established first. Not complete — they grow with each
          slice — but stable enough that the first slice isn't making foundational
          decisions that the second slice has to undo. This pre-work is the only
          upfront investment before value starts shipping.
        </p>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         RISKS
    ══════════════════════════════════════ -->
    <section id="risks">
      <div class="deep-dive-section-label">↳ Risks</div>
      <h3>Risks worth naming at the start</h3>

      <div class="prose">
        <p>
          These are the risks I'd surface at project kickoff, not mid-rebuild.
          The vertical slice approach mitigates several of them structurally —
          the ones below are the residual risks that still need explicit management.
        </p>
      </div>

      <div class="risks-list">
        <div class="risk-item">
          <div class="risk-header">
            <div class="risk-number risk-critical">01</div>
            <div>
              <div class="risk-title">SEO regression during migration</div>
              <div class="risk-severity critical">Critical</div>
            </div>
          </div>
          <div class="prose">
            <p>
              Organic search is a primary acquisition channel. A 10% ranking drop
              during a migration is a direct, measurable revenue loss — not a technical
              inconvenience. The specific risks are URL structure changes that break
              link equity, SSR misconfiguration that serves crawlers thin or empty
              content, canonical URL errors during parallel serving, and Core Web
              Vitals regression.
            </p>
            <p>
              <strong>Mitigation:</strong> The vertical slice model helps here — each
              slice migrates one URL pattern at a time, with performance baselines
              established before the legacy route is retired. URL-level integration tests
              run on every build. Synthetic CWV monitoring is in place from day one,
              not post-launch. Redirect testing is a required gate before any URL
              structure change goes live.
            </p>
          </div>
        </div>

        <div class="risk-item">
          <div class="risk-header">
            <div class="risk-number risk-high">02</div>
            <div>
              <div class="risk-title">Design system drift across two surfaces</div>
              <div class="risk-severity high">High</div>
            </div>
          </div>
          <div class="prose">
            <p>
              Two surfaces, potentially different rendering strategies, components
              shipped at different cadences — the design language diverges gradually
              until fixing it requires cross-team coordination. This compounds with
              every slice.
            </p>
            <p>
              <strong>Mitigation:</strong> Shared component library consumed by both
              surfaces. Visual regression tests (Chromatic or equivalent) catching
              visual changes before merge. Design tokens managed centrally — a colour
              or spacing change propagates everywhere simultaneously rather than being
              patched in two places at different times.
            </p>
          </div>
        </div>

        <div class="risk-item">
          <div class="risk-header">
            <div class="risk-number risk-high">03</div>
            <div>
              <div class="risk-title">Cache invalidation vs. portal edit consistency</div>
              <div class="risk-severity high">High</div>
            </div>
          </div>
          <div class="prose">
            <p>
              If the public site uses ISR with a 5-minute revalidation window, agents
              who save a listing won't see it live for up to 5 minutes. For agents
              expecting near-real-time publication, this erodes trust in the system.
            </p>
            <p>
              <strong>Mitigation:</strong> On-demand ISR triggered by the portal's save
              action gives near-real-time public updates for any explicit save. A
              "preview" URL in the portal that bypasses the CDN cache lets agents
              verify their changes before the public page updates.
            </p>
          </div>
        </div>

        <div class="risk-item">
          <div class="risk-header">
            <div class="risk-number risk-medium">04</div>
            <div>
              <div class="risk-title">Portal reliability — agents losing work</div>
              <div class="risk-severity medium">Medium / High</div>
            </div>
          </div>
          <div class="prose">
            <p>
              Agents use the portal for professional workflows. A lost listing draft
              or an overwritten concurrent edit is a real business problem, not a UX
              inconvenience. Unlike the public site where a slow page is an annoyance,
              a portal data-loss incident damages trust permanently.
            </p>
            <p>
              <strong>Mitigation:</strong> Optimistic UI with clear rollback states.
              Auto-save with visible status indicators. Conflict detection for concurrent
              edits. Resilient offline/reconnection handling so a network interruption
              doesn't lose draft content.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ── -->
    <footer>
      <div class="footer-inner">
        <div class="footer-text">
          Built with Svelte 5, Vite, and Tailwind CSS v4 ·
          <a href="https://github.com/moizp/realestate-test" target="_blank" rel="noopener noreferrer">
            Source on GitHub ↗
          </a>
        </div>
      </div>
    </footer>

  </div>
</main>

<style>
  /* ── Layout ── */
  main { margin-left: 248px; min-height: 100vh; }

  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2.5rem 5rem;
  }

  @media (max-width: 1024px) {
    main { margin-left: 0; padding-top: 44px; }
    .content { padding: 0 1.25rem 3.5rem; }
  }

  /* ── Header ── */
  header {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 4rem 0 3.5rem;
  }

  .header-inner {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  @media (max-width: 1024px) {
    header { padding: 2.5rem 0 2rem; }
    .header-inner { padding: 0 1.25rem; }
  }

  .header-eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0d9488;
    margin-bottom: 1.25rem;
  }

  h1 {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: #f8fafc;
    margin: 0 0 1.25rem;
  }

  h1 span { color: #94a3b8; }

  .header-sub {
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.65;
    max-width: 520px;
    margin: 0;
  }

  /* ── Sections ── */
  section {
    padding: 3.5rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .section-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0d9488;
    margin-bottom: 0.6rem;
  }

  .deep-dive-header {
    padding: 3.5rem 0 1rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .deep-dive-section-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 0.6rem;
  }

  h2 {
    font-size: clamp(1.4rem, 3vw, 1.875rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #0f172a;
    margin: 0 0 1.25rem;
    line-height: 1.2;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin: 0 0 1.25rem;
    line-height: 1.3;
  }

  /* ── Prose ── */
  .prose p {
    color: #374151;
    line-height: 1.75;
    margin-bottom: 1rem;
    font-size: 0.9375rem;
  }

  .prose p:last-child { margin-bottom: 0; }

  .prose strong { color: #0f172a; font-weight: 600; }

  .prose em { font-style: italic; color: #374151; }

  .lead-text p { font-size: 1rem; }

  /* ── POV grid ── */
  .pov-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1.75rem;
  }

  @media (max-width: 768px) { .pov-grid { grid-template-columns: 1fr; } }

  .pov-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1.25rem;
  }

  .pov-icon { font-size: 1.1rem; color: #0d9488; margin-bottom: 0.6rem; }

  .pov-card h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #0f172a;
  }

  .pov-card p {
    font-size: 0.825rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }

  /* ── Tables ── */
  .table-container { margin: 1.75rem 0 1.25rem; }

  .table-insight {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    padding: 1rem 1.25rem;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 0.5rem;
    margin-top: 1.25rem;
  }

  .insight-icon { color: #16a34a; font-size: 1rem; margin-top: 0.05rem; flex-shrink: 0; }

  .table-insight p {
    font-size: 0.85rem;
    color: #166534;
    line-height: 1.55;
    margin: 0;
  }

  /* ── Architecture cards ── */
  .arch-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.75rem 0;
  }

  @media (max-width: 640px) { .arch-split { grid-template-columns: 1fr; } }

  .arch-card { border-radius: 0.75rem; padding: 1.5rem; }
  .arch-card.public { background: #f0fdfa; border: 1px solid #99f6e4; }
  .arch-card.portal { background: #f5f3ff; border: 1px solid #ddd6fe; }

  .arch-card-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 0.4rem;
  }

  .arch-card-strategy { font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; }
  .arch-card.public .arch-card-strategy { color: #0f766e; }
  .arch-card.portal .arch-card-strategy { color: #6d28d9; }

  .arch-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
  .arch-card li { font-size: 0.82rem; color: #374151; padding-left: 1rem; position: relative; line-height: 1.5; }
  .arch-card.public li::before { content: '–'; position: absolute; left: 0; color: #0d9488; font-weight: 700; }
  .arch-card.portal li::before { content: '–'; position: absolute; left: 0; color: #7c3aed; font-weight: 700; }

  /* ── Split callout (rendering) ── */
  .split-callout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.75rem 0;
  }

  @media (max-width: 640px) { .split-callout { grid-template-columns: 1fr; } }

  .callout-block { border-radius: 0.75rem; padding: 1.25rem; }
  .callout-block.high-change { background: #fff7ed; border: 1px solid #fed7aa; }
  .callout-block.low-change { background: #f0f9ff; border: 1px solid #bae6fd; }

  .callout-tag {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  .high-change .callout-tag { color: #ea580c; }
  .low-change .callout-tag { color: #0284c7; }

  .callout-title { font-size: 0.9rem; font-weight: 600; color: #0f172a; margin-bottom: 0.5rem; }

  .callout-block p { font-size: 0.82rem; color: #64748b; line-height: 1.55; margin-bottom: 0.75rem; }

  .callout-strategy {
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    line-height: 1.4;
  }

  .high-change .callout-strategy { background: #ffedd5; color: #9a3412; }
  .low-change .callout-strategy { background: #e0f2fe; color: #0c4a6e; }

  /* ── Migration: risks preview ── */
  .risks-preview {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 1.75rem 0;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .risk-preview-item {
    display: flex;
    gap: 1.25rem;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    align-items: flex-start;
  }

  .risk-preview-item:last-child { border-bottom: none; }

  .risk-preview-number {
    font-size: 1.5rem;
    font-weight: 800;
    color: #e2e8f0;
    letter-spacing: -0.04em;
    flex-shrink: 0;
    width: 2rem;
    line-height: 1.2;
  }

  .risk-preview-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.4rem;
  }

  .risk-preview-item p {
    font-size: 0.825rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }

  /* ── Section divider ── */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2.5rem 0 2rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
  }

  .section-divider::before,
  .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  /* ── Web Components explainer ── */
  .wc-explainer {
    background: #0f172a;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin: 1.75rem 0;
  }

  .wc-explainer-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 1.25rem;
    letter-spacing: 0.01em;
  }

  .wc-badge {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    background: rgba(13, 148, 136, 0.2);
    color: #5eead4;
  }

  .wc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 640px) { .wc-grid { grid-template-columns: 1fr; } }

  .wc-feature {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.5rem;
    border: 1px solid #1e293b;
  }

  .wc-feature-title {
    font-size: 0.82rem;
    font-weight: 600;
    color: #f1f5f9;
    margin-bottom: 0.5rem;
  }

  .wc-feature p {
    font-size: 0.8rem;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0;
  }

  code {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 0.82em;
    background: rgba(255,255,255,0.08);
    color: #5eead4;
    padding: 0.1em 0.35em;
    border-radius: 0.25rem;
  }

  /* ── Slice flow ── */
  .slice-flow {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  .slice-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1.1rem 1.25rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.625rem;
    width: 100%;
    box-sizing: border-box;
  }

  .slice-connector {
    padding-left: 1.65rem;
    color: #0d9488;
    font-size: 1.1rem;
    line-height: 1;
    margin: 0.2rem 0;
    font-weight: 700;
  }

  .slice-step-num {
    width: 1.75rem;
    height: 1.75rem;
    background: #0d9488;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 0.05rem;
  }

  .slice-step-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.3rem;
  }

  .slice-step-content p {
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.55;
    margin: 0;
  }

  /* ── Risks ── */
  .risks-list { display: flex; flex-direction: column; gap: 0; margin-top: 1.75rem; }

  .risk-item {
    padding: 1.75rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .risk-item:last-child { border-bottom: none; }

  .risk-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .risk-number {
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 1;
    flex-shrink: 0;
    width: 2.5rem;
    letter-spacing: -0.04em;
  }

  .risk-critical { color: #dc2626; }
  .risk-high { color: #ea580c; }
  .risk-medium { color: #d97706; }

  .risk-title { font-size: 1rem; font-weight: 700; color: #0f172a; line-height: 1.3; }

  .risk-severity {
    display: inline-block;
    margin-top: 0.25rem;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.15rem 0.45rem;
    border-radius: 0.25rem;
  }

  .risk-severity.critical { background: #fee2e2; color: #dc2626; }
  .risk-severity.high { background: #ffedd5; color: #ea580c; }
  .risk-severity.medium { background: #fef9c3; color: #a16207; }

  .risk-item .prose p { font-size: 0.875rem; }

  /* ── Footer ── */
  footer {
    padding: 2rem 0;
    border-top: 1px solid #f1f5f9;
    margin-top: 1rem;
  }

  .footer-inner { max-width: 800px; margin: 0 auto; }

  .footer-text { font-size: 0.78rem; color: #94a3b8; }
  .footer-text a { color: #0d9488; text-decoration: none; }
  .footer-text a:hover { text-decoration: underline; }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from './lib/Nav.svelte';
  import ComparisonTable from './lib/ComparisonTable.svelte';

  let activeSection = $state('overview');

  onMount(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
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
        A response to the exercise brief — built as an interactive page rather than a
        document, because a front-end lead should ship things that reflect the craft
        they're bringing to the role.
      </p>
    </div>
  </header>

  <div class="content">

    <!-- ── 01 OVERVIEW ── -->
    <section id="overview">
      <div class="section-label">01 · Overview</div>
      <h2>Point of view</h2>
      <div class="prose lead-text">
        <p>
          My response to this exercise is shaped by a few convictions that run through
          every section below. I'd rather state them upfront than let them surface
          implicitly.
        </p>
      </div>

      <div class="pov-grid">
        <div class="pov-card">
          <div class="pov-icon">⟳</div>
          <h3>Lean over big-bang</h3>
          <p>
            A full platform rebuild that ships in 18 months has too much risk embedded.
            End-to-end vertical slices — one flow, all the way through, deployed and
            measured — deliver value earlier and surface architectural mistakes while
            they're still cheap to fix.
          </p>
        </div>
        <div class="pov-card">
          <div class="pov-icon">⬡</div>
          <h3>DevEx is a multiplier</h3>
          <p>
            Strong TypeScript, enforced patterns, fast CI feedback loops, and clear
            code standards don't slow teams down — they compound. Investment at the
            start of a rebuild makes every subsequent slice cheaper and safer to ship.
          </p>
        </div>
        <div class="pov-card">
          <div class="pov-icon">◈</div>
          <h3>The content model is the foundation</h3>
          <p>
            Both surfaces share underlying entities: listings, suburbs, agents.
            Getting the content schema right — as shared TypeScript types — before the
            frontends diverge is the highest-leverage early decision in the rebuild.
          </p>
        </div>
      </div>
    </section>

    <!-- ── 02 THE TWO SURFACES ── -->
    <section id="surfaces">
      <div class="section-label">02 · The Two Surfaces</div>
      <h2>Mapping the problem space</h2>
      <div class="prose">
        <p>
          Before deciding anything about architecture, I find it useful to map the
          surfaces against the dimensions that actually drive technical decisions.
          The table below is that mapping. The architectural conclusions that follow
          come directly from it.
        </p>
      </div>

      <div class="table-container">
        <ComparisonTable />
      </div>

      <div class="table-insight">
        <div class="insight-icon">↓</div>
        <p>
          The table tells two distinct stories. Every dimension that matters
          architecturally — rendering strategy, caching, session model, SEO — points
          in different directions for each surface. That's the signal.
        </p>
      </div>
    </section>

    <!-- ── 03 ARCHITECTURE ── -->
    <section id="architecture">
      <div class="section-label">03 · Architecture</div>
      <h2>Two apps, not one platform with two themes</h2>
      <div class="prose">
        <p>
          The comparison table points to a clear architectural fork. The temptation in a
          rebuild is to pick one rendering strategy and one framework and make both
          surfaces work within it. That's the wrong call here, and the table explains why.
        </p>
        <p>
          The two surfaces have fundamentally different user models, session patterns,
          and performance constraints. Forcing them into a single architecture means
          either over-engineering the portal (with SSR complexity it doesn't need) or
          under-serving the public site (sacrificing the SEO and performance characteristics
          that drive business value).
        </p>
      </div>

      <div class="arch-split">
        <div class="arch-card public">
          <div class="arch-card-label">Public Search &amp; Listings</div>
          <div class="arch-card-strategy">SSR + ISR</div>
          <ul>
            <li>Cold, unauthenticated visitors — first-load speed is critical</li>
            <li>SEO and Core Web Vitals directly affect acquisition and ranking</li>
            <li>Content of mixed freshness — tiered caching by content type</li>
            <li>AI crawlers (GEO) expect structured data and fast TTFB</li>
          </ul>
        </div>
        <div class="arch-card portal">
          <div class="arch-card-label">Agent Portal</div>
          <div class="arch-card-strategy">CSR / SPA</div>
          <ul>
            <li>Warm, authenticated, repeat sessions — no cold-load problem</li>
            <li>No SEO requirement — SSR adds complexity with no return</li>
            <li>Interaction responsiveness and reliability over first-load speed</li>
            <li>Optimistic state management and multi-tab consistency</li>
          </ul>
        </div>
      </div>

      <div class="prose">
        <p>
          The frontends diverge. The data layer doesn't. Both surfaces operate on the
          same underlying content entities — listings, suburbs, agents — served through
          a shared API. The portal writes; the public site reads. Getting that contract
          right is what allows the two frontends to evolve independently without drifting
          apart at the data level.
        </p>
      </div>
    </section>

    <!-- ── DEEP DIVES HEADER ── -->
    <div class="deep-dive-header">
      <div class="section-label">04 · Deep Dives</div>
      <h2>Where I've gone deep</h2>
      <div class="prose">
        <p>
          Rather than covering everything at surface level, I've focused on the four
          areas I think matter most — either because the risk is highest, or because
          the conventional answers tend to be wrong.
        </p>
      </div>
    </div>

    <!-- ── RENDERING STRATEGY ── -->
    <section id="rendering">
      <div class="deep-dive-section-label">↳ Rendering Strategy</div>
      <h3>Tiered freshness, not a single rendering model</h3>

      <div class="prose">
        <p>
          The standard answer to "SEO-critical, performance-critical" is "use SSR."
          That's right, but it's incomplete. The public site's content falls into two
          distinct freshness categories, and treating them identically is wasteful.
        </p>
      </div>

      <div class="split-callout">
        <div class="callout-block high-change">
          <div class="callout-tag">High change</div>
          <div class="callout-title">Listing pages</div>
          <p>Status, price, and photos change throughout a sale cycle. A listing can move from Active to Under Offer in a day.</p>
          <div class="callout-strategy">Short ISR window (minutes) + on-demand revalidation triggered by portal saves</div>
        </div>
        <div class="callout-block low-change">
          <div class="callout-tag">Low change</div>
          <div class="callout-title">Suburb pages, school zones, agent profiles</div>
          <p>Change rarely — school catchments don't shift week to week, suburb statistics are updated periodically.</p>
          <div class="callout-strategy">Long ISR window (hours or days) — CDN serves cached content aggressively</div>
        </div>
      </div>

      <div class="prose">
        <p>
          On-demand ISR is the key mechanism that makes this work. When an agent
          saves a listing in the portal, it triggers an explicit cache invalidation
          for that listing's public URL. The CDN serves stale content until the
          save event, then refreshes immediately. This gives the performance
          profile of a static site with the freshness of SSR.
        </p>
        <p>
          <strong>The portal needs none of this.</strong> SSR adds framework
          complexity, server infrastructure, and hydration overhead for a surface
          where users are warm, authenticated, and already past their first-load.
          A well-built SPA with good state management and optimistic UI updates
          will feel faster to an agent editing a listing than an SSR equivalent
          with the same backend latency.
        </p>
        <p>
          The rendering strategy choice is therefore not "which framework wins"
          but "which rendering model fits which session model" — and the answer
          is different for each surface.
        </p>
      </div>

      <div class="placeholder-note">
        <div class="placeholder-icon">✎</div>
        <div>
          <strong>To be expanded:</strong> specific framework recommendations and
          monorepo vs. separate repo structure — I'll develop these once I've reviewed
          the current stack and constraints in more detail.
        </div>
      </div>
    </section>

    <!-- ── SHARED DATA LAYER ── -->
    <section id="data-layer">
      <div class="deep-dive-section-label">↳ Shared Data Layer</div>
      <h3>Two frontends, one content model</h3>

      <div class="prose">
        <p>
          Even though the two surfaces use different rendering strategies — and may
          be built in different frameworks — they share a source of truth: what a
          listing <em>is</em>, what a suburb <em>is</em>, what an agent <em>is</em>.
        </p>
        <p>
          Getting this content schema right before the frontends diverge is the
          highest-leverage early decision in the rebuild. The schema defines the
          contract between:
        </p>
        <ul>
          <li><strong>The portal</strong> — agents create and edit listings</li>
          <li><strong>The public site</strong> — consumers discover and evaluate listings</li>
          <li><strong>Analytics</strong> — tracking events reference listing IDs, property types, price brackets</li>
          <li><strong>AI components</strong> on both surfaces — description drafting, search ranking, and anomaly detection all operate on the same listing entity</li>
        </ul>
      </div>

      <div class="data-flow">
        <div class="flow-node write">
          <div class="flow-label">Portal</div>
          <div class="flow-sub">Agents write</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-node store">
          <div class="flow-label">Content Store</div>
          <div class="flow-sub">Single source of truth</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-node read">
          <div class="flow-label">Public Site</div>
          <div class="flow-sub">CDN-cached reads</div>
        </div>
      </div>

      <div class="prose">
        <p>
          Cache invalidation strategy: when the portal saves a listing, it
          triggers on-demand ISR revalidation for that listing's public page.
          Near-real-time consistency without requiring the public site to bypass
          the CDN on every request.
        </p>
        <p>
          <strong>Shared TypeScript types</strong> between both codebases make
          the schema a first-class constraint, not a runtime convention. A change
          to the listing schema surfaces as type errors across both surfaces
          simultaneously — the type system enforces the contract before the bug
          reaches production.
        </p>
      </div>

      <div class="placeholder-note">
        <div class="placeholder-icon">✎</div>
        <div>
          <strong>To be expanded:</strong> specific API pattern (GraphQL, REST, BFF)
          and data ownership/versioning strategy.
        </div>
      </div>
    </section>

    <!-- ── DELIVERY MODEL ── -->
    <section id="delivery">
      <div class="deep-dive-section-label">↳ Delivery Model</div>
      <h3>Ship vertical slices, not layers</h3>

      <div class="prose">
        <p>
          The temptation in a platform rebuild is to rebuild the platform. That
          means months of foundational work — new design system, new API layer,
          new deployment infrastructure — before a single user sees anything
          different. I'd propose the opposite.
        </p>
      </div>

      <div class="three-col">
        <div class="approach-card bad">
          <div class="approach-label">❌ Big-bang rebuild</div>
          <p>Everything ships at once. High risk, no feedback until launch, old system runs in parallel doubling maintenance burden.</p>
        </div>
        <div class="approach-card bad">
          <div class="approach-label">⚠ Layer-by-layer</div>
          <p>API first, then UI. No value delivered until both layers are complete. Engineers don't learn from real usage until too late.</p>
        </div>
        <div class="approach-card good">
          <div class="approach-label">✓ Vertical slices</div>
          <p>One complete user flow, rebuilt end-to-end, shipped and measured. Each slice informs the next. Value from day one.</p>
        </div>
      </div>

      <div class="prose">
        <p>
          <strong>What a first slice looks like in practice.</strong> Pick the
          highest-value flow — for realestate.co.nz, that's likely property search
          (highest traffic, SEO-critical, highest business value). Rebuild that flow
          end-to-end on the new architecture: the updated query understanding model,
          the new SSR rendering layer, the new CDN configuration, and the new
          performance monitoring. All for one flow.
        </p>
        <p>
          Ship it as <code>/search-v2</code> or behind a feature flag. Measure.
          Compare Core Web Vitals to the baseline. Iterate. Then expand to the
          next slice.
        </p>
        <p>
          <strong>What needs to exist before the first slice.</strong> The shared
          design system and shared TypeScript content types need to be in place
          first — not a full pre-build, but enough that the first slice isn't
          making decisions that the second slice has to undo. These are the
          foundations that enable parallel slice development without divergence.
        </p>
      </div>

      <div class="devex-callout">
        <div class="devex-title">DevEx investment compounds</div>
        <div class="devex-grid">
          <div class="devex-item">
            <span class="devex-bullet">→</span>
            <span>Enforced TypeScript for the content schema — type errors surface contract violations immediately</span>
          </div>
          <div class="devex-item">
            <span class="devex-bullet">→</span>
            <span>CI that runs type checking, visual regression, and synthetic CWV monitoring on every PR</span>
          </div>
          <div class="devex-item">
            <span class="devex-bullet">→</span>
            <span>Clear component contribution guidelines so the design system grows consistently across slices</span>
          </div>
          <div class="devex-item">
            <span class="devex-bullet">→</span>
            <span>Fast local dev loop — if the feedback cycle is slow, engineers route around it</span>
          </div>
        </div>
      </div>

      <div class="prose">
        <p>
          The goal is that each slice is incrementally faster to build than the
          last, because the foundations are solid and the patterns are established.
          The DevEx investment at the start isn't overhead — it's interest that
          compounds across every subsequent slice.
        </p>
      </div>
    </section>

    <!-- ── RISKS ── -->
    <section id="risks">
      <div class="deep-dive-section-label">↳ Risks</div>
      <h3>Four risks worth naming upfront</h3>

      <div class="prose">
        <p>
          These are the risks I'd bring into the open at the start of the project,
          rather than let them surface as incidents mid-rebuild.
        </p>
      </div>

      <div class="risks-list">

        <div class="risk-item">
          <div class="risk-header">
            <div class="risk-number risk-critical">01</div>
            <div>
              <div class="risk-title">SEO regression during the rebuild</div>
              <div class="risk-severity critical">Critical</div>
            </div>
          </div>
          <div class="prose">
            <p>
              Organic search is a primary acquisition channel for a property platform.
              A 10% ranking drop — entirely achievable through a careless rebuild — is a
              direct, measurable business loss. The specific risks are:
            </p>
            <ul>
              <li>URL structure changes that break established link equity</li>
              <li>SSR misconfiguration causing crawlers to receive thin or empty content</li>
              <li>Canonical URL errors during parallel serving (old + new site)</li>
              <li>Core Web Vitals regression — Google uses this as a ranking signal</li>
            </ul>
            <p>
              <strong>Mitigation:</strong> URL-level integration tests in CI, synthetic
              CWV monitoring from day one (not post-launch), explicit canonical URL policy
              checked in CI, redirect testing phase before any URL structure changes go
              live. The vertical slice model helps here — each slice has performance
              baselines established before the old route is retired.
            </p>
          </div>
        </div>

        <div class="risk-item">
          <div class="risk-header">
            <div class="risk-number risk-high">02</div>
            <div>
              <div class="risk-title">Design system drift across two rendering strategies</div>
              <div class="risk-severity high">High</div>
            </div>
          </div>
          <div class="prose">
            <p>
              Two surfaces with different tech stacks can diverge visually over time.
              What starts as one design language gradually becomes two — buttons that are
              subtly different, spacing that doesn't match, typography that's inconsistent.
              This compounds with every slice until fixing it requires a cross-team
              coordination effort.
            </p>
            <p>
              <strong>Mitigation:</strong> Shared component library consumed by both
              surfaces. Visual regression tests (e.g. Chromatic) that catch visual
              changes before they're merged. Design tokens managed centrally so that a
              colour or spacing change propagates everywhere simultaneously.
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
              If the public site uses ISR with a 5-minute revalidation window, an agent
              who edits a listing won't see it live for up to 5 minutes. For agents who
              expect to click Save and see the change live immediately, this is a
              frustration point that erodes trust in the system.
            </p>
            <p>
              <strong>Mitigation:</strong> On-demand ISR triggered by the portal's save
              action, giving near-real-time public updates for any explicit save. A
              "preview" URL in the portal that bypasses the CDN cache, so agents can
              verify their changes against a live rendering before the public page updates.
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
              Agents use the portal daily for professional workflows. Data loss or
              inconsistency — losing a partially-edited listing description, or having two
              agents overwrite each other's changes — is a real business problem. Unlike
              the public site where a slow page is an annoyance, a portal failure costs
              agents time and erodes their trust in the platform.
            </p>
            <p>
              <strong>Mitigation:</strong> Optimistic UI updates with clear rollback states.
              Auto-save with visible status indicators (Saving… / Saved / Failed — retry).
              Conflict detection for concurrent edits on the same listing. Thorough
              offline/reconnection handling so a network blip doesn't lose draft content.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ── FOOTER ── -->
    <footer>
      <div class="footer-inner">
        <div class="footer-text">
          Built in Svelte 5 + Vite + Tailwind CSS v4 ·
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
  main {
    margin-left: 248px;
    min-height: 100vh;
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2.5rem 4rem;
  }

  @media (max-width: 1024px) {
    main { margin-left: 0; padding-top: 44px; }
    .content { padding: 0 1.25rem 3rem; }
  }

  /* ── Header ── */
  header {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 4rem 0 3.5rem;
    margin-bottom: 0;
  }

  .header-inner {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2.5rem;
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

  h1 span {
    color: #94a3b8;
  }

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

  section:last-of-type { border-bottom: none; }

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

  /* ── POV grid ── */
  .pov-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1.75rem;
  }

  @media (max-width: 768px) {
    .pov-grid { grid-template-columns: 1fr; }
  }

  .pov-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1.25rem 1.25rem 1.25rem;
  }

  .pov-icon {
    font-size: 1.1rem;
    color: #0d9488;
    margin-bottom: 0.6rem;
    font-weight: 300;
  }

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

  /* ── Table section ── */
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

  .insight-icon {
    color: #16a34a;
    font-size: 1rem;
    margin-top: 0.05rem;
    flex-shrink: 0;
  }

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

  @media (max-width: 640px) {
    .arch-split { grid-template-columns: 1fr; }
  }

  .arch-card {
    border-radius: 0.75rem;
    padding: 1.5rem;
  }

  .arch-card.public {
    background: #f0fdfa;
    border: 1px solid #99f6e4;
  }

  .arch-card.portal {
    background: #f5f3ff;
    border: 1px solid #ddd6fe;
  }

  .arch-card-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 0.4rem;
  }

  .arch-card-strategy {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .arch-card.public .arch-card-strategy { color: #0f766e; }
  .arch-card.portal .arch-card-strategy { color: #6d28d9; }

  .arch-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .arch-card li {
    font-size: 0.82rem;
    color: #374151;
    padding-left: 1rem;
    position: relative;
    line-height: 1.5;
  }

  .arch-card.public li::before { content: '–'; position: absolute; left: 0; color: #0d9488; font-weight: 700; }
  .arch-card.portal li::before { content: '–'; position: absolute; left: 0; color: #7c3aed; font-weight: 700; }

  /* ── Split callout ── */
  .split-callout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.75rem 0;
  }

  @media (max-width: 640px) {
    .split-callout { grid-template-columns: 1fr; }
  }

  .callout-block {
    border-radius: 0.75rem;
    padding: 1.25rem;
  }

  .callout-block.high-change {
    background: #fff7ed;
    border: 1px solid #fed7aa;
  }

  .callout-block.low-change {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
  }

  .callout-tag {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  .high-change .callout-tag { color: #ea580c; }
  .low-change .callout-tag { color: #0284c7; }

  .callout-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .callout-block p {
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.55;
    margin-bottom: 0.75rem;
  }

  .callout-strategy {
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    line-height: 1.4;
  }

  .high-change .callout-strategy { background: #ffedd5; color: #9a3412; }
  .low-change .callout-strategy { background: #e0f2fe; color: #0c4a6e; }

  /* ── Data flow diagram ── */
  .data-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin: 1.75rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    flex-wrap: wrap;
  }

  .flow-node {
    text-align: center;
    padding: 0.875rem 1.25rem;
    border-radius: 0.625rem;
    min-width: 120px;
  }

  .flow-node.write { background: #f5f3ff; border: 1px solid #ddd6fe; }
  .flow-node.store { background: #0f172a; color: white; }
  .flow-node.read { background: #f0fdfa; border: 1px solid #99f6e4; }

  .flow-label { font-size: 0.875rem; font-weight: 700; }
  .flow-sub { font-size: 0.7rem; margin-top: 0.2rem; opacity: 0.7; }
  .flow-node.store .flow-label { color: white; }
  .flow-node.store .flow-sub { color: #94a3b8; }
  .flow-node.write .flow-label { color: #6d28d9; }
  .flow-node.write .flow-sub { color: #7c3aed; }
  .flow-node.read .flow-label { color: #0f766e; }
  .flow-node.read .flow-sub { color: #0d9488; }

  .flow-arrow { font-size: 1.25rem; color: #94a3b8; }

  /* ── Three-col approach ── */
  .three-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1.75rem 0;
  }

  @media (max-width: 640px) {
    .three-col { grid-template-columns: 1fr; }
  }

  .approach-card {
    border-radius: 0.75rem;
    padding: 1.1rem 1.1rem 1.1rem;
    font-size: 0.82rem;
    color: #374151;
    line-height: 1.6;
  }

  .approach-card.bad { background: #fafafa; border: 1px solid #e5e7eb; }
  .approach-card.good { background: #f0fdfa; border: 1px solid #99f6e4; }

  .approach-label {
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }

  .approach-card p { margin: 0; }

  code {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 0.82em;
    background: #f1f5f9;
    padding: 0.15em 0.4em;
    border-radius: 0.25rem;
    color: #0f172a;
  }

  /* ── DevEx callout ── */
  .devex-callout {
    background: #0f172a;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin: 1.75rem 0;
  }

  .devex-title {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0d9488;
    margin-bottom: 1rem;
  }

  .devex-grid {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .devex-item {
    display: flex;
    gap: 0.75rem;
    font-size: 0.825rem;
    color: #94a3b8;
    line-height: 1.55;
  }

  .devex-bullet {
    color: #0d9488;
    flex-shrink: 0;
    font-weight: 700;
    margin-top: 0.05rem;
  }

  /* ── Risks list ── */
  .risks-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 1.75rem;
  }

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

  .risk-title {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.3;
  }

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

  /* ── Placeholder note ── */
  .placeholder-note {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    margin-top: 1.5rem;
    padding: 0.875rem 1rem;
    background: #fefce8;
    border: 1px dashed #fbbf24;
    border-radius: 0.5rem;
    font-size: 0.82rem;
    color: #92400e;
    line-height: 1.55;
  }

  .placeholder-icon {
    font-size: 0.875rem;
    flex-shrink: 0;
    margin-top: 0.05rem;
    color: #d97706;
  }

  /* ── Lead text ── */
  .lead-text p {
    font-size: 1rem;
  }

  /* ── Footer ── */
  footer {
    padding: 2rem 0;
    border-top: 1px solid #f1f5f9;
    margin-top: 1rem;
  }

  .footer-inner {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  .footer-text {
    font-size: 0.78rem;
    color: #94a3b8;
  }

  .footer-text a {
    color: #0d9488;
    text-decoration: none;
  }

  .footer-text a:hover { text-decoration: underline; }

  @media (max-width: 1024px) {
    .footer-inner { padding: 0 1.25rem; }
    header { padding: 2.5rem 0 2rem; }
    .header-inner { padding: 0 1.25rem; }
  }
</style>

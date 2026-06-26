<script lang="ts">
  type Row = { param: string; publicSite: string; portal: string };

  const rows: Row[] = [
    {
      param: 'Security',
      publicSite:
        'Rate limiting on search and contact APIs. XSS protection on all user-generated content (listing descriptions, suburb comments). Content Security Policy for third-party embeds (maps, photo CDNs, analytics). GDPR/privacy compliance for search behaviour tracking and saved search data.',
      portal:
        'OAuth 2.0 / SSO for agency authentication. Role-based access control (agent, admin, agency owner). Input validation and sanitisation on all listing fields. Secure photo uploads with file-type validation. Audit trail for listing changes (who edited what, when). Session timeout and multi-device management.',
    },
    {
      param: 'UI Components Library',
      publicSite:
        'Read-optimised components: search filters, listing cards, photo galleries, maps, suburb stats panels, school zone overlays. Must be server-renderable (SSR/ISR) and progressively enhanced — core content accessible without JS. Shared design tokens with the portal.',
      portal:
        'Write-optimised components: multi-step listing creation forms, inline field validation, drag-and-drop photo ordering, rich text editor for descriptions, status indicators, bulk-action workflows. Heavily client-side. Shared base components and tokens with the public site.',
    },
    {
      param: 'CSR vs SSR / ISR',
      publicSite:
        'SSR + tiered ISR. Short revalidation windows for listing pages (price/status change often). Long windows for suburb stats, school zones, agent profiles (change rarely). On-demand ISR invalidation triggered by portal saves — agents see their changes go live immediately.',
      portal:
        'CSR / SPA. Sessions are warm, authenticated, and repeat — no cold-load problem to solve. SSR adds framework complexity with no business return. Focus is interaction responsiveness and reliable state management, not TTFB.',
    },
    {
      param: 'Custom Web Components',
      publicSite:
        'Key UI components (search widget, listing card, map) exposed as Web Components can be embedded by partner sites, third-party apps, and agency websites without API coupling. Also the primary mechanism for gradually migrating the public site — see Migration Strategy.',
      portal:
        'New portal features built as Web Components deploy simultaneously into the legacy portal and the new portal. No big-bang cutover needed: each feature is live and tested in production on the old codebase before the new one exists. Same component, two hosts.',
    },
    {
      param: 'PWA Potential',
      publicSite:
        'Low for anonymous visitors — mostly one-off sessions. Moderate for logged-in users: push notifications for saved search matches, offline access to saved listings. Not a day-one priority for the rebuild, but the architecture should not block it.',
      portal:
        'High. Agents use the portal daily on a variety of devices and network conditions. Offline drafting (with background sync on reconnect), install to homescreen, and push notifications for listing approval workflows are high-value from day one on the new portal.',
    },
    {
      param: 'SEO / AEO',
      publicSite:
        'SEO: schema.org RealEstateListing structured data, canonical URLs, Open Graph, Core Web Vitals enforced in CI. AEO (Answer Engine Optimisation): machine-readable listing data for AI answer engines (ChatGPT, Gemini, Perplexity), MCP server exposing search and listing data to agentic AI workflows and assistant marketplaces.',
      portal: 'Not applicable — authenticated and not publicly indexed.',
    },
    {
      param: 'Team',
      publicSite:
        '1–2 FEs per feature slice, cross-functional where possible. Shared component library governed by lead + 1. Performance and SEO compliance part of every PR via CI gates. Slice teams own their feature end-to-end: component, API contract, tests, monitoring.',
      portal:
        'Separate slice team, same shared component library and design tokens. Portal-specific components (forms, workflows) built independently but from the same system. Reliability and data-integrity review part of every portal PR — a lost listing draft is a business problem.',
    },
  ];
</script>

<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th class="param-col">Parameter</th>
        <th>
          <div class="col-header">
            <span class="col-badge public">Public</span>
            Search &amp; Listings
          </div>
        </th>
        <th>
          <div class="col-header">
            <span class="col-badge portal">Portal</span>
            Agent Portal
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i}
        <tr class:alt={i % 2 === 1}>
          <td class="param-cell">{row.param}</td>
          <td>{row.publicSite}</td>
          <td>{row.portal}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    width: 100%;
    overflow-x: auto;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    -webkit-overflow-scrolling: touch;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
    min-width: 680px;
  }

  thead tr {
    background-color: #1e1b4b;
  }

  th {
    padding: 0.9rem 1.1rem;
    text-align: left;
    font-weight: 500;
    color: #94a3b8;
    font-size: 0.78rem;
    letter-spacing: 0.01em;
    white-space: nowrap;
    border-bottom: 1px solid #312e81;
  }

  th.param-col {
    width: 160px;
    color: #64748b;
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .col-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #f1f5f9;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .col-badge {
    display: inline-block;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.15rem 0.4rem;
    border-radius: 0.25rem;
  }

  .col-badge.public {
    background-color: rgba(13, 148, 136, 0.25);
    color: #5eead4;
  }

  .col-badge.portal {
    background-color: rgba(129, 140, 248, 0.25);
    color: #a5b4fc;
  }

  tbody tr {
    border-bottom: 1px solid #f1f5f9;
    transition: background-color 0.1s;
  }

  tbody tr:last-child { border-bottom: none; }
  tbody tr.alt { background-color: #f8f7ff; }
  tbody tr:hover { background-color: #f5f3ff; }

  td {
    padding: 0.9rem 1.1rem;
    color: #374151;
    line-height: 1.6;
    vertical-align: top;
  }

  td.param-cell {
    font-weight: 600;
    font-size: 0.78rem;
    color: #1e1b4b;
    white-space: nowrap;
    vertical-align: top;
    padding-top: 1rem;
  }

  @media (max-width: 640px) {
    th, td { padding: 0.75rem 0.875rem; }
    th.param-col { width: 120px; }
  }
</style>

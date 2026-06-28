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

<div
  class="w-full overflow-x-auto rounded-lg border border-slate-200 [-webkit-overflow-scrolling:touch]"
>
  <table class="w-full min-w-170 border-collapse text-[0.9rem]">
    <thead>
      <tr class="bg-slate-700">
        <th class="w-40 border-b border-indigo-900 px-[1.1rem] py-[0.9rem] text-left">
          <div class="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-50">
            Parameter
          </div>
        </th>
        <th class="border-b border-indigo-900 px-[1.1rem] py-[0.9rem] text-left">
          <div class="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-50">
            Search &amp; Listings
          </div>
        </th>
        <th class="border-b border-indigo-900 px-[1.1rem] py-[0.9rem] text-left">
          <div class="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-50">
            Agent Portal
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i (row.param)}
        <tr
          class="border-b border-slate-100 transition-colors duration-100 last:border-b-0
            {i % 2 === 1 ? 'bg-violet-50/50' : 'bg-white'} hover:bg-violet-50"
        >
          <td class="px-[1.1rem] py-4 whitespace-nowrap text-indigo-950 align-top">
            {row.param}
          </td>
          <td class="px-[1.1rem] py-[0.9rem] align-top leading-relaxed text-slate-700">
            {row.publicSite}
          </td>
          <td class="px-[1.1rem] py-[0.9rem] align-top leading-relaxed text-slate-700">
            {row.portal}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

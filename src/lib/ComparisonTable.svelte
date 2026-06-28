<script lang="ts">
  type Row = { param: string; public: string; portal: string };

  const rows: Row[] = [
    {
      param: 'Primary use case',
      public:
        'Discover and evaluate properties — filter/browse → listing detail → contact agent. Mostly accessed on mobile.',
      portal:
        'Create, edit, and manage listings efficiently and reliably. Mostly accessed on desktop.',
    },
    {
      param: 'Typical session',
      public:
        'Short (minutes), low frequency per individual — many one-off or occasional visitors. Usually a single tab.',
      portal:
        'Long (tens of minutes to hours), daily repeat use — often multiple tabs open in parallel while cross-referencing listings.',
    },
    {
      param: 'Content freshness',
      public:
        'Mixed — listing status/price/photos change often during a sale cycle; suburb stats, school zones, and agent profiles change rarely.',
      portal:
        "High — agents are actively editing; needs near-real-time consistency between what's saved and what's published.",
    },
    {
      param: 'Rendering & performance',
      public:
        'Cold, unauthenticated visitors — first-load speed and Core Web Vitals directly affect traffic and conversion.',
      portal:
        'Warm, authenticated, repeat sessions. Interaction responsiveness and state reliability matter more than first-load speed.',
    },
    {
      param: 'SEO / GEO',
      public:
        'Critical — organic search is a primary acquisition channel. Must be crawlable and increasingly legible to AI answer engines (structured data, canonical URLs, fast TTFB).',
      portal: 'None — authenticated, not publicly indexed.',
    },
    {
      param: 'Security',
      public:
        'Open, unauthenticated surface. XSS risk on user-generated content. CSP required for third-party embeds (maps, photo CDNs, analytics). Privacy compliance for search tracking.',
      portal:
        'Authenticated surface. Role-based access (agent, admin, agency owner), input validation on listing fields, audit trail for changes, session management.',
    },
    {
      param: 'Custom Web Components',
      public:
        'Key components (search widget, listing card, map) embeddable by partner sites without API coupling. On the public site, Web Components act as client-side interactive islands within server-rendered pages — page shell and SEO metadata rendered server-side; components hydrate after load.',
      portal:
        'Features built as Web Components can ship into the existing EmberJS portal before the new one is ready — each feature is live in production on the old codebase first. Same component, two hosts.',
    },
    {
      param: 'PWA',
      public:
        'Low value for anonymous visitors. Moderate for logged-in users — push notifications for saved search matches, offline access to saved listings.',
      portal:
        'High value. Agents work across devices and variable networks. Offline drafting, background sync, and push notifications are meaningful from day one.',
    },
    {
      param: 'Feature roadmap',
      public: 'Personalisation, saved search alerts, richer comparison tools, map-based discovery.',
      portal: 'Bulk listing management, CRM/agency system integrations, workflow automation.',
    },
    {
      param: 'AI / LLM',
      public:
        'Natural language search (query → filters). AI-generated listing summaries and suburb insights surfaced in the UI.',
      portal:
        'Listing description drafting from raw agent input. Duplicate/anomaly detection. Photo quality and tagging checks.',
    },
    {
      param: 'Agentic roadmap',
      public:
        'Structured data suited to AI shopping/assistant marketplaces. MCP server exposing search and listing data to agentic assistants.',
      portal:
        "MCP tooling for agents' AI assistants to draft/manage listings programmatically. Internal MCP server for agency CRM agents.",
    },
  ];
</script>

<div
  class="w-full overflow-x-auto rounded-lg border border-slate-200 [-webkit-overflow-scrolling:touch]"
>
  <table class="w-full min-w-170 border-collapse text-[0.9rem]">
    <thead>
      <tr class="bg-slate-700">
        <th class="w-40 border-b border-slate-800 px-[1.1rem] py-[0.9rem] text-left">
          <div class="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-50">
            Parameter
          </div>
        </th>
        <th class="border-b border-slate-800 px-[1.1rem] py-[0.9rem] text-left">
          <div class="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-50">
            Search &amp; Listings
          </div>
        </th>
        <th class="border-b border-slate-800 px-[1.1rem] py-[0.9rem] text-left">
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
            {i % 2 === 1 ? 'bg-slate-50' : 'bg-white'} hover:bg-teal-50"
        >
          <td class="px-[1.1rem] py-4 align-top whitespace-nowrap text-slate-900">
            {row.param}
          </td>
          <td class="px-[1.1rem] py-[0.9rem] align-top leading-relaxed text-slate-700">
            {row.public}
          </td>
          <td class="px-[1.1rem] py-[0.9rem] align-top leading-relaxed text-slate-700">
            {row.portal}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

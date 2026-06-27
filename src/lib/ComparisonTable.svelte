<script lang="ts">
  type Row = { param: string; public: string; portal: string };

  const rows: Row[] = [
    {
      param: 'Primary use case',
      public: 'Discover and evaluate properties — filter/browse → listing detail → contact agent',
      portal: 'Create, edit, and manage listings efficiently and reliably',
    },
    {
      param: 'Typical session',
      public:
        'Short (minutes), high frequency per visitor but low frequency per individual — many one-off or occasional visitors. Usually a single tab.',
      portal:
        'Long (tens of minutes to hours), high frequency per user (daily, repeat), often multiple tabs open in parallel while cross-referencing listings during editing.',
    },
    {
      param: 'Content update frequency',
      public:
        'Mixed — listing status/price/photos change often during a sale cycle; suburb stats, school zones, and agent profiles change rarely.',
      portal:
        "High — agents are actively editing; needs near-real-time consistency between what's saved and what's published.",
    },
    {
      param: 'Performance (load & response)',
      public:
        'Critical — Core Web Vitals affect both search rankings and conversion. First-load speed matters most: often a cold, unauthenticated visitor, possibly on mobile.',
      portal:
        'Important but different shape — interaction responsiveness and reliability matter more than first-load speed. Sessions are warm, logged-in, and repeat.',
    },
    {
      param: 'SEO / GEO',
      public:
        'Critical — organic search is a primary acquisition channel. Must be crawlable/indexable and increasingly legible to AI answer engines (structured data, clean canonical URLs, fast TTFB).',
      portal: 'None — authenticated, no indexing requirement.',
    },
    {
      param: 'AI components',
      public:
        'Fine-tuned model for search query understanding and ranking (natural language → filters). AI-generated listing summaries or suburb insights surfaced in the UI.',
      portal:
        'Fine-tuned model for listing description drafting from raw agent input. Duplicate/anomaly detection on submitted data. Photo quality and tagging checks.',
    },
    {
      param: 'Future product roadmap',
      public: 'Personalisation, saved search alerts, richer comparison tools, map-based discovery.',
      portal: 'Bulk listing management, CRM/agency system integrations, workflow automation.',
    },
    {
      param: 'AI roadmap',
      public:
        'Structured data/feeds suited to listing in AI shopping/assistant marketplaces (e.g. OpenAI plugin search). MCP server exposing search and listing data to agentic assistants.',
      portal:
        "Claude Code-style plugins or MCP tooling for agents' own AI assistants to draft/manage listings programmatically. Internal MCP server for agency CRM agents to query/update listings.",
    },
  ];
</script>

<div
  class="w-full overflow-x-auto rounded-xl border border-slate-200 [-webkit-overflow-scrolling:touch]"
>
  <table class="w-full min-w-170 border-collapse text-[0.85rem]">
    <thead>
      <tr class="bg-slate-900">
        <th
          class="w-40 border-b border-slate-800 px-[1.1rem] py-[0.9rem] text-left text-[0.72rem] font-medium tracking-wider uppercase text-slate-500"
        >
          Parameter
        </th>
        <th class="border-b border-slate-800 px-[1.1rem] py-[0.9rem] text-left">
          <div class="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-50">
            <span
              class="inline-block rounded px-[0.4rem] py-[0.15rem] text-[0.62rem] font-bold tracking-[0.08em] uppercase bg-teal-600/20 text-teal-300"
            >
              Public
            </span>
            Search &amp; Listings
          </div>
        </th>
        <th class="border-b border-slate-800 px-[1.1rem] py-[0.9rem] text-left">
          <div class="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-50">
            <span
              class="inline-block rounded px-[0.4rem] py-[0.15rem] text-[0.62rem] font-bold tracking-[0.08em] uppercase bg-indigo-600/20 text-indigo-300"
            >
              Portal
            </span>
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
          <td
            class="px-[1.1rem] py-4 align-top text-[0.78rem] font-semibold whitespace-nowrap text-slate-900"
          >
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

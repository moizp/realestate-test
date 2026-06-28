<script lang="ts">
  type Row = { param: string; publicSite: string; portal: string };

  const rows: Row[] = [
    {
      param: 'Security',
      publicSite:
        'Open, unauthenticated surface. XSS risk on user-generated content (listing descriptions, suburb comments).',
      portal:
        'Authenticated. Role-based access (agent, admin, agency owner), input validation on listing fields, audit trail for changes.',
    },
    {
      param: 'Rendering',
      publicSite:
        'Cold, unauthenticated visitors. First-load speed and Core Web Vitals directly affect traffic. Content freshness varies — listing status changes frequently; suburb data rarely.',
      portal:
        'Warm, authenticated, repeat sessions. No cold-load problem. Interaction responsiveness and reliable state management are the priority.',
    },
    {
      param: 'Custom Web Components',
      publicSite:
        'Key components (search widget, listing card, map) can be embedded by partner sites without API coupling. On the public site, Web Components act as client-side interactive islands within server-rendered pages — the page shell and SEO metadata are rendered server-side; components hydrate after load.',
      portal:
        'Features built as Web Components can ship into the existing EmberJS portal before the new one is ready — each feature is live in production on the old codebase first. Same component, two hosts.',
    },
    {
      param: 'PWA',
      publicSite:
        'Low value for anonymous visitors. Moderate for logged-in users — push notifications for saved search matches, offline access to saved listings.',
      portal:
        'High value. Agents work across devices and variable networks. Offline drafting, background sync, and push notifications are meaningful from day one.',
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

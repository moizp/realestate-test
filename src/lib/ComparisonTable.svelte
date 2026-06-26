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
      public: 'Short (minutes), high frequency per visitor but low frequency per individual — many one-off or occasional visitors. Usually a single tab.',
      portal: 'Long (tens of minutes to hours), high frequency per user (daily, repeat), often multiple tabs open in parallel while cross-referencing listings during editing.',
    },
    {
      param: 'Content update frequency',
      public: 'Mixed — listing status/price/photos change often during a sale cycle; suburb stats, school zones, and agent profiles change rarely.',
      portal: 'High — agents are actively editing; needs near-real-time consistency between what\'s saved and what\'s published.',
    },
    {
      param: 'Performance (load & response)',
      public: 'Critical — Core Web Vitals affect both search rankings and conversion. First-load speed matters most: often a cold, unauthenticated visitor, possibly on mobile.',
      portal: 'Important but different shape — interaction responsiveness and reliability matter more than first-load speed. Sessions are warm, logged-in, and repeat.',
    },
    {
      param: 'SEO / GEO',
      public: 'Critical — organic search is a primary acquisition channel. Must be crawlable/indexable and increasingly legible to AI answer engines (structured data, clean canonical URLs, fast TTFB).',
      portal: 'None — authenticated, no indexing requirement.',
    },
    {
      param: 'AI components',
      public: 'Fine-tuned model for search query understanding and ranking (natural language → filters). AI-generated listing summaries or suburb insights surfaced in the UI.',
      portal: 'Fine-tuned model for listing description drafting from raw agent input. Duplicate/anomaly detection on submitted data. Photo quality and tagging checks.',
    },
    {
      param: 'Future product roadmap',
      public: 'Personalisation, saved search alerts, richer comparison tools, map-based discovery.',
      portal: 'Bulk listing management, CRM/agency system integrations, workflow automation.',
    },
    {
      param: 'AI roadmap',
      public: 'Structured data/feeds suited to listing in AI shopping/assistant marketplaces (e.g. OpenAI plugin search). MCP server exposing search and listing data to agentic assistants.',
      portal: 'Claude Code-style plugins or MCP tooling for agents\' own AI assistants to draft/manage listings programmatically. Internal MCP server for agency CRM agents to query/update listings.',
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
          <td>{row.public}</td>
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
    background-color: #0f172a;
  }

  th {
    padding: 0.9rem 1.1rem;
    text-align: left;
    font-weight: 500;
    color: #94a3b8;
    font-size: 0.78rem;
    letter-spacing: 0.01em;
    white-space: nowrap;
    border-bottom: 1px solid #1e293b;
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
    background-color: rgba(13, 148, 136, 0.2);
    color: #5eead4;
  }

  .col-badge.portal {
    background-color: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
  }

  tbody tr {
    border-bottom: 1px solid #f1f5f9;
    transition: background-color 0.1s;
  }

  tbody tr:last-child { border-bottom: none; }

  tbody tr.alt { background-color: #f8fafc; }

  tbody tr:hover { background-color: #f0fdf9; }

  td {
    padding: 0.9rem 1.1rem;
    color: #374151;
    line-height: 1.6;
    vertical-align: top;
  }

  td.param-cell {
    font-weight: 600;
    font-size: 0.78rem;
    color: #0f172a;
    white-space: nowrap;
    vertical-align: top;
    padding-top: 1rem;
  }

  @media (max-width: 640px) {
    th, td { padding: 0.75rem 0.875rem; }
    th.param-col { width: 120px; }
  }
</style>

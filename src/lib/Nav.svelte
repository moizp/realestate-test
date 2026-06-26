<script lang="ts">
  type NavItem = { id: string; label: string; depth: number };

  type Props = {
    activeSection: string;
  };

  let { activeSection }: Props = $props();

  const navItems: NavItem[] = [
    { id: 'overview',     label: 'Overview',              depth: 0 },
    { id: 'surfaces',     label: 'The Two Surfaces',      depth: 0 },
    { id: 'analysis',     label: 'Analysis',              depth: 0 },
    { id: 'architecture', label: 'Architecture',          depth: 0 },
    { id: 'rendering',    label: 'Rendering Strategy',    depth: 1 },
    { id: 'migration',    label: 'Migration Strategy',    depth: 1 },
    { id: 'risks',        label: 'Risks',                 depth: 1 },
  ];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<!-- Desktop sidebar -->
<nav class="sidebar" aria-label="Page sections">
  <div class="sidebar-header">
    <div class="sidebar-eyebrow">Technical Exercise</div>
    <div class="sidebar-title">Platform Architecture</div>
    <div class="sidebar-sub">realestate.co.nz</div>
  </div>

  <ul>
    {#each navItems as item}
      <li>
        <button
          class="nav-item"
          class:active={activeSection === item.id}
          class:indented={item.depth === 1}
          onclick={() => scrollTo(item.id)}
          type="button"
          aria-current={activeSection === item.id ? 'true' : undefined}
        >
          {#if item.depth === 1}
            <span class="depth-marker" aria-hidden="true">↳</span>
          {/if}
          {item.label}
        </button>
      </li>
    {/each}
  </ul>

  <div class="sidebar-footer">
    <a
      href="https://github.com/moizp/realestate-test"
      target="_blank"
      rel="noopener noreferrer"
      class="sidebar-link"
    >
      View on GitHub ↗
    </a>
  </div>
</nav>

<!-- Mobile top bar -->
<nav class="mobile-nav" aria-label="Page sections">
  <div class="mobile-nav-inner">
    {#each navItems as item}
      <button
        class="mobile-nav-item"
        class:active={activeSection === item.id}
        onclick={() => scrollTo(item.id)}
        type="button"
      >
        {item.label}
      </button>
    {/each}
  </div>
</nav>

<style>
  /* ── Sidebar (desktop) ── */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 248px;
    height: 100vh;
    background-color: #0f172a;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 50;
    border-right: 1px solid #1e293b;
  }

  .sidebar-header {
    padding: 2rem 1.5rem 1.5rem;
    border-bottom: 1px solid #1e293b;
  }

  .sidebar-eyebrow {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0d9488;
    margin-bottom: 0.5rem;
  }

  .sidebar-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #f8fafc;
    line-height: 1.3;
  }

  .sidebar-sub {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.25rem;
  }

  ul {
    list-style: none;
    padding: 1rem 0;
    margin: 0;
    flex: 1;
  }

  li { margin: 0; }

  .nav-item {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1.5rem;
    font-size: 0.8rem;
    font-family: inherit;
    color: #64748b;
    transition: color 0.15s, background-color 0.15s;
    border-left: 2px solid transparent;
    line-height: 1.4;
  }

  .nav-item.indented {
    padding-left: 2rem;
    font-size: 0.75rem;
    color: #475569;
  }

  .nav-item:hover {
    color: #cbd5e1;
    background-color: #1e293b;
  }

  .nav-item.active {
    color: #f8fafc;
    border-left-color: #0d9488;
    background-color: rgba(13, 148, 136, 0.08);
  }

  .nav-item.active.indented {
    color: #e2e8f0;
  }

  .depth-marker {
    color: #334155;
    font-size: 0.7rem;
    flex-shrink: 0;
  }

  .nav-item.active .depth-marker {
    color: #0d9488;
  }

  .sidebar-footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid #1e293b;
  }

  .sidebar-link {
    font-size: 0.72rem;
    color: #475569;
    text-decoration: none;
    transition: color 0.15s;
  }

  .sidebar-link:hover { color: #94a3b8; }

  /* ── Mobile nav ── */
  .mobile-nav {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: #0f172a;
    border-bottom: 1px solid #1e293b;
  }

  .mobile-nav-inner {
    display: flex;
    overflow-x: auto;
    padding: 0 1rem;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .mobile-nav-inner::-webkit-scrollbar { display: none; }

  .mobile-nav-item {
    flex-shrink: 0;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    padding: 0.85rem 0.75rem;
    font-size: 0.75rem;
    font-family: inherit;
    color: #64748b;
    white-space: nowrap;
    transition: color 0.15s, border-color 0.15s;
  }

  .mobile-nav-item:hover { color: #cbd5e1; }

  .mobile-nav-item.active {
    color: #f8fafc;
    border-bottom-color: #0d9488;
  }

  @media (max-width: 1024px) {
    .sidebar { display: none; }
    .mobile-nav { display: block; }
  }
</style>

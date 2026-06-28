<script lang="ts">
  type NavItem = { id: string; label: string; depth: number };

  type Props = {
    activeSection: string;
  };

  let { activeSection }: Props = $props();

  const navItems: NavItem[] = [
    { id: 'intro', label: 'Introduction', depth: 0 },
    { id: 'surfaces', label: 'The Two Apps', depth: 0 },
    { id: 'delivery', label: 'Structure of Work', depth: 0 },
    { id: 'risks', label: 'Risks & Tradeoffs', depth: 0 },
    { id: 'team', label: 'Team Factors', depth: 0 },
    { id: 'conclusion', label: 'Conclusion', depth: 0 },
  ];

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = window.scrollY;
    const target = el.getBoundingClientRect().top + window.scrollY - 16;
    const distance = target - start;
    const duration = 450;
    let startTime: number | null = null;
    function ease(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function step(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * ease(progress));
      if (elapsed < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
</script>

<!-- Desktop sidebar -->
<nav
  class="fixed top-0 left-0 hidden h-screen w-62 flex-col overflow-y-auto border-r border-slate-500 bg-slate-700 lg:flex"
  style="z-index: 50;"
  aria-label="Page sections"
>
  <div class="border-b border-slate-800 px-6 pt-8 pb-6">
    <div class="mb-2 font-semibold tracking-widest text-teal-400 uppercase">Contents</div>
  </div>

  <ul class="m-0 flex-1 list-none py-4">
    {#each navItems as item (item.id)}
      <li class="m-0">
        <button
          class="flex w-full cursor-pointer items-center gap-1.5 border-l-2 py-[0.45rem] text-left font-[inherit] leading-snug transition-colors duration-150
            {item.depth === 1 ? 'pl-8 text-slate-300' : 'pl-6 text-slate-100'}
            {activeSection === item.id
            ? 'border-l-teal-400 bg-teal-600/8 text-slate-50'
            : 'border-l-transparent hover:bg-slate-800 hover:text-slate-50'}"
          onclick={() => scrollTo(item.id)}
          type="button"
          aria-current={activeSection === item.id ? 'true' : undefined}
        >
          {#if item.depth === 1}
            <span
              class="shrink-0 text-[0.7rem] {activeSection === item.id
                ? 'text-teal-600'
                : 'text-slate-700'}"
              aria-hidden="true">↳</span
            >
          {/if}
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
</nav>

<!-- Mobile top bar -->
<nav
  class="fixed top-0 right-0 left-0 border-b border-slate-800 bg-slate-700 lg:hidden"
  style="z-index: 50;"
  aria-label="Page sections"
>
  <div
    class="flex scrollbar-none overflow-x-auto px-4 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
  >
    {#each navItems as item (item.id)}
      <button
        class="shrink-0 cursor-pointer border-b-2 px-3 py-[0.85rem] font-[inherit] whitespace-nowrap transition-colors duration-150
          {activeSection === item.id
          ? 'border-b-teal-600 text-slate-50'
          : 'border-b-transparent text-slate-400 hover:text-slate-300'}"
        onclick={() => scrollTo(item.id)}
        type="button"
      >
        {item.label}
      </button>
    {/each}
  </div>
</nav>

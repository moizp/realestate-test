<script lang="ts">
  type NavItem = { id: string; label: string; depth: number };

  type Props = {
    activeSection: string;
  };

  let { activeSection }: Props = $props();

  const navItems: NavItem[] = [
    { id: 'intro', label: 'Introduction', depth: 0 },
    { id: 'surfaces', label: 'The Two Surfaces', depth: 0 },
    { id: 'analysis', label: 'Analysis', depth: 0 },
    { id: 'architecture', label: 'Architecture', depth: 0 },
    { id: 'rendering', label: 'Rendering Strategy', depth: 1 },
    { id: 'migration', label: 'Migration Strategy', depth: 1 },
    { id: 'risks', label: 'Risks', depth: 1 },
    { id: 'conclusion', label: 'Conclusion', depth: 0 },
  ];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<!-- Desktop sidebar -->
<nav
  class="fixed top-0 left-0 hidden h-screen w-62 flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 lg:flex"
  style="z-index: 50;"
  aria-label="Page sections"
>
  <div class="border-b border-slate-800 px-6 pb-6 pt-8">
    <div class="mb-2 font-semibold tracking-widest uppercase text-teal-400">Contents</div>
  </div>

  <ul class="flex-1 list-none py-4 m-0">
    {#each navItems as item (item.id)}
      <li class="m-0">
        <button
          class="flex w-full cursor-pointer items-center gap-1.5 border-l-2 py-[0.45rem] text-left font-[inherit] leading-snug transition-colors duration-150
            {item.depth === 1 ? 'pl-8 text-slate-400' : 'pl-6 text-slate-300'}
            {activeSection === item.id
            ? 'border-l-teal-400 bg-teal-600/8 text-slate-50'
            : 'border-l-transparent hover:bg-slate-800 hover:text-slate-100'}"
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
  class="fixed top-0 right-0 left-0 border-b border-slate-800 bg-slate-900 lg:hidden"
  style="z-index: 50;"
  aria-label="Page sections"
>
  <div
    class="flex overflow-x-auto px-4 scrollbar-none [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
  >
    {#each navItems as item (item.id)}
      <button
        class="shrink-0 cursor-pointer border-b-2 px-3 py-[0.85rem] text-[0.75rem] whitespace-nowrap font-[inherit] transition-colors duration-150
          {activeSection === item.id
          ? 'border-b-teal-600 text-slate-50'
          : 'border-b-transparent text-slate-500 hover:text-slate-300'}"
        onclick={() => scrollTo(item.id)}
        type="button"
      >
        {item.label}
      </button>
    {/each}
  </div>
</nav>

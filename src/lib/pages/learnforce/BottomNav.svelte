<!-- src/lib/pages/learnforce/BottomNav.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { ExternalLink } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
  import { 
    activeNavItem, 
    isNavHovered, 
    hoveredNavItem,
    navItems 
  } from './learnforceStore';
  
  let isSmallScreen = false;
  let navElement: HTMLElement;
  let pillElement: HTMLElement;
  let activePillElement: HTMLElement;
  
  function handleItemHover(id: string) {
    hoveredNavItem.set(id);
    isNavHovered.set(true);
    updatePillPosition(id, pillElement);
  }
  
  function handleMouseLeave() {
    isNavHovered.set(false);
    let activeItem;
    activeNavItem.subscribe(value => activeItem = value)();
    updatePillPosition(activeItem, activePillElement);
  }
  
  function handleItemClick(id: string) {
    activeNavItem.set(id);
    hoveredNavItem.set(id);
    updatePillPosition(id, activePillElement);
    
    // Scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  function updatePillPosition(id: string, pillEl: HTMLElement) {
    if (!navElement || !pillEl) return;
    
    const items = navElement.querySelectorAll('.nav-item');
    const index = navItems.findIndex(item => item.id === id);
    
    if (index >= 0 && items[index]) {
      const item = items[index];
      const itemRect = item.getBoundingClientRect();
      const navRect = navElement.getBoundingClientRect();
      
      // Set the pill width and position
      pillEl.style.width = `${itemRect.width}px`;
      pillEl.style.left = `${itemRect.left - navRect.left}px`;
    }
  }
  
  function checkScreenSize() {
    isSmallScreen = window.innerWidth < 768;
  }
  
  onMount(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Initialize the active pill position
    let activeItem;
    activeNavItem.subscribe(value => activeItem = value)();
    
    setTimeout(() => {
      updatePillPosition(activeItem, activePillElement);
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  });
</script>

<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
  <div class="bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg px-2 py-1">
    <div class="relative flex items-center" bind:this={navElement}>
      {#each navItems as item}
        <a 
          href={item.anchor} 
          class="nav-item relative px-4 py-2 text-muted-foreground transition-colors rounded-full"
          class:text-foreground={$activeNavItem === item.id}
          on:mouseenter={() => handleItemHover(item.id)}
          on:click|preventDefault={() => handleItemClick(item.id)}
        >
          {isSmallScreen ? item.shortTitle : item.title}
        </a>
      {/each}
      
      <a 
        href="/explore" 
        class="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 py-2 flex items-center gap-2 transition-colors"
      >
        <span>Explore</span>
        <ExternalLink class="w-4 h-4" />
      </a>
      
      <!-- Hover pill -->
      <div 
        class="absolute bottom-0 h-full bg-muted/50 rounded-full -z-10 transition-all duration-200" 
        bind:this={pillElement}
      ></div>
      
      <!-- Active pill -->
      <div 
        class="absolute bottom-0 h-full bg-muted rounded-full -z-20 transition-all duration-300" 
        bind:this={activePillElement}
      ></div>
    </div>
  </div>
</div>

<style>
  /* Ensure smooth transitions for pill */
  .nav-item {
    white-space: nowrap;
    text-align: center;
  }
</style>
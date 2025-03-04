<!-- src/lib/pages/learnforce/Nav.svelte -->

<script lang="ts">
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  
  // Products dropdown state
  let isProductsOpen = false;
  
  // Dark mode state - will be handled by mode-watcher
</script>

<nav class="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
  <!-- Logo -->
  <a href="/" class="text-4xl font-bold tracking-tight">Learnforce</a>
  
  <!-- Navigation Links -->
  <div class="hidden md:flex items-center space-x-10">
    <!-- Products Dropdown -->
    <div class="relative">
      <button 
        class="flex items-center text-lg font-medium"
        on:click={() => isProductsOpen = !isProductsOpen}
      >
        Products
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {#if isProductsOpen}
        <div 
          class="absolute left-0 mt-2 w-56 bg-background shadow-lg rounded-sm z-10"
          transition:fly={{ y: -5, duration: 200 }}
        >
          <div class="py-2 px-4">
            <a href="/products/learning-solutions" class="block py-2 text-muted-foreground hover:text-foreground">Learning solutions</a>
            <a href="/products/accelerator-apps" class="block py-2 text-muted-foreground hover:text-foreground">Accelerator Apps</a>
            <a href="/products/performance-programs" class="block py-2 text-muted-foreground hover:text-foreground">Performance Programs</a>
          </div>
        </div>
      {/if}
    </div>
    
    <a href="/customers" class="text-lg font-medium text-muted-foreground hover:text-foreground">Customers</a>
    <a href="/careers" class="text-lg font-medium text-muted-foreground hover:text-foreground">Careers</a>
    <a href="/about" class="text-lg font-medium text-muted-foreground hover:text-foreground">About</a>
  </div>
  
  <div class="flex items-center gap-4">
    <!-- Dark/Light Mode Toggle -->
    <button on:click={toggleMode} class="p-2 rounded-full hover:bg-muted">
      <Sun
        class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </button>
    
    <!-- CTA Button -->
    <a href="/book-demo" class="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground px-6 py-3 text-lg font-medium hover:bg-primary/90 transition-colors">
      Book Demo
    </a>
  </div>
</nav>
<!-- src/routes/(rnd)/learnforce/+page.svelte -->

<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Nav from '$lib/pages/learnforce/Nav.svelte';
  import Hero from '$lib/pages/learnforce/Hero.svelte';
  import BottomNav from '$lib/pages/learnforce/BottomNav.svelte';
  import Content from '$lib/pages/learnforce/Content.svelte';
</script>

<svelte:head>
  <title>Learnforce - Learning development with the right amount of tech</title>
</svelte:head>

<ModeWatcher />

<main class="min-h-screen font-serif relative">
  <Nav />
  <Hero />
  
  <!-- Featured image with aspect-video -->
  <div class="max-w-4xl mx-auto px-4 -mt-12 mb-16">
    <div class="relative aspect-video rounded-2xl overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0"></div>
      <img 
        src="/api/placeholder/1200/675" 
        alt="img"
        class="w-full h-full object-cover relative z-10 opacity-85"
      />
      <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent z-20">
        <!-- <p class="text-xl">Your people don't just need skills—they need the right opportunities to grow, adapt, and contribute at their best.</p> -->
      </div>
    </div>
  </div>
  
  <Content />
  <BottomNav />
</main>
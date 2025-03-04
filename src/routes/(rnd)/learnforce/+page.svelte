<!-- src/routes/(rnd)/learnforce/+page.svelte -->

<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Nav from '$lib/pages/learnforce/Nav.svelte';
  import Hero from '$lib/pages/learnforce/Hero.svelte';
</script>

<svelte:head>
  <title>Learnforce - Learning development with the right amount of tech</title>
</svelte:head>

<ModeWatcher />

<main class="min-h-screen font-sans">
  <Nav />
  <Hero />
</main>
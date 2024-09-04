<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Nav from '$lib/components/Nav.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { uiStore } from '$lib/stores/uiStore';

  $: isSidebarOpen = $uiStore.isSidebarOpen;
</script>

<ModeWatcher />

<div class="flex flex-col min-h-screen">
  <Nav />
  <div class="flex flex-1 overflow-hidden pt-16">
    {#if isSidebarOpen}
      <Sidebar />
    {/if}
    <main class="flex-1 overflow-y-auto p-4 md:p-8">
      <slot></slot>
    </main>
  </div>
</div>
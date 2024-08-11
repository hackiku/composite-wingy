<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Nav from '$lib/components/Nav.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<ModeWatcher />

<div class="flex min-h-screen">
  <Sidebar />
  <div class="flex-1 relative">
    <Nav />
    <main class="p-8">
      <slot></slot>
    </main>
  </div>
</div>
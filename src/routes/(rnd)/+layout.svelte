<!-- src/routes/(rnd)/+layout.svelte -->
<script lang="ts">
  import "../../app.css";
	import Nav from '$lib/pages/workout/components/Nav.svelte';
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />

<Nav />

<main class="max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
	<slot></slot>
</main>

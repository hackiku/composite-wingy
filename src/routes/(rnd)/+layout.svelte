<!-- src/routes/(rnd)/+layout.svelte -->
<script lang="ts">
  import "../../app.css";
	// import Nav from '$lib/pages/workout/components/Nav.svelte';
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />

<!-- <Nav /> -->


	<slot></slot>


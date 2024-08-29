<!-- src/routes/math/+page.svelte -->
<script lang="ts">
  import Micromechanics from "$lib/math/Micromechanics.svelte";
  import { materialStore, compositeMaterial, micromechanicalProperties } from "$lib/stores/materialStore";

  // Reactive declarations
  $: material = $materialStore;
  $: composite = $compositeMaterial;
  $: properties = $micromechanicalProperties;
</script>

<h1 class="text-3xl font-bold mb-8">Micromechanical Properties</h1>

<div class="mb-8">
  <p>Fiber: {composite.fiber}</p>
  <p>Matrix: {composite.matrix}</p>
  <p>Fiber Volume Fraction: {composite.Vf.toFixed(3)}</p>
  <p>Void Space: {composite.Vvoid.toFixed(3)}</p>
  <p>Composite Material: {composite.name}</p>
</div>

<Micromechanics />
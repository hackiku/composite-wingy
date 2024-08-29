<!-- src/routes/math/+page.svelte -->

<script lang="ts">
    import Micromechanics from '$lib/math/Micromechanics.svelte';
    import { fiberMaterial, matrixMaterial, fiberVolumeFraction, voidSpace } from '$lib/stores/materials';
</script>

<h1 class="text-3xl font-bold mb-8">Micromechanical Properties</h1>

<div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Current Material Configuration</h2>
    <p>Fiber: {$fiberMaterial}</p>
    <p>Matrix: {$matrixMaterial}</p>
    <p>Fiber Volume Fraction: {$fiberVolumeFraction.toFixed(3)}</p>
    <p>Void Space: {$voidSpace.toFixed(3)}</p>
</div>

<div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Properties Summary</h2>
    <div class="h-60 bg-gray-400 bg-opacity-20 flex items-center justify-center">
        <p class="text-gray-500">Properties Comparison Graph Placeholder</p>
    </div>
</div>

<Micromechanics />



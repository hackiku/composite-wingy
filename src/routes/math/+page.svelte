<!-- src/routes/math/+page.svelte -->

<script lang="ts">
    import Micromechanics from '$lib/math/Micromechanics.svelte';
    import { materialStore, compositeMaterial, micromechanicalProperties, setFiber, setMatrix, setVf, setVvoid } from '$lib/stores/materialStore';
    import { fibers, matrices } from '$lib/data/materials';

    // Reactive declarations
    $: material = $materialStore;
    $: composite = $compositeMaterial;
    $: properties = $micromechanicalProperties;
</script>

<h1 class="text-3xl font-bold mb-8">Micromechanical Properties</h1>

<div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Current Material Configuration</h2>
    <p>Fiber: {composite.fiber}</p>
    <p>Matrix: {composite.matrix}</p>
    <p>Fiber Volume Fraction: {composite.Vf.toFixed(3)}</p>
    <p>Void Space: {composite.Vvoid.toFixed(3)}</p>
</div>

<div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Material Selection</h2>
    <label>
        Fiber:
        <select bind:value={material.fiber} on:change={() => setFiber(material.fiber)}>
            {#each Object.keys(fibers) as fiber}
                <option value={fiber}>{fiber}</option>
            {/each}
        </select>
    </label>

    <label>
        Matrix:
        <select bind:value={material.matrix} on:change={() => setMatrix(material.matrix)}>
            {#each Object.keys(matrices) as matrix}
                <option value={matrix}>{matrix}</option>
            {/each}
        </select>
    </label>

    <label>
        Fiber Volume Fraction:
        <input type="range" bind:value={material.Vf} min="0" max="1" step="0.01" on:input={() => setVf(material.Vf)}>
        {material.Vf.toFixed(2)}
    </label>

    <label>
        Void Space:
        <input type="range" bind:value={material.Vvoid} min="0" max="0.3" step="0.001 on:input={() => setVvoid(material.Vvoid)}">
        {material.Vvoid.toFixed(3)}
    </label>
</div>

<div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Properties Summary</h2>
    <div class="h-60 bg-gray-400 bg-opacity-20 flex items-center justify-center">
        <p class="text-gray-500">Properties Comparison Graph Placeholder</p>
    </div>
</div>


<Micromechanics />
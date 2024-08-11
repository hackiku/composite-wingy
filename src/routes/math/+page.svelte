<!-- src/routes/math/+page.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { micromechProperties, calculateProperty, type MaterialProperties, type CalculationResult } from '$lib/math/micromechanics';

  // Material selection
  let fiberMaterial = 'T-300';
  let matrixMaterial = '3501-6';
  let fiberVolumeFraction = 0.55;
  let voidSpace = 0.025;

  // Material data
  const materials: { [key: string]: MaterialProperties } = {
    'T-300': { E1f: 230, E2f: 15, G12f: 15, ni12f: 0.2, Em: 0, Gm: 0, nim: 0 },
    'AS-4': { E1f: 225, E2f: 15, G12f: 15, ni12f: 0.2, Em: 0, Gm: 0, nim: 0 },
    'IM7': { E1f: 290, E2f: 21, G12f: 14, ni12f: 0.2, Em: 0, Gm: 0, nim: 0 },
    '3501-6': { E1f: 0, E2f: 0, G12f: 0, ni12f: 0, Em: 4.2, Gm: 1.567, nim: 0.34 },
    '977-3': { E1f: 0, E2f: 0, G12f: 0, ni12f: 0, Em: 3.7, Gm: 1.37, nim: 0.35 },
    'PEEK': { E1f: 0, E2f: 0, G12f: 0, ni12f: 0, Em: 3.7, Gm: 4.65, nim: 0.35 }
  };

  let results: { [key: string]: CalculationResult[] } = {};

  function calculateProperties() {
    const f = materials[fiberMaterial];
    const m = materials[matrixMaterial];
    const Vm = 1 - fiberVolumeFraction - voidSpace;

    for (const property in micromechProperties) {
      results[property] = calculateProperty(property, f, m, fiberVolumeFraction, Vm);
    }
  }
</script>

<h1 class="text-3xl font-bold mb-8">Micromechanical Properties</h1>

<div class="grid grid-cols-2 gap-4 mb-4">
  <div>
    <Label for="fiber">Fiber material</Label>
    <Select.Root bind:value={fiberMaterial}>
      <Select.Trigger class="w-full">
        <Select.Value placeholder="Select fiber" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="T-300">T-300</Select.Item>
        <Select.Item value="AS-4">AS-4</Select.Item>
        <Select.Item value="IM7">IM7</Select.Item>
      </Select.Content>
    </Select.Root>
  </div>

  <div>
    <Label for="matrix">Matrix material</Label>
    <Select.Root bind:value={matrixMaterial}>
      <Select.Trigger class="w-full">
        <Select.Value placeholder="Select matrix" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="3501-6">3501-6</Select.Item>
        <Select.Item value="977-3">977-3</Select.Item>
        <Select.Item value="PEEK">PEEK</Select.Item>
      </Select.Content>
    </Select.Root>
  </div>

  <div>
    <Label for="fvf">Fiber volume fraction: {fiberVolumeFraction.toFixed(2)}</Label>
    <Input
      type="range"
      id="fvf"
      bind:value={fiberVolumeFraction}
      min="0"
      max="1"
      step="0.01"
    />
  </div>

  <div>
    <Label for="void">Void space: {voidSpace.toFixed(3)}</Label>
    <Input
      type="range"
      id="void"
      bind:value={voidSpace}
      min="0"
      max="0.3"
      step="0.001"
    />
  </div>
</div>

<Button on:click={calculateProperties} class="w-full mb-4">Calculate Properties</Button>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each Object.entries(results) as [property, calculations]}
    <div class="border p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-2">{micromechProperties[property].name} ({micromechProperties[property].unit})</h2>
      <div class="space-y-2">
        {#each calculations as calc}
          <div>
            <Label>{calc.theory}</Label>
            <Input type="number" value={calc.value.toFixed(4)} readonly />
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

{#if Object.keys(results).length === 0}
  <p class="text-center text-gray-500 mt-4">Click "Calculate Properties" to see results</p>
{/if}
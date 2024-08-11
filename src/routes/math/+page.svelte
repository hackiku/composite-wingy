<!-- src/routes/math/+page.svelte -->

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';

  // Placeholder for material properties
  let fiberMaterial = 'T-300';
  let matrixMaterial = '3501-6';
  let fiberVolumeFraction = 0.55;
  let voidSpace = 0.025;

  // Placeholder for calculated properties
  let E1 = 0;
  let E2 = 0;
  let G12 = 0;
  let nu12 = 0;

  function calculateProperties() {
    // Placeholder for calculation logic
    console.log('Calculating properties...');
    // Here we'll implement the actual calculations later
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

<div class="grid grid-cols-2 gap-4">
  <div>
    <Label for="E1">E1 (GPa)</Label>
    <Input type="number" id="E1" bind:value={E1} readonly />
  </div>
  <div>
    <Label for="E2">E2 (GPa)</Label>
    <Input type="number" id="E2" bind:value={E2} readonly />
  </div>
  <div>
    <Label for="G12">G12 (GPa)</Label>
    <Input type="number" id="G12" bind:value={G12} readonly />
  </div>
  <div>
    <Label for="nu12">nu12</Label>
    <Input type="number" id="nu12" bind:value={nu12} readonly />
  </div>
</div>
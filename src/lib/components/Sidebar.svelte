<!-- $lib/components/Sidebar.svelte -->

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Plane, Settings, Calculator } from 'lucide-svelte';
  import { Label } from "$lib/components/ui/label";
  import * as Select from "$lib/components/ui/select";
  import { selectedAircraft } from '$lib/stores/aircraft';
  import { fiberMaterial, matrixMaterial, fiberVolumeFraction, voidSpace } from '$lib/stores/materials';
  import { aircraftPresets } from '$lib/data/aircraft-presets';
  import { fibers, matrices } from '$lib/data/materials';

  // Local variables to bind to stores
  let localSelectedAircraft;
  let localFiberMaterial;
  let localMatrixMaterial;
  let localFiberVolumeFraction;
  let localVoidSpace;

  // Subscribe to stores
  selectedAircraft.subscribe(value => localSelectedAircraft = value);
  fiberMaterial.subscribe(value => localFiberMaterial = value);
  matrixMaterial.subscribe(value => localMatrixMaterial = value);
  fiberVolumeFraction.subscribe(value => localFiberVolumeFraction = value);
  voidSpace.subscribe(value => localVoidSpace = value);

  // Functions to update stores
  function updateSelectedAircraft(value: string) {
    selectedAircraft.set(value);
  }

  function updateFiberMaterial(value: string) {
    fiberMaterial.set(value);
  }

  function updateMatrixMaterial(value: string) {
    matrixMaterial.set(value);
  }

  function updateFiberVolumeFraction(value: number) {
    fiberVolumeFraction.set(value);
  }

  function updateVoidSpace(value: number) {
    voidSpace.set(value);
  }
</script>

<aside class="w-64 p-4 border-r">
  <h2 class="text-lg font-semibold mb-4 flex items-center">
    <Plane class="mr-2 h-5 w-5" />
    Composite Wingy
  </h2>
  
  <div class="space-y-4">
    <div>
      <Label for="aircraft">Aircraft</Label>
      <Select.Root value={localSelectedAircraft} onValueChange={updateSelectedAircraft}>
        <Select.Trigger class="w-full">
          <Select.Value placeholder={localSelectedAircraft} />
        </Select.Trigger>
        <Select.Content>
          {#each Object.keys(aircraftPresets) as aircraft}
            <Select.Item value={aircraft}>{aircraftPresets[aircraft].specs.name}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <div>
      <Label for="fiber">Fiber material</Label>
      <Select.Root value={localFiberMaterial} onValueChange={updateFiberMaterial}>
        <Select.Trigger class="w-full">
          <Select.Value placeholder={localFiberMaterial} />
        </Select.Trigger>
        <Select.Content>
          {#each Object.keys(fibers) as fiber}
            <Select.Item value={fiber}>{fiber}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <div>
      <Label for="matrix">Matrix material</Label>
      <Select.Root value={localMatrixMaterial} onValueChange={updateMatrixMaterial}>
        <Select.Trigger class="w-full">
          <Select.Value placeholder={localMatrixMaterial} />
        </Select.Trigger>
        <Select.Content>
          {#each Object.keys(matrices) as matrix}
            <Select.Item value={matrix}>{matrix}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <div>
      <Label for="fvf">Fiber volume fraction: {localFiberVolumeFraction.toFixed(2)}</Label>
      <input
        type="range"
        id="fvf"
        value={localFiberVolumeFraction}
        on:input={(e) => updateFiberVolumeFraction(parseFloat(e.currentTarget.value))}
        min="0"
        max="1"
        step="0.01"
        class="w-full"
      />
    </div>

    <div>
      <Label for="void">Void space: {localVoidSpace.toFixed(3)}</Label>
      <input
        type="range"
        id="void"
        value={localVoidSpace}
        on:input={(e) => updateVoidSpace(parseFloat(e.currentTarget.value))}
        min="0"
        max="0.3"
        step="0.001"
        class="w-full"
      />
    </div>

    <Button class="w-full">
      <Calculator class="mr-2 h-4 w-4" />
      Calculate Properties
    </Button>

    <Button variant="outline" class="w-full">
      <Settings class="mr-2 h-4 w-4" />
      Export to Femap
    </Button>
  </div>
</aside>
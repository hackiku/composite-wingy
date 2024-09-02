<!-- $lib/components/Sidebar.svelte -->

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Plane, Settings, Calculator } from 'lucide-svelte';
  import { Label } from "$lib/components/ui/label";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Slider } from "$lib/components/ui/slider";

  import * as Select from "$lib/components/ui/select";
  import { selectedAircraft } from '$lib/stores/aircraft';
  // data
	import { aircraftPresets } from '$lib/data/aircraft-presets';
  import { fibers, matrices } from '$lib/data/materials';
  // stores
	import { materialStore, setFiber, setMatrix, setVf, setVvoid } from '$lib/stores/materialStore';
	import { uiStore } from '$lib/stores/uiStore';

  // Use $store syntax for auto-subscribing
  $: material = $materialStore;

  // Create selected objects for Select components
  $: selectedAircraftObj = { value: $selectedAircraft, label: aircraftPresets[$selectedAircraft].specs.name };
  $: selectedFiberObj = { value: material.fiber, label: material.fiber };
  $: selectedMatrixObj = { value: material.matrix, label: material.matrix };

  function updateSelectedAircraft(selected: { value: string, label: string }) {
    selectedAircraft.set(selected.value);
  }

  function updateFiberMaterial(selected: { value: string, label: string }) {
    setFiber(selected.value);
  }

  function updateMatrixMaterial(selected: { value: string, label: string }) {
    setMatrix(selected.value);
  }
</script>

<aside class="w-64 h-screen overflow-hidden">
  <div class="fixed w-64 h-full overflow-y-auto p-4 border-r">
    
		<h2 class="text-lg font-semibold mb-4 flex items-center">
      <Plane class="mr-2 h-5 w-5" />
       Wingy
    </h2>

    <div class="space-y-4">
      <div>
        <Label for="aircraft">Aircraft</Label>
        <Select.Root selected={selectedAircraftObj} onSelectedChange={updateSelectedAircraft}>
          <Select.Trigger class="w-full">
            <Select.Value placeholder="Select aircraft" />
          </Select.Trigger>
          <Select.Content>
            {#each Object.entries(aircraftPresets) as [key, aircraft]}
              <Select.Item value={key}>{aircraft.specs.name}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <div>
        <Label for="fiber">Fiber material</Label>
        <Select.Root selected={selectedFiberObj} onSelectedChange={updateFiberMaterial}>
          <Select.Trigger class="w-full">
            <Select.Value placeholder="Select fiber" />
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
        <Select.Root selected={selectedMatrixObj} onSelectedChange={updateMatrixMaterial}>
          <Select.Trigger class="w-full">
            <Select.Value placeholder="Select matrix" />
          </Select.Trigger>
          <Select.Content>
            {#each Object.keys(matrices) as matrix}
              <Select.Item value={matrix}>{matrix}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <div>
        <Label for="fvf">Fiber volume fraction: {material.Vf.toFixed(2)}</Label>
        <input
          type="range"
          id="fvf"
          bind:value={material.Vf}
          on:input={() => setVf(material.Vf)}
          min="0"
          max="1"
          step="0.01"
          class="w-full"
        />
      </div>

      <div>
        <Label for="void">Void space: {material.Vvoid.toFixed(3)}</Label>
				<input
          type="range"
          id="void"
          bind:value={material.Vvoid}
          on:input={() => setVvoid(material.Vvoid)}
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


		<div class="mt-4 border-t pt-4">
			<div class="flex items-center space-x-2">
				<Checkbox 
					id="show-graphs" 
					checked={$uiStore.showGraphs} 
					onCheckedChange={(checked) => uiStore.update(store => ({ ...store, showGraphs: checked }))}
				/>
				<Label for="show-graphs">Show graphs</Label>
			</div>
		</div>


  </div>
</aside>
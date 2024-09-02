<!-- src/routes/math/+page.svelte -->
<script lang="ts">
  import { materialStore, compositeMaterial, micromechanicalProperties } from "$lib/stores/materialStore";
  import { micromechProperties } from "$lib/math/micromechanics";
  import Katex from "$lib/math/Katex.svelte";
  import { Label } from "$lib/components/ui/label";
  import * as Select from "$lib/components/ui/select";
  import * as Resizable from "$lib/components/ui/resizable/index.js";
  import { writable } from "svelte/store";

  let selectedTheories = writable({});
  Object.keys(micromechProperties).forEach((prop) => {
    selectedTheories.update((theories) => ({
      ...theories,
      [prop]: Object.keys(micromechProperties[prop].formulas)[0],
    }));
  });

  $: material = $materialStore;
  $: composite = $compositeMaterial;
  $: properties = $micromechanicalProperties;

  function updateSelectedTheory(property: string, selected: { value: string, label: string }) {
    selectedTheories.update(theories => ({
      ...theories,
      [property]: selected.value
    }));
  }

  function chunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  $: propertyChunks = chunkArray(Object.entries(micromechProperties), 3);
</script>


<!-- <div class="h-[calc(100vh-300px)] w-full"> -->
<div class="h-[80vh] w-full">
  <Resizable.PaneGroup direction="vertical" class="h-full">
    {#each propertyChunks as chunk, chunkIndex}
      <Resizable.Pane minSize={20} defaultSize={100 / propertyChunks.length}>
        <Resizable.PaneGroup direction="horizontal" class="h-full">
          <Resizable.Pane defaultSize={50} class="border p-4 rounded-lg dark:bg-gray-950">
            {#if chunk[0]}
              {@const [property, details] = chunk[0]}
              
							<div class="mb-4 flex flex-row justify-between items-center">
              
								<h3 class="text-2xl font-semibold">{property}</h3> 
								<div class="text-3xl font-semibold">
                   {properties[property][$selectedTheories[property]].toFixed(3)}
                  <span class="font-normal opacity-55">[{details.unit}]</span>
                </div>

								<div class="">
									<!-- TOOLTIP INSTEAD <Label for={`${property}-model`}>Model</Label> -->
									<Select.Root 
										selected={{ value: $selectedTheories[property], label: $selectedTheories[property] }}
										onSelectedChange={(selected) => updateSelectedTheory(property, selected)}
									>
										<Select.Trigger class="w-full" id={`${property}-model`}>
											<Select.Value placeholder="Select model" />
										</Select.Trigger>
										<Select.Content>
											{#each Object.keys(details.formulas) as theory}
												<Select.Item value={theory}>{theory}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>
              </div>
              
              <!-- <h3 class="text-xl font-semibold mb-4">{details.name} ({property})</h3> -->
              <h3 class="text-xl font-semibold mb-4">{details.name}</h3>
              


              <div class="mb-4">
                <div class="overflow-x-auto">
                  <Katex math={details.formulas[$selectedTheories[property]].latex} displayMode={true} />
                </div>
              </div>
            {/if}
          </Resizable.Pane>
          {#if chunk.length > 1}
            <Resizable.Handle />
            <Resizable.Pane defaultSize={50}>
              <Resizable.PaneGroup direction="vertical">
                <Resizable.Pane defaultSize={50} class="border p-4 rounded-lg dark:bg-gray-950">
                  {#if chunk[1]}
                    {@const [property, details] = chunk[1]}
                    <div class="mb-2">
                      <div class="text-2xl font-bold">
                        {properties[property][$selectedTheories[property]].toFixed(3)}
                        <span class="font-normal opacity-55">[{details.unit}]</span>
                      </div>
                    </div>
                    
                    <h3 class="text-lg font-semibold mb-2">{details.name} ({property})</h3>
                    
                    <div class="mb-2">
                      <Label for={`${property}-model`}>Model</Label>
                      <Select.Root 
                        selected={{ value: $selectedTheories[property], label: $selectedTheories[property] }}
                        onSelectedChange={(selected) => updateSelectedTheory(property, selected)}
                      >
                        <Select.Trigger class="w-full" id={`${property}-model`}>
                          <Select.Value placeholder="Select model" />
                        </Select.Trigger>
                        <Select.Content>
                          {#each Object.keys(details.formulas) as theory}
                            <Select.Item value={theory}>{theory}</Select.Item>
                          {/each}
                        </Select.Content>
                      </Select.Root>
                    </div>

                    <div class="mb-2">
                      <div class="overflow-x-auto">
                        <Katex math={details.formulas[$selectedTheories[property]].latex} displayMode={true} />
                      </div>
                    </div>
                  {/if}
                </Resizable.Pane>
                {#if chunk.length > 2}
                  <Resizable.Handle />
                  <Resizable.Pane defaultSize={50} class="border p-4 rounded-lg dark:bg-gray-950">
                    {#if chunk[2]}
                      {@const [property, details] = chunk[2]}
                      <div class="mb-2">
                        <div class="text-2xl font-bold">
                          {properties[property][$selectedTheories[property]].toFixed(3)}
                          <span class="font-normal opacity-55">[{details.unit}]</span>
                        </div>
                      </div>
                      
                      <h3 class="text-lg font-semibold mb-2">{details.name} ({property})</h3>
                      
                      <div class="mb-2">
                        <Label for={`${property}-model`}>Model</Label>
                        <Select.Root 
                          selected={{ value: $selectedTheories[property], label: $selectedTheories[property] }}
                          onSelectedChange={(selected) => updateSelectedTheory(property, selected)}
                        >
                          <Select.Trigger class="w-full" id={`${property}-model`}>
                            <Select.Value placeholder="Select model" />
                          </Select.Trigger>
                          <Select.Content>
                            {#each Object.keys(details.formulas) as theory}
                              <Select.Item value={theory}>{theory}</Select.Item>
                            {/each}
                          </Select.Content>
                        </Select.Root>
                      </div>

                      <div class="mb-2">
                        <div class="overflow-x-auto">
                          <Katex math={details.formulas[$selectedTheories[property]].latex} displayMode={true} />
                        </div>
                      </div>
                    {/if}
                  </Resizable.Pane>
                {/if}
              </Resizable.PaneGroup>
            </Resizable.Pane>
          {/if}
        </Resizable.PaneGroup>
      </Resizable.Pane>
      {#if chunkIndex < propertyChunks.length - 1}
        <Resizable.Handle />
      {/if}
    {/each}
  </Resizable.PaneGroup>
</div>
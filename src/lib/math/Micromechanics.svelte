<!-- $lib/math/Micromechanics.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { materialStore, compositeMaterial, micromechanicalProperties } from "$lib/stores/materialStore";
  import { uiStore } from "$lib/stores/uiStore";
  import { micromechProperties } from "./micromechanics";
  import { Label } from "$lib/components/ui/label";
  import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
  import { writable } from "svelte/store";
  import * as Tabs from "$lib/components/ui/tabs";

	import Katex from "./Katex.svelte";
  import PropertiesChart from "./PropertiesChart.svelte";
  import SinglePropertyChart from "./PropertiesChart.svelte";

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

  function getRandomTheory(property) {
    const theories = Object.keys(micromechProperties[property].formulas);
    return theories[Math.floor(Math.random() * theories.length)];
  }

  $: selectedModelProperties = Object.keys(properties).reduce((acc, property) => {
    const randomTheory = getRandomTheory(property);
    acc[property] = { [randomTheory]: properties[property][randomTheory] };
    return acc;
  }, {});
</script>

<div class="space-y-8">
  <h2 class="text-2xl font-semibold mb-4">Properties Comparison</h2>

  <Tabs.Root value="all-models" class="w-full">
    <Tabs.List>
      <Tabs.Trigger value="all-models">All Models</Tabs.Trigger>
      <Tabs.Trigger value="selected-model">Selected Model</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="all-models">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <th class="border p-2">Property</th>
              {#each Object.keys(micromechProperties.E1.formulas) as theory}
                <th class="border p-2">{theory}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(micromechProperties) as [property, details]}
              <tr>
                <td class="border p-2">{property} ({details.unit})</td>
                {#each Object.keys(details.formulas) as theory}
                  <td class="border p-2">
                    {properties[property][theory].toFixed(3)}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <PropertiesChart {properties} />
    </Tabs.Content>
    <Tabs.Content value="selected-model">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <th class="border p-2">Property</th>
              <th class="border p-2">Value</th>
              <th class="border p-2">Theory</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(selectedModelProperties) as [property, value]}
              <tr>
                <td class="border p-2">{property} ({micromechProperties[property].unit})</td>
                <td class="border p-2">{Object.values(value)[0].toFixed(3)}</td>
                <td class="border p-2">{Object.keys(value)[0]}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <PropertiesChart properties={selectedModelProperties} />
    </Tabs.Content>
  </Tabs.Root>

  {#each Object.entries(micromechProperties) as [property, details]}
    <div class="border p-4 rounded-lg dark:bg-gray-950 flex flex-col md:flex-row gap-8 justify-between">
      
      <div class="flex flex-col">
				<div class="mb-4">
					<div class="text-3xl font-bold">
									{properties[property][$selectedTheories[property]].toFixed(3)}
						<span class="font-normal opacity-55">[{details.unit}] </span>
					</div>
				</div>
				
				<h3 class="text-xl font-semibold mb-4">{details.name} ({property})</h3>
				
				<div class="mb-2">
					<Label>Model</Label>
				</div>
				
				<RadioGroup
					class="flex flex-wrap gap-4 mb-4"
					value={$selectedTheories[property]}
					onValueChange={(value) =>
						selectedTheories.update((theories) => ({
							...theories,
							[property]: value,
						}))}
				>
					{#each Object.keys(details.formulas) as theory}
						<div class="flex items-center space-x-2">
							<RadioGroupItem value={theory} id={`${property}-${theory}`} />
							<Label for={`${property}-${theory}`}>{theory}</Label>
						</div>
					{/each}
				</RadioGroup>
				<div class="mb-4">
					<div class="overflow-x-auto">
						<Katex math={details.formulas[$selectedTheories[property]].latex} displayMode={true} />
					</div>
				</div>
			
			</div>

			{#if $uiStore.showGraphs}
				<div class="bg-gray-500 opacity-30 w-1/2 p-20">
					<p class="opacity-30">single property chart</p>
				</div>
			{/if}
    
		</div>
  {/each}
</div>
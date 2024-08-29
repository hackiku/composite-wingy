<!-- $lib/math/Micromechanics.svelte -->

<script lang="ts">
	import {
		materialStore,
		compositeMaterial,
		micromechanicalProperties,
	} from "$lib/stores/materialStore";
	import { Label } from "$lib/components/ui/label";
	import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
	import { micromechProperties } from "./micromechanics";
	import katex from "katex";
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

	function renderLatex(latex: string) {
		return katex.renderToString(latex, {
			throwOnError: false,
			displayMode: true,
			trust: true,
			strict: false,
			maxSize: 50,
			maxExpand: 1000,
		});
	}
</script>

<div class="space-y-8">
	{#each Object.entries(micromechProperties) as [property, details]}
		<div class="border p-4 rounded-lg">
			<h3 class="text-xl font-semibold mb-4">{details.name} ({property})</h3>

			<Label>Model</Label>
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
				<div class="text-2xl font-bold">
					{properties[property][$selectedTheories[property]].toFixed(3)}
					{details.unit}
				</div>
			</div>

			<div class="mb-4">
				<div class="overflow-x-none max-w-screen">
					{@html renderLatex(
						details.formulas[$selectedTheories[property]].latex,
					)}
				</div>
			</div>
		</div>
	{/each}
</div>

<div class="mt-8 overflow-x-auto">
	<h3 class="text-xl font-semibold mb-4">Summary of All Theories</h3>
	<table class="w-full border-collapse border">
		<thead>
			<tr>
				<th class="border p-2">Property</th>
				{#each Object.keys(micromechProperties["E1"].formulas) as theory}
					<th class="border p-2">{theory}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(micromechProperties) as [property, details]}
				<tr>
					<td class="border p-2">{property}</td>
					{#each Object.keys(details.formulas) as theory}
						<td class="border p-2">
							{properties[property][theory].toFixed(3)}
							{details.unit}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

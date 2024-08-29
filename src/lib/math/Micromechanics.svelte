<!-- $lib/math/Micromechanics.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { materialStore, compositeMaterial, micromechanicalProperties } from "$lib/stores/materialStore";
  import { micromechProperties } from "./micromechanics";
  import { Label } from "$lib/components/ui/label";
  import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
  import katex from "katex";
  import { writable } from "svelte/store";

  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

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

  $: if (properties && chart) {
    updateChart();
  }

  onMount(() => {
    createChart();
  });

  function createChart() {
    const ctx = chartCanvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Comparison of Micromechanical Properties'
          }
        }
      }
    });
    updateChart();
  }

  function updateChart() {
    const labels = Object.keys(micromechProperties);
    const datasets = Object.keys(micromechProperties.E1.formulas).map(theory => ({
      label: theory,
      data: labels.map(prop => properties[prop][theory]),
      backgroundColor: getRandomColor()
    }));

    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
  }

  function getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  }

    function renderLatex(latex: string) {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
      trust: true,
      strict: false,
      maxSize: 50,
      maxExpand: 10,
    });
  }

</script>

<div class="space-y-8">
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Properties Comparison</h2>
    <canvas bind:this={chartCanvas}></canvas>
  </div>

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
        <div class="overflow-x-auto">
          <!-- {@html renderLatex(details.formulas[$selectedTheories[property]].latex)} -->
          <!-- {@html renderLatex(details.formulas[$selectedTheories[property]].latex)} -->
	        <div>{@html renderLatex(details.formulas[$selectedTheories[property]].latex)}</div>

        </div>
      </div>
    </div>
  {/each}
</div>
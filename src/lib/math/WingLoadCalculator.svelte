<!-- $lib/math/WingLoadCalculator.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { ChartLine } from 'lucide-svelte';

  let mass = 5489; // kg
  let loadFactor = 10;
  let nodesBetweenRibs = 15;
  let numRibs = 12;
  let wingLength = 5643; // mm
  let numNodes = 20;
</script>

<div class="p-4 border rounded-lg">
  <h2 class="text-2xl font-semibold mb-4 flex items-center">
    <ChartLine class="mr-2 h-6 w-6" />
    Wing Load Calculation
  </h2>
  
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <Label for="mass">Mass of aircraft (kg)</Label>
      <Input type="number" id="mass" bind:value={mass} />
    </div>
    <div>
      <Label for="loadFactor">Load Factor</Label>
      <Input type="number" id="loadFactor" bind:value={loadFactor} />
    </div>
    <div>
      <Label for="nodesBetweenRibs">Nodes between Ribs</Label>
      <Input type="number" id="nodesBetweenRibs" bind:value={nodesBetweenRibs} />
    </div>
    <div>
      <Label for="numRibs">Number of Ribs</Label>
      <Input type="number" id="numRibs" bind:value={numRibs} />
    </div>
    <div>
      <Label for="wingLength">Wing Length (mm)</Label>
      <Input type="number" id="wingLength" bind:value={wingLength} />
    </div>
    <div>
      <Label for="numNodes">Number of Nodes for Force Calculation</Label>
      <Input type="number" id="numNodes" bind:value={numNodes} />
    </div>
  </div>
  
  <Button class="w-full">Calculate Load</Button>
  
  <div class="mt-4 grid grid-cols-2 gap-4">
    <div class="h-60 bg-gray-200 flex items-center justify-center">
      <p class="text-gray-500">Load Distribution Graph Placeholder</p>
    </div>
    <div class="h-60 bg-gray-200 flex items-center justify-center">
      <p class="text-gray-500">Concentrated Forces Graph Placeholder</p>
    </div>
  </div>
</div>
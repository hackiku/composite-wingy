<!-- $lib/cad/CADViewer.svelte -->

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Square } from 'lucide-svelte';

  let span = 5643; // mm
  let root = 2752; // mm
  let tip = 1297; // mm
  let frontSweep = 10.388; // degrees
  let ribIncrement = 20; // mm
</script>

<div class="p-4 border rounded-lg">
  <h2 class="text-2xl font-semibold mb-4 flex items-center">
    <Square class="mr-2 h-6 w-6" />
    CAD Model Viewer
  </h2>
  
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <Label for="span">Span (mm)</Label>
      <Input type="number" id="span" bind:value={span} />
    </div>
    <div>
      <Label for="root">Root (mm)</Label>
      <Input type="number" id="root" bind:value={root} />
    </div>
    <div>
      <Label for="tip">Tip (mm)</Label>
      <Input type="number" id="tip" bind:value={tip} />
    </div>
    <div>
      <Label for="frontSweep">Front Sweep (deg)</Label>
      <Input type="number" id="frontSweep" bind:value={frontSweep} />
    </div>
    <div>
      <Label for="ribIncrement">Rib Increment (mm)</Label>
      <Input type="number" id="ribIncrement" bind:value={ribIncrement} />
    </div>
  </div>
  
  <Button class="w-full">Update CAD Model</Button>
  
  <div class="mt-4 h-80 bg-gray-200 flex items-center justify-center">
    <p class="text-gray-500">3D Model Viewer Placeholder</p>
  </div>
</div>
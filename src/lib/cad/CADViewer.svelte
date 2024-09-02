<!-- $lib/cad/CADViewer.svelte -->

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Plane, AlignLeft, AlignRight, AlignJustify } from 'lucide-svelte';
  import { wingStore } from '$lib/stores/wingStore';
  import OnshapeModel from './OnshapeModel.svelte';
  import WingTable from './WingTable.svelte';

  let tablePosition: 'left' | 'right' | 'hidden' = 'right';
  let tableWidth = 2; // Width as a percentage

  function sendToOnshape() {
    console.log('Sending data to Onshape:', $wingStore);
    // Implement the actual Onshape API call here
  }
</script>

<div class="relative flex flex-col gap-4 p-4 border rounded-lg h-[80vh]">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-semibold flex items-center">
      <Plane class="mr-2 h-6 w-6" />
      Wing CAD Model
    </h2>
    <div class="flex space-x-2">
      <Button variant="outline" size="icon" on:click={() => tablePosition = 'left'}>
        <AlignLeft class="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" on:click={() => tablePosition = 'right'}>
        <AlignRight class="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" on:click={() => tablePosition = 'hidden'}>
        <AlignJustify class="h-4 w-4" />
      </Button>
    </div>
  </div>

  <div class="relative flex-grow">
    <div class="absolute inset-0">
      <OnshapeModel />
    </div>
    
    {#if tablePosition !== 'hidden'}
      <WingTable position={tablePosition} width={tableWidth} />
    {/if}
  </div>

  <div class="flex justify-center mt-4">
    <Button on:click={sendToOnshape}>Send to Onshape</Button>
  </div>
</div>
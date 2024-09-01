<!-- $lib/cad/CADViewer.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import * as Accordion from '$lib/components/ui/accordion';
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  // icons
  import { Plane, Edit, AlignLeft, AlignRight, AlignJustify } from 'lucide-svelte';
  // stores
  import { wingStore, setSpan, setRoot, setTip, setFrontSweep, setRibIncrement, resetCustomParams } from '$lib/stores/wingStore';
  import OnshapeModel from './OnshapeModel.svelte';

  $: ({ span, root, tip, frontSweep, ribIncrement } = $wingStore);

  $: wingData = [
    { property: 'Span', value: span, unit: 'mm' },
    { property: 'Root chord', value: root, unit: 'mm' },
    { property: 'Tip chord', value: tip, unit: 'mm' },
    { property: 'Front sweep', value: frontSweep, unit: '°' },
    { property: 'Rib increment', value: ribIncrement, unit: 'mm' },
  ];

  function updateCADModel() {
    console.log('Updating CAD model with new parameters:', { span, root, tip, frontSweep, ribIncrement });
  }

  let tablePosition: 'left' | 'right' | 'hidden' = 'right';
</script>

<div class="relative flex flex-col gap-4 p-4 border rounded-lg h-[80vh]">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-semibold flex items-center">
      <Plane class="mr-2 h-6 w-6" />
      CAD Model Viewer
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
      <div class="absolute {tablePosition === 'left' ? 'left-0' : 'right-0'} top-0 bottom-0 w-1/4 bg-background/80 backdrop-blur-sm z-10 p-2 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="text-xs">Property</TableHead>
              <TableHead class="text-xs">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each wingData as { property, value, unit }}
              <TableRow class="h-8">
                <TableCell class="text-xs">{property}</TableCell>
                <TableCell class="text-xs"><span class="text-red-600">{value !== undefined ? `${value} ${unit}` : 'Loading...'}</span></TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    {/if}
  </div>

  <Accordion.Root type="single" collapsible>
    <Accordion.Item value="edit-dimensions">
      <Accordion.Trigger class="w-full">
        <h2 class="text-xl font-semibold flex items-center">
          <Edit class="mr-2 h-5 w-5" />
          Edit wing dimensions
        </h2>
      </Accordion.Trigger>
      <Accordion.Content>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label for="span">Span (mm)</Label>
            <Input type="number" id="span" value={span} on:input={(e) => setSpan(+e.currentTarget.value)} />
          </div>
          <div>
            <Label for="root">Root (mm)</Label>
            <Input type="number" id="root" value={root} on:input={(e) => setRoot(+e.currentTarget.value)} />
          </div>
          <div>
            <Label for="tip">Tip (mm)</Label>
            <Input type="number" id="tip" value={tip} on:input={(e) => setTip(+e.currentTarget.value)} />
          </div>
          <div>
            <Label for="frontSweep">Front Sweep (deg)</Label>
            <Input type="number" id="frontSweep" value={frontSweep} on:input={(e) => setFrontSweep(+e.currentTarget.value)} />
          </div>
          <div>
            <Label for="ribIncrement">Rib Increment (mm)</Label>
            <Input type="number" id="ribIncrement" value={ribIncrement} on:input={(e) => setRibIncrement(+e.currentTarget.value)} />
          </div>
        </div>
        <div class="flex gap-2">
          <Button class="w-full" on:click={updateCADModel}>Update CAD Model</Button>
          <Button class="w-full" variant="outline" on:click={resetCustomParams}>Reset to Default</Button>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</div>

<style>
  :global(.text-xs) {
    font-size: clamp(0.65rem, 1.5vw, 0.75rem);
  }
</style>
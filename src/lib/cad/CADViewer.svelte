<!-- $lib/cad/CADViewer.svelte -->

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import * as Accordion from '$lib/components/ui/accordion';
  import { Plane, Edit } from 'lucide-svelte';
  import { wingStore, setSpan, setRoot, setTip, setFrontSweep, setRibIncrement, resetCustomParams } from '$lib/stores/wingStore';

  $: ({ span, root, tip, frontSweep, ribIncrement } = $wingStore);

  $: wingData = [
    { property: 'Span', value: span, unit: 'mm' },
    { property: 'Root chord', value: root, unit: 'mm' },
    { property: 'Tip chord', value: tip, unit: 'mm' },
    { property: 'Front sweep', value: frontSweep, unit: '°' },
    { property: 'Rib increment', value: ribIncrement, unit: 'mm' },
  ];

  function updateCADModel() {
    // This function would trigger the update of the 3D model
    console.log('Updating CAD model with new parameters:', { span, root, tip, frontSweep, ribIncrement });
  }
</script>

<div class="flex flex-col gap-4 p-4 border rounded-lg">
  
  <h2 class="text-2xl font-semibold flex items-center">
    <Plane class="mr-2 h-6 w-6" />
    CAD Model Viewer
  </h2>
  
  <div class="mt-4 flex flex-col lg:flex-row gap-4">
    <div class="w-full lg:w-1/3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each wingData as { property, value, unit }}
            <TableRow>
              <TableCell>{property}</TableCell>
              <TableCell>{value !== undefined ? `${value} ${unit}` : 'Loading...'}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </div>
    
    <div class="w-full lg:w-2/3 h-60 lg:h-80 bg-gray-200 flex items-center justify-center">
      <p class="text-gray-500">Threlte gltf from static</p>
    </div>
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
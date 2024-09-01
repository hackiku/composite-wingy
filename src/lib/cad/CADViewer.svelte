<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import * as Accordion from '$lib/components/ui/accordion';
  import { Plane, Edit } from 'lucide-svelte';

  let span = 5643; // mm
  let root = 2752; // mm
  let tip = 1297; // mm
  let frontSweep = 10.388; // degrees
  let ribIncrement = 20; // mm

  const wingData = [
    { property: 'Span', value: `${span} mm` },
    { property: 'Root chord', value: `${root} mm` },
    { property: 'Tip chord', value: `${tip} mm` },
    { property: 'Front sweep', value: `${frontSweep}°` },
    { property: 'Rib increment', value: `${ribIncrement} mm` },
  ];
</script>

<div class="flex flex-col gap-4 p-4 border rounded-lg">
  
  <h2 class="text-2xl font-semibold flex items-center">
    <Plane class="mr-2 h-6 w-6" />
    CAD Model Viewer
  </h2>
  
  <div class="mt-4 flex gap-4">
    <div class="w-1/3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each wingData as { property, value }}
            <TableRow>
              <TableCell>{property}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </div>
    
    <div class="w-2/3 h-80 bg-gray-200 flex items-center justify-center">
      <p class="text-gray-500">Threlte gltf from static</p>
    </div>
  </div>

  <Accordion.Root type="single" collapsible>
    <Accordion.Item value="edit-dimensions">
      <Accordion.Trigger class="w-full">
        <h2 class="text-2xl font-semibold flex items-center">
          <Edit class="mr-2 h-6 w-6" />
          Edit wing dimensions
        </h2>
      </Accordion.Trigger>
      <Accordion.Content>
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
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</div>
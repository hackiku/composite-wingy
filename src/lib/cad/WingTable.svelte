<!-- $lib/cad/WingTable.svelte -->

<script lang="ts">
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { MoreHorizontal, Save, X, Edit, RotateCcw } from 'lucide-svelte';
  import { wingStore, setSpan, setRoot, setTip, setFrontSweep, setRibIncrement, resetCustomParams } from '$lib/stores/wingStore';

  export let position: 'left' | 'right';
  export let width: number = 33; // Width as a percentage

  let editingAll = false;
  let tempValues = {
    span: 0,
    root: 0,
    tip: 0,
    frontSweep: 0,
    ribIncrement: 0
  };

  $: wingData = [
    { property: 'Span', value: $wingStore.span, unit: 'mm', min: 1000, max: 10000, setter: setSpan },
    { property: 'Root chord', value: $wingStore.root, unit: 'mm', min: 100, max: 5000, setter: setRoot },
    { property: 'Tip chord', value: $wingStore.tip, unit: 'mm', min: 50, max: 2000, setter: setTip },
    { property: 'Front sweep', value: $wingStore.frontSweep, unit: '°', min: 0, max: 45, setter: setFrontSweep },
    { property: 'Rib increment', value: $wingStore.ribIncrement, unit: 'mm', min: 10, max: 100, setter: setRibIncrement },
  ];

  function startEditingAll() {
    editingAll = true;
    tempValues = {
      span: $wingStore.span,
      root: $wingStore.root,
      tip: $wingStore.tip,
      frontSweep: $wingStore.frontSweep,
      ribIncrement: $wingStore.ribIncrement
    };
  }

  function saveAllEdits() {
    setSpan(tempValues.span);
    setRoot(tempValues.root);
    setTip(tempValues.tip);
    setFrontSweep(tempValues.frontSweep);
    setRibIncrement(tempValues.ribIncrement);
    editingAll = false;
  }

  function cancelAllEdits() {
    editingAll = false;
  }

  function isChanged(currentValue: number, propertyName: string): boolean {
    const initialValues = {
      span: 5643,
      root: 2752,
      tip: 1297,
      frontSweep: 10.388,
      ribIncrement: 20
    };
    return Math.abs(currentValue - initialValues[propertyName]) > 0.001;
  }

  function startEditing(property: string) {
    tempValues[property] = $wingStore[property];
    editingAll = true;
  }

  function resetToDefault(property: string) {
    const initialValues = {
      span: 5643,
      root: 2752,
      tip: 1297,
      frontSweep: 10.388,
      ribIncrement: 20
    };
    wingData.find(item => item.property.toLowerCase().replace(' ', '') === property).setter(initialValues[property]);
  }
</script>

<div class="absolute {position === 'left' ? 'left-0' : 'right-0'} top-0 bottom-0 w-[{width}%] bg-background/80 backdrop-blur-sm z-10 p-1 overflow-auto resize-x">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="text-xs py-2">Property</TableHead>
        <TableHead class="text-xs py-2">Value</TableHead>
        <TableHead class="text-xs py-2 w-10"></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each wingData as { property, value, unit, min, max, setter }}
        <TableRow class="h-10">
          <TableCell class="text-xs py-1">{property}</TableCell>
          <TableCell class="text-xs py-1">
            {#if editingAll && tempValues[property.toLowerCase().replace(' ', '')] !== undefined}
              <Input 
                type="number" 
                bind:value={tempValues[property.toLowerCase().replace(' ', '')]} 
                min={min} 
                max={max} 
                class="h-8 w-full"
              />
            {:else}
              <span class:text-red-600={isChanged(value, property.toLowerCase().replace(' ', ''))}>
                {value !== undefined ? `${value} ${unit}` : 'Loading...'}
              </span>
            {/if}
          </TableCell>
          <TableCell class="py-1 w-10">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild let:builder>
                <Button variant="ghost" size="icon" builders={[builder]} class="h-8 w-8">
                  <MoreHorizontal class="h-4 w-4" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item on:click={() => startEditing(property.toLowerCase().replace(' ', ''))}>
                  <Edit class="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item on:click={() => resetToDefault(property.toLowerCase().replace(' ', ''))}>
                  <RotateCcw class="mr-2 h-4 w-4" />
                  Reset to default
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
  <div class="flex justify-end mt-2">
    {#if editingAll}
      <Button on:click={saveAllEdits} variant="outline" size="sm" class="mr-2">
        <Save class="mr-2 h-4 w-4" />
        Save All
      </Button>
      <Button on:click={cancelAllEdits} variant="outline" size="sm">
        <X class="mr-2 h-4 w-4" />
        Cancel
      </Button>
    {:else}
      <Button on:click={startEditingAll} variant="outline" size="sm">Edit All</Button>
    {/if}
  </div>
</div>

<style>
  :global(.text-xs) {
    font-size: clamp(0.65rem, 1.5vw, 0.75rem);
  }
</style>
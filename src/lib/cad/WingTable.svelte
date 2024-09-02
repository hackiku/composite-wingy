<!-- $lib/cad/WingTable.svelte -->

<script lang="ts">
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { RotateCcw, Save, X, Edit } from 'lucide-svelte';
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
    Object.entries(tempValues).forEach(([key, value]) => {
      wingData.find(item => item.property.toLowerCase().replace(' ', '') === key).setter(value);
    });
    editingAll = false;
  }

  function cancelAllEdits() {
    editingAll = false;
  }

  function resetAllToDefault() {
    resetCustomParams();
    editingAll = false;
  }

  function resetToDefault(property: string) {
    const initialValues = {
      span: 5643,
      root: 2752,
      tip: 1297,
      frontSweep: 10.388,
      ribIncrement: 20
    };
    const key = property.toLowerCase().replace(' ', '');
    tempValues[key] = initialValues[key];
    if (!editingAll) {
      wingData.find(item => item.property.toLowerCase().replace(' ', '') === key).setter(initialValues[key]);
    }
  }

  function isChanged(currentValue: number, propertyName: string): boolean {
    const initialValues = {
      span: 5643, // TODO connect to stores
      root: 2752,
      tip: 1297,
      frontSweep: 10.388,
      ribIncrement: 20
    };
    return Math.abs(currentValue - initialValues[propertyName]) > 0.001;
  }
</script>

<div class="absolute {position === 'left' ? 'left-0' : 'right-0'} top-0 bottom-0 w-[{width}%] bg-background/80 backdrop-blur-sm z-10 p-1 overflow-auto resize-x">
  <Table>
    <TableHeader>
      <TableRow>
        {#if editingAll}
				<TableHead class="text-xs py-2">Dimension</TableHead>
        <TableHead class="text-xs py-2">Value</TableHead>
				<TableHead class="text-xs py-2">Reset</TableHead>
        {/if}
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each wingData as { property, value, unit, min, max }}
        <TableRow class="h-10">
          <TableCell class="text-xs py-1">{property}</TableCell>
          <TableCell class="text-xs py-1">
            {#if editingAll}
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
          {#if editingAll}
            <TableCell class="py-1">
              <Button variant="ghost" size="sm" on:click={() => resetToDefault(property)}>
                <RotateCcw class="h-4 w-4" />
              </Button>
            </TableCell>
          {/if}
        </TableRow>
      {/each}
    </TableBody>
  </Table>
  <div class="grid grid-cols-1 gap-2 mt-2">
    <Button on:click={resetAllToDefault} variant="outline" size="sm">
      <RotateCcw class="mr-2 h-4 w-4" />
      Reset All
    </Button>
    {#if editingAll}
      <Button on:click={saveAllEdits} variant="outline" size="sm">
        <Save class="mr-2 h-4 w-4" />
        Save All
      </Button>
      <Button on:click={cancelAllEdits} variant="outline" size="sm">
        <X class="mr-2 h-4 w-4" />
        Cancel
      </Button>
    {:else}
      <Button on:click={startEditingAll} variant="outline" size="sm" class="col-span-2">
        <Edit class="mr-2 h-4 w-4" />
        Edit All
      </Button>
    {/if}
  </div>
</div>

<style>
  :global(.text-xs) {
    font-size: clamp(0.65rem, 1.5vw, 0.75rem);
  }
</style>
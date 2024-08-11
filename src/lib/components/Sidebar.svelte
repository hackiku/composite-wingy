<!-- $lib/components/Sidebar.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Plane, Settings, Calculator } from 'lucide-svelte';
  import { Label } from "$lib/components/ui/label";
  import * as Select from "$lib/components/ui/select";

  let selectedAircraft = 'P-51';
  let fiberMaterial = 'T-300';
  let matrixMaterial = '3501-6';
  let fiberVolumeFraction = 0.55;
  let voidSpace = 0.025;
</script>

<aside class="w-64 p-4 border-r">
  <h2 class="text-lg font-semibold mb-4 flex items-center">
    <Plane class="mr-2 h-5 w-5" />
    Composite Wingy
  </h2>
  
  <div class="space-y-4">
    <div>
      <Label for="aircraft">Aircraft</Label>
      <Select.Root bind:value={selectedAircraft}>
        <Select.Trigger class="w-full">
          <Select.Value placeholder="Select aircraft" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="P-51">P-51</Select.Item>
          <Select.Item value="330-LT">330-LT</Select.Item>
          <Select.Item value="Glider">Glider</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>

    <div>
      <Label for="fiber">Fiber material</Label>
      <Select.Root bind:value={fiberMaterial}>
        <Select.Trigger class="w-full">
          <Select.Value placeholder="Select fiber" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="T-300">T-300</Select.Item>
          <Select.Item value="AS-4">AS-4</Select.Item>
          <Select.Item value="IM7">IM7</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>

    <div>
      <Label for="matrix">Matrix material</Label>
      <Select.Root bind:value={matrixMaterial}>
        <Select.Trigger class="w-full">
          <Select.Value placeholder="Select matrix" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="3501-6">3501-6</Select.Item>
          <Select.Item value="977-3">977-3</Select.Item>
          <Select.Item value="PEEK">PEEK</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>

    <div>
      <Label for="fvf">Fiber volume fraction: {fiberVolumeFraction.toFixed(2)}</Label>
      <input
        type="range"
        id="fvf"
        bind:value={fiberVolumeFraction}
        min="0"
        max="1"
        step="0.01"
        class="w-full"
      />
    </div>

    <div>
      <Label for="void">Void space: {voidSpace.toFixed(3)}</Label>
      <input
        type="range"
        id="void"
        bind:value={voidSpace}
        min="0"
        max="0.3"
        step="0.001"
        class="w-full"
      />
    </div>

    <Button class="w-full">
      <Calculator class="mr-2 h-4 w-4" />
      Calculate Properties
    </Button>

    <Button variant="outline" class="w-full">
      <Settings class="mr-2 h-4 w-4" />
      Export to Femap
    </Button>
  </div>
</aside>
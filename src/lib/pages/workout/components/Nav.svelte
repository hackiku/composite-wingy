<!-- src/lib/pages/workout/components/Nav.svelte -->
<script lang="ts">
  import { Hourglass } from 'lucide-svelte';
  import Timer from './Timer.svelte';
  import { Separator } from '$lib/components/ui/separator';
  
  export let activeSection: string;
  export let workoutName: string | undefined = undefined;
  export let onHomeClick: () => void;
  export let onGuideClick: () => void;
  export let onQuickStart: () => void;
</script>

<nav class="border-b border-gray-800 px-4 py-3 bg-gray-900/50 backdrop-blur-sm">
  <div class="container mx-auto flex items-center justify-between">
    <div class="flex items-center space-x-6">
      <div class="flex items-center space-x-2">
        <Hourglass class="w-6 h-6 text-indigo-400" />
        <span class="font-light tracking-tight text-gray-200">QuickieApp</span>
      </div>
      
      <Separator orientation="vertical" class="h-6" />
      
      <div class="flex items-center space-x-4">
        <button 
          class="text-sm font-light tracking-wide {activeSection === 'home' ? 'text-indigo-400' : 'text-gray-400 hover:text-gray-200'}"
          on:click={onHomeClick}
        >
          Start
        </button>
        <button 
          class="text-sm font-light tracking-wide {activeSection === 'guide' ? 'text-indigo-400' : 'text-gray-400 hover:text-gray-200'}"
          on:click={onGuideClick}
        >
          Guide
        </button>
      </div>
    </div>
    
    <div class="flex items-center space-x-4">
      {#if workoutName}
        <span class="text-gray-400 text-sm font-light">
          {workoutName}
        </span>
        <Separator orientation="vertical" class="h-6" />
      {/if}
      <Timer onClick={onQuickStart} />
    </div>
  </div>
</nav>
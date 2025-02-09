<!-- src/lib/pages/workout/components/Nav.svelte -->

<script lang="ts">
  export let activeSection: string;
  export let workoutName: string | undefined = undefined;
  export let onHomeClick: () => void;
  export let onGuideClick: () => void;
</script>

<nav class="bg-gray-800 border-b border-gray-700 px-4 py-3">
  <div class="container mx-auto flex items-center justify-between">
    <div class="flex items-center space-x-6">
      <button 
        class="text-sm font-medium {activeSection === 'home' ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}"
        on:click={onHomeClick}
      >
        Home
      </button>
      <button 
        class="text-sm font-medium {activeSection === 'guide' ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}"
        on:click={onGuideClick}
      >
        Guide
      </button>
    </div>
    
    <div class="flex items-center">
      {#if workoutName}
        <span class="text-gray-400 text-sm">
          {workoutName}
        </span>
      {/if}
    </div>
  </div>
</nav>
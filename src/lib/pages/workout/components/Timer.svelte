<!-- src/lib/pages/workout/components/Timer.svelte -->
<script lang="ts">
  import { Timer as TimerIcon } from 'lucide-svelte';
  import { HoverCard, HoverCardContent, HoverCardTrigger } from '$lib/components/ui/hover-card';
  
  export let minutes = 7;
  export let onClick = () => {};
</script>

<HoverCard>
  <HoverCardTrigger asChild>
    <button
      class="inline-flex items-center space-x-2 px-3 py-2 rounded-lg 
             hover:bg-gray-800/50 transition-colors duration-200"
      on:click={onClick}
    >
      <TimerIcon class="w-5 h-5 text-indigo-400" />
      <span class="font-mono text-lg text-gray-200">{minutes}:00</span>
    </button>
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="space-y-2">
      <h4 class="text-sm font-semibold">Quick Start Timer</h4>
      <p class="text-sm text-muted-foreground">
        Start a {minutes}-minute workout session with scientifically proven exercises.
      </p>
    </div>
  </HoverCardContent>
</HoverCard>
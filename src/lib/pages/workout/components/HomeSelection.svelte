<!-- src/lib/pages/workout/components/HomeSelection.svelte -->

<script lang="ts">
  export let workouts;
  export let onSelectWorkout;
</script>

<div class="container mx-auto px-4 py-8">
  <div class="text-center mb-8">
    <h1 class="text-5xl font-bold text-gray-100 mb-2">7-Minute Workout</h1>
    <p class="text-gray-400 text-lg">Choose your workout routine</p>
  </div>

  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each workouts as workout}
      <button
        class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-indigo-500 group"
        on:click={() => onSelectWorkout(workout)}
      >
        <h2 class="text-xl font-semibold mb-2 text-gray-100">{workout.name}</h2>
        <p class="text-gray-400">{workout.exercises.length} exercises</p>
        <div class="mt-4 text-indigo-400 group-hover:text-indigo-300 flex items-center justify-end">
          Start Workout 
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    {/each}
  </div>
</div>
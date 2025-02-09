<!-- src/lib/pages/workout/components/ExerciseGuide.svelte -->

<script lang="ts">
  export let workout;
  export let onStart;
  export let onBack;
</script>

<div class="container mx-auto px-4 py-8">
  <button 
    class="mb-4 text-gray-400 hover:text-gray-200 flex items-center group"
    on:click={onBack}
  >
    <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    Back
  </button>

  <h1 class="text-3xl font-bold mb-8 text-gray-100">{workout.name}</h1>

  <div class="space-y-4">
    {#each workout.exercises as exercise, index}
      <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div class="flex items-center mb-4">
          <span class="text-2xl font-bold text-indigo-400 mr-4">{(index + 1).toString().padStart(2, '0')}</span>
          <h3 class="text-xl font-semibold text-gray-100">
            {exercise.name}
          </h3>
        </div>
        <p class="text-gray-400 mb-2">{exercise.description}</p>
        <div class="flex items-center mt-4">
          <svg class="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-400">{exercise.duration} seconds</p>
        </div>
      </div>
    {/each}
  </div>

  <button
    class="mt-8 bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-500 transition-colors duration-300 font-semibold flex items-center justify-center w-full md:w-auto"
    on:click={onStart}
  >
    Start Workout
    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
</div>
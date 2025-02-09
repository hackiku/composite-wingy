<!-- src/lib/pages/workout/components/WorkoutDisplay.svelte -->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let workout;
  export let currentExerciseIndex;
  export let isPaused;
  export let onBack;

  let timeRemaining = workout.exercises[currentExerciseIndex].duration;
  let timer;

  function updateTimer() {
    if (!isPaused && timeRemaining > 0) {
      timeRemaining -= 1;
    } else if (timeRemaining === 0) {
      if (currentExerciseIndex < workout.exercises.length - 1) {
        currentExerciseIndex += 1;
        timeRemaining = workout.exercises[currentExerciseIndex].duration;
      } else {
        onBack(); // Workout complete
      }
    }
  }

  onMount(() => {
    timer = setInterval(updateTimer, 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
  });

  $: exercise = workout.exercises[currentExerciseIndex];
  $: nextExercise = workout.exercises[currentExerciseIndex + 1];
</script>

<div class="container mx-auto px-4 py-8">
  <div class="bg-gray-800 rounded-xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-700">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold mb-4 text-gray-100">{exercise.name}</h2>
      <div class="text-7xl font-bold text-indigo-400 mb-6 font-mono">
        {timeRemaining}
      </div>
      <p class="text-gray-400 text-lg">{exercise.description}</p>
    </div>

    {#if nextExercise}
      <div class="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-700">
        <h3 class="text-lg font-semibold text-gray-400 mb-2">Next Up:</h3>
        <p class="text-gray-100 text-xl">{nextExercise.name}</p>
      </div>
    {/if}

    <div class="mt-8 flex justify-center space-x-4">
      <button
        class="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-500 transition-colors duration-300 flex items-center"
        on:click={onBack}
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        End Workout
      </button>
    </div>
  </div>
</div>
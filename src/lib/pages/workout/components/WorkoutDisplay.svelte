<!-- src/lib/pages/workout/components/WorkoutDisplay.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { X, Timer } from 'lucide-svelte';
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import type { Workout } from '../data/workouts';

  export let workout: Workout;
  export let currentExerciseIndex: number;
  export let isPaused: boolean;
  export let onBack: () => void;

  let timeRemaining = workout.exercises[currentExerciseIndex].duration;
  let timer: number;
  let progress = 0;

  function updateTimer() {
    if (!isPaused && timeRemaining > 0) {
      timeRemaining -= 1;
      progress = ((workout.exercises[currentExerciseIndex].duration - timeRemaining) / 
                  workout.exercises[currentExerciseIndex].duration) * 100;
    } else if (timeRemaining === 0) {
      if (currentExerciseIndex < workout.exercises.length - 1) {
        currentExerciseIndex += 1;
        timeRemaining = workout.exercises[currentExerciseIndex].duration;
        progress = 0;
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
  $: totalProgress = (currentExerciseIndex / workout.exercises.length) * 100;
</script>

<div class="container mx-auto px-4 py-8">
  <Card class="max-w-2xl mx-auto bg-gray-900/50 border-gray-800 backdrop-blur-sm">
    <CardHeader>
      <Progress value={totalProgress} class="mb-4" />
      <div class="text-center">
        <CardTitle class="text-3xl font-extralight mb-2 text-gray-100">
          {exercise.name}
        </CardTitle>
        <CardDescription class="text-gray-400 font-light text-lg">
          {exercise.description}
        </CardDescription>
      </div>
    </CardHeader>

    <CardContent>
      <div class="text-center my-8">
        <div class="inline-flex items-center justify-center w-48 h-48 rounded-full 
                    border-4 border-indigo-500/20 relative">
          <Progress 
            value={progress} 
            class="absolute inset-0 w-48 h-48 -rotate-90"
            indicatorClass="stroke-indigo-500"
          />
          <div class="text-7xl font-light text-indigo-400 font-mono relative">
            {timeRemaining}
          </div>
        </div>
      </div>

      {#if nextExercise}
        <Card class="mt-8 bg-gray-950/50 border-gray-700">
          <CardHeader>
            <div class="flex items-center space-x-2 text-gray-400">
              <Timer class="w-4 h-4" />
              <span class="text-sm font-light">Up Next</span>
            </div>
            <CardTitle class="text-xl font-light text-gray-200">
              {nextExercise.name}
            </CardTitle>
          </CardHeader>
        </Card>
      {/if}

      <div class="mt-8 flex justify-center">
        <button
          class="bg-red-600/90 hover:bg-red-500 text-white px-8 py-3 rounded-xl 
                 transition-all duration-300 flex items-center space-x-2 font-light
                 hover:shadow-lg hover:shadow-red-500/20"
          on:click={onBack}
        >
          <X class="w-5 h-5" />
          <span>End Workout</span>
        </button>
      </div>
    </CardContent>
  </Card>
</div>
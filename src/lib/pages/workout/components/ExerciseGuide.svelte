<!-- src/lib/pages/workout/components/ExerciseGuide.svelte -->
<script lang="ts">
  import { ChevronLeft, Timer, ArrowRight } from 'lucide-svelte';
  import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import type { Workout } from '../data/workouts';
  
  export let workout: Workout;
  export let onStart: () => void;
  export let onBack: () => void;
</script>

<div class="container mx-auto px-4 py-8">
  <button 
    class="mb-6 text-gray-400 hover:text-gray-200 flex items-center group"
    on:click={onBack}
  >
    <ChevronLeft class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
    <span class="font-light">Back</span>
  </button>

  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-4xl font-extralight mb-3 text-gray-100 tracking-tight">{workout.name}</h1>
      <p class="text-gray-400 text-lg font-light">{workout.description}</p>
    </div>

    <div class="grid gap-4">
      {#each workout.exercises as exercise, index}
        <Card class="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader class="pb-3">
            <div class="flex items-center">
              <span class="text-2xl font-light text-indigo-400 mr-4 font-mono">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <h3 class="text-xl font-light text-gray-100">
                {exercise.name}
              </h3>
              {#if exercise.isPro}
                <Badge variant="premium" class="ml-auto bg-gradient-to-r from-amber-400 to-amber-600">
                  PRO
                </Badge>
              {/if}
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-gray-400 mb-3 font-light">{exercise.description}</p>
            <div class="flex items-center text-gray-400">
              <Timer class="w-4 h-4 mr-2 text-indigo-400" />
              <span class="font-light">{exercise.duration} seconds</span>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>

    <div class="mt-8 flex justify-end">
      <button
        class="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-500 
               transition-all duration-300 font-light flex items-center group
               hover:shadow-lg hover:shadow-indigo-500/20"
        on:click={onStart}
      >
        Start Workout
        <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</div>
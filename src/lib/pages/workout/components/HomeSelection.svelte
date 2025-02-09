<!-- src/lib/pages/workout/components/HomeSelection.svelte -->
<script lang="ts">
  import type { Workout } from '../data/workouts';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "$lib/components/ui/sheet";
  import { Flame, Crown, ChevronRight, Lock } from 'lucide-svelte';
  
  import CADViewer from '$lib/cad/CADViewer.svelte';
  import OnshapeModel from '$lib/cad/OnshapeModel.svelte';

  export let workouts: Workout[];
  export let onSelectWorkout: (workout: Workout) => void;
  
  let isUpgradeOpen = false;
</script>

<Sheet bind:open={isUpgradeOpen}>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-extralight text-gray-100 mb-3 tracking-tight">7-Minute Workout</h1>
      <p class="text-gray-400 text-lg font-light">Transform your day in just 7 minutes</p>
    </div>

    <div class="grid gap-6 _md:grid-cols-2 max-w-3xl mx-auto mb-16">
      {#each workouts as workout}
        <Card class="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden group">
          <CardHeader>
            <div class="flex justify-between items-start mb-2">
              <div class="space-y-1">
                <CardTitle class="text-xl font-light text-gray-100">
                  {workout.name}
                </CardTitle>
                <CardDescription class="text-gray-400">
                  {workout.description}
                </CardDescription>
              </div>
              {#if workout.isPro}
                <Badge variant="premium" class="bg-gradient-to-r from-amber-400 to-amber-600">
                  <Crown class="w-3 h-3 mr-1" /> PRO
                </Badge>
              {/if}
            </div>
          </CardHeader>
          <CardContent>
            <div class="flex items-center space-x-4 text-sm text-gray-400">
              <div class="flex items-center">
                <Flame class="w-4 h-4 mr-1 text-orange-400" />
                {workout.estimatedCalories} cal
              </div>
              <Badge variant="outline" class="border-gray-700">
                {workout.difficulty}
              </Badge>
            </div>
          </CardContent>
          <CardFooter class="border-t border-gray-800">
            <button
              class="w-full flex items-center justify-between py-2 text-indigo-400 
                     group-hover:text-indigo-300 transition-colors"
              on:click={() => workout.isPro ? isUpgradeOpen = true : onSelectWorkout(workout)}
            >
              <span class="font-light">
                {workout.isPro ? 'Unlock Workout' : 'Start Workout'}
              </span>
              {#if workout.isPro}
                <Lock class="w-4 h-4" />
              {:else}
                <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              {/if}
            </button>
          </CardFooter>
        </Card>
      {/each}
    </div>

    <!-- 3D Model Placeholder -->
    <div class="relative max-w-3xl mx-auto h-96 rounded-xl bg-gray-900/30 border border-gray-800 backdrop-blur-sm 
                flex items-center justify-center text-gray-500">
      <p class="absolute top-2 font-light">Don't mind me, just flexing some 3d</p>
			<!-- <CADViewer /> -->
			<OnshapeModel />
    </div>
  </div>

  <SheetContent position="right" size="sm">
    <SheetHeader>
      <SheetTitle>Upgrade to Pro</SheetTitle>
      <SheetDescription>
        Unlock advanced workouts and premium features
      </SheetDescription>
    </SheetHeader>
    
    <div class="grid gap-4 py-4">
      <Card class="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle class="text-xl font-light">Pro Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>• Access to advanced workout routines</li>
            <li>• Custom workout creation</li>
            <li>• Progress tracking</li>
            <li>• No ads</li>
          </ul>
        </CardContent>
      </Card>
      
      <button class="w-full bg-gradient-to-r from-amber-400 to-amber-600 
                     text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
        Upgrade Now
      </button>
    </div>
  </SheetContent>
</Sheet>
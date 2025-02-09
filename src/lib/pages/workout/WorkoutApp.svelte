<!-- src/lib/pages/workout/WorkoutApp.svelte -->

<script lang="ts">
  import { writable } from 'svelte/store';
  import HomeSelection from './components/HomeSelection.svelte';
  import ExerciseGuide from './components/ExerciseGuide.svelte';
  import WorkoutDisplay from './components/WorkoutDisplay.svelte';

  // Basic workout data structure
  type Exercise = {
    name: string;
    duration: number;
    description: string;
    image?: string;
  };

  const workouts = [
    {
      id: 'classic',
      name: 'Classic 7-Minute Workout',
      exercises: [
        { name: 'Jumping Jacks', duration: 30, description: 'Full body jumping exercise' },
        { name: 'Wall Sit', duration: 30, description: 'Lower body strength' },
        { name: 'Push-Ups', duration: 30, description: 'Upper body strength' },
        { name: 'Crunches', duration: 30, description: 'Core strength' },
        // Add more exercises as needed
      ]
    }
  ];

  const currentScreen = writable('home'); // home, guide, workout
  const selectedWorkout = writable(workouts[0]);
  const currentExerciseIndex = writable(0);
  const isWorkoutPaused = writable(false);

  function handleWorkoutSelect(workout) {
    selectedWorkout.set(workout);
    currentScreen.set('guide');
  }

  function handleStartWorkout() {
    currentScreen.set('workout');
    currentExerciseIndex.set(0);
    isWorkoutPaused.set(false);
  }

  function handleBackToHome() {
    currentScreen.set('home');
    currentExerciseIndex.set(0);
    isWorkoutPaused.set(false);
  }
</script>



<main class="min-h-screen bg-gray-950/60 text-gray-100 
				max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
  {#if $currentScreen === 'home'}
    <HomeSelection 
      {workouts} 
      onSelectWorkout={handleWorkoutSelect}
    />
  {:else if $currentScreen === 'guide'}
    <ExerciseGuide 
      workout={$selectedWorkout}
      onStart={handleStartWorkout}
      onBack={handleBackToHome}
    />
  {:else}
    <WorkoutDisplay
      workout={$selectedWorkout}
      currentExerciseIndex={$currentExerciseIndex}
      isPaused={$isWorkoutPaused}
      onBack={handleBackToHome}
    />
  {/if}
</main>
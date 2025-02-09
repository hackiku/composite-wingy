<!-- src/lib/pages/workout/WorkoutApp.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';
  import HomeSelection from './components/HomeSelection.svelte';
  import ExerciseGuide from './components/ExerciseGuide.svelte';
  import WorkoutDisplay from './components/WorkoutDisplay.svelte';
  import Nav from './components/Nav.svelte';
  import { workouts } from './data/workouts';
  import type { Workout } from './data/workouts';



  // Screen management
  type Screen = 'home' | 'guide' | 'workout';
  const currentScreen = writable<Screen>('home');
  const selectedWorkout = writable<Workout>(workouts[0]);
  const currentExerciseIndex = writable(0);
  const isWorkoutPaused = writable(false);

  // Navigation handlers
  function handleWorkoutSelect(workout: Workout) {
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

  function handleBackToGuide() {
    currentScreen.set('guide');
    currentExerciseIndex.set(0);
    isWorkoutPaused.set(false);
  }

  function handleQuickStart() {
    // Use the classic workout for quick start
    selectedWorkout.set(workouts[0]);
    currentScreen.set('workout');
    currentExerciseIndex.set(0);
    isWorkoutPaused.set(false);
  }

  // Reactive statements for Nav props
  $: navActiveSection = $currentScreen === 'workout' ? 'guide' : $currentScreen;
  $: navWorkoutName = $currentScreen !== 'home' ? $selectedWorkout.name : undefined;
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
  <Nav 
    activeSection={navActiveSection}
    workoutName={navWorkoutName}
    onHomeClick={handleBackToHome}
    onGuideClick={handleBackToGuide}
    onQuickStart={handleQuickStart}
  />

  <main class="max-w-[1920px] mx-auto">
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
        onBack={handleBackToGuide}
      />
    {/if}
  </main>
</div>
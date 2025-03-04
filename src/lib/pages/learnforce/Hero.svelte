<!-- src/lib/pages/learnforce/Hero.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  
  // Draggable selector state
  let isDragging = false;
  let startX = 0;
  let dividerPosition = 50; // Start in the middle (50%)
  let selectorContainer;
  let containerWidth = 0;
  
  // Handle mouse/touch events for dragging
  function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    
    // Add event listeners for drag and release
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
  }
  
  function handleMouseMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.clientX || e.touches[0].clientX;
    const deltaX = clientX - startX;
    
    // Calculate new position as percentage of container width
    const newPosition = Math.max(0, Math.min(100, dividerPosition + (deltaX / containerWidth * 100)));
    dividerPosition = newPosition;
    
    // Update start position for next move
    startX = clientX;
  }
  
  function handleMouseUp() {
    isDragging = false;
    
    // Remove event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchend', handleMouseUp);
  }
  
  onMount(() => {
    if (selectorContainer) {
      containerWidth = selectorContainer.offsetWidth;
      
      // Update container width on resize
      window.addEventListener('resize', () => {
        containerWidth = selectorContainer.offsetWidth;
      });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', () => {});
    };
  });
</script>

<div class="max-w-3xl mx-auto px-4 py-44">
  <!-- Interactive Headline with Draggable Selector -->
  <div 
    class="relative bg-muted inline-block px-8 py-4 text-6xl font-bold tracking-tight cursor-grab active:cursor-grabbing"
    bind:this={selectorContainer}
    on:mousedown={handleMouseDown}
    on:touchstart={handleMouseDown}
  >
    <!-- The full text -->
    <div class="relative overflow-hidden">
      <span>Learning development</span>
      
      <!-- Draggable Divider -->
      <div 
        class="absolute top-0 bottom-0 w-0.5 bg-foreground cursor-col-resize"
        style="left: {dividerPosition}%;"
      ></div>
      
      <!-- Highlight overlay for Learning -->
      <div 
        class="absolute top-0 bottom-0 bg-primary/20 pointer-events-none"
        style="left: 0; width: {dividerPosition}%;"
      ></div>
      
      <!-- Highlight overlay for development -->
      <div 
        class="absolute top-0 bottom-0 bg-secondary/20 pointer-events-none"
        style="left: {dividerPosition}%; width: {100 - dividerPosition}%;"
      ></div>
    </div>
  </div>
  
  <!-- Tagline -->
  <p class="text-2xl text-muted-foreground mt-8">With just the right amount of tech.</p>
</div>

<style>
  /* Prevent text selection during dragging */
  .cursor-grab, .cursor-grabbing {
    user-select: none;
  }
</style>
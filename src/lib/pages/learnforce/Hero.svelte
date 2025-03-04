<!-- src/lib/pages/learnforce/Hero.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    leftDividerPosition, 
    rightDividerPosition,
    isDragging,
    activeDivider,
    autoAnimating,
    animationDirection,
    animationSpeed,
    learningTags,
    developmentTags,
    learningOpacity,
    developmentOpacity
  } from './learnforceStore';
  
  let startX = 0;
  let selectorContainer;
  let containerWidth = 0;
  let animationFrame;
  
  // Handle mouse/touch events for dragging
  function handleMouseDown(e, divider) {
    // Stop auto-animation when user interacts
    stopAutoAnimation();
    
    isDragging.set(true);
    activeDivider.set(divider);
    startX = e.clientX || e.touches?.[0]?.clientX || 0;
    
    // Add event listeners for drag and release
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
  }
  
  function handleMouseMove(e) {
    let isDraggingValue;
    isDragging.subscribe(value => isDraggingValue = value)();
    if (!isDraggingValue) return;
    
    e.preventDefault();
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const deltaX = clientX - startX;
    const percentDelta = (deltaX / containerWidth) * 100;
    
    let activeDividerValue;
    let leftDividerValue;
    let rightDividerValue;
    
    activeDivider.subscribe(value => activeDividerValue = value)();
    leftDividerPosition.subscribe(value => leftDividerValue = value)();
    rightDividerPosition.subscribe(value => rightDividerValue = value)();
    
    if (activeDividerValue === 'left') {
      // Ensure left divider doesn't go beyond right divider
      const newPosition = Math.max(0, Math.min(rightDividerValue - 5, leftDividerValue + percentDelta));
      leftDividerPosition.set(newPosition);
    } else if (activeDividerValue === 'right') {
      // Ensure right divider doesn't go below left divider
      const newPosition = Math.max(leftDividerValue + 5, Math.min(100, rightDividerValue + percentDelta));
      rightDividerPosition.set(newPosition);
    }
    
    // Update start position for next move
    startX = clientX;
  }
  
  function handleMouseUp() {
    isDragging.set(false);
    activeDivider.set(null);
    
    // Remove event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchend', handleMouseUp);
  }
  
  function startAutoAnimation() {
    autoAnimating.set(true);
    
    function animate() {
      let autoAnimatingValue;
      let animationDirectionValue;
      let leftDividerValue;
      let rightDividerValue;
      let animationSpeedValue;
      
      autoAnimating.subscribe(value => autoAnimatingValue = value)();
      animationDirection.subscribe(value => animationDirectionValue = value)();
      leftDividerPosition.subscribe(value => leftDividerValue = value)();
      rightDividerPosition.subscribe(value => rightDividerValue = value)();
      animationSpeed.subscribe(value => animationSpeedValue = value)();
      
      if (!autoAnimatingValue) return;
      
      // Calculate the new position based on current direction
      if (animationDirectionValue === 1) {
        // Expanding
        rightDividerPosition.set(rightDividerValue + animationSpeedValue);
        if (rightDividerValue >= 80) {
          // Start contracting when reaches maximum
          animationDirection.set(-1);
        }
      } else {
        // Contracting
        leftDividerPosition.set(leftDividerValue + animationSpeedValue);
        if (leftDividerValue >= 40) {
          // Reset to starting positions when fully contracted
          leftDividerPosition.set(15);
          rightDividerPosition.set(65);
          animationDirection.set(1);
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  function stopAutoAnimation() {
    autoAnimating.set(false);
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  }
  
  onMount(() => {
    if (selectorContainer) {
      containerWidth = selectorContainer.offsetWidth;
      
      // Update container width on resize
      window.addEventListener('resize', () => {
        containerWidth = selectorContainer.offsetWidth;
      });
      
      // Start auto animation
      startAutoAnimation();
    }
    
    return () => {
      stopAutoAnimation();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', () => {});
    };
  });
</script>

<div class="max-w-3xl mx-auto px-4 py-24">
  <!-- Learning tags on the left -->
  <div class="absolute left-4 md:left-16 top-32 md:top-48 space-y-3 w-32 md:w-40">
    {#each learningTags as tag}
      <div 
        class="inline-block px-3 py-1 bg-primary/10 rounded-full text-sm font-medium {tag.class} transition-opacity duration-300"
        style="opacity: {$learningOpacity};"
      >
        {tag.text}
      </div>
    {/each}
  </div>
  
  <!-- Development tags on the right -->
  <div class="absolute right-4 md:right-16 top-32 md:top-48 space-y-3 w-32 md:w-40 text-right">
    {#each developmentTags as tag}
      <div 
        class="inline-block px-3 py-1 bg-secondary/10 rounded-full text-sm font-medium {tag.class} transition-opacity duration-300"
        style="opacity: {$developmentOpacity};"
      >
        {tag.text}
      </div>
    {/each}
  </div>
  
  <!-- Interactive Headline with Draggable Selectors -->
  <div 
    class="relative inline-block px-8 py-4 text-6xl font-bold tracking-tight"
    bind:this={selectorContainer}
  >
    <!-- The full text -->
    <div class="relative overflow-hidden">
      <span>Learning development</span>
      
      <!-- Left Draggable Divider -->
      <div 
        class="absolute top-0 bottom-0 w-0.5 bg-foreground cursor-col-resize"
        style="left: {$leftDividerPosition}%;"
        on:mousedown={(e) => handleMouseDown(e, 'left')}
        on:touchstart={(e) => handleMouseDown(e, 'left')}
      ></div>
      
      <!-- Right Draggable Divider -->
      <div 
        class="absolute top-0 bottom-0 w-0.5 bg-foreground cursor-col-resize"
        style="left: {$rightDividerPosition}%;"
        on:mousedown={(e) => handleMouseDown(e, 'right')}
        on:touchstart={(e) => handleMouseDown(e, 'right')}
      ></div>
      
      <!-- Left section -->
      <div 
        class="absolute top-0 bottom-0 pointer-events-none"
        style="left: 0; width: {$leftDividerPosition}%;"
      ></div>
      
      <!-- Middle (highlighted) section -->
      <div 
        class="absolute top-0 bottom-0 bg-secondary/30 pointer-events-none"
        style="left: {$leftDividerPosition}%; width: {$rightDividerPosition - $leftDividerPosition}%;"
      ></div>
      
      <!-- Right section -->
      <div 
        class="absolute top-0 bottom-0 pointer-events-none"
        style="left: {$rightDividerPosition}%; width: {100 - $rightDividerPosition}%;"
      ></div>
      
      <!-- Drag handles (easier to grab) -->
      <div 
        class="absolute top-0 bottom-0 w-6 cursor-col-resize flex items-center justify-center"
        style="left: calc({$leftDividerPosition}% - 12px);"
        on:mousedown={(e) => handleMouseDown(e, 'left')}
        on:touchstart={(e) => handleMouseDown(e, 'left')}
      >
        <div class="h-6 w-1 bg-foreground rounded-full"></div>
      </div>
      
      <div 
        class="absolute top-0 bottom-0 w-6 cursor-col-resize flex items-center justify-center"
        style="left: calc({$rightDividerPosition}% - 12px);"
        on:mousedown={(e) => handleMouseDown(e, 'right')}
        on:touchstart={(e) => handleMouseDown(e, 'right')}
      >
        <div class="h-6 w-1 bg-foreground rounded-full"></div>
      </div>
    </div>
  </div>
  
  <!-- Tagline -->
  <p class="text-2xl text-muted-foreground mt-8">Powered by science, passion, and just the right amount of tech.</p>
</div>

<style>
  /* Prevent text selection during dragging */
  .cursor-col-resize {
    user-select: none;
  }
</style>
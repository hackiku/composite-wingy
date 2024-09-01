<!-- $lib/cad/OnshapeModel.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte';
</script>

<div class="w-full h-full">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
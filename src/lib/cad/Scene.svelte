<!-- $lib/cad/Scene.svelte -->

<script lang="ts">
	import { T } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
	import Ribs from './models/Ribs.svelte';

  const cameraPosition = { x: 10, y: 5, z: 10 };
</script>

<T.PerspectiveCamera
  makeDefault
  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
  fov={55}
>
  <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position={[5, 10, 7]} castShadow />
<T.AmbientLight intensity={0.2} />

<Grid 
  position.y={-0.001} 
  cellColor="#cccccc" 
  sectionColor="#ffffff" 
  sectionThickness={1}
  fadeDistance={20}
  cellSize={1}
  sectionSize={5}
/>

<Ribs />
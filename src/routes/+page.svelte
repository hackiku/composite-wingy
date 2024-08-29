<!-- src/routes/+page.svelte -->

<script lang="ts">
	import WingLoadCalculator from '$lib/math/WingLoadCalculator.svelte';
  import CADViewer from '$lib/cad/CADViewer.svelte';
	// import Micromechanics from '$lib/math/Micromechanics.svelte';
</script>

<main class="p-8 space-y-12">
  <h1 class="text-3xl font-bold mb-8">Composite Wingy</h1>

  <!-- <Micromechanics /> -->


  <section>
    <h2 class="text-2xl font-semibold mb-4">1️⃣ Aircraft & Wing</h2>
    <CADViewer />
  </section>

  <section>
    <h2 class="text-2xl font-semibold mb-4">2️⃣ Wing Load Calculation</h2>
    <WingLoadCalculator />
  </section>

  <section>
    <h2 class="text-2xl font-semibold mb-4">3️⃣ Composite Materials Properties</h2>
    <!-- <Micromechanics /> -->
  </section>

  <section>
    <h2 class="text-2xl font-semibold mb-4">4️⃣ Failure Criteria</h2>
    <p>Failure criteria analysis will be implemented here.</p>
  </section>
</main>
<!-- $lib/components/Katex.svelte -->
<script lang="ts">
  import katex from "katex";
  import "katex/dist/katex.min.css";

  export let math: string;
  export let displayMode = false;
  
  const options = {
    displayMode,
    throwOnError: false
  };
  
  $: katexString = katex.renderToString(math, options);
</script>

{@html katexString}
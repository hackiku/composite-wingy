<!-- lib/math/SinglePropertyChart.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { micromechProperties, type MaterialProperties } from "./micromechanics";

  export let property: string;
  export let fiber: MaterialProperties;
  export let matrix: MaterialProperties;
  export let currentVf: number;

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  $: theories = micromechProperties[property].formulas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      createChart(ctx);
    }
    return () => {
      if (chart) chart.destroy();
    };
  });

  function createChart(ctx: CanvasRenderingContext2D) {
    const vfValues = Array.from({ length: 101 }, (_, i) => i / 100);
    const datasets = Object.entries(theories).map(([name, theory]) => ({
      label: name,
      data: vfValues.map(vf => theory.formula(fiber, matrix, vf, 1 - vf)),
      borderColor: getRandomColor(),
      fill: false
    }));

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: vfValues,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `${property} vs. Fiber Volume Fraction`
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(3) + ' ' + micromechProperties[property].unit;
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fiber Volume Fraction (Vf)'
            }
          },
          y: {
            title: {
              display: true,
              text: `${property} (${micromechProperties[property].unit})`
            }
          }
        }
      }
    });

    // Add vertical line for current Vf
    addCurrentVfLine();
  }

  function addCurrentVfLine() {
    if (chart) {
      chart.options.plugins.annotation = {
        annotations: {
          line1: {
            type: 'line',
            xMin: currentVf,
            xMax: currentVf,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          }
        }
      };
      chart.update();
    }
  }

  function getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  }

  $: if (chart && currentVf) {
    addCurrentVfLine();
  }
</script>

<div class="chart-container" style="position: relative; height:300px; width:100%">
  <canvas bind:this={canvas}></canvas>
</div>
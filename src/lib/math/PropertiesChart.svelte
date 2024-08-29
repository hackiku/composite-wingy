<!-- $lib/components/PropertiesChart.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { micromechProperties } from "$lib/math/micromechanics";

  export let properties: Record<string, Record<string, number>>;

  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

  Chart.register(ChartDataLabels);

  onMount(() => {
    createChart();
    return () => {
      if (chart) chart.destroy();
    };
  });

  $: if (chart && properties) {
    updateChart();
  }

  function createChart() {
    const ctx = chartCanvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Comparison of Micromechanical Properties'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.x !== null) {
                  label += context.parsed.x.toFixed(3) + ' ' + micromechProperties[context.label].unit;
                }
                return label;
              }
            }
          },
          datalabels: {
            anchor: 'end',
            align: 'right',
            formatter: (value, context) => {
              return value.toFixed(3) + ' ' + micromechProperties[context.chart.data.labels[context.dataIndex]].unit;
            },
            color: '#000',
            font: {
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Value'
            }
          },
          x2: {
            type: 'linear',
            position: 'top',
            title: {
              display: true,
              text: 'Poisson\'s Ratio'
            },
            grid: {
              drawOnChartArea: false
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
    updateChart();
  }

  function updateChart() {
    const labels = Object.keys(micromechProperties);
    const datasets = Object.keys(micromechProperties.E1.formulas).map(theory => ({
      label: theory,
      data: labels.map(prop => properties[prop][theory]),
      backgroundColor: getRandomColor(),
      xAxisID: (prop) => prop.startsWith('nu') ? 'x2' : 'x'
    }));

    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
  }

  function getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  }
</script>

<canvas bind:this={chartCanvas}></canvas>
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
    if (Object.keys(properties).length > 0) {
      createChart();
    }
    return () => {
      if (chart) chart.destroy();
    };
  });

  $: if (chart && properties && Object.keys(properties).length > 0) {
    updateChart();
  }

  function getAxisRanges(data) {
    let maxGPa = 0;
    let maxUnitless = 0;

    Object.entries(data).forEach(([prop, values]) => {
      const max = Math.max(...Object.values(values));
      if (micromechProperties[prop].unit === 'GPa') {
        maxGPa = Math.max(maxGPa, max);
      } else {
        maxUnitless = Math.max(maxUnitless, max);
      }
    });

    return {
      gpaMax: Math.ceil(maxGPa * 1.1), // Add 10% margin
      unitlessMax: Math.min(Math.ceil(maxUnitless * 1.1), 1) // Add 10% margin, but cap at 1 for Poisson's ratio
    };
  }

  function createChart() {
    const ctx = chartCanvas.getContext('2d');
    const { gpaMax, unitlessMax } = getAxisRanges(properties);

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
                  label += context.parsed.x.toFixed(3) + ' ' + (micromechProperties[context.label]?.unit || '');
                }
                return label;
              }
            }
          },
          datalabels: {
            anchor: 'end',
            align: 'right',
            formatter: (value, context) => {
              const property = context.chart.data.labels[context.dataIndex];
              const theory = context.dataset.label;
              const unit = micromechProperties[property]?.unit || '';
              return value !== undefined ? `${value.toFixed(3)} ${unit} (${theory})` : '';
            },
            color: '#000',
            font: {
              size: 10,
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
            },
            min: 0,
            max: gpaMax,
            ticks: {
              callback: (value) => value + (value > unitlessMax ? ' GPa' : '')
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
    if (!chart || Object.keys(properties).length === 0) return;

    const labels = Object.keys(properties);
    const datasets = Object.keys(properties[labels[0]] || {}).map(theory => ({
      label: theory,
      data: labels.map(prop => properties[prop]?.[theory]),
      backgroundColor: getRandomColor(),
    }));

    const { gpaMax, unitlessMax } = getAxisRanges(properties);

    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.options.scales.x.max = Math.max(gpaMax, unitlessMax);
    chart.update();
  }

  function getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  }
</script>

<canvas bind:this={chartCanvas}></canvas>
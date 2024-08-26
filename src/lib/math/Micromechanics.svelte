<!-- $lib/math/Micromechanics.svelte -->

<script lang="ts">
    import { fiberMaterial, matrixMaterial, fiberVolumeFraction, voidSpace } from '$lib/stores/materials';
    import { Button } from '$lib/components/ui/button';
    import { Label } from "$lib/components/ui/label";
    import * as Select from "$lib/components/ui/select";
    import { micromechProperties, calculateProperty, type MaterialProperties } from './micromechanics';
    import katex from 'katex';

    // You'll need to import or define these somewhere
    import { fibers, matrices } from '$lib/data/materials';

    let selectedTheories = {};
    Object.keys(micromechProperties).forEach(prop => {
        selectedTheories[prop] = Object.keys(micromechProperties[prop].formulas)[0];
    });

    $: Vm = 1 - $fiberVolumeFraction - $voidSpace;
    $: fiberProps = fibers[$fiberMaterial];
    $: matrixProps = matrices[$matrixMaterial];

    function renderLatex(latex: string) {
        return katex.renderToString(latex, {
            throwOnError: false,
            displayMode: true
        });
    }
</script>

<div class="space-y-8">
    {#each Object.entries(micromechProperties) as [property, details]}
        <div class="border p-4 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">{details.name} ({property})</h3>
            
            <Label for={`${property}-theory`}>Select Theory</Label>
            <Select.Root 
                value={selectedTheories[property]} 
                onValueChange={(value) => selectedTheories[property] = value}
            >
                <Select.Trigger class="w-full mb-4">
                    <Select.Value placeholder="Select theory" />
                </Select.Trigger>
                <Select.Content>
                    {#each Object.keys(details.formulas) as theory}
                        <Select.Item value={theory}>{theory}</Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>

            <div class="mb-4">
                <Label>Result</Label>
                <div class="text-2xl font-bold">
                    {calculateProperty(property, selectedTheories[property], fiberProps, matrixProps, $fiberVolumeFraction, Vm).toFixed(3)} {details.unit}
                </div>
            </div>

            <div class="mb-4">
                <Label>LaTeX Formula</Label>
                <div class="p-2 rounded">
                    {@html renderLatex(details.formulas[selectedTheories[property]].latex)}
                </div>
            </div>

            <div>
                <Label>Description</Label>
                <p>{details.formulas[selectedTheories[property]].description}</p>
            </div>
        </div>
    {/each}
</div>
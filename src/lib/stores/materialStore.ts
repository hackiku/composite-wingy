// src/lib/stores/materialStore.ts
import { writable, derived } from "svelte/store";
import { fibers, matrices } from "$lib/data/materials";
import {
  micromechProperties,
  calculateProperty,
} from "$lib/math/micromechanics";

export const fiberMaterial = writable("T-300");
export const matrixMaterial = writable("3501-6");
export const fiberVolumeFraction = writable(0.55);
export const voidSpace = writable(0.025);

export const compositeMaterial = derived(
  [fiberMaterial, matrixMaterial, fiberVolumeFraction, voidSpace],
  ([$fiberMaterial, $matrixMaterial, $fiberVolumeFraction, $voidSpace]) => {
    return {
      name: `${$fiberMaterial}/${$matrixMaterial}, Vf=${$fiberVolumeFraction.toFixed(2)}`,
      fiber: $fiberMaterial,
      matrix: $matrixMaterial,
      Vf: $fiberVolumeFraction,
      Vvoid: $voidSpace,
      Vm: 1 - $fiberVolumeFraction - $voidSpace,
      fiberProperties: fibers[$fiberMaterial],
      matrixProperties: matrices[$matrixMaterial],
    };
  },
);

export const micromechanicalProperties = derived(
  compositeMaterial,
  ($compositeMaterial) => {
    const f = $compositeMaterial.fiberProperties;
    const m = $compositeMaterial.matrixProperties;
    const results = {};

    for (const property in micromechProperties) {
      results[property] = {};
      for (const theory in micromechProperties[property].formulas) {
        results[property][theory] = calculateProperty(
          property,
          theory,
          f,
          m,
          $compositeMaterial.Vf,
          $compositeMaterial.Vm,
        );
      }
    }

    return results;
  },
);

export const materialStore = derived(
  [compositeMaterial, micromechanicalProperties],
  ([$compositeMaterial, $micromechanicalProperties]) => ({
    composite: $compositeMaterial,
    properties: $micromechanicalProperties,
  }),
);

// src/lib/stores/materialStore.ts

import { writable, derived } from "svelte/store";
import { fibers, matrices } from "$lib/data/materials";
import {
  micromechProperties,
  calculateProperty,
} from "$lib/math/micromechanics";

// Create writable stores for the base material properties
export const fiberMaterial = writable("T-300");
export const matrixMaterial = writable("3501-6");
export const fiberVolumeFraction = writable(0.55);
export const voidSpace = writable(0.025);

// Derive the composite material properties
export const compositeMaterial = derived(
  [fiberMaterial, matrixMaterial, fiberVolumeFraction, voidSpace],
  ([$fiberMaterial, $matrixMaterial, $fiberVolumeFraction, $voidSpace]) => {
    const Vm = 1 - $fiberVolumeFraction - $voidSpace;
    return {
      name: `${$fiberMaterial}/${$matrixMaterial}, Vf=${$fiberVolumeFraction.toFixed(2)}`,
      fiber: $fiberMaterial,
      matrix: $matrixMaterial,
      Vf: $fiberVolumeFraction,
      Vvoid: $voidSpace,
      Vm,
      fiberProperties: fibers[$fiberMaterial],
      matrixProperties: matrices[$matrixMaterial],
    };
  },
);

// Derive the micromechanical properties
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

// Create a combined materialStore
export const materialStore = derived(
  [fiberMaterial, matrixMaterial, fiberVolumeFraction, voidSpace],
  ([$fiberMaterial, $matrixMaterial, $fiberVolumeFraction, $voidSpace]) => ({
    fiber: $fiberMaterial,
    matrix: $matrixMaterial,
    Vf: $fiberVolumeFraction,
    Vvoid: $voidSpace,
  }),
);

// Helper functions to update the stores
export const setFiber = (fiber: string) => fiberMaterial.set(fiber);
export const setMatrix = (matrix: string) => matrixMaterial.set(matrix);
export const setVf = (Vf: number) => fiberVolumeFraction.set(Vf);
export const setVvoid = (Vvoid: number) => voidSpace.set(Vvoid);

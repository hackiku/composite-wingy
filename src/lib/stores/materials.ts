// src/lib/stores/materials.ts

import { writable, derived } from 'svelte/store';
import { fibers, matrices } from '$lib/data/materials';
import { micromechProperties, calculateProperty } from '$lib/math/micromechanics';

export const fiberMaterial = writable('T-300');
export const matrixMaterial = writable('3501-6');
export const fiberVolumeFraction = writable(0.55);
export const voidSpace = writable(0.025);

export const compositeMaterial = derived(
	[fiberMaterial, matrixMaterial, fiberVolumeFraction, voidSpace],
	([$fiberMaterial, $matrixMaterial, $fiberVolumeFraction, $voidSpace]) => {
		return {
			fiber: $fiberMaterial,
			matrix: $matrixMaterial,
			Vf: $fiberVolumeFraction,
			Vvoid: $voidSpace,
			Vm: 1 - $fiberVolumeFraction - $voidSpace
		};
	}
);

export const micromechanicalProperties = derived(
	compositeMaterial,
	($compositeMaterial) => {
		const f = fibers[$compositeMaterial.fiber];
		const m = matrices[$compositeMaterial.matrix];
		const results = {};

		for (const property in micromechProperties) {
			results[property] = calculateProperty(property, f, m, $compositeMaterial.Vf, $compositeMaterial.Vm);
		}

		return results;
	}
);

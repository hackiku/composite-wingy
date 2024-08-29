// src/lib/stores/compositeMaterial.ts
import { writable } from 'svelte/store';
import { fibers, matrices } from '$lib/data/materials';

export interface CalculatedProperty {
	value: number;
	selectedTheory: string;
}

export interface CompositeMaterial {
	name: string;
	fiber: string;
	matrix: string;
	Vf: number;
	Vvoid: number;
	Vm: number;
	fiberProperties: any;  // Replace 'any' with a proper type from your materials data
	matrixProperties: any; // Replace 'any' with a proper type from your materials data
	calculatedProperties: {
		E1: CalculatedProperty;
		E2: CalculatedProperty;
		// Add other properties as needed
	};
}

const defaultMaterial: CompositeMaterial = {
	name: 'T-300/3501-6, Vf=0.55',
	fiber: 'T-300',
	matrix: '3501-6',
	Vf: 0.55,
	Vvoid: 0.025,
	Vm: 0.425,
	fiberProperties: fibers['T-300'],
	matrixProperties: matrices['3501-6'],
	calculatedProperties: {
		E1: { value: 0, selectedTheory: 'ROM' },
		E2: { value: 0, selectedTheory: 'Chamis' },
		// Initialize other properties as needed
	}
};

export const compositeMaterial = writable<CompositeMaterial>(defaultMaterial);

export function updateCompositeMaterial(key: string, value: any) {
	compositeMaterial.update(cm => {
		const updatedCm = { ...cm, [key]: value };
		if (key === 'fiber') {
			updatedCm.fiberProperties = fibers[value];
		} else if (key === 'matrix') {
			updatedCm.matrixProperties = matrices[value];
		} else if (key === 'Vf' || key === 'Vvoid') {
			updatedCm.Vm = 1 - updatedCm.Vf - updatedCm.Vvoid;
		}
		updatedCm.name = `${updatedCm.fiber}/${updatedCm.matrix}, Vf=${updatedCm.Vf.toFixed(2)}`;
		return updatedCm;
	});
}

export function updateCalculatedProperty(property: string, value: number, theory: string) {
	compositeMaterial.update(cm => ({
		...cm,
		calculatedProperties: {
			...cm.calculatedProperties,
			[property]: { value, selectedTheory: theory }
		}
	}));
}
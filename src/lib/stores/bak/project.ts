// src/lib/stores/project.ts

import { derived } from 'svelte/store';
import { selectedAircraftTemplate } from './aircraftTemplate';
import { compositeMaterial } from './material';
import { wingGeometry } from './wingGeometry';

export const currentProject = derived(
	[selectedAircraftTemplate, compositeMaterial, wingGeometry],
	([$selectedAircraftTemplate, $compositeMaterial, $wingGeometry]) => {
		return {
			aircraftTemplate: $selectedAircraftTemplate,
			material: $compositeMaterial,
			wingGeometry: $wingGeometry,
		};
	}
);

// Add functions for exporting to STEP and generating FEMAP scripts here
// src/lib/stores/preset.ts

import { writable } from 'svelte/store';
import type { AircraftTemplate } from './aircraftTemplate';
import type { CompositeMaterial } from './material';
import type { WingGeometry } from './wingGeometry';

export interface Preset {
	id: string;
	name: string;
	aircraftTemplate: string;
	material: CompositeMaterial;
	wingGeometry: WingGeometry;
}

export const presets = writable<Preset[]>([
	// Add some default presets here
]);

export const selectedPreset = writable<string | null>(null);
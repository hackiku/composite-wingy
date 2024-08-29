// src/lib/stores/aircraftTemplate.ts

import { writable } from 'svelte/store';

export interface AircraftTemplate {
	id: string;
	name: string;
	manufacturer: string;
	// Add other basic aircraft properties here
}

export const aircraftTemplates = writable<AircraftTemplate[]>([
	{ id: 'p51', name: 'P-51 Mustang', manufacturer: 'North American Aviation' },
	{ id: '330lt', name: 'Extra 330 LT', manufacturer: 'Extra Aircraft' },
	// Add more aircraft templates
]);

export const selectedAircraftTemplate = writable<string | null>(null);
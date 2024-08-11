// src/lib/stores/aircraft.ts

import { writable, derived } from 'svelte/store';
import { aircraftPresets, type AircraftSpecs } from '$lib/data/aircraft-presets';

export const selectedAircraft = writable('P-51');

export const aircraftSpecs = derived<typeof selectedAircraft, AircraftSpecs>(
	selectedAircraft,
	$selectedAircraft => aircraftPresets[$selectedAircraft]
);
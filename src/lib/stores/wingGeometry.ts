// src/lib/stores/wingGeometry.ts

import { writable } from 'svelte/store';

export interface WingGeometry {
	span: number;
	rootChord: number;
	tipChord: number;
	sweepAngle: number;
	// Add other geometry parameters
}

const defaultGeometry: WingGeometry = {
	span: 10,
	rootChord: 2,
	tipChord: 1,
	sweepAngle: 15,
};

export const wingGeometry = writable<WingGeometry>(defaultGeometry);

// Add functions for Onshape integration here
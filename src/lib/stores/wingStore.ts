// src/lib/stores/wingStore.ts

import { writable, derived } from "svelte/store";
import { aircraftSpecs } from "./projectStore";
import type { WingGeometry } from "$lib/types/wing";

// Define the initial state for custom wing parameters
const initialCustomParams: Partial<WingGeometry> = {
	span: 5643, // mm
	root: 2752, // mm
	tip: 1297, // mm
	frontSweep: 10.388, // degrees
	ribIncrement: 20, // mm
};

// Create a writable store for custom wing parameters
export const customWingParams = writable<Partial<WingGeometry>>(initialCustomParams);

// Derive the wing geometry from aircraftSpecs
export const wingGeometry = derived<typeof aircraftSpecs, WingGeometry>(
	aircraftSpecs,
	($aircraftSpecs) => $aircraftSpecs.wing
);

// Combine default and custom wing parameters
export const wingStore = derived(
	[wingGeometry, customWingParams],
	([$wingGeometry, $customWingParams]) => ({
		...$wingGeometry,
		...$customWingParams,
	})
);

// Helper functions to update the custom wing parameters
export const setSpan = (span: number) => customWingParams.update(params => ({ ...params, span }));
export const setRoot = (root: number) => customWingParams.update(params => ({ ...params, root }));
export const setTip = (tip: number) => customWingParams.update(params => ({ ...params, tip }));
export const setFrontSweep = (frontSweep: number) => customWingParams.update(params => ({ ...params, frontSweep }));
export const setRibIncrement = (ribIncrement: number) => customWingParams.update(params => ({ ...params, ribIncrement }));

// Function to reset custom parameters to default
export const resetCustomParams = () => customWingParams.set(initialCustomParams);
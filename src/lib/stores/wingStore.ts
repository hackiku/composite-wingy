// src/lib/stores/wingStore.ts

import { writable, derived } from "svelte/store";
import { aircraftSpecs } from "./projectStore";

export const wingGeometry = derived(
  aircraftSpecs,
  ($aircraftSpecs) => $aircraftSpecs.wing,
);

export const customWingParams = writable({
  span: 0,
  chord: 0,
  sweepAngle: 0,
  // Add more custom parameters as needed
});

export const wingStore = derived(
  [wingGeometry, customWingParams],
  ([$wingGeometry, $customWingParams]) => ({
    ...$wingGeometry,
    ...$customWingParams,
  }),
);

// src/lib/stores/projectStore.ts

import { writable, derived } from "svelte/store";
import {
  aircraftPresets,
  type AircraftSpecs,
} from "$lib/data/aircraft-presets";

export const selectedAircraft = writable("P-51");

export const aircraftSpecs = derived<typeof selectedAircraft, AircraftSpecs>(
  selectedAircraft,
  ($selectedAircraft) => aircraftPresets[$selectedAircraft],
);

export const projectName = writable("My Composite Wing Project");

export const projectStore = derived(
  [selectedAircraft, aircraftSpecs, projectName],
  ([$selectedAircraft, $aircraftSpecs, $projectName]) => ({
    name: $projectName,
    selectedAircraft: $selectedAircraft,
    specs: $aircraftSpecs,
  }),
);

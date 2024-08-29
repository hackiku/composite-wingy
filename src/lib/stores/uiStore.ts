// src/lib/stores/uiStore.ts

import { writable } from 'svelte/store';

export const uiStore = writable({
	showGraphs: true,
	showDetailedMath: false,
});

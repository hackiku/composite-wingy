// src/lib/pages/learnforce/learnforceStore.ts
import { writable } from 'svelte/store';

// Hero Draggable Selector Store
export const leftDividerPosition = writable(15);
export const rightDividerPosition = writable(65);
export const isDragging = writable(false);
export const activeDivider = writable(null);
export const autoAnimating = writable(true);

// Animation settings
export const animationSpeed = writable(0.1); // Reduced from 0.2 to make it slower
export const animationDirection = writable(1);

// Bottom Nav Store
export const activeNavItem = writable('learning-solutions');
export const isNavHovered = writable(false);
export const hoveredNavItem = writable(null);

// Navigation items
export const navItems = [
	{
		id: 'learning-solutions',
		title: 'Learning Solutions',
		shortTitle: 'Learning',
		anchor: '#learning-solutions'
	},
	{
		id: 'accelerator-apps',
		title: 'Accelerator Apps',
		shortTitle: 'Apps',
		anchor: '#accelerator-apps'
	},
	{
		id: 'performance-programs',
		title: 'Performance Programs',
		shortTitle: 'Programs',
		anchor: '#performance-programs'
	}
];
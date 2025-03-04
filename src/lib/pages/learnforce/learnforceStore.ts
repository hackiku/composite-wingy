// src/lib/pages/learnforce/learnforceStore.ts
import { writable, derived } from 'svelte/store';

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

// Floating tags
export const learningTags = [
	{ text: "Skills", class: "rotate-6" },
	{ text: "Knowledge", class: "-rotate-3" },
	{ text: "Growth", class: "rotate-12" },
	{ text: "Training", class: "-rotate-6" },
	{ text: "Education", class: "rotate-2" },
	{ text: "Development", class: "-rotate-12" }
];

export const developmentTags = [
	{ text: "Capability", class: "-rotate-6" },
	{ text: "Potential", class: "rotate-3" },
	{ text: "Progress", class: "-rotate-12" },
	{ text: "Innovation", class: "rotate-6" },
	{ text: "Evolution", class: "-rotate-2" },
	{ text: "Advancement", class: "rotate-12" }
];

// Derived store for calculating tag opacities
export const learningOpacity = derived(leftDividerPosition, $leftDividerPosition => {
	// As leftDividerPosition increases, learning is less selected, so opacity decreases
	return Math.max(0.2, 1 - ($leftDividerPosition / 50));
});

export const developmentOpacity = derived(
	[leftDividerPosition, rightDividerPosition],
	([$leftDividerPosition, $rightDividerPosition]) => {
		// Development opacity is based on how much of it is selected
		const selectedPortion = (100 - $rightDividerPosition) / 50;
		return Math.max(0.2, selectedPortion);
	}
);
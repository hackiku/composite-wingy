// src/lib/calculations/micromechanics.ts

interface MaterialProperties {
	E1f: number;
	E2f: number;
	G12f: number;
	ni12f: number;
	Em: number;
	Gm: number;
	nim: number;
}

interface CalculationResult {
	value: number;
	theory: string;
}

type Formula = (f: MaterialProperties, m: MaterialProperties, Vf: number, Vm: number) => number;

interface PropertyCalculation {
	name: string;
	unit: string;
	formulas: {
		[key: string]: {
			formula: Formula;
			description: string;
		}
	}
}

const micromechProperties: { [key: string]: PropertyCalculation } = {
	E1: {
		name: "Young's longitudinal modulus",
		unit: "GPa",
		formulas: {
			ROM: {
				formula: (f, m, Vf, Vm) => f.E1f * Vf + m.Em * Vm,
				description: "Rule of Mixtures"
			},
			"Inverse ROM": {
				formula: (f, m, Vf, Vm) => 1 / (Vf / f.E1f + Vm / m.Em),
				description: "Inverse Rule of Mixtures"
			},
			"Halpin-Tsai": {
				formula: (f, m, Vf, Vm) => (f.E1f * m.Em) / (Vf * m.Em + Vm * f.E1f),
				description: "Halpin-Tsai equation"
			}
		}
	},
	E2: {
		name: "Young's transverse modulus",
		unit: "GPa",
		formulas: {
			ROM: {
				formula: (f, m, Vf, Vm) => (f.E2f * m.Em) / (Vf * m.Em + Vm * f.E2f),
				description: "Rule of Mixtures"
			},
			Chamis: {
				formula: (f, m, Vf, Vm) => m.Em / (1 - Math.sqrt(Vf) * (1 - m.Em / f.E2f)),
				description: "Chamis model"
			}
		}
	},
	// Add G12 and nu12 properties here...
};

function calculateProperty(property: string, f: MaterialProperties, m: MaterialProperties, Vf: number, Vm: number): CalculationResult[] {
	const calculations = micromechProperties[property];
	if (!calculations) {
		throw new Error(`Unknown property: ${property}`);
	}

	return Object.entries(calculations.formulas).map(([theory, { formula }]) => ({
		value: formula(f, m, Vf, Vm),
		theory
	}));
}

export { micromechProperties, calculateProperty, MaterialProperties, CalculationResult };
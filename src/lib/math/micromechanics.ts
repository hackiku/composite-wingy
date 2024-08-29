// $lib/math/micromechanics.ts

export interface MaterialProperties {
	E1f: number;
	E2f: number;
	G12f: number;
	ni12f: number;
	Em: number;
	Gm: number;
	nim: number;
}

export interface CalculationResult {
	value: number;
	theory: string;
}

type Formula = (f: MaterialProperties, m: MaterialProperties, Vf: number, Vm: number) => number;

export interface PropertyCalculation {
	name: string;
	unit: string;
	formulas: {
		[key: string]: {
			formula: Formula;
			latex: string;
			description: string;
		}
	}
}

export const micromechProperties: { [key: string]: PropertyCalculation } = {
	E1: {
		name: "Young's longitudinal modulus",
		unit: "GPa",
		formulas: {
			ROM: {
				formula: (f, m, Vf, Vm) => f.E1f * Vf + m.Em * Vm,
				latex: "E_1 = E_{1f}V_f + E_mV_m",
				description: "Rule of Mixtures"
			},
			"Inverse ROM": {
				formula: (f, m, Vf, Vm) => 1 / (Vf / f.E1f + Vm / m.Em),
				latex: "\\frac{1}{E_1} = \\frac{V_f}{E_{1f}} + \\frac{V_m}{E_m}",
				description: "Inverse Rule of Mixtures"
			},
			"Halpin-Tsai": {
				formula: (f, m, Vf, Vm) => (f.E1f * m.Em) / (Vf * m.Em + Vm * f.E1f),
				latex: "E_1 = \\frac{E_{1f} \\cdot E_m}{V_f \\cdot E_m + V_m \\cdot E_{1f}}",
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
				latex: "E_2 = \\frac{E_{2f} \\cdot E_m}{E_m \\cdot V_f + E_{2f} \\cdot V_m}",
				description: "Rule of Mixtures"
			},
			Chamis: {
				formula: (f, m, Vf, Vm) => m.Em / (1 - Math.sqrt(Vf) * (1 - m.Em / f.E2f)),
				latex: "E_2 = \\frac{E_m}{1 - \\sqrt{V_f} \\left( 1 - \\frac{E_m}{E_{2f}} \\right)}",
				description: "Chamis model"
			}
		}
	},
	// Add G12 and nu12 properties here...
};

export function calculateProperty(property: string, theory: string, f: MaterialProperties, m: MaterialProperties, Vf: number, Vm: number): number {
	const propertyCalc = micromechProperties[property];
	if (!propertyCalc) {
		throw new Error(`Unknown property: ${property}`);
	}
	const theoryCalc = propertyCalc.formulas[theory];
	if (!theoryCalc) {
		throw new Error(`Unknown theory for ${property}: ${theory}`);
	}
	return theoryCalc.formula(f, m, Vf, Vm);
}

export function calculateAllProperties(f: MaterialProperties, m: MaterialProperties, Vf: number, Vm: number): { [key: string]: { [key: string]: number } } {
	const results: { [key: string]: { [key: string]: number } } = {};
	for (const [property, details] of Object.entries(micromechProperties)) {
		results[property] = {};
		for (const theory of Object.keys(details.formulas)) {
			results[property][theory] = calculateProperty(property, theory, f, m, Vf, Vm);
		}
	}
	return results;
}
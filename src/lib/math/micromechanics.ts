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
			},
			"Hashin-Rosen": {
				formula: (f, m, Vf, Vm) => {
					const Kf = f.E1f / (2 * (1 - 2 * f.ni12f) * (1 + f.ni12f));
					const Km = m.Em / (2 * (1 - 2 * m.nim) * (1 + m.nim));
					const Gm = m.Gm;
					return f.E1f * Vf + m.Em * Vm + (4 * Kf * Km * Gm * Vf * Vm * (m.nim - f.ni12f) ** 2) / (Kf * Km + Gm * (Vf * Kf + Vm * Km));
				},
				latex: "E_1 = E_{f1}V_f + E_mV_m + \\frac{4K_f K_m G_m V_f V_m (\\nu_m - \\nu_{f12})^2}{K_f K_m + G_m (V_f K_f + V_m K_m)}",
				description: "Hashin-Rosen model"
			},
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
			},
			"Halpin-Tsai": {
				formula: (f, m, Vf, Vm) => m.Em * ((1 + Vf) * f.E2f + Vm * m.Em) / (Vm * f.E2f + (1 + Vf) * m.Em),
				latex: "E_2 = E_m \\left( \\frac{(1 + V_f)E_{2f} + V_m E_m}{V_m E_{2f} + (1 + V_f)E_m} \\right)",
				description: "Halpin-Tsai equation"
			},
			"Modified IROM": {
				formula: (f, m, Vf, Vm) => {
					const eta_f = (f.E1f * Vf + ((1 - f.ni12f * f.ni12f * m.Em / f.E1f) * m.Em + m.nim * f.ni12f * f.E1f) * Vm) / (f.E1f * Vf + m.Em * Vm);
					const eta_m = ((1 - m.nim ** 2) * f.E1f - (1 - m.nim * f.ni12f) * m.Em * Vf + m.Em * Vm) / (f.E1f * Vf + m.Em * Vm);
					return 1 / ((eta_f * Vf / f.E2f) + (eta_m * Vm / m.Em));
				},
				latex: "E_2 = \\frac{1}{\\frac{\\eta_f V_f}{E_{2f}} + \\frac{\\eta_m V_m}{E_m}}",
				description: "Modified Inverse Rule of Mixtures"
			},
		}
	},
	G12: {
		name: "Shear modulus",
		unit: "GPa",
		formulas: {
			ROM: {
				formula: (f, m, Vf, Vm) => (f.G12f * m.Gm) / (Vf * m.Gm + Vm * f.G12f),
				latex: "G_{12} = \\frac{G_{12f} G_m}{V_f G_m + V_m G_{12f}}",
				description: "Rule of Mixtures"
			},
			MROM: {
				formula: (f, m, Vf, Vm) => {
					const eta_prime = 0.6; // This is a simplification, you might want to calculate this
					return 1 / ((Vf / f.G12f) + (eta_prime * Vm / m.Gm));
				},
				latex: "\\frac{1}{G_{12}} = \\frac{V_f}{G_{12f}} + \\frac{\\eta' V_m}{G_m}",
				description: "Modified Rule of Mixtures"
			},
			Chamis: {
				formula: (f, m, Vf, Vm) => m.Gm / (1 - Math.sqrt(Vf) * (1 - m.Gm / f.G12f)),
				latex: "G_{12} = \\frac{G_m}{1 - \\sqrt{V_f} \\left( 1 - \\frac{G_m}{G_{12f}} \\right)}",
				description: "Chamis model"
			},
			"Hashin-Rosen": {
				formula: (f, m, Vf, Vm) => m.Gm * ((f.G12f * (1 + Vf) + m.Gm * Vm) / (f.G12f * Vm + m.Gm * (1 + Vf))),
				latex: "G_{12} = G_m \\frac{G_{12f}(1 + V_f) + G_m V_m}{G_{12f} V_m + G_m (1 + V_f)}",
				description: "Hashin-Rosen model"
			},
			Elasticity: {
				formula: (f, m, Vf, Vm) => m.Gm * (((m.Gm + f.G12f) - Vf * (m.Gm - f.G12f)) / ((m.Gm + f.G12f) + Vf * (m.Gm - f.G12f))),
				latex: "G_{12} = G_m \\left( \\frac{(G_m + G_{12f}) - V_f (G_m - G_{12f})}{(G_m + G_{12f}) + V_f (G_m - G_{12f})} \\right)",
				description: "Elasticity approach"
			},
			"Halpin-Tsai": {
				formula: (f, m, Vf, Vm) => {
					const xi = (f.G12f / m.Gm - 1) / (f.G12f / m.Gm + 2);
					return m.Gm * ((1 + 2 * xi * Vf) / (1 - xi * Vf));
				},
				latex: "G_{12} = G_m \\left( \\frac{1 + 2 \\cdot \\xi \\cdot V_f}{1 - \\xi \\cdot V_f} \\right)",
				description: "Halpin-Tsai equation"
			},
		}
	},
	nu12: {
		name: "Poisson's major ratio",
		unit: "-",
		formulas: {
			ROM: {
				formula: (f, m, Vf, Vm) => f.ni12f * Vf + m.nim * Vm,
				latex: "\\nu_{12} = \\nu_{12f}V_f + \\nu_mV_m",
				description: "Rule of Mixtures"
			},
			Chamis: {
				formula: (f, m, Vf, Vm) => f.ni12f * Vf + m.nim * Vm,
				latex: "\\nu_{12} = \\nu_{12f}V_f + \\nu_mV_m",
				description: "Chamis model (same as ROM for this property)"
			},
			"Halpin-Tsai": {
				formula: (f, m, Vf, Vm) => (f.ni12f * m.nim) / (Vf * m.nim + Vm * f.ni12f),
				latex: "\\nu_{12} = \\frac{\\nu_{12f} \\cdot \\nu_m}{V_f \\cdot \\nu_m + V_m \\cdot \\nu_{12f}}",
				description: "Halpin-Tsai equation"
			}
		}
	},
	nu21: {
		name: "Poisson's minor ratio",
		unit: "-",
		formulas: {
			"Stiffness matrix symmetry": {
				formula: (f, m, Vf, Vm) => {
					const E1 = f.E1f * Vf + m.Em * Vm; // ROM for E1
					const E2 = m.Em / (1 - Math.sqrt(Vf) * (1 - m.Em / f.E2f)); // Chamis for E2
					const nu12 = f.ni12f * Vf + m.nim * Vm; // ROM for nu12
					return (E2 / E1) * nu12;
				},
				latex: "\\nu_{21} = \\frac{E_2}{E_1} \\nu_{12}",
				description: "Calculated using stiffness matrix symmetry"
			}
		}
	}

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
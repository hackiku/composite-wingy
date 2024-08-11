// src/lib/data/materials.ts

export interface FiberProperties {
	type: string;
	E1f: number;
	E2f: number;
	G12f: number;
	G23f: number;
	ni12f: number;
	ni21f: number;
	F1ft: number;
	F1fc: number | null;
	epsilon1ft: number;
	epsilon1fc: number | null;
	alpha1f: number | null;
	alpha2f: number | null;
}

export interface MatrixProperties {
	type: string;
	rho: number;
	Em: number;
	Gm: number;
	nim: number;
	FmT: number;
	FmC: number;
	FmS: number;
	epsilon_mT: number;
	alpha_m: number;
	Tg: number;
	Tmax: number | null;
}

export const fibers: { [key: string]: FiberProperties } = {
	"T-300": {
		type: "Carbon",
		E1f: 230,
		E2f: 15,
		G12f: 15,
		G23f: 7,
		ni12f: 0.2,
		ni21f: 0.2,
		F1ft: 2500,
		F1fc: 2000,
		epsilon1ft: 0.01086,
		epsilon1fc: 0.00869,
		alpha1f: -0.7e-6,
		alpha2f: 12e-6,
	},
	// Add more fibers here...
};

export const matrices: { [key: string]: MatrixProperties } = {
	"3501-6": {
		type: "Epoxy",
		rho: 1.27,
		Em: 4.2,
		Gm: 1.567,
		nim: 0.34,
		FmT: 69,
		FmC: 250,
		FmS: 50,
		epsilon_mT: 0.017,
		alpha_m: 45e-6,
		Tg: 200,
		Tmax: 150,
	},
	// Add more matrices here...
};
// src/lib/data/aircraft-presets.ts

export interface WingSpecs {
	span_wet: number;
	fwd_spar: number;
	aft_spar: number;
	tip: number;
	root: number;
	sweep_angle: number;
	dihedral_angle: number;
	airfoil_root: string;
	airfoil_tip: string;
}

export interface MaterialSpecs {
	fiber: number;
	matrix: number;
	Vf: number;
	Vvoid: number;
}

export interface ModelSpecs {
	project: string;
	box?: string;
	wing: string;
	wing_FULL?: string;
	WINGmanual?: string;
	cutouts?: string;
	"ribs full"?: string;
}

export interface AircraftSpecs {
	specs: {
		name: string;
		manufacturer: string;
		mass: number;
		load_factor: number;
		wingspan: number;
		"3_view": string;
		crop_params: [number, number, number, number];
	};
	wing: WingSpecs;
	materials?: MaterialSpecs;
	model: ModelSpecs;
}

export const aircraftPresets: { [key: string]: AircraftSpecs } = {
	"P-51": {
		specs: {
			name: "P-51 Mustang",
			manufacturer: "North American Aviation",
			mass: 5489.00,
			load_factor: 10,
			wingspan: 11.286,
			"3_view": "cad/imgs/P-51_3-view.png",
			crop_params: [0, 1103, 1693, 1100],
		},
		wing: {
			span_wet: 5.643,
			fwd_spar: 0.3,
			aft_spar: 0.2,
			tip: 1.297,
			root: 2.752,
			sweep_angle: 10.388,
			dihedral_angle: 5,
			airfoil_root: "NACA-2418",
			airfoil_tip: "NACA-2212",
		},
		model: {
			project: "composite_wing",
			box: "0f38721b826a5669e2acf9d0",
			wing: "a5d9af60f968f6a03308d6c5",
			wing_FULL: "b879915fba35863ee60116c6",
			WINGmanual: "b879915fba35863ee60116c6",
			cutouts: "593c35c15b6c45dc507e4af4",
		}
	},
	"330-LT": {
		specs: {
			name: "Extra 330 LT",
			manufacturer: "Extra Aircraft",
			mass: 950.00,
			load_factor: 10,
			wingspan: 7.50,
			"3_view": "cad/imgs/placeholder.png",
			crop_params: [0, 0, 200, 100],
		},
		wing: {
			span_wet: 3.75,
			fwd_spar: 0.30,
			aft_spar: 0.20,
			tip: 1.20,
			root: 1.80,
			sweep_angle: 5.0,
			dihedral_angle: 1.5,
			airfoil_root: "NACA-0018",
			airfoil_tip: "NACA-0012",
		},
		materials: {
			fiber: 4,
			matrix: 6,
			Vf: 0.58,
			Vvoid: 0.025
		},
		model: {
			project: "Extra 330 LT",
			box: "d7774b5d778de27ba31db2e5",
			wing: "a6c4f6c9d83beca3762a25ea",
		}
	},
	"Glider": {
		specs: {
			name: "Cool Motor Glider",
			manufacturer: "Glider Inc.",
			mass: 8.500,
			load_factor: 6,
			wingspan: 15.000,
			"3_view": "cad/imgs/placeholder.png",
			crop_params: [0, 0, 200, 100],
		},
		wing: {
			span_wet: 7.500,
			fwd_spar: 0.25,
			aft_spar: 0.15,
			tip: 0.800,
			root: 1.800,
			sweep_angle: 5.0,
			dihedral_angle: 3,
			airfoil_root: "NACA-0012",
			airfoil_tip: "NACA-0010",
		},
		materials: {
			fiber: 5,
			matrix: 2,
			Vf: 0.55,
			Vvoid: 0.155
		},
		model: {
			project: "Parametric Wing",
			"ribs full": "1c23a328748cc03fde2f37f5",
			wing: "1119299cf6041bec872e5894",
		}
	},
	"Space elevator (wip)": {
		specs: {
			name: "Space elevator",
			manufacturer: "Jzro & Sons, Inc.",
			mass: 8.500e6,
			load_factor: 1,
			wingspan: 15.000e5,
			"3_view": "cad/imgs/space_elevator.png",
			crop_params: [0, 0, 600, 400],
		},
		wing: {
			span_wet: 7.500,
			fwd_spar: 0.25,
			aft_spar: 0.15,
			tip: 0.800,
			root: 1.800,
			sweep_angle: 5.0,
			dihedral_angle: 3,
			airfoil_root: "NACA-0012",
			airfoil_tip: "NACA-0010",
		},
		materials: {
			fiber: 5,
			matrix: 2,
			Vf: 0.55,
			Vvoid: 0.009
		},
		model: {
			project: "Parametric Wing",
			"ribs full": "1c23a328748cc03fde2f37f5",
			wing: "1119299cf6041bec872e5894",
		}
	},
};

export interface OnshapeProject {
	did: string;
	wv: string;
	wvid: string;
}

export const onshapeProjects: { [key: string]: OnshapeProject } = {
	"composite_wing": {
		did: "f6ac5c0b25ce21ecd85991db",
		wv: "w",
		wvid: "2f1903d2edb515536def7421",
	},
	"Extra 330 LT": {
		did: "3b6bce5824912adfda10b52d",
		wv: "w",
		wvid: "91730fd668a615d074229f54",
	},
	"Torsion box": {
		did: "f6ac5c0b25ce21ecd85991db",
		wv: "w",
		wvid: "2f1903d2edb515536def7421",
	},
	"Full wing (old)": {
		did: "f6ac5c0b25ce21ecd85991db",
		wv: "w",
		wvid: "2f1903d2edb515536def7421",
	},
	"Parametric Wing": {
		did: "308d36ae2431fbf4b9b96a48",
		wv: "w",
		wvid: "4dfbfac17da94e7168ec10cd",
	},
};
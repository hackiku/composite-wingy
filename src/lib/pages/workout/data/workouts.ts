export type Exercise = {
	name: string;
	duration: number;
	description: string;
	image?: string;
	isPro?: boolean;
};

export type Workout = {
	id: string;
	name: string;
	description: string;
	exercises: Exercise[];
	isPro?: boolean;
	difficulty?: 'beginner' | 'intermediate' | 'advanced';
	estimatedCalories?: number;
};

export const workouts: Workout[] = [
	{
		id: 'classic',
		name: 'Classic 7-Minute Workout',
		description: 'Scientific 7-minute workout based on HIIT principles',
		difficulty: 'beginner',
		estimatedCalories: 150,
		exercises: [
			{
				name: 'Jumping Jacks',
				duration: 30,
				description: 'Full body exercise to warm up and get your heart rate up'
			},
			{
				name: 'Wall Sit',
				duration: 30,
				description: 'Lower body strength exercise that targets your quads'
			},
			{
				name: 'Push-Ups',
				duration: 30,
				description: 'Upper body exercise focusing on chest, shoulders, and triceps'
			},
			{
				name: 'Abdominal Crunches',
				duration: 30,
				description: 'Core strengthening exercise targeting your abs'
			},
			{
				name: 'Step-Ups',
				duration: 30,
				description: 'Leg exercise using a chair or sturdy platform'
			},
			{
				name: 'Squats',
				duration: 30,
				description: 'Full lower body exercise targeting quads, hamstrings, and glutes'
			},
			{
				name: 'Tricep Dips',
				duration: 30,
				description: 'Upper body exercise focusing on triceps'
			},
			{
				name: 'Plank',
				duration: 30,
				description: 'Core strengthening exercise that works your entire body'
			},
			{
				name: 'High Knees',
				duration: 30,
				description: 'Cardio exercise that also works your core'
			},
			{
				name: 'Lunges',
				duration: 30,
				description: 'Lower body exercise targeting legs and improving balance'
			},
			{
				name: 'Push-Ups with Rotation',
				duration: 30,
				description: 'Advanced push-up variation that also works your core'
			},
			{
				name: 'Side Plank',
				duration: 30,
				description: 'Core exercise focusing on obliques and stability'
			}
		]
	},
	{
		id: 'calisthenics',
		name: 'Pro Calisthenics',
		description: 'Advanced bodyweight exercises for strength and control',
		isPro: true,
		difficulty: 'advanced',
		estimatedCalories: 200,
		exercises: [
			{
				name: 'Handstand Practice',
				duration: 30,
				description: 'Wall-assisted handstand for shoulder strength and balance',
				isPro: true
			},
			{
				name: 'Pistol Squats',
				duration: 30,
				description: 'Single-leg squats for strength and balance',
				isPro: true
			},
			{
				name: 'L-Sits',
				duration: 20,
				description: 'Advanced core and arm strength exercise',
				isPro: true
			},
			{
				name: 'Muscle-Ups',
				duration: 30,
				description: 'Advanced pull-up to dip transition',
				isPro: true
			},
			{
				name: 'Front Lever Practice',
				duration: 20,
				description: 'Advanced core and back strength hold',
				isPro: true
			},
			{
				name: 'Planche Leans',
				duration: 30,
				description: 'Preparation for full planche',
				isPro: true
			},
			{
				name: 'Dragon Flag',
				duration: 30,
				description: 'Advanced core exercise',
				isPro: true
			},
			{
				name: 'One Arm Push-Ups',
				duration: 30,
				description: 'Unilateral upper body strength',
				isPro: true
			}
		]
	}
];
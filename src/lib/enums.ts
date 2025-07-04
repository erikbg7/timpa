// Import original enum as type
// import type { Plan as PlanEnum } from '@prisma/client';

// Guarantee that the implementation corresponds to the original type
// export const Plan: { [k in PlanEnum]: k } = {
// 	FREE: 'FREE',
// 	STANDARD: 'STANDARD',
// 	PRO: 'PRO',
// } as const;

// Re-exporting the original type with the original name
// export type Plan = PlanEnum;

import type { Plan as PlanEnum } from '@prisma/client';
import type { PredictionStatus as PredictionStatusEnum } from '@prisma/client';
import type { Language as LanguageEnum } from '@prisma/client';

export type Plan = PlanEnum;
export const Plan: { [k in PlanEnum]: k } = {
	FREE: 'FREE',
	STANDARD: 'STANDARD',
	PRO: 'PRO',
} as const;

export type PredictionStatus = PredictionStatusEnum;
export const PredictionStatus: { [k in PredictionStatusEnum]: k } = {
	IN_PROGRESS: 'IN_PROGRESS',
	COMPLETED: 'COMPLETED',
	FAILED: 'FAILED',
} as const;

export type Language = LanguageEnum;
export const Language: { [k in LanguageEnum]: k } = {
	EN: 'EN',
	ES: 'ES',
	CA: 'CA',
	FR: 'FR',
	IT: 'IT',
} as const;

export type PricingPlan = Extract<PlanEnum, 'PRO' | 'STANDARD'>;

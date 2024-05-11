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
import type { Language as LanguageEnum } from '@prisma/client';
import type { FileTranscriptionStatus as FileTranscriptionStatusEnum } from '@prisma/client';

export type Plan = PlanEnum;
export const Plan: { [k in PlanEnum]: k } = {
	FREE: 'FREE',
	STANDARD: 'STANDARD',
	PRO: 'PRO',
} as const;

export type PricingPlan = Extract<PlanEnum, 'PRO' | 'STANDARD'>;

export type Language = LanguageEnum;
export const Language: { [k in LanguageEnum]: k } = {
	CA: 'CA',
	EN: 'EN',
	ES: 'ES',
	FR: 'FR',
	IT: 'IT',
} as const;

export type TranscriptionStatus = FileTranscriptionStatusEnum;
export const TranscriptionStatus: { [k in FileTranscriptionStatusEnum]: k } = {
	IN_PROGESS: 'IN_PROGESS',
	FAILED: 'FAILED',
	COMPLETED: 'COMPLETED',
} as const;

import { createCheckoutSession } from './mutations/createCheckoutSession';

type PaymentsService = ReturnType<typeof createPaymentsService>;

const createPaymentsService = () => {
	return {
		mutations: {
			createCheckoutSession,
		},
	};
};

export type { PaymentsService };
export { createPaymentsService };

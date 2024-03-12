type GetCheckoutSessionUrlArgs = { priceId: string };

type GetCheckoutSessionUrl = (args: GetCheckoutSessionUrlArgs) => Promise<string>;

const getCheckoutSessionUrl: GetCheckoutSessionUrl = async ({ priceId }) => {
	const res = await fetch('/api/create-checkout', {
		method: 'POST',
		body: JSON.stringify({ priceId }),
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await res.json();
	if (!data?.url) {
		throw new Error('No url returned');
	}

	return data.url;
};

export { getCheckoutSessionUrl };

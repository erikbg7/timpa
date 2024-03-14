import { fail, json } from '@sveltejs/kit';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { isValidEmail } from '$lib/validations/index.js';

const mockedData = {
	object: {
		id: 'cs_test_a1M6AV84Faxoxl3zQXLVg4VIp9bdVogWocTN81mldW2j5v80ZcBb50CxdA',
		object: 'checkout.session',
		after_expiration: null,
		allow_promotion_codes: null,
		amount_subtotal: 7900,
		amount_total: 7900,
		automatic_tax: {
			enabled: false,
			liability: null,
			status: null,
		},
		billing_address_collection: null,
		cancel_url: 'http://localhost:5173/cancel',
		client_reference_id: null,
		client_secret: null,
		consent: null,
		consent_collection: null,
		created: 1710011788,
		currency: 'eur',
		currency_conversion: null,
		custom_fields: [],
		custom_text: {
			after_submit: null,
			shipping_address: null,
			submit: null,
			terms_of_service_acceptance: null,
		},
		customer: null,
		customer_creation: 'if_required',
		customer_details: {
			address: {
				city: null,
				country: 'ES',
				line1: null,
				line2: null,
				postal_code: null,
				state: null,
			},
			email: 'erik.bg7@gmail.com',
			name: 'Erik BG',
			phone: null,
			tax_exempt: 'none',
			tax_ids: [],
		},
		customer_email: null,
		expires_at: 1710098188,
		invoice: null,
		invoice_creation: {
			enabled: false,
			invoice_data: {
				account_tax_ids: null,
				custom_fields: null,
				description: null,
				footer: null,
				issuer: null,
				metadata: {},
				rendering_options: null,
			},
		},
		livemode: false,
		locale: null,
		metadata: {},
		mode: 'payment',
		payment_intent: 'pi_3OsVNyCwovyfOAFP11oXqOO6',
		payment_link: null,
		payment_method_collection: 'if_required',
		payment_method_configuration_details: null,
		payment_method_options: {
			card: {
				request_three_d_secure: 'automatic',
			},
		},
		payment_method_types: ['card'],
		payment_status: 'paid',
		phone_number_collection: {
			enabled: false,
		},
		recovered_from: null,
		setup_intent: null,
		shipping_address_collection: null,
		shipping_cost: null,
		shipping_details: null,
		shipping_options: [],
		status: 'complete',
		submit_type: null,
		subscription: null,
		success_url: 'http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}',
		total_details: {
			amount_discount: 0,
			amount_shipping: 0,
			amount_tax: 0,
		},
		ui_mode: 'hosted',
		url: null,
	},
};

/** @type {import('./$types').RequestHandler} */
export const POST = async (event) => {
	const {
		locals: { supabase, stripe, getSession },
	} = event;

	try {
		const payload = await event.request.text();
		const signature = event.request.headers.get('stripe-signature')!;
		const stripeEvent = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);

		const { data, type } = stripeEvent;

		switch (type) {
			case 'checkout.session.completed': {
				const checkoutSession = data.object!;

				const status = checkoutSession.payment_status;
				if (status !== 'paid') {
					fail(400, { message: 'Payment not completed' });
				}

				const session = await getSession();
				const sessionEmail = session?.user?.email;
				const checkoutEmail = checkoutSession.customer_details?.email;

				const email = sessionEmail || (checkoutEmail as string);
				if (!isValidEmail(email)) {
					fail(500, { message: 'No email found' });
				}

				const { error } = await supabase.from('customers').insert({ email });

				if (!!error) fail(500, { message: 'Error creating user' });

				break;
			}

			case 'checkout.session.expired': {
				// User didn't complete the transaction
				// Can send an email to the user to remind him to complete the transaction, for instance
				break;
			}

			case 'customer.subscription.updated': {
				// The customer might have changed the plan (higher or lower plan, cancel soon etc...)
				// const subscription = await stripe.subscriptions.retrieve(data.object.id);
				// const planId = subscription?.items?.data[0]?.price?.id;
				// Do any operation here
				break;
			}

			case 'customer.subscription.deleted': {
				// The customer stopped the subscription.
				// Do any operation here
				break;
			}

			default:
			// Unhandled event type
		}
	} catch (e) {
		fail(500, { message: 'WebHook Error' });
		console.error('[STRIPE ERROR]: ', e);
	}

	return json(200);
};

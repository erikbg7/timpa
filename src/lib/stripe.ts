import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

export const stripe: Stripe = new Stripe(STRIPE_SECRET_KEY, {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: '2023-10-16',
});

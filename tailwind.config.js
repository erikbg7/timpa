import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				banner: '#251F42',
			},
		},
	},
	daisyui: {
		themes: [
			{
				custom: {
					primary: '#6c53cd',

					secondary: '#374151',

					accent: '#b394ff',
					'accent-content': '#161522',

					'base-100': '#0f0c1b',

					info: '#ffffff',

					success: '#00ffff',

					warning: '#ffffff',

					error: '#ffffff',
				},
			},
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#3b82f6',
					accent: '#2563eb',
				},
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#6c53cd',
					accent: '#b394ff',
					secondary: '#374151',
					'base-100': '#0f0c18',
				},
			},
		],
	},
	plugins: [daisyui],
};

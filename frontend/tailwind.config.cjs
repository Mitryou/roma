/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			'sm': '576px',
			'md': '960px',
			'lg': '1440px',
		},
		extend: {
			colors: {
				'primary': '#232323',
				'secondary': '#292929',
				'dark-charcoal': '#323232',
				'peat': '#706856',
				'iron': '#cccccc',
				'reddish': '#C73B3B',
				'greylight': '#F7F6F3',
				'firebrick': '#B62025'
			}
		},
		fontFamily: {
			'oswald': ['Oswald'],
			'noto-sans': ['Noto Sans']
		},

	},

	plugins: []
};

module.exports = config;

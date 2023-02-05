/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		fontFamily: {
			sans: ["Noto Sans Arabic", "Inter", "sans-serif"],
		},
		extend: {
			colors: {
				blue: "#2388ff",
				orange: "#ff9a23",
				black: "#070707",
				white: "#ffffff",
				green: "#06c574",
				purple: "#ad30c2",
				yellow: "#ffee02",
				red: "#ef3b50",
				cyan: "#1ebcc5",
				gray: {
					100: "#f9f9f9",
					200: "#ededed",
					300: "#cbcbcb",
					400: "#757575",
					500: "#3a4254",
				},
			},
		},
	},
	plugins: [],
	content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};

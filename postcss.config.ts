import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
	plugins: {
		tailwindcss: { config: { path: "./tailwind.config.js" } },
		autoprefixer: {},
	},
}
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === "css-unused-selector") return;
		// handler(warning);
	},
	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x'
		}),
		alias: {
			"@/*": "./src/lib/*"
		}
	}
};

export default config;
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
		const { code, frame } = warning;
		if (code === "css-unused-selector") return;

		// handler(warning);
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		// alias: {
		// 	// this will match a file
		// 	'lib': './src/lib',
		// 	// this will match a directory and its contents
		// 	// (`my-directory/x` resolves to `path/to/my-directory/x`)
		// 	'my-directory': 'path/to/my-directory'
		// }

	}
};

	export default config;

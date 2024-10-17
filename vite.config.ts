import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite'

import { purgeCss as purgeTailwind } from 'vite-plugin-tailwind-purgecss';


export default {
	plugins: [
		sveltekit(),
		purgeTailwind()
	]
} satisfies UserConfig

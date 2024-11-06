import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite'

import { purgeCss as purgeTailwind } from 'vite-plugin-tailwind-purgecss';


export default {
	plugins: [
		sveltekit(),
		purgeTailwind()
	],
	build: {
        rollupOptions: {
            onwarn: (warning, handler) => {
                const { code, frame } = warning;
                if (code === "anchor-is-valid" || code === "a11y-autofocus") {
                    return;
                }
                if (code === "css-unused-selector") {
                    return;
                }
                handler(warning);
            }
        }
    },
	
} satisfies UserConfig

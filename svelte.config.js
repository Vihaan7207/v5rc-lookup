import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            // default options are shown
            pages: 'build',
            assets: 'build',
            fallback: undefined, // use '404.html' for SPA fallback routing
            precompress: false,
            strict: true
        }),
        // Set the base path to your GitHub repository name
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/v5rc-lookup' : ''
        }
    }
};

export default config;

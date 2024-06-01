// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	css: ['~/assets/scss/app.scss'],

	modules: ['nuxt-graphql-client'],

	'graphql-client': {
		clients: {
			default: {
				host: 'https://sira-jucks-api.test/graphql',
				clientHost: 'https://sira-jucks-api.test/graphql',
			},
		},
	},
});

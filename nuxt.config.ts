// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	css: ['~/assets/scss/app.scss'],

	modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
});

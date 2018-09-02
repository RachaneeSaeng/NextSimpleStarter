workbox.core.setCacheNameDetails({
	prefix: 'el-crm',
	suffix: 'v1'
})

workbox.skipWaiting()
workbox.clientsClaim()

workbox.precaching.suppressWarnings()
/**
 * Ignore the non-important files added as a result of
 * webpack's publicPath thingy, for now...
 */
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

/**
 * You can read about Cache Strategies here
 * (https://developers.google.com/web/tools/workbox/modules/workbox-strategies)
 */

// precache
workbox.precaching.precacheAndRoute(
	self.__precacheManifest.filter(
		m =>
			!m.url.startsWith('bundles/') &&
			!m.url.startsWith('static/commons') &&
			m.url !== 'build-manifest.json'
	),
	{}
)

// fonts
workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets'
	})
)

// javascript and css
workbox.routing.registerRoute(
	/\.(?:js|css)$/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'static-resources'
	})
)

// images
workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	workbox.strategies.cacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
			})
		]
	})
)

// Fetch the root route as fast as possible
workbox.routing.registerRoute(
	'/',
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'root'
	}),
	'GET'
)

workbox.routing.registerRoute(
	/^http.*/,
	workbox.strategies.networkFirst({
		cacheName: 'http-cache'
	}),
	'GET'
)

/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: null,
            workbox: {
                cleanupOutdatedCaches: false
            },
            minify: false,
        })
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    }
})


// const pwaConfig = {
//     manifest: {
//         "start_url": "/",
//         "theme_color": "#000000",
//         "background_color": "#000000",
//         "icons": [
//             {
//                 "purpose": "maskable",
//                 "sizes": "512x512",
//                 "src": "icon512_maskable.png",
//                 "type": "image/png"
//             },
//             {
//                 "purpose": "any",
//                 "sizes": "512x512",
//                 "src": "icon512_rounded.png",
//                 "type": "image/png"
//             }
//         ],
//         "screenshots": [
//             { "src": "/screenshots/Untitled.png", "type": "image/png", "sizes": "540x720", "form_factor": "narrow" },
//             { "src": "/screenshots/Untitled-2.png", "type": "image/png", "sizes": "540x720", "form_factor": "narrow" },
//             { "src": "/screenshots/Untitled-3.png", "type": "image/png", "sizes": "540x720", "form_factor": "narrow" }

//         ],
//         "orientation": "any",
//         "display": "standalone",
//         "lang": "en-US",
//         "name": "Ubur",
//         "short_name": "Ubur",
//         "description": "Ubur - Plan your ride",
//         "id": "client-app"
//     },
//     workbox: {
//         runtimeCaching: [{
//             urlPattern: ({ url }) => {
//                 return url.pathname.startsWith('/api')
//             },
//             handler: "cacheFirst" as const,
//             options: {
//                 cacheName: "api-cache",
//                 cacheableResponse: {
//                     statuses: [0, 200]
//                 }
//             }
//         }]
//     }
// }
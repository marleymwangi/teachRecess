if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),b={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>b[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/V0xvaVzXuYvaGg6qrVljL/_buildManifest.js",revision:"fec09f4da345625e19f3151fd3c649b3"},{url:"/_next/static/V0xvaVzXuYvaGg6qrVljL/_ssgManifest.js",revision:"5352cb582146311d1540f6075d1f265e"},{url:"/_next/static/chunks/1a48c3c1.5d5d01b8f7168f77.js",revision:"5d5d01b8f7168f77"},{url:"/_next/static/chunks/1bfc9850.8efc84c33ff95777.js",revision:"8efc84c33ff95777"},{url:"/_next/static/chunks/252f366e.b7e9c64c6233b4f2.js",revision:"b7e9c64c6233b4f2"},{url:"/_next/static/chunks/39-d08c0f4ff0ac9b42.js",revision:"d08c0f4ff0ac9b42"},{url:"/_next/static/chunks/639-1e92418545fabe18.js",revision:"1e92418545fabe18"},{url:"/_next/static/chunks/653.c6107a691657e928.js",revision:"c6107a691657e928"},{url:"/_next/static/chunks/78e521c3.81389b5be91a908e.js",revision:"81389b5be91a908e"},{url:"/_next/static/chunks/7f0c75c1.3c6e261b218e4607.js",revision:"3c6e261b218e4607"},{url:"/_next/static/chunks/95b64a6e.523c17f58f736a2c.js",revision:"523c17f58f736a2c"},{url:"/_next/static/chunks/ae51ba48.cea800b521039fc9.js",revision:"cea800b521039fc9"},{url:"/_next/static/chunks/b98bc7c3.11eb1c85730addff.js",revision:"11eb1c85730addff"},{url:"/_next/static/chunks/d0c16330.c8197d46a197e6af.js",revision:"c8197d46a197e6af"},{url:"/_next/static/chunks/d64684d8.973a383d8097333f.js",revision:"973a383d8097333f"},{url:"/_next/static/chunks/framework-9b5d6ec4444c80fa.js",revision:"9b5d6ec4444c80fa"},{url:"/_next/static/chunks/main-147954219c425b3f.js",revision:"147954219c425b3f"},{url:"/_next/static/chunks/pages/_app-7da2cdd46e960769.js",revision:"7da2cdd46e960769"},{url:"/_next/static/chunks/pages/_error-7397496ca01950b1.js",revision:"7397496ca01950b1"},{url:"/_next/static/chunks/pages/auth/signin-173208b0d2301f19.js",revision:"173208b0d2301f19"},{url:"/_next/static/chunks/pages/calendar-614ff006f5f37ab4.js",revision:"614ff006f5f37ab4"},{url:"/_next/static/chunks/pages/chats-e5d9210273b48d6c.js",revision:"e5d9210273b48d6c"},{url:"/_next/static/chunks/pages/chats/chat-ba92ec35abb914bf.js",revision:"ba92ec35abb914bf"},{url:"/_next/static/chunks/pages/create/diary-affba32853ca3508.js",revision:"affba32853ca3508"},{url:"/_next/static/chunks/pages/create/homework-0aba233ec87f0e20.js",revision:"0aba233ec87f0e20"},{url:"/_next/static/chunks/pages/create/homework/CraftForm-cf358a9531582ad6.js",revision:"cf358a9531582ad6"},{url:"/_next/static/chunks/pages/create/homework/ExerForm-fa3d72ad8e21556e.js",revision:"fa3d72ad8e21556e"},{url:"/_next/static/chunks/pages/create/reminders-b241b82767d5070d.js",revision:"b241b82767d5070d"},{url:"/_next/static/chunks/pages/fallback-420d7553196b0171.js",revision:"420d7553196b0171"},{url:"/_next/static/chunks/pages/homework-54b9046ddb49990e.js",revision:"54b9046ddb49990e"},{url:"/_next/static/chunks/pages/homework/homework-73bbdeec70f4d267.js",revision:"73bbdeec70f4d267"},{url:"/_next/static/chunks/pages/index-b7eb38c5db5b443f.js",revision:"b7eb38c5db5b443f"},{url:"/_next/static/chunks/pages/scan-cea623d3ce2358d6.js",revision:"cea623d3ce2358d6"},{url:"/_next/static/chunks/pages/student-c6ec093aef3a5ac9.js",revision:"c6ec093aef3a5ac9"},{url:"/_next/static/chunks/pages/student/medical-b816dc0b41aa4cb0.js",revision:"b816dc0b41aa4cb0"},{url:"/_next/static/chunks/pages/student/portfolio-46d6368a8a9e9d8f.js",revision:"46d6368a8a9e9d8f"},{url:"/_next/static/chunks/pages/student/profiles-86366f121208bdb9.js",revision:"86366f121208bdb9"},{url:"/_next/static/chunks/pages/welcome-ab53111d5b410408.js",revision:"ab53111d5b410408"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f3b80ff395328422.js",revision:"f3b80ff395328422"},{url:"/_next/static/css/920c71b7818be940.css",revision:"920c71b7818be940"},{url:"/_next/static/css/a9ca04d56a6ec853.css",revision:"a9ca04d56a6ec853"},{url:"/apple-touch-icon.png",revision:"25bc7d1786c837eee7b688f5b3dacffd"},{url:"/favicon copy.ico",revision:"26b4ff0a4f75fb8afb4b534bb71e3460"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"337fadee5277b3dc00548a811a7a4f0a"},{url:"/icon-256x256.png",revision:"c8fe09cbdb4eab6e4e46c9e36b191c1a"},{url:"/icon-384x384.png",revision:"ea75fa82267f8b2cea937dc6f3304152"},{url:"/icon-512x512.png",revision:"5e42ebf3e6b5a4632e43b1846153804c"},{url:"/images/1.jpeg",revision:"b19d740e7e7773ff44bfd6843b3dc67b"},{url:"/images/boy.png",revision:"8bafcda90f0c4f8f2d2dc0beba4271b9"},{url:"/images/generic.webp",revision:"c3f6f64c67ab9bf029a2afebffddfba2"},{url:"/images/girl.png",revision:"8d9cd7c3941883048993094ee5c5352b"},{url:"/images/recess.png",revision:"8bd7298ee118247a102571773963625c"},{url:"/images/subjects/atom.webp",revision:"bf165d3a3d4fad553fcf7c204a57f9e1"},{url:"/images/subjects/car.webp",revision:"85e3647394eff21002867d4b6041bc75"},{url:"/images/subjects/career.webp",revision:"8f517e42a0d2b6f10e5f26cbc43d1232"},{url:"/images/subjects/eng.webp",revision:"94c3ebcdc16fa8ce2dee6fb9639a149f"},{url:"/images/subjects/english.webp",revision:"6554712258233c6e8c26d1167c0f473b"},{url:"/images/subjects/env.webp",revision:"19385ca8b4bc49cea2dfcdbe6b3742e7"},{url:"/images/subjects/hyg.webp",revision:"cfcb08a625d3b889619d7cffd0d025fe"},{url:"/images/subjects/hygiene.webp",revision:"9dcda6a8f2b60c41eb38f817c0140daf"},{url:"/images/subjects/kiswahili.webp",revision:"38fd767628c1250a05006eb1ee5cd1cf"},{url:"/images/subjects/math.webp",revision:"fdf73eea03d862bf3b5f934a36b91f5f"},{url:"/images/subjects/re.webp",revision:"55a78a88c088b139a8d573f0fd5e21fe"},{url:"/images/subjects/science.webp",revision:"556d4b8e29e56ac7004ad5c71347fdc3"},{url:"/images/subjects/swa.webp",revision:"7187f87b1b3aca3e6689ac9f263fe4bd"},{url:"/images/welcome1.png",revision:"640d5b0e78412bf79603b6c887ee11a3"},{url:"/images/welcome2.png",revision:"ea9213d8a8ec84b060ff5454f170347d"},{url:"/images/welcome3.png",revision:"d4f1cfa09d178a9e5aee2294ae14a8c6"},{url:"/manifest.json",revision:"34c035b6ec183a8a731d3006fd778261"},{url:"/maskable_icon_x128.png",revision:"e0e997a757565b365da8f5be2c05de48"},{url:"/maskable_icon_x192.png",revision:"d7b3d926c3eda55d657ec2e80092b975"},{url:"/maskable_icon_x384.png",revision:"f22429591013ae7cf6faff2c93e0aee7"},{url:"/maskable_icon_x48.png",revision:"9edd48213f04c32c85ee4f30a4afa21a"},{url:"/maskable_icon_x72.png",revision:"b48c4b270a199bedd78d907dd7d3ce22"},{url:"/maskable_icon_x96.png",revision:"3e73b1b94df25286230c9564526d0d69"},{url:"/onesignal/OneSignalSDKUpdaterWorker.js",revision:"ebb63ca15bba16b550232b0b0f66c726"},{url:"/onesignal/OneSignalSDKWorker.js",revision:"ebb63ca15bba16b550232b0b0f66c726"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

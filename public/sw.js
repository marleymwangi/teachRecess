if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>c(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/128.png",revision:"d06c2d2992fb7bfd3e5a34de978d0f85"},{url:"/192.png",revision:"fe7790c0b3fd81f0d4a0dc35db269675"},{url:"/256.png",revision:"6b226b387149b5806a3bf3c794f4a2e1"},{url:"/48.png",revision:"4d6e810d12345750d3f5abf8be07d414"},{url:"/512.png",revision:"db0f15dce3ec6255abc8d8ddcb78e1f6"},{url:"/72.png",revision:"103979d6dddc352c6807976110f08726"},{url:"/96.png",revision:"46c0fe93c10e136c7bc3f63c6618b1e8"},{url:"/_next/static/BWG3-jR2dPsZ772Fh5IiC/_buildManifest.js",revision:"f546ec63b0c2b985f7e74476efc488d7"},{url:"/_next/static/BWG3-jR2dPsZ772Fh5IiC/_ssgManifest.js",revision:"5352cb582146311d1540f6075d1f265e"},{url:"/_next/static/chunks/0c428ae2-3df47bf2478a8d10.js",revision:"3df47bf2478a8d10"},{url:"/_next/static/chunks/1039-6567c1368b7fbb40.js",revision:"6567c1368b7fbb40"},{url:"/_next/static/chunks/1387.62b8b5d2f2bd0050.js",revision:"62b8b5d2f2bd0050"},{url:"/_next/static/chunks/1781.94f9dd535f50865c.js",revision:"94f9dd535f50865c"},{url:"/_next/static/chunks/1a48c3c1.bda31c0673363ad3.js",revision:"bda31c0673363ad3"},{url:"/_next/static/chunks/1bfc9850.b0e600358baaa2f0.js",revision:"b0e600358baaa2f0"},{url:"/_next/static/chunks/252f366e.e0a6820c3f1f9026.js",revision:"e0a6820c3f1f9026"},{url:"/_next/static/chunks/3016-2638bc54b2cdc52c.js",revision:"2638bc54b2cdc52c"},{url:"/_next/static/chunks/4250-71366d8bb75aebfd.js",revision:"71366d8bb75aebfd"},{url:"/_next/static/chunks/4850-976826ad7c201166.js",revision:"976826ad7c201166"},{url:"/_next/static/chunks/5177.d22a82dd89d68303.js",revision:"d22a82dd89d68303"},{url:"/_next/static/chunks/5575.b766ddd5e60b3a35.js",revision:"b766ddd5e60b3a35"},{url:"/_next/static/chunks/6064.45d0a1a89a44dceb.js",revision:"45d0a1a89a44dceb"},{url:"/_next/static/chunks/6081.52009b0cbe81a908.js",revision:"52009b0cbe81a908"},{url:"/_next/static/chunks/6095.dd5539faa5d85fb0.js",revision:"dd5539faa5d85fb0"},{url:"/_next/static/chunks/6478.fe2f7a71f706930a.js",revision:"fe2f7a71f706930a"},{url:"/_next/static/chunks/6479-544fc888d0f2d7b7.js",revision:"544fc888d0f2d7b7"},{url:"/_next/static/chunks/6653.d4d54562dd25d137.js",revision:"d4d54562dd25d137"},{url:"/_next/static/chunks/6850.42b5031031a6b9f9.js",revision:"42b5031031a6b9f9"},{url:"/_next/static/chunks/7557.428e9af1795fc8d6.js",revision:"428e9af1795fc8d6"},{url:"/_next/static/chunks/78e521c3.339bb0402574eb7c.js",revision:"339bb0402574eb7c"},{url:"/_next/static/chunks/7f0c75c1.3c6e261b218e4607.js",revision:"3c6e261b218e4607"},{url:"/_next/static/chunks/8311-d139084638d42290.js",revision:"d139084638d42290"},{url:"/_next/static/chunks/8357.3a38e4005ed07327.js",revision:"3a38e4005ed07327"},{url:"/_next/static/chunks/8462.8ebdbddcf6c0a754.js",revision:"8ebdbddcf6c0a754"},{url:"/_next/static/chunks/95b64a6e.44b70ff2a3dad7c9.js",revision:"44b70ff2a3dad7c9"},{url:"/_next/static/chunks/ae51ba48.cea800b521039fc9.js",revision:"cea800b521039fc9"},{url:"/_next/static/chunks/d64684d8.0871cc818a8c380d.js",revision:"0871cc818a8c380d"},{url:"/_next/static/chunks/framework-c2dab496e7e7122e.js",revision:"c2dab496e7e7122e"},{url:"/_next/static/chunks/main-f35682aabdf894c3.js",revision:"f35682aabdf894c3"},{url:"/_next/static/chunks/pages/_app-6085eb1398cfd994.js",revision:"6085eb1398cfd994"},{url:"/_next/static/chunks/pages/_error-821001084068d091.js",revision:"821001084068d091"},{url:"/_next/static/chunks/pages/auth/logo-973bfc11ad19d009.js",revision:"973bfc11ad19d009"},{url:"/_next/static/chunks/pages/auth/signin-d018962779a9a464.js",revision:"d018962779a9a464"},{url:"/_next/static/chunks/pages/calendar-ca400c88f9de3064.js",revision:"ca400c88f9de3064"},{url:"/_next/static/chunks/pages/chats-6929b3d4d2d5363c.js",revision:"6929b3d4d2d5363c"},{url:"/_next/static/chunks/pages/chats/chat-eca18e9ce42c1a35.js",revision:"eca18e9ce42c1a35"},{url:"/_next/static/chunks/pages/create/diary-4ec27e618c92e814.js",revision:"4ec27e618c92e814"},{url:"/_next/static/chunks/pages/create/homework-66021db913f13481.js",revision:"66021db913f13481"},{url:"/_next/static/chunks/pages/create/homework/CraftForm-e38ced6ce78cf753.js",revision:"e38ced6ce78cf753"},{url:"/_next/static/chunks/pages/create/homework/ExerForm-01bc88cad61b5355.js",revision:"01bc88cad61b5355"},{url:"/_next/static/chunks/pages/create/homework/UploadForm-8b8f9405c1fdc57c.js",revision:"8b8f9405c1fdc57c"},{url:"/_next/static/chunks/pages/create/reminders-5ed3c7e4e83b4bc8.js",revision:"5ed3c7e4e83b4bc8"},{url:"/_next/static/chunks/pages/fallback-ad0f2bb38930a10f.js",revision:"ad0f2bb38930a10f"},{url:"/_next/static/chunks/pages/homework-db280d0a00573d49.js",revision:"db280d0a00573d49"},{url:"/_next/static/chunks/pages/homework/homework-b148a0b2c3205d00.js",revision:"b148a0b2c3205d00"},{url:"/_next/static/chunks/pages/index-aa9632e47ce6982c.js",revision:"aa9632e47ce6982c"},{url:"/_next/static/chunks/pages/portfolios-432a79f197626eb9.js",revision:"432a79f197626eb9"},{url:"/_next/static/chunks/pages/reminders-b69dabd219b57869.js",revision:"b69dabd219b57869"},{url:"/_next/static/chunks/pages/scan-0303564878c64cdf.js",revision:"0303564878c64cdf"},{url:"/_next/static/chunks/pages/student-ce46f23989761ad3.js",revision:"ce46f23989761ad3"},{url:"/_next/static/chunks/pages/student/medical-287f15aebc99a68f.js",revision:"287f15aebc99a68f"},{url:"/_next/static/chunks/pages/student/profiles-510045f3d881a53f.js",revision:"510045f3d881a53f"},{url:"/_next/static/chunks/pages/welcome-80e945b48e332029.js",revision:"80e945b48e332029"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ba1368ac3bef6f80.js",revision:"ba1368ac3bef6f80"},{url:"/_next/static/css/a9ca04d56a6ec853.css",revision:"a9ca04d56a6ec853"},{url:"/_next/static/css/d13a57c1367652d5.css",revision:"d13a57c1367652d5"},{url:"/apple-touch-icon.png",revision:"87a7976eabdb5bae2e2697220d9adde5"},{url:"/favicon.ico",revision:"f27cd86ace8810d81182764e32b17fc1"},{url:"/firebase-messaging-sw.js",revision:"0e3507ec1057ccb812066cf09026b173"},{url:"/images/1.jpeg",revision:"b19d740e7e7773ff44bfd6843b3dc67b"},{url:"/images/boy.png",revision:"8bafcda90f0c4f8f2d2dc0beba4271b9"},{url:"/images/cloud.png",revision:"c3f229fd7c0fe739b8891e72fb8c63f3"},{url:"/images/generic.webp",revision:"c3f6f64c67ab9bf029a2afebffddfba2"},{url:"/images/girl.png",revision:"8d9cd7c3941883048993094ee5c5352b"},{url:"/images/jet.png",revision:"235fa18ae68d207f22c9bb24ea922c84"},{url:"/images/recess.png",revision:"556c5770008ab4413f582ceb8b390dc1"},{url:"/images/subjects/atom.webp",revision:"bf165d3a3d4fad553fcf7c204a57f9e1"},{url:"/images/subjects/car.webp",revision:"85e3647394eff21002867d4b6041bc75"},{url:"/images/subjects/career.webp",revision:"8f517e42a0d2b6f10e5f26cbc43d1232"},{url:"/images/subjects/eng.webp",revision:"94c3ebcdc16fa8ce2dee6fb9639a149f"},{url:"/images/subjects/english.webp",revision:"6554712258233c6e8c26d1167c0f473b"},{url:"/images/subjects/env.webp",revision:"19385ca8b4bc49cea2dfcdbe6b3742e7"},{url:"/images/subjects/hyg.webp",revision:"cfcb08a625d3b889619d7cffd0d025fe"},{url:"/images/subjects/hygiene.webp",revision:"9dcda6a8f2b60c41eb38f817c0140daf"},{url:"/images/subjects/kiswahili.webp",revision:"38fd767628c1250a05006eb1ee5cd1cf"},{url:"/images/subjects/math.webp",revision:"fdf73eea03d862bf3b5f934a36b91f5f"},{url:"/images/subjects/re.webp",revision:"55a78a88c088b139a8d573f0fd5e21fe"},{url:"/images/subjects/science.webp",revision:"556d4b8e29e56ac7004ad5c71347fdc3"},{url:"/images/subjects/swa.webp",revision:"7187f87b1b3aca3e6689ac9f263fe4bd"},{url:"/images/wave.svg",revision:"04c3392e92048649287397650995c0e2"},{url:"/images/welcome1.png",revision:"640d5b0e78412bf79603b6c887ee11a3"},{url:"/images/welcome2.png",revision:"ea9213d8a8ec84b060ff5454f170347d"},{url:"/images/welcome3.png",revision:"d4f1cfa09d178a9e5aee2294ae14a8c6"},{url:"/manifest.json",revision:"9e8b103b006ebf435a22692cf054b9e3"},{url:"/maskable_icon_x128.png",revision:"dab116a559670feafaba6cb268fc5ac7"},{url:"/maskable_icon_x192.png",revision:"5f02b35ec413b81d6db11089cf728691"},{url:"/maskable_icon_x384.png",revision:"5fe3b7e3d0e82d3abdabc49089a9fed1"},{url:"/maskable_icon_x48.png",revision:"11a8c729148e54d40d8c1eb9785aa476"},{url:"/maskable_icon_x512.png",revision:"504a9b77048ec6acf37d0edd8d9255d9"},{url:"/maskable_icon_x72.png",revision:"aa4588d2c2a6777efefdc8daf49ebf33"},{url:"/maskable_icon_x96.png",revision:"ad33b0f9dc3a6b19c13acc516332559d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

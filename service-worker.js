!function(){"use strict";const e=1602981231562,t="cache"+e,s=["/client/inject_styles.88de199d.js","/client/client.15048c30.js","/client/index.a175023a.js","/client/Head.03982520.js","/client/ArticleResume.8e7031cf.js","/client/Tags.5e11d1b8.js","/client/libraries.9a17f926.js","/client/Content.17ba8287.js","/client/subscribe.f66fd7dd.js","/client/TinyLetterSubscribeForm.c7908f8d.js","/client/_layout.83053e11.js","/client/index.e63a9c35.js","/client/ArticleResumeList.45281a90.js","/client/[slug].58075b8c.js","/client/index.d7ff6a4c.js","/client/[aboutLang].dda66c12.js","/client/_layout.71d0d7ee.js","/client/[tag].9bd3f346.js","/client/[shortLink].6e6e27f1.js"].concat(["/service-worker-index.html","/favicon.ico","/favicon.png","/images/me-128x128.jpeg","/images/me-650x650.jpeg","/images/me.jpeg","/images/share-default.png","/images/svelte.png","/logo-192.png","/logo-512.png","/logo.png","/manifest.json","/robots.txt"]),n=new Set(s);self.addEventListener("install",e=>{e.waitUntil(caches.open(t).then(e=>e.addAll(s)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const s=new URL(t.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&n.has(s.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline"+e).then(async e=>{try{const s=await fetch(t.request);return e.put(t.request,s.clone()),s}catch(s){const n=await e.match(t.request);if(n)return n;throw s}}))))})}();
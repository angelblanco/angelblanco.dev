!function(){"use strict";const e=1600478330449,t="cache"+e,s=["/client/client.340cea32.js","/client/index.809a4952.js","/client/ArticleResume.eb7c3610.js","/client/Tags.ec4e51c3.js","/client/libraries.0713b777.js","/client/Content.366617f0.js","/client/subscribe.b521dad0.js","/client/TinyLetterSubscribeForm.41912eab.js","/client/_layout.c1eeeef4.js","/client/index.d4a17abe.js","/client/ArticleResumeList.dec89487.js","/client/[slug].92a02bf8.js","/client/index.a4083e1f.js","/client/[aboutLang].832cab13.js","/client/_layout.8412ba46.js","/client/[tag].ded9ab10.js","/client/[shortLink].b57875d0.js"].concat(["/service-worker-index.html","/favicon.png","/images/me-128x128.jpeg","/images/me-650x650.jpeg","/images/me.jpeg","/images/share-default.png","/images/svelte.png","/logo-192.png","/logo-512.png","/logo.png","/manifest.json"]),n=new Set(s);self.addEventListener("install",e=>{e.waitUntil(caches.open(t).then(e=>e.addAll(s)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const s=new URL(t.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&n.has(s.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline"+e).then(async e=>{try{const s=await fetch(t.request);return e.put(t.request,s.clone()),s}catch(s){const n=await e.match(t.request);if(n)return n;throw s}}))))})}();

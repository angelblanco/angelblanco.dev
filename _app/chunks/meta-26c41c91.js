import{w as o}from"./index-a898a6a8.js";import{U as s}from"./index-047e673f.js";import{d as r,g as c}from"./canonical-09a4e5e1.js";const e={title:"Angel Blanco's blog",ogTitle:"Angel Blanco's blog",ogDescription:"A personal web development blog focused on Javascript, Vue, Svelte, PHP, Laravel, Docker, back-end, front-end, microservices, Linux, Zsh, and more.",ogImageUrl:r("/images/share-default.png"),ogUrl:null},n=o(e.title),l=o(e.ogTitle),g=o(e.ogDescription),a=o(e.ogImageUrl),f=o(1200),d=o(630),i=o(e.ogUrl);function u(t){n.set(`${t} - ${e.title}`),l.set(t),s(()=>{n.set(e.title),l.set(e.title)})}function b(t){g.set(t),s(()=>g.set(e.ogDescription))}function h(t){t.includes("http")?a.set(t):a.set(r(t)),s(()=>a.set(e.ogImageUrl))}function D(t){i.set(c(t)),s(()=>i.set(e.ogUrl))}export{D as a,b,i as c,l as d,a as e,f,d as g,h,g as o,u as s,n as t};

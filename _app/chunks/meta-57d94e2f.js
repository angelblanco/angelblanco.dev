import{ab as s,C as o}from"./vendor-9f491de5.js";import{a as n,g as c}from"./canonical-4beebdc5.js";const e={title:"Angel Blanco's blog",ogTitle:"Angel Blanco's blog",ogDescription:"A personal web development blog focused on Javascript, Vue, Svelte, PHP, Laravel, Docker, back-end, front-end, microservices, Linux, Zsh, and more.",ogImageUrl:n("/images/share-default.png"),ogUrl:null},l=o(e.title),g=o(e.ogTitle),i=o(e.ogDescription),a=o(e.ogImageUrl),f=o(1200),p=o(630),r=o(e.ogUrl);function U(t){l.set(`${t} - ${e.title}`),g.set(t),s(()=>{l.set(e.title),g.set(e.title)})}function b(t){i.set(t),s(()=>i.set(e.ogDescription))}function u(t){t.includes("http")?a.set(t):a.set(n(t)),s(()=>a.set(e.ogImageUrl))}function h(t){r.set(c(t)),s(()=>r.set(e.ogUrl))}export{h as a,r as b,g as c,a as d,f as e,p as f,b as g,u as h,i as o,U as s,l as t};
import{S as e,i as s,s as t,p as n,a,e as l,q as r,f as c,c as o,b as i,d as h,h as f,r as p,k as d,u as g,v as m,w as u,y as $,z as v,J as w,t as E,g as b,l as j,I as x,o as y,K as k}from"./client.e37490e9.js";import{H as D}from"./Head.4d245071.js";import{C as q}from"./Content.7a28bef3.js";function I(e,s,t){const n=e.slice();return n[6]=s[t],n}function C(e,s,t){const n=e.slice();return n[3]=s[t],n}function H(e){let s,t,n,r,p,g=e[6]+"";return{c(){s=l("a"),t=l("span"),n=E(g),r=a(),this.h()},l(e){s=o(e,"A",{href:!0,class:!0});var a=i(s);t=o(a,"SPAN",{});var l=i(t);n=b(l,g),l.forEach(h),r=c(a),a.forEach(h),this.h()},h(){f(s,"href",p="https://www.npmjs.com/package/"+e[6]),f(s,"class","column is-6-tablet is-4-desktop svelte-1l0qvp1")},m(e,a){d(e,s,a),j(s,t),j(t,n),j(s,r)},p(e,t){1&t&&g!==(g=e[6]+"")&&x(n,g),1&t&&p!==(p="https://www.npmjs.com/package/"+e[6])&&f(s,"href",p)},d(e){e&&h(s)}}}function N(e){let s,t,n,r,p,g,m=e[3].title+"",u=e[3].deps,$=[];for(let s=0;s<u.length;s+=1)$[s]=H(I(e,u,s));return{c(){s=l("h3"),t=E(m),n=a(),r=l("div"),p=l("div");for(let e=0;e<$.length;e+=1)$[e].c();g=a(),this.h()},l(e){s=o(e,"H3",{class:!0});var a=i(s);t=b(a,m),a.forEach(h),n=c(e),r=o(e,"DIV",{class:!0});var l=i(r);p=o(l,"DIV",{class:!0});var f=i(p);for(let e=0;e<$.length;e+=1)$[e].l(f);f.forEach(h),g=c(l),l.forEach(h),this.h()},h(){f(s,"class","title"),f(p,"class","dependency-grid columns is-multiline is-family-monospace svelte-1l0qvp1"),f(r,"class","box")},m(e,a){d(e,s,a),j(s,t),d(e,n,a),d(e,r,a),j(r,p);for(let e=0;e<$.length;e+=1)$[e].m(p,null);j(r,g)},p(e,s){if(1&s&&m!==(m=e[3].title+"")&&x(t,m),1&s){let t;for(u=e[3].deps,t=0;t<u.length;t+=1){const n=I(e,u,t);$[t]?$[t].p(n,s):($[t]=H(n),$[t].c(),$[t].m(p,null))}for(;t<$.length;t+=1)$[t].d(1);$.length=u.length}},d(e){e&&h(s),e&&h(n),e&&h(r),y($,e)}}}function S(e){let s,t=e[0],n=[];for(let s=0;s<t.length;s+=1)n[s]=N(C(e,t,s));return{c(){for(let e=0;e<n.length;e+=1)n[e].c();s=k()},l(e){for(let s=0;s<n.length;s+=1)n[s].l(e);s=k()},m(e,t){for(let s=0;s<n.length;s+=1)n[s].m(e,t);d(e,s,t)},p(e,a){if(1&a){let l;for(t=e[0],l=0;l<t.length;l+=1){const r=C(e,t,l);n[l]?n[l].p(r,a):(n[l]=N(r),n[l].c(),n[l].m(s.parentNode,s))}for(;l<n.length;l+=1)n[l].d(1);n.length=t.length}},d(e){y(n,e),e&&h(s)}}}function A(e){let s,t,$,v,w;return s=new D({props:{ogUrl:e[1]}}),v=new q({props:{$$slots:{default:[S]},$$scope:{ctx:e}}}),{c(){n(s.$$.fragment),t=a(),$=l("section"),n(v.$$.fragment),this.h()},l(e){r(s.$$.fragment,e),t=c(e),$=o(e,"SECTION",{class:!0});var n=i($);r(v.$$.fragment,n),n.forEach(h),this.h()},h(){f($,"class","section reading-width")},m(e,n){p(s,e,n),d(e,t,n),d(e,$,n),p(v,$,null),w=!0},p(e,[t]){const n={};2&t&&(n.ogUrl=e[1]),s.$set(n);const a={};513&t&&(a.$$scope={dirty:t,ctx:e}),v.$set(a)},i(e){w||(g(s.$$.fragment,e),g(v.$$.fragment,e),w=!0)},o(e){m(s.$$.fragment,e),m(v.$$.fragment,e),w=!1},d(e){u(s,e),e&&h(t),e&&h($),u(v)}}}async function U({params:e,query:s}){const t=await this.fetch("/api/packages"),{dependencies:n,devDependencies:a}=await t.json();if(200===t.status)return{dependencies:[{title:"Dependencies",deps:n},{title:"Dev dependencies",deps:a}]};this.error(t.status)}function V(e,s,t){let n,{dependencies:a}=s;const l=$();return v(e,l,e=>t(1,n=e)),w("Libraries used in this blog"),e.$$set=e=>{"dependencies"in e&&t(0,a=e.dependencies)},[a,n,l]}export default class extends e{constructor(e){super(),s(this,e,V,A,t,{dependencies:0})}}export{U as preload};

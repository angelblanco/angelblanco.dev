import{S as a,i as s,s as t,e,t as l,c as n,b as o,g as r,d as i,h as c,R as g,k as f,l as h,I as u,p as m,a as d,q as p,f as $,r as v,u as b,v as w,w as I,o as E,y as x,z as L,J as y,W as j,K as C,P as D}from"./client.e37490e9.js";import{H}from"./Head.4d245071.js";import{C as S}from"./Content.7a28bef3.js";function V(a,s,t){const e=a.slice();return e[6]=s[t],e}function M(a){let s,t,m,d=a[6].title+"";return{c(){s=e("a"),t=l(d),this.h()},l(a){s=n(a,"A",{rel:!0,href:!0,class:!0});var e=o(s);t=r(e,d),e.forEach(i),this.h()},h(){c(s,"rel","preload"),c(s,"href",m="/about/"+a[6].locale),c(s,"class","button is-rounded is-small"),g(s,"is-active",a[0]===a[6].locale),g(s,"is-primary",a[0]===a[6].locale)},m(a,e){f(a,s,e),h(s,t)},p(a,e){2&e&&d!==(d=a[6].title+"")&&u(t,d),2&e&&m!==(m="/about/"+a[6].locale)&&c(s,"href",m),3&e&&g(s,"is-active",a[0]===a[6].locale),3&e&&g(s,"is-primary",a[0]===a[6].locale)},d(a){a&&i(s)}}}function U(a){let s,t,e=a[2].aboutMe+"";return{c(){t=C(),this.h()},l(a){t=C(),this.h()},h(){s=new D(t)},m(a,l){s.m(e,a,l),f(a,t,l)},p(a,t){4&t&&e!==(e=a[2].aboutMe+"")&&s.p(e)},d(a){a&&i(t),a&&s.d()}}}function k(a){let s,t,l,r,g,u,x,L,y,j,C,D,k,q;s=new H({props:{ogUrl:a[3]}});let z=a[1],A=[];for(let s=0;s<z.length;s+=1)A[s]=M(V(a,z,s));return k=new S({props:{$$slots:{default:[U]},$$scope:{ctx:a}}}),{c(){m(s.$$.fragment),t=d(),l=e("section"),r=e("div"),g=e("div"),u=e("figure"),x=e("img"),y=d(),j=e("div"),C=e("div");for(let a=0;a<A.length;a+=1)A[a].c();D=d(),m(k.$$.fragment),this.h()},l(a){p(s.$$.fragment,a),t=$(a),l=n(a,"SECTION",{class:!0});var e=o(l);r=n(e,"DIV",{class:!0});var c=o(r);g=n(c,"DIV",{class:!0});var f=o(g);u=n(f,"FIGURE",{class:!0});var h=o(u);x=n(h,"IMG",{class:!0,src:!0,alt:!0}),h.forEach(i),f.forEach(i),c.forEach(i),y=$(e),j=n(e,"DIV",{});var m=o(j);C=n(m,"DIV",{class:!0});var d=o(C);for(let a=0;a<A.length;a+=1)A[a].l(d);d.forEach(i),D=$(m),p(k.$$.fragment,m),m.forEach(i),e.forEach(i),this.h()},h(){c(x,"class","is-rounded"),x.src!==(L="/images/me-650x650.jpeg")&&c(x,"src","/images/me-650x650.jpeg"),c(x,"alt","It's me, Ángel!"),c(u,"class","image is-128x128"),c(g,"class","column is-narrow"),c(r,"class","columns is-centered"),c(C,"class","buttons has-addons is-pulled-right mt-2"),c(l,"class","section reading-width")},m(a,e){v(s,a,e),f(a,t,e),f(a,l,e),h(l,r),h(r,g),h(g,u),h(u,x),h(l,y),h(l,j),h(j,C);for(let a=0;a<A.length;a+=1)A[a].m(C,null);h(j,D),v(k,j,null),q=!0},p(a,[t]){const e={};if(8&t&&(e.ogUrl=a[3]),s.$set(e),3&t){let s;for(z=a[1],s=0;s<z.length;s+=1){const e=V(a,z,s);A[s]?A[s].p(e,t):(A[s]=M(e),A[s].c(),A[s].m(C,null))}for(;s<A.length;s+=1)A[s].d(1);A.length=z.length}const l={};516&t&&(l.$$scope={dirty:t,ctx:a}),k.$set(l)},i(a){q||(b(s.$$.fragment,a),b(k.$$.fragment,a),q=!0)},o(a){w(s.$$.fragment,a),w(k.$$.fragment,a),q=!1},d(a){I(s,a),a&&i(t),a&&i(l),E(A,a),I(k)}}}const q=[{locale:"en",title:"English"},{locale:"es",title:"Spanish"}];async function z({params:a,query:s}){const t=await this.fetch("/api/about"),e=await t.json(),l=q.some(s=>s.locale===a.aboutLang),n=e[a.aboutLang];if(200===t.status&&l&&n)return{translation:n,lang:a.aboutLang,allowedLangs:q};this.error(t.status,e.message)}function A(a,s,t){let e,{lang:l}=s,{allowedLangs:n}=s,{translation:o}=s;const r=x();function i(){"es"===l?(y("Sobre mí!"),j("Hola! Échale un vistazo a mi perfil de Ingeniero en Informática.")):(y("About me!"),j("Hello! Checkout my software engineer profile."))}return L(a,r,a=>t(3,e=a)),console.log(e),i(),a.$$set=a=>{"lang"in a&&t(0,l=a.lang),"allowedLangs"in a&&t(1,n=a.allowedLangs),"translation"in a&&t(2,o=a.translation)},i(),[l,n,o,e,r]}export default class extends a{constructor(a){super(),s(this,a,A,k,t,{lang:0,allowedLangs:1,translation:2})}}export{z as preload};

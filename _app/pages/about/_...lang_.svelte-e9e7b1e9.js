import{S as ne,i as oe,s as re,e as E,t as ie,c as I,a as H,h as fe,d as m,b as d,J as R,g as O,K as $,j as me,w as F,k as S,x as T,m as y,I as ce,y as B,q as G,o as z,B as J,N as ue,v as _e,Y as W,l as A,Z as X,_ as x}from"../../chunks/index-735bdd5b.js";import{t as he}from"../../chunks/trimEnd-1203b438.js";import{C as Q}from"../../chunks/Content-7b3ac21e.js";import{H as ge}from"../../chunks/Head-d89c7fee.js";import{N as pe}from"../../chunks/NProgress-66c4f304.js";import{d as ee}from"../../chunks/utils-c32b6fc3.js";import{a as de,b as ve,s as te,c as se}from"../../chunks/meta-e21aab1c.js";import"../../chunks/canonical-c3687938.js";import"../../chunks/index-2a3fd9e5.js";function ae(o,e,n){const l=o.slice();return l[11]=e[n],l}function le(o){let e,n=o[11].title+"",l,s;return{c(){e=E("a"),l=ie(n),this.h()},l(a){e=I(a,"A",{rel:!0,href:!0,class:!0});var r=H(e);l=fe(r,n),r.forEach(m),this.h()},h(){d(e,"rel","preload"),d(e,"href",s=o[11].link),d(e,"class","button is-rounded"),R(e,"is-active",o[0]===o[11].locale),R(e,"is-primary",o[0]===o[11].locale)},m(a,r){O(a,e,r),$(e,l)},p(a,r){r&2&&n!==(n=a[11].title+"")&&me(l,n),r&2&&s!==(s=a[11].link)&&d(e,"href",s),r&3&&R(e,"is-active",a[0]===a[11].locale),r&3&&R(e,"is-primary",a[0]===a[11].locale)},d(a){a&&m(e)}}}function $e(o){let e,n=o[2].aboutMe.html+"",l;return{c(){e=new W(!1),l=A(),this.h()},l(s){e=X(s,!1),l=A(),this.h()},h(){e.a=l},m(s,a){e.m(n,s,a),O(s,l,a)},p(s,a){a&4&&n!==(n=s[2].aboutMe.html+"")&&e.p(n)},d(s){s&&m(l),s&&e.d()}}}function be(o){let e,n=o[2].experience.html+"",l;return{c(){e=new W(!1),l=A(),this.h()},l(s){e=X(s,!1),l=A(),this.h()},h(){e.a=l},m(s,a){e.m(n,s,a),O(s,l,a)},p(s,a){a&4&&n!==(n=s[2].experience.html+"")&&e.p(n)},d(s){s&&m(l),s&&e.d()}}}function we(o){let e,n=o[2].aboutFooter.html+"",l;return{c(){e=new W(!1),l=A(),this.h()},l(s){e=X(s,!1),l=A(),this.h()},h(){e.a=l},m(s,a){e.m(n,s,a),O(s,l,a)},p(s,a){a&4&&n!==(n=s[2].aboutFooter.html+"")&&e.p(n)},d(s){s&&m(l),s&&e.d()}}}function Ee(o){let e,n,l,s,a,r,g,_,p,N,M,h,w,f,k,Y,C,Z,D,K,L,P;e=new ge({}),l=new pe({props:{endOffset:o[5],startOffset:o[6]}});let U=o[1],c=[];for(let t=0;t<U.length;t+=1)c[t]=le(ae(o,U,t));return k=new Q({props:{$$slots:{default:[$e]},$$scope:{ctx:o}}}),C=new Q({props:{$$slots:{default:[be]},$$scope:{ctx:o}}}),D=new Q({props:{$$slots:{default:[we]},$$scope:{ctx:o}}}),{c(){F(e.$$.fragment),n=S(),F(l.$$.fragment),s=S(),a=E("section"),r=E("div"),g=E("div"),_=E("figure"),p=E("img"),M=S(),h=E("div"),w=E("div");for(let t=0;t<c.length;t+=1)c[t].c();f=S(),F(k.$$.fragment),Y=S(),F(C.$$.fragment),Z=S(),F(D.$$.fragment),K=S(),L=E("div"),this.h()},l(t){T(e.$$.fragment,t),n=y(t),T(l.$$.fragment,t),s=y(t),a=I(t,"SECTION",{class:!0});var i=H(a);r=I(i,"DIV",{class:!0});var b=H(r);g=I(b,"DIV",{});var j=H(g);_=I(j,"FIGURE",{class:!0});var q=H(_);p=I(q,"IMG",{class:!0,src:!0,alt:!0}),q.forEach(m),j.forEach(m),b.forEach(m),M=y(i),h=I(i,"DIV",{});var v=H(h);w=I(v,"DIV",{class:!0});var u=H(w);for(let V=0;V<c.length;V+=1)c[V].l(u);u.forEach(m),f=y(v),T(k.$$.fragment,v),Y=y(v),T(C.$$.fragment,v),Z=y(v),T(D.$$.fragment,v),v.forEach(m),i.forEach(m),K=y(t),L=I(t,"DIV",{class:!0}),H(L).forEach(m),this.h()},h(){d(p,"class","is-rounded"),ce(p.src,N="/images/profile-600x600.jpeg")||d(p,"src",N),d(p,"alt","It's me, \xC1ngel!"),d(_,"class","image profile__image svelte-dgyar9"),d(r,"class","profile-columns is-centered svelte-dgyar9"),d(w,"class","buttons has-addons profile__buttons mt-2 mb-0 lang-button svelte-dgyar9"),d(a,"class","section reading-width"),d(L,"class","afterArticleContainer svelte-dgyar9")},m(t,i){B(e,t,i),O(t,n,i),B(l,t,i),O(t,s,i),O(t,a,i),$(a,r),$(r,g),$(g,_),$(_,p),$(a,M),$(a,h),$(h,w);for(let b=0;b<c.length;b+=1)c[b].m(w,null);$(h,f),B(k,h,null),$(h,Y),B(C,h,null),$(h,Z),B(D,h,null),o[8](a),O(t,K,i),O(t,L,i),o[9](L),P=!0},p(t,[i]){const b={};if(i&32&&(b.endOffset=t[5]),i&64&&(b.startOffset=t[6]),l.$set(b),i&3){U=t[1];let u;for(u=0;u<U.length;u+=1){const V=ae(t,U,u);c[u]?c[u].p(V,i):(c[u]=le(V),c[u].c(),c[u].m(w,null))}for(;u<c.length;u+=1)c[u].d(1);c.length=U.length}const j={};i&16388&&(j.$$scope={dirty:i,ctx:t}),k.$set(j);const q={};i&16388&&(q.$$scope={dirty:i,ctx:t}),C.$set(q);const v={};i&16388&&(v.$$scope={dirty:i,ctx:t}),D.$set(v)},i(t){P||(G(e.$$.fragment,t),G(l.$$.fragment,t),G(k.$$.fragment,t),G(C.$$.fragment,t),G(D.$$.fragment,t),P=!0)},o(t){z(e.$$.fragment,t),z(l.$$.fragment,t),z(k.$$.fragment,t),z(C.$$.fragment,t),z(D.$$.fragment,t),P=!1},d(t){J(e,t),t&&m(n),J(l,t),t&&m(s),t&&m(a),ue(c,t),J(k),J(C),J(D),o[8](null),t&&m(K),t&&m(L),o[9](null)}}}async function Ue({url:o,fetch:e,params:n}){const l=[{locale:"en",title:"English",link:"/about"},{locale:"es",title:"Spanish",link:"/about/es"}],s=await e("/api/about"),a=await s.json(),r=he(n.lang||"","/")||"en",g=l.some(p=>p.locale===r),_=a[r];return s.status===200&&g&&_?{props:{translation:_,lang:r,allowedLangs:l,path:o.pathname}}:{status:500,error:new Error(`Unable to find locale ${r}`)}}function Ie(o,e,n){let{lang:l}=e,{allowedLangs:s}=e,{translation:a}=e,{path:r}=e,g,_,p=null,N=null;_e(()=>{n(6,N=ee(g).top),n(5,p=ee(_).top)}),M();function M(){de(r),ve("/share/about-me-en.png"),l==="es"?(te("Sobre m\xED!"),se("Hola! \xC9chale un vistazo a mi perfil de Ingeniero en Inform\xE1tica.")):(te("About me!"),se("Hello! Checkout my software engineer profile."))}function h(f){x[f?"unshift":"push"](()=>{g=f,n(3,g)})}function w(f){x[f?"unshift":"push"](()=>{_=f,n(4,_)})}return o.$$set=f=>{"lang"in f&&n(0,l=f.lang),"allowedLangs"in f&&n(1,s=f.allowedLangs),"translation"in f&&n(2,a=f.translation),"path"in f&&n(7,r=f.path)},M(),[l,s,a,g,_,p,N,r,h,w]}class Ve extends ne{constructor(e){super(),oe(this,e,Ie,Ee,re,{lang:0,allowedLangs:1,translation:2,path:7})}}export{Ve as default,Ue as load};
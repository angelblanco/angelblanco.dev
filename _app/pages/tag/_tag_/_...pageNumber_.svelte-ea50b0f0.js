import{S as F,i as w,s as N,w as f,k as P,x as c,m as d,y as p,g as q,q as h,o as _,B as S,d as A}from"../../../chunks/vendor-54c6ab91.js";import{A as B}from"../../../chunks/ArticleResumeList-4e99035d.js";import{H as D}from"../../../chunks/Head-46f166e7.js";import{g as H}from"../../../chunks/Tags-89f21549.js";import{a as O,s as T,g as U}from"../../../chunks/meta-ebf74df4.js";import"../../../chunks/ArticleResume-2333cc8e.js";import"../../../chunks/canonical-fdacf4d6.js";function j(a){let e,n,r,o;return e=new D({}),r=new B({props:{articles:a[0],page:a[2],uriForPage:a[4],pages:a[1],path:a[3]}}),{c(){f(e.$$.fragment),n=P(),f(r.$$.fragment)},l(t){c(e.$$.fragment,t),n=d(t),c(r.$$.fragment,t)},m(t,s){p(e,t,s),q(t,n,s),p(r,t,s),o=!0},p(t,[s]){const g={};s&1&&(g.articles=t[0]),s&4&&(g.page=t[2]),s&16&&(g.uriForPage=t[4]),s&2&&(g.pages=t[1]),s&8&&(g.path=t[3]),r.$set(g)},i(t){o||(h(e.$$.fragment,t),h(r.$$.fragment,t),o=!0)},o(t){_(e.$$.fragment,t),_(r.$$.fragment,t),o=!1},d(t){S(e,t),t&&A(n),S(r,t)}}}function G({params:a,url:e,fetch:n}){const r=e.pathname,o=a.pageNumber||1;return n(`/api/articles/tag/${a.tag}/${o}`).then(t=>t.json()).then(({articles:t,pages:s,page:g})=>({props:{articles:t,pages:s,page:g,path:r,tagSlug:a.tag}}))}function k(a,e,n){let r,{articles:o}=e,{pages:t}=e,{page:s}=e,{path:g}=e,{tagSlug:m}=e;function u(i){const l=H(i);O(g),T(`${l.title}${l.topic?" articles":""}`);const b=l.topic?`Find the latest ${l.title} blog posts.`:`Search the latest "${l.title}" of the blog`;U(b)}return u(m),a.$$set=i=>{"articles"in i&&n(0,o=i.articles),"pages"in i&&n(1,t=i.pages),"page"in i&&n(2,s=i.page),"path"in i&&n(3,g=i.path),"tagSlug"in i&&n(5,m=i.tagSlug)},a.$$.update=()=>{a.$$.dirty&32&&n(4,r=i=>i<=1?`/tag/${m}/`:`/tag/${m}/${i}`),a.$$.dirty&32&&u(m)},[o,t,s,g,r,m]}class I extends F{constructor(e){super();w(this,e,k,j,N,{articles:0,pages:1,page:2,path:3,tagSlug:5})}}export{I as default,G as load};

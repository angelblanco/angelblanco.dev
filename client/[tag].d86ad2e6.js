import{S as a,i as t,s as e,p as s,a as r,q as g,f as p,r as i,k as n,u as $,v as c,w as o,d as l,y as u,K as f,X as m}from"./client.576c43d8.js";import{g as h}from"./Tags.0363c2ec.js";import{H as d}from"./Head.344a9d1b.js";import"./ArticleResume.271823ef.js";import{A as S}from"./ArticleResumeList.15ac7acb.js";function j(a){let t,e,u,f;return t=new d({}),u=new S({props:{articles:a[0],page:a[2],uriForPage:a[4],pages:a[1],path:a[3]}}),{c(){s(t.$$.fragment),e=r(),s(u.$$.fragment)},l(a){g(t.$$.fragment,a),e=p(a),g(u.$$.fragment,a)},m(a,s){i(t,a,s),n(a,e,s),i(u,a,s),f=!0},p(a,[t]){const e={};1&t&&(e.articles=a[0]),4&t&&(e.page=a[2]),16&t&&(e.uriForPage=a[4]),2&t&&(e.pages=a[1]),8&t&&(e.path=a[3]),u.$set(e)},i(a){f||($(t.$$.fragment,a),$(u.$$.fragment,a),f=!0)},o(a){c(t.$$.fragment,a),c(u.$$.fragment,a),f=!1},d(a){o(t,a),a&&l(e),o(u,a)}}}function b({params:a,query:t,path:e}){return this.fetch(`/api/articles/tag/${a.tag}?page=${t.page||1}`).then((a=>a.json())).then((({articles:t,pages:s,page:r})=>({articles:t,pages:s,page:r,path:e,tagSlug:a.tag})))}function y(a,t,e){let s,{articles:r}=t,{pages:g}=t,{page:p}=t,{path:i}=t,{tagSlug:n}=t;function $(a){const t=h(a);u(i),f(`${t.title}${t.topic?" articles":""}`);const e=t.topic?`Find the latest ${t.title} blog posts.`:`Search the latest "${t.title}" of the blog`;m(e)}return $(n),a.$$set=a=>{"articles"in a&&e(0,r=a.articles),"pages"in a&&e(1,g=a.pages),"page"in a&&e(2,p=a.page),"path"in a&&e(3,i=a.path),"tagSlug"in a&&e(5,n=a.tagSlug)},a.$$.update=()=>{32&a.$$.dirty&&e(4,s=a=>a<=1?`/tag/${n}/`:`/tag/${n}?page=${a}`),32&a.$$.dirty&&$(n)},[r,g,p,i,s,n]}export default class extends a{constructor(a){super(),t(this,a,y,j,e,{articles:0,pages:1,page:2,path:3,tagSlug:5})}}export{b as preload};

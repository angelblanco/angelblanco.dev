import{S as t,i as e,s,e as a,t as l,c as i,b as o,g as r,d as c,h as n,k as g,l as f,z as h,m as u,o as p}from"./client.340cea32.js";const d=t=>t.toLowerCase().trim().replace(" ","-"),m=[{title:"Javascript",icon:"fab fa-js",color:"#f2d73c",tag:"js"},{title:"Svelte",img:"/images/svelte.png",color:"#ff450a",tag:"svelte",parent:"js"},{title:"Node JS",icon:"fab fa-node-js",color:"#80bd01",tag:"node",parent:"js"},{title:"Docker",icon:"fab fa-docker",color:"#006cb1",tag:"docker"},{title:"Articles with Github code",icon:"fab fa-github",color:"#24292e",tag:"github",topic:!1},{title:"Blog",icon:"fas fa-blog",color:"#209cee",tag:"blog",topic:!1}].map(t=>({...t,tag:d(t.tag),topic:!1!==t.topic})).map(t=>({...t,url:"/tag/"+t.tag}));function b(t){const e=d(t);return m.find(t=>t.tag===e)}const j=m.filter(t=>"blog"!==t.tag),v=t=>!1===t.topic,$=[{title:"Articles",items:[{title:"Latest articlest",url:"/articles",tag:"info"},...j.filter(v)]},{title:"Topic",items:j.filter(t=>!v(t)).reduce((t,e)=>{const s=Object.assign({},e);if(s.parent){const e=t.find(t=>t.tag===s.parent);e.items||(e.items=[]),e.items.push(s)}else t.push(s);return t},[])},{title:"Others",items:[{title:"Newsletter",url:"/subscribe",tag:"info"}]}];function C(t,e,s){const a=t.slice();return a[3]=e[s],a}function k(t){let e,s,u,p,d=t[3].title+"";return{c(){e=a("a"),s=l(d),this.h()},l(t){e=i(t,"A",{rel:!0,href:!0,class:!0});var a=o(e);s=r(a,d),a.forEach(c),this.h()},h(){n(e,"rel","prefetch"),n(e,"href",u=t[3].url),n(e,"class",p="tag is-light "+t[3].tag)},m(t,a){g(t,e,a),f(e,s)},p(t,a){2&a&&d!==(d=t[3].title+"")&&h(s,d),2&a&&u!==(u=t[3].url)&&n(e,"href",u),2&a&&p!==(p="tag is-light "+t[3].tag)&&n(e,"class",p)},d(t){t&&c(e)}}}function w(t){let e,s,l=t[1],r=[];for(let e=0;e<l.length;e+=1)r[e]=k(C(t,l,e));return{c(){e=a("div");for(let t=0;t<r.length;t+=1)r[t].c();this.h()},l(t){e=i(t,"DIV",{class:!0});var s=o(e);for(let t=0;t<r.length;t+=1)r[t].l(s);s.forEach(c),this.h()},h(){n(e,"class",s="tags "+t[0])},m(t,s){g(t,e,s);for(let t=0;t<r.length;t+=1)r[t].m(e,null)},p(t,[a]){if(2&a){let s;for(l=t[1],s=0;s<l.length;s+=1){const i=C(t,l,s);r[s]?r[s].p(i,a):(r[s]=k(i),r[s].c(),r[s].m(e,null))}for(;s<r.length;s+=1)r[s].d(1);r.length=l.length}1&a&&s!==(s="tags "+t[0])&&n(e,"class",s)},i:u,o:u,d(t){t&&c(e),p(r,t)}}}function A(t,e,s){let a,{tags:l=[]}=e,{rootClass:i=""}=e;return t.$$set=t=>{"tags"in t&&s(2,l=t.tags),"rootClass"in t&&s(0,i=t.rootClass)},t.$$.update=()=>{4&t.$$.dirty&&s(1,a=l.map(b))},[i,a,l]}class S extends t{constructor(t){super(),e(this,t,A,w,s,{tags:2,rootClass:0})}}export{S as T,b as g,$ as s};

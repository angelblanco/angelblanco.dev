import{S as s,i as a,s as e,p as r,q as t,r as l,u as i,v as c,w as h,e as n,t as o,c as f,b as u,g as d,d as m,h as g,k as p,l as T,a as w,f as $,J as v,z as k,x as b}from"./client.38630673.js";import{T as x}from"./Tags.02afdf24.js";function M(s){let a,e;return a=new x({props:{rootClass:"is-pulled-left is-block",tags:s[0].tags}}),{c(){r(a.$$.fragment)},l(s){t(a.$$.fragment,s)},m(s,r){l(a,s,r),e=!0},p(s,e){const r={};1&e&&(r.tags=s[0].tags),a.$set(r)},i(s){e||(i(a.$$.fragment,s),e=!0)},o(s){c(a.$$.fragment,s),e=!1},d(s){h(a,s)}}}function E(s){let a,e,r,t;return{c(){a=n("div"),e=n("a"),r=o("Read More"),this.h()},l(s){a=f(s,"DIV",{class:!0});var t=u(a);e=f(t,"A",{rel:!0,href:!0,class:!0});var l=u(e);r=d(l,"Read More"),l.forEach(m),t.forEach(m),this.h()},h(){g(e,"rel","prefetch"),g(e,"href",t=s[0].url),g(e,"class","button read-more is-info is-small is-outlined"),g(a,"class","is-pulled-right is-block")},m(s,t){p(s,a,t),T(a,e),T(e,r)},p(s,a){1&a&&t!==(t=s[0].url)&&g(e,"href",t)},d(s){s&&m(a)}}}function R(s){let a,e,r,t,l,h,x,R,A,z,D,I,V,j,y,H,L,q=s[0].title+"",C=s[0].date+"",J=s[0].readingTimeText+"",S=s[0].intro+"",B=s[1]&&M(s),F=s[2]&&E(s);return{c(){a=n("div"),e=n("a"),r=o(q),l=w(),h=n("a"),x=o(C),R=o(" · "),A=o(J),D=w(),I=n("a"),j=w(),y=n("div"),B&&B.c(),H=w(),F&&F.c(),this.h()},l(s){a=f(s,"DIV",{class:!0});var t=u(a);e=f(t,"A",{rel:!0,class:!0,href:!0});var i=u(e);r=d(i,q),i.forEach(m),l=$(t),h=f(t,"A",{rel:!0,href:!0,class:!0});var c=u(h);x=d(c,C),R=d(c," · "),A=d(c,J),c.forEach(m),D=$(t),I=f(t,"A",{href:!0,class:!0}),u(I).forEach(m),j=$(t),y=f(t,"DIV",{class:!0});var n=u(y);B&&B.l(n),H=$(n),F&&F.l(n),n.forEach(m),t.forEach(m),this.h()},h(){g(e,"rel","prefetch"),g(e,"class","link title is-3 is-block"),g(e,"href",t=s[0].url),g(h,"rel","prefectch"),g(h,"href",z=s[0].url),g(h,"class","date-subtitle link is-block has-text-grey-light is-size-7"),g(I,"href",V=s[0].url),g(I,"class","content link is-intro has-text-grey-dark is-size-5"),g(y,"class","bottom-row is-clearfix"),g(a,"class","article-resume")},m(s,t){p(s,a,t),T(a,e),T(e,r),T(a,l),T(a,h),T(h,x),T(h,R),T(h,A),T(a,D),T(a,I),I.innerHTML=S,T(a,j),T(a,y),B&&B.m(y,null),T(y,H),F&&F.m(y,null),L=!0},p(s,[a]){(!L||1&a)&&q!==(q=s[0].title+"")&&v(r,q),(!L||1&a&&t!==(t=s[0].url))&&g(e,"href",t),(!L||1&a)&&C!==(C=s[0].date+"")&&v(x,C),(!L||1&a)&&J!==(J=s[0].readingTimeText+"")&&v(A,J),(!L||1&a&&z!==(z=s[0].url))&&g(h,"href",z),(!L||1&a)&&S!==(S=s[0].intro+"")&&(I.innerHTML=S),(!L||1&a&&V!==(V=s[0].url))&&g(I,"href",V),s[1]?B?(B.p(s,a),2&a&&i(B,1)):(B=M(s),B.c(),i(B,1),B.m(y,H)):B&&(k(),c(B,1,1,()=>{B=null}),b()),s[2]?F?F.p(s,a):(F=E(s),F.c(),F.m(y,null)):F&&(F.d(1),F=null)},i(s){L||(i(B),L=!0)},o(s){c(B),L=!1},d(s){s&&m(a),B&&B.d(),F&&F.d()}}}function A(s,a,e){let{article:r}=a,{withTags:t=!0}=a,{withReadMore:l=!0}=a;return s.$$set=s=>{"article"in s&&e(0,r=s.article),"withTags"in s&&e(1,t=s.withTags),"withReadMore"in s&&e(2,l=s.withReadMore)},[r,t,l]}class z extends s{constructor(s){super(),a(this,s,A,R,e,{article:0,withTags:1,withReadMore:2})}}export{z as A};

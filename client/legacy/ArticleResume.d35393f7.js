import{_ as t,a as r,b as n,c as a,i as e,s,d as i,S as c,z as o,A as l,B as f,C as u,D as h,E as d,f as v,t as m,h as p,j as g,m as R,k as T,n as $,q as b,r as w,g as k,l as y,u as E,R as M,H as x,F as A}from"./client.3bbe8702.js";import{T as D}from"./Tags.facc876c.js";function j(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,s=r(t);if(a){var i=r(this).constructor;e=Reflect.construct(s,arguments,i)}else e=s.apply(this,arguments);return n(this,e)}}function z(t){var r,n;return r=new D({props:{rootClass:"is-pulled-left is-block",tags:t[0].tags}}),{c:function(){o(r.$$.fragment)},l:function(t){l(r.$$.fragment,t)},m:function(t,a){f(r,t,a),n=!0},p:function(t,n){var a={};1&n&&(a.tags=t[0].tags),r.$set(a)},i:function(t){n||(u(r.$$.fragment,t),n=!0)},o:function(t){h(r.$$.fragment,t),n=!1},d:function(t){d(r,t)}}}function B(t){var r,n,a,e;return{c:function(){r=v("div"),n=v("a"),a=m("Read More"),this.h()},l:function(t){r=p(t,"DIV",{class:!0});var e=g(r);n=p(e,"A",{rel:!0,href:!0,class:!0});var s=g(n);a=R(s,"Read More"),s.forEach(T),e.forEach(T),this.h()},h:function(){$(n,"rel","prefetch"),$(n,"href",e=t[0].url),$(n,"class","button read-more is-info is-small is-outlined"),$(r,"class","is-pulled-right is-block")},m:function(t,e){b(t,r,e),w(r,n),w(n,a)},p:function(t,r){1&r&&e!==(e=t[0].url)&&$(n,"href",e)},d:function(t){t&&T(r)}}}function H(t){var r,n,a,e,s,i,c,o,l,f,d,D,j,H,I,V,C,L=t[0].title+"",q=t[0].date+"",F=t[0].readingTimeText+"",O=t[0].intro+"",P=t[1]&&z(t),S=t[2]&&B(t);return{c:function(){r=v("div"),n=v("a"),a=m(L),s=k(),i=v("a"),c=m(q),o=m(" · "),l=m(F),d=k(),D=v("a"),H=k(),I=v("div"),P&&P.c(),V=k(),S&&S.c(),this.h()},l:function(t){r=p(t,"DIV",{class:!0});var e=g(r);n=p(e,"A",{rel:!0,class:!0,href:!0});var f=g(n);a=R(f,L),f.forEach(T),s=y(e),i=p(e,"A",{rel:!0,href:!0,class:!0});var u=g(i);c=R(u,q),o=R(u," · "),l=R(u,F),u.forEach(T),d=y(e),D=p(e,"A",{href:!0,class:!0}),g(D).forEach(T),H=y(e),I=p(e,"DIV",{class:!0});var h=g(I);P&&P.l(h),V=y(h),S&&S.l(h),h.forEach(T),e.forEach(T),this.h()},h:function(){$(n,"rel","prefetch"),$(n,"class","link title is-3 is-block"),$(n,"href",e=t[0].url),$(i,"rel","prefectch"),$(i,"href",f=t[0].url),$(i,"class","date-subtitle link is-block has-text-grey-light is-size-7"),$(D,"href",j=t[0].url),$(D,"class","content link is-intro has-text-grey-dark is-size-5"),$(I,"class","bottom-row is-clearfix"),$(r,"class","article-resume")},m:function(t,e){b(t,r,e),w(r,n),w(n,a),w(r,s),w(r,i),w(i,c),w(i,o),w(i,l),w(r,d),w(r,D),D.innerHTML=O,w(r,H),w(r,I),P&&P.m(I,null),w(I,V),S&&S.m(I,null),C=!0},p:function(t,r){var s=E(r,1)[0];(!C||1&s)&&L!==(L=t[0].title+"")&&M(a,L),(!C||1&s&&e!==(e=t[0].url))&&$(n,"href",e),(!C||1&s)&&q!==(q=t[0].date+"")&&M(c,q),(!C||1&s)&&F!==(F=t[0].readingTimeText+"")&&M(l,F),(!C||1&s&&f!==(f=t[0].url))&&$(i,"href",f),(!C||1&s)&&O!==(O=t[0].intro+"")&&(D.innerHTML=O),(!C||1&s&&j!==(j=t[0].url))&&$(D,"href",j),t[1]?P?(P.p(t,s),2&s&&u(P,1)):((P=z(t)).c(),u(P,1),P.m(I,V)):P&&(x(),h(P,1,1,(function(){P=null})),A()),t[2]?S?S.p(t,s):((S=B(t)).c(),S.m(I,null)):S&&(S.d(1),S=null)},i:function(t){C||(u(P),C=!0)},o:function(t){h(P),C=!1},d:function(t){t&&T(r),P&&P.d(),S&&S.d()}}}function I(t,r,n){var a=r.article,e=r.withTags,s=void 0===e||e,i=r.withReadMore,c=void 0===i||i;return t.$$set=function(t){"article"in t&&n(0,a=t.article),"withTags"in t&&n(1,s=t.withTags),"withReadMore"in t&&n(2,c=t.withReadMore)},[a,s,c]}var V=function(r){t(o,c);var n=j(o);function o(t){var r;return a(this,o),r=n.call(this),e(i(r),t,I,H,s,{article:0,withTags:1,withReadMore:2}),r}return o}();export{V as A};

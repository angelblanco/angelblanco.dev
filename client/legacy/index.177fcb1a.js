import{_ as t,a,b as e,c as r,i as n,d as s,S as i,s as c,z as o,g as u,A as f,l as p,B as g,q as l,u as m,C as h,D as $,E as v,k as d,G as y,H as P,T as R,a4 as j}from"./client.da32f5dd.js";import"./Tags.7af1237e.js";import"./ArticleResume.63e19db2.js";import{H as F}from"./Head.491e3d94.js";import{A as b}from"./ArticleResumeList.b8a68a3b.js";function A(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,s=a(t);if(r){var i=a(this).constructor;n=Reflect.construct(s,arguments,i)}else n=s.apply(this,arguments);return e(this,n)}}function D(t){var a,e,r,n;return a=new F({props:{ogUrl:t[5]}}),r=new b({props:{articles:t[0],page:t[2],uriForPage:t[4],pages:t[1],path:t[3]}}),{c:function(){o(a.$$.fragment),e=u(),o(r.$$.fragment)},l:function(t){f(a.$$.fragment,t),e=p(t),f(r.$$.fragment,t)},m:function(t,s){g(a,t,s),l(t,e,s),g(r,t,s),n=!0},p:function(t,e){var n=m(e,1)[0],s={};32&n&&(s.ogUrl=t[5]),a.$set(s);var i={};1&n&&(i.articles=t[0]),4&n&&(i.page=t[2]),16&n&&(i.uriForPage=t[4]),2&n&&(i.pages=t[1]),8&n&&(i.path=t[3]),r.$set(i)},i:function(t){n||(h(a.$$.fragment,t),h(r.$$.fragment,t),n=!0)},o:function(t){$(a.$$.fragment,t),$(r.$$.fragment,t),n=!1},d:function(t){v(a,t),t&&d(e),v(r,t)}}}function x(t){t.params;var a=t.query,e=t.path;return this.fetch("/api/articles/all?page=".concat(a.page||1)).then((function(t){return t.json()})).then((function(t){return{articles:t.articles,pages:t.pages,page:t.page,path:e}}))}function H(t,a,e){var r,n=a.articles,s=a.pages,i=a.page,c=a.path,o=a.uriForPage,u=void 0===o?function(t){return t<=1?"/articles":"/articles?page=".concat(t)}:o,f=y();return P(t,f,(function(t){return e(5,r=t)})),R("Latest articles"),j("Javacript, Laravel, Vue, Docker posts and much more."),t.$$set=function(t){"articles"in t&&e(0,n=t.articles),"pages"in t&&e(1,s=t.pages),"page"in t&&e(2,i=t.page),"path"in t&&e(3,c=t.path),"uriForPage"in t&&e(4,u=t.uriForPage)},[n,s,i,c,u,r,f]}var L=function(a){t(o,i);var e=A(o);function o(t){var a;return r(this,o),a=e.call(this),n(s(a),t,H,D,c,{articles:0,pages:1,page:2,path:3,uriForPage:4}),a}return o}();export default L;export{x as preload};

import{_ as t,a,b as e,c as n,i as r,d as c,S as s,s as i,z as o,g as u,A as f,l as g,B as p,q as l,u as h,C as $,D as m,E as d,k as v,G as y,U as S,a5 as b}from"./client.0bf0d8db.js";import{g as R}from"./Tags.44f8db05.js";import{H as j}from"./Head.70ef3e12.js";import"./ArticleResume.9c5b4a9c.js";import{A}from"./ArticleResumeList.c9e53288.js";function x(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,c=a(t);if(n){var s=a(this).constructor;r=Reflect.construct(c,arguments,s)}else r=c.apply(this,arguments);return e(this,r)}}function D(t){var a,e,n,r;return a=new j({}),n=new A({props:{articles:t[0],page:t[2],uriForPage:t[4],pages:t[1],path:t[3]}}),{c:function(){o(a.$$.fragment),e=u(),o(n.$$.fragment)},l:function(t){f(a.$$.fragment,t),e=g(t),f(n.$$.fragment,t)},m:function(t,c){p(a,t,c),l(t,e,c),p(n,t,c),r=!0},p:function(t,a){var e=h(a,1)[0],r={};1&e&&(r.articles=t[0]),4&e&&(r.page=t[2]),16&e&&(r.uriForPage=t[4]),2&e&&(r.pages=t[1]),8&e&&(r.path=t[3]),n.$set(r)},i:function(t){r||($(a.$$.fragment,t),$(n.$$.fragment,t),r=!0)},o:function(t){m(a.$$.fragment,t),m(n.$$.fragment,t),r=!1},d:function(t){d(a,t),t&&v(e),d(n,t)}}}function F(t){var a=t.params,e=t.query,n=t.path;return this.fetch("/api/articles/tag/".concat(a.tag,"?page=").concat(e.page||1)).then((function(t){return t.json()})).then((function(t){return{articles:t.articles,pages:t.pages,page:t.page,path:n,tagSlug:a.tag}}))}function P(t,a,e){var n,r=a.articles,c=a.pages,s=a.page,i=a.path,o=a.tagSlug;function u(){var t=R(o);y(i),S("".concat(t.title).concat(t.topic?" articles":""));var a=t.topic?"Find the latest ".concat(t.title," blog posts."):'Search the latest "'.concat(t.title,'" of the blog');b(a)}return u(),t.$$set=function(t){"articles"in t&&e(0,r=t.articles),"pages"in t&&e(1,c=t.pages),"page"in t&&e(2,s=t.page),"path"in t&&e(3,i=t.path),"tagSlug"in t&&e(5,o=t.tagSlug)},t.$$.update=function(){32&t.$$.dirty&&e(4,n=function(t){return t<=1?"/tag/".concat(o):"/tag/".concat(o,"?page=").concat(t)})},u(),[r,c,s,i,n,o]}var q=function(a){t(o,s);var e=x(o);function o(t){var a;return n(this,o),a=e.call(this),r(c(a),t,P,D,i,{articles:0,pages:1,page:2,path:3,tagSlug:5}),a}return o}();export default q;export{F as preload};
import{x as a,y as t,_ as n,a as s,b as e,c as r,i as o,d as c,S as i,s as l,f as u,t as f,h,j as g,m as p,k as m,n as d,a1 as v,q as $,r as b,R as w,z as x,g as y,A as E,l as I,B as L,u as j,C as D,D as R,E as C,w as S,G as V,U as k,a5 as H,V as A,Z as G}from"./client.62e578cf.js";import{H as M}from"./Head.01aad18a.js";import{C as z}from"./Content.204dd86c.js";function U(a){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(a){return!1}}();return function(){var n,r=s(a);if(t){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return e(this,n)}}function q(a,t,n){var s=a.slice();return s[5]=t[n],s}function B(a){var t,n,s,e=a[5].title+"";return{c:function(){t=u("a"),n=f(e),this.h()},l:function(a){t=h(a,"A",{rel:!0,href:!0,class:!0});var s=g(t);n=p(s,e),s.forEach(m),this.h()},h:function(){d(t,"rel","preload"),d(t,"href",s="/about/".concat(a[5].locale,"/")),d(t,"class","button is-rounded is-small"),v(t,"is-active",a[0]===a[5].locale),v(t,"is-primary",a[0]===a[5].locale)},m:function(a,s){$(a,t,s),b(t,n)},p:function(a,r){2&r&&e!==(e=a[5].title+"")&&w(n,e),2&r&&s!==(s="/about/".concat(a[5].locale,"/"))&&d(t,"href",s),3&r&&v(t,"is-active",a[0]===a[5].locale),3&r&&v(t,"is-primary",a[0]===a[5].locale)},d:function(a){a&&m(t)}}}function F(a){var t,n,s=a[2].aboutMe+"";return{c:function(){n=A(),this.h()},l:function(a){n=A(),this.h()},h:function(){t=new G(n)},m:function(a,e){t.m(s,a,e),$(a,n,e)},p:function(a,n){4&n&&s!==(s=a[2].aboutMe+"")&&t.p(s)},d:function(a){a&&m(n),a&&t.d()}}}function N(a){var t,n,s,e,r,o,c,i,l,f,p,v,w;t=new M({});for(var V=a[1],k=[],H=0;H<V.length;H+=1)k[H]=B(q(a,V,H));return v=new z({props:{$$slots:{default:[F]},$$scope:{ctx:a}}}),{c:function(){x(t.$$.fragment),n=y(),s=u("section"),e=u("div"),r=u("div"),o=u("figure"),c=u("img"),i=y(),l=u("div"),f=u("div");for(var a=0;a<k.length;a+=1)k[a].c();p=y(),x(v.$$.fragment),this.h()},l:function(a){E(t.$$.fragment,a),n=I(a),s=h(a,"SECTION",{class:!0});var u=g(s);e=h(u,"DIV",{class:!0});var d=g(e);r=h(d,"DIV",{class:!0});var $=g(r);o=h($,"FIGURE",{class:!0});var b=g(o);c=h(b,"IMG",{class:!0,src:!0,alt:!0}),b.forEach(m),$.forEach(m),d.forEach(m),i=I(u),l=h(u,"DIV",{});var w=g(l);f=h(w,"DIV",{class:!0});for(var x=g(f),y=0;y<k.length;y+=1)k[y].l(x);x.forEach(m),p=I(w),E(v.$$.fragment,w),w.forEach(m),u.forEach(m),this.h()},h:function(){d(c,"class","is-rounded"),c.src!=="/images/me-650x650.jpeg"&&d(c,"src","/images/me-650x650.jpeg"),d(c,"alt","It's me, Ángel!"),d(o,"class","image is-128x128"),d(r,"class","column is-narrow"),d(e,"class","columns is-centered"),d(f,"class","buttons has-addons is-pulled-right mt-2"),d(s,"class","section reading-width")},m:function(a,u){L(t,a,u),$(a,n,u),$(a,s,u),b(s,e),b(e,r),b(r,o),b(o,c),b(s,i),b(s,l),b(l,f);for(var h=0;h<k.length;h+=1)k[h].m(f,null);b(l,p),L(v,l,null),w=!0},p:function(a,t){var n=j(t,1)[0];if(3&n){var s;for(V=a[1],s=0;s<V.length;s+=1){var e=q(a,V,s);k[s]?k[s].p(e,n):(k[s]=B(e),k[s].c(),k[s].m(f,null))}for(;s<k.length;s+=1)k[s].d(1);k.length=V.length}var r={};260&n&&(r.$$scope={dirty:n,ctx:a}),v.$set(r)},i:function(a){w||(D(t.$$.fragment,a),D(v.$$.fragment,a),w=!0)},o:function(a){R(t.$$.fragment,a),R(v.$$.fragment,a),w=!1},d:function(a){C(t,a),a&&m(n),a&&m(s),S(k,a),C(v)}}}var O=[{locale:"en",title:"English"},{locale:"es",title:"Spanish"}];function P(a){return T.apply(this,arguments)}function T(){return(T=a(t.mark((function a(n){var s,e,r,o,c,i;return t.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s=n.params,e=n.path,a.next=3,this.fetch("/api/about");case 3:return r=a.sent,a.next=6,r.json();case 6:if(o=a.sent,c=O.some((function(a){return a.locale===s.aboutLang})),i=o[s.aboutLang],200!==r.status||!c||!i){a.next=13;break}return a.abrupt("return",{translation:i,lang:s.aboutLang,allowedLangs:O,path:e});case 13:this.error(r.status,o.message);case 14:case"end":return a.stop()}}),a,this)})))).apply(this,arguments)}function Z(a,t,n){var s=t.lang,e=t.allowedLangs,r=t.translation,o=t.path;function c(){V(o),"es"===s?(k("Sobre mí!"),H("Hola! Échale un vistazo a mi perfil de Ingeniero en Informática.")):(k("About me!"),H("Hello! Checkout my software engineer profile."))}return c(),a.$$set=function(a){"lang"in a&&n(0,s=a.lang),"allowedLangs"in a&&n(1,e=a.allowedLangs),"translation"in a&&n(2,r=a.translation),"path"in a&&n(3,o=a.path)},c(),[s,e,r,o]}var _=function(a){n(s,i);var t=U(s);function s(a){var n;return r(this,s),n=t.call(this),o(c(n),a,Z,N,l,{lang:0,allowedLangs:1,translation:2,path:3}),n}return s}();export default _;export{P as preload};

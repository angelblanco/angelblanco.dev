import{S as s,i as e,s as t,M as a,e as l,t as i,c as r,b as o,g as c,d as n,h as u,k as d,l as p,a as h,f as v,T as f,U as m,N as b,u as w,v as y,V as g,W as E,P as $}from"./client.15048c30.js";function I(s){let e,t;return{c(){e=l("p"),t=i("This email looks invalid"),this.h()},l(s){e=r(s,"P",{class:!0});var a=o(e);t=c(a,"This email looks invalid"),a.forEach(n),this.h()},h(){u(e,"class","help is-danger")},m(s,a){d(s,e,a),p(e,t)},d(s){s&&n(e)}}}function T(s){let e,t,E,$,T,V,D,k,x,P,S,W,N,U,K,L,M,O,j,z,A,B,F,H,R,Y;const _=s[9].default,q=a(_,s,s[8],null),C=q||function(s){let e,t;return{c(){e=l("p"),t=i("Keep up to date with the latest web development posts, at most once a\n            week.")},l(s){e=r(s,"P",{});var a=o(e);t=c(a,"Keep up to date with the latest web development posts, at most once a\n            week."),a.forEach(n)},m(s,a){d(s,e,a),p(e,t)},d(s){s&&n(e)}}}();let G=s[3]&&I();return{c(){e=l("div"),t=l("div"),E=l("div"),$=l("div"),T=l("h4"),V=i("Subscribe to the newsletter 🚀"),D=h(),C&&C.c(),k=h(),x=l("form"),P=l("div"),S=l("div"),W=l("input"),N=h(),U=l("div"),K=l("button"),L=i("Subscribe"),M=h(),G&&G.c(),O=h(),j=l("input"),z=h(),A=l("div"),B=l("a"),F=i("powered by TinyLetter"),this.h()},l(s){e=r(s,"DIV",{class:!0});var a=o(e);t=r(a,"DIV",{class:!0});var l=o(t);E=r(l,"DIV",{class:!0});var i=o(E);$=r(i,"DIV",{class:!0});var u=o($);T=r(u,"H4",{});var d=o(T);V=c(d,"Subscribe to the newsletter 🚀"),d.forEach(n),D=v(u),C&&C.l(u),u.forEach(n),k=v(i),x=r(i,"FORM",{class:!0,action:!0,target:!0,method:!0});var p=o(x);P=r(p,"DIV",{class:!0});var h=o(P);S=r(h,"DIV",{class:!0});var f=o(S);W=r(f,"INPUT",{class:!0,type:!0,placeholder:!0,value:!0,id:!0,name:!0}),f.forEach(n),N=v(h),U=r(h,"DIV",{class:!0});var m=o(U);K=r(m,"BUTTON",{class:!0});var b=o(K);L=c(b,"Subscribe"),b.forEach(n),m.forEach(n),h.forEach(n),M=v(p),G&&G.l(p),O=v(p),j=r(p,"INPUT",{type:!0,value:!0,name:!0}),p.forEach(n),z=v(i),A=r(i,"DIV",{class:!0});var w=o(A);B=r(w,"A",{href:!0,class:!0,target:!0});var y=o(B);F=c(y,"powered by TinyLetter"),y.forEach(n),w.forEach(n),i.forEach(n),l.forEach(n),a.forEach(n),this.h()},h(){u($,"class","content"),u(W,"class","input"),u(W,"type","email"),u(W,"placeholder","Your email address"),W.value=s[2],u(W,"id","tlemail"),u(W,"name","email"),f(W,"is-danger",s[3]),u(S,"class","control is-expanded"),u(K,"class","button is-info"),u(U,"class","control"),u(P,"class","field has-addons"),u(j,"type","hidden"),j.value="1",u(j,"name","embed"),u(x,"class","fields"),u(x,"action",s[4]),u(x,"target",s[0]),u(x,"method","post"),u(B,"href","https://tinyletter.com"),u(B,"class","has-text-grey-light is-pulled-right"),u(B,"target","_blank"),u(A,"class","is-size-7 is-clearfix"),u(E,"class","box tiny-letter pb-5"),u(t,"class","column svelte-r30y44"),u(e,"class","columns is-centered mt-3 tiny-letter svelte-r30y44")},m(a,l){d(a,e,l),p(e,t),p(t,E),p(E,$),p($,T),p(T,V),p($,D),C&&C.m($,null),p(E,k),p(E,x),p(x,P),p(P,S),p(S,W),p(P,N),p(P,U),p(U,K),p(K,L),p(x,M),G&&G.m(x,null),p(x,O),p(x,j),s[10](x),p(E,z),p(E,A),p(A,B),p(B,F),H=!0,R||(Y=[m(W,"input",s[6]),m(K,"click",s[5])],R=!0)},p(s,[e]){q&&q.p&&256&e&&b(q,_,s,s[8],e,null,null),(!H||4&e&&W.value!==s[2])&&(W.value=s[2]),8&e&&f(W,"is-danger",s[3]),s[3]?G||(G=I(),G.c(),G.m(x,O)):G&&(G.d(1),G=null),(!H||16&e)&&u(x,"action",s[4]),(!H||1&e)&&u(x,"target",s[0])},i(s){H||(w(C,s),H=!0)},o(s){y(C,s),H=!1},d(t){t&&n(e),C&&C.d(t),G&&G.d(),s[10](null),R=!1,g(Y)}}}function V(s,e,t){let a,l,{$$slots:i={},$$scope:r}=e,{user:o="angelblanco"}=e,{popupWindow:c="popupwindow"}=e,n="",u=!1;return s.$$set=s=>{"user"in s&&t(7,o=s.user),"popupWindow"in s&&t(0,c=s.popupWindow),"$$scope"in s&&t(8,r=s.$$scope)},s.$$.update=()=>{128&s.$$.dirty&&t(4,l="https://tinyletter.com/"+o)},[c,a,n,u,l,function(){if(t(3,u=!E(n)),!u)return window.open("https://tinyletter.com/"+o,c,"scrollbars=yes,width=800,height=600"),a.submit(),!0},function({target:s}){t(2,n=s.value),t(3,u=!1)},o,r,i,function(s){$[s?"unshift":"push"](()=>{a=s,t(1,a)})}]}class D extends s{constructor(s){super(),e(this,s,V,T,t,{user:7,popupWindow:0})}}export{D as T};

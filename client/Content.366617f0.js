import{S as t,i as s,s as e,C as n,e as a,c,b as l,d as o,h as i,k as r,D as u,u as h,v as p,E as m,B as d,F as C,H as x,G as $}from"./client.340cea32.js";function f(t){let s,e,m;const C=t[4].default,$=n(C,t,t[3],null),f=$||function(t){let s,e;return{c(){e=d(),this.h()},l(t){e=d(),this.h()},h(){s=new x(e)},m(n,a){s.m(t[0],n,a),r(n,e,a)},p(t,e){1&e&&s.p(t[0])},d(t){t&&o(e),t&&s.d()}}}(t);return{c(){s=a("div"),f&&f.c(),this.h()},l(t){s=c(t,"DIV",{class:!0});var e=l(s);f&&f.l(e),e.forEach(o),this.h()},h(){i(s,"class",e="content is-medium blog "+t[1])},m(e,n){r(e,s,n),f&&f.m(s,null),t[5](s),m=!0},p(t,[n]){$?$.p&&8&n&&u($,C,t,t[3],n,null,null):f&&f.p&&1&n&&f.p(t,n),(!m||2&n&&e!==(e="content is-medium blog "+t[1]))&&i(s,"class",e)},i(t){m||(h(f,t),m=!0)},o(t){p(f,t),m=!1},d(e){e&&o(s),f&&f.d(e),t[5](null)}}}function b(t,s,e){let n,{$$slots:a={},$$scope:c}=s,{html:l=""}=s,{extraClass:o=""}=s;return m(".blog.content button.copy","click",async({target:t})=>{try{if(t.classList.contains("copied"))return;const s=t.closest("pre.terminal").querySelector(".body pre").textContent;$(s);const e=t.textContent;t.classList.add("copied"),t.textContent="Copied",await new Promise(t=>setTimeout(t,500)),t.textContent=e,t.classList.remove("copied")}catch(t){}},()=>n),t.$$set=t=>{"html"in t&&e(0,l=t.html),"extraClass"in t&&e(1,o=t.extraClass),"$$scope"in t&&e(3,c=t.$$scope)},[l,o,n,c,a,function(t){C[t?"unshift":"push"](()=>{n=t,e(2,n)})}]}class y extends t{constructor(t){super(),s(this,t,b,f,e,{html:0,extraClass:1})}}export{y as C};

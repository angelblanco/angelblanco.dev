import"./index-735bdd5b.js";var f=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},R=typeof f=="object"&&f&&f.Object===Object&&f,C=R,N=C,F=typeof self=="object"&&self&&self.Object===Object&&self,M=N||F||Function("return this")(),E=M,U=E,k=U.Symbol,c=k;function G(r,e){for(var n=-1,t=r==null?0:r.length,a=Array(t);++n<t;)a[n]=e(r[n],n,r);return a}var P=G,H=Array.isArray,J=H,d=c,$=Object.prototype,L=$.hasOwnProperty,V=$.toString,i=d?d.toStringTag:void 0;function W(r){var e=L.call(r,i),n=r[i];try{r[i]=void 0;var t=!0}catch{}var a=V.call(r);return t&&(e?r[i]=n:delete r[i]),a}var Z=W,q=Object.prototype,z=q.toString;function Y(r){return z.call(r)}var B=Y,l=c,D=Z,K=B,Q="[object Null]",X="[object Undefined]",b=l?l.toStringTag:void 0;function rr(r){return r==null?r===void 0?X:Q:b&&b in Object(r)?D(r):K(r)}var er=rr;function nr(r){return r!=null&&typeof r=="object"}var tr=nr,ar=er,or=tr,ir="[object Symbol]";function fr(r){return typeof r=="symbol"||or(r)&&ar(r)==ir}var sr=fr,g=c,ur=P,cr=J,dr=sr,lr=1/0,v=g?g.prototype:void 0,S=v?v.toString:void 0;function m(r){if(typeof r=="string")return r;if(cr(r))return ur(r,m)+"";if(dr(r))return S?S.call(r):"";var e=r+"";return e=="0"&&1/r==-lr?"-0":e}var T=m,br=/\s/;function gr(r){for(var e=r.length;e--&&br.test(r.charAt(e)););return e}var vr=gr,Sr=vr,yr=/^\s+/;function $r(r){return r&&r.slice(0,Sr(r)+1).replace(yr,"")}var mr=$r;function Tr(r,e,n){var t=-1,a=r.length;e<0&&(e=-e>a?0:a+e),n=n>a?a:n,n<0&&(n+=a),a=e>n?0:n-e>>>0,e>>>=0;for(var o=Array(a);++t<a;)o[t]=r[t+e];return o}var hr=Tr,pr=hr;function xr(r,e,n){var t=r.length;return n=n===void 0?t:n,!e&&n>=t?r:pr(r,e,n)}var _r=xr;function jr(r,e,n,t){for(var a=r.length,o=n+(t?1:-1);t?o--:++o<a;)if(e(r[o],o,r))return o;return-1}var Or=jr;function Ir(r){return r!==r}var Ar=Ir;function wr(r,e,n){for(var t=n-1,a=r.length;++t<a;)if(r[t]===e)return t;return-1}var Rr=wr,Cr=Or,Nr=Ar,Fr=Rr;function Mr(r,e,n){return e===e?Fr(r,e,n):Cr(r,Nr,n)}var h=Mr,Er=h;function Ur(r,e){for(var n=r.length;n--&&Er(e,r[n],0)>-1;);return n}var kr=Ur,Gr=h;function Pr(r,e){for(var n=-1,t=r.length;++n<t&&Gr(e,r[n],0)>-1;);return n}var Hr=Pr;function Jr(r){return r.split("")}var Lr=Jr,Vr="\\ud800-\\udfff",Wr="\\u0300-\\u036f",Zr="\\ufe20-\\ufe2f",qr="\\u20d0-\\u20ff",zr=Wr+Zr+qr,Yr="\\ufe0e\\ufe0f",Br="\\u200d",Dr=RegExp("["+Br+Vr+zr+Yr+"]");function Kr(r){return Dr.test(r)}var Qr=Kr,p="\\ud800-\\udfff",Xr="\\u0300-\\u036f",re="\\ufe20-\\ufe2f",ee="\\u20d0-\\u20ff",ne=Xr+re+ee,te="\\ufe0e\\ufe0f",ae="["+p+"]",s="["+ne+"]",u="\\ud83c[\\udffb-\\udfff]",oe="(?:"+s+"|"+u+")",x="[^"+p+"]",_="(?:\\ud83c[\\udde6-\\uddff]){2}",j="[\\ud800-\\udbff][\\udc00-\\udfff]",ie="\\u200d",O=oe+"?",I="["+te+"]?",fe="(?:"+ie+"(?:"+[x,_,j].join("|")+")"+I+O+")*",se=I+O+fe,ue="(?:"+[x+s+"?",s,_,j,ae].join("|")+")",ce=RegExp(u+"(?="+u+")|"+ue+se,"g");function de(r){return r.match(ce)||[]}var le=de,be=Lr,ge=Qr,ve=le;function Se(r){return ge(r)?ve(r):be(r)}var ye=Se,$e=T;function me(r){return r==null?"":$e(r)}var Te=me,he=T,pe=mr,xe=_r,_e=kr,je=Hr,y=ye,Oe=Te;function Ie(r,e,n){if(r=Oe(r),r&&(n||e===void 0))return pe(r);if(!r||!(e=he(e)))return r;var t=y(r),a=y(e),o=je(t,a),w=_e(t,a)+1;return xe(t,o,w).join("")}var A=Ie;function Ae(r){return`https://angelblanco.dev/${A(r,"/")}`}function Re(r){return A(Ae(r),"/")}export{T as _,_r as a,Hr as b,ye as c,Ae as d,kr as e,vr as f,Re as g,f as h,J as i,Te as t};
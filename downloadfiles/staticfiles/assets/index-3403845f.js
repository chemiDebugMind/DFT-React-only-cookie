import{r as d,a as F,u as B,j as e,C as k,b as a,B as p,T as y,c as g,d as b,G as u,A as E,e as $,f as G,L as C,g as Y,F as L,O as _,h as R,N as z,i as D,k as I,l as P,m as W,n as N,o as U,p as S,q as V,s as M,R as X,t as K}from"./vendor-1fd48122.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function l(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=l(n);fetch(n.href,s)}})();const T=d.createContext({user:{},setUser:()=>{},accessToken:null,refreshToken:null,csrftoken:null,setAccessToken:()=>{},setRefreshToken:()=>{},setCSRFToken:()=>{}});function v(){const{auth:o}=d.useContext(T);return d.useDebugValue(o,r=>r!=null&&r.user?"Logged In":"Logged Out"),d.useContext(T)}const j="http://127.0.0.1:8000/",q=F.create({baseURL:j,withCredentials:!0,headers:{"Content-Type":"application/json"}}),x=F.create({baseURL:j,withCredentials:!0,headers:{"Content-Type":"application/json"}});function H(){const{setAccessToken:o,setCSRFToken:r}=v();return async()=>{const i=await q.post("refresh-token/");return o(i.data.access),r(i.headers["x-csrftoken"]),{accessToken:i.data.access,csrfToken:i.headers["x-csrftoken"]}}}function O(){const{accessToken:o,setAccessToken:r,csrftoken:l,user:i}=v(),n=H();return d.useEffect(()=>{const s=x.interceptors.request.use(t=>(t.headers.Authorization||(t.headers.Authorization=`Bearer ${o}`,t.headers["X-CSRFToken"]=l),t),t=>Promise.reject(t)),m=x.interceptors.response.use(t=>t,async t=>{var h,w;const c=t==null?void 0:t.config;if((((h=t==null?void 0:t.response)==null?void 0:h.status)===403||((w=t==null?void 0:t.response)==null?void 0:w.status)===401)&&!(c!=null&&c.sent)){c.sent=!0;const{csrfToken:f,accessToken:A}=await n();return r(A),c.headers.Authorization=`Bearer ${A}`,c.headers["X-CSRFToken"]=f,x(c)}return Promise.reject(t)});return()=>{x.interceptors.request.eject(s),x.interceptors.response.eject(m)}},[o,i]),x}function J(){const{setUser:o,setAccessToken:r,setCSRFToken:l}=v(),i=O();return async()=>{try{const s=await i.post("logout/");r(null),l(null),o({})}catch(s){console.log(s)}}}const Q=()=>{d.useState(),J(),B();const o=O(),[r,l]=d.useState(""),[i,n]=d.useState([]),[s,m]=d.useState(!1);return e(k,{maxWidth:"sm",children:a(p,{mt:4,children:[e(y,{variant:"h4",component:"h1",align:"center",children:"Download Files from URLs"}),e(p,{mt:4,children:a("form",{onSubmit:async c=>{c.preventDefault(),m(!0);try{const h=await o.post("download/",{urls:r});n(Object.values(h.data)),m(!1)}catch(h){console.log(h),m(!1)}},children:[e(g,{label:"Enter URLs",variant:"outlined",multiline:!0,rows:4,fullWidth:!0,value:r,onChange:c=>l(c.target.value)}),e(p,{mt:2,children:e(b,{variant:"contained",color:"primary",type:"submit",disabled:s,children:s?"Downloading...":"Download"})})]})}),e(p,{mt:4,children:a(u,{container:!0,spacing:2,direction:"column",alignItems:"center",children:[i.length>0&&e(u,{item:!0,xs:12,children:e(E,{variant:"filled",severity:"success",children:"Files are ready to download!"})}),i.map((c,h)=>e(u,{item:!0,children:a(b,{href:c,target:"_blank",variant:"outlined",children:["Download File ",h+1]})},h))]})})]})})};function Z(){return d.useContext(T),e("div",{children:e($,{position:"static",sx:{backgroundColor:"black",flexGrow:1},children:a(G,{children:[e(p,{sx:{display:"flex",alignItems:"center",flexGrow:1},children:e(y,{variant:"h6",sx:{mr:2,display:{xs:"none",md:"flex"},fontFamily:"monospace",fontWeight:700,letterSpacing:".3rem",color:"inherit",textDecoration:"none"},children:a(C,{to:"/",children:[e(Y,{})," Download App"]})})}),e(b,{color:"inherit",children:e(C,{to:"/register",children:"Sign Up"})})]})})})}function ee(){return a(L,{children:[e(Z,{}),e(_,{})]})}function te(o){return a(y,{variant:"body2",color:"text.secondary",align:"center",...o,children:["Copyright © ",e(S,{color:"inherit",href:"https://mui.com/",children:"Your Website"})," ",new Date().getFullYear(),"."]})}const ne=R();function re(){const[o,r]=d.useState(null),[l,i]=d.useState(null),{setAccessToken:n,setCSRFToken:s}=v(),m=async t=>{t.preventDefault();const c=new FormData(t.currentTarget),h=c.get("username"),w=c.get("password");try{const f=await q.post("login/",{username:h,password:w});n(f.data.data.access),s(f.headers["x-csrftoken"]),r(f.data)}catch(f){console.log(f),i(f.message)}};return a(L,{children:[a("div",{children:[l&&e("p",{children:l.message}),o&&e(z,{to:"/download",replace:!0})]}),e(D,{theme:ne,children:a(k,{component:"main",maxWidth:"xs",children:[e(I,{}),a(p,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[e(P,{sx:{m:1,bgcolor:"secondary.main"},children:e(W,{})}),e(y,{component:"h1",variant:"h5",children:"Sign in"}),a(p,{component:"form",onSubmit:m,noValidate:!0,sx:{mt:1},children:[e(g,{margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",autoFocus:!0}),e(g,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),e(N,{control:e(U,{value:"remember",color:"primary"}),label:"Remember me"}),e(b,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),e(u,{container:!0,children:e(u,{item:!0,children:e(S,{href:"#",variant:"body2",children:"Don't have an account? Sign Up"})})})]})]}),e(te,{sx:{mt:8,mb:4}})]})})]})}function se(o){return a(y,{variant:"body2",color:"text.secondary",align:"center",...o,children:["Copyright © ",e(S,{color:"inherit",href:"/",children:"Your Website"})," ",new Date().getFullYear(),"."]})}const oe=R();function ae(){return e(D,{theme:oe,children:a(k,{component:"main",maxWidth:"xs",children:[e(I,{}),a(p,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[e(P,{sx:{m:1,bgcolor:"secondary.main"},children:e(W,{})}),e(y,{component:"h1",variant:"h5",children:"Sign up"}),a(p,{component:"form",noValidate:!0,onSubmit:r=>{r.preventDefault();const l=new FormData(r.currentTarget);console.log({email:l.get("email"),password:l.get("password")})},sx:{mt:3},children:[a(u,{container:!0,spacing:2,children:[e(u,{item:!0,xs:12,sm:6,children:e(g,{autoComplete:"given-name",name:"firstName",required:!0,fullWidth:!0,id:"firstName",label:"First Name",autoFocus:!0})}),e(u,{item:!0,xs:12,sm:6,children:e(g,{required:!0,fullWidth:!0,id:"lastName",label:"Last Name",name:"lastName",autoComplete:"family-name"})}),e(u,{item:!0,xs:12,children:e(g,{required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email"})}),e(u,{item:!0,xs:12,children:e(g,{required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"new-password"})}),e(u,{item:!0,xs:12,children:e(N,{control:e(U,{value:"allowExtraEmails",color:"primary"}),label:"I want to receive inspiration, marketing promotions and updates via email."})})]}),e(b,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign Up"}),e(u,{container:!0,justifyContent:"flex-end",children:e(u,{item:!0,children:e(C,{to:"/login",children:"Already have an account? Sign in"})})})]})]}),e(se,{sx:{mt:5}})]})})}const ie=V([{path:"/",element:e(ee,{}),children:[{path:"/download",element:e(Q,{})},{path:"/login",element:e(re,{})},{path:"/register",element:e(ae,{})}]}]);M.createRoot(document.getElementById("root")).render(e(X.StrictMode,{children:e(K,{router:ie})}));
(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{114:function(e,t,l){e.exports=l(123)},123:function(e,t,l){"use strict";l.r(t);var a=l(0),n=l.n(a),r=l(88),i=l.n(r),c=(l(95),l(128)),o=l(132),d=l(133),s=l(131);const u=Object(a.createContext)();var p=l(129);const{TextArea:m}=p.a;var h=function(){const{filedata:e,setFiledata:t}=Object(a.useContext)(u);return n.a.createElement(m,{rows:8,placeholder:"\u0421\u0434\u0435\u043b\u0430\u0439\u0442\u0435 \u043d\u043e\u0432\u0443\u044e \u0437\u0430\u043c\u0435\u0442\u043a\u0443",className:"text-field",value:e.text,onInput:l=>{t({key:e.key,text:l.target.value})}})},f=l(130),y=l(90),E=l(134),g=l(109),k=l(110),x=l(135),b=l(136);const{TreeNode:v}=f.a,S=["0"];var N=function(e){let{appData:t}=e;const[l,r]=Object(a.useState)(t),[i,c]=Object(a.useState)(S),{filedata:o,setFiledata:d}=Object(a.useContext)(u);if(null!=o.key){const e=function e(t,l){return l.map((l,a)=>(l.children&&(l.children=e(t,l.children)),l.key===t?(l.title=l.puretitle,l.text=o.text,l):(l.title=l.puretitle,l)))}(o.key,l);localStorage.setItem("mytreedata",JSON.stringify(e))}const s=e=>e.map(e=>(e.isEditable?e.title=n.a.createElement("div",null,n.a.createElement("input",{value:e.value||"",onChange:t=>O(t,e.key)}),n.a.createElement(E.a,{style:{marginLeft:10},onClick:()=>C(e.key,e.defaultValue)}),n.a.createElement(g.a,{style:{marginLeft:10},onClick:()=>I(e.key)})):e.title=n.a.createElement("div",null,n.a.createElement("span",null,e.puretitle),n.a.createElement("span",null,n.a.createElement(k.a,{style:{marginLeft:10},onClick:()=>p(e.key)}),n.a.createElement(x.a,{style:{marginLeft:10},onClick:()=>h(e.key)}),"0"===e.parentKey?null:n.a.createElement(b.a,{style:{marginLeft:10},onClick:()=>T(e.key)}))),e.children?n.a.createElement(v,{title:e.title,key:e.key,text:e.text,puretitle:e.puretitle,isFolder:e.isFolder,defaultValue:e.defaultValue,dataRef:e},s(e.children)):n.a.createElement(v,{title:e.title,key:e.key,text:e.text,puretitle:e.puretitle,isFolder:e.isFolder,defaultValue:e.defaultValue}))),p=e=>{m(e,l),r(l.slice())},m=(e,t)=>t.forEach(t=>{t.key===e?t.isEditable=!0:t.isEditable=!1,t.title=t.defaultValue,t.children&&m(e,t.children)}),h=e=>{-1===i.indexOf(e)&&S.push(e),c(S.slice()),N(e,l),r(l.slice())},N=(e,t)=>t.forEach(t=>{if(t.key===e)return t.children||(t.children=[]),void t.children.push({puretitle:"default",title:"default",text:"",isFolder:!1,key:Object(y.a)()});t.children&&N(e,t.children)}),O=(e,t)=>{F(t,e.target.value,l),r(l.slice())},F=(e,t,l)=>l.forEach(l=>{l.key===e&&(l.value=t,l.puretitle=t),l.children&&F(e,t,l.children)}),I=e=>{j(e,l),r(l.slice())},j=(e,t)=>t.forEach(t=>{t.key===e&&(t.defaultValue=t.puretitle),t.children&&j(e,t.children),t.isEditable=!1}),C=(e,t)=>{d({key:null,text:""}),D(e,t,l),r(l)},D=(e,t,l)=>l.forEach(l=>{l.isEditable=!1,l.key===e&&(l.puretitle=t),l.children&&D(e,t,l.children)}),T=e=>{d({key:null,text:""}),V(e,l),r(l.slice())},V=(e,t)=>t.forEach((l,a)=>{l.key!==e?l.children&&V(e,l.children):t.splice(a,1)});return n.a.createElement(f.a,{className:"draggable-tree",defaultExpandedKeys:i,draggable:!0,showIcon:!0,blockNode:!0,onDragEnter:e=>{c(e.expandedKeys)},onDrop:e=>{console.log("[info onDrop]",e);const t=e.node.key,a=e.dragNode.key,n=e.node.pos.split("-"),i=e.dropPosition-Number(n[n.length-1]),c=(e,t,l)=>{for(let a=0;a<e.length;a++){if(e[a].key===t)return l(e[a],a,e);e[a].children&&c(e[a].children,t,l)}},o=[...l];let s;if(c(o,a,(e,t,l)=>{l.splice(t,1),s=e}),e.dropToGap)if((e.node.props.children||[]).length>0&&e.node.props.expanded&&1===i)c(o,t,e=>{e.children=e.children||[],e.children.unshift(s)});else{let e,l=[];c(o,t,(t,a,n)=>{l=n,e=a}),-1===i?l.splice(e,0,s):l.splice(e+1,0,s)}else c(o,t,e=>{e.children=e.children||[],e.children.unshift(s)});r(o);const u=function e(t){return t.map((t,l)=>(t.children&&(t.children=e(t.children)),t.title=t.puretitle,t))}(o);localStorage.setItem("mytreedata",JSON.stringify(u)),d({key:null,text:""})},onSelect:(e,t)=>{d({key:t.node.key,text:t.node.text})},expandedKeys:i,onExpand:e=>{c(e)}},s(l))};const{Title:O}=c.a;var F=function(e){let{appData:t}=e;const[l,r]=Object(a.useState)({key:null,text:""}),i=(e,t,l)=>{const a=l||"0",n=t||"0";for(let r=0;r<e.length;r++){const t="".concat(a,"-").concat(r);e[r].key=t,e[r].defaultValue=t,e[r].isEditable=!1,e[r].puretitle=e[r].title,e[r].children.length>0&&i(e[r].children,n+1,t)}return e},c=null==localStorage.getItem("mytreedata")?i(t):JSON.parse(t);return null==localStorage.getItem("mytreedata")&&localStorage.setItem("mytreedata",JSON.stringify(c)),n.a.createElement("div",{className:"App"},n.a.createElement(O,{className:"heading"},"The File Tree App"),n.a.createElement("div",{className:"block-bg"},n.a.createElement(o.a,{gutter:8},n.a.createElement(u.Provider,{value:{filedata:l,setFiledata:r}},n.a.createElement(d.a,{span:10},n.a.createElement(s.a,{vertical:"true",justify:"space-between"},n.a.createElement("div",{className:"h-tree"},n.a.createElement(N,{appData:c,filedata:l,className:"text-field"})))),n.a.createElement(d.a,{span:14,offset:0},n.a.createElement(h,null))))))};if(localStorage.getItem("mytreedata")){i.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(F,{appData:localStorage.getItem("mytreedata"),appHello:"Hello Old FileTree"})))}else fetch("".concat("","/initial.json")).then(e=>e.json()).then(e=>{i.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(F,{appData:e,appHello:"Hello New FileTree"})))}).catch(e=>{console.log("[error reading file]",e)})},95:function(e,t,l){}},[[114,1,2]]]);
//# sourceMappingURL=main.3af5eaa5.chunk.js.map
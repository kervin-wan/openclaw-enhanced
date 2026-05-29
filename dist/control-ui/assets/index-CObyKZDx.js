(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const Tn=globalThis,bi=Tn.ShadowRoot&&(Tn.ShadyCSS===void 0||Tn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,yi=Symbol(),Ta=new WeakMap;let Yo=class{constructor(t,n,s){if(this._$cssResult$=!0,s!==yi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(bi&&t===void 0){const s=n!==void 0&&n.length===1;s&&(t=Ta.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ta.set(n,t))}return t}toString(){return this.cssText}};const Vl=e=>new Yo(typeof e=="string"?e:e+"",void 0,yi),Gl=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((s,i,a)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new Yo(n,e,yi)},Ql=(e,t)=>{if(bi)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const s=document.createElement("style"),i=Tn.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=n.cssText,e.appendChild(s)}},_a=bi?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const s of t.cssRules)n+=s.cssText;return Vl(n)})(e):e;const{is:Yl,defineProperty:Zl,getOwnPropertyDescriptor:Xl,getOwnPropertyNames:Jl,getOwnPropertySymbols:ec,getPrototypeOf:tc}=Object,qn=globalThis,Ea=qn.trustedTypes,nc=Ea?Ea.emptyScript:"",sc=qn.reactiveElementPolyfillSupport,qt=(e,t)=>e,In={toAttribute(e,t){switch(t){case Boolean:e=e?nc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},xi=(e,t)=>!Yl(e,t),La={attribute:!0,type:String,converter:In,reflect:!1,useDefault:!1,hasChanged:xi};Symbol.metadata??=Symbol("metadata"),qn.litPropertyMetadata??=new WeakMap;let St=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=La){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,n);i!==void 0&&Zl(this.prototype,t,i)}}static getPropertyDescriptor(t,n,s){const{get:i,set:a}=Xl(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:i,set(o){const l=i?.call(this);a?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??La}static _$Ei(){if(this.hasOwnProperty(qt("elementProperties")))return;const t=tc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(qt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(qt("properties"))){const n=this.properties,s=[...Jl(n),...ec(n)];for(const i of s)this.createProperty(i,n[i])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[s,i]of n)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[n,s]of this.elementProperties){const i=this._$Eu(n,s);i!==void 0&&this._$Eh.set(i,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)n.unshift(_a(i))}else t!==void 0&&n.push(_a(t));return n}static _$Eu(t,n){const s=n.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const s of n.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ql(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,s){this._$AK(t,s)}_$ET(t,n){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const a=(s.converter?.toAttribute!==void 0?s.converter:In).toAttribute(n,s.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,n){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:In;this._$Em=i;const l=o.fromAttribute(n,a.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,n,s,i=!1,a){if(t!==void 0){const o=this.constructor;if(i===!1&&(a=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??xi)(a,n)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,n,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:s,reflect:i,wrapped:a},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(n=void 0),this._$AL.set(t,n)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,a]of s){const{wrapped:o}=a,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,a,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};St.elementStyles=[],St.shadowRootOptions={mode:"open"},St[qt("elementProperties")]=new Map,St[qt("finalized")]=new Map,sc?.({ReactiveElement:St}),(qn.reactiveElementVersions??=[]).push("2.1.2");const $i=globalThis,Ma=e=>e,Rn=$i.trustedTypes,Ia=Rn?Rn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Zo="$lit$",Ve=`lit$${Math.random().toFixed(9).slice(2)}$`,Xo="?"+Ve,ic=`<${Xo}>`,gt=document,Yt=()=>gt.createComment(""),Zt=e=>e===null||typeof e!="object"&&typeof e!="function",wi=Array.isArray,ac=e=>wi(e)||typeof e?.[Symbol.iterator]=="function",ms=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ra=/-->/g,Pa=/>/g,nt=RegExp(`>|${ms}(?:([^\\s"'>=/]+)(${ms}*=${ms}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Da=/'/g,Fa=/"/g,Jo=/^(?:script|style|textarea|title)$/i,er=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),r=er(1),vn=er(2),Qe=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Oa=new WeakMap,dt=gt.createTreeWalker(gt,129);function tr(e,t){if(!wi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ia!==void 0?Ia.createHTML(t):t}const oc=(e,t)=>{const n=e.length-1,s=[];let i,a=t===2?"<svg>":t===3?"<math>":"",o=Pt;for(let l=0;l<n;l++){const c=e[l];let u,p,g=-1,h=0;for(;h<c.length&&(o.lastIndex=h,p=o.exec(c),p!==null);)h=o.lastIndex,o===Pt?p[1]==="!--"?o=Ra:p[1]!==void 0?o=Pa:p[2]!==void 0?(Jo.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=nt):p[3]!==void 0&&(o=nt):o===nt?p[0]===">"?(o=i??Pt,g=-1):p[1]===void 0?g=-2:(g=o.lastIndex-p[2].length,u=p[1],o=p[3]===void 0?nt:p[3]==='"'?Fa:Da):o===Fa||o===Da?o=nt:o===Ra||o===Pa?o=Pt:(o=nt,i=void 0);const f=o===nt&&e[l+1].startsWith("/>")?" ":"";a+=o===Pt?c+ic:g>=0?(s.push(u),c.slice(0,g)+Zo+c.slice(g)+Ve+f):c+Ve+(g===-2?l:f)}return[tr(e,a+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let js=class nr{constructor({strings:t,_$litType$:n},s){let i;this.parts=[];let a=0,o=0;const l=t.length-1,c=this.parts,[u,p]=oc(t,n);if(this.el=nr.createElement(u,s),dt.currentNode=this.el.content,n===2||n===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=dt.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const g of i.getAttributeNames())if(g.endsWith(Zo)){const h=p[o++],f=i.getAttribute(g).split(Ve),d=/([.?@])?(.*)/.exec(h);c.push({type:1,index:a,name:d[2],strings:f,ctor:d[1]==="."?lc:d[1]==="?"?cc:d[1]==="@"?dc:Vn}),i.removeAttribute(g)}else g.startsWith(Ve)&&(c.push({type:6,index:a}),i.removeAttribute(g));if(Jo.test(i.tagName)){const g=i.textContent.split(Ve),h=g.length-1;if(h>0){i.textContent=Rn?Rn.emptyScript:"";for(let f=0;f<h;f++)i.append(g[f],Yt()),dt.nextNode(),c.push({type:2,index:++a});i.append(g[h],Yt())}}}else if(i.nodeType===8)if(i.data===Xo)c.push({type:2,index:a});else{let g=-1;for(;(g=i.data.indexOf(Ve,g+1))!==-1;)c.push({type:7,index:a}),g+=Ve.length-1}a++}}static createElement(t,n){const s=gt.createElement("template");return s.innerHTML=t,s}};function Tt(e,t,n=e,s){if(t===Qe)return t;let i=s!==void 0?n._$Co?.[s]:n._$Cl;const a=Zt(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,s)),s!==void 0?(n._$Co??=[])[s]=i:n._$Cl=i),i!==void 0&&(t=Tt(e,i._$AS(e,t.values),i,s)),t}class rc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:s}=this._$AD,i=(t?.creationScope??gt).importNode(n,!0);dt.currentNode=i;let a=dt.nextNode(),o=0,l=0,c=s[0];for(;c!==void 0;){if(o===c.index){let u;c.type===2?u=new Wn(a,a.nextSibling,this,t):c.type===1?u=new c.ctor(a,c.name,c.strings,this,t):c.type===6&&(u=new uc(a,this,t)),this._$AV.push(u),c=s[++l]}o!==c?.index&&(a=dt.nextNode(),o++)}return dt.currentNode=gt,i}p(t){let n=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,n),n+=s.strings.length-2):s._$AI(t[n])),n++}}let Wn=class sr{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Tt(this,t,n),Zt(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==Qe&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&Zt(this._$AH)?this._$AA.nextSibling.data=t:this.T(gt.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=js.createElement(tr(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(n);else{const a=new rc(i,this),o=a.u(this.options);a.p(n),this.T(o),this._$AH=a}}_$AC(t){let n=Oa.get(t.strings);return n===void 0&&Oa.set(t.strings,n=new js(t)),n}k(t){wi(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,i=0;for(const a of t)i===n.length?n.push(s=new sr(this.O(Yt()),this.O(Yt()),this,this.options)):s=n[i],s._$AI(a),i++;i<n.length&&(this._$AR(s&&s._$AB.nextSibling,i),n.length=i)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const s=Ma(t).nextSibling;Ma(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}};class Vn{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,s,i,a){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=n,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,n=this,s,i){const a=this.strings;let o=!1;if(a===void 0)t=Tt(this,t,n,0),o=!Zt(t)||t!==this._$AH&&t!==Qe,o&&(this._$AH=t);else{const l=t;let c,u;for(t=a[0],c=0;c<a.length-1;c++)u=Tt(this,l[s+c],n,c),u===Qe&&(u=this._$AH[c]),o||=!Zt(u)||u!==this._$AH[c],u===m?t=m:t!==m&&(t+=(u??"")+a[c+1]),this._$AH[c]=u}o&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}let lc=class extends Vn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},cc=class extends Vn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},dc=class extends Vn{constructor(t,n,s,i,a){super(t,n,s,i,a),this.type=5}_$AI(t,n=this){if((t=Tt(this,t,n,0)??m)===Qe)return;const s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},uc=class{constructor(t,n,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Tt(this,t)}};const gc={I:Wn},pc=$i.litHtmlPolyfillSupport;pc?.(js,Wn),($i.litHtmlVersions??=[]).push("3.3.2");const fc=(e,t,n)=>{const s=n?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const a=n?.renderBefore??null;s._$litPart$=i=new Wn(t.insertBefore(Yt(),a),a,void 0,n??{})}return i._$AI(e),i};const ki=globalThis;let Ct=class extends St{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=fc(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qe}};Ct._$litElement$=!0,Ct.finalized=!0,ki.litElementHydrateSupport?.({LitElement:Ct});const hc=ki.litElementPolyfillSupport;hc?.({LitElement:Ct});(ki.litElementVersions??=[]).push("4.2.2");const ir=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const vc={attribute:!0,type:String,converter:In,reflect:!1,hasChanged:xi},mc=(e=vc,t,n)=>{const{kind:s,metadata:i}=n;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),s==="accessor"){const{name:o}=n;return{set(l){const c=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,c,e,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,e,l),l}}}if(s==="setter"){const{name:o}=n;return function(l){const c=this[o];t.call(this,l),this.requestUpdate(o,c,e,!0,l)}}throw Error("Unsupported decorator location: "+s)};function Gn(e){return(t,n)=>typeof n=="object"?mc(e,t,n):((s,i,a)=>{const o=i.hasOwnProperty(a);return i.constructor.createProperty(a,s),o?Object.getOwnPropertyDescriptor(i,a):void 0})(e,t,n)}function w(e){return Gn({...e,state:!0,attribute:!1})}async function xe(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function bc(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function yc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function xc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function pt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function _t(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function ar(e,t,n){if(t.length===0)return;let s=e;for(let a=0;a<t.length-1;a+=1){const o=t[a],l=t[a+1];if(typeof o=="number"){if(!Array.isArray(s))return;s[o]==null&&(s[o]=typeof l=="number"?[]:{}),s=s[o]}else{if(typeof s!="object"||s==null)return;const c=s;c[o]==null&&(c[o]=typeof l=="number"?[]:{}),s=c[o]}}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(s)&&(s[i]=n);return}typeof s=="object"&&s!=null&&(s[i]=n)}function or(e,t){if(t.length===0)return;let n=e;for(let i=0;i<t.length-1;i+=1){const a=t[i];if(typeof a=="number"){if(!Array.isArray(n))return;n=n[a]}else{if(typeof n!="object"||n==null)return;n=n[a]}if(n==null)return}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(n)&&n.splice(s,1);return}typeof n=="object"&&n!=null&&delete n[s]}async function Ee(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});wc(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function rr(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});$c(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function $c(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function wc(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?_t(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=_t(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=pt(t.config??{}),e.configFormOriginal=pt(t.config??{}),e.configRawOriginal=n)}async function _n(e){if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?_t(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:t,baseHash:n}),e.configFormDirty=!1,await Ee(e)}catch(t){e.lastError=String(t)}finally{e.configSaving=!1}}}async function kc(e){if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?_t(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:t,baseHash:n,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Ee(e)}catch(t){e.lastError=String(t)}finally{e.configApplying=!1}}}async function Sc(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function fe(e,t,n){const s=pt(e.configForm??e.configSnapshot?.config??{});ar(s,t,n),e.configForm=s,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=_t(s))}function Ue(e,t){const n=pt(e.configForm??e.configSnapshot?.config??{});or(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=_t(n))}function Ac(e){const{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function Cc(e){const{state:t,callbacks:n,accountId:s}=e,i=Ac(t),a=(l,c,u={})=>{const{type:p="text",placeholder:g,maxLength:h,help:f}=u,d=t.values[l]??"",v=t.fieldErrors[l],S=`nostr-profile-${l}`;return p==="textarea"?r`
        <div class="form-field" style="margin-bottom: 12px;">
          <label for="${S}" style="display: block; margin-bottom: 4px; font-weight: 500;">
            ${c}
          </label>
          <textarea
            id="${S}"
            .value=${d}
            placeholder=${g??""}
            maxlength=${h??2e3}
            rows="3"
            style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; resize: vertical; font-family: inherit;"
            @input=${k=>{const x=k.target;n.onFieldChange(l,x.value)}}
            ?disabled=${t.saving}
          ></textarea>
          ${f?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${f}</div>`:m}
          ${v?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${v}</div>`:m}
        </div>
      `:r`
      <div class="form-field" style="margin-bottom: 12px;">
        <label for="${S}" style="display: block; margin-bottom: 4px; font-weight: 500;">
          ${c}
        </label>
        <input
          id="${S}"
          type=${p}
          .value=${d}
          placeholder=${g??""}
          maxlength=${h??256}
          style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;"
          @input=${k=>{const x=k.target;n.onFieldChange(l,x.value)}}
          ?disabled=${t.saving}
        />
        ${f?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${f}</div>`:m}
        ${v?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${v}</div>`:m}
      </div>
    `},o=()=>{const l=t.values.picture;return l?r`
      <div style="margin-bottom: 12px;">
        <img
          src=${l}
          alt="Profile picture preview"
          style="max-width: 80px; max-height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
          @error=${c=>{const u=c.target;u.style.display="none"}}
          @load=${c=>{const u=c.target;u.style.display="block"}}
        />
      </div>
    `:m};return r`
    <div class="nostr-profile-form" style="padding: 16px; background: var(--bg-secondary); border-radius: 8px; margin-top: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="font-weight: 600; font-size: 16px;">编辑资料</div>
        <div style="font-size: 12px; color: var(--text-muted);">账户: ${s}</div>
      </div>

      ${t.error?r`<div class="callout danger" style="margin-bottom: 12px;">${t.error}</div>`:m}

      ${t.success?r`<div class="callout success" style="margin-bottom: 12px;">${t.success}</div>`:m}

      ${o()}

      ${a("name","用户名",{placeholder:"satoshi",maxLength:256,help:"短用户名（例如：satoshi）"})}

      ${a("displayName","显示名称",{placeholder:"Satoshi Nakamoto",maxLength:256,help:"您的完整显示名称"})}

      ${a("about","简介",{type:"textarea",placeholder:"向别人介绍自己...",maxLength:2e3,help:"简短的个人简介或描述"})}

      ${a("picture","头像URL",{type:"url",placeholder:"https://example.com/avatar.jpg",help:"您头像图片的HTTPS URL"})}

      ${t.showAdvanced?r`
            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
              <div style="font-weight: 500; margin-bottom: 12px; color: var(--text-muted);">高级选项</div>

              ${a("banner","横幅URL",{type:"url",placeholder:"https://example.com/banner.jpg",help:"横幅图片的HTTPS URL"})}

              ${a("website","网站",{type:"url",placeholder:"https://example.com",help:"您的个人网站"})}

              ${a("nip05","NIP-05 标识",{placeholder:"you@example.com",help:"可验证的标识符（例如：you@domain.com）"})}

              ${a("lud16","闪电网络地址",{placeholder:"you@getalby.com",help:"用于打赏的闪电网络地址（LUD-16）"})}
            </div>
          `:m}

      <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
        <button
          class="btn primary"
          @click=${n.onSave}
          ?disabled=${t.saving||!i}
        >
          ${t.saving?"保存中...":"保存并发布"}
        </button>

        <button
          class="btn"
          @click=${n.onImport}
          ?disabled=${t.importing||t.saving}
        >
          ${t.importing?"导入中...":"从转发器导入"}
        </button>

        <button
          class="btn"
          @click=${n.onToggleAdvanced}
        >
          ${t.showAdvanced?"隐藏高级选项":"显示高级选项"}
        </button>

        <button
          class="btn"
          @click=${n.onCancel}
          ?disabled=${t.saving}
        >
          取消
        </button>
      </div>

      ${i?r`<div style="font-size: 12px; color: var(--warning-color); margin-top: 8px;">
            您有未保存的更改
          </div>`:m}
    </div>
  `}function Tc(e){const t={name:e?.name??"",displayName:e?.displayName??"",about:e?.about??"",picture:e?.picture??"",banner:e?.banner??"",website:e?.website??"",nip05:e?.nip05??"",lud16:e?.lud16??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}async function _c(e,t){await bc(e,t),await xe(e,!0)}async function Ec(e){await yc(e),await xe(e,!0)}async function Lc(e){await xc(e),await xe(e,!0)}async function Mc(e){await _n(e),await Ee(e),await xe(e,!0)}async function Ic(e){await Ee(e),await xe(e,!0)}function Rc(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[s,...i]=n.split(":");if(!s||i.length===0)continue;const a=s.trim(),o=i.join(":").trim();a&&o&&(t[a]=o)}return t}function lr(e){return(e.channelsSnapshot?.channelAccounts?.nostr??[])[0]?.accountId??e.nostrProfileAccountId??"default"}function cr(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function Pc(e){const t=e.hello?.auth?.deviceToken?.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const s=e.password.trim();return s?`Bearer ${s}`:null}function dr(e){const t=Pc(e);return t?{Authorization:t}:{}}function Dc(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=Tc(n??void 0)}function Fc(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function Oc(e,t,n){const s=e.nostrProfileFormState;s&&(e.nostrProfileFormState={...s,values:{...s.values,[t]:n},fieldErrors:{...s.fieldErrors,[t]:""}})}function Nc(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function Bc(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=lr(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const s=await fetch(cr(n),{method:"PUT",headers:{"Content-Type":"application/json",...dr(e)},body:JSON.stringify(t.values)}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const a=i?.error??`Profile update failed (${s.status})`;e.nostrProfileFormState={...t,saving:!1,error:a,success:null,fieldErrors:Rc(i?.details)};return}if(!i.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await xe(e,!0)}catch(s){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(s)}`,success:null}}}async function zc(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=lr(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const s=await fetch(cr(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...dr(e)},body:JSON.stringify({autoMerge:!0})}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const c=i?.error??`Profile import failed (${s.status})`;e.nostrProfileFormState={...t,importing:!1,error:c,success:null};return}const a=i.merged??i.imported??null,o=a?{...t.values,...a}:t.values,l=!!(o.banner||o.website||o.nip05||o.lud16);e.nostrProfileFormState={...t,importing:!1,values:o,error:null,success:i.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:l},i.saved&&await xe(e,!0)}catch(s){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(s)}`,success:null}}}const Uc=/<\s*\/?\s*(?:think(?:ing)?|thought|antthinking|final)\b/i,mn=/<\s*\/?\s*final\b[^>]*>/gi,Na=/<\s*(\/?)\s*(?:think(?:ing)?|thought|antthinking)\b[^>]*>/gi;function Hc(e,t){return e.trimStart()}function Kc(e,t){if(!e||!Uc.test(e))return e;let n=e;mn.test(n)?(mn.lastIndex=0,n=n.replace(mn,"")):mn.lastIndex=0,Na.lastIndex=0;let s="",i=0,a=!1;for(const o of n.matchAll(Na)){const l=o.index??0,c=o[1]==="/";a?c&&(a=!1):(s+=n.slice(i,l),c||(a=!0)),i=l+o[0].length}return s+=n.slice(i),Hc(s)}function Xt(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function Y(e){if(!e&&e!==0)return"n/a";const t=Date.now()-e;if(t<0)return"just now";const n=Math.round(t/1e3);if(n<60)return`${n}s ago`;const s=Math.round(n/60);if(s<60)return`${s}m ago`;const i=Math.round(s/60);return i<48?`${i}h ago`:`${Math.round(i/24)}d ago`}function ur(e){if(!e&&e!==0)return"n/a";if(e<1e3)return`${e}ms`;const t=Math.round(e/1e3);if(t<60)return`${t}s`;const n=Math.round(t/60);if(n<60)return`${n}m`;const s=Math.round(n/60);return s<48?`${s}h`:`${Math.round(s/24)}d`}function qs(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function Ws(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function gr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function Pn(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function bs(e){return Kc(e)}const jc=/^\[([^\]]+)\]\s*/,qc=["WebChat","WhatsApp","Telegram","Signal","Slack","Discord","iMessage","Teams","Matrix","Zalo","Zalo Personal","BlueBubbles"],ys=new WeakMap,xs=new WeakMap;function Wc(e){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z\b/.test(e)||/\d{4}-\d{2}-\d{2} \d{2}:\d{2}\b/.test(e)?!0:qc.some(t=>e.startsWith(`${t} `))}function $s(e){const t=e.match(jc);if(!t)return e;const n=t[1]??"";return Wc(n)?e.slice(t[0].length):e}function Vs(e){const t=e,n=typeof t.role=="string"?t.role:"",s=t.content;if(typeof s=="string")return n==="assistant"?bs(s):$s(s);if(Array.isArray(s)){const i=s.map(a=>{const o=a;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(a=>typeof a=="string");if(i.length>0){const a=i.join(`
`);return n==="assistant"?bs(a):$s(a)}}return typeof t.text=="string"?n==="assistant"?bs(t.text):$s(t.text):null}function pr(e){if(!e||typeof e!="object")return Vs(e);const t=e;if(ys.has(t))return ys.get(t)??null;const n=Vs(e);return ys.set(t,n),n}function Ba(e){const n=e.content,s=[];if(Array.isArray(n))for(const l of n){const c=l;if(c.type==="thinking"&&typeof c.thinking=="string"){const u=c.thinking.trim();u&&s.push(u)}}if(s.length>0)return s.join(`
`);const i=Gc(e);if(!i)return null;const o=[...i.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(l=>(l[1]??"").trim()).filter(Boolean);return o.length>0?o.join(`
`):null}function Vc(e){if(!e||typeof e!="object")return Ba(e);const t=e;if(xs.has(t))return xs.get(t)??null;const n=Ba(e);return xs.set(t,n),n}function Gc(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const s=n.map(i=>{const a=i;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(i=>typeof i=="string");if(s.length>0)return s.join(`
`)}return typeof t.text=="string"?t.text:null}function Qc(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map(s=>`_${s}_`);return n.length?["_推理过程:_",...n].join(`
`):""}function za(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Yc(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Si(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),za(t)}return za(Yc())}async function Jt(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200});e.chatMessages=Array.isArray(t.messages)?t.messages:[],e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Zc(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}async function Xc(e,t,n){if(!e.client||!e.connected)return!1;const s=t.trim(),i=n&&n.length>0;if(!s&&!i)return!1;const a=Date.now(),o=[];if(s&&o.push({type:"text",text:s}),i)for(const u of n)o.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:o,timestamp:a}],e.chatSending=!0,e.lastError=null;const l=Si();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=a;const c=i?n.map(u=>{const p=Zc(u.dataUrl);return p?{type:"image",mimeType:p.mimeType,content:p.content}:null}).filter(u=>u!==null):void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:c}),!0}catch(u){const p=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=p,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+p}],timestamp:Date.now()}],!1}finally{e.chatSending=!1}}async function Jc(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function ed(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"final":null;if(t.state==="delta"){const n=Vs(t.message);if(typeof n=="string"){const s=e.chatStream??"";(!s||n.length>=s.length)&&(e.chatStream=n)}}else t.state==="final"||t.state==="aborted"?(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null):t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}async function Mt(e){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const t={includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown},n=Pn(e.sessionsFilterActive,0),s=Pn(e.sessionsFilterLimit,0);n>0&&(t.activeMinutes=n),s>0&&(t.limit=s);const i=await e.client.request("sessions.list",t);i&&(e.sessionsResult=i)}catch(t){e.sessionsError=String(t)}finally{e.sessionsLoading=!1}}}async function td(e,t,n){if(!e.client||!e.connected)return;const s={key:t};"label"in n&&(s.label=n.label),"thinkingLevel"in n&&(s.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(s.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(s.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",s),await Mt(e)}catch(i){e.sessionsError=String(i)}}async function nd(e,t){if(!(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))){e.sessionsLoading=!0,e.sessionsError=null;try{await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),await Mt(e)}catch(s){e.sessionsError=String(s)}finally{e.sessionsLoading=!1}}}const Ua=50,sd=80,id=12e4;function ad(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const s=n.map(i=>{if(!i||typeof i!="object")return null;const a=i;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(i=>!!i);return s.length===0?null:s.join(`
`)}function Ha(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=ad(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const s=gr(n,id);return s.truncated?`${s.text}

… truncated (${s.total} chars, showing first ${s.text.length}).`:s.text}function od(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function rd(e){if(e.toolStreamOrder.length<=Ua)return;const t=e.toolStreamOrder.length-Ua,n=e.toolStreamOrder.splice(0,t);for(const s of n)e.toolStreamById.delete(s)}function ld(e){e.chatToolMessages=e.toolStreamOrder.map(t=>e.toolStreamById.get(t)?.message).filter(t=>!!t)}function Gs(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),ld(e)}function cd(e,t=!1){if(t){Gs(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>Gs(e),sd))}function Ai(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],Gs(e)}const dd=5e3;function ud(e,t){const n=t.data??{},s=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),s==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:s==="end"&&(e.compactionStatus={active:!1,startedAt:e.compactionStatus?.startedAt??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},dd))}function gd(e,t){if(!t)return;if(t.stream==="compaction"){ud(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const s=t.data??{},i=typeof s.toolCallId=="string"?s.toolCallId:"";if(!i)return;const a=typeof s.name=="string"?s.name:"tool",o=typeof s.phase=="string"?s.phase:"",l=o==="start"?s.args:void 0,c=o==="update"?Ha(s.partialResult):o==="result"?Ha(s.result):void 0,u=Date.now();let p=e.toolStreamById.get(i);p?(p.name=a,l!==void 0&&(p.args=l),c!==void 0&&(p.output=c),p.updatedAt=u):(p={toolCallId:i,runId:t.runId,sessionKey:n,name:a,args:l,output:c,startedAt:typeof t.ts=="number"?t.ts:u,updatedAt:u,message:{}},e.toolStreamById.set(i,p),e.toolStreamOrder.push(i)),p.message=od(p),rd(e),cd(e,o==="result")}const Qs=450;function sn(e,t=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const n=()=>{const s=e.querySelector(".chat-thread");if(s){const i=getComputedStyle(s).overflowY;if(i==="auto"||i==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=n();if(!s)return;const i=s.scrollHeight-s.scrollTop-s.clientHeight,a=t&&!e.chatHasAutoScrolled;if(!(a||e.chatUserNearBottom||i<Qs)){e.chatNewMessagesBelow=!0;return}a&&(e.chatHasAutoScrolled=!0),s.scrollTop=s.scrollHeight,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const l=a?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const c=n();if(!c)return;const u=c.scrollHeight-c.scrollTop-c.clientHeight;(a||e.chatUserNearBottom||u<Qs)&&(c.scrollTop=c.scrollHeight,e.chatUserNearBottom=!0)},l)})})}function fr(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;(t||s<80)&&(n.scrollTop=n.scrollHeight)})})}function pd(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=s<Qs,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function fd(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=s<80}function Ka(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function hd(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),s=URL.createObjectURL(n),i=document.createElement("a"),a=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");i.href=s,i.download=`openclaw-logs-${t}-${a}.log`,i.click(),URL.revokeObjectURL(s)}function vd(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:s}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${s}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}const md=2e3,bd=new Set(["trace","debug","info","warn","error","fatal"]);function yd(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function xd(e){if(typeof e!="string")return null;const t=e.toLowerCase();return bd.has(t)?t:null}function $d(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,s=typeof t.time=="string"?t.time:typeof n?.date=="string"?n?.date:null,i=xd(n?.logLevelName??n?.level),a=typeof t[0]=="string"?t[0]:typeof n?.name=="string"?n?.name:null,o=yd(a);let l=null;o&&(typeof o.subsystem=="string"?l=o.subsystem:typeof o.module=="string"&&(l=o.module)),!l&&a&&a.length<120&&(l=a);let c=null;return typeof t[1]=="string"?c=t[1]:!o&&typeof t[0]=="string"?c=t[0]:typeof t.message=="string"&&(c=t.message),{raw:e,time:s,level:i,subsystem:l,message:c??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Ci(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!t?.quiet)){t?.quiet||(e.logsLoading=!0),e.logsError=null;try{const s=await e.client.request("logs.tail",{cursor:t?.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),a=(Array.isArray(s.lines)?s.lines.filter(l=>typeof l=="string"):[]).map($d),o=!!(t?.reset||s.reset||e.logsCursor==null);e.logsEntries=o?a:[...e.logsEntries,...a].slice(-md),typeof s.cursor=="number"&&(e.logsCursor=s.cursor),typeof s.file=="string"&&(e.logsFile=s.file),e.logsTruncated=!!s.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t?.quiet||(e.logsLoading=!1)}}}async function Qn(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t?.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t?.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}async function Yn(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,s,i]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const a=s;e.debugModels=Array.isArray(a?.models)?a?.models:[],e.debugHeartbeat=i}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function wd(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}function kd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>{Qn(e,{quiet:!0})},5e3))}function Sd(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ti(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Ci(e,{quiet:!0})},2e3))}function _i(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Ei(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Yn(e)},3e3))}function Li(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function hr(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function vr(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(s=>!e.agentIdentityById[s]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const s of n){const i=await e.client.request("agent.identity.get",{agentId:s});i&&(e.agentIdentityById={...e.agentIdentityById,[s]:i})}}catch(s){e.agentIdentityError=String(s)}finally{e.agentIdentityLoading=!1}}}async function En(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Mi(e){if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const t=await e.client.request("agents.list",{});if(t){e.agentsList=t;const n=e.agentsSelectedId,s=t.agents.some(i=>i.id===n);(!n||!s)&&(e.agentsSelectedId=t.defaultId??t.agents[0]?.id??null)}}catch(t){e.agentsError=String(t)}finally{e.agentsLoading=!1}}}async function an(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Zn(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function Ad(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",atMs:n}}if(e.scheduleKind==="every"){const n=Pn(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const s=e.everyUnit;return{kind:"every",everyMs:n*(s==="minutes"?6e4:s==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function Cd(e){if(e.payloadKind==="systemEvent"){const i=e.payloadText.trim();if(!i)throw new Error("System event text required.");return{kind:"systemEvent",text:i}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t},s=Pn(e.timeoutSeconds,0);return s>0&&(n.timeoutSeconds=s),n}async function Td(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=Ad(e.cronForm),n=Cd(e.cronForm),s=e.cronForm.sessionTarget==="isolated"&&e.cronForm.payloadKind==="agentTurn"&&e.cronForm.deliveryMode!=="legacy"?{mode:e.cronForm.deliveryMode==="announce"?"announce":e.cronForm.deliveryMode==="deliver"?"deliver":"none",channel:e.cronForm.deliveryChannel.trim()||"last",to:e.cronForm.deliveryTo.trim()||void 0}:void 0,i=e.cronForm.postToMainPrefix.trim()||"Cron",a=e.cronForm.agentId.trim(),o={name:e.cronForm.name.trim(),description:e.cronForm.description.trim()||void 0,agentId:a||void 0,enabled:e.cronForm.enabled,schedule:t,sessionTarget:e.cronForm.sessionTarget,wakeMode:e.cronForm.wakeMode,payload:n,delivery:s,isolation:e.cronForm.sessionTarget==="isolated"&&e.cronForm.deliveryMode==="legacy"?{postToMainPrefix:i}:void 0};if(!o.name)throw new Error("Name required.");await e.client.request("cron.add",o),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await Zn(e),await an(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function _d(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await Zn(e),await an(e)}catch(s){e.cronError=String(s)}finally{e.cronBusy=!1}}}async function Ed(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await mr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Ld(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await Zn(e),await an(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function mr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}const br={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:de,n:Ln,Gx:ja,Gy:qa,a:ws,d:ks,h:Md}=br,ft=32,Ii=64,Id=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},oe=(e="")=>{const t=new Error(e);throw Id(t,oe),t},Rd=e=>typeof e=="bigint",Pd=e=>typeof e=="string",Dd=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Ze=(e,t,n="")=>{const s=Dd(e),i=e?.length,a=t!==void 0;if(!s||a&&i!==t){const o=n&&`"${n}" `,l=a?` of length ${t}`:"",c=s?`length=${i}`:`type=${typeof e}`;oe(o+"expected Uint8Array"+l+", got "+c)}return e},Xn=e=>new Uint8Array(e),yr=e=>Uint8Array.from(e),xr=(e,t)=>e.toString(16).padStart(t,"0"),$r=e=>Array.from(Ze(e)).map(t=>xr(t,2)).join(""),He={_0:48,_9:57,A:65,F:70,a:97,f:102},Wa=e=>{if(e>=He._0&&e<=He._9)return e-He._0;if(e>=He.A&&e<=He.F)return e-(He.A-10);if(e>=He.a&&e<=He.f)return e-(He.a-10)},wr=e=>{const t="hex invalid";if(!Pd(e))return oe(t);const n=e.length,s=n/2;if(n%2)return oe(t);const i=Xn(s);for(let a=0,o=0;a<s;a++,o+=2){const l=Wa(e.charCodeAt(o)),c=Wa(e.charCodeAt(o+1));if(l===void 0||c===void 0)return oe(t);i[a]=l*16+c}return i},kr=()=>globalThis?.crypto,Fd=()=>kr()?.subtle??oe("crypto.subtle must be defined, consider polyfill"),en=(...e)=>{const t=Xn(e.reduce((s,i)=>s+Ze(i).length,0));let n=0;return e.forEach(s=>{t.set(s,n),n+=s.length}),t},Od=(e=ft)=>kr().getRandomValues(Xn(e)),Dn=BigInt,ot=(e,t,n,s="bad number: out of range")=>Rd(e)&&t<=e&&e<n?e:oe(s),F=(e,t=de)=>{const n=e%t;return n>=0n?n:t+n},Sr=e=>F(e,Ln),Nd=(e,t)=>{(e===0n||t<=0n)&&oe("no inverse n="+e+" mod="+t);let n=F(e,t),s=t,i=0n,a=1n;for(;n!==0n;){const o=s/n,l=s%n,c=i-a*o;s=n,n=l,i=a,a=c}return s===1n?F(i,t):oe("no inverse")},Bd=e=>{const t=_r[e];return typeof t!="function"&&oe("hashes."+e+" not set"),t},Ss=e=>e instanceof ke?e:oe("Point expected"),Ys=2n**256n;class ke{static BASE;static ZERO;X;Y;Z;T;constructor(t,n,s,i){const a=Ys;this.X=ot(t,0n,a),this.Y=ot(n,0n,a),this.Z=ot(s,1n,a),this.T=ot(i,0n,a),Object.freeze(this)}static CURVE(){return br}static fromAffine(t){return new ke(t.x,t.y,1n,F(t.x*t.y))}static fromBytes(t,n=!1){const s=ks,i=yr(Ze(t,ft)),a=t[31];i[31]=a&-129;const o=Cr(i);ot(o,0n,n?Ys:de);const c=F(o*o),u=F(c-1n),p=F(s*c+1n);let{isValid:g,value:h}=Ud(u,p);g||oe("bad point: y not sqrt");const f=(h&1n)===1n,d=(a&128)!==0;return!n&&h===0n&&d&&oe("bad point: x==0, isLastByteOdd"),d!==f&&(h=F(-h)),new ke(h,o,1n,F(h*o))}static fromHex(t,n){return ke.fromBytes(wr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=ws,n=ks,s=this;if(s.is0())return oe("bad point: ZERO");const{X:i,Y:a,Z:o,T:l}=s,c=F(i*i),u=F(a*a),p=F(o*o),g=F(p*p),h=F(c*t),f=F(p*F(h+u)),d=F(g+F(n*F(c*u)));if(f!==d)return oe("bad point: equation left != right (1)");const v=F(i*a),S=F(o*l);return v!==S?oe("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:s,Z:i}=this,{X:a,Y:o,Z:l}=Ss(t),c=F(n*l),u=F(a*i),p=F(s*l),g=F(o*i);return c===u&&p===g}is0(){return this.equals(At)}negate(){return new ke(F(-this.X),this.Y,this.Z,F(-this.T))}double(){const{X:t,Y:n,Z:s}=this,i=ws,a=F(t*t),o=F(n*n),l=F(2n*F(s*s)),c=F(i*a),u=t+n,p=F(F(u*u)-a-o),g=c+o,h=g-l,f=c-o,d=F(p*h),v=F(g*f),S=F(p*f),k=F(h*g);return new ke(d,v,k,S)}add(t){const{X:n,Y:s,Z:i,T:a}=this,{X:o,Y:l,Z:c,T:u}=Ss(t),p=ws,g=ks,h=F(n*o),f=F(s*l),d=F(a*g*u),v=F(i*c),S=F((n+s)*(o+l)-h-f),k=F(v-d),x=F(v+d),C=F(f-p*h),A=F(S*k),_=F(x*C),T=F(S*C),I=F(k*x);return new ke(A,_,I,T)}subtract(t){return this.add(Ss(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return At;if(ot(t,1n,Ln),t===1n)return this;if(this.equals(ht))return Xd(t).p;let s=At,i=ht;for(let a=this;t>0n;a=a.double(),t>>=1n)t&1n?s=s.add(a):n&&(i=i.add(a));return s}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:s}=this;if(this.equals(At))return{x:0n,y:1n};const i=Nd(s,de);F(s*i)!==1n&&oe("invalid inverse");const a=F(t*i),o=F(n*i);return{x:a,y:o}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),s=Ar(n);return s[31]|=t&1n?128:0,s}toHex(){return $r(this.toBytes())}clearCofactor(){return this.multiply(Dn(Md),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Ln/2n,!1).double();return Ln%2n&&(t=t.add(this)),t.is0()}}const ht=new ke(ja,qa,1n,F(ja*qa)),At=new ke(0n,1n,1n,0n);ke.BASE=ht;ke.ZERO=At;const Ar=e=>wr(xr(ot(e,0n,Ys),Ii)).reverse(),Cr=e=>Dn("0x"+$r(yr(Ze(e)).reverse())),Ie=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=de;return n},zd=e=>{const n=e*e%de*e%de,s=Ie(n,2n)*n%de,i=Ie(s,1n)*e%de,a=Ie(i,5n)*i%de,o=Ie(a,10n)*a%de,l=Ie(o,20n)*o%de,c=Ie(l,40n)*l%de,u=Ie(c,80n)*c%de,p=Ie(u,80n)*c%de,g=Ie(p,10n)*a%de;return{pow_p_5_8:Ie(g,2n)*e%de,b2:n}},Va=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Ud=(e,t)=>{const n=F(t*t*t),s=F(n*n*t),i=zd(e*s).pow_p_5_8;let a=F(e*n*i);const o=F(t*a*a),l=a,c=F(a*Va),u=o===e,p=o===F(-e),g=o===F(-e*Va);return u&&(a=l),(p||g)&&(a=c),(F(a)&1n)===1n&&(a=F(-a)),{isValid:u||p,value:a}},Zs=e=>Sr(Cr(e)),Ri=(...e)=>_r.sha512Async(en(...e)),Hd=(...e)=>Bd("sha512")(en(...e)),Tr=e=>{const t=e.slice(0,ft);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(ft,Ii),s=Zs(t),i=ht.multiply(s),a=i.toBytes();return{head:t,prefix:n,scalar:s,point:i,pointBytes:a}},Pi=e=>Ri(Ze(e,ft)).then(Tr),Kd=e=>Tr(Hd(Ze(e,ft))),jd=e=>Pi(e).then(t=>t.pointBytes),qd=e=>Ri(e.hashable).then(e.finish),Wd=(e,t,n)=>{const{pointBytes:s,scalar:i}=e,a=Zs(t),o=ht.multiply(a).toBytes();return{hashable:en(o,s,n),finish:u=>{const p=Sr(a+Zs(u)*i);return Ze(en(o,Ar(p)),Ii)}}},Vd=async(e,t)=>{const n=Ze(e),s=await Pi(t),i=await Ri(s.prefix,n);return qd(Wd(s,i,n))},_r={sha512Async:async e=>{const t=Fd(),n=en(e);return Xn(await t.digest("SHA-512",n.buffer))},sha512:void 0},Gd=(e=Od(ft))=>e,Qd={getExtendedPublicKeyAsync:Pi,getExtendedPublicKey:Kd,randomSecretKey:Gd},Fn=8,Yd=256,Er=Math.ceil(Yd/Fn)+1,Xs=2**(Fn-1),Zd=()=>{const e=[];let t=ht,n=t;for(let s=0;s<Er;s++){n=t,e.push(n);for(let i=1;i<Xs;i++)n=n.add(t),e.push(n);t=n.double()}return e};let Ga;const Qa=(e,t)=>{const n=t.negate();return e?n:t},Xd=e=>{const t=Ga||(Ga=Zd());let n=At,s=ht;const i=2**Fn,a=i,o=Dn(i-1),l=Dn(Fn);for(let c=0;c<Er;c++){let u=Number(e&o);e>>=l,u>Xs&&(u-=a,e+=1n);const p=c*Xs,g=p,h=p+Math.abs(u)-1,f=c%2!==0,d=u<0;u===0?s=s.add(Qa(f,t[g])):n=n.add(Qa(d,t[h]))}return e!==0n&&oe("invalid wnaf"),{p:n,f:s}},As="clawdbot-device-identity-v1";function Js(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Lr(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),s=atob(n),i=new Uint8Array(s.length);for(let a=0;a<s.length;a+=1)i[a]=s.charCodeAt(a);return i}function Jd(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function Mr(e){const t=await crypto.subtle.digest("SHA-256",e);return Jd(new Uint8Array(t))}async function eu(){const e=Qd.randomSecretKey(),t=await jd(e);return{deviceId:await Mr(t),publicKey:Js(t),privateKey:Js(e)}}async function Di(){try{const n=localStorage.getItem(As);if(n){const s=JSON.parse(n);if(s?.version===1&&typeof s.deviceId=="string"&&typeof s.publicKey=="string"&&typeof s.privateKey=="string"){const i=await Mr(Lr(s.publicKey));if(i!==s.deviceId){const a={...s,deviceId:i};return localStorage.setItem(As,JSON.stringify(a)),{deviceId:i,publicKey:s.publicKey,privateKey:s.privateKey}}return{deviceId:s.deviceId,publicKey:s.publicKey,privateKey:s.privateKey}}}}catch{}const e=await eu(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(As,JSON.stringify(t)),e}async function tu(e,t){const n=Lr(e),s=new TextEncoder().encode(t),i=await Vd(s,n);return Js(i)}const Ir="clawdbot.device.auth.v1";function Fi(e){return e.trim()}function nu(e){if(!Array.isArray(e))return[];const t=new Set;for(const n of e){const s=n.trim();s&&t.add(s)}return[...t].sort()}function Oi(){try{const e=window.localStorage.getItem(Ir);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Rr(e){try{window.localStorage.setItem(Ir,JSON.stringify(e))}catch{}}function su(e){const t=Oi();if(!t||t.deviceId!==e.deviceId)return null;const n=Fi(e.role),s=t.tokens[n];return!s||typeof s.token!="string"?null:s}function Pr(e){const t=Fi(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},s=Oi();s&&s.deviceId===e.deviceId&&(n.tokens={...s.tokens});const i={token:e.token,role:t,scopes:nu(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=i,Rr(n),i}function Dr(e){const t=Oi();if(!t||t.deviceId!==e.deviceId)return;const n=Fi(e.role);if(!t.tokens[n])return;const s={...t,tokens:{...t.tokens}};delete s.tokens[n],Rr(s)}async function Xe(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t?.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n?.pending)?n.pending:[],paired:Array.isArray(n?.paired)?n.paired:[]}}catch(n){t?.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function iu(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Xe(e)}catch(n){e.devicesError=String(n)}}async function au(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Xe(e)}catch(s){e.devicesError=String(s)}}async function ou(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n?.token){const s=await Di(),i=n.role??t.role;(n.deviceId===s.deviceId||t.deviceId===s.deviceId)&&Pr({deviceId:s.deviceId,role:i,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Xe(e)}catch(n){e.devicesError=String(n)}}async function ru(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const s=await Di();t.deviceId===s.deviceId&&Dr({deviceId:s.deviceId,role:t.role}),await Xe(e)}catch(s){e.devicesError=String(s)}}function lu(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function cu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Ni(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=lu(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const s=await e.client.request(n.method,n.params);du(e,s)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function du(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=pt(t.file??{}))}async function uu(e,t){if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const n=e.execApprovalsSnapshot?.hash;if(!n){e.lastError="Exec approvals hash missing; reload and retry.";return}const s=e.execApprovalsForm??e.execApprovalsSnapshot?.file??{},i=cu(t,{file:s,baseHash:n});if(!i){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(i.method,i.params),e.execApprovalsDirty=!1,await Ni(e,t)}catch(n){e.lastError=String(n)}finally{e.execApprovalsSaving=!1}}}function gu(e,t,n){const s=pt(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});ar(s,t,n),e.execApprovalsForm=s,e.execApprovalsDirty=!0}function pu(e,t){const n=pt(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});or(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}async function Bi(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}function Et(e,t,n){if(!t.trim())return;const s={...e.skillMessages};n?s[t]=n:delete s[t],e.skillMessages=s}function Jn(e){return e instanceof Error?e.message:String(e)}async function on(e,t){if(t?.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=Jn(n)}finally{e.skillsLoading=!1}}}function fu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function hu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await on(e),Et(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(s){const i=Jn(s);e.skillsError=i,Et(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function vu(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await on(e),Et(e,t,{kind:"success",message:"API key saved"})}catch(n){const s=Jn(n);e.skillsError=s,Et(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function mu(e,t,n,s){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const i=await e.client.request("skills.install",{name:n,installId:s,timeoutMs:12e4});await on(e),Et(e,t,{kind:"success",message:i?.message??"Installed"})}catch(i){const a=Jn(i);e.skillsError=a,Et(e,t,{kind:"error",message:a})}finally{e.skillsBusyKey=null}}}async function zi(e,t){if(!(!e.client||!e.connected)&&!e.usageLoading){e.usageLoading=!0,e.usageError=null;try{const n=t?.startDate??e.usageStartDate,s=t?.endDate??e.usageEndDate,[i,a]=await Promise.all([e.client.request("sessions.usage",{startDate:n,endDate:s,limit:1e3,includeContextWeight:!0}),e.client.request("usage.cost",{startDate:n,endDate:s})]);i&&(e.usageResult=i),a&&(e.usageCostSummary=a)}catch(n){e.usageError=String(n)}finally{e.usageLoading=!1}}}async function bu(e,t){if(!(!e.client||!e.connected)&&!e.usageTimeSeriesLoading){e.usageTimeSeriesLoading=!0,e.usageTimeSeries=null;try{const n=await e.client.request("sessions.usage.timeseries",{key:t});n&&(e.usageTimeSeries=n)}catch{e.usageTimeSeries=null}finally{e.usageTimeSeriesLoading=!1}}}async function yu(e,t){if(!(!e.client||!e.connected)&&!e.usageSessionLogsLoading){e.usageSessionLogsLoading=!0,e.usageSessionLogs=null;try{const n=await e.client.request("sessions.usage.logs",{key:t,limit:500});n&&Array.isArray(n.logs)&&(e.usageSessionLogs=n.logs)}catch{e.usageSessionLogs=null}finally{e.usageSessionLogsLoading=!1}}}const xu=[{label:"对话",tabs:["chat"]},{label:"控制",tabs:["overview","channels","instances","sessions","usage","cron","enhanced"]},{label:"代理",tabs:["agents","skills","nodes"]},{label:"设置",tabs:["config","debug","logs"]}],Fr={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",usage:"/usage",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},Or=new Map(Object.entries(Fr).map(([e,t])=>[t,e]));function rn(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function tn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function Ui(e,t=""){const n=rn(t),s=Fr[e];return n?`${n}${s}`:s}function Nr(e,t=""){const n=rn(t);let s=e||"/";n&&(s===n?s="/":s.startsWith(`${n}/`)&&(s=s.slice(n.length)));let i=tn(s).toLowerCase();return i.endsWith("/index.html")&&(i="/"),i==="/"?"chat":Or.get(i)??null}function $u(e){let t=tn(e);if(t.endsWith("/index.html")&&(t=tn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let s=0;s<n.length;s++){const i=`/${n.slice(s).join("/")}`.toLowerCase();if(Or.has(i)){const a=n.slice(0,s);return a.length?`/${a.join("/")}`:""}}return`/${n.join("/")}`}function wu(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"link";case"instances":return"radio";case"sessions":return"fileText";case"usage":return"barChart";case"cron":return"loader";case"enhanced":return"brain";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function ei(e){switch(e){case"agents":return"代理";case"overview":return"概览";case"channels":return"通道";case"instances":return"实例";case"sessions":return"会话";case"usage":return"用量";case"cron":return"定时任务";case"enhanced":return"功能面板";case"skills":return"技能";case"nodes":return"节点";case"chat":return"对话";case"config":return"配置";case"debug":return"调试";case"logs":return"日志";default:return"控制"}}function ku(e){switch(e){case"agents":return"管理代理工作区、工具和身份。";case"overview":return"网关状态、入口和快速健康检查。";case"channels":return"管理通道和设置。";case"instances":return"来自已连接客户端和节点的存在信标。";case"sessions":return"查看活跃会话并调整每会话默认设置。";case"usage":return"";case"cron":return"安排唤醒和定期代理运行。";case"enhanced":return"增强版功能面板：模型质量、Hook 错误、热重载。";case"skills":return"管理技能可用性和 API 密钥注入。";case"nodes":return"配对设备、功能和命令暴露。";case"chat":return"网关直连对话会话，用于快速操作。";case"config":return"安全编辑 ~/.openclaw/openclaw.json。";case"debug":return"网关快照、事件和手动 RPC 调用。";case"logs":return"实时追踪网关文件日志。";default:return""}}const Br="clawdbot.control.settings.v1";function Su(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,sendOnEnter:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(Br);if(!n)return t;const s=JSON.parse(n);return{gatewayUrl:typeof s.gatewayUrl=="string"&&s.gatewayUrl.trim()?s.gatewayUrl.trim():t.gatewayUrl,token:typeof s.token=="string"?s.token:t.token,sessionKey:typeof s.sessionKey=="string"&&s.sessionKey.trim()?s.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof s.lastActiveSessionKey=="string"&&s.lastActiveSessionKey.trim()?s.lastActiveSessionKey.trim():typeof s.sessionKey=="string"&&s.sessionKey.trim()||t.lastActiveSessionKey,theme:s.theme==="light"||s.theme==="dark"||s.theme==="system"?s.theme:t.theme,chatFocusMode:typeof s.chatFocusMode=="boolean"?s.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof s.chatShowThinking=="boolean"?s.chatShowThinking:t.chatShowThinking,sendOnEnter:typeof s.sendOnEnter=="boolean"?s.sendOnEnter:t.sendOnEnter,splitRatio:typeof s.splitRatio=="number"&&s.splitRatio>=.4&&s.splitRatio<=.7?s.splitRatio:t.splitRatio,navCollapsed:typeof s.navCollapsed=="boolean"?s.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof s.navGroupsCollapsed=="object"&&s.navGroupsCollapsed!==null?s.navGroupsCollapsed:t.navGroupsCollapsed}}catch{return t}}function Au(e){localStorage.setItem(Br,JSON.stringify(e))}const bn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,Cu=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,yn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},Tu=({nextTheme:e,applyTheme:t,context:n,currentTheme:s})=>{if(s===e)return;const i=globalThis.document??null;if(!i){t();return}const a=i.documentElement,o=i,l=Cu();if(!!o.startViewTransition&&!l){let u=.5,p=.5;if(n?.pointerClientX!==void 0&&n?.pointerClientY!==void 0&&typeof window<"u")u=bn(n.pointerClientX/window.innerWidth),p=bn(n.pointerClientY/window.innerHeight);else if(n?.element){const g=n.element.getBoundingClientRect();g.width>0&&g.height>0&&typeof window<"u"&&(u=bn((g.left+g.width/2)/window.innerWidth),p=bn((g.top+g.height/2)/window.innerHeight))}a.style.setProperty("--theme-switch-x",`${u*100}%`),a.style.setProperty("--theme-switch-y",`${p*100}%`),a.classList.add("theme-transition");try{const g=o.startViewTransition?.(()=>{t()});g?.finished?g.finished.finally(()=>yn(a)):yn(a)}catch{yn(a),t()}return}t(),yn(a)};function _u(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Hi(e){return e==="system"?_u():e}function Ye(e,t){const n={...t,lastActiveSessionKey:t.lastActiveSessionKey?.trim()||t.sessionKey.trim()||"main"};e.settings=n,Au(n),t.theme!==e.theme&&(e.theme=t.theme,es(e,Hi(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function zr(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&Ye(e,{...e.settings,lastActiveSessionKey:n})}function Eu(e){if(!window.location.search)return;const t=new URLSearchParams(window.location.search),n=t.get("token"),s=t.get("password"),i=t.get("session"),a=t.get("gatewayUrl");let o=!1;if(n!=null){const c=n.trim();c&&Ye(e,{...e.settings,token:c}),t.delete("token"),o=!0}if(s!=null){const c=s.trim();c&&(e.password=c),t.delete("password"),o=!0}if(i!=null){const c=i.trim();c&&(e.sessionKey=c,Ye(e,{...e.settings,sessionKey:c,lastActiveSessionKey:c}))}if(a!=null){const c=a.trim();c&&c!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=c),t.delete("gatewayUrl"),o=!0}if(!o)return;const l=new URL(window.location.href);l.search=t.toString(),window.history.replaceState({},"",l.toString())}function Lu(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ti(e):_i(e),t==="debug"?Ei(e):Li(e),Ki(e),Hr(e,t,!1)}function Mu(e,t,n){Tu({nextTheme:t,applyTheme:()=>{e.theme=t,Ye(e,{...e.settings,theme:t}),es(e,Hi(t))},context:n,currentTheme:e.theme})}async function Ki(e){if(e.tab==="overview"&&await Kr(e),e.tab==="channels"&&await Bu(e),e.tab==="instances"&&await Bi(e),e.tab==="sessions"&&await Mt(e),e.tab==="usage"&&await zi(e),e.tab==="cron"&&await On(e),e.tab==="enhanced"&&(1),e.tab==="skills"&&await on(e),e.tab==="agents"){await Mi(e),await Ee(e);const t=e.agentsList?.agents?.map(s=>s.id)??[];t.length>0&&vr(e,t);const n=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id;n&&(hr(e,n),e.agentsPanel==="skills"&&En(e,n),e.agentsPanel==="channels"&&xe(e,!1),e.agentsPanel==="cron"&&On(e))}e.tab==="nodes"&&(await Qn(e),await Xe(e),await Ee(e),await Ni(e)),e.tab==="chat"&&(await Qr(e),sn(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await rr(e),await Ee(e)),e.tab==="debug"&&(await Yn(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Ci(e,{reset:!0}),fr(e,!0))}function Iu(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?rn(e):$u(window.location.pathname)}function Ru(e){e.theme=e.settings.theme??"system",es(e,Hi(e.theme))}function es(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function Pu(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&es(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function Du(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Fu(e,t){if(typeof window>"u")return;const n=Nr(window.location.pathname,e.basePath)??"chat";Ur(e,n),Hr(e,n,t)}function Ou(e){if(typeof window>"u")return;const t=Nr(window.location.pathname,e.basePath);if(!t)return;const s=new URL(window.location.href).searchParams.get("session")?.trim();s&&(e.sessionKey=s,Ye(e,{...e.settings,sessionKey:s,lastActiveSessionKey:s})),Ur(e,t)}function Ur(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ti(e):_i(e),t==="debug"?Ei(e):Li(e),e.connected&&Ki(e)}function Hr(e,t,n){if(typeof window>"u")return;const s=tn(Ui(t,e.basePath)),i=tn(window.location.pathname),a=new URL(window.location.href);t==="chat"&&e.sessionKey?a.searchParams.set("session",e.sessionKey):a.searchParams.delete("session"),i!==s&&(a.pathname=s),n?window.history.replaceState({},"",a.toString()):window.history.pushState({},"",a.toString())}function Nu(e,t,n){if(typeof window>"u")return;const s=new URL(window.location.href);s.searchParams.set("session",t),window.history.replaceState({},"",s.toString())}async function Kr(e){await Promise.all([xe(e,!1),Bi(e),Mt(e),an(e),Yn(e)])}async function Bu(e){await Promise.all([xe(e,!0),rr(e),Ee(e)])}async function On(e){await Promise.all([xe(e,!1),an(e),Zn(e)])}function jr(e){const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const s=n[1]?.trim(),i=n.slice(2).join(":");return!s||!i?null:{agentId:s,rest:i}}function qr(e){return e.chatSending||!!e.chatRunId}function zu(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}async function Wr(e){e.connected&&(e.chatMessage="",await Jc(e))}function Uu(e,t,n){const s=t.trim(),i=!!(n&&n.length>0);!s&&!i||(e.chatQueue=[...e.chatQueue,{id:Si(),text:s,createdAt:Date.now(),attachments:i?n?.map(a=>({...a})):void 0}])}async function Vr(e,t,n){Ai(e);const s=await Xc(e,t,n?.attachments);return!s&&n?.previousDraft!=null&&(e.chatMessage=n.previousDraft),!s&&n?.previousAttachments&&(e.chatAttachments=n.previousAttachments),s&&zr(e,e.sessionKey),s&&n?.restoreDraft&&n.previousDraft?.trim()&&(e.chatMessage=n.previousDraft),s&&n?.restoreAttachments&&n.previousAttachments?.length&&(e.chatAttachments=n.previousAttachments),sn(e),s&&!e.chatRunId&&Gr(e),s}async function Gr(e){if(!e.connected||qr(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await Vr(e,t.text,{attachments:t.attachments})||(e.chatQueue=[t,...e.chatQueue])}function Hu(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Ku(e,t,n){if(!e.connected)return;const s=e.chatMessage,i=(t??e.chatMessage).trim(),a=e.chatAttachments??[],o=t==null?a:[],l=o.length>0;if(!(!i&&!l)){if(zu(i)){await Wr(e);return}if(t==null&&(e.chatMessage="",e.chatAttachments=[]),qr(e)){Uu(e,i,o);return}await Vr(e,i,{previousDraft:t==null?s:void 0,restoreDraft:!!(t&&n?.restoreDraft),attachments:l?o:void 0,previousAttachments:t==null?a:void 0,restoreAttachments:!!(t&&n?.restoreDraft)})}}async function Qr(e){await Promise.all([Jt(e),Mt(e),ti(e)]),sn(e)}const ju=Gr;function qu(e){const t=jr(e.sessionKey);return t?.agentId?t.agentId:e.hello?.snapshot?.sessionDefaults?.defaultAgentId?.trim()||"main"}function Wu(e,t){const n=rn(e),s=encodeURIComponent(t);return n?`${n}/avatar/${s}?meta=1`:`/avatar/${s}?meta=1`}async function ti(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=qu(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Wu(e.basePath,t);try{const s=await fetch(n,{method:"GET"});if(!s.ok){e.chatAvatarUrl=null;return}const i=await s.json(),a=typeof i.avatarUrl=="string"?i.avatarUrl.trim():"";e.chatAvatarUrl=a||null}catch{e.chatAvatarUrl=null}}const Vu={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},Gu={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"next-heartbeat",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:"",postToMainPrefix:"Cron"},Qu={CONTROL_UI:"clawdbot-control-ui"},Ya=Qu,Za={WEBCHAT:"webchat"};function Yu(e){const t=e.version??(e.nonce?"v2":"v1"),n=e.scopes.join(","),s=e.token??"",i=[t,e.deviceId,e.clientId,e.clientMode,e.role,n,String(e.signedAtMs),s];return t==="v2"&&i.push(e.nonce??""),i.join("|")}const Zu=4008;class Xu{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){this.closed=!0,this.ws?.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){return this.ws?.readyState===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.onopen=()=>this.queueConnect(),this.ws.onmessage=t=>this.handleMessage(String(t.data??"")),this.ws.onclose=t=>{const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),this.opts.onClose?.({code:t.code,reason:n}),this.scheduleReconnect()},this.ws.onerror=()=>{})}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],s="operator";let i=null,a=!1,o=this.opts.token;if(t){i=await Di();const p=su({deviceId:i.deviceId,role:s})?.token;o=p??this.opts.token,a=!!(p&&this.opts.token)}const l=o||this.opts.password?{token:o,password:this.opts.password}:void 0;let c;if(t&&i){const p=Date.now(),g=this.connectNonce??void 0,h=Yu({deviceId:i.deviceId,clientId:this.opts.clientName??Ya.CONTROL_UI,clientMode:this.opts.mode??Za.WEBCHAT,role:s,scopes:n,signedAtMs:p,token:o??null,nonce:g}),f=await tu(i.privateKey,h);c={id:i.deviceId,publicKey:i.publicKey,signature:f,signedAt:p,nonce:g}}const u={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Ya.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Za.WEBCHAT,instanceId:this.opts.instanceId},role:s,scopes:n,device:c,caps:[],auth:l,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",u).then(p=>{p?.auth?.deviceToken&&i&&Pr({deviceId:i.deviceId,role:p.auth.role??s,token:p.auth.deviceToken,scopes:p.auth.scopes??[]}),this.backoffMs=800,this.opts.onHello?.(p)}).catch(()=>{a&&i&&Dr({deviceId:i.deviceId,role:s}),this.ws?.close(Zu,"connect failed")})}handleMessage(t){let n;try{n=JSON.parse(t)}catch{return}const s=n;if(s.type==="event"){const i=n;if(i.event==="connect.challenge"){const o=i.payload,l=o&&typeof o.nonce=="string"?o.nonce:null;l&&(this.connectNonce=l,this.sendConnect());return}const a=typeof i.seq=="number"?i.seq:null;a!==null&&(this.lastSeq!==null&&a>this.lastSeq+1&&this.opts.onGap?.({expected:this.lastSeq+1,received:a}),this.lastSeq=a);try{this.opts.onEvent?.(i)}catch(o){console.error("[gateway] event handler error:",o)}return}if(s.type==="res"){const i=n,a=this.pending.get(i.id);if(!a)return;this.pending.delete(i.id),i.ok?a.resolve(i.payload):a.reject(new Error(i.error?.message??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const s=Si(),i={type:"req",id:s,method:t,params:n},a=new Promise((o,l)=>{this.pending.set(s,{resolve:c=>o(c),reject:l})});return this.ws.send(JSON.stringify(i)),a}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function ni(e){return typeof e=="object"&&e!==null}function Ju(e){if(!ni(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!ni(n))return null;const s=typeof n.command=="string"?n.command.trim():"";if(!s)return null;const i=typeof e.createdAtMs=="number"?e.createdAtMs:0,a=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!i||!a?null:{id:t,request:{command:s,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:i,expiresAtMs:a}}function eg(e){if(!ni(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Yr(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function tg(e,t){const n=Yr(e).filter(s=>s.id!==t.id);return n.push(t),n}function Xa(e,t){return Yr(e).filter(n=>n.id!==t)}const ng=50,sg=200,ig="Assistant";function Ja(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function si(e){const t=Ja(e?.name,ng)??ig,n=Ja(e?.avatar??void 0,sg)??null;return{agentId:typeof e?.agentId=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}function ag(){return si(typeof window>"u"?{}:{name:window.__CLAWDBOT_ASSISTANT_NAME__,avatar:window.__CLAWDBOT_ASSISTANT_AVATAR__})}async function Zr(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),s=n?{sessionKey:n}:{};try{const i=await e.client.request("agent.identity.get",s);if(!i)return;const a=si(i);e.assistantName=a.name,e.assistantAvatar=a.avatar,e.assistantAgentId=a.agentId??null}catch{}}function Cs(e,t){const n=(e??"").trim(),s=t.mainSessionKey?.trim();if(!s)return n;if(!n)return s;const i=t.mainKey?.trim()||"main",a=t.defaultAgentId?.trim();return n==="main"||n===i||a&&(n===`agent:${a}:main`||n===`agent:${a}:${i}`)?s:n}function og(e,t){if(!t?.mainSessionKey)return;const n=Cs(e.sessionKey,t),s=Cs(e.settings.sessionKey,t),i=Cs(e.settings.lastActiveSessionKey,t),a=n||s||e.sessionKey,o={...e.settings,sessionKey:s||a,lastActiveSessionKey:i||a},l=o.sessionKey!==e.settings.sessionKey||o.lastActiveSessionKey!==e.settings.lastActiveSessionKey;a!==e.sessionKey&&(e.sessionKey=a),l&&Ye(e,o)}function Xr(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null,e.client?.stop(),e.client=new Xu({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"clawdbot-control-ui",mode:"webchat",onHello:t=>{e.connected=!0,e.lastError=null,e.hello=t,dg(e,t),Zr(e),Mi(e),Qn(e,{quiet:!0}),Xe(e,{quiet:!0}),Ki(e),cg(e)},onClose:({code:t,reason:n})=>{e.connected=!1,t!==1012&&(e.lastError=`disconnected (${t}): ${n||"no reason"}`)},onEvent:t=>rg(e,t),onGap:({expected:t,received:n})=>{e.lastError=`event gap detected (expected seq ${t}, got ${n}); refresh recommended`}}),e.client.start()}function rg(e,t){try{lg(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function lg(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;gd(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n?.sessionKey&&zr(e,n.sessionKey);const s=ed(e,n);(s==="final"||s==="error"||s==="aborted")&&(Ai(e),ju(e)),s==="final"&&Jt(e);return}if(t.event==="presence"){const n=t.payload;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&On(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Xe(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Ju(t.payload);if(n){e.execApprovalQueue=tg(e.execApprovalQueue,n),e.execApprovalError=null;const s=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=Xa(e.execApprovalQueue,n.id)},s)}return}if(t.event==="exec.approval.resolved"){const n=eg(t.payload);n&&(e.execApprovalQueue=Xa(e.execApprovalQueue,n.id))}}async function cg(e){if(!(!e.client||e.chatModelsLoading)){e.chatModelsLoading=!0;try{const t=await e.client.request("models.list",{});e.chatModels=Array.isArray(t?.models)?t.models:[],e.chatDefaultModel=t?.defaultModel??null,e.chatDefaultProvider=t?.defaultProvider??null}catch{e.chatModels=[],e.chatDefaultModel=null,e.chatDefaultProvider=null}finally{e.chatModelsLoading=!1}}}function dg(e,t){const n=t.snapshot;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n?.health&&(e.debugHealth=n.health),n?.sessionDefaults&&og(e,n.sessionDefaults)}function ug(e){e.basePath=Iu(),Fu(e,!0),Ru(e),Pu(e),window.addEventListener("popstate",e.popStateHandler),Eu(e),Xr(e),kd(e),e.tab==="logs"&&Ti(e),e.tab==="debug"&&Ei(e)}function gg(e){vd(e)}function pg(e){window.removeEventListener("popstate",e.popStateHandler),Sd(e),_i(e),Li(e),Du(e),e.topbarObserver?.disconnect(),e.topbarObserver=null}function fg(e,t){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),s=t.has("chatLoading")&&t.get("chatLoading")===!0&&e.chatLoading===!1;sn(e,n||s||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&fr(e,t.has("tab")||t.has("logsAutoFollow"))}const ji={CHILD:2},qi=e=>(...t)=>({_$litDirective$:e,values:t});let Wi=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,s){this._$Ct=t,this._$AM=n,this._$Ci=s}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const{I:hg}=gc,eo=e=>e,vg=e=>e.strings===void 0,to=()=>document.createComment(""),Dt=(e,t,n)=>{const s=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0){const a=s.insertBefore(to(),i),o=s.insertBefore(to(),i);n=new hg(a,o,e,e.options)}else{const a=n._$AB.nextSibling,o=n._$AM,l=o!==e;if(l){let c;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==o._$AU&&n._$AP(c)}if(a!==i||l){let c=n._$AA;for(;c!==a;){const u=eo(c).nextSibling;eo(s).insertBefore(c,i),c=u}}}return n},st=(e,t,n=e)=>(e._$AI(t,n),e),mg={},bg=(e,t=mg)=>e._$AH=t,yg=e=>e._$AH,Ts=e=>{e._$AR(),e._$AA.remove()};const no=(e,t,n)=>{const s=new Map;for(let i=t;i<=n;i++)s.set(e[i],i);return s},ii=qi(class extends Wi{constructor(e){if(super(e),e.type!==ji.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let s;n===void 0?n=t:t!==void 0&&(s=t);const i=[],a=[];let o=0;for(const l of e)i[o]=s?s(l,o):o,a[o]=n(l,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,s]){const i=yg(e),{values:a,keys:o}=this.dt(t,n,s);if(!Array.isArray(i))return this.ut=o,a;const l=this.ut??=[],c=[];let u,p,g=0,h=i.length-1,f=0,d=a.length-1;for(;g<=h&&f<=d;)if(i[g]===null)g++;else if(i[h]===null)h--;else if(l[g]===o[f])c[f]=st(i[g],a[f]),g++,f++;else if(l[h]===o[d])c[d]=st(i[h],a[d]),h--,d--;else if(l[g]===o[d])c[d]=st(i[g],a[d]),Dt(e,c[d+1],i[g]),g++,d--;else if(l[h]===o[f])c[f]=st(i[h],a[f]),Dt(e,i[g],i[h]),h--,f++;else if(u===void 0&&(u=no(o,f,d),p=no(l,g,h)),u.has(l[g]))if(u.has(l[h])){const v=p.get(o[f]),S=v!==void 0?i[v]:null;if(S===null){const k=Dt(e,i[g]);st(k,a[f]),c[f]=k}else c[f]=st(S,a[f]),Dt(e,i[g],S),i[v]=null;f++}else Ts(i[h]),h--;else Ts(i[g]),g++;for(;f<=d;){const v=Dt(e,c[d+1]);st(v,a[f]),c[f++]=v}for(;g<=h;){const v=i[g++];v!==null&&Ts(v)}return this.ut=o,bg(e,c),Qe}}),le={messageSquare:r`
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  `,barChart:r`
    <svg viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  `,link:r`
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  `,radio:r`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
      />
    </svg>
  `,fileText:r`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  `,zap:r`
    <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  `,monitor:r`
    <svg viewBox="0 0 24 24">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  `,settings:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,bug:r`
    <svg viewBox="0 0 24 24">
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  `,scrollText:r`
    <svg viewBox="0 0 24 24">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" />
      <path d="M15 12h-5" />
    </svg>
  `,folder:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,menu:r`
    <svg viewBox="0 0 24 24">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  `,x:r`
    <svg viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,check:r`
    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
  `,arrowDown:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  `,copy:r`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  `,search:r`
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  `,brain:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  `,book:r`
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  `,loader:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  `,wrench:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  `,fileCode:r`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  `,edit:r`
    <svg viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  `,penLine:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,paperclip:r`
    <svg viewBox="0 0 24 24">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      />
    </svg>
  `,globe:r`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  `,image:r`
    <svg viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  `,smartphone:r`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  `,plug:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  `,circle:r`
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
  `,puzzle:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.076.874.54 1.02 1.02a2.5 2.5 0 1 0 3.237-3.237c-.48-.146-.944-.505-1.02-1.02a.98.98 0 0 1 .303-.917l1.526-1.526A2.402 2.402 0 0 1 11.998 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"
      />
    </svg>
  `};function xg(e,t){const n=Ui(t,e.basePath);return r`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${s=>{s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),e.setTab(t))}}
      title=${ei(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${le[wu(t)]}</span>
      <span class="nav-item__text">${ei(t)}</span>
    </a>
  `}function $g(e){const t=wg(e.hello,e.sessionsResult),n=kg(e.sessionKey,e.sessionsResult,t),s=e.onboarding,i=e.onboarding,a=e.onboarding?!1:e.settings.chatShowThinking,o=e.onboarding?!0:e.settings.chatFocusMode,l=r`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
    </svg>
  `,c=r`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 7V4h3"></path>
      <path d="M20 7V4h-3"></path>
      <path d="M4 17v3h3"></path>
      <path d="M20 17v3h-3"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;return r`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${u=>{const p=u.target.value;e.sessionKey=p,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:p,lastActiveSessionKey:p}),e.loadAssistantIdentity(),Nu(e,p),Jt(e)}}
        >
          ${ii(n,u=>u.key,u=>r`<option value=${u.key}>
                ${u.displayName??u.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${()=>{e.resetToolStream(),Qr(e)}}
        title="刷新对话数据"
      >
        ${l}
      </button>
      ${e.chatModels.length>0?r`
            <label class="field chat-controls__model">
              <select
                ?disabled=${!e.connected}
                @change=${u=>{const p=u.target.value;if(!p||p==="__default__"){p==="__default__"&&e.handleModelSwitch(`${e.chatDefaultProvider}/${e.chatDefaultModel}`);return}e.handleModelSwitch(p)}}
              >
                ${(()=>{const u=e.sessionsResult?.sessions?.find(d=>d.key===e.sessionKey),p=u?.model,g=u?.modelProvider,h=e.chatDefaultModel?`默认 (${e.chatDefaultModel})`:"默认",f=!p||p===e.chatDefaultModel&&g===e.chatDefaultProvider;return r`
                    <option value="__default__" ?selected=${f}>
                      ${h}
                    </option>
                    ${ii(e.chatModels.filter(d=>!(d.id===e.chatDefaultModel&&d.provider===e.chatDefaultProvider)),d=>`${d.provider}/${d.id}`,d=>{const v=`${d.provider}/${d.id}`,S=p===d.id&&g===d.provider,k=`${d.name||d.id} · ${d.provider}`;return r`<option
                          value=${v}
                          ?selected=${S}
                        >
                          ${k}
                        </option>`})}
                  `})()}
              </select>
            </label>
          `:null}
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${a?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${a}
        title=${s?"引导期间已禁用":"切换助手思考/工作输出"}
      >
        ${le.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${o}
        title=${i?"引导期间已禁用":"切换专注模式（隐藏侧栏 + 页面标题）"}
      >
        ${c}
      </button>
    </div>
  `}function wg(e,t){const n=e?.snapshot,s=n?.sessionDefaults?.mainSessionKey?.trim();if(s)return s;const i=n?.sessionDefaults?.mainKey?.trim();return i||(t?.sessions?.some(a=>a.key==="main")?"main":null)}function _s(e,t){const n=t?.label?.trim();if(n)return`${n} (${e})`;const s=t?.displayName?.trim();return s||e}function kg(e,t,n){const s=new Set,i=[],a=n&&t?.sessions?.find(l=>l.key===n),o=t?.sessions?.find(l=>l.key===e);if(n&&(s.add(n),i.push({key:n,displayName:_s(n,a||void 0)})),s.has(e)||(s.add(e),i.push({key:e,displayName:_s(e,o)})),t?.sessions)for(const l of t.sessions)s.has(l.key)||(s.add(l.key),i.push({key:l.key,displayName:_s(l.key,l)}));return i}const Sg=["system","light","dark"];function Ag(e){const t=Math.max(0,Sg.indexOf(e.theme)),n=s=>i=>{const o={element:i.currentTarget};(i.clientX||i.clientY)&&(o.pointerClientX=i.clientX,o.pointerClientY=i.clientY),e.setTheme(s,o)};return r`
    <div class="theme-toggle" style="--theme-index: ${t};">
      <div class="theme-toggle__track" role="group" aria-label="Theme">
        <span class="theme-toggle__indicator"></span>
        <button
          class="theme-toggle__button ${e.theme==="system"?"active":""}"
          @click=${n("system")}
          aria-pressed=${e.theme==="system"}
          aria-label="系统主题"
          title="系统"
        >
          ${_g()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="浅色主题"
          title="浅色"
        >
          ${Cg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="深色主题"
          title="深色"
        >
          ${Tg()}
        </button>
      </div>
    </div>
  `}function Cg(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `}function Tg(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function _g(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Jr(e,t){if(!e)return e;const s=e.files.some(i=>i.name===t.name)?e.files.map(i=>i.name===t.name?t:i):[...e.files,t];return{...e,files:s}}async function Es(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(s=>s.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function so(e,t,n){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s?.file){const i=s.file.content??"";e.agentFilesList=Jr(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},Object.hasOwn(e.agentFileDrafts,n)||(e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function Eg(e,t,n,s){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.set",{agentId:t,name:n,content:s});i?.file&&(e.agentFilesList=Jr(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:s},e.agentFileDrafts={...e.agentFileDrafts,[n]:s})}catch(i){e.agentFilesError=String(i)}finally{e.agentFileSaving=!1}}}const Lg={bash:"exec","apply-patch":"apply_patch"},Mg={"group:memory":["memory_search","memory_get"],"group:web":["web_search","web_fetch"],"group:fs":["read","write","edit","apply_patch"],"group:runtime":["exec","process"],"group:sessions":["sessions_list","sessions_history","sessions_send","sessions_spawn","session_status"],"group:ui":["browser","canvas"],"group:automation":["cron","gateway"],"group:messaging":["message"],"group:nodes":["nodes"],"group:clawdbot":["browser","canvas","nodes","cron","message","gateway","agents_list","sessions_list","sessions_history","sessions_send","sessions_spawn","session_status","memory_search","memory_get","web_search","web_fetch","image"]},Ig={minimal:{allow:["session_status"]},coding:{allow:["group:fs","group:runtime","group:sessions","group:memory","image"]},messaging:{allow:["group:messaging","sessions_list","sessions_history","sessions_send","session_status"]},full:{}};function Pe(e){const t=e.trim().toLowerCase();return Lg[t]??t}function Rg(e){return e?e.map(Pe).filter(Boolean):[]}function Pg(e){const t=Rg(e),n=[];for(const s of t){const i=Mg[s];if(i){n.push(...i);continue}n.push(s)}return Array.from(new Set(n))}function Dg(e){if(!e)return;const t=Ig[e];if(t&&!(!t.allow&&!t.deny))return{allow:t.allow?[...t.allow]:void 0,deny:t.deny?[...t.deny]:void 0}}function Fg(e){const t=e.host??"unknown",n=e.ip?`(${e.ip})`:"",s=e.mode??"",i=e.version??"";return`${t} ${n} ${s} ${i}`.trim()}function Og(e){const t=e.ts??null;return t?Y(t):"n/a"}function Vi(e){return e?`${Xt(e)} (${Y(e)})`:"n/a"}function Ng(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function Bg(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function el(e){const t=e.state??{},n=t.nextRunAtMs?Xt(t.nextRunAtMs):"n/a",s=t.lastRunAtMs?Xt(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${s}`}function tl(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${Xt(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${ur(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function nl(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,s=e.delivery;if(s&&s.mode!=="none"){const i=s.channel||s.to?` (${s.channel??"last"}${s.to?` -> ${s.to}`:""})`:"";return`${n} · ${s.mode}${i}`}return n}const io=[{id:"fs",label:"文件",tools:[{id:"read",label:"read",description:"读取文件内容"},{id:"write",label:"write",description:"创建或覆盖文件"},{id:"edit",label:"edit",description:"精确编辑"},{id:"apply_patch",label:"apply_patch",description:"补丁文件 (OpenAI)"}]},{id:"runtime",label:"运行时",tools:[{id:"exec",label:"exec",description:"执行 Shell 命令"},{id:"process",label:"process",description:"管理后台进程"}]},{id:"web",label:"网络",tools:[{id:"web_search",label:"web_search",description:"搜索网络"},{id:"web_fetch",label:"web_fetch",description:"获取网络内容"}]},{id:"memory",label:"记忆",tools:[{id:"memory_search",label:"memory_search",description:"语义搜索"},{id:"memory_get",label:"memory_get",description:"读取记忆文件"}]},{id:"sessions",label:"会话",tools:[{id:"sessions_list",label:"sessions_list",description:"列出会话"},{id:"sessions_history",label:"sessions_history",description:"会话历史"},{id:"sessions_send",label:"sessions_send",description:"发送到会话"},{id:"sessions_spawn",label:"sessions_spawn",description:"派生子代理"},{id:"session_status",label:"session_status",description:"会话状态"}]},{id:"ui",label:"界面",tools:[{id:"browser",label:"browser",description:"控制网页浏览器"},{id:"canvas",label:"canvas",description:"控制画布"}]},{id:"messaging",label:"消息",tools:[{id:"message",label:"message",description:"发送消息"}]},{id:"automation",label:"自动化",tools:[{id:"cron",label:"cron",description:"定时任务"},{id:"gateway",label:"gateway",description:"网关控制"}]},{id:"nodes",label:"节点",tools:[{id:"nodes",label:"nodes",description:"节点 + 设备"}]},{id:"agents",label:"代理",tools:[{id:"agents_list",label:"agents_list",description:"列出代理"}]},{id:"media",label:"媒体",tools:[{id:"image",label:"image",description:"图像理解"}]}],zg=[{id:"minimal",label:"最小"},{id:"coding",label:"编码"},{id:"messaging",label:"消息"},{id:"full",label:"完整"}];function ai(e){return e.name?.trim()||e.identity?.name?.trim()||e.id}function xn(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let s=0;s<t.length;s+=1)if(t.charCodeAt(s)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function ts(e,t){const n=t?.emoji?.trim();if(n&&xn(n))return n;const s=e.identity?.emoji?.trim();if(s&&xn(s))return s;const i=t?.avatar?.trim();if(i&&xn(i))return i;const a=e.identity?.avatar?.trim();return a&&xn(a)?a:""}function sl(e,t){return t&&e===t?"默认":null}function Ug(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,s=0;for(;n>=1024&&s<t.length-1;)n/=1024,s+=1;return`${n.toFixed(n<10?1:0)} ${t[s]}`}function ns(e,t){const n=e;return{entry:(n?.agents?.list??[]).find(a=>a?.id===t),defaults:n?.agents?.defaults,globalTools:n?.tools}}function il(e,t,n,s,i){const a=ns(t,e.id),l=(n&&n.agentId===e.id?n.workspace:null)||a.entry?.workspace||a.defaults?.workspace||"default",c=a.entry?.model?Nn(a.entry?.model):Nn(a.defaults?.model),u=i?.name?.trim()||e.identity?.name?.trim()||e.name?.trim()||a.entry?.name||e.id,p=ts(e,i)||"-",g=Array.isArray(a.entry?.skills)?a.entry?.skills:null,h=g?.length??null;return{workspace:l,model:c,identityName:u,identityEmoji:p,skillsLabel:g?`已选择 ${h} 个`:"全部技能",isDefault:!!(s&&e.id===s)}}function Nn(e){if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const t=e,n=t.primary?.trim();if(n){const s=Array.isArray(t.fallbacks)?t.fallbacks.length:0;return s>0?`${n} (+${s} 备选)`:n}}return"-"}function ao(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e;return(typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null)?.trim()||null}return null}function Hg(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(s=>typeof s=="string"):null}return null}function Kg(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function jg(e){const n=e?.agents?.defaults?.models;if(!n||typeof n!="object")return[];const s=[];for(const[i,a]of Object.entries(n)){const o=i.trim();if(!o)continue;const l=a&&typeof a=="object"&&"alias"in a&&typeof a.alias=="string"?a.alias?.trim():void 0,c=l&&l!==o?`${l} (${o})`:o;s.push({value:o,label:c})}return s}function qg(e,t){const n=jg(e),s=t?n.some(i=>i.value===t):!1;return t&&!s&&n.unshift({value:t,label:`当前 (${t})`}),n.length===0?r`
      <option value="" disabled>未配置模型</option>
    `:n.map(i=>r`<option value=${i.value}>${i.label}</option>`)}function Wg(e){const t=Pe(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function oi(e){return Array.isArray(e)?Pg(e).map(Wg).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Wt(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function Vg(e,t){if(!t)return!0;const n=Pe(e),s=oi(t.deny);if(Wt(n,s))return!1;const i=oi(t.allow);return!!(i.length===0||Wt(n,i)||n==="apply_patch"&&Wt("exec",i))}function oo(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Pe(e),s=oi(t);return!!(Wt(n,s)||n==="apply_patch"&&Wt("exec",s))}function Gg(e){const t=e.agentsList?.agents??[],n=e.agentsList?.defaultId??null,s=e.selectedAgentId??n??t[0]?.id??null,i=s?t.find(a=>a.id===s)??null:null;return r`
    <div class="agents-layout">
      <section class="card agents-sidebar">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">代理</div>
            <div class="card-sub">已配置 ${t.length} 个。</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"加载中…":"刷新"}
          </button>
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:m}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?r`
                  <div class="muted">未找到代理。</div>
                `:t.map(a=>{const o=sl(a.id,n),l=ts(a,e.agentIdentityById[a.id]??null);return r`
                    <button
                      type="button"
                      class="agent-row ${s===a.id?"active":""}"
                      @click=${()=>e.onSelectAgent(a.id)}
                    >
                      <div class="agent-avatar">
                        ${l||ai(a).slice(0,1)}
                      </div>
                      <div class="agent-info">
                        <div class="agent-title">${ai(a)}</div>
                        <div class="agent-sub mono">${a.id}</div>
                      </div>
                      ${o?r`<span class="agent-pill">${o}</span>`:m}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${i?r`
              ${Qg(i,n,e.agentIdentityById[i.id]??null)}
              ${Yg(e.activePanel,a=>e.onSelectPanel(a))}
              ${e.activePanel==="overview"?Zg({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):m}
              ${e.activePanel==="files"?rp({agentId:i.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):m}
              ${e.activePanel==="tools"?cp({agentId:i.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):m}
              ${e.activePanel==="skills"?up({agentId:i.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):m}
              ${e.activePanel==="channels"?ap({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):m}
              ${e.activePanel==="cron"?op({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):m}
            `:r`
                <div class="card">
                  <div class="card-title">选择一个代理</div>
                  <div class="card-sub">选择一个代理以查看其工作区和工具。</div>
                </div>
              `}
      </section>
    </div>
  `}function Qg(e,t,n){const s=sl(e.id,t),i=ai(e),a=e.identity?.theme?.trim()||"代理工作区和路由。",o=ts(e,n);return r`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">
          ${o||i.slice(0,1)}
        </div>
        <div>
          <div class="card-title">${i}</div>
          <div class="card-sub">${a}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${e.id}</div>
        ${s?r`<span class="agent-pill">${s}</span>`:m}
      </div>
    </section>
  `}function Yg(e,t){return r`
    <div class="agent-tabs">
      ${[{id:"overview",label:"概览"},{id:"files",label:"文件"},{id:"tools",label:"工具"},{id:"skills",label:"技能"},{id:"channels",label:"通道"},{id:"cron",label:"定时任务"}].map(s=>r`
          <button
            class="agent-tab ${e===s.id?"active":""}"
            type="button"
            @click=${()=>t(s.id)}
          >
            ${s.label}
          </button>
        `)}
    </div>
  `}function Zg(e){const{agent:t,configForm:n,agentFilesList:s,agentIdentity:i,agentIdentityLoading:a,agentIdentityError:o,configLoading:l,configSaving:c,configDirty:u,onConfigReload:p,onConfigSave:g,onModelChange:h,onModelFallbacksChange:f}=e,d=ns(n,t.id),S=(s&&s.agentId===t.id?s.workspace:null)||d.entry?.workspace||d.defaults?.workspace||"default",k=d.entry?.model?Nn(d.entry?.model):Nn(d.defaults?.model),x=ao(d.entry?.model),C=ao(d.defaults?.model),A=x??C??null,_=Hg(d.entry?.model),T=_?_.join(", "):"",I=i?.name?.trim()||t.identity?.name?.trim()||t.name?.trim()||d.entry?.name||"-",q=ts(t,i)||"-",W=Array.isArray(d.entry?.skills)?d.entry?.skills:null,D=W?.length??null,U=a?"加载中…":o?"不可用":"",ge=!!(e.defaultId&&t.id===e.defaultId);return r`
    <section class="card">
      <div class="card-title">概览</div>
      <div class="card-sub">工作区路径和身份元数据。</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">工作区</div>
          <div class="mono">${S}</div>
        </div>
        <div class="agent-kv">
          <div class="label">主模型</div>
          <div class="mono">${k}</div>
        </div>
        <div class="agent-kv">
          <div class="label">身份名称</div>
          <div>${I}</div>
          ${U?r`<div class="agent-kv-sub muted">${U}</div>`:m}
        </div>
        <div class="agent-kv">
          <div class="label">默认</div>
          <div>${ge?"是":"否"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">身份表情</div>
          <div>${q}</div>
        </div>
        <div class="agent-kv">
          <div class="label">技能过滤</div>
          <div>${W?`已选择 ${D} 个`:"全部技能"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">模型选择</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>主模型</span>
            <select
              .value=${A??""}
              ?disabled=${!n||l||c}
              @change=${E=>h(t.id,E.target.value||null)}
            >
              <option value="">
                ${C?`继承默认 (${C})`:"继承默认"}
              </option>
              ${qg(n,A??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>备选模型（逗号分隔）</span>
            <input
              .value=${T}
              ?disabled=${!n||l||c}
              placeholder="提供商/模型, 提供商/模型"
              @input=${E=>f(t.id,Kg(E.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${l}
            @click=${p}
          >
            重新加载配置
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${c||!u}
            @click=${g}
          >
            ${c?"保存中…":"保存"}
          </button>
        </div>
      </div>
    </section>
  `}function al(e,t){return r`
    <section class="card">
      <div class="card-title">代理上下文</div>
      <div class="card-sub">${t}</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">工作区</div>
          <div class="mono">${e.workspace}</div>
        </div>
        <div class="agent-kv">
          <div class="label">主模型</div>
          <div class="mono">${e.model}</div>
        </div>
        <div class="agent-kv">
          <div class="label">身份名称</div>
          <div>${e.identityName}</div>
        </div>
        <div class="agent-kv">
          <div class="label">身份表情</div>
          <div>${e.identityEmoji}</div>
        </div>
        <div class="agent-kv">
          <div class="label">技能过滤</div>
          <div>${e.skillsLabel}</div>
        </div>
        <div class="agent-kv">
          <div class="label">默认</div>
          <div>${e.isDefault?"是":"否"}</div>
        </div>
      </div>
    </section>
  `}function Xg(e,t){const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function Jg(e){if(!e)return[];const t=new Set;for(const i of e.channelOrder??[])t.add(i);for(const i of e.channelMeta??[])t.add(i.id);for(const i of Object.keys(e.channelAccounts??{}))t.add(i);const n=[],s=e.channelOrder?.length?e.channelOrder:Array.from(t);for(const i of s)t.has(i)&&(n.push(i),t.delete(i));for(const i of t)n.push(i);return n.map(i=>({id:i,label:Xg(e,i),accounts:e.channelAccounts?.[i]??[]}))}const ep=["groupPolicy","streamMode","dmPolicy"];function tp(e,t){if(!e)return null;const s=(e.channels??{})[t];if(s&&typeof s=="object")return s;const i=e[t];return i&&typeof i=="object"?i:null}function np(e){if(e==null)return"无";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"无"}}function sp(e,t){const n=tp(e,t);return n?ep.flatMap(s=>s in n?[{label:s,value:np(n[s])}]:[]):[]}function ip(e){let t=0,n=0,s=0;for(const i of e){const a=i.probe&&typeof i.probe=="object"&&"ok"in i.probe?!!i.probe.ok:!1;(i.connected===!0||i.running===!0||a)&&(t+=1),i.configured&&(n+=1),i.enabled&&(s+=1)}return{total:e.length,connected:t,configured:n,enabled:s}}function ap(e){const t=il(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=Jg(e.snapshot),s=e.lastSuccess?Y(e.lastSuccess):"从未";return r`
    <section class="grid grid-cols-2">
      ${al(t,"工作区、身份和模型配置。")}
      <section class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">通道</div>
            <div class="card-sub">网关级通道状态快照。</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"刷新中…":"刷新"}
          </button>
        </div>
        <div class="muted" style="margin-top: 8px;">
          上次刷新：${s}
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:m}
        ${e.snapshot?m:r`
                <div class="callout info" style="margin-top: 12px">加载通道以查看实时状态。</div>
              `}
        ${n.length===0?r`
                <div class="muted" style="margin-top: 16px">未找到通道。</div>
              `:r`
              <div class="list" style="margin-top: 16px;">
                ${n.map(i=>{const a=ip(i.accounts),o=a.total?`${a.connected}/${a.total} 已连接`:"无账户",l=a.configured?`已配置 ${a.configured} 个`:"未配置",c=a.total?`已启用 ${a.enabled} 个`:"已禁用",u=sp(e.configForm,i.id);return r`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${i.label}</div>
                        <div class="list-sub mono">${i.id}</div>
                      </div>
                      <div class="list-meta">
                        <div>${o}</div>
                        <div>${l}</div>
                        <div>${c}</div>
                        ${u.length>0?u.map(p=>r`<div>${p.label}: ${p.value}</div>`):m}
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </section>
    </section>
  `}function op(e){const t=il(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=e.jobs.filter(s=>s.agentId===e.agent.id);return r`
    <section class="grid grid-cols-2">
      ${al(t,"工作区和调度目标。")}
      <section class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">调度器</div>
            <div class="card-sub">网关定时任务状态。</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"刷新中…":"刷新"}
          </button>
        </div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">已启用</div>
            <div class="stat-value">
              ${e.status?e.status.enabled?"是":"否":"无"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">任务</div>
            <div class="stat-value">${e.status?.jobs??"无"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">下次唤醒</div>
            <div class="stat-value">${Vi(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:m}
      </section>
    </section>
    <section class="card">
      <div class="card-title">代理定时任务</div>
      <div class="card-sub">针对此代理的定时任务。</div>
      ${n.length===0?r`
              <div class="muted" style="margin-top: 16px">未分配任务。</div>
            `:r`
              <div class="list" style="margin-top: 16px;">
                ${n.map(s=>r`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${s.name}</div>
                      ${s.description?r`<div class="list-sub">${s.description}</div>`:m}
                      <div class="chip-row" style="margin-top: 6px;">
                        <span class="chip">${tl(s)}</span>
                        <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                          ${s.enabled?"已启用":"已禁用"}
                        </span>
                        <span class="chip">${s.sessionTarget}</span>
                      </div>
                    </div>
                    <div class="list-meta">
                      <div class="mono">${el(s)}</div>
                      <div class="muted">${nl(s)}</div>
                    </div>
                  </div>
                `)}
              </div>
            `}
    </section>
  `}function rp(e){const t=e.agentFilesList?.agentId===e.agentId?e.agentFilesList:null,n=t?.files??[],s=e.agentFileActive??null,i=s?n.find(c=>c.name===s)??null:null,a=s?e.agentFileContents[s]??"":"",o=s?e.agentFileDrafts[s]??a:"",l=s?o!==a:!1;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">核心文件</div>
          <div class="card-sub">引导人格、身份和工具指导。</div>
        </div>
        <button
          class="btn btn--sm"
          ?disabled=${e.agentFilesLoading}
          @click=${()=>e.onLoadFiles(e.agentId)}
        >
          ${e.agentFilesLoading?"加载中…":"刷新"}
        </button>
      </div>
      ${t?r`<div class="muted mono" style="margin-top: 8px;">工作区：${t.workspace}</div>`:m}
      ${e.agentFilesError?r`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:m}
      ${t?r`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?r`
                          <div class="muted">未找到文件。</div>
                        `:n.map(c=>lp(c,s,()=>e.onSelectFile(c.name)))}
                </div>
                <div class="agent-files-editor">
                  ${i?r`
                          <div class="agent-file-header">
                            <div>
                              <div class="agent-file-title mono">${i.name}</div>
                              <div class="agent-file-sub mono">${i.path}</div>
                            </div>
                            <div class="agent-file-actions">
                              <button
                                class="btn btn--sm"
                                ?disabled=${!l}
                                @click=${()=>e.onFileReset(i.name)}
                              >
                                重置
                              </button>
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${e.agentFileSaving||!l}
                                @click=${()=>e.onFileSave(i.name)}
                              >
                                ${e.agentFileSaving?"保存中…":"保存"}
                              </button>
                            </div>
                          </div>
                          ${i.missing?r`
                                  <div class="callout info" style="margin-top: 10px">此文件不存在。保存将在代理工作区中创建它。</div>
                                `:m}
                          <label class="field" style="margin-top: 12px;">
                            <span>内容</span>
                            <textarea
                              .value=${o}
                              @input=${c=>e.onFileDraftChange(i.name,c.target.value)}
                            ></textarea>
                          </label>
                        `:r`
                          <div class="muted">选择一个文件进行编辑。</div>
                        `}
                </div>
              </div>
            `:r`
              <div class="callout info" style="margin-top: 12px">加载代理工作区文件以编辑核心指令。</div>
            `}
    </section>
  `}function lp(e,t,n){const s=e.missing?"缺失":`${Ug(e.size)} · ${Y(e.updatedAtMs??null)}`;return r`
    <button
      type="button"
      class="agent-file-row ${t===e.name?"active":""}"
      @click=${n}
    >
      <div>
        <div class="agent-file-name mono">${e.name}</div>
        <div class="agent-file-meta">${s}</div>
      </div>
      ${e.missing?r`
              <span class="agent-pill warn">缺失</span>
            `:m}
    </button>
  `}function cp(e){const t=ns(e.configForm,e.agentId),n=t.entry?.tools??{},s=t.globalTools??{},i=n.profile??s.profile??"full",a=n.profile?"代理覆盖":s.profile?"全局默认":"默认",o=Array.isArray(n.allow)&&n.allow.length>0,l=Array.isArray(s.allow)&&s.allow.length>0,c=!!e.configForm&&!e.configLoading&&!e.configSaving&&!o,u=o?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],p=o?[]:Array.isArray(n.deny)?n.deny:[],g=o?{allow:n.allow??[],deny:n.deny??[]}:Dg(i)??void 0,h=io.flatMap(k=>k.tools.map(x=>x.id)),f=k=>{const x=Vg(k,g),C=oo(k,u),A=oo(k,p);return{allowed:(x||C)&&!A,baseAllowed:x,denied:A}},d=h.filter(k=>f(k).allowed).length,v=(k,x)=>{const C=new Set(u.map(I=>Pe(I)).filter(I=>I.length>0)),A=new Set(p.map(I=>Pe(I)).filter(I=>I.length>0)),_=f(k).baseAllowed,T=Pe(k);x?(A.delete(T),_||C.add(T)):(C.delete(T),A.add(T)),e.onOverridesChange(e.agentId,[...C],[...A])},S=k=>{const x=new Set(u.map(A=>Pe(A)).filter(A=>A.length>0)),C=new Set(p.map(A=>Pe(A)).filter(A=>A.length>0));for(const A of h){const _=f(A).baseAllowed,T=Pe(A);k?(C.delete(T),_||x.add(T)):(x.delete(T),C.add(T))}e.onOverridesChange(e.agentId,[...x],[...C])};return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">工具访问</div>
          <div class="card-sub">
            此代理的配置文件及逐工具覆盖。
            <span class="mono">${d}/${h.length}</span> 已启用。
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>S(!0)}
          >
            全部启用
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>S(!1)}
          >
            全部禁用
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            重新加载配置
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?"保存中…":"保存"}
          </button>
        </div>
      </div>

      ${e.configForm?m:r`
              <div class="callout info" style="margin-top: 12px">加载网关配置以调整工具配置。</div>
            `}
      ${o?r`
              <div class="callout info" style="margin-top: 12px">
                此代理在配置中使用了显式允许列表。工具覆盖在配置选项卡中管理。
              </div>
            `:m}
      ${l?r`
              <div class="callout info" style="margin-top: 12px">
                已设置全局 tools.allow。代理覆盖无法启用被全局阻止的工具。
              </div>
            `:m}

      <div class="agent-tools-meta" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">配置文件</div>
          <div class="mono">${i}</div>
        </div>
        <div class="agent-kv">
          <div class="label">来源</div>
          <div>${a}</div>
        </div>
        ${e.configDirty?r`
                <div class="agent-kv">
                  <div class="label">状态</div>
                  <div class="mono">未保存</div>
                </div>
              `:m}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">快速预设</div>
        <div class="agent-tools-buttons">
          ${zg.map(k=>r`
              <button
                class="btn btn--sm ${i===k.id?"active":""}"
                ?disabled=${!c}
                @click=${()=>e.onProfileChange(e.agentId,k.id,!0)}
              >
                ${k.label}
              </button>
            `)}
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>e.onProfileChange(e.agentId,null,!1)}
          >
            继承
          </button>
        </div>
      </div>

      <div class="agent-tools-grid" style="margin-top: 20px;">
        ${io.map(k=>r`
            <div class="agent-tools-section">
              <div class="agent-tools-header">${k.label}</div>
              <div class="agent-tools-list">
                ${k.tools.map(x=>{const{allowed:C}=f(x.id);return r`
                    <div class="agent-tool-row">
                      <div>
                        <div class="agent-tool-title mono">${x.label}</div>
                        <div class="agent-tool-sub">${x.description}</div>
                      </div>
                      <label class="cfg-toggle">
                        <input
                          type="checkbox"
                          .checked=${C}
                          ?disabled=${!c}
                          @change=${A=>v(x.id,A.target.checked)}
                        />
                        <span class="cfg-toggle__track"></span>
                      </label>
                    </div>
                  `})}
              </div>
            </div>
          `)}
      </div>
    </section>
  `}const Ls=[{id:"workspace",label:"工作区技能",sources:["openclaw-workspace"]},{id:"built-in",label:"内置技能",sources:["openclaw-bundled"]},{id:"installed",label:"已安装技能",sources:["openclaw-managed"]},{id:"extra",label:"额外技能",sources:["openclaw-extra"]}];function dp(e){const t=new Map;for(const i of Ls)t.set(i.id,{id:i.id,label:i.label,skills:[]});const n={id:"other",label:"其他技能",skills:[]};for(const i of e){const a=Ls.find(o=>o.sources.includes(i.source));a?t.get(a.id)?.skills.push(i):n.skills.push(i)}const s=Ls.map(i=>t.get(i.id)).filter(i=>!!(i&&i.skills.length>0));return n.skills.length>0&&s.push(n),s}function up(e){const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=ns(e.configForm,e.agentId),s=Array.isArray(n.entry?.skills)?n.entry?.skills:void 0,i=new Set((s??[]).map(f=>f.trim()).filter(Boolean)),a=s!==void 0,o=!!(e.report&&e.activeAgentId===e.agentId),l=o?e.report?.skills??[]:[],c=e.filter.trim().toLowerCase(),u=c?l.filter(f=>[f.name,f.description,f.source].join(" ").toLowerCase().includes(c)):l,p=dp(u),g=a?l.filter(f=>i.has(f.name)).length:l.length,h=l.length;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">技能</div>
          <div class="card-sub">
            代理级技能允许列表和工作区技能。
            ${h>0?r`<span class="mono">${g}/${h}</span>`:m}
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!t} @click=${()=>e.onClear(e.agentId)}>
            使用全部
          </button>
          <button class="btn btn--sm" ?disabled=${!t} @click=${()=>e.onDisableAll(e.agentId)}>
            全部禁用
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            重新加载配置
          </button>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"加载中…":"刷新"}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?"保存中…":"保存"}
          </button>
        </div>
      </div>

      ${e.configForm?m:r`
              <div class="callout info" style="margin-top: 12px">加载网关配置以设置代理级技能。</div>
            `}
      ${a?r`
              <div class="callout info" style="margin-top: 12px">此代理使用自定义技能允许列表。</div>
            `:r`
              <div class="callout info" style="margin-top: 12px">
                所有技能已启用。禁用任何技能将创建代理级允许列表。
              </div>
            `}
      ${!o&&!e.loading?r`
              <div class="callout info" style="margin-top: 12px">加载此代理的技能以查看工作区特定条目。</div>
            `:m}
      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:m}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>过滤</span>
          <input
            .value=${e.filter}
            @input=${f=>e.onFilterChange(f.target.value)}
            placeholder="搜索技能"
          />
        </label>
        <div class="muted">${u.length} 个显示</div>
      </div>

      ${u.length===0?r`
              <div class="muted" style="margin-top: 16px">未找到技能。</div>
            `:r`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${p.map(f=>gp(f,{agentId:e.agentId,allowSet:i,usingAllowlist:a,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function gp(e,t){const n=e.id==="workspace"||e.id==="built-in";return r`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(s=>pp(s,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function pp(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,s=[...e.missing.bins.map(a=>`bin:${a}`),...e.missing.env.map(a=>`env:${a}`),...e.missing.config.map(a=>`config:${a}`),...e.missing.os.map(a=>`os:${a}`)],i=[];return e.disabled&&i.push("已禁用"),e.blockedByAllowlist&&i.push("被允许列表阻止"),r`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${e.description}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"可用":"已阻止"}
          </span>
          ${e.disabled?r`
                  <span class="chip chip-warn">已禁用</span>
                `:m}
        </div>
        ${s.length>0?r`<div class="muted" style="margin-top: 6px;">缺失：${s.join(", ")}</div>`:m}
        ${i.length>0?r`<div class="muted" style="margin-top: 6px;">原因：${i.join(", ")}</div>`:m}
      </div>
      <div class="list-meta">
        <label class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${n}
            ?disabled=${!t.editable}
            @change=${a=>t.onToggle(t.agentId,e.name,a.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </label>
      </div>
    </div>
  `}function fp(e){if(!e&&e!==0)return"n/a";const t=Math.round(e/1e3);if(t<60)return`${t}s`;const n=Math.round(t/60);return n<60?`${n}m`:`${Math.round(n/60)}h`}function hp(e,t){const n=t.snapshot,s=n?.channels;if(!n||!s)return!1;const i=s[e],a=typeof i?.configured=="boolean"&&i.configured,o=typeof i?.running=="boolean"&&i.running,l=typeof i?.connected=="boolean"&&i.connected,u=(n.channelAccounts?.[e]??[]).some(p=>p.configured||p.running||p.connected);return a||o||l||u}function vp(e,t){return t?.[e]?.length??0}function ol(e,t){const n=vp(e,t);return n<2?m:r`<div class="account-count">账户 (${n})</div>`}function De(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function rl(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(De(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function ss(e){return e.filter(t=>typeof t=="string").join(".")}function Se(e,t){const n=ss(e),s=t[n];if(s)return s;const i=n.split(".");for(const[a,o]of Object.entries(t)){if(!a.includes("*"))continue;const l=a.split(".");if(l.length!==i.length)continue;let c=!0;for(let u=0;u<i.length;u+=1)if(l[u]!=="*"&&l[u]!==i[u]){c=!1;break}if(c)return o}}function qe(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function mp(e){const t=ss(e).toLowerCase();return t.includes("token")||t.includes("password")||t.includes("secret")||t.includes("apikey")||t.endsWith("key")}const bp=new Set(["title","description","default","nullable"]);function yp(e){return Object.keys(e??{}).filter(n=>!bp.has(n)).length===0}function xp(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const nn={chevronDown:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,plus:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,minus:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,trash:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,edit:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`};function je(e){const{schema:t,value:n,path:s,hints:i,unsupported:a,disabled:o,onPatch:l}=e,c=e.showLabel??!0,u=De(t),p=Se(s,i),g=p?.label??t.title??qe(String(s.at(-1))),h=p?.help??t.description,f=ss(s);if(a.has(f))return r`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${g}</div>
      <div class="cfg-field__error">不支持的模式节点。请使用原始模式。</div>
    </div>`;if(t.anyOf||t.oneOf){const v=(t.anyOf??t.oneOf??[]).filter(_=>!(_.type==="null"||Array.isArray(_.type)&&_.type.includes("null")));if(v.length===1)return je({...e,schema:v[0]});const S=_=>{if(_.const!==void 0)return _.const;if(_.enum&&_.enum.length===1)return _.enum[0]},k=v.map(S),x=k.every(_=>_!==void 0);if(x&&k.length>0&&k.length<=5){const _=n??t.default;return r`
        <div class="cfg-field">
          ${c?r`<label class="cfg-field__label">${g}</label>`:m}
          ${h?r`<div class="cfg-field__help">${h}</div>`:m}
          <div class="cfg-segmented">
            ${k.map((T,I)=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${T===_||String(T)===String(_)?"active":""}"
                ?disabled=${o}
                @click=${()=>l(s,T)}
              >
                ${String(T)}
              </button>
            `)}
          </div>
        </div>
      `}if(x&&k.length>5)return lo({...e,options:k,value:n??t.default});const C=new Set(v.map(_=>De(_)).filter(Boolean)),A=new Set([...C].map(_=>_==="integer"?"number":_));if([...A].every(_=>["string","number","boolean"].includes(_))){const _=A.has("string"),T=A.has("number");if(A.has("boolean")&&A.size===1)return je({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(_||T)return ro({...e,inputType:T&&!_?"number":"text"})}}if(t.enum){const d=t.enum;if(d.length<=5){const v=n??t.default;return r`
        <div class="cfg-field">
          ${c?r`<label class="cfg-field__label">${g}</label>`:m}
          ${h?r`<div class="cfg-field__help">${h}</div>`:m}
          <div class="cfg-segmented">
            ${d.map(S=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${S===v||String(S)===String(v)?"active":""}"
                ?disabled=${o}
                @click=${()=>l(s,S)}
              >
                ${String(S)}
              </button>
            `)}
          </div>
        </div>
      `}return lo({...e,options:d,value:n??t.default})}if(u==="object")return wp(e);if(u==="array")return kp(e);if(u==="boolean"){const d=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return r`
      <label class="cfg-toggle-row ${o?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${g}</span>
          ${h?r`<span class="cfg-toggle-row__help">${h}</span>`:m}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${d}
            ?disabled=${o}
            @change=${v=>l(s,v.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return u==="number"||u==="integer"?$p(e):u==="string"?ro({...e,inputType:"text"}):r`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${g}</div>
      <div class="cfg-field__error">不支持的类型: ${u}。请使用原始模式。</div>
    </div>
  `}function ro(e){const{schema:t,value:n,path:s,hints:i,disabled:a,onPatch:o,inputType:l}=e,c=e.showLabel??!0,u=Se(s,i),p=u?.label??t.title??qe(String(s.at(-1))),g=u?.help??t.description,h=u?.sensitive??mp(s),f=u?.placeholder??(h?"••••":t.default!==void 0?`Default: ${t.default}`:""),d=n??"";return r`
    <div class="cfg-field">
      ${c?r`<label class="cfg-field__label">${p}</label>`:m}
      ${g?r`<div class="cfg-field__help">${g}</div>`:m}
      <div class="cfg-input-wrap">
        <input
          type=${h?"password":l}
          class="cfg-input"
          placeholder=${f}
          .value=${d==null?"":String(d)}
          ?disabled=${a}
          @input=${v=>{const S=v.target.value;if(l==="number"){if(S.trim()===""){o(s,void 0);return}const k=Number(S);o(s,Number.isNaN(k)?S:k);return}o(s,S)}}
        />
        ${t.default!==void 0?r`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${a}
            @click=${()=>o(s,t.default)}
          >↺</button>
        `:m}
      </div>
    </div>
  `}function $p(e){const{schema:t,value:n,path:s,hints:i,disabled:a,onPatch:o}=e,l=e.showLabel??!0,c=Se(s,i),u=c?.label??t.title??qe(String(s.at(-1))),p=c?.help??t.description,g=n??t.default??"",h=typeof g=="number"?g:0;return r`
    <div class="cfg-field">
      ${l?r`<label class="cfg-field__label">${u}</label>`:m}
      ${p?r`<div class="cfg-field__help">${p}</div>`:m}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${a}
          @click=${()=>o(s,h-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${g==null?"":String(g)}
          ?disabled=${a}
          @input=${f=>{const d=f.target.value,v=d===""?void 0:Number(d);o(s,v)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${a}
          @click=${()=>o(s,h+1)}
        >+</button>
      </div>
    </div>
  `}function lo(e){const{schema:t,value:n,path:s,hints:i,disabled:a,options:o,onPatch:l}=e,c=e.showLabel??!0,u=Se(s,i),p=u?.label??t.title??qe(String(s.at(-1))),g=u?.help??t.description,h=n??t.default,f=o.findIndex(v=>v===h||String(v)===String(h)),d="__unset__";return r`
    <div class="cfg-field">
      ${c?r`<label class="cfg-field__label">${p}</label>`:m}
      ${g?r`<div class="cfg-field__help">${g}</div>`:m}
      <select
        class="cfg-select"
        ?disabled=${a}
        .value=${f>=0?String(f):d}
        @change=${v=>{const S=v.target.value;l(s,S===d?void 0:o[Number(S)])}}
      >
        <option value=${d}>Select...</option>
        ${o.map((v,S)=>r`
          <option value=${String(S)}>${String(v)}</option>
        `)}
      </select>
    </div>
  `}function wp(e){const{schema:t,value:n,path:s,hints:i,unsupported:a,disabled:o,onPatch:l}=e;e.showLabel;const c=Se(s,i),u=c?.label??t.title??qe(String(s.at(-1))),p=c?.help??t.description,g=n??t.default,h=g&&typeof g=="object"&&!Array.isArray(g)?g:{},f=t.properties??{},v=Object.entries(f).sort((C,A)=>{const _=Se([...s,C[0]],i)?.order??0,T=Se([...s,A[0]],i)?.order??0;return _!==T?_-T:C[0].localeCompare(A[0])}),S=new Set(Object.keys(f)),k=t.additionalProperties,x=!!k&&typeof k=="object";return s.length===1?r`
      <div class="cfg-fields">
        ${v.map(([C,A])=>je({schema:A,value:h[C],path:[...s,C],hints:i,unsupported:a,disabled:o,onPatch:l}))}
        ${x?co({schema:k,value:h,path:s,hints:i,unsupported:a,disabled:o,reservedKeys:S,onPatch:l}):m}
      </div>
    `:r`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${u}</span>
        <span class="cfg-object__chevron">${nn.chevronDown}</span>
      </summary>
      ${p?r`<div class="cfg-object__help">${p}</div>`:m}
      <div class="cfg-object__content">
        ${v.map(([C,A])=>je({schema:A,value:h[C],path:[...s,C],hints:i,unsupported:a,disabled:o,onPatch:l}))}
        ${x?co({schema:k,value:h,path:s,hints:i,unsupported:a,disabled:o,reservedKeys:S,onPatch:l}):m}
      </div>
    </details>
  `}function kp(e){const{schema:t,value:n,path:s,hints:i,unsupported:a,disabled:o,onPatch:l}=e,c=e.showLabel??!0,u=Se(s,i),p=u?.label??t.title??qe(String(s.at(-1))),g=u?.help??t.description,h=Array.isArray(t.items)?t.items[0]:t.items;if(!h)return r`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${p}</div>
        <div class="cfg-field__error">不支持的数组模式。请使用原始模式。</div>
      </div>
    `;const f=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return r`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${c?r`<span class="cfg-array__label">${p}</span>`:m}
        <span class="cfg-array__count">${f.length} item${f.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${o}
          @click=${()=>{const d=[...f,rl(h)];l(s,d)}}
        >
          <span class="cfg-array__add-icon">${nn.plus}</span>
          Add
        </button>
      </div>
      ${g?r`<div class="cfg-array__help">${g}</div>`:m}

      ${f.length===0?r`
        <div class="cfg-array__empty">
          No items yet. Click "Add" to create one.
        </div>
      `:r`
        <div class="cfg-array__items">
          ${f.map((d,v)=>r`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${v+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${o}
                  @click=${()=>{const S=[...f];S.splice(v,1),l(s,S)}}
                >
                  ${nn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${je({schema:h,value:d,path:[...s,v],hints:i,unsupported:a,disabled:o,showLabel:!1,onPatch:l})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function co(e){const{schema:t,value:n,path:s,hints:i,unsupported:a,disabled:o,reservedKeys:l,onPatch:c}=e,u=yp(t),p=Object.entries(n??{}).filter(([g])=>!l.has(g));return r`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${o}
          @click=${()=>{const g={...n??{}};let h=1,f=`custom-${h}`;for(;f in g;)h+=1,f=`custom-${h}`;g[f]=u?{}:rl(t),c(s,g)}}
        >
          <span class="cfg-map__add-icon">${nn.plus}</span>
          Add Entry
        </button>
      </div>

      ${p.length===0?r`
        <div class="cfg-map__empty">No custom entries.</div>
      `:r`
        <div class="cfg-map__items">
          ${p.map(([g,h])=>{const f=[...s,g],d=xp(h);return r`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${g}
                    ?disabled=${o}
                    @change=${v=>{const S=v.target.value.trim();if(!S||S===g)return;const k={...n??{}};S in k||(k[S]=k[g],delete k[g],c(s,k))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${u?r`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${d}
                          ?disabled=${o}
                          @change=${v=>{const S=v.target,k=S.value.trim();if(!k){c(f,void 0);return}try{c(f,JSON.parse(k))}catch{S.value=d}}}
                        ></textarea>
                      `:je({schema:t,value:h,path:f,hints:i,unsupported:a,disabled:o,showLabel:!1,onPatch:c})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${o}
                  @click=${()=>{const v={...n??{}};delete v[g],c(s,v)}}
                >
                  ${nn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const uo={env:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,update:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,agents:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><circle cx="8" cy="14" r="1"></circle><circle cx="16" cy="14" r="1"></circle></svg>`,auth:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,channels:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,messages:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,commands:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,hooks:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,skills:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,tools:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,gateway:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,wizard:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="M17.8 11.8 19 13"></path><path d="M15 9h0"></path><path d="M17.8 6.2 19 5"></path><path d="m3 21 9-9"></path><path d="M12.2 6.2 11 5"></path></svg>`,meta:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`,logging:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,browser:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>`,ui:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,models:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,bindings:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,broadcast:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>`,audio:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,session:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,cron:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,web:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,discovery:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,canvasHost:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,talk:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,plugins:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6"></path><path d="m4.93 10.93 4.24 4.24"></path><path d="M2 12h6"></path><path d="m4.93 13.07 4.24-4.24"></path><path d="M12 22v-6"></path><path d="m19.07 13.07-4.24-4.24"></path><path d="M22 12h-6"></path><path d="m19.07 10.93-4.24 4.24"></path></svg>`,default:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`},Gi={env:{label:"环境变量",description:"传递给网关进程的环境变量"},update:{label:"更新",description:"自动更新设置和发布渠道"},agents:{label:"代理",description:"代理配置、模型和身份"},auth:{label:"身份验证",description:"API密钥和身份验证配置文件"},channels:{label:"通道",description:"消息通道（Telegram、Discord、Slack等）"},messages:{label:"消息",description:"消息处理和路由设置"},commands:{label:"命令",description:"自定义斜杠命令"},hooks:{label:"钩子",description:"Webhooks和事件钩子"},skills:{label:"技能",description:"技能包和能力"},tools:{label:"工具",description:"工具配置（浏览器、搜索等）"},gateway:{label:"网关",description:"网关服务器设置（端口、身份验证、绑定）"},wizard:{label:"设置向导",description:"设置向导状态和历史记录"},diagnostics:{label:"诊断",description:"诊断设置"},meta:{label:"元数据",description:"网关元数据和版本信息"},logging:{label:"日志",description:"日志级别和输出配置"},browser:{label:"浏览器",description:"浏览器自动化设置"},ui:{label:"用户界面",description:"用户界面偏好设置"},models:{label:"模型",description:"AI模型配置和提供商"},bindings:{label:"绑定",description:"键绑定和快捷键"},broadcast:{label:"广播",description:"广播和通知设置"},audio:{label:"音频",description:"音频输入/输出设置"},session:{label:"会话",description:"会话管理和持久化"},cron:{label:"定时任务",description:"计划任务和自动化"},web:{label:"Web",description:"Web服务器和API设置"},discovery:{label:"发现",description:"服务发现和网络"},canvasHost:{label:"Canvas主机",description:"Canvas渲染和显示"},talk:{label:"语音",description:"语音和语音设置"},plugins:{label:"插件",description:"插件管理和扩展"}};function go(e){return uo[e]??uo.default}function Sp(e,t,n){if(!n)return!0;const s=n.toLowerCase(),i=Gi[e];return e.toLowerCase().includes(s)||i&&(i.label.toLowerCase().includes(s)||i.description.toLowerCase().includes(s))?!0:Kt(t,s)}function Kt(e,t){if(e.title?.toLowerCase().includes(t)||e.description?.toLowerCase().includes(t)||e.enum?.some(s=>String(s).toLowerCase().includes(t)))return!0;if(e.properties){for(const[s,i]of Object.entries(e.properties))if(s.toLowerCase().includes(t)||Kt(i,t))return!0}if(e.items){const s=Array.isArray(e.items)?e.items:[e.items];for(const i of s)if(i&&Kt(i,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&Kt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const s of n)if(s&&Kt(s,t))return!0}return!1}function Ap(e){if(!e.schema)return r`<div class="muted">模式不可用。</div>`;const t=e.schema,n=e.value??{};if(De(t)!=="object"||!t.properties)return r`<div class="callout danger">不支持的模式。使用原始模式。</div>`;const s=new Set(e.unsupportedPaths??[]),i=t.properties,a=e.searchQuery??"",o=e.activeSection,l=e.activeSubsection??null,u=Object.entries(i).sort((g,h)=>{const f=Se([g[0]],e.uiHints)?.order??50,d=Se([h[0]],e.uiHints)?.order??50;return f!==d?f-d:g[0].localeCompare(h[0])}).filter(([g,h])=>!(o&&g!==o||a&&!Sp(g,h,a)));let p=null;if(o&&l&&u.length===1){const g=u[0]?.[1];g&&De(g)==="object"&&g.properties&&g.properties[l]&&(p={sectionKey:o,subsectionKey:l,schema:g.properties[l]})}return u.length===0?r`
      <div class="config-empty">
        <div class="config-empty__icon">${le.search}</div>
        <div class="config-empty__text">
          ${a?`没有匹配"${a}"的设置`:"此部分中没有设置"}
        </div>
      </div>
    `:r`
    <div class="config-form config-form--modern">
      ${p?(()=>{const{sectionKey:g,subsectionKey:h,schema:f}=p,d=Se([g,h],e.uiHints),v=d?.label??f.title??qe(h),S=d?.help??f.description??"",k=n[g],x=k&&typeof k=="object"?k[h]:void 0,C=`config-section-${g}-${h}`;return r`
              <section class="config-section-card" id=${C}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${go(g)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${v}</h3>
                    ${S?r`<p class="config-section-card__desc">${S}</p>`:m}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${je({schema:f,value:x,path:[g,h],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():u.map(([g,h])=>{const f=Gi[g]??{label:g.charAt(0).toUpperCase()+g.slice(1),description:h.description??""};return r`
              <section class="config-section-card" id="config-section-${g}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${go(g)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${f.label}</h3>
                    ${f.description?r`<p class="config-section-card__desc">${f.description}</p>`:m}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${je({schema:h,value:n[g],path:[g],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const Cp=new Set(["title","description","default","nullable"]);function Tp(e){return Object.keys(e??{}).filter(n=>!Cp.has(n)).length===0}function ll(e){const t=e.filter(i=>i!=null),n=t.length!==e.length,s=[];for(const i of t)s.some(a=>Object.is(a,i))||s.push(i);return{enumValues:s,nullable:n}}function cl(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Vt(e,[])}function Vt(e,t){const n=new Set,s={...e},i=ss(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const l=_p(e,t);return l||{schema:e,unsupportedPaths:[i]}}const a=Array.isArray(e.type)&&e.type.includes("null"),o=De(e)??(e.properties||e.additionalProperties?"object":void 0);if(s.type=o??e.type,s.nullable=a||e.nullable,s.enum){const{enumValues:l,nullable:c}=ll(s.enum);s.enum=l,c&&(s.nullable=!0),l.length===0&&n.add(i)}if(o==="object"){const l=e.properties??{},c={};for(const[u,p]of Object.entries(l)){const g=Vt(p,[...t,u]);g.schema&&(c[u]=g.schema);for(const h of g.unsupportedPaths)n.add(h)}if(s.properties=c,e.additionalProperties===!0)n.add(i);else if(e.additionalProperties===!1)s.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!Tp(e.additionalProperties)){const u=Vt(e.additionalProperties,[...t,"*"]);s.additionalProperties=u.schema??e.additionalProperties,u.unsupportedPaths.length>0&&n.add(i)}}else if(o==="array"){const l=Array.isArray(e.items)?e.items[0]:e.items;if(!l)n.add(i);else{const c=Vt(l,[...t,"*"]);s.items=c.schema??l,c.unsupportedPaths.length>0&&n.add(i)}}else o!=="string"&&o!=="number"&&o!=="integer"&&o!=="boolean"&&!s.enum&&n.add(i);return{schema:s,unsupportedPaths:Array.from(n)}}function _p(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const s=[],i=[];let a=!1;for(const l of n){if(!l||typeof l!="object")return null;if(Array.isArray(l.enum)){const{enumValues:c,nullable:u}=ll(l.enum);s.push(...c),u&&(a=!0);continue}if("const"in l){if(l.const==null){a=!0;continue}s.push(l.const);continue}if(De(l)==="null"){a=!0;continue}i.push(l)}if(s.length>0&&i.length===0){const l=[];for(const c of s)l.some(u=>Object.is(u,c))||l.push(c);return{schema:{...e,enum:l,nullable:a,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(i.length===1){const l=Vt(i[0],t);return l.schema&&(l.schema.nullable=a||l.schema.nullable),l}const o=["string","number","integer","boolean"];return i.length>0&&s.length===0&&i.every(l=>l.type&&o.includes(String(l.type)))?{schema:{...e,nullable:a},unsupportedPaths:[]}:null}function Ep(e,t){let n=e;for(const s of t){if(!n)return null;const i=De(n);if(i==="object"){const a=n.properties??{};if(typeof s=="string"&&a[s]){n=a[s];continue}const o=n.additionalProperties;if(typeof s=="string"&&o&&typeof o=="object"){n=o;continue}return null}if(i==="array"){if(typeof s!="number")return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function Lp(e,t){const s=(e.channels??{})[t],i=e[t];return(s&&typeof s=="object"?s:null)??(i&&typeof i=="object"?i:null)??{}}const Mp=["groupPolicy","streamMode","dmPolicy"];function Ip(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Rp(e){const t=Mp.flatMap(n=>n in e?[[n,e[n]]]:[]);return t.length===0?null:r`
    <div class="status-list" style="margin-top: 12px;">
      ${t.map(([n,s])=>r`
          <div>
            <span class="label">${n}</span>
            <span>${Ip(s)}</span>
          </div>
        `)}
    </div>
  `}function Pp(e){const t=cl(e.schema),n=t.schema;if(!n)return r`<div class="callout danger">模式不可用。请使用原始模式。</div>`;const s=Ep(n,["channels",e.channelId]);if(!s)return r`<div class="callout danger">通道配置模式不可用。</div>`;const i=e.configValue??{},a=Lp(i,e.channelId);return r`
    <div class="config-form">
      ${je({schema:s,value:a,path:["channels",e.channelId],hints:e.uiHints,unsupported:new Set(t.unsupportedPaths),disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})}
    </div>
    ${Rp(a)}
  `}function We(e){const{channelId:t,props:n}=e,s=n.configSaving||n.configSchemaLoading;return r`
    <div style="margin-top: 16px;">
      ${n.configSchemaLoading?r`<div class="muted">正在加载配置模式…</div>`:Pp({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:s,onPatch:n.onConfigPatch})}
      <div class="row" style="margin-top: 12px;">
        <button
          class="btn primary"
          ?disabled=${s||!n.configFormDirty}
          @click=${()=>n.onConfigSave()}
        >
          ${n.configSaving?"保存中…":"保存"}
        </button>
        <button
          class="btn"
          ?disabled=${s}
          @click=${()=>n.onConfigReload()}
        >
          重新加载
        </button>
      </div>
    </div>
  `}function Dp(e){const{props:t,discord:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Discord</div>
      <div class="card-sub">机器人状态和频道配置。</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">已配置</span>
          <span>${n?.configured?"是":"否"}</span>
        </div>
        <div>
          <span class="label">运行中</span>
          <span>${n?.running?"是":"否"}</span>
        </div>
        <div>
          <span class="label">最后启动</span>
          <span>${n?.lastStartAt?Y(n.lastStartAt):"无"}</span>
        </div>
        <div>
          <span class="label">最后探测</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"无"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:m}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            探测 ${n.probe.ok?"成功":"失败"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:m}

      ${We({channelId:"discord",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          探测
        </button>
      </div>
    </div>
  `}function Fp(e){const{props:t,googleChat:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Google Chat</div>
      <div class="card-sub">Chat API webhook 状态和频道配置。</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">已配置</span>
          <span>${n?n.configured?"是":"否":"无"}</span>
        </div>
        <div>
          <span class="label">运行中</span>
          <span>${n?n.running?"是":"否":"无"}</span>
        </div>
        <div>
          <span class="label">凭证</span>
          <span>${n?.credentialSource??"无"}</span>
        </div>
        <div>
          <span class="label">受众</span>
          <span>
            ${n?.audienceType?`${n.audienceType}${n.audience?` · ${n.audience}`:""}`:"无"}
          </span>
        </div>
        <div>
          <span class="label">最后启动</span>
          <span>${n?.lastStartAt?Y(n.lastStartAt):"无"}</span>
        </div>
        <div>
          <span class="label">最后探测</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"无"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:m}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            探测 ${n.probe.ok?"成功":"失败"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:m}

      ${We({channelId:"googlechat",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          探测
        </button>
      </div>
    </div>
  `}function Op(e){const{props:t,imessage:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">iMessage</div>
      <div class="card-sub">macOS 桥接状态和频道配置。</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">已配置</span>
          <span>${n?.configured?"是":"否"}</span>
        </div>
        <div>
          <span class="label">运行中</span>
          <span>${n?.running?"是":"否"}</span>
        </div>
        <div>
          <span class="label">最后启动</span>
          <span>${n?.lastStartAt?Y(n.lastStartAt):"无"}</span>
        </div>
        <div>
          <span class="label">最后探测</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"无"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:m}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            探测 ${n.probe.ok?"成功":"失败"} ·
            ${n.probe.error??""}
          </div>`:m}

      ${We({channelId:"imessage",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          探测
        </button>
      </div>
    </div>
  `}function po(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:"无"}function Np(e){const{props:t,nostr:n,nostrAccounts:s,accountCountLabel:i,profileFormState:a,profileFormCallbacks:o,onEditProfile:l}=e,c=s[0],u=n?.configured??c?.configured??!1,p=n?.running??c?.running??!1,g=n?.publicKey??c?.publicKey,h=n?.lastStartAt??c?.lastStartAt??null,f=n?.lastError??c?.lastError??null,d=s.length>1,v=a!=null,S=x=>{const C=x.publicKey,A=x.profile,_=A?.displayName??A?.name??x.name??x.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">${_}</div>
          <div class="account-card-id">${x.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">运行中</span>
            <span>${x.running?"是":"否"}</span>
          </div>
          <div>
            <span class="label">已配置</span>
            <span>${x.configured?"是":"否"}</span>
          </div>
          <div>
            <span class="label">公钥</span>
            <span class="monospace" title="${C??""}">${po(C)}</span>
          </div>
          <div>
            <span class="label">最后入站</span>
            <span>${x.lastInboundAt?Y(x.lastInboundAt):"无"}</span>
          </div>
          ${x.lastError?r`
                <div class="account-card-error">${x.lastError}</div>
              `:m}
        </div>
      </div>
    `},k=()=>{if(v&&o)return Cc({state:a,callbacks:o,accountId:s[0]?.accountId??"default"});const x=c?.profile??n?.profile,{name:C,displayName:A,about:_,picture:T,nip05:I}=x??{},K=C||A||_||T||I;return r`
      <div style="margin-top: 16px; padding: 12px; background: var(--bg-secondary); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="font-weight: 500;">资料</div>
          ${u?r`
                <button
                  class="btn btn-sm"
                  @click=${l}
                  style="font-size: 12px; padding: 4px 8px;"
                >
                  编辑资料
                </button>
              `:m}
        </div>
        ${K?r`
              <div class="status-list">
                ${T?r`
                      <div style="margin-bottom: 8px;">
                        <img
                          src=${T}
                          alt="Profile picture"
                          style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
                          @error=${q=>{q.target.style.display="none"}}
                        />
                      </div>
                    `:m}
                ${C?r`<div><span class="label">姓名</span><span>${C}</span></div>`:m}
                ${A?r`<div><span class="label">显示名称</span><span>${A}</span></div>`:m}
                ${_?r`<div><span class="label">关于</span><span style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${_}</span></div>`:m}
                ${I?r`<div><span class="label">NIP-05</span><span>${I}</span></div>`:m}
              </div>
            `:r`
              <div style="color: var(--text-muted); font-size: 13px;">
                未设置资料。点击"编辑资料"来添加您的姓名、简介和头像。
              </div>
            `}
      </div>
    `};return r`
    <div class="card">
      <div class="card-title">Nostr</div>
      <div class="card-sub">通过 Nostr 中继（NIP-04）的去中心化私信。</div>
      ${i}

      ${d?r`
            <div class="account-card-list">
              ${s.map(x=>S(x))}
            </div>
          `:r`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">已配置</span>
                <span>${u?"是":"否"}</span>
              </div>
              <div>
                <span class="label">运行中</span>
                <span>${p?"是":"否"}</span>
              </div>
              <div>
                <span class="label">公钥</span>
                <span class="monospace" title="${g??""}"
                  >${po(g)}</span
                >
              </div>
              <div>
                <span class="label">最后启动</span>
                <span>${h?Y(h):"无"}</span>
              </div>
            </div>
          `}

      ${f?r`<div class="callout danger" style="margin-top: 12px;">${f}</div>`:m}

      ${k()}

      ${We({channelId:"nostr",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!1)}>刷新</button>
      </div>
    </div>
  `}function Bp(e){const{props:t,signal:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Signal</div>
      <div class="card-sub">signal-cli 状态和频道配置。</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">已配置</span>
          <span>${n?.configured?"是":"否"}</span>
        </div>
        <div>
          <span class="label">运行中</span>
          <span>${n?.running?"是":"否"}</span>
        </div>
        <div>
          <span class="label">基础URL</span>
          <span>${n?.baseUrl??"无"}</span>
        </div>
        <div>
          <span class="label">最后启动</span>
          <span>${n?.lastStartAt?Y(n.lastStartAt):"无"}</span>
        </div>
        <div>
          <span class="label">最后探测</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"无"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:m}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            探测 ${n.probe.ok?"成功":"失败"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:m}

      ${We({channelId:"signal",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          探测
        </button>
      </div>
    </div>
  `}function zp(e){const{props:t,slack:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Slack</div>
      <div class="card-sub">套接字模式状态和频道配置。</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">已配置</span>
          <span>${n?.configured?"是":"否"}</span>
        </div>
        <div>
          <span class="label">运行中</span>
          <span>${n?.running?"是":"否"}</span>
        </div>
        <div>
          <span class="label">最后启动</span>
          <span>${n?.lastStartAt?Y(n.lastStartAt):"无"}</span>
        </div>
        <div>
          <span class="label">最后探测</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"无"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:m}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            探测 ${n.probe.ok?"成功":"失败"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:m}

      ${We({channelId:"slack",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          探测
        </button>
      </div>
    </div>
  `}function Up(e){const{props:t,telegram:n,telegramAccounts:s,accountCountLabel:i}=e,a=s.length>1,o=l=>{const u=l.probe?.bot?.username,p=l.name||l.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">
            ${u?`@${u}`:p}
          </div>
          <div class="account-card-id">${l.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">运行中</span>
            <span>${l.running?"是":"否"}</span>
          </div>
          <div>
            <span class="label">已配置</span>
            <span>${l.configured?"是":"否"}</span>
          </div>
          <div>
            <span class="label">最后入站</span>
            <span>${l.lastInboundAt?Y(l.lastInboundAt):"无"}</span>
          </div>
          ${l.lastError?r`
                <div class="account-card-error">
                  ${l.lastError}
                </div>
              `:m}
        </div>
      </div>
    `};return r`
    <div class="card">
      <div class="card-title">Telegram</div>
      <div class="card-sub">机器人状态和频道配置。</div>
      ${i}

      ${a?r`
            <div class="account-card-list">
              ${s.map(l=>o(l))}
            </div>
          `:r`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">已配置</span>
                <span>${n?.configured?"是":"否"}</span>
              </div>
              <div>
                <span class="label">运行中</span>
                <span>${n?.running?"是":"否"}</span>
              </div>
              <div>
                <span class="label">模式</span>
                <span>${n?.mode??"无"}</span>
              </div>
              <div>
                <span class="label">最后启动</span>
                <span>${n?.lastStartAt?Y(n.lastStartAt):"无"}</span>
              </div>
              <div>
                <span class="label">最后探测</span>
                <span>${n?.lastProbeAt?Y(n.lastProbeAt):"无"}</span>
              </div>
            </div>
          `}

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:m}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            探测 ${n.probe.ok?"成功":"失败"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:m}

      ${We({channelId:"telegram",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          探测
        </button>
      </div>
    </div>
  `}function Hp(e){const{props:t,whatsapp:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">WhatsApp</div>
      <div class="card-sub">链接 WhatsApp Web 并监控连接健康状况。</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">已配置</span>
          <span>${n?.configured?"是":"否"}</span>
        </div>
        <div>
          <span class="label">已链接</span>
          <span>${n?.linked?"是":"否"}</span>
        </div>
        <div>
          <span class="label">运行中</span>
          <span>${n?.running?"是":"否"}</span>
        </div>
        <div>
          <span class="label">已连接</span>
          <span>${n?.connected?"是":"否"}</span>
        </div>
        <div>
          <span class="label">最后连接</span>
          <span>
            ${n?.lastConnectedAt?Y(n.lastConnectedAt):"无"}
          </span>
        </div>
        <div>
          <span class="label">最后消息</span>
          <span>
            ${n?.lastMessageAt?Y(n.lastMessageAt):"无"}
          </span>
        </div>
        <div>
          <span class="label">认证时长</span>
          <span>
            ${n?.authAgeMs!=null?fp(n.authAgeMs):"无"}
          </span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:m}

      ${t.whatsappMessage?r`<div class="callout" style="margin-top: 12px;">
            ${t.whatsappMessage}
          </div>`:m}

      ${t.whatsappQrDataUrl?r`<div class="qr-wrap">
            <img src=${t.whatsappQrDataUrl} alt="WhatsApp QR" />
          </div>`:m}

      <div class="row" style="margin-top: 14px; flex-wrap: wrap;">
        <button
          class="btn primary"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppStart(!1)}
        >
          ${t.whatsappBusy?"工作中…":"显示二维码"}
        </button>
        <button
          class="btn"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppStart(!0)}
        >
          重新链接
        </button>
        <button
          class="btn"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppWait()}
        >
          等待扫描
        </button>
        <button
          class="btn danger"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppLogout()}
        >
          登出
        </button>
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          刷新
        </button>
      </div>

      ${We({channelId:"whatsapp",props:t})}
    </div>
  `}function Kp(e){const t=e.snapshot?.channels,n=t?.whatsapp??void 0,s=t?.telegram??void 0,i=t?.discord??null,a=t?.googlechat??null,o=t?.slack??null,l=t?.signal??null,c=t?.imessage??null,u=t?.nostr??null,g=jp(e.snapshot).map((h,f)=>({key:h,enabled:hp(h,e),order:f})).sort((h,f)=>h.enabled!==f.enabled?h.enabled?-1:1:h.order-f.order);return r`
    <section class="grid grid-cols-2">
      ${g.map(h=>qp(h.key,e,{whatsapp:n,telegram:s,discord:i,googlechat:a,slack:o,signal:l,imessage:c,nostr:u,channelAccounts:e.snapshot?.channelAccounts??null}))}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">通道健康状况</div>
          <div class="card-sub">来自网关的通道状态快照。</div>
        </div>
        <div class="muted">${e.lastSuccessAt?Y(e.lastSuccessAt):"无"}</div>
      </div>
      ${e.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${e.lastError}
          </div>`:m}
      <pre class="code-block" style="margin-top: 12px;">
${e.snapshot?JSON.stringify(e.snapshot,null,2):"暂无快照。"}
      </pre>
    </section>
  `}function jp(e){return e?.channelMeta?.length?e.channelMeta.map(t=>t.id):e?.channelOrder?.length?e.channelOrder:["whatsapp","telegram","discord","googlechat","slack","signal","imessage","nostr"]}function qp(e,t,n){const s=ol(e,n.channelAccounts);switch(e){case"whatsapp":return Hp({props:t,whatsapp:n.whatsapp,accountCountLabel:s});case"telegram":return Up({props:t,telegram:n.telegram,telegramAccounts:n.channelAccounts?.telegram??[],accountCountLabel:s});case"discord":return Dp({props:t,discord:n.discord,accountCountLabel:s});case"googlechat":return Fp({props:t,googleChat:n.googlechat,accountCountLabel:s});case"slack":return zp({props:t,slack:n.slack,accountCountLabel:s});case"signal":return Bp({props:t,signal:n.signal,accountCountLabel:s});case"imessage":return Op({props:t,imessage:n.imessage,accountCountLabel:s});case"nostr":{const i=n.channelAccounts?.nostr??[],a=i[0],o=a?.accountId??"default",l=a?.profile??null,c=t.nostrProfileAccountId===o?t.nostrProfileFormState:null,u=c?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return Np({props:t,nostr:n.nostr,nostrAccounts:i,accountCountLabel:s,profileFormState:c,profileFormCallbacks:u,onEditProfile:()=>t.onNostrProfileEdit(o,l)})}default:return Wp(e,t,n.channelAccounts??{})}}function Wp(e,t,n){const s=Gp(t.snapshot,e),i=t.snapshot?.channels?.[e],a=typeof i?.configured=="boolean"?i.configured:void 0,o=typeof i?.running=="boolean"?i.running:void 0,l=typeof i?.connected=="boolean"?i.connected:void 0,c=typeof i?.lastError=="string"?i.lastError:void 0,u=n[e]??[],p=ol(e,n);return r`
    <div class="card">
      <div class="card-title">${s}</div>
      <div class="card-sub">通道状态和配置。</div>
      ${p}

      ${u.length>0?r`
            <div class="account-card-list">
              ${u.map(g=>Xp(g))}
            </div>
          `:r`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">已配置</span>
                <span>${a==null?"无":a?"是":"否"}</span>
              </div>
              <div>
                <span class="label">运行中</span>
                <span>${o==null?"无":o?"是":"否"}</span>
              </div>
              <div>
                <span class="label">已连接</span>
                <span>${l==null?"无":l?"是":"否"}</span>
              </div>
            </div>
          `}

      ${c?r`<div class="callout danger" style="margin-top: 12px;">
            ${c}
          </div>`:m}

      ${We({channelId:e,props:t})}
    </div>
  `}function Vp(e){return e?.channelMeta?.length?Object.fromEntries(e.channelMeta.map(t=>[t.id,t])):{}}function Gp(e,t){return Vp(e)[t]?.label??e?.channelLabels?.[t]??t}const Qp=600*1e3;function dl(e){return e.lastInboundAt?Date.now()-e.lastInboundAt<Qp:!1}function Yp(e){return e.running?"是":dl(e)?"活跃":"否"}function Zp(e){return e.connected===!0?"是":e.connected===!1?"否":dl(e)?"活跃":"无"}function Xp(e){const t=Yp(e),n=Zp(e);return r`
    <div class="account-card">
      <div class="account-card-header">
        <div class="account-card-title">${e.name||e.accountId}</div>
        <div class="account-card-id">${e.accountId}</div>
      </div>
      <div class="status-list account-card-status">
        <div>
          <span class="label">运行中</span>
          <span>${t}</span>
        </div>
        <div>
          <span class="label">已配置</span>
          <span>${e.configured?"是":"否"}</span>
        </div>
        <div>
          <span class="label">已连接</span>
          <span>${n}</span>
        </div>
        <div>
          <span class="label">最后入站</span>
          <span>${e.lastInboundAt?Y(e.lastInboundAt):"无"}</span>
        </div>
        ${e.lastError?r`
              <div class="account-card-error">
                ${e.lastError}
              </div>
            `:m}
      </div>
    </div>
  `}const Gt=(e,t)=>{const n=e._$AN;if(n===void 0)return!1;for(const s of n)s._$AO?.(t,!1),Gt(s,t);return!0},Bn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},ul=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),tf(t)}};function Jp(e){this._$AN!==void 0?(Bn(this),this._$AM=e,ul(this)):this._$AM=e}function ef(e,t=!1,n=0){const s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let a=n;a<s.length;a++)Gt(s[a],!1),Bn(s[a]);else s!=null&&(Gt(s,!1),Bn(s));else Gt(this,e)}const tf=e=>{e.type==ji.CHILD&&(e._$AP??=ef,e._$AQ??=Jp)};class nf extends Wi{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,s){super._$AT(t,n,s),ul(this),this.isConnected=t._$AU}_$AO(t,n=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),n&&(Gt(this,t),Bn(this))}setValue(t){if(vg(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Ms=new WeakMap,sf=qi(class extends nf{render(e){return m}update(e,[t]){const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),m}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Ms.get(t);n===void 0&&(n=new WeakMap,Ms.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G=="function"?Ms.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class ri extends Wi{constructor(t){if(super(t),this.it=m,t.type!==ji.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===Qe)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}ri.directiveName="unsafeHTML",ri.resultType=1;const li=qi(ri);const{entries:gl,setPrototypeOf:fo,isFrozen:af,getPrototypeOf:of,getOwnPropertyDescriptor:rf}=Object;let{freeze:me,seal:Ae,create:ci}=Object,{apply:di,construct:ui}=typeof Reflect<"u"&&Reflect;me||(me=function(t){return t});Ae||(Ae=function(t){return t});di||(di=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)});ui||(ui=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const $n=be(Array.prototype.forEach),lf=be(Array.prototype.lastIndexOf),ho=be(Array.prototype.pop),Ft=be(Array.prototype.push),cf=be(Array.prototype.splice),Mn=be(String.prototype.toLowerCase),Is=be(String.prototype.toString),Rs=be(String.prototype.match),Ot=be(String.prototype.replace),df=be(String.prototype.indexOf),uf=be(String.prototype.trim),Ce=be(Object.prototype.hasOwnProperty),he=be(RegExp.prototype.test),Nt=gf(TypeError);function be(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return di(e,t,s)}}function gf(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return ui(e,n)}}function j(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Mn;fo&&fo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(af(t)||(t[s]=a),i=a)}e[i]=!0}return e}function pf(e){for(let t=0;t<e.length;t++)Ce(e,t)||(e[t]=null);return e}function Re(e){const t=ci(null);for(const[n,s]of gl(e))Ce(e,n)&&(Array.isArray(s)?t[n]=pf(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Re(s):t[n]=s);return t}function Bt(e,t){for(;e!==null;){const s=rf(e,t);if(s){if(s.get)return be(s.get);if(typeof s.value=="function")return be(s.value)}e=of(e)}function n(){return null}return n}const vo=me(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ps=me(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ds=me(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ff=me(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fs=me(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),hf=me(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),mo=me(["#text"]),bo=me(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Os=me(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yo=me(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),wn=me(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),vf=Ae(/\{\{[\w\W]*|[\w\W]*\}\}/gm),mf=Ae(/<%[\w\W]*|[\w\W]*%>/gm),bf=Ae(/\$\{[\w\W]*/gm),yf=Ae(/^data-[\-\w.\u00B7-\uFFFF]+$/),xf=Ae(/^aria-[\-\w]+$/),pl=Ae(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$f=Ae(/^(?:\w+script|data):/i),wf=Ae(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fl=Ae(/^html$/i),kf=Ae(/^[a-z][.\w]*(-[.\w]+)+$/i);var xo=Object.freeze({__proto__:null,ARIA_ATTR:xf,ATTR_WHITESPACE:wf,CUSTOM_ELEMENT:kf,DATA_ATTR:yf,DOCTYPE_NAME:fl,ERB_EXPR:mf,IS_ALLOWED_URI:pl,IS_SCRIPT_OR_DATA:$f,MUSTACHE_EXPR:vf,TMPLIT_EXPR:bf});const zt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Sf=function(){return typeof window>"u"?null:window},Af=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},$o=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Sf();const t=B=>hl(B);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==zt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:l,Element:c,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:h,trustedTypes:f}=e,d=c.prototype,v=Bt(d,"cloneNode"),S=Bt(d,"remove"),k=Bt(d,"nextSibling"),x=Bt(d,"childNodes"),C=Bt(d,"parentNode");if(typeof o=="function"){const B=n.createElement("template");B.content&&B.content.ownerDocument&&(n=B.content.ownerDocument)}let A,_="";const{implementation:T,createNodeIterator:I,createDocumentFragment:K,getElementsByTagName:q}=n,{importNode:W}=s;let D=$o();t.isSupported=typeof gl=="function"&&typeof C=="function"&&T&&T.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:U,ERB_EXPR:ge,TMPLIT_EXPR:E,DATA_ATTR:z,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:J,CUSTOM_ELEMENT:ne}=xo;let{IS_ALLOWED_URI:M}=xo,R=null;const P=j({},[...vo,...Ps,...Ds,...Fs,...mo]);let H=null;const $e=j({},[...bo,...Os,...yo,...wn]);let Z=Object.seal(ci(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,ee=null;const pe=Object.seal(ci(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Fe=!0,Oe=!0,Je=!1,ca=!0,bt=!1,cn=!0,et=!1,rs=!1,ls=!1,yt=!1,dn=!1,un=!1,da=!0,ua=!1;const Bl="user-content-";let cs=!0,It=!1,xt={},Le=null;const ds=j({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let ga=null;const pa=j({},["audio","video","img","source","image","track"]);let us=null;const fa=j({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),gn="http://www.w3.org/1998/Math/MathML",pn="http://www.w3.org/2000/svg",Ne="http://www.w3.org/1999/xhtml";let $t=Ne,gs=!1,ps=null;const zl=j({},[gn,pn,Ne],Is);let fn=j({},["mi","mo","mn","ms","mtext"]),hn=j({},["annotation-xml"]);const Ul=j({},["title","style","font","a","script"]);let Rt=null;const Hl=["application/xhtml+xml","text/html"],Kl="text/html";let se=null,wt=null;const jl=n.createElement("form"),ha=function(b){return b instanceof RegExp||b instanceof Function},fs=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(wt&&wt===b)){if((!b||typeof b!="object")&&(b={}),b=Re(b),Rt=Hl.indexOf(b.PARSER_MEDIA_TYPE)===-1?Kl:b.PARSER_MEDIA_TYPE,se=Rt==="application/xhtml+xml"?Is:Mn,R=Ce(b,"ALLOWED_TAGS")?j({},b.ALLOWED_TAGS,se):P,H=Ce(b,"ALLOWED_ATTR")?j({},b.ALLOWED_ATTR,se):$e,ps=Ce(b,"ALLOWED_NAMESPACES")?j({},b.ALLOWED_NAMESPACES,Is):zl,us=Ce(b,"ADD_URI_SAFE_ATTR")?j(Re(fa),b.ADD_URI_SAFE_ATTR,se):fa,ga=Ce(b,"ADD_DATA_URI_TAGS")?j(Re(pa),b.ADD_DATA_URI_TAGS,se):pa,Le=Ce(b,"FORBID_CONTENTS")?j({},b.FORBID_CONTENTS,se):ds,we=Ce(b,"FORBID_TAGS")?j({},b.FORBID_TAGS,se):Re({}),ee=Ce(b,"FORBID_ATTR")?j({},b.FORBID_ATTR,se):Re({}),xt=Ce(b,"USE_PROFILES")?b.USE_PROFILES:!1,Fe=b.ALLOW_ARIA_ATTR!==!1,Oe=b.ALLOW_DATA_ATTR!==!1,Je=b.ALLOW_UNKNOWN_PROTOCOLS||!1,ca=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,bt=b.SAFE_FOR_TEMPLATES||!1,cn=b.SAFE_FOR_XML!==!1,et=b.WHOLE_DOCUMENT||!1,yt=b.RETURN_DOM||!1,dn=b.RETURN_DOM_FRAGMENT||!1,un=b.RETURN_TRUSTED_TYPE||!1,ls=b.FORCE_BODY||!1,da=b.SANITIZE_DOM!==!1,ua=b.SANITIZE_NAMED_PROPS||!1,cs=b.KEEP_CONTENT!==!1,It=b.IN_PLACE||!1,M=b.ALLOWED_URI_REGEXP||pl,$t=b.NAMESPACE||Ne,fn=b.MATHML_TEXT_INTEGRATION_POINTS||fn,hn=b.HTML_INTEGRATION_POINTS||hn,Z=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&ha(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Z.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&ha(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Z.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Z.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),bt&&(Oe=!1),dn&&(yt=!0),xt&&(R=j({},mo),H=[],xt.html===!0&&(j(R,vo),j(H,bo)),xt.svg===!0&&(j(R,Ps),j(H,Os),j(H,wn)),xt.svgFilters===!0&&(j(R,Ds),j(H,Os),j(H,wn)),xt.mathMl===!0&&(j(R,Fs),j(H,yo),j(H,wn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?pe.tagCheck=b.ADD_TAGS:(R===P&&(R=Re(R)),j(R,b.ADD_TAGS,se))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?pe.attributeCheck=b.ADD_ATTR:(H===$e&&(H=Re(H)),j(H,b.ADD_ATTR,se))),b.ADD_URI_SAFE_ATTR&&j(us,b.ADD_URI_SAFE_ATTR,se),b.FORBID_CONTENTS&&(Le===ds&&(Le=Re(Le)),j(Le,b.FORBID_CONTENTS,se)),b.ADD_FORBID_CONTENTS&&(Le===ds&&(Le=Re(Le)),j(Le,b.ADD_FORBID_CONTENTS,se)),cs&&(R["#text"]=!0),et&&j(R,["html","head","body"]),R.table&&(j(R,["tbody"]),delete we.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Nt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Nt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=b.TRUSTED_TYPES_POLICY,_=A.createHTML("")}else A===void 0&&(A=Af(f,i)),A!==null&&typeof _=="string"&&(_=A.createHTML(""));me&&me(b),wt=b}},va=j({},[...Ps,...Ds,...ff]),ma=j({},[...Fs,...hf]),ql=function(b){let L=C(b);(!L||!L.tagName)&&(L={namespaceURI:$t,tagName:"template"});const O=Mn(b.tagName),X=Mn(L.tagName);return ps[b.namespaceURI]?b.namespaceURI===pn?L.namespaceURI===Ne?O==="svg":L.namespaceURI===gn?O==="svg"&&(X==="annotation-xml"||fn[X]):!!va[O]:b.namespaceURI===gn?L.namespaceURI===Ne?O==="math":L.namespaceURI===pn?O==="math"&&hn[X]:!!ma[O]:b.namespaceURI===Ne?L.namespaceURI===pn&&!hn[X]||L.namespaceURI===gn&&!fn[X]?!1:!ma[O]&&(Ul[O]||!va[O]):!!(Rt==="application/xhtml+xml"&&ps[b.namespaceURI]):!1},Me=function(b){Ft(t.removed,{element:b});try{C(b).removeChild(b)}catch{S(b)}},tt=function(b,L){try{Ft(t.removed,{attribute:L.getAttributeNode(b),from:L})}catch{Ft(t.removed,{attribute:null,from:L})}if(L.removeAttribute(b),b==="is")if(yt||dn)try{Me(L)}catch{}else try{L.setAttribute(b,"")}catch{}},ba=function(b){let L=null,O=null;if(ls)b="<remove></remove>"+b;else{const te=Rs(b,/^[\r\n\t ]+/);O=te&&te[0]}Rt==="application/xhtml+xml"&&$t===Ne&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");const X=A?A.createHTML(b):b;if($t===Ne)try{L=new h().parseFromString(X,Rt)}catch{}if(!L||!L.documentElement){L=T.createDocument($t,"template",null);try{L.documentElement.innerHTML=gs?_:X}catch{}}const ce=L.body||L.documentElement;return b&&O&&ce.insertBefore(n.createTextNode(O),ce.childNodes[0]||null),$t===Ne?q.call(L,et?"html":"body")[0]:et?L.documentElement:ce},ya=function(b){return I.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},hs=function(b){return b instanceof g&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},xa=function(b){return typeof l=="function"&&b instanceof l};function Be(B,b,L){$n(B,O=>{O.call(t,b,L,wt)})}const $a=function(b){let L=null;if(Be(D.beforeSanitizeElements,b,null),hs(b))return Me(b),!0;const O=se(b.nodeName);if(Be(D.uponSanitizeElement,b,{tagName:O,allowedTags:R}),cn&&b.hasChildNodes()&&!xa(b.firstElementChild)&&he(/<[/\w!]/g,b.innerHTML)&&he(/<[/\w!]/g,b.textContent)||b.nodeType===zt.progressingInstruction||cn&&b.nodeType===zt.comment&&he(/<[/\w]/g,b.data))return Me(b),!0;if(!(pe.tagCheck instanceof Function&&pe.tagCheck(O))&&(!R[O]||we[O])){if(!we[O]&&ka(O)&&(Z.tagNameCheck instanceof RegExp&&he(Z.tagNameCheck,O)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(O)))return!1;if(cs&&!Le[O]){const X=C(b)||b.parentNode,ce=x(b)||b.childNodes;if(ce&&X){const te=ce.length;for(let ye=te-1;ye>=0;--ye){const ze=v(ce[ye],!0);ze.__removalCount=(b.__removalCount||0)+1,X.insertBefore(ze,k(b))}}}return Me(b),!0}return b instanceof c&&!ql(b)||(O==="noscript"||O==="noembed"||O==="noframes")&&he(/<\/no(script|embed|frames)/i,b.innerHTML)?(Me(b),!0):(bt&&b.nodeType===zt.text&&(L=b.textContent,$n([U,ge,E],X=>{L=Ot(L,X," ")}),b.textContent!==L&&(Ft(t.removed,{element:b.cloneNode()}),b.textContent=L)),Be(D.afterSanitizeElements,b,null),!1)},wa=function(b,L,O){if(da&&(L==="id"||L==="name")&&(O in n||O in jl))return!1;if(!(Oe&&!ee[L]&&he(z,L))){if(!(Fe&&he(ie,L))){if(!(pe.attributeCheck instanceof Function&&pe.attributeCheck(L,b))){if(!H[L]||ee[L]){if(!(ka(b)&&(Z.tagNameCheck instanceof RegExp&&he(Z.tagNameCheck,b)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(b))&&(Z.attributeNameCheck instanceof RegExp&&he(Z.attributeNameCheck,L)||Z.attributeNameCheck instanceof Function&&Z.attributeNameCheck(L,b))||L==="is"&&Z.allowCustomizedBuiltInElements&&(Z.tagNameCheck instanceof RegExp&&he(Z.tagNameCheck,O)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(O))))return!1}else if(!us[L]){if(!he(M,Ot(O,J,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&b!=="script"&&df(O,"data:")===0&&ga[b])){if(!(Je&&!he(ae,Ot(O,J,"")))){if(O)return!1}}}}}}}return!0},ka=function(b){return b!=="annotation-xml"&&Rs(b,ne)},Sa=function(b){Be(D.beforeSanitizeAttributes,b,null);const{attributes:L}=b;if(!L||hs(b))return;const O={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:H,forceKeepAttr:void 0};let X=L.length;for(;X--;){const ce=L[X],{name:te,namespaceURI:ye,value:ze}=ce,kt=se(te),vs=ze;let re=te==="value"?vs:uf(vs);if(O.attrName=kt,O.attrValue=re,O.keepAttr=!0,O.forceKeepAttr=void 0,Be(D.uponSanitizeAttribute,b,O),re=O.attrValue,ua&&(kt==="id"||kt==="name")&&(tt(te,b),re=Bl+re),cn&&he(/((--!?|])>)|<\/(style|title|textarea)/i,re)){tt(te,b);continue}if(kt==="attributename"&&Rs(re,"href")){tt(te,b);continue}if(O.forceKeepAttr)continue;if(!O.keepAttr){tt(te,b);continue}if(!ca&&he(/\/>/i,re)){tt(te,b);continue}bt&&$n([U,ge,E],Ca=>{re=Ot(re,Ca," ")});const Aa=se(b.nodeName);if(!wa(Aa,kt,re)){tt(te,b);continue}if(A&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!ye)switch(f.getAttributeType(Aa,kt)){case"TrustedHTML":{re=A.createHTML(re);break}case"TrustedScriptURL":{re=A.createScriptURL(re);break}}if(re!==vs)try{ye?b.setAttributeNS(ye,te,re):b.setAttribute(te,re),hs(b)?Me(b):ho(t.removed)}catch{tt(te,b)}}Be(D.afterSanitizeAttributes,b,null)},Wl=function B(b){let L=null;const O=ya(b);for(Be(D.beforeSanitizeShadowDOM,b,null);L=O.nextNode();)Be(D.uponSanitizeShadowNode,L,null),$a(L),Sa(L),L.content instanceof a&&B(L.content);Be(D.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(B){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,O=null,X=null,ce=null;if(gs=!B,gs&&(B="<!-->"),typeof B!="string"&&!xa(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw Nt("dirty is not a string, aborting")}else throw Nt("toString is not a function");if(!t.isSupported)return B;if(rs||fs(b),t.removed=[],typeof B=="string"&&(It=!1),It){if(B.nodeName){const ze=se(B.nodeName);if(!R[ze]||we[ze])throw Nt("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof l)L=ba("<!---->"),O=L.ownerDocument.importNode(B,!0),O.nodeType===zt.element&&O.nodeName==="BODY"||O.nodeName==="HTML"?L=O:L.appendChild(O);else{if(!yt&&!bt&&!et&&B.indexOf("<")===-1)return A&&un?A.createHTML(B):B;if(L=ba(B),!L)return yt?null:un?_:""}L&&ls&&Me(L.firstChild);const te=ya(It?B:L);for(;X=te.nextNode();)$a(X),Sa(X),X.content instanceof a&&Wl(X.content);if(It)return B;if(yt){if(dn)for(ce=K.call(L.ownerDocument);L.firstChild;)ce.appendChild(L.firstChild);else ce=L;return(H.shadowroot||H.shadowrootmode)&&(ce=W.call(s,ce,!0)),ce}let ye=et?L.outerHTML:L.innerHTML;return et&&R["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&he(fl,L.ownerDocument.doctype.name)&&(ye="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+ye),bt&&$n([U,ge,E],ze=>{ye=Ot(ye,ze," ")}),A&&un?A.createHTML(ye):ye},t.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};fs(B),rs=!0},t.clearConfig=function(){wt=null,rs=!1},t.isValidAttribute=function(B,b,L){wt||fs({});const O=se(B),X=se(b);return wa(O,X,L)},t.addHook=function(B,b){typeof b=="function"&&Ft(D[B],b)},t.removeHook=function(B,b){if(b!==void 0){const L=lf(D[B],b);return L===-1?void 0:cf(D[B],L,1)[0]}return ho(D[B])},t.removeHooks=function(B){D[B]=[]},t.removeAllHooks=function(){D=$o()},t}var gi=hl();function Qi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var mt=Qi();function vl(e){mt=e}var Qt={exec:()=>null};function V(e,t=""){let n=typeof e=="string"?e:e.source,s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ve.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var Cf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Tf=/^(?:[ \t]*(?:\n|$))+/,_f=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ef=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ln=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Lf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Yi=/(?:[*+-]|\d{1,9}[.)])/,ml=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,bl=V(ml).replace(/bull/g,Yi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Mf=V(ml).replace(/bull/g,Yi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Zi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,If=/^[^\n]+/,Xi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Rf=V(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Xi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pf=V(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Yi).getRegex(),is="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ji=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Df=V("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ji).replace("tag",is).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),yl=V(Zi).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",is).getRegex(),Ff=V(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",yl).getRegex(),ea={blockquote:Ff,code:_f,def:Rf,fences:Ef,heading:Lf,hr:ln,html:Df,lheading:bl,list:Pf,newline:Tf,paragraph:yl,table:Qt,text:If},wo=V("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",is).getRegex(),Of={...ea,lheading:Mf,table:wo,paragraph:V(Zi).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",wo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",is).getRegex()},Nf={...ea,html:V(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ji).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:V(Zi).replace("hr",ln).replace("heading",` *#{1,6} *[^
]`).replace("lheading",bl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Bf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,zf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,xl=/^( {2,}|\\)\n(?!\s*$)/,Uf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,as=/[\p{P}\p{S}]/u,ta=/[\s\p{P}\p{S}]/u,$l=/[^\s\p{P}\p{S}]/u,Hf=V(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ta).getRegex(),wl=/(?!~)[\p{P}\p{S}]/u,Kf=/(?!~)[\s\p{P}\p{S}]/u,jf=/(?:[^\s\p{P}\p{S}]|~)/u,qf=V(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Cf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),kl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Wf=V(kl,"u").replace(/punct/g,as).getRegex(),Vf=V(kl,"u").replace(/punct/g,wl).getRegex(),Sl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Gf=V(Sl,"gu").replace(/notPunctSpace/g,$l).replace(/punctSpace/g,ta).replace(/punct/g,as).getRegex(),Qf=V(Sl,"gu").replace(/notPunctSpace/g,jf).replace(/punctSpace/g,Kf).replace(/punct/g,wl).getRegex(),Yf=V("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,$l).replace(/punctSpace/g,ta).replace(/punct/g,as).getRegex(),Zf=V(/\\(punct)/,"gu").replace(/punct/g,as).getRegex(),Xf=V(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Jf=V(Ji).replace("(?:-->|$)","-->").getRegex(),eh=V("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Jf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),zn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,th=V(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",zn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Al=V(/^!?\[(label)\]\[(ref)\]/).replace("label",zn).replace("ref",Xi).getRegex(),Cl=V(/^!?\[(ref)\](?:\[\])?/).replace("ref",Xi).getRegex(),nh=V("reflink|nolink(?!\\()","g").replace("reflink",Al).replace("nolink",Cl).getRegex(),ko=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,na={_backpedal:Qt,anyPunctuation:Zf,autolink:Xf,blockSkip:qf,br:xl,code:zf,del:Qt,emStrongLDelim:Wf,emStrongRDelimAst:Gf,emStrongRDelimUnd:Yf,escape:Bf,link:th,nolink:Cl,punctuation:Hf,reflink:Al,reflinkSearch:nh,tag:eh,text:Uf,url:Qt},sh={...na,link:V(/^!?\[(label)\]\((.*?)\)/).replace("label",zn).getRegex(),reflink:V(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",zn).getRegex()},pi={...na,emStrongRDelimAst:Qf,emStrongLDelim:Vf,url:V(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ko).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:V(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ko).getRegex()},ih={...pi,br:V(xl).replace("{2,}","*").getRegex(),text:V(pi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},kn={normal:ea,gfm:Of,pedantic:Nf},Ut={normal:na,gfm:pi,breaks:ih,pedantic:sh},ah={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},So=e=>ah[e];function Ke(e,t){if(t){if(ve.escapeTest.test(e))return e.replace(ve.escapeReplace,So)}else if(ve.escapeTestNoEncode.test(e))return e.replace(ve.escapeReplaceNoEncode,So);return e}function Ao(e){try{e=encodeURI(e).replace(ve.percentDecode,"%")}catch{return null}return e}function Co(e,t){let n=e.replace(ve.findPipe,(a,o,l)=>{let c=!1,u=o;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),s=n.split(ve.splitPipe),i=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ve.slashPipe,"|");return s}function Ht(e,t,n){let s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function oh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function To(e,t,n,s,i){let a=t.href,o=t.title||null,l=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,c}function rh(e,t,n){let s=e.match(n.other.indentCodeCompensation);if(s===null)return t;let i=s[1];return t.split(`
`).map(a=>{let o=a.match(n.other.beginningSpace);if(o===null)return a;let[l]=o;return l.length>=i.length?a.slice(i.length):a}).join(`
`)}var Un=class{options;rules;lexer;constructor(e){this.options=e||mt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ht(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=rh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=Ht(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ht(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ht(t[0],`
`).split(`
`),s="",i="",a=[];for(;n.length>0;){let o=!1,l=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))l.push(n[c]),o=!0;else if(!o)l.push(n[c]);else break;n=n.slice(c);let u=l.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,i=i?`${i}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,a,!0),this.lexer.state.top=g,n.length===0)break;let h=a.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let f=h,d=f.raw+`
`+n.join(`
`),v=this.blockquote(d);a[a.length-1]=v,s=s.substring(0,s.length-f.raw.length)+v.raw,i=i.substring(0,i.length-f.text.length)+v.text;break}else if(h?.type==="list"){let f=h,d=f.raw+`
`+n.join(`
`),v=this.list(d);a[a.length-1]=v,s=s.substring(0,s.length-h.raw.length)+v.raw,i=i.substring(0,i.length-f.raw.length)+v.raw,n=d.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let c=!1,u="",p="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,v=>" ".repeat(3*v.length)),h=e.split(`
`,1)[0],f=!g.trim(),d=0;if(this.options.pedantic?(d=2,p=g.trimStart()):f?d=t[1].length+1:(d=t[2].search(this.rules.other.nonSpaceChar),d=d>4?1:d,p=g.slice(d),d+=t[1].length),f&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let v=this.rules.other.nextBulletRegex(d),S=this.rules.other.hrRegex(d),k=this.rules.other.fencesBeginRegex(d),x=this.rules.other.headingBeginRegex(d),C=this.rules.other.htmlBeginRegex(d);for(;e;){let A=e.split(`
`,1)[0],_;if(h=A,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),_=h):_=h.replace(this.rules.other.tabCharGlobal,"    "),k.test(h)||x.test(h)||C.test(h)||v.test(h)||S.test(h))break;if(_.search(this.rules.other.nonSpaceChar)>=d||!h.trim())p+=`
`+_.slice(d);else{if(f||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||k.test(g)||x.test(g)||S.test(g))break;p+=`
`+h}!f&&!h.trim()&&(f=!0),u+=A+`
`,e=e.substring(A.length+1),g=_.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0)),i.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),i.raw+=u}let l=i.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c of i.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=p.checked,i.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!i.loose){let u=c.tokens.filter(g=>g.type==="space"),p=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));i.loose=p}}if(i.loose)for(let c of i.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Co(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?a.align.push("right"):this.rules.other.tableAlignCenter.test(o)?a.align.push("center"):this.rules.other.tableAlignLeft.test(o)?a.align.push("left"):a.align.push(null);for(let o=0;o<n.length;o++)a.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:a.align[o]});for(let o of i)a.rows.push(Co(o,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let a=Ht(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{let a=oh(t[2],"()");if(a===-2)return;if(a>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),To(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){let a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return To(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!n||this.rules.inline.punctuation.exec(n))){let i=[...s[0]].length-1,a,o,l=i,c=0,u=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+i);(s=u.exec(t))!=null;){if(a=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!a)continue;if(o=[...a].length,s[3]||s[4]){l+=o;continue}else if((s[5]||s[6])&&i%3&&!((i+o)%3)){c+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+c);let p=[...s[0]][0].length,g=e.slice(0,i+s.index+p+o);if(Math.min(i,o)%2){let f=g.slice(1,-1);return{type:"em",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Te=class fi{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||mt,this.options.tokenizer=this.options.tokenizer||new Un,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ve,block:kn.normal,inline:Ut.normal};this.options.pedantic?(n.block=kn.pedantic,n.inline=Ut.pedantic):this.options.gfm&&(n.block=kn.gfm,this.options.breaks?n.inline=Ut.breaks:n.inline=Ut.gfm),this.tokenizer.rules=n}static get rules(){return{block:kn,inline:Ut}}static lex(t,n){return new fi(n).lex(t)}static lexInline(t,n){return new fi(n).inlineTokens(t)}lex(t){t=t.replace(ve.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){for(this.options.pedantic&&(t=t.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));t;){let i;if(this.options.extensions?.block?.some(o=>(i=o.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.space(t)){t=t.substring(i.raw.length);let o=n.at(-1);i.raw.length===1&&o!==void 0?o.raw+=`
`:n.push(i);continue}if(i=this.tokenizer.code(t)){t=t.substring(i.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.text,this.inlineQueue.at(-1).src=o.text):n.push(i);continue}if(i=this.tokenizer.fences(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.heading(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.hr(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.blockquote(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.list(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.html(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.def(t)){t=t.substring(i.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},n.push(i));continue}if(i=this.tokenizer.table(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.lheading(t)){t=t.substring(i.raw.length),n.push(i);continue}let a=t;if(this.options.extensions?.startBlock){let o=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(o=Math.min(o,c))}),o<1/0&&o>=0&&(a=t.substring(0,o+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let o=n.at(-1);s&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(i),s=a.length!==t.length,t=t.substring(i.raw.length);continue}if(i=this.tokenizer.text(t)){t=t.substring(i.raw.length);let o=n.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(i);continue}if(t){let o="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let s=t,i=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)a=i[2]?i[2].length:0,s=s.slice(0,i.index+a)+"["+"a".repeat(i[0].length-a-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,l="";for(;t;){o||(l=""),o=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=n.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,s,l)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,g=t.slice(1),h;this.options.extensions.startInline.forEach(f=>{h=f.call({lexer:this},g),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),o=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Hn=class{options;parser;constructor(e){this.options=e||mt}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(ve.notSpaceStart)?.[0],i=e.replace(ve.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ke(s)+'">'+(n?i:Ke(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ke(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,s="";for(let o=0;o<e.items.length;o++){let l=e.items[o];s+=this.listitem(l)}let i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){let a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ke(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),i=Ao(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ke(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let i=Ao(e);if(i===null)return Ke(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ke(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ke(e.text)}},sa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},_e=class hi{options;renderer;textRenderer;constructor(t){this.options=t||mt,this.options.renderer=this.options.renderer||new Hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new sa}static parse(t,n){return new hi(n).parse(t)}static parseInline(t,n){return new hi(n).parseInline(t)}parse(t){let n="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let o=i,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){n+=l||"";continue}}let a=i;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}parseInline(t,n=this.renderer){let s="";for(let i=0;i<t.length;i++){let a=t[i];if(this.options.extensions?.renderers?.[a.type]){let l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){s+=l||"";continue}}let o=a;switch(o.type){case"escape":{s+=n.text(o);break}case"html":{s+=n.html(o);break}case"link":{s+=n.link(o);break}case"image":{s+=n.image(o);break}case"checkbox":{s+=n.checkbox(o);break}case"strong":{s+=n.strong(o);break}case"em":{s+=n.em(o);break}case"codespan":{s+=n.codespan(o);break}case"br":{s+=n.br(o);break}case"del":{s+=n.del(o);break}case"text":{s+=n.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},jt=class{options;block;constructor(e){this.options=e||mt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Te.lex:Te.lexInline}provideParser(){return this.block?_e.parse:_e.parseInline}},lh=class{defaults=Qi();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=_e;Renderer=Hn;TextRenderer=sa;Lexer=Te;Tokenizer=Un;Hooks=jt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let i=s;for(let a of i.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of i.rows)for(let o of a)n=n.concat(this.walkTokens(o.tokens,t));break}case"list":{let i=s;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=s;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(a=>{let o=i[a].flat(1/0);n=n.concat(this.walkTokens(o,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let l=i.renderer.apply(this,o);return l===!1&&(l=a.apply(this,o)),l}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){let i=this.defaults.renderer||new Hn(this.defaults);for(let a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let o=a,l=n.renderer[o],c=i[o];i[o]=(...u)=>{let p=l.apply(i,u);return p===!1&&(p=c.apply(i,u)),p||""}}s.renderer=i}if(n.tokenizer){let i=this.defaults.tokenizer||new Un(this.defaults);for(let a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let o=a,l=n.tokenizer[o],c=i[o];i[o]=(...u)=>{let p=l.apply(i,u);return p===!1&&(p=c.apply(i,u)),p}}s.tokenizer=i}if(n.hooks){let i=this.defaults.hooks||new jt;for(let a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let o=a,l=n.hooks[o],c=i[o];jt.passThroughHooks.has(a)?i[o]=u=>{if(this.defaults.async&&jt.passThroughHooksRespectAsync.has(a))return(async()=>{let g=await l.call(i,u);return c.call(i,g)})();let p=l.call(i,u);return c.call(i,p)}:i[o]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(i,u);return g===!1&&(g=await c.apply(i,u)),g})();let p=l.apply(i,u);return p===!1&&(p=c.apply(i,u)),p}}s.hooks=i}if(n.walkTokens){let i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let l=[];return l.push(a.call(this,o)),i&&(l=l.concat(i.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Te.lex(e,t??this.defaults)}parser(e,t){return _e.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let s={...n},i={...this.defaults,...s},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let o=i.hooks?await i.hooks.preprocess(t):t,l=await(i.hooks?await i.hooks.provideLexer():e?Te.lex:Te.lexInline)(o,i),c=i.hooks?await i.hooks.processAllTokens(l):l;i.walkTokens&&await Promise.all(this.walkTokens(c,i.walkTokens));let u=await(i.hooks?await i.hooks.provideParser():e?_e.parse:_e.parseInline)(c,i);return i.hooks?await i.hooks.postprocess(u):u})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let o=(i.hooks?i.hooks.provideLexer():e?Te.lex:Te.lexInline)(t,i);i.hooks&&(o=i.hooks.processAllTokens(o)),i.walkTokens&&this.walkTokens(o,i.walkTokens);let l=(i.hooks?i.hooks.provideParser():e?_e.parse:_e.parseInline)(o,i);return i.hooks&&(l=i.hooks.postprocess(l)),l}catch(o){return a(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+Ke(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},vt=new lh;function G(e,t){return vt.parse(e,t)}G.options=G.setOptions=function(e){return vt.setOptions(e),G.defaults=vt.defaults,vl(G.defaults),G};G.getDefaults=Qi;G.defaults=mt;G.use=function(...e){return vt.use(...e),G.defaults=vt.defaults,vl(G.defaults),G};G.walkTokens=function(e,t){return vt.walkTokens(e,t)};G.parseInline=vt.parseInline;G.Parser=_e;G.parser=_e.parse;G.Renderer=Hn;G.TextRenderer=sa;G.Lexer=Te;G.lexer=Te.lex;G.Tokenizer=Un;G.Hooks=jt;G.parse=G;G.options;G.setOptions;G.use;G.walkTokens;G.parseInline;_e.parse;Te.lex;G.setOptions({gfm:!0,breaks:!0});const ch=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],dh=["class","href","rel","target","title","start","src","alt"],_o={ALLOWED_TAGS:ch,ALLOWED_ATTR:dh,ADD_DATA_URI_TAGS:["img"]};let Eo=!1;const uh=14e4,gh=4e4,ph=200,Ns=5e4,ut=new Map;function fh(e){const t=ut.get(e);return t===void 0?null:(ut.delete(e),ut.set(e,t),t)}function Lo(e,t){if(ut.set(e,t),ut.size<=ph)return;const n=ut.keys().next().value;n&&ut.delete(n)}function hh(){Eo||(Eo=!0,gi.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function vi(e){const t=e.trim();if(!t)return"";if(hh(),t.length<=Ns){const o=fh(t);if(o!==null)return o}const n=gr(t,uh),s=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>gh){const l=`<pre class="code-block">${_l(`${n.text}${s}`)}</pre>`,c=gi.sanitize(l,_o);return t.length<=Ns&&Lo(t,c),c}const i=G.parse(`${n.text}${s}`,{renderer:Tl}),a=gi.sanitize(i,_o);return t.length<=Ns&&Lo(t,a),a}const Tl=new G.Renderer;Tl.html=({text:e})=>_l(e);function _l(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const vh=1500,mh=2e3,El="Copy as markdown",bh="Copied",yh="Copy failed";async function xh(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Sn(e,t){e.title=t,e.setAttribute("aria-label",t)}function $h(e){const t=e.label??El;return r`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const s=n.currentTarget;if(s?.querySelector(".chat-copy-btn__icon"),!s||s.dataset.copying==="1")return;s.dataset.copying="1",s.setAttribute("aria-busy","true"),s.disabled=!0;const i=await xh(e.text());if(s.isConnected){if(delete s.dataset.copying,s.removeAttribute("aria-busy"),s.disabled=!1,!i){s.dataset.error="1",Sn(s,yh),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.error,Sn(s,t))},mh);return}s.dataset.copied="1",Sn(s,bh),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.copied,Sn(s,t))},vh)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${le.copy}</span>
        <span class="chat-copy-btn__icon-check">${le.check}</span>
      </span>
    </button>
  `}function wh(e){return $h({text:()=>e,label:El})}function Ll(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const s=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",i=t.content,a=Array.isArray(i)?i:null,o=Array.isArray(a)&&a.some(g=>{const f=String(g.type??"").toLowerCase();return f==="toolresult"||f==="tool_result"}),l=typeof t.toolName=="string"||typeof t.tool_name=="string";(s||o||l)&&(n="toolResult");let c=[];typeof t.content=="string"?c=[{type:"text",text:t.content}]:Array.isArray(t.content)?c=t.content.map(g=>({type:g.type||"text",text:g.text,name:g.name,args:g.args||g.arguments})):typeof t.text=="string"&&(c=[{type:"text",text:t.text}]);const u=typeof t.timestamp=="number"?t.timestamp:Date.now(),p=typeof t.id=="string"?t.id:void 0;return{role:n,content:c,timestamp:u,id:p}}function ia(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function Ml(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}const kh={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},Sh={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"反应",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"反应列表",detailKeys:["channelId","messageId"]},sticker:{label:"贴纸",detailKeys:["to","stickerIds"]},poll:{label:"投票",detailKeys:["question","to"]},permissions:{label:"权限",detailKeys:["channelId"]},readMessages:{label:"读取消息",detailKeys:["channelId","limit"]},sendMessage:{label:"发送",detailKeys:["to","content"]},editMessage:{label:"编辑",detailKeys:["channelId","messageId"]},deleteMessage:{label:"删除",detailKeys:["channelId","messageId"]},threadCreate:{label:"创建话题",detailKeys:["channelId","name"]},threadList:{label:"话题列表",detailKeys:["guildId","channelId"]},threadReply:{label:"话题回复",detailKeys:["channelId","content"]},pinMessage:{label:"置顶",detailKeys:["channelId","messageId"]},unpinMessage:{label:"取消置顶",detailKeys:["channelId","messageId"]},listPins:{label:"置顶列表",detailKeys:["channelId"]},searchMessages:{label:"搜索",detailKeys:["guildId","content"]},memberInfo:{label:"成员",detailKeys:["guildId","userId"]},roleInfo:{label:"角色",detailKeys:["guildId"]},emojiList:{label:"表情列表",detailKeys:["guildId"]},roleAdd:{label:"添加角色",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"移除角色",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"频道",detailKeys:["channelId"]},channelList:{label:"频道列表",detailKeys:["guildId"]},voiceStatus:{label:"语音",detailKeys:["guildId","userId"]},eventList:{label:"事件",detailKeys:["guildId"]},eventCreate:{label:"创建事件",detailKeys:["guildId","name"]},timeout:{label:"超时",detailKeys:["guildId","userId"]},kick:{label:"踢出",detailKeys:["guildId","userId"]},ban:{label:"封禁",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"反应",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"反应列表",detailKeys:["channelId","messageId"]},sendMessage:{label:"发送",detailKeys:["to","content"]},editMessage:{label:"编辑",detailKeys:["channelId","messageId"]},deleteMessage:{label:"删除",detailKeys:["channelId","messageId"]},readMessages:{label:"读取消息",detailKeys:["channelId","limit"]},pinMessage:{label:"置顶",detailKeys:["channelId","messageId"]},unpinMessage:{label:"取消置顶",detailKeys:["channelId","messageId"]},listPins:{label:"置顶列表",detailKeys:["channelId"]},memberInfo:{label:"成员",detailKeys:["userId"]},emojiList:{label:"表情列表"}}}},Ah={fallback:kh,tools:Sh},Il=Ah,Mo=Il.fallback??{icon:"puzzle"},Ch=Il.tools??{};function Th(e){return(e??"tool").trim()}function _h(e){const t=e.replace(/_/g," ").trim();return t?t.split(/\s+/).map(n=>n.length<=2&&n.toUpperCase()===n?n:`${n.at(0)?.toUpperCase()??""}${n.slice(1)}`).join(" "):"Tool"}function Eh(e){const t=e?.trim();if(t)return t.replace(/_/g," ")}function Rl(e){if(e!=null){if(typeof e=="string"){const t=e.trim();if(!t)return;const n=t.split(/\r?\n/)[0]?.trim()??"";return n?n.length>160?`${n.slice(0,157)}…`:n:void 0}if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const t=e.map(s=>Rl(s)).filter(s=>!!s);if(t.length===0)return;const n=t.slice(0,3).join(", ");return t.length>3?`${n}…`:n}}}function Lh(e,t){if(!e||typeof e!="object")return;let n=e;for(const s of t.split(".")){if(!s||!n||typeof n!="object")return;n=n[s]}return n}function Mh(e,t){for(const n of t){const s=Lh(e,n),i=Rl(s);if(i)return i}}function Ih(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.path=="string"?t.path:void 0;if(!n)return;const s=typeof t.offset=="number"?t.offset:void 0,i=typeof t.limit=="number"?t.limit:void 0;return s!==void 0&&i!==void 0?`${n}:${s}-${s+i}`:n}function Rh(e){if(!e||typeof e!="object")return;const t=e;return typeof t.path=="string"?t.path:void 0}function Ph(e,t){if(!(!e||!t))return e.actions?.[t]??void 0}function Dh(e){const t=Th(e.name),n=t.toLowerCase(),s=Ch[n],i=s?.icon??Mo.icon??"puzzle",a=s?.title??_h(t),o=s?.label??t,l=e.args&&typeof e.args=="object"?e.args.action:void 0,c=typeof l=="string"?l.trim():void 0,u=Ph(s,c),p=Eh(u?.label??c);let g;n==="read"&&(g=Ih(e.args)),!g&&(n==="write"||n==="edit"||n==="attach")&&(g=Rh(e.args));const h=u?.detailKeys??s?.detailKeys??Mo.detailKeys??[];return!g&&h.length>0&&(g=Mh(e.args,h)),!g&&e.meta&&(g=e.meta),g&&(g=Oh(g)),{name:t,icon:i,title:a,label:o,verb:p,detail:g}}function Fh(e){const t=[];if(e.verb&&t.push(e.verb),e.detail&&t.push(e.detail),t.length!==0)return t.join(" · ")}function Oh(e){return e&&e.replace(/\/Users\/[^/]+/g,"~").replace(/\/home\/[^/]+/g,"~")}const Nh=80,Bh=2,Io=100;function zh(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Uh(e){const t=e.split(`
`),n=t.slice(0,Bh),s=n.join(`
`);return s.length>Io?s.slice(0,Io)+"…":n.length<t.length?s+"…":s}function Hh(e){const t=e,n=Kh(t.content),s=[];for(const i of n){const a=String(i.type??"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(a)||typeof i.name=="string"&&i.arguments!=null)&&s.push({kind:"call",name:i.name??"tool",args:jh(i.arguments??i.args)})}for(const i of n){const a=String(i.type??"").toLowerCase();if(a!=="toolresult"&&a!=="tool_result")continue;const o=qh(i),l=typeof i.name=="string"?i.name:"tool";s.push({kind:"result",name:l,text:o})}if(Ml(e)&&!s.some(i=>i.kind==="result")){const i=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",a=pr(e)??void 0;s.push({kind:"result",name:i,text:a})}return s}function Ro(e,t){const n=Dh({name:e.name,args:e.args}),s=Fh(n),i=!!e.text?.trim(),a=!!t,o=a?()=>{if(i){t(zh(e.text));return}const g=`## ${n.label}

${s?`**Command:** \`${s}\`

`:""}*No output — tool completed successfully.*`;t(g)}:void 0,l=i&&(e.text?.length??0)<=Nh,c=i&&!l,u=i&&l,p=!i;return r`
    <div
      class="chat-tool-card ${a?"chat-tool-card--clickable":""}"
      @click=${o}
      role=${a?"button":m}
      tabindex=${a?"0":m}
      @keydown=${a?g=>{g.key!=="Enter"&&g.key!==" "||(g.preventDefault(),o?.())}:m}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${le[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${a?r`<span class="chat-tool-card__action">${i?"View":""} ${le.check}</span>`:m}
        ${p&&!a?r`<span class="chat-tool-card__status">${le.check}</span>`:m}
      </div>
      ${s?r`<div class="chat-tool-card__detail">${s}</div>`:m}
      ${p?r`<div class="chat-tool-card__status-text muted">Completed</div>`:m}
      ${c?r`<div class="chat-tool-card__preview mono">${Uh(e.text)}</div>`:m}
      ${u?r`<div class="chat-tool-card__inline mono">${e.text}</div>`:m}
    </div>
  `}function Kh(e){return Array.isArray(e)?e.filter(Boolean):[]}function jh(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function qh(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Wh(e){const n=e.content,s=[];if(Array.isArray(n))for(const i of n){if(typeof i!="object"||i===null)continue;const a=i;if(a.type==="image"){const o=a.source;if(o?.type==="base64"&&typeof o.data=="string"){const l=o.data,c=o.media_type||"image/png",u=l.startsWith("data:")?l:`data:${c};base64,${l}`;s.push({url:u})}else typeof a.url=="string"&&s.push({url:a.url})}else if(a.type==="image_url"){const o=a.image_url;typeof o?.url=="string"&&s.push({url:o.url})}}return s}function Vh(e){return r`
    <div class="chat-group assistant">
      ${aa("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Gh(e,t,n,s){const i=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),a=s?.name??"助手";return r`
    <div class="chat-group assistant">
      ${aa("assistant",s)}
      <div class="chat-group-messages">
        ${Pl({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${a}</span>
          <span class="chat-group-timestamp">${i}</span>
        </div>
      </div>
    </div>
  `}function Qh(e,t){const n=ia(e.role),s=t.assistantName??"助手",i=n==="user"?"你":n==="assistant"?s:n,a=n==="user"?"user":n==="assistant"?"assistant":"other",o=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r`
    <div class="chat-group ${a}">
      ${aa(e.role,{name:s,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((l,c)=>Pl(l.message,{isStreaming:e.isStreaming&&c===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${i}</span>
          <span class="chat-group-timestamp">${o}</span>
        </div>
      </div>
    </div>
  `}function aa(e,t){const n=ia(e),s=t?.name?.trim()||"助手",i=t?.avatar?.trim()||"",a=n==="user"?"U":n==="assistant"?s.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",o=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return i&&n==="assistant"?Yh(i)?r`<img
        class="chat-avatar ${o}"
        src="${i}"
        alt="${s}"
      />`:r`<div class="chat-avatar ${o}">${i}</div>`:r`<div class="chat-avatar ${o}">${a}</div>`}function Yh(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||/^\//.test(e)}function Zh(e){return e.length===0?m:r`
    <div class="chat-message-images">
      ${e.map(t=>r`
          <img
            src=${t.url}
            alt=${t.alt??"附件图片"}
            class="chat-message-image"
            @click=${()=>window.open(t.url,"_blank")}
          />
        `)}
    </div>
  `}function Pl(e,t,n){const s=e,i=typeof s.role=="string"?s.role:"unknown",a=Ml(e)||i.toLowerCase()==="toolresult"||i.toLowerCase()==="tool_result"||typeof s.toolCallId=="string"||typeof s.tool_call_id=="string",o=Hh(e),l=o.length>0,c=Wh(e),u=c.length>0,p=pr(e),g=t.showReasoning&&i==="assistant"?Vc(e):null,h=p?.trim()?p:null,f=g?Qc(g):null,d=h,v=i==="assistant"&&!!d?.trim(),S=["chat-bubble",v?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!d&&l&&a?r`${o.map(k=>Ro(k,n))}`:!d&&!l&&!u?m:r`
    <div class="${S}">
      ${v?wh(d):m}
      ${Zh(c)}
      ${f?r`<div class="chat-thinking">${li(vi(f))}</div>`:m}
      ${d?r`<div class="chat-text">${li(vi(d))}</div>`:m}
      ${o.map(k=>Ro(k,n))}
    </div>
  `}function Xh(e){return r`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${le.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?r`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?r`<div class="sidebar-markdown">${li(vi(e.content))}</div>`:r`<div class="muted">No content available</div>`}
      </div>
    </div>
  `}var Jh=Object.defineProperty,ev=Object.getOwnPropertyDescriptor,os=(e,t,n,s)=>{for(var i=s>1?void 0:s?ev(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(s?o(t,n,i):o(i))||i);return s&&i&&Jh(t,n,i),i};let Lt=class extends Ct{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,i=(e.clientX-this.startX)/n;let a=this.startRatio+i;a=Math.max(this.minRatio,Math.min(this.maxRatio,a)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:a},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return m}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Lt.styles=Gl`
    :host {
      width: 4px;
      cursor: col-resize;
      background: var(--border, #333);
      transition: background 150ms ease-out;
      flex-shrink: 0;
      position: relative;
    }
    
    :host::before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      right: -4px;
      bottom: 0;
    }
    
    :host(:hover) {
      background: var(--accent, #007bff);
    }
    
    :host(.dragging) {
      background: var(--accent, #007bff);
    }
  `;os([Gn({type:Number})],Lt.prototype,"splitRatio",2);os([Gn({type:Number})],Lt.prototype,"minRatio",2);os([Gn({type:Number})],Lt.prototype,"maxRatio",2);Lt=os([ir("resizable-divider")],Lt);const tv=5e3;function Po(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function nv(e){return e?e.active?r`
      <div class="callout info compaction-indicator compaction-indicator--active">
        ${le.loader} 正在压缩上下文...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<tv?r`
        <div class="callout success compaction-indicator compaction-indicator--complete">
          ${le.check} 上下文已压缩
        </div>
      `:m:m}function sv(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function iv(e,t){const n=e.clipboardData?.items;if(!n||!t.onAttachmentsChange)return;const s=[];for(let i=0;i<n.length;i++){const a=n[i];a.type.startsWith("image/")&&s.push(a)}if(s.length!==0){e.preventDefault();for(const i of s){const a=i.getAsFile();if(!a)continue;const o=new FileReader;o.addEventListener("load",()=>{const l=o.result,c={id:sv(),dataUrl:l,mimeType:a.type},u=t.attachments??[];t.onAttachmentsChange?.([...u,c])}),o.readAsDataURL(a)}}}function av(e){const t=e.attachments??[];return t.length===0?m:r`
    <div class="chat-attachments">
      ${t.map(n=>r`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt="附件预览"
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label="移除附件"
              @click=${()=>{const s=(e.attachments??[]).filter(i=>i.id!==n.id);e.onAttachmentsChange?.(s)}}
            >
              ${le.x}
            </button>
          </div>
        `)}
    </div>
  `}function ov(e){const t=e.connected,n=e.sending||e.stream!==null,s=!!(e.canAbort&&e.onAbort),a=e.sessions?.sessions?.find(f=>f.key===e.sessionKey)?.reasoningLevel??"off",o=e.showThinking&&a!=="off",l={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},c=(e.attachments?.length??0)>0,u=e.connected?c?"添加消息或粘贴更多图片...":"消息（↩ 发送，Shift+↩ 换行，可粘贴图片）":"连接网关以开始对话…",p=e.splitRatio??.6,g=!!(e.sidebarOpen&&e.onCloseSidebar),h=r`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?r`
              <div class="muted">正在加载对话…</div>
            `:m}
      ${ii(lv(e),f=>f.key,f=>f.kind==="reading-indicator"?Vh(l):f.kind==="stream"?Gh(f.text,f.startedAt,e.onOpenSidebar,l):f.kind==="group"?Qh(f,{onOpenSidebar:e.onOpenSidebar,showReasoning:o,assistantName:e.assistantName,assistantAvatar:l.avatar}):m)}
    </div>
  `;return r`
    <section class="card chat">
      ${e.disabledReason?r`<div class="callout">${e.disabledReason}</div>`:m}

      ${e.error?r`<div class="callout danger">${e.error}</div>`:m}

      ${nv(e.compactionStatus)}

      ${e.focusMode?r`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label="退出专注模式"
              title="退出专注模式"
            >
              ${le.x}
            </button>
          `:m}

      <div
        class="chat-split-container ${g?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${g?`0 0 ${p*100}%`:"1 1 100%"}"
        >
          ${h}
        </div>

        ${g?r`
              <resizable-divider
                .splitRatio=${p}
                @resize=${f=>e.onSplitRatioChange?.(f.detail.splitRatio)}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Xh({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:m}
      </div>

      ${e.queue.length?r`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">队列 (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(f=>r`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${f.text||(f.attachments?.length?`图片 (${f.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label="移除队列消息"
                        @click=${()=>e.onQueueRemove(f.id)}
                      >
                        ${le.x}
                      </button>
                    </div>
                  `)}
              </div>
            </div>
          `:m}

      ${e.showNewMessages?r`
            <button
              class="chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              新消息 ${le.arrowDown}
            </button>
          `:m}

      <div class="chat-compose">
        ${av(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>消息</span>
            <textarea
              ${sf(f=>f&&Po(f))}
              .value=${e.draft}
              ?disabled=${!e.connected}
              @keydown=${f=>{f.key==="Enter"&&(f.isComposing||f.keyCode===229||f.shiftKey||e.connected&&(f.preventDefault(),t&&e.onSend()))}}
              @input=${f=>{const d=f.target;Po(d),e.onDraftChange(d.value)}}
              @paste=${f=>iv(f,e)}
              placeholder=${u}
            ></textarea>
          </label>
          <div class="chat-compose__actions">
            <button
              class="btn"
              ?disabled=${!e.connected||!s&&e.sending}
              @click=${s?e.onAbort:e.onNewSession}
            >
              ${s?"停止":"新会话"}
            </button>
            <button
              class="btn primary"
              ?disabled=${!e.connected}
              @click=${e.onSend}
            >
              ${n?"队列":"发送"}<kbd class="btn-kbd">↵</kbd>
            </button>
          </div>
        </div>
      </div>
    </section>
  `}const Do=200;function rv(e){const t=[];let n=null;for(const s of e){if(s.kind!=="message"){n&&(t.push(n),n=null),t.push(s);continue}const i=Ll(s.message),a=ia(i.role),o=i.timestamp||Date.now();!n||n.role!==a?(n&&t.push(n),n={kind:"group",key:`group:${a}:${s.key}`,role:a,messages:[{message:s.message,key:s.key}],timestamp:o,isStreaming:!1}):n.messages.push({message:s.message,key:s.key})}return n&&t.push(n),t}function lv(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],s=Array.isArray(e.toolMessages)?e.toolMessages:[],i=Math.max(0,n.length-Do);i>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${Do} messages (${i} hidden).`,timestamp:Date.now()}});for(let a=i;a<n.length;a++){const o=n[a],l=Ll(o);!e.showThinking&&l.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:Fo(o,a),message:o})}if(e.showThinking)for(let a=0;a<s.length;a++)t.push({kind:"message",key:Fo(s[a],a+n.length),message:s[a]});if(e.stream!==null){const a=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:a,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:a})}return rv(t)}function Fo(e,t){const n=e,s=typeof n.toolCallId=="string"?n.toolCallId:"";if(s)return`tool:${s}`;const i=typeof n.id=="string"?n.id:"";if(i)return`msg:${i}`;const a=typeof n.messageId=="string"?n.messageId:"";if(a)return`msg:${a}`;const o=typeof n.timestamp=="number"?n.timestamp:null,l=typeof n.role=="string"?n.role:"unknown";return o!=null?`msg:${l}:${o}:${t}`:`msg:${l}:${t}`}const mi={all:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,env:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,update:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,agents:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><circle cx="8" cy="14" r="1"></circle><circle cx="16" cy="14" r="1"></circle></svg>`,auth:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,channels:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,messages:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,commands:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,hooks:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,skills:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,tools:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,gateway:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,wizard:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="M17.8 11.8 19 13"></path><path d="M15 9h0"></path><path d="M17.8 6.2 19 5"></path><path d="m3 21 9-9"></path><path d="M12.2 6.2 11 5"></path></svg>`,meta:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`,logging:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,browser:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>`,ui:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,models:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,bindings:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,broadcast:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>`,audio:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,session:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,cron:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,web:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,discovery:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,canvasHost:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,talk:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,plugins:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6"></path><path d="m4.93 10.93 4.24 4.24"></path><path d="M2 12h6"></path><path d="m4.93 13.07 4.24-4.24"></path><path d="M12 22v-6"></path><path d="m19.07 13.07-4.24-4.24"></path><path d="M22 12h-6"></path><path d="m19.07 10.93-4.24 4.24"></path></svg>`,default:r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`},Oo=[{key:"env",label:"环境"},{key:"update",label:"更新"},{key:"agents",label:"代理"},{key:"auth",label:"身份验证"},{key:"channels",label:"通道"},{key:"messages",label:"消息"},{key:"commands",label:"命令"},{key:"hooks",label:"钩子"},{key:"skills",label:"技能"},{key:"tools",label:"工具"},{key:"gateway",label:"网关"},{key:"wizard",label:"设置向导"}],No="__all__";function Bo(e){return mi[e]??mi.default}function cv(e,t){const n=Gi[e];return n||{label:t?.title??qe(e),description:t?.description??""}}function dv(e){const{key:t,schema:n,uiHints:s}=e;if(!n||De(n)!=="object"||!n.properties)return[];const i=Object.entries(n.properties).map(([a,o])=>{const l=Se([t,a],s),c=l?.label??o.title??qe(a),u=l?.help??o.description??"",p=l?.order??50;return{key:a,label:c,description:u,order:p}});return i.sort((a,o)=>a.order!==o.order?a.order-o.order:a.key.localeCompare(o.key)),i}function uv(e,t){if(!e||!t)return[];const n=[];function s(i,a,o){if(i===a)return;if(typeof i!=typeof a){n.push({path:o,from:i,to:a});return}if(typeof i!="object"||i===null||a===null){i!==a&&n.push({path:o,from:i,to:a});return}if(Array.isArray(i)&&Array.isArray(a)){JSON.stringify(i)!==JSON.stringify(a)&&n.push({path:o,from:i,to:a});return}const l=i,c=a,u=new Set([...Object.keys(l),...Object.keys(c)]);for(const p of u)s(l[p],c[p],o?`${o}.${p}`:p)}return s(e,t,""),n}function zo(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function gv(e){const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=cl(e.schema),s=n.schema?n.unsupportedPaths.length>0:!1,i=n.schema?.properties??{},a=Oo.filter(T=>T.key in i),o=new Set(Oo.map(T=>T.key)),l=Object.keys(i).filter(T=>!o.has(T)).map(T=>({key:T,label:T.charAt(0).toUpperCase()+T.slice(1)})),c=[...a,...l],u=e.activeSection&&n.schema&&De(n.schema)==="object"?n.schema.properties?.[e.activeSection]:void 0,p=e.activeSection?cv(e.activeSection,u):null,g=e.activeSection?dv({key:e.activeSection,schema:u,uiHints:e.uiHints}):[],h=e.formMode==="form"&&!!e.activeSection&&g.length>0,f=e.activeSubsection===No,d=e.searchQuery||f?null:e.activeSubsection??g[0]?.key??null,v=e.formMode==="form"?uv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,k=e.formMode==="form"?v.length>0:S,x=!!e.formValue&&!e.loading&&!!n.schema,C=e.connected&&!e.saving&&k&&(e.formMode==="raw"?!0:x),A=e.connected&&!e.applying&&!e.updating&&k&&(e.formMode==="raw"?!0:x),_=e.connected&&!e.applying&&!e.updating;return r`
    <div class="config-layout">
      <!-- Sidebar -->
      <aside class="config-sidebar">
        <div class="config-sidebar__header">
          <div class="config-sidebar__title">设置</div>
          <span class="pill pill--sm ${t==="valid"?"pill--ok":t==="invalid"?"pill--danger":""}">${t}</span>
        </div>

        <!-- Search -->
        <div class="config-search">
          <svg class="config-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            class="config-search__input"
            placeholder="搜索设置..."
            .value=${e.searchQuery}
            @input=${T=>e.onSearchChange(T.target.value)}
          />
          ${e.searchQuery?r`
            <button
              class="config-search__clear"
              @click=${()=>e.onSearchChange("")}
            >×</button>
          `:m}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${mi.all}</span>
            <span class="config-nav__label">所有设置</span>
          </button>
          ${c.map(T=>r`
            <button
              class="config-nav__item ${e.activeSection===T.key?"active":""}"
              @click=${()=>e.onSectionChange(T.key)}
            >
              <span class="config-nav__icon">${Bo(T.key)}</span>
              <span class="config-nav__label">${T.label}</span>
            </button>
          `)}
        </nav>

        <!-- Mode toggle at bottom -->
        <div class="config-sidebar__footer">
          <div class="config-mode-toggle">
            <button
              class="config-mode-toggle__btn ${e.formMode==="form"?"active":""}"
              ?disabled=${e.schemaLoading||!e.schema}
              @click=${()=>e.onFormModeChange("form")}
            >
              表单
            </button>
            <button
              class="config-mode-toggle__btn ${e.formMode==="raw"?"active":""}"
              @click=${()=>e.onFormModeChange("raw")}
            >
              原始
            </button>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="config-main">
        <!-- Action bar -->
        <div class="config-actions">
          <div class="config-actions__left">
            ${k?r`
              <span class="config-changes-badge">${e.formMode==="raw"?"未保存的更改":`${v.length} 个未保存的更改`}</span>
            `:r`
              <span class="config-status muted">无更改</span>
            `}
          </div>
          <div class="config-actions__right">
            <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onReload}>
              ${e.loading?"加载中…":"重新加载"}
            </button>
            <button
              class="btn btn--sm primary"
              ?disabled=${!C}
              @click=${e.onSave}
            >
              ${e.saving?"保存中…":"保存"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!A}
              @click=${e.onApply}
            >
              ${e.applying?"应用中…":"应用"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!_}
              @click=${e.onUpdate}
            >
              ${e.updating?"更新中…":"更新"}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${k&&e.formMode==="form"?r`
          <details class="config-diff">
            <summary class="config-diff__summary">
              <span>查看 ${v.length} 个待处理的更改</span>
              <svg class="config-diff__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <div class="config-diff__content">
              ${v.map(T=>r`
                <div class="config-diff__item">
                  <div class="config-diff__path">${T.path}</div>
                  <div class="config-diff__values">
                    <span class="config-diff__from">${zo(T.from)}</span>
                    <span class="config-diff__arrow">→</span>
                    <span class="config-diff__to">${zo(T.to)}</span>
                  </div>
                </div>
              `)}
            </div>
          </details>
        `:m}

        ${p&&e.formMode==="form"?r`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">${Bo(e.activeSection??"")}</div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">${p.label}</div>
                  ${p.description?r`<div class="config-section-hero__desc">${p.description}</div>`:m}
                </div>
              </div>
            `:m}

        ${h?r`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${d===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(No)}
                >
                  全部
                </button>
                ${g.map(T=>r`
                    <button
                      class="config-subnav__item ${d===T.key?"active":""}"
                      title=${T.description||T.label}
                      @click=${()=>e.onSubsectionChange(T.key)}
                    >
                      ${T.label}
                    </button>
                  `)}
              </div>
            `:m}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?r`
                ${e.schemaLoading?r`<div class="config-loading">
                      <div class="config-loading__spinner"></div>
                      <span>正在加载模式…</span>
                    </div>`:Ap({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:d})}
                ${s?r`<div class="callout danger" style="margin-top: 12px;">
                      表单视图无法安全编辑某些字段。
                      使用原始模式以避免丢失配置项。
                    </div>`:m}
              `:r`
                <label class="field config-raw-field">
                  <span>原始JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${T=>e.onRawChange(T.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?r`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">${JSON.stringify(e.issues,null,2)}</pre>
            </div>`:m}
      </main>
    </div>
  `}function pv(e){const t=["last",...e.channels.filter(Boolean)],n=e.form.deliveryChannel?.trim();n&&!t.includes(n)&&t.push(n);const s=new Set;return t.filter(i=>s.has(i)?!1:(s.add(i),!0))}function fv(e,t){if(t==="last")return"last";const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function hv(e){const t=pv(e);return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">调度器</div>
        <div class="card-sub">网关内置定时调度器状态。</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">已启用</div>
            <div class="stat-value">
              ${e.status?e.status.enabled?"是":"否":"无"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">任务数</div>
            <div class="stat-value">${e.status?.jobs??"n/a"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">下次唤醒</div>
            <div class="stat-value">${Vi(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"刷新中…":"刷新"}
          </button>
          ${e.error?r`<span class="muted">${e.error}</span>`:m}
        </div>
      </div>

      <div class="card">
        <div class="card-title">新建任务</div>
        <div class="card-sub">创建定时唤醒或代理运行。</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>名称</span>
            <input
              .value=${e.form.name}
              @input=${n=>e.onFormChange({name:n.target.value})}
            />
          </label>
          <label class="field">
            <span>描述</span>
            <input
              .value=${e.form.description}
              @input=${n=>e.onFormChange({description:n.target.value})}
            />
          </label>
          <label class="field">
            <span>代理 ID</span>
            <input
              .value=${e.form.agentId}
              @input=${n=>e.onFormChange({agentId:n.target.value})}
              placeholder="默认"
            />
          </label>
          <label class="field checkbox">
            <span>启用</span>
            <input
              type="checkbox"
              .checked=${e.form.enabled}
              @change=${n=>e.onFormChange({enabled:n.target.checked})}
            />
          </label>
          <label class="field">
            <span>调度</span>
            <select
              .value=${e.form.scheduleKind}
              @change=${n=>e.onFormChange({scheduleKind:n.target.value})}
            >
              <option value="every">每隔</option>
              <option value="at">定时</option>
              <option value="cron">Cron 表达式</option>
            </select>
          </label>
        </div>
        ${vv(e)}
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>会话</span>
            <select
              .value=${e.form.sessionTarget}
              @change=${n=>e.onFormChange({sessionTarget:n.target.value})}
            >
              <option value="main">主会话</option>
              <option value="isolated">独立会话</option>
            </select>
          </label>
          <label class="field">
            <span>唤醒模式</span>
            <select
              .value=${e.form.wakeMode}
              @change=${n=>e.onFormChange({wakeMode:n.target.value})}
            >
              <option value="next-heartbeat">下次心跳</option>
              <option value="now">立即</option>
            </select>
          </label>
          <label class="field">
            <span>负载</span>
            <select
              .value=${e.form.payloadKind}
              @change=${n=>e.onFormChange({payloadKind:n.target.value})}
            >
              <option value="systemEvent">系统事件</option>
              <option value="agentTurn">代理轮次</option>
            </select>
          </label>
        </div>
        <label class="field" style="margin-top: 12px;">
          <span>${e.form.payloadKind==="systemEvent"?"系统文本":"代理消息"}</span>
          <textarea
            .value=${e.form.payloadText}
            @input=${n=>e.onFormChange({payloadText:n.target.value})}
            rows="4"
          ></textarea>
        </label>
        ${e.form.payloadKind==="agentTurn"?r`
                <div class="form-grid" style="margin-top: 12px;">
                  <label class="field">
                    <span>分发方式</span>
                    <select
                      .value=${e.form.deliveryMode}
                      @change=${n=>e.onFormChange({deliveryMode:n.target.value})}
                    >
                      <option value="legacy">主会话摘要（旧版）</option>
                      <option value="announce">通告摘要（默认）</option>
                      <option value="deliver">分发完整输出</option>
                      <option value="none">无（内部）</option>
                    </select>
                  </label>
                  <label class="field">
                    <span>超时（秒）</span>
                    <input
                      .value=${e.form.timeoutSeconds}
                      @input=${n=>e.onFormChange({timeoutSeconds:n.target.value})}
                    />
                  </label>
                  ${e.form.deliveryMode==="announce"||e.form.deliveryMode==="deliver"?r`
                          <label class="field">
                            <span>通道</span>
                            <select
                              .value=${e.form.deliveryChannel||"last"}
                              @change=${n=>e.onFormChange({deliveryChannel:n.target.value})}
                            >
                              ${t.map(n=>r`<option value=${n}>
                                    ${fv(e,n)}
                                  </option>`)}
                            </select>
                          </label>
                          <label class="field">
                            <span>发送至</span>
                            <input
                              .value=${e.form.deliveryTo}
                              @input=${n=>e.onFormChange({deliveryTo:n.target.value})}
                              placeholder="+1555… 或聊天 ID"
                            />
                          </label>
                        `:m}
                  ${e.form.sessionTarget==="isolated"&&e.form.deliveryMode==="legacy"?r`
                          <label class="field">
                            <span>发布到主会话前缀</span>
                            <input
                              .value=${e.form.postToMainPrefix}
                              @input=${n=>e.onFormChange({postToMainPrefix:n.target.value})}
                            />
                          </label>
                        `:m}
                </div>
              `:m}
        <div class="row" style="margin-top: 14px;">
          <button class="btn primary" ?disabled=${e.busy} @click=${e.onAdd}>
            ${e.busy?"保存中…":"添加任务"}
          </button>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">任务列表</div>
      <div class="card-sub">网关中存储的所有定时任务。</div>
      ${e.jobs.length===0?r`
              <div class="muted" style="margin-top: 12px">暂无任务。</div>
            `:r`
            <div class="list" style="margin-top: 12px;">
              ${e.jobs.map(n=>mv(n,e))}
            </div>
          `}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">运行历史</div>
      <div class="card-sub">${e.runsJobId??"（选择一个任务）"}的最近运行记录。</div>
      ${e.runsJobId==null?r`
              <div class="muted" style="margin-top: 12px">选择一个任务以查看运行历史。</div>
            `:e.runs.length===0?r`
                <div class="muted" style="margin-top: 12px">暂无运行记录。</div>
              `:r`
              <div class="list" style="margin-top: 12px;">
                ${e.runs.map(n=>bv(n))}
              </div>
            `}
    </section>
  `}function vv(e){const t=e.form;return t.scheduleKind==="at"?r`
      <label class="field" style="margin-top: 12px;">
        <span>运行时间</span>
        <input
          type="datetime-local"
          .value=${t.scheduleAt}
          @input=${n=>e.onFormChange({scheduleAt:n.target.value})}
        />
      </label>
    `:t.scheduleKind==="every"?r`
      <div class="form-grid" style="margin-top: 12px;">
        <label class="field">
          <span>每隔</span>
          <input
            .value=${t.everyAmount}
            @input=${n=>e.onFormChange({everyAmount:n.target.value})}
          />
        </label>
        <label class="field">
          <span>单位</span>
          <select
            .value=${t.everyUnit}
            @change=${n=>e.onFormChange({everyUnit:n.target.value})}
          >
            <option value="minutes">分钟</option>
            <option value="hours">小时</option>
            <option value="days">天</option>
          </select>
        </label>
      </div>
    `:r`
    <div class="form-grid" style="margin-top: 12px;">
      <label class="field">
        <span>表达式</span>
        <input
          .value=${t.cronExpr}
          @input=${n=>e.onFormChange({cronExpr:n.target.value})}
        />
      </label>
      <label class="field">
        <span>时区（可选）</span>
        <input
          .value=${t.cronTz}
          @input=${n=>e.onFormChange({cronTz:n.target.value})}
        />
      </label>
    </div>
  `}function mv(e,t){const s=`list-item list-item-clickable${t.runsJobId===e.id?" list-item-selected":""}`;return r`
    <div class=${s} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${tl(e)}</div>
        <div class="muted">${nl(e)}</div>
        ${e.agentId?r`<div class="muted">代理: ${e.agentId}</div>`:m}
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.enabled?"已启用":"已禁用"}</span>
          <span class="chip">${e.sessionTarget}</span>
          <span class="chip">${e.wakeMode}</span>
        </div>
      </div>
      <div class="list-meta">
        <div>${el(e)}</div>
        <div class="row" style="justify-content: flex-end; margin-top: 8px;">
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onToggle(e,!e.enabled)}}
          >
            ${e.enabled?"禁用":"启用"}
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onRun(e)}}
          >
            运行
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onLoadRuns(e.id)}}
          >
            历史
          </button>
          <button
            class="btn danger"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onRemove(e)}}
          >
            删除
          </button>
        </div>
      </div>
    </div>
  `}function bv(e){return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.status}</div>
        <div class="list-sub">${e.summary??""}</div>
      </div>
      <div class="list-meta">
        <div>${Xt(e.ts)}</div>
        <div class="muted">${e.durationMs??0}ms</div>
        ${e.error?r`<div class="muted">${e.error}</div>`:m}
      </div>
    </div>
  `}function yv(e){return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">快照</div>
            <div class="card-sub">状态、健康状况和心跳数据。</div>
          </div>
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"刷新中…":"刷新"}
          </button>
        </div>
        <div class="stack" style="margin-top: 12px;">
          <div>
            <div class="muted">状态</div>
            <pre class="code-block">${JSON.stringify(e.status??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">健康状况</div>
            <pre class="code-block">${JSON.stringify(e.health??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">最后心跳</div>
            <pre class="code-block">${JSON.stringify(e.heartbeat??{},null,2)}</pre>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">手动RPC</div>
        <div class="card-sub">使用JSON参数发送原始网关方法。</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>方法</span>
            <input
              .value=${e.callMethod}
              @input=${t=>e.onCallMethodChange(t.target.value)}
              placeholder="系统状态"
            />
          </label>
          <label class="field">
            <span>参数（JSON）</span>
            <textarea
              .value=${e.callParams}
              @input=${t=>e.onCallParamsChange(t.target.value)}
              rows="6"
            ></textarea>
          </label>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn primary" @click=${e.onCall}>调用</button>
        </div>
        ${e.callError?r`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:m}
        ${e.callResult?r`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:m}
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">模型</div>
      <div class="card-sub">来自models.list的目录。</div>
      <pre class="code-block" style="margin-top: 12px;">${JSON.stringify(e.models??[],null,2)}</pre>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">事件日志</div>
      <div class="card-sub">最新的网关事件。</div>
      ${e.eventLog.length===0?r`<div class="muted" style="margin-top: 12px;">暂无事件。</div>`:r`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(t=>r`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${t.event}</div>
                      <div class="list-sub">${new Date(t.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${Bg(t.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function xv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const s=Math.floor(n/60);return s<60?`${s}m`:`${Math.floor(s/60)}h`}function it(e,t){return t?r`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:m}function $v(e){const t=e.execApprovalQueue[0];if(!t)return m;const n=t.request,s=t.expiresAtMs-Date.now(),i=s>0?`${xv(s)} 后过期`:"已过期",a=e.execApprovalQueue.length;return r`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">执行审批</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
          ${a>1?r`<div class="exec-approval-queue">${a} 个待处理</div>`:m}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${it("主机",n.host)}
          ${it("代理",n.agentId)}
          ${it("会话",n.sessionKey)}
          ${it("工作目录",n.cwd)}
          ${it("解析路径",n.resolvedPath)}
          ${it("安全策略",n.security)}
          ${it("询问模式",n.ask)}
        </div>
        ${e.execApprovalError?r`<div class="exec-approval-error">${e.execApprovalError}</div>`:m}
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-once")}
          >
            允许一次
          </button>
          <button
            class="btn"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-always")}
          >
            始终允许
          </button>
          <button
            class="btn danger"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("deny")}
          >
            拒绝
          </button>
        </div>
      </div>
    </div>
  `}function wv(e){const t=e.pendingGatewayUrl;if(!t)return m;const n=e.settings.gatewayUrl||window.location.origin;return r`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite" aria-modal="true">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">⚠️ 网关地址变更请求</div>
            <div class="exec-approval-sub">请仔细核实此请求</div>
          </div>
        </div>
        <div class="exec-approval-meta">
          <div class="exec-approval-meta-row">
            <span>当前地址</span>
            <span class="mono">${n}</span>
          </div>
          <div class="exec-approval-meta-row">
            <span>请求地址</span>
            <span class="mono" style="color: var(--warning)">${t}</span>
          </div>
        </div>
        <div style="margin: 1rem 0; padding: 0.75rem; background: var(--danger-bg, rgba(239, 68, 68, 0.1)); border-radius: 0.5rem; font-size: 0.875rem;">
          <strong>安全警告：</strong>此请求来自 URL 参数。如果您不确定来源，请拒绝此请求。
          连接到恶意网关可能导致您的认证信息泄露。
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn danger"
            @click=${()=>e.rejectPendingGatewayUrl()}
          >
            拒绝
          </button>
          <button
            class="btn primary"
            @click=${()=>e.acceptPendingGatewayUrl()}
          >
            确认连接
          </button>
        </div>
      </div>
    </div>
  `}function kv(e){return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">已连接实例</div>
          <div class="card-sub">来自网关和客户端的存在信标。</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"加载中…":"刷新"}
        </button>
      </div>
      ${e.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${e.lastError}
          </div>`:m}
      ${e.statusMessage?r`<div class="callout" style="margin-top: 12px;">
            ${e.statusMessage}
          </div>`:m}
      <div class="list" style="margin-top: 16px;">
        ${e.entries.length===0?r`<div class="muted">暂未报告任何实例。</div>`:e.entries.map(t=>Sv(t))}
      </div>
    </section>
  `}function Sv(e){const t=e.lastInputSeconds!=null?`${e.lastInputSeconds}秒前`:"无",n=e.mode??"未知",s=Array.isArray(e.roles)?e.roles.filter(Boolean):[],i=Array.isArray(e.scopes)?e.scopes.filter(Boolean):[],a=i.length>0?i.length>3?`${i.length} 作用域`:`作用域: ${i.join(", ")}`:null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.host??"未知主机"}</div>
        <div class="list-sub">${Fg(e)}</div>
        <div class="chip-row">
          <span class="chip">${n}</span>
          ${s.map(o=>r`<span class="chip">${o}</span>`)}
          ${a?r`<span class="chip">${a}</span>`:m}
          ${e.platform?r`<span class="chip">${e.platform}</span>`:m}
          ${e.deviceFamily?r`<span class="chip">${e.deviceFamily}</span>`:m}
          ${e.modelIdentifier?r`<span class="chip">${e.modelIdentifier}</span>`:m}
          ${e.version?r`<span class="chip">${e.version}</span>`:m}
        </div>
      </div>
      <div class="list-meta">
        <div>${Og(e)}</div>
        <div class="muted">上次输入 ${t}</div>
        <div class="muted">原因 ${e.reason??""}</div>
      </div>
    </div>
  `}const Uo=["trace","debug","info","warn","error","fatal"];function Av(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Cv(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Tv(e){const t=e.filterText.trim().toLowerCase(),n=Uo.some(a=>!e.levelFilters[a]),s=e.entries.filter(a=>a.level&&!e.levelFilters[a.level]?!1:Cv(a,t)),i=t||n?"filtered":"visible";return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">日志</div>
          <div class="card-sub">网关文件日志（JSONL）。</div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"加载中…":"刷新"}
          </button>
          <button
            class="btn"
            ?disabled=${s.length===0}
            @click=${()=>e.onExport(s.map(a=>a.raw),i)}
          >
            导出 ${i}
          </button>
        </div>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="min-width: 220px;">
          <span>过滤器</span>
          <input
            .value=${e.filterText}
            @input=${a=>e.onFilterTextChange(a.target.value)}
            placeholder="搜索日志"
          />
        </label>
        <label class="field checkbox">
          <span>自动跟随</span>
          <input
            type="checkbox"
            .checked=${e.autoFollow}
            @change=${a=>e.onToggleAutoFollow(a.target.checked)}
          />
        </label>
      </div>

      <div class="chip-row" style="margin-top: 12px;">
        ${Uo.map(a=>r`
            <label class="chip log-chip ${a}">
              <input
                type="checkbox"
                .checked=${e.levelFilters[a]}
                @change=${o=>e.onLevelToggle(a,o.target.checked)}
              />
              <span>${a}</span>
            </label>
          `)}
      </div>

      ${e.file?r`<div class="muted" style="margin-top: 10px;">文件: ${e.file}</div>`:m}
      ${e.truncated?r`<div class="callout" style="margin-top: 10px;">
            日志输出已截断；显示最新部分。
          </div>`:m}
      ${e.error?r`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:m}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${s.length===0?r`<div class="muted" style="padding: 12px;">无日志条目。</div>`:s.map(a=>r`
                <div class="log-row">
                  <div class="log-time mono">${Av(a.time)}</div>
                  <div class="log-level ${a.level??""}">${a.level??""}</div>
                  <div class="log-subsystem mono">${a.subsystem??""}</div>
                  <div class="log-message mono">${a.message??a.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function _v(e){const t=Pv(e),n=zv(e);return r`
    ${Hv(n)}
    ${Uv(t)}
    ${Ev(e)}
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">节点</div>
          <div class="card-sub">配对设备和实时链接。</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"加载中…":"刷新"}
        </button>
      </div>
      <div class="list" style="margin-top: 16px;">
        ${e.nodes.length===0?r`<div class="muted">未找到节点。</div>`:e.nodes.map(s=>Xv(s))}
      </div>
    </section>
  `}function Ev(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],s=Array.isArray(t.paired)?t.paired:[];return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">设备</div>
          <div class="card-sub">配对请求 + 角色令牌。</div>
        </div>
        <button class="btn" ?disabled=${e.devicesLoading} @click=${e.onDevicesRefresh}>
          ${e.devicesLoading?"加载中…":"刷新"}
        </button>
      </div>
      ${e.devicesError?r`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:m}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?r`
              <div class="muted" style="margin-bottom: 8px;">待处理</div>
              ${n.map(i=>Lv(i,e))}
            `:m}
        ${s.length>0?r`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">已配对</div>
              ${s.map(i=>Mv(i,e))}
            `:m}
        ${n.length===0&&s.length===0?r`<div class="muted">无配对设备。</div>`:m}
      </div>
    </section>
  `}function Lv(e,t){const n=e.displayName?.trim()||e.deviceId,s=typeof e.ts=="number"?Y(e.ts):"无",i=e.role?.trim()?`role: ${e.role}`:"角色: -",a=e.isRepair?" · repair":"",o=e.remoteIp?` · ${e.remoteIp}`:"";return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${o}</div>
        <div class="muted" style="margin-top: 6px;">
          ${i} · requested ${s}${a}
        </div>
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn--sm primary" @click=${()=>t.onDeviceApprove(e.requestId)}>
            批准
          </button>
          <button class="btn btn--sm" @click=${()=>t.onDeviceReject(e.requestId)}>
            拒绝
          </button>
        </div>
      </div>
    </div>
  `}function Mv(e,t){const n=e.displayName?.trim()||e.deviceId,s=e.remoteIp?` · ${e.remoteIp}`:"",i=`角色: ${qs(e.roles)}`,a=`范围: ${qs(e.scopes)}`,o=Array.isArray(e.tokens)?e.tokens:[];return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${s}</div>
        <div class="muted" style="margin-top: 6px;">${i} · ${a}</div>
        ${o.length===0?r`<div class="muted" style="margin-top: 6px;">令牌: 无</div>`:r`
              <div class="muted" style="margin-top: 10px;">令牌</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${o.map(l=>Iv(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function Iv(e,t,n){const s=t.revokedAtMs?"revoked":"active",i=`范围: ${qs(t.scopes)}`,a=Y(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return r`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${s} · ${i} · ${a}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          更新
        </button>
        ${t.revokedAtMs?m:r`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}>
              >
                撤销
              </button>
            `}
      </div>
    </div>
  `}const Ge="__defaults__",Ho=[{value:"deny",label:"拒绝"},{value:"allowlist",label:"白名单"},{value:"full",label:"全部"}],Rv=[{value:"off",label:"关闭"},{value:"on-miss",label:"未命中时"},{value:"always",label:"始终"}];function Pv(e){const t=e.configForm,n=Qv(e.nodes),{defaultBinding:s,agents:i}=Zv(t),a=!!t,o=e.configSaving||e.configFormMode==="raw";return{ready:a,disabled:o,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:s,agents:i,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function Ko(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Dv(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Fv(e){const t=e?.defaults??{};return{security:Ko(t.security),ask:Dv(t.ask),askFallback:Ko(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Ov(e){const t=e?.agents??{},n=Array.isArray(t.list)?t.list:[],s=[];return n.forEach(i=>{if(!i||typeof i!="object")return;const a=i,o=typeof a.id=="string"?a.id.trim():"";if(!o)return;const l=typeof a.name=="string"?a.name.trim():void 0,c=a.default===!0;s.push({id:o,name:l||void 0,isDefault:c})}),s}function Nv(e,t){const n=Ov(e),s=Object.keys(t?.agents??{}),i=new Map;n.forEach(o=>i.set(o.id,o)),s.forEach(o=>{i.has(o)||i.set(o,{id:o})});const a=Array.from(i.values());return a.length===0&&a.push({id:"main",isDefault:!0}),a.sort((o,l)=>{if(o.isDefault&&!l.isDefault)return-1;if(!o.isDefault&&l.isDefault)return 1;const c=o.name?.trim()?o.name:o.id,u=l.name?.trim()?l.name:l.id;return c.localeCompare(u)}),a}function Bv(e,t){return e===Ge?Ge:e&&t.some(n=>n.id===e)?e:Ge}function zv(e){const t=e.execApprovalsForm??e.execApprovalsSnapshot?.file??null,n=!!t,s=Fv(t),i=Nv(e.configForm,t),a=Yv(e.nodes),o=e.execApprovalsTarget;let l=o==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;o==="node"&&l&&!a.some(g=>g.id===l)&&(l=null);const c=Bv(e.execApprovalsSelectedAgent,i),u=c!==Ge?(t?.agents??{})[c]??null:null,p=Array.isArray(u?.allowlist)?u.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:s,selectedScope:c,selectedAgent:u,agents:i,allowlist:p,target:o,targetNodeId:l,targetNodes:a,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Uv(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return r`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">执行节点绑定</div>
          <div class="card-sub">
            使用<span class="mono">exec host=node</span>时将代理固定到特定节点。
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.configDirty}
          @click=${e.onSave}
        >
          ${e.configSaving?"保存中…":"保存"}
        </button>
      </div>

      ${e.formMode==="raw"?r`<div class="callout warn" style="margin-top: 12px;">
            将配置选项卡切换到<strong>表单</strong>模式以在此处编辑绑定。
          </div>`:m}

      ${e.ready?r`
            <div class="list" style="margin-top: 16px;">
              <div class="list-item">
                <div class="list-main">
                  <div class="list-title">默认绑定</div>
                  <div class="list-sub">当代理不覆盖节点绑定时使用。</div>
                </div>
                <div class="list-meta">
                  <label class="field">
                    <span>节点</span>
                    <select
                      ?disabled=${e.disabled||!t}
                      @change=${s=>{const a=s.target.value.trim();e.onBindDefault(a||null)}}
                    >
                      <option value="" ?selected=${n===""}>任何节点</option>
                      ${e.nodes.map(s=>r`<option
                            value=${s.id}
                            ?selected=${n===s.id}
                          >
                            ${s.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?m:r`<div class="muted">没有可用system.run的节点。</div>`}
                </div>
              </div>

              ${e.agents.length===0?r`<div class="muted">未找到代理。</div>`:e.agents.map(s=>Gv(s,e))}
            </div>
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">加载配置以编辑绑定。</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"加载中…":"加载配置"}
            </button>
          </div>`}
    </section>
  `}function Hv(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">执行审批</div>
          <div class="card-sub">
            <span class="mono">exec host=gateway/node</span>的白名单和审批策略。
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.dirty||!n}
          @click=${e.onSave}
        >
          ${e.saving?"保存中…":"保存"}
        </button>
      </div>

      ${Kv(e)}

      ${t?r`
            ${jv(e)}
            ${qv(e)}
            ${e.selectedScope===Ge?m:Wv(e)}
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">加载执行审批以编辑白名单。</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"加载中…":"加载审批"}
            </button>
          </div>`}
    </section>
  `}function Kv(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return r`
    <div class="list" style="margin-top: 12px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">目标</div>
          <div class="list-sub">
            网关编辑本地审批；节点编辑选定的节点。
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>主机</span>
            <select
              ?disabled=${e.disabled}
              @change=${s=>{if(s.target.value==="node"){const o=e.targetNodes[0]?.id??null;e.onSelectTarget("node",n||o)}else e.onSelectTarget("gateway",null)}}
            >
              <option value="gateway" ?selected=${e.target==="gateway"}>网关</option>
              <option value="node" ?selected=${e.target==="node"}>节点</option>
            </select>
          </label>
          ${e.target==="node"?r`
                <label class="field">
                  <span>节点</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${s=>{const a=s.target.value.trim();e.onSelectTarget("node",a||null)}}
                  >
                    <option value="" ?selected=${n===""}>选择节点</option>
                    ${e.targetNodes.map(s=>r`<option
                          value=${s.id}
                          ?selected=${n===s.id}
                        >
                          ${s.label}
                        </option>`)}
                  </select>
                </label>
              `:m}
        </div>
      </div>
      ${e.target==="node"&&!t?r`<div class="muted">尚无节点发布执行审批广告。</div>`:m}
    </div>
  `}function jv(e){return r`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">范围</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Ge?"active":""}"
          @click=${()=>e.onSelectScope(Ge)}
        >
          默认值
        </button>
        ${e.agents.map(t=>{const n=t.name?.trim()?`${t.name} (${t.id})`:t.id;return r`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function qv(e){const t=e.selectedScope===Ge,n=e.defaults,s=e.selectedAgent??{},i=t?["defaults"]:["agents",e.selectedScope],a=typeof s.security=="string"?s.security:void 0,o=typeof s.ask=="string"?s.ask:void 0,l=typeof s.askFallback=="string"?s.askFallback:void 0,c=t?n.security:a??"__default__",u=t?n.ask:o??"__default__",p=t?n.askFallback:l??"__default__",g=typeof s.autoAllowSkills=="boolean"?s.autoAllowSkills:void 0,h=g??n.autoAllowSkills,f=g==null;return r`
    <div class="list" style="margin-top: 16px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">安全</div>
          <div class="list-sub">
            ${t?"默认安全模式。":`默认值: ${n.security}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>模式</span>
            <select
              ?disabled=${e.disabled}
              @change=${d=>{const S=d.target.value;!t&&S==="__default__"?e.onRemove([...i,"security"]):e.onPatch([...i,"security"],S)}}
            >
              ${t?m:r`<option value="__default__" ?selected=${c==="__default__"}>
                    使用默认值 (${n.security})
                  </option>`}
              ${Ho.map(d=>r`<option
                    value=${d.value}
                    ?selected=${c===d.value}
                  >
                    ${d.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">询问</div>
          <div class="list-sub">
            ${t?"默认提示策略。":`默认值: ${n.ask}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>模式</span>
            <select
              ?disabled=${e.disabled}
              @change=${d=>{const S=d.target.value;!t&&S==="__default__"?e.onRemove([...i,"ask"]):e.onPatch([...i,"ask"],S)}}
            >
              ${t?m:r`<option value="__default__" ?selected=${u==="__default__"}>
                    使用默认值 (${n.ask})
                  </option>`}
              ${Rv.map(d=>r`<option
                    value=${d.value}
                    ?selected=${u===d.value}
                  >
                    ${d.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">询问回退</div>
          <div class="list-sub">
            ${t?"当UI提示不可用时应用。":`默认值: ${n.askFallback}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>回退</span>
            <select
              ?disabled=${e.disabled}
              @change=${d=>{const S=d.target.value;!t&&S==="__default__"?e.onRemove([...i,"askFallback"]):e.onPatch([...i,"askFallback"],S)}}
            >
              ${t?m:r`<option value="__default__" ?selected=${p==="__default__"}>
                    使用默认值 (${n.askFallback})
                  </option>`}
              ${Ho.map(d=>r`<option
                    value=${d.value}
                    ?selected=${p===d.value}
                  >
                    ${d.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">自动允许技能CLI</div>
          <div class="list-sub">
            ${t?"允许网关列出的技能可执行文件。":f?`使用默认值 (${n.autoAllowSkills?"开":"关"}).`:`覆盖 (${h?"开":"关"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>启用</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${h}
              @change=${d=>{const v=d.target;e.onPatch([...i,"autoAllowSkills"],v.checked)}}
            />
          </label>
          ${!t&&!f?r`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,"autoAllowSkills"])}
              >
                使用默认值
              </button>`:m}
        </div>
      </div>
    </div>
  `}function Wv(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return r`
    <div class="row" style="margin-top: 18px; justify-content: space-between;">
      <div>
        <div class="card-title">白名单</div>
        <div class="card-sub">不区分大小写的通配符模式。</div>
      </div>
      <button
        class="btn btn--sm"
        ?disabled=${e.disabled}
        @click=${()=>{const s=[...n,{pattern:""}];e.onPatch(t,s)}}
      >
        添加模式
      </button>
    </div>
    <div class="list" style="margin-top: 12px;">
      ${n.length===0?r`<div class="muted">尚无白名单条目。</div>`:n.map((s,i)=>Vv(e,s,i))}
    </div>
  `}function Vv(e,t,n){const s=t.lastUsedAt?Y(t.lastUsedAt):"从未",i=t.lastUsedCommand?Ws(t.lastUsedCommand,120):null,a=t.lastResolvedPath?Ws(t.lastResolvedPath,120):null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t.pattern?.trim()?t.pattern:"新模式"}</div>
        <div class="list-sub">最后使用: ${s}</div>
        ${i?r`<div class="list-sub mono">${i}</div>`:m}
        ${a?r`<div class="list-sub mono">${a}</div>`:m}
      </div>
      <div class="list-meta">
        <label class="field">
          <span>模式</span>
          <input
            type="text"
            .value=${t.pattern??""}
            ?disabled=${e.disabled}
            @input=${o=>{const l=o.target;e.onPatch(["agents",e.selectedScope,"allowlist",n,"pattern"],l.value)}}
          />
        </label>
        <button
          class="btn btn--sm danger"
          ?disabled=${e.disabled}
          @click=${()=>{if(e.allowlist.length<=1){e.onRemove(["agents",e.selectedScope,"allowlist"]);return}e.onRemove(["agents",e.selectedScope,"allowlist",n])}}
        >
          移除
        </button>
      </div>
    </div>
  `}function Gv(e,t){const n=e.binding??"__default__",s=e.name?.trim()?`${e.name} (${e.id})`:e.id,i=t.nodes.length>0;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${s}</div>
        <div class="list-sub">
          ${e.isDefault?"默认代理":"代理"} ·
          ${n==="__default__"?`使用默认值 (${t.defaultBinding??"任意"})`:`覆盖: ${e.binding}`}
        </div>
      </div>
      <div class="list-meta">
        <label class="field">
          <span>绑定</span>
          <select
            ?disabled=${t.disabled||!i}
            @change=${a=>{const l=a.target.value.trim();t.onBindAgent(e.index,l==="__default__"?null:l)}}
          >
            <option value="__default__" ?selected=${n==="__default__"}>
              使用默认值
            </option>
            ${t.nodes.map(a=>r`<option
                  value=${a.id}
                  ?selected=${n===a.id}
                >
                  ${a.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function Qv(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.run"))continue;const a=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!a)continue;const o=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():a;t.push({id:a,label:o===a?a:`${o} · ${a}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function Yv(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.execApprovals.get"||String(l)==="system.execApprovals.set"))continue;const a=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!a)continue;const o=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():a;t.push({id:a,label:o===a?a:`${o} · ${a}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function Zv(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const s=(e.tools??{}).exec??{},i=typeof s.node=="string"&&s.node.trim()?s.node.trim():null,a=e.agents??{},o=Array.isArray(a.list)?a.list:[];if(o.length===0)return{defaultBinding:i,agents:[t]};const l=[];return o.forEach((c,u)=>{if(!c||typeof c!="object")return;const p=c,g=typeof p.id=="string"?p.id.trim():"";if(!g)return;const h=typeof p.name=="string"?p.name.trim():void 0,f=p.default===!0,v=(p.tools??{}).exec??{},S=typeof v.node=="string"&&v.node.trim()?v.node.trim():null;l.push({id:g,name:h||void 0,index:u,isDefault:f,binding:S})}),l.length===0&&l.push(t),{defaultBinding:i,agents:l}}function Xv(e){const t=!!e.connected,n=!!e.paired,s=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"未知"),i=Array.isArray(e.caps)?e.caps:[],a=Array.isArray(e.commands)?e.commands:[];return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${s}</div>
        <div class="list-sub">
          ${typeof e.nodeId=="string"?e.nodeId:""}
          ${typeof e.remoteIp=="string"?` · ${e.remoteIp}`:""}
          ${typeof e.version=="string"?` · ${e.version}`:""}
        </div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${n?"已配对":"未配对"}</span>
          <span class="chip ${t?"chip-ok":"chip-warn"}">
            ${t?"已连接":"离线"}
          </span>
          ${i.slice(0,12).map(o=>r`<span class="chip">${String(o)}</span>`)}
          ${a.slice(0,8).map(o=>r`<span class="chip">${String(o)}</span>`)}
        </div>
      </div>
    </div>
  `}function Jv(e){const t=e.hello?.snapshot,n=t?.uptimeMs?ur(t.uptimeMs):"n/a",s=t?.policy?.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:"n/a",i=(()=>{if(e.connected||!e.lastError)return null;const o=e.lastError.toLowerCase();if(!(o.includes("unauthorized")||o.includes("connect failed")))return null;const c=!!e.settings.token.trim(),u=!!e.password.trim();return!c&&!u?r`
        <div class="muted" style="margin-top: 8px;">
          此网关需要身份验证。添加令牌或密码，然后点击连接。
          <div style="margin-top: 6px;">
            <span class="mono">clawdbot dashboard --no-open</span> → 生成带令牌的URL<br />
            <span class="mono">clawdbot doctor --generate-gateway-token</span> → 设置令牌
          </div>
          <div style="margin-top: 6px;">
            <a
              class="session-link"
              href="https://docs.clawd.bot/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title="控制界面身份验证文档（在新标签页中打开）"
              >文档：控制界面身份验证</a
            >
          </div>
        </div>
      `:r`
      <div class="muted" style="margin-top: 8px;">
        身份验证失败。重新复制带令牌的URL，使用
        <span class="mono">clawdbot dashboard --no-open</span>，或更新令牌，
        然后点击连接。
        <div style="margin-top: 6px;">
          <a
            class="session-link"
            href="https://docs.clawd.bot/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title="控制界面身份验证文档（在新标签页中打开）"
            >文档：控制界面身份验证</a
          >
        </div>
      </div>
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0)!==!1)return null;const l=e.lastError.toLowerCase();return!l.includes("secure context")&&!l.includes("device identity required")?null:r`
      <div class="muted" style="margin-top: 8px;">
        此页面使用HTTP协议，因此浏览器会阻止设备身份验证。请使用HTTPS（Tailscale Serve）或
        在网关主机上打开 <span class="mono">http://127.0.0.1:18789</span>。
        <div style="margin-top: 6px;">
          如果必须使用HTTP，请设置
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span>（仅限令牌）。
        </div>
        <div style="margin-top: 6px;">
          <a
            class="session-link"
            href="https://docs.clawd.bot/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title="Tailscale Serve 文档（在新标签页中打开）"
            >文档：Tailscale Serve</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.clawd.bot/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title="非安全HTTP文档（在新标签页中打开）"
            >文档：非安全HTTP</a
          >
        </div>
      </div>
    `})();return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">网关访问</div>
        <div class="card-sub">仪表板连接位置以及身份验证方式。</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>WebSocket URL</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${o=>{const l=o.target.value;e.onSettingsChange({...e.settings,gatewayUrl:l})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>网关令牌</span>
            <input
              .value=${e.settings.token}
              @input=${o=>{const l=o.target.value;e.onSettingsChange({...e.settings,token:l})}}
              placeholder="CLAWDBOT_GATEWAY_TOKEN"
            />
          </label>
          <label class="field">
            <span>密码（不存储）</span>
            <input
              type="password"
              .value=${e.password}
              @input=${o=>{const l=o.target.value;e.onPasswordChange(l)}}
              placeholder="系统或共享密码"
            />
          </label>
          <label class="field">
            <span>默认会话密钥</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${o=>{const l=o.target.value;e.onSessionKeyChange(l)}}
            />
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>连接</button>
          <button class="btn" @click=${()=>e.onRefresh()}>刷新</button>
          <span class="muted">点击连接以应用连接更改。</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">快照</div>
        <div class="card-sub">最新网关握手信息。</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">状态</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?"已连接":"已断开"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">运行时间</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">心跳间隔</div>
            <div class="stat-value">${s}</div>
          </div>
          <div class="stat">
            <div class="stat-label">上次通道刷新</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?Y(e.lastChannelsRefresh):"无"}
            </div>
          </div>
        </div>
        ${e.lastError?r`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${i??""}
              ${a??""}
            </div>`:r`<div class="callout" style="margin-top: 14px;">
              使用通道链接 WhatsApp、Telegram、Discord、Signal 或 iMessage。
            </div>`}
      </div>
    </section>

    <section class="grid grid-cols-3" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">实例</div>
        <div class="stat-value">${e.presenceCount}</div>
        <div class="muted">过去5分钟内的存在信标。</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">会话</div>
        <div class="stat-value">${e.sessionsCount??"n/a"}</div>
        <div class="muted">网关跟踪的最近会话密钥。</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">定时任务</div>
        <div class="stat-value">
          ${e.cronEnabled==null?"无":e.cronEnabled?"启用":"禁用"}
        </div>
        <div class="muted">下次唤醒 ${Vi(e.cronNext)}</div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">注意事项</div>
      <div class="card-sub">远程控制设置的快速提醒。</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">Tailscale服务</div>
          <div class="muted">
            优先使用服务模式，在回环接口上保持网关并使用尾网认证。
          </div>
        </div>
        <div>
          <div class="note-title">会话管理</div>
          <div class="muted">使用 /new 或 sessions.patch 来重置上下文。</div>
        </div>
        <div>
          <div class="note-title">定时任务提醒</div>
          <div class="muted">对重复运行使用隔离会话。</div>
        </div>
      </div>
    </section>
  `}const em=["","off","minimal","low","medium","high"],tm=["","off","on"],nm=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"}],sm=["","off","on","stream"];function im(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function Dl(e){return im(e)==="zai"}function am(e){return Dl(e)?tm:em}function om(e,t){return!t||!e||e==="off"?e:"on"}function rm(e,t){return e?t&&e==="on"?"low":e:null}function lm(e){const t=e.result?.sessions??[];return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">会话</div>
          <div class="card-sub">活跃会话密钥和每会话覆盖设置。</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"加载中…":"刷新"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field">
          <span>活跃于（分钟内）</span>
          <input
            .value=${e.activeMinutes}
            @input=${n=>e.onFiltersChange({activeMinutes:n.target.value,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field">
          <span>限制</span>
          <input
            .value=${e.limit}
            @input=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:n.target.value,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>包含全局</span>
          <input
            type="checkbox"
            .checked=${e.includeGlobal}
            @change=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:n.target.checked,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>包含未知</span>
          <input
            type="checkbox"
            .checked=${e.includeUnknown}
            @change=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:n.target.checked})}
          />
        </label>
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:m}

      <div class="muted" style="margin-top: 12px;">
        ${e.result?`存储: ${e.result.path}`:""}
      </div>

      <div class="table" style="margin-top: 16px;">
        <div class="table-head">
          <div>密钥</div>
          <div>标签</div>
          <div>类型</div>
          <div>更新时间</div>
          <div>令牌</div>
          <div>思考</div>
          <div>详细</div>
          <div>推理</div>
          <div>操作</div>
        </div>
        ${t.length===0?r`<div class="muted">未找到会话。</div>`:t.map(n=>cm(n,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function cm(e,t,n,s,i){const a=e.updatedAt?Y(e.updatedAt):"无",o=e.thinkingLevel??"",l=Dl(e.modelProvider),c=om(o,l),u=am(e.modelProvider),p=e.verboseLevel??"",g=e.reasoningLevel??"",h=e.displayName??e.key,f=e.kind!=="global",d=f?`${Ui("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return r`
    <div class="table-row">
      <div class="mono">${f?r`<a href=${d} class="session-link">${h}</a>`:h}</div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${i}
          placeholder="（可选）"
          @change=${v=>{const S=v.target.value.trim();n(e.key,{label:S||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${a}</div>
      <div>${Ng(e)}</div>
      <div>
        <select
          .value=${c}
          ?disabled=${i}
          @change=${v=>{const S=v.target.value;n(e.key,{thinkingLevel:rm(S,l)})}}
        >
          ${u.map(v=>r`<option value=${v}>${v||"继承"}</option>`)}
        </select>
      </div>
      <div>
        <select
          .value=${p}
          ?disabled=${i}
          @change=${v=>{const S=v.target.value;n(e.key,{verboseLevel:S||null})}}
        >
          ${nm.map(v=>r`<option value=${v.value}>${v.label}</option>`)}
        </select>
      </div>
      <div>
        <select
          .value=${g}
          ?disabled=${i}
          @change=${v=>{const S=v.target.value;n(e.key,{reasoningLevel:S||null})}}
        >
          ${sm.map(v=>r`<option value=${v}>${v||"继承"}</option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${i} @click=${()=>s(e.key)}>
          删除
        </button>
      </div>
    </div>
  `}const Bs=[{id:"workspace",label:"工作区技能",sources:["openclaw-workspace"]},{id:"built-in",label:"内置技能",sources:["openclaw-bundled"]},{id:"installed",label:"已安装技能",sources:["openclaw-managed"]},{id:"extra",label:"额外技能",sources:["openclaw-extra"]}];function dm(e){const t=new Map;for(const i of Bs)t.set(i.id,{id:i.id,label:i.label,skills:[]});const n={id:"other",label:"其他技能",skills:[]};for(const i of e){const a=Bs.find(o=>o.sources.includes(i.source));a?t.get(a.id)?.skills.push(i):n.skills.push(i)}const s=Bs.map(i=>t.get(i.id)).filter(i=>!!(i&&i.skills.length>0));return n.skills.length>0&&s.push(n),s}function um(e){const t=e.report?.skills??[],n=e.filter.trim().toLowerCase(),s=n?t.filter(a=>[a.name,a.description,a.source].join(" ").toLowerCase().includes(n)):t,i=dm(s);return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">技能</div>
          <div class="card-sub">内置、管理和工作区技能。</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"加载中…":"刷新"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>过滤</span>
          <input
            .value=${e.filter}
            @input=${a=>e.onFilterChange(a.target.value)}
            placeholder="搜索技能"
          />
        </label>
        <div class="muted">显示 ${s.length} 个</div>
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:m}

      ${s.length===0?r`
              <div class="muted" style="margin-top: 16px">未找到技能。</div>
            `:r`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${i.map(a=>{const o=a.id==="workspace"||a.id==="built-in";return r`
                  <details class="agent-skills-group" ?open=${!o}>
                    <summary class="agent-skills-header">
                      <span>${a.label}</span>
                      <span class="muted">${a.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${a.skills.map(l=>gm(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function gm(e,t){const n=t.busyKey===e.skillKey,s=t.edits[e.skillKey]??"",i=t.messages[e.skillKey]??null,a=e.install.length>0&&e.missing.bins.length>0,o=[...e.missing.bins.map(c=>`bin:${c}`),...e.missing.env.map(c=>`env:${c}`),...e.missing.config.map(c=>`config:${c}`),...e.missing.os.map(c=>`os:${c}`)],l=[];return e.disabled&&l.push("已禁用"),e.blockedByAllowlist&&l.push("被白名单阻止"),e.security?.securityInfo&&l.push(e.security.securityInfo),r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${Ws(e.description,140)}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"可用":"已阻止"}
          </span>
          ${e.disabled?r`
                  <span class="chip chip-warn">已禁用</span>
                `:m}
        </div>
        ${o.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                缺失: ${o.join(", ")}
              </div>
            `:m}
        ${l.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                原因: ${l.join(", ")}
              </div>
            `:m}
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; flex-wrap: wrap;">
          <button
            class="btn"
            ?disabled=${n}
            @click=${()=>t.onToggle(e.skillKey,e.disabled)}
          >
            ${e.disabled?"启用":"禁用"}
          </button>
          ${a?r`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"安装中…":e.install[0].label}
              </button>`:m}
        </div>
        ${i?r`<div
              class="muted"
              style="margin-top: 8px; color: ${i.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${i.message}
            </div>`:m}
        ${e.primaryEnv?r`
              <div class="field" style="margin-top: 10px;">
                <span>API 密钥</span>
                <input
                  type="password"
                  .value=${s}
                  @input=${c=>t.onEdit(e.skillKey,c.target.value)}
                />
              </div>
              <button
                class="btn primary"
                style="margin-top: 8px;"
                ?disabled=${n}
                @click=${()=>t.onSaveKey(e.skillKey)}
              >
                保存密钥
              </button>
            `:m}
      </div>
    </div>
  `}const pm=new Set(["agent","channel","chat","provider","model","tool","label","key","session","id","has","mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"]),Kn=e=>e.trim().toLowerCase(),fm=e=>{const t=e.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${t}$`,"i")},rt=e=>{let t=e.trim().toLowerCase();if(!t)return null;t.startsWith("$")&&(t=t.slice(1));let n=1;t.endsWith("k")?(n=1e3,t=t.slice(0,-1)):t.endsWith("m")&&(n=1e6,t=t.slice(0,-1));const s=Number(t);return Number.isFinite(s)?s*n:null},oa=e=>(e.match(/"[^"]+"|\S+/g)??[]).map(n=>{const s=n.replace(/^"|"$/g,""),i=s.indexOf(":");if(i>0){const a=s.slice(0,i),o=s.slice(i+1);return{key:a,value:o,raw:s}}return{value:s,raw:s}}),hm=e=>[e.label,e.key,e.sessionId].filter(n=>!!n).map(n=>n.toLowerCase()),jo=e=>{const t=new Set;e.modelProvider&&t.add(e.modelProvider.toLowerCase()),e.providerOverride&&t.add(e.providerOverride.toLowerCase()),e.origin?.provider&&t.add(e.origin.provider.toLowerCase());for(const n of e.usage?.modelUsage??[])n.provider&&t.add(n.provider.toLowerCase());return Array.from(t)},qo=e=>{const t=new Set;e.model&&t.add(e.model.toLowerCase());for(const n of e.usage?.modelUsage??[])n.model&&t.add(n.model.toLowerCase());return Array.from(t)},vm=e=>(e.usage?.toolUsage?.tools??[]).map(t=>t.name.toLowerCase()),mm=(e,t)=>{const n=Kn(t.value??"");if(!n)return!0;if(!t.key)return hm(e).some(i=>i.includes(n));switch(Kn(t.key)){case"agent":return e.agentId?.toLowerCase().includes(n)??!1;case"channel":return e.channel?.toLowerCase().includes(n)??!1;case"chat":return e.chatType?.toLowerCase().includes(n)??!1;case"provider":return jo(e).some(i=>i.includes(n));case"model":return qo(e).some(i=>i.includes(n));case"tool":return vm(e).some(i=>i.includes(n));case"label":return e.label?.toLowerCase().includes(n)??!1;case"key":case"session":case"id":if(n.includes("*")||n.includes("?")){const i=fm(n);return i.test(e.key)||(e.sessionId?i.test(e.sessionId):!1)}return e.key.toLowerCase().includes(n)||(e.sessionId?.toLowerCase().includes(n)??!1);case"has":switch(n){case"tools":return(e.usage?.toolUsage?.totalCalls??0)>0;case"errors":return(e.usage?.messageCounts?.errors??0)>0;case"context":return!!e.contextWeight;case"usage":return!!e.usage;case"model":return qo(e).length>0;case"provider":return jo(e).length>0;default:return!0}case"mintokens":{const i=rt(n);return i===null?!0:(e.usage?.totalTokens??0)>=i}case"maxtokens":{const i=rt(n);return i===null?!0:(e.usage?.totalTokens??0)<=i}case"mincost":{const i=rt(n);return i===null?!0:(e.usage?.totalCost??0)>=i}case"maxcost":{const i=rt(n);return i===null?!0:(e.usage?.totalCost??0)<=i}case"minmessages":{const i=rt(n);return i===null?!0:(e.usage?.messageCounts?.total??0)>=i}case"maxmessages":{const i=rt(n);return i===null?!0:(e.usage?.messageCounts?.total??0)<=i}default:return!0}},bm=(e,t)=>{const n=oa(t);if(n.length===0)return{sessions:e,warnings:[]};const s=[];for(const a of n){if(!a.key)continue;const o=Kn(a.key);if(!pm.has(o)){s.push(`Unknown filter: ${a.key}`);continue}if(a.value===""&&s.push(`Missing value for ${a.key}`),o==="has"){const l=new Set(["tools","errors","context","usage","model","provider"]);a.value&&!l.has(Kn(a.value))&&s.push(`Unknown has:${a.value}`)}["mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"].includes(o)&&a.value&&rt(a.value)===null&&s.push(`Invalid number for ${a.key}`)}return{sessions:e.filter(a=>n.every(o=>mm(a,o))),warnings:s}};function ym(e){const t=e.split(`
`),n=new Map,s=[];for(const l of t){const c=/^\[Tool:\s*([^\]]+)\]/.exec(l.trim());if(c){const u=c[1];n.set(u,(n.get(u)??0)+1);continue}l.trim().startsWith("[Tool Result]")||s.push(l)}const i=Array.from(n.entries()).toSorted((l,c)=>c[1]-l[1]),a=i.reduce((l,[,c])=>l+c,0),o=i.length>0?`Tools: ${i.map(([l,c])=>`${l}×${c}`).join(", ")} (${a} calls)`:"";return{tools:i,summary:o,cleanContent:s.join(`
`).trim()}}const xm=`
  .usage-page-header {
    margin: 4px 0 12px;
  }
  .usage-page-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  .usage-page-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0 0 12px;
  }
  /* ===== FILTERS & HEADER ===== */
  .usage-filters-inline {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .usage-filters-inline select {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
  }
  .usage-filters-inline input[type="date"] {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
  }
  .usage-filters-inline input[type="text"] {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
    min-width: 180px;
  }
  .usage-filters-inline .btn-sm {
    padding: 6px 12px;
    font-size: 14px;
  }
  .usage-refresh-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: rgba(255, 77, 77, 0.1);
    border-radius: 4px;
    font-size: 12px;
    color: #ff4d4d;
  }
  .usage-refresh-indicator::before {
    content: "";
    width: 10px;
    height: 10px;
    border: 2px solid #ff4d4d;
    border-top-color: transparent;
    border-radius: 50%;
    animation: usage-spin 0.6s linear infinite;
  }
  @keyframes usage-spin {
    to { transform: rotate(360deg); }
  }
  .active-filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .filter-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px 4px 12px;
    background: var(--accent-subtle);
    border: 1px solid var(--accent);
    border-radius: 16px;
    font-size: 12px;
  }
  .filter-chip-label {
    color: var(--accent);
    font-weight: 500;
  }
  .filter-chip-remove {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    padding: 2px 4px;
    font-size: 14px;
    line-height: 1;
    opacity: 0.7;
    transition: opacity 0.15s;
  }
  .filter-chip-remove:hover {
    opacity: 1;
  }
  .filter-clear-btn {
    padding: 4px 10px !important;
    font-size: 12px !important;
    line-height: 1 !important;
    margin-left: 8px;
  }
  .usage-query-bar {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) auto;
    gap: 10px;
    align-items: center;
    /* Keep the dropdown filter row from visually touching the query row. */
    margin-bottom: 10px;
  }
  .usage-query-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: nowrap;
    justify-self: end;
  }
  .usage-query-actions .btn {
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text);
    box-shadow: none;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .usage-query-actions .btn:hover {
    background: var(--bg);
    border-color: var(--border-strong);
  }
  .usage-action-btn {
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text);
    box-shadow: none;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .usage-action-btn:hover {
    background: var(--bg);
    border-color: var(--border-strong);
  }
  .usage-primary-btn {
    background: #ff4d4d;
    color: #fff;
    border-color: #ff4d4d;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12);
  }
  .btn.usage-primary-btn {
    background: #ff4d4d !important;
    border-color: #ff4d4d !important;
    color: #fff !important;
  }
  .usage-primary-btn:hover {
    background: #e64545;
    border-color: #e64545;
  }
  .btn.usage-primary-btn:hover {
    background: #e64545 !important;
    border-color: #e64545 !important;
  }
  .usage-primary-btn:disabled {
    background: rgba(255, 77, 77, 0.18);
    border-color: rgba(255, 77, 77, 0.3);
    color: #ff4d4d;
    box-shadow: none;
    cursor: default;
    opacity: 1;
  }
  .usage-primary-btn[disabled] {
    background: rgba(255, 77, 77, 0.18) !important;
    border-color: rgba(255, 77, 77, 0.3) !important;
    color: #ff4d4d !important;
    opacity: 1 !important;
  }
  .usage-secondary-btn {
    background: var(--bg-secondary);
    color: var(--text);
    border-color: var(--border);
  }
  .usage-query-input {
    width: 100%;
    min-width: 220px;
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
  }
  .usage-query-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }
  .usage-query-suggestion {
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
    color: var(--text);
    cursor: pointer;
    transition: background 0.15s;
  }
  .usage-query-suggestion:hover {
    background: var(--bg-hover);
  }
  .usage-filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-top: 14px;
  }
  details.usage-filter-select {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 6px 10px;
    background: var(--bg);
    font-size: 12px;
    min-width: 140px;
  }
  details.usage-filter-select summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    font-weight: 500;
  }
  details.usage-filter-select summary::-webkit-details-marker {
    display: none;
  }
  .usage-filter-badge {
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-filter-popover {
    position: absolute;
    left: 0;
    top: calc(100% + 6px);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    min-width: 220px;
    z-index: 20;
  }
  .usage-filter-actions {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }
  .usage-filter-actions button {
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 11px;
  }
  .usage-filter-options {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 200px;
    overflow: auto;
  }
  .usage-filter-option {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .usage-query-hint {
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-query-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }
  .usage-query-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
  }
  .usage-query-chip button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
  .usage-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: var(--bg);
  }
  .usage-header.pinned {
    position: sticky;
    top: 12px;
    z-index: 6;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  }
  .usage-pin-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
    color: var(--text);
    cursor: pointer;
  }
  .usage-pin-btn.active {
    background: var(--accent-subtle);
    border-color: var(--accent);
    color: var(--accent);
  }
  .usage-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .usage-header-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .usage-header-metrics {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .usage-metric-badge {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: transparent;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-metric-badge strong {
    font-size: 12px;
    color: var(--text);
  }
  .usage-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .usage-controls .active-filters {
    flex: 1 1 100%;
  }
  .usage-controls input[type="date"] {
    min-width: 140px;
  }
  .usage-presets {
    display: inline-flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .usage-presets .btn {
    padding: 4px 8px;
    font-size: 11px;
  }
  .usage-quick-filters {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .usage-select {
    min-width: 120px;
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 12px;
  }
  .usage-export-menu summary {
    cursor: pointer;
    font-weight: 500;
    color: var(--text);
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .usage-export-menu summary::-webkit-details-marker {
    display: none;
  }
  .usage-export-menu {
    position: relative;
  }
  .usage-export-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg);
    font-size: 12px;
  }
  .usage-export-popover {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    min-width: 160px;
    z-index: 10;
  }
  .usage-export-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .usage-export-item {
    text-align: left;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 12px;
  }
  .usage-summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .usage-summary-card {
    padding: 12px;
    border-radius: 8px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
  }
  .usage-mosaic {
    margin-top: 16px;
    padding: 16px;
  }
  .usage-mosaic-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }
  .usage-mosaic-title {
    font-weight: 600;
  }
  .usage-mosaic-sub {
    font-size: 12px;
    color: var(--text-muted);
  }
  .usage-mosaic-grid {
    display: grid;
    grid-template-columns: minmax(200px, 1fr) minmax(260px, 2fr);
    gap: 16px;
    align-items: start;
  }
  .usage-mosaic-section {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
  }
  .usage-mosaic-section-title {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .usage-mosaic-total {
    font-size: 20px;
    font-weight: 700;
  }
  .usage-daypart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 8px;
  }
  .usage-daypart-cell {
    border-radius: 8px;
    padding: 10px;
    color: var(--text);
    background: rgba(255, 77, 77, 0.08);
    border: 1px solid rgba(255, 77, 77, 0.2);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .usage-daypart-label {
    font-size: 12px;
    font-weight: 600;
  }
  .usage-daypart-value {
    font-size: 14px;
  }
  .usage-hour-grid {
    display: grid;
    grid-template-columns: repeat(24, minmax(6px, 1fr));
    gap: 4px;
  }
  .usage-hour-cell {
    height: 28px;
    border-radius: 6px;
    background: rgba(255, 77, 77, 0.1);
    border: 1px solid rgba(255, 77, 77, 0.2);
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .usage-hour-cell.selected {
    border-color: rgba(255, 77, 77, 0.8);
    box-shadow: 0 0 0 2px rgba(255, 77, 77, 0.2);
  }
  .usage-hour-labels {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 6px;
    margin-top: 8px;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-hour-legend {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 10px;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-hour-legend span {
    display: inline-block;
    width: 14px;
    height: 10px;
    border-radius: 4px;
    background: rgba(255, 77, 77, 0.15);
    border: 1px solid rgba(255, 77, 77, 0.2);
  }
  .usage-calendar-labels {
    display: grid;
    grid-template-columns: repeat(7, minmax(10px, 1fr));
    gap: 6px;
    font-size: 10px;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  .usage-calendar {
    display: grid;
    grid-template-columns: repeat(7, minmax(10px, 1fr));
    gap: 6px;
  }
  .usage-calendar-cell {
    height: 18px;
    border-radius: 4px;
    border: 1px solid rgba(255, 77, 77, 0.2);
    background: rgba(255, 77, 77, 0.08);
  }
  .usage-calendar-cell.empty {
    background: transparent;
    border-color: transparent;
  }
  .usage-summary-title {
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .usage-info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-left: 6px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg);
    font-size: 10px;
    color: var(--text-muted);
    cursor: help;
  }
  .usage-summary-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
  }
  .usage-summary-value.good {
    color: #1f8f4e;
  }
  .usage-summary-value.warn {
    color: #c57a00;
  }
  .usage-summary-value.bad {
    color: #c9372c;
  }
  .usage-summary-hint {
    font-size: 10px;
    color: var(--text-muted);
    cursor: help;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0 6px;
    line-height: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .usage-summary-sub {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .usage-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .usage-list-item {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 12px;
    color: var(--text);
    align-items: flex-start;
  }
  .usage-list-value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    text-align: right;
  }
  .usage-list-sub {
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-list-item.button {
    border: none;
    background: transparent;
    padding: 0;
    text-align: left;
    cursor: pointer;
  }
  .usage-list-item.button:hover {
    color: var(--text-strong);
  }
  .usage-list-item .muted {
    font-size: 11px;
  }
  .usage-error-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .usage-error-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: center;
    font-size: 12px;
  }
  .usage-error-date {
    font-weight: 600;
  }
  .usage-error-rate {
    font-variant-numeric: tabular-nums;
  }
  .usage-error-sub {
    grid-column: 1 / -1;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
  }
  .usage-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 11px;
    background: var(--bg);
    color: var(--text);
  }
  .usage-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  .usage-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
  }
  .usage-meta-item span {
    color: var(--text-muted);
    font-size: 11px;
  }
  .usage-insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 12px;
  }
  .usage-insight-card {
    padding: 14px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
  }
  .usage-insight-title {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .usage-insight-subtitle {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 6px;
  }
  /* ===== CHART TOGGLE ===== */
  .chart-toggle {
    display: flex;
    background: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .chart-toggle .toggle-btn {
    padding: 6px 14px;
    font-size: 13px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.15s;
  }
  .chart-toggle .toggle-btn:hover {
    color: var(--text);
  }
  .chart-toggle .toggle-btn.active {
    background: #ff4d4d;
    color: white;
  }
  .chart-toggle.small .toggle-btn {
    padding: 4px 8px;
    font-size: 11px;
  }
  .sessions-toggle {
    border-radius: 4px;
  }
  .sessions-toggle .toggle-btn {
    border-radius: 4px;
  }
  .daily-chart-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }

  /* ===== DAILY BAR CHART ===== */
  .daily-chart {
    margin-top: 12px;
  }
  .daily-chart-bars {
    display: flex;
    align-items: flex-end;
    height: 200px;
    gap: 4px;
    padding: 8px 4px 36px;
  }
  .daily-bar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    cursor: pointer;
    position: relative;
    border-radius: 4px 4px 0 0;
    transition: background 0.15s;
    min-width: 0;
  }
  .daily-bar-wrapper:hover {
    background: var(--bg-hover);
  }
  .daily-bar-wrapper.selected {
    background: var(--accent-subtle);
  }
  .daily-bar-wrapper.selected .daily-bar {
    background: var(--accent);
  }
  .daily-bar {
    width: 100%;
    max-width: var(--bar-max-width, 32px);
    background: #ff4d4d;
    border-radius: 3px 3px 0 0;
    min-height: 2px;
    transition: all 0.15s;
    overflow: hidden;
  }
  .daily-bar-wrapper:hover .daily-bar {
    background: #cc3d3d;
  }
  .daily-bar-label {
    position: absolute;
    bottom: -28px;
    font-size: 10px;
    color: var(--text-muted);
    white-space: nowrap;
    text-align: center;
    transform: rotate(-35deg);
    transform-origin: top center;
  }
  .daily-bar-total {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .daily-bar-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .daily-bar-wrapper:hover .daily-bar-tooltip {
    opacity: 1;
  }

  /* ===== COST/TOKEN BREAKDOWN BAR ===== */
  .cost-breakdown {
    margin-top: 18px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .cost-breakdown-header {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    color: var(--text-strong);
  }
  .cost-breakdown-bar {
    height: 28px;
    background: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    display: flex;
  }
  .cost-segment {
    height: 100%;
    transition: width 0.3s ease;
    position: relative;
  }
  .cost-segment.output {
    background: #ef4444;
  }
  .cost-segment.input {
    background: #f59e0b;
  }
  .cost-segment.cache-write {
    background: #10b981;
  }
  .cost-segment.cache-read {
    background: #06b6d4;
  }
  .cost-breakdown-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .cost-breakdown-total {
    margin-top: 10px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text);
    cursor: help;
  }
  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .legend-dot.output {
    background: #ef4444;
  }
  .legend-dot.input {
    background: #f59e0b;
  }
  .legend-dot.cache-write {
    background: #10b981;
  }
  .legend-dot.cache-read {
    background: #06b6d4;
  }
  .legend-dot.system {
    background: #ff4d4d;
  }
  .legend-dot.skills {
    background: #8b5cf6;
  }
  .legend-dot.tools {
    background: #ec4899;
  }
  .legend-dot.files {
    background: #f59e0b;
  }
  .cost-breakdown-note {
    margin-top: 10px;
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.4;
  }

  /* ===== SESSION BARS (scrollable list) ===== */
  .session-bars {
    margin-top: 16px;
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
  }
  .session-bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.15s;
  }
  .session-bar-row:last-child {
    border-bottom: none;
  }
  .session-bar-row:hover {
    background: var(--bg-hover);
  }
  .session-bar-row.selected {
    background: var(--accent-subtle);
  }
  .session-bar-label {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 13px;
    color: var(--text);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .session-bar-title {
    /* Prefer showing the full name; wrap instead of truncating. */
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .session-bar-meta {
    font-size: 10px;
    color: var(--text-muted);
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .session-bar-track {
    flex: 0 0 90px;
    height: 6px;
    background: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
    opacity: 0.6;
  }
  .session-bar-fill {
    height: 100%;
    background: rgba(255, 77, 77, 0.7);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .session-bar-value {
    flex: 0 0 70px;
    text-align: right;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-muted);
  }
  .session-bar-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
  }
  .session-copy-btn {
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .session-copy-btn:hover {
    background: var(--bg);
    border-color: var(--border-strong);
    color: var(--text);
  }

  /* ===== TIME SERIES CHART ===== */
  .session-timeseries {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .timeseries-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .timeseries-controls {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .timeseries-header {
    font-weight: 600;
    color: var(--text);
  }
  .timeseries-chart {
    width: 100%;
    overflow: hidden;
  }
  .timeseries-svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .timeseries-svg .axis-label {
    font-size: 10px;
    fill: var(--text-muted);
  }
  .timeseries-svg .ts-area {
    fill: #ff4d4d;
    fill-opacity: 0.1;
  }
  .timeseries-svg .ts-line {
    fill: none;
    stroke: #ff4d4d;
    stroke-width: 2;
  }
  .timeseries-svg .ts-dot {
    fill: #ff4d4d;
    transition: r 0.15s, fill 0.15s;
  }
  .timeseries-svg .ts-dot:hover {
    r: 5;
  }
  .timeseries-svg .ts-bar {
    fill: #ff4d4d;
    transition: fill 0.15s;
  }
  .timeseries-svg .ts-bar:hover {
    fill: #cc3d3d;
  }
  .timeseries-svg .ts-bar.output { fill: #ef4444; }
  .timeseries-svg .ts-bar.input { fill: #f59e0b; }
  .timeseries-svg .ts-bar.cache-write { fill: #10b981; }
  .timeseries-svg .ts-bar.cache-read { fill: #06b6d4; }
  .timeseries-summary {
    margin-top: 12px;
    font-size: 13px;
    color: var(--text-muted);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .timeseries-loading {
    padding: 24px;
    text-align: center;
    color: var(--text-muted);
  }

  /* ===== SESSION LOGS ===== */
  .session-logs {
    margin-top: 24px;
    background: var(--bg-secondary);
    border-radius: 8px;
    overflow: hidden;
  }
  .session-logs-header {
    padding: 10px 14px;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    background: var(--bg-secondary);
  }
  .session-logs-loading {
    padding: 24px;
    text-align: center;
    color: var(--text-muted);
  }
  .session-logs-list {
    max-height: 400px;
    overflow-y: auto;
  }
  .session-log-entry {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--bg);
  }
  .session-log-entry:last-child {
    border-bottom: none;
  }
  .session-log-entry.user {
    border-left: 3px solid var(--accent);
  }
  .session-log-entry.assistant {
    border-left: 3px solid var(--border-strong);
  }
  .session-log-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    color: var(--text-muted);
    flex-wrap: wrap;
  }
  .session-log-role {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 999px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
  }
  .session-log-entry.user .session-log-role {
    color: var(--accent);
  }
  .session-log-entry.assistant .session-log-role {
    color: var(--text-muted);
  }
  .session-log-content {
    font-size: 13px;
    line-height: 1.5;
    color: var(--text);
    white-space: pre-wrap;
    word-break: break-word;
    background: var(--bg-secondary);
    border-radius: 8px;
    padding: 8px 10px;
    border: 1px solid var(--border);
    max-height: 220px;
    overflow-y: auto;
  }

  /* ===== CONTEXT WEIGHT BREAKDOWN ===== */
  .context-weight-breakdown {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .context-weight-breakdown .context-weight-header {
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 4px;
    color: var(--text);
  }
  .context-weight-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0 0 12px 0;
  }
  .context-stacked-bar {
    height: 24px;
    background: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    display: flex;
  }
  .context-segment {
    height: 100%;
    transition: width 0.3s ease;
  }
  .context-segment.system {
    background: #ff4d4d;
  }
  .context-segment.skills {
    background: #8b5cf6;
  }
  .context-segment.tools {
    background: #ec4899;
  }
  .context-segment.files {
    background: #f59e0b;
  }
  .context-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .context-total {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
  }
  .context-details {
    margin-top: 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }
  .context-details summary {
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }
  .context-details[open] summary {
    border-bottom: 1px solid var(--border);
  }
  .context-list {
    max-height: 200px;
    overflow-y: auto;
  }
  .context-list-header {
    display: flex;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--text-muted);
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
  }
  .context-list-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 12px;
    border-bottom: 1px solid var(--border);
  }
  .context-list-item:last-child {
    border-bottom: none;
  }
  .context-list-item .mono {
    font-family: var(--font-mono);
    color: var(--text);
  }
  .context-list-item .muted {
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  /* ===== NO CONTEXT NOTE ===== */
  .no-context-note {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* ===== TWO COLUMN LAYOUT ===== */
  .usage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-top: 18px;
    align-items: stretch;
  }
  .usage-grid-left {
    display: flex;
    flex-direction: column;
  }
  .usage-grid-right {
    display: flex;
    flex-direction: column;
  }
  
  /* ===== LEFT CARD (Daily + Breakdown) ===== */
  .usage-left-card {
    /* inherits background, border, shadow from .card */
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .usage-left-card .daily-chart-bars {
    flex: 1;
    min-height: 200px;
  }
  .usage-left-card .sessions-panel-title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  /* ===== COMPACT DAILY CHART ===== */
  .daily-chart-compact {
    margin-bottom: 16px;
  }
  .daily-chart-compact .sessions-panel-title {
    margin-bottom: 8px;
  }
  .daily-chart-compact .daily-chart-bars {
    height: 100px;
    padding-bottom: 20px;
  }
  
  /* ===== COMPACT COST BREAKDOWN ===== */
  .cost-breakdown-compact {
    padding: 0;
    margin: 0;
    background: transparent;
    border-top: 1px solid var(--border);
    padding-top: 12px;
  }
  .cost-breakdown-compact .cost-breakdown-header {
    margin-bottom: 8px;
  }
  .cost-breakdown-compact .cost-breakdown-legend {
    gap: 12px;
  }
  .cost-breakdown-compact .cost-breakdown-note {
    display: none;
  }
  
  /* ===== SESSIONS CARD ===== */
  .sessions-card {
    /* inherits background, border, shadow from .card */
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .sessions-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .sessions-card-title {
    font-weight: 600;
    font-size: 14px;
  }
  .sessions-card-count {
    font-size: 12px;
    color: var(--text-muted);
  }
  .sessions-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 8px 0 10px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .sessions-card-stats {
    display: inline-flex;
    gap: 12px;
  }
  .sessions-sort {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .sessions-sort select {
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    font-size: 12px;
  }
  .sessions-action-btn {
    height: 28px;
    padding: 0 10px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 1;
  }
  .sessions-action-btn.icon {
    width: 32px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .sessions-card-hint {
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  .sessions-card .session-bars {
    max-height: 280px;
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    margin: 0;
    overflow-y: auto;
    padding: 8px;
  }
  .sessions-card .session-bar-row {
    padding: 6px 8px;
    border-radius: 6px;
    margin-bottom: 3px;
    border: 1px solid transparent;
    transition: all 0.15s;
  }
  .sessions-card .session-bar-row:hover {
    border-color: var(--border);
    background: var(--bg-hover);
  }
  .sessions-card .session-bar-row.selected {
    border-color: var(--accent);
    background: var(--accent-subtle);
    box-shadow: inset 0 0 0 1px rgba(255, 77, 77, 0.15);
  }
  .sessions-card .session-bar-label {
    flex: 1 1 auto;
    min-width: 140px;
    font-size: 12px;
  }
  .sessions-card .session-bar-value {
    flex: 0 0 60px;
    font-size: 11px;
    font-weight: 600;
  }
  .sessions-card .session-bar-track {
    flex: 0 0 70px;
    height: 5px;
    opacity: 0.5;
  }
  .sessions-card .session-bar-fill {
    background: rgba(255, 77, 77, 0.55);
  }
  .sessions-clear-btn {
    margin-left: auto;
  }
  
  /* ===== EMPTY DETAIL STATE ===== */
  .session-detail-empty {
    margin-top: 18px;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 2px dashed var(--border);
    padding: 32px;
    text-align: center;
  }
  .session-detail-empty-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }
  .session-detail-empty-desc {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 16px;
    line-height: 1.5;
  }
  .session-detail-empty-features {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .session-detail-empty-feature {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .session-detail-empty-feature .icon {
    font-size: 16px;
  }
  
  /* ===== SESSION DETAIL PANEL ===== */
  .session-detail-panel {
    margin-top: 12px;
    /* inherits background, border-radius, shadow from .card */
    border: 2px solid var(--accent) !important;
  }
  .session-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
  }
  .session-detail-header:hover {
    background: var(--bg-hover);
  }
  .session-detail-title {
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .session-detail-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .session-close-btn {
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    cursor: pointer;
    padding: 2px 8px;
    font-size: 16px;
    line-height: 1;
    border-radius: 4px;
    transition: background 0.15s, color 0.15s;
  }
  .session-close-btn:hover {
    background: var(--bg-hover);
    color: var(--text);
    border-color: var(--accent);
  }
  .session-detail-stats {
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .session-detail-stats strong {
    color: var(--text);
    font-family: var(--font-mono);
  }
  .session-detail-content {
    padding: 12px;
  }
  .session-summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 8px;
    margin-bottom: 12px;
  }
  .session-summary-card {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px;
    background: var(--bg-secondary);
  }
  .session-summary-title {
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .session-summary-value {
    font-size: 14px;
    font-weight: 600;
  }
  .session-summary-meta {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .session-detail-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    /* Separate "Usage Over Time" from the summary + Top Tools/Model Mix cards above. */
    margin-top: 12px;
    margin-bottom: 10px;
  }
  .session-detail-bottom {
    display: grid;
    grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
    gap: 10px;
    align-items: stretch;
  }
  .session-detail-bottom .session-logs-compact {
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  .session-detail-bottom .session-logs-compact .session-logs-list {
    flex: 1 1 auto;
    max-height: none;
  }
  .context-details-panel {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    padding: 12px;
  }
  .context-breakdown-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 10px;
    margin-top: 8px;
  }
  .context-breakdown-card {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px;
    background: var(--bg-secondary);
  }
  .context-breakdown-title {
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .context-breakdown-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 11px;
  }
  .context-breakdown-item {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }
  .context-breakdown-more {
    font-size: 10px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .context-breakdown-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .context-expand-btn {
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text-muted);
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .context-expand-btn:hover {
    color: var(--text);
    border-color: var(--border-strong);
    background: var(--bg);
  }
  
  /* ===== COMPACT TIMESERIES ===== */
  .session-timeseries-compact {
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    padding: 12px;
    margin: 0;
  }
  .session-timeseries-compact .timeseries-header-row {
    margin-bottom: 8px;
  }
  .session-timeseries-compact .timeseries-header {
    font-size: 12px;
  }
  .session-timeseries-compact .timeseries-summary {
    font-size: 11px;
    margin-top: 8px;
  }
  
  /* ===== COMPACT CONTEXT ===== */
  .context-weight-compact {
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    padding: 12px;
    margin: 0;
  }
  .context-weight-compact .context-weight-header {
    font-size: 12px;
    margin-bottom: 4px;
  }
  .context-weight-compact .context-weight-desc {
    font-size: 11px;
    margin-bottom: 8px;
  }
  .context-weight-compact .context-stacked-bar {
    height: 16px;
  }
  .context-weight-compact .context-legend {
    font-size: 11px;
    gap: 10px;
    margin-top: 8px;
  }
  .context-weight-compact .context-total {
    font-size: 11px;
    margin-top: 6px;
  }
  .context-weight-compact .context-details {
    margin-top: 8px;
  }
  .context-weight-compact .context-details summary {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  /* ===== COMPACT LOGS ===== */
  .session-logs-compact {
    background: var(--bg);
    border-radius: 10px;
    border: 1px solid var(--border);
    overflow: hidden;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  .session-logs-compact .session-logs-header {
    padding: 10px 12px;
    font-size: 12px;
  }
  .session-logs-compact .session-logs-list {
    max-height: none;
    flex: 1 1 auto;
    overflow: auto;
  }
  .session-logs-compact .session-log-entry {
    padding: 8px 12px;
  }
  .session-logs-compact .session-log-content {
    font-size: 12px;
    max-height: 160px;
  }
  .session-log-tools {
    margin-top: 6px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg-secondary);
    padding: 6px 8px;
    font-size: 11px;
    color: var(--text);
  }
  .session-log-tools summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
  }
  .session-log-tools summary::-webkit-details-marker {
    display: none;
  }
  .session-log-tools-list {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .session-log-tools-pill {
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 10px;
    background: var(--bg);
    color: var(--text);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 900px) {
    .usage-grid {
      grid-template-columns: 1fr;
    }
    .session-detail-row {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .session-bar-label {
      flex: 0 0 100px;
    }
    .cost-breakdown-legend {
      gap: 10px;
    }
    .legend-item {
      font-size: 11px;
    }
    .daily-chart-bars {
      height: 170px;
      gap: 6px;
      padding-bottom: 40px;
    }
    .daily-bar-label {
      font-size: 8px;
      bottom: -30px;
      transform: rotate(-45deg);
    }
    .usage-mosaic-grid {
      grid-template-columns: 1fr;
    }
    .usage-hour-grid {
      grid-template-columns: repeat(12, minmax(10px, 1fr));
    }
    .usage-hour-cell {
      height: 22px;
    }
  }
`,$m=4;function at(e){return Math.round(e/$m)}function N(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:String(e)}function wm(e){const t=new Date;return t.setHours(e,0,0,0),t.toLocaleTimeString(void 0,{hour:"numeric"})}function km(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:24},()=>0);for(const i of e){const a=i.usage;if(!a?.messageCounts||a.messageCounts.total===0)continue;const o=a.firstActivity??i.updatedAt,l=a.lastActivity??i.updatedAt;if(!o||!l)continue;const c=Math.min(o,l),u=Math.max(o,l),g=Math.max(u-c,1)/6e4;let h=c;for(;h<u;){const f=new Date(h),d=ra(f,t),v=la(f,t),S=Math.min(v.getTime(),u),x=Math.max((S-h)/6e4,0)/g;n[d]+=a.messageCounts.errors*x,s[d]+=a.messageCounts.total*x,h=S+1}}return s.map((i,a)=>{const o=n[a],l=i>0?o/i:0;return{hour:a,rate:l,errors:o,msgs:i}}).filter(i=>i.msgs>0&&i.errors>0).toSorted((i,a)=>a.rate-i.rate).slice(0,5).map(i=>({label:wm(i.hour),value:`${(i.rate*100).toFixed(2)}%`,sub:`${Math.round(i.errors)} 个错误 · ${Math.round(i.msgs)} 条消息`}))}const Sm=["周日","周一","周二","周三","周四","周五","周六"];function ra(e,t){return t==="utc"?e.getUTCHours():e.getHours()}function Am(e,t){return t==="utc"?e.getUTCDay():e.getDay()}function la(e,t){const n=new Date(e);return t==="utc"?n.setUTCMinutes(59,59,999):n.setMinutes(59,59,999),n}function Cm(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:7},()=>0);let i=0,a=!1;for(const l of e){const c=l.usage;if(!c||!c.totalTokens||c.totalTokens<=0)continue;i+=c.totalTokens;const u=c.firstActivity??l.updatedAt,p=c.lastActivity??l.updatedAt;if(!u||!p)continue;a=!0;const g=Math.min(u,p),h=Math.max(u,p),d=Math.max(h-g,1)/6e4;let v=g;for(;v<h;){const S=new Date(v),k=ra(S,t),x=Am(S,t),C=la(S,t),A=Math.min(C.getTime(),h),T=Math.max((A-v)/6e4,0)/d;n[k]+=c.totalTokens*T,s[x]+=c.totalTokens*T,v=A+1}}const o=Sm.map((l,c)=>({label:l,tokens:s[c]}));return{hasData:a,totalTokens:i,hourTotals:n,weekdayTotals:o}}function Tm(e,t,n,s){const i=Cm(e,t);if(!i.hasData)return r`
      <div class="card usage-mosaic">
        <div class="usage-mosaic-header">
          <div>
            <div class="usage-mosaic-title">按时段分布</div>
            <div class="usage-mosaic-sub">需要会话时间戳才能进行估算。</div>
          </div>
          <div class="usage-mosaic-total">${N(0)} tokens</div>
        </div>
        <div class="muted" style="padding: 12px; text-align: center;">暂无时间线数据。</div>
      </div>
    `;const a=Math.max(...i.hourTotals,1),o=Math.max(...i.weekdayTotals.map(l=>l.tokens),1);return r`
    <div class="card usage-mosaic">
      <div class="usage-mosaic-header">
        <div>
          <div class="usage-mosaic-title">按时段分布</div>
          <div class="usage-mosaic-sub">
            基于会话时间范围（首次/最后活动）估算。时区：${t==="utc"?"UTC":"本地"}。
          </div>
        </div>
        <div class="usage-mosaic-total">${N(i.totalTokens)} tokens</div>
      </div>
      <div class="usage-mosaic-grid">
        <div class="usage-mosaic-section">
          <div class="usage-mosaic-section-title">星期</div>
          <div class="usage-daypart-grid">
            ${i.weekdayTotals.map(l=>{const c=Math.min(l.tokens/o,1),u=l.tokens>0?`rgba(255, 77, 77, ${.12+c*.6})`:"transparent";return r`
                <div class="usage-daypart-cell" style="background: ${u};">
                  <div class="usage-daypart-label">${l.label}</div>
                  <div class="usage-daypart-value">${N(l.tokens)}</div>
                </div>
              `})}
          </div>
        </div>
        <div class="usage-mosaic-section">
          <div class="usage-mosaic-section-title">
            <span>小时</span>
            <span class="usage-mosaic-sub">0 → 23</span>
          </div>
          <div class="usage-hour-grid">
            ${i.hourTotals.map((l,c)=>{const u=Math.min(l/a,1),p=l>0?`rgba(255, 77, 77, ${.08+u*.7})`:"transparent",g=`${c}:00 · ${N(l)} tokens`,h=u>.7?"rgba(255, 77, 77, 0.6)":"rgba(255, 77, 77, 0.2)",f=n.includes(c);return r`
                <div
                  class="usage-hour-cell ${f?"selected":""}"
                  style="background: ${p}; border-color: ${h};"
                  title="${g}"
                  @click=${d=>s(c,d.shiftKey)}
                ></div>
              `})}
          </div>
          <div class="usage-hour-labels">
            <span>午夜</span>
            <span>凌晨4点</span>
            <span>上午8点</span>
            <span>中午</span>
            <span>下午4点</span>
            <span>晚上8点</span>
          </div>
          <div class="usage-hour-legend">
            <span></span>
            低 → 高 Token 密度
          </div>
        </div>
      </div>
    </div>
  `}function Q(e,t=2){return`$${e.toFixed(t)}`}function zs(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function _m(e){return!e||e<=0?"0s":e>=6e4?`${Math.round(e/6e4)}m`:e>=1e3?`${Math.round(e/1e3)}s`:`${Math.round(e)}ms`}function Fl(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;const[,n,s,i]=t,a=new Date(Date.UTC(Number(n),Number(s)-1,Number(i)));return Number.isNaN(a.valueOf())?null:a}function Ol(e){const t=Fl(e);return t?t.toLocaleDateString(void 0,{month:"short",day:"numeric"}):e}function Em(e){const t=Fl(e);return t?t.toLocaleDateString(void 0,{month:"long",day:"numeric",year:"numeric"}):e}function Nl(e){if(!e||e<=0)return"—";const t=Math.round(e/1e3),n=t%60,s=Math.floor(t/60)%60,i=Math.floor(t/3600);return i>0?`${i}h ${s}m`:s>0?`${s}m ${n}s`:`${n}s`}function Us(e,t,n="text/plain"){const s=new Blob([t],{type:n}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download=e,a.click(),URL.revokeObjectURL(i)}function Lm(e){return e.includes('"')||e.includes(",")||e.includes(`
`)?`"${e.replace(/"/g,'""')}"`:e}function jn(e){return e.map(t=>t==null?"":Lm(String(t))).join(",")}const An=()=>({input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),Cn=(e,t)=>{e.input+=t.input??0,e.output+=t.output??0,e.cacheRead+=t.cacheRead??0,e.cacheWrite+=t.cacheWrite??0,e.totalTokens+=t.totalTokens??0,e.totalCost+=t.totalCost??0,e.inputCost+=t.inputCost??0,e.outputCost+=t.outputCost??0,e.cacheReadCost+=t.cacheReadCost??0,e.cacheWriteCost+=t.cacheWriteCost??0,e.missingCostEntries+=t.missingCostEntries??0},Mm=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};const n={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},s=new Map,i=new Map,a=new Map,o=new Map,l=new Map,c=new Map,u=new Map,p=new Map,g={count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};for(const h of e){const f=h.usage;if(f){if(f.messageCounts&&(n.total+=f.messageCounts.total,n.user+=f.messageCounts.user,n.assistant+=f.messageCounts.assistant,n.toolCalls+=f.messageCounts.toolCalls,n.toolResults+=f.messageCounts.toolResults,n.errors+=f.messageCounts.errors),f.toolUsage)for(const d of f.toolUsage.tools)s.set(d.name,(s.get(d.name)??0)+d.count);if(f.modelUsage)for(const d of f.modelUsage){const v=`${d.provider??"unknown"}::${d.model??"unknown"}`,S=i.get(v)??{provider:d.provider,model:d.model,count:0,totals:An()};S.count+=d.count,Cn(S.totals,d.totals),i.set(v,S);const k=d.provider??"unknown",x=a.get(k)??{provider:d.provider,model:void 0,count:0,totals:An()};x.count+=d.count,Cn(x.totals,d.totals),a.set(k,x)}if(f.latency){const{count:d,avgMs:v,minMs:S,maxMs:k,p95Ms:x}=f.latency;d>0&&(g.count+=d,g.sum+=v*d,g.min=Math.min(g.min,S),g.max=Math.max(g.max,k),g.p95Max=Math.max(g.p95Max,x))}if(h.agentId){const d=o.get(h.agentId)??An();Cn(d,f),o.set(h.agentId,d)}if(h.channel){const d=l.get(h.channel)??An();Cn(d,f),l.set(h.channel,d)}for(const d of f.dailyBreakdown??[]){const v=c.get(d.date)??{date:d.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};v.tokens+=d.tokens,v.cost+=d.cost,c.set(d.date,v)}for(const d of f.dailyMessageCounts??[]){const v=c.get(d.date)??{date:d.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};v.messages+=d.total,v.toolCalls+=d.toolCalls,v.errors+=d.errors,c.set(d.date,v)}for(const d of f.dailyLatency??[]){const v=u.get(d.date)??{date:d.date,count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};v.count+=d.count,v.sum+=d.avgMs*d.count,v.min=Math.min(v.min,d.minMs),v.max=Math.max(v.max,d.maxMs),v.p95Max=Math.max(v.p95Max,d.p95Ms),u.set(d.date,v)}for(const d of f.dailyModelUsage??[]){const v=`${d.date}::${d.provider??"unknown"}::${d.model??"unknown"}`,S=p.get(v)??{date:d.date,provider:d.provider,model:d.model,tokens:0,cost:0,count:0};S.tokens+=d.tokens,S.cost+=d.cost,S.count+=d.count,p.set(v,S)}}}return{messages:n,tools:{totalCalls:Array.from(s.values()).reduce((h,f)=>h+f,0),uniqueTools:s.size,tools:Array.from(s.entries()).map(([h,f])=>({name:h,count:f})).toSorted((h,f)=>f.count-h.count)},byModel:Array.from(i.values()).toSorted((h,f)=>f.totals.totalCost-h.totals.totalCost),byProvider:Array.from(a.values()).toSorted((h,f)=>f.totals.totalCost-h.totals.totalCost),byAgent:Array.from(o.entries()).map(([h,f])=>({agentId:h,totals:f})).toSorted((h,f)=>f.totals.totalCost-h.totals.totalCost),byChannel:Array.from(l.entries()).map(([h,f])=>({channel:h,totals:f})).toSorted((h,f)=>f.totals.totalCost-h.totals.totalCost),latency:g.count>0?{count:g.count,avgMs:g.sum/g.count,minMs:g.min===Number.POSITIVE_INFINITY?0:g.min,maxMs:g.max,p95Ms:g.p95Max}:void 0,dailyLatency:Array.from(u.values()).map(h=>({date:h.date,count:h.count,avgMs:h.count?h.sum/h.count:0,minMs:h.min===Number.POSITIVE_INFINITY?0:h.min,maxMs:h.max,p95Ms:h.p95Max})).toSorted((h,f)=>h.date.localeCompare(f.date)),modelDaily:Array.from(p.values()).toSorted((h,f)=>h.date.localeCompare(f.date)||f.cost-h.cost),daily:Array.from(c.values()).toSorted((h,f)=>h.date.localeCompare(f.date))}},Im=(e,t,n)=>{let s=0,i=0;for(const p of e){const g=p.usage?.durationMs??0;g>0&&(s+=g,i+=1)}const a=i?s/i:0,o=t&&s>0?t.totalTokens/(s/6e4):void 0,l=t&&s>0?t.totalCost/(s/6e4):void 0,c=n.messages.total?n.messages.errors/n.messages.total:0,u=n.daily.filter(p=>p.messages>0&&p.errors>0).map(p=>({date:p.date,errors:p.errors,messages:p.messages,rate:p.errors/p.messages})).toSorted((p,g)=>g.rate-p.rate||g.errors-p.errors)[0];return{durationSumMs:s,durationCount:i,avgDurationMs:a,throughputTokensPerMin:o,throughputCostPerMin:l,errorRate:c,peakErrorDay:u}},Rm=e=>{const t=[jn(["key","label","agentId","channel","provider","model","updatedAt","durationMs","messages","errors","toolCalls","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","totalCost"])];for(const n of e){const s=n.usage;t.push(jn([n.key,n.label??"",n.agentId??"",n.channel??"",n.modelProvider??n.providerOverride??"",n.model??n.modelOverride??"",n.updatedAt?new Date(n.updatedAt).toISOString():"",s?.durationMs??"",s?.messageCounts?.total??"",s?.messageCounts?.errors??"",s?.messageCounts?.toolCalls??"",s?.input??"",s?.output??"",s?.cacheRead??"",s?.cacheWrite??"",s?.totalTokens??"",s?.totalCost??""]))}return t.join(`
`)},Pm=e=>{const t=[jn(["date","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","inputCost","outputCost","cacheReadCost","cacheWriteCost","totalCost"])];for(const n of e)t.push(jn([n.date,n.input,n.output,n.cacheRead,n.cacheWrite,n.totalTokens,n.inputCost??"",n.outputCost??"",n.cacheReadCost??"",n.cacheWriteCost??"",n.totalCost]));return t.join(`
`)},Dm=(e,t,n)=>{const s=e.trim();if(!s)return[];const i=s.length?s.split(/\s+/):[],a=i.length?i[i.length-1]:"",[o,l]=a.includes(":")?[a.slice(0,a.indexOf(":")),a.slice(a.indexOf(":")+1)]:["",""],c=o.toLowerCase(),u=l.toLowerCase(),p=x=>{const C=new Set;for(const A of x)A&&C.add(A);return Array.from(C)},g=p(t.map(x=>x.agentId)).slice(0,6),h=p(t.map(x=>x.channel)).slice(0,6),f=p([...t.map(x=>x.modelProvider),...t.map(x=>x.providerOverride),...n?.byProvider.map(x=>x.provider)??[]]).slice(0,6),d=p([...t.map(x=>x.model),...n?.byModel.map(x=>x.model)??[]]).slice(0,6),v=p(n?.tools.tools.map(x=>x.name)??[]).slice(0,6);if(!c)return[{label:"agent:",value:"agent:"},{label:"channel:",value:"channel:"},{label:"provider:",value:"provider:"},{label:"model:",value:"model:"},{label:"tool:",value:"tool:"},{label:"has:errors",value:"has:errors"},{label:"has:tools",value:"has:tools"},{label:"minTokens:",value:"minTokens:"},{label:"maxCost:",value:"maxCost:"}];const S=[],k=(x,C)=>{for(const A of C)(!u||A.toLowerCase().includes(u))&&S.push({label:`${x}:${A}`,value:`${x}:${A}`})};switch(c){case"agent":k("agent",g);break;case"channel":k("channel",h);break;case"provider":k("provider",f);break;case"model":k("model",d);break;case"tool":k("tool",v);break;case"has":["errors","tools","context","usage","model","provider"].forEach(x=>{(!u||x.includes(u))&&S.push({label:`has:${x}`,value:`has:${x}`})});break}return S},Fm=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/);return s[s.length-1]=t,`${s.join(" ")} `},lt=e=>e.trim().toLowerCase(),Om=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/),i=s[s.length-1]??"",a=t.includes(":")?t.split(":")[0]:null,o=i.includes(":")?i.split(":")[0]:null;return i.endsWith(":")&&a&&o===a?(s[s.length-1]=t,`${s.join(" ")} `):s.includes(t)?`${s.join(" ")} `:`${s.join(" ")} ${t} `},Wo=(e,t)=>{const s=e.trim().split(/\s+/).filter(Boolean).filter(i=>i!==t);return s.length?`${s.join(" ")} `:""},Vo=(e,t,n)=>{const s=lt(t),a=[...oa(e).filter(o=>lt(o.key??"")!==s).map(o=>o.raw),...n.map(o=>`${t}:${o}`)];return a.length?`${a.join(" ")} `:""};function ue(e,t){return t===0?0:e/t*100}function Nm(e){const t=e.totalCost||0;return{input:{tokens:e.input,cost:e.inputCost||0,pct:ue(e.inputCost||0,t)},output:{tokens:e.output,cost:e.outputCost||0,pct:ue(e.outputCost||0,t)},cacheRead:{tokens:e.cacheRead,cost:e.cacheReadCost||0,pct:ue(e.cacheReadCost||0,t)},cacheWrite:{tokens:e.cacheWrite,cost:e.cacheWriteCost||0,pct:ue(e.cacheWriteCost||0,t)},totalCost:t}}function Bm(e,t,n,s,i,a,o,l){if(!(e.length>0||t.length>0||n.length>0))return m;const u=n.length===1?s.find(d=>d.key===n[0]):null,p=u?(u.label||u.key).slice(0,20)+((u.label||u.key).length>20?"…":""):n.length===1?n[0].slice(0,8)+"…":`${n.length} sessions`,g=u?u.label||u.key:n.length===1?n[0]:n.join(", "),h=e.length===1?e[0]:`${e.length} days`,f=t.length===1?`${t[0]}:00`:`${t.length} hours`;return r`
    <div class="active-filters">
      ${e.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Days: ${h}</span>
              <button class="filter-chip-remove" @click=${i} title="Remove filter">×</button>
            </div>
          `:m}
      ${t.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Hours: ${f}</span>
              <button class="filter-chip-remove" @click=${a} title="Remove filter">×</button>
            </div>
          `:m}
      ${n.length>0?r`
            <div class="filter-chip" title="${g}">
              <span class="filter-chip-label">Session: ${p}</span>
              <button class="filter-chip-remove" @click=${o} title="Remove filter">×</button>
            </div>
          `:m}
      ${(e.length>0||t.length>0)&&n.length>0?r`
            <button class="btn btn-sm filter-clear-btn" @click=${l}>
              Clear All
            </button>
          `:m}
    </div>
  `}function zm(e,t,n,s,i,a){if(!e.length)return r`
      <div class="daily-chart-compact">
        <div class="sessions-panel-title">每日用量</div>
        <div class="muted" style="padding: 20px; text-align: center">暂无数据</div>
      </div>
    `;const o=n==="tokens",l=e.map(g=>o?g.totalTokens:g.totalCost),c=Math.max(...l,o?1:1e-4),u=e.length>30?12:e.length>20?18:e.length>14?24:32,p=e.length<=14;return r`
    <div class="daily-chart-compact">
      <div class="daily-chart-header">
        <div class="chart-toggle small sessions-toggle">
          <button
            class="toggle-btn ${s==="total"?"active":""}"
            @click=${()=>i("total")}
          >
            总计
          </button>
          <button
            class="toggle-btn ${s==="by-type"?"active":""}"
            @click=${()=>i("by-type")}
          >
            按类型
          </button>
        </div>
        <div class="card-title">每日${o?" Token":"费用"}用量</div>
      </div>
      <div class="daily-chart">
        <div class="daily-chart-bars" style="--bar-max-width: ${u}px">
          ${e.map((g,h)=>{const d=l[h]/c*100,v=t.includes(g.date),S=Ol(g.date),k=e.length>20?String(parseInt(g.date.slice(8),10)):S,x=e.length>20?"font-size: 8px":"",C=s==="by-type"?o?[{value:g.output,class:"output"},{value:g.input,class:"input"},{value:g.cacheWrite,class:"cache-write"},{value:g.cacheRead,class:"cache-read"}]:[{value:g.outputCost??0,class:"output"},{value:g.inputCost??0,class:"input"},{value:g.cacheWriteCost??0,class:"cache-write"},{value:g.cacheReadCost??0,class:"cache-read"}]:[],A=s==="by-type"?o?[`输出 ${N(g.output)}`,`输入 ${N(g.input)}`,`缓存写入 ${N(g.cacheWrite)}`,`缓存读取 ${N(g.cacheRead)}`]:[`输出 ${Q(g.outputCost??0)}`,`输入 ${Q(g.inputCost??0)}`,`缓存写入 ${Q(g.cacheWriteCost??0)}`,`缓存读取 ${Q(g.cacheReadCost??0)}`]:[],_=o?N(g.totalTokens):Q(g.totalCost);return r`
              <div
                class="daily-bar-wrapper ${v?"selected":""}"
                @click=${T=>a(g.date,T.shiftKey)}
              >
                ${s==="by-type"?r`
                        <div
                          class="daily-bar"
                          style="height: ${d.toFixed(1)}%; display: flex; flex-direction: column;"
                        >
                          ${(()=>{const T=C.reduce((I,K)=>I+K.value,0)||1;return C.map(I=>r`
                                <div
                                  class="cost-segment ${I.class}"
                                  style="height: ${I.value/T*100}%"
                                ></div>
                              `)})()}
                        </div>
                      `:r`
                        <div class="daily-bar" style="height: ${d.toFixed(1)}%"></div>
                      `}
                ${p?r`<div class="daily-bar-total">${_}</div>`:m}
                <div class="daily-bar-label" style="${x}">${k}</div>
                <div class="daily-bar-tooltip">
                  <strong>${Em(g.date)}</strong><br />
                  ${N(g.totalTokens)} tokens<br />
                  ${Q(g.totalCost)}
                  ${A.length?r`${A.map(T=>r`<div>${T}</div>`)}`:m}
                </div>
              </div>
            `})}
        </div>
      </div>
    </div>
  `}function Um(e,t){const n=Nm(e),s=t==="tokens",i=e.totalTokens||1,a={output:ue(e.output,i),input:ue(e.input,i),cacheWrite:ue(e.cacheWrite,i),cacheRead:ue(e.cacheRead,i)};return r`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">${s?"Token":"费用"}按类型</div>
      <div class="cost-breakdown-bar">
        <div class="cost-segment output" style="width: ${(s?a.output:n.output.pct).toFixed(1)}%"
          title="Output: ${s?N(e.output):Q(n.output.cost)}"></div>
        <div class="cost-segment input" style="width: ${(s?a.input:n.input.pct).toFixed(1)}%"
          title="Input: ${s?N(e.input):Q(n.input.cost)}"></div>
        <div class="cost-segment cache-write" style="width: ${(s?a.cacheWrite:n.cacheWrite.pct).toFixed(1)}%"
          title="Cache Write: ${s?N(e.cacheWrite):Q(n.cacheWrite.cost)}"></div>
        <div class="cost-segment cache-read" style="width: ${(s?a.cacheRead:n.cacheRead.pct).toFixed(1)}%"
          title="Cache Read: ${s?N(e.cacheRead):Q(n.cacheRead.cost)}"></div>
      </div>
      <div class="cost-breakdown-legend">
        <span class="legend-item"><span class="legend-dot output"></span>输出 ${s?N(e.output):Q(n.output.cost)}</span>
        <span class="legend-item"><span class="legend-dot input"></span>输入 ${s?N(e.input):Q(n.input.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-write"></span>缓存写入 ${s?N(e.cacheWrite):Q(n.cacheWrite.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-read"></span>缓存读取 ${s?N(e.cacheRead):Q(n.cacheRead.cost)}</span>
      </div>
      <div class="cost-breakdown-total">
        总计：${s?N(e.totalTokens):Q(e.totalCost)}
      </div>
    </div>
  `}function ct(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-list">
                ${t.map(s=>r`
                    <div class="usage-list-item">
                      <span>${s.label}</span>
                      <span class="usage-list-value">
                        <span>${s.value}</span>
                        ${s.sub?r`<span class="usage-list-sub">${s.sub}</span>`:m}
                      </span>
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function Go(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-error-list">
                ${t.map(s=>r`
                    <div class="usage-error-row">
                      <div class="usage-error-date">${s.label}</div>
                      <div class="usage-error-rate">${s.value}</div>
                      ${s.sub?r`<div class="usage-error-sub">${s.sub}</div>`:m}
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function Hm(e,t,n,s,i,a,o){if(!e)return m;const l=t.messages.total?Math.round(e.totalTokens/t.messages.total):0,c=t.messages.total?e.totalCost/t.messages.total:0,u=e.input+e.cacheRead,p=u>0?e.cacheRead/u:0,g=u>0?`${(p*100).toFixed(1)}%`:"—",h=n.errorRate*100,f=n.throughputTokensPerMin!==void 0?`${N(Math.round(n.throughputTokensPerMin))} tok/min`:"—",d=n.throughputCostPerMin!==void 0?`${Q(n.throughputCostPerMin,4)} / min`:"—",v=n.durationCount>0?_m(n.avgDurationMs):"—",S="缓存命中率 = 缓存读取 / (输入 + 缓存读取)。越高越好。",k="错误率 = 错误数 / 消息总数。越低越好。",x="吞吐量显示活动时间内每分钟的 Token 数。越高越好。",C="此范围内每条消息的平均 Token 数。",A=s?"当供应商报告费用时的平均每条消息费用。此范围内部分或所有会话缺少费用数据。":"当供应商报告费用时的平均每条消息费用。",_=t.daily.filter(D=>D.messages>0&&D.errors>0).map(D=>{const U=D.errors/D.messages;return{label:Ol(D.date),value:`${(U*100).toFixed(2)}%`,sub:`${D.errors} 个错误 · ${D.messages} 条消息 · ${N(D.tokens)}`,rate:U}}).toSorted((D,U)=>U.rate-D.rate).slice(0,5).map(({rate:D,...U})=>U),T=t.byModel.slice(0,5).map(D=>({label:D.model??"unknown",value:Q(D.totals.totalCost),sub:`${N(D.totals.totalTokens)} · ${D.count} 条消息`})),I=t.byProvider.slice(0,5).map(D=>({label:D.provider??"unknown",value:Q(D.totals.totalCost),sub:`${N(D.totals.totalTokens)} · ${D.count} 条消息`})),K=t.tools.tools.slice(0,6).map(D=>({label:D.name,value:`${D.count}`,sub:"次调用"})),q=t.byAgent.slice(0,5).map(D=>({label:D.agentId,value:Q(D.totals.totalCost),sub:N(D.totals.totalTokens)})),W=t.byChannel.slice(0,5).map(D=>({label:D.channel,value:Q(D.totals.totalCost),sub:N(D.totals.totalTokens)}));return r`
    <section class="card" style="margin-top: 16px;">
      <div class="card-title">用量概览</div>
      <div class="usage-summary-grid">
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            消息
            <span class="usage-summary-hint" title="范围内的用户和助手消息总数。">?</span>
          </div>
          <div class="usage-summary-value">${t.messages.total}</div>
          <div class="usage-summary-sub">
            ${t.messages.user} 用户 · ${t.messages.assistant} 助手
          </div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            工具调用
            <span class="usage-summary-hint" title="所有会话的工具调用总次数。">?</span>
          </div>
          <div class="usage-summary-value">${t.tools.totalCalls}</div>
          <div class="usage-summary-sub">${t.tools.uniqueTools} 个工具已使用</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            错误
            <span class="usage-summary-hint" title="范围内的消息/工具错误总数。">?</span>
          </div>
          <div class="usage-summary-value">${t.messages.errors}</div>
          <div class="usage-summary-sub">${t.messages.toolResults} 个工具结果</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            平均 Token / 消息
            <span class="usage-summary-hint" title=${C}>?</span>
          </div>
          <div class="usage-summary-value">${N(l)}</div>
          <div class="usage-summary-sub">共 ${t.messages.total||0} 条消息</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            平均费用 / 消息
            <span class="usage-summary-hint" title=${A}>?</span>
          </div>
          <div class="usage-summary-value">${Q(c,4)}</div>
          <div class="usage-summary-sub">总计 ${Q(e.totalCost)}</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            会话
            <span class="usage-summary-hint" title="范围内的不同会话数。">?</span>
          </div>
          <div class="usage-summary-value">${a}</div>
          <div class="usage-summary-sub">范围内共 ${o} 个</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            吞吐量
            <span class="usage-summary-hint" title=${x}>?</span>
          </div>
          <div class="usage-summary-value">${f}</div>
          <div class="usage-summary-sub">${d}</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            错误率
            <span class="usage-summary-hint" title=${k}>?</span>
          </div>
          <div class="usage-summary-value ${h>5?"bad":h>1?"warn":"good"}">${h.toFixed(2)}%</div>
          <div class="usage-summary-sub">
            ${t.messages.errors} 个错误 · ${v} 平均会话
          </div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            缓存命中率
            <span class="usage-summary-hint" title=${S}>?</span>
          </div>
          <div class="usage-summary-value ${p>.6?"good":p>.3?"warn":"bad"}">${g}</div>
          <div class="usage-summary-sub">
            ${N(e.cacheRead)} 已缓存 · ${N(u)} 提示
          </div>
        </div>
      </div>
      <div class="usage-insights-grid">
        ${ct("热门模型",T,"暂无模型数据")}
        ${ct("热门供应商",I,"暂无供应商数据")}
        ${ct("热门工具",K,"暂无工具调用")}
        ${ct("热门代理",q,"暂无代理数据")}
        ${ct("热门通道",W,"暂无通道数据")}
        ${Go("错误高峰日",_,"暂无错误数据")}
        ${Go("错误高峰时段",i,"暂无错误数据")}
      </div>
    </section>
  `}function Km(e,t,n,s,i,a,o,l,c,u,p,g,h,f,d){const v=E=>h.includes(E),S=E=>{const z=E.label||E.key;return z.startsWith("agent:")&&z.includes("?token=")?z.slice(0,z.indexOf("?token=")):z},k=async E=>{const z=S(E);try{await navigator.clipboard.writeText(z)}catch{}},x=E=>{const z=[];return v("channel")&&E.channel&&z.push(`channel:${E.channel}`),v("agent")&&E.agentId&&z.push(`agent:${E.agentId}`),v("provider")&&(E.modelProvider||E.providerOverride)&&z.push(`provider:${E.modelProvider??E.providerOverride}`),v("model")&&E.model&&z.push(`model:${E.model}`),v("messages")&&E.usage?.messageCounts&&z.push(`msgs:${E.usage.messageCounts.total}`),v("tools")&&E.usage?.toolUsage&&z.push(`tools:${E.usage.toolUsage.totalCalls}`),v("errors")&&E.usage?.messageCounts&&z.push(`errors:${E.usage.messageCounts.errors}`),v("duration")&&E.usage?.durationMs&&z.push(`dur:${Nl(E.usage.durationMs)}`),z},C=E=>{const z=E.usage;if(!z)return 0;if(n.length>0&&z.dailyBreakdown&&z.dailyBreakdown.length>0){const ie=z.dailyBreakdown.filter(ae=>n.includes(ae.date));return s?ie.reduce((ae,J)=>ae+J.tokens,0):ie.reduce((ae,J)=>ae+J.cost,0)}return s?z.totalTokens??0:z.totalCost??0},A=[...e].toSorted((E,z)=>{switch(i){case"recent":return(z.updatedAt??0)-(E.updatedAt??0);case"messages":return(z.usage?.messageCounts?.total??0)-(E.usage?.messageCounts?.total??0);case"errors":return(z.usage?.messageCounts?.errors??0)-(E.usage?.messageCounts?.errors??0);case"cost":return C(z)-C(E);default:return C(z)-C(E)}}),_=a==="asc"?A.toReversed():A,T=_.reduce((E,z)=>E+C(z),0),I=_.length?T/_.length:0,K=_.reduce((E,z)=>E+(z.usage?.messageCounts?.errors??0),0),q=new Set(t),W=_.filter(E=>q.has(E.key)),D=W.length,U=new Map(_.map(E=>[E.key,E])),ge=o.map(E=>U.get(E)).filter(E=>!!E);return r`
    <div class="card sessions-card">
      <div class="sessions-card-header">
        <div class="card-title">会话</div>
        <div class="sessions-card-count">
          ${e.length} 个显示${f!==e.length?` · 共 ${f} 个`:""}
        </div>
      </div>
      <div class="sessions-card-meta">
        <div class="sessions-card-stats">
          <span>${s?N(I):Q(I)} 平均</span>
          <span>${K} 个错误</span>
        </div>
        <div class="chart-toggle small">
          <button
            class="toggle-btn ${l==="all"?"active":""}"
            @click=${()=>g("all")}
          >
            全部
          </button>
          <button
            class="toggle-btn ${l==="recent"?"active":""}"
            @click=${()=>g("recent")}
          >
            最近查看
          </button>
        </div>
        <label class="sessions-sort">
          <span>排序</span>
          <select
            @change=${E=>u(E.target.value)}
          >
            <option value="cost" ?selected=${i==="cost"}>费用</option>
            <option value="errors" ?selected=${i==="errors"}>错误</option>
            <option value="messages" ?selected=${i==="messages"}>消息</option>
            <option value="recent" ?selected=${i==="recent"}>最近</option>
            <option value="tokens" ?selected=${i==="tokens"}>Token</option>
          </select>
        </label>
        <button
          class="btn btn-sm sessions-action-btn icon"
          @click=${()=>p(a==="desc"?"asc":"desc")}
          title=${a==="desc"?"降序":"升序"}
        >
          ${a==="desc"?"↓":"↑"}
        </button>
        ${D>0?r`
                <button class="btn btn-sm sessions-action-btn sessions-clear-btn" @click=${d}>
                  清除选择
                </button>
              `:m}
      </div>
      ${l==="recent"?ge.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">暂无最近会话</div>
              `:r`
                <div class="session-bars" style="max-height: 220px; margin-top: 6px;">
                  ${ge.map(E=>{const z=C(E),ie=q.has(E.key),ae=S(E),J=x(E);return r`
                      <div
                        class="session-bar-row ${ie?"selected":""}"
                        @click=${ne=>c(E.key,ne.shiftKey)}
                        title="${E.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${ae}</div>
                          ${J.length>0?r`<div class="session-bar-meta">${J.join(" · ")}</div>`:m}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="复制会话名称"
                            @click=${ne=>{ne.stopPropagation(),k(E)}}
                          >
                            复制
                          </button>
                          <div class="session-bar-value">${s?N(z):Q(z)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              `:e.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">范围内暂无会话</div>
              `:r`
                <div class="session-bars">
                  ${_.slice(0,50).map(E=>{const z=C(E),ie=t.includes(E.key),ae=S(E),J=x(E);return r`
                      <div
                        class="session-bar-row ${ie?"selected":""}"
                        @click=${ne=>c(E.key,ne.shiftKey)}
                        title="${E.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${ae}</div>
                          ${J.length>0?r`<div class="session-bar-meta">${J.join(" · ")}</div>`:m}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="复制会话名称"
                            @click=${ne=>{ne.stopPropagation(),k(E)}}
                          >
                            复制
                          </button>
                          <div class="session-bar-value">${s?N(z):Q(z)}</div>
                        </div>
                      </div>
                    `})}
                  ${e.length>50?r`<div class="muted" style="padding: 8px; text-align: center; font-size: 11px;">+${e.length-50} 个更多</div>`:m}
                </div>
              `}
      ${D>1?r`
              <div style="margin-top: 10px;">
                <div class="sessions-card-count">已选择 (${D})</div>
                <div class="session-bars" style="max-height: 160px; margin-top: 6px;">
                  ${W.map(E=>{const z=C(E),ie=S(E),ae=x(E);return r`
                      <div
                        class="session-bar-row selected"
                        @click=${J=>c(E.key,J.shiftKey)}
                        title="${E.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${ie}</div>
                          ${ae.length>0?r`<div class="session-bar-meta">${ae.join(" · ")}</div>`:m}
                        </div>
                  <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="复制会话名称"
                            @click=${J=>{J.stopPropagation(),k(E)}}
                          >
                            复制
                          </button>
                          <div class="session-bar-value">${s?N(z):Q(z)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              </div>
            `:m}
    </div>
  `}function jm(){return m}function qm(e){const t=e.usage;if(!t)return r`
      <div class="muted">此会话暂无用量数据。</div>
    `;const n=o=>o?new Date(o).toLocaleString():"—",s=[];e.channel&&s.push(`channel:${e.channel}`),e.agentId&&s.push(`agent:${e.agentId}`),(e.modelProvider||e.providerOverride)&&s.push(`provider:${e.modelProvider??e.providerOverride}`),e.model&&s.push(`model:${e.model}`);const i=t.toolUsage?.tools.slice(0,6).map(o=>({label:o.name,value:`${o.count}`,sub:"次调用"}))??[],a=t.modelUsage?.slice(0,6).map(o=>({label:o.model??"unknown",value:Q(o.totals.totalCost),sub:N(o.totals.totalTokens)}))??[];return r`
    ${s.length>0?r`<div class="usage-badges">${s.map(o=>r`<span class="usage-badge">${o}</span>`)}</div>`:m}
    <div class="session-summary-grid">
      <div class="session-summary-card">
        <div class="session-summary-title">消息</div>
        <div class="session-summary-value">${t.messageCounts?.total??0}</div>
        <div class="session-summary-meta">${t.messageCounts?.user??0} 用户 · ${t.messageCounts?.assistant??0} 助手</div>
      </div>
      <div class="session-summary-card">
        <div class="session-summary-title">工具调用</div>
        <div class="session-summary-value">${t.toolUsage?.totalCalls??0}</div>
        <div class="session-summary-meta">${t.toolUsage?.uniqueTools??0} 个工具</div>
      </div>
      <div class="session-summary-card">
        <div class="session-summary-title">错误</div>
        <div class="session-summary-value">${t.messageCounts?.errors??0}</div>
        <div class="session-summary-meta">${t.messageCounts?.toolResults??0} 个工具结果</div>
      </div>
      <div class="session-summary-card">
        <div class="session-summary-title">时长</div>
        <div class="session-summary-value">${Nl(t.durationMs)}</div>
        <div class="session-summary-meta">${n(t.firstActivity)} → ${n(t.lastActivity)}</div>
      </div>
    </div>
    <div class="usage-insights-grid" style="margin-top: 12px;">
      ${ct("热门工具",i,"暂无工具调用")}
      ${ct("模型组合",a,"暂无模型数据")}
    </div>
  `}function Wm(e,t,n,s,i,a,o,l,c,u,p,g,h,f,d,v,S,k,x,C,A,_,T){const I=e.label||e.key,K=I.length>50?I.slice(0,50)+"…":I,q=e.usage;return r`
    <div class="card session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">${K}</div>
        </div>
        <div class="session-detail-stats">
          ${q?r`
            <span><strong>${N(q.totalTokens)}</strong> tokens</span>
            <span><strong>${Q(q.totalCost)}</strong></span>
          `:m}
        </div>
        <button class="session-close-btn" @click=${T} title="关闭会话详情">×</button>
      </div>
      <div class="session-detail-content">
        ${qm(e)}
        <div class="session-detail-row">
          ${Vm(t,n,s,i,a,o,l,c,u)}
        </div>
        <div class="session-detail-bottom">
          ${Qm(p,g,h,f,d,v,S,k,x,C)}
          ${Gm(e.contextWeight,q,A,_)}
        </div>
      </div>
    </div>
  `}function Vm(e,t,n,s,i,a,o,l,c){if(t)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">加载中...</div>
      </div>
    `;if(!e||e.points.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">暂无时间线数据</div>
      </div>
    `;let u=e.points;if(o||l||c&&c.length>0){const U=o?new Date(o+"T00:00:00").getTime():0,ge=l?new Date(l+"T23:59:59").getTime():1/0;u=e.points.filter(E=>{if(E.timestamp<U||E.timestamp>ge)return!1;if(c&&c.length>0){const z=new Date(E.timestamp),ie=`${z.getFullYear()}-${String(z.getMonth()+1).padStart(2,"0")}-${String(z.getDate()).padStart(2,"0")}`;return c.includes(ie)}return!0})}if(u.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">范围内暂无数据</div>
      </div>
    `;let p=0,g=0,h=0,f=0,d=0,v=0;u=u.map(U=>(p+=U.totalTokens,g+=U.cost,h+=U.output,f+=U.input,d+=U.cacheRead,v+=U.cacheWrite,{...U,cumulativeTokens:p,cumulativeCost:g}));const S=400,k=80,x={top:16,right:10,bottom:20,left:40},C=S-x.left-x.right,A=k-x.top-x.bottom,_=n==="cumulative",T=n==="per-turn"&&i==="by-type",I=h+f+d+v,K=u.map(U=>_?U.cumulativeTokens:T?U.input+U.output+U.cacheRead+U.cacheWrite:U.totalTokens),q=Math.max(...K,1),W=Math.max(2,Math.min(8,C/u.length*.7)),D=Math.max(1,(C-W*u.length)/(u.length-1||1));return r`
    <div class="session-timeseries-compact">
      <div class="timeseries-header-row">
        <div class="card-title" style="font-size: 13px;">用量趋势</div>
        <div class="timeseries-controls">
          <div class="chart-toggle small">
            <button
              class="toggle-btn ${_?"":"active"}"
              @click=${()=>s("per-turn")}
            >
              按轮次
            </button>
            <button
              class="toggle-btn ${_?"active":""}"
              @click=${()=>s("cumulative")}
            >
              累计
            </button>
          </div>
          ${_?m:r`
                  <div class="chart-toggle small">
                    <button
                      class="toggle-btn ${i==="total"?"active":""}"
                      @click=${()=>a("total")}
                    >
                      总计
                    </button>
                    <button
                      class="toggle-btn ${i==="by-type"?"active":""}"
                      @click=${()=>a("by-type")}
                    >
                      按类型
                    </button>
                  </div>
                `}
        </div>
      </div>
      <svg viewBox="0 0 ${S} ${k+15}" class="timeseries-svg" style="width: 100%; height: auto;">
        <!-- Y axis -->
        <line x1="${x.left}" y1="${x.top}" x2="${x.left}" y2="${x.top+A}" stroke="var(--border)" />
        <!-- X axis -->
        <line x1="${x.left}" y1="${x.top+A}" x2="${S-x.right}" y2="${x.top+A}" stroke="var(--border)" />
        <!-- Y axis labels -->
        <text x="${x.left-4}" y="${x.top+4}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">${N(q)}</text>
        <text x="${x.left-4}" y="${x.top+A}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">0</text>
        <!-- X axis labels (first and last) -->
        ${u.length>0?vn`
          <text x="${x.left}" y="${x.top+A+12}" text-anchor="start" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[0].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
          <text x="${S-x.right}" y="${x.top+A+12}" text-anchor="end" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[u.length-1].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
        `:m}
        <!-- Bars -->
        ${u.map((U,ge)=>{const E=K[ge],z=x.left+ge*(W+D),ie=E/q*A,ae=x.top+A-ie,ne=[new Date(U.timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),`${N(E)} tokens`];T&&(ne.push(`Output ${N(U.output)}`),ne.push(`Input ${N(U.input)}`),ne.push(`Cache write ${N(U.cacheWrite)}`),ne.push(`Cache read ${N(U.cacheRead)}`));const M=ne.join(" · ");if(!T)return vn`<rect x="${z}" y="${ae}" width="${W}" height="${ie}" class="ts-bar" rx="1" style="cursor: pointer;"><title>${M}</title></rect>`;const R=[{value:U.output,class:"output"},{value:U.input,class:"input"},{value:U.cacheWrite,class:"cache-write"},{value:U.cacheRead,class:"cache-read"}];let P=x.top+A;return vn`
            ${R.map(H=>{if(H.value<=0||E<=0)return m;const $e=ie*(H.value/E);return P-=$e,vn`<rect x="${z}" y="${P}" width="${W}" height="${$e}" class="ts-bar ${H.class}" rx="1"><title>${M}</title></rect>`})}
          `})}
      </svg>
      <div class="timeseries-summary">${u.length} 条消息 · ${N(p)} · ${Q(g)}</div>
      ${T?r`
              <div style="margin-top: 8px;">
                <div class="card-title" style="font-size: 12px; margin-bottom: 6px;">Token 按类型</div>
                <div class="cost-breakdown-bar" style="height: 18px;">
                  <div class="cost-segment output" style="width: ${ue(h,I).toFixed(1)}%"></div>
                  <div class="cost-segment input" style="width: ${ue(f,I).toFixed(1)}%"></div>
                  <div class="cost-segment cache-write" style="width: ${ue(v,I).toFixed(1)}%"></div>
                  <div class="cost-segment cache-read" style="width: ${ue(d,I).toFixed(1)}%"></div>
                </div>
                <div class="cost-breakdown-legend">
                  <div class="legend-item" title="助手输出 Token">
                    <span class="legend-dot output"></span>输出 ${N(h)}
                  </div>
                  <div class="legend-item" title="用户 + 工具输入 Token">
                    <span class="legend-dot input"></span>输入 ${N(f)}
                  </div>
                  <div class="legend-item" title="写入缓存的 Token">
                    <span class="legend-dot cache-write"></span>缓存写入 ${N(v)}
                  </div>
                  <div class="legend-item" title="从缓存读取的 Token">
                    <span class="legend-dot cache-read"></span>缓存读取 ${N(d)}
                  </div>
                </div>
                <div class="cost-breakdown-total">总计：${N(I)}</div>
              </div>
            `:m}
    </div>
  `}function Gm(e,t,n,s){if(!e)return r`
      <div class="context-details-panel">
        <div class="muted" style="padding: 20px; text-align: center">暂无上下文数据</div>
      </div>
    `;const i=at(e.systemPrompt.chars),a=at(e.skills.promptChars),o=at(e.tools.listChars+e.tools.schemaChars),l=at(e.injectedWorkspaceFiles.reduce((C,A)=>C+A.injectedChars,0)),c=i+a+o+l;let u="";if(t&&t.totalTokens>0){const C=t.input+t.cacheRead;C>0&&(u=`~${Math.min(c/C*100,100).toFixed(0)}% of input`)}const p=e.skills.entries.toSorted((C,A)=>A.blockChars-C.blockChars),g=e.tools.entries.toSorted((C,A)=>A.summaryChars+A.schemaChars-(C.summaryChars+C.schemaChars)),h=e.injectedWorkspaceFiles.toSorted((C,A)=>A.injectedChars-C.injectedChars),f=4,d=n,v=d?p:p.slice(0,f),S=d?g:g.slice(0,f),k=d?h:h.slice(0,f),x=p.length>f||g.length>f||h.length>f;return r`
    <div class="context-details-panel">
      <div class="context-breakdown-header">
        <div class="card-title" style="font-size: 13px;">系统提示词分析</div>
        ${x?r`<button class="context-expand-btn" @click=${s}>
                ${d?"收起":"展开全部"}
              </button>`:m}
      </div>
      <p class="context-weight-desc">${u||"每条消息的基础上下文"}</p>
      <div class="context-stacked-bar">
        <div class="context-segment system" style="width: ${ue(i,c).toFixed(1)}%" title="System: ~${N(i)}"></div>
        <div class="context-segment skills" style="width: ${ue(a,c).toFixed(1)}%" title="Skills: ~${N(a)}"></div>
        <div class="context-segment tools" style="width: ${ue(o,c).toFixed(1)}%" title="Tools: ~${N(o)}"></div>
        <div class="context-segment files" style="width: ${ue(l,c).toFixed(1)}%" title="Files: ~${N(l)}"></div>
      </div>
      <div class="context-legend">
        <span class="legend-item"><span class="legend-dot system"></span>系统 ~${N(i)}</span>
        <span class="legend-item"><span class="legend-dot skills"></span>技能 ~${N(a)}</span>
        <span class="legend-item"><span class="legend-dot tools"></span>工具 ~${N(o)}</span>
        <span class="legend-item"><span class="legend-dot files"></span>文件 ~${N(l)}</span>
      </div>
      <div class="context-total">总计：~${N(c)}</div>
      <div class="context-breakdown-grid">
        ${p.length>0?(()=>{const C=p.length-v.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">技能 (${p.length})</div>
                    <div class="context-breakdown-list">
                      ${v.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${N(at(A.blockChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${C>0?r`<div class="context-breakdown-more">+${C} more</div>`:m}
                  </div>
                `})():m}
        ${g.length>0?(()=>{const C=g.length-S.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">工具 (${g.length})</div>
                    <div class="context-breakdown-list">
                      ${S.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${N(at(A.summaryChars+A.schemaChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${C>0?r`<div class="context-breakdown-more">+${C} more</div>`:m}
                  </div>
                `})():m}
        ${h.length>0?(()=>{const C=h.length-k.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">文件 (${h.length})</div>
                    <div class="context-breakdown-list">
                      ${k.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${N(at(A.injectedChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${C>0?r`<div class="context-breakdown-more">+${C} more</div>`:m}
                  </div>
                `})():m}
      </div>
    </div>
  `}function Qm(e,t,n,s,i,a,o,l,c,u){if(t)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.length===0)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">No messages</div>
      </div>
    `;const p=i.query.trim().toLowerCase(),g=e.map(k=>{const x=ym(k.content),C=x.cleanContent||k.content;return{log:k,toolInfo:x,cleanContent:C}}),h=Array.from(new Set(g.flatMap(k=>k.toolInfo.tools.map(([x])=>x)))).toSorted((k,x)=>k.localeCompare(x)),f=g.filter(k=>!(i.roles.length>0&&!i.roles.includes(k.log.role)||i.hasTools&&k.toolInfo.tools.length===0||i.tools.length>0&&!k.toolInfo.tools.some(([C])=>i.tools.includes(C))||p&&!k.cleanContent.toLowerCase().includes(p))),d=i.roles.length>0||i.tools.length>0||i.hasTools||p?`${f.length} of ${e.length}`:`${e.length}`,v=new Set(i.roles),S=new Set(i.tools);return r`
    <div class="session-logs-compact">
      <div class="session-logs-header">
        <span>Conversation <span style="font-weight: normal; color: var(--text-muted);">(${d} messages)</span></span>
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${s}>
          ${n?"Collapse All":"Expand All"}
        </button>
      </div>
      <div class="usage-filters-inline" style="margin: 10px 12px;">
        <select
          multiple
          size="4"
          @change=${k=>a(Array.from(k.target.selectedOptions).map(x=>x.value))}
        >
          <option value="user" ?selected=${v.has("user")}>User</option>
          <option value="assistant" ?selected=${v.has("assistant")}>Assistant</option>
          <option value="tool" ?selected=${v.has("tool")}>Tool</option>
          <option value="toolResult" ?selected=${v.has("toolResult")}>Tool result</option>
        </select>
        <select
          multiple
          size="4"
          @change=${k=>o(Array.from(k.target.selectedOptions).map(x=>x.value))}
        >
          ${h.map(k=>r`<option value=${k} ?selected=${S.has(k)}>${k}</option>`)}
        </select>
        <label class="usage-filters-inline" style="gap: 6px;">
          <input
            type="checkbox"
            .checked=${i.hasTools}
            @change=${k=>l(k.target.checked)}
          />
          Has tools
        </label>
        <input
          type="text"
          placeholder="Search conversation"
          .value=${i.query}
          @input=${k=>c(k.target.value)}
        />
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${u}>
          Clear
        </button>
      </div>
      <div class="session-logs-list">
        ${f.map(k=>{const{log:x,toolInfo:C,cleanContent:A}=k,_=x.role==="user"?"user":"assistant",T=x.role==="user"?"You":x.role==="assistant"?"Assistant":"Tool";return r`
          <div class="session-log-entry ${_}">
            <div class="session-log-meta">
              <span class="session-log-role">${T}</span>
              <span>${new Date(x.timestamp).toLocaleString()}</span>
              ${x.tokens?r`<span>${N(x.tokens)}</span>`:m}
            </div>
            <div class="session-log-content">${A}</div>
            ${C.tools.length>0?r`
                    <details class="session-log-tools" ?open=${n}>
                      <summary>${C.summary}</summary>
                      <div class="session-log-tools-list">
                        ${C.tools.map(([I,K])=>r`
                            <span class="session-log-tools-pill">${I} × ${K}</span>
                          `)}
                      </div>
                    </details>
                  `:m}
          </div>
        `})}
        ${f.length===0?r`
                <div class="muted" style="padding: 12px">No messages match the filters.</div>
              `:m}
      </div>
    </div>
  `}function Ym(e){if(e.loading&&!e.totals)return r`
      <style>
        @keyframes initial-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes initial-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      </style>
      <section class="card">
        <div class="row" style="justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
          <div style="flex: 1; min-width: 250px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 2px;">
              <div class="card-title" style="margin: 0;">Token Usage</div>
              <span style="
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 10px;
                background: rgba(255, 77, 77, 0.1);
                border-radius: 4px;
                font-size: 12px;
                color: #ff4d4d;
              ">
                <span style="
                  width: 10px;
                  height: 10px;
                  border: 2px solid #ff4d4d;
                  border-top-color: transparent;
                  border-radius: 50%;
                  animation: initial-spin 0.6s linear infinite;
                "></span>
                Loading
              </span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="date" .value=${e.startDate} disabled style="padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text); font-size: 13px; opacity: 0.6;" />
              <span style="color: var(--text-muted);">to</span>
              <input type="date" .value=${e.endDate} disabled style="padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text); font-size: 13px; opacity: 0.6;" />
            </div>
          </div>
        </div>
      </section>
    `;const t=e.chartMode==="tokens",n=e.query.trim().length>0,s=e.queryDraft.trim().length>0,i=[...e.sessions].toSorted((M,R)=>{const P=t?M.usage?.totalTokens??0:M.usage?.totalCost??0;return(t?R.usage?.totalTokens??0:R.usage?.totalCost??0)-P}),a=e.selectedDays.length>0?i.filter(M=>{if(M.usage?.activityDates?.length)return M.usage.activityDates.some(H=>e.selectedDays.includes(H));if(!M.updatedAt)return!1;const R=new Date(M.updatedAt),P=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}-${String(R.getDate()).padStart(2,"0")}`;return e.selectedDays.includes(P)}):i,o=(M,R)=>{if(R.length===0)return!0;const P=M.usage,H=P?.firstActivity??M.updatedAt,$e=P?.lastActivity??M.updatedAt;if(!H||!$e)return!1;const Z=Math.min(H,$e),we=Math.max(H,$e);let ee=Z;for(;ee<=we;){const pe=new Date(ee),Fe=ra(pe,e.timeZone);if(R.includes(Fe))return!0;const Oe=la(pe,e.timeZone);ee=Math.min(Oe.getTime(),we)+1}return!1},l=e.selectedHours.length>0?a.filter(M=>o(M,e.selectedHours)):a,c=bm(l,e.query),u=c.sessions,p=c.warnings,g=Dm(e.queryDraft,i,e.aggregates),h=oa(e.query),f=M=>{const R=lt(M);return h.filter(P=>lt(P.key??"")===R).map(P=>P.value).filter(Boolean)},d=M=>{const R=new Set;for(const P of M)P&&R.add(P);return Array.from(R)},v=d(i.map(M=>M.agentId)).slice(0,12),S=d(i.map(M=>M.channel)).slice(0,12),k=d([...i.map(M=>M.modelProvider),...i.map(M=>M.providerOverride),...e.aggregates?.byProvider.map(M=>M.provider)??[]]).slice(0,12),x=d([...i.map(M=>M.model),...e.aggregates?.byModel.map(M=>M.model)??[]]).slice(0,12),C=d(e.aggregates?.tools.tools.map(M=>M.name)??[]).slice(0,12),A=e.selectedSessions.length===1?e.sessions.find(M=>M.key===e.selectedSessions[0])??u.find(M=>M.key===e.selectedSessions[0]):null,_=M=>M.reduce((R,P)=>(P.usage&&(R.input+=P.usage.input,R.output+=P.usage.output,R.cacheRead+=P.usage.cacheRead,R.cacheWrite+=P.usage.cacheWrite,R.totalTokens+=P.usage.totalTokens,R.totalCost+=P.usage.totalCost,R.inputCost+=P.usage.inputCost??0,R.outputCost+=P.usage.outputCost??0,R.cacheReadCost+=P.usage.cacheReadCost??0,R.cacheWriteCost+=P.usage.cacheWriteCost??0,R.missingCostEntries+=P.usage.missingCostEntries??0),R),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),T=M=>e.costDaily.filter(P=>M.includes(P.date)).reduce((P,H)=>(P.input+=H.input,P.output+=H.output,P.cacheRead+=H.cacheRead,P.cacheWrite+=H.cacheWrite,P.totalTokens+=H.totalTokens,P.totalCost+=H.totalCost,P.inputCost+=H.inputCost??0,P.outputCost+=H.outputCost??0,P.cacheReadCost+=H.cacheReadCost??0,P.cacheWriteCost+=H.cacheWriteCost??0,P),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0});let I,K;const q=i.length;if(e.selectedSessions.length>0){const M=u.filter(R=>e.selectedSessions.includes(R.key));I=_(M),K=M.length}else e.selectedDays.length>0&&e.selectedHours.length===0?(I=T(e.selectedDays),K=u.length):e.selectedHours.length>0||n?(I=_(u),K=u.length):(I=e.totals,K=q);const W=e.selectedSessions.length>0?u.filter(M=>e.selectedSessions.includes(M.key)):n||e.selectedHours.length>0?u:e.selectedDays.length>0?a:i,D=Mm(W,e.aggregates),U=e.selectedSessions.length>0?(()=>{const M=u.filter(P=>e.selectedSessions.includes(P.key)),R=new Set;for(const P of M)for(const H of P.usage?.activityDates??[])R.add(H);return R.size>0?e.costDaily.filter(P=>R.has(P.date)):e.costDaily})():e.costDaily,ge=Im(W,I,D),E=!e.loading&&!e.totals&&e.sessions.length===0,z=(I?.missingCostEntries??0)>0||(I?I.totalTokens>0&&I.totalCost===0&&I.input+I.output+I.cacheRead+I.cacheWrite>0:!1),ie=[{label:"Today",days:1},{label:"7d",days:7},{label:"30d",days:30}],ae=M=>{const R=new Date,P=new Date;P.setDate(P.getDate()-(M-1)),e.onStartDateChange(zs(P)),e.onEndDateChange(zs(R))},J=(M,R,P)=>{if(P.length===0)return m;const H=f(M),$e=new Set(H.map(ee=>lt(ee))),Z=P.length>0&&P.every(ee=>$e.has(lt(ee))),we=H.length;return r`
      <details
        class="usage-filter-select"
        @toggle=${ee=>{const pe=ee.currentTarget;if(!pe.open)return;const Fe=Oe=>{Oe.composedPath().includes(pe)||(pe.open=!1,window.removeEventListener("click",Fe,!0))};window.addEventListener("click",Fe,!0)}}
      >
        <summary>
          <span>${R}</span>
          ${we>0?r`<span class="usage-filter-badge">${we}</span>`:r`
                  <span class="usage-filter-badge">All</span>
                `}
        </summary>
        <div class="usage-filter-popover">
          <div class="usage-filter-actions">
            <button
              class="btn btn-sm"
              @click=${ee=>{ee.preventDefault(),ee.stopPropagation(),e.onQueryDraftChange(Vo(e.queryDraft,M,P))}}
              ?disabled=${Z}
            >
              Select All
            </button>
            <button
              class="btn btn-sm"
              @click=${ee=>{ee.preventDefault(),ee.stopPropagation(),e.onQueryDraftChange(Vo(e.queryDraft,M,[]))}}
              ?disabled=${we===0}
            >
              Clear
            </button>
          </div>
          <div class="usage-filter-options">
            ${P.map(ee=>{const pe=$e.has(lt(ee));return r`
                <label class="usage-filter-option">
                  <input
                    type="checkbox"
                    .checked=${pe}
                    @change=${Fe=>{const Oe=Fe.target,Je=`${M}:${ee}`;e.onQueryDraftChange(Oe.checked?Om(e.queryDraft,Je):Wo(e.queryDraft,Je))}}
                  />
                  <span>${ee}</span>
                </label>
              `})}
          </div>
        </div>
      </details>
    `},ne=zs(new Date);return r`
    <style>${xm}</style>

    <section class="usage-page-header">
      <div class="usage-page-title">Usage</div>
      <div class="usage-page-subtitle">See where tokens go, when sessions spike, and what drives cost.</div>
    </section>

    <section class="card usage-header ${e.headerPinned?"pinned":""}">
      <div class="usage-header-row">
        <div class="usage-header-title">
          <div class="card-title" style="margin: 0;">Filters</div>
          ${e.loading?r`
                  <span class="usage-refresh-indicator">Loading</span>
                `:m}
          ${E?r`
                  <span class="usage-query-hint">Select a date range and click Refresh to load usage.</span>
                `:m}
        </div>
        <div class="usage-header-metrics">
          ${I?r`
                <span class="usage-metric-badge">
                  <strong>${N(I.totalTokens)}</strong> tokens
                </span>
                <span class="usage-metric-badge">
                  <strong>${Q(I.totalCost)}</strong> cost
                </span>
                <span class="usage-metric-badge">
                  <strong>${K}</strong>
                  session${K!==1?"s":""}
                </span>
              `:m}
          <button
            class="usage-pin-btn ${e.headerPinned?"active":""}"
            title=${e.headerPinned?"Unpin filters":"Pin filters"}
            @click=${e.onToggleHeaderPinned}
          >
            ${e.headerPinned?"Pinned":"Pin"}
          </button>
          <details
            class="usage-export-menu"
            @toggle=${M=>{const R=M.currentTarget;if(!R.open)return;const P=H=>{H.composedPath().includes(R)||(R.open=!1,window.removeEventListener("click",P,!0))};window.addEventListener("click",P,!0)}}
          >
            <summary class="usage-export-button">Export ▾</summary>
            <div class="usage-export-popover">
              <div class="usage-export-list">
                <button
                  class="usage-export-item"
                  @click=${()=>Us(`openclaw-usage-sessions-${ne}.csv`,Rm(u),"text/csv")}
                  ?disabled=${u.length===0}
                >
                  Sessions CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>Us(`openclaw-usage-daily-${ne}.csv`,Pm(U),"text/csv")}
                  ?disabled=${U.length===0}
                >
                  Daily CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>Us(`openclaw-usage-${ne}.json`,JSON.stringify({totals:I,sessions:u,daily:U,aggregates:D},null,2),"application/json")}
                  ?disabled=${u.length===0&&U.length===0}
                >
                  JSON
                </button>
              </div>
            </div>
          </details>
        </div>
      </div>
      <div class="usage-header-row">
        <div class="usage-controls">
          ${Bm(e.selectedDays,e.selectedHours,e.selectedSessions,e.sessions,e.onClearDays,e.onClearHours,e.onClearSessions,e.onClearFilters)}
          <div class="usage-presets">
            ${ie.map(M=>r`
                <button class="btn btn-sm" @click=${()=>ae(M.days)}>
                  ${M.label}
                </button>
              `)}
          </div>
          <input
            type="date"
            .value=${e.startDate}
            title="Start Date"
            @change=${M=>e.onStartDateChange(M.target.value)}
          />
          <span style="color: var(--text-muted);">to</span>
          <input
            type="date"
            .value=${e.endDate}
            title="End Date"
            @change=${M=>e.onEndDateChange(M.target.value)}
          />
          <select
            title="Time zone"
            .value=${e.timeZone}
            @change=${M=>e.onTimeZoneChange(M.target.value)}
          >
            <option value="local">Local</option>
            <option value="utc">UTC</option>
          </select>
          <div class="chart-toggle">
            <button
              class="toggle-btn ${t?"active":""}"
              @click=${()=>e.onChartModeChange("tokens")}
            >
              Tokens
            </button>
            <button
              class="toggle-btn ${t?"":"active"}"
              @click=${()=>e.onChartModeChange("cost")}
            >
              Cost
            </button>
          </div>
          <button
            class="btn btn-sm usage-action-btn usage-primary-btn"
            @click=${e.onRefresh}
            ?disabled=${e.loading}
          >
            Refresh
          </button>
        </div>
        
      </div>

      <div style="margin-top: 12px;">
          <div class="usage-query-bar">
          <input
            class="usage-query-input"
            type="text"
            .value=${e.queryDraft}
            placeholder="Filter sessions (e.g. key:agent:main:cron* model:gpt-4o has:errors minTokens:2000)"
            @input=${M=>e.onQueryDraftChange(M.target.value)}
            @keydown=${M=>{M.key==="Enter"&&(M.preventDefault(),e.onApplyQuery())}}
          />
          <div class="usage-query-actions">
            <button
              class="btn btn-sm usage-action-btn usage-secondary-btn"
              @click=${e.onApplyQuery}
              ?disabled=${e.loading||!s&&!n}
            >
              Filter (client-side)
            </button>
            ${s||n?r`<button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${e.onClearQuery}>Clear</button>`:m}
            <span class="usage-query-hint">
              ${n?`${u.length} of ${q} sessions match`:`${q} sessions in range`}
            </span>
          </div>
        </div>
        <div class="usage-filter-row">
          ${J("agent","Agent",v)}
          ${J("channel","Channel",S)}
          ${J("provider","Provider",k)}
          ${J("model","Model",x)}
          ${J("tool","Tool",C)}
          <span class="usage-query-hint">
            Tip: use filters or click bars to filter days.
          </span>
        </div>
        ${h.length>0?r`
                <div class="usage-query-chips">
                  ${h.map(M=>{const R=M.raw;return r`
                      <span class="usage-query-chip">
                        ${R}
                        <button
                          title="Remove filter"
                          @click=${()=>e.onQueryDraftChange(Wo(e.queryDraft,R))}
                        >
                          ×
                        </button>
                      </span>
                    `})}
                </div>
              `:m}
        ${g.length>0?r`
                <div class="usage-query-suggestions">
                  ${g.map(M=>r`
                      <button
                        class="usage-query-suggestion"
                        @click=${()=>e.onQueryDraftChange(Fm(e.queryDraft,M.value))}
                      >
                        ${M.label}
                      </button>
                    `)}
                </div>
              `:m}
        ${p.length>0?r`
                <div class="callout warning" style="margin-top: 8px;">
                  ${p.join(" · ")}
                </div>
              `:m}
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:m}

      ${e.sessionsLimitReached?r`
              <div class="callout warning" style="margin-top: 12px">
                Showing first 1,000 sessions. Narrow date range for complete results.
              </div>
            `:m}
    </section>

    ${Hm(I,D,ge,z,km(W,e.timeZone),K,q)}

    ${Tm(W,e.timeZone,e.selectedHours,e.onSelectHour)}

    <!-- Two-column layout: Daily+Breakdown on left, Sessions on right -->
    <div class="usage-grid">
      <div class="usage-grid-left">
        <div class="card usage-left-card">
          ${zm(U,e.selectedDays,e.chartMode,e.dailyChartMode,e.onDailyChartModeChange,e.onSelectDay)}
          ${I?Um(I,e.chartMode):m}
        </div>
      </div>
      <div class="usage-grid-right">
        ${Km(u,e.selectedSessions,e.selectedDays,t,e.sessionSort,e.sessionSortDir,e.recentSessions,e.sessionsTab,e.onSelectSession,e.onSessionSortChange,e.onSessionSortDirChange,e.onSessionsTabChange,e.visibleColumns,q,e.onClearSessions)}
      </div>
    </div>

    <!-- Session Detail Panel (when selected) or Empty State -->
    ${A?Wm(A,e.timeSeries,e.timeSeriesLoading,e.timeSeriesMode,e.onTimeSeriesModeChange,e.timeSeriesBreakdownMode,e.onTimeSeriesBreakdownChange,e.startDate,e.endDate,e.selectedDays,e.sessionLogs,e.sessionLogsLoading,e.sessionLogsExpanded,e.onToggleSessionLogsExpanded,{roles:e.logFilterRoles,tools:e.logFilterTools,hasTools:e.logFilterHasTools,query:e.logFilterQuery},e.onLogFilterRolesChange,e.onLogFilterToolsChange,e.onLogFilterHasToolsChange,e.onLogFilterQueryChange,e.onLogFilterClear,e.contextExpanded,e.onToggleContextExpanded,e.onClearSessions):jm()}
  `}let Hs=null;const Qo=e=>{Hs&&clearTimeout(Hs),Hs=window.setTimeout(()=>{zi(e)},400)},Zm=/^data:/i,Xm=/^https?:\/\//i;function Jm(e){const t=e.agentsList?.agents??[],s=jr(e.sessionKey)?.agentId??e.agentsList?.defaultId??"main",a=t.find(l=>l.id===s)?.identity,o=a?.avatarUrl??a?.avatar;if(o)return Zm.test(o)||Xm.test(o)?o:a?.avatarUrl}function eb(e){const t=e.presenceEntries.length,n=e.sessionsResult?.count??null,s=e.cronStatus?.nextWakeAtMs??null,i=e.connected?null:"已断开与网关的连接。",a=e.tab==="chat",o=a&&(e.settings.chatFocusMode||e.onboarding),l=e.onboarding?!1:e.settings.chatShowThinking,c=Jm(e),u=e.chatAvatarUrl??c??null,p=rn(e.basePath),g=p?`${p}/favicon.svg`:"/favicon.svg",h=e.configForm??e.configSnapshot?.config,f=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id??null;return r`
    <div class="shell ${a?"shell--chat":""} ${o?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?"展开侧边栏":"折叠侧边栏"}"
            aria-label="${e.settings.navCollapsed?"展开侧边栏":"折叠侧边栏"}"
          >
            <span class="nav-collapse-toggle__icon">${le.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src="${g}" alt="OpenClaw" />
            </div>
            <div class="brand-text">
              <div class="brand-title">OPENCLAW</div>
              <div class="brand-sub">网关仪表盘</div>
            </div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${e.connected?"ok":""}"></span>
            <span>健康状态</span>
            <span class="mono">${e.connected?"正常":"离线"}</span>
          </div>
          ${Ag(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${xu.map(d=>{const v=e.settings.navGroupsCollapsed[d.label]??!1,S=d.tabs.some(k=>k===e.tab);return r`
            <div class="nav-group ${v&&!S?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const k={...e.settings.navGroupsCollapsed};k[d.label]=!v,e.applySettings({...e.settings,navGroupsCollapsed:k})}}
                aria-expanded=${!v}
              >
                <span class="nav-label__text">${d.label}</span>
                <span class="nav-label__chevron">${v?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${d.tabs.map(k=>xg(e,k))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">资源</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="文档（在新标签页中打开）"
            >
              <span class="nav-item__icon" aria-hidden="true">${le.book}</span>
              <span class="nav-item__text">文档</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${a?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="usage"?m:r`<div class="page-title">${ei(e.tab)}</div>`}
            ${e.tab==="usage"?m:r`<div class="page-sub">${ku(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?r`<div class="pill danger">${e.lastError}</div>`:m}
            ${a?$g(e):m}
          </div>
        </section>

        ${e.tab==="enhanced"?r`<div class="enhanced-iframe-wrap" style="width:100%;height:100%"><iframe src="/enhanced/dashboard" style="width:100%;height:100%;border:none;min-height:80vh;background:#fff"></iframe></div>`:e.tab==="overview"?Jv({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:e.cronStatus?.enabled??null,cronNext:s,lastChannelsRefresh:e.channelsLastSuccess,onSettingsChange:d=>e.applySettings(d),onPasswordChange:d=>e.password=d,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):m}

        ${e.tab==="channels"?Kp({connected:e.connected,loading:e.channelsLoading,snapshot:e.channelsSnapshot,lastError:e.channelsError,lastSuccessAt:e.channelsLastSuccess,whatsappMessage:e.whatsappLoginMessage,whatsappQrDataUrl:e.whatsappLoginQrDataUrl,whatsappConnected:e.whatsappLoginConnected,whatsappBusy:e.whatsappBusy,configSchema:e.configSchema,configSchemaLoading:e.configSchemaLoading,configForm:e.configForm,configUiHints:e.configUiHints,configSaving:e.configSaving,configFormDirty:e.configFormDirty,nostrProfileFormState:e.nostrProfileFormState,nostrProfileAccountId:e.nostrProfileAccountId,onRefresh:d=>xe(e,d),onWhatsAppStart:d=>e.handleWhatsAppStart(d),onWhatsAppWait:()=>e.handleWhatsAppWait(),onWhatsAppLogout:()=>e.handleWhatsAppLogout(),onConfigPatch:(d,v)=>fe(e,d,v),onConfigSave:()=>e.handleChannelConfigSave(),onConfigReload:()=>e.handleChannelConfigReload(),onNostrProfileEdit:(d,v)=>e.handleNostrProfileEdit(d,v),onNostrProfileCancel:()=>e.handleNostrProfileCancel(),onNostrProfileFieldChange:(d,v)=>e.handleNostrProfileFieldChange(d,v),onNostrProfileSave:()=>e.handleNostrProfileSave(),onNostrProfileImport:()=>e.handleNostrProfileImport(),onNostrProfileToggleAdvanced:()=>e.handleNostrProfileToggleAdvanced()}):m}

        ${e.tab==="instances"?kv({loading:e.presenceLoading,entries:e.presenceEntries,lastError:e.presenceError,statusMessage:e.presenceStatus,onRefresh:()=>Bi(e)}):m}

        ${e.tab==="sessions"?lm({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:d=>{e.sessionsFilterActive=d.activeMinutes,e.sessionsFilterLimit=d.limit,e.sessionsIncludeGlobal=d.includeGlobal,e.sessionsIncludeUnknown=d.includeUnknown},onRefresh:()=>Mt(e),onPatch:(d,v)=>td(e,d,v),onDelete:d=>nd(e,d)}):m}

        ${e.tab==="usage"?Ym({loading:e.usageLoading,error:e.usageError,startDate:e.usageStartDate,endDate:e.usageEndDate,sessions:e.usageResult?.sessions??[],sessionsLimitReached:(e.usageResult?.sessions?.length??0)>=1e3,totals:e.usageResult?.totals??null,aggregates:e.usageResult?.aggregates??null,costDaily:e.usageCostSummary?.daily??[],selectedSessions:e.usageSelectedSessions,selectedDays:e.usageSelectedDays,selectedHours:e.usageSelectedHours,chartMode:e.usageChartMode,dailyChartMode:e.usageDailyChartMode,timeSeriesMode:e.usageTimeSeriesMode,timeSeriesBreakdownMode:e.usageTimeSeriesBreakdownMode,timeSeries:e.usageTimeSeries,timeSeriesLoading:e.usageTimeSeriesLoading,sessionLogs:e.usageSessionLogs,sessionLogsLoading:e.usageSessionLogsLoading,sessionLogsExpanded:e.usageSessionLogsExpanded,logFilterRoles:e.usageLogFilterRoles,logFilterTools:e.usageLogFilterTools,logFilterHasTools:e.usageLogFilterHasTools,logFilterQuery:e.usageLogFilterQuery,query:e.usageQuery,queryDraft:e.usageQueryDraft,sessionSort:e.usageSessionSort,sessionSortDir:e.usageSessionSortDir,recentSessions:e.usageRecentSessions,sessionsTab:e.usageSessionsTab,visibleColumns:e.usageVisibleColumns,timeZone:e.usageTimeZone,contextExpanded:e.usageContextExpanded,headerPinned:e.usageHeaderPinned,onStartDateChange:d=>{e.usageStartDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],Qo(e)},onEndDateChange:d=>{e.usageEndDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],Qo(e)},onRefresh:()=>zi(e),onTimeZoneChange:d=>{e.usageTimeZone=d},onToggleContextExpanded:()=>{e.usageContextExpanded=!e.usageContextExpanded},onToggleSessionLogsExpanded:()=>{e.usageSessionLogsExpanded=!e.usageSessionLogsExpanded},onLogFilterRolesChange:d=>{e.usageLogFilterRoles=d},onLogFilterToolsChange:d=>{e.usageLogFilterTools=d},onLogFilterHasToolsChange:d=>{e.usageLogFilterHasTools=d},onLogFilterQueryChange:d=>{e.usageLogFilterQuery=d},onLogFilterClear:()=>{e.usageLogFilterRoles=[],e.usageLogFilterTools=[],e.usageLogFilterHasTools=!1,e.usageLogFilterQuery=""},onToggleHeaderPinned:()=>{e.usageHeaderPinned=!e.usageHeaderPinned},onSelectHour:(d,v)=>{if(v&&e.usageSelectedHours.length>0){const S=Array.from({length:24},(A,_)=>_),k=e.usageSelectedHours[e.usageSelectedHours.length-1],x=S.indexOf(k),C=S.indexOf(d);if(x!==-1&&C!==-1){const[A,_]=x<C?[x,C]:[C,x],T=S.slice(A,_+1);e.usageSelectedHours=[...new Set([...e.usageSelectedHours,...T])]}}else e.usageSelectedHours.includes(d)?e.usageSelectedHours=e.usageSelectedHours.filter(S=>S!==d):e.usageSelectedHours=[...e.usageSelectedHours,d]},onQueryDraftChange:d=>{e.usageQueryDraft=d,e.usageQueryDebounceTimer&&window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=window.setTimeout(()=>{e.usageQuery=e.usageQueryDraft,e.usageQueryDebounceTimer=null},250)},onApplyQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQuery=e.usageQueryDraft},onClearQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQueryDraft="",e.usageQuery=""},onSessionSortChange:d=>{e.usageSessionSort=d},onSessionSortDirChange:d=>{e.usageSessionSortDir=d},onSessionsTabChange:d=>{e.usageSessionsTab=d},onToggleColumn:d=>{e.usageVisibleColumns.includes(d)?e.usageVisibleColumns=e.usageVisibleColumns.filter(v=>v!==d):e.usageVisibleColumns=[...e.usageVisibleColumns,d]},onSelectSession:(d,v)=>{if(e.usageTimeSeries=null,e.usageSessionLogs=null,e.usageRecentSessions=[d,...e.usageRecentSessions.filter(S=>S!==d)].slice(0,8),v&&e.usageSelectedSessions.length>0){const S=e.usageChartMode==="tokens",x=[...e.usageResult?.sessions??[]].toSorted((T,I)=>{const K=S?T.usage?.totalTokens??0:T.usage?.totalCost??0;return(S?I.usage?.totalTokens??0:I.usage?.totalCost??0)-K}).map(T=>T.key),C=e.usageSelectedSessions[e.usageSelectedSessions.length-1],A=x.indexOf(C),_=x.indexOf(d);if(A!==-1&&_!==-1){const[T,I]=A<_?[A,_]:[_,A],K=x.slice(T,I+1),q=[...new Set([...e.usageSelectedSessions,...K])];e.usageSelectedSessions=q}}else e.usageSelectedSessions.length===1&&e.usageSelectedSessions[0]===d?e.usageSelectedSessions=[]:e.usageSelectedSessions=[d];e.usageSelectedSessions.length===1&&(bu(e,e.usageSelectedSessions[0]),yu(e,e.usageSelectedSessions[0]))},onSelectDay:(d,v)=>{if(v&&e.usageSelectedDays.length>0){const S=(e.usageCostSummary?.daily??[]).map(A=>A.date),k=e.usageSelectedDays[e.usageSelectedDays.length-1],x=S.indexOf(k),C=S.indexOf(d);if(x!==-1&&C!==-1){const[A,_]=x<C?[x,C]:[C,x],T=S.slice(A,_+1),I=[...new Set([...e.usageSelectedDays,...T])];e.usageSelectedDays=I}}else e.usageSelectedDays.includes(d)?e.usageSelectedDays=e.usageSelectedDays.filter(S=>S!==d):e.usageSelectedDays=[d]},onChartModeChange:d=>{e.usageChartMode=d},onDailyChartModeChange:d=>{e.usageDailyChartMode=d},onTimeSeriesModeChange:d=>{e.usageTimeSeriesMode=d},onTimeSeriesBreakdownChange:d=>{e.usageTimeSeriesBreakdownMode=d},onClearDays:()=>{e.usageSelectedDays=[]},onClearHours:()=>{e.usageSelectedHours=[]},onClearSessions:()=>{e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null},onClearFilters:()=>{e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null}}):m}

        ${e.tab==="cron"?hv({loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(d=>d.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:d=>e.cronForm={...e.cronForm,...d},onRefresh:()=>e.loadCron(),onAdd:()=>Td(e),onToggle:(d,v)=>_d(e,d,v),onRun:d=>Ed(e,d),onRemove:d=>Ld(e,d),onLoadRuns:d=>mr(e,d)}):m}

        ${e.tab==="agents"?Gg({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:f,activePanel:e.agentsPanel,configForm:h,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{await Mi(e);const d=e.agentsList?.agents?.map(v=>v.id)??[];d.length>0&&vr(e,d)},onSelectAgent:d=>{e.agentsSelectedId!==d&&(e.agentsSelectedId=d,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,hr(e,d),e.agentsPanel==="files"&&Es(e,d),e.agentsPanel==="skills"&&En(e,d))},onSelectPanel:d=>{e.agentsPanel=d,d==="files"&&f&&e.agentFilesList?.agentId!==f&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Es(e,f)),d==="skills"&&f&&En(e,f),d==="channels"&&xe(e,!1),d==="cron"&&e.loadCron()},onLoadFiles:d=>{(async()=>(await Es(e,d),e.agentFileActive&&await so(e,d,e.agentFileActive)))()},onSelectFile:d=>{e.agentFileActive=d,f&&so(e,f,d)},onFileDraftChange:(d,v)=>{e.agentFileDrafts={...e.agentFileDrafts,[d]:v}},onFileReset:d=>{const v=e.agentFileContents[d]??"";e.agentFileDrafts={...e.agentFileDrafts,[d]:v}},onFileSave:d=>{if(!f)return;const v=e.agentFileDrafts[d]??e.agentFileContents[d]??"";Eg(e,f,d,v)},onToolsProfileChange:(d,v,S)=>{if(!h)return;const k=h.agents?.list;if(!Array.isArray(k))return;const x=k.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(x<0)return;const C=["agents","list",x,"tools"];v?fe(e,[...C,"profile"],v):Ue(e,[...C,"profile"]),S&&Ue(e,[...C,"allow"])},onToolsOverridesChange:(d,v,S)=>{if(!h)return;const k=h.agents?.list;if(!Array.isArray(k))return;const x=k.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(x<0)return;const C=["agents","list",x,"tools"];v.length>0?fe(e,[...C,"alsoAllow"],v):Ue(e,[...C,"alsoAllow"]),S.length>0?fe(e,[...C,"deny"],S):Ue(e,[...C,"deny"])},onConfigReload:()=>Ee(e),onConfigSave:()=>_n(e),onChannelsRefresh:()=>xe(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:d=>e.skillsFilter=d,onSkillsRefresh:()=>{f&&En(e,f)},onAgentSkillToggle:(d,v,S)=>{if(!h)return;const k=h.agents?.list;if(!Array.isArray(k))return;const x=k.findIndex(q=>q&&typeof q=="object"&&"id"in q&&q.id===d);if(x<0)return;const C=k[x],A=v.trim();if(!A)return;const _=e.agentSkillsReport?.skills?.map(q=>q.name).filter(Boolean)??[],I=(Array.isArray(C.skills)?C.skills.map(q=>String(q).trim()).filter(Boolean):void 0)??_,K=new Set(I);S?K.add(A):K.delete(A),fe(e,["agents","list",x,"skills"],[...K])},onAgentSkillsClear:d=>{if(!h)return;const v=h.agents?.list;if(!Array.isArray(v))return;const S=v.findIndex(k=>k&&typeof k=="object"&&"id"in k&&k.id===d);S<0||Ue(e,["agents","list",S,"skills"])},onAgentSkillsDisableAll:d=>{if(!h)return;const v=h.agents?.list;if(!Array.isArray(v))return;const S=v.findIndex(k=>k&&typeof k=="object"&&"id"in k&&k.id===d);S<0||fe(e,["agents","list",S,"skills"],[])},onModelChange:(d,v)=>{if(!h)return;const k=(h.agents||{}).list||[],x=k.findIndex(T=>T&&typeof T=="object"&&"id"in T&&T.id===d);if(x<0){if(!v)return;fe(e,["agents","list",k.length],{id:d,model:v,memorySearch:{enabled:!1},heartbeat:{every:"1h"},identity:{name:d,avatar:""},groupChat:{},tools:{profile:"minimal"},sandbox:{}});return}const C=["agents","list",x,"model"];if(!v){Ue(e,C);return}const _=k[x]?.model;if(_&&typeof _=="object"&&!Array.isArray(_)){const T=_.fallbacks;fe(e,C,{primary:v,...Array.isArray(T)?{fallbacks:T}:{}});return}fe(e,C,v)},onModelFallbacksChange:(d,v)=>{if(!h)return;const k=(h.agents||{}).list||[];let x=k.findIndex(W=>W&&typeof W=="object"&&"id"in W&&W.id===d);if(x<0){const W=v.map(D=>D.trim()).filter(Boolean);if(W.length===0)return;x=k.length,fe(e,["agents","list",x],{id:d,model:{fallbacks:W},memorySearch:{enabled:!1},heartbeat:{every:"1h"},identity:{name:d,avatar:""},groupChat:{},tools:{profile:"minimal"},sandbox:{}});return}const C=["agents","list",x,"model"],A=k[x],_=v.map(W=>W.trim()).filter(Boolean),T=A.model,K=(()=>{if(typeof T=="string")return T.trim()||null;if(T&&typeof T=="object"&&!Array.isArray(T)){const W=T.primary;if(typeof W=="string")return W.trim()||null}return null})();if(_.length===0){K?fe(e,C,K):Ue(e,C);return}fe(e,C,K?{primary:K,fallbacks:_}:{fallbacks:_})}}):m}

        ${e.tab==="skills"?um({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:d=>e.skillsFilter=d,onRefresh:()=>on(e,{clearMessages:!0}),onToggle:(d,v)=>hu(e,d,v),onEdit:(d,v)=>fu(e,d,v),onSaveKey:d=>vu(e,d),onInstall:(d,v,S)=>mu(e,d,v,S)}):m}

        ${e.tab==="nodes"?_v({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??e.configSnapshot?.config,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>Qn(e),onDevicesRefresh:()=>Xe(e),onDeviceApprove:d=>iu(e,d),onDeviceReject:d=>au(e,d),onDeviceRotate:(d,v,S)=>ou(e,{deviceId:d,role:v,scopes:S}),onDeviceRevoke:(d,v)=>ru(e,{deviceId:d,role:v}),onLoadConfig:()=>Ee(e),onLoadExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Ni(e,d)},onBindDefault:d=>{d?fe(e,["tools","exec","node"],d):Ue(e,["tools","exec","node"])},onBindAgent:(d,v)=>{const S=["agents","list",d,"tools","exec","node"];v?fe(e,S,v):Ue(e,S)},onSaveBindings:()=>_n(e),onExecApprovalsTargetChange:(d,v)=>{e.execApprovalsTarget=d,e.execApprovalsTargetNodeId=v,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:d=>{e.execApprovalsSelectedAgent=d},onExecApprovalsPatch:(d,v)=>gu(e,d,v),onExecApprovalsRemove:d=>pu(e,d),onSaveExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return uu(e,d)}}):m}

        ${e.tab==="chat"?ov({sessionKey:e.sessionKey,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),Jt(e),ti(e)},thinkingLevel:e.chatThinkingLevel,showThinking:l,loading:e.chatLoading,sending:e.chatSending,assistantAvatarUrl:u,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:null,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:i,error:e.lastError,sessions:e.sessionsResult,focusMode:o,onRefresh:()=>Promise.all([Jt(e),ti(e)]),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:d=>e.handleChatScroll(d),onDraftChange:d=>e.chatMessage=d,attachments:e.chatAttachments,onAttachmentsChange:d=>e.chatAttachments=d,onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>{e.handleAbortChat()},onQueueRemove:d=>e.removeQueuedMessage(d),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:d=>e.handleOpenSidebar(d),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:d=>e.handleSplitRatioChange(d),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):m}

        ${e.tab==="config"?gv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:d=>{e.configRaw=d},onFormModeChange:d=>e.configFormMode=d,onFormPatch:(d,v)=>fe(e,d,v),onSearchChange:d=>e.configSearchQuery=d,onSectionChange:d=>{e.configActiveSection=d,e.configActiveSubsection=null},onSubsectionChange:d=>e.configActiveSubsection=d,onReload:()=>Ee(e),onSave:()=>_n(e),onApply:()=>kc(e),onUpdate:()=>Sc(e)}):m}

        ${e.tab==="debug"?yv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:d=>e.debugCallMethod=d,onCallParamsChange:d=>e.debugCallParams=d,onRefresh:()=>Yn(e),onCall:()=>wd(e)}):m}

        ${e.tab==="logs"?Tv({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:d=>e.logsFilterText=d,onLevelToggle:(d,v)=>{e.logsLevelFilters={...e.logsLevelFilters,[d]:v}},onToggleAutoFollow:d=>e.logsAutoFollow=d,onRefresh:()=>Ci(e,{reset:!0}),onExport:(d,v)=>e.exportLogs(d,v),onScroll:d=>e.handleLogsScroll(d)}):m}
      </main>
      ${$v(e)}
      ${wv(e)}
    </div>
  `}var tb=Object.defineProperty,nb=Object.getOwnPropertyDescriptor,$=(e,t,n,s)=>{for(var i=s>1?void 0:s?nb(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(s?o(t,n,i):o(i))||i);return s&&i&&tb(t,n,i),i};const Ks=ag();function sb(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let y=class extends Ct{constructor(){super(...arguments),this.settings=Su(),this.password="",this.tab="chat",this.onboarding=sb(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=Ks.name,this.assistantAvatar=Ks.avatar,this.assistantAgentId=Ks.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatModels=[],this.chatModelsLoading=!1,this.chatDefaultModel=null,this.chatDefaultProvider=null,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileActive=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsReport=null,this.agentSkillsError=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageStartDate=(()=>{const e=new Date;return e.setDate(e.getDate()-30),`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...Gu},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Vu},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Ou(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),ug(this)}firstUpdated(){gg(this)}disconnectedCallback(){pg(this),super.disconnectedCallback()}updated(e){fg(this,e)}connect(){Xr(this)}handleChatScroll(e){pd(this,e)}handleLogsScroll(e){fd(this,e)}exportLogs(e,t){hd(e,t)}resetToolStream(){Ai(this)}resetChatScroll(){Ka(this)}scrollToBottom(){Ka(this),sn(this,!0)}async loadAssistantIdentity(){await Zr(this)}applySettings(e){Ye(this,e)}setTab(e){Lu(this,e)}setTheme(e,t){Mu(this,e,t)}async loadOverview(){await Kr(this)}async loadCron(){await On(this)}async handleAbortChat(){await Wr(this)}async handleModelSwitch(e){await this.handleSendChat(`/model ${e}`)}removeQueuedMessage(e){Hu(this,e)}async handleSendChat(e,t){await Ku(this,e,t)}async handleWhatsAppStart(e){await _c(this,e)}async handleWhatsAppWait(){await Ec(this)}async handleWhatsAppLogout(){await Lc(this)}async handleChannelConfigSave(){await Mc(this)}async handleChannelConfigReload(){await Ic(this)}handleNostrProfileEdit(e,t){Dc(this,e,t)}handleNostrProfileCancel(){Fc(this)}handleNostrProfileFieldChange(e,t){Oc(this,e,t)}async handleNostrProfileSave(){await Bc(this)}async handleNostrProfileImport(){await zc(this)}handleNostrProfileToggleAdvanced(){Nc(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,Ye(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return eb(this)}};$([w()],y.prototype,"settings",2);$([w()],y.prototype,"password",2);$([w()],y.prototype,"tab",2);$([w()],y.prototype,"onboarding",2);$([w()],y.prototype,"connected",2);$([w()],y.prototype,"theme",2);$([w()],y.prototype,"themeResolved",2);$([w()],y.prototype,"hello",2);$([w()],y.prototype,"lastError",2);$([w()],y.prototype,"eventLog",2);$([w()],y.prototype,"assistantName",2);$([w()],y.prototype,"assistantAvatar",2);$([w()],y.prototype,"assistantAgentId",2);$([w()],y.prototype,"sessionKey",2);$([w()],y.prototype,"chatLoading",2);$([w()],y.prototype,"chatSending",2);$([w()],y.prototype,"chatMessage",2);$([w()],y.prototype,"chatMessages",2);$([w()],y.prototype,"chatToolMessages",2);$([w()],y.prototype,"chatStream",2);$([w()],y.prototype,"chatStreamStartedAt",2);$([w()],y.prototype,"chatRunId",2);$([w()],y.prototype,"compactionStatus",2);$([w()],y.prototype,"chatAvatarUrl",2);$([w()],y.prototype,"chatThinkingLevel",2);$([w()],y.prototype,"chatQueue",2);$([w()],y.prototype,"chatAttachments",2);$([w()],y.prototype,"chatModels",2);$([w()],y.prototype,"chatModelsLoading",2);$([w()],y.prototype,"chatDefaultModel",2);$([w()],y.prototype,"chatDefaultProvider",2);$([w()],y.prototype,"sidebarOpen",2);$([w()],y.prototype,"sidebarContent",2);$([w()],y.prototype,"sidebarError",2);$([w()],y.prototype,"splitRatio",2);$([w()],y.prototype,"nodesLoading",2);$([w()],y.prototype,"nodes",2);$([w()],y.prototype,"devicesLoading",2);$([w()],y.prototype,"devicesError",2);$([w()],y.prototype,"devicesList",2);$([w()],y.prototype,"execApprovalsLoading",2);$([w()],y.prototype,"execApprovalsSaving",2);$([w()],y.prototype,"execApprovalsDirty",2);$([w()],y.prototype,"execApprovalsSnapshot",2);$([w()],y.prototype,"execApprovalsForm",2);$([w()],y.prototype,"execApprovalsSelectedAgent",2);$([w()],y.prototype,"execApprovalsTarget",2);$([w()],y.prototype,"execApprovalsTargetNodeId",2);$([w()],y.prototype,"execApprovalQueue",2);$([w()],y.prototype,"execApprovalBusy",2);$([w()],y.prototype,"execApprovalError",2);$([w()],y.prototype,"pendingGatewayUrl",2);$([w()],y.prototype,"configLoading",2);$([w()],y.prototype,"configRaw",2);$([w()],y.prototype,"configRawOriginal",2);$([w()],y.prototype,"configValid",2);$([w()],y.prototype,"configIssues",2);$([w()],y.prototype,"configSaving",2);$([w()],y.prototype,"configApplying",2);$([w()],y.prototype,"updateRunning",2);$([w()],y.prototype,"applySessionKey",2);$([w()],y.prototype,"configSnapshot",2);$([w()],y.prototype,"configSchema",2);$([w()],y.prototype,"configSchemaVersion",2);$([w()],y.prototype,"configSchemaLoading",2);$([w()],y.prototype,"configUiHints",2);$([w()],y.prototype,"configForm",2);$([w()],y.prototype,"configFormOriginal",2);$([w()],y.prototype,"configFormDirty",2);$([w()],y.prototype,"configFormMode",2);$([w()],y.prototype,"configSearchQuery",2);$([w()],y.prototype,"configActiveSection",2);$([w()],y.prototype,"configActiveSubsection",2);$([w()],y.prototype,"channelsLoading",2);$([w()],y.prototype,"channelsSnapshot",2);$([w()],y.prototype,"channelsError",2);$([w()],y.prototype,"channelsLastSuccess",2);$([w()],y.prototype,"whatsappLoginMessage",2);$([w()],y.prototype,"whatsappLoginQrDataUrl",2);$([w()],y.prototype,"whatsappLoginConnected",2);$([w()],y.prototype,"whatsappBusy",2);$([w()],y.prototype,"nostrProfileFormState",2);$([w()],y.prototype,"nostrProfileAccountId",2);$([w()],y.prototype,"presenceLoading",2);$([w()],y.prototype,"presenceEntries",2);$([w()],y.prototype,"presenceError",2);$([w()],y.prototype,"presenceStatus",2);$([w()],y.prototype,"agentsLoading",2);$([w()],y.prototype,"agentsList",2);$([w()],y.prototype,"agentsError",2);$([w()],y.prototype,"agentsSelectedId",2);$([w()],y.prototype,"agentsPanel",2);$([w()],y.prototype,"agentFilesLoading",2);$([w()],y.prototype,"agentFilesError",2);$([w()],y.prototype,"agentFilesList",2);$([w()],y.prototype,"agentFileActive",2);$([w()],y.prototype,"agentFileContents",2);$([w()],y.prototype,"agentFileDrafts",2);$([w()],y.prototype,"agentFileSaving",2);$([w()],y.prototype,"agentIdentityLoading",2);$([w()],y.prototype,"agentIdentityError",2);$([w()],y.prototype,"agentIdentityById",2);$([w()],y.prototype,"agentSkillsLoading",2);$([w()],y.prototype,"agentSkillsReport",2);$([w()],y.prototype,"agentSkillsError",2);$([w()],y.prototype,"agentSkillsAgentId",2);$([w()],y.prototype,"sessionsLoading",2);$([w()],y.prototype,"sessionsResult",2);$([w()],y.prototype,"sessionsError",2);$([w()],y.prototype,"sessionsFilterActive",2);$([w()],y.prototype,"sessionsFilterLimit",2);$([w()],y.prototype,"sessionsIncludeGlobal",2);$([w()],y.prototype,"sessionsIncludeUnknown",2);$([w()],y.prototype,"usageLoading",2);$([w()],y.prototype,"usageResult",2);$([w()],y.prototype,"usageCostSummary",2);$([w()],y.prototype,"usageError",2);$([w()],y.prototype,"usageStartDate",2);$([w()],y.prototype,"usageEndDate",2);$([w()],y.prototype,"usageSelectedSessions",2);$([w()],y.prototype,"usageSelectedDays",2);$([w()],y.prototype,"usageSelectedHours",2);$([w()],y.prototype,"usageChartMode",2);$([w()],y.prototype,"usageDailyChartMode",2);$([w()],y.prototype,"usageTimeSeriesMode",2);$([w()],y.prototype,"usageTimeSeriesBreakdownMode",2);$([w()],y.prototype,"usageTimeSeries",2);$([w()],y.prototype,"usageTimeSeriesLoading",2);$([w()],y.prototype,"usageSessionLogs",2);$([w()],y.prototype,"usageSessionLogsLoading",2);$([w()],y.prototype,"usageSessionLogsExpanded",2);$([w()],y.prototype,"usageQuery",2);$([w()],y.prototype,"usageQueryDraft",2);$([w()],y.prototype,"usageSessionSort",2);$([w()],y.prototype,"usageSessionSortDir",2);$([w()],y.prototype,"usageRecentSessions",2);$([w()],y.prototype,"usageTimeZone",2);$([w()],y.prototype,"usageContextExpanded",2);$([w()],y.prototype,"usageHeaderPinned",2);$([w()],y.prototype,"usageSessionsTab",2);$([w()],y.prototype,"usageVisibleColumns",2);$([w()],y.prototype,"usageLogFilterRoles",2);$([w()],y.prototype,"usageLogFilterTools",2);$([w()],y.prototype,"usageLogFilterHasTools",2);$([w()],y.prototype,"usageLogFilterQuery",2);$([w()],y.prototype,"cronLoading",2);$([w()],y.prototype,"cronJobs",2);$([w()],y.prototype,"cronStatus",2);$([w()],y.prototype,"cronError",2);$([w()],y.prototype,"cronForm",2);$([w()],y.prototype,"cronRunsJobId",2);$([w()],y.prototype,"cronRuns",2);$([w()],y.prototype,"cronBusy",2);$([w()],y.prototype,"skillsLoading",2);$([w()],y.prototype,"skillsReport",2);$([w()],y.prototype,"skillsError",2);$([w()],y.prototype,"skillsFilter",2);$([w()],y.prototype,"skillEdits",2);$([w()],y.prototype,"skillsBusyKey",2);$([w()],y.prototype,"skillMessages",2);$([w()],y.prototype,"debugLoading",2);$([w()],y.prototype,"debugStatus",2);$([w()],y.prototype,"debugHealth",2);$([w()],y.prototype,"debugModels",2);$([w()],y.prototype,"debugHeartbeat",2);$([w()],y.prototype,"debugCallMethod",2);$([w()],y.prototype,"debugCallParams",2);$([w()],y.prototype,"debugCallResult",2);$([w()],y.prototype,"debugCallError",2);$([w()],y.prototype,"logsLoading",2);$([w()],y.prototype,"logsError",2);$([w()],y.prototype,"logsFile",2);$([w()],y.prototype,"logsEntries",2);$([w()],y.prototype,"logsFilterText",2);$([w()],y.prototype,"logsLevelFilters",2);$([w()],y.prototype,"logsAutoFollow",2);$([w()],y.prototype,"logsTruncated",2);$([w()],y.prototype,"logsCursor",2);$([w()],y.prototype,"logsLastFetchAt",2);$([w()],y.prototype,"logsLimit",2);$([w()],y.prototype,"logsMaxBytes",2);$([w()],y.prototype,"logsAtBottom",2);$([w()],y.prototype,"chatNewMessagesBelow",2);y=$([ir("openclaw-app")],y);
//# sourceMappingURL=index-CObyKZDx.js.map

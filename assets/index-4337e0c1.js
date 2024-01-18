var Bu=Object.defineProperty;var Du=(t,e,r)=>e in t?Bu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var f=(t,e,r)=>(Du(t,typeof e!="symbol"?e+"":e,r),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();const He=22,pi=9,wo=7,To=2**He,Et=To-1,en=2**pi,tn=en-1,Wo=2**wo,Uu=Wo-1;class L extends Error{constructor(e){super(`Internal error: ${e}. Please report a bug!`)}}class b extends Error{}const xa=new TextEncoder,Fs=new TextDecoder;function Ce(t){throw new b(`Component is not writable; use entity.write(${t.type.name}) to acquire a writable version`)}function B(t,e){if(t.__invalid)throw new b(`Component instance for ${e.type.name} is no longer valid, as you already bound it to another entity`)}class M{constructor(e,r=!0){f(this,"defaultValue");f(this,"shared");this.defaultValue=e,this.shared=r}get internallyIndexed(){return!1}}f(M,"boolean"),f(M,"uint8"),f(M,"int8"),f(M,"uint16"),f(M,"int16"),f(M,"uint32"),f(M,"int32"),f(M,"float32"),f(M,"float64"),f(M,"vector"),f(M,"staticString"),f(M,"dynamicString"),f(M,"object"),f(M,"weakObject"),f(M,"ref"),f(M,"backrefs");class Fu extends M{constructor(){super(!1)}defineElastic(e,r){const i=`component.${e.type.id}.field.${r.seq}`;let s;r.updateBuffer=()=>{e.dispatcher.buffers.register(i,e.capacity,Uint8Array,n=>{s=n})},r.updateBuffer(),Object.defineProperty(e.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),!!s[e.writableIndex]},set(n){B(this,e),s[e.writableIndex]=n?1:0}}),Object.defineProperty(e.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),!!s[e.readonlyIndex]},set(n){Ce(e)}})}defineFixed(e,r){const i=`component.${e.type.id}.field.${r.seq}`,s=e.dispatcher.buffers.register(i,e.capacity,Uint8Array);Object.defineProperty(e.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),!!s[e.writableIndex]},set(n){B(this,e),s[e.writableIndex]=n?1:0}}),Object.defineProperty(e.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),!!s[e.readonlyIndex]},set(n){Ce(e)}})}}class Hr extends M{constructor(r){super(0);f(this,"NumberArray");this.NumberArray=r}defineElastic(r,i){const s=`component.${r.type.id}.field.${i.seq}`;let n;i.updateBuffer=()=>{r.dispatcher.buffers.register(s,r.capacity,this.NumberArray,o=>{n=o})},i.updateBuffer(),Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),n[r.writableIndex]},set(o){B(this,r),n[r.writableIndex]=o}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),n[r.readonlyIndex]},set(o){Ce(r)}})}defineFixed(r,i){const s=`component.${r.type.id}.field.${i.seq}`,n=r.dispatcher.buffers.register(s,r.capacity,this.NumberArray);Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),n[r.writableIndex]},set(o){B(this,r),n[r.writableIndex]=o}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),n[r.readonlyIndex]},set(o){Ce(r)}})}}class Lu extends M{constructor(r,i,s){super(new Array(typeof i=="number"?i:i.length).fill(0));f(this,"type");f(this,"Class");f(this,"stride");f(this,"elementNames");this.type=r,this.Class=s,typeof i=="number"?this.stride=i:(this.stride=i.length,this.elementNames=i)}get internallyIndexed(){return!0}defineElastic(r,i){var m;const s=this.stride,n=this.elementNames,o=`component.${r.type.id}.field.${i.seq}`;let a,l=0,c=0;i.updateBuffer=()=>{r.dispatcher.buffers.register(o,r.capacity*s,this.type.NumberArray,E=>{a=E})},i.updateBuffer();const u={value:void 0,done:!0,next(){return l<s?(this.done=!1,this.value=a[r.writableIndex*s+l],l+=1):(this.done=!0,this.value=void 0),this}},h={value:void 0,done:!0,next(){return c<s?(this.done=!1,this.value=a[r.readonlyIndex*s+c],c+=1):(this.done=!0,this.value=void 0),this}},_=this.Class?new this.Class:{},p=this.Class?new this.Class:{};Object.defineProperty(_,"length",{value:s}),Object.defineProperty(p,"length",{value:s}),this.Class&&"asTypedArray"in this.Class.prototype||(Object.defineProperty(_,"asTypedArray",{value(){return B(this.__becsyComponent,r),a.subarray(r.writableIndex*s,(r.writableIndex+1)*s)}}),Object.defineProperty(p,"asTypedArray",{value(){return B(this.__becsyComponent,r),a.subarray(r.readonlyIndex*s,(r.readonlyIndex+1)*s)}})),Object.defineProperty(_,Symbol.iterator,{value(){return B(this.__becsyComponent,r),l=0,u}}),Object.defineProperty(p,Symbol.iterator,{value(){return B(this.__becsyComponent,r),c=0,h}}),Object.defineProperty(_,"__becsyComponent",{value:void 0,writable:!0}),Object.defineProperty(p,"__becsyComponent",{value:void 0,writable:!0});let d=Object.create(_);Object.seal(d);let g=Object.create(p);Object.seal(g);for(let E=0;E<this.stride;E++)Object.defineProperty(_,`${E}`,{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.writableIndex*s+E]},set(A){B(this.__becsyComponent,r),a[r.writableIndex*s+E]=A}}),Object.defineProperty(p,`${E}`,{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.readonlyIndex*s+E]},set(A){Ce(r)}}),(m=this.elementNames)!=null&&m[E]&&(Object.defineProperty(_,this.elementNames[E],{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.writableIndex*s+E]},set(A){B(this.__becsyComponent,r),a[r.writableIndex*s+E]=A}}),Object.defineProperty(p,this.elementNames[E],{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.readonlyIndex*s+E]},set(A){Ce(r)}}));Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),d=Object.create(_),d.__becsyComponent=this,Object.seal(d),d},set(E){if(B(this,r),E.length){if(E.length!==s)throw new b(`Value of length ${E.length} doesn't match vector of length ${s}`);for(let A=0;A<s;A++)a[r.writableIndex*s+A]=E[A]}else{if(!n)throw new b(`Value assigned to ${r.type.name}.${i.name} must be an array`);for(let A=0;A<s;A++){if(typeof E[n[A]]!="number")throw new b(`Value assigned to ${r.type.name}.${i.name} is missing element "${n[A]}`);a[r.writableIndex*s+A]=E[n[A]]}}}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),g=Object.create(p),g.__becsyComponent=this,Object.seal(g),g},set(E){Ce(r)}})}defineFixed(r,i){var m;const s=this.stride,n=this.elementNames,o=`component.${r.type.id}.field.${i.seq}`,a=r.dispatcher.buffers.register(o,r.capacity*s,this.type.NumberArray);let l=0,c=0;const u={value:void 0,done:!0,next(){return l<s?(this.done=!1,this.value=a[r.writableIndex*s+l],l+=1):(this.done=!0,this.value=void 0),this}},h={value:void 0,done:!0,next(){return c<s?(this.done=!1,this.value=a[r.readonlyIndex*s+c],c+=1):(this.done=!0,this.value=void 0),this}},_=this.Class?new this.Class:{},p=this.Class?new this.Class:{};Object.defineProperty(_,"length",{value:s}),Object.defineProperty(p,"length",{value:s}),this.Class&&"asTypedArray"in this.Class.prototype||(Object.defineProperty(_,"asTypedArray",{value(){return B(this.__becsyComponent,r),a.subarray(r.writableIndex*s,(r.writableIndex+1)*s)}}),Object.defineProperty(p,"asTypedArray",{value(){return B(this.__becsyComponent,r),a.subarray(r.readonlyIndex*s,(r.readonlyIndex+1)*s)}})),Object.defineProperty(_,Symbol.iterator,{value(){return B(this.__becsyComponent,r),l=0,u}}),Object.defineProperty(p,Symbol.iterator,{value(){return B(this.__becsyComponent,r),c=0,h}}),Object.defineProperty(_,"__becsyComponent",{value:void 0,writable:!0}),Object.defineProperty(p,"__becsyComponent",{value:void 0,writable:!0});let d=Object.create(_);Object.seal(d);let g=Object.create(p);Object.seal(g);for(let E=0;E<this.stride;E++)Object.defineProperty(_,`${E}`,{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.writableIndex*s+E]},set(A){B(this.__becsyComponent,r),a[r.writableIndex*s+E]=A}}),Object.defineProperty(p,`${E}`,{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.readonlyIndex*s+E]},set(A){Ce(r)}}),(m=this.elementNames)!=null&&m[E]&&(Object.defineProperty(_,this.elementNames[E],{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.writableIndex*s+E]},set(A){B(this.__becsyComponent,r),a[r.writableIndex*s+E]=A}}),Object.defineProperty(p,this.elementNames[E],{enumerable:!0,get(){return B(this.__becsyComponent,r),a[r.readonlyIndex*s+E]},set(A){Ce(r)}}));Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),d=Object.create(_),d.__becsyComponent=this,Object.seal(d),d},set(E){if(B(this,r),E.length){if(E.length!==s)throw new b(`Value of length ${E.length} doesn't match vector of length ${s}`);for(let A=0;A<s;A++)a[r.writableIndex*s+A]=E[A]}else{if(!n)throw new b(`Value assigned to ${r.type.name}.${i.name} must be an array`);for(let A=0;A<s;A++){if(typeof E[n[A]]!="number")throw new b(`Value assigned to ${r.type.name}.${i.name} is missing element "${n[A]}`);a[r.writableIndex*s+A]=E[n[A]]}}}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){return B(this,r),g=Object.create(p),g.__becsyComponent=this,Object.seal(g),g},set(E){Ce(r)}})}}class zu extends M{constructor(r){super(r[0]);f(this,"choices");f(this,"choicesIndex",new Map);f(this,"TypedArray");if(this.choices=r,!(r!=null&&r.length))throw new b("No choices specified for Type.staticString");r.length<256?this.TypedArray=Uint8Array:r.length<65536?this.TypedArray=Uint16Array:this.TypedArray=Uint32Array;for(let i=0;i<r.length;i++)this.choicesIndex.set(r[i],i)}defineElastic(r,i){const s=`component.${r.type.id}.field.${i.seq}`;let n;const o=this.choices,a=this.choicesIndex;i.updateBuffer=()=>{r.dispatcher.buffers.register(s,r.capacity,this.TypedArray,l=>{n=l})},i.updateBuffer(),Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const l=n[r.writableIndex],c=o[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){B(this,r);const c=a.get(l);if(c===void 0)throw new b(`Static string not in set: "${l}"`);n[r.writableIndex]=c}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const l=n[r.readonlyIndex],c=o[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){Ce(r)}})}defineFixed(r,i){const s=`component.${r.type.id}.field.${i.seq}`,n=this.choices,o=this.choicesIndex,a=r.dispatcher.buffers.register(s,r.capacity,this.TypedArray);Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const l=a[r.writableIndex],c=n[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){B(this,r);const c=o.get(l);if(c===void 0)throw new b(`Static string not in set: "${l}"`);a[r.writableIndex]=c}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const l=a[r.readonlyIndex],c=n[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){Ce(r)}})}}class Vu extends M{constructor(r){super("");f(this,"maxUtf8Length");f(this,"lengthsStride");f(this,"bytesStride");this.maxUtf8Length=r+r%2,this.bytesStride=this.maxUtf8Length+2,this.lengthsStride=this.bytesStride/2}defineElastic(r,i){const s=`component.${r.type.id}.field.${i.seq}`;let n,o;const a=this.maxUtf8Length,l=this.lengthsStride,c=this.bytesStride;i.updateBuffer=()=>{const u=r.capacity*(this.maxUtf8Length+Uint16Array.BYTES_PER_ELEMENT);r.dispatcher.buffers.register(s,u,Uint8Array,h=>{o=h,n=new Uint16Array(o.buffer)})},i.updateBuffer(),Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const u=n[r.writableIndex*l];return Fs.decode(new Uint8Array(o.buffer,r.writableIndex*c+2,u))},set(u){B(this,r);const h=xa.encode(u);if(h.byteLength>a)throw new b(`Dynamic string length > ${a} after encoding: ${u}`);n[r.writableIndex*l]=h.byteLength,o.set(h,r.writableIndex*c+2)}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const u=n[r.readonlyIndex*l];return Fs.decode(new Uint8Array(o.buffer,r.readonlyIndex*c+2,u))},set(u){Ce(r)}})}defineFixed(r,i){const s=`component.${r.type.id}.field.${i.seq}`,n=this.maxUtf8Length,o=this.lengthsStride,a=this.bytesStride,l=r.capacity*(this.maxUtf8Length+Uint16Array.BYTES_PER_ELEMENT),c=r.dispatcher.buffers.register(s,l,Uint8Array),u=new Uint16Array(c.buffer);Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const h=u[r.writableIndex*o];return Fs.decode(new Uint8Array(c.buffer,r.writableIndex*a+2,h))},set(h){B(this,r);const _=xa.encode(h);if(_.byteLength>n)throw new b(`Dynamic string length > ${n} after encoding: ${h}`);u[r.writableIndex*o]=_.byteLength,c.set(_,r.writableIndex*a+2)}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const h=u[r.readonlyIndex*o];return Fs.decode(new Uint8Array(c.buffer,r.readonlyIndex*a+2,h))},set(h){Ce(r)}})}}const Kt=2**31;class Hu extends M{constructor(){super(void 0)}defineElastic(e,r){const i=`component.${e.type.id}.field.${r.seq}`;let s;const n=e.dispatcher.indexer,o=e.dispatcher.registry,a=o.pool;n.registerSelector(),r.updateBuffer=()=>{e.dispatcher.buffers.register(i,e.capacity,Int32Array,l=>{s=l},-1)},r.updateBuffer(),r.clearRef=(l,c,u)=>{if(u)throw new L("Ref fields have no internal index");if(s[e.writableIndex]===-1)return;const h=(s[e.writableIndex]&Kt)!==0;if(h&&!l)return;if(!h&&l)throw new L("Wrong ref stale state");const _=s[e.writableIndex]&Et;c!==void 0&&_!==c||(l?s[e.writableIndex]=-1:s[e.writableIndex]|=Kt,n.trackRefChange(e.writableEntityId,e.type,r.seq,void 0,_,-1,!l,l))},Object.defineProperty(e.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){B(this,e);const l=s[e.writableIndex];if(!(l===-1||l&Kt&&!o.includeRecentlyDeleted))return a.borrowTemporarily(l&Et)},set(l){if(B(this,e),l&&!o.hasShape(l.__id,o.Alive,!1))throw new b("Referencing a deleted entity is not allowed");let c=s[e.writableIndex];c!==-1&&(c=c&Et);const u=c!==-1&&!!(s[e.writableIndex]&Kt),h=(l==null?void 0:l.__id)??-1;c===h&&!u||(s[e.writableIndex]=h,n.trackRefChange(e.writableEntityId,e.type,r.seq,void 0,c,h,!u,!0))}}),Object.defineProperty(e.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){B(this,e);const l=s[e.readonlyIndex];if(!(l===-1||l&Kt&&!o.includeRecentlyDeleted))return a.borrowTemporarily(l&Et)},set(l){Ce(e)}})}defineFixed(e,r){const i=`component.${e.type.id}.field.${r.seq}`,s=e.dispatcher.buffers.register(i,e.capacity,Int32Array,void 0,-1),n=e.dispatcher.indexer,o=e.dispatcher.registry,a=o.pool;n.registerSelector(),r.clearRef=(l,c,u)=>{if(u)throw new L("Ref fields have no internal index");if(s[e.writableIndex]===-1)return;const h=(s[e.writableIndex]&Kt)!==0;if(h&&!l)return;if(!h&&l)throw new L("Wrong ref stale state");const _=s[e.writableIndex]&Et;c!==void 0&&_!==c||(l?s[e.writableIndex]=-1:s[e.writableIndex]|=Kt,n.trackRefChange(e.writableEntityId,e.type,r.seq,void 0,_,-1,!l,l))},Object.defineProperty(e.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){B(this,e);const l=s[e.writableIndex];if(!(l===-1||l&Kt&&!o.includeRecentlyDeleted))return a.borrowTemporarily(l&Et)},set(l){if(B(this,e),l&&!o.hasShape(l.__id,o.Alive,!1))throw new b("Referencing a deleted entity is not allowed");let c=s[e.writableIndex];c!==-1&&(c=c&Et);const u=c!==-1&&!!(s[e.writableIndex]&Kt),h=(l==null?void 0:l.__id)??-1;c===h&&!u||(s[e.writableIndex]=h,n.trackRefChange(e.writableEntityId,e.type,r.seq,void 0,c,h,!u,!0))}}),Object.defineProperty(e.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){B(this,e);const l=s[e.readonlyIndex];if(!(l===-1||l&Kt&&!o.includeRecentlyDeleted))return a.borrowTemporarily(l&Et)},set(l){Ce(e)}})}}const Ai=[];class ku extends M{constructor(r,i,s){super(Ai);f(this,"type");f(this,"fieldName");f(this,"trackDeletedBackrefs");this.type=r,this.fieldName=i,this.trackDeletedBackrefs=s}defineElastic(r,i){var l;i.updateBuffer=()=>{};const s=this.fieldName?(l=this.type)==null?void 0:l.__binding.fields.find(c=>c.name===this.fieldName):void 0;{if(this.fieldName&&!s)throw new b(`Backrefs field ${r.type.name}.${i.name} refers to an unknown field ${this.type.name}.${this.fieldName}`);if(s&&s.type!==M.ref)throw new b(`Backrefs field ${r.type.name}.${i.name} refers to a field ${this.type.name}.${this.fieldName} that is not a ref`);if(this.fieldName&&!this.type)throw new b(`Backrefs selector has field but no component in ${r.type.name}.${i.name}`);if(this.type&&!this.fieldName&&!this.type.__binding.refFields.length)throw new b(`Backrefs field ${r.type.name}.${i.name} refers to component ${this.type.name} that has no ref fields`)}const n=this.trackDeletedBackrefs,o=r.dispatcher.indexer;o.registerSelector();const a=o.registerSelector(r.type,this.type,s==null?void 0:s.seq,this.trackDeletedBackrefs);Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){if(B(this,r),!n&&r.dispatcher.registry.includeRecentlyDeleted)throw new b(`Backrefs field ${r.type.name}.${i.name} not configured to track recently deleted refs`);return o.getBackrefs(r.writableEntityId,a)},set(c){if(B(this,r),c!==Ai)throw new b("Backrefs properties are computed automatically, you cannot set them")}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){if(B(this,r),!n&&r.dispatcher.registry.includeRecentlyDeleted)throw new b(`Backrefs field ${r.type.name}.${i.name} not configured to track recently deleted refs`);return o.getBackrefs(r.readonlyEntityId,a)},set(c){if(B(this,r),c!==Ai)throw new b("Backrefs properties are computed automatically, you cannot set them")}})}defineFixed(r,i){this.defineElastic(r,i)}}class Wu extends M{constructor(){super(void 0,!1)}defineElastic(e,r){const i=[];r.updateBuffer=()=>{},Object.defineProperty(e.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),i[e.writableIndex]},set(s){B(this,e),i[e.writableIndex]=s}}),Object.defineProperty(e.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),i[e.readonlyIndex]},set(s){Ce(e)}})}defineFixed(e,r){const i=new Array(e.capacity);r.updateBuffer=()=>{},Object.defineProperty(e.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),i[e.writableIndex]},set(s){B(this,e),i[e.writableIndex]=s}}),Object.defineProperty(e.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return B(this,e),i[e.readonlyIndex]},set(s){Ce(e)}})}}class Xu extends M{constructor(){super(void 0,!1);f(this,"finalizers")}defineElastic(r,i){const s=[];i.updateBuffer=()=>{};const n=this.initFinalizers(r);Object.defineProperty(r.writableMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const o=s[r.writableIndex];return o==null?o:o.deref()},set(o){if(B(this,r),o!=null){const a=new WeakRef(o);n==null||n.register(o,{type:r.type,data:s,weakRef:a,id:r.writableEntityId,index:r.writableIndex}),o=a}s[r.writableIndex]=o}}),Object.defineProperty(r.readonlyMaster,i.name,{enumerable:!0,configurable:!0,get(){B(this,r);const o=s[r.readonlyIndex];return o==null?o:o.deref()},set(o){Ce(r)}})}defineFixed(r,i){this.defineElastic(r,i)}initFinalizers(r){if(!r.trackedWrites)return;if(this.finalizers)return this.finalizers;const i=r.dispatcher;if(!(!i.writeLog||typeof FinalizationRegistry>"u"))return this.finalizers=new FinalizationRegistry(({type:s,data:n,weakRef:o,id:a,index:l})=>{n[l]===o&&i.registry.trackWrite(a,s)}),this.finalizers}}M.boolean=new Fu;M.uint8=new Hr(Uint8Array);M.int8=new Hr(Int8Array);M.uint16=new Hr(Uint16Array);M.int16=new Hr(Int16Array);M.uint32=new Hr(Uint32Array);M.int32=new Hr(Int32Array);M.float32=new Hr(Float32Array);M.float64=new Hr(Float64Array);M.vector=(t,e,r)=>new Lu(t,e,r);M.staticString=t=>new zu(t);M.dynamicString=t=>new Vu(t);M.ref=new Hu;M.backrefs=(t,e,r=!1)=>new ku(t,e,r);M.object=new Wu;M.weakObject=new Xu;class $u{constructor(e,r,i,s,n,o,a){f(this,"type");f(this,"fields");f(this,"dispatcher");f(this,"capacity");f(this,"storage");f(this,"elastic");this.type=e,this.fields=r,this.dispatcher=s,this.capacity=n,this.storage=o,this.elastic=a,this.readonlyMaster=this.readonlyInstance=new e,this.writableMaster=this.writableInstance=new e,this.readonlyInstance=Object.create(this.readonlyMaster),this.readonlyInstance.__invalid=!this.elastic&&this.capacity>1,this.writableInstance=Object.create(this.writableMaster),this.writableInstance.__invalid=!this.elastic&&this.capacity>1,this.shapeOffset=i.offset,this.shapeMask=i.mask,this.shapeValue=i.value,this.refFields=r.filter(c=>c.type===M.ref),this.trackedWrites=!1,this.writableEntityId=0,this.writableIndex=0,this.readonlyEntityId=0,this.readonlyIndex=0,this.initDefault=new Function("component",r.filter(c=>c.default!==Ai).map(c=>`component.${c.name} = ${JSON.stringify(c.default)};`).join(`
`));let l=[];l=r.filter(c=>c.default===Ai).map(c=>`
          if (${JSON.stringify(c.name)} in values) {
            component.${c.name} = values.${c.name};
          }
        `),this.init=new Function("component","values",r.filter(c=>c.default!==Ai).map(c=>`
          component.${c.name} = values.${c.name} === undefined ?
            ${JSON.stringify(c.default)} : values.${c.name};
        `).concat(l).join(`
`))}resetWritableInstance(e,r){if(r===-1)throw new L(`Attempt to bind unacquired entity ${e} to ${this.type.name}`);return this.writableEntityId=e,this.writableIndex=r,(this.elastic||this.capacity>1)&&(this.writableInstance.__invalid=!0,this.writableInstance=Object.create(this.writableMaster)),this.writableInstance}resetReadonlyInstance(e,r){if(r===-1)throw new L(`Attempt to bind unacquired entity ${e} to ${this.type.name}`);return this.readonlyEntityId=e,this.readonlyIndex=r,(this.elastic||this.capacity>1)&&(this.readonlyInstance.__invalid=!0,this.readonlyInstance=Object.create(this.readonlyMaster)),this.readonlyInstance}}function Gr(t){if(!t.__binding)throw new b(`Component ${t.name} not defined; add to world defs`)}class ju{constructor(e,r,i){f(this,"maxEntities");f(this,"binding");f(this,"fields");this.maxEntities=e,this.binding=r,this.fields=i,this.growSpares(),this.growCapacity()}acquireIndex(e){let r=this.index[e];if(r===-1){if(this.spares[3]>0)r=this.spares[--this.spares[3]+4];else{if(this.spares[1]===this.spares[2]){if(!this.binding.elastic)throw new b(`Storage exhausted for component ${this.binding.type.name}; raise its capacity above ${this.binding.capacity}`);if(this.binding.capacity===this.maxEntities)throw new L(`Trying to grow storage index for component ${this.binding.type.name} beyond maxEntities`);this.binding.capacity=Math.min(this.maxEntities,this.binding.capacity*2),this.growCapacity()}r=this.spares[1]++}this.index[e]=r}return r}releaseIndex(e){if(this.index[e]===-1)throw new L(`Index for entity ${e} in component ${this.binding.type.name} not allocated`);this.spares[3]===this.spares.length-4&&this.growSpares(),this.spares[this.spares[3]+++4]=this.index[e],this.index[e]=-1}growCapacity(){var s;const e=this.binding.capacity;this.binding.dispatcher.stats.forComponent(this.binding.type).capacity=e;const r=this.ArrayType,i=r.BYTES_PER_ELEMENT!==((s=this.spares)==null?void 0:s[0]);if((!this.index||i)&&this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.index`,this.maxEntities,r,n=>{this.index=n},-1),i?this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.spares`,this.spares.length,r,this.updateSpares.bind(this)):this.spares[2]=e,this.binding.elastic)for(const n of this.fields)n.updateBuffer()}growSpares(){const e=this.spares?Math.min(this.maxEntities,(this.spares.length-4)*2):8;this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.spares`,4+e,this.ArrayType,this.updateSpares.bind(this))}updateSpares(e){e[2]=this.binding.capacity=Math.max(this.binding.capacity,e[2]),e[0]=this.ArrayType.BYTES_PER_ELEMENT,this.spares=e}get ArrayType(){var r;const e=Math.max(((r=this.spares)==null?void 0:r[2])??0,this.binding.capacity);return e<128?Int8Array:e<32768?Int16Array:Int32Array}}class qu{constructor(e,r,i){f(this,"maxEntities");f(this,"binding");f(this,"fields");this.maxEntities=e,this.binding=r,this.fields=i,this.growCapacity()}findIndex(e){for(let r=0;r<this.index.length;r++)if(this.index[r]===e)return r;return-1}acquireIndex(e){let r;for(let i=0;i<this.index.length;i++){if(this.index[i]===e)return i;r===void 0&&this.index[i]===-1&&(r=i)}if(r===void 0){if(!this.binding.elastic)throw new b(`Storage exhausted for component ${this.binding.type.name}; raise its capacity above ${this.binding.capacity}`);if(this.binding.capacity===this.maxEntities)throw new L(`Trying to grow storage index for component ${this.binding.type.name} beyond maxEntities`);r=this.index.length,this.binding.capacity=Math.min(this.maxEntities,this.binding.capacity*2),this.growCapacity()}return this.index[r]=e,r}releaseIndex(e){for(let r=0;r<this.index.length;r++)if(this.index[r]===e){this.index[r]=-1;return}throw new L(`Index for entity ${e} in component ${this.binding.type.name} not allocated`)}growCapacity(){const e=this.binding.capacity;if(this.binding.dispatcher.stats.forComponent(this.binding.type).capacity=e,this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.index`,e,Int32Array,this.updateIndex.bind(this),-1),this.binding.elastic)for(const r of this.fields)r.updateBuffer()}updateIndex(e){this.index=e,this.binding.capacity=this.index.length}}function Jl(t,e,r){var s;if(Gr(t),r!==void 0){for(const n in r)if(!((s=t.schema)!=null&&s[n]))throw new b(`Property ${n} not defined for component ${t.name}`)}const i=t.__allocate(e);r?t.__binding.init(i,r):t.__binding.initDefault(i)}function Yu(t){const e=t.schema,r=[];if(e){let i=0;for(const s in e){let n=e[s];(n instanceof M||typeof n=="function")&&(n={type:n}),typeof n.type=="function"&&(n.type=n.type()),"default"in n||(n.default=n.type.defaultValue),r.push({name:s,seq:i++,type:n.type,default:n.default})}if(i>Wo)throw new b(`Component ${t.name} declares too many fields`)}return r}function Sa(t,e,r,i){var c,u,h,_,p;const s=Yu(e),n=s.length?((c=e.options)==null?void 0:c.storage)??i.defaultComponentStorage:"sparse",o=n==="sparse"?i.maxEntities:Math.min(i.maxEntities,((u=e.options)==null?void 0:u.capacity)??0),a=((h=e.options)==null?void 0:h.initialCapacity)??8;{if(typeof((_=e.options)==null?void 0:_.capacity)<"u"){if(n==="sparse")throw new b(`Component type ${e.name} cannot combine custom capacity with sparse storage`);if(e.options.capacity<=0)throw new b(`Component type ${e.name} capacity option must be great than zero: got ${o}`);if(typeof e.options.initialCapacity<"u")throw new b(`Component type ${e.name} cannot have both capacity and initialCapacity options`)}if((p=e.options)!=null&&p.restrictedToMainThread&&s.every(d=>d.type.shared))throw new b(`Component type ${e.name} is restrictedToMainThread but has no thread-exclusive fields`);if((typeof process>"u"||!0)&&e.__bind)throw new b(`Component type ${e.name} is already in use in another world`)}e.id=t;const l=new $u(e,s,r,i,o||a,n,!o);e.__binding=l}function Ku(t){const e=t.__binding;for(const r of e.fields)e.elastic?r.type.defineElastic(e,r):r.type.defineFixed(e,r);switch(e.storage){case"sparse":e.dispatcher.stats.forComponent(t).capacity=e.capacity,t.__bind=(r,i)=>i?e.resetWritableInstance(r,r):e.resetReadonlyInstance(r,r),t.__allocate=r=>e.resetWritableInstance(r,r);break;case"packed":{const r=new ju(e.dispatcher.maxEntities,e,e.fields);t.__bind=(i,s)=>s?e.resetWritableInstance(i,r.index[i]):e.resetReadonlyInstance(i,r.index[i]),t.__allocate=i=>e.resetWritableInstance(i,r.acquireIndex(i)),t.__free=i=>{r.releaseIndex(i)};break}case"compact":{const r=new qu(e.dispatcher.maxEntities,e,e.fields);t.__bind=(i,s)=>s?e.resetWritableInstance(i,r.findIndex(i)):e.resetReadonlyInstance(i,r.findIndex(i)),t.__allocate=i=>e.resetWritableInstance(i,r.acquireIndex(i)),t.__free=i=>{r.releaseIndex(i)};break}default:throw new b(`Invalid storage type "${e.storage}`)}}function Qu(t){delete t.id,delete t.__binding,delete t.__bind,delete t.__allocate,delete t.__free}function Ia(t){t.options||(t.options={});{if(t.options.storage&&t.options.storage!=="compact")throw new b(`Component ${t.name} ${t.options.storage} storage is incompatible with singletons`);if(t.options.capacity&&t.options.capacity!==1)throw new b(`Component ${t.name} capacity of ${t.options.capacity} is incompatible with singletons`);if(t.options.initialCapacity)throw new b(`Component ${t.name} initial capacity of ${t.options.initialCapacity} is incompatible with singletons`)}t.options.storage="compact",t.options.capacity=1}class ec{constructor(e){f(this,"__registry");this.__registry=e,this.__id=void 0,this.__sortKey=void 0,this.__valid=!0}get alive(){return this.__checkValid(),this.__registry.hasShape(this.__id,this.__registry.Alive,!1)}get ordinal(){return this.__registry.entityOrdinals[this.__id]}add(e,r){{if(this.__checkValid(),this.__checkMask(e,"write"),!this.__registry.hasShape(this.__id,this.__registry.Alive,!1))throw new b("Entity has been deleted");if(this.__registry.hasShape(this.__id,e,!1))throw new b(`Entity already has a ${e.name} component`)}this.__registry.setShape(this.__id,e),this.__registry.dispatcher.stats.forComponent(e).numEntities+=1,Jl(e,this.__id,r)}addAll(...e){this.__checkValid();{const r=new Set;for(const i of e)if(typeof i=="function"&&i.enum){if(r.has(i.enum))throw new b("Can't add multiple components from the same enum");r.add(i.enum)}}for(let r=0;r<e.length;r++){const i=e[r];if(typeof i!="function")throw new b(`Bad arguments to addAll: expected component type, got: ${i}`);let s=e[r+1];typeof s=="function"?s=void 0:r++,this.add(i,s)}}remove(e){if(this.__checkValid(),this.__checkMask(e,"write"),typeof e=="function"&&this.__checkHas(e,!1),typeof e!="function"){const r=this.__registry.getEnumShape(this.__id,e,!1);if(!r)throw new b(`Entity doesn't have any components from ${e.name} enumeration`);e=r}this.__registry.clearShape(this.__id,e)}removeAll(...e){for(const r of e)this.remove(r)}has(e){return this.__checkValid(),this.__checkMask(e,"check"),typeof e=="function"?this.__registry.hasShape(this.__id,e,!0):!!this.__registry.getEnumShape(this.__id,e,!0)}hasSomeOf(...e){this.__checkValid();for(const r of e)if(this.has(r))return!0;return!1}hasAllOf(...e){this.__checkValid();for(const r of e)if(!this.has(r))return!1;return!0}hasAnyOtherThan(...e){this.__checkValid();const r=new Set(e);for(const i of this.__registry.types)if(this.__checkMask(i,"check"),!(r.has(i)||i.enum&&r.has(i.enum))&&this.__registry.hasShape(this.__id,i,!0))return!0;return!1}countHas(...e){this.__checkValid();let r=0;for(const i of e)this.has(i)&&(r+=1);return r}hasWhich(e){return this.__checkValid(),this.__checkMask(e,"check"),this.__registry.getEnumShape(this.__id,e,!0)}read(e){return this.__checkValid(),this.__checkMask(e,"read"),this.__checkHas(e,!0),e.__bind(this.__id,!1)}write(e){return this.__checkValid(),this.__checkMask(e,"write"),this.__checkHas(e,!0),e.__binding.trackedWrites&&this.__registry.trackWrite(this.__id,e),e.__bind(this.__id,!0)}delete(){this.__checkValid();const e=this.__registry.Alive;if(!this.__registry.hasShape(this.__id,e,!1))throw new b("Entity already deleted");for(const r of this.__registry.types)this.__registry.hasShape(this.__id,r,!1)&&(r!==e&&this.__checkMask(r,"write"),this.__registry.clearShape(this.__id,r));this.__registry.dispatcher.indexer.clearAllRefs(this.__id,!1)}hold(){return this.__checkValid(),this.__registry.holdEntity(this.__id)}isSame(e){return this.__checkValid(),this.__id===e.__id}__checkMask(e,r){Ro(e,this.__registry.executingSystem,r)}__checkHas(e,r){if(!this.__registry.hasShape(this.__id,e,r))throw new b(`Entity doesn't have a ${e.name} component`)}__checkValid(){if(!this.__valid)throw new b("Entity handle no longer valid")}}function Ro(t,e,r){Gr(t);const i=e==null?void 0:e.accessMasks[r];if(!i)return;const s=t.__binding;if(!((i[s.shapeOffset]??0)&s.shapeMask))throw new b(`System ${e.name} didn't mark component ${t.name} as ${r}able`)}function eo(t,e){const r=e.__binding;return((t[r.shapeOffset]??0)&r.shapeMask)!==0}function Ws(t,e,r=!1){Gr(e);const i=e.__binding.shapeOffset;if(i>=t.length){const s=t.length;t.length=i+1,t.fill(0,s,i)}t[i]|=r?e.__binding.shapeValue:e.__binding.shapeMask}const fe=2,Oa=[];let rn=class{constructor(e,r,i,s={localProcessingAllowed:!1,sortedByComponentType:!1,numComponentTypes:0}){f(this,"maxEntries");f(this,"configParamName");f(this,"options");f(this,"data");f(this,"corral");f(this,"staging");f(this,"typeCounters");if(this.maxEntries=e,this.configParamName=r,this.options=s,i.register(`log.${r}.buffer`,e+fe,Uint32Array,n=>{this.data=n}),i.register(`log.${r}.corral`,e+fe,Uint32Array,n=>{this.corral=n}),s.sortedByComponentType){if(s.numComponentTypes===void 0)throw new L(`numComponentTypes required when ${this.configParamName} is sortedByComponentType`);i.register(`log.${r}.staging`,e+fe,Uint32Array,n=>{this.staging=n}),this.typeCounters=new Uint32Array(this.options.numComponentTypes)}}push(e,r){const i=this.corral[0];if(i>=this.maxEntries&&this.throwCapacityExceeded(),!(i&&this.corral[i]===e)){if(this.corral[i+fe]=e,this.corral[0]+=1,!!r!=!!this.options.sortedByComponentType)throw new L(`Pushing value ${r?"with":"without"} type to log ${this.configParamName} ${this.options.sortedByComponentType?"":"not "}sorted by component type`);r&&(this.typeCounters[r.id]+=1)}}commit(e){if(!e&&this.options.localProcessingAllowed)throw new L(`Cannot use blind commit when local processing is allowed in log ${this.configParamName}`);return this.corral[0]?e&&!(e.generation===this.data[1]&&e.index===this.data[0]&&e.corralGeneration===this.corral[1]&&e.corralIndex===this.corral[0])?!1:(this.copyToData(this.staging?this.sortCorral():this.corral),this.corral[0]=0,this.corral[1]+=1,e&&(e.index=this.data[0],e.generation=this.data[1]),!0):!0}sortCorral(){let e=fe,r=-1,i=0,s=0;for(let o=0;o<this.typeCounters.length;o++){const a=this.typeCounters[o];a&&(s+=1,r===-1?(r=o,i=a):r>=0&&(r=-2),a===1?(this.typeCounters[o]=e,e+=1):(this.typeCounters[o]=e+1,this.staging[e]=a|o<<He|2**31,e+=a+1))}if(r>=0)return i>1&&(this.corral[0]===this.maxEntries&&this.throwCapacityExceeded(),this.corral[this.corral[0]+fe]=this.corral[fe],this.corral[fe]=this.corral[0]|r<<He|2**31,this.corral[0]+=1),this.typeCounters.fill(0),this.corral;this.corral[0]+s>this.maxEntries&&this.throwCapacityExceeded();const n=this.corral[0]+fe;for(let o=fe;o<n;o++){const a=this.corral[o],l=a>>>He;this.staging[this.typeCounters[l]++]=a}return this.staging[0]=e-fe,this.typeCounters.fill(0),this.staging}copyToData(e){let r=this.data[0];const i=e[0],s=Math.min(i,this.maxEntries-r);for(this.data.set(e.subarray(fe,s+fe),r+fe),s<i&&this.data.set(e.subarray(s+fe,i+fe),fe),r+=i;r>=this.maxEntries;)r-=this.maxEntries,this.data[1]+=1;this.data[0]=r}createPointer(e){return e?(e.index=this.data[0],e.generation=this.data[1],e.corralIndex=this.corral[0],e.corralGeneration=this.corral[1],e):{index:this.data[0],generation:this.data[1],corralIndex:this.corral[0],corralGeneration:this.corral[1]}}copyPointer(e){return{index:e.index,generation:e.generation,corralIndex:e.corralIndex,corralGeneration:e.corralGeneration}}hasUpdatesSince(e){return this.checkPointer(e),!(e.index===this.data[0]&&e.generation===this.data[1]&&(e.corralGeneration===this.corral[1]?e.corralIndex===this.corral[0]:this.corral[0]===0))}processSince(e,r){this.checkPointers(e,r);let i=Oa;const s=(r==null?void 0:r.index)??this.data[0],n=(r==null?void 0:r.generation)??this.data[1];if(e.generation===n)if(e.index<s)i=[this.data,e.index+fe,s+fe,!1],e.index=s;else{const o=this.corral[0],a=this.corral[1];(e.corralGeneration===a?e.corralIndex<o:o)&&(i=[this.corral,e.corralIndex+fe,o+fe,!0],e.corralIndex=o,e.corralGeneration=a)}else i=[this.data,e.index+fe,this.data.length,!1],e.index=0,e.generation=n;return i}processAndCommitSince(e){const r=this.processSince(e);return r[0]?r:this.commit(e)?Oa:this.processSince(e)}countSince(e,r){if(this.checkPointers(e,r),this.corral[0])throw new L(`Should commit log ${this.configParamName} before counting`);const i=e.index,s=e.generation,n=(r==null?void 0:r.index)??this.data[0],o=(r==null?void 0:r.generation)??this.data[1];return e.index=n,e.generation=o,i===n&&s===o?0:i<n?n-i:this.maxEntries-(i-n)}checkPointers(e,r){if(this.checkPointer(e),r&&(this.checkPointer(r),e.index>r.index&&e.generation>=r.generation))throw new L(`Start pointer exceeds end pointer in log ${this.configParamName}`)}checkPointer(e){const r=this.data[0];let i=e.generation;e.index===r?i+1<this.data[1]&&this.throwCapacityExceeded():(e.index>r&&(i+=1),i!==this.data[1]&&this.throwCapacityExceeded());{if(e.corralGeneration>this.corral[1])throw new L(`Pointer corral generation older than corral in log ${this.configParamName}`);if(e.corralGeneration===this.corral[1]&&e.corralIndex>this.corral[0])throw new L(`Pointer past end of corral area in log ${this.configParamName}`)}}throwCapacityExceeded(){throw new b(`Log capacity exceeded, please raise ${this.configParamName} above ${this.maxEntries}`)}};class to{constructor(e){f(this,"size");f(this,"bytes");this.size=e,this.bytes=new Uint32Array(Math.ceil(e/32))}get(e){if(e<0||e>=this.size)throw new L(`Bit index out of bounds: ${e}`);return(this.bytes[e>>>5]&1<<(e&31))!==0}set(e){if(e<0||e>=this.size)throw new L(`Bit index out of bounds: ${e}`);this.bytes[e>>>5]|=1<<(e&31)}unset(e){if(e<0||e>=this.size)throw new L(`Bit index out of bounds: ${e}`);this.bytes[e>>>5]&=~(1<<(e&31))}clear(){this.bytes.fill(0)}}class Zu{constructor(e,r){f(this,"pool");f(this,"orderBy");f(this,"entities",[]);f(this,"maxOrderKey",-1/0);f(this,"sorted",!0);this.pool=e,this.orderBy=r}add(e){const r=this.pool.borrowTemporarily(e);if(this.orderBy){const i=this.orderBy(r);i>=this.maxOrderKey?this.maxOrderKey=i:this.sorted=!1}this.entities.push(r)}clear(){this.entities.length&&(this.entities.length=0),this.maxOrderKey=-1/0,this.sorted=!0}sort(){if(this.sorted)return;const e=this.orderBy;for(const r of this.entities)r.__sortKey=e(r);this.entities.sort((r,i)=>r.__sortKey<i.__sortKey?-1:r.__sortKey>i.__sortKey?1:0),this.sorted=!0}}class Gu{constructor(e,r,i){f(this,"pool");f(this,"orderBy");f(this,"entities",[]);f(this,"lookupTable");f(this,"maxOrderKey",-1/0);f(this,"sorted",!0);this.pool=e,this.orderBy=r,this.lookupTable=new Int32Array(i),this.lookupTable.fill(-1)}add(e){const r=this.pool.borrow(e);if(this.orderBy){const s=this.orderBy(r);s>=this.maxOrderKey?this.maxOrderKey=s:this.sorted=!1}const i=this.entities.push(r)-1;this.lookupTable[e]=i}remove(e){const r=this.lookupTable[e];if(r<0)throw new L("Entity not in list");this.pool.return(e),this.lookupTable[e]=-1;const i=this.entities.pop();r<this.entities.length&&(this.entities[r]=i,this.lookupTable[i.__id]=r,this.orderBy&&(this.sorted=!1))}has(e){return this.lookupTable[e]>=0}clear(){for(const e of this.entities)this.pool.return(e.__id);this.entities=[],this.lookupTable.fill(-1),this.maxOrderKey=-1/0,this.sorted=!0}sort(){if(this.sorted)return;const e=this.orderBy;for(const r of this.entities)r.__sortKey=e(r);this.entities.sort((r,i)=>r.__sortKey<i.__sortKey?-1:r.__sortKey>i.__sortKey?1:0);for(let r=0;r<this.entities.length;r++)this.lookupTable[this.entities[r].__id]=r;this.sorted=!0}}var se;(function(t){t[t.current=1]="current",t[t.added=2]="added",t[t.removed=4]="removed",t[t.changed=8]="changed",t[t.addedOrChanged=16]="addedOrChanged",t[t.changedOrRemoved=32]="changedOrRemoved",t[t.addedChangedOrRemoved=64]="addedChangedOrRemoved"})(se||(se={}));const Ju=se.added|se.removed|se.changed|se.addedOrChanged|se.changedOrRemoved|se.addedChangedOrRemoved,eh=se.changed|se.addedOrChanged|se.changedOrRemoved|se.addedChangedOrRemoved,th=se.added|se.removed|se.addedOrChanged|se.changedOrRemoved|se.addedChangedOrRemoved;class rh{constructor(e,r){f(this,"system");f(this,"results",{});f(this,"flavors",0);f(this,"withMask");f(this,"withValues");f(this,"withAnyRecords");f(this,"withoutMask");f(this,"withoutEnumTypes");f(this,"trackWritesMask");f(this,"orderBy");f(this,"hasTransientResults");f(this,"hasChangedResults");f(this,"hasShapeResults");f(this,"hasMatchTracking");f(this,"currentEntities");f(this,"processedEntities");f(this,"changedEntities");this.system=r,e.__results=this.results,e.__systemName=r.name}complete(){var r,i;const e=this.system.dispatcher;this.hasTransientResults=!!(this.flavors&Ju),this.hasChangedResults=!!(this.flavors&eh),this.hasShapeResults=!!(this.flavors&th),this.hasMatchTracking=!!((r=this.withAnyRecords)!=null&&r.some(s=>s.lastMatches));{if(this.withMask&&this.withoutMask){const n=Math.min(this.withMask.length,this.withoutMask.length);for(let o=0;o<n;o++)if(this.withMask[o]&this.withoutMask[o])throw new b("Query must not list a component type in both `with` and `without` clauses")}if(this.withAnyRecords&&this.withoutMask)for(const{mask:n}of this.withAnyRecords){const o=Math.min(n.length,this.withoutMask.length);for(let a=0;a<o;a++)if(n[a]&this.withoutMask[a])throw new b("Query must not list a component type in both `withAny` and `without` clauses")}const s=!!this.trackWritesMask||((i=this.withAnyRecords)==null?void 0:i.some(n=>n.lastMatches));if(this.hasChangedResults&&!s)throw new b("Query for changed entities must track at least one component");if(!this.hasChangedResults&&s)throw new b("You can only track components if you have a query for changed entities")}this.flavors&se.current?this.results.current=new Gu(e.registry.pool,this.orderBy,e.maxEntities):this.currentEntities=new to(e.maxEntities),this.processedEntities=new to(e.maxEntities),this.hasTransientResults&&this.allocateTransientResultLists(),this.flavors&&this.system.shapeQueries.push(this),this.hasChangedResults&&(this.changedEntities=new to(e.maxEntities),this.system.writeQueries.push(this))}allocateTransientResultLists(){this.flavors&se.added&&this.allocateResult("added"),this.flavors&se.removed&&this.allocateResult("removed"),this.flavors&se.changed&&this.allocateResult("changed"),this.flavors&se.addedOrChanged&&this.allocateResult("addedOrChanged"),this.flavors&se.changedOrRemoved&&this.allocateResult("changedOrRemoved"),this.flavors&se.addedChangedOrRemoved&&this.allocateResult("addedChangedOrRemoved")}allocateResult(e){const r=this.system.dispatcher;this.results[e]=new Zu(r.registry.pool,this.orderBy)}clearTransientResults(){var e,r,i,s,n,o,a;this.hasTransientResults&&((e=this.results.added)==null||e.clear(),(r=this.results.removed)==null||r.clear(),(i=this.results.changed)==null||i.clear(),(s=this.results.addedOrChanged)==null||s.clear(),(n=this.results.changedOrRemoved)==null||n.clear(),(o=this.results.addedChangedOrRemoved)==null||o.clear(),(a=this.changedEntities)==null||a.clear())}clearAllResults(){var e;this.clearTransientResults(),(e=this.results.current)==null||e.clear()}clearProcessedEntities(){this.processedEntities.clear()}handleShapeUpdate(e){var n,o,a,l,c,u,h,_,p,d,g,m,E,A,S,P,k;if(this.processedEntities.get(e))return;this.processedEntities.set(e);const r=this.system.dispatcher.registry,i=((n=this.results.current)==null?void 0:n.has(e))??this.currentEntities.get(e),s=r.matchShape(e,this.withMask,this.withValues,this.withAnyRecords,this.withoutMask,this.withoutEnumTypes);if(s&&!i)(o=this.currentEntities)==null||o.set(e),(a=this.changedEntities)==null||a.set(e),(l=this.results.current)==null||l.add(e),(c=this.results.added)==null||c.add(e),(u=this.results.addedOrChanged)==null||u.add(e),(h=this.results.addedChangedOrRemoved)==null||h.add(e);else if(!s&&i)(_=this.currentEntities)==null||_.unset(e),(p=this.changedEntities)==null||p.set(e),(d=this.results.current)==null||d.remove(e),(g=this.results.removed)==null||g.add(e),(m=this.results.changedOrRemoved)==null||m.add(e),(E=this.results.addedChangedOrRemoved)==null||E.add(e);else if(s&&i&&this.hasMatchTracking){for(const C of this.withAnyRecords)if(C.changed){this.changedEntities.set(e),(A=this.results.changed)==null||A.add(e),(S=this.results.addedOrChanged)==null||S.add(e),(P=this.results.changedOrRemoved)==null||P.add(e),(k=this.results.addedChangedOrRemoved)==null||k.add(e);break}}}handleWrite(e,r,i){var s,n,o,a,l;!this.changedEntities.get(e)&&(this.hasShapeResults?((s=this.results.current)==null?void 0:s.has(e))??this.currentEntities.get(e):this.system.dispatcher.registry.matchShape(e,this.withMask,this.withValues,this.withAnyRecords,this.withoutMask,this.withoutEnumTypes))&&(this.trackWritesMask[r]??0)&i&&(this.changedEntities.set(e),(n=this.results.changed)==null||n.add(e),(o=this.results.addedOrChanged)==null||o.add(e),(a=this.results.changedOrRemoved)==null||a.add(e),(l=this.results.addedChangedOrRemoved)==null||l.add(e))}sort(){var e,r,i,s,n,o,a;(e=this.results.current)==null||e.sort(),(r=this.results.added)==null||r.sort(),(i=this.results.removed)==null||i.sort(),(s=this.results.changed)==null||s.sort(),(n=this.results.addedOrChanged)==null||n.sort(),(o=this.results.changedOrRemoved)==null||o.sort(),(a=this.results.addedChangedOrRemoved)==null||a.sort()}}class ih{constructor(e,r){f(this,"__callback");f(this,"__userQuery");f(this,"__query");f(this,"__system");f(this,"__lastTypes");f(this,"__lastWasWithAny");this.__callback=e,this.__userQuery=r}__build(e){try{this.__system=e,this.__query=new rh(this.__userQuery,e),this.__callback(this),!this.__query.withMask&&this.__query.flavors&&this.set("withMask",[this.__system.dispatcher.registry.Alive]),this.__query.complete()}catch(r){throw r.message=`Failed to build query in system ${e.name}: ${r.message}`,r}}get and(){return this}get but(){return this}get also(){return this}get current(){return this.__query.flavors|=se.current,this}get added(){return this.__query.flavors|=se.added,this}get removed(){return this.__query.flavors|=se.removed,this}get changed(){return this.__query.flavors|=se.changed,this}get addedOrChanged(){return this.__query.flavors|=se.addedOrChanged,this}get changedOrRemoved(){return this.__query.flavors|=se.changedOrRemoved,this}get addedChangedOrRemoved(){return this.__query.flavors|=se.addedChangedOrRemoved,this}orderBy(e){return this.__query.orderBy=e,this}with(...e){return this.set(this.__system.accessMasks.read,e),this.set("withMask"),this}withAny(...e){for(const i of e)if(typeof i=="function"&&i.enum)throw new b(`Cannot use enum types in a withAny clause: ${i.name}`);this.set(this.__system.accessMasks.read,e),this.__query.withAnyRecords||(this.__query.withAnyRecords=[]);const r=[];return this.__query.withAnyRecords.push({mask:r,lastMatches:void 0,changed:!1}),this.set(r),this}without(...e){return this.set(this.__system.accessMasks.read,e),this.set("withoutMask"),this}using(...e){return this.__lastTypes=e,this}get usingAll(){return this.__lastTypes=this.__system.dispatcher.registry.types.slice(1),this}get trackWrites(){this.set("trackWritesMask");for(const e of this.__lastTypes)if(typeof e=="function")e.__binding.trackedWrites=!0;else for(const r of e.__types)r.__binding.trackedWrites=!0;return this}get trackMatches(){if(!this.__lastWasWithAny)throw new Error("You can only apply trackMatches to a withAny clause");return this.__query.withAnyRecords[this.__query.withAnyRecords.length-1].lastMatches=[],this}get read(){return this.set(this.__system.accessMasks.read),this}get create(){return this.set(this.__system.accessMasks.create),this}get update(){return this.set(this.__system.accessMasks.update),this}get write(){return this.set(this.__system.accessMasks.write),this.set(this.__system.accessMasks.read),this.set(this.__system.accessMasks.create),this.set(this.__system.accessMasks.update),this}set(e,r){var _;if(!e)return;if(r)for(const p of r)Gr(p);if(r||(r=this.__lastTypes),!r)throw new L("No component type to apply query modifier to");this.__lastTypes=r,typeof e=="string"&&(this.__query[e]||(this.__query[e]=[]),e=this.__query[e]),this.__lastWasWithAny=((_=this.__query.withAnyRecords)==null?void 0:_.some(p=>p.mask===e))??!1;const i=e===this.__system.accessMasks.read,s=e===this.__system.accessMasks.update,n=e===this.__system.accessMasks.create,o=e===this.__system.accessMasks.write,a=e===this.__query.withMask,l=e===this.__query.withoutMask,c=e===this.__query.withMask||e===this.__query.withoutMask||this.__lastWasWithAny,u=e===this.__query.trackWritesMask,h=i?this.__system.dispatcher.planner.readers:o||n||s?this.__system.dispatcher.planner.writers:void 0;for(const p of r){if(!eo(this.__system.accessMasks.write,p)&&(i&&eo(this.__system.accessMasks.create,p)||n&&eo(this.__system.accessMasks.read,p)))throw new b(`Cannot combine create and read entitlements for component type ${p.name}; just use a write entitlement instead`);if(l&&typeof p=="function"&&p.enum?(this.__query.withoutEnumTypes=this.__query.withoutEnumTypes??[],this.__query.withoutEnumTypes.push(p)):(Ws(e,p),a&&(this.__query.withValues||(this.__query.withValues=[]),Ws(this.__query.withValues,p,!0))),i&&Ws(this.__system.accessMasks.check,p),typeof p=="function")h&&h.get(p).add(this.__system),c&&this.categorize(this.__system.shapeQueriesByComponent,p),u&&this.categorize(this.__system.writeQueriesByComponent,p);else for(const d of p.__types)h&&h.get(d).add(this.__system),c&&this.categorize(this.__system.shapeQueriesByComponent,d),u&&this.categorize(this.__system.writeQueriesByComponent,d)}}categorize(e,r){const i=r.id;e[i]||(e[i]=[]),e[i].includes(this.__query)||e[i].push(this.__query)}}class sh{constructor(){f(this,"__results");f(this,"__systemName")}get current(){return this.__checkList("current"),this.__results.current.entities}get added(){return this.__checkList("added"),this.__results.added.entities}get removed(){return this.__checkList("removed"),this.__results.removed.entities}get changed(){return this.__checkList("changed"),this.__results.changed.entities}get addedOrChanged(){return this.__checkList("addedOrChanged"),this.__results.addedOrChanged.entities}get changedOrRemoved(){return this.__checkList("changedOrRemoved"),this.__results.changedOrRemoved.entities}get addedChangedOrRemoved(){return this.__checkList("addedChangedOrRemoved"),this.__results.addedChangedOrRemoved.entities}__checkList(e){if(!this.__results[e])throw new b(`Query '${e}' not configured, please add .${e} to your query definition in system ${this.__systemName}`)}}const mi=typeof window<"u"&&typeof window.performance<"u"?performance.now.bind(performance):Date.now.bind(Date);class tc{constructor(e,r){f(this,"__callback");f(this,"__schedule");f(this,"__systems");f(this,"__dispatcher");this.__callback=e,this.__schedule=r}__build(e,r){try{this.__systems=e,this.__dispatcher=e[0].dispatcher,this.__callback(this)}catch(i){throw i.message=`Failed to build schedule in ${r}: ${i.message}`,i}}get allSystems(){return this.__dispatcher.defaultGroup}get onMainThread(){var e;return this.__checkNoLaneAssigned(),(e=this.__dispatcher.planner.mainLane)==null||e.add(...this.__systems),this}get onOneThread(){return this.__checkNoLaneAssigned(),this.__dispatcher.planner.createLane().add(...this.__systems),this}get onManyThreads(){var e;this.__checkNoLaneAssigned(),(e=this.__dispatcher.planner.replicatedLane)==null||e.add(...this.__systems);for(const r of this.__systems)r.stateless=!0;return this}__checkNoLaneAssigned(){if(this.__systems.some(e=>e.lane))throw new b("Threading semantics already specified")}before(...e){const r=new Set(this.__systems);for(const i of e)for(const s of this.__dispatcher.getSystems(i))if(!r.has(s))for(const n of this.__systems)this.__dispatcher.planner.graph.addEdge(n,s,5);return this}after(...e){const r=new Set(this.__systems);for(const i of e)for(const s of this.__dispatcher.getSystems(i))if(!r.has(s))for(const n of this.__systems)this.__dispatcher.planner.graph.addEdge(s,n,5);return this}inAnyOrderWith(...e){for(const r of e)for(const i of this.__dispatcher.getSystems(r))for(const s of this.__systems)this.__dispatcher.planner.graph.denyEdge(s,i,4);return this}beforeReadersOf(...e){for(const r of e)for(const i of this.__dispatcher.planner.readers.get(r))for(const s of this.__systems)this.__dispatcher.planner.graph.addEdge(s,i,3);return this}afterReadersOf(...e){for(const r of e)for(const i of this.__dispatcher.planner.readers.get(r))for(const s of this.__systems)this.__dispatcher.planner.graph.addEdge(i,s,3);return this}beforeWritersOf(...e){for(const r of e)for(const i of this.__dispatcher.planner.writers.get(r))for(const s of this.__systems)this.__dispatcher.planner.graph.addEdge(s,i,3);return this}afterWritersOf(...e){for(const r of e)for(const i of this.__dispatcher.planner.writers.get(r))for(const s of this.__systems)this.__dispatcher.planner.graph.addEdge(i,s,3);return this}inAnyOrderWithReadersOf(...e){for(const r of e)for(const i of this.__dispatcher.planner.readers.get(r))for(const s of this.__systems)this.__dispatcher.planner.graph.denyEdge(i,s,2);return this}inAnyOrderWithWritersOf(...e){for(const r of e)for(const i of this.__dispatcher.planner.writers.get(r))for(const s of this.__systems)this.__dispatcher.planner.graph.denyEdge(i,s,2);return this}}class rc{}class wi{constructor(e){f(this,"__contents");f(this,"__plan");f(this,"__executed",!1);f(this,"__systems");f(this,"__scheduleBuilder");this.__contents=e}__collectSystems(e){if(!this.__systems){this.__systems=[];for(const r of this.__contents)r instanceof Function&&r.__system?this.__systems.push(e.systemsByClass.get(r)):r instanceof wi&&this.__systems.push(...r.__collectSystems(e))}return this.__systems}__buildSchedule(){var e;(e=this.__scheduleBuilder)==null||e.__build(this.__systems,"a group"),this.__scheduleBuilder=null}schedule(e){if(this.__scheduleBuilder===null)throw new b("Attempt to define group schedule after world initialized");if(this.__scheduleBuilder)throw new b("Attempt to define multiple schedules in a group");return this.__scheduleBuilder=new tc(e,new rc),this}}class ic{constructor(e,r){f(this,"dispatcher");f(this,"groups");f(this,"executing");f(this,"time",mi()/1e3);f(this,"delta");if(this.dispatcher=e,this.groups=r,r.length===0)throw new b("At least one system group needed");for(const i of r)if(!e.systemGroups.includes(i))throw new b("Some groups in the frame are not parts of the world defs")}async begin(){if(this.executing)throw new b("Frame already executing");this.executing=!0;const e=this.dispatcher.lastTime??this.time;this.time=mi()/1e3,this.delta=this.time-e,this.dispatcher.startFrame(this.time)}async end(){if(!this.executing)throw new b("Frame not executing");this.executing=!1;e:{for(const e of this.groups)if(!e.__executed)break e;for(const e of this.groups)e.__executed=!1;this.dispatcher.completeCycle()}await this.dispatcher.completeFrame()}execute(e,r,i){if(!this.groups.includes(e))throw new b("Group not included in this frame");if(!this.executing)throw new b("Frame not executing");return e.__plan.execute(r??this.time,i??this.delta)}}class Na extends Error{constructor(){super("Canceled");f(this,"canceled",!0)}}let kt;class nh{constructor(e,r,i){f(this,"__generator");f(this,"__fn");f(this,"__supervisor");f(this,"__cancellers",[]);f(this,"__blocker");f(this,"__scope");f(this,"__done",!1);f(this,"__awaited",!1);f(this,"__error");f(this,"__value");f(this,"__firstRun",!0);this.__generator=e,this.__fn=r,this.__supervisor=i}__checkCancelation(){if(!this.__done){for(const e of this.__cancellers)if(e()){this.cancel();break}}}__step(){var e,r,i,s,n,o;kt=this;try{if(!this.__done&&(((e=this.__blocker)==null?void 0:e.isReady())??!0))try{let a;if((r=this.__blocker)!=null&&r.error)a=this.__generator.throw(this.__blocker.error);else if(this.__firstRun)try{a=this.__generator.next((i=this.__blocker)==null?void 0:i.value)}finally{this.__firstRun=!1,this.__supervisor.cancelMatching(this,this.__scope,this.__fn)}else a=this.__generator.next((s=this.__blocker)==null?void 0:s.value);a.done?(this.__done=!0,this.__value=a.value,this.__blocker=void 0):(this.__blocker=a.value,(o=(n=this.__blocker)==null?void 0:n.markAwaited)==null||o.call(n))}catch(a){this.__done=!0,this.__error||(this.__error=a),this.__blocker=void 0}if(this.__error&&!(this.__awaited||this.__error instanceof Na))throw this.__error}finally{kt=void 0}}isReady(){return this.__done}get value(){return this.__value}get error(){return this.__error}markAwaited(){this.__awaited=!0}waitForFrames(e){if(e<=0)throw new b("Number of frames to wait for must be >0");return{isReady(){return--e<=0}}}waitForSeconds(e){const r=this.__supervisor.system,i=r.time+e;return{isReady(){return r.time>=i}}}waitUntil(e){return{isReady:e}}cancel(){var e;return(e=this.__blocker)!=null&&e.cancel?this.__blocker.cancel():(this.__error=new Na,this.__done=!0),this}cancelIf(e){return this.__cancellers.push(e),this}scope(e){if(this.__scope)throw new b("Scope already set for this coroutine");if(this.__cancellers.length)throw new b("Scope must be set before any cancelation conditions");return this.__scope=e,this.cancelIf(()=>!e.alive),this}cancelIfComponentMissing(e){if(!this.__scope)throw new b("Required scope not set for this coroutine");return this.cancelIf(()=>{var r;return!((r=this.__scope)!=null&&r.has(e))}),this}cancelIfCoroutineStarted(e){return this.__supervisor.registerCancelIfStarted(this,this.__scope,e===nr.self?this.__fn:e),this}return(e){throw new b("Generator methods not available for coroutines")}throw(e){throw new b("Generator methods not available for coroutines")}next(...e){throw new b("Generator methods not available for coroutines")}[Symbol.iterator](){throw new b("Generator methods not available for coroutines")}}function nr(t,e,r){const i=r.value;return{value(...s){return this.start(i,...s)}}}nr.waitForFrames=function(t){return kr(),kt.waitForFrames(t)};nr.waitForSeconds=function(t){return kr(),kt.waitForSeconds(t)};nr.waitUntil=function(t){return kr(),kt.waitUntil(t)};nr.cancel=function(){kr(),kt.cancel()};nr.cancelIf=function(t){return kr(),kt.cancelIf(t)};nr.scope=function(t){return kr(),kt.scope(t)};nr.cancelIfComponentMissing=function(t){return kr(),kt.cancelIfComponentMissing(t)};nr.cancelIfCoroutineStarted=function(t){return kr(),kt.cancelIfCoroutineStarted(t)};nr.self=function*(){yield};function kr(){if(!kt)throw new b("Cannot call co methods outside coroutine context")}class oh{constructor(e){f(this,"system");f(this,"coroutines",[]);f(this,"mutuallyExclusiveCoroutines",new Map);this.system=e}start(e,...r){const i=new nh(e.apply(this.system,r),e,this);return this.coroutines.push(i),i}execute(){let e=0;for(;e<this.coroutines.length;){const r=e;e=this.coroutines.length;for(let i=e-1;i>=r;i--)this.system.accessRecentlyDeletedData(!1),this.coroutines[i].__checkCancelation();for(let i=e-1;i>=r;i--){this.system.accessRecentlyDeletedData(!1);const s=this.coroutines[i];s.__step(),s.isReady()&&(this.coroutines.splice(i,1),e-=1)}}}registerCancelIfStarted(e,r,i){var n;const s=((r==null?void 0:r.__id)??"")+((i==null?void 0:i.name)??"");this.mutuallyExclusiveCoroutines.has(s)||this.mutuallyExclusiveCoroutines.set(s,[]),(n=this.mutuallyExclusiveCoroutines.get(s))==null||n.push(e)}cancelMatching(e,r,i){this.cancelMatchingKey(e,""),this.cancelMatchingKey(e,i.name),r&&(this.cancelMatchingKey(e,""+r.__id),this.cancelMatchingKey(e,""+r.__id+i.name))}cancelMatchingKey(e,r){const i=this.mutuallyExclusiveCoroutines.get(r);if(i){let s=!1;for(const n of i)n===e?s=!0:n.cancel();i.length=0,s&&i.push(e)}}}var St;(function(t){t[t.RUNNING=0]="RUNNING",t[t.STOPPED=1]="STOPPED"})(St||(St={}));class bo{constructor(e,r,i){f(this,"access");f(this,"type");f(this,"initialValues");this.access=e,this.type=r,this.initialValues=i}}class sc{constructor(e){f(this,"type");this.type=e}}class x{constructor(){f(this,"__queryBuilders",[]);f(this,"__scheduleBuilder");f(this,"__attachPlaceholders",[]);f(this,"__singletonPlaceholders",[]);f(this,"__supervisor",new oh(this));f(this,"__dispatcher");f(this,"id");f(this,"time");f(this,"delta")}static group(...e){return new wi(e)}get name(){return this.constructor.name}query(e){const r=new sh,i=new ih(e,r);if(!this.__queryBuilders)throw new b(`Attempt to create a new query after world initialized in system ${this.name}`);return this.__queryBuilders.push(i),r}schedule(e){if(this.__scheduleBuilder===null)throw new b(`Attempt to define schedule after world initialized in system ${this.name}`);if(this.__scheduleBuilder)throw new b(`Attempt to define multiple schedules in system ${this.name}`);const r=new rc;return this.__scheduleBuilder=new tc(e,r),r}attach(e){if(!this.__attachPlaceholders)throw new b(`Attempt to attach a system after world initialized in system ${this.name}`);const r=new sc(e);return this.__attachPlaceholders.push(r),r}createEntity(...e){return this.__dispatcher.createEntity(e)}accessRecentlyDeletedData(e=!0){this.__dispatcher.registry.includeRecentlyDeleted=e}start(e,...r){return this.__supervisor.start(e,...r)}async prepare(){}initialize(){}execute(){}finalize(){}}f(x,"__system",!0);Object.defineProperty(x.prototype,"singleton",{get(){const t=this,e={read(r){if(!t.__singletonPlaceholders)throw new b(`Attempt to declare a singleton after world initialized in system ${t.name}`);Ia(r),t.query(s=>s.using(r).read);const i=new bo("read",r);return t.__singletonPlaceholders.push(i),i},write(r,i){if(!t.__singletonPlaceholders)throw new b(`Attempt to declare a singleton after world initialized in system ${t.name}`);Ia(r),t.query(n=>n.using(r).write);const s=new bo("write",r,i);return t.__singletonPlaceholders.push(s),s}};return Object.defineProperty(this,"singleton",{value:e,configurable:!0}),e}});class ro{constructor(e,r){f(this,"system");f(this,"dispatcher");this.system=e,this.dispatcher=r,e.__dispatcher=r,this.accessMasks={read:[],update:[],create:[],write:[],check:[]},this.shapeQueries=[],this.shapeQueriesByComponent=[],this.writeQueries=[],this.writeQueriesByComponent=[],this.state=St.RUNNING,this.propsAssigned=!1,this.stateless=!1,this.weight=1,this.shapeLogPointer=r.shapeLog.createPointer(),this.stats=r.stats.forSystem(e.constructor),this.attachedSystems=this.system.__attachPlaceholders.map(i=>this.dispatcher.systemsByClass.get(i.type)),this.singletonComponentDefs=this.system.__singletonPlaceholders.flatMap(i=>i.initialValues?[i.type,i.initialValues]:[i.type]),this.singletonStandingWrites=this.system.__singletonPlaceholders.filter(i=>i.access==="write").map(i=>i.type)}get id(){return this.system.id}get name(){return this.system.name}toString(){return this.name}assignProps(e){if(this.propsAssigned)throw new b(`System ${this.name} has multiple props assigned in world defs`);Object.assign(this.system,e),this.propsAssigned=!0}buildQueries(){for(const e of this.system.__queryBuilders)e.__build(this);this.system.__queryBuilders=null,this.hasNegativeQueries=!!this.shapeQueriesByComponent[this.dispatcher.registry.Alive.id],this.hasWriteQueries=!!this.writeQueries.length,this.hasTransientQueries=this.shapeQueries.some(e=>e.hasTransientResults)}buildSchedule(){var r;const e=this.system.constructor.__staticScheduler;e&&this.system.schedule(e),(r=this.system.__scheduleBuilder)==null||r.__build([this],`system ${this.name}`),this.system.__scheduleBuilder=null}finishConstructing(){var e;this.writeLogPointer=(e=this.dispatcher.writeLog)==null?void 0:e.createPointer(),this.singletonStandingWrites=this.singletonStandingWrites.filter(r=>r.__binding.trackedWrites)}replacePlaceholders(){const e=this.system;for(const r in this.system){const i=e[r];if(i instanceof sc){const s=i.type,n=this.dispatcher.systemsByClass.get(s);if(!n)throw new b(`Attached system ${s.name} not defined in this world`);e[r]=n.system}else i instanceof bo&&(e[r]=this.dispatcher.singleton[i.access](i.type))}this.system.__attachPlaceholders=null,this.system.__singletonPlaceholders=null,this.dispatcher.singleton&&Object.defineProperty(this.system,"singleton",{value:this.dispatcher.singleton})}prepare(){return this.system.prepare()}initialize(){this.dispatcher.registry.executingSystem=this,this.system.initialize(),this.trackStandingWrites()}finalize(){this.dispatcher.registry.executingSystem=this,this.system.finalize(),this.trackStandingWrites()}execute(e,r){if(this.state!==St.RUNNING)return;this.dispatcher.registry.executingSystem=this,this.system.time=e,this.system.delta=r;let i,s,n,o;i=mi(),this.runQueries(),s=mi(),this.system.execute(),n=mi(),this.system.__supervisor.execute(),this.trackStandingWrites(),o=mi(),this.stats.lastQueryUpdateDuration=s-i,this.stats.lastExecutionDuration=n-s,this.stats.lastCoroutinesDuration=o-n}trackStandingWrites(){const e=this.dispatcher.singleton;for(const r of this.singletonStandingWrites)this.dispatcher.registry.trackWrite(e.__id,r)}runQueries(){const e=this.ranQueriesLastFrame;this.ranQueriesLastFrame=!1;const r=this.dispatcher.shapeLog.hasUpdatesSince(this.shapeLogPointer),i=this.hasWriteQueries&&this.dispatcher.writeLog.hasUpdatesSince(this.writeLogPointer);if(r||i||this.hasTransientQueries&&e){if(this.hasTransientQueries)for(const s of this.shapeQueries)s.clearTransientResults();if(r||i){this.ranQueriesLastFrame=!0,r&&this.__updateShapeQueries(),i&&this.__updateWriteQueries();for(const s of this.shapeQueries)s.sort()}}}__updateShapeQueries(){const e=this.dispatcher.shapeLog;if(!this.shapeQueries.length){e.createPointer(this.shapeLogPointer);return}for(const a of this.shapeQueries)a.clearProcessedEntities();let r,i=0,s,n,o;for(;[s,n,o]=e.processSince(this.shapeLogPointer),!!s;){i&&!r&&(n+=i,i=0);for(let a=n;a<o;a++){const l=s[a],c=l&Et;if(!r){const u=l>>>He&tn,h=l&2**31;if(r=this.shapeQueriesByComponent[u],h){if(i=c,!r){const _=Math.min(i,o-a);a+=_,i-=_}continue}if(!r)continue;i=1}if(l&2**31)throw new L("Trying to process run header as entry in shape log");for(let u=0;u<r.length;u++)r[u].handleShapeUpdate(c);--i===0&&(r=void 0)}}}__updateWriteQueries(){const e=this.dispatcher.writeLog;if(!this.writeQueries.length){e.createPointer(this.writeLogPointer);return}let r,i=0,s,n,o,a,l;for(;[o,a,l]=e.processSince(this.writeLogPointer),!!o;){i&&!r&&(a+=i,i=0);for(let c=a;c<l;c++){const u=o[c],h=u&Et;if(!r){const _=u>>>He&tn,p=u&2**31;if(s=_>>5,n=1<<(_&31),r=this.writeQueriesByComponent[_],p){if(i=h,!r){const d=Math.min(i,l-c);c+=d,i-=d}continue}if(!r)continue;i=1}if(u&2**31)throw new L("Trying to process run header as entry in write log");for(let _=0;_<r.length;_++)r[_].handleWrite(h,s,n);--i===0&&(r=void 0)}}}stop(){if(this.state!==St.STOPPED){this.state=St.STOPPED;for(const e of this.shapeQueries)e.clearAllResults()}}restart(){var e;if(this.state===St.STOPPED){const r=this.dispatcher.registry,i=r.Alive;for(const s of this.shapeQueries)s.clearProcessedEntities();for(let s=0;s<this.dispatcher.maxEntities;s++)if(r.hasShape(s,i,!1))for(const n of this.shapeQueries)n.handleShapeUpdate(s);for(const s of this.shapeQueries)s.clearTransientResults(),s.sort();this.dispatcher.shapeLog.createPointer(this.shapeLogPointer),(e=this.dispatcher.writeLog)==null||e.createPointer(this.writeLogPointer)}this.state=St.RUNNING}}class xn{constructor(e,r){f(this,"name");f(this,"__types");f(this,"__binding");this.name=e,this.__types=Array.from(new Set(r))}}const ut=2;class ah{constructor(e,r){f(this,"maxItems");f(this,"configParamName");f(this,"data");this.maxItems=e,this.configParamName=r,this.data=new Uint32Array(new ArrayBuffer((e+ut)*Uint32Array.BYTES_PER_ELEMENT))}get length(){return this.data[0]}take(){const e=--this.data[0];if(e<0)throw new RangeError(`Pool capacity exceeded, please raise ${this.configParamName} above ${this.maxItems}`);return this.data[e+ut]}return(e){if(this.length>=this.maxItems)throw new L("Internal error, returned entity ID exceeded pool capacity");this.data[this.length+ut]=e,this.data[0]+=1}mark(){this.data[1]=this.data[0]}peekSinceMark(e){const r=this.data[1]+e;if(r<this.data[0])return this.data[r+ut]}refill(e){if(!e.length)return;const r=this.length,i=r+e.length;if(i>this.maxItems)throw new L("Internal error, returned entity ID exceeded pool capacity");this.data.set(e,r+ut),this.data[0]=i}fillWithDescendingIntegers(e){const r=this.length+ut;for(let i=this.data.length-1;i>=r;i--)this.data[i]=e++;this.data[0]=this.data.length-ut}}class lh{constructor(e,r,i){f(this,"maxItems");f(this,"configParamName");f(this,"data");this.maxItems=e,this.configParamName=r,i.register(`pool.${r}`,e+ut,Uint32Array,s=>{this.data=s})}get length(){return this.data[0]}take(){const e=Atomics.sub(this.data,0,1);if(e<0)throw new RangeError(`Pool capacity exceeded, please raise ${this.configParamName} above ${this.maxItems}`);return this.data[e+ut]}return(e){if(this.length>=this.maxItems)throw new L("Internal error, returned entity ID exceeded pool capacity");this.data[this.length+ut]=e,this.data[0]+=1}mark(){this.data[1]=this.data[0]}peekSinceMark(e){const r=this.data[1]+e;if(r<this.data[0])return this.data[r+ut]}refill(e){if(!e.length)return;const r=this.length,i=r+e.length;if(i>this.maxItems)throw new L("Internal error, returned entity ID exceeded pool capacity");this.data.set(e,r+ut),this.data[0]=i}fillWithDescendingIntegers(e){const r=this.length+ut;for(let i=this.data.length-1;i>=r;i--)this.data[i]=e++;this.data[0]=this.data.length-ut}}class ch{constructor(e,r,i,s){f(this,"stride");f(this,"array");this.stride=Math.ceil(r/32),s.register(e,i*this.stride,Uint32Array,n=>{this.array=n})}syncThreads(){}set(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask,o=i.shapeValue;this.array[s]&=~n,this.array[s]|=o}unset(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask;this.array[s]&=~n}isSet(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask,o=i.shapeValue;return(this.array[s]&n)===o}get(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask;return(this.array[s]&n)>>>i.shapeShift}clear(){this.array.fill(0)}match(e,r,i){if(r.length!==i.length)throw new L(`Mismatched mask and value lengths: ${r.length} vs ${i.length}`);const s=this.array,n=e*this.stride;for(let o=0;o<r.length;o++)if((s[n+o]&r[o])!==i[o])return!1;return!0}matchNot(e,r){const i=this.array,s=e*this.stride;for(let n=0;n<r.length;n++)if(i[s+n]&r[n])return!1;return!0}matchAny(e,r){r.changed=!1;const i=r.mask,s=r.lastMatches[e]=r.lastMatches[e]||[],n=this.array,o=e*this.stride;let a=!1;for(let l=0;l<i.length;l++){const c=n[o+l]&i[l];c!==0&&(a=!0),c!==s[l]&&(r.changed=!0),s[l]=c}return a||delete r.lastMatches[e],a}}class uh{constructor(e,r,i,s){f(this,"stride");f(this,"array");this.stride=Math.ceil(r/32),s.register(e,i*this.stride,Uint32Array,n=>{this.array=n})}syncThreads(){Atomics.load(this.array,0)}set(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask,o=i.shapeValue;n!==o&&Atomics.and(this.array,s,~n),Atomics.or(this.array,s,o)}unset(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask;Atomics.and(this.array,s,~n)}isSet(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask,o=i.shapeValue;return r.id===0?(Atomics.load(this.array,s)&n)===o:(this.array[s]&n)===o}get(e,r){const i=r.__binding,s=e*this.stride+i.shapeOffset,n=i.shapeMask;return(this.array[s]&n)>>>i.shapeShift}clear(){this.array.fill(0)}match(e,r,i){if(r.length!==i.length)throw new L(`Mismatched mask and value lengths: ${r.length} vs ${i.length}`);const s=this.array,n=e*this.stride;for(let o=0;o<r.length;o++)if((s[n+o]&r[o])!==i[o])return!1;return!0}matchNot(e,r){const i=this.array,s=e*this.stride;for(let n=0;n<r.length;n++)if(i[s+n]&r[n])return!1;return!0}matchAny(e,r){r.changed=!1;const i=r.mask,s=r.lastMatches[e]=r.lastMatches[e]||[],n=this.array,o=e*this.stride;for(let a=0;a<i.length;a++){const l=n[o+a]&i[a];if(l===0)return delete r.lastMatches[e],!1;l!==s[a]&&(r.changed=!0),s[a]=l}return!0}}const hh=[EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AggregateError,b,L];class _h{constructor(e,r){f(this,"registry");f(this,"borrowed");f(this,"borrowCounts");f(this,"spares",[]);f(this,"temporarilyBorrowedIds",[]);this.registry=e,this.borrowed=Array.from({length:r}),this.borrowCounts=new Int32Array(r)}borrow(e){this.borrowCounts[e]+=1;let r=this.borrowed[e];return r||(r=this.borrowed[e]=this.spares.pop()??new ec(this.registry),r.__id=e),r}borrowTemporarily(e){const r=this.borrow(e);return this.temporarilyBorrowedIds.push(e),r}returnTemporaryBorrows(){for(const e of this.temporarilyBorrowedIds)this.return(e);this.temporarilyBorrowedIds.length=0}return(e){if(!this.borrowCounts[e])throw new L("Returning entity with no borrows");if(--this.borrowCounts[e]<=0){const r=this.borrowed[e];this.borrowed[e]=void 0;{r.__valid=!1;return}}}}var Ao;class dh{constructor(e,r,i,s,n){f(this,"types");f(this,"enums");f(this,"dispatcher");f(this,"allocationItems");f(this,"numShapeBits",0);f(this,"shapes");f(this,"staleShapes");f(this,"removedShapes");f(this,"entityIdPool");f(this,"pool");f(this,"heldEntities");f(this,"validators");f(this,"reshapedEntityIds",[]);f(this,"validateSystem");f(this,"executingSystem");f(this,"includeRecentlyDeleted",!1);f(this,"hasNegativeQueries",!1);f(this,"nextEntityOrdinal",0);f(this,"entityOrdinals");f(this,"removalLog");f(this,"prevRemovalPointer");f(this,"oldRemovalPointer");f(this,"Alive",(Ao=class{},f(Ao,"__internal",!0),Ao));this.types=i,this.enums=s,this.dispatcher=n,this.allocationItems=this.prepareComponentTypesAndEnums();for(const a of this.allocationItems)this.numShapeBits+=a.size;const o=n.threaded?uh:ch;this.shapes=new o("registry.shapes",this.numShapeBits,e,n.buffers),this.staleShapes=new o("registry.staleShapes",this.numShapeBits,e,n.buffers),this.removedShapes=new o("registry.removedShapes",this.numShapeBits,e,n.buffers),this.entityIdPool=n.threaded?new lh(e,"maxEntities",n.buffers):new ah(e,"maxEntities"),this.entityOrdinals=n.buffers.register("registry.entityOrdinals",e,Uint32Array,a=>{this.entityOrdinals=a}),this.entityIdPool.fillWithDescendingIntegers(0),this.pool=new _h(this,e),this.heldEntities=[],this.validators=[],this.removalLog=new rn(r,"maxLimboComponents",n.buffers),this.prevRemovalPointer=this.removalLog.createPointer(),this.oldRemovalPointer=this.removalLog.createPointer()}initializeComponentTypes(){let e=0,r=0;for(;this.allocationItems.length;){const i=e%32,s=this.removeBiggestNoLargerThan(32-i);if(!s){e+=32-i;continue}const n={offset:e>>>5,mask:(1<<s.size)-1<<i,value:1<<i};if(e+=s.size,s.typeOrEnum instanceof xn){const o=s.typeOrEnum;o.__binding={shapeOffset:n.offset,shapeMask:n.mask,shapeShift:i};for(const a of o.__types)Sa(r++,a,n,this.dispatcher),a.validate&&this.validators.push(a),n.value+=1<<i}else{const o=s.typeOrEnum;Sa(r++,o,n,this.dispatcher),o.validate&&this.validators.push(o)}}for(const i of this.types)Ku(i);{const i=this.Alive.__binding;if(!(i.shapeOffset===0&&i.shapeMask===1&&i.shapeValue===1))throw new L("Alive component was not assigned first available shape mask")}}prepareComponentTypesAndEnums(){const e=[],r=new Set,i=new Set;let s=0;for(const n of this.types){if(n.name||Object.defineProperty(n,"name",{value:`Anonymous_${s++}`}),!n.__internal){if(i.has(n.name))throw new b(`Multiple component types named ${n.name}; names must be unique`);i.add(n.name)}if(n.enum){if(!this.enums.includes(n.enum))throw new b(`Component type ${n.name} references an enum that's not in the world's defs`);n.enum.__types.includes(n)||n.enum.__types.push(n)}this.dispatcher.stats.forComponent(n)}for(const n of this.enums){if(n.__types.length>2**31)throw new b(`Too many types in enum: ${n.__types.length}`);e.push({typeOrEnum:n,size:Math.ceil(Math.log2(n.__types.length+1))});for(const o of n.__types){if(r.has(o))throw new b(`Component type ${o.name} is a member of more than one enum`);o.enum=n,r.add(o)}}for(const n of this.types)r.has(n)||e.push({typeOrEnum:n,size:1});return e.sort((n,o)=>o.size-n.size),this.types.unshift(this.Alive),e.unshift({typeOrEnum:this.Alive,size:1}),e}removeBiggestNoLargerThan(e){const r=this.allocationItems.findIndex(i=>i.size<=e);if(r!==-1)return this.allocationItems.splice(r,1)[0]}releaseComponentTypes(){for(const e of this.types)Qu(e);for(const e of this.enums)delete e.__binding}createEntity(e){const r=this.entityIdPool.take();this.entityOrdinals[r]=this.nextEntityOrdinal++,this.setShape(r,this.Alive);const i=this.pool.borrowTemporarily(r);return this.createComponents(r,e),this.dispatcher.stats.numEntities+=1,i}createComponents(e,r){var i,s;for(let n=0;n<r.length;n++){const o=r[n];{if(typeof o!="function")throw new b(`Bad arguments to createEntity: expected component type, got: ${o}`);Gr(o);const l=(i=this.executingSystem)==null?void 0:i.accessMasks.create;if(l){const c=o.__binding;if(!((l[c.shapeOffset]??0)&c.shapeMask))throw new b(`System ${(s=this.executingSystem)==null?void 0:s.name} didn't mark component ${o.name} as createable`)}if(o.enum){if(this.getEnumShape(e,o.enum,!1))throw new b("Can't add multiple components from the same enum when creating entity: "+o.name)}else if(this.hasShape(e,o,!1))throw new b(`Duplicate ${o.name} component when creating entity`)}let a=r[n+1];typeof a=="function"?a=void 0:n++,this.setShape(e,o),this.dispatcher.stats.forComponent(o).numEntities+=1,Jl(o,e,a)}}flush(){const e=this.executingSystem;this.includeRecentlyDeleted=!1,this.validateShapes(e),this.executingSystem=void 0,this.pool.returnTemporaryBorrows(),this.removalLog.commit()}completeCycle(){this.processRemovalLog(),this.invalidateDeletedHeldEntities()}validateShapes(e){this.executingSystem=this.validateSystem;for(const r of this.reshapedEntityIds)for(const i of this.validators)try{i.validate(this.pool.borrowTemporarily(r))}catch(s){if(!hh.includes(s.constructor)){const n=e?` after system ${e.name} executed`:"",o=this.types.filter(a=>a!==this.Alive&&this.hasShape(r,a,!1)).map(a=>a.name).join(", ")||"none";s.message=`An entity failed to satisfy ${i.name}.validate${n}: ${s.message} (components: ${o})`}throw s}this.reshapedEntityIds.length=0}processRemovalLog(){var o;const e=this.dispatcher.indexer;this.removalLog.commit(),this.entityIdPool.mark();let r=0,i,s,n;for(this.dispatcher.stats.maxLimboComponents=this.removalLog.countSince(this.removalLog.copyPointer(this.oldRemovalPointer));[i,s,n]=this.removalLog.processSince(this.oldRemovalPointer,this.prevRemovalPointer),!!i;)for(let a=s;a<n;a++){const l=i[a],c=l&Et,u=l>>>He&tn,h=this.types[u];!this.shapes.isSet(c,h)&&!this.removedShapes.isSet(c,h)&&(this.staleShapes.unset(c,h),h===this.Alive?(e.clearAllRefs(c,!0),this.entityIdPool.return(c),r+=1):this.clearRefs(c,h,!0),(o=h.__free)==null||o.call(h,c),this.removedShapes.set(c,h))}this.dispatcher.stats.numEntities-=r,this.removedShapes.clear(),this.removalLog.createPointer(this.prevRemovalPointer)}invalidateDeletedHeldEntities(){let e=0,r;for(;(r=this.entityIdPool.peekSinceMark(e++))!==void 0;){const i=this.heldEntities[r];i&&(i.__valid=!1,delete this.heldEntities[r])}}holdEntity(e){let r;return r=this.heldEntities[e],r||(r=new ec(this),r.__id=e,this.heldEntities[e]=r),r}hasShape(e,r,i){return!!(this.shapes.isSet(e,r)||i&&this.includeRecentlyDeleted&&this.staleShapes.isSet(e,r))}getEnumShape(e,r,i){let s=this.shapes.get(e,r);if(s===0&&i&&this.includeRecentlyDeleted&&(s=this.staleShapes.get(e,r)),s>0)return r.__types[s-1]}setShape(e,r){if(r.enum){const i=this.getEnumShape(e,r.enum,!1);i&&this.clearShape(e,i)}this.shapes.set(e,r),this.staleShapes.set(e,r),this.reshapedEntityIds.push(e),(r!==this.Alive||this.hasNegativeQueries)&&this.dispatcher.shapeLog.push(e|r.id<<He,r)}clearShape(e,r){this.clearRefs(e,r,!1),this.shapes.unset(e,r),this.removedShapes.set(e,r),this.reshapedEntityIds.push(e);const i=e|r.id<<He;this.removalLog.push(i),(r!==this.Alive||this.hasNegativeQueries)&&this.dispatcher.shapeLog.push(i,r),this.dispatcher.stats.forComponent(r).numEntities-=1}trackWrite(e,r){this.dispatcher.writeLog.push(e|r.id<<He,r)}clearRefs(e,r,i){if(!!r.__binding.refFields.length){r.__bind(e,!0);for(const n of r.__binding.refFields)n.clearRef(i)}}matchShape(e,r,i,s,n,o){if(r&&i&&!this.shapes.match(e,r,i)||n&&!this.shapes.matchNot(e,n))return!1;if(o){for(const a of o)if(this.shapes.isSet(e,a))return!1}if(s){for(const a of s)if(a.lastMatches){if(!this.shapes.matchAny(e,a))return!1}else if(this.shapes.matchNot(e,a.mask))return!1}return!0}}const Ca=.05;function io(t,e){return e*Ca+t*(1-Ca)}class fh{constructor(e){f(this,"type");f(this,"_numEntities",0);f(this,"maxEntities",0);f(this,"capacity",0);this.type=e}get numEntities(){return this._numEntities}set numEntities(e){this._numEntities=e,e>this.maxEntities&&(this.maxEntities=e)}toString(){return`${this.numEntities.toLocaleString()} of ${this.maxEntities.toLocaleString()} peak (capacity ${this.capacity.toLocaleString()})`}}class ph{constructor(e){f(this,"type");f(this,"worker");f(this,"_lastQueryUpdateDuration",0);f(this,"averageQueryUpdateDuration",0);f(this,"_lastExecutionDuration",0);f(this,"averageExecutionDuration",0);f(this,"_lastCoroutinesDuration",0);f(this,"averageCoroutinesDuration",0);this.type=e}get lastQueryUpdateDuration(){return this._lastQueryUpdateDuration}set lastQueryUpdateDuration(e){this._lastQueryUpdateDuration=e,this.averageQueryUpdateDuration=io(this.averageQueryUpdateDuration,e)}get lastExecutionDuration(){return this._lastExecutionDuration}set lastExecutionDuration(e){this._lastExecutionDuration=e,this.averageExecutionDuration=io(this.averageExecutionDuration,e)}get lastCoroutinesDuration(){return this._lastCoroutinesDuration}set lastCoroutinesDuration(e){this._lastCoroutinesDuration=e,this.averageCoroutinesDuration=io(this.averageCoroutinesDuration,e)}}class mh{constructor(){f(this,"frames",0);f(this,"_numEntities",0);f(this,"_maxEntities",0);f(this,"_maxLimboComponents",0);f(this,"_maxRefChangesPerFrame",0);f(this,"_maxShapeChangesPerFrame",0);f(this,"_maxWritesPerFrame",0);f(this,"components",Object.create(null));f(this,"systems",Object.create(null))}get maxEntities(){return this._maxEntities}get numEntities(){return this._numEntities}set numEntities(e){this._numEntities=e,e>this._maxEntities&&(this._maxEntities=e)}get maxLimboComponents(){return this._maxLimboComponents}set maxLimboComponents(e){e>this._maxLimboComponents&&(this._maxLimboComponents=e)}get maxRefChangesPerFrame(){return this._maxRefChangesPerFrame}set maxRefChangesPerFrame(e){e>this._maxRefChangesPerFrame&&(this._maxRefChangesPerFrame=e)}get maxShapeChangesPerFrame(){return this._maxShapeChangesPerFrame}set maxShapeChangesPerFrame(e){e>this._maxShapeChangesPerFrame&&(this._maxShapeChangesPerFrame=e)}get maxWritesPerFrame(){return this._maxWritesPerFrame}set maxWritesPerFrame(e){e>this._maxWritesPerFrame&&(this._maxWritesPerFrame=e)}forComponent(e){const r=this.components[e.name]??new fh(e);return e.__internal||(this.components[e.name]=r),r}forSystem(e){const r=this.systems[e.name]??new ph(e);return e.__internal||(this.systems[e.name]=r),r}toString(){return`World stats:
  frames: ${this.frames.toLocaleString()}
  entities: ${this.numEntities.toLocaleString()} of ${this.maxEntities.toLocaleString()} max
  refs: ${this.maxRefChangesPerFrame.toLocaleString()} ref changes/frame max
  logs: ${this.maxShapeChangesPerFrame.toLocaleString()} shape changes/frame max, ${this.maxWritesPerFrame.toLocaleString()} writes/frame max
  components: (${this.maxLimboComponents.toLocaleString()} limbo max)
`+Object.keys(this.components).map(e=>{const r=this.components[e];return`    ${e}: ${r.numEntities} (max ${r.maxEntities})`}).join(`
`)}}var bt;(function(t){t[t.REFERENCE=0]="REFERENCE",t[t.UNREFERENCE=1073741824]="UNREFERENCE",t[t.RELEASE=2147483648]="RELEASE",t[t.UNREFERENCE_AND_RELEASE=-1073741824]="UNREFERENCE_AND_RELEASE"})(bt||(bt={}));const gh=bt.UNREFERENCE_AND_RELEASE;class Ma{constructor(e,r,i,s){f(this,"targetEntityId");f(this,"selector");f(this,"trackStale");f(this,"dispatcher");f(this,"entities",[]);f(this,"tags");f(this,"entityIndex");f(this,"clearing",!1);f(this,"registry");var a;this.targetEntityId=e,this.selector=r,this.trackStale=i,this.dispatcher=s;const n=(a=r.sourceType)==null?void 0:a.__binding;r.matchType&&(r.matchSeq&&!n.fields[r.sourceSeq].type.internallyIndexed||n.refFields.length===1&&!n.refFields[0].type.internallyIndexed)||(this.tags=[]),this.registry=s.registry}clearAllRefs(e){if(!this.tags)throw new L("Unreferencing an untagged tracker");this.clearing=!0;for(let r=0;r<this.entities.length;r++){const i=this.entities[r].__id,s=this.tags[r];if(typeof s=="number")this.clearRef(i,s,e);else for(const n of s)this.clearRef(i,n,e)}this.entities=[],this.tags&&(this.tags=[]),this.entityIndex=void 0,this.clearing=!1}clearRef(e,r,i){const s=r&tn,n=r>>>pi&Uu,o=r>>>pi+wo,a=this.registry.types[s];Ro(a,this.registry.executingSystem,"write"),a.__bind(e,!0),a.__binding.fields[n].clearRef(i,this.targetEntityId,o)}trackReference(e,r,i,s,n){if(this.clearing)throw new L("Cannot track a new reference while clearing tracker");n&&this.checkUpdateMask();let o=this.getEntityIndex(e);o===void 0&&(o=this.addEntity(e,n)),this.addTag(o,this.makeTag(r,i,s))}trackUnreference(e,r,i,s,n){if(this.clearing)return;n&&this.checkUpdateMask();const o=this.getEntityIndex(e);if(o===void 0)throw new L("Entity backref not tracked");this.removeTag(o,this.makeTag(r,i,s))&&this.removeEntity(o,e,n)}getEntityIndex(e){if(this.entityIndex)return this.entityIndex[e];const r=this.entities.findIndex(i=>i.__id===e);if(r>=0)return r}indexEntities(){if(this.entityIndex)throw new L("Entities already indexed");this.entityIndex=new Array(this.dispatcher.maxEntities);for(let e=0;e<this.entities.length;e++)this.entityIndex[this.entities[e].__id]=e}addTag(e,r){if(!this.tags)return;const i=this.tags[e];if(i===void 0)this.tags[e]=r;else if(typeof i=="number"){if(i===r)throw new L(`Ref ${r} already tracked (single)`);this.tags[e]=[i,r]}else if(Array.isArray(i)){if(i.includes(r))throw new L(`Ref ${r} already tracked (array)`);i.length>=1e3?(this.tags[e]=new Set(i)).add(r):i.push(r)}else{if(i.has(r))throw new L(`Ref ${r} already tracked (set)`);i.add(r)}}removeTag(e,r){if(!this.tags)return!0;const i=this.tags[e];if(i===void 0)throw new L(`Ref ${r} not tracked (none)`);if(typeof i=="number"){if(i!==r)throw new L(`Ref ${r} not tracked (single ${i})`);return delete this.tags[e],!0}if(Array.isArray(i)){const s=i.indexOf(r);if(s===-1)throw new L(`Ref ${r} not tracked (array ${i})`);return i.splice(s,1),!this.tags.length}if(!i.has(r))throw new L(`Ref ${r} not tracked (set ${new Array(...i)})`);return i.delete(r),!i.size}makeTag(e,r,i){return e|r<<pi|(i===void 0?0:i<<pi+wo)}addEntity(e,r){const i=this.entities.length;return this.entities.push(this.registry.pool.borrow(e)),this.entityIndex?this.entityIndex[e]=i:i>100&&this.indexEntities(),r&&this.trackBackrefsChange(),i}removeEntity(e,r,i){this.registry.pool.return(r);const s=this.entities.pop();if(this.entityIndex&&delete this.entityIndex[r],this.entities.length>e&&(this.entities[e]=s,this.entityIndex&&(this.entityIndex[s.__id]=e)),this.tags){const n=this.tags.pop();this.tags.length>e&&(this.tags[e]=n)}i&&this.trackBackrefsChange()}trackBackrefsChange(){for(const e of this.selector.targetTypes)e.__binding.trackedWrites&&this.registry.trackWrite(this.targetEntityId,e)}checkUpdateMask(){const e=this.registry.executingSystem;for(const r of this.selector.targetTypes)this.registry.hasShape(this.targetEntityId,r,this.trackStale)&&Ro(r,e,"update")}}class Eh{constructor(e,r){f(this,"dispatcher");f(this,"maxRefChangesPerFrame");f(this,"refLog");f(this,"refLogPointer");f(this,"refLogStatsPointer");f(this,"selectorIdsBySourceKey",new Map);f(this,"selectors",[]);f(this,"trackers",new Map);f(this,"registry");this.dispatcher=e,this.maxRefChangesPerFrame=r,this.registry=e.registry}completeCycle(){var e;this.flush(),this.dispatcher.stats.maxRefChangesPerFrame=((e=this.refLog)==null?void 0:e.countSince(this.refLogStatsPointer))??0}registerSelector(e,r,i,s=!1){e&&Gr(e),r&&Gr(r),this.refLog||(this.refLog=new rn(this.maxRefChangesPerFrame,"maxRefChangesPerFrame",this.dispatcher.buffers,{localProcessingAllowed:!0}),this.refLogPointer=this.refLog.createPointer(),this.refLogStatsPointer=this.refLog.createPointer());const n=r?i===void 0?-2-r.id:r.id|i<<pi:-1;let o=this.selectorIdsBySourceKey.get(n);if(o===void 0){this.selectors.length||(s=!0);const a={id:this.selectors.length,targetTypes:e?[e]:[],sourceType:r,matchType:!!r,matchSeq:i!==void 0,sourceTypeId:r==null?void 0:r.id,sourceSeq:i,trackStale:s};if(this.selectors.push(a),o=a.id,this.selectorIdsBySourceKey.set(n,o),o>en)throw new b("Too many distinct backrefs selectors")}else{const a=this.selectors[o];a.trackStale=a.trackStale||s,e&&a.targetTypes.push(e)}return o}getBackrefs(e,r=0){const i=this.selectors[r];return this.getOrCreateTracker(i,e,this.registry.includeRecentlyDeleted).entities}trackRefChange(e,r,i,s,n,o,a,l){if(!this.refLog)throw new L("Trying to trackRefChange without a refLog");if(n===o&&a)throw new L("No-op call to trackRefChange");if(n!==-1){const c=(a?bt.UNREFERENCE:0)|(l?bt.RELEASE:0);if(!c)throw new L("Called trackRefChange with neither unreference nor release");this.pushRefLogEntry(e,r,i,s,n,c)}o!==-1&&this.pushRefLogEntry(e,r,i,s,o,bt.REFERENCE)}clearAllRefs(e,r){var i;this.selectors.length&&((i=this.getTracker(this.selectors[0],e,r))==null||i.clearAllRefs(r))}pushRefLogEntry(e,r,i,s,n,o){const a=typeof s<"u";if(a&&!r.__binding.fields[i].type.internallyIndexed)throw new L("Inconsistent internally indexed flag");this.refLog.push(e|r.id<<He),this.refLog.push(n|i<<He|o|(a?2**29:0)),a&&this.refLog.push(s),this.processEntry(e,r.id,i,s,n,o,!0)}getOrCreateTracker(e,r,i){let s=this.getTracker(e,r,i);if(s)return s;if(i&&!e.trackStale)throw new L("Selector not configured for stale tracking");let n;return s=new Ma(r,e,!1,this.dispatcher),this.trackers.set(r|e.id<<He,s),e.trackStale&&(n=new Ma(r,e,!0,this.dispatcher),this.trackers.set(r|e.id<<He|2**31,n)),i?n:s}getTracker(e,r,i){return this.trackers.get(r|e.id<<He|(i?2**31:0))}flush(){if(this.refLog)for(;;){const[e,r,i,s]=this.refLog.processAndCommitSince(this.refLogPointer);if(!e)break;if(!s)for(let n=r;n<i;n+=2){const o=e[n],a=e[n+1],l=o&Et,c=o>>>He,u=a&Et,h=a>>>He&Wo-1,_=a&gh,p=(a&2**29)!==0,d=p?e[n+2]:void 0;p&&(n+=1),this.processEntry(l,c,h,d,u,_,!1)}}}processEntry(e,r,i,s,n,o,a){for(let l=0;l<this.selectors.length;l++){const c=this.selectors[l];if((!c.matchType||c.sourceTypeId===r)&&(!c.matchSeq||c.sourceSeq===i)){if(o===bt.REFERENCE||o&bt.UNREFERENCE){const u=this.getOrCreateTracker(c,n,!1);o===bt.REFERENCE?u.trackReference(e,r,i,s,a):u.trackUnreference(e,r,i,s,a)}if(c.trackStale&&(o===bt.REFERENCE||o&bt.RELEASE)){const u=this.getOrCreateTracker(c,n,!0);o===bt.REFERENCE?u.trackReference(e,r,i,s,a):u.trackUnreference(e,r,i,s,a)}}}}}class Pa{constructor(){f(this,"buffer");f(this,"array");f(this,"update")}}const yh=new Map([[Uint8Array,"u8"],[Int8Array,"i8"],[Uint16Array,"u16"],[Int16Array,"i16"],[Uint32Array,"u32"],[Int32Array,"i32"],[Float32Array,"f32"],[Float64Array,"f64"]]),vh=new Map([["u8",Uint8Array],["i8",Int8Array],["u16",Uint16Array],["i16",Int16Array],["u32",Uint32Array],["i32",Int32Array],["f32",Float32Array],["f64",Float64Array]]);class Ah{constructor(e){f(this,"threaded");f(this,"items",new Map);f(this,"changes");this.threaded=e}register(e,r,i,s,n){const o=r*i.BYTES_PER_ELEMENT;let a=this.items.get(e);const l=!a||a.buffer.byteLength<o,c=l||a.array.constructor!==i;if(!a||l||c){const u=new Pa;u.buffer=l?this.threaded?new SharedArrayBuffer(o):new ArrayBuffer(o):a.buffer,u.array=new i(u.buffer),a?(u.array.set(a.array),n!==void 0&&u.array.length>a.array.length&&u.array.fill(n,a.array.length)):n!==void 0&&u.array.fill(n),a=u,this.items.set(e,a),this.threaded&&(this.changes||(this.changes=new Map),this.changes.set(e,{buffer:a.buffer,arrayKind:yh.get(i)})),s==null||s(a.array)}return a.update=s,a.array}makePatch(){if(!this.changes)return;const e=this.changes;return this.changes=void 0,e}applyPatch(e){var r,i;for(const[s,n]of e.entries()){const o=new Pa;o.update=(r=this.items.get(s))==null?void 0:r.update,o.buffer=n.buffer;const a=vh.get(n.arrayKind);o.array=new a(o.buffer),this.items.set(s,o),(i=o.update)==null||i.call(o,o.array)}}}function Wt(t,e,r){e.constructor.schema||(e.constructor.schema={}),e.constructor.schema[r]=t}function y(t){return function(e,r){const i="type"in t?t:{type:t};Wt(i,e,r)}}function Wr(t){const e=Wt.bind(null,{type:t});return e.vector=(r,i)=>(s,n)=>{Wt({type:M.vector(t,r,i)},s,n)},e}function wh(...t){if(typeof t[0]=="function"||t[0]===void 0)return Wt.bind(null,{type:M.backrefs(...t)});Wt({type:M.backrefs},t[0],t[1])}y.boolean=Wt.bind(null,{type:M.boolean});y.uint8=Wr(M.uint8);y.int8=Wr(M.int8);y.uint16=Wr(M.uint16);y.int16=Wr(M.int16);y.uint32=Wr(M.uint32);y.int32=Wr(M.int32);y.float32=Wr(M.float32);y.float64=Wr(M.float64);y.staticString=function(t){return Wt.bind(null,{type:M.staticString(t)})};y.dynamicString=function(t){return Wt.bind(null,{type:M.dynamicString(t)})};y.ref=Wt.bind(null,{type:M.ref});y.backrefs=wh;y.object=Wt.bind(null,{type:M.object});y.weakObject=Wt.bind(null,{type:M.weakObject});const Xs=[];function W(t,e){if(typeof t=="function")Xs.push(t);else return t instanceof xn?r=>{t.__types.includes(r)||t.__types.push(r),Xs.push(t),e&&(r.options=e)}:r=>{r.options=t,Xs.push(r)}}const Yi=[];function Ke(t,e){if(typeof t=="function"&&!t.__system&&(e=t,t=void 0),typeof t=="function")Yi.push(t);else return t&&!Yi.includes(t)&&Yi.push(t),r=>{t&&t.__contents.push(r),e&&(r.__staticScheduler=e),Yi.push(r)}}class sn{constructor(e){f(this,"vertices");f(this,"numVertices");f(this,"edges");f(this,"paths");f(this,"vertexIndexMap",new Map);f(this,"sealed",!1);f(this,"sortedVertices");f(this,"dependencyCounts");f(this,"traversalCounts");f(this,"numTraversedVertices");this.vertices=e,this.numVertices=e.length;for(let r=0;r<e.length;r++)this.vertexIndexMap.set(e[r],r);this.edges=new Array(this.numVertices**2).fill(0),this.dependencyCounts=new Array(this.numVertices),this.traversalCounts=new Array(this.numVertices)}get topologicallySortedVertices(){if(!this.sealed)throw new L("Graph not yet sealed");return this.sortedVertices||(this.sortedVertices=this.sortTopologically()),this.sortedVertices}getEdgeIndex(e,r){const i=this.vertexIndexMap.get(e),s=this.vertexIndexMap.get(r);if(i===void 0)throw new L(`Unknown vertex: ${e}`);if(s===void 0)throw new L(`Unknown vertex: ${r}`);return i*this.numVertices+s}setEdge(e,r,i){if(this.sealed)throw new L("Graph already sealed");if(e===r)return;const s=this.getEdgeIndex(e,r),n=this.getEdgeIndex(r,e),o=Math.abs(i);o<Math.abs(this.edges[s])||o<Math.abs(this.edges[n])||(this.edges[s]=i,o>Math.abs(this.edges[n])&&(this.edges[n]=0))}addEdge(e,r,i){if(i<=0)throw new L(`Edge has non-positive weight: ${i}`);this.setEdge(e,r,i)}denyEdge(e,r,i){if(i<=0)throw new L(`Edge has non-positive weight: ${i}`);this.setEdge(e,r,-i)}hasEdge(e,r){return this.edges[this.getEdgeIndex(e,r)]>0}hasPath(e,r){if(!this.sealed)throw new L("Graph not yet sealed");return this.paths[this.getEdgeIndex(e,r)]>0}hasEdgeBetweenIds(e,r){if(e>this.numVertices)throw new L(`Vertex id out of range: ${e} > ${this.numVertices}`);if(r>this.numVertices)throw new L(`Vertex id out of range: ${r} > ${this.numVertices}`);return this.edges[e*this.numVertices+r]>0}seal(){if(this.sealed)throw new L("Graph already sealed");this.sealed=!0,this.derivePaths(),this.checkForCycles(),this.simplify(),this.countDependencies()}checkForCycles(){const e=this.findCycles();if(e.length)throw e.sort((r,i)=>r.length-i.length),new b("Precedence cycles detected for the following systems, please resolve by adjusting their schedules: "+e.map(r=>r.map(i=>i.toString()).join("—")).join(", "))}findCycles(){const e=new Array(this.numVertices).fill(!1),r=[],i=[],s=[];let n,o;for(let c=0;c<this.numVertices;c++)r[c]=new Set;const a=c=>{e[c]=!1;for(const u of r[c])r[c].delete(u),e[u]&&a(u)},l=c=>{let u=!1;i.push(c),e[c]=!0;for(let h=0;h<this.numVertices;h++)!o.has(h)||!this.hasEdgeBetweenIds(c,h)||(h===n?(s.push(i.map(_=>this.vertices[_])),u=!0):!e[h]&&l(h)&&(u=!0));if(u)a(c);else for(let h=0;h<this.numVertices;h++)!o.has(h)||!this.hasEdgeBetweenIds(c,h)||r[h].add(c);return i.pop(),u};for(n=0;n<this.numVertices;n++){const c=this.findLeastStronglyConnectedComponent(n);n=c[0];for(const u of c)e[u]=!1,r[u].clear();o=new Set(c),l(n)}return s}findLeastStronglyConnectedComponent(e){let r;const i=[],s=[],n=[],o=[];let a=0;const l=c=>{i[c]=++a,s.push(c),n.push(c);for(let u=e;u<this.numVertices;u++)if(this.hasEdgeBetweenIds(c,u))if(i[u]){if(!o[u])for(;n.length&&i[n[n.length-1]]>i[u];)n.pop()}else l(u);if(n[n.length-1]===c){const u=[];for(;;){const h=s.pop();if(u.push(h),o[h]=!0,h===c)break}n.pop(),u.sort((h,_)=>h-_),(!r||u[0]<r[0])&&(r=u)}};for(let c=e;c<this.numVertices;c++)i[c]||l(c);return r}induceSubgraph(e){const r=new sn(e);for(const i of e){if(!this.vertexIndexMap.has(i))throw new L(`Vertex not in graph: ${i}`);for(const s of e){const n=this.getEdgeIndex(i,s),o=this.edges[n];o>0?r.addEdge(i,s,o):o<0&&r.denyEdge(i,s,-o)}}return this.sealed&&r.seal(),r}sortTopologically(){const e=new Array(this.numVertices).fill(0);for(let s=0;s<this.numVertices;s++)for(let n=0;n<this.numVertices;n++)this.hasEdgeBetweenIds(s,n)&&(e[n]+=1);const r=[];let i;for(;r.length<this.numVertices;){i=!1;for(let s=0;s<e.length;s++)if(e[s]===0){i=!0,e[s]=-1,r.push(this.vertices[s]);for(let n=0;n<this.numVertices;n++)this.hasEdgeBetweenIds(s,n)&&(e[n]-=1)}if(!i)throw new L("Graph has a cycle, topological sort not possible")}return r}derivePaths(){const e=this.numVertices;for(let i=0;i<this.edges.length;i++)this.edges[i]<0&&(this.edges[i]=0);const r=this.edges.slice();for(let i=0;i<e;i++)for(let s=0;s<e;s++)if(i!==s)for(let n=0;n<e;n++){if(n===i||n===s)continue;const o=r[i*e+n],a=r[n*e+s];if(o&&a){const l=Math.min(o,a);r[i*e+s]<l&&r[s*e+i]<l&&(r[i*e+s]=l,r[s*e+i]=0)}}this.paths=r;for(let i=0;i<e;i++)for(let s=0;s<e;s++)this.edges[i*e+s]&&(this.edges[i*e+s]=r[i*e+s])}simplify(){const e=this.numVertices,r=this.paths.slice();for(let i=0;i<e;i++)for(let s=0;s<e;s++)if(r[s*e+i])for(let n=0;n<e;n++)r[i*e+n]&&(r[s*e+n]=0);this.edges=r}countDependencies(){for(let e=0;e<this.numVertices;e++){let r=0;for(let i=0;i<this.numVertices;i++)this.edges[i*this.numVertices+e]&&(r+=1);this.dependencyCounts[e]=r}}traverse(e){if(!this.sealed)throw new L("Graph not yet sealed");const r=[];if(e){this.numTraversedVertices+=1;const i=this.vertexIndexMap.get(e);if(i===void 0)throw new L(`Unknown vertex: ${e}`);for(let s=0;s<this.numVertices;s++)this.edges[i*this.numVertices+s]&&--this.traversalCounts[s]===0&&r.push(this.vertices[s])}else{this.numTraversedVertices=0;for(let i=0;i<this.numVertices;i++)(this.traversalCounts[i]=this.dependencyCounts[i])===0&&r.push(this.vertices[i])}if(this.numTraversedVertices!==this.numVertices)return r}printMatrix(e){const r=this.numVertices,i=[];for(let s=0;s<r;s++){const n=[];for(let o=0;o<r;o++)n.push(e[s*r+o]);i.push(n.join(" "))}return i.join(`
`)}static fromMatrix(e){typeof e=="string"&&(e=e.trim().split(/\s+/).map(n=>parseInt(n,10)));const r=Math.sqrt(e.length),i=[];for(let n=1;n<=r;n++)i.push(`v${n}`);const s=new sn(i);return s.edges=e,s}}class nc{constructor(e,r){f(this,"planner");f(this,"group");f(this,"graph");this.planner=e,this.group=r,this.graph=e.graph.induceSubgraph(r.__systems)}}class Th extends nc{constructor(r,i){super(r,i);f(this,"planner");f(this,"group");f(this,"systems");if(this.planner=r,this.group=i,this.systems=this.graph.topologicallySortedVertices,this.systems.length>1&&typeof process>"u"){console.log("System execution order:");for(const s of this.systems)console.log(" ",s.name)}}execute(r,i){const s=this.planner.dispatcher,n=this.systems;this.group.__executed=!0;for(let o=0;o<n.length;o++)n[o].execute(r,i),s.flush();return Promise.resolve()}async initialize(){const r=this.planner.dispatcher;return this.group.__executed=!0,new Promise((i,s)=>{let n=!1;const o=async l=>{try{if(await l.prepare(),n)return;l.initialize(),r.flush();const c=this.graph.traverse(l);if(!c)return i();for(let u=0;u<c.length;u++)o(c[u])}catch(c){n=!0,s(c)}},a=this.graph.traverse();if(!a)return i();for(let l=0;l<a.length;l++)o(a[l])})}async finalize(){const r=this.planner.dispatcher;return this.group.__executed=!0,new Promise((i,s)=>{const n=a=>{try{a.finalize(),r.flush();const l=this.graph.traverse(a);if(!l)return i();for(let c=0;c<l.length;c++)n(l[c])}catch(l){s(l)}},o=this.graph.traverse();if(!o)return i();for(let a=0;a<o.length;a++)n(o[a])})}}class Rh extends nc{execute(e,r){return Promise.resolve()}initialize(){return Promise.resolve()}finalize(){return Promise.resolve()}}class Ba{constructor(e){f(this,"id");f(this,"systems",[]);this.id=e}add(...e){for(const r of e)r.lane=this;this.systems.push(...e)}merge(e){return this===e?this:this.id===-1||e.id!==-1&&e.id<this.id?e.merge(this):(this.add(...e.systems),e.systems.length=0,this)}}class bh{constructor(e,r,i){f(this,"dispatcher");f(this,"systems");f(this,"groups");f(this,"graph");f(this,"readers",new Map);f(this,"writers",new Map);f(this,"lanes",[]);f(this,"replicatedLane");f(this,"laneCount",0);this.dispatcher=e,this.systems=r,this.groups=i,this.graph=new sn(r);for(const s of e.registry.types)this.readers.set(s,new Set),this.writers.set(s,new Set);e.threaded&&(this.createLane(),this.replicatedLane=new Ba(-1))}get mainLane(){return this.lanes[0]}createLane(){const e=new Ba(this.laneCount++);return this.lanes.push(e),e}organize(){var e;for(const r of this.groups)r.__collectSystems(this.dispatcher);for(const r of this.systems)r.buildQueries();for(const r of this.systems)r.buildSchedule();for(const r of this.groups)r.__buildSchedule();this.addComponentEntitlementDependencies(),this.graph.seal(),this.dispatcher.threaded&&this.assignSystemsToLanes();for(const r of this.systems)r.stats.worker=((e=r.lane)==null?void 0:e.id)??0;delete this.readers,delete this.writers;for(const r of this.groups)r.__plan=this.dispatcher.threaded?new Rh(this,r):new Th(this,r)}addComponentEntitlementDependencies(){for(const[e,r]of this.readers.entries())for(const i of r)for(const s of this.writers.get(e))this.graph.addEdge(s,i,1)}assignSystemsToLanes(){this.initSystemLanes(),this.mergeAccessorsOfUnsharedComponentTypes(),this.mergeAttachedSystems(),this.pruneEmptyLanes(),this.reduceLanes(this.dispatcher.threads+1),this.pruneEmptyLanes()}initSystemLanes(){for(const e of this.systems)e.lane||this.createLane().add(e)}mergeAccessorsOfUnsharedComponentTypes(){var e;for(const r of this.dispatcher.registry.types){if(r.__binding.fields.every(o=>o.type.shared))continue;const i=this.readers.get(r),s=this.writers.get(r);if(!i&&!s)continue;let n=(e=r.options)!=null&&e.restrictedToMainThread?this.mainLane:this.createLane();i==null||i.forEach(o=>{n=n.merge(o.lane)}),s==null||s.forEach(o=>{n=n.merge(o.lane)})}}mergeAttachedSystems(){for(const e of this.systems)for(const r of e.attachedSystems)r&&e.lane.merge(r.lane)}reduceLanes(e){if(this.lanes.length<=e)return;let r=[];for(let s=1;s<this.lanes.length-1;s++){const n=this.lanes[s];for(let o=s+1;o<this.lanes.length;o++){const a=this.lanes[o];r.push({laneA:n,laneB:a,independence:this.computeIndependence(n,a)})}}let i=this.lanes.length;for(;i>e;){r.sort((a,l)=>l.independence-a.independence);const s=r.pop(),n=s.laneA.merge(s.laneB),o=n===s.laneA?s.laneB:s.laneA;i-=1,i>e&&(r=r.filter(a=>a.laneA===o||a.laneB===o?!1:((a.laneA===n||a.laneB===n)&&(a.independence=this.computeIndependence(a.laneA,a.laneB)),!0)))}}computeIndependence(e,r){return Math.min(this.computeIndependentWeight(e,r),this.computeIndependentWeight(r,e))}computeIndependentWeight(e,r){let i=0;for(const s of e.systems){let n=0;for(const o of r.systems)!this.graph.hasPath(s,o)&&!this.graph.hasPath(o,s)&&(n+=o.weight);i+=Math.min(s.weight,n)}return i}pruneEmptyLanes(){this.lanes=this.lanes.filter(e=>e.id===0||e.systems.length);for(let e=1;e<this.lanes.length;e++)this.lanes[e].id=e}}class $s extends x{constructor(){super(...arguments);f(this,"__callback")}start(r,...i){throw new b("The build system cannot run coroutines")}execute(){this.__callback(this)}}f($s,"__internal",!0);class xo extends x{}f(xo,"__internal",!0);var Ve;(function(t){t[t.init=0]="init",t[t.setup=1]="setup",t[t.run=2]="run",t[t.finish=3]="finish",t[t.done=4]="done"})(Ve||(Ve={}));class xh{constructor({defs:e,threads:r=1,maxEntities:i=1e4,maxLimboComponents:s=Math.ceil(i/5),maxShapeChangesPerFrame:n=i*2,maxWritesPerFrame:o=i*4,maxRefChangesPerFrame:a=i,defaultComponentStorage:l="packed"}){f(this,"maxEntities");f(this,"defaultComponentStorage");f(this,"registry");f(this,"systems");f(this,"systemsByClass",new Map);f(this,"systemGroups");f(this,"default");f(this,"lastTime");f(this,"executing");f(this,"executingSyncFrame");f(this,"state",Ve.init);f(this,"shapeLog");f(this,"writeLog");f(this,"shapeLogFramePointer");f(this,"writeLogFramePointer");f(this,"stats");f(this,"indexer");f(this,"planner");f(this,"threads");f(this,"buffers");f(this,"singleton");f(this,"buildSystem");f(this,"deferredControls",new Map);if(r<1)throw new b("Minimum of one thread");if(r>1)throw new b("Multithreading not yet implemented");if(i>To)throw new b(`maxEntities too high, the limit is ${To}`);const{componentTypes:c,componentEnums:u,systemTypes:h,systemGroups:_}=this.splitDefs([e??[],Xs,Yi]);if(c.length>en)throw new b(`Too many component types, the limit is ${en}`);this.stats=new mh,this.threads=r,this.buffers=new Ah(r>1),this.maxEntities=i,this.defaultComponentStorage=l,this.registry=new dh(i,s,c,u,this),this.indexer=new Eh(this,a),this.shapeLog=new rn(n,"maxShapeChangesPerFrame",this.buffers,{sortedByComponentType:!0,numComponentTypes:this.registry.types.length}),this.shapeLogFramePointer=this.shapeLog.createPointer(),this.systemGroups=_,this.systems=this.createSystems(h),this.createBuildSystem(),this.registry.initializeComponentTypes(),this.registry.validateSystem=this.createValidateSystem(c),this.singleton=this.createSingletons();for(const p of this.systems)p.replacePlaceholders();this.planner=new bh(this,this.systems,this.systemGroups),this.planner.organize(),this.registry.hasNegativeQueries=this.systems.some(p=>p.hasNegativeQueries),this.systems.some(p=>p.hasWriteQueries)&&(this.writeLog=new rn(o,"maxWritesPerFrame",this.buffers,{sortedByComponentType:!0,numComponentTypes:this.registry.types.length}),this.writeLogFramePointer=this.writeLog.createPointer());for(const p of this.systems)p.finishConstructing();this.state=Ve.setup}get threaded(){return this.threads>1}get defaultGroup(){return this.default.group}createSystems(e){const r=[],i=[],s=new Set;let n=0;for(let o=0;o<e.length;o++){const a=e[o];let l=this.systemsByClass.get(a);if(!l){if(a.name||Object.defineProperty(a,"name",{value:`Anonymous_${n++}`}),!a.__internal){if(s.has(a.name))throw new b(`Multiple component types named ${a.name}; names must be unique`);s.add(a.name)}this.stats.forSystem(a),i.push(a);const u=new a;u.id=o+2,l=new ro(u,this),r.push(l),this.systemsByClass.set(a,l)}const c=e[o+1];c&&typeof c!="function"&&(l.assignProps(c),o++)}return this.default=this.createSingleGroupFrame(i),r}createBuildSystem(){this.buildSystem=new $s,this.buildSystem.id=0;const e=new ro(this.buildSystem,this);e.accessMasks.read=void 0,e.accessMasks.update=void 0,e.accessMasks.create=void 0,e.accessMasks.write=void 0,e.accessMasks.check=void 0,this.systems.push(e),this.systemsByClass.set($s,e)}createValidateSystem(e){const r=new xo;r.id=1;const i=new ro(r,this);for(const s of e)Ws(i.accessMasks.check,s);return this.systems.push(i),this.systemsByClass.set(xo,i),i}createSingleGroupFrame(e){const r=new wi(e);this.systemGroups.push(r);const i=new ic(this,[r]);return{group:r,frame:i}}createSingletons(){const e=new Set,r=this.systems.flatMap(s=>s.singletonComponentDefs.filter((n,o)=>{let a=!0;return typeof n=="function"&&(a=o<s.singletonComponentDefs.length-1&&typeof s.singletonComponentDefs[o+1]!="function",a&&e.add(n)),a})).concat(this.systems.flatMap(s=>s.singletonComponentDefs.filter(n=>typeof n=="function"&&!e.has(n)?(e.add(n),!0):!1)));if(!r.length)return;this.executing=!0;const i=this.createEntity(r).hold();return this.executing=!1,this.flush(),i}splitDefs(e){const r=[],i=new Set,s=new Set,n=[],o=[];let a=!1;for(const c of e.flat(1/0))if(c instanceof wi){o.push(c);const{componentTypes:u,systemTypes:h,systemGroups:_}=this.splitDefs(c.__contents);for(const p of u)l(p);n.push(...h),o.push(..._)}else if(typeof c=="function")a=!!c.__system,a?n.push(c):l(c);else if(c instanceof xn){s.add(c);for(const u of c.__types)l(u)}else{if(!a)throw new b("Unexpected value in world defs: "+c);n.push(c),a=!1}return{componentTypes:r,componentEnums:Array.from(s),systemTypes:n,systemGroups:o};function l(c){if(c.enum&&!s.has(c.enum)){s.add(c.enum);for(const u of c.enum.__types)l(u)}else i.has(c)||(r.push(c),i.add(c))}}getSystems(e){if(e instanceof wi)return e.__systems;const r=this.systemsByClass.get(e);if(!r)throw new b(`System ${e.name} not registered in world`);return[r]}async initialize(){await this.default.frame.begin(),this.state=Ve.setup,await this.default.group.__plan.initialize(),await this.default.frame.end(),this.stats.frames-=1}async finalize(){await this.default.frame.begin(),this.state=Ve.done,await this.default.group.__plan.finalize(),await this.default.frame.end(),this.stats.frames-=1,this.registry.releaseComponentTypes()}async execute(e,r){await this.default.frame.begin(),await this.default.frame.execute(this.default.group,e,r),await this.default.frame.end()}executeFunction(e){this.startFrame(this.lastTime),this.executingSyncFrame=!0,this.buildSystem.__callback=e,this.systemsByClass.get($s).execute(this.lastTime,0),this.flush(),this.completeCycle(),this.completeFrame(),this.executingSyncFrame=!1,this.stats.frames-=1}completeCycle(){var e;this.registry.completeCycle(),this.indexer.completeCycle(),(e=this.writeLog)==null||e.commit()}startFrame(e){if(this.executing)throw new b("Another frame already executing");if(this.executing=!0,this.state!==Ve.setup&&this.state!==Ve.run&&this.state!==Ve.finish)throw new b("World terminated");this.state=Ve.run,this.lastTime=e}completeFrame(){if(!this.executing)throw new L("No frame executing");return this.executing=!1,this.gatherFrameStats(),this.processDeferredControls(),this.state===Ve.finish?this.finalize():Promise.resolve()}gatherFrameStats(){var e;this.stats.frames+=1,this.stats.maxShapeChangesPerFrame=this.shapeLog.countSince(this.shapeLogFramePointer),this.stats.maxWritesPerFrame=((e=this.writeLog)==null?void 0:e.countSince(this.writeLogFramePointer))??0}flush(){var e;this.indexer.flush(),this.registry.flush(),this.shapeLog.commit(),(e=this.writeLog)==null||e.commit()}async terminate(){{if(this.state!==Ve.setup&&this.state!==Ve.run)throw new b("World terminated");if(this.executingSyncFrame)throw new b("Cannot terminate world from within build callback")}this.state=Ve.finish,this.executing||await this.finalize()}createEntity(e){const r=this.registry.createEntity(e);return this.executing||this.flush(),r}control(e){this.checkControlOverlap(e),this.deferRequestedRunState(e.stop,St.STOPPED),this.deferRequestedRunState(e.restart,St.RUNNING),this.executing||this.processDeferredControls()}deferRequestedRunState(e,r){for(const i of this.splitDefs(e).systemTypes){if(!i.__system)continue;const s=this.systemsByClass.get(i);if(!s)throw new b(`System ${i.name} not defined for this world`);this.deferredControls.set(s,r)}}checkControlOverlap(e){const r=new Set;for(const i of this.splitDefs(e.stop).systemTypes)i.__system&&r.add(i);for(const i of this.splitDefs(e.restart).systemTypes)if(i.__system&&r.has(i))throw new b(`Request to both stop and restart system ${i.name}`)}processDeferredControls(){if(this.deferredControls.size){for(const[e,r]of this.deferredControls.entries())switch(r){case St.STOPPED:e.stop();break;case St.RUNNING:e.restart();break}this.deferredControls.clear()}}}const Da={};class Sn{constructor(e,r){f(this,"__dispatcher");if(r!==Da)throw new b("Don't call World constructor directly; use World.create instead");this.__dispatcher=new xh(e)}static async create(e={}){const r=new Sn(e,Da);return await r.__dispatcher.initialize(),r}static defineEnum(e,...r){return typeof e=="function"&&(r.unshift(e),e=""),e=e||"<anonymous>",new xn(e,r)}build(e){if(this.__dispatcher.state!==Ve.setup&&(typeof process>"u"||!0))throw new b("This method cannot be called after the world has started executing");this.__dispatcher.executeFunction(e)}createEntity(...e){if(this.__dispatcher.state!==Ve.setup&&(typeof process>"u"||!0))throw new b("This method cannot be called after the world has started executing");this.__dispatcher.createEntity(e)}execute(e,r){return this.__dispatcher.execute(e,r)}control(e){this.__dispatcher.control(e)}createCustomExecutor(...e){return new ic(this.__dispatcher,e)}async terminate(){await this.__dispatcher.terminate()}get stats(){return this.__dispatcher.stats}get alive(){return this.__dispatcher.state!==Ve.done}}var Sh=function(t){return t==null};const Dr=Sh;var Ih={}.toString,Oh=function(t,e){return Ih.call(t)==="[object "+e+"]"};const Nh=Oh;var Ch=function(t,e,r){return t<e?e:t>r?r:t};const Mh=Ch;var Ph=function(t){return Nh(t,"Number")};const gi=Ph;var Bh=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});function oc(t,e,r,i,s,n,o,a,l,c,u,h,_,p,d,g){var m=new Bh(16);return m[0]=t,m[1]=e,m[2]=r,m[3]=i,m[4]=s,m[5]=n,m[6]=o,m[7]=a,m[8]=l,m[9]=c,m[10]=u,m[11]=h,m[12]=_,m[13]=p,m[14]=d,m[15]=g,m}var So=function(t,e){return So=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,i){r.__proto__=i}||function(r,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(r[s]=i[s])},So(t,e)};function he(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");So(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}var me=function(){return me=Object.assign||function(e){for(var r,i=1,s=arguments.length;i<s;i++){r=arguments[i];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},me.apply(this,arguments)};function Dh(t,e){var r={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(r[i[s]]=t[i[s]]);return r}function ts(t,e,r,i){function s(n){return n instanceof r?n:new r(function(o){o(n)})}return new(r||(r=Promise))(function(n,o){function a(u){try{c(i.next(u))}catch(h){o(h)}}function l(u){try{c(i.throw(u))}catch(h){o(h)}}function c(u){u.done?n(u.value):s(u.value).then(a,l)}c((i=i.apply(t,e||[])).next())})}function rs(t,e){var r={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},i,s,n,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(c){return function(u){return l([c,u])}}function l(c){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,c[0]&&(r=0)),r;)try{if(i=1,s&&(n=c[0]&2?s.return:c[0]?s.throw||((n=s.return)&&n.call(s),0):s.next)&&!(n=n.call(s,c[1])).done)return n;switch(s=0,n&&(c=[c[0]&2,n.value]),c[0]){case 0:case 1:n=c;break;case 4:return r.label++,{value:c[1],done:!1};case 5:r.label++,s=c[1],c=[0];continue;case 7:c=r.ops.pop(),r.trys.pop();continue;default:if(n=r.trys,!(n=n.length>0&&n[n.length-1])&&(c[0]===6||c[0]===2)){r=0;continue}if(c[0]===3&&(!n||c[1]>n[0]&&c[1]<n[3])){r.label=c[1];break}if(c[0]===6&&r.label<n[1]){r.label=n[1],n=c;break}if(n&&r.label<n[2]){r.label=n[2],r.ops.push(c);break}n[2]&&r.ops.pop(),r.trys.pop();continue}c=e.call(t,r)}catch(u){c=[6,u],s=0}finally{i=n=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function as(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],i=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Io(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var i=r.call(t),s,n=[],o;try{for(;(e===void 0||e-- >0)&&!(s=i.next()).done;)n.push(s.value)}catch(a){o={error:a}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return n}function Uh(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ac={exports:{}};(function(t){var e=Object.prototype.hasOwnProperty,r="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(r=!1));function s(l,c,u){this.fn=l,this.context=c,this.once=u||!1}function n(l,c,u,h,_){if(typeof u!="function")throw new TypeError("The listener must be a function");var p=new s(u,h||l,_),d=r?r+c:c;return l._events[d]?l._events[d].fn?l._events[d]=[l._events[d],p]:l._events[d].push(p):(l._events[d]=p,l._eventsCount++),l}function o(l,c){--l._eventsCount===0?l._events=new i:delete l._events[c]}function a(){this._events=new i,this._eventsCount=0}a.prototype.eventNames=function(){var c=[],u,h;if(this._eventsCount===0)return c;for(h in u=this._events)e.call(u,h)&&c.push(r?h.slice(1):h);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(u)):c},a.prototype.listeners=function(c){var u=r?r+c:c,h=this._events[u];if(!h)return[];if(h.fn)return[h.fn];for(var _=0,p=h.length,d=new Array(p);_<p;_++)d[_]=h[_].fn;return d},a.prototype.listenerCount=function(c){var u=r?r+c:c,h=this._events[u];return h?h.fn?1:h.length:0},a.prototype.emit=function(c,u,h,_,p,d){var g=r?r+c:c;if(!this._events[g])return!1;var m=this._events[g],E=arguments.length,A,S;if(m.fn){switch(m.once&&this.removeListener(c,m.fn,void 0,!0),E){case 1:return m.fn.call(m.context),!0;case 2:return m.fn.call(m.context,u),!0;case 3:return m.fn.call(m.context,u,h),!0;case 4:return m.fn.call(m.context,u,h,_),!0;case 5:return m.fn.call(m.context,u,h,_,p),!0;case 6:return m.fn.call(m.context,u,h,_,p,d),!0}for(S=1,A=new Array(E-1);S<E;S++)A[S-1]=arguments[S];m.fn.apply(m.context,A)}else{var P=m.length,k;for(S=0;S<P;S++)switch(m[S].once&&this.removeListener(c,m[S].fn,void 0,!0),E){case 1:m[S].fn.call(m[S].context);break;case 2:m[S].fn.call(m[S].context,u);break;case 3:m[S].fn.call(m[S].context,u,h);break;case 4:m[S].fn.call(m[S].context,u,h,_);break;default:if(!A)for(k=1,A=new Array(E-1);k<E;k++)A[k-1]=arguments[k];m[S].fn.apply(m[S].context,A)}}return!0},a.prototype.on=function(c,u,h){return n(this,c,u,h,!1)},a.prototype.once=function(c,u,h){return n(this,c,u,h,!0)},a.prototype.removeListener=function(c,u,h,_){var p=r?r+c:c;if(!this._events[p])return this;if(!u)return o(this,p),this;var d=this._events[p];if(d.fn)d.fn===u&&(!_||d.once)&&(!h||d.context===h)&&o(this,p);else{for(var g=0,m=[],E=d.length;g<E;g++)(d[g].fn!==u||_&&!d[g].once||h&&d[g].context!==h)&&m.push(d[g]);m.length?this._events[p]=m.length===1?m[0]:m:o(this,p)}return this},a.prototype.removeAllListeners=function(c){var u;return c?(u=r?r+c:c,this._events[u]&&o(this,u)):(this._events=new i,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=r,a.EventEmitter=a,t.exports=a})(ac);var Fh=ac.exports;const lc=Uh(Fh);var w;(function(t){t[t.DEPTH_BUFFER_BIT=256]="DEPTH_BUFFER_BIT",t[t.STENCIL_BUFFER_BIT=1024]="STENCIL_BUFFER_BIT",t[t.COLOR_BUFFER_BIT=16384]="COLOR_BUFFER_BIT",t[t.POINTS=0]="POINTS",t[t.LINES=1]="LINES",t[t.LINE_LOOP=2]="LINE_LOOP",t[t.LINE_STRIP=3]="LINE_STRIP",t[t.TRIANGLES=4]="TRIANGLES",t[t.TRIANGLE_STRIP=5]="TRIANGLE_STRIP",t[t.TRIANGLE_FAN=6]="TRIANGLE_FAN",t[t.ZERO=0]="ZERO",t[t.ONE=1]="ONE",t[t.SRC_COLOR=768]="SRC_COLOR",t[t.ONE_MINUS_SRC_COLOR=769]="ONE_MINUS_SRC_COLOR",t[t.SRC_ALPHA=770]="SRC_ALPHA",t[t.ONE_MINUS_SRC_ALPHA=771]="ONE_MINUS_SRC_ALPHA",t[t.DST_ALPHA=772]="DST_ALPHA",t[t.ONE_MINUS_DST_ALPHA=773]="ONE_MINUS_DST_ALPHA",t[t.DST_COLOR=774]="DST_COLOR",t[t.ONE_MINUS_DST_COLOR=775]="ONE_MINUS_DST_COLOR",t[t.SRC_ALPHA_SATURATE=776]="SRC_ALPHA_SATURATE",t[t.CONSTANT_COLOR=32769]="CONSTANT_COLOR",t[t.ONE_MINUS_CONSTANT_COLOR=32770]="ONE_MINUS_CONSTANT_COLOR",t[t.CONSTANT_ALPHA=32771]="CONSTANT_ALPHA",t[t.ONE_MINUS_CONSTANT_ALPHA=32772]="ONE_MINUS_CONSTANT_ALPHA",t[t.FUNC_ADD=32774]="FUNC_ADD",t[t.FUNC_SUBTRACT=32778]="FUNC_SUBTRACT",t[t.FUNC_REVERSE_SUBTRACT=32779]="FUNC_REVERSE_SUBTRACT",t[t.BLEND_EQUATION=32777]="BLEND_EQUATION",t[t.BLEND_EQUATION_RGB=32777]="BLEND_EQUATION_RGB",t[t.BLEND_EQUATION_ALPHA=34877]="BLEND_EQUATION_ALPHA",t[t.BLEND_DST_RGB=32968]="BLEND_DST_RGB",t[t.BLEND_SRC_RGB=32969]="BLEND_SRC_RGB",t[t.BLEND_DST_ALPHA=32970]="BLEND_DST_ALPHA",t[t.BLEND_SRC_ALPHA=32971]="BLEND_SRC_ALPHA",t[t.BLEND_COLOR=32773]="BLEND_COLOR",t[t.ARRAY_BUFFER_BINDING=34964]="ARRAY_BUFFER_BINDING",t[t.ELEMENT_ARRAY_BUFFER_BINDING=34965]="ELEMENT_ARRAY_BUFFER_BINDING",t[t.LINE_WIDTH=2849]="LINE_WIDTH",t[t.ALIASED_POINT_SIZE_RANGE=33901]="ALIASED_POINT_SIZE_RANGE",t[t.ALIASED_LINE_WIDTH_RANGE=33902]="ALIASED_LINE_WIDTH_RANGE",t[t.CULL_FACE_MODE=2885]="CULL_FACE_MODE",t[t.FRONT_FACE=2886]="FRONT_FACE",t[t.DEPTH_RANGE=2928]="DEPTH_RANGE",t[t.DEPTH_WRITEMASK=2930]="DEPTH_WRITEMASK",t[t.DEPTH_CLEAR_VALUE=2931]="DEPTH_CLEAR_VALUE",t[t.DEPTH_FUNC=2932]="DEPTH_FUNC",t[t.STENCIL_CLEAR_VALUE=2961]="STENCIL_CLEAR_VALUE",t[t.STENCIL_FUNC=2962]="STENCIL_FUNC",t[t.STENCIL_FAIL=2964]="STENCIL_FAIL",t[t.STENCIL_PASS_DEPTH_FAIL=2965]="STENCIL_PASS_DEPTH_FAIL",t[t.STENCIL_PASS_DEPTH_PASS=2966]="STENCIL_PASS_DEPTH_PASS",t[t.STENCIL_REF=2967]="STENCIL_REF",t[t.STENCIL_VALUE_MASK=2963]="STENCIL_VALUE_MASK",t[t.STENCIL_WRITEMASK=2968]="STENCIL_WRITEMASK",t[t.STENCIL_BACK_FUNC=34816]="STENCIL_BACK_FUNC",t[t.STENCIL_BACK_FAIL=34817]="STENCIL_BACK_FAIL",t[t.STENCIL_BACK_PASS_DEPTH_FAIL=34818]="STENCIL_BACK_PASS_DEPTH_FAIL",t[t.STENCIL_BACK_PASS_DEPTH_PASS=34819]="STENCIL_BACK_PASS_DEPTH_PASS",t[t.STENCIL_BACK_REF=36003]="STENCIL_BACK_REF",t[t.STENCIL_BACK_VALUE_MASK=36004]="STENCIL_BACK_VALUE_MASK",t[t.STENCIL_BACK_WRITEMASK=36005]="STENCIL_BACK_WRITEMASK",t[t.VIEWPORT=2978]="VIEWPORT",t[t.SCISSOR_BOX=3088]="SCISSOR_BOX",t[t.COLOR_CLEAR_VALUE=3106]="COLOR_CLEAR_VALUE",t[t.COLOR_WRITEMASK=3107]="COLOR_WRITEMASK",t[t.UNPACK_ALIGNMENT=3317]="UNPACK_ALIGNMENT",t[t.PACK_ALIGNMENT=3333]="PACK_ALIGNMENT",t[t.MAX_TEXTURE_SIZE=3379]="MAX_TEXTURE_SIZE",t[t.MAX_VIEWPORT_DIMS=3386]="MAX_VIEWPORT_DIMS",t[t.SUBPIXEL_BITS=3408]="SUBPIXEL_BITS",t[t.RED_BITS=3410]="RED_BITS",t[t.GREEN_BITS=3411]="GREEN_BITS",t[t.BLUE_BITS=3412]="BLUE_BITS",t[t.ALPHA_BITS=3413]="ALPHA_BITS",t[t.DEPTH_BITS=3414]="DEPTH_BITS",t[t.STENCIL_BITS=3415]="STENCIL_BITS",t[t.POLYGON_OFFSET_UNITS=10752]="POLYGON_OFFSET_UNITS",t[t.POLYGON_OFFSET_FACTOR=32824]="POLYGON_OFFSET_FACTOR",t[t.TEXTURE_BINDING_2D=32873]="TEXTURE_BINDING_2D",t[t.SAMPLE_BUFFERS=32936]="SAMPLE_BUFFERS",t[t.SAMPLES=32937]="SAMPLES",t[t.SAMPLE_COVERAGE_VALUE=32938]="SAMPLE_COVERAGE_VALUE",t[t.SAMPLE_COVERAGE_INVERT=32939]="SAMPLE_COVERAGE_INVERT",t[t.COMPRESSED_TEXTURE_FORMATS=34467]="COMPRESSED_TEXTURE_FORMATS",t[t.VENDOR=7936]="VENDOR",t[t.RENDERER=7937]="RENDERER",t[t.VERSION=7938]="VERSION",t[t.IMPLEMENTATION_COLOR_READ_TYPE=35738]="IMPLEMENTATION_COLOR_READ_TYPE",t[t.IMPLEMENTATION_COLOR_READ_FORMAT=35739]="IMPLEMENTATION_COLOR_READ_FORMAT",t[t.BROWSER_DEFAULT_WEBGL=37444]="BROWSER_DEFAULT_WEBGL",t[t.STATIC_DRAW=35044]="STATIC_DRAW",t[t.STREAM_DRAW=35040]="STREAM_DRAW",t[t.DYNAMIC_DRAW=35048]="DYNAMIC_DRAW",t[t.ARRAY_BUFFER=34962]="ARRAY_BUFFER",t[t.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",t[t.BUFFER_SIZE=34660]="BUFFER_SIZE",t[t.BUFFER_USAGE=34661]="BUFFER_USAGE",t[t.CURRENT_VERTEX_ATTRIB=34342]="CURRENT_VERTEX_ATTRIB",t[t.VERTEX_ATTRIB_ARRAY_ENABLED=34338]="VERTEX_ATTRIB_ARRAY_ENABLED",t[t.VERTEX_ATTRIB_ARRAY_SIZE=34339]="VERTEX_ATTRIB_ARRAY_SIZE",t[t.VERTEX_ATTRIB_ARRAY_STRIDE=34340]="VERTEX_ATTRIB_ARRAY_STRIDE",t[t.VERTEX_ATTRIB_ARRAY_TYPE=34341]="VERTEX_ATTRIB_ARRAY_TYPE",t[t.VERTEX_ATTRIB_ARRAY_NORMALIZED=34922]="VERTEX_ATTRIB_ARRAY_NORMALIZED",t[t.VERTEX_ATTRIB_ARRAY_POINTER=34373]="VERTEX_ATTRIB_ARRAY_POINTER",t[t.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING=34975]="VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",t[t.CULL_FACE=2884]="CULL_FACE",t[t.FRONT=1028]="FRONT",t[t.BACK=1029]="BACK",t[t.FRONT_AND_BACK=1032]="FRONT_AND_BACK",t[t.BLEND=3042]="BLEND",t[t.DEPTH_TEST=2929]="DEPTH_TEST",t[t.DITHER=3024]="DITHER",t[t.POLYGON_OFFSET_FILL=32823]="POLYGON_OFFSET_FILL",t[t.SAMPLE_ALPHA_TO_COVERAGE=32926]="SAMPLE_ALPHA_TO_COVERAGE",t[t.SAMPLE_COVERAGE=32928]="SAMPLE_COVERAGE",t[t.SCISSOR_TEST=3089]="SCISSOR_TEST",t[t.STENCIL_TEST=2960]="STENCIL_TEST",t[t.NO_ERROR=0]="NO_ERROR",t[t.INVALID_ENUM=1280]="INVALID_ENUM",t[t.INVALID_VALUE=1281]="INVALID_VALUE",t[t.INVALID_OPERATION=1282]="INVALID_OPERATION",t[t.OUT_OF_MEMORY=1285]="OUT_OF_MEMORY",t[t.CONTEXT_LOST_WEBGL=37442]="CONTEXT_LOST_WEBGL",t[t.CW=2304]="CW",t[t.CCW=2305]="CCW",t[t.DONT_CARE=4352]="DONT_CARE",t[t.FASTEST=4353]="FASTEST",t[t.NICEST=4354]="NICEST",t[t.GENERATE_MIPMAP_HINT=33170]="GENERATE_MIPMAP_HINT",t[t.BYTE=5120]="BYTE",t[t.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",t[t.SHORT=5122]="SHORT",t[t.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",t[t.INT=5124]="INT",t[t.UNSIGNED_INT=5125]="UNSIGNED_INT",t[t.FLOAT=5126]="FLOAT",t[t.DOUBLE=5130]="DOUBLE",t[t.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",t[t.ALPHA=6406]="ALPHA",t[t.RGB=6407]="RGB",t[t.RGBA=6408]="RGBA",t[t.LUMINANCE=6409]="LUMINANCE",t[t.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",t[t.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",t[t.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",t[t.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",t[t.FRAGMENT_SHADER=35632]="FRAGMENT_SHADER",t[t.VERTEX_SHADER=35633]="VERTEX_SHADER",t[t.COMPILE_STATUS=35713]="COMPILE_STATUS",t[t.DELETE_STATUS=35712]="DELETE_STATUS",t[t.LINK_STATUS=35714]="LINK_STATUS",t[t.VALIDATE_STATUS=35715]="VALIDATE_STATUS",t[t.ATTACHED_SHADERS=35717]="ATTACHED_SHADERS",t[t.ACTIVE_ATTRIBUTES=35721]="ACTIVE_ATTRIBUTES",t[t.ACTIVE_UNIFORMS=35718]="ACTIVE_UNIFORMS",t[t.MAX_VERTEX_ATTRIBS=34921]="MAX_VERTEX_ATTRIBS",t[t.MAX_VERTEX_UNIFORM_VECTORS=36347]="MAX_VERTEX_UNIFORM_VECTORS",t[t.MAX_VARYING_VECTORS=36348]="MAX_VARYING_VECTORS",t[t.MAX_COMBINED_TEXTURE_IMAGE_UNITS=35661]="MAX_COMBINED_TEXTURE_IMAGE_UNITS",t[t.MAX_VERTEX_TEXTURE_IMAGE_UNITS=35660]="MAX_VERTEX_TEXTURE_IMAGE_UNITS",t[t.MAX_TEXTURE_IMAGE_UNITS=34930]="MAX_TEXTURE_IMAGE_UNITS",t[t.MAX_FRAGMENT_UNIFORM_VECTORS=36349]="MAX_FRAGMENT_UNIFORM_VECTORS",t[t.SHADER_TYPE=35663]="SHADER_TYPE",t[t.SHADING_LANGUAGE_VERSION=35724]="SHADING_LANGUAGE_VERSION",t[t.CURRENT_PROGRAM=35725]="CURRENT_PROGRAM",t[t.NEVER=512]="NEVER",t[t.ALWAYS=519]="ALWAYS",t[t.LESS=513]="LESS",t[t.EQUAL=514]="EQUAL",t[t.LEQUAL=515]="LEQUAL",t[t.GREATER=516]="GREATER",t[t.GEQUAL=518]="GEQUAL",t[t.NOTEQUAL=517]="NOTEQUAL",t[t.KEEP=7680]="KEEP",t[t.REPLACE=7681]="REPLACE",t[t.INCR=7682]="INCR",t[t.DECR=7683]="DECR",t[t.INVERT=5386]="INVERT",t[t.INCR_WRAP=34055]="INCR_WRAP",t[t.DECR_WRAP=34056]="DECR_WRAP",t[t.NEAREST=9728]="NEAREST",t[t.LINEAR=9729]="LINEAR",t[t.NEAREST_MIPMAP_NEAREST=9984]="NEAREST_MIPMAP_NEAREST",t[t.LINEAR_MIPMAP_NEAREST=9985]="LINEAR_MIPMAP_NEAREST",t[t.NEAREST_MIPMAP_LINEAR=9986]="NEAREST_MIPMAP_LINEAR",t[t.LINEAR_MIPMAP_LINEAR=9987]="LINEAR_MIPMAP_LINEAR",t[t.TEXTURE_MAG_FILTER=10240]="TEXTURE_MAG_FILTER",t[t.TEXTURE_MIN_FILTER=10241]="TEXTURE_MIN_FILTER",t[t.TEXTURE_WRAP_S=10242]="TEXTURE_WRAP_S",t[t.TEXTURE_WRAP_T=10243]="TEXTURE_WRAP_T",t[t.TEXTURE_2D=3553]="TEXTURE_2D",t[t.TEXTURE=5890]="TEXTURE",t[t.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",t[t.TEXTURE_BINDING_CUBE_MAP=34068]="TEXTURE_BINDING_CUBE_MAP",t[t.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",t[t.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",t[t.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",t[t.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",t[t.MAX_CUBE_MAP_TEXTURE_SIZE=34076]="MAX_CUBE_MAP_TEXTURE_SIZE",t[t.TEXTURE0=33984]="TEXTURE0",t[t.ACTIVE_TEXTURE=34016]="ACTIVE_TEXTURE",t[t.REPEAT=10497]="REPEAT",t[t.CLAMP_TO_EDGE=33071]="CLAMP_TO_EDGE",t[t.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",t[t.TEXTURE_WIDTH=4096]="TEXTURE_WIDTH",t[t.TEXTURE_HEIGHT=4097]="TEXTURE_HEIGHT",t[t.FLOAT_VEC2=35664]="FLOAT_VEC2",t[t.FLOAT_VEC3=35665]="FLOAT_VEC3",t[t.FLOAT_VEC4=35666]="FLOAT_VEC4",t[t.INT_VEC2=35667]="INT_VEC2",t[t.INT_VEC3=35668]="INT_VEC3",t[t.INT_VEC4=35669]="INT_VEC4",t[t.BOOL=35670]="BOOL",t[t.BOOL_VEC2=35671]="BOOL_VEC2",t[t.BOOL_VEC3=35672]="BOOL_VEC3",t[t.BOOL_VEC4=35673]="BOOL_VEC4",t[t.FLOAT_MAT2=35674]="FLOAT_MAT2",t[t.FLOAT_MAT3=35675]="FLOAT_MAT3",t[t.FLOAT_MAT4=35676]="FLOAT_MAT4",t[t.SAMPLER_2D=35678]="SAMPLER_2D",t[t.SAMPLER_CUBE=35680]="SAMPLER_CUBE",t[t.LOW_FLOAT=36336]="LOW_FLOAT",t[t.MEDIUM_FLOAT=36337]="MEDIUM_FLOAT",t[t.HIGH_FLOAT=36338]="HIGH_FLOAT",t[t.LOW_INT=36339]="LOW_INT",t[t.MEDIUM_INT=36340]="MEDIUM_INT",t[t.HIGH_INT=36341]="HIGH_INT",t[t.FRAMEBUFFER=36160]="FRAMEBUFFER",t[t.RENDERBUFFER=36161]="RENDERBUFFER",t[t.RGBA4=32854]="RGBA4",t[t.RGB5_A1=32855]="RGB5_A1",t[t.RGB565=36194]="RGB565",t[t.DEPTH_COMPONENT16=33189]="DEPTH_COMPONENT16",t[t.STENCIL_INDEX=6401]="STENCIL_INDEX",t[t.STENCIL_INDEX8=36168]="STENCIL_INDEX8",t[t.DEPTH_STENCIL=34041]="DEPTH_STENCIL",t[t.RENDERBUFFER_WIDTH=36162]="RENDERBUFFER_WIDTH",t[t.RENDERBUFFER_HEIGHT=36163]="RENDERBUFFER_HEIGHT",t[t.RENDERBUFFER_INTERNAL_FORMAT=36164]="RENDERBUFFER_INTERNAL_FORMAT",t[t.RENDERBUFFER_RED_SIZE=36176]="RENDERBUFFER_RED_SIZE",t[t.RENDERBUFFER_GREEN_SIZE=36177]="RENDERBUFFER_GREEN_SIZE",t[t.RENDERBUFFER_BLUE_SIZE=36178]="RENDERBUFFER_BLUE_SIZE",t[t.RENDERBUFFER_ALPHA_SIZE=36179]="RENDERBUFFER_ALPHA_SIZE",t[t.RENDERBUFFER_DEPTH_SIZE=36180]="RENDERBUFFER_DEPTH_SIZE",t[t.RENDERBUFFER_STENCIL_SIZE=36181]="RENDERBUFFER_STENCIL_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE=36048]="FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",t[t.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME=36049]="FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",t[t.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL=36050]="FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",t[t.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE=36051]="FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",t[t.COLOR_ATTACHMENT0=36064]="COLOR_ATTACHMENT0",t[t.DEPTH_ATTACHMENT=36096]="DEPTH_ATTACHMENT",t[t.STENCIL_ATTACHMENT=36128]="STENCIL_ATTACHMENT",t[t.DEPTH_STENCIL_ATTACHMENT=33306]="DEPTH_STENCIL_ATTACHMENT",t[t.NONE=0]="NONE",t[t.FRAMEBUFFER_COMPLETE=36053]="FRAMEBUFFER_COMPLETE",t[t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT=36054]="FRAMEBUFFER_INCOMPLETE_ATTACHMENT",t[t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT=36055]="FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",t[t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS=36057]="FRAMEBUFFER_INCOMPLETE_DIMENSIONS",t[t.FRAMEBUFFER_UNSUPPORTED=36061]="FRAMEBUFFER_UNSUPPORTED",t[t.FRAMEBUFFER_BINDING=36006]="FRAMEBUFFER_BINDING",t[t.RENDERBUFFER_BINDING=36007]="RENDERBUFFER_BINDING",t[t.READ_FRAMEBUFFER=36008]="READ_FRAMEBUFFER",t[t.DRAW_FRAMEBUFFER=36009]="DRAW_FRAMEBUFFER",t[t.MAX_RENDERBUFFER_SIZE=34024]="MAX_RENDERBUFFER_SIZE",t[t.INVALID_FRAMEBUFFER_OPERATION=1286]="INVALID_FRAMEBUFFER_OPERATION",t[t.UNPACK_FLIP_Y_WEBGL=37440]="UNPACK_FLIP_Y_WEBGL",t[t.UNPACK_PREMULTIPLY_ALPHA_WEBGL=37441]="UNPACK_PREMULTIPLY_ALPHA_WEBGL",t[t.UNPACK_COLORSPACE_CONVERSION_WEBGL=37443]="UNPACK_COLORSPACE_CONVERSION_WEBGL",t[t.READ_BUFFER=3074]="READ_BUFFER",t[t.UNPACK_ROW_LENGTH=3314]="UNPACK_ROW_LENGTH",t[t.UNPACK_SKIP_ROWS=3315]="UNPACK_SKIP_ROWS",t[t.UNPACK_SKIP_PIXELS=3316]="UNPACK_SKIP_PIXELS",t[t.PACK_ROW_LENGTH=3330]="PACK_ROW_LENGTH",t[t.PACK_SKIP_ROWS=3331]="PACK_SKIP_ROWS",t[t.PACK_SKIP_PIXELS=3332]="PACK_SKIP_PIXELS",t[t.TEXTURE_BINDING_3D=32874]="TEXTURE_BINDING_3D",t[t.UNPACK_SKIP_IMAGES=32877]="UNPACK_SKIP_IMAGES",t[t.UNPACK_IMAGE_HEIGHT=32878]="UNPACK_IMAGE_HEIGHT",t[t.MAX_3D_TEXTURE_SIZE=32883]="MAX_3D_TEXTURE_SIZE",t[t.MAX_ELEMENTS_VERTICES=33e3]="MAX_ELEMENTS_VERTICES",t[t.MAX_ELEMENTS_INDICES=33001]="MAX_ELEMENTS_INDICES",t[t.MAX_TEXTURE_LOD_BIAS=34045]="MAX_TEXTURE_LOD_BIAS",t[t.MAX_FRAGMENT_UNIFORM_COMPONENTS=35657]="MAX_FRAGMENT_UNIFORM_COMPONENTS",t[t.MAX_VERTEX_UNIFORM_COMPONENTS=35658]="MAX_VERTEX_UNIFORM_COMPONENTS",t[t.MAX_ARRAY_TEXTURE_LAYERS=35071]="MAX_ARRAY_TEXTURE_LAYERS",t[t.MIN_PROGRAM_TEXEL_OFFSET=35076]="MIN_PROGRAM_TEXEL_OFFSET",t[t.MAX_PROGRAM_TEXEL_OFFSET=35077]="MAX_PROGRAM_TEXEL_OFFSET",t[t.MAX_VARYING_COMPONENTS=35659]="MAX_VARYING_COMPONENTS",t[t.FRAGMENT_SHADER_DERIVATIVE_HINT=35723]="FRAGMENT_SHADER_DERIVATIVE_HINT",t[t.RASTERIZER_DISCARD=35977]="RASTERIZER_DISCARD",t[t.VERTEX_ARRAY_BINDING=34229]="VERTEX_ARRAY_BINDING",t[t.MAX_VERTEX_OUTPUT_COMPONENTS=37154]="MAX_VERTEX_OUTPUT_COMPONENTS",t[t.MAX_FRAGMENT_INPUT_COMPONENTS=37157]="MAX_FRAGMENT_INPUT_COMPONENTS",t[t.MAX_SERVER_WAIT_TIMEOUT=37137]="MAX_SERVER_WAIT_TIMEOUT",t[t.MAX_ELEMENT_INDEX=36203]="MAX_ELEMENT_INDEX",t[t.RED=6403]="RED",t[t.RGB8=32849]="RGB8",t[t.RGBA8=32856]="RGBA8",t[t.RGB10_A2=32857]="RGB10_A2",t[t.TEXTURE_3D=32879]="TEXTURE_3D",t[t.TEXTURE_WRAP_R=32882]="TEXTURE_WRAP_R",t[t.TEXTURE_MIN_LOD=33082]="TEXTURE_MIN_LOD",t[t.TEXTURE_MAX_LOD=33083]="TEXTURE_MAX_LOD",t[t.TEXTURE_BASE_LEVEL=33084]="TEXTURE_BASE_LEVEL",t[t.TEXTURE_MAX_LEVEL=33085]="TEXTURE_MAX_LEVEL",t[t.TEXTURE_COMPARE_MODE=34892]="TEXTURE_COMPARE_MODE",t[t.TEXTURE_COMPARE_FUNC=34893]="TEXTURE_COMPARE_FUNC",t[t.SRGB=35904]="SRGB",t[t.SRGB8=35905]="SRGB8",t[t.SRGB8_ALPHA8=35907]="SRGB8_ALPHA8",t[t.COMPARE_REF_TO_TEXTURE=34894]="COMPARE_REF_TO_TEXTURE",t[t.RGBA32F=34836]="RGBA32F",t[t.RGB32F=34837]="RGB32F",t[t.RGBA16F=34842]="RGBA16F",t[t.RGB16F=34843]="RGB16F",t[t.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",t[t.TEXTURE_BINDING_2D_ARRAY=35869]="TEXTURE_BINDING_2D_ARRAY",t[t.R11F_G11F_B10F=35898]="R11F_G11F_B10F",t[t.RGB9_E5=35901]="RGB9_E5",t[t.RGBA32UI=36208]="RGBA32UI",t[t.RGB32UI=36209]="RGB32UI",t[t.RGBA16UI=36214]="RGBA16UI",t[t.RGB16UI=36215]="RGB16UI",t[t.RGBA8UI=36220]="RGBA8UI",t[t.RGB8UI=36221]="RGB8UI",t[t.RGBA32I=36226]="RGBA32I",t[t.RGB32I=36227]="RGB32I",t[t.RGBA16I=36232]="RGBA16I",t[t.RGB16I=36233]="RGB16I",t[t.RGBA8I=36238]="RGBA8I",t[t.RGB8I=36239]="RGB8I",t[t.RED_INTEGER=36244]="RED_INTEGER",t[t.RGB_INTEGER=36248]="RGB_INTEGER",t[t.RGBA_INTEGER=36249]="RGBA_INTEGER",t[t.R8=33321]="R8",t[t.RG8=33323]="RG8",t[t.R16F=33325]="R16F",t[t.R32F=33326]="R32F",t[t.RG16F=33327]="RG16F",t[t.RG32F=33328]="RG32F",t[t.R8I=33329]="R8I",t[t.R8UI=33330]="R8UI",t[t.R16I=33331]="R16I",t[t.R16UI=33332]="R16UI",t[t.R32I=33333]="R32I",t[t.R32UI=33334]="R32UI",t[t.RG8I=33335]="RG8I",t[t.RG8UI=33336]="RG8UI",t[t.RG16I=33337]="RG16I",t[t.RG16UI=33338]="RG16UI",t[t.RG32I=33339]="RG32I",t[t.RG32UI=33340]="RG32UI",t[t.R8_SNORM=36756]="R8_SNORM",t[t.RG8_SNORM=36757]="RG8_SNORM",t[t.RGB8_SNORM=36758]="RGB8_SNORM",t[t.RGBA8_SNORM=36759]="RGBA8_SNORM",t[t.RGB10_A2UI=36975]="RGB10_A2UI",t[t.TEXTURE_IMMUTABLE_FORMAT=37167]="TEXTURE_IMMUTABLE_FORMAT",t[t.TEXTURE_IMMUTABLE_LEVELS=33503]="TEXTURE_IMMUTABLE_LEVELS",t[t.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",t[t.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",t[t.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",t[t.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",t[t.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",t[t.HALF_FLOAT=5131]="HALF_FLOAT",t[t.RG=33319]="RG",t[t.RG_INTEGER=33320]="RG_INTEGER",t[t.INT_2_10_10_10_REV=36255]="INT_2_10_10_10_REV",t[t.CURRENT_QUERY=34917]="CURRENT_QUERY",t[t.QUERY_RESULT=34918]="QUERY_RESULT",t[t.QUERY_RESULT_AVAILABLE=34919]="QUERY_RESULT_AVAILABLE",t[t.ANY_SAMPLES_PASSED=35887]="ANY_SAMPLES_PASSED",t[t.ANY_SAMPLES_PASSED_CONSERVATIVE=36202]="ANY_SAMPLES_PASSED_CONSERVATIVE",t[t.MAX_DRAW_BUFFERS=34852]="MAX_DRAW_BUFFERS",t[t.DRAW_BUFFER0=34853]="DRAW_BUFFER0",t[t.DRAW_BUFFER1=34854]="DRAW_BUFFER1",t[t.DRAW_BUFFER2=34855]="DRAW_BUFFER2",t[t.DRAW_BUFFER3=34856]="DRAW_BUFFER3",t[t.DRAW_BUFFER4=34857]="DRAW_BUFFER4",t[t.DRAW_BUFFER5=34858]="DRAW_BUFFER5",t[t.DRAW_BUFFER6=34859]="DRAW_BUFFER6",t[t.DRAW_BUFFER7=34860]="DRAW_BUFFER7",t[t.DRAW_BUFFER8=34861]="DRAW_BUFFER8",t[t.DRAW_BUFFER9=34862]="DRAW_BUFFER9",t[t.DRAW_BUFFER10=34863]="DRAW_BUFFER10",t[t.DRAW_BUFFER11=34864]="DRAW_BUFFER11",t[t.DRAW_BUFFER12=34865]="DRAW_BUFFER12",t[t.DRAW_BUFFER13=34866]="DRAW_BUFFER13",t[t.DRAW_BUFFER14=34867]="DRAW_BUFFER14",t[t.DRAW_BUFFER15=34868]="DRAW_BUFFER15",t[t.MAX_COLOR_ATTACHMENTS=36063]="MAX_COLOR_ATTACHMENTS",t[t.COLOR_ATTACHMENT1=36065]="COLOR_ATTACHMENT1",t[t.COLOR_ATTACHMENT2=36066]="COLOR_ATTACHMENT2",t[t.COLOR_ATTACHMENT3=36067]="COLOR_ATTACHMENT3",t[t.COLOR_ATTACHMENT4=36068]="COLOR_ATTACHMENT4",t[t.COLOR_ATTACHMENT5=36069]="COLOR_ATTACHMENT5",t[t.COLOR_ATTACHMENT6=36070]="COLOR_ATTACHMENT6",t[t.COLOR_ATTACHMENT7=36071]="COLOR_ATTACHMENT7",t[t.COLOR_ATTACHMENT8=36072]="COLOR_ATTACHMENT8",t[t.COLOR_ATTACHMENT9=36073]="COLOR_ATTACHMENT9",t[t.COLOR_ATTACHMENT10=36074]="COLOR_ATTACHMENT10",t[t.COLOR_ATTACHMENT11=36075]="COLOR_ATTACHMENT11",t[t.COLOR_ATTACHMENT12=36076]="COLOR_ATTACHMENT12",t[t.COLOR_ATTACHMENT13=36077]="COLOR_ATTACHMENT13",t[t.COLOR_ATTACHMENT14=36078]="COLOR_ATTACHMENT14",t[t.COLOR_ATTACHMENT15=36079]="COLOR_ATTACHMENT15",t[t.SAMPLER_3D=35679]="SAMPLER_3D",t[t.SAMPLER_2D_SHADOW=35682]="SAMPLER_2D_SHADOW",t[t.SAMPLER_2D_ARRAY=36289]="SAMPLER_2D_ARRAY",t[t.SAMPLER_2D_ARRAY_SHADOW=36292]="SAMPLER_2D_ARRAY_SHADOW",t[t.SAMPLER_CUBE_SHADOW=36293]="SAMPLER_CUBE_SHADOW",t[t.INT_SAMPLER_2D=36298]="INT_SAMPLER_2D",t[t.INT_SAMPLER_3D=36299]="INT_SAMPLER_3D",t[t.INT_SAMPLER_CUBE=36300]="INT_SAMPLER_CUBE",t[t.INT_SAMPLER_2D_ARRAY=36303]="INT_SAMPLER_2D_ARRAY",t[t.UNSIGNED_INT_SAMPLER_2D=36306]="UNSIGNED_INT_SAMPLER_2D",t[t.UNSIGNED_INT_SAMPLER_3D=36307]="UNSIGNED_INT_SAMPLER_3D",t[t.UNSIGNED_INT_SAMPLER_CUBE=36308]="UNSIGNED_INT_SAMPLER_CUBE",t[t.UNSIGNED_INT_SAMPLER_2D_ARRAY=36311]="UNSIGNED_INT_SAMPLER_2D_ARRAY",t[t.MAX_SAMPLES=36183]="MAX_SAMPLES",t[t.SAMPLER_BINDING=35097]="SAMPLER_BINDING",t[t.PIXEL_PACK_BUFFER=35051]="PIXEL_PACK_BUFFER",t[t.PIXEL_UNPACK_BUFFER=35052]="PIXEL_UNPACK_BUFFER",t[t.PIXEL_PACK_BUFFER_BINDING=35053]="PIXEL_PACK_BUFFER_BINDING",t[t.PIXEL_UNPACK_BUFFER_BINDING=35055]="PIXEL_UNPACK_BUFFER_BINDING",t[t.COPY_READ_BUFFER=36662]="COPY_READ_BUFFER",t[t.COPY_WRITE_BUFFER=36663]="COPY_WRITE_BUFFER",t[t.COPY_READ_BUFFER_BINDING=36662]="COPY_READ_BUFFER_BINDING",t[t.COPY_WRITE_BUFFER_BINDING=36663]="COPY_WRITE_BUFFER_BINDING",t[t.FLOAT_MAT2x3=35685]="FLOAT_MAT2x3",t[t.FLOAT_MAT2x4=35686]="FLOAT_MAT2x4",t[t.FLOAT_MAT3x2=35687]="FLOAT_MAT3x2",t[t.FLOAT_MAT3x4=35688]="FLOAT_MAT3x4",t[t.FLOAT_MAT4x2=35689]="FLOAT_MAT4x2",t[t.FLOAT_MAT4x3=35690]="FLOAT_MAT4x3",t[t.UNSIGNED_INT_VEC2=36294]="UNSIGNED_INT_VEC2",t[t.UNSIGNED_INT_VEC3=36295]="UNSIGNED_INT_VEC3",t[t.UNSIGNED_INT_VEC4=36296]="UNSIGNED_INT_VEC4",t[t.UNSIGNED_NORMALIZED=35863]="UNSIGNED_NORMALIZED",t[t.SIGNED_NORMALIZED=36764]="SIGNED_NORMALIZED",t[t.VERTEX_ATTRIB_ARRAY_INTEGER=35069]="VERTEX_ATTRIB_ARRAY_INTEGER",t[t.VERTEX_ATTRIB_ARRAY_DIVISOR=35070]="VERTEX_ATTRIB_ARRAY_DIVISOR",t[t.TRANSFORM_FEEDBACK_BUFFER_MODE=35967]="TRANSFORM_FEEDBACK_BUFFER_MODE",t[t.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS=35968]="MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS",t[t.TRANSFORM_FEEDBACK_VARYINGS=35971]="TRANSFORM_FEEDBACK_VARYINGS",t[t.TRANSFORM_FEEDBACK_BUFFER_START=35972]="TRANSFORM_FEEDBACK_BUFFER_START",t[t.TRANSFORM_FEEDBACK_BUFFER_SIZE=35973]="TRANSFORM_FEEDBACK_BUFFER_SIZE",t[t.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN=35976]="TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN",t[t.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS=35978]="MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",t[t.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS=35979]="MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",t[t.INTERLEAVED_ATTRIBS=35980]="INTERLEAVED_ATTRIBS",t[t.SEPARATE_ATTRIBS=35981]="SEPARATE_ATTRIBS",t[t.TRANSFORM_FEEDBACK_BUFFER=35982]="TRANSFORM_FEEDBACK_BUFFER",t[t.TRANSFORM_FEEDBACK_BUFFER_BINDING=35983]="TRANSFORM_FEEDBACK_BUFFER_BINDING",t[t.TRANSFORM_FEEDBACK=36386]="TRANSFORM_FEEDBACK",t[t.TRANSFORM_FEEDBACK_PAUSED=36387]="TRANSFORM_FEEDBACK_PAUSED",t[t.TRANSFORM_FEEDBACK_ACTIVE=36388]="TRANSFORM_FEEDBACK_ACTIVE",t[t.TRANSFORM_FEEDBACK_BINDING=36389]="TRANSFORM_FEEDBACK_BINDING",t[t.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING=33296]="FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING",t[t.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE=33297]="FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE",t[t.FRAMEBUFFER_ATTACHMENT_RED_SIZE=33298]="FRAMEBUFFER_ATTACHMENT_RED_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE=33299]="FRAMEBUFFER_ATTACHMENT_GREEN_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE=33300]="FRAMEBUFFER_ATTACHMENT_BLUE_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE=33301]="FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE=33302]="FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE=33303]="FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE",t[t.FRAMEBUFFER_DEFAULT=33304]="FRAMEBUFFER_DEFAULT",t[t.DEPTH24_STENCIL8=35056]="DEPTH24_STENCIL8",t[t.DRAW_FRAMEBUFFER_BINDING=36006]="DRAW_FRAMEBUFFER_BINDING",t[t.READ_FRAMEBUFFER_BINDING=36010]="READ_FRAMEBUFFER_BINDING",t[t.RENDERBUFFER_SAMPLES=36011]="RENDERBUFFER_SAMPLES",t[t.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER=36052]="FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER",t[t.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE=36182]="FRAMEBUFFER_INCOMPLETE_MULTISAMPLE",t[t.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",t[t.UNIFORM_BUFFER_BINDING=35368]="UNIFORM_BUFFER_BINDING",t[t.UNIFORM_BUFFER_START=35369]="UNIFORM_BUFFER_START",t[t.UNIFORM_BUFFER_SIZE=35370]="UNIFORM_BUFFER_SIZE",t[t.MAX_VERTEX_UNIFORM_BLOCKS=35371]="MAX_VERTEX_UNIFORM_BLOCKS",t[t.MAX_FRAGMENT_UNIFORM_BLOCKS=35373]="MAX_FRAGMENT_UNIFORM_BLOCKS",t[t.MAX_COMBINED_UNIFORM_BLOCKS=35374]="MAX_COMBINED_UNIFORM_BLOCKS",t[t.MAX_UNIFORM_BUFFER_BINDINGS=35375]="MAX_UNIFORM_BUFFER_BINDINGS",t[t.MAX_UNIFORM_BLOCK_SIZE=35376]="MAX_UNIFORM_BLOCK_SIZE",t[t.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS=35377]="MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS",t[t.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS=35379]="MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",t[t.UNIFORM_BUFFER_OFFSET_ALIGNMENT=35380]="UNIFORM_BUFFER_OFFSET_ALIGNMENT",t[t.ACTIVE_UNIFORM_BLOCKS=35382]="ACTIVE_UNIFORM_BLOCKS",t[t.UNIFORM_TYPE=35383]="UNIFORM_TYPE",t[t.UNIFORM_SIZE=35384]="UNIFORM_SIZE",t[t.UNIFORM_BLOCK_INDEX=35386]="UNIFORM_BLOCK_INDEX",t[t.UNIFORM_OFFSET=35387]="UNIFORM_OFFSET",t[t.UNIFORM_ARRAY_STRIDE=35388]="UNIFORM_ARRAY_STRIDE",t[t.UNIFORM_MATRIX_STRIDE=35389]="UNIFORM_MATRIX_STRIDE",t[t.UNIFORM_IS_ROW_MAJOR=35390]="UNIFORM_IS_ROW_MAJOR",t[t.UNIFORM_BLOCK_BINDING=35391]="UNIFORM_BLOCK_BINDING",t[t.UNIFORM_BLOCK_DATA_SIZE=35392]="UNIFORM_BLOCK_DATA_SIZE",t[t.UNIFORM_BLOCK_ACTIVE_UNIFORMS=35394]="UNIFORM_BLOCK_ACTIVE_UNIFORMS",t[t.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES=35395]="UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES",t[t.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER=35396]="UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER",t[t.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER=35398]="UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER",t[t.OBJECT_TYPE=37138]="OBJECT_TYPE",t[t.SYNC_CONDITION=37139]="SYNC_CONDITION",t[t.SYNC_STATUS=37140]="SYNC_STATUS",t[t.SYNC_FLAGS=37141]="SYNC_FLAGS",t[t.SYNC_FENCE=37142]="SYNC_FENCE",t[t.SYNC_GPU_COMMANDS_COMPLETE=37143]="SYNC_GPU_COMMANDS_COMPLETE",t[t.UNSIGNALED=37144]="UNSIGNALED",t[t.SIGNALED=37145]="SIGNALED",t[t.ALREADY_SIGNALED=37146]="ALREADY_SIGNALED",t[t.TIMEOUT_EXPIRED=37147]="TIMEOUT_EXPIRED",t[t.CONDITION_SATISFIED=37148]="CONDITION_SATISFIED",t[t.WAIT_FAILED=37149]="WAIT_FAILED",t[t.SYNC_FLUSH_COMMANDS_BIT=1]="SYNC_FLUSH_COMMANDS_BIT",t[t.COLOR=6144]="COLOR",t[t.DEPTH=6145]="DEPTH",t[t.STENCIL=6146]="STENCIL",t[t.MIN=32775]="MIN",t[t.MAX=32776]="MAX",t[t.DEPTH_COMPONENT24=33190]="DEPTH_COMPONENT24",t[t.STREAM_READ=35041]="STREAM_READ",t[t.STREAM_COPY=35042]="STREAM_COPY",t[t.STATIC_READ=35045]="STATIC_READ",t[t.STATIC_COPY=35046]="STATIC_COPY",t[t.DYNAMIC_READ=35049]="DYNAMIC_READ",t[t.DYNAMIC_COPY=35050]="DYNAMIC_COPY",t[t.DEPTH_COMPONENT32F=36012]="DEPTH_COMPONENT32F",t[t.DEPTH32F_STENCIL8=36013]="DEPTH32F_STENCIL8",t[t.INVALID_INDEX=4294967295]="INVALID_INDEX",t[t.TIMEOUT_IGNORED=-1]="TIMEOUT_IGNORED",t[t.MAX_CLIENT_WAIT_TIMEOUT_WEBGL=37447]="MAX_CLIENT_WAIT_TIMEOUT_WEBGL",t[t.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE=35070]="VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE",t[t.UNMASKED_VENDOR_WEBGL=37445]="UNMASKED_VENDOR_WEBGL",t[t.UNMASKED_RENDERER_WEBGL=37446]="UNMASKED_RENDERER_WEBGL",t[t.MAX_TEXTURE_MAX_ANISOTROPY_EXT=34047]="MAX_TEXTURE_MAX_ANISOTROPY_EXT",t[t.TEXTURE_MAX_ANISOTROPY_EXT=34046]="TEXTURE_MAX_ANISOTROPY_EXT",t[t.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",t[t.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777]="COMPRESSED_RGBA_S3TC_DXT1_EXT",t[t.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778]="COMPRESSED_RGBA_S3TC_DXT3_EXT",t[t.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",t[t.COMPRESSED_R11_EAC=37488]="COMPRESSED_R11_EAC",t[t.COMPRESSED_SIGNED_R11_EAC=37489]="COMPRESSED_SIGNED_R11_EAC",t[t.COMPRESSED_RG11_EAC=37490]="COMPRESSED_RG11_EAC",t[t.COMPRESSED_SIGNED_RG11_EAC=37491]="COMPRESSED_SIGNED_RG11_EAC",t[t.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",t[t.COMPRESSED_RGBA8_ETC2_EAC=37493]="COMPRESSED_RGBA8_ETC2_EAC",t[t.COMPRESSED_SRGB8_ETC2=37494]="COMPRESSED_SRGB8_ETC2",t[t.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37495]="COMPRESSED_SRGB8_ALPHA8_ETC2_EAC",t[t.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37496]="COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2",t[t.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37497]="COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2",t[t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]="COMPRESSED_RGB_PVRTC_4BPPV1_IMG",t[t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]="COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",t[t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG=35841]="COMPRESSED_RGB_PVRTC_2BPPV1_IMG",t[t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG=35843]="COMPRESSED_RGBA_PVRTC_2BPPV1_IMG",t[t.COMPRESSED_RGB_ETC1_WEBGL=36196]="COMPRESSED_RGB_ETC1_WEBGL",t[t.COMPRESSED_RGB_ATC_WEBGL=35986]="COMPRESSED_RGB_ATC_WEBGL",t[t.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL=35986]="COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL",t[t.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL=34798]="COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL",t[t.UNSIGNED_INT_24_8_WEBGL=34042]="UNSIGNED_INT_24_8_WEBGL",t[t.HALF_FLOAT_OES=36193]="HALF_FLOAT_OES",t[t.RGBA32F_EXT=34836]="RGBA32F_EXT",t[t.RGB32F_EXT=34837]="RGB32F_EXT",t[t.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT=33297]="FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT",t[t.UNSIGNED_NORMALIZED_EXT=35863]="UNSIGNED_NORMALIZED_EXT",t[t.MIN_EXT=32775]="MIN_EXT",t[t.MAX_EXT=32776]="MAX_EXT",t[t.SRGB_EXT=35904]="SRGB_EXT",t[t.SRGB_ALPHA_EXT=35906]="SRGB_ALPHA_EXT",t[t.SRGB8_ALPHA8_EXT=35907]="SRGB8_ALPHA8_EXT",t[t.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT=33296]="FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT",t[t.FRAGMENT_SHADER_DERIVATIVE_HINT_OES=35723]="FRAGMENT_SHADER_DERIVATIVE_HINT_OES",t[t.COLOR_ATTACHMENT0_WEBGL=36064]="COLOR_ATTACHMENT0_WEBGL",t[t.COLOR_ATTACHMENT1_WEBGL=36065]="COLOR_ATTACHMENT1_WEBGL",t[t.COLOR_ATTACHMENT2_WEBGL=36066]="COLOR_ATTACHMENT2_WEBGL",t[t.COLOR_ATTACHMENT3_WEBGL=36067]="COLOR_ATTACHMENT3_WEBGL",t[t.COLOR_ATTACHMENT4_WEBGL=36068]="COLOR_ATTACHMENT4_WEBGL",t[t.COLOR_ATTACHMENT5_WEBGL=36069]="COLOR_ATTACHMENT5_WEBGL",t[t.COLOR_ATTACHMENT6_WEBGL=36070]="COLOR_ATTACHMENT6_WEBGL",t[t.COLOR_ATTACHMENT7_WEBGL=36071]="COLOR_ATTACHMENT7_WEBGL",t[t.COLOR_ATTACHMENT8_WEBGL=36072]="COLOR_ATTACHMENT8_WEBGL",t[t.COLOR_ATTACHMENT9_WEBGL=36073]="COLOR_ATTACHMENT9_WEBGL",t[t.COLOR_ATTACHMENT10_WEBGL=36074]="COLOR_ATTACHMENT10_WEBGL",t[t.COLOR_ATTACHMENT11_WEBGL=36075]="COLOR_ATTACHMENT11_WEBGL",t[t.COLOR_ATTACHMENT12_WEBGL=36076]="COLOR_ATTACHMENT12_WEBGL",t[t.COLOR_ATTACHMENT13_WEBGL=36077]="COLOR_ATTACHMENT13_WEBGL",t[t.COLOR_ATTACHMENT14_WEBGL=36078]="COLOR_ATTACHMENT14_WEBGL",t[t.COLOR_ATTACHMENT15_WEBGL=36079]="COLOR_ATTACHMENT15_WEBGL",t[t.DRAW_BUFFER0_WEBGL=34853]="DRAW_BUFFER0_WEBGL",t[t.DRAW_BUFFER1_WEBGL=34854]="DRAW_BUFFER1_WEBGL",t[t.DRAW_BUFFER2_WEBGL=34855]="DRAW_BUFFER2_WEBGL",t[t.DRAW_BUFFER3_WEBGL=34856]="DRAW_BUFFER3_WEBGL",t[t.DRAW_BUFFER4_WEBGL=34857]="DRAW_BUFFER4_WEBGL",t[t.DRAW_BUFFER5_WEBGL=34858]="DRAW_BUFFER5_WEBGL",t[t.DRAW_BUFFER6_WEBGL=34859]="DRAW_BUFFER6_WEBGL",t[t.DRAW_BUFFER7_WEBGL=34860]="DRAW_BUFFER7_WEBGL",t[t.DRAW_BUFFER8_WEBGL=34861]="DRAW_BUFFER8_WEBGL",t[t.DRAW_BUFFER9_WEBGL=34862]="DRAW_BUFFER9_WEBGL",t[t.DRAW_BUFFER10_WEBGL=34863]="DRAW_BUFFER10_WEBGL",t[t.DRAW_BUFFER11_WEBGL=34864]="DRAW_BUFFER11_WEBGL",t[t.DRAW_BUFFER12_WEBGL=34865]="DRAW_BUFFER12_WEBGL",t[t.DRAW_BUFFER13_WEBGL=34866]="DRAW_BUFFER13_WEBGL",t[t.DRAW_BUFFER14_WEBGL=34867]="DRAW_BUFFER14_WEBGL",t[t.DRAW_BUFFER15_WEBGL=34868]="DRAW_BUFFER15_WEBGL",t[t.MAX_COLOR_ATTACHMENTS_WEBGL=36063]="MAX_COLOR_ATTACHMENTS_WEBGL",t[t.MAX_DRAW_BUFFERS_WEBGL=34852]="MAX_DRAW_BUFFERS_WEBGL",t[t.VERTEX_ARRAY_BINDING_OES=34229]="VERTEX_ARRAY_BINDING_OES",t[t.QUERY_COUNTER_BITS_EXT=34916]="QUERY_COUNTER_BITS_EXT",t[t.CURRENT_QUERY_EXT=34917]="CURRENT_QUERY_EXT",t[t.QUERY_RESULT_EXT=34918]="QUERY_RESULT_EXT",t[t.QUERY_RESULT_AVAILABLE_EXT=34919]="QUERY_RESULT_AVAILABLE_EXT",t[t.TIME_ELAPSED_EXT=35007]="TIME_ELAPSED_EXT",t[t.TIMESTAMP_EXT=36392]="TIMESTAMP_EXT",t[t.GPU_DISJOINT_EXT=36795]="GPU_DISJOINT_EXT"})(w||(w={}));var ne;(function(t){t[t.Buffer=0]="Buffer",t[t.Texture=1]="Texture",t[t.RenderTarget=2]="RenderTarget",t[t.Sampler=3]="Sampler",t[t.Program=4]="Program",t[t.Bindings=5]="Bindings",t[t.InputLayout=6]="InputLayout",t[t.RenderPipeline=7]="RenderPipeline",t[t.ComputePipeline=8]="ComputePipeline",t[t.Readback=9]="Readback",t[t.QueryPool=10]="QueryPool",t[t.RenderBundle=11]="RenderBundle"})(ne||(ne={}));var De;(function(t){t[t.NEVER=512]="NEVER",t[t.LESS=513]="LESS",t[t.EQUAL=514]="EQUAL",t[t.LEQUAL=515]="LEQUAL",t[t.GREATER=516]="GREATER",t[t.NOTEQUAL=517]="NOTEQUAL",t[t.GEQUAL=518]="GEQUAL",t[t.ALWAYS=519]="ALWAYS"})(De||(De={}));var ls;(function(t){t[t.CCW=2305]="CCW",t[t.CW=2304]="CW"})(ls||(ls={}));var Ur;(function(t){t[t.NONE=0]="NONE",t[t.FRONT=1]="FRONT",t[t.BACK=2]="BACK",t[t.FRONT_AND_BACK=3]="FRONT_AND_BACK"})(Ur||(Ur={}));var ae;(function(t){t[t.ZERO=0]="ZERO",t[t.ONE=1]="ONE",t[t.SRC=768]="SRC",t[t.ONE_MINUS_SRC=769]="ONE_MINUS_SRC",t[t.DST=774]="DST",t[t.ONE_MINUS_DST=775]="ONE_MINUS_DST",t[t.SRC_ALPHA=770]="SRC_ALPHA",t[t.ONE_MINUS_SRC_ALPHA=771]="ONE_MINUS_SRC_ALPHA",t[t.DST_ALPHA=772]="DST_ALPHA",t[t.ONE_MINUS_DST_ALPHA=773]="ONE_MINUS_DST_ALPHA",t[t.CONST=32769]="CONST",t[t.ONE_MINUS_CONSTANT=32770]="ONE_MINUS_CONSTANT",t[t.SRC_ALPHA_SATURATE=776]="SRC_ALPHA_SATURATE"})(ae||(ae={}));var yt;(function(t){t[t.ADD=32774]="ADD",t[t.SUBSTRACT=32778]="SUBSTRACT",t[t.REVERSE_SUBSTRACT=32779]="REVERSE_SUBSTRACT",t[t.MIN=32775]="MIN",t[t.MAX=32776]="MAX"})(yt||(yt={}));var Le;(function(t){t[t.CLAMP_TO_EDGE=0]="CLAMP_TO_EDGE",t[t.REPEAT=1]="REPEAT",t[t.MIRRORED_REPEAT=2]="MIRRORED_REPEAT"})(Le||(Le={}));var le;(function(t){t[t.POINT=0]="POINT",t[t.BILINEAR=1]="BILINEAR"})(le||(le={}));var Ee;(function(t){t[t.NO_MIP=0]="NO_MIP",t[t.NEAREST=1]="NEAREST",t[t.LINEAR=2]="LINEAR"})(Ee||(Ee={}));var we;(function(t){t[t.POINTS=0]="POINTS",t[t.TRIANGLES=1]="TRIANGLES",t[t.TRIANGLE_STRIP=2]="TRIANGLE_STRIP",t[t.LINES=3]="LINES",t[t.LINE_STRIP=4]="LINE_STRIP"})(we||(we={}));var re;(function(t){t[t.MAP_READ=1]="MAP_READ",t[t.MAP_WRITE=2]="MAP_WRITE",t[t.COPY_SRC=4]="COPY_SRC",t[t.COPY_DST=8]="COPY_DST",t[t.INDEX=16]="INDEX",t[t.VERTEX=32]="VERTEX",t[t.UNIFORM=64]="UNIFORM",t[t.STORAGE=128]="STORAGE",t[t.INDIRECT=256]="INDIRECT",t[t.QUERY_RESOLVE=512]="QUERY_RESOLVE"})(re||(re={}));var Lr;(function(t){t[t.STATIC=1]="STATIC",t[t.DYNAMIC=2]="DYNAMIC"})(Lr||(Lr={}));var Ti;(function(t){t[t.VERTEX=1]="VERTEX",t[t.INSTANCE=2]="INSTANCE"})(Ti||(Ti={}));var Ua;(function(t){t.LOADED="loaded"})(Ua||(Ua={}));var Q;(function(t){t[t.TEXTURE_2D=0]="TEXTURE_2D",t[t.TEXTURE_2D_ARRAY=1]="TEXTURE_2D_ARRAY",t[t.TEXTURE_3D=2]="TEXTURE_3D",t[t.TEXTURE_CUBE_MAP=3]="TEXTURE_CUBE_MAP"})(Q||(Q={}));var Ot;(function(t){t[t.SAMPLED=1]="SAMPLED",t[t.RENDER_TARGET=2]="RENDER_TARGET",t[t.STORAGE=4]="STORAGE"})(Ot||(Ot={}));var nn;(function(t){t[t.NONE=0]="NONE",t[t.RED=1]="RED",t[t.GREEN=2]="GREEN",t[t.BLUE=4]="BLUE",t[t.ALPHA=8]="ALPHA",t[t.RGB=7]="RGB",t[t.ALL=15]="ALL"})(nn||(nn={}));var Qe;(function(t){t[t.KEEP=7680]="KEEP",t[t.ZERO=0]="ZERO",t[t.REPLACE=7681]="REPLACE",t[t.INVERT=5386]="INVERT",t[t.INCREMENT_CLAMP=7682]="INCREMENT_CLAMP",t[t.DECREMENT_CLAMP=7683]="DECREMENT_CLAMP",t[t.INCREMENT_WRAP=34055]="INCREMENT_WRAP",t[t.DECREMENT_WRAP=34056]="DECREMENT_WRAP"})(Qe||(Qe={}));var Ze;(function(t){t[t.Float=0]="Float",t[t.Uint=1]="Uint",t[t.Sint=2]="Sint",t[t.Depth=3]="Depth"})(Ze||(Ze={}));var on;(function(t){t[t.LOWER_LEFT=0]="LOWER_LEFT",t[t.UPPER_LEFT=1]="UPPER_LEFT"})(on||(on={}));var an;(function(t){t[t.NEGATIVE_ONE=0]="NEGATIVE_ONE",t[t.ZERO=1]="ZERO"})(an||(an={}));var ln;(function(t){t[t.OcclusionConservative=0]="OcclusionConservative"})(ln||(ln={}));var T;(function(t){t[t.U8=1]="U8",t[t.U16=2]="U16",t[t.U32=3]="U32",t[t.S8=4]="S8",t[t.S16=5]="S16",t[t.S32=6]="S32",t[t.F16=7]="F16",t[t.F32=8]="F32",t[t.BC1=65]="BC1",t[t.BC2=66]="BC2",t[t.BC3=67]="BC3",t[t.BC4_UNORM=68]="BC4_UNORM",t[t.BC4_SNORM=69]="BC4_SNORM",t[t.BC5_UNORM=70]="BC5_UNORM",t[t.BC5_SNORM=71]="BC5_SNORM",t[t.U16_PACKED_5551=97]="U16_PACKED_5551",t[t.U16_PACKED_565=98]="U16_PACKED_565",t[t.D24=129]="D24",t[t.D32F=130]="D32F",t[t.D24S8=131]="D24S8",t[t.D32FS8=132]="D32FS8"})(T||(T={}));var F;(function(t){t[t.R=1]="R",t[t.RG=2]="RG",t[t.RGB=3]="RGB",t[t.RGBA=4]="RGBA",t[t.A=5]="A"})(F||(F={}));var N;(function(t){t[t.None=0]="None",t[t.Normalized=1]="Normalized",t[t.sRGB=2]="sRGB",t[t.Depth=4]="Depth",t[t.Stencil=8]="Stencil",t[t.RenderTarget=16]="RenderTarget",t[t.Luminance=32]="Luminance"})(N||(N={}));function z(t,e,r){return t<<16|e<<8|r}var R;(function(t){t[t.ALPHA=z(T.U8,F.A,N.None)]="ALPHA",t[t.U8_LUMINANCE=z(T.U8,F.A,N.Luminance)]="U8_LUMINANCE",t[t.F16_LUMINANCE=z(T.F16,F.A,N.Luminance)]="F16_LUMINANCE",t[t.F32_LUMINANCE=z(T.F32,F.A,N.Luminance)]="F32_LUMINANCE",t[t.F16_R=z(T.F16,F.R,N.None)]="F16_R",t[t.F16_RG=z(T.F16,F.RG,N.None)]="F16_RG",t[t.F16_RGB=z(T.F16,F.RGB,N.None)]="F16_RGB",t[t.F16_RGBA=z(T.F16,F.RGBA,N.None)]="F16_RGBA",t[t.F32_R=z(T.F32,F.R,N.None)]="F32_R",t[t.F32_RG=z(T.F32,F.RG,N.None)]="F32_RG",t[t.F32_RGB=z(T.F32,F.RGB,N.None)]="F32_RGB",t[t.F32_RGBA=z(T.F32,F.RGBA,N.None)]="F32_RGBA",t[t.U8_R=z(T.U8,F.R,N.None)]="U8_R",t[t.U8_R_NORM=z(T.U8,F.R,N.Normalized)]="U8_R_NORM",t[t.U8_RG=z(T.U8,F.RG,N.None)]="U8_RG",t[t.U8_RG_NORM=z(T.U8,F.RG,N.Normalized)]="U8_RG_NORM",t[t.U8_RGB=z(T.U8,F.RGB,N.None)]="U8_RGB",t[t.U8_RGB_NORM=z(T.U8,F.RGB,N.Normalized)]="U8_RGB_NORM",t[t.U8_RGB_SRGB=z(T.U8,F.RGB,N.sRGB|N.Normalized)]="U8_RGB_SRGB",t[t.U8_RGBA=z(T.U8,F.RGBA,N.None)]="U8_RGBA",t[t.U8_RGBA_NORM=z(T.U8,F.RGBA,N.Normalized)]="U8_RGBA_NORM",t[t.U8_RGBA_SRGB=z(T.U8,F.RGBA,N.sRGB|N.Normalized)]="U8_RGBA_SRGB",t[t.U16_R=z(T.U16,F.R,N.None)]="U16_R",t[t.U16_R_NORM=z(T.U16,F.R,N.Normalized)]="U16_R_NORM",t[t.U16_RG_NORM=z(T.U16,F.RG,N.Normalized)]="U16_RG_NORM",t[t.U16_RGBA_NORM=z(T.U16,F.RGBA,N.Normalized)]="U16_RGBA_NORM",t[t.U16_RGB=z(T.U16,F.RGB,N.None)]="U16_RGB",t[t.U32_R=z(T.U32,F.R,N.None)]="U32_R",t[t.U32_RG=z(T.U32,F.RG,N.None)]="U32_RG",t[t.S8_R=z(T.S8,F.R,N.None)]="S8_R",t[t.S8_R_NORM=z(T.S8,F.R,N.Normalized)]="S8_R_NORM",t[t.S8_RG_NORM=z(T.S8,F.RG,N.Normalized)]="S8_RG_NORM",t[t.S8_RGB_NORM=z(T.S8,F.RGB,N.Normalized)]="S8_RGB_NORM",t[t.S8_RGBA_NORM=z(T.S8,F.RGBA,N.Normalized)]="S8_RGBA_NORM",t[t.S16_R=z(T.S16,F.R,N.None)]="S16_R",t[t.S16_RG=z(T.S16,F.RG,N.None)]="S16_RG",t[t.S16_RG_NORM=z(T.S16,F.RG,N.Normalized)]="S16_RG_NORM",t[t.S16_RGB_NORM=z(T.S16,F.RGB,N.Normalized)]="S16_RGB_NORM",t[t.S16_RGBA=z(T.S16,F.RGBA,N.None)]="S16_RGBA",t[t.S16_RGBA_NORM=z(T.S16,F.RGBA,N.Normalized)]="S16_RGBA_NORM",t[t.S32_R=z(T.S32,F.R,N.None)]="S32_R",t[t.U16_RGBA_5551=z(T.U16_PACKED_5551,F.RGBA,N.Normalized)]="U16_RGBA_5551",t[t.U16_RGB_565=z(T.U16_PACKED_565,F.RGB,N.Normalized)]="U16_RGB_565",t[t.BC1=z(T.BC1,F.RGBA,N.Normalized)]="BC1",t[t.BC1_SRGB=z(T.BC1,F.RGBA,N.Normalized|N.sRGB)]="BC1_SRGB",t[t.BC2=z(T.BC2,F.RGBA,N.Normalized)]="BC2",t[t.BC2_SRGB=z(T.BC2,F.RGBA,N.Normalized|N.sRGB)]="BC2_SRGB",t[t.BC3=z(T.BC3,F.RGBA,N.Normalized)]="BC3",t[t.BC3_SRGB=z(T.BC3,F.RGBA,N.Normalized|N.sRGB)]="BC3_SRGB",t[t.BC4_UNORM=z(T.BC4_UNORM,F.R,N.Normalized)]="BC4_UNORM",t[t.BC4_SNORM=z(T.BC4_SNORM,F.R,N.Normalized)]="BC4_SNORM",t[t.BC5_UNORM=z(T.BC5_UNORM,F.RG,N.Normalized)]="BC5_UNORM",t[t.BC5_SNORM=z(T.BC5_SNORM,F.RG,N.Normalized)]="BC5_SNORM",t[t.D24=z(T.D24,F.R,N.Depth)]="D24",t[t.D24_S8=z(T.D24S8,F.RG,N.Depth|N.Stencil)]="D24_S8",t[t.D32F=z(T.D32F,F.R,N.Depth)]="D32F",t[t.D32F_S8=z(T.D32FS8,F.RG,N.Depth|N.Stencil)]="D32F_S8",t[t.U8_RGB_RT=z(T.U8,F.RGB,N.RenderTarget|N.Normalized)]="U8_RGB_RT",t[t.U8_RGBA_RT=z(T.U8,F.RGBA,N.RenderTarget|N.Normalized)]="U8_RGBA_RT",t[t.U8_RGBA_RT_SRGB=z(T.U8,F.RGBA,N.RenderTarget|N.Normalized|N.sRGB)]="U8_RGBA_RT_SRGB"})(R||(R={}));function cc(t){return t>>>8&255}function or(t){return t>>>16&255}function cs(t){return t&255}function uc(t){switch(t){case T.F32:case T.U32:case T.S32:return 4;case T.U16:case T.S16:case T.F16:return 2;case T.U8:case T.S8:return 1;default:throw new Error("whoops")}}function hc(t){return uc(or(t))}function _c(t){var e=uc(or(t)),r=cc(t);return e*r}function dc(t){var e=cs(t);if(e&N.Depth)return Ze.Depth;if(e&N.Normalized)return Ze.Float;var r=or(t);if(r===T.F16||r===T.F32)return Ze.Float;if(r===T.U8||r===T.U16||r===T.U32)return Ze.Uint;if(r===T.S8||r===T.S16||r===T.S32)return Ze.Sint;throw new Error("whoops")}function U(t,e){if(e===void 0&&(e=""),!t)throw new Error("Assert fail: ".concat(e))}function Ne(t){if(t!=null)return t;throw new Error("Missing object")}function Lh(t,e){return t.r===e.r&&t.g===e.g&&t.b===e.b&&t.a===e.a}function zh(t,e){t.r=e.r,t.g=e.g,t.b=e.b,t.a=e.a}function fc(t){var e=t.r,r=t.g,i=t.b,s=t.a;return{r:e,g:r,b:i,a:s}}function vs(t,e,r,i){return i===void 0&&(i=1),{r:t,g:e,b:r,a:i}}var pc=vs(0,0,0,0);vs(0,0,0,1);vs(1,1,1,0);var mc=vs(1,1,1,1);function cn(t){return!!(t&&!(t&t-1))}function ci(t,e){return t??e}function so(t,e,r){t.length=e,t.fill(r)}function un(t,e){var r=e-1;return t+r&~r}function Vi(t,e){return((t+e-1)/e|0)*e}function Vh(t,e,r){for(var i=0,s=t.length;i<s;){var n=i+(s-i>>>1),o=r(e,t[n]);o<0?s=n:i=n+1}return i}function Hh(t,e,r){var i=Vh(t,e,r);t.splice(i,0,e)}function Hi(t,e,r){return r?t|=e:t&=~e,t}function Qr(t,e){for(var r=new Array(t),i=0;i<t;i++)r[i]=e();return r}function Fa(t,e){t.blendDstFactor=e.blendDstFactor,t.blendSrcFactor=e.blendSrcFactor,t.blendMode=e.blendMode}function hn(t,e){return t===void 0&&(t={}),t.compare=e.compare,t.depthFailOp=e.depthFailOp,t.passOp=e.passOp,t.failOp=e.failOp,t.mask=e.mask,t}function gc(t,e){return t===void 0&&(t={rgbBlendState:{},alphaBlendState:{},channelWriteMask:0}),Fa(t.rgbBlendState,e.rgbBlendState),Fa(t.alphaBlendState,e.alphaBlendState),t.channelWriteMask=e.channelWriteMask,t}function Xo(t,e){t.length!==e.length&&(t.length=e.length);for(var r=0;r<e.length;r++)t[r]=gc(t[r],e[r])}function Oo(t,e){e.attachmentsState!==void 0&&Xo(t.attachmentsState,e.attachmentsState),t.blendConstant&&e.blendConstant&&zh(t.blendConstant,e.blendConstant),t.depthCompare=ci(e.depthCompare,t.depthCompare),t.depthWrite=ci(e.depthWrite,t.depthWrite),t.stencilWrite=ci(e.stencilWrite,t.stencilWrite),t.stencilFront&&e.stencilFront&&hn(t.stencilFront,e.stencilFront),t.stencilBack&&e.stencilBack&&hn(t.stencilBack,e.stencilBack),t.cullMode=ci(e.cullMode,t.cullMode),t.frontFace=ci(e.frontFace,t.frontFace),t.polygonOffset=ci(e.polygonOffset,t.polygonOffset)}function As(t){var e=Object.assign({},t);return e.attachmentsState=[],Xo(e.attachmentsState,t.attachmentsState),e.blendConstant=e.blendConstant&&fc(e.blendConstant),e.stencilFront=hn(void 0,t.stencilFront),e.stencilBack=hn(void 0,t.stencilBack),e}function kh(t,e){e.channelWriteMask!==void 0&&(t.channelWriteMask=e.channelWriteMask),e.rgbBlendMode!==void 0&&(t.rgbBlendState.blendMode=e.rgbBlendMode),e.alphaBlendMode!==void 0&&(t.alphaBlendState.blendMode=e.alphaBlendMode),e.rgbBlendSrcFactor!==void 0&&(t.rgbBlendState.blendSrcFactor=e.rgbBlendSrcFactor),e.alphaBlendSrcFactor!==void 0&&(t.alphaBlendState.blendSrcFactor=e.alphaBlendSrcFactor),e.rgbBlendDstFactor!==void 0&&(t.rgbBlendState.blendDstFactor=e.rgbBlendDstFactor),e.alphaBlendDstFactor!==void 0&&(t.alphaBlendState.blendDstFactor=e.alphaBlendDstFactor)}var La={blendMode:yt.ADD,blendSrcFactor:ae.ONE,blendDstFactor:ae.ZERO},Ii={attachmentsState:[{channelWriteMask:nn.ALL,rgbBlendState:La,alphaBlendState:La}],blendConstant:fc(pc),depthWrite:!0,depthCompare:De.LEQUAL,stencilWrite:!1,stencilFront:{compare:De.ALWAYS,passOp:Qe.KEEP,depthFailOp:Qe.KEEP,failOp:Qe.KEEP},stencilBack:{compare:De.ALWAYS,passOp:Qe.KEEP,depthFailOp:Qe.KEEP,failOp:Qe.KEEP},cullMode:Ur.NONE,frontFace:ls.CCW,polygonOffset:!1};function Wh(t,e){t===void 0&&(t=null),e===void 0&&(e=Ii);var r=As(e);return t!==null&&Oo(r,t),r}var In=Wh({depthCompare:De.ALWAYS,depthWrite:!1},Ii);function Xh(t,e){return t.attachmentsState===void 0&&(t.attachmentsState=[],Xo(t.attachmentsState,Ii.attachmentsState)),kh(t.attachmentsState[0],e),t}var $h={texture:null,sampler:null,formatKind:Ze.Float,dimension:Q.TEXTURE_2D};function Cr(t,e,r){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!r(t[i],e[i]))return!1;return!0}function Ei(t,e){for(var r=Array(t.length),i=0;i<t.length;i++)r[i]=e(t[i]);return r}function jh(t,e){return t.texture===e.texture&&t.binding===e.binding}function za(t,e){return t.buffer===e.buffer&&t.size===e.size&&t.binding===e.binding&&t.offset===e.offset}function qh(t,e){return t===null?e===null:e===null?!1:t.sampler===e.sampler&&t.texture===e.texture&&t.dimension===e.dimension&&t.formatKind===e.formatKind&&t.comparison===e.comparison}function Yh(t,e){return t.samplerBindings=t.samplerBindings||[],t.uniformBufferBindings=t.uniformBufferBindings||[],t.storageBufferBindings=t.storageBufferBindings||[],t.storageTextureBindings=t.storageTextureBindings||[],e.samplerBindings=e.samplerBindings||[],e.uniformBufferBindings=e.uniformBufferBindings||[],e.storageBufferBindings=e.storageBufferBindings||[],e.storageTextureBindings=e.storageTextureBindings||[],!(t.samplerBindings.length!==e.samplerBindings.length||!Cr(t.samplerBindings,e.samplerBindings,qh)||!Cr(t.uniformBufferBindings,e.uniformBufferBindings,za)||!Cr(t.storageBufferBindings,e.storageBufferBindings,za)||!Cr(t.storageTextureBindings,e.storageTextureBindings,jh))}function Va(t,e){return t.blendMode==e.blendMode&&t.blendSrcFactor===e.blendSrcFactor&&t.blendDstFactor===e.blendDstFactor}function Kh(t,e){return!(!Va(t.rgbBlendState,e.rgbBlendState)||!Va(t.alphaBlendState,e.alphaBlendState)||t.channelWriteMask!==e.channelWriteMask)}function Ha(t,e){return t.compare==e.compare&&t.depthFailOp===e.depthFailOp&&t.failOp===e.failOp&&t.passOp===e.passOp&&t.mask===e.mask}function Qh(t,e){return!Cr(t.attachmentsState,e.attachmentsState,Kh)||t.blendConstant&&e.blendConstant&&!Lh(t.blendConstant,e.blendConstant)||t.stencilFront&&e.stencilFront&&!Ha(t.stencilFront,e.stencilFront)||t.stencilBack&&e.stencilBack&&!Ha(t.stencilBack,e.stencilBack)?!1:t.depthCompare===e.depthCompare&&t.depthWrite===e.depthWrite&&t.stencilWrite===e.stencilWrite&&t.cullMode===e.cullMode&&t.frontFace===e.frontFace&&t.polygonOffset===e.polygonOffset}function Ec(t,e){return t.id===e.id}function Zh(t,e){return t===e}function Gh(t,e){return!(t.topology!==e.topology||t.inputLayout!==e.inputLayout||t.sampleCount!==e.sampleCount||t.megaStateDescriptor&&e.megaStateDescriptor&&!Qh(t.megaStateDescriptor,e.megaStateDescriptor)||!Ec(t.program,e.program)||!Cr(t.colorAttachmentFormats,e.colorAttachmentFormats,Zh)||t.depthStencilAttachmentFormat!==e.depthStencilAttachmentFormat)}function Jh(t,e){return t.offset===e.offset&&t.shaderLocation===e.shaderLocation&&t.format===e.format&&t.divisor===e.divisor}function e_(t,e){return Dr(t)?Dr(e):Dr(e)?!1:t.arrayStride===e.arrayStride&&t.stepMode===e.stepMode&&Cr(t.attributes,e.attributes,Jh)}function t_(t,e){return!(t.indexBufferFormat!==e.indexBufferFormat||!Cr(t.vertexBufferDescriptors,e.vertexBufferDescriptors,e_)||!Ec(t.program,e.program))}function r_(t,e){return t.addressModeU===e.addressModeU&&t.addressModeV===e.addressModeV&&t.minFilter===e.minFilter&&t.magFilter===e.magFilter&&t.mipmapFilter===e.mipmapFilter&&t.lodMinClamp===e.lodMinClamp&&t.lodMaxClamp===e.lodMaxClamp&&t.maxAnisotropy===e.maxAnisotropy&&t.compareFunction===e.compareFunction}function i_(t){var e=t.sampler,r=t.texture,i=t.dimension,s=t.formatKind,n=t.comparison;return{sampler:e,texture:r,dimension:i,formatKind:s,comparison:n}}function ka(t){var e=t.buffer,r=t.size,i=t.binding,s=t.offset;return{binding:i,buffer:e,offset:s,size:r}}function s_(t){var e=t.binding,r=t.texture;return{binding:e,texture:r}}function n_(t){var e=t.samplerBindings&&Ei(t.samplerBindings,i_),r=t.uniformBufferBindings&&Ei(t.uniformBufferBindings,ka),i=t.storageBufferBindings&&Ei(t.storageBufferBindings,ka),s=t.storageTextureBindings&&Ei(t.storageTextureBindings,s_);return{samplerBindings:e,uniformBufferBindings:r,storageBufferBindings:i,storageTextureBindings:s,pipeline:t.pipeline}}function o_(t){var e=t.inputLayout,r=t.program,i=t.topology,s=t.megaStateDescriptor&&As(t.megaStateDescriptor),n=t.colorAttachmentFormats.slice(),o=t.depthStencilAttachmentFormat,a=t.sampleCount;return{inputLayout:e,megaStateDescriptor:s,program:r,topology:i,colorAttachmentFormats:n,depthStencilAttachmentFormat:o,sampleCount:a}}function a_(t){var e=t.shaderLocation,r=t.format,i=t.offset,s=t.divisor;return{shaderLocation:e,format:r,offset:i,divisor:s}}function l_(t){if(Dr(t))return t;var e=t.arrayStride,r=t.stepMode,i=Ei(t.attributes,a_);return{arrayStride:e,stepMode:r,attributes:i}}function c_(t){var e=Ei(t.vertexBufferDescriptors,l_),r=t.indexBufferFormat,i=t.program;return{vertexBufferDescriptors:e,indexBufferFormat:r,program:i}}var $,u_=/([^[]*)(\[[0-9]+\])?/;function h_(t){if(t[t.length-1]!=="]")return{name:t,length:1,isArray:!1};var e=t.match(u_);if(!e||e.length<2)throw new Error("Failed to parse GLSL uniform name ".concat(t));return{name:e[1],length:Number(e[2])||1,isArray:!!e[2]}}function st(){var t=null;return function(e,r,i){var s=t!==i;return s&&(e.uniform1i(r,i),t=i),s}}function ue(t,e,r,i){var s=null,n=null;return function(o,a,l){var c=e(l,r),u=c.length,h=!1;if(s===null)s=new Float32Array(u),n=u,h=!0;else{U(n===u,"Uniform length cannot change.");for(var _=0;_<u;++_)if(c[_]!==s[_]){h=!0;break}}return h&&(i(o,t,a,c),s.set(c)),h}}function Ye(t,e,r,i){t[e](r,i)}function hr(t,e,r,i){t[e](r,!1,i)}var __={},d_={},f_={},Wa=[0];function $o(t,e,r,i){e===1&&typeof t=="boolean"&&(t=t?1:0),Number.isFinite(t)&&(Wa[0]=t,t=Wa);var s=t.length;if(t instanceof r)return t;var n=i[s];n||(n=new r(s),i[s]=n);for(var o=0;o<s;o++)n[o]=t[o];return n}function mt(t,e){return $o(t,e,Float32Array,__)}function Nr(t,e){return $o(t,e,Int32Array,d_)}function Ls(t,e){return $o(t,e,Uint32Array,f_)}var p_=($={},$[w.FLOAT]=ue.bind(null,"uniform1fv",mt,1,Ye),$[w.FLOAT_VEC2]=ue.bind(null,"uniform2fv",mt,2,Ye),$[w.FLOAT_VEC3]=ue.bind(null,"uniform3fv",mt,3,Ye),$[w.FLOAT_VEC4]=ue.bind(null,"uniform4fv",mt,4,Ye),$[w.INT]=ue.bind(null,"uniform1iv",Nr,1,Ye),$[w.INT_VEC2]=ue.bind(null,"uniform2iv",Nr,2,Ye),$[w.INT_VEC3]=ue.bind(null,"uniform3iv",Nr,3,Ye),$[w.INT_VEC4]=ue.bind(null,"uniform4iv",Nr,4,Ye),$[w.BOOL]=ue.bind(null,"uniform1iv",Nr,1,Ye),$[w.BOOL_VEC2]=ue.bind(null,"uniform2iv",Nr,2,Ye),$[w.BOOL_VEC3]=ue.bind(null,"uniform3iv",Nr,3,Ye),$[w.BOOL_VEC4]=ue.bind(null,"uniform4iv",Nr,4,Ye),$[w.FLOAT_MAT2]=ue.bind(null,"uniformMatrix2fv",mt,4,hr),$[w.FLOAT_MAT3]=ue.bind(null,"uniformMatrix3fv",mt,9,hr),$[w.FLOAT_MAT4]=ue.bind(null,"uniformMatrix4fv",mt,16,hr),$[w.UNSIGNED_INT]=ue.bind(null,"uniform1uiv",Ls,1,Ye),$[w.UNSIGNED_INT_VEC2]=ue.bind(null,"uniform2uiv",Ls,2,Ye),$[w.UNSIGNED_INT_VEC3]=ue.bind(null,"uniform3uiv",Ls,3,Ye),$[w.UNSIGNED_INT_VEC4]=ue.bind(null,"uniform4uiv",Ls,4,Ye),$[w.FLOAT_MAT2x3]=ue.bind(null,"uniformMatrix2x3fv",mt,6,hr),$[w.FLOAT_MAT2x4]=ue.bind(null,"uniformMatrix2x4fv",mt,8,hr),$[w.FLOAT_MAT3x2]=ue.bind(null,"uniformMatrix3x2fv",mt,6,hr),$[w.FLOAT_MAT3x4]=ue.bind(null,"uniformMatrix3x4fv",mt,12,hr),$[w.FLOAT_MAT4x2]=ue.bind(null,"uniformMatrix4x2fv",mt,8,hr),$[w.FLOAT_MAT4x3]=ue.bind(null,"uniformMatrix4x3fv",mt,12,hr),$[w.SAMPLER_2D]=st,$[w.SAMPLER_CUBE]=st,$[w.SAMPLER_3D]=st,$[w.SAMPLER_2D_SHADOW]=st,$[w.SAMPLER_2D_ARRAY]=st,$[w.SAMPLER_2D_ARRAY_SHADOW]=st,$[w.SAMPLER_CUBE_SHADOW]=st,$[w.INT_SAMPLER_2D]=st,$[w.INT_SAMPLER_3D]=st,$[w.INT_SAMPLER_CUBE]=st,$[w.INT_SAMPLER_2D_ARRAY]=st,$[w.UNSIGNED_INT_SAMPLER_2D]=st,$[w.UNSIGNED_INT_SAMPLER_3D]=st,$[w.UNSIGNED_INT_SAMPLER_CUBE]=st,$[w.UNSIGNED_INT_SAMPLER_2D_ARRAY]=st,$);function Xa(t,e,r){var i=p_[r.type];if(!i)throw new Error("Unknown GLSL uniform type ".concat(r.type));return i().bind(null,t,e)}var m_={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121};function g_(t){return Object.prototype.toString.call(t)in m_}function ki(t,e){return"#define ".concat(t," ").concat(e)}function E_(t){var e={};return t.replace(/^\s*#define\s*(\S*)\s*(\S*)\s*$/gm,function(r,i,s){var n=Number(s);return e[i]=isNaN(n)?s:n,""}),e}function y_(t,e){var r=[];return t.replace(/^\s*layout\(location\s*=\s*(\S*)\)\s*in\s+\S+\s*(.*);$/gm,function(i,s,n){var o=Number(s);return r.push({location:isNaN(o)?e[s]:o,name:n}),""}),r}function $a(t){if(t===void 0)return null;var e=/binding\s*=\s*(\d+)/.exec(t);if(e!==null){var r=parseInt(e[1],10);if(!Number.isNaN(r))return r}return null}function v_(t){var e="",r=t;return[r,e]}function _n(t,e,r,i,s){var n;i===void 0&&(i=null),s===void 0&&(s=!0);var o=t.glslVersion==="#version 100",a=e==="frag"&&((n=r.match(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm))===null||n===void 0?void 0:n.length)>1,l=r.replace(`\r
`,`
`).split(`
`).map(function(C){return C.replace(/[/][/].*$/,"")}).filter(function(C){var O=!C||/^\s+$/.test(C);return!O}),c="";i!==null&&(c=Object.keys(i).map(function(C){return ki(C,i[C])}).join(`
`));var u=l.find(function(C){return C.startsWith("precision")})||"precision mediump float;",h=s?l.filter(function(C){return!C.startsWith("precision")}).join(`
`):l.join(`
`),_="";if(t.viewportOrigin===on.UPPER_LEFT&&(_+="".concat(ki("VIEWPORT_ORIGIN_TL","1"),`
`)),t.clipSpaceNearZ===an.ZERO&&(_+="".concat(ki("CLIPSPACE_NEAR_ZERO","1"),`
`)),t.explicitBindingLocations){var p=0,d=0,g=0;h=h.replace(/^\s*(layout\((.*)\))?\s*uniform(.+{)$/gm,function(C,O,D,X){var te=D?"".concat(D,", "):"";return"layout(".concat(te,"set = ").concat(p,", binding = ").concat(d++,") uniform ").concat(X)}),p++,d=0,U(t.separateSamplerTextures),h=h.replace(/^\s*(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(C,O,D,X,te){var K=$a(D);K===null&&(K=d++);var ce=Io(v_(X),2),Ie=ce[0],_e=ce[1];return e==="frag"?`
layout(set = `.concat(p,", binding = ").concat(K*2+0,") uniform texture").concat(Ie," T_").concat(te,`;
layout(set = `).concat(p,", binding = ").concat(K*2+1,") uniform sampler").concat(_e," S_").concat(te,";").trim():""}),h=h.replace(e==="frag"?/^\s*\b(varying|in)\b/gm:/^\s*\b(varying|out)\b/gm,function(C,O){return"layout(location = ".concat(g++,") ").concat(O)}),_+="".concat(ki("gl_VertexID","gl_VertexIndex"),`
`),_+="".concat(ki("gl_InstanceID","gl_InstanceIndex"),`
`),u=u.replace(/^precision (.*) sampler(.*);$/gm,"")}else{var m=0;h=h.replace(/^\s*(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(C,O,D,X,te){var K=$a(D);return K===null&&(K=m++),"uniform sampler".concat(X," ").concat(te,"; // BINDING=").concat(K)})}if(t.separateSamplerTextures)h=h.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(C,O,D){return"sampler".concat(O,"(T_").concat(D,", S_").concat(D,")")}),h=h.replace(/\bTEXTURE\((.*?)\)/g,function(C,O){return"T_".concat(O)});else{var E=[];h=h.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(C,O,D){return E.push([D,O]),D}),o&&E.forEach(function(C){var O=Io(C,2),D=O[0],X=O[1];h=h.replace(new RegExp("texture\\(".concat(D),"g"),function(){return"texture".concat(X,"(").concat(D)})}),h=h.replace(/\bTEXTURE\((.*?)\)/g,function(C,O){return O})}var A="".concat(o?"":t.glslVersion,`
`).concat(o&&a?`#extension GL_EXT_draw_buffers : require
`:"",`
`).concat(o&&e==="frag"?`#extension GL_OES_standard_derivatives : enable
`:"").concat(s?u:"",`
`).concat(_||"").concat(c?c+`
`:"",`
`).concat(h,`
`).trim();if(t.explicitBindingLocations&&e==="frag"&&(A=A.replace(/^\b(out)\b/g,function(C,O){return"layout(location = 0) ".concat(O)})),o){if(e==="frag"&&(A=A.replace(/^\s*in\s+(\S+)\s*(.*);$/gm,function(C,O,D){return"varying ".concat(O," ").concat(D,`;
`)})),e==="vert"&&(A=A.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(C,O,D){return"varying ".concat(O," ").concat(D,`;
`)}),A=A.replace(/^\s*layout\(location\s*=\s*\S*\)\s*in\s+(\S+)\s*(.*);$/gm,function(C,O,D){return"attribute ".concat(O," ").concat(D,`;
`)})),A=A.replace(/\s*uniform\s*.*\s*{((?:\s*.*\s*)*?)};/g,function(C,O){return O.trim().replace(/^.*$/gm,function(D){var X=D.trim();return X.startsWith("#")?X:D?"uniform ".concat(X):""})}),e==="frag")if(a){var S=[];A=A.replace(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm,function(C,O){return S.push(O),"vec4 ".concat(O,`;
`)});var P=A.lastIndexOf("}");A=A.substring(0,P)+`
    `.concat(S.map(function(C,O){return"gl_FragData[".concat(O,"] = ").concat(C,`;
    `)}).join(`
`))+A.substring(P)}else{var k;if(A=A.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(C,O,D){return k=D,"".concat(O," ").concat(D,`;
`)}),k){var P=A.lastIndexOf("}");A=A.substring(0,P)+`
  gl_FragColor = vec4(`.concat(k,`);
`)+A.substring(P)}}A=A.replace(/^\s*layout\((.*)\)/gm,"")}return A}function A_(t,e,r,i){i===void 0&&(i=null);var s=_n(t,"vert",e,i),n=_n(t,"frag",r,i);return{vert:e,frag:r,preprocessedVert:s,preprocessedFrag:n}}var Mt=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=t.call(this)||this;return n.id=i,n.device=s,n.device.resourceCreationTracker!==null&&n.device.resourceCreationTracker.trackResourceCreated(n),n}return e.prototype.destroy=function(){this.device.resourceCreationTracker!==null&&this.device.resourceCreationTracker.trackResourceDestroyed(this)},e}(lc);(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;o.type=ne.Bindings;var a=n.uniformBufferBindings,l=n.samplerBindings;return o.uniformBufferBindings=a||[],o.samplerBindings=l||[],o.bindingLayouts=o.createBindingLayouts(),o}return e.prototype.createBindingLayouts=function(){var r=0,i=0,s=[],n=this.uniformBufferBindings.length,o=this.samplerBindings.length;return s.push({firstUniformBuffer:r,numUniformBuffers:n,firstSampler:i,numSamplers:o}),r+=n,i+=o,{numUniformBuffers:r,numSamplers:i,bindingLayoutTables:s}},e})(Mt);function G(t){return typeof WebGL2RenderingContext<"u"&&t instanceof WebGL2RenderingContext?!0:!!(t&&t._version===2)}function w_(t){var e=or(t);switch(e){case T.BC1:case T.BC2:case T.BC3:case T.BC4_UNORM:case T.BC4_SNORM:case T.BC5_UNORM:case T.BC5_SNORM:return!0;default:return!1}}function T_(t){var e=cs(t);if(e&N.Normalized)return!1;var r=or(t);return r===T.S8||r===T.S16||r===T.S32||r===T.U8||r===T.U16||r===T.U32}function R_(t){switch(t){case Lr.STATIC:return w.STATIC_DRAW;case Lr.DYNAMIC:return w.DYNAMIC_DRAW}}function ja(t){if(t&re.INDEX)return w.ELEMENT_ARRAY_BUFFER;if(t&re.VERTEX)return w.ARRAY_BUFFER;if(t&re.UNIFORM)return w.UNIFORM_BUFFER}function b_(t){switch(t){case we.TRIANGLES:return w.TRIANGLES;case we.POINTS:return w.POINTS;case we.TRIANGLE_STRIP:return w.TRIANGLE_STRIP;case we.LINES:return w.LINES;case we.LINE_STRIP:return w.LINE_STRIP;default:throw new Error("Unknown primitive topology mode")}}function x_(t){switch(t){case T.U8:return w.UNSIGNED_BYTE;case T.U16:return w.UNSIGNED_SHORT;case T.U32:return w.UNSIGNED_INT;case T.S8:return w.BYTE;case T.S16:return w.SHORT;case T.S32:return w.INT;case T.F16:return w.HALF_FLOAT;case T.F32:return w.FLOAT;default:throw new Error("whoops")}}function S_(t){switch(t){case F.R:return 1;case F.RG:return 2;case F.RGB:return 3;case F.RGBA:return 4;default:return 1}}function I_(t){var e=or(t),r=cc(t),i=cs(t),s=x_(e),n=S_(r),o=!!(i&N.Normalized);return{size:n,type:s,normalized:o}}function O_(t){switch(t){case R.U8_R:return w.UNSIGNED_BYTE;case R.U16_R:return w.UNSIGNED_SHORT;case R.U32_R:return w.UNSIGNED_INT;default:throw new Error("whoops")}}function Wi(t){switch(t){case Le.CLAMP_TO_EDGE:return w.CLAMP_TO_EDGE;case Le.REPEAT:return w.REPEAT;case Le.MIRRORED_REPEAT:return w.MIRRORED_REPEAT;default:throw new Error("whoops")}}function zs(t,e){if(e===Ee.LINEAR&&t===le.BILINEAR)return w.LINEAR_MIPMAP_LINEAR;if(e===Ee.LINEAR&&t===le.POINT)return w.NEAREST_MIPMAP_LINEAR;if(e===Ee.NEAREST&&t===le.BILINEAR)return w.LINEAR_MIPMAP_NEAREST;if(e===Ee.NEAREST&&t===le.POINT)return w.NEAREST_MIPMAP_NEAREST;if(e===Ee.NO_MIP&&t===le.BILINEAR)return w.LINEAR;if(e===Ee.NO_MIP&&t===le.POINT)return w.NEAREST;throw new Error("Unknown texture filter mode")}function jo(t,e){e===void 0&&(e=0);var r=t;return r.gl_buffer_pages[e/r.pageByteSize|0]}function N_(t){var e=t;return e.gl_texture}function C_(t){var e=t;return e.gl_sampler}function M_(t){switch(t){case ln.OcclusionConservative:return w.ANY_SAMPLES_PASSED_CONSERVATIVE;default:throw new Error("whoops")}}(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;o.type=ne.Buffer;var a=n.viewOrSize,l=n.usage,c=n.hint,u=c===void 0?Lr.STATIC:c,h=s.uniformBufferMaxPageByteSize,_=s.gl,p=l&re.UNIFORM;p||(G(_)?_.bindVertexArray(null):s.OES_vertex_array_object.bindVertexArrayOES(null));var d=gi(a)?un(a,4):un(a.byteLength,4);o.gl_buffer_pages=[];var g;if(p){for(var m=d;m>0;)o.gl_buffer_pages.push(o.createBufferPage(Math.min(m,h),l,u)),m-=h;g=h}else o.gl_buffer_pages.push(o.createBufferPage(d,l,u)),g=d;return o.pageByteSize=g,o.byteSize=d,o.usage=l,o.gl_target=ja(l),gi(a)||o.setSubData(0,new Uint8Array(a.buffer)),p||(G(_)?_.bindVertexArray(o.device.currentBoundVAO):s.OES_vertex_array_object.bindVertexArrayOES(o.device.currentBoundVAO)),o}return e.prototype.setSubData=function(r,i,s,n){s===void 0&&(s=0),n===void 0&&(n=i.byteLength-s);for(var o=this.device.gl,a=this.pageByteSize,l=r+n,c=r,u=r%a;c<l;){var h=G(o)?o.COPY_WRITE_BUFFER:this.gl_target,_=jo(this,c);if(_.ubo)return;o.bindBuffer(h,_),G(o)?o.bufferSubData(h,u,i,s,Math.min(l-c,a)):o.bufferSubData(h,u,i),c+=a,u=0,s+=a,this.device.debugGroupStatisticsBufferUpload()}},e.prototype.destroy=function(){t.prototype.destroy.call(this);for(var r=0;r<this.gl_buffer_pages.length;r++)this.gl_buffer_pages[r].ubo||this.device.gl.deleteBuffer(this.gl_buffer_pages[r]);this.gl_buffer_pages=[]},e.prototype.createBufferPage=function(r,i,s){var n=this.device.gl,o=i&re.UNIFORM;if(!G(n)&&o)return{ubo:!0};var a=this.device.ensureResourceExists(n.createBuffer()),l=ja(i),c=R_(s);return n.bindBuffer(l,a),n.bufferData(l,r,c),a},e})(Mt);(function(t){he(e,t);function e(r){var i,s,n,o,a=r.id,l=r.device,c=r.descriptor,u,h=t.call(this,{id:a,device:l})||this;h.type=ne.InputLayout;var _=c.vertexBufferDescriptors,p=c.indexBufferFormat,d=c.program;U(p===R.U16_R||p===R.U32_R||p===null);var g=p!==null?O_(p):null,m=p!==null?hc(p):null,E=h.device.gl,A=h.device.ensureResourceExists(G(E)?E.createVertexArray():l.OES_vertex_array_object.createVertexArrayOES());G(E)?E.bindVertexArray(A):l.OES_vertex_array_object.bindVertexArrayOES(A),E.bindBuffer(E.ARRAY_BUFFER,jo(h.device.fallbackVertexBuffer));try{for(var S=as(c.vertexBufferDescriptors),P=S.next();!P.done;P=S.next()){var k=P.value,C=k.stepMode,O=k.attributes;try{for(var D=(n=void 0,as(O)),X=D.next();!X.done;X=D.next()){var te=X.value,K=te.shaderLocation,ce=te.format,Ie=te.divisor,_e=Ie===void 0?1:Ie,Oe=G(E)?K:(u=d.attributes[K])===null||u===void 0?void 0:u.location,ie=I_(ce);if(te.vertexFormat=ie,!Dr(Oe)){T_(ce);var Or=ie.size,Fi=ie.type,Yr=ie.normalized;E.vertexAttribPointer(Oe,Or,Fi,Yr,0,0),C===Ti.INSTANCE&&(G(E)?E.vertexAttribDivisor(Oe,_e):l.ANGLE_instanced_arrays.vertexAttribDivisorANGLE(Oe,_e)),E.enableVertexAttribArray(Oe)}}}catch(ur){n={error:ur}}finally{try{X&&!X.done&&(o=D.return)&&o.call(D)}finally{if(n)throw n.error}}}}catch(ur){i={error:ur}}finally{try{P&&!P.done&&(s=S.return)&&s.call(S)}finally{if(i)throw i.error}}return G(E)?E.bindVertexArray(null):l.OES_vertex_array_object.bindVertexArrayOES(null),h.vertexBufferDescriptors=_,h.vao=A,h.indexBufferFormat=p,h.indexBufferType=g,h.indexBufferCompByteSize=m,h.program=d,h}return e.prototype.destroy=function(){t.prototype.destroy.call(this),this.device.currentBoundVAO===this.vao&&(G(this.device.gl)?(this.device.gl.bindVertexArray(null),this.device.gl.deleteVertexArray(this.vao)):(this.device.OES_vertex_array_object.bindVertexArrayOES(null),this.device.OES_vertex_array_object.deleteVertexArrayOES(this.vao)),this.device.currentBoundVAO=null)},e})(Mt);var P_=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=r.fake,a=t.call(this,{id:i,device:s})||this;a.type=ne.Texture,n=me({dimension:Q.TEXTURE_2D,depthOrArrayLayers:1,mipLevelCount:1},n);var l=a.device.gl,c,u,h=a.clampmipLevelCount(n);if(a.immutable=n.usage===Ot.RENDER_TARGET,a.pixelStore=n.pixelStore,a.format=n.format,a.dimension=n.dimension,a.formatKind=dc(n.format),a.width=n.width,a.height=n.height,a.depthOrArrayLayers=n.depthOrArrayLayers,a.mipmaps=h>=1,!o){u=a.device.ensureResourceExists(l.createTexture());var _=a.device.translateTextureType(n.format),p=a.device.translateTextureInternalFormat(n.format);if(a.device.setActiveTexture(l.TEXTURE0),a.device.currentTextures[0]=null,a.preprocessImage(),n.dimension===Q.TEXTURE_2D){if(c=w.TEXTURE_2D,l.bindTexture(c,u),a.immutable)if(G(l))l.texStorage2D(c,h,p,n.width,n.height);else{var d=(p===w.DEPTH_COMPONENT||a.isNPOT(),0);(a.format===R.D32F||a.format===R.D24_S8)&&!G(l)&&!s.WEBGL_depth_texture||(l.texImage2D(c,d,p,n.width,n.height,0,p,_,null),a.mipmaps&&(a.mipmaps=!1,l.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,w.LINEAR),l.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_S,w.CLAMP_TO_EDGE),l.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_T,w.CLAMP_TO_EDGE)))}U(n.depthOrArrayLayers===1)}else if(n.dimension===Q.TEXTURE_2D_ARRAY)c=w.TEXTURE_2D_ARRAY,l.bindTexture(c,u),a.immutable&&G(l)&&l.texStorage3D(c,h,p,n.width,n.height,n.depthOrArrayLayers);else if(n.dimension===Q.TEXTURE_3D)c=w.TEXTURE_3D,l.bindTexture(c,u),a.immutable&&G(l)&&l.texStorage3D(c,h,p,n.width,n.height,n.depthOrArrayLayers);else if(n.dimension===Q.TEXTURE_CUBE_MAP)c=w.TEXTURE_CUBE_MAP,l.bindTexture(c,u),a.immutable&&G(l)&&l.texStorage2D(c,h,p,n.width,n.height),U(n.depthOrArrayLayers===6);else throw new Error("whoops")}return a.gl_texture=u,a.gl_target=c,a.mipLevelCount=h,a}return e.prototype.setImageData=function(r,i){i===void 0&&(i=0);var s=this.device.gl;w_(this.format);var n=this.gl_target===w.TEXTURE_3D||this.gl_target===w.TEXTURE_2D_ARRAY,o=this.gl_target===w.TEXTURE_CUBE_MAP,a=g_(r[0]);this.device.setActiveTexture(s.TEXTURE0),this.device.currentTextures[0]=null;var l=r[0],c,u;a?(c=this.width,u=this.height):(c=l.width,u=l.height,this.width=c,this.height=u),s.bindTexture(this.gl_target,this.gl_texture);var h=this.device.translateTextureFormat(this.format),_=G(s)?this.device.translateInternalTextureFormat(this.format):h,p=this.device.translateTextureType(this.format);this.preprocessImage();for(var d=0;d<this.depthOrArrayLayers;d++){var g=r[d],m=this.gl_target;o&&(m=w.TEXTURE_CUBE_MAP_POSITIVE_X+d%6),this.immutable?s.texSubImage2D(m,i,0,0,c,u,h,p,g):G(s)?n?s.texImage3D(m,i,_,c,u,this.depthOrArrayLayers,0,h,p,g):s.texImage2D(m,i,_,c,u,0,h,p,g):a?s.texImage2D(m,i,h,c,u,0,h,p,g):s.texImage2D(m,i,h,h,p,g)}this.mipmaps&&this.generateMipmap(n)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.device.gl.deleteTexture(N_(this))},e.prototype.clampmipLevelCount=function(r){if(r.dimension===Q.TEXTURE_2D_ARRAY&&r.depthOrArrayLayers>1){var i=or(r.format);if(i===T.BC1)for(var s=r.width,n=r.height,o=0;o<r.mipLevelCount;o++){if(s<=2||n<=2)return o-1;s=Math.max(s/2|0,1),n=Math.max(n/2|0,1)}}return r.mipLevelCount},e.prototype.preprocessImage=function(){var r=this.device.gl;this.pixelStore&&(this.pixelStore.unpackFlipY&&r.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,!0),this.pixelStore.packAlignment&&r.pixelStorei(w.PACK_ALIGNMENT,this.pixelStore.packAlignment),this.pixelStore.unpackAlignment&&r.pixelStorei(w.UNPACK_ALIGNMENT,this.pixelStore.unpackAlignment))},e.prototype.generateMipmap=function(r){r===void 0&&(r=!1);var i=this.device.gl;return!G(i)&&this.isNPOT()?this:(this.gl_texture&&this.gl_target&&(i.bindTexture(this.gl_target,this.gl_texture),r?(i.texParameteri(this.gl_target,w.TEXTURE_BASE_LEVEL,0),i.texParameteri(this.gl_target,w.TEXTURE_MAX_LEVEL,Math.log2(this.width)),i.texParameteri(this.gl_target,w.TEXTURE_MIN_FILTER,w.LINEAR_MIPMAP_LINEAR),i.texParameteri(this.gl_target,w.TEXTURE_MAG_FILTER,w.LINEAR)):i.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,w.NEAREST_MIPMAP_LINEAR),i.generateMipmap(this.gl_target),i.bindTexture(this.gl_target,null)),this)},e.prototype.isNPOT=function(){var r=this.device.gl;return G(r)?!1:!cn(this.width)||!cn(this.height)},e}(Mt);(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;o.type=ne.RenderTarget,o.gl_renderbuffer=null,o.texture=null;var a=o.device.gl,l=n.format,c=n.width,u=n.height,h=n.sampleCount,_=h===void 0?1:h,p=n.texture,d=!1;if((l===R.D32F||l===R.D24_S8)&&p&&!G(a)&&!s.WEBGL_depth_texture&&(p.destroy(),o.texture=null,d=!0),!d&&p)o.texture=p;else{o.gl_renderbuffer=o.device.ensureResourceExists(a.createRenderbuffer()),a.bindRenderbuffer(a.RENDERBUFFER,o.gl_renderbuffer);var g=o.device.translateTextureInternalFormat(l,!0);G(a)&&_>1?a.renderbufferStorageMultisample(w.RENDERBUFFER,_,g,c,u):a.renderbufferStorage(w.RENDERBUFFER,g,c,u)}return o.format=l,o.width=c,o.height=u,o.sampleCount=_,o}return e.prototype.destroy=function(){t.prototype.destroy.call(this),this.gl_renderbuffer!==null&&this.device.gl.deleteRenderbuffer(this.gl_renderbuffer),this.texture&&this.texture.destroy()},e})(Mt);var is;(function(t){t[t.NeedsCompile=0]="NeedsCompile",t[t.Compiling=1]="Compiling",t[t.NeedsBind=2]="NeedsBind",t[t.ReadyToUse=3]="ReadyToUse"})(is||(is={}));(function(t){he(e,t);function e(r,i){var s=r.id,n=r.device,o=r.descriptor,a=t.call(this,{id:s,device:n})||this;a.rawVertexGLSL=i,a.type=ne.Program,a.uniformSetters={},a.attributes=[];var l=a.device.gl;return a.descriptor=o,a.gl_program=a.device.ensureResourceExists(l.createProgram()),a.gl_shader_vert=null,a.gl_shader_frag=null,a.compileState=is.NeedsCompile,a.tryCompileProgram(),a}return e.prototype.destroy=function(){t.prototype.destroy.call(this),this.device.gl.deleteProgram(this.gl_program),this.device.gl.deleteShader(this.gl_shader_vert),this.device.gl.deleteShader(this.gl_shader_frag)},e.prototype.tryCompileProgram=function(){U(this.compileState===is.NeedsCompile);var r=this.descriptor,i=r.vertex,s=r.fragment,n=this.device.gl;i!=null&&i.glsl&&(s!=null&&s.glsl)&&(this.gl_shader_vert=this.compileShader(i.postprocess?i.postprocess(i.glsl):i.glsl,n.VERTEX_SHADER),this.gl_shader_frag=this.compileShader(s.postprocess?s.postprocess(s.glsl):s.glsl,n.FRAGMENT_SHADER),n.attachShader(this.gl_program,this.gl_shader_vert),n.attachShader(this.gl_program,this.gl_shader_frag),n.linkProgram(this.gl_program),this.compileState=is.Compiling,G(n)||(this.readUniformLocationsFromLinkedProgram(),this.readAttributesFromLinkedProgram()))},e.prototype.readAttributesFromLinkedProgram=function(){for(var r,i=this.device.gl,s=i.getProgramParameter(this.gl_program,i.ACTIVE_ATTRIBUTES),n=E_(this.descriptor.vertex.glsl),o=y_(this.rawVertexGLSL,n),a=function(u){var h=i.getActiveAttrib(l.gl_program,u),_=h.name,p=h.type,d=h.size,g=i.getAttribLocation(l.gl_program,_),m=(r=o.find(function(E){return E.name===_}))===null||r===void 0?void 0:r.location;g>=0&&!Dr(m)&&(l.attributes[m]={name:_,location:g,type:p,size:d})},l=this,c=0;c<s;c++)a(c)},e.prototype.readUniformLocationsFromLinkedProgram=function(){for(var r=this.device.gl,i=r.getProgramParameter(this.gl_program,r.ACTIVE_UNIFORMS),s=0;s<i;s++){var n=r.getActiveUniform(this.gl_program,s),o=h_(n.name).name,a=r.getUniformLocation(this.gl_program,o);if(this.uniformSetters[o]=Xa(r,a,n),n&&n.size>1)for(var l=0;l<n.size;l++)a=r.getUniformLocation(this.gl_program,"".concat(o,"[").concat(l,"]")),this.uniformSetters["".concat(o,"[").concat(l,"]")]=Xa(r,a,n)}},e.prototype.compileShader=function(r,i){var s=this.device.gl,n=this.device.ensureResourceExists(s.createShader(i));return s.shaderSource(n,r),s.compileShader(n),n},e.prototype.setUniformsLegacy=function(r){r===void 0&&(r={});var i=this.device.gl;if(!G(i)){var s=!1;for(var n in r){s||(i.useProgram(this.gl_program),s=!0);var o=r[n],a=this.uniformSetters[n];if(a){var l=o;l instanceof P_&&(l=l.textureIndex),a(l)}}}return this},e})(Mt);(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;o.type=ne.QueryPool;var a=o.device.gl;if(G(a)){var l=n.elemCount,c=n.type;o.gl_query=Qr(l,function(){return o.device.ensureResourceExists(a.createQuery())}),o.gl_query_type=M_(c)}return o}return e.prototype.queryResultOcclusion=function(r){var i=this.device.gl;if(G(i)){var s=this.gl_query[r];return i.getQueryParameter(s,i.QUERY_RESULT_AVAILABLE)?!!i.getQueryParameter(s,i.QUERY_RESULT):null}return null},e.prototype.destroy=function(){t.prototype.destroy.call(this);var r=this.device.gl;if(G(r))for(var i=0;i<this.gl_query.length;i++)r.deleteQuery(this.gl_query[i])},e})(Mt);(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=t.call(this,{id:i,device:s})||this;return n.type=ne.Readback,n.gl_pbo=null,n.gl_sync=null,n}return e.prototype.clientWaitAsync=function(r,i,s){i===void 0&&(i=0),s===void 0&&(s=10);var n=this.device.gl;return new Promise(function(o,a){function l(){var c=n.clientWaitSync(r,i,0);if(c==n.WAIT_FAILED){a();return}if(c==n.TIMEOUT_EXPIRED){setTimeout(l,Mh(s,0,n.MAX_CLIENT_WAIT_TIMEOUT_WEBGL));return}o()}l()})},e.prototype.getBufferSubDataAsync=function(r,i,s,n,o,a){return ts(this,void 0,void 0,function(){var l;return rs(this,function(c){switch(c.label){case 0:return l=this.device.gl,G(l)?(this.gl_sync=l.fenceSync(l.SYNC_GPU_COMMANDS_COMPLETE,0),l.flush(),[4,this.clientWaitAsync(this.gl_sync,0,10)]):[3,2];case 1:return c.sent(),l.bindBuffer(r,i),l.getBufferSubData(r,s,n,o,a),l.bindBuffer(r,null),[2,n];case 2:return[2]}})})},e.prototype.readTexture=function(r,i,s,n,o,a,l,c){return l===void 0&&(l=0),c===void 0&&(c=a.byteLength||0),ts(this,void 0,void 0,function(){var u,h,_,p,d;return rs(this,function(g){return u=this.device.gl,h=r,_=this.device.translateTextureFormat(h.format),p=this.device.translateTextureType(h.format),d=_c(h.format),G(u)?(this.gl_pbo=this.device.ensureResourceExists(u.createBuffer()),u.bindBuffer(u.PIXEL_PACK_BUFFER,this.gl_pbo),u.bufferData(u.PIXEL_PACK_BUFFER,c,u.STREAM_READ),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),u.bindFramebuffer(w.READ_FRAMEBUFFER,this.device.readbackFramebuffer),u.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,h.gl_texture,0),u.bindBuffer(u.PIXEL_PACK_BUFFER,this.gl_pbo),u.readPixels(i,s,n,o,_,p,l*d),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),[2,this.getBufferSubDataAsync(u.PIXEL_PACK_BUFFER,this.gl_pbo,0,a,l,0)]):[2,this.readTextureSync(r,i,s,n,o,a,l,c)]})})},e.prototype.readTextureSync=function(r,i,s,n,o,a,l,c){c===void 0&&(c=a.byteLength||0);var u=this.device.gl,h=r,_=this.device.translateTextureType(h.format);return u.bindFramebuffer(w.FRAMEBUFFER,this.device.readbackFramebuffer),u.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,h.gl_texture,0),u.pixelStorei(u.PACK_ALIGNMENT,4),u.readPixels(i,s,n,o,u.RGBA,_,a),a},e.prototype.readBuffer=function(r,i,s,n,o){return ts(this,void 0,void 0,function(){var a;return rs(this,function(l){return a=this.device.gl,G(a)?[2,this.getBufferSubDataAsync(a.ARRAY_BUFFER,jo(r,i),i,s,n,o)]:[2,Promise.reject()]})})},e.prototype.destroy=function(){t.prototype.destroy.call(this),G(this.device.gl)&&(this.gl_sync!==null&&this.device.gl.deleteSync(this.gl_sync),this.gl_pbo!==null&&this.device.gl.deleteBuffer(this.gl_pbo))},e})(Mt);(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o,a,l=t.call(this,{id:i,device:s})||this;return l.type=ne.RenderPipeline,l.drawMode=b_((o=n.topology)!==null&&o!==void 0?o:we.TRIANGLES),l.program=n.program,l.inputLayout=n.inputLayout,l.megaState=me(me({},As(Ii)),n.megaStateDescriptor),l.colorAttachmentFormats=n.colorAttachmentFormats.slice(),l.depthStencilAttachmentFormat=n.depthStencilAttachmentFormat,l.sampleCount=(a=n.sampleCount)!==null&&a!==void 0?a:1,l}return e})(Mt);(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;return o.type=ne.ComputePipeline,o.descriptor=n,o}return e})(Mt);(function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o,a,l=t.call(this,{id:i,device:s})||this;l.type=ne.Sampler;var c=l.device.gl;if(G(c)){var u=l.device.ensureResourceExists(c.createSampler());c.samplerParameteri(u,w.TEXTURE_WRAP_S,Wi(n.addressModeU)),c.samplerParameteri(u,w.TEXTURE_WRAP_T,Wi(n.addressModeV)),c.samplerParameteri(u,w.TEXTURE_WRAP_R,Wi((o=n.addressModeW)!==null&&o!==void 0?o:n.addressModeU)),c.samplerParameteri(u,w.TEXTURE_MIN_FILTER,zs(n.minFilter,n.mipmapFilter)),c.samplerParameteri(u,w.TEXTURE_MAG_FILTER,zs(n.magFilter,Ee.NO_MIP)),n.lodMinClamp!==void 0&&c.samplerParameterf(u,w.TEXTURE_MIN_LOD,n.lodMinClamp),n.lodMaxClamp!==void 0&&c.samplerParameterf(u,w.TEXTURE_MAX_LOD,n.lodMaxClamp),n.compareFunction!==void 0&&(c.samplerParameteri(u,c.TEXTURE_COMPARE_MODE,c.COMPARE_REF_TO_TEXTURE),c.samplerParameteri(u,c.TEXTURE_COMPARE_FUNC,n.compareFunction));var h=(a=n.maxAnisotropy)!==null&&a!==void 0?a:1;h>1&&l.device.EXT_texture_filter_anisotropic!==null&&(U(n.minFilter===le.BILINEAR&&n.magFilter===le.BILINEAR&&n.mipmapFilter===Ee.LINEAR),c.samplerParameterf(u,l.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,h)),l.gl_sampler=u}else l.descriptor=n;return l}return e.prototype.setTextureParameters=function(r,i,s){var n,o=this.device.gl,a=this.descriptor;this.isNPOT(i,s)?o.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,w.LINEAR):o.texParameteri(r,w.TEXTURE_MIN_FILTER,zs(a.minFilter,a.mipmapFilter)),o.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_S,Wi(a.addressModeU)),o.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_T,Wi(a.addressModeV)),o.texParameteri(r,w.TEXTURE_MAG_FILTER,zs(a.magFilter,Ee.NO_MIP));var l=(n=a.maxAnisotropy)!==null&&n!==void 0?n:1;l>1&&this.device.EXT_texture_filter_anisotropic!==null&&(U(a.minFilter===le.BILINEAR&&a.magFilter===le.BILINEAR&&a.mipmapFilter===Ee.LINEAR),o.texParameteri(r,this.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,l))},e.prototype.destroy=function(){t.prototype.destroy.call(this),G(this.device.gl)&&this.device.gl.deleteSampler(C_(this))},e.prototype.isNPOT=function(r,i){return!cn(r)||!cn(i)},e})(Mt);(function(t){he(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.type=ne.RenderBundle,r.commands=[],r}return e.prototype.push=function(r){this.commands.push(r)},e.prototype.replay=function(){this.commands.forEach(function(r){return r()})},e})(Mt);let ge;const yc=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&yc.decode();let Ki=null;function js(){return(Ki===null||Ki.byteLength===0)&&(Ki=new Uint8Array(ge.memory.buffer)),Ki}function dn(t,e){return t=t>>>0,yc.decode(js().subarray(t,t+e))}const fr=new Array(128).fill(void 0);fr.push(void 0,null,!0,!1);let ss=fr.length;function B_(t){ss===fr.length&&fr.push(fr.length+1);const e=ss;return ss=fr[e],fr[e]=t,e}function qs(t){return fr[t]}function D_(t){t<132||(fr[t]=ss,ss=t)}function U_(t){const e=qs(t);return D_(t),e}let us=0;const Ys=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},F_=typeof Ys.encodeInto=="function"?function(t,e){return Ys.encodeInto(t,e)}:function(t,e){const r=Ys.encode(t);return e.set(r),{read:t.length,written:r.length}};function No(t,e,r){if(r===void 0){const a=Ys.encode(t),l=e(a.length,1)>>>0;return js().subarray(l,l+a.length).set(a),us=a.length,l}let i=t.length,s=e(i,1)>>>0;const n=js();let o=0;for(;o<i;o++){const a=t.charCodeAt(o);if(a>127)break;n[s+o]=a}if(o!==i){o!==0&&(t=t.slice(o)),s=r(s,i,i=o+t.length*3,1)>>>0;const a=js().subarray(s+o,s+i),l=F_(t,a);o+=l.written}return us=o,s}let Qi=null;function fn(){return(Qi===null||Qi.byteLength===0)&&(Qi=new Int32Array(ge.memory.buffer)),Qi}function L_(t,e,r){let i,s;try{const a=ge.__wbindgen_add_to_stack_pointer(-16),l=No(t,ge.__wbindgen_malloc,ge.__wbindgen_realloc),c=us,u=No(e,ge.__wbindgen_malloc,ge.__wbindgen_realloc),h=us;ge.glsl_compile(a,l,c,u,h,r);var n=fn()[a/4+0],o=fn()[a/4+1];return i=n,s=o,dn(n,o)}finally{ge.__wbindgen_add_to_stack_pointer(16),ge.__wbindgen_free(i,s,1)}}class hs{static __wrap(e){e=e>>>0;const r=Object.create(hs.prototype);return r.__wbg_ptr=e,r}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,e}free(){const e=this.__destroy_into_raw();ge.__wbg_wgslcomposer_free(e)}constructor(){const e=ge.wgslcomposer_new();return hs.__wrap(e)}wgsl_compile(e){let r,i;try{const o=ge.__wbindgen_add_to_stack_pointer(-16),a=No(e,ge.__wbindgen_malloc,ge.__wbindgen_realloc),l=us;ge.wgslcomposer_wgsl_compile(o,this.__wbg_ptr,a,l);var s=fn()[o/4+0],n=fn()[o/4+1];return r=s,i=n,dn(s,n)}finally{ge.__wbindgen_add_to_stack_pointer(16),ge.__wbindgen_free(r,i,1)}}}async function z_(t,e){if(typeof Response=="function"&&t instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,e)}catch(i){if(t.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",i);else throw i}const r=await t.arrayBuffer();return await WebAssembly.instantiate(r,e)}else{const r=await WebAssembly.instantiate(t,e);return r instanceof WebAssembly.Instance?{instance:r,module:t}:r}}function V_(){const t={};return t.wbg={},t.wbg.__wbindgen_string_new=function(e,r){const i=dn(e,r);return B_(i)},t.wbg.__wbindgen_object_drop_ref=function(e){U_(e)},t.wbg.__wbg_log_1d3ae0273d8f4f8a=function(e){console.log(qs(e))},t.wbg.__wbg_log_576ca876af0d4a77=function(e,r){console.log(qs(e),qs(r))},t.wbg.__wbindgen_throw=function(e,r){throw new Error(dn(e,r))},t}function H_(t,e){return ge=t.exports,vc.__wbindgen_wasm_module=e,Qi=null,Ki=null,ge}async function vc(t){if(ge!==void 0)return ge;const e=V_();(typeof t=="string"||typeof Request=="function"&&t instanceof Request||typeof URL=="function"&&t instanceof URL)&&(t=fetch(t));const{instance:r,module:i}=await z_(await t,e);return H_(r,i)}var Re;(function(t){t[t.COPY_SRC=1]="COPY_SRC",t[t.COPY_DST=2]="COPY_DST",t[t.TEXTURE_BINDING=4]="TEXTURE_BINDING",t[t.STORAGE_BINDING=8]="STORAGE_BINDING",t[t.STORAGE=8]="STORAGE",t[t.RENDER_ATTACHMENT=16]="RENDER_ATTACHMENT"})(Re||(Re={}));var Co;(function(t){t[t.READ=1]="READ",t[t.WRITE=2]="WRITE"})(Co||(Co={}));function k_(t){var e=0;return t&Ot.SAMPLED&&(e|=Re.TEXTURE_BINDING|Re.COPY_DST|Re.COPY_SRC),t&Ot.STORAGE&&(e|=Re.TEXTURE_BINDING|Re.STORAGE_BINDING|Re.COPY_SRC|Re.COPY_DST),t&Ot.RENDER_TARGET&&(e|=Re.RENDER_ATTACHMENT|Re.TEXTURE_BINDING|Re.COPY_SRC|Re.COPY_DST),e}function qo(t){if(t===R.U8_R_NORM)return"r8unorm";if(t===R.S8_R_NORM)return"r8snorm";if(t===R.U8_RG_NORM)return"rg8unorm";if(t===R.S8_RG_NORM)return"rg8snorm";if(t===R.U32_R)return"r32uint";if(t===R.F32_R)return"r32float";if(t===R.U8_RGBA_RT)return"bgra8unorm";if(t===R.U8_RGBA_RT_SRGB)return"bgra8unorm-srgb";if(t===R.U8_RGBA_NORM)return"rgba8unorm";if(t===R.U8_RGBA_SRGB)return"rgba8unorm-srgb";if(t===R.S8_RGBA_NORM)return"rgba8snorm";if(t===R.F16_RGBA)return"rgba16float";if(t===R.F32_RGBA)return"rgba32float";if(t===R.D24)return"depth24plus";if(t===R.D24_S8)return"depth24plus-stencil8";if(t===R.D32F)return"depth32float";if(t===R.D32F_S8)return"depth32float-stencil8";if(t===R.BC1)return"bc1-rgba-unorm";if(t===R.BC1_SRGB)return"bc1-rgba-unorm-srgb";if(t===R.BC2)return"bc2-rgba-unorm";if(t===R.BC2_SRGB)return"bc2-rgba-unorm-srgb";if(t===R.BC3)return"bc3-rgba-unorm";if(t===R.BC3_SRGB)return"bc3-rgba-unorm-srgb";if(t===R.BC4_SNORM)return"bc4-r-snorm";if(t===R.BC4_UNORM)return"bc4-r-unorm";if(t===R.BC5_SNORM)return"bc5-rg-snorm";if(t===R.BC5_UNORM)return"bc5-rg-unorm";throw"whoops"}function W_(t){if(t===Q.TEXTURE_2D)return"2d";if(t===Q.TEXTURE_CUBE_MAP)return"2d";if(t===Q.TEXTURE_2D_ARRAY)return"2d";if(t===Q.TEXTURE_3D)return"3d";throw new Error("whoops")}function X_(t){if(t===Q.TEXTURE_2D)return"2d";if(t===Q.TEXTURE_CUBE_MAP)return"cube";if(t===Q.TEXTURE_2D_ARRAY)return"2d-array";if(t===Q.TEXTURE_3D)return"3d";throw new Error("whoops")}function $_(t){var e=0;return t&re.INDEX&&(e|=GPUBufferUsage.INDEX),t&re.VERTEX&&(e|=GPUBufferUsage.VERTEX),t&re.UNIFORM&&(e|=GPUBufferUsage.UNIFORM),t&re.STORAGE&&(e|=GPUBufferUsage.STORAGE),t&re.COPY_SRC&&(e|=GPUBufferUsage.COPY_SRC),e|=GPUBufferUsage.COPY_DST,e}function no(t){if(t===Le.CLAMP_TO_EDGE)return"clamp-to-edge";if(t===Le.REPEAT)return"repeat";if(t===Le.MIRRORED_REPEAT)return"mirror-repeat";throw new Error("whoops")}function qa(t){if(t===le.BILINEAR)return"linear";if(t===le.POINT)return"nearest";throw new Error("whoops")}function j_(t){if(t===Ee.LINEAR)return"linear";if(t===Ee.NEAREST)return"nearest";if(t===Ee.NO_MIP)return"nearest";throw new Error("whoops")}function yi(t){var e=t;return e.gpuBuffer}function q_(t){var e=t;return e.gpuSampler}function Y_(t){var e=t;return e.querySet}function K_(t){if(t===ln.OcclusionConservative)return"occlusion";throw new Error("whoops")}function Q_(t){switch(t){case we.TRIANGLES:return"triangle-list";case we.POINTS:return"point-list";case we.TRIANGLE_STRIP:return"triangle-strip";case we.LINES:return"line-list";case we.LINE_STRIP:return"line-strip";default:throw new Error("Unknown primitive topology mode")}}function Z_(t){if(t===Ur.NONE)return"none";if(t===Ur.FRONT)return"front";if(t===Ur.BACK)return"back";throw new Error("whoops")}function G_(t){if(t===ls.CCW)return"ccw";if(t===ls.CW)return"cw";throw new Error("whoops")}function J_(t,e){return{topology:Q_(t),cullMode:Z_(e.cullMode),frontFace:G_(e.frontFace)}}function Ya(t){if(t===ae.ZERO)return"zero";if(t===ae.ONE)return"one";if(t===ae.SRC)return"src";if(t===ae.ONE_MINUS_SRC)return"one-minus-src";if(t===ae.DST)return"dst";if(t===ae.ONE_MINUS_DST)return"one-minus-dst";if(t===ae.SRC_ALPHA)return"src-alpha";if(t===ae.ONE_MINUS_SRC_ALPHA)return"one-minus-src-alpha";if(t===ae.DST_ALPHA)return"dst-alpha";if(t===ae.ONE_MINUS_DST_ALPHA)return"one-minus-dst-alpha";if(t===ae.CONST)return"constant";if(t===ae.ONE_MINUS_CONSTANT)return"one-minus-constant";if(t===ae.SRC_ALPHA_SATURATE)return"src-alpha-saturated";throw new Error("whoops")}function ed(t){if(t===yt.ADD)return"add";if(t===yt.SUBSTRACT)return"subtract";if(t===yt.REVERSE_SUBSTRACT)return"reverse-subtract";if(t===yt.MIN)return"min";if(t===yt.MAX)return"max";throw new Error("whoops")}function Ka(t){return{operation:ed(t.blendMode),srcFactor:Ya(t.blendSrcFactor),dstFactor:Ya(t.blendDstFactor)}}function Qa(t){return t.blendMode===yt.ADD&&t.blendSrcFactor===ae.ONE&&t.blendDstFactor===ae.ZERO}function td(t){if(!(Qa(t.rgbBlendState)&&Qa(t.alphaBlendState)))return{color:Ka(t.rgbBlendState),alpha:Ka(t.alphaBlendState)}}function rd(t,e){return{format:qo(e),blend:td(t),writeMask:t.channelWriteMask}}function id(t,e){return e.attachmentsState.map(function(r,i){return rd(r,t[i])})}function Ks(t){if(t===De.NEVER)return"never";if(t===De.LESS)return"less";if(t===De.EQUAL)return"equal";if(t===De.LEQUAL)return"less-equal";if(t===De.GREATER)return"greater";if(t===De.NOTEQUAL)return"not-equal";if(t===De.GEQUAL)return"greater-equal";if(t===De.ALWAYS)return"always";throw new Error("whoops")}function ui(t){if(t===Qe.KEEP)return"keep";if(t===Qe.REPLACE)return"replace";if(t===Qe.ZERO)return"zero";if(t===Qe.DECREMENT_CLAMP)return"decrement-clamp";if(t===Qe.DECREMENT_WRAP)return"decrement-wrap";if(t===Qe.INCREMENT_CLAMP)return"increment-clamp";if(t===Qe.INCREMENT_WRAP)return"increment-wrap";if(t===Qe.INVERT)return"invert";throw new Error("whoops")}function sd(t,e){if(!Dr(t))return{format:qo(t),depthWriteEnabled:!!e.depthWrite,depthCompare:Ks(e.depthCompare),depthBias:e.polygonOffset?1:0,depthBiasSlopeScale:e.polygonOffset?1:0,stencilFront:{compare:Ks(e.stencilFront.compare),passOp:ui(e.stencilFront.passOp),failOp:ui(e.stencilFront.failOp),depthFailOp:ui(e.stencilFront.depthFailOp)},stencilBack:{compare:Ks(e.stencilBack.compare),passOp:ui(e.stencilBack.passOp),failOp:ui(e.stencilBack.failOp),depthFailOp:ui(e.stencilBack.depthFailOp)},stencilReadMask:1,stencilWriteMask:1}}function nd(t){if(t!==null){if(t===R.U16_R)return"uint16";if(t===R.U32_R)return"uint32";throw new Error("whoops")}}function od(t){if(t===Ti.VERTEX)return"vertex";if(t===Ti.INSTANCE)return"instance";throw new Error("whoops")}function ad(t){if(t===R.U8_R)return"uint8x2";if(t===R.U8_RG)return"uint8x2";if(t===R.U8_RGB)return"uint8x4";if(t===R.U8_RGBA)return"uint8x4";if(t===R.U8_RG_NORM)return"unorm8x2";if(t===R.U8_RGBA_NORM)return"unorm8x4";if(t===R.S8_RGB_NORM)return"snorm8x4";if(t===R.S8_RGBA_NORM)return"snorm8x4";if(t===R.U16_RG_NORM)return"unorm16x2";if(t===R.U16_RGBA_NORM)return"unorm16x4";if(t===R.S16_RG_NORM)return"snorm16x2";if(t===R.S16_RGBA_NORM)return"snorm16x4";if(t===R.S16_RG)return"uint16x2";if(t===R.F16_RG)return"float16x2";if(t===R.F16_RGBA)return"float16x4";if(t===R.F32_R)return"float32";if(t===R.F32_RG)return"float32x2";if(t===R.F32_RGB)return"float32x3";if(t===R.F32_RGBA)return"float32x4";throw"whoops"}function ld(t){var e=or(t);switch(e){case T.BC1:case T.BC2:case T.BC3:case T.BC4_SNORM:case T.BC4_UNORM:case T.BC5_SNORM:case T.BC5_UNORM:return!0;default:return!1}}function cd(t){var e=or(t);switch(e){case T.BC1:case T.BC2:case T.BC3:case T.BC4_SNORM:case T.BC4_UNORM:case T.BC5_SNORM:case T.BC5_UNORM:return 4;default:return 1}}function Za(t,e,r,i){switch(r===void 0&&(r=!1),t){case R.S8_R:case R.S8_R_NORM:case R.S8_RG_NORM:case R.S8_RGB_NORM:case R.S8_RGBA_NORM:{var s=e instanceof ArrayBuffer?new Int8Array(e):new Int8Array(e);return i&&s.set(new Int8Array(i)),s}case R.U8_R:case R.U8_R_NORM:case R.U8_RG:case R.U8_RG_NORM:case R.U8_RGB:case R.U8_RGB_NORM:case R.U8_RGB_SRGB:case R.U8_RGBA:case R.U8_RGBA_NORM:case R.U8_RGBA_SRGB:{var n=e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e);return i&&n.set(new Uint8Array(i)),n}case R.S16_R:case R.S16_RG:case R.S16_RG_NORM:case R.S16_RGB_NORM:case R.S16_RGBA:case R.S16_RGBA_NORM:{var o=e instanceof ArrayBuffer?new Int16Array(e):new Int16Array(r?e/2:e);return i&&o.set(new Int16Array(i)),o}case R.U16_R:case R.U16_RGB:case R.U16_RGBA_5551:case R.U16_RGBA_NORM:case R.U16_RG_NORM:case R.U16_R_NORM:{var a=e instanceof ArrayBuffer?new Uint16Array(e):new Uint16Array(r?e/2:e);return i&&a.set(new Uint16Array(i)),a}case R.S32_R:{var l=e instanceof ArrayBuffer?new Int32Array(e):new Int32Array(r?e/4:e);return i&&l.set(new Int32Array(i)),l}case R.U32_R:case R.U32_RG:{var c=e instanceof ArrayBuffer?new Uint32Array(e):new Uint32Array(r?e/4:e);return i&&c.set(new Uint32Array(i)),c}case R.F32_R:case R.F32_RG:case R.F32_RGB:case R.F32_RGBA:{var u=e instanceof ArrayBuffer?new Float32Array(e):new Float32Array(r?e/4:e);return i&&u.set(new Float32Array(i)),u}}var h=e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e);return i&&h.set(new Uint8Array(i)),h}function ud(t){var e=(t&32768)>>15,r=(t&31744)>>10,i=t&1023;return r===0?(e?-1:1)*Math.pow(2,-14)*(i/Math.pow(2,10)):r==31?i?NaN:(e?-1:1)*(1/0):(e?-1:1)*Math.pow(2,r-15)*(1+i/Math.pow(2,10))}var $t=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=t.call(this)||this;return n.id=i,n.device=s,n}return e.prototype.destroy=function(){},e}(lc),hd=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o,a,l=t.call(this,{id:i,device:s})||this;l.type=ne.Bindings;var c=n.pipeline;U(!!c);var u=n.uniformBufferBindings,h=n.storageBufferBindings,_=n.samplerBindings,p=n.storageTextureBindings;l.numUniformBuffers=(u==null?void 0:u.length)||0;var d=[[],[],[],[]],g=0;if(u&&u.length)for(var m=0;m<u.length;m++){var E=n.uniformBufferBindings[m],A=E.binding,S=E.size,P=E.offset,k=E.buffer,C={buffer:yi(k),offset:P??0,size:S};d[0].push({binding:A??g++,resource:C})}if(_&&_.length){g=0;for(var m=0;m<_.length;m++){var O=me(me({},_[m]),$h),A=n.samplerBindings[m],D=A.texture!==null?A.texture:l.device.getFallbackTexture(O);O.dimension=D.dimension,O.formatKind=dc(D.format);var X=D.gpuTextureView;if(d[1].push({binding:(o=A.textureBinding)!==null&&o!==void 0?o:g++,resource:X}),A.samplerBinding!==-1){var te=A.sampler!==null?A.sampler:l.device.getFallbackSampler(O),K=q_(te);d[1].push({binding:(a=A.samplerBinding)!==null&&a!==void 0?a:g++,resource:K})}}}if(h&&h.length){g=0;for(var m=0;m<h.length;m++){var ce=n.storageBufferBindings[m],A=ce.binding,S=ce.size,P=ce.offset,k=ce.buffer,C={buffer:yi(k),offset:P??0,size:S};d[2].push({binding:A??g++,resource:C})}}if(p&&p.length){g=0;for(var m=0;m<p.length;m++){var Ie=n.storageTextureBindings[m],A=Ie.binding,D=Ie.texture,X=D.gpuTextureView;d[3].push({binding:A??g++,resource:X})}}var _e=d.findLastIndex(function(Oe){return!!Oe.length});return l.gpuBindGroup=d.map(function(Oe,ie){return ie<=_e&&l.device.device.createBindGroup({layout:c.getBindGroupLayout(ie),entries:Oe})}),l}return e}($t),_d=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;o.type=ne.Buffer;var a=n.usage,l=n.viewOrSize,c=!!(a&re.MAP_READ);o.usage=$_(a),c&&(o.usage=re.MAP_READ|re.COPY_DST);var u=!gi(l);if(o.view=gi(l)?null:l,o.size=gi(l)?un(l,4):un(l.byteLength,4),gi(l))o.gpuBuffer=o.device.device.createBuffer({usage:o.usage,size:o.size,mappedAtCreation:c?u:!1});else{o.gpuBuffer=o.device.device.createBuffer({usage:o.usage,size:o.size,mappedAtCreation:!0});var h=l&&l.constructor||Float32Array;new h(o.gpuBuffer.getMappedRange()).set(l),o.gpuBuffer.unmap()}return o}return e.prototype.setSubData=function(r,i,s,n){s===void 0&&(s=0),n===void 0&&(n=0);var o=this.gpuBuffer;n=n||i.byteLength,n=Math.min(n,this.size-r);var a=i.byteOffset+s,l=a+n,c=n+3&-4;if(c!==n){var u=new Uint8Array(i.buffer.slice(a,l));i=new Uint8Array(c),i.set(u),s=0,a=0,l=c,n=c}for(var h=1024*1024*15,_=0;l-(a+_)>h;)this.device.device.queue.writeBuffer(o,r+_,i.buffer,a+_,h),_+=h;this.device.device.queue.writeBuffer(o,r+_,i.buffer,a+_,n-_)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.gpuBuffer.destroy()},e}($t),Ga=function(){function t(){this.gpuComputePassEncoder=null}return t.prototype.dispatchWorkgroups=function(e,r,i){this.gpuComputePassEncoder.dispatchWorkgroups(e,r,i)},t.prototype.dispatchWorkgroupsIndirect=function(e,r){this.gpuComputePassEncoder.dispatchWorkgroupsIndirect(e.gpuBuffer,r)},t.prototype.finish=function(){this.gpuComputePassEncoder.end(),this.gpuComputePassEncoder=null,this.frameCommandEncoder=null},t.prototype.beginComputePass=function(e){U(this.gpuComputePassEncoder===null),this.frameCommandEncoder=e,this.gpuComputePassEncoder=this.frameCommandEncoder.beginComputePass(this.gpuComputePassDescriptor)},t.prototype.setPipeline=function(e){var r=e,i=Ne(r.gpuComputePipeline);this.gpuComputePassEncoder.setPipeline(i)},t.prototype.setBindings=function(e){var r=this,i=e;i.gpuBindGroup.forEach(function(s,n){s&&r.gpuComputePassEncoder.setBindGroup(n,i.gpuBindGroup[n])})},t.prototype.pushDebugGroup=function(e){this.gpuComputePassEncoder.pushDebugGroup(e)},t.prototype.popDebugGroup=function(){this.gpuComputePassEncoder.popDebugGroup()},t.prototype.insertDebugMarker=function(e){this.gpuComputePassEncoder.insertDebugMarker(e)},t}(),dd=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;o.type=ne.ComputePipeline,o.gpuComputePipeline=null,o.descriptor=n;var a=n.program,l=a.computeStage;if(l===null)return o;var c={layout:"auto",compute:me({},l)};return o.gpuComputePipeline=o.device.device.createComputePipeline(c),o.name!==void 0&&(o.gpuComputePipeline.label=o.name),o}return e.prototype.getBindGroupLayout=function(r){return this.gpuComputePipeline.getBindGroupLayout(r)},e}($t),fd=function(t){he(e,t);function e(r){var i,s,n,o,a=r.id,l=r.device,c=r.descriptor,u=t.call(this,{id:a,device:l})||this;u.type=ne.InputLayout;var h=[];try{for(var _=as(c.vertexBufferDescriptors),p=_.next();!p.done;p=_.next()){var d=p.value,g=d.arrayStride,m=d.stepMode,E=d.attributes;h.push({arrayStride:g,stepMode:od(m),attributes:[]});try{for(var A=(n=void 0,as(E)),S=A.next();!S.done;S=A.next()){var P=S.value,k=P.shaderLocation,C=P.format,O=P.offset;h[h.length-1].attributes.push({shaderLocation:k,format:ad(C),offset:O})}}catch(D){n={error:D}}finally{try{S&&!S.done&&(o=A.return)&&o.call(A)}finally{if(n)throw n.error}}}}catch(D){i={error:D}}finally{try{p&&!p.done&&(s=_.return)&&s.call(_)}finally{if(i)throw i.error}}return u.indexFormat=nd(c.indexBufferFormat),u.buffers=h,u}return e}($t),Ja=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;return o.type=ne.Program,o.vertexStage=null,o.fragmentStage=null,o.computeStage=null,o.descriptor=n,n.vertex&&(o.vertexStage=o.createShaderStage(n.vertex,"vertex")),n.fragment&&(o.fragmentStage=o.createShaderStage(n.fragment,"fragment")),n.compute&&(o.computeStage=o.createShaderStage(n.compute,"compute")),o}return e.prototype.setUniformsLegacy=function(r){},e.prototype.createShaderStage=function(r,i){var s,n,o=r.glsl,a=r.wgsl,l=r.entryPoint,c=r.postprocess,u=!1,h=a;if(!h)try{h=this.device.glsl_compile(o,i,u)}catch(E){throw console.error(E,o),new Error("whoops")}var _=function(E){if(!h.includes(E))return"continue";h=h.replace("var T_".concat(E,": texture_2d<f32>;"),"var T_".concat(E,": texture_depth_2d;")),h=h.replace(new RegExp("textureSample\\(T_".concat(E,"(.*)\\);$"),"gm"),function(A,S){return"vec4<f32>(textureSample(T_".concat(E).concat(S,"), 0.0, 0.0, 0.0);")})};try{for(var p=as(["u_TextureFramebufferDepth"]),d=p.next();!d.done;d=p.next()){var g=d.value;_(g)}}catch(E){s={error:E}}finally{try{d&&!d.done&&(n=p.return)&&n.call(p)}finally{if(s)throw s.error}}c&&(h=c(h));var m=this.device.device.createShaderModule({code:h});return{module:m,entryPoint:l||"main"}},e}($t),pd=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;o.type=ne.QueryPool;var a=n.elemCount,l=n.type;return o.querySet=o.device.device.createQuerySet({type:K_(l),count:a}),o.resolveBuffer=o.device.device.createBuffer({size:a*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),o.cpuBuffer=o.device.device.createBuffer({size:a*8,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o.results=null,o}return e.prototype.queryResultOcclusion=function(r){return this.results===null?null:this.results[r]!==BigInt(0)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.querySet.destroy(),this.resolveBuffer.destroy(),this.cpuBuffer.destroy()},e}($t),md=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=t.call(this,{id:i,device:s})||this;return n.type=ne.Readback,n}return e.prototype.readTexture=function(r,i,s,n,o,a,l,c){return l===void 0&&(l=0),ts(this,void 0,void 0,function(){var u,h,_,p,d,g,m,E;return rs(this,function(A){return u=r,h=0,_=this.getBlockInformationFromFormat(u.gpuTextureformat),p=Math.ceil(n/_.width)*_.length,d=Math.ceil(p/256)*256,g=d*o,m=this.device.createBuffer({usage:re.STORAGE|re.MAP_READ|re.COPY_DST,hint:Lr.STATIC,viewOrSize:g}),E=this.device.device.createCommandEncoder(),E.copyTextureToBuffer({texture:u.gpuTexture,mipLevel:0,origin:{x:i,y:s,z:Math.max(h,0)}},{buffer:m.gpuBuffer,offset:0,bytesPerRow:d},{width:n,height:o,depthOrArrayLayers:1}),this.device.device.queue.submit([E.finish()]),[2,this.readBuffer(m,0,a.byteLength===g?a:null,l,g,u.format,!0,!1,p,d,o)]})})},e.prototype.readTextureSync=function(r,i,s,n,o,a,l,c){throw new Error("ERROR_MSG_METHOD_NOT_IMPLEMENTED")},e.prototype.readBuffer=function(r,i,s,n,o,a,l,c,u,h,_){var p=this;i===void 0&&(i=0),s===void 0&&(s=null),o===void 0&&(o=0),a===void 0&&(a=R.U8_RGB),l===void 0&&(l=!1),u===void 0&&(u=0),h===void 0&&(h=0),_===void 0&&(_=0);var d=r,g=o||d.size,m=s||d.view,E=m&&m.constructor&&m.constructor.BYTES_PER_ELEMENT||hc(a),A=d;if(!(d.usage&re.MAP_READ&&d.usage&re.COPY_DST)){var S=this.device.device.createCommandEncoder();A=this.device.createBuffer({usage:re.STORAGE|re.MAP_READ|re.COPY_DST,hint:Lr.STATIC,viewOrSize:g}),S.copyBufferToBuffer(d.gpuBuffer,i,A.gpuBuffer,0,g),this.device.device.queue.submit([S.finish()])}return new Promise(function(P,k){A.gpuBuffer.mapAsync(Co.READ,i,g).then(function(){var C=A.gpuBuffer.getMappedRange(i,g),O=m;if(l)O===null?O=Za(a,g,!0,C):O=Za(a,O.buffer,void 0,C);else if(O===null)switch(E){case 1:O=new Uint8Array(g),O.set(new Uint8Array(C));break;case 2:O=p.getHalfFloatAsFloatRGBAArrayBuffer(g/2,C);break;case 4:O=new Float32Array(g/4),O.set(new Float32Array(C));break}else switch(E){case 1:O=new Uint8Array(O.buffer),O.set(new Uint8Array(C));break;case 2:O=p.getHalfFloatAsFloatRGBAArrayBuffer(g/2,C,m);break;case 4:var D=m&&m.constructor||Float32Array;O=new D(O.buffer),O.set(new D(C));break}if(u!==h){E===1&&!l&&(u*=2,h*=2);for(var X=new Uint8Array(O.buffer),te=u,K=0,ce=1;ce<_;++ce){K=ce*h;for(var Ie=0;Ie<u;++Ie)X[te++]=X[K++]}E!==0&&!l?O=new Float32Array(X.buffer,0,te/4):O=new Uint8Array(X.buffer,0,te)}A.gpuBuffer.unmap(),P(O)},function(C){return k(C)})})},e.prototype.getHalfFloatAsFloatRGBAArrayBuffer=function(r,i,s){s||(s=new Float32Array(r));for(var n=new Uint16Array(i);r--;)s[r]=ud(n[r]);return s},e.prototype.getBlockInformationFromFormat=function(r){switch(r){case"r8unorm":case"r8snorm":case"r8uint":case"r8sint":return{width:1,height:1,length:1};case"r16uint":case"r16sint":case"r16float":case"rg8unorm":case"rg8snorm":case"rg8uint":case"rg8sint":return{width:1,height:1,length:2};case"r32uint":case"r32sint":case"r32float":case"rg16uint":case"rg16sint":case"rg16float":case"rgba8unorm":case"rgba8unorm-srgb":case"rgba8snorm":case"rgba8uint":case"rgba8sint":case"bgra8unorm":case"bgra8unorm-srgb":case"rgb9e5ufloat":case"rgb10a2unorm":case"rg11b10ufloat":return{width:1,height:1,length:4};case"rg32uint":case"rg32sint":case"rg32float":case"rgba16uint":case"rgba16sint":case"rgba16float":return{width:1,height:1,length:8};case"rgba32uint":case"rgba32sint":case"rgba32float":return{width:1,height:1,length:16};case"stencil8":throw new Error("No fixed size for Stencil8 format!");case"depth16unorm":return{width:1,height:1,length:2};case"depth24plus":throw new Error("No fixed size for Depth24Plus format!");case"depth24plus-stencil8":throw new Error("No fixed size for Depth24PlusStencil8 format!");case"depth32float":return{width:1,height:1,length:4};case"depth32float-stencil8":return{width:1,height:1,length:5};case"bc7-rgba-unorm":case"bc7-rgba-unorm-srgb":case"bc6h-rgb-ufloat":case"bc6h-rgb-float":case"bc2-rgba-unorm":case"bc2-rgba-unorm-srgb":case"bc3-rgba-unorm":case"bc3-rgba-unorm-srgb":case"bc5-rg-unorm":case"bc5-rg-snorm":return{width:4,height:4,length:16};case"bc4-r-unorm":case"bc4-r-snorm":case"bc1-rgba-unorm":case"bc1-rgba-unorm-srgb":return{width:4,height:4,length:8};default:return{width:1,height:1,length:4}}},e}($t),el=function(){function t(e){this.device=e,this.gpuRenderPassEncoder=null,this.gfxColorAttachment=[],this.gfxColorAttachmentLevel=[],this.gfxColorResolveTo=[],this.gfxColorResolveToLevel=[],this.gfxDepthStencilAttachment=null,this.gfxDepthStencilResolveTo=null,this.gpuColorAttachments=[],this.gpuDepthStencilAttachment={view:null,depthLoadOp:"load",depthStoreOp:"store",stencilLoadOp:"load",stencilStoreOp:"store"},this.gpuRenderPassDescriptor={colorAttachments:this.gpuColorAttachments,depthStencilAttachment:this.gpuDepthStencilAttachment}}return t.prototype.getEncoder=function(){var e;return((e=this.renderBundle)===null||e===void 0?void 0:e.renderBundleEncoder)||this.gpuRenderPassEncoder},t.prototype.getTextureView=function(e,r){return U(r<e.mipLevelCount),e.mipLevelCount===1?e.gpuTextureView:e.gpuTexture.createView({baseMipLevel:r,mipLevelCount:1})},t.prototype.setRenderPassDescriptor=function(e){var r,i,s,n,o,a;this.descriptor=e,this.gpuRenderPassDescriptor.colorAttachments=this.gpuColorAttachments;var l=e.colorAttachment.length;this.gfxColorAttachment.length=l,this.gfxColorResolveTo.length=l;for(var c=0;c<e.colorAttachment.length;c++){var u=e.colorAttachment[c],h=e.colorResolveTo[c];if(u===null&&h!==null&&(u=h,h=null),this.gfxColorAttachment[c]=u,this.gfxColorResolveTo[c]=h,this.gfxColorAttachmentLevel[c]=((r=e.colorAttachmentLevel)===null||r===void 0?void 0:r[c])||0,this.gfxColorResolveToLevel[c]=((i=e.colorResolveToLevel)===null||i===void 0?void 0:i[c])||0,u!==null){this.gpuColorAttachments[c]===void 0&&(this.gpuColorAttachments[c]={});var _=this.gpuColorAttachments[c];_.view=this.getTextureView(u,((s=this.gfxColorAttachmentLevel)===null||s===void 0?void 0:s[c])||0);var p=(o=(n=e.colorClearColor)===null||n===void 0?void 0:n[c])!==null&&o!==void 0?o:"load";p==="load"?_.loadOp="load":(_.loadOp="clear",_.clearValue=p),_.storeOp=!((a=e.colorStore)===null||a===void 0)&&a[c]?"store":"discard",_.resolveTarget=void 0,h!==null&&(u.sampleCount>1?_.resolveTarget=this.getTextureView(h,this.gfxColorResolveToLevel[c]):_.storeOp="store")}else{this.gpuColorAttachments.length=c,this.gfxColorAttachment.length=c,this.gfxColorResolveTo.length=c;break}}if(this.gfxDepthStencilAttachment=e.depthStencilAttachment,this.gfxDepthStencilResolveTo=e.depthStencilResolveTo,e.depthStencilAttachment){var d=e.depthStencilAttachment,_=this.gpuDepthStencilAttachment;_.view=d.gpuTextureView;var g=!!(cs(d.format)&N.Depth);g?(e.depthClearValue==="load"?_.depthLoadOp="load":(_.depthLoadOp="clear",_.depthClearValue=e.depthClearValue),e.depthStencilStore||this.gfxDepthStencilResolveTo!==null?_.depthStoreOp="store":_.depthStoreOp="discard"):(_.depthLoadOp=void 0,_.depthStoreOp=void 0);var m=!!(cs(d.format)&N.Stencil);m?(e.stencilClearValue==="load"?_.stencilLoadOp="load":(_.stencilLoadOp="clear",_.stencilClearValue=e.stencilClearValue),e.depthStencilStore||this.gfxDepthStencilResolveTo!==null?_.stencilStoreOp="store":_.stencilStoreOp="discard"):(_.stencilLoadOp=void 0,_.stencilStoreOp=void 0),this.gpuRenderPassDescriptor.depthStencilAttachment=this.gpuDepthStencilAttachment}else this.gpuRenderPassDescriptor.depthStencilAttachment=void 0;this.gpuRenderPassDescriptor.occlusionQuerySet=Dr(e.occlusionQueryPool)?void 0:Y_(e.occlusionQueryPool)},t.prototype.beginRenderPass=function(e,r){U(this.gpuRenderPassEncoder===null),this.setRenderPassDescriptor(r),this.frameCommandEncoder=e,this.gpuRenderPassEncoder=this.frameCommandEncoder.beginRenderPass(this.gpuRenderPassDescriptor)},t.prototype.flipY=function(e,r){var i=this.device.swapChainHeight;return i-e-r},t.prototype.setViewport=function(e,r,i,s,n,o){n===void 0&&(n=0),o===void 0&&(o=1),this.gpuRenderPassEncoder.setViewport(e,this.flipY(r,s),i,s,n,o)},t.prototype.setScissorRect=function(e,r,i,s){this.gpuRenderPassEncoder.setScissorRect(e,this.flipY(r,s),i,s)},t.prototype.setPipeline=function(e){var r=e,i=Ne(r.gpuRenderPipeline);this.getEncoder().setPipeline(i)},t.prototype.setVertexInput=function(e,r,i){if(e!==null){var s=this.getEncoder(),n=e;i!==null&&s.setIndexBuffer(yi(i.buffer),Ne(n.indexFormat),i.offset);for(var o=0;o<r.length;o++){var a=r[o];a!==null&&s.setVertexBuffer(o,yi(a.buffer),a.offset)}}},t.prototype.setBindings=function(e){var r=e,i=this.getEncoder();r.gpuBindGroup.forEach(function(s,n){s&&i.setBindGroup(n,r.gpuBindGroup[n])})},t.prototype.setStencilReference=function(e){this.gpuRenderPassEncoder.setStencilReference(e)},t.prototype.draw=function(e,r,i,s){this.getEncoder().draw(e,r,i,s)},t.prototype.drawIndexed=function(e,r,i,s,n){this.getEncoder().drawIndexed(e,r,i,s,n)},t.prototype.drawIndirect=function(e,r){this.getEncoder().drawIndirect(yi(e),r)},t.prototype.drawIndexedIndirect=function(e,r){this.getEncoder().drawIndexedIndirect(yi(e),r)},t.prototype.beginOcclusionQuery=function(e){this.gpuRenderPassEncoder.beginOcclusionQuery(e)},t.prototype.endOcclusionQuery=function(){this.gpuRenderPassEncoder.endOcclusionQuery()},t.prototype.pushDebugGroup=function(e){this.gpuRenderPassEncoder.pushDebugGroup(e)},t.prototype.popDebugGroup=function(){this.gpuRenderPassEncoder.popDebugGroup()},t.prototype.insertDebugMarker=function(e){this.gpuRenderPassEncoder.insertDebugMarker(e)},t.prototype.beginBundle=function(e){this.renderBundle=e},t.prototype.endBundle=function(){this.renderBundle.finish()},t.prototype.executeBundles=function(e){this.gpuRenderPassEncoder.executeBundles(e.map(function(r){return r.renderBundle}))},t.prototype.finish=function(){var e;(e=this.gpuRenderPassEncoder)===null||e===void 0||e.end(),this.gpuRenderPassEncoder=null;for(var r=0;r<this.gfxColorAttachment.length;r++){var i=this.gfxColorAttachment[r],s=this.gfxColorResolveTo[r];i!==null&&s!==null&&i.sampleCount===1&&this.copyAttachment(s,this.gfxColorAttachmentLevel[r],i,this.gfxColorResolveToLevel[r])}this.gfxDepthStencilAttachment&&this.gfxDepthStencilResolveTo&&(this.gfxDepthStencilAttachment.sampleCount>1||this.copyAttachment(this.gfxDepthStencilResolveTo,0,this.gfxDepthStencilAttachment,0)),this.frameCommandEncoder=null},t.prototype.copyAttachment=function(e,r,i,s){U(i.sampleCount===1);var n={texture:i.gpuTexture,mipLevel:s},o={texture:e.gpuTexture,mipLevel:r};U(i.width>>>s===e.width>>>r),U(i.height>>>s===e.height>>>r),U(!!(i.usage&Re.COPY_SRC)),U(!!(e.usage&Re.COPY_DST)),this.frameCommandEncoder.copyTextureToTexture(n,o,[e.width,e.height,1])},t}(),gd=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=t.call(this,{id:i,device:s})||this;return o.type=ne.RenderPipeline,o.isCreatingAsync=!1,o.gpuRenderPipeline=null,o.descriptor=n,o.device.createRenderPipelineInternal(o,!1),o}return e.prototype.getBindGroupLayout=function(r){return this.gpuRenderPipeline.getBindGroupLayout(r)},e}($t),Ed=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o,a,l=t.call(this,{id:i,device:s})||this;l.type=ne.Sampler;var c=n.lodMinClamp,u=n.mipmapFilter===Ee.NO_MIP?n.lodMinClamp:n.lodMaxClamp,h=(o=n.maxAnisotropy)!==null&&o!==void 0?o:1;return h>1&&U(n.minFilter===le.BILINEAR&&n.magFilter===le.BILINEAR&&n.mipmapFilter===Ee.LINEAR),l.gpuSampler=l.device.device.createSampler({addressModeU:no(n.addressModeU),addressModeV:no(n.addressModeV),addressModeW:no((a=n.addressModeW)!==null&&a!==void 0?a:n.addressModeU),lodMinClamp:c,lodMaxClamp:u,minFilter:qa(n.minFilter),magFilter:qa(n.magFilter),mipmapFilter:j_(n.mipmapFilter),compare:n.compareFunction!==void 0?Ks(n.compareFunction):void 0,maxAnisotropy:h}),l}return e}($t),Vs=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=r.descriptor,o=r.skipCreate,a=r.sampleCount,l=t.call(this,{id:i,device:s})||this;l.type=ne.Texture,l.flipY=!1;var c=n.format,u=n.dimension,h=n.width,_=n.height,p=n.depthOrArrayLayers,d=n.mipLevelCount,g=n.usage,m=n.pixelStore;return l.flipY=!!(m!=null&&m.unpackFlipY),l.device.createTextureShared({format:c,dimension:u??Q.TEXTURE_2D,width:h,height:_,depthOrArrayLayers:p??1,mipLevelCount:d??1,usage:g,sampleCount:a??1},l,o),l}return e.prototype.textureFromImageBitmapOrCanvas=function(r,i,s){for(var n=i[0].width,o=i[0].height,a={size:{width:n,height:o,depthOrArrayLayers:s},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT},l=r.createTexture(a),c=0;c<i.length;c++)r.queue.copyExternalImageToTexture({source:i[c],flipY:this.flipY},{texture:l,origin:[0,0,c]},[n,o]);return[l,n,o]},e.prototype.isImageBitmapOrCanvases=function(r){var i=r[0];return i instanceof ImageBitmap||i instanceof HTMLCanvasElement||i instanceof OffscreenCanvas},e.prototype.isVideo=function(r){var i=r[0];return i instanceof HTMLVideoElement},e.prototype.setImageData=function(r,i){var s,n=this,o=this.device.device,a,l,c;this.isImageBitmapOrCanvases(r)?(s=Io(this.textureFromImageBitmapOrCanvas(o,r,this.depthOrArrayLayers),3),a=s[0],l=s[1],c=s[2]):this.isVideo(r)?a=o.importExternalTexture({source:r[0]}):r.forEach(function(u){o.queue.writeTexture({texture:n.gpuTexture},u,{},{width:n.width,height:n.height})}),this.width=l,this.height=c,a&&(this.gpuTexture=a),this.gpuTextureView=this.gpuTexture.createView({dimension:X_(this.dimension)})},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.gpuTexture.destroy()},e}($t),yd=function(t){he(e,t);function e(r){var i=r.id,s=r.device,n=t.call(this,{id:i,device:s})||this;return n.type=ne.RenderBundle,n.renderBundleEncoder=n.device.device.createRenderBundleEncoder({colorFormats:[n.device.swapChainFormat]}),n}return e.prototype.finish=function(){this.renderBundle=this.renderBundleEncoder.finish()},e}($t),vd=function(){function t(e,r,i,s,n,o){this.swapChainWidth=0,this.swapChainHeight=0,this.swapChainTextureUsage=Re.RENDER_ATTACHMENT|Re.COPY_DST,this._resourceUniqueId=0,this.renderPassPool=[],this.computePassPool=[],this.frameCommandEncoderPool=[],this.featureTextureCompressionBC=!1,this.platformString="WebGPU",this.glslVersion="#version 440",this.explicitBindingLocations=!0,this.separateSamplerTextures=!0,this.viewportOrigin=on.UPPER_LEFT,this.clipSpaceNearZ=an.ZERO,this.supportsSyncPipelineCompilation=!1,this.supportMRT=!0,this.device=r,this.canvas=i,this.canvasContext=s,this.glsl_compile=n,this.WGSLComposer=o,this.fallbackTexture2D=this.createFallbackTexture(Q.TEXTURE_2D,Ze.Float),this.setResourceName(this.fallbackTexture2D,"Fallback Texture2D"),this.fallbackTexture2DDepth=this.createFallbackTexture(Q.TEXTURE_2D,Ze.Depth),this.setResourceName(this.fallbackTexture2DDepth,"Fallback Depth Texture2D"),this.fallbackTexture2DArray=this.createFallbackTexture(Q.TEXTURE_2D_ARRAY,Ze.Float),this.setResourceName(this.fallbackTexture2DArray,"Fallback Texture2DArray"),this.fallbackTexture3D=this.createFallbackTexture(Q.TEXTURE_3D,Ze.Float),this.setResourceName(this.fallbackTexture3D,"Fallback Texture3D"),this.fallbackTextureCube=this.createFallbackTexture(Q.TEXTURE_CUBE_MAP,Ze.Float),this.setResourceName(this.fallbackTextureCube,"Fallback TextureCube"),this.fallbackSamplerFiltering=this.createSampler({addressModeU:Le.REPEAT,addressModeV:Le.REPEAT,minFilter:le.POINT,magFilter:le.POINT,mipmapFilter:Ee.NEAREST}),this.setResourceName(this.fallbackSamplerFiltering,"Fallback Sampler Filtering"),this.fallbackSamplerComparison=this.createSampler({addressModeU:Le.REPEAT,addressModeV:Le.REPEAT,minFilter:le.POINT,magFilter:le.POINT,mipmapFilter:Ee.NEAREST,compareFunction:De.ALWAYS}),this.setResourceName(this.fallbackSamplerComparison,"Fallback Sampler Comparison Filtering"),this.device.features&&(this.featureTextureCompressionBC=this.device.features.has("texture-compression-bc")),this.device.onuncapturederror=function(a){console.error(a.error)},this.swapChainFormat=navigator.gpu.getPreferredCanvasFormat(),this.canvasContext.configure({device:this.device,format:this.swapChainFormat,usage:this.swapChainTextureUsage,alphaMode:"premultiplied"})}return t.prototype.destroy=function(){},t.prototype.configureSwapChain=function(e,r){this.swapChainWidth===e&&this.swapChainHeight===r||(this.swapChainWidth=e,this.swapChainHeight=r)},t.prototype.getOnscreenTexture=function(){var e=this.canvasContext.getCurrentTexture(),r=e.createView(),i=new Vs({id:0,device:this,descriptor:{format:R.U8_RGBA_RT,width:this.swapChainWidth,height:this.swapChainHeight,depthOrArrayLayers:0,dimension:Q.TEXTURE_2D,mipLevelCount:1,usage:this.swapChainTextureUsage},skipCreate:!0});return i.depthOrArrayLayers=1,i.sampleCount=1,i.gpuTexture=e,i.gpuTextureView=r,i.name="Onscreen",this.setResourceName(i,"Onscreen Texture"),i},t.prototype.getDevice=function(){return this},t.prototype.getCanvas=function(){return this.canvas},t.prototype.beginFrame=function(){U(this.frameCommandEncoderPool.length===0)},t.prototype.endFrame=function(){U(this.frameCommandEncoderPool.every(function(e){return e!==null})),this.device.queue.submit(this.frameCommandEncoderPool.map(function(e){return e.finish()})),this.frameCommandEncoderPool=[]},t.prototype.getNextUniqueId=function(){return++this._resourceUniqueId},t.prototype.createBuffer=function(e){return new _d({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createTexture=function(e){return new Vs({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createSampler=function(e){return new Ed({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createRenderTarget=function(e){var r=new Vs({id:this.getNextUniqueId(),device:this,descriptor:me(me({},e),{dimension:Q.TEXTURE_2D,mipLevelCount:1,depthOrArrayLayers:1,usage:Ot.RENDER_TARGET}),sampleCount:e.sampleCount});return r.depthOrArrayLayers=1,r.type=ne.RenderTarget,r},t.prototype.createRenderTargetFromTexture=function(e){var r=e,i=r.format,s=r.width,n=r.height,o=r.depthOrArrayLayers,a=r.sampleCount,l=r.mipLevelCount,c=r.gpuTexture,u=r.gpuTextureView,h=r.usage;U(!!(h&Re.RENDER_ATTACHMENT));var _=new Vs({id:this.getNextUniqueId(),device:this,descriptor:{format:i,width:s,height:n,depthOrArrayLayers:o,dimension:Q.TEXTURE_2D,mipLevelCount:l,usage:h},skipCreate:!0});return _.depthOrArrayLayers=o,_.sampleCount=a,_.gpuTexture=c,_.gpuTextureView=u,_},t.prototype.createProgram=function(e){var r,i;return!((r=e.vertex)===null||r===void 0)&&r.glsl&&(e.vertex.glsl=_n(this.queryVendorInfo(),"vert",e.vertex.glsl)),!((i=e.fragment)===null||i===void 0)&&i.glsl&&(e.fragment.glsl=_n(this.queryVendorInfo(),"frag",e.fragment.glsl)),new Ja({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createProgramSimple=function(e){return new Ja({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createTextureShared=function(e,r,i){var s={width:e.width,height:e.height,depthOrArrayLayers:e.depthOrArrayLayers},n=e.mipLevelCount,o=qo(e.format),a=W_(e.dimension),l=k_(e.usage);if(r.gpuTextureformat=o,r.dimension=e.dimension,r.format=e.format,r.width=e.width,r.height=e.height,r.depthOrArrayLayers=e.depthOrArrayLayers,r.mipLevelCount=n,r.usage=l,r.sampleCount=e.sampleCount,!i){var c=this.device.createTexture({size:s,mipLevelCount:n,format:o,dimension:a,sampleCount:e.sampleCount,usage:l}),u=c.createView();r.gpuTexture=c,r.gpuTextureView=u}},t.prototype.getFallbackSampler=function(e){var r=e.formatKind;return r===Ze.Depth&&e.comparison?this.fallbackSamplerComparison:this.fallbackSamplerFiltering},t.prototype.getFallbackTexture=function(e){var r=e.dimension,i=e.formatKind;if(r===Q.TEXTURE_2D)return i===Ze.Depth?this.fallbackTexture2DDepth:this.fallbackTexture2D;if(r===Q.TEXTURE_2D_ARRAY)return this.fallbackTexture2DArray;if(r===Q.TEXTURE_3D)return this.fallbackTexture3D;if(r===Q.TEXTURE_CUBE_MAP)return this.fallbackTextureCube;throw new Error("whoops")},t.prototype.createFallbackTexture=function(e,r){var i=e===Q.TEXTURE_CUBE_MAP?6:1,s=r===Ze.Float?R.U8_RGBA_NORM:R.D24;return this.createTexture({dimension:e,format:s,usage:Ot.SAMPLED,width:1,height:1,depthOrArrayLayers:i,mipLevelCount:1})},t.prototype.createBindings=function(e){return new hd({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createInputLayout=function(e){return new fd({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createComputePipeline=function(e){return new dd({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createRenderPipeline=function(e){return new gd({id:this.getNextUniqueId(),device:this,descriptor:me({},e)})},t.prototype.createQueryPool=function(e,r){return new pd({id:this.getNextUniqueId(),device:this,descriptor:{type:e,elemCount:r}})},t.prototype.createRenderPipelineInternal=function(e,r){var i;if(e.gpuRenderPipeline===null){var s=e.descriptor,n=s.program,o=n.vertexStage,a=n.fragmentStage;if(!(o===null||a===null)){var l=s.megaStateDescriptor||{},c=l.stencilBack,u=l.stencilFront,h=Dh(l,["stencilBack","stencilFront"]),_=As(Ii);s.megaStateDescriptor=me(me(me({},_),{stencilBack:me(me({},_.stencilBack),c),stencilFront:me(me({},_.stencilFront),u)}),h);var p=s.megaStateDescriptor.attachmentsState[0];s.colorAttachmentFormats.forEach(function(P,k){s.megaStateDescriptor.attachmentsState[k]||(s.megaStateDescriptor.attachmentsState[k]=gc(void 0,p))});var d=J_((i=s.topology)!==null&&i!==void 0?i:we.TRIANGLES,s.megaStateDescriptor),g=id(s.colorAttachmentFormats,s.megaStateDescriptor),m=sd(s.depthStencilAttachmentFormat,s.megaStateDescriptor),E=void 0;s.inputLayout!==null&&(E=s.inputLayout.buffers);var A=s.sampleCount,S={layout:"auto",vertex:me(me({},o),{buffers:E}),primitive:d,depthStencil:m,multisample:{count:A},fragment:me(me({},a),{targets:g})};e.gpuRenderPipeline=this.device.createRenderPipeline(S)}}},t.prototype.createReadback=function(){return new md({id:this.getNextUniqueId(),device:this})},t.prototype.createRenderBundle=function(){return new yd({id:this.getNextUniqueId(),device:this})},t.prototype.createRenderPass=function(e){var r=this.renderPassPool.pop();r===void 0&&(r=new el(this));var i=this.frameCommandEncoderPool.pop();return i===void 0&&(i=this.device.createCommandEncoder()),r.beginRenderPass(i,e),r},t.prototype.createComputePass=function(){var e=this.computePassPool.pop();e===void 0&&(e=new Ga);var r=this.frameCommandEncoderPool.pop();return r===void 0&&(r=this.device.createCommandEncoder()),e.beginComputePass(r),e},t.prototype.submitPass=function(e){var r=e;r instanceof el?(this.frameCommandEncoderPool.push(r.frameCommandEncoder),r.finish(),this.renderPassPool.push(r)):r instanceof Ga&&(this.frameCommandEncoderPool.push(r.frameCommandEncoder),r.finish(),this.computePassPool.push(r))},t.prototype.copySubTexture2D=function(e,r,i,s,n,o,a){var l=this.device.createCommandEncoder(),c=e,u=s,h={texture:u.gpuTexture,origin:[n,o,0],mipLevel:0,aspect:"all"},_={texture:c.gpuTexture,origin:[r,i,0],mipLevel:0,aspect:"all"};U(!!(u.usage&Re.COPY_SRC)),U(!!(c.usage&Re.COPY_DST)),l.copyTextureToTexture(h,_,[u.width,u.height,a||1]),this.device.queue.submit([l.finish()])},t.prototype.queryLimits=function(){return{uniformBufferMaxPageWordSize:this.device.limits.maxUniformBufferBindingSize>>>2,uniformBufferWordAlignment:this.device.limits.minUniformBufferOffsetAlignment>>>2,supportedSampleCounts:[1],occlusionQueriesRecommended:!0,computeShadersSupported:!0}},t.prototype.queryTextureFormatSupported=function(e,r,i){if(ld(e)){if(!this.featureTextureCompressionBC)return!1;var s=cd(e);return r%s!==0||i%s!==0?!1:this.featureTextureCompressionBC}switch(e){case R.U16_RGBA_NORM:return!1;case R.F32_RGBA:return!1}return!0},t.prototype.queryPlatformAvailable=function(){return!0},t.prototype.queryVendorInfo=function(){return this},t.prototype.queryRenderPass=function(e){var r=e;return r.descriptor},t.prototype.queryRenderTarget=function(e){var r=e;return r},t.prototype.setResourceName=function(e,r){if(e.name=r,e.type===ne.Buffer){var i=e;i.gpuBuffer.label=r}else if(e.type===ne.Texture){var i=e;i.gpuTexture.label=r,i.gpuTextureView.label=r}else if(e.type===ne.RenderTarget){var i=e;i.gpuTexture.label=r,i.gpuTextureView.label=r}else if(e.type===ne.Sampler){var i=e;i.gpuSampler.label=r}else if(e.type===ne.RenderPipeline){var i=e;i.gpuRenderPipeline!==null&&(i.gpuRenderPipeline.label=r)}},t.prototype.setResourceLeakCheck=function(e,r){},t.prototype.checkForLeaks=function(){},t.prototype.programPatched=function(e){},t.prototype.pipelineQueryReady=function(e){var r=e;return r.gpuRenderPipeline!==null},t.prototype.pipelineForceReady=function(e){var r=e;this.createRenderPipelineInternal(r,!1)},t}(),Ad=function(){function t(e){this.pluginOptions=e}return t.prototype.createSwapChain=function(e){return ts(this,void 0,void 0,function(){var r,i,s,n,o,a,l,c;return rs(this,function(u){switch(u.label){case 0:if(globalThis.navigator.gpu===void 0)return[2,null];r=null,u.label=1;case 1:return u.trys.push([1,3,,4]),i=this.pluginOptions.xrCompatible,[4,globalThis.navigator.gpu.requestAdapter({xrCompatible:i})];case 2:return r=u.sent(),[3,4];case 3:return s=u.sent(),console.log(s),[3,4];case 4:return r===null?[2,null]:(n=["depth32float-stencil8","texture-compression-bc"],o=n.filter(function(h){return r.features.has(h)}),[4,r.requestDevice({requiredFeatures:o})]);case 5:if(a=u.sent(),a&&(l=this.pluginOptions.onContextLost,a.lost.then(function(){l&&l()})),a===null)return[2,null];if(c=e.getContext("webgpu"),!c)return[2,null];u.label=6;case 6:return u.trys.push([6,8,,9]),[4,vc(this.pluginOptions.shaderCompilerPath)];case 7:return u.sent(),[3,9];case 8:return u.sent(),[3,9];case 9:return[2,new vd(r,a,e,c,L_,hs&&new hs)]}})})},t}();class gr{}var wd=Object.defineProperty,Td=Object.getOwnPropertyDescriptor,On=(t,e,r,i)=>{for(var s=i>1?void 0:i?Td(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&wd(e,r,s),s};let $e=class{};On([y.object],$e.prototype,"canvas",2);On([y.object],$e.prototype,"shaderCompilerPath",2);On([y.object],$e.prototype,"resources",2);$e=On([W],$e);const _s=class Qs{constructor(e,r){this.x=e,this.y=r}static splat(e){return new Qs(e,e)}any(){return this.x||this.y}all(){return this.x&&this.y}bitand(e){return new Qs(this.x&&e.x,this.y&&e.y)}bitand_assign(e){return this.x&&(this.x=e.x),this.y&&(this.y=e.y),this}bitor(e){return new Qs(this.x||e.x,this.y||e.y)}bitor_assign(e){return this.x||(this.x=e.x),this.y||(this.y=e.y),this}};_s.FALSE=_s.splat(!1);_s.TRUE=_s.splat(!0);let tl=_s;const wt=class Dt{constructor(e,r,i,s){this.x=e,this.y=r,this.z=i,this.w=s}static splat(e){return new Dt(e,e,e,e)}static from(e){return new Dt(e.x,e.y,e.z,e.w)}to_array(){return[this.x,this.y,this.z,this.w]}add(e){return new Dt(this.x+e.x,this.y+e.y,this.z+e.z,this.w+e.w)}add_assign(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}sub(e){return new Dt(this.x-e.x,this.y-e.y,this.z-e.z,this.w-e.w)}sub_assign(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}mul(e){return typeof e=="number"?new Dt(this.x*e,this.y*e,this.z*e,this.w*e):new Dt(this.x*e.x,this.y*e.y,this.z*e.z,this.w*e.w)}mul_assign(e){return typeof e=="number"?(this.x*=e,this.y*=e,this.z*=e,this.w*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w),this}div(e){return typeof e=="number"?new Dt(this.x/e,this.y/e,this.z/e,this.w/e):new Dt(this.x/e.x,this.y/e.y,this.z/e.z,this.w/e.w)}div_assign(e){return typeof e=="number"?(this.x/=e,this.y/=e,this.z/=e,this.w/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w),this}recip(){return new Dt(1/this.x,1/this.y,1/this.z,1/this.w)}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}truncate(){return new v(this.x,this.y,this.z)}_length(){return Math.sqrt(this.dot(this))}neg(){return this.mul(-1)}normalize(){return this.mul(1/this._length())}eq(e){return this.x===e.x&&this.y===e.y&&this.z===e.z&&this.w===e.w}xyz(){return new v(this.x,this.y,this.z)}wwww(){return new Dt(this.w,this.w,this.w,this.w)}};wt.ZERO=wt.splat(0);wt.ONE=wt.splat(1);wt.X=new wt(1,0,0,0);wt.Y=new wt(0,1,0,0);wt.Z=new wt(0,0,1,0);wt.W=new wt(0,0,0,1);let I=wt;M.vector(M.float32,["x","y","z","w"],I);const ds=class Zs{constructor(e,r,i){this.x=e,this.y=r,this.z=i}static splat(e){return new Zs(e,e,e)}any(){return this.x||this.y||this.z}all(){return this.x&&this.y&&this.z}bitand(e){return new Zs(this.x&&e.x,this.y&&e.y,this.z&&e.z)}bitand_assign(e){return this.x&&(this.x=e.x),this.y&&(this.y=e.y),this.z&&(this.z=e.z),this}bitor(e){return new Zs(this.x||e.x,this.y||e.y,this.z||e.z)}bitor_assign(e){return this.x||(this.x=e.x),this.y||(this.y=e.y),this.z||(this.z=e.z),this}};ds.FALSE=ds.splat(!1);ds.TRUE=ds.splat(!0);let oo=ds;const je=class de{constructor(e,r,i){this.x=e,this.y=r,this.z=i}static splat(e){return new de(e,e,e)}static from_array(e){return new de(e[0],e[1],e[2])}static copy(e){return new de(e.x,e.y,e.z)}to_array(){return[this.x,this.y,this.z]}xxx(){return new de(this.x,this.x,this.x)}yyy(){return new de(this.y,this.y,this.y)}zzz(){return new de(this.z,this.z,this.z)}xy(){return new oe(this.x,this.y)}_length(){return Math.sqrt(this.dot(this))}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}cross(e){return new de(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)}min(e){return new de(Math.min(this.x,e.x),Math.min(this.y,e.y),Math.min(this.z,e.z))}max(e){return new de(Math.max(this.x,e.x),Math.max(this.y,e.y),Math.max(this.z,e.z))}abs(){return new de(Math.abs(this.x),Math.abs(this.y),Math.abs(this.z))}neg(){return this.mul(-1)}add(e){return typeof e=="number"?new de(this.x+e,this.y+e,this.z+e):new de(this.x+e.x,this.y+e.y,this.z+e.z)}add_assign(e){return typeof e=="number"?(this.x+=e,this.y+=e,this.z+=e):(this.x+=e.x,this.y+=e.y,this.z+=e.z),this}sub(e){return typeof e=="number"?new de(this.x-e,this.y-e,this.z-e):new de(this.x-e.x,this.y-e.y,this.z-e.z)}sub_assign(e){return typeof e=="number"?(this.x-=e,this.y-=e,this.z-=e):(this.x-=e.x,this.y-=e.y,this.z-=e.z),this}mul(e){return typeof e=="number"?new de(this.x*e,this.y*e,this.z*e):new de(this.x*e.x,this.y*e.y,this.z*e.z)}mul_assign(e){return typeof e=="number"?(this.x*=e,this.y*=e,this.z*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z),this}div(e){return typeof e=="number"?new de(this.x/e,this.y/e,this.z/e):new de(this.x/e.x,this.y/e.y,this.z/e.z)}div_assign(e){return typeof e=="number"?(this.x/=e,this.y/=e,this.z/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z),this}recip(){return new de(1/this.x,1/this.y,1/this.z)}eq(e){return this.x===e.x&&this.y===e.y&&this.z===e.z}cmpge(e){return new oo(this.x>=e.x,this.y>=e.y,this.z>=e.z)}cmple(e){return new oo(this.x<=e.x,this.y<=e.y,this.z<=e.z)}cmpne(e){return new oo(this.x!==e.x,this.y!==e.y,this.z!==e.z)}ceil(){return new de(Math.ceil(this.x),Math.ceil(this.y),Math.ceil(this.z))}truncate(){return new oe(this.x,this.y)}extend(e){return new I(this.x,this.y,this.z,e)}length_squared(){return this.dot(this)}length_recip(){return 1/this._length()}normalize(){return this.mul(this.length_recip())}angle_between(e){return Math.acos(this.dot(e)/Math.sqrt(this.length_squared()*e.length_squared()))}any_orthonormal_vector(){return Math.abs(this.x)>Math.abs(this.y)?new de(-this.z,0,this.x):new de(0,this.z,-this.y)}};je.ZERO=je.splat(0);je.ONE=je.splat(1);je.MAX=je.splat(Number.MAX_VALUE);je.MIN=je.splat(Number.MIN_VALUE);je.NEG_Z=new je(0,0,-1);je.X=new je(1,0,0);je.Y=new je(0,1,0);je.Z=new je(0,0,1);let v=je;const jt=M.vector(M.float32,["x","y","z"],v),Er=class gt{constructor(e,r){this.x=e,this.y=r}static splat(e){return new gt(e,e)}to_array(){return[this.x,this.y]}add(e){return typeof e=="number"?new gt(this.x+e,this.y+e):new gt(this.x+e.x,this.y+e.y)}add_assign(e){return typeof e=="number"?(this.x+=e,this.y+=e):(this.x+=e.x,this.y+=e.y),this}sub(e){return typeof e=="number"?new gt(this.x-e,this.y-e):new gt(this.x-e.x,this.y-e.y)}sub_assign(e){return typeof e=="number"?(this.x-=e,this.y-=e):(this.x-=e.x,this.y-=e.y),this}mul(e){return typeof e=="number"?new gt(this.x*e,this.y*e):new gt(this.x*e.x,this.y*e.y)}mul_assign(e){return typeof e=="number"?(this.x*=e,this.y*=e):(this.x*=e.x,this.y*=e.y),this}div(e){return typeof e=="number"?new gt(this.x/e,this.y/e):new gt(this.x/e.x,this.y/e.y)}div_assign(e){return typeof e=="number"?(this.x/=e,this.y/=e):(this.x/=e.x,this.y/=e.y),this}eq(e){return this.x===e.x&&this.y===e.y}min(e){return new gt(Math.min(this.x,e.x),Math.min(this.y,e.y))}max(e){return new gt(Math.max(this.x,e.x),Math.max(this.y,e.y))}ceil(){return new gt(Math.ceil(this.x),Math.ceil(this.y))}cmpge(e){return new tl(this.x>=e.x,this.y>=e.y)}cmple(e){return new tl(this.x<=e.x,this.y<=e.y)}extend(e){return new v(this.x,this.y,e)}};Er.ZERO=Er.splat(0);Er.ONE=Er.splat(1);Er.X=new Er(1,0);Er.Y=new Er(0,1);let oe=Er;const ar=M.vector(M.float32,["x","y"],oe),fs=class pe{constructor(e,r,i,s){this.x=e,this.y=r,this.z=i,this.w=s}static from_xyzw(e,r,i,s){return new pe(e,r,i,s)}static from_mat3(e){return pe.from_rotation_axes(e.x_axis,e.y_axis,e.z_axis)}static from_vec4(e){return pe.from_xyzw(e.x,e.y,e.z,e.w)}static from_array(e){return pe.from_xyzw(e[0],e[1],e[2],e[3])}static from_axis_angle(e,r){const i=Math.sin(r*.5),s=Math.cos(r*.5),n=e.mul(new v(i,i,i));return pe.from_xyzw(n.x,n.y,n.z,s)}static from_scaled_axis(e){let r=e._length();return r===0?pe.IDENTITY:pe.from_axis_angle(new v(e.x/r,e.y/r,e.z/r),r)}static from_rotation_x(e){const r=Math.sin(e*.5),i=Math.cos(e*.5);return pe.from_xyzw(r,0,0,i)}static from_rotation_y(e){const r=Math.sin(e*.5),i=Math.cos(e*.5);return pe.from_xyzw(0,r,0,i)}static from_rotation_z(e){const r=Math.sin(e*.5),i=Math.cos(e*.5);return pe.from_xyzw(0,0,r,i)}static from_rotation_axes(e,r,i){const{x:s,y:n,z:o}=e,{x:a,y:l,z:c}=r,{x:u,y:h,z:_}=i;if(_<=0){const p=l-s,d=1-_;if(p<=0){const g=d-p,m=.5/Math.sqrt(g);return pe.from_xyzw(g*m,(n+a)*m,(o+u)*m,(c-h)*m)}else{const g=d+p,m=.5/Math.sqrt(g);return pe.from_xyzw((n+a)*m,g*m,(c+h)*m,(u-o)*m)}}else{const p=l+s,d=1+_;if(p<=0){const g=d-p,m=.5/Math.sqrt(g);return pe.from_xyzw((o+u)*m,(c+h)*m,g*m,(n-a)*m)}else{const g=d+p,m=.5/Math.sqrt(g);return pe.from_xyzw((c-h)*m,(u-o)*m,(n-a)*m,g*m)}}}static from_euler(e,r,i,s){e.new_quat(r,i,s)}static from_affine3(e){return pe.from_rotation_axes(e.matrix3.x_axis,e.matrix3.y_axis,e.matrix3.z_axis)}add(e){return pe.from_vec4(I.from(this).add(I.from(e)))}sub(e){return pe.from_vec4(I.from(this).sub(I.from(e)))}mul(e){return typeof e=="number"?pe.from_vec4(I.from(this).mul(e)):e instanceof v?this.mul_vec3(e):this.mul_quat(e)}mul_assign(e){const r=this.mul_quat(e);this.x=r.x,this.y=r.y,this.z=r.z,this.w=r.w}div(e){return pe.from_vec4(I.from(this).div(e))}neg(){return this.mul(-1)}eq(e){return I.from(this).eq(I.from(e))}normalize(){return pe.from_vec4(I.from(this).normalize())}_length(){return I.from(this)._length()}dot(e){return I.from(this).dot(I.from(e))}mul_vec3(e){let r=this.w,i=new v(this.x,this.y,this.z),s=i.dot(i);return e.mul(r*r-s).add(i.mul(e.dot(i)*2)).add(i.cross(e).mul(r*2))}mul_quat(e){const{x:r,y:i,z:s,w:n}=this,{x:o,y:a,z:l,w:c}=e;return pe.from_xyzw(n*o+r*c+i*l-s*a,n*a-r*l+i*c+s*o,n*l+r*a-i*o+s*c,n*c-r*o-i*a-s*l)}lerp(e,r){const i=this,n=i.dot(e)>=0?1:-1;return i.add(e.mul(n).sub(i)).mul(r).normalize()}slerp(e,r){let s=this.dot(e);if(s<0&&(e=e.neg(),s=-s),s>.9995)return this.lerp(e,r);{let n=Math.acos(s),o=Math.sin(n*(1-r)),a=Math.sin(n*r),l=Math.sin(n);return this.mul(o).add(e.mul(a)).mul(1/l)}}};fs.ZERO=fs.from_xyzw(0,0,0,0);fs.IDENTITY=fs.from_xyzw(0,0,0,1);let Fr=fs;const Rd=M.vector(M.float32,["x","y","z","w"],Fr),ps=class Zi{static from_cols(e,r){return new Zi(e.x,e.y,r.x,r.y)}constructor(e,r,i,s){this.x_axis=new oe(e,r),this.y_axis=new oe(i,s)}mul_scalar(e){return Zi.from_cols(this.x_axis.mul(e),this.y_axis.mul(e))}mul_vec2(e){return new oe(this.x_axis.x*e.x+this.y_axis.x*e.y,this.x_axis.y*e.x+this.y_axis.y*e.y)}mul_mat2(e){return Zi.from_cols(this.mul_vec2(e.x_axis),this.mul_vec2(e.y_axis))}mul(e){return typeof e=="number"?this.mul_scalar(e):e instanceof oe?this.mul_vec2(e):Zi.from_cols(this.mul(e.x_axis),this.mul(e.y_axis))}};ps.ZERO=ps.from_cols(oe.ZERO,oe.ZERO);ps.IDENTITY=ps.from_cols(oe.X,oe.Y);let Ac=ps;M.vector(M.float32,["m00","m01","m10","m11"],Ac);const ms=class ve{constructor(e,r,i,s,n,o,a,l,c){this.m00=e,this.m01=r,this.m02=i,this.m10=s,this.m11=n,this.m12=o,this.m20=a,this.m21=l,this.m22=c,this.x_axis=new v(e,r,i),this.y_axis=new v(s,n,o),this.z_axis=new v(a,l,c)}static copy(e){const{m00:r,m01:i,m02:s,m10:n,m11:o,m12:a,m20:l,m21:c,m22:u}=e;return new ve(r,i,s,n,o,a,l,c,u)}static from_cols(e,r,i){return new ve(e.x,e.y,e.z,r.x,r.y,r.z,i.x,i.y,i.z)}static from_cols_array(e){return new ve(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])}static to_cols_array(e){return[e.x_axis.x,e.x_axis.y,e.x_axis.z,e.y_axis.x,e.y_axis.y,e.y_axis.z,e.z_axis.x,e.z_axis.y,e.z_axis.z]}static from_diagonal(e){return new ve(e.x,0,0,0,e.y,0,0,0,e.z)}static from_quat(e){let r=e.x+e.x,i=e.y+e.y,s=e.z+e.z,n=e.x*r,o=e.x*i,a=e.x*s,l=e.y*i,c=e.y*s,u=e.z*s,h=e.w*r,_=e.w*i,p=e.w*s;return ve.from_cols(new v(1-(l+u),o+p,a-_),new v(o-p,1-(n+u),c+h),new v(a+_,c-h,1-(n+l)))}static from_axis_angle(e,r){const i=Math.sin(r),s=Math.cos(r);let{x:n,y:o,z:a}=e.mul(i),{x:l,y:c,z:u}=e,{x:h,y:_,z:p}=e.mul(e),d=1-s,g=l*c*d,m=l*u*d,E=c*u*d;return ve.from_cols(new v(h*d+s,g+a,m-o),new v(g-a,_*d+s,E+n),new v(m+o,E-n,p*d+s))}static from_rotation_x(e){const r=Math.sin(e),i=Math.cos(e);return ve.from_cols(new v(1,0,0),new v(0,i,r),new v(0,-r,i))}static from_rotation_y(e){const r=Math.sin(e),i=Math.cos(e);return ve.from_cols(new v(i,0,-r),new v(0,1,0),new v(r,0,i))}static from_rotation_z(e){const r=Math.sin(e),i=Math.cos(e);return ve.from_cols(new v(i,r,0),new v(-r,i,0),new v(0,0,1))}static from_translation(e){return ve.from_cols(v.X,v.Y,new v(e.x,e.y,1))}static from_angle(e){const r=Math.sin(e),i=Math.cos(e);return ve.from_cols(new v(i,r,0),new v(-r,i,0),v.Z)}static from_scale_angle_translation(e,r,i){const s=Math.sin(r),n=Math.cos(r);return ve.from_cols(new v(e.x*n,e.x*s,0),new v(-e.y*s,e.y*n,0),new v(i.x,i.y,1))}static from_scale(e){return ve.from_cols(new v(e.x,0,0),new v(0,e.y,0),v.Z)}static from_mat2(e){return ve.from_cols(new v(e.x_axis.x,e.x_axis.y,0),new v(e.y_axis.x,e.y_axis.y,0),v.Z)}row(e){switch(e){case 0:return new v(this.x_axis.x,this.y_axis.x,this.z_axis.x);case 1:return new v(this.x_axis.y,this.y_axis.y,this.z_axis.y);case 2:return new v(this.x_axis.z,this.y_axis.z,this.z_axis.z);default:throw new Error("index out of bounds")}}transpose(){return ve.from_cols(new v(this.x_axis.x,this.y_axis.x,this.z_axis.x),new v(this.x_axis.y,this.y_axis.y,this.z_axis.y),new v(this.x_axis.z,this.y_axis.z,this.z_axis.z))}determinant(){return this.z_axis.dot(this.x_axis.cross(this.y_axis))}inverse(){const e=this;let r=e.y_axis.cross(e.z_axis),i=e.z_axis.cross(e.x_axis),s=e.x_axis.cross(e.y_axis),n=e.z_axis.dot(s);if(n===0)throw Error("determinant is zero");let o=v.splat(1/n);return ve.from_cols(r.mul(o),i.mul(o),s.mul(o)).transpose()}transform_point2(e){return Ac.from_cols(this.x_axis.truncate(),this.y_axis.truncate()).mul(e).add(this.z_axis.truncate())}mul_scalar(e){return ve.from_cols(this.x_axis.mul(e),this.y_axis.mul(e),this.z_axis.mul(e))}mul_vec3(e){let r=this.x_axis.mul(e.xxx());return r=r.add(this.y_axis.mul(e.yyy())),r=r.add(this.z_axis.mul(e.zzz())),r}mul_mat3(e){return ve.from_cols(this.mul_vec3(e.x_axis),this.mul_vec3(e.y_axis),this.mul_vec3(e.z_axis))}add_mat3(e){return ve.from_cols(this.x_axis.add(e.x_axis),this.y_axis.add(e.y_axis),this.z_axis.add(e.z_axis))}sub_mat3(e){return ve.from_cols(this.x_axis.sub(e.x_axis),this.y_axis.sub(e.y_axis),this.z_axis.sub(e.z_axis))}};ms.ZERO=ms.from_cols(v.ZERO,v.ZERO,v.ZERO);ms.IDENTITY=ms.from_cols(v.X,v.Y,v.Z);let Ae=ms;const bd=M.vector(M.float32,["m00","m01","m02","m10","m11","m12","m20","m21","m22"],Ae),gs=class Pe{constructor(e,r,i,s,n,o,a,l,c,u,h,_,p,d,g,m){this.m00=e,this.m01=r,this.m02=i,this.m03=s,this.m10=n,this.m11=o,this.m12=a,this.m13=l,this.m20=c,this.m21=u,this.m22=h,this.m23=_,this.m30=p,this.m31=d,this.m32=g,this.m33=m,this.x_axis=new I(e,r,i,s),this.y_axis=new I(n,o,a,l),this.z_axis=new I(c,u,h,_),this.w_axis=new I(p,d,g,m)}static copy(e){const{m00:r,m01:i,m02:s,m03:n,m10:o,m11:a,m12:l,m13:c,m20:u,m21:h,m22:_,m23:p,m30:d,m31:g,m32:m,m33:E}=e;return new Pe(r,i,s,n,o,a,l,c,u,h,_,p,d,g,m,E)}static from(e){const{m00:r,m01:i,m02:s,m10:n,m11:o,m12:a,m20:l,m21:c,m22:u}=e.matrix3;return Pe.from_cols(new v(r,i,s).extend(0),new v(n,o,a).extend(0),new v(l,c,u).extend(0),e.translation.extend(1))}static from_cols(e,r,i,s){return new Pe(e.x,e.y,e.z,e.w,r.x,r.y,r.z,r.w,i.x,i.y,i.z,i.w,s.x,s.y,s.z,s.w)}static from_affine3(e){return Pe.from_cols(e.matrix3.x_axis.extend(0),e.matrix3.y_axis.extend(0),e.matrix3.z_axis.extend(0),e.translation.extend(1))}static from_translation(e){return Pe.from_cols(I.X,I.Y,I.Z,new I(e.x,e.y,e.z,1))}static from_quat(e){let[r,i,s]=Pe.quat_to_axes(e);return Pe.from_cols(r,i,s,I.W)}static from_rotation_x(e){const r=Math.sin(e),i=Math.cos(e);return Pe.from_cols(I.X,new I(0,i,r,0),new I(0,-r,i,0),I.W)}static from_rotation_y(e){const r=Math.sin(e),i=Math.cos(e);return Pe.from_cols(new I(i,0,-r,0),I.Y,new I(r,0,i,0),I.W)}static from_rotation_z(e){const r=Math.sin(e),i=Math.cos(e);return Pe.from_cols(new I(i,r,0,0),new I(-r,i,0,0),I.Z,I.W)}static quat_to_axes(e){let{x:r,y:i,z:s,w:n}=e,o=r+r,a=i+i,l=s+s,c=r*o,u=r*a,h=r*l,_=i*a,p=i*l,d=s*l,g=n*o,m=n*a,E=n*l,A=new I(1-(_+d),u+E,h-m,0),S=new I(u-E,1-(c+d),p+g,0),P=new I(h+m,p-g,1-(c+_),0);return[A,S,P]}static perspective_infinite_rh(e,r,i){const s=1/Math.tan(.5*e);return Pe.from_cols(new I(s/r,0,0,0),new I(0,s,0,0),new I(0,0,-1,-1),new I(0,0,-i,0))}static perspective_infinite_reverse_rh(e,r,i){const s=1/Math.tan(.5*e);return Pe.from_cols(new I(s/r,0,0,0),new I(0,s,0,0),new I(0,0,0,-1),new I(0,0,i,0))}static orthographic_rh(e,r,i,s,n,o){const a=1/(r-e),l=1/(s-i),c=1/(n-o);return Pe.from_cols(new I(a+a,0,0,0),new I(0,l+l,0,0),new I(0,0,c,0),new I(-(e+r)*a,-(s+i)*l,c*n,1))}to_cols_array_2d(){return[...this.x_axis.to_array(),...this.y_axis.to_array(),...this.z_axis.to_array(),...this.w_axis.to_array()]}row(e){return e===0?new I(this.x_axis.x,this.y_axis.x,this.z_axis.x,this.w_axis.x):e===1?new I(this.x_axis.y,this.y_axis.y,this.z_axis.y,this.w_axis.y):e===2?new I(this.x_axis.z,this.y_axis.z,this.z_axis.z,this.w_axis.z):new I(this.x_axis.w,this.y_axis.w,this.z_axis.w,this.w_axis.w)}mul_scalar(e){return Pe.from_cols(this.x_axis.mul(e),this.y_axis.mul(e),this.z_axis.mul(e),this.w_axis.mul(e))}mul_vec4(e){const r=this.x_axis.mul(e.x);return r.add_assign(this.y_axis.mul(e.y)),r.add_assign(this.z_axis.mul(e.z)),r.add_assign(this.w_axis.mul(e.w)),r}mul_mat4(e){return Pe.from_cols(this.mul(e.x_axis),this.mul(e.y_axis),this.mul(e.z_axis),this.mul(e.w_axis))}mul(e){return typeof e=="number"?this.mul_scalar(e):e instanceof I?this.mul_vec4(e):this.mul_mat4(e)}mul_assign(e){return typeof e=="number"?(this.x_axis.mul_assign(e),this.y_axis.mul_assign(e),this.z_axis.mul_assign(e),this.w_axis.mul_assign(e)):e instanceof I?(this.x_axis.mul_assign(e.x),this.y_axis.mul_assign(e.y),this.z_axis.mul_assign(e.z),this.w_axis.mul_assign(e.w)):(this.x_axis=this.mul(e.x_axis),this.y_axis=this.mul(e.y_axis),this.z_axis=this.mul(e.z_axis),this.w_axis=this.mul(e.w_axis)),this}inverse(){const{x:e,y:r,z:i,w:s}=this.x_axis,{x:n,y:o,z:a,w:l}=this.y_axis,{x:c,y:u,z:h,w:_}=this.z_axis,{x:p,y:d,z:g,w:m}=this.w_axis,E=h*m-g*_,A=a*m-g*l,S=a*_-h*l,P=u*m-d*_,k=o*m-d*l,C=o*_-u*l,O=u*g-d*h,D=o*g-d*a,X=o*h-u*a,te=c*m-p*_,K=n*m-p*l,ce=n*_-c*l,Ie=c*g-p*h,_e=n*g-p*a,Oe=n*h-c*a,ie=c*d-p*u,Or=n*d-p*o,Fi=n*u-c*o,Yr=new I(E,E,A,S),ur=new I(P,P,k,C),Ns=new I(O,O,D,X),Cs=new I(te,te,K,ce),Ms=new I(Ie,Ie,_e,Oe),Li=new I(ie,ie,Or,Fi),ni=new I(n,e,e,e),pt=new I(o,r,r,r),ct=new I(a,i,i,i),oi=new I(l,s,s,s),zi=pt.mul(Yr).sub(ct.mul(ur)).add(oi.mul(Ns)),ai=ni.mul(Yr).sub(ct.mul(Cs)).add(oi.mul(Ms)),Ps=ni.mul(ur).sub(pt.mul(Cs)).add(oi.mul(Li)),Jn=ni.mul(Ns).sub(pt.mul(Ms)).add(ct.mul(Li)),Bs=new I(1,-1,1,-1),Tt=new I(-1,1,-1,1),Yt=Pe.from_cols(zi.mul(Bs),ai.mul(Tt),Ps.mul(Bs),Jn.mul(Tt)),Ds=new I(Yt.x_axis.x,Yt.y_axis.x,Yt.z_axis.x,Yt.w_axis.x),li=this.x_axis.mul(Ds),Us=li.x+li.y+li.z+li.w;if(Us===0)throw new Error("The determinant is 0.");const Pu=1/Us;return Yt.mul(Pu)}determinant(){const{x:e,y:r,z:i,w:s}=this.x_axis,{x:n,y:o,z:a,w:l}=this.y_axis,{x:c,y:u,z:h,w:_}=this.z_axis,{x:p,y:d,z:g,w:m}=this.w_axis,E=h*m-_*g,A=u*m-_*d,S=u*g-h*d,P=c*m-_*p,k=c*g-h*p,C=c*d-u*p;return e*(o*E-a*A+l*S)-r*(n*E-a*P+l*k)+i*(n*A-o*P+l*C)-s*(n*S-o*k+a*C)}to_scale_rotation_translation(){const e=this.determinant();if(e===0)throw new Error("The determinant is 0.");const r=new v(this.x_axis._length()*Math.sign(e),this.y_axis._length(),this.z_axis._length()),i=v.ONE.div(r),s=Fr.from_rotation_axes(this.x_axis.mul(i.x).xyz(),this.y_axis.mul(i.y).xyz(),this.z_axis.mul(i.z).xyz()),n=this.w_axis.xyz();return{scale:r,translation:n,rotation:s}}project_point3(e){const r=this;let i=r.x_axis.mul(e.x);return i=r.y_axis.mul(e.y).add(i),i=r.z_axis.mul(e.z).add(i),i=r.w_axis.add(i),i=i.mul(i.wwww().recip()),i.xyz()}transform_point3(e){const r=this;let i=r.x_axis.mul(e.x);return i=r.y_axis.mul(e.y).add(i),i=r.z_axis.mul(e.z).add(i),i=r.w_axis.add(i),i.xyz()}transpose(){return Pe.from_cols(new I(this.x_axis.x,this.y_axis.x,this.z_axis.x,this.w_axis.x),new I(this.x_axis.y,this.y_axis.y,this.z_axis.y,this.w_axis.y),new I(this.x_axis.z,this.y_axis.z,this.z_axis.z,this.w_axis.z),new I(this.x_axis.w,this.y_axis.w,this.z_axis.w,this.w_axis.w))}};gs.ZERO=gs.from_cols(I.ZERO,I.ZERO,I.ZERO,I.ZERO);gs.IDENTITY=gs.from_cols(I.X,I.Y,I.Z,I.W);let _t=gs;const Nn=M.vector(M.float32,["m00","m01","m02","m03","m10","m11","m12","m13","m20","m21","m22","m23","m30","m31","m32","m33"],_t);var xd=Object.defineProperty,Sd=Object.getOwnPropertyDescriptor,wc=(t,e,r,i)=>{for(var s=i>1?void 0:i?Sd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&xd(e,r,s),s};const Jr=class Rt{static from(e){return new Rt(e.matrix3,e.translation)}static from_translation(e){return new Rt(Ae.IDENTITY,e)}static from_scale(e){return new Rt(Ae.from_diagonal(e),v.ZERO)}static from_quat(e){return new Rt(Ae.from_quat(e),v.ZERO)}static from_axis_angle(e,r){return new Rt(Ae.from_axis_angle(e,r),v.ZERO)}static from_rotation_x(e){return new Rt(Ae.from_rotation_x(e),v.ZERO)}static from_rotation_y(e){return new Rt(Ae.from_rotation_y(e),v.ZERO)}static from_rotation_z(e){return new Rt(Ae.from_rotation_z(e),v.ZERO)}static from_scale_rotation_translation(e,r,i){const s=Ae.from_quat(r),n=Ae.from_cols(s.x_axis.mul(e.x),s.y_axis.mul(e.y),s.z_axis.mul(e.z));return new Rt(n,i)}constructor(e=Ae.IDENTITY,r=v.ZERO){this.matrix3=e,this.translation=r}transform_point3(e){return this.matrix3.mul_vec3(e).add(this.translation)}inverse(){const e=this.matrix3.inverse(),r=e.mul_vec3(this.translation).neg();return new Rt(e,r)}inverse_transpose_3x3(){const e=Rt.from(this).inverse().matrix3.transpose(),{x_axis:r,y_axis:i,z_axis:s}=e;return[[...r.to_array(),i.x,i.y,i.z,s.x,s.y],e.z_axis.z]}to_transpose(){const e=this.matrix3.transpose();return[e.x_axis.extend(this.translation.x),e.y_axis.extend(this.translation.y),e.z_axis.extend(this.translation.z)]}to_cols_array_2d(){return[...this.matrix3.x_axis.to_array(),...this.matrix3.y_axis.to_array(),...this.matrix3.z_axis.to_array(),...this.translation.to_array()]}to_scale_rotation_translation(){const e=this.matrix3.determinant();if(e===0)return null;const r=new v(this.matrix3.x_axis._length()*Math.sign(e),this.matrix3.y_axis._length(),this.matrix3.z_axis._length());if(!r.cmpne(v.ZERO).all())return null;const i=r.recip(),s=Fr.from_mat3(Ae.from_cols(this.matrix3.x_axis.mul(i.x),this.matrix3.y_axis.mul(i.y),this.matrix3.z_axis.mul(i.z)));return{scale:r,rotation:s,translation:this.translation}}};Jr.ZERO=new Jr(Ae.ZERO,v.ZERO);Jr.IDENTITY=new Jr(Ae.IDENTITY,v.ZERO);wc([y(bd)],Jr.prototype,"matrix3",2);wc([y(jt)],Jr.prototype,"translation",2);let Tc=Jr;class Zt{static from_corners(e,r){const i=e.min(r),s=e.max(r);return new Zt(i.x,i.y,s.x,s.y)}static from_center_size(e,r){const i=r.mul(.5);return Zt.from_center_half_size(e,i)}static from_center_half_size(e,r){return Zt.from_corners(e.sub(r),e.add(r))}constructor(e,r,i,s){this.min=new oe(e,r),this.max=new oe(i,s)}is_empty(){return this.min.cmpge(this.max).any()}width(){return this.max.x-this.min.x}height(){return this.max.y-this.min.y}size(){return this.max.sub(this.min)}half_size(){return this.size().mul(.5)}center(){return this.min.add(this.max).mul(.5)}contains(e){return e.cmpge(this.min).bitand_assign(e.cmple(this.max)).all()}union(e){return Zt.from_corners(this.min.min(e.min),this.max.max(e.max))}union_point(e){return Zt.from_corners(this.min.min(e),this.max.max(e))}intersection(e){const r=Zt.from_corners(this.min.max(e.min),this.max.min(e.max));return r.min=r.min.min(r.max),r}inset(e){const r=Zt.from_corners(this.min.sub(e),this.max.add(e));return r.min=r.min.min(r.max),r}normalize(e){const r=e.size();return Zt.from_corners(this.min.sub(e.min).div_assign(r),this.max.sub(e.min).div_assign(r))}}var Id=Object.defineProperty,Od=Object.getOwnPropertyDescriptor,Yo=(t,e,r,i)=>{for(var s=i>1?void 0:i?Od(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Id(e,r,s),s};const Ri=class Gi{constructor(e=v.ZERO,r=v.ONE,i=Fr.IDENTITY){this.translation=e,this.scale=r,this.rotation=i}static from_translation(e){return new Gi(e,v.ONE,Fr.IDENTITY)}static from_xyz(e,r,i){return Gi.from_translation(new v(e,r,i))}static from_matrix(e){const{scale:r,rotation:i,translation:s}=e.to_scale_rotation_translation();return new Gi(s,r,i)}static from_rotation(e){return new Gi(v.ZERO,v.ONE,e)}look_at(e,r){return this.look_to(e.sub(this.translation),r),this}look_to(e,r){let i;try{i=e.normalize().neg()}catch{i=v.NEG_Z}let s;try{s=r.normalize()}catch{s=v.Y}let n;try{n=s.cross(i).normalize()}catch{n=s.any_orthonormal_vector()}s=i.cross(n),this.rotation=Fr.from_mat3(Ae.from_cols(n,s,i))}compute_affine(){return Tc.from_scale_rotation_translation(this.scale,this.rotation,this.translation)}local_z(){return this.rotation.mul(v.Z)}back(){return this.local_z()}};Ri.IDENTITY=new Ri(v.ZERO,v.ONE,Fr.IDENTITY);Yo([y(jt)],Ri.prototype,"translation",2);Yo([y(jt)],Ri.prototype,"scale",2);Yo([y(Rd)],Ri.prototype,"rotation",2);let V=Ri;class q extends Tc{static copy(e){return new q(Ae.copy(e.matrix3),v.copy(e.translation))}static from_translation(e){return new q(Ae.IDENTITY,e)}compute_matrix(){return _t.from(this)}compute_transform(){const{scale:e,rotation:r,translation:i}=this.to_scale_rotation_translation();return new V(i,e,r)}affine(){return this}from(e){const{matrix3:r,translation:i}=e.compute_affine();this.matrix3=r,this.translation=i}radius_vec3(e){return this.matrix3.mul_vec3(e)._length()}}var Nd=Object.defineProperty,Cd=Object.getOwnPropertyDescriptor,Rc=(t,e,r,i)=>{for(var s=i>1?void 0:i?Cd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Nd(e,r,s),s};class Ko{}Rc([y.object],Ko.prototype,"local",2);Rc([y.object],Ko.prototype,"global",2);var Md=Object.defineProperty,Pd=Object.getOwnPropertyDescriptor,Bd=(t,e,r,i)=>{for(var s=i>1?void 0:i?Pd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Md(e,r,s),s};class zt{}Bd([y.ref],zt.prototype,"parent",2);var Dd=Object.defineProperty,Ud=Object.getOwnPropertyDescriptor,Fd=(t,e,r,i)=>{for(var s=i>1?void 0:i?Ud(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Dd(e,r,s),s};class It{}Fd([y.backrefs(zt,"parent")],It.prototype,"children",2);var Ld=Object.defineProperty,zd=Object.getOwnPropertyDescriptor,Cn=(t,e,r,i)=>{for(var s=i>1?void 0:i?zd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ld(e,r,s),s};class Y{constructor(){this.order=0,this.is_active=!0,this.hdr=!1}to_logical(e,r){const i=e.target_info_scale_factor;return new oe(r.x/i,r.y/i)}physical_viewport_rect(e){const r=this.viewport?this.viewport.physical_position:oe.ZERO,i=new oe(r.x,r.y);return i.add_assign(this.physical_viewport_size(e)),{min:r,max:i}}logical_viewport_rect(e){const{min:r,max:i}=this.physical_viewport_rect(e);return{min:this.to_logical(e,r),max:this.to_logical(e,i)}}logical_viewport_size(e){return this.viewport?this.to_logical(e,this.viewport.physical_size):this.logical_target_size(e)}physical_viewport_size(e){return this.viewport?this.viewport.physical_size:this.physical_target_size(e)}logical_target_size(e){return this.to_logical(e,e.target_info_physical_size)}physical_target_size(e){return e.target_info_physical_size}projection_matrix(e){return e.projection_matrix}world_to_viewport(e,r,i){let s=this.logical_viewport_size(e),n=this.world_to_ndc(e,r,i);if(n.z<0||n.z>1)return null;let o=n.truncate().add(oe.ONE).div(2).mul(s);return o.y=s.y-o.y,o}world_to_ndc(e,r,i){return e.projection_matrix.mul(r.compute_matrix().inverse()).project_point3(i)}ndc_to_world(e,r,i){return r.compute_matrix().mul(e.projection_matrix.inverse()).project_point3(i)}}Cn([y.object],Y.prototype,"viewport",2);Cn([y.int32],Y.prototype,"order",2);Cn([y.boolean],Y.prototype,"is_active",2);Cn([y.boolean],Y.prototype,"hdr",2);var Vd=Object.defineProperty,Hd=Object.getOwnPropertyDescriptor,Mn=(t,e,r,i)=>{for(var s=i>1?void 0:i?Hd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Vd(e,r,s),s};class Se{}Mn([y(Nn)],Se.prototype,"projection_matrix",2);Mn([y(ar)],Se.prototype,"target_info_physical_size",2);Mn([y.float32],Se.prototype,"target_info_scale_factor",2);Mn([y(ar)],Se.prototype,"old_viewport_size",2);var kd=Object.defineProperty,Wd=Object.getOwnPropertyDescriptor,lr=(t,e,r,i)=>{for(var s=i>1?void 0:i?Wd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&kd(e,r,s),s};const rl=Sn.defineEnum("Projection");class J{constructor(e=Math.PI/4,r=1,i=.1,s=1e3){this.fov=e,this.aspect_ratio=r,this.near=i,this.far=s}get_projection_matrix(){return _t.perspective_infinite_reverse_rh(this.fov,this.aspect_ratio,this.near)}update(e,r){this.aspect_ratio=e/r}get_frustum_corners(e,r){const i=Math.tan(this.fov/2),s=Math.abs(e)*i,n=Math.abs(r)*i,o=this.aspect_ratio;return[new v(s*o,-s,e),new v(s*o,s,e),new v(-s*o,s,e),new v(-s*o,-s,e),new v(n*o,-n,r),new v(n*o,n,r),new v(-n*o,n,r),new v(-n*o,-n,r)]}}lr([y.float32],J.prototype,"fov",2);lr([y.float32],J.prototype,"aspect_ratio",2);lr([y.float32],J.prototype,"near",2);lr([y.float32],J.prototype,"far",2);class rt{get_projection_matrix(){return _t.orthographic_rh(this.area.min.x,this.area.max.x,this.area.min.y,this.area.max.y,this.far,this.near)}update(e,r){const i=e,s=r;let n=i*this.viewport_origin.x,o=s*this.viewport_origin.y;this.area=new Zt(this.scale*-n,this.scale*-o,this.scale*(i-n),this.scale*(s-o))}get_frustum_corners(e,r){const i=this.area;return[new v(i.max.x,i.min.y,e),new v(i.max.x,i.max.y,e),new v(i.min.x,i.max.y,e),new v(i.min.x,i.min.y,e),new v(i.max.x,i.min.y,r),new v(i.max.x,i.max.y,r),new v(i.min.x,i.max.y,r),new v(i.min.x,i.min.y,r)]}}lr([y.float32],rt.prototype,"near",2);lr([y.float32],rt.prototype,"far",2);lr([y(ar)],rt.prototype,"viewport_origin",2);lr([y.object],rt.prototype,"scaling_mode",2);lr([y.float32],rt.prototype,"scale",2);lr([y.object],rt.prototype,"area",2);var Xd=Object.defineProperty,$d=Object.getOwnPropertyDescriptor,Qo=(t,e,r,i)=>{for(var s=i>1?void 0:i?$d(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Xd(e,r,s),s};class Pn{constructor(e){const{physical_position:r=oe.ZERO,physical_size:i=oe.ZERO,depth:s=new oe(0,1)}=e||{};this.physical_position=r,this.physical_size=i,this.depth=s}}Qo([y(ar)],Pn.prototype,"physical_position",2);Qo([y(ar)],Pn.prototype,"physical_size",2);Qo([y(ar)],Pn.prototype,"depth",2);class Qt{constructor(e=I.ZERO){this.normal_d=e}normal(){return this.normal_d.xyz()}d(){return this.normal_d.w}}var jd=Object.defineProperty,qd=Object.getOwnPropertyDescriptor,Yd=(t,e,r,i)=>{for(var s=i>1?void 0:i?qd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&jd(e,r,s),s};const bc=class xc{constructor(e){this.half_spaces=e||[new Qt,new Qt,new Qt,new Qt,new Qt,new Qt]}static from_view_projection(e){const r=this.from_view_projection_no_far(e);return r.half_spaces[5]=new Qt(e.row(2)),r}static from_view_projection_custom_far(e,r,i,s){const n=this.from_view_projection_no_far(e),o=r.sub(i.mul(s));return n.half_spaces[5]=new Qt(i.extend(-i.dot(o))),n}static from_view_projection_no_far(e){const r=e.row(3),i=new Array(6).fill(new Qt);for(let s=0;s<5;s++){let n=e.row(s/2);i[s]=new Qt(!(s&1)&&s!=4?r.add(n):r.sub(n))}return new xc(i)}intersects_sphere(e,r){let i=e.center.extend(1),s=r?6:5;for(const n of this.half_spaces.slice(0,s))if(n.normal_d.dot(i)+e.radius<=0)return!1;return!0}intersects_obb(e,r,i,s){const n=r.transform_point3(e.center).extend(1);for(let o=0;o<this.half_spaces.length;o++){const a=this.half_spaces[o];if(o==4&&!i||o==5&&!s)continue;const l=a.normal(),c=e.relative_radius(l,r.matrix3);if(a.normal_d.dot(n)+c<=0)return!1}return!0}};Yd([y.object],bc.prototype,"half_spaces",2);let ze=bc;class Kd{}var Qd=Object.defineProperty,Zd=Object.getOwnPropertyDescriptor,Zo=(t,e,r,i)=>{for(var s=i>1?void 0:i?Zd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Qd(e,r,s),s},Je=(t=>(t[t.Low=0]="Low",t[t.Medium=1]="Medium",t[t.High=2]="High",t[t.Ultra=3]="Ultra",t[t.Extreme=4]="Extreme",t))(Je||{});class Me{constructor(e){const{enabled:r=!0,edge_threshold:i=2,edge_threshold_min:s=2}=e||{};this.enabled=r,this.edge_threshold=i,this.edge_threshold_min=s}}Zo([y.boolean],Me.prototype,"enabled",2);Zo([y.uint8],Me.prototype,"edge_threshold",2);Zo([y.uint8],Me.prototype,"edge_threshold_min",2);var Gd=Object.defineProperty,Jd=Object.getOwnPropertyDescriptor,ef=(t,e,r,i)=>{for(var s=i>1?void 0:i?Jd(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Gd(e,r,s),s};class it{constructor(e=1){this.method=e}}ef([y.uint8],it.prototype,"method",2);var Ue=(t=>(t[t.None=0]="None",t[t.Reinhard=1]="Reinhard",t[t.ReinhardLuminance=2]="ReinhardLuminance",t[t.AcesFitted=3]="AcesFitted",t[t.AgX=4]="AgX",t[t.SomewhatBoringDisplayTransform=5]="SomewhatBoringDisplayTransform",t[t.TonyMcMapface=6]="TonyMcMapface",t[t.BlenderFilmic=7]="BlenderFilmic",t))(Ue||{});class tf{}var rf=Object.defineProperty,sf=Object.getOwnPropertyDescriptor,ei=(t,e,r,i)=>{for(var s=i>1?void 0:i?sf(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&rf(e,r,s),s};const ft=class{constructor(e){const{intensity:r=.15,low_frequency_boost:i=0,low_frequency_boost_curvature:s=0,high_pass_frequency:n=1,prefilter_settings_threshold:o=0,prefilter_settings_threshold_softness:a=0,composite_mode:l=0}=e||{};this.intensity=r,this.low_frequency_boost=i,this.low_frequency_boost_curvature=s,this.high_pass_frequency=n,this.prefilter_settings_threshold=o,this.prefilter_settings_threshold_softness=a,this.composite_mode=l}};ft.NATURAL=new ft({intensity:.15,low_frequency_boost:.7,low_frequency_boost_curvature:.95,high_pass_frequency:1,prefilter_settings_threshold:0,prefilter_settings_threshold_softness:0,composite_mode:0});ft.OLD_SCHOOL=new ft({intensity:.05,low_frequency_boost:.7,low_frequency_boost_curvature:.95,high_pass_frequency:1,prefilter_settings_threshold:.6,prefilter_settings_threshold_softness:.2,composite_mode:1});ft.SCREEN_BLUR=new ft({intensity:1,low_frequency_boost:0,low_frequency_boost_curvature:0,high_pass_frequency:1/3,prefilter_settings_threshold:0,prefilter_settings_threshold_softness:0,composite_mode:0});ei([y.float32],ft.prototype,"intensity",2);ei([y.float32],ft.prototype,"low_frequency_boost",2);ei([y.float32],ft.prototype,"low_frequency_boost_curvature",2);ei([y.float32],ft.prototype,"high_pass_frequency",2);ei([y.float32],ft.prototype,"prefilter_settings_threshold",2);ei([y.float32],ft.prototype,"prefilter_settings_threshold_softness",2);ei([y.int8],ft.prototype,"composite_mode",2);let Go=ft;var nf=Object.defineProperty,of=Object.getOwnPropertyDescriptor,af=(t,e,r,i)=>{for(var s=i>1?void 0:i?of(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&nf(e,r,s),s};class Mr{constructor(e){const{image_handle:r}=e||{};this.image_handle=r}}af([y.object],Mr.prototype,"image_handle",2);var lf=typeof global=="object"&&global&&global.Object===Object&&global;const cf=lf;var uf=typeof self=="object"&&self&&self.Object===Object&&self,hf=cf||uf||Function("return this")();const _f=hf;var df=_f.Symbol;const bi=df;var Sc=Object.prototype,ff=Sc.hasOwnProperty,pf=Sc.toString,Xi=bi?bi.toStringTag:void 0;function mf(t){var e=ff.call(t,Xi),r=t[Xi];try{t[Xi]=void 0;var i=!0}catch{}var s=pf.call(t);return i&&(e?t[Xi]=r:delete t[Xi]),s}var gf=Object.prototype,Ef=gf.toString;function yf(t){return Ef.call(t)}var vf="[object Null]",Af="[object Undefined]",il=bi?bi.toStringTag:void 0;function Bn(t){return t==null?t===void 0?Af:vf:il&&il in Object(t)?mf(t):yf(t)}function Dn(t){return t!=null&&typeof t=="object"}var wf="[object Symbol]";function Tf(t){return typeof t=="symbol"||Dn(t)&&Bn(t)==wf}var Rf=Array.isArray;const bf=Rf;var xf=/\s/;function Sf(t){for(var e=t.length;e--&&xf.test(t.charAt(e)););return e}var If=/^\s+/;function Of(t){return t&&t.slice(0,Sf(t)+1).replace(If,"")}function pn(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var sl=0/0,Nf=/^[-+]0x[0-9a-f]+$/i,Cf=/^0b[01]+$/i,Mf=/^0o[0-7]+$/i,Pf=parseInt;function Gs(t){if(typeof t=="number")return t;if(Tf(t))return sl;if(pn(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=pn(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Of(t);var r=Cf.test(t);return r||Mf.test(t)?Pf(t.slice(2),r?2:8):Nf.test(t)?sl:+t}var nl=1/0,Bf=17976931348623157e292;function Df(t){if(!t)return t===0?t:0;if(t=Gs(t),t===nl||t===-nl){var e=t<0?-1:1;return e*Bf}return t===t?t:0}function Uf(t){var e=Df(t),r=e%1;return e===e?r?e-r:e:0}var Ff="[object AsyncFunction]",Lf="[object Function]",zf="[object GeneratorFunction]",Vf="[object Proxy]";function Hf(t){if(!pn(t))return!1;var e=Bn(t);return e==Lf||e==zf||e==Ff||e==Vf}var kf=9007199254740991,Wf=/^(?:0|[1-9]\d*)$/;function Xf(t,e){var r=typeof t;return e=e??kf,!!e&&(r=="number"||r!="symbol"&&Wf.test(t))&&t>-1&&t%1==0&&t<e}function $f(t,e){return t===e||t!==t&&e!==e}var jf=9007199254740991;function qf(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=jf}function Yf(t){return t!=null&&qf(t.length)&&!Hf(t)}function Kf(t,e,r){if(!pn(r))return!1;var i=typeof e;return(i=="number"?Yf(r)&&Xf(e,r.length):i=="string"&&e in r)?$f(r[e],t):!1}var Qf="[object Arguments]";function ol(t){return Dn(t)&&Bn(t)==Qf}var Ic=Object.prototype,Zf=Ic.hasOwnProperty,Gf=Ic.propertyIsEnumerable,Jf=ol(function(){return arguments}())?ol:function(t){return Dn(t)&&Zf.call(t,"callee")&&!Gf.call(t,"callee")};const ep=Jf;function tp(t,e){for(var r=-1,i=e.length,s=t.length;++r<i;)t[s+r]=e[r];return t}var al=bi?bi.isConcatSpreadable:void 0;function rp(t){return bf(t)||ep(t)||!!(al&&t&&t[al])}function Oc(t,e,r,i,s){var n=-1,o=t.length;for(r||(r=rp),s||(s=[]);++n<o;){var a=t[n];e>0&&r(a)?e>1?Oc(a,e-1,r,i,s):tp(s,a):i||(s[s.length]=a)}return s}function Nc(t){var e=t==null?0:t.length;return e?Oc(t,1):[]}function ip(t,e,r){var i=-1,s=t.length;e<0&&(e=-e>s?0:s+e),r=r>s?s:r,r<0&&(r+=s),s=e>r?0:r-e>>>0,e>>>=0;for(var n=Array(s);++i<s;)n[i]=t[i+e];return n}var sp=Math.ceil,np=Math.max;function op(t,e,r){(r?Kf(t,e,r):e===void 0)?e=1:e=np(Uf(e),0);var i=t==null?0:t.length;if(!i||e<1)return[];for(var s=0,n=0,o=Array(sp(i/e));s<i;)o[n++]=ip(t,s,s+=e);return o}function ap(t,e,r){return t===t&&(r!==void 0&&(t=t<=r?t:r),e!==void 0&&(t=t>=e?t:e)),t}function $i(t,e,r){return r===void 0&&(r=e,e=void 0),r!==void 0&&(r=Gs(r),r=r===r?r:0),e!==void 0&&(e=Gs(e),e=e===e?e:0),ap(Gs(t),e,r)}var lp="[object Number]";function ll(t){return typeof t=="number"||Dn(t)&&Bn(t)==lp}function Hs(t){return t*(Math.PI/180)}function cp(t){return t*(180/Math.PI)}function up(t){return t=t-(t>>1&1431655765),t=(t&858993459)+(t>>2&858993459),(t+(t>>4)&252645135)*16843009>>24}var ke;(t=>{function e(i){return i<=0?i:i<=.0031308?i*12.92:1.055*Math.pow(i,1/2.4)-.055}t.linear_to_nonlinear_srgb=e;function r(i){return i<=0?i:i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4)}t.nonlinear_to_linear_srgb=r})(ke||(ke={}));var mn;(t=>{function e(i,s,n){const o=(1-Math.abs(2*n-1))*s,a=i/60,l=o*(1-Math.abs(a%2-1));let c=[0,0,0];a<1?c=[o,l,0]:a<2?c=[l,o,0]:a<3?c=[0,o,l]:a<4?c=[0,l,o]:a<5?c=[l,0,o]:c=[o,0,l];const u=n-o/2,[h,_,p]=c;return[h+u,_+u,p+u]}t.hsl_to_nonlinear_srgb=e;function r([i,s,n]){const o=Math.max(i,Math.max(s,n)),a=Math.min(i,Math.min(s,n)),l=o-a,c=(o+a)/2;let u;l==0?u=0:i==o?u=60*(s-n)/l:s==o?u=60*(2+(n-i)/l):u=60*(4+(i-s)/l),u=u<0?360+u:u;let h;return c<=0||c>=1?h=0:h=(o-c)/Math.min(c,1-c),[u,h,c]}t.nonlinear_srgb_to_hsl=r})(mn||(mn={}));var gn;(t=>{const e=.008856451679035631,r=24389/27,i=.95047,s=1,n=1.08883;function o(l,c,u){l=l*100,c=c*100;const h=l,_=c*Math.cos(Hs(u)),p=c*Math.sin(Hs(u)),d=(h+16)/116,g=_/500+d,m=d-p/200;let E;const A=Math.pow(g,3);A>e?E=A:E=(116*g-16)/r;let S;h>e*r?S=Math.pow((h+16)/116,3):S=h/r;let P;const k=Math.pow(m,3);k>e?P=k:P=(116*m-16)/r;const C=E*i,O=S*s,D=P*n,X=C*3.2404542+O*-1.5371385+D*-.4985314,te=C*-.969266+O*1.8760108+D*.041556,K=C*.0556434+O*-.2040259+D*1.0572252;return[$i(ke.linear_to_nonlinear_srgb(X),0,1),$i(ke.linear_to_nonlinear_srgb(te),0,1),$i(ke.linear_to_nonlinear_srgb(K),0,1)]}t.lch_to_nonlinear_srgb=o;function a([l,c,u]){l=ke.nonlinear_to_linear_srgb(l),c=ke.nonlinear_to_linear_srgb(c),u=ke.nonlinear_to_linear_srgb(u);const h=l*.4124564+c*.3575761+u*.1804375,_=l*.2126729+c*.7151522+u*.072175,p=l*.0193339+c*.119192+u*.9503041,d=h/i,g=_/s,m=p/n;let E;d>e?E=Math.cbrt(d):E=(r*d+16)/116;let A;g>e?A=Math.cbrt(g):A=(r*g+16)/116;let S;g>e?S=Math.cbrt(m):S=(r*m+16)/116;const P=116*A-16,k=500*(E-A),C=200*(A-S),O=Math.sqrt(Math.pow(k,2)+Math.pow(C,2));let D=cp(Math.atan2(Hs(C),Hs(k)));return D<0&&(D=D+360),[$i(P/100,0,1.5),$i(O/100,0,1.5),D]}t.nonlinear_srgb_to_lch=a})(gn||(gn={}));class Un{is_fully_transparent(){return this.a()===0}}class Fn extends Un{constructor(e,r,i,s){super(),this.red=e,this.green=r,this.blue=i,this.alpha=s}a(){return this.alpha}as_rgba(){return this}as_linear_rgba_f32(){return[ke.nonlinear_to_linear_srgb(this.red),ke.nonlinear_to_linear_srgb(this.green),ke.nonlinear_to_linear_srgb(this.blue),this.alpha]}}class cl extends Un{constructor(e,r,i,s){super(),this.red=e,this.green=r,this.blue=i,this.alpha=s}a(){return this.alpha}as_rgba(){return new Fn(ke.linear_to_nonlinear_srgb(this.red),ke.linear_to_nonlinear_srgb(this.green),ke.linear_to_nonlinear_srgb(this.blue),this.alpha)}as_linear_rgba_f32(){return[this.red,this.green,this.blue,this.alpha]}}class ul extends Un{constructor(e,r,i,s){super(),this.hue=e,this.saturation=r,this.lightness=i,this.alpha=s}a(){return this.alpha}as_rgba(){const[e,r,i]=mn.hsl_to_nonlinear_srgb(this.hue,this.saturation,this.lightness);return new Fn(e,r,i,this.alpha)}as_linear_rgba_f32(){const[e,r,i]=mn.hsl_to_nonlinear_srgb(this.hue,this.saturation,this.lightness);return[e,r,i,this.alpha]}}class hl extends Un{constructor(e,r,i,s){super(),this.lightness=e,this.chroma=r,this.hue=i,this.alpha=s}a(){return this.alpha}as_rgba(){const[e,r,i]=gn.lch_to_nonlinear_srgb(this.lightness,this.chroma,this.hue);return new Fn(e,r,i,this.alpha)}as_linear_rgba_f32(){const[e,r,i]=gn.lch_to_nonlinear_srgb(this.lightness,this.chroma,this.hue);return[ke.nonlinear_to_linear_srgb(e),ke.nonlinear_to_linear_srgb(r),ke.nonlinear_to_linear_srgb(i),this.alpha]}}var be;(t=>{function e(d,g,m){return t.rgba(d,g,m,1)}t.rgb=e;function r(d,g,m,E){return new Fn(d,g,m,E)}t.rgba=r;function i(d,g,m,E){return t.rgba(d/255,g/255,m/255,E/255)}t.rgba_u8=i;function s(d,g,m){return t.rgba_u8(d,g,m,255)}t.rgb_u8=s;function n(d,g,m){return new cl(d,g,m,1)}t.rgb_linear=n;function o(d,g,m,E){return new cl(d,g,m,E)}t.rgba_linear=o;function a(d,g,m){return new ul(d,g,m,1)}t.hsl=a;function l(d,g,m,E){return new ul(d,g,m,E)}t.hsla=l;function c(d,g,m){return new hl(d,g,m,1)}t.lch=c;function u(d,g,m,E){return new hl(d,g,m,E)}t.lcha=u;function h(d){const g=d.slice(1),m=[];for(let E=0;E<g.length;E++)m.push(g.charCodeAt(E));if(m.length===3){let[E,A,S]=m;return[E,A,S]=_([E,E,A,A,S,S]),t.rgb_u8(E,A,S)}else if(m.length===4){let[E,A,S,P]=m;return[E,A,S,P]=_([E,E,A,A,S,S,P,P]),t.rgba_u8(E,A,S,P)}else if(m.length===6){let[E,A,S,P,k,C]=m;const[O,D,X]=_([E,A,S,P,k,C]);return t.rgb_u8(O,D,X)}else if(m.length===8){let[E,A,S,P,k,C,O,D]=m;const[X,te,K,ce]=_([E,A,S,P,k,C,O,D]);return t.rgba_u8(X,te,K,ce)}}t.hex=h;function _(d){let g=0;for(;g<d.length;){const m=p(d[g]);d[g]=m,g+=1}for(g=0;g<d.length/2;)d[g]=d[g*2]*16+d[g*2+1],g+=1;return d}t.decode_hex=_;function p(d){return d>=48&&d<=57?d-48:d>=65&&d<=70?d-55:d>=97&&d<=102?d-87:0}t.ALICE_BLUE=t.rgb(.94,.97,1),t.ANTIQUE_WHITE=t.rgb(.98,.92,.84),t.AQUAMARINE=t.rgb(.49,1,.83),t.AZURE=t.rgb(.94,1,1),t.BEIGE=t.rgb(.96,.96,.86),t.BISQUE=t.rgb(1,.89,.77),t.BLACK=t.rgb(0,0,0),t.BLUE=t.rgb(0,0,1),t.CRIMSON=t.rgb(.86,.08,.24),t.CYAN=t.rgb(0,1,1),t.DARK_GRAY=t.rgb(.25,.25,.25),t.DARK_GREEN=t.rgb(0,.5,0),t.FUCHSIA=t.rgb(1,0,1),t.GOLD=t.rgb(1,.84,0),t.GRAY=t.rgb(.5,.5,.5),t.GREEN=t.rgb(0,1,0),t.INDIGO=t.rgb(.29,0,.51),t.LIME_GREEN=t.rgb(.2,.8,.2),t.MAROON=t.rgb(.5,0,0),t.MIDNIGHT_BLUE=t.rgb(.1,.1,.44),t.NAVY=t.rgb(0,0,.5),t.NONE=t.rgba(0,0,0,0),t.OLIVE=t.rgb(.5,.5,0),t.ORANGE=t.rgb(1,.65,0),t.ORANGE_RED=t.rgb(1,.27,0),t.PINK=t.rgb(1,.08,.58),t.PURPLE=t.rgb(.5,0,.5),t.RED=t.rgb(1,0,0),t.SALMON=t.rgb(.98,.5,.45),t.SEA_GREEN=t.rgb(.18,.55,.34),t.SILVER=t.rgb(.75,.75,.75),t.TEAL=t.rgb(0,.5,.5),t.TOMATO=t.rgb(1,.39,.28),t.TURQUOISE=t.rgb(.25,.88,.82),t.VIOLET=t.rgb(.93,.51,.93),t.WHITE=t.rgb(1,1,1),t.YELLOW=t.rgb(1,1,0),t.YELLOW_GREEN=t.rgb(.6,.8,.2)})(be||(be={}));var hp=Object.defineProperty,_p=Object.getOwnPropertyDescriptor,Ln=(t,e,r,i)=>{for(var s=i>1?void 0:i?_p(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&hp(e,r,s),s};class ye{constructor(e){const{exposure:r=0,gamma:i=1,pre_saturation:s=1,post_saturation:n=1}=e||{};this.exposure=r,this.gamma=i,this.pre_saturation=s,this.post_saturation=n}}Ln([y.float32],ye.prototype,"exposure",2);Ln([y.float32],ye.prototype,"gamma",2);Ln([y.float32],ye.prototype,"pre_saturation",2);Ln([y.float32],ye.prototype,"post_saturation",2);var dp=Object.defineProperty,fp=Object.getOwnPropertyDescriptor,pp=(t,e,r,i)=>{for(var s=i>1?void 0:i?fp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&dp(e,r,s),s};class at{constructor(e){const{enabled:r=!0}=e||{};this.enabled=r}}pp([y.boolean],at.prototype,"enabled",2);var mp=Object.defineProperty,gp=Object.getOwnPropertyDescriptor,Ep=(t,e,r,i)=>{for(var s=i>1?void 0:i?gp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&mp(e,r,s),s};class Vt{}Ep([y.object],Vt.prototype,"entities",2);var yp=Object.defineProperty,vp=Object.getOwnPropertyDescriptor,Jo=(t,e,r,i)=>{for(var s=i>1?void 0:i?vp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&yp(e,r,s),s};class nt{constructor(e=0){this.mode=e}}Jo([y.uint8],nt.prototype,"mode",2);var Kr=(t=>(t[t.Inherited=0]="Inherited",t[t.Hidden=1]="Hidden",t[t.Visible=2]="Visible",t))(Kr||{});const xi=class{constructor(e=!0){this.visible=e}};xi.HIDDEN=new xi(!1);xi.VISIBLE=new xi(!0);Jo([y.boolean],xi.prototype,"visible",2);let et=xi;const En=class{constructor(e=!0){this.visible=e}};En.HIDDEN=new En(!1);Jo([y.boolean],En.prototype,"visible",2);let xe=En;class yn{}var Ap=Object.defineProperty,wp=Object.getOwnPropertyDescriptor,Tp=(t,e,r,i)=>{for(var s=i>1?void 0:i?wp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ap(e,r,s),s};const ea=class fi{static layer(e){return new fi(0).with(e)}static all(){return new fi(4294967295)}static none(){return new fi(0)}constructor(e=0){this.layer=e}with(e){if(e>=fi.TOTAL_LAYERS)throw new Error("Panics when called with a layer greater than `TOTAL_LAYERS - 1`.");return this.layer|=1<<e,this}without(e){if(e>=fi.TOTAL_LAYERS)throw new Error("Panics when called with a layer greater than `TOTAL_LAYERS - 1`.");return this.layer&=1<<e,this}intersects(e){return(this.layer&e.layer)>0}};ea.TOTAL_LAYERS=32;Tp([y.uint8],ea.prototype,"layer",2);let Ut=ea;class vr extends gr{constructor(e){super();const{camera:r=new Y,computed:i=new Se,transform:s,projection:n=new J,visible_entities:o=new Vt,tonemapping:a=new it,color_grading:l=new ye,dither:c=new at,frustum:u=new ze}=e||{};this.camera=r,this.computed=i,this.transform=s,this.projection=n,this.visible_entities=o,this.tonemapping=a,this.color_grading=l,this.dither=c,this.frustum=u}}var Rp=Object.defineProperty,bp=Object.getOwnPropertyDescriptor,Oi=(t,e,r,i)=>{for(var s=i>1?void 0:i?bp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Rp(e,r,s),s};function xp(t,e,r){const i=e.sub(t).normalize(),s=t.add(i);return V.from_translation(t).look_at(s,r)}class We{static to_transform(e){return xp(e.eye,e.target,e.up)}constructor(e={}){this.eye=e.eye??v.ZERO,this.target=e.target??v.ZERO,this.up=e.up??v.Y}radius(){return this.target.sub(this.eye)._length()}look_direction(){return this.target.sub(this.eye).normalize()}}Oi([y(jt)],We.prototype,"eye",2);Oi([y(jt)],We.prototype,"target",2);Oi([y(jt)],We.prototype,"up",2);class tr{constructor(e={}){this.lag_weight=e.lag_weight??.9,this.lerp_tfm=e.lerp_tfm,this.enabled=e.enabled??!0}set_enabled(e){this.enabled=e,this.enabled&&this.reset()}set_lag_weight(e){this.lag_weight=e}smooth_transform(e){const r=this.lerp_tfm??e,i=1-this.lag_weight,s=new We({eye:r.eye.mul(this.lag_weight).add(e.eye.mul(i)),target:r.target.mul(this.lag_weight).add(e.target.mul(i)),up:e.up});return this.lerp_tfm=s,s}reset(){this.lerp_tfm=void 0}}Oi([y.float32],tr.prototype,"lag_weight",2);Oi([y.object],tr.prototype,"lerp_tfm",2);Oi([y.boolean],tr.prototype,"enabled",2);class Cc extends gr{constructor(e={}){super();const{transform:r=void 0,smoother:i=void 0}=e;this.transform=r,this.smoother=i}}class zn{static from_vector(e){const r=new zn;return r.set_direction(e),r}constructor(e={}){this.yaw=e.yaw??0,this.pitch=e.pitch??0}unit_vector(){return Ip(this.yaw,this.pitch)}set_direction(e){const[r,i]=Sp(e);this.set_yaw(r),this.set_pitch(i)}set_yaw(e){this.yaw=e%(2*Math.PI)}get_yaw(){return this.yaw}add_yaw(e){this.set_yaw(this.get_yaw()+e)}set_pitch(e){this.pitch=Math.max(Math.min(e,Math.PI/2-.01),-Math.PI/2+.01)}get_pitch(){return this.pitch}add_pitch(e){this.set_pitch(this.get_pitch()+e)}}function Sp(t){const e=v.Y,r=v.Z,i=new v(t.x,0,t.z);if(i.eq(v.ZERO))return t.dot(e)>0?[0,Math.PI/2]:[0,-Math.PI/2];let s=i.angle_between(r);t.x<0&&(s*=-1);let n=i.angle_between(t);return t.y<0&&(n*=-1),[s,n]}function Ip(t,e){let r=Ae.from_rotation_y(t).mul_vec3(v.Z),i=r.cross(v.Y);return Ae.from_axis_angle(i,e).mul_vec3(r)}class Op extends gr{constructor(e){super();const{controller:r,eye:i,target:s,up:n}=e,o=V.from_translation(i).look_at(s,n);this.controller=r,this.look_transform=new Cc({transform:new We({eye:i,target:s,up:n}),smoother:new tr({lag_weight:r.smoothing_weight})}),this.transform=o}}var Np=Object.defineProperty,Cp=Object.getOwnPropertyDescriptor,Ni=(t,e,r,i)=>{for(var s=i>1?void 0:i?Cp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Np(e,r,s),s};class dt{constructor(e={}){const{enabled:r=!0,mouse_rotate_sensitivity:i=oe.splat(.08),mouse_translate_sensitivity:s=oe.splat(.01),mouse_wheel_zoom_sensitivity:n=.2,pixels_per_line:o=53,smoothing_weight:a=.8}=e;this.enabled=r,this.mouse_rotate_sensitivity=i,this.mouse_translate_sensitivity=s,this.mouse_wheel_zoom_sensitivity=n,this.pixels_per_line=o,this.smoothing_weight=a}}Ni([y.boolean],dt.prototype,"enabled",2);Ni([y(ar)],dt.prototype,"mouse_rotate_sensitivity",2);Ni([y(ar)],dt.prototype,"mouse_translate_sensitivity",2);Ni([y.float32],dt.prototype,"mouse_wheel_zoom_sensitivity",2);Ni([y.float32],dt.prototype,"pixels_per_line",2);Ni([y.float32],dt.prototype,"smoothing_weight",2);class Mp extends gr{constructor(e){super();const{controller:r,eye:i,target:s,up:n}=e,o=V.from_translation(i).look_at(s,n);this.controller=r,this.look_transform=new Cc({transform:new We({eye:i,target:s,up:n}),smoother:new tr({lag_weight:r.smoothing_weight})}),this.transform=o}}var Pp=Object.defineProperty,Bp=Object.getOwnPropertyDescriptor,Vn=(t,e,r,i)=>{for(var s=i>1?void 0:i?Bp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Pp(e,r,s),s};class Nt{constructor(e={}){const{enabled:r=!0,mouse_rotate_sensitivity:i=oe.splat(.002),translate_sensitivity:s=2,smoothing_weight:n=.9}=e;this.enabled=r,this.mouse_rotate_sensitivity=i,this.translate_sensitivity=s,this.smoothing_weight=n}}Vn([y.boolean],Nt.prototype,"enabled",2);Vn([y(ar)],Nt.prototype,"mouse_rotate_sensitivity",2);Vn([y.float32],Nt.prototype,"translate_sensitivity",2);Vn([y.float32],Nt.prototype,"smoothing_weight",2);var dr;(t=>{class e{}t.Opaque=e;class r{}t.Mask=r;class i{}t.Blend=i;class s{}t.Premultiplied=s;class n{}t.Add=n;class o{}t.Multiply=o})(dr||(dr={}));var Be;(t=>{class e{constructor(g){const{start:m=0,end:E=100}=g||{};this.start=m,this.end=E}}t.Linear=e;class r{constructor(g){const{density:m=0}=g||{};this.density=m}}t.Exponential=r;class i{constructor(g){const{density:m=0}=g||{};this.density=m}}t.ExponentialSquared=i;class s{constructor(g){const{extinction:m,inscattering:E}=g||{};this.extinction=m,this.inscattering=E}}t.Atmospheric=s,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD=.05;function n(d,g){return Math.log(-g)/d}t.koschmieder=n;function o(d){return t.from_visibility_contrast(d,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD)}t.from_visibility=o;function a(d,g){return new r({density:t.koschmieder(d,g)})}t.from_visibility_contrast=a;function l(d){return t.from_visibility_contrast_squared(d,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD)}t.from_visibility_squared=l;function c(d,g){return new i({density:Math.sqrt(t.koschmieder(d,g)/d)})}t.from_visibility_contrast_squared=c;function u(d,g){return t.from_visibility_contrast_colors(d,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,g,g)}t.from_visibility_color=u;function h(d,g,m){return t.from_visibility_contrast_colors(d,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,g,m)}t.from_visibility_colors=h;function _(d,g,m){return t.from_visibility_contrast_colors(d,g,m,m)}t.from_visibility_contrast_color=_;function p(d,g,m,E){const A=Math.E;let[S,P,k,C]=m.as_linear_rgba_f32(),[O,D,X,te]=E.as_linear_rgba_f32();return new s({extinction:new v(Math.pow(1-S,A),Math.pow(1-P,A),Math.pow(1-k,A)).mul_assign(t.koschmieder(d,g)).mul_assign(Math.pow(C,A)),inscattering:new v(Math.pow(O,A),Math.pow(D,A),Math.pow(X,A)).mul_assign(t.koschmieder(d,g)).mul_assign(Math.pow(te,A))})}t.from_visibility_contrast_colors=p})(Be||(Be={}));var Dp=Object.defineProperty,Up=Object.getOwnPropertyDescriptor,Hn=(t,e,r,i)=>{for(var s=i>1?void 0:i?Up(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Dp(e,r,s),s};class Ge{constructor(e){const{color:r=be.rgba(1,1,1,1),directional_light_color:i=be.NONE,directional_light_exponent:s=8,falloff:n=new Be.Linear({start:0,end:100})}=e||{};this.color=r,this.directional_light_color=i,this.directional_light_exponent=s,this.falloff=n}}Hn([y.object],Ge.prototype,"color",2);Hn([y.object],Ge.prototype,"directional_light_color",2);Hn([y.float32],Ge.prototype,"directional_light_exponent",2);Hn([y.object],Ge.prototype,"falloff",2);const Fp=`
#import pbr::{
    mesh_functions,
    forward_io::{Vertex, VertexOutput},
    view_transformations::position_world_to_clip,
}

@vertex
fn vertex(vertex_no_morph: Vertex) -> VertexOutput {
    var out: VertexOutput;

#ifdef MORPH_TARGETS
    // var vertex = morph_vertex(vertex_no_morph);
#else
    var vertex = vertex_no_morph;
#endif

#ifdef SKINNED
//     var model = skinning::skin_model(vertex.joint_indices, vertex.joint_weights);
#else
    var model = mesh_functions::get_model_matrix(vertex.instance_index);
#endif

#ifdef VERTEX_NORMALS
#ifdef SKINNED
    // out.world_normal = skinning::skin_normals(model, vertex.normal);
#else
    out.world_normal = mesh_functions::mesh_normal_local_to_world(
        vertex.normal,
        vertex_no_morph.instance_index
    );
#endif
#endif

#ifdef VERTEX_POSITIONS
    out.world_position = mesh_functions::mesh_position_local_to_world(model, vec4<f32>(vertex.position, 1.0));
    out.position = position_world_to_clip(out.world_position.xyz);
#endif

#ifdef VERTEX_UVS
    out.uv = vertex.uv;
#endif

#ifdef VERTEX_TANGENTS
    out.world_tangent = mesh_functions::mesh_tangent_local_to_world(
        model,
        vertex.tangent,
        vertex_no_morph
    );
#endif

#ifdef VERTEX_COLORS
    out.color = vertex.color;
#endif

    return out;
}

@fragment
fn fragment(
    mesh: VertexOutput,
) -> @location(0) vec4<f32> {
#ifdef VERTEX_COLORS
    return mesh.color;
#else
    return vec4<f32>(1.0, 0.0, 1.0, 1.0);
#endif
}
`,Lp=`
#import pbr::{
    pbr_functions::alpha_discard,
    pbr_fragment::pbr_input_from_standard_material,
}

#ifdef PREPASS_PIPELINE
#import pbr::{
    prepass_io::{VertexOutput, FragmentOutput},
    pbr_deferred_functions::deferred_output,
}
#else
#import pbr::{
    forward_io::{VertexOutput, FragmentOutput},
    pbr_functions::{apply_pbr_lighting, main_pass_post_lighting_processing},
    pbr_types::STANDARD_MATERIAL_FLAGS_UNLIT_BIT,
}
#endif

@fragment
fn fragment(
    in: VertexOutput,
    @builtin(front_facing) is_front: bool,
) -> FragmentOutput {
    // generate a PbrInput struct from the StandardMaterial bindings
    var pbr_input = pbr_input_from_standard_material(in, is_front);

    // alpha discard
    pbr_input.material.base_color = alpha_discard(pbr_input.material, pbr_input.material.base_color);

#ifdef PREPASS_PIPELINE
    // write the gbuffer, lighting pass id, and optionally normal and motion_vector textures
    // let out = deferred_output(in, pbr_input);
#else
    // in forward mode, we calculate the lit color immediately, and then apply some post-lighting effects here.
    // in deferred mode the lit color and these effects will be calculated in the deferred lighting shader
    var out: FragmentOutput;
    if (u32(pbr_input.material.flags) & STANDARD_MATERIAL_FLAGS_UNLIT_BIT) == 0u {
        out.color = apply_pbr_lighting(pbr_input);
        // out.color = vec4(vec3(in.position.z * 20.0), 1.0);
    } else {
        out.color = pbr_input.material.base_color;
    }

    // apply in-shader post processing (fog, alpha-premultiply, and also tonemapping, debanding if the camera is non-hdr)
    // note this does not include fullscreen postprocessing effects like bloom.
    out.color = main_pass_post_lighting_processing(pbr_input, out.color);
#endif

    return out;
}
`;var zp=Object.defineProperty,Vp=Object.getOwnPropertyDescriptor,ee=(t,e,r,i)=>{for(var s=i>1?void 0:i?Vp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&zp(e,r,s),s};class H{constructor(e){const{vertex_shader:r=Fp,fragment_shader:i=Lp,base_color:s=be.WHITE,base_color_texture:n,emissive:o=be.BLACK,emissive_texture:a,perceptual_roughness:l=.5,metallic:c=0,metallic_roughness_texture:u,reflectance:h=.5,diffuse_transmission:_=0,diffuse_transmission_texture:p,specular_transmission:d=0,specular_transmission_texture:g,thickness:m=0,thickness_texture:E,ior:A=1.5,attenuation_distance:S=1/0,attenuation_color:P=be.WHITE,normal_map_texture:k,flip_normal_map_y:C=!1,occlusion_texture:O,double_sided:D=!1,fog_enabled:X=!0,alpha_mode:te=new dr.Opaque,depth_bias:K=0,depth_map:ce,parallax_depth_scale:Ie=.1,max_parallax_layer_count:_e=16,deferred_lighting_pass_id:Oe=1,opaque_render_method:ie=2,unlit:Or=!1}=e||{};this.vertex_shader=r,this.fragment_shader=i,this.base_color=s,this.base_color_texture=n,this.emissive=o,this.emissive_texture=a,this.perceptual_roughness=l,this.metallic=c,this.metallic_roughness_texture=u,this.reflectance=h,this.diffuse_transmission=_,this.diffuse_transmission_texture=p,this.specular_transmission=d,this.specular_transmission_texture=g,this.thickness=m,this.thickness_texture=E,this.ior=A,this.attenuation_distance=S,this.attenuation_color=P,this.normal_map_texture=k,this.flip_normal_map_y=C,this.occlusion_texture=O,this.double_sided=D,this.fog_enabled=X,this.alpha_mode=te,this.depth_bias=K,this.depth_map=ce,this.parallax_depth_scale=Ie,this.max_parallax_layer_count=_e,this.deferred_lighting_pass_id=Oe,this.opaque_render_method=ie,this.unlit=Or}}ee([y.object],H.prototype,"vertex_shader",2);ee([y.object],H.prototype,"fragment_shader",2);ee([y.object],H.prototype,"base_color",2);ee([y.object],H.prototype,"base_color_texture",2);ee([y.object],H.prototype,"emissive",2);ee([y.object],H.prototype,"emissive_texture",2);ee([y.float32],H.prototype,"perceptual_roughness",2);ee([y.float32],H.prototype,"metallic",2);ee([y.object],H.prototype,"metallic_roughness_texture",2);ee([y.float32],H.prototype,"reflectance",2);ee([y.float32],H.prototype,"diffuse_transmission",2);ee([y.object],H.prototype,"diffuse_transmission_texture",2);ee([y.float32],H.prototype,"specular_transmission",2);ee([y.object],H.prototype,"specular_transmission_texture",2);ee([y.float32],H.prototype,"thickness",2);ee([y.object],H.prototype,"thickness_texture",2);ee([y.float32],H.prototype,"ior",2);ee([y.float32],H.prototype,"attenuation_distance",2);ee([y.object],H.prototype,"attenuation_color",2);ee([y.object],H.prototype,"normal_map_texture",2);ee([y.boolean],H.prototype,"flip_normal_map_y",2);ee([y.object],H.prototype,"occlusion_texture",2);ee([y.boolean],H.prototype,"double_sided",2);ee([y.uint8],H.prototype,"cull_mode",2);ee([y.boolean],H.prototype,"unlit",2);ee([y.boolean],H.prototype,"fog_enabled",2);ee([y.object],H.prototype,"alpha_mode",2);ee([y.float32],H.prototype,"depth_bias",2);ee([y.object],H.prototype,"depth_map",2);ee([y.float32],H.prototype,"parallax_depth_scale",2);ee([y.float32],H.prototype,"max_parallax_layer_count",2);ee([y.uint8],H.prototype,"opaque_render_method",2);ee([y.uint8],H.prototype,"deferred_lighting_pass_id",2);var Te;(t=>{const r=32-up(7);t.BASE_COLOR_TEXTURE=1,t.EMISSIVE_TEXTURE=2,t.METALLIC_ROUGHNESS_TEXTURE=4,t.OCCLUSION_TEXTURE=8,t.DOUBLE_SIDED=16,t.UNLIT=32,t.TWO_COMPONENT_NORMAL_MAP=64,t.FLIP_NORMAL_MAP_Y=128,t.FOG_ENABLED=256,t.DEPTH_MAP=512,t.SPECULAR_TRANSMISSION_TEXTURE=1024,t.THICKNESS_TEXTURE=2048,t.DIFFUSE_TRANSMISSION_TEXTURE=4096,t.ATTENUATION_ENABLED=8192,t.ALPHA_MODE_RESERVED_BITS=7<<r,t.ALPHA_MODE_OPAQUE=0<<r,t.ALPHA_MODE_MASK=1<<r,t.ALPHA_MODE_BLEND=2<<r,t.ALPHA_MODE_PREMULTIPLIED=3<<r,t.ALPHA_MODE_ADD=4<<r,t.ALPHA_MODE_MULTIPLY=5<<r,t.NONE=0,t.UNINITIALIZED=65535})(Te||(Te={}));class rr extends gr{constructor(e){super();const{mesh:r,material:i,transform:s,visibility:n=new nt,inherited_visibility:o=new et,view_visibility:a=new xe}=e||{};this.mesh=r,this.material=i,this.transform=s,this.visibility=n,this.inherited_visibility=o,this.view_visibility=a}}var Hp=Object.defineProperty,kp=Object.getOwnPropertyDescriptor,Mc=(t,e,r,i)=>{for(var s=i>1?void 0:i?kp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Hp(e,r,s),s};class Gt{constructor(e){const{color:r=be.rgb(1,1,1),brightness:i=.05}=e||{};this.color=r,this.brightness=i}}Mc([y.object],Gt.prototype,"color",2);Mc([y.float32],Gt.prototype,"brightness",2);var Wp=Object.defineProperty,Xp=Object.getOwnPropertyDescriptor,ti=(t,e,r,i)=>{for(var s=i>1?void 0:i?Xp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Wp(e,r,s),s};const cr=class Mo{constructor(e){const{color:r=be.rgb(1,1,1),intensity:i=800,range:s=20,radius:n=0,shadows_enabled:o=!1,shadow_depth_bias:a=Mo.DEFAULT_SHADOW_DEPTH_BIAS,shadow_normal_bias:l=Mo.DEFAULT_SHADOW_NORMAL_BIAS}=e||{};this.color=r,this.intensity=i,this.range=s,this.radius=n,this.shadows_enabled=o,this.shadow_depth_bias=a,this.shadow_normal_bias=l}};cr.DEFAULT_SHADOW_DEPTH_BIAS=.02;cr.DEFAULT_SHADOW_NORMAL_BIAS=.6;ti([y.object],cr.prototype,"color",2);ti([y.float32],cr.prototype,"intensity",2);ti([y.float32],cr.prototype,"range",2);ti([y.float32],cr.prototype,"radius",2);ti([y.boolean],cr.prototype,"shadows_enabled",2);ti([y.float32],cr.prototype,"shadow_depth_bias",2);ti([y.float32],cr.prototype,"shadow_normal_bias",2);let Pc=cr;var $p=Object.defineProperty,jp=Object.getOwnPropertyDescriptor,Ar=(t,e,r,i)=>{for(var s=i>1?void 0:i?jp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&$p(e,r,s),s};const qt=class Po{constructor(e){const{color:r=be.rgb(1,1,1),intensity:i=800,range:s=20,radius:n=0,shadows_enabled:o=!1,shadow_depth_bias:a=Po.DEFAULT_SHADOW_DEPTH_BIAS,shadow_normal_bias:l=Po.DEFAULT_SHADOW_NORMAL_BIAS,outer_angle:c=Math.PI/4,inner_angle:u=0}=e||{};this.color=r,this.intensity=i,this.range=s,this.radius=n,this.shadows_enabled=o,this.shadow_depth_bias=a,this.shadow_normal_bias=l,this.outer_angle=c,this.inner_angle=u}};qt.DEFAULT_SHADOW_DEPTH_BIAS=.02;qt.DEFAULT_SHADOW_NORMAL_BIAS=1.8;Ar([y.object],qt.prototype,"color",2);Ar([y.float32],qt.prototype,"intensity",2);Ar([y.float32],qt.prototype,"range",2);Ar([y.float32],qt.prototype,"radius",2);Ar([y.boolean],qt.prototype,"shadows_enabled",2);Ar([y.float32],qt.prototype,"shadow_depth_bias",2);Ar([y.float32],qt.prototype,"shadow_normal_bias",2);Ar([y.float32],qt.prototype,"outer_angle",2);Ar([y.float32],qt.prototype,"inner_angle",2);var qp=Object.defineProperty,Yp=Object.getOwnPropertyDescriptor,ws=(t,e,r,i)=>{for(var s=i>1?void 0:i?Yp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&qp(e,r,s),s};const Xr=class Bo{constructor(e){const{color:r=be.rgb(1,1,1),illuminance:i=1e5,shadows_enabled:s=!1,shadow_depth_bias:n=Bo.DEFAULT_SHADOW_DEPTH_BIAS,shadow_normal_bias:o=Bo.DEFAULT_SHADOW_NORMAL_BIAS}=e||{};this.color=r,this.illuminance=i,this.shadows_enabled=s,this.shadow_depth_bias=n,this.shadow_normal_bias=o}};Xr.DEFAULT_SHADOW_DEPTH_BIAS=.02;Xr.DEFAULT_SHADOW_NORMAL_BIAS=1.8;ws([y.object],Xr.prototype,"color",2);ws([y.float32],Xr.prototype,"illuminance",2);ws([y.boolean],Xr.prototype,"shadows_enabled",2);ws([y.float32],Xr.prototype,"shadow_depth_bias",2);ws([y.float32],Xr.prototype,"shadow_normal_bias",2);let Xe=Xr;class Do{constructor(e=2048){this.size=e}}var Kp=Object.defineProperty,Qp=Object.getOwnPropertyDescriptor,$r=(t,e,r,i)=>{for(var s=i>1?void 0:i?Qp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Kp(e,r,s),s};class tt{}$r([y.object],tt.prototype,"color",2);$r([y.float32],tt.prototype,"illuminance",2);$r([y.boolean],tt.prototype,"shadows_enabled",2);$r([y.float32],tt.prototype,"shadow_depth_bias",2);$r([y.float32],tt.prototype,"shadow_normal_bias",2);$r([y.object],tt.prototype,"transform",2);$r([y.object],tt.prototype,"cascade_shadow_config",2);$r([y.object],tt.prototype,"cascades",2);var Zp=Object.defineProperty,Gp=Object.getOwnPropertyDescriptor,Bc=(t,e,r,i)=>{for(var s=i>1?void 0:i?Gp(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Zp(e,r,s),s};const ta=class Js{constructor(e=v.ZERO,r=v.ZERO){this.center=e,this.half_extents=r}static from(e){return new Js(e.center,v.splat(e.radius))}static from_min_max(e,r){const i=r.add(e).mul(.5),s=r.sub(e).mul(.5);return new Js(i,s)}static enclosing(e){let r=v.MAX,i=v.MIN;return e.forEach(s=>{r=r.min(v.from_array(s)),i=i.max(v.from_array(s))}),Js.from_min_max(r,i)}relative_radius(e,r){let i=this.half_extents;return new v(e.dot(r.x_axis),e.dot(r.y_axis),e.dot(r.z_axis)).abs().dot(i)}};Bc([y(jt)],ta.prototype,"center",2);Bc([y(jt)],ta.prototype,"half_extents",2);let Ht=ta;var Jp=Object.defineProperty,em=Object.getOwnPropertyDescriptor,tm=(t,e,r,i)=>{for(var s=i>1?void 0:i?em(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Jp(e,r,s),s};class zr{constructor(){this.frusta=new Map}}tm([y.object],zr.prototype,"frusta",2);var rm=Object.defineProperty,im=Object.getOwnPropertyDescriptor,sm=(t,e,r,i)=>{for(var s=i>1?void 0:i?im(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&rm(e,r,s),s};class Dc{}sm([y.object],Dc.prototype,"frusta",2);var nm=Object.defineProperty,om=Object.getOwnPropertyDescriptor,ra=(t,e,r,i)=>{for(var s=i>1?void 0:i?om(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&nm(e,r,s),s};class Xt{constructor(e){const{bounds:r=[0,0,0,0],overlap_proportion:i=.4,minimum_distance:s=0}=e||{};this.bounds=r,this.overlap_proportion=i,this.minimum_distance=s}}ra([y.object],Xt.prototype,"bounds",2);ra([y.float32],Xt.prototype,"overlap_proportion",2);ra([y.float32],Xt.prototype,"minimum_distance",2);class am{constructor(e){const{num_cascades:r=4,minimum_distance:i=.1,maximum_distance:s=1e3,first_cascade_far_bound:n=5,overlap_proportion:o=.2}=e||{};this.num_cascades=r,this.minimum_distance=i,this.maximum_distance=s,this.first_cascade_far_bound=n,this.overlap_proportion=o}build(){return new Xt({bounds:lm(this.num_cascades,this.first_cascade_far_bound,this.maximum_distance),overlap_proportion:this.overlap_proportion,minimum_distance:this.minimum_distance})}}function lm(t,e,r){if(t===1)return[r];const i=Math.pow(r/e,1/(t-1));return new Array(t).fill(void 0).map((s,n)=>e*Math.pow(i,n))}var cm=Object.defineProperty,um=Object.getOwnPropertyDescriptor,Ts=(t,e,r,i)=>{for(var s=i>1?void 0:i?um(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&cm(e,r,s),s};class Ci{constructor(e){const{view_transform:r=_t.IDENTITY,projection:i=_t.IDENTITY,view_projection:s=_t.IDENTITY,texel_size:n=0}=e||{};this.view_transform=r,this.projection=i,this.view_projection=s,this.texel_size=n}}Ts([y(Nn)],Ci.prototype,"view_transform",2);Ts([y(Nn)],Ci.prototype,"projection",2);Ts([y(Nn)],Ci.prototype,"view_projection",2);Ts([y.float32],Ci.prototype,"texel_size",2);class vt{constructor(e){const{cascades:r=new Map}=e||{};this.cascades=r}}Ts([y.object],vt.prototype,"cascades",2);var hm=Object.defineProperty,_m=Object.getOwnPropertyDescriptor,dm=(t,e,r,i)=>{for(var s=i>1?void 0:i?_m(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&hm(e,r,s),s};class Si{constructor(){this.entities=new Map}}dm([y.object],Si.prototype,"entities",2);class fm extends gr{constructor(e){super();const{directional_light:r=new Xe,frusta:i=new zr,cascades:s=new vt,cascade_shadow_config:n=new Xt,visible_entities:o=new Si,transform:a,visibility:l=new nt,inherited_visibility:c=new et,view_visibility:u=new xe}=e||{};this.directional_light=r,this.frusta=i,this.cascades=s,this.cascade_shadow_config=n,this.visible_entities=o,this.transform=a,this.visibility=l,this.inherited_visibility=c,this.view_visibility=u}}var pm=Object.defineProperty,mm=Object.getOwnPropertyDescriptor,kn=(t,e,r,i)=>{for(var s=i>1?void 0:i?mm(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&pm(e,r,s),s};class Ft{constructor(e){const{tile_size:r=oe.ONE,dimensions:i=v.ZERO,near:s=0,far:n=0}=e??{};this.tile_size=r,this.dimensions=i,this.near=s,this.far=n}update(e,r){let i=e.div(r.xy()).ceil().max(oe.ONE);this.tile_size=i,this.dimensions=e.div(i).ceil().extend(r.z).max(v.ONE)}clear(){this.tile_size=oe.ONE,this.dimensions=v.ZERO,this.near=0,this.far=0}}kn([y(ar)],Ft.prototype,"tile_size",2);kn([y(jt)],Ft.prototype,"dimensions",2);kn([y.float32],Ft.prototype,"near",2);kn([y.float32],Ft.prototype,"far",2);var gm=Object.defineProperty,Em=Object.getOwnPropertyDescriptor,Mi=(t,e,r,i)=>{for(var s=i>1?void 0:i?Em(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&gm(e,r,s),s};class ir{constructor(e){const{strategy:r=3,dimensions:i=v.ZERO,z_config:s={first_slice_depth:5,far_z_mode:0},dynamic_resizing:n=!0,total:o=4096,z_slices:a=24}=e??{};this.strategy=r,this.dimensions=i,this.z_config=s,this.dynamic_resizing=n,this.total=o,this.z_slices=a}dimensions_for_screen_size(e){if(this.strategy===0)return v.ZERO;if(this.strategy===1)return v.ONE;if(this.strategy===2)return this.dimensions;if(this.strategy===3){let{total:r,z_slices:i}=this,s=e.x/e.y;r<i&&(i=r);let n=r/i,o=Math.sqrt(n/s),a=o*s;return a==0&&(a=1,o=n),o==0&&(a=n,o=1),new v(a,o,i)}}first_slice_depth(){if(this.strategy===0||this.strategy===1)return 0;if(this.strategy===3||this.strategy===2)return this.z_config.first_slice_depth}far_z_mode(){if(this.strategy===0)return 1;if(this.strategy===1)return 0;{const{z_config:e}=this;return e.far_z_mode}}}Mi([y.uint8],ir.prototype,"strategy",2);Mi([y(jt)],ir.prototype,"dimensions",2);Mi([y.object],ir.prototype,"z_config",2);Mi([y.boolean],ir.prototype,"dynamic_resizing",2);Mi([y.uint32],ir.prototype,"total",2);Mi([y.uint32],ir.prototype,"z_slices",2);var ym=Object.defineProperty,vm=Object.getOwnPropertyDescriptor,Am=(t,e,r,i)=>{for(var s=i>1?void 0:i?vm(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&ym(e,r,s),s};function Uc(t){return t==0?1:2*t+1+Uc(t-1)}const wm=0,Tm=3,Rm=Uc(wm),bm=Rm*Tm+3&-4;class Rs{constructor(e){const{coefficients:r=new Array(bm).fill(0)}=e||{};this.coefficients=r}}Am([y.object],Rs.prototype,"coefficients",2);var xm=Object.defineProperty,Sm=Object.getOwnPropertyDescriptor,Wn=(t,e,r,i)=>{for(var s=i>1?void 0:i?Sm(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&xm(e,r,s),s};class Pi{constructor(e){const{rotation:r=new na,position_visibility:i=new sa,scale_opacity:s=new aa,spherical_harmonic:n=new Rs}=e||{};this.rotation=r,this.position_visibility=i,this.scale_opacity=s,this.spherical_harmonic=n}}Wn([y.object],Pi.prototype,"rotation",2);Wn([y.object],Pi.prototype,"position_visibility",2);Wn([y.object],Pi.prototype,"scale_opacity",2);Wn([y.object],Pi.prototype,"spherical_harmonic",2);var Im=Object.defineProperty,Om=Object.getOwnPropertyDescriptor,Xn=(t,e,r,i)=>{for(var s=i>1?void 0:i?Om(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Im(e,r,s),s};const Fc=class Lc{constructor(e){const{rotation:r=[0,0],scale_opacity:i=[1,1]}=e||{};this.rotation=r,this.scale_opacity=i}from_gaussian(e){return new Lc({rotation:[Pr(e.rotation.rotation[0],e.rotation.rotation[1]),Pr(e.rotation.rotation[2],e.rotation.rotation[3])],scale_opacity:[Pr(e.scale_opacity.scale[0],e.scale_opacity.scale[1]),Pr(e.scale_opacity.scale[2],e.scale_opacity.opacity)]})}to_rotation(){const[e,r]=Br(this.rotation[0]),[i,s]=Br(this.rotation[1]);return new na({rotation:[e,r,i,s]})}to_scale_opacity(){const[e,r]=Br(this.scale_opacity[0]),[i,s]=Br(this.scale_opacity[1]);return new aa({scale:[e,r,i],opacity:s})}};Xn([y.float32.vector(2)],Fc.prototype,"rotation",2);Xn([y.float32],Fc.prototype,"scale_opacity",2);function Pr(t,e){return Nm(t,e)}function Nm(t,e){const r=(t&65535)<<16,i=e&65535;return(r|i)>>>0}function Cm(t){const e=t>>16,r=t&65535;return[e,r]}function Br(t){const[e,r]=Cm(t);return[e,r]}const zc=class Vc{constructor(e){const{cov3d:r=[0,0,0],opacity:i=1}=e||{};this.cov3d=r,this.opacity=i}static from_gaussian(e){const r=_l.from(e).cov3d,i=e.scale_opacity.opacity;return new Vc({cov3d:[Pr(r[0],r[1]),Pr(r[2],r[3]),Pr(r[4],r[5])],opacity:Pr(i,i)})}covariance_3d_opacity(){const[e,r]=Br(this.cov3d[0]),[i,s]=Br(this.cov3d[1]),[n,o]=Br(this.cov3d[2]),[a,l]=Br(this.opacity),c=[e,r,i,s,n,o];return new _l({cov3d:c,opacity:a,pad:0})}};Xn([y.uint32.vector(3)],zc.prototype,"cov3d",2);Xn([y.uint32],zc.prototype,"opacity",2);var Mm=Object.defineProperty,Pm=Object.getOwnPropertyDescriptor,jr=(t,e,r,i)=>{for(var s=i>1?void 0:i?Pm(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Mm(e,r,s),s};const ia=class Hc{constructor(e){const{position:r=[0,0,0],visibility:i=0}=e||{};this.position=r,this.visibility=i}from(e){return new Hc({position:[e[0],e[1],e[2]],visibility:e[3]})}};jr([y.float32.vector(3)],ia.prototype,"position",2);jr([y.float32],ia.prototype,"visibility",2);let sa=ia;const kc=class Wc{constructor(e){const{rotation:r=[0,0,0,1]}=e||{};this.rotation=r}from(e){return new Wc({rotation:e})}};jr([y.float32.vector(4)],kc.prototype,"rotation",2);let na=kc;const oa=class Xc{constructor(e){const{scale:r=[1,1,1],opacity:i=1}=e||{};this.scale=r,this.opacity=i}from(e){return new Xc({scale:[e[0],e[1],e[2]],opacity:e[3]})}};jr([y.float32.vector(3)],oa.prototype,"scale",2);jr([y.float32],oa.prototype,"opacity",2);let aa=oa;const $n=class $c{constructor(e){const{cov3d:r=[0,0,0,0,0,0],opacity:i=1,pad:s=0}=e||{};this.cov3d=r,this.opacity=i,this.pad=s}static from(e){const r=Bm(new I(...e.rotation.rotation),new v(...e.scale_opacity.scale));return new $c({cov3d:r,opacity:e.scale_opacity.opacity,pad:0})}};jr([y.float32.vector(6)],$n.prototype,"cov3d",2);jr([y.float32],$n.prototype,"opacity",2);jr([y.float32],$n.prototype,"pad",2);let _l=$n;function Bm(t,e){const r=Ae.from_diagonal(e),i=t.x,s=t.y,n=t.z,o=t.w,a=Ae.from_cols(new v(1-2*(n*n+o*o),2*(s*n-i*o),2*(s*o+i*n)),new v(2*(s*n+i*o),1-2*(s*s+o*o),2*(n*o-i*s)),new v(2*(s*o-i*n),2*(n*o+i*s),1-2*(s*s+n*n))),l=r.mul_mat3(a),c=l.transpose().mul_mat3(l);return[c.row(0).x,c.row(0).y,c.row(0).z,c.row(1).y,c.row(1).z,c.row(2).z]}function dl(t,e,r){return[...t,...Array(Math.max(e-t.length,0)).fill(r)]}var Dm=Object.defineProperty,Um=Object.getOwnPropertyDescriptor,jn=(t,e,r,i)=>{for(var s=i>1?void 0:i?Um(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Dm(e,r,s),s};const bs=class jc{static from_gaussians(e){const r=[],i=[],s=[],n=[];for(const a of e)r.push(a.position_visibility),i.push(a.spherical_harmonic),s.push(a.rotation),n.push(a.scale_opacity);return new jc({position_visibility:r,spherical_harmonic:i,rotation:s,scale_opacity:n})}constructor(e){const{position_visibility:r=[],spherical_harmonic:i=[],rotation:s=[],scale_opacity:n=[]}=e||{};this.position_visibility=r,this.spherical_harmonic=i,this.rotation=s,this.scale_opacity=n}is_empty(){return this.position_visibility.length===0}len(){return this.position_visibility.length}len_sqrt_ceil(){return Math.ceil(Math.sqrt(this.len()))}square_len(){return Math.pow(this.len_sqrt_ceil(),2)}resize_to_square(){dl(this.position_visibility,this.square_len(),new sa),dl(this.spherical_harmonic,this.square_len(),new Rs)}};jn([y.object],bs.prototype,"position_visibility",2);jn([y.object],bs.prototype,"spherical_harmonic",2);jn([y.object],bs.prototype,"rotation",2);jn([y.object],bs.prototype,"scale_opacity",2);let At=bs;var Fm=Object.defineProperty,Lm=Object.getOwnPropertyDescriptor,ri=(t,e,r,i)=>{for(var s=i>1?void 0:i?Lm(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Fm(e,r,s),s},qc=(t=>(t[t.None=0]="None",t[t.Radix=1]="Radix",t[t.Rayon=2]="Rayon",t[t.Std=3]="Std",t))(qc||{});class qe{constructor(e){const{aabb:r=!1,global_scale:i=1,global_transform:s=new q,visualize_bounding_box:n=!1,visualize_depth:o=!1,sort_mode:a=3,draw_mode:l=0}=e||{};this.aabb=r,this.global_scale=i,this.global_transform=s,this.visualize_bounding_box=n,this.visualize_depth=o,this.sort_mode=a,this.draw_mode=l}}ri([y.boolean],qe.prototype,"aabb",2);ri([y.float32],qe.prototype,"global_scale",2);ri([y.object],qe.prototype,"global_transform",2);ri([y.boolean],qe.prototype,"visualize_bounding_box",2);ri([y.boolean],qe.prototype,"visualize_depth",2);ri([y.uint8],qe.prototype,"sort_mode",2);ri([y.uint8],qe.prototype,"draw_mode",2);class zm extends gr{constructor(e){super();const{settings:r=new qe,cloud:i=new At,visibility:s=new nt}=e||{};this.settings=r,this.cloud=i,this.visibility=s}}var Vm=Object.defineProperty,Hm=Object.getOwnPropertyDescriptor,la=(t,e,r,i)=>{for(var s=i>1?void 0:i?Hm(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Vm(e,r,s),s};class ca{constructor(e={}){this.key=e.key||0,this.index=e.index||0}}la([y.uint32],ca.prototype,"key",2);la([y.uint32],ca.prototype,"index",2);class Ct{constructor(e={}){this.sorted=e.sorted||[]}}la([y.object],Ct.prototype,"sorted",2);class km{constructor(e){this.currentBufferWordSize=-1,this.currentWordOffset=0,this.buffer=null,this.shadowBufferF32=null,this.shadowBufferU8=null,this.device=e;const r=e.queryLimits();this.uniformBufferWordAlignment=r.uniformBufferWordAlignment,this.uniformBufferMaxPageWordSize=r.uniformBufferMaxPageWordSize}isSupportedUBO(){return this.device.queryVendorInfo().platformString!=="WebGL1"}findPageIndex(e){return e/this.uniformBufferMaxPageWordSize|0}allocateChunk(e){e=Vi(e,this.uniformBufferWordAlignment),U(e<this.uniformBufferMaxPageWordSize);let r=this.currentWordOffset;return this.findPageIndex(r)!==this.findPageIndex(r+e-1)&&(r=Vi(r,this.uniformBufferMaxPageWordSize)),this.currentWordOffset=r+e,this.ensureShadowBuffer(r,e),r}ensureShadowBuffer(e,r){if(this.shadowBufferU8===null||this.shadowBufferF32===null){const i=Vi(this.currentWordOffset,this.uniformBufferMaxPageWordSize);this.shadowBufferU8=new Uint8Array(i*4),this.shadowBufferF32=new Float32Array(this.shadowBufferU8.buffer)}else if(e+r>=this.shadowBufferF32.length){U(e<this.currentWordOffset&&e+r<=this.currentWordOffset);const i=Vi(Math.max(this.currentWordOffset,this.shadowBufferF32.length*2),this.uniformBufferMaxPageWordSize),s=new Uint8Array(i*4);if(s.set(this.shadowBufferU8,0),this.shadowBufferU8=s,this.shadowBufferF32=new Float32Array(this.shadowBufferU8.buffer),!(this.currentWordOffset<=i))throw new Error(`Assert fail: this.currentWordOffset [${this.currentWordOffset}] <= newWordCount [${i}]`)}}mapBufferF32(){return Ne(this.shadowBufferF32)}mapBufferU8(){return Ne(this.shadowBufferU8)}prepareToRender(){if(this.shadowBufferF32===null)return;const e=Ne(this.shadowBufferF32);e.length!==this.currentBufferWordSize&&(this.currentBufferWordSize=e.length,this.buffer!==null&&this.buffer.destroy(),this.buffer=this.device.createBuffer({viewOrSize:this.currentBufferWordSize*4,usage:re.UNIFORM,hint:Lr.DYNAMIC}));const r=Vi(this.currentWordOffset,this.uniformBufferMaxPageWordSize);if(!(r<=this.currentBufferWordSize))throw new Error(`Assert fail: wordCount [${r}] (${this.currentWordOffset} aligned ${this.uniformBufferMaxPageWordSize}) <= this.currentBufferWordSize [${this.currentBufferWordSize}]`);this.isSupportedUBO()&&Ne(this.buffer).setSubData(0,this.shadowBufferU8,0,r*4),this.currentWordOffset=0}destroy(){this.buffer!==null&&this.buffer.destroy(),this.shadowBufferF32=null,this.shadowBufferU8=null}}function Z(t,e){return t+=e,t+=t<<10,t+=t>>>6,t>>>0}function Yc(t){return t+=t<<3,t^=t>>>11,t+=t<<15,t>>>0}function ao(t){return 0}class Wm{constructor(){this.keys=[],this.values=[]}}class ji{constructor(e,r){this.keyEqualFunc=e,this.keyHashFunc=r,this.buckets=new Map}findBucketIndex(e,r){for(let i=0;i<e.keys.length;i++)if(this.keyEqualFunc(r,e.keys[i]))return i;return-1}findBucket(e){const r=this.keyHashFunc(e);return this.buckets.get(r)}get(e){const r=this.findBucket(e);if(r===void 0)return null;const i=this.findBucketIndex(r,e);return i<0?null:r.values[i]}add(e,r){const i=this.keyHashFunc(e);this.buckets.get(i)===void 0&&this.buckets.set(i,new Wm);const s=this.buckets.get(i);s.keys.push(e),s.values.push(r)}delete(e){const r=this.findBucket(e);if(r===void 0)return;const i=this.findBucketIndex(r,e);i!==-1&&(r.keys.splice(i,1),r.values.splice(i,1))}clear(){this.buckets.clear()}size(){let e=0;for(const r of this.buckets.values())e+=r.values.length;return e}*values(){for(const e of this.buckets.values())for(let r=e.values.length-1;r>=0;r--)yield e.values[r]}}function Xm(t,e){const r=e.defines!==void 0?e.defines:null,i=e.both!==void 0?e.both+e.vert:e.vert,s=e.both!==void 0?e.both+e.frag:e.frag;return A_(t.queryVendorInfo(),i,s,r)}function $m(t,e){return U(t.preprocessedVert!==""&&e.preprocessedVert!==""),U(t.preprocessedFrag!==""&&e.preprocessedFrag!==""),t.preprocessedVert===e.preprocessedVert&&t.preprocessedFrag===e.preprocessedFrag}function jm(t){const e=t.preprocessedVert,r=t.preprocessedFrag,i=t.vert,s=t.frag;return{preprocessedVert:e,preprocessedFrag:r,vert:i,frag:s}}function fl(t,e){return t=Z(t,e.blendMode),t=Z(t,e.blendSrcFactor),t=Z(t,e.blendDstFactor),t}function qm(t,e){return t=fl(t,e.rgbBlendState),t=fl(t,e.alphaBlendState),t=Z(t,e.channelWriteMask),t}function Ym(t,e){return t=Z(t,e.r<<24|e.g<<16|e.b<<8|e.a),t}function Km(t,e){var r,i,s,n,o,a,l,c;for(let u=0;u<e.attachmentsState.length;u++)t=qm(t,e.attachmentsState[u]);return t=Ym(t,e.blendConstant),t=Z(t,e.depthCompare),t=Z(t,e.depthWrite?1:0),t=Z(t,(r=e.stencilFront)==null?void 0:r.compare),t=Z(t,(i=e.stencilFront)==null?void 0:i.passOp),t=Z(t,(s=e.stencilFront)==null?void 0:s.failOp),t=Z(t,(n=e.stencilFront)==null?void 0:n.depthFailOp),t=Z(t,(o=e.stencilBack)==null?void 0:o.compare),t=Z(t,(a=e.stencilBack)==null?void 0:a.passOp),t=Z(t,(l=e.stencilBack)==null?void 0:l.failOp),t=Z(t,(c=e.stencilBack)==null?void 0:c.depthFailOp),t=Z(t,e.stencilWrite?1:0),t=Z(t,e.cullMode),t=Z(t,e.frontFace?1:0),t=Z(t,e.polygonOffset?1:0),t}function Qm(t){let e=0;e=Z(e,t.program.id),t.inputLayout!==null&&(e=Z(e,t.inputLayout.id)),e=Km(e,t.megaStateDescriptor);for(let r=0;r<t.colorAttachmentFormats.length;r++)e=Z(e,t.colorAttachmentFormats[r]||0);return e=Z(e,t.depthStencilAttachmentFormat||0),Yc(e)}function Zm(t){let e=0;for(let r=0;r<t.samplerBindings.length;r++){const i=t.samplerBindings[r];i!==null&&i.texture!==null&&(e=Z(e,i.texture.id))}for(let r=0;r<t.uniformBufferBindings.length;r++){const i=t.uniformBufferBindings[r];i!==null&&i.buffer!==null&&(e=Z(e,i.buffer.id),e=Z(e,i.binding),e=Z(e,i.offset),e=Z(e,i.size))}for(let r=0;r<t.storageBufferBindings.length;r++){const i=t.storageBufferBindings[r];i!==null&&i.buffer!==null&&(e=Z(e,i.buffer.id),e=Z(e,i.binding),e=Z(e,i.offset),e=Z(e,i.size))}for(let r=0;r<t.storageTextureBindings.length;r++){const i=t.storageTextureBindings[r];i!==null&&i.texture!==null&&(e=Z(e,i.texture.id),e=Z(e,i.binding))}return Yc(e)}class Gm{constructor(e){this.bindingsCache=new ji(Yh,Zm),this.renderPipelinesCache=new ji(Gh,Qm),this.inputLayoutsCache=new ji(t_,ao),this.programCache=new ji($m,ao),this.samplerCache=new ji(r_,ao),this.device=e}createBindings(e){let r=this.bindingsCache.get(e);if(r===null){const i=n_(e);i.uniformBufferBindings=i.uniformBufferBindings.filter(({size:s})=>s>0),r=this.device.createBindings(i),this.bindingsCache.add(i,r)}return r}createRenderPipeline(e){let r=this.renderPipelinesCache.get(e);if(r===null){const i=o_(e);i.colorAttachmentFormats=i.colorAttachmentFormats.filter(s=>s),r=this.device.createRenderPipeline(i),this.renderPipelinesCache.add(i,r)}return r}createInputLayout(e){e.vertexBufferDescriptors=e.vertexBufferDescriptors.filter(i=>!!i);let r=this.inputLayoutsCache.get(e);if(r===null){const i=c_(e);r=this.device.createInputLayout(i),this.inputLayoutsCache.add(i,r)}return r}createProgramSimple(e){const{vert:r,frag:i,preprocessedFrag:s,preprocessedVert:n}=e;let o=null;if(n&&s&&(o=this.programCache.get({vert:r,frag:i,preprocessedFrag:s,preprocessedVert:n})),o===null){const{preprocessedVert:a,preprocessedFrag:l}=Xm(this.device,e);e.preprocessedVert=a,e.preprocessedFrag=l;const c=jm(e);o=this.device.createProgramSimple({vertex:{glsl:a},fragment:{glsl:l}},r),this.programCache.add(c,o)}return o}createSampler(e){let r=this.samplerCache.get(e);return r===null&&(r=this.device.createSampler(e),this.samplerCache.add(e,r)),r}destroy(){for(const e of this.bindingsCache.values())e.destroy();for(const e of this.renderPipelinesCache.values())e.destroy();for(const e of this.inputLayoutsCache.values())e.destroy();for(const e of this.programCache.values())e.destroy();for(const e of this.samplerCache.values())e.destroy();this.bindingsCache.clear(),this.renderPipelinesCache.clear(),this.inputLayoutsCache.clear(),this.programCache.clear(),this.samplerCache.clear()}}var ht=(t=>(t[t.Color0=0]="Color0",t[t.Color1=1]="Color1",t[t.Color2=2]="Color2",t[t.Color3=3]="Color3",t[t.ColorMax=3]="ColorMax",t[t.DepthStencil=4]="DepthStencil",t))(ht||{});class Jm{constructor(){this.renderTargetIDs=[],this.renderTargetLevels=[],this.resolveTextureOutputIDs=[],this.resolveTextureOutputExternalTextures=[],this.resolveTextureOutputExternalTextureLevel=[],this.resolveTextureInputIDs=[],this.renderTargetExtraRefs=[],this.resolveTextureInputTextures=[],this.renderTargets=[],this.descriptor={colorAttachment:[],colorAttachmentLevel:[],colorResolveTo:[],colorResolveToLevel:[],colorStore:[],depthStencilAttachment:null,depthStencilResolveTo:null,depthStencilStore:!0,colorClearColor:["load"],depthClearValue:"load",stencilClearValue:"load",occlusionQueryPool:null},this.viewportX=0,this.viewportY=0,this.viewportW=1,this.viewportH=1,this.execFunc=null,this.postFunc=null,this.debugThumbnails=[]}setDebugName(e){this.debugName=e}pushDebugThumbnail(e){this.debugThumbnails[e]=!0}setViewport(e,r,i,s){this.viewportX=e,this.viewportY=r,this.viewportW=i,this.viewportH=s}attachRenderTargetID(e,r,i=0){U(this.renderTargetIDs[e]===void 0),this.renderTargetIDs[e]=r,this.renderTargetLevels[e]=i}attachResolveTexture(e){this.resolveTextureInputIDs.push(e)}attachOcclusionQueryPool(e){this.descriptor.occlusionQueryPool=e}exec(e){U(this.execFunc===null),this.execFunc=e}post(e){U(this.postFunc===null),this.postFunc=e}addExtraRef(e){this.renderTargetExtraRefs[e]=!0}}class eg{constructor(e,r){this.dimension=Q.TEXTURE_2D,this.depthOrArrayLayers=1,this.mipLevelCount=1,this.width=0,this.height=0,this.sampleCount=0,this.usage=Ot.RENDER_TARGET,this.needsClear=!0,this.texture=null,this.age=0,this.format=r.format,this.width=r.width,this.height=r.height,this.sampleCount=r.sampleCount,U(this.sampleCount>=1),this.sampleCount>1?this.attachment=e.createRenderTarget(this):(this.texture=e.createTexture(this),this.attachment=e.createRenderTargetFromTexture(this.texture))}setDebugName(e,r){this.debugName=r,this.texture!==null&&e.setResourceName(this.texture,this.debugName),e.setResourceName(this.attachment,this.debugName)}matchesDescription(e){return this.format===e.format&&this.width===e.width&&this.height===e.height&&this.sampleCount===e.sampleCount}reset(e){U(this.matchesDescription(e)),this.age=0}destroy(){this.attachment.destroy()}}class tg{constructor(e,r){this.dimension=Q.TEXTURE_2D,this.depthOrArrayLayers=1,this.mipLevelCount=1,this.usage=Ot.RENDER_TARGET,this.width=0,this.height=0,this.age=0,this.format=r.format,this.width=r.width,this.height=r.height,this.texture=e.createTexture(this)}matchesDescription(e){return this.format===e.format&&this.width===e.width&&this.height===e.height}reset(e){U(this.matchesDescription(e)),this.age=0}destroy(){this.texture.destroy()}}class rg{constructor(){this.renderTargetDescriptions=[],this.resolveTextureRenderTargetIDs=[],this.passes=[],this.renderTargetDebugNames=[]}}class ig{constructor(e){this.currentPass=null,this.renderTargetDeadPool=[],this.singleSampledTextureDeadPool=[],this.currentGraph=null,this.renderTargetOutputCount=[],this.renderTargetResolveCount=[],this.resolveTextureUseCount=[],this.renderTargetAliveForID=[],this.singleSampledTextureForResolveTextureID=[],this.device=e}acquireRenderTargetForDescription(e){for(let r=0;r<this.renderTargetDeadPool.length;r++){const i=this.renderTargetDeadPool[r];if(i.matchesDescription(e))return i.reset(e),this.renderTargetDeadPool.splice(r--,1),i}return new eg(this.device,e)}acquireSingleSampledTextureForDescription(e){for(let r=0;r<this.singleSampledTextureDeadPool.length;r++){const i=this.singleSampledTextureDeadPool[r];if(i.matchesDescription(e))return i.reset(e),this.singleSampledTextureDeadPool.splice(r--,1),i}return new tg(this.device,e)}beginGraphBuilder(){U(this.currentGraph===null),this.currentGraph=new rg}pushPass(e){const r=new Jm;e(r),this.currentGraph.passes.push(r)}createRenderTargetID(e,r){return this.currentGraph.renderTargetDebugNames.push(r),this.currentGraph.renderTargetDescriptions.push(e)-1}createResolveTextureID(e){return this.currentGraph.resolveTextureRenderTargetIDs.push(e)-1}findMostRecentPassThatAttachedRenderTarget(e){for(let r=this.currentGraph.passes.length-1;r>=0;r--){const i=this.currentGraph.passes[r];if(i.renderTargetIDs.includes(e))return i}return null}resolveRenderTargetPassAttachmentSlot(e,r){const i=e;if(i.resolveTextureOutputIDs[r]===void 0){const s=i.renderTargetIDs[r],n=this.createResolveTextureID(s);i.resolveTextureOutputIDs[r]=n}return i.resolveTextureOutputIDs[r]}findPassForResolveRenderTarget(e){const r=Ne(this.findMostRecentPassThatAttachedRenderTarget(e)),i=r.renderTargetIDs.indexOf(e);return U(r.resolveTextureOutputExternalTextures[i]===void 0),r}resolveRenderTarget(e){const r=this.findPassForResolveRenderTarget(e),i=r.renderTargetIDs.indexOf(e);return this.resolveRenderTargetPassAttachmentSlot(r,i)}resolveRenderTargetToExternalTexture(e,r,i=0){const s=this.findPassForResolveRenderTarget(e),n=s.renderTargetIDs.indexOf(e);U(s.resolveTextureOutputIDs[n]===void 0),s.resolveTextureOutputExternalTextures[n]=r,s.resolveTextureOutputExternalTextureLevel[n]=i}getRenderTargetDescription(e){return Ne(this.currentGraph.renderTargetDescriptions[e])}scheduleAddUseCount(e,r){for(let i=0;i<r.renderTargetIDs.length;i++){const s=r.renderTargetIDs[i];s!==void 0&&(this.renderTargetOutputCount[s]++,r.renderTargetExtraRefs[i]&&this.renderTargetOutputCount[s]++)}for(let i=0;i<r.resolveTextureInputIDs.length;i++){const s=r.resolveTextureInputIDs[i];if(s===void 0)continue;this.resolveTextureUseCount[s]++;const n=e.resolveTextureRenderTargetIDs[s];this.renderTargetResolveCount[n]++}}acquireRenderTargetForID(e,r){if(r===void 0)return null;if(U(this.renderTargetOutputCount[r]>0),!this.renderTargetAliveForID[r]){const i=e.renderTargetDescriptions[r],s=this.acquireRenderTargetForDescription(i);s.setDebugName(this.device,e.renderTargetDebugNames[r]),this.renderTargetAliveForID[r]=s}return this.renderTargetAliveForID[r]}releaseRenderTargetForID(e,r){if(e===void 0)return null;const i=Ne(this.renderTargetAliveForID[e]);return r?(U(this.renderTargetOutputCount[e]>0),this.renderTargetOutputCount[e]--):(U(this.renderTargetResolveCount[e]>0),this.renderTargetResolveCount[e]--),this.renderTargetOutputCount[e]===0&&this.renderTargetResolveCount[e]===0&&(i.needsClear=!0,delete this.renderTargetAliveForID[e],this.renderTargetDeadPool.push(i)),i}acquireResolveTextureInputTextureForID(e,r){const i=e.resolveTextureRenderTargetIDs[r];U(this.resolveTextureUseCount[r]>0),this.resolveTextureUseCount[r]--;const s=Ne(this.releaseRenderTargetForID(i,!1));if(this.singleSampledTextureForResolveTextureID[r]!==void 0){const n=this.singleSampledTextureForResolveTextureID[r];return this.resolveTextureUseCount[r]===0&&this.singleSampledTextureDeadPool.push(n),n.texture}else return Ne(s.texture)}determineResolveParam(e,r,i){const s=r.renderTargetIDs[i],n=r.resolveTextureOutputIDs[i],o=r.resolveTextureOutputExternalTextures[i],a=n!==void 0,l=o!==void 0;U(!(a&&l));let c=null,u=!1,h=0;if(this.renderTargetOutputCount[s]>1&&(u=!0),a){U(e.resolveTextureRenderTargetIDs[n]===s),U(this.resolveTextureUseCount[n]>0),U(this.renderTargetOutputCount[s]>0);const _=Ne(this.renderTargetAliveForID[s]);if(_.texture!==null&&this.renderTargetOutputCount[s]===1)c=null,u=!0;else{if(!this.singleSampledTextureForResolveTextureID[n]){const p=Ne(e.renderTargetDescriptions[s]);this.singleSampledTextureForResolveTextureID[n]=this.acquireSingleSampledTextureForDescription(p),this.device.setResourceName(this.singleSampledTextureForResolveTextureID[n].texture,_.debugName+` (Resolve ${n})`)}c=this.singleSampledTextureForResolveTextureID[n].texture}}else l?(c=o,h=r.resolveTextureOutputExternalTextureLevel[i]):c=null;return{resolveTo:c,store:u,level:h}}schedulePass(e,r){const i=r.renderTargetIDs[ht.DepthStencil];for(let u=ht.Color0;u<=ht.ColorMax;u++){const h=r.renderTargetIDs[u],_=this.acquireRenderTargetForID(e,h);r.renderTargets[u]=_,r.descriptor.colorAttachment[u]=_!==null?_.attachment:null,r.descriptor.colorAttachmentLevel[u]=r.renderTargetLevels[u];const{resolveTo:p,store:d,level:g}=this.determineResolveParam(e,r,u);r.descriptor.colorResolveTo[u]=p,r.descriptor.colorResolveToLevel[u]=g,r.descriptor.colorStore[u]=d,r.descriptor.colorClearColor[u]=_!==null&&_.needsClear?e.renderTargetDescriptions[h].colorClearColor:"load"}const s=this.acquireRenderTargetForID(e,i);r.renderTargets[ht.DepthStencil]=s,r.descriptor.depthStencilAttachment=s!==null?s.attachment:null;const{resolveTo:n,store:o}=this.determineResolveParam(e,r,ht.DepthStencil);r.descriptor.depthStencilResolveTo=n,r.descriptor.depthStencilStore=o,r.descriptor.depthClearValue=s!==null&&s.needsClear?e.renderTargetDescriptions[i].depthClearValue:"load",r.descriptor.stencilClearValue=s!==null&&s.needsClear?e.renderTargetDescriptions[i].stencilClearValue:"load";let a=0,l=0,c=0;for(let u=0;u<r.renderTargets.length;u++){const h=r.renderTargets[u];if(!h)continue;const _=h.width>>>r.renderTargetLevels[u],p=h.height>>>r.renderTargetLevels[u];a===0&&(a=_,l=p,c=h.sampleCount),U(_===a),U(p===l),U(h.sampleCount===c),h.needsClear=!1}a>0&&l>0&&(r.viewportX*=a,r.viewportY*=l,r.viewportW*=a,r.viewportH*=l);for(let u=0;u<r.resolveTextureInputIDs.length;u++){const h=r.resolveTextureInputIDs[u];r.resolveTextureInputTextures[u]=this.acquireResolveTextureInputTextureForID(e,h)}for(let u=0;u<r.renderTargetIDs.length;u++)this.releaseRenderTargetForID(r.renderTargetIDs[u],!0);for(let u=0;u<r.renderTargetExtraRefs.length;u++)r.renderTargetExtraRefs[u]&&this.releaseRenderTargetForID(r.renderTargetIDs[u],!0)}scheduleGraph(e){U(this.renderTargetOutputCount.length===0),U(this.renderTargetResolveCount.length===0),U(this.resolveTextureUseCount.length===0);for(let i=0;i<this.renderTargetDeadPool.length;i++)this.renderTargetDeadPool[i].age++;for(let i=0;i<this.singleSampledTextureDeadPool.length;i++)this.singleSampledTextureDeadPool[i].age++;so(this.renderTargetOutputCount,e.renderTargetDescriptions.length,0),so(this.renderTargetResolveCount,e.renderTargetDescriptions.length,0),so(this.resolveTextureUseCount,e.resolveTextureRenderTargetIDs.length,0);for(let i=0;i<e.passes.length;i++)this.scheduleAddUseCount(e,e.passes[i]);for(let i=0;i<e.passes.length;i++)this.schedulePass(e,e.passes[i]);for(let i=0;i<this.renderTargetOutputCount.length;i++)U(this.renderTargetOutputCount[i]===0);for(let i=0;i<this.renderTargetResolveCount.length;i++)U(this.renderTargetResolveCount[i]===0);for(let i=0;i<this.resolveTextureUseCount.length;i++)U(this.resolveTextureUseCount[i]===0);for(let i=0;i<this.renderTargetAliveForID.length;i++)U(this.renderTargetAliveForID[i]===void 0);const r=1;for(let i=0;i<this.renderTargetDeadPool.length;i++)this.renderTargetDeadPool[i].age>=r&&(this.renderTargetDeadPool[i].destroy(),this.renderTargetDeadPool.splice(i--,1));for(let i=0;i<this.singleSampledTextureDeadPool.length;i++)this.singleSampledTextureDeadPool[i].age>=r&&(this.singleSampledTextureDeadPool[i].destroy(),this.singleSampledTextureDeadPool.splice(i--,1));this.renderTargetResolveCount.length=0,this.renderTargetOutputCount.length=0,this.resolveTextureUseCount.length=0}execPass(e){U(this.currentPass===null),this.currentPass=e;const r=this.device.createRenderPass(e.descriptor);r.pushDebugGroup(e.debugName),r.setViewport(e.viewportX,e.viewportY,e.viewportW,e.viewportH),e.execFunc!==null&&e.execFunc(r,this),r.popDebugGroup(),this.device.submitPass(r),e.postFunc!==null&&e.postFunc(this),this.currentPass=null}execGraph(e){this.scheduleGraph(e),this.device.beginFrame(),e.passes.forEach(r=>{this.execPass(r)}),this.device.endFrame(),this.singleSampledTextureForResolveTextureID.length=0}execute(){const e=Ne(this.currentGraph);this.execGraph(e),this.currentGraph=null}getDebug(){return this}getPasses(){return this.currentGraph.passes}getPassDebugThumbnails(e){return e.debugThumbnails}getPassRenderTargetID(e,r){return e.renderTargetIDs[r]}getRenderTargetIDDebugName(e){return this.currentGraph.renderTargetDebugNames[e]}getResolveTextureForID(e){const r=this.currentPass,i=r.resolveTextureInputIDs.indexOf(e);return U(i>=0),Ne(r.resolveTextureInputTextures[i])}getRenderTargetAttachment(e){const i=this.currentPass.renderTargets[e];return i?i.attachment:null}getRenderTargetTexture(e){const i=this.currentPass.renderTargets[e];return i?i.texture:null}newGraphBuilder(){return this.beginGraphBuilder(),this}destroy(){for(let e=0;e<this.renderTargetAliveForID.length;e++)U(this.renderTargetAliveForID[e]===void 0);for(let e=0;e<this.singleSampledTextureForResolveTextureID.length;e++)U(this.singleSampledTextureForResolveTextureID[e]===void 0);for(let e=0;e<this.renderTargetDeadPool.length;e++)this.renderTargetDeadPool[e].destroy();for(let e=0;e<this.singleSampledTextureDeadPool.length;e++)this.singleSampledTextureDeadPool[e].destroy()}}oc(1,0,0,0,0,1,0,0,0,0,2,0,0,0,-1,1);oc(1,0,0,0,0,1,0,0,0,0,.5,0,0,0,.5,1);function sg(t,e,r,i=0,s=0,n=0){return t[e+0]=r,t[e+1]=i,t[e+2]=s,t[e+3]=n,4}var ua=(t=>(t[t.None=0]="None",t[t.Indexed=1]="Indexed",t[t.AllowSkippingIfPipelineNotReady=2]="AllowSkippingIfPipelineNotReady",t[t.Template=4]="Template",t[t.Draw=8]="Draw",t[t.InheritedFlags=3]="InheritedFlags",t))(ua||{});class ng{constructor(){this.sortKey=0,this.debug=null,this.uniforms=[],this.bindingDescriptors=Qr(1,()=>({bindingLayout:null,samplerBindings:[],uniformBufferBindings:[],storageBufferBindings:[],storageTextureBindings:[]})),this.dynamicUniformBufferByteOffsets=Qr(10,()=>0),this.flags=0,this.vertexBuffers=null,this.indexBuffer=null,this.drawStart=0,this.drawCount=0,this.drawInstanceCount=0,this.renderPipelineDescriptor={inputLayout:null,megaStateDescriptor:As(Ii),program:null,topology:we.TRIANGLES,colorAttachmentFormats:[],depthStencilAttachmentFormat:null,sampleCount:1},this.reset()}reset(){this.sortKey=0,this.flags=2,this.vertexBuffers=null,this.indexBuffer=null,this.renderPipelineDescriptor.inputLayout=null,this.bindingDescriptors=Qr(1,()=>({bindingLayout:null,samplerBindings:[],uniformBufferBindings:[],storageBufferBindings:[],storageTextureBindings:[]}))}setFromTemplate(e){var s,n,o,a;Oo(this.renderPipelineDescriptor.megaStateDescriptor,e.renderPipelineDescriptor.megaStateDescriptor),this.renderPipelineDescriptor.program=e.renderPipelineDescriptor.program,this.renderPipelineDescriptor.inputLayout=e.renderPipelineDescriptor.inputLayout,this.renderPipelineDescriptor.topology=e.renderPipelineDescriptor.topology,this.renderPipelineDescriptor.colorAttachmentFormats.length=Math.max(this.renderPipelineDescriptor.colorAttachmentFormats.length,e.renderPipelineDescriptor.colorAttachmentFormats.length);for(let l=0;l<e.renderPipelineDescriptor.colorAttachmentFormats.length;l++)this.renderPipelineDescriptor.colorAttachmentFormats[l]=e.renderPipelineDescriptor.colorAttachmentFormats[l];this.renderPipelineDescriptor.depthStencilAttachmentFormat=e.renderPipelineDescriptor.depthStencilAttachmentFormat,this.renderPipelineDescriptor.sampleCount=e.renderPipelineDescriptor.sampleCount,this.uniformBuffer=e.uniformBuffer,this.uniforms=[...e.uniforms],this.drawCount=e.drawCount,this.drawStart=e.drawStart,this.drawInstanceCount=e.drawInstanceCount,this.vertexBuffers=e.vertexBuffers,this.indexBuffer=e.indexBuffer,this.flags=this.flags&-4|e.flags&3,this.sortKey=e.sortKey;const r=this.bindingDescriptors[0],i=e.bindingDescriptors[0];this.setBindingLayout({numSamplers:(s=i.samplerBindings)==null?void 0:s.length,numUniformBuffers:(n=i.uniformBufferBindings)==null?void 0:n.length,numStorageBuffers:(o=i.storageBufferBindings)==null?void 0:o.length,numStorageTextures:(a=i.storageTextureBindings)==null?void 0:a.length});for(let l=0;l<Math.min(r.uniformBufferBindings.length,i.uniformBufferBindings.length);l++)r.uniformBufferBindings[l].size=e.bindingDescriptors[0].uniformBufferBindings[l].size;this.setSamplerBindingsFromTextureMappings(i.samplerBindings);for(let l=0;l<Math.min(r.storageBufferBindings.length,i.storageBufferBindings.length);l++)r.storageBufferBindings[l].size=e.bindingDescriptors[0].storageBufferBindings[l].size;for(let l=0;l<e.dynamicUniformBufferByteOffsets.length;l++)this.dynamicUniformBufferByteOffsets[l]=e.dynamicUniformBufferByteOffsets[l]}validate(){var e;for(let r=0;r<this.bindingDescriptors.length;r++){const i=this.bindingDescriptors[r];for(let s=0;s<((e=i.uniformBufferBindings)==null?void 0:e.length);s++)U(i.uniformBufferBindings[s].size>0)}U(this.drawCount>0)}setProgram(e){this.renderPipelineDescriptor.program=e}setTopology(e){this.renderPipelineDescriptor.topology=e}setMegaStateFlags(e){return Oo(this.renderPipelineDescriptor.megaStateDescriptor,e),this.renderPipelineDescriptor.megaStateDescriptor}getMegaStateFlags(){return this.renderPipelineDescriptor.megaStateDescriptor}setVertexInput(e,r,i){this.vertexBuffers=r,this.indexBuffer=i,this.renderPipelineDescriptor.inputLayout=e}setBindingLayout(e){U(e.numUniformBuffers<this.dynamicUniformBufferByteOffsets.length);for(let r=this.bindingDescriptors[0].uniformBufferBindings.length;r<e.numUniformBuffers;r++)this.bindingDescriptors[0].uniformBufferBindings.push({binding:r,buffer:null,size:0});for(let r=this.bindingDescriptors[0].samplerBindings.length;r<e.numSamplers;r++)this.bindingDescriptors[0].samplerBindings.push({sampler:null,texture:null});for(let r=this.bindingDescriptors[0].storageBufferBindings.length;r<e.numStorageBuffers;r++)this.bindingDescriptors[0].storageBufferBindings.push({binding:r,buffer:null});for(let r=this.bindingDescriptors[0].storageTextureBindings.length;r<e.numStorageTextures;r++)this.bindingDescriptors[0].storageTextureBindings.push({binding:r,texture:null})}drawIndexes(e,r=0){this.flags=Hi(this.flags,1,!0),this.drawCount=e,this.drawStart=r,this.drawInstanceCount=1}drawIndexesInstanced(e,r,i=0){this.flags=Hi(this.flags,1,!0),this.drawCount=e,this.drawStart=i,this.drawInstanceCount=r}drawPrimitives(e,r=0){this.flags=Hi(this.flags,1,!1),this.drawCount=e,this.drawStart=r,this.drawInstanceCount=1}drawPrimitivesInstanced(e,r=0,i=0){this.flags=Hi(this.flags,1,!1),this.drawCount=e,this.drawStart=i,this.drawInstanceCount=r}setUniforms(e,r){if(r.length===0)return;this.uniforms[e]=r;let i=0;const s=[];r.forEach(l=>{const{value:c}=l;if(ll(c)||Array.isArray(c)||c instanceof Float32Array){const u=ll(c)?[c]:c,h=u.length>4?4:u.length,_=4-i%4;if(_!==4&&!(_>=h)){i+=_;for(let p=0;p<_;p++)s.push(0)}i+=u.length,s.push(...u)}});const n=4-s.length%4;if(n!==4)for(let l=0;l<n;l++)s.push(0);let o=this.allocateUniformBuffer(e,s.length);const a=this.mapUniformBufferF32(e);for(let l=0;l<s.length;l+=4)o+=sg(a,o,s[l],s[l+1],s[l+2],s[l+3])}setUniformBuffer(e){this.uniformBuffer=e}setStorageBuffers(e,r){if(this.bindingDescriptors[0].storageBufferBindings.length)for(let i=0;i<this.bindingDescriptors[0].storageBufferBindings.length;i++){const s=this.bindingDescriptors[0].storageBufferBindings[i];s.binding=r[i],s.buffer=e[i]}}allocateUniformBuffer(e,r){var s;U(((s=this.bindingDescriptors[0].uniformBufferBindings)==null?void 0:s.length)<this.dynamicUniformBufferByteOffsets.length),this.dynamicUniformBufferByteOffsets[e]=this.uniformBuffer.allocateChunk(r)<<2;const i=this.bindingDescriptors[0].uniformBufferBindings[e];return i.size=r<<2,this.getUniformBufferOffset(e)}getUniformBufferOffset(e){return this.dynamicUniformBufferByteOffsets[e]>>>2}mapUniformBufferF32(e){return this.uniformBuffer.mapBufferF32()}mapBufferU8(e){return this.uniformBuffer.mapBufferU8()}getUniformBuffer(){return this.uniformBuffer}setSamplerBindingsFromTextureMappings(e){e=e.filter(r=>r);for(let r=0;r<this.bindingDescriptors[0].samplerBindings.length;r++){const i=this.bindingDescriptors[0].samplerBindings[r],s=e[r];if(s==null){i.texture=null,i.sampler=null;continue}i.texture=s.texture,i.sampler=s.sampler}}setAllowSkippingIfPipelineNotReady(e){this.flags=Hi(this.flags,2,e)}setAttachmentFormatsFromRenderPass(e,r){const i=e.queryRenderPass(r);let s=-1;for(let o=0;o<i.colorAttachment.length;o++){const a=i.colorAttachment[o]!==null?e.queryRenderTarget(i.colorAttachment[o]):null;this.renderPipelineDescriptor.colorAttachmentFormats[o]=a!==null?a.format:null,a!==null&&(s===-1?s=a.sampleCount:U(s===a.sampleCount))}const n=i.depthStencilAttachment!==null?e.queryRenderTarget(i.depthStencilAttachment):null;this.renderPipelineDescriptor.depthStencilAttachmentFormat=n!==null?n.format:null,n!==null&&(s===-1?s=n.sampleCount:U(s==n.sampleCount)),U(s>0),this.renderPipelineDescriptor.sampleCount=s}drawOnPass(e,r){const i=e.device;this.setAttachmentFormatsFromRenderPass(i,r);const s=e.createRenderPipeline(this.renderPipelineDescriptor);if(!i.pipelineQueryReady(s)){if(this.flags&2)return!1;i.pipelineForceReady(s)}r.setPipeline(s),r.setVertexInput(this.renderPipelineDescriptor.inputLayout,this.vertexBuffers,this.indexBuffer);for(let a=0;a<this.bindingDescriptors[0].uniformBufferBindings.length;a++)this.bindingDescriptors[0].uniformBufferBindings[a].buffer=Ne(this.uniformBuffer.buffer),this.bindingDescriptors[0].uniformBufferBindings[a].offset=this.dynamicUniformBufferByteOffsets[a];this.renderPipelineDescriptor.program.gl_program&&this.uniforms.forEach(a=>{const l={};a.forEach(({name:c,value:u})=>{l[c]=u}),this.renderPipelineDescriptor.program.setUniformsLegacy(l)});const o=e.createBindings({...this.bindingDescriptors[0],pipeline:s});return r.setBindings(o),this.flags&1?r.drawIndexed(this.drawCount,this.drawInstanceCount,this.drawStart,0,0):r.draw(this.drawCount,this.drawInstanceCount,this.drawStart,0),!0}}function og(t,e){return t.sortKey-e.sortKey}class Kc{constructor(e=og,r=0){this.renderInsts=[],this.usePostSort=!1,this.compareFunction=e,this.executionOrder=r}checkUsePostSort(){this.usePostSort=this.compareFunction!==null&&this.renderInsts.length>=500}insertSorted(e){this.compareFunction===null?this.renderInsts.push(e):this.usePostSort?this.renderInsts.push(e):Hh(this.renderInsts,e,this.compareFunction),this.checkUsePostSort()}submitRenderInst(e){e.flags|=ua.Draw,this.insertSorted(e)}ensureSorted(){this.usePostSort&&(this.renderInsts.length!==0&&this.renderInsts.sort(this.compareFunction),this.usePostSort=!1)}drawOnPassRendererNoReset(e,r){if(this.ensureSorted(),this.executionOrder===0)for(let i=0;i<this.renderInsts.length;i++)this.renderInsts[i].drawOnPass(e,r);else for(let i=this.renderInsts.length-1;i>=0;i--)this.renderInsts[i].drawOnPass(e,r)}reset(){this.renderInsts.length=0}drawOnPassRenderer(e,r){this.drawOnPassRendererNoReset(e,r),this.reset()}}class pl{constructor(){this.pool=[],this.allocCount=0}allocRenderInstIndex(){return this.allocCount++,this.allocCount>this.pool.length&&this.pool.push(new ng),this.allocCount-1}popRenderInst(){this.allocCount--}reset(){for(let e=0;e<this.pool.length;e++)this.pool[e].reset();this.allocCount=0}destroy(){this.pool.length=0,this.allocCount=0}}class ag{constructor(e){this.renderCache=e,this.instPool=new pl,this.templatePool=new pl,this.simpleRenderInstList=new Kc,this.currentRenderInstList=this.simpleRenderInstList}newRenderInst(){const e=this.templatePool.allocCount-1,r=this.instPool.allocRenderInstIndex(),i=this.instPool.pool[r];return i.debug=null,e>=0&&i.setFromTemplate(this.templatePool.pool[e]),i}submitRenderInst(e,r=this.currentRenderInstList){r.submitRenderInst(e)}setCurrentRenderInstList(e){U(this.simpleRenderInstList===null),this.currentRenderInstList=e}pushTemplateRenderInst(){const e=this.templatePool.allocCount-1,r=this.templatePool.allocRenderInstIndex(),i=this.templatePool.pool[r];return e>=0&&i.setFromTemplate(this.templatePool.pool[e]),i.flags|=ua.Template,i}popTemplateRenderInst(){this.templatePool.popRenderInst()}getTemplateRenderInst(){const e=this.templatePool.allocCount-1;return this.templatePool.pool[e]}resetRenderInsts(){this.instPool.reset(),this.simpleRenderInstList!==null&&this.simpleRenderInstList.reset(),U(this.templatePool.allocCount===0)}destroy(){this.instPool.destroy(),this.renderCache.destroy()}disableSimpleMode(){this.simpleRenderInstList=null}drawOnPassRenderer(e){Ne(this.simpleRenderInstList).drawOnPassRenderer(this.renderCache,e)}drawOnPassRendererNoReset(e){Ne(this.simpleRenderInstList).drawOnPassRendererNoReset(this.renderCache,e)}}class lg{getDevice(){return this.device}setDevice(e){this.device=e,this.renderCache=new Gm(e),this.renderGraph=new ig(this.device),this.renderInstManager=new ag(this.renderCache),this.uniformBuffer=new km(this.device)}pushTemplateRenderInst(){const e=this.renderInstManager.pushTemplateRenderInst();return e.setUniformBuffer(this.uniformBuffer),e}prepareToRender(){this.uniformBuffer.prepareToRender()}destroy(){this.uniformBuffer&&this.uniformBuffer.destroy(),this.renderInstManager&&this.renderInstManager.destroy(),this.renderCache&&this.renderCache.destroy(),this.renderGraph&&this.renderGraph.destroy()}getCache(){return this.renderCache}getDefines(){return{}}}class cg{constructor(e){this.format=e,this.width=0,this.height=0,this.sampleCount=0,this.colorClearColor="load",this.depthClearValue="load",this.stencilClearValue="load"}setDimensions(e,r,i){this.width=e,this.height=r,this.sampleCount=i}copyDimensions(e){this.width=e.width,this.height=e.height,this.sampleCount=e.sampleCount}}function ha(t){return{colorClearColor:t,depthClearValue:0,stencilClearValue:0}}ha(vs(.88,.88,.88,1));const ug=ha(mc);var Qc=(t=>(t[t.None=0]="None",t[t.FXAA=1]="FXAA",t[t.MSAAx4=2]="MSAAx4",t))(Qc||{});function hg(t){if(t===ht.Color0)return R.U8_RGBA_RT;if(t===ht.DepthStencil)return R.D24_S8;throw new Error("whoops")}function _g(t){return t.antialiasingMode===2?4:1}function dg(t,e){const r=_g(e);t.setDimensions(e.backbufferWidth,e.backbufferHeight,r)}function ml(t,e,r){const i=hg(t),s=new cg(i);return dg(s,e),r!==null&&(s.colorClearColor=r.colorClearColor,s.depthClearValue=r.depthClearValue,s.stencilClearValue=r.stencilClearValue),s}class qn{constructor(){this.texture=null,this.sampler=null,this.width=0,this.height=0,this.lodBias=0}reset(){this.texture=null,this.sampler=null,this.width=0,this.height=0,this.lodBias=0}copy(e){this.texture=e.texture,this.sampler=e.sampler,this.width=e.width,this.height=e.height,this.lodBias=e.lodBias}}const fg=`
#define_import_path render::globals

struct Globals {
    // The time since startup in seconds
    // Wraps to 0 after 1 hour.
    time: f32,
    // The delta time since the previous frame in seconds
    delta_time: f32,
    // Frame count since the start of the app.
    // It wraps to zero when it reaches the maximum value of a u32.
    frame_count: u32,
#ifdef SIXTEEN_BYTE_ALIGNMENT
    // WebGL2 structs must be 16 byte aligned.
    _webgl2_padding: f32
#endif
};
`,pg=`
#define_import_path render::maths

fn affine_to_square(affine: mat3x4<f32>) -> mat4x4<f32> {
    return transpose(mat4x4<f32>(
        affine[0],
        affine[1],
        affine[2],
        vec4<f32>(0.0, 0.0, 0.0, 1.0),
    ));
}

fn mat2x4_f32_to_mat3x3_unpack(
    a: mat2x4<f32>,
    b: f32,
) -> mat3x3<f32> {
    return mat3x3<f32>(
        a[0].xyz,
        vec3<f32>(a[0].w, a[1].xy),
        vec3<f32>(a[1].zw, b),
    );
}
`,mg=`
#define_import_path pbr::utils
#import pbr::rgb9e5

const PI: f32 = 3.141592653589793;
const HALF_PI: f32 = 1.57079632679;
const E: f32 = 2.718281828459045;

fn hsv2rgb(hue: f32, saturation: f32, value: f32) -> vec3<f32> {
    let rgb = clamp(
        abs(
            ((hue * 6.0 + vec3<f32>(0.0, 4.0, 2.0)) % 6.0) - 3.0
        ) - 1.0,
        vec3<f32>(0.0),
        vec3<f32>(1.0)
    );

    return value * mix(vec3<f32>(1.0), rgb, vec3<f32>(saturation));
}

fn random1D(s: f32) -> f32 {
    return fract(sin(s * 12.9898) * 43758.5453123);
}

// returns the (0-1, 0-1) position within the given viewport for the current buffer coords .
// buffer coords can be obtained from \`@builtin(position).xy\`.
// the view uniform struct contains the current camera viewport in \`view.viewport\`.
// topleft = 0,0
fn coords_to_viewport_uv(position: vec2<f32>, viewport: vec4<f32>) -> vec2<f32> {
    return (position - viewport.xy) / viewport.zw;
}

// https://jcgt.org/published/0003/02/01/paper.pdf

// For encoding normals or unit direction vectors as octahedral coordinates.
fn octahedral_encode(v: vec3<f32>) -> vec2<f32> {
    var n = v / (abs(v.x) + abs(v.y) + abs(v.z));
    let octahedral_wrap = (1.0 - abs(n.yx)) * select(vec2(-1.0), vec2(1.0), n.xy > 0.0);
    let n_xy = select(octahedral_wrap, n.xy, n.z >= 0.0);
    return n_xy * 0.5 + 0.5;
}

// For decoding normals or unit direction vectors from octahedral coordinates.
fn octahedral_decode(v: vec2<f32>) -> vec3<f32> {
    let f = v * 2.0 - 1.0;
    var n = vec3(f.xy, 1.0 - abs(f.x) - abs(f.y));
    let t = saturate(-n.z);
    let w = select(vec2(t), vec2(-t), n.xy >= vec2(0.0));
    n = vec3(n.xy + w, n.z);
    return normalize(n);
}

// https://blog.demofox.org/2022/01/01/interleaved-gradient-noise-a-different-kind-of-low-discrepancy-sequence
fn interleaved_gradient_noise(pixel_coordinates: vec2<f32>, frame: u32) -> f32 {
    let xy = pixel_coordinates + 5.588238 * f32(frame % 64u);
    return fract(52.9829189 * fract(0.06711056 * xy.x + 0.00583715 * xy.y));
}

// https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare (slides 120-135)
// TODO: Use an array here instead of a bunch of constants, once arrays work properly under DX12.
// NOTE: The names have a final underscore to avoid the following error:
// \`Composable module identifiers must not require substitution according to naga writeback rules\`
const SPIRAL_OFFSET_0_ = vec2<f32>(-0.7071,  0.7071);
const SPIRAL_OFFSET_1_ = vec2<f32>(-0.0000, -0.8750);
const SPIRAL_OFFSET_2_ = vec2<f32>( 0.5303,  0.5303);
const SPIRAL_OFFSET_3_ = vec2<f32>(-0.6250, -0.0000);
const SPIRAL_OFFSET_4_ = vec2<f32>( 0.3536, -0.3536);
const SPIRAL_OFFSET_5_ = vec2<f32>(-0.0000,  0.3750);
const SPIRAL_OFFSET_6_ = vec2<f32>(-0.1768, -0.1768);
const SPIRAL_OFFSET_7_ = vec2<f32>( 0.1250,  0.0000);
`,gg=`
#define_import_path pbr::rgb9e5

const RGB9E5_EXPONENT_BITS        = 5u;
const RGB9E5_MANTISSA_BITS        = 9;
const RGB9E5_MANTISSA_BITSU       = 9u;
const RGB9E5_EXP_BIAS             = 15;
const RGB9E5_MAX_VALID_BIASED_EXP = 31u;

//#define MAX_RGB9E5_EXP               (RGB9E5_MAX_VALID_BIASED_EXP - RGB9E5_EXP_BIAS)
//#define RGB9E5_MANTISSA_VALUES       (1<<RGB9E5_MANTISSA_BITS)
//#define MAX_RGB9E5_MANTISSA          (RGB9E5_MANTISSA_VALUES-1)
//#define MAX_RGB9E5                   ((f32(MAX_RGB9E5_MANTISSA))/RGB9E5_MANTISSA_VALUES * (1<<MAX_RGB9E5_EXP))
//#define EPSILON_RGB9E5_              ((1.0/RGB9E5_MANTISSA_VALUES) / (1<<RGB9E5_EXP_BIAS))

const MAX_RGB9E5_EXP              = 16u;
const RGB9E5_MANTISSA_VALUES      = 512;
const MAX_RGB9E5_MANTISSA         = 511;
const MAX_RGB9E5_MANTISSAU        = 511u;
const MAX_RGB9E5_                 = 65408.0;
const EPSILON_RGB9E5_             = 0.000000059604645;

fn floor_log2_(x: f32) -> i32 {
    let f = bitcast<u32>(x);
    let biasedexponent = (f & 0x7F800000u) >> 23u;
    return i32(biasedexponent) - 127;
}

// https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_texture_shared_exponent.txt
fn vec3_to_rgb9e5_(rgb_in: vec3<f32>) -> u32 {
    let rgb = clamp(rgb_in, vec3(0.0), vec3(MAX_RGB9E5_));

    let maxrgb = max(rgb.r, max(rgb.g, rgb.b));
    var exp_shared = max(-RGB9E5_EXP_BIAS - 1, floor_log2_(maxrgb)) + 1 + RGB9E5_EXP_BIAS;
    var denom = exp2(f32(exp_shared - RGB9E5_EXP_BIAS - RGB9E5_MANTISSA_BITS));

    let maxm = i32(floor(maxrgb / denom + 0.5));
    if (maxm == RGB9E5_MANTISSA_VALUES) {
        denom *= 2.0;
        exp_shared += 1;
    }

    let n = vec3<u32>(floor(rgb / denom + 0.5));
    
    return (u32(exp_shared) << 27u) | (n.b << 18u) | (n.g << 9u) | (n.r << 0u);
}

// Builtin extractBits() is not working on WEBGL or DX12
// DX12: HLSL: Unimplemented("write_expr_math ExtractBits")
fn extract_bits(value: u32, offset: u32, bits: u32) -> u32 {
    let mask = (1u << bits) - 1u;
    return (value >> offset) & mask;
}

fn rgb9e5_to_vec3_(v: u32) -> vec3<f32> {
    let exponent = i32(extract_bits(v, 27u, RGB9E5_EXPONENT_BITS)) - RGB9E5_EXP_BIAS - RGB9E5_MANTISSA_BITS;
    let scale = exp2(f32(exponent));

    return vec3(
        f32(extract_bits(v, 0u, RGB9E5_MANTISSA_BITSU)),
        f32(extract_bits(v, 9u, RGB9E5_MANTISSA_BITSU)),
        f32(extract_bits(v, 18u, RGB9E5_MANTISSA_BITSU))
    ) * scale;
}
`,Uo=`
#import render::view::View
#import pbr::utils::coords_to_viewport_uv

@group(0) @binding(0) var<uniform> view: View;
@group(1) @binding(0) var skybox: texture_cube<f32>;
@group(1) @binding(1) var skybox_sampler: sampler;

fn coords_to_ray_direction(position: vec2<f32>, viewport: vec4<f32>) -> vec3<f32> {
    // Using world positions of the fragment and camera to calculate a ray direction
    // breaks down at large translations. This code only needs to know the ray direction.
    // The ray direction is along the direction from the camera to the fragment position.
    // In view space, the camera is at the origin, so the view space ray direction is
    // along the direction of the fragment position - (0,0,0) which is just the
    // fragment position.
    // Use the position on the near clipping plane to avoid -inf world position
    // because the far plane of an infinite reverse projection is at infinity.
    let view_position_homogeneous = view.inverse_projection * vec4(
        coords_to_viewport_uv(position, viewport) * vec2(2.0, -2.0) + vec2(-1.0, 1.0),
        1.0,
        1.0,
    );
    let view_ray_direction = view_position_homogeneous.xyz / view_position_homogeneous.w;
    // Transforming the view space ray direction by the view matrix, transforms the
    // direction to world space. Note that the w element is set to 0.0, as this is a
    // vector direction, not a position, That causes the matrix multiplication to ignore
    // the translations from the view matrix.
    let ray_direction = (view.view * vec4(view_ray_direction, 0.0)).xyz;

    return normalize(ray_direction);
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
};

//  3 |  2.
//  2 |  :  \`.
//  1 |  x-----x.
//  0 |  |  s  |  \`.
// -1 |  0-----x.....1
//    +---------------
//      -1  0  1  2  3
//
// The axes are clip-space x and y. The region marked s is the visible region.
// The digits in the corners of the right-angled triangle are the vertex
// indices.
@vertex
fn skybox_vertex(@builtin(vertex_index) vertex_index: u32) -> VertexOutput {
    // See the explanation above for how this works.
    let clip_position = vec4(
        f32(vertex_index & 1u),
        f32((vertex_index >> 1u) & 1u),
        0.25,
        0.5
    ) * 4.0 - vec4(1.0);

    return VertexOutput(clip_position);
}

@fragment
fn skybox_fragment(in: VertexOutput) -> @location(0) vec4<f32> {
    let ray_direction = coords_to_ray_direction(in.position.xy, view.viewport);

    // Cube maps are left-handed so we negate the z coordinate.
    return textureSample(skybox, skybox_sampler, ray_direction * vec3(1.0, 1.0, -1.0));
}
`,Eg=`
#define_import_path render::view

struct ColorGrading {
    exposure: f32,
    gamma: f32,
    pre_saturation: f32,
    post_saturation: f32,
}

struct View {
    view_proj: mat4x4<f32>,
    unjittered_view_proj: mat4x4<f32>,
    inverse_view_proj: mat4x4<f32>,
    view: mat4x4<f32>,
    inverse_view: mat4x4<f32>,
    projection: mat4x4<f32>,
    inverse_projection: mat4x4<f32>,
    world_position: vec3<f32>,
    // viewport(x_origin, y_origin, width, height)
    viewport: vec4<f32>,
    frustum: array<vec4<f32>, 6>,
    color_grading: ColorGrading,
    mip_bias: f32,
};
`,yg=`
#define_import_path render::instance_index

#ifdef BASE_INSTANCE_WORKAROUND
// naga and wgpu should polyfill WGSL instance_index functionality where it is
// not available in GLSL. Until that is done, we can work around it in bevy
// using a push constant which is converted to a uniform by naga and wgpu.
// https://github.com/gfx-rs/wgpu/issues/1573
var<push_constant> base_instance: i32;

fn get_instance_index(instance_index: u32) -> u32 {
    return u32(base_instance) + instance_index;
}
#else
fn get_instance_index(instance_index: u32) -> u32 {
    return instance_index;
}
#endif
`,vg=`
#define_import_path pbr::mesh_types

struct Mesh {
    // Affine 4x3 matrices transposed to 3x4
    // Use render::maths::affine_to_square to unpack
    model: mat3x4<f32>,
    previous_model: mat3x4<f32>,
    // 3x3 matrix packed in mat2x4 and f32 as:
    // [0].xyz, [1].x,
    // [1].yz, [2].xy
    // [2].z
    // Use pbr::mesh_functions::mat2x4_f32_to_mat3x3_unpack to unpack
    inverse_transpose_model_a: mat2x4<f32>,
    inverse_transpose_model_b: f32,
    // 'flags' is a bit field indicating various options. u32 is 32 bits so we have up to 32 options.
    flags: u32,
};

#ifdef SKINNED
struct SkinnedMesh {
    data: array<mat4x4<f32>, 256u>,
};
#endif

#ifdef MORPH_TARGETS
struct MorphWeights {
    weights: array<vec4<f32>, 16u>, // 16 = 64 / 4 (64 = MAX_MORPH_WEIGHTS)
};
#endif

const MESH_FLAGS_SHADOW_RECEIVER_BIT: u32 = 1u;
const MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT: u32 = 2u;
// 2^31 - if the flag is set, the sign is positive, else it is negative
const MESH_FLAGS_SIGN_DETERMINANT_MODEL_3X3_BIT: u32 = 2147483648u;
`,Ag=`
#define_import_path pbr::mesh_bindings

#import pbr::mesh_types::Mesh

// #ifdef MESH_BINDGROUP_1

// #ifdef PER_OBJECT_BUFFER_BATCH_SIZE
// @group(1) @binding(0) var<uniform> mesh: array<Mesh, #{PER_OBJECT_BUFFER_BATCH_SIZE}u>;
// #else
// @group(1) @binding(0) var<storage> mesh: array<Mesh>;
// #endif // PER_OBJECT_BUFFER_BATCH_SIZE

// #else // MESH_BINDGROUP_1

// #ifdef PER_OBJECT_BUFFER_BATCH_SIZE
// @group(2) @binding(0) var<uniform> mesh: array<Mesh, #{PER_OBJECT_BUFFER_BATCH_SIZE}u>;
// #else
@group(2) @binding(0) var<storage> mesh: array<Mesh>;
// #endif // PER_OBJECT_BUFFER_BATCH_SIZE

// #endif // MESH_BINDGROUP_1
`,wg=`
#define_import_path pbr::mesh_view_types

struct PointLight {
    // For point lights: the lower-right 2x2 values of the projection matrix [2][2] [2][3] [3][2] [3][3]
    // For spot lights: the direction (x,z), spot_scale and spot_offset
    light_custom_data: vec4<f32>,
    color_inverse_square_range: vec4<f32>,
    position_radius: vec4<f32>,
    // 'flags' is a bit field indicating various options. u32 is 32 bits so we have up to 32 options.
    flags: u32,
    shadow_depth_bias: f32,
    shadow_normal_bias: f32,
    spot_light_tan_angle: f32,
};

const POINT_LIGHT_FLAGS_SHADOWS_ENABLED_BIT: u32   = 1u;
const POINT_LIGHT_FLAGS_SPOT_LIGHT_Y_NEGATIVE: u32 = 2u;

struct DirectionalCascade {
    view_projection: mat4x4<f32>,
    texel_size: f32,
    far_bound: f32,
}

const MAX_CASCADES_PER_LIGHT: u32 = 4u;
const MAX_DIRECTIONAL_LIGHTS: u32 = 10u;

struct DirectionalLight {
    cascades: array<DirectionalCascade, MAX_CASCADES_PER_LIGHT>,
    color: vec4<f32>,
    direction_to_light: vec3<f32>,
    // 'flags' is a bit field indicating various options. u32 is 32 bits so we have up to 32 options.
    flags: u32,
    shadow_depth_bias: f32,
    shadow_normal_bias: f32,
    num_cascades: u32,
    cascades_overlap_proportion: f32,
    depth_texture_base_index: u32,
};

const DIRECTIONAL_LIGHT_FLAGS_SHADOWS_ENABLED_BIT: u32 = 1u;

struct Lights {
    // NOTE: this array size must be kept in sync with the constants defined in pbr/src/render/light.rs
    directional_lights: array<DirectionalLight, MAX_DIRECTIONAL_LIGHTS>,
    ambient_color: vec4<f32>,
    // x/y/z dimensions and n_clusters in w
    cluster_dimensions: vec4<u32>,
    // xy are vec2<f32>(cluster_dimensions.xy) / vec2<f32>(view.width, view.height)
    //
    // For perspective projections:
    // z is cluster_dimensions.z / log(far / near)
    // w is cluster_dimensions.z * log(near) / log(far / near)
    //
    // For orthographic projections:
    // NOTE: near and far are +ve but -z is infront of the camera
    // z is -near
    // w is cluster_dimensions.z / (-far - -near)
    cluster_factors: vec4<f32>,
    n_directional_lights: f32,
    spot_light_shadowmap_offset: f32,
    environment_map_smallest_specular_mip_level: f32,
};

struct Fog {
    base_color: vec4<f32>,
    directional_light_color: vec4<f32>,
    // \`be\` and \`bi\` are allocated differently depending on the fog mode
    //
    // For Linear Fog:
    //     be.x = start, be.y = end
    // For Exponential and ExponentialSquared Fog:
    //     be.x = density
    // For Atmospheric Fog:
    //     be = per-channel extinction density
    //     bi = per-channel inscattering density
    be: vec3<f32>,
    directional_light_exponent: f32,
    bi: vec3<f32>,
    mode: f32, // TODO: use u32 instead
}

// Important: These must be kept in sync with \`fog.rs\`
const FOG_MODE_OFF: u32                   = 0u;
const FOG_MODE_LINEAR: u32                = 1u;
const FOG_MODE_EXPONENTIAL: u32           = 2u;
const FOG_MODE_EXPONENTIAL_SQUARED: u32   = 3u;
const FOG_MODE_ATMOSPHERIC: u32           = 4u;

// @see https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedLimits
// #define AVAILABLE_STORAGE_BUFFER_BINDINGS 8

// #if AVAILABLE_STORAGE_BUFFER_BINDINGS >= 3
struct PointLights {
    data: array<PointLight>,
};
struct ClusterLightIndexLists {
    data: array<u32>,
};
struct ClusterOffsetsAndCounts {
    data: array<vec4<u32>>,
};
// #else
// struct PointLights {
//     data: array<PointLight, 256u>,
// };
// struct ClusterLightIndexLists {
//     // each u32 contains 4 u8 indices into the PointLights array
//     data: array<vec4<u32>, 1024u>,
// };
// struct ClusterOffsetsAndCounts {
//     // each u32 contains a 24-bit index into ClusterLightIndexLists in the high 24 bits
//     // and an 8-bit count of the number of lights in the low 8 bits
//     data: array<vec4<u32>, 1024u>,
// };
// #endif
`,Tg=`
#define_import_path pbr::mesh_view_bindings

#import pbr::mesh_view_types as types
#import render::{
    view::View,
    globals::Globals,
}

@group(0) @binding(0) var<uniform> view: View;
@group(0) @binding(1) var<uniform> lights: types::Lights;
@group(0) @binding(2) var<uniform> fog: types::Fog;
// #ifdef NO_ARRAY_TEXTURES_SUPPORT
// @group(0) @binding(2) var point_shadow_textures: texture_depth_cube;
// #else
// @group(0) @binding(2) var point_shadow_textures: texture_depth_cube_array;
// #endif
// @group(0) @binding(3) var point_shadow_textures_sampler: sampler_comparison;
// #ifdef NO_ARRAY_TEXTURES_SUPPORT
// @group(0) @binding(4) var directional_shadow_textures: texture_depth_2d;
// #else
// @group(0) @binding(4) var directional_shadow_textures: texture_depth_2d_array;
// #endif
// @group(0) @binding(5) var directional_shadow_textures_sampler: sampler_comparison;

// @see https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedLimits
// #define AVAILABLE_STORAGE_BUFFER_BINDINGS 8

// #if AVAILABLE_STORAGE_BUFFER_BINDINGS >= 3
// @group(0) @binding(6) var<storage> point_lights: types::PointLights;
// @group(0) @binding(7) var<storage> cluster_light_index_lists: types::ClusterLightIndexLists;
// @group(0) @binding(8) var<storage> cluster_offsets_and_counts: types::ClusterOffsetsAndCounts;
// #else
// @group(0) @binding(6) var<uniform> point_lights: types::PointLights;
// @group(0) @binding(7) var<uniform> cluster_light_index_lists: types::ClusterLightIndexLists;
// @group(0) @binding(8) var<uniform> cluster_offsets_and_counts: types::ClusterOffsetsAndCounts;
// #endif

// @group(0) @binding(9) var<uniform> globals: Globals;
// @group(0) @binding(10) var<uniform> fog: types::Fog;

// @group(0) @binding(11) var screen_space_ambient_occlusion_texture: texture_2d<f32>;

// @group(0) @binding(12) var environment_map_diffuse: texture_cube<f32>;
// @group(0) @binding(13) var environment_map_specular: texture_cube<f32>;
// @group(0) @binding(14) var environment_map_sampler: sampler;

// @group(0) @binding(15) var dt_lut_texture: texture_3d<f32>;
// @group(0) @binding(16) var dt_lut_sampler: sampler;

// #ifdef MULTISAMPLED
// #ifdef DEPTH_PREPASS
// @group(0) @binding(17) var depth_prepass_texture: texture_depth_multisampled_2d;
// #endif // DEPTH_PREPASS
// #ifdef NORMAL_PREPASS
// @group(0) @binding(18) var normal_prepass_texture: texture_multisampled_2d<f32>;
// #endif // NORMAL_PREPASS
// #ifdef MOTION_VECTOR_PREPASS
// @group(0) @binding(19) var motion_vector_prepass_texture: texture_multisampled_2d<f32>;
// #endif // MOTION_VECTOR_PREPASS

// #else // MULTISAMPLED

// #ifdef DEPTH_PREPASS
// @group(0) @binding(17) var depth_prepass_texture: texture_depth_2d;
// #endif // DEPTH_PREPASS
// #ifdef NORMAL_PREPASS
// @group(0) @binding(18) var normal_prepass_texture: texture_2d<f32>;
// #endif // NORMAL_PREPASS
// #ifdef MOTION_VECTOR_PREPASS
// @group(0) @binding(19) var motion_vector_prepass_texture: texture_2d<f32>;
// #endif // MOTION_VECTOR_PREPASS

// #endif // MULTISAMPLED

// #ifdef DEFERRED_PREPASS
// @group(0) @binding(20) var deferred_prepass_texture: texture_2d<u32>;
// #endif // DEFERRED_PREPASS

// @group(0) @binding(21) var view_transmission_texture: texture_2d<f32>;
// @group(0) @binding(22) var view_transmission_sampler: sampler;
`,Rg=`
#define_import_path pbr::view_transformations

#import pbr::mesh_view_bindings as view_bindings

/// World space:
/// +y is up

/// View space:
/// -z is forward, +x is right, +y is up
/// Forward is from the camera position into the scene.
/// (0.0, 0.0, -1.0) is linear distance of 1.0 in front of the camera's view relative to the camera's rotation
/// (0.0, 1.0, 0.0) is linear distance of 1.0 above the camera's view relative to the camera's rotation

/// NDC (normalized device coordinate):
/// https://www.w3.org/TR/webgpu/#coordinate-systems
/// (-1.0, -1.0) in NDC is located at the bottom-left corner of NDC
/// (1.0, 1.0) in NDC is located at the top-right corner of NDC
/// Z is depth where: 
///    1.0 is near clipping plane
///    Perspective projection: 0.0 is inf far away
///    Orthographic projection: 0.0 is far clipping plane

/// UV space:
/// 0.0, 0.0 is the top left
/// 1.0, 1.0 is the bottom right


// -----------------
// TO WORLD --------
// -----------------

/// Convert a view space position to world space
fn position_view_to_world(view_pos: vec3<f32>) -> vec3<f32> {
    let world_pos = view_bindings::view.view * vec4(view_pos, 1.0);
    return world_pos.xyz;
}

/// Convert a clip space position to world space
fn position_clip_to_world(clip_pos: vec4<f32>) -> vec3<f32> {
    let world_pos = view_bindings::view.inverse_view_proj * clip_pos;
    return world_pos.xyz;
}

/// Convert a ndc space position to world space
fn position_ndc_to_world(ndc_pos: vec3<f32>) -> vec3<f32> {
    let world_pos = view_bindings::view.inverse_view_proj * vec4(ndc_pos, 1.0);
    return world_pos.xyz / world_pos.w;
}

/// Convert a view space direction to world space
fn direction_view_to_world(view_dir: vec3<f32>) -> vec3<f32> {
    let world_dir = view_bindings::view.view * vec4(view_dir, 0.0);
    return world_dir.xyz;
}

/// Convert a clip space direction to world space
fn direction_clip_to_world(clip_dir: vec4<f32>) -> vec3<f32> {
    let world_dir = view_bindings::view.inverse_view_proj * clip_dir;
    return world_dir.xyz;
}

// -----------------
// TO VIEW ---------
// -----------------

/// Convert a world space position to view space
fn position_world_to_view(world_pos: vec3<f32>) -> vec3<f32> {
    let view_pos = view_bindings::view.inverse_view * vec4(world_pos, 1.0);
    return view_pos.xyz;
}

/// Convert a clip space position to view space
fn position_clip_to_view(clip_pos: vec4<f32>) -> vec3<f32> {
    let view_pos = view_bindings::view.inverse_projection * clip_pos;
    return view_pos.xyz;
}

/// Convert a ndc space position to view space
fn position_ndc_to_view(ndc_pos: vec3<f32>) -> vec3<f32> {
    let view_pos = view_bindings::view.inverse_projection * vec4(ndc_pos, 1.0);
    return view_pos.xyz / view_pos.w;
}

/// Convert a world space direction to view space
fn direction_world_to_view(world_dir: vec3<f32>) -> vec3<f32> {
    let view_dir = view_bindings::view.inverse_view * vec4(world_dir, 0.0);
    return view_dir.xyz;
}

/// Convert a clip space direction to view space
fn direction_clip_to_view(clip_dir: vec4<f32>) -> vec3<f32> {
    let view_dir = view_bindings::view.inverse_projection * clip_dir;
    return view_dir.xyz;
}

// -----------------
// TO CLIP ---------
// -----------------

/// Convert a world space position to clip space
fn position_world_to_clip(world_pos: vec3<f32>) -> vec4<f32> {
    let clip_pos = view_bindings::view.view_proj * vec4(world_pos, 1.0);
    return clip_pos;
}

/// Convert a view space position to clip space
fn position_view_to_clip(view_pos: vec3<f32>) -> vec4<f32> {
    let clip_pos = view_bindings::view.projection * vec4(view_pos, 1.0);
    return clip_pos;
}

/// Convert a world space direction to clip space
fn direction_world_to_clip(world_dir: vec3<f32>) -> vec4<f32> {
    let clip_dir = view_bindings::view.view_proj * vec4(world_dir, 0.0);
    return clip_dir;
}

/// Convert a view space direction to clip space
fn direction_view_to_clip(view_dir: vec3<f32>) -> vec4<f32> {
    let clip_dir = view_bindings::view.projection * vec4(view_dir, 0.0);
    return clip_dir;
}

// -----------------
// TO NDC ----------
// -----------------

/// Convert a world space position to ndc space
fn position_world_to_ndc(world_pos: vec3<f32>) -> vec3<f32> {
    let ndc_pos = view_bindings::view.view_proj * vec4(world_pos, 1.0);
    return ndc_pos.xyz / ndc_pos.w;
}

/// Convert a view space position to ndc space
fn position_view_to_ndc(view_pos: vec3<f32>) -> vec3<f32> {
    let ndc_pos = view_bindings::view.projection * vec4(view_pos, 1.0);
    return ndc_pos.xyz / ndc_pos.w;
}

// -----------------
// DEPTH -----------
// -----------------

/// Retrieve the perspective camera near clipping plane
fn perspective_camera_near() -> f32 {
    return view_bindings::view.projection[3][2];
}

/// Convert ndc depth to linear view z. 
/// Note: Depth values in front of the camera will be negative as -z is forward
fn depth_ndc_to_view_z(ndc_depth: f32) -> f32 {
#ifdef VIEW_PROJECTION_PERSPECTIVE
    return -perspective_camera_near() / ndc_depth;
#else ifdef VIEW_PROJECTION_ORTHOGRAPHIC
    return -(view_bindings::view.projection[3][2] - ndc_depth) / view_bindings::view.projection[2][2];
#else
    let view_pos = view_bindings::view.inverse_projection * vec4(0.0, 0.0, ndc_depth, 1.0);
    return view_pos.z / view_pos.w;
#endif
}

/// Convert linear view z to ndc depth. 
/// Note: View z input should be negative for values in front of the camera as -z is forward
fn view_z_to_depth_ndc(view_z: f32) -> f32 {
#ifdef VIEW_PROJECTION_PERSPECTIVE
    return -perspective_camera_near() / view_z;
#else ifdef VIEW_PROJECTION_ORTHOGRAPHIC
    return view_bindings::view.projection[3][2] + view_z * view_bindings::view.projection[2][2];
#else
    let ndc_pos = view_bindings::view.projection * vec4(0.0, 0.0, view_z, 1.0);
    return ndc_pos.z / ndc_pos.w;
#endif
}

// -----------------
// UV --------------
// -----------------

/// Convert ndc space xy coordinate [-1.0 .. 1.0] to uv [0.0 .. 1.0]
fn ndc_to_uv(ndc: vec2<f32>) -> vec2<f32> {
    return ndc * vec2(0.5, -0.5) + vec2(0.5);
}

/// Convert uv [0.0 .. 1.0] coordinate to ndc space xy [-1.0 .. 1.0]
fn uv_to_ndc(uv: vec2<f32>) -> vec2<f32> {
    return uv * vec2(2.0, -2.0) + vec2(-1.0, 1.0);
}

/// returns the (0.0, 0.0) .. (1.0, 1.0) position within the viewport for the current render target
/// [0 .. render target viewport size] eg. [(0.0, 0.0) .. (1280.0, 720.0)] to [(0.0, 0.0) .. (1.0, 1.0)]
fn frag_coord_to_uv(frag_coord: vec2<f32>) -> vec2<f32> {
    return (frag_coord - view_bindings::view.viewport.xy) / view_bindings::view.viewport.zw;
}

/// Convert frag coord to ndc
fn frag_coord_to_ndc(frag_coord: vec4<f32>) -> vec3<f32> {
    return vec3(uv_to_ndc(frag_coord_to_uv(frag_coord.xy)), frag_coord.z);
}
`,bg=`
#define_import_path pbr::prepass_utils

#import pbr::mesh_view_bindings as view_bindings

#ifdef DEPTH_PREPASS
fn prepass_depth(frag_coord: vec4<f32>, sample_index: u32) -> f32 {
#ifdef MULTISAMPLED
    return textureLoad(view_bindings::depth_prepass_texture, vec2<i32>(frag_coord.xy), i32(sample_index));
#else // MULTISAMPLED
    return textureLoad(view_bindings::depth_prepass_texture, vec2<i32>(frag_coord.xy), 0);
#endif // MULTISAMPLED
}
#endif // DEPTH_PREPASS

#ifdef NORMAL_PREPASS
fn prepass_normal(frag_coord: vec4<f32>, sample_index: u32) -> vec3<f32> {
#ifdef MULTISAMPLED
    let normal_sample = textureLoad(view_bindings::normal_prepass_texture, vec2<i32>(frag_coord.xy), i32(sample_index));
#else
    let normal_sample = textureLoad(view_bindings::normal_prepass_texture, vec2<i32>(frag_coord.xy), 0);
#endif // MULTISAMPLED
    return normalize(normal_sample.xyz * 2.0 - vec3(1.0));
}
#endif // NORMAL_PREPASS

#ifdef MOTION_VECTOR_PREPASS
fn prepass_motion_vector(frag_coord: vec4<f32>, sample_index: u32) -> vec2<f32> {
#ifdef MULTISAMPLED
    let motion_vector_sample = textureLoad(view_bindings::motion_vector_prepass_texture, vec2<i32>(frag_coord.xy), i32(sample_index));
#else
    let motion_vector_sample = textureLoad(view_bindings::motion_vector_prepass_texture, vec2<i32>(frag_coord.xy), 0);
#endif
    return motion_vector_sample.rg;
}
#endif // MOTION_VECTOR_PREPASS
`,xg=`
#define_import_path pbr::prepass_io

// Most of these attributes are not used in the default prepass fragment shader, but they are still needed so we can
// pass them to custom prepass shaders like pbr_prepass.wgsl.
struct Vertex {
    @builtin(instance_index) instance_index: u32,
    @location(0) position: vec3<f32>,

#ifdef VERTEX_UVS
    @location(1) uv: vec2<f32>,
#endif

#ifdef NORMAL_PREPASS_OR_DEFERRED_PREPASS
    @location(2) normal: vec3<f32>,
#ifdef VERTEX_TANGENTS
    @location(3) tangent: vec4<f32>,
#endif
#endif // NORMAL_PREPASS_OR_DEFERRED_PREPASS

#ifdef SKINNED
    @location(4) joint_indices: vec4<u32>,
    @location(5) joint_weights: vec4<f32>,
#endif

#ifdef VERTEX_COLORS
    @location(6) color: vec4<f32>,
#endif

#ifdef MORPH_TARGETS
    @builtin(vertex_index) index: u32,
#endif // MORPH_TARGETS
}

struct VertexOutput {
    // This is \`clip position\` when the struct is used as a vertex stage output
    // and \`frag coord\` when used as a fragment stage input
    @builtin(position) position: vec4<f32>,

#ifdef VERTEX_UVS
    @location(0) uv: vec2<f32>,
#endif

#ifdef NORMAL_PREPASS_OR_DEFERRED_PREPASS
    @location(1) world_normal: vec3<f32>,
#ifdef VERTEX_TANGENTS
    @location(2) world_tangent: vec4<f32>,
#endif
#endif // NORMAL_PREPASS_OR_DEFERRED_PREPASS

    @location(3) world_position: vec4<f32>,
#ifdef MOTION_VECTOR_PREPASS
    @location(4) previous_world_position: vec4<f32>,
#endif

#ifdef DEPTH_CLAMP_ORTHO
    @location(5) clip_position_unclamped: vec4<f32>,
#endif // DEPTH_CLAMP_ORTHO
#ifdef VERTEX_OUTPUT_INSTANCE_INDEX
    @location(6) instance_index: u32,
#endif

#ifdef VERTEX_COLORS
    @location(7) color: vec4<f32>,
#endif
}

#ifdef PREPASS_FRAGMENT
struct FragmentOutput {
#ifdef NORMAL_PREPASS
    @location(0) normal: vec4<f32>,
#endif

#ifdef MOTION_VECTOR_PREPASS
    @location(1) motion_vector: vec2<f32>,
#endif

#ifdef DEFERRED_PREPASS
    @location(2) deferred: vec4<u32>,
    @location(3) deferred_lighting_pass_id: u32,
#endif

#ifdef DEPTH_CLAMP_ORTHO
    @builtin(frag_depth) frag_depth: f32,
#endif // DEPTH_CLAMP_ORTHO
}
#endif //PREPASS_FRAGMENT
`,Sg=`
#define_import_path pbr::forward_io

struct Vertex {
    @builtin(instance_index) instance_index: u32,
#ifdef VERTEX_POSITIONS
    @location(0) position: vec3<f32>,
#endif
#ifdef VERTEX_NORMALS
    @location(1) normal: vec3<f32>,
#endif
#ifdef VERTEX_UVS
    @location(2) uv: vec2<f32>,
#endif
// (Alternate UVs are at location 3, but they're currently unused here.)
#ifdef VERTEX_TANGENTS
    @location(4) tangent: vec4<f32>,
#endif
#ifdef VERTEX_COLORS
    @location(5) color: vec4<f32>,
#endif
#ifdef SKINNED
    @location(6) joint_indices: vec4<u32>,
    @location(7) joint_weights: vec4<f32>,
#endif
#ifdef MORPH_TARGETS
    @builtin(vertex_index) index: u32,
#endif
};

struct VertexOutput {
    // This is \`clip position\` when the struct is used as a vertex stage output
    // and \`frag coord\` when used as a fragment stage input
    @builtin(position) position: vec4<f32>,
    @location(0) world_position: vec4<f32>,
    @location(1) world_normal: vec3<f32>,
#ifdef VERTEX_UVS
    @location(2) uv: vec2<f32>,
#endif
#ifdef VERTEX_TANGENTS
    @location(3) world_tangent: vec4<f32>,
#endif
#ifdef VERTEX_COLORS
    @location(4) color: vec4<f32>,
#endif
// #ifdef VERTEX_OUTPUT_INSTANCE_INDEX
    @location(5) @interpolate(flat) instance_index: u32,
// #endif
}

struct FragmentOutput {
    @location(0) color: vec4<f32>,
}
`,Ig=`
#define_import_path pbr::pbr_types

struct StandardMaterial {
    base_color: vec4<f32>,
    emissive: vec4<f32>,
    perceptual_roughness: f32,
    metallic: f32,
    reflectance: f32,
    diffuse_transmission: f32,
    specular_transmission: f32,
    thickness: f32,
    ior: f32,
    attenuation_distance: f32,
    attenuation_color: vec4<f32>,
    // 'flags' is a bit field indicating various options. u32 is 32 bits so we have up to 32 options.
    flags: f32,
    alpha_cutoff: f32,
    parallax_depth_scale: f32,
    max_parallax_layer_count: f32,
    max_relief_mapping_search_steps: u32,
    /// ID for specifying which deferred lighting pass should be used for rendering this material, if any.
    deferred_lighting_pass_id: u32,
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// NOTE: if these flags are updated or changed. Be sure to also update 
// deferred_flags_from_mesh_material_flags and mesh_material_flags_from_deferred_flags
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const STANDARD_MATERIAL_FLAGS_BASE_COLOR_TEXTURE_BIT: u32         = 1u;
const STANDARD_MATERIAL_FLAGS_EMISSIVE_TEXTURE_BIT: u32           = 2u;
const STANDARD_MATERIAL_FLAGS_METALLIC_ROUGHNESS_TEXTURE_BIT: u32 = 4u;
const STANDARD_MATERIAL_FLAGS_OCCLUSION_TEXTURE_BIT: u32          = 8u;
const STANDARD_MATERIAL_FLAGS_DOUBLE_SIDED_BIT: u32               = 16u;
const STANDARD_MATERIAL_FLAGS_UNLIT_BIT: u32                      = 32u;
const STANDARD_MATERIAL_FLAGS_TWO_COMPONENT_NORMAL_MAP: u32       = 64u;
const STANDARD_MATERIAL_FLAGS_FLIP_NORMAL_MAP_Y: u32              = 128u;
const STANDARD_MATERIAL_FLAGS_FOG_ENABLED_BIT: u32                = 256u;
const STANDARD_MATERIAL_FLAGS_DEPTH_MAP_BIT: u32                  = 512u;
const STANDARD_MATERIAL_FLAGS_SPECULAR_TRANSMISSION_TEXTURE_BIT: u32 = 1024u;
const STANDARD_MATERIAL_FLAGS_THICKNESS_TEXTURE_BIT: u32          = 2048u;
const STANDARD_MATERIAL_FLAGS_DIFFUSE_TRANSMISSION_TEXTURE_BIT: u32 = 4096u;
const STANDARD_MATERIAL_FLAGS_ATTENUATION_ENABLED_BIT: u32        = 8192u;
const STANDARD_MATERIAL_FLAGS_ALPHA_MODE_RESERVED_BITS: u32       = 3758096384u; // (0b111u32 << 29)
const STANDARD_MATERIAL_FLAGS_ALPHA_MODE_OPAQUE: u32              = 0u;          // (0u32 << 29)
const STANDARD_MATERIAL_FLAGS_ALPHA_MODE_MASK: u32                = 536870912u;  // (1u32 << 29)
const STANDARD_MATERIAL_FLAGS_ALPHA_MODE_BLEND: u32               = 1073741824u; // (2u32 << 29)
const STANDARD_MATERIAL_FLAGS_ALPHA_MODE_PREMULTIPLIED: u32       = 1610612736u; // (3u32 << 29)
const STANDARD_MATERIAL_FLAGS_ALPHA_MODE_ADD: u32                 = 2147483648u; // (4u32 << 29)
const STANDARD_MATERIAL_FLAGS_ALPHA_MODE_MULTIPLY: u32            = 2684354560u; // (5u32 << 29)
// ↑ To calculate/verify the values above, use the following playground:
// https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=7792f8dd6fc6a8d4d0b6b1776898a7f4


// Creates a StandardMaterial with default values
fn standard_material_new() -> StandardMaterial {
    var material: StandardMaterial;

    // NOTE: Keep in-sync with src/pbr_material.rs!
    material.base_color = vec4<f32>(1.0, 1.0, 1.0, 1.0);
    material.emissive = vec4<f32>(0.0, 0.0, 0.0, 1.0);
    material.perceptual_roughness = 0.5;
    material.metallic = 0.00;
    material.reflectance = 0.5;
    material.diffuse_transmission = 0.0;
    material.specular_transmission = 0.0;
    material.thickness = 0.0;
    material.ior = 1.5;
    material.attenuation_distance = 1.0;
    material.attenuation_color = vec4<f32>(1.0, 1.0, 1.0, 1.0);
    material.flags = f32(STANDARD_MATERIAL_FLAGS_ALPHA_MODE_OPAQUE);
    material.alpha_cutoff = 0.5;
    material.parallax_depth_scale = 0.1;
    material.max_parallax_layer_count = 16.0;
    material.max_relief_mapping_search_steps = 5u;
    material.deferred_lighting_pass_id = 1u;
    
    return material;
}

struct PbrInput {
    material: StandardMaterial,
    occlusion: vec3<f32>,
    frag_coord: vec4<f32>,
    world_position: vec4<f32>,
    // Normalized world normal used for shadow mapping as normal-mapping is not used for shadow
    // mapping
    world_normal: vec3<f32>,
    // Normalized normal-mapped world normal used for lighting
    N: vec3<f32>,
    // Normalized view vector in world space, pointing from the fragment world position toward the
    // view world position
    V: vec3<f32>,
    is_orthographic: bool,
    flags: u32,
};

// Creates a PbrInput with default values
fn pbr_input_new() -> PbrInput {
    var pbr_input: PbrInput;

    pbr_input.material = standard_material_new();
    pbr_input.occlusion = vec3<f32>(1.0);

    pbr_input.frag_coord = vec4<f32>(0.0, 0.0, 0.0, 1.0);
    pbr_input.world_position = vec4<f32>(0.0, 0.0, 0.0, 1.0);
    pbr_input.world_normal = vec3<f32>(0.0, 0.0, 1.0);

    pbr_input.is_orthographic = false;

    pbr_input.N = vec3<f32>(0.0, 0.0, 1.0);
    pbr_input.V = vec3<f32>(1.0, 0.0, 0.0);

    pbr_input.flags = 0u;

    return pbr_input;
}
`,Og=`
#define_import_path pbr::pbr_bindings

#import pbr::pbr_types::StandardMaterial

@group(0) @binding(3) var<uniform> material: StandardMaterial;
@group(1) @binding(0) var base_color_texture: texture_2d<f32>;
@group(1) @binding(1) var base_color_sampler: sampler;
// @group(1) @binding(3) var emissive_texture: texture_2d<f32>;
// @group(1) @binding(4) var emissive_sampler: sampler;
// @group(1) @binding(5) var metallic_roughness_texture: texture_2d<f32>;
// @group(1) @binding(6) var metallic_roughness_sampler: sampler;
// @group(1) @binding(7) var occlusion_texture: texture_2d<f32>;
// @group(1) @binding(8) var occlusion_sampler: sampler;
// @group(1) @binding(9) var normal_map_texture: texture_2d<f32>;
// @group(1) @binding(10) var normal_map_sampler: sampler;
// @group(1) @binding(11) var depth_map_texture: texture_2d<f32>;
// @group(1) @binding(12) var depth_map_sampler: sampler;
// #ifdef PBR_TRANSMISSION_TEXTURES_SUPPORTED
// @group(1) @binding(13) var specular_transmission_texture: texture_2d<f32>;
// @group(1) @binding(14) var specular_transmission_sampler: sampler;
// @group(1) @binding(15) var thickness_texture: texture_2d<f32>;
// @group(1) @binding(16) var thickness_sampler: sampler;
// @group(1) @binding(17) var diffuse_transmission_texture: texture_2d<f32>;
// @group(1) @binding(18) var diffuse_transmission_sampler: sampler;
// #endif
`,Ng=`
#define_import_path pbr::lighting

#import pbr::{
    utils::PI,
    mesh_view_types::POINT_LIGHT_FLAGS_SPOT_LIGHT_Y_NEGATIVE,
    mesh_view_bindings as view_bindings,
}

// From the Filament design doc
// https://google.github.io/filament/Filament.html#table_symbols
// Symbol Definition
// v    View unit vector
// l    Incident light unit vector
// n    Surface normal unit vector
// h    Half unit vector between l and v
// f    BRDF
// f_d    Diffuse component of a BRDF
// f_r    Specular component of a BRDF
// α    Roughness, remapped from using input perceptualRoughness
// σ    Diffuse reflectance
// Ω    Spherical domain
// f0    Reflectance at normal incidence
// f90    Reflectance at grazing angle
// χ+(a)    Heaviside function (1 if a>0 and 0 otherwise)
// nior    Index of refraction (IOR) of an interface
// ⟨n⋅l⟩    Dot product clamped to [0..1]
// ⟨a⟩    Saturated value (clamped to [0..1])

// The Bidirectional Reflectance Distribution Function (BRDF) describes the surface response of a standard material
// and consists of two components, the diffuse component (f_d) and the specular component (f_r):
// f(v,l) = f_d(v,l) + f_r(v,l)
//
// The form of the microfacet model is the same for diffuse and specular
// f_r(v,l) = f_d(v,l) = 1 / { |n⋅v||n⋅l| } ∫_Ω D(m,α) G(v,l,m) f_m(v,l,m) (v⋅m) (l⋅m) dm
//
// In which:
// D, also called the Normal Distribution Function (NDF) models the distribution of the microfacets
// G models the visibility (or occlusion or shadow-masking) of the microfacets
// f_m is the microfacet BRDF and differs between specular and diffuse components
//
// The above integration needs to be approximated.

// distanceAttenuation is simply the square falloff of light intensity
// combined with a smooth attenuation at the edge of the light radius
//
// light radius is a non-physical construct for efficiency purposes,
// because otherwise every light affects every fragment in the scene
fn getDistanceAttenuation(distanceSquare: f32, inverseRangeSquared: f32) -> f32 {
    let factor = distanceSquare * inverseRangeSquared;
    let smoothFactor = saturate(1.0 - factor * factor);
    let attenuation = smoothFactor * smoothFactor;
    return attenuation * 1.0 / max(distanceSquare, 0.0001);
}

// Normal distribution function (specular D)
// Based on https://google.github.io/filament/Filament.html#citation-walter07

// D_GGX(h,α) = α^2 / { π ((n⋅h)^2 (α2−1) + 1)^2 }

// Simple implementation, has precision problems when using fp16 instead of fp32
// see https://google.github.io/filament/Filament.html#listing_speculardfp16
fn D_GGX(roughness: f32, NoH: f32, h: vec3<f32>) -> f32 {
    let oneMinusNoHSquared = 1.0 - NoH * NoH;
    let a = NoH * roughness;
    let k = roughness / (oneMinusNoHSquared + a * a);
    let d = k * k * (1.0 / PI);
    return d;
}

// Visibility function (Specular G)
// V(v,l,a) = G(v,l,α) / { 4 (n⋅v) (n⋅l) }
// such that f_r becomes
// f_r(v,l) = D(h,α) V(v,l,α) F(v,h,f0)
// where
// V(v,l,α) = 0.5 / { n⋅l sqrt((n⋅v)^2 (1−α2) + α2) + n⋅v sqrt((n⋅l)^2 (1−α2) + α2) }
// Note the two sqrt's, that may be slow on mobile, see https://google.github.io/filament/Filament.html#listing_approximatedspecularv
fn V_SmithGGXCorrelated(roughness: f32, NoV: f32, NoL: f32) -> f32 {
    let a2 = roughness * roughness;
    let lambdaV = NoL * sqrt((NoV - a2 * NoV) * NoV + a2);
    let lambdaL = NoV * sqrt((NoL - a2 * NoL) * NoL + a2);
    let v = 0.5 / (lambdaV + lambdaL);
    return v;
}

// Fresnel function
// see https://google.github.io/filament/Filament.html#citation-schlick94
// F_Schlick(v,h,f_0,f_90) = f_0 + (f_90 − f_0) (1 − v⋅h)^5
fn F_Schlick_vec(f0: vec3<f32>, f90: f32, VoH: f32) -> vec3<f32> {
    // not using mix to keep the vec3 and float versions identical
    return f0 + (f90 - f0) * pow(1.0 - VoH, 5.0);
}

fn F_Schlick(f0: f32, f90: f32, VoH: f32) -> f32 {
    // not using mix to keep the vec3 and float versions identical
    return f0 + (f90 - f0) * pow(1.0 - VoH, 5.0);
}

fn fresnel(f0: vec3<f32>, LoH: f32) -> vec3<f32> {
    // f_90 suitable for ambient occlusion
    // see https://google.github.io/filament/Filament.html#lighting/occlusion
    let f90 = saturate(dot(f0, vec3<f32>(50.0 * 0.33)));
    return F_Schlick_vec(f0, f90, LoH);
}

// Specular BRDF
// https://google.github.io/filament/Filament.html#materialsystem/specularbrdf

// Cook-Torrance approximation of the microfacet model integration using Fresnel law F to model f_m
// f_r(v,l) = { D(h,α) G(v,l,α) F(v,h,f0) } / { 4 (n⋅v) (n⋅l) }
fn specular(
    f0: vec3<f32>,
    roughness: f32,
    h: vec3<f32>,
    NoV: f32,
    NoL: f32,
    NoH: f32,
    LoH: f32,
    specularIntensity: f32,
    f_ab: vec2<f32>
) -> vec3<f32> {
    let D = D_GGX(roughness, NoH, h);
    let V = V_SmithGGXCorrelated(roughness, NoV, NoL);
    let F = fresnel(f0, LoH);

    var Fr = (specularIntensity * D * V) * F;

    // Multiscattering approximation: https://google.github.io/filament/Filament.html#listing_energycompensationimpl
    Fr *= 1.0 + f0 * (1.0 / f_ab.x - 1.0);

    return Fr;
}

// Diffuse BRDF
// https://google.github.io/filament/Filament.html#materialsystem/diffusebrdf
// fd(v,l) = σ/π * 1 / { |n⋅v||n⋅l| } ∫Ω D(m,α) G(v,l,m) (v⋅m) (l⋅m) dm
//
// simplest approximation
// float Fd_Lambert() {
//     return 1.0 / PI;
// }
//
// vec3 Fd = diffuseColor * Fd_Lambert();
//
// Disney approximation
// See https://google.github.io/filament/Filament.html#citation-burley12
// minimal quality difference
fn Fd_Burley(roughness: f32, NoV: f32, NoL: f32, LoH: f32) -> f32 {
    let f90 = 0.5 + 2.0 * roughness * LoH * LoH;
    let lightScatter = F_Schlick(1.0, f90, NoL);
    let viewScatter = F_Schlick(1.0, f90, NoV);
    return lightScatter * viewScatter * (1.0 / PI);
}

// Scale/bias approximation
// https://www.unrealengine.com/en-US/blog/physically-based-shading-on-mobile
// TODO: Use a LUT (more accurate)
fn F_AB(perceptual_roughness: f32, NoV: f32) -> vec2<f32> {
    let c0 = vec4<f32>(-1.0, -0.0275, -0.572, 0.022);
    let c1 = vec4<f32>(1.0, 0.0425, 1.04, -0.04);
    let r = perceptual_roughness * c0 + c1;
    let a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
    return vec2<f32>(-1.04, 1.04) * a004 + r.zw;
}

fn EnvBRDFApprox(f0: vec3<f32>, f_ab: vec2<f32>) -> vec3<f32> {
    return f0 * f_ab.x + f_ab.y;
}

fn perceptualRoughnessToRoughness(perceptualRoughness: f32) -> f32 {
    // clamp perceptual roughness to prevent precision problems
    // According to Filament design 0.089 is recommended for mobile
    // Filament uses 0.045 for non-mobile
    let clampedPerceptualRoughness = clamp(perceptualRoughness, 0.089, 1.0);
    return clampedPerceptualRoughness * clampedPerceptualRoughness;
}

// fn point_light(
//     world_position: vec3<f32>,
//     light_id: u32,
//     roughness: f32,
//     NdotV: f32,
//     N: vec3<f32>,
//     V: vec3<f32>,
//     R: vec3<f32>,
//     F0: vec3<f32>,
//     f_ab: vec2<f32>,
//     diffuseColor: vec3<f32>
// ) -> vec3<f32> {
//     let light = &view_bindings::point_lights.data[light_id];
//     let light_to_frag = (*light).position_radius.xyz - world_position.xyz;
//     let distance_square = dot(light_to_frag, light_to_frag);
//     let rangeAttenuation = getDistanceAttenuation(distance_square, (*light).color_inverse_square_range.w);

//     // Specular.
//     // Representative Point Area Lights.
//     // see http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf p14-16
//     let a = roughness;
//     let centerToRay = dot(light_to_frag, R) * R - light_to_frag;
//     let closestPoint = light_to_frag + centerToRay * saturate((*light).position_radius.w * inverseSqrt(dot(centerToRay, centerToRay)));
//     let LspecLengthInverse = inverseSqrt(dot(closestPoint, closestPoint));
//     let normalizationFactor = a / saturate(a + ((*light).position_radius.w * 0.5 * LspecLengthInverse));
//     let specularIntensity = normalizationFactor * normalizationFactor;

//     var L: vec3<f32> = closestPoint * LspecLengthInverse; // normalize() equivalent?
//     var H: vec3<f32> = normalize(L + V);
//     var NoL: f32 = saturate(dot(N, L));
//     var NoH: f32 = saturate(dot(N, H));
//     var LoH: f32 = saturate(dot(L, H));

//     let specular_light = specular(F0, roughness, H, NdotV, NoL, NoH, LoH, specularIntensity, f_ab);

//     // Diffuse.
//     // Comes after specular since its NoL is used in the lighting equation.
//     L = normalize(light_to_frag);
//     H = normalize(L + V);
//     NoL = saturate(dot(N, L));
//     NoH = saturate(dot(N, H));
//     LoH = saturate(dot(L, H));

//     let diffuse = diffuseColor * Fd_Burley(roughness, NdotV, NoL, LoH);

//     // See https://google.github.io/filament/Filament.html#mjx-eqn-pointLightLuminanceEquation
//     // Lout = f(v,l) Φ / { 4 π d^2 }⟨n⋅l⟩
//     // where
//     // f(v,l) = (f_d(v,l) + f_r(v,l)) * light_color
//     // Φ is luminous power in lumens
//     // our rangeAttenuation = 1 / d^2 multiplied with an attenuation factor for smoothing at the edge of the non-physical maximum light radius

//     // For a point light, luminous intensity, I, in lumens per steradian is given by:
//     // I = Φ / 4 π
//     // The derivation of this can be seen here: https://google.github.io/filament/Filament.html#mjx-eqn-pointLightLuminousPower

//     // NOTE: (*light).color.rgb is premultiplied with (*light).intensity / 4 π (which would be the luminous intensity) on the CPU

//     return ((diffuse + specular_light) * (*light).color_inverse_square_range.rgb) * (rangeAttenuation * NoL);
// }

// fn spot_light(
//     world_position: vec3<f32>,
//     light_id: u32,
//     roughness: f32,
//     NdotV: f32,
//     N: vec3<f32>,
//     V: vec3<f32>,
//     R: vec3<f32>,
//     F0: vec3<f32>,
//     f_ab: vec2<f32>,
//     diffuseColor: vec3<f32>
// ) -> vec3<f32> {
//     // reuse the point light calculations
//     let point_light = point_light(world_position, light_id, roughness, NdotV, N, V, R, F0, f_ab, diffuseColor);

//     let light = &view_bindings::point_lights.data[light_id];

//     // reconstruct spot dir from x/z and y-direction flag
//     var spot_dir = vec3<f32>((*light).light_custom_data.x, 0.0, (*light).light_custom_data.y);
//     spot_dir.y = sqrt(max(0.0, 1.0 - spot_dir.x * spot_dir.x - spot_dir.z * spot_dir.z));
//     if ((*light).flags & POINT_LIGHT_FLAGS_SPOT_LIGHT_Y_NEGATIVE) != 0u {
//         spot_dir.y = -spot_dir.y;
//     }
//     let light_to_frag = (*light).position_radius.xyz - world_position.xyz;

//     // calculate attenuation based on filament formula https://google.github.io/filament/Filament.html#listing_glslpunctuallight
//     // spot_scale and spot_offset have been precomputed
//     // note we normalize here to get "l" from the filament listing. spot_dir is already normalized
//     let cd = dot(-spot_dir, normalize(light_to_frag));
//     let attenuation = saturate(cd * (*light).light_custom_data.z + (*light).light_custom_data.w);
//     let spot_attenuation = attenuation * attenuation;

//     return point_light * spot_attenuation;
// }

fn directional_light(light_id: u32, roughness: f32, NdotV: f32, normal: vec3<f32>, view: vec3<f32>, R: vec3<f32>, F0: vec3<f32>, f_ab: vec2<f32>, diffuseColor: vec3<f32>) -> vec3<f32> {
    let light = &view_bindings::lights.directional_lights[light_id];

    let incident_light = (*light).direction_to_light.xyz;

    let half_vector = normalize(incident_light + view);
    let NoL = saturate(dot(normal, incident_light));
    let NoH = saturate(dot(normal, half_vector));
    let LoH = saturate(dot(incident_light, half_vector));

    let diffuse = diffuseColor * Fd_Burley(roughness, NdotV, NoL, LoH);
    let specularIntensity = 1.0;
    let specular_light = specular(F0, roughness, half_vector, NdotV, NoL, NoH, LoH, specularIntensity, f_ab);

    return (specular_light + diffuse) * (*light).color.rgb * NoL;
}
`,Cg=`
#define_import_path pbr::ambient

#import pbr::{
    lighting::{EnvBRDFApprox, F_AB},
    mesh_view_bindings::lights,
}

// A precomputed \`NdotV\` is provided because it is computed regardless,
// but \`world_normal\` and the view vector \`V\` are provided separately for more advanced uses.
fn ambient_light(
    world_position: vec4<f32>,
    world_normal: vec3<f32>,
    V: vec3<f32>,
    NdotV: f32,
    diffuse_color: vec3<f32>,
    specular_color: vec3<f32>,
    perceptual_roughness: f32,
    occlusion: vec3<f32>,
) -> vec3<f32> {
    let diffuse_ambient = EnvBRDFApprox(diffuse_color, F_AB(1.0, NdotV));
    let specular_ambient = EnvBRDFApprox(specular_color, F_AB(perceptual_roughness, NdotV));

    // No real world material has specular values under 0.02, so we use this range as a
    // "pre-baked specular occlusion" that extinguishes the fresnel term, for artistic control.
    // See: https://google.github.io/filament/Filament.html#specularocclusion
    let specular_occlusion = saturate(dot(specular_color, vec3(50.0 * 0.33)));

    return (diffuse_ambient + specular_ambient * specular_occlusion) * lights.ambient_color.rgb * occlusion;
}
`,Mg=`
#define_import_path pbr::fog

#import pbr::{
    mesh_view_bindings::fog,
    mesh_view_types::Fog,
}

// Fog formulas adapted from:
// https://learn.microsoft.com/en-us/windows/win32/direct3d9/fog-formulas
// https://catlikecoding.com/unity/tutorials/rendering/part-14/
// https://iquilezles.org/articles/fog/ (Atmospheric Fog and Scattering)

fn scattering_adjusted_fog_color(
    fog_params: Fog,
    scattering: vec3<f32>,
) -> vec4<f32> {
    if (fog_params.directional_light_color.a > 0.0) {
        return vec4<f32>(
            fog_params.base_color.rgb
                + scattering * fog_params.directional_light_color.rgb * fog_params.directional_light_color.a,
            fog_params.base_color.a,
        );
    } else {
        return fog_params.base_color;
    }
}

fn linear_fog(
    fog_params: Fog,
    input_color: vec4<f32>,
    distance: f32,
    scattering: vec3<f32>,
) -> vec4<f32> {
    var fog_color = scattering_adjusted_fog_color(fog_params, scattering);
    let start = fog_params.be.x;
    let end = fog_params.be.y;
    fog_color.a *= 1.0 - clamp((end - distance) / (end - start), 0.0, 1.0);
    return vec4<f32>(mix(input_color.rgb, fog_color.rgb, fog_color.a), input_color.a);
}

fn exponential_fog(
    fog_params: Fog,
    input_color: vec4<f32>,
    distance: f32,
    scattering: vec3<f32>,
) -> vec4<f32> {
    var fog_color = scattering_adjusted_fog_color(fog_params, scattering);
    let density = fog_params.be.x;
    fog_color.a *= 1.0 - 1.0 / exp(distance * density);
    return vec4<f32>(mix(input_color.rgb, fog_color.rgb, fog_color.a), input_color.a);
}

fn exponential_squared_fog(
    fog_params: Fog,
    input_color: vec4<f32>,
    distance: f32,
    scattering: vec3<f32>,
) -> vec4<f32> {
    var fog_color = scattering_adjusted_fog_color(fog_params, scattering);
    let distance_times_density = distance * fog_params.be.x;
    fog_color.a *= 1.0 - 1.0 / exp(distance_times_density * distance_times_density);
    return vec4<f32>(mix(input_color.rgb, fog_color.rgb, fog_color.a), input_color.a);
}

fn atmospheric_fog(
    fog_params: Fog,
    input_color: vec4<f32>,
    distance: f32,
    scattering: vec3<f32>,
) -> vec4<f32> {
    var fog_color = scattering_adjusted_fog_color(fog_params, scattering);
    let extinction_factor = 1.0 - 1.0 / exp(distance * fog_params.be);
    let inscattering_factor = 1.0 - 1.0 / exp(distance * fog_params.bi);
    return vec4<f32>(
        input_color.rgb * (1.0 - extinction_factor * fog_color.a)
            + fog_color.rgb * inscattering_factor * fog_color.a,
        input_color.a
    );
}
`,Pg=`
#define_import_path pbr::pbr_functions

#import pbr::{
    pbr_types,
    pbr_bindings,
    mesh_view_bindings as view_bindings,
    mesh_view_types,
    lighting,
    // transmission,
    // clustered_forward as clustering,
    // shadows,
    ambient,
    mesh_types::{MESH_FLAGS_SHADOW_RECEIVER_BIT, MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT},
    utils::E,
}

#ifdef ENVIRONMENT_MAP
#import pbr::environment_map
#endif

#import core_pipeline::tonemapping::{screen_space_dither, powsafe, tone_mapping}

fn alpha_discard(material: pbr_types::StandardMaterial, output_color: vec4<f32>) -> vec4<f32> {
    var color = output_color;
    let alpha_mode = u32(material.flags) & pbr_types::STANDARD_MATERIAL_FLAGS_ALPHA_MODE_RESERVED_BITS;
    if alpha_mode == pbr_types::STANDARD_MATERIAL_FLAGS_ALPHA_MODE_OPAQUE {
        // NOTE: If rendering as opaque, alpha should be ignored so set to 1.0
        color.a = 1.0;
    }

#ifdef MAY_DISCARD
    else if alpha_mode == pbr_types::STANDARD_MATERIAL_FLAGS_ALPHA_MODE_MASK {
        if color.a >= material.alpha_cutoff {
            // NOTE: If rendering as masked alpha and >= the cutoff, render as fully opaque
            color.a = 1.0;
        } else {
            // NOTE: output_color.a < in.material.alpha_cutoff should not be rendered
            discard;
        }
    }
#endif

    return color;
}

fn prepare_world_normal(
    world_normal: vec3<f32>,
    double_sided: bool,
    is_front: bool,
) -> vec3<f32> {
    var output: vec3<f32> = world_normal;
#ifndef VERTEX_TANGENTS
#ifndef STANDARDMATERIAL_NORMAL_MAP
    // NOTE: When NOT using normal-mapping, if looking at the back face of a double-sided
    // material, the normal needs to be inverted. This is a branchless version of that.
    output = (f32(!double_sided || is_front) * 2.0 - 1.0) * output;
#endif
#endif
    return output;
}

fn apply_normal_mapping(
    standard_material_flags: u32,
    world_normal: vec3<f32>,
    double_sided: bool,
    is_front: bool,
#ifdef VERTEX_TANGENTS
#ifdef STANDARDMATERIAL_NORMAL_MAP
    world_tangent: vec4<f32>,
#endif
#endif
#ifdef VERTEX_UVS
    uv: vec2<f32>,
#endif
    mip_bias: f32,
) -> vec3<f32> {
    // NOTE: The mikktspace method of normal mapping explicitly requires that the world normal NOT
    // be re-normalized in the fragment shader. This is primarily to match the way mikktspace
    // bakes vertex tangents and normal maps so that this is the exact inverse. Blender, Unity,
    // Unreal Engine, Godot, and more all use the mikktspace method. Do not change this code
    // unless you really know what you are doing.
    // http://www.mikktspace.com/
    var N: vec3<f32> = world_normal;

#ifdef VERTEX_TANGENTS
#ifdef STANDARDMATERIAL_NORMAL_MAP
    // NOTE: The mikktspace method of normal mapping explicitly requires that these NOT be
    // normalized nor any Gram-Schmidt applied to ensure the vertex normal is orthogonal to the
    // vertex tangent! Do not change this code unless you really know what you are doing.
    // http://www.mikktspace.com/
    var T: vec3<f32> = world_tangent.xyz;
    var B: vec3<f32> = world_tangent.w * cross(N, T);
#endif
#endif

#ifdef VERTEX_TANGENTS
#ifdef VERTEX_UVS
#ifdef STANDARDMATERIAL_NORMAL_MAP
    // Nt is the tangent-space normal.
    var Nt = textureSampleBias(pbr_bindings::normal_map_texture, pbr_bindings::normal_map_sampler, uv, mip_bias).rgb;
    if (standard_material_flags & pbr_types::STANDARD_MATERIAL_FLAGS_TWO_COMPONENT_NORMAL_MAP) != 0u {
        // Only use the xy components and derive z for 2-component normal maps.
        Nt = vec3<f32>(Nt.rg * 2.0 - 1.0, 0.0);
        Nt.z = sqrt(1.0 - Nt.x * Nt.x - Nt.y * Nt.y);
    } else {
        Nt = Nt * 2.0 - 1.0;
    }
    // Normal maps authored for DirectX require flipping the y component
    if (standard_material_flags & pbr_types::STANDARD_MATERIAL_FLAGS_FLIP_NORMAL_MAP_Y) != 0u {
        Nt.y = -Nt.y;
    }

    if double_sided && !is_front {
        Nt = -Nt;
    }

    // NOTE: The mikktspace method of normal mapping applies maps the tangent-space normal from
    // the normal map texture in this way to be an EXACT inverse of how the normal map baker
    // calculates the normal maps so there is no error introduced. Do not change this code
    // unless you really know what you are doing.
    // http://www.mikktspace.com/
    N = Nt.x * T + Nt.y * B + Nt.z * N;
#endif
#endif
#endif

    return normalize(N);
}

// NOTE: Correctly calculates the view vector depending on whether
// the projection is orthographic or perspective.
fn calculate_view(
    world_position: vec4<f32>,
    is_orthographic: bool,
) -> vec3<f32> {
    var V: vec3<f32>;
    if is_orthographic {
        // Orthographic view vector
        V = normalize(vec3<f32>(view_bindings::view.view_proj[0].z, view_bindings::view.view_proj[1].z, view_bindings::view.view_proj[2].z));
    } else {
        // Only valid for a perpective projection
        V = normalize(view_bindings::view.world_position.xyz - world_position.xyz);
    }
    return V;
}

#ifndef PREPASS_FRAGMENT
fn apply_pbr_lighting(
    in: pbr_types::PbrInput,
) -> vec4<f32> {
    var output_color: vec4<f32> = in.material.base_color;

    // TODO use .a for exposure compensation in HDR
    let emissive = in.material.emissive;

    // calculate non-linear roughness from linear perceptualRoughness
    let metallic = in.material.metallic;
    let perceptual_roughness = in.material.perceptual_roughness;
    let roughness = lighting::perceptualRoughnessToRoughness(perceptual_roughness);
    let ior = in.material.ior;
    let thickness = in.material.thickness;
    let diffuse_transmission = in.material.diffuse_transmission;
    let specular_transmission = in.material.specular_transmission;

    let specular_transmissive_color = specular_transmission * in.material.base_color.rgb;

    let occlusion = in.occlusion;

    // Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
    let NdotV = max(dot(in.N, in.V), 0.0001);

    // Remapping [0,1] reflectance to F0
    // See https://google.github.io/filament/Filament.html#materialsystem/parameterization/remapping
    let reflectance = in.material.reflectance;
    let F0 = 0.16 * reflectance * reflectance * (1.0 - metallic) + output_color.rgb * metallic;

    // Diffuse strength is inversely related to metallicity, specular and diffuse transmission
    let diffuse_color = output_color.rgb * (1.0 - metallic) * (1.0 - specular_transmission) * (1.0 - diffuse_transmission);

    // Diffuse transmissive strength is inversely related to metallicity and specular transmission, but directly related to diffuse transmission
    let diffuse_transmissive_color = output_color.rgb * (1.0 - metallic) * (1.0 - specular_transmission) * diffuse_transmission;

    // Calculate the world position of the second Lambertian lobe used for diffuse transmission, by subtracting material thickness
    let diffuse_transmissive_lobe_world_position = in.world_position - vec4<f32>(in.world_normal, 0.0) * thickness;

    let R = reflect(-in.V, in.N);

    let f_ab = lighting::F_AB(perceptual_roughness, NdotV);

    var direct_light: vec3<f32> = vec3<f32>(0.0);

    // Transmitted Light (Specular and Diffuse)
    var transmitted_light: vec3<f32> = vec3<f32>(0.0);

    let view_z = dot(vec4<f32>(
        view_bindings::view.inverse_view[0].z,
        view_bindings::view.inverse_view[1].z,
        view_bindings::view.inverse_view[2].z,
        view_bindings::view.inverse_view[3].z
    ), in.world_position);
//     let cluster_index = clustering::fragment_cluster_index(in.frag_coord.xy, view_z, in.is_orthographic);
//     let offset_and_counts = clustering::unpack_offset_and_counts(cluster_index);

//     // Point lights (direct)
//     for (var i: u32 = offset_and_counts[0]; i < offset_and_counts[0] + offset_and_counts[1]; i = i + 1u) {
//         let light_id = clustering::get_light_id(i);
//         var shadow: f32 = 1.0;
//         if ((in.flags & MESH_FLAGS_SHADOW_RECEIVER_BIT) != 0u
//                 && (view_bindings::point_lights.data[light_id].flags & mesh_view_types::POINT_LIGHT_FLAGS_SHADOWS_ENABLED_BIT) != 0u) {
//             shadow = shadows::fetch_point_shadow(light_id, in.world_position, in.world_normal);
//         }
//         let light_contrib = lighting::point_light(in.world_position.xyz, light_id, roughness, NdotV, in.N, in.V, R, F0, f_ab, diffuse_color);
//         direct_light += light_contrib * shadow;

//         if diffuse_transmission > 0.0 {
//             // NOTE: We use the diffuse transmissive color, the second Lambertian lobe's calculated
//             // world position, inverted normal and view vectors, and the following simplified
//             // values for a fully diffuse transmitted light contribution approximation:
//             //
//             // roughness = 1.0;
//             // NdotV = 1.0;
//             // R = vec3<f32>(0.0) // doesn't really matter
//             // f_ab = vec2<f32>(0.1)
//             // F0 = vec3<f32>(0.0)
//             var transmitted_shadow: f32 = 1.0;
//             if ((in.flags & (MESH_FLAGS_SHADOW_RECEIVER_BIT | MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT)) == (MESH_FLAGS_SHADOW_RECEIVER_BIT | MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT)
//                     && (view_bindings::point_lights.data[light_id].flags & mesh_view_types::POINT_LIGHT_FLAGS_SHADOWS_ENABLED_BIT) != 0u) {
//                 transmitted_shadow = shadows::fetch_point_shadow(light_id, diffuse_transmissive_lobe_world_position, -in.world_normal);
//             }
//             let light_contrib = lighting::point_light(diffuse_transmissive_lobe_world_position.xyz, light_id, 1.0, 1.0, -in.N, -in.V, vec3<f32>(0.0), vec3<f32>(0.0), vec2<f32>(0.1), diffuse_transmissive_color);
//             transmitted_light += light_contrib * transmitted_shadow;
//         }
//     }

//     // Spot lights (direct)
//     for (var i: u32 = offset_and_counts[0] + offset_and_counts[1]; i < offset_and_counts[0] + offset_and_counts[1] + offset_and_counts[2]; i = i + 1u) {
//         let light_id = clustering::get_light_id(i);

//         var shadow: f32 = 1.0;
//         if ((in.flags & MESH_FLAGS_SHADOW_RECEIVER_BIT) != 0u
//                 && (view_bindings::point_lights.data[light_id].flags & mesh_view_types::POINT_LIGHT_FLAGS_SHADOWS_ENABLED_BIT) != 0u) {
//             shadow = shadows::fetch_spot_shadow(light_id, in.world_position, in.world_normal);
//         }
//         let light_contrib = lighting::spot_light(in.world_position.xyz, light_id, roughness, NdotV, in.N, in.V, R, F0, f_ab, diffuse_color);
//         direct_light += light_contrib * shadow;

//         if diffuse_transmission > 0.0 {
//             // NOTE: We use the diffuse transmissive color, the second Lambertian lobe's calculated
//             // world position, inverted normal and view vectors, and the following simplified
//             // values for a fully diffuse transmitted light contribution approximation:
//             //
//             // roughness = 1.0;
//             // NdotV = 1.0;
//             // R = vec3<f32>(0.0) // doesn't really matter
//             // f_ab = vec2<f32>(0.1)
//             // F0 = vec3<f32>(0.0)
//             var transmitted_shadow: f32 = 1.0;
//             if ((in.flags & (MESH_FLAGS_SHADOW_RECEIVER_BIT | MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT)) == (MESH_FLAGS_SHADOW_RECEIVER_BIT | MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT)
//                     && (view_bindings::point_lights.data[light_id].flags & mesh_view_types::POINT_LIGHT_FLAGS_SHADOWS_ENABLED_BIT) != 0u) {
//                 transmitted_shadow = shadows::fetch_spot_shadow(light_id, diffuse_transmissive_lobe_world_position, -in.world_normal);
//             }
//             let light_contrib = lighting::spot_light(diffuse_transmissive_lobe_world_position.xyz, light_id, 1.0, 1.0, -in.N, -in.V, vec3<f32>(0.0), vec3<f32>(0.0), vec2<f32>(0.1), diffuse_transmissive_color);
//             transmitted_light += light_contrib * transmitted_shadow;
//         }
//     }

    // directional lights (direct)
    let n_directional_lights = u32(view_bindings::lights.n_directional_lights);
    for (var i: u32 = 0u; i < n_directional_lights; i = i + 1u) {
        var shadow: f32 = 1.0;
//         if ((in.flags & MESH_FLAGS_SHADOW_RECEIVER_BIT) != 0u
//                 && (view_bindings::lights.directional_lights[i].flags & mesh_view_types::DIRECTIONAL_LIGHT_FLAGS_SHADOWS_ENABLED_BIT) != 0u) {
//             shadow = shadows::fetch_directional_shadow(i, in.world_position, in.world_normal, view_z);
//         }
        var light_contrib = lighting::directional_light(i, roughness, NdotV, in.N, in.V, R, F0, f_ab, diffuse_color);
// #ifdef DIRECTIONAL_LIGHT_SHADOW_MAP_DEBUG_CASCADES
//         light_contrib = shadows::cascade_debug_visualization(light_contrib, i, view_z);
// #endif
        direct_light += light_contrib * shadow;

//         if diffuse_transmission > 0.0 {
//             // NOTE: We use the diffuse transmissive color, the second Lambertian lobe's calculated
//             // world position, inverted normal and view vectors, and the following simplified
//             // values for a fully diffuse transmitted light contribution approximation:
//             //
//             // roughness = 1.0;
//             // NdotV = 1.0;
//             // R = vec3<f32>(0.0) // doesn't really matter
//             // f_ab = vec2<f32>(0.1)
//             // F0 = vec3<f32>(0.0)
//             var transmitted_shadow: f32 = 1.0;
//             if ((in.flags & (MESH_FLAGS_SHADOW_RECEIVER_BIT | MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT)) == (MESH_FLAGS_SHADOW_RECEIVER_BIT | MESH_FLAGS_TRANSMITTED_SHADOW_RECEIVER_BIT)
//                     && (view_bindings::lights.directional_lights[i].flags & mesh_view_types::DIRECTIONAL_LIGHT_FLAGS_SHADOWS_ENABLED_BIT) != 0u) {
//                 transmitted_shadow = shadows::fetch_directional_shadow(i, diffuse_transmissive_lobe_world_position, -in.world_normal, view_z);
//             }
//             let light_contrib = lighting::directional_light(i, 1.0, 1.0, -in.N, -in.V, vec3<f32>(0.0), vec3<f32>(0.0), vec2<f32>(0.1), diffuse_transmissive_color);
//             transmitted_light += light_contrib * transmitted_shadow;
//         }
    }

    // Ambient light (indirect)
    var indirect_light = ambient::ambient_light(in.world_position, in.N, in.V, NdotV, diffuse_color, F0, perceptual_roughness, occlusion);

//     if diffuse_transmission > 0.0 {
//         // NOTE: We use the diffuse transmissive color, the second Lambertian lobe's calculated
//         // world position, inverted normal and view vectors, and the following simplified
//         // values for a fully diffuse transmitted light contribution approximation:
//         //
//         // perceptual_roughness = 1.0;
//         // NdotV = 1.0;
//         // F0 = vec3<f32>(0.0)
//         // occlusion = vec3<f32>(1.0)
//         transmitted_light += ambient::ambient_light(diffuse_transmissive_lobe_world_position, -in.N, -in.V, 1.0, diffuse_transmissive_color, vec3<f32>(0.0), 1.0, vec3<f32>(1.0));
//     }

//     // Environment map light (indirect)
// #ifdef ENVIRONMENT_MAP
//     let environment_light = environment_map::environment_map_light(perceptual_roughness, roughness, diffuse_color, NdotV, f_ab, in.N, R, F0);
//     indirect_light += (environment_light.diffuse * occlusion) + environment_light.specular;

//     // we'll use the specular component of the transmitted environment
//     // light in the call to \`specular_transmissive_light()\` below
//     var specular_transmitted_environment_light = vec3<f32>(0.0);

//     if diffuse_transmission > 0.0 || specular_transmission > 0.0 {
//         // NOTE: We use the diffuse transmissive color, inverted normal and view vectors,
//         // and the following simplified values for the transmitted environment light contribution
//         // approximation:
//         //
//         // diffuse_color = vec3<f32>(1.0) // later we use \`diffuse_transmissive_color\` and \`specular_transmissive_color\`
//         // NdotV = 1.0;
//         // R = T // see definition below
//         // F0 = vec3<f32>(1.0)
//         // occlusion = 1.0
//         //
//         // (This one is slightly different from the other light types above, because the environment
//         // map light returns both diffuse and specular components separately, and we want to use both)

//         let T = -normalize(
//             in.V + // start with view vector at entry point
//             refract(in.V, -in.N, 1.0 / ior) * thickness // add refracted vector scaled by thickness, towards exit point
//         ); // normalize to find exit point view vector

//         let transmitted_environment_light = pbr::environment_map::environment_map_light(perceptual_roughness, roughness, vec3<f32>(1.0), 1.0, f_ab, -in.N, T, vec3<f32>(1.0));
//         transmitted_light += transmitted_environment_light.diffuse * diffuse_transmissive_color;
//         specular_transmitted_environment_light = transmitted_environment_light.specular * specular_transmissive_color;
//     }
// #else
//     // If there's no environment map light, there's no transmitted environment
//     // light specular component, so we can just hardcode it to zero.
//     let specular_transmitted_environment_light = vec3<f32>(0.0);
// #endif

    let emissive_light = emissive.rgb * output_color.a;

//     if specular_transmission > 0.0 {
//         transmitted_light += transmission::specular_transmissive_light(in.world_position, in.frag_coord.xyz, view_z, in.N, in.V, F0, ior, thickness, perceptual_roughness, specular_transmissive_color, specular_transmitted_environment_light).rgb;
//     }

//     if (in.material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_ATTENUATION_ENABLED_BIT) != 0u {
//         // We reuse the \`atmospheric_fog()\` function here, as it's fundamentally
//         // equivalent to the attenuation that takes place inside the material volume,
//         // and will allow us to eventually hook up subsurface scattering more easily
//         var attenuation_fog: mesh_view_types::Fog;
//         attenuation_fog.base_color.a = 1.0;
//         attenuation_fog.be = pow(1.0 - in.material.attenuation_color.rgb, vec3<f32>(E)) / in.material.attenuation_distance;
//         // TODO: Add the subsurface scattering factor below
//         // attenuation_fog.bi = /* ... */
//         transmitted_light = pbr::fog::atmospheric_fog(
//             attenuation_fog, vec4<f32>(transmitted_light, 1.0), thickness,
//             vec3<f32>(0.0) // TODO: Pass in (pre-attenuated) scattered light contribution here
//         ).rgb;
//     }

    // Total light
    output_color = vec4<f32>(
        transmitted_light + direct_light + indirect_light + emissive_light,
        output_color.a
    );

//     output_color = clustering::cluster_debug_visualization(
//         output_color,
//         view_z,
//         in.is_orthographic,
//         offset_and_counts,
//         cluster_index,
//     );

    return output_color;
}
#endif // PREPASS_FRAGMENT

fn apply_fog(fog_params: mesh_view_types::Fog, input_color: vec4<f32>, fragment_world_position: vec3<f32>, view_world_position: vec3<f32>) -> vec4<f32> {
    let view_to_world = fragment_world_position.xyz - view_world_position.xyz;

    // \`length()\` is used here instead of just \`view_to_world.z\` since that produces more
    // high quality results, especially for denser/smaller fogs. we get a "curved"
    // fog shape that remains consistent with camera rotation, instead of a "linear"
    // fog shape that looks a bit fake
    let distance = length(view_to_world);

    var scattering = vec3<f32>(0.0);
    if fog_params.directional_light_color.a > 0.0 {
        let view_to_world_normalized = view_to_world / distance;
        let n_directional_lights = u32(view_bindings::lights.n_directional_lights);
        for (var i: u32 = 0u; i < n_directional_lights; i = i + 1u) {
            let light = view_bindings::lights.directional_lights[i];
            scattering += pow(
                max(
                    dot(view_to_world_normalized, light.direction_to_light),
                    0.0
                ),
                fog_params.directional_light_exponent
            ) * light.color.rgb;
        }
    }

    let mode: u32 = u32(fog_params.mode);
    if mode == mesh_view_types::FOG_MODE_LINEAR {
        return pbr::fog::linear_fog(fog_params, input_color, distance, scattering);
    } else if mode == mesh_view_types::FOG_MODE_EXPONENTIAL {
        return pbr::fog::exponential_fog(fog_params, input_color, distance, scattering);
    } else if mode == mesh_view_types::FOG_MODE_EXPONENTIAL_SQUARED {
        return pbr::fog::exponential_squared_fog(fog_params, input_color, distance, scattering);
    } else if mode == mesh_view_types::FOG_MODE_ATMOSPHERIC {
        return pbr::fog::atmospheric_fog(fog_params, input_color, distance, scattering);
    } else {
        return input_color;
    }
}

#ifdef PREMULTIPLY_ALPHA
fn premultiply_alpha(standard_material_flags: u32, color: vec4<f32>) -> vec4<f32> {
// \`Blend\`, \`Premultiplied\` and \`Alpha\` all share the same \`BlendState\`. Depending
// on the alpha mode, we premultiply the color channels by the alpha channel value,
// (and also optionally replace the alpha value with 0.0) so that the result produces
// the desired blend mode when sent to the blending operation.
#ifdef BLEND_PREMULTIPLIED_ALPHA
    // For \`BlendState::PREMULTIPLIED_ALPHA_BLENDING\` the blend function is:
    //
    //     result = 1 * src_color + (1 - src_alpha) * dst_color
    let alpha_mode = standard_material_flags & pbr_types::STANDARD_MATERIAL_FLAGS_ALPHA_MODE_RESERVED_BITS;
    if alpha_mode == pbr_types::STANDARD_MATERIAL_FLAGS_ALPHA_MODE_ADD {
        // Here, we premultiply \`src_color\` by \`src_alpha\`, and replace \`src_alpha\` with 0.0:
        //
        //     src_color *= src_alpha
        //     src_alpha = 0.0
        //
        // We end up with:
        //
        //     result = 1 * (src_alpha * src_color) + (1 - 0) * dst_color
        //     result = src_alpha * src_color + 1 * dst_color
        //
        // Which is the blend operation for additive blending
        return vec4<f32>(color.rgb * color.a, 0.0);
    } else {
        // Here, we don't do anything, so that we get premultiplied alpha blending. (As expected)
        return color.rgba;
    }
#endif
// \`Multiply\` uses its own \`BlendState\`, but we still need to premultiply here in the
// shader so that we get correct results as we tweak the alpha channel
#ifdef BLEND_MULTIPLY
    // The blend function is:
    //
    //     result = dst_color * src_color + (1 - src_alpha) * dst_color
    //
    // We premultiply \`src_color\` by \`src_alpha\`:
    //
    //     src_color *= src_alpha
    //
    // We end up with:
    //
    //     result = dst_color * (src_color * src_alpha) + (1 - src_alpha) * dst_color
    //     result = src_alpha * (src_color * dst_color) + (1 - src_alpha) * dst_color
    //
    // Which is the blend operation for multiplicative blending with arbitrary mixing
    // controlled by the source alpha channel
    return vec4<f32>(color.rgb * color.a, color.a);
#endif
}
#endif

// fog, alpha premultiply
// for non-hdr cameras, tonemapping and debanding
fn main_pass_post_lighting_processing(
    pbr_input: pbr_types::PbrInput,
    input_color: vec4<f32>,
) -> vec4<f32> {
    var output_color = input_color;

    // fog
    if (u32(view_bindings::fog.mode) != mesh_view_types::FOG_MODE_OFF
        && (u32(pbr_input.material.flags) & pbr_types::STANDARD_MATERIAL_FLAGS_FOG_ENABLED_BIT) != 0u) {
        output_color = apply_fog(view_bindings::fog, output_color, pbr_input.world_position.xyz, view_bindings::view.world_position.xyz);
    }

#ifdef TONEMAP_IN_SHADER
    output_color = tone_mapping(output_color, view_bindings::view.color_grading);
#ifdef DEBAND_DITHER
    var output_rgb = output_color.rgb;
    output_rgb = powsafe(output_rgb, 1.0 / 2.2);
    output_rgb += screen_space_dither(pbr_input.frag_coord.xy);
    // This conversion back to linear space is required because our output texture format is
    // SRGB; the GPU will assume our output is linear and will apply an SRGB conversion.
    output_rgb = powsafe(output_rgb, 2.2);
    output_color = vec4(output_rgb, output_color.a);
#endif
#endif
#ifdef PREMULTIPLY_ALPHA
    output_color = premultiply_alpha(pbr_input.material.flags, output_color);
#endif
    return output_color;
}
`,Bg=`
#define_import_path pbr::mesh_functions

#import pbr::{
    mesh_view_bindings::view,
    mesh_bindings::mesh,
    mesh_types::MESH_FLAGS_SIGN_DETERMINANT_MODEL_3X3_BIT,
    view_transformations::position_world_to_clip,
}

#import render::{
    instance_index::get_instance_index,
    maths::{affine_to_square, mat2x4_f32_to_mat3x3_unpack},
}

fn get_model_matrix(instance_index: u32) -> mat4x4<f32> {
    return affine_to_square(mesh[get_instance_index(instance_index)].model);
}

// fn get_previous_model_matrix(instance_index: u32) -> mat4x4<f32> {
//     return affine_to_square(mesh[get_instance_index(instance_index)].previous_model);
// }

fn mesh_position_local_to_world(model: mat4x4<f32>, vertex_position: vec4<f32>) -> vec4<f32> {
    return model * vertex_position;
}

// // NOTE: The intermediate world_position assignment is important
// // for precision purposes when using the 'equals' depth comparison
// // function.
// fn mesh_position_local_to_clip(model: mat4x4<f32>, vertex_position: vec4<f32>) -> vec4<f32> {
//     let world_position = mesh_position_local_to_world(model, vertex_position);
//     return position_world_to_clip(world_position.xyz);
// }

fn mesh_normal_local_to_world(vertex_normal: vec3<f32>, instance_index: u32) -> vec3<f32> {
    // NOTE: The mikktspace method of normal mapping requires that the world normal is
    // re-normalized in the vertex shader to match the way mikktspace bakes vertex tangents
    // and normal maps so that the exact inverse process is applied when shading. Blender, Unity,
    // Unreal Engine, Godot, and more all use the mikktspace method. Do not change this code
    // unless you really know what you are doing.
    // http://www.mikktspace.com/
    return normalize(
        mat2x4_f32_to_mat3x3_unpack(
            mesh[instance_index].inverse_transpose_model_a,
            mesh[instance_index].inverse_transpose_model_b,
        ) * vertex_normal
    );
}

// // Calculates the sign of the determinant of the 3x3 model matrix based on a
// // mesh flag
// fn sign_determinant_model_3x3m(instance_index: u32) -> f32 {
//     // bool(u32) is false if 0u else true
//     // f32(bool) is 1.0 if true else 0.0
//     // * 2.0 - 1.0 remaps 0.0 or 1.0 to -1.0 or 1.0 respectively
//     return f32(bool(mesh[instance_index].flags & MESH_FLAGS_SIGN_DETERMINANT_MODEL_3X3_BIT)) * 2.0 - 1.0;
// }

// fn mesh_tangent_local_to_world(model: mat4x4<f32>, vertex_tangent: vec4<f32>, instance_index: u32) -> vec4<f32> {
//     // NOTE: The mikktspace method of normal mapping requires that the world tangent is
//     // re-normalized in the vertex shader to match the way mikktspace bakes vertex tangents
//     // and normal maps so that the exact inverse process is applied when shading. Blender, Unity,
//     // Unreal Engine, Godot, and more all use the mikktspace method. Do not change this code
//     // unless you really know what you are doing.
//     // http://www.mikktspace.com/
//     return vec4<f32>(
//         normalize(
//             mat3x3<f32>(
//                 model[0].xyz,
//                 model[1].xyz,
//                 model[2].xyz
//             ) * vertex_tangent.xyz
//         ),
//         // NOTE: Multiplying by the sign of the determinant of the 3x3 model matrix accounts for
//         // situations such as negative scaling.
//         vertex_tangent.w * sign_determinant_model_3x3m(instance_index)
//     );
// }
`,Dg=`
#define_import_path core_pipeline::tonemapping

#import render::view::ColorGrading

// hack !! not sure what to do with this
// #ifdef TONEMAPPING_PASS
//     @group(0) @binding(3) var dt_lut_texture: texture_3d<f32>;
//     @group(0) @binding(4) var dt_lut_sampler: sampler;
// #else
//     @group(0) @binding(15) var dt_lut_texture: texture_3d<f32>;
//     @group(0) @binding(16) var dt_lut_sampler: sampler;
// #endif

// fn sample_current_lut(p: vec3<f32>) -> vec3<f32> {
//     // Don't include code that will try to sample from LUTs if tonemap method doesn't require it
//     // Allows this file to be imported without necessarily needing the lut texture bindings
// #ifdef TONEMAP_METHOD_AGX
//     return textureSampleLevel(dt_lut_texture, dt_lut_sampler, p, 0.0).rgb;
// #else ifdef TONEMAP_METHOD_TONY_MC_MAPFACE
//     return textureSampleLevel(dt_lut_texture, dt_lut_sampler, p, 0.0).rgb;
// #else ifdef TONEMAP_METHOD_BLENDER_FILMIC
//     return textureSampleLevel(dt_lut_texture, dt_lut_sampler, p, 0.0).rgb;
// #else 
//     return vec3(1.0, 0.0, 1.0);
//  #endif
// }

// --------------------------------------
// --- SomewhatBoringDisplayTransform ---
// --------------------------------------
// By Tomasz Stachowiak

fn rgb_to_ycbcr(col: vec3<f32>) -> vec3<f32> {
    let m = mat3x3<f32>(
        0.2126, 0.7152, 0.0722, 
        -0.1146, -0.3854, 0.5, 
        0.5, -0.4542, -0.0458
    );
    return col * m;
}

fn ycbcr_to_rgb(col: vec3<f32>) -> vec3<f32> {
    let m = mat3x3<f32>(
        1.0, 0.0, 1.5748, 
        1.0, -0.1873, -0.4681, 
        1.0, 1.8556, 0.0
    );
    return max(vec3(0.0), col * m);
}

fn tonemap_curve(v: f32) -> f32 {
#ifdef 0
    // Large linear part in the lows, but compresses highs.
    float c = v + v * v + 0.5 * v * v * v;
    return c / (1.0 + c);
#else
    return 1.0 - exp(-v);
#endif
}

fn tonemap_curve3_(v: vec3<f32>) -> vec3<f32> {
    return vec3(tonemap_curve(v.r), tonemap_curve(v.g), tonemap_curve(v.b));
}

fn somewhat_boring_display_transform(col: vec3<f32>) -> vec3<f32> {
    var boring_color = col;
    let ycbcr = rgb_to_ycbcr(boring_color);

    let bt = tonemap_curve(length(ycbcr.yz) * 2.4);
    var desat = max((bt - 0.7) * 0.8, 0.0);
    desat *= desat;

    let desat_col = mix(boring_color.rgb, ycbcr.xxx, desat);

    let tm_luma = tonemap_curve(ycbcr.x);
    let tm0 = boring_color.rgb * max(0.0, tm_luma / max(1e-5, tonemapping_luminance(boring_color.rgb)));
    let final_mult = 0.97;
    let tm1 = tonemap_curve3_(desat_col);

    boring_color = mix(tm0, tm1, bt * bt);

    return boring_color * final_mult;
}

// // ------------------------------------------
// // ------------- Tony McMapface -------------
// // ------------------------------------------
// // By Tomasz Stachowiak
// // https://github.com/h3r2tic/tony-mc-mapface

// const TONY_MC_MAPFACE_LUT_DIMS: f32 = 48.0;

// fn sample_tony_mc_mapface_lut(stimulus: vec3<f32>) -> vec3<f32> {
//     var uv = (stimulus / (stimulus + 1.0)) * (f32(TONY_MC_MAPFACE_LUT_DIMS - 1.0) / f32(TONY_MC_MAPFACE_LUT_DIMS)) + 0.5 / f32(TONY_MC_MAPFACE_LUT_DIMS);
//     return sample_current_lut(saturate(uv)).rgb;
// }

// ---------------------------------
// ---------- ACES Fitted ----------
// ---------------------------------

// Same base implementation that Godot 4.0 uses for Tonemap ACES.

// https://github.com/TheRealMJP/BakingLab/blob/master/BakingLab/ACES.hlsl

// The code in this file was originally written by Stephen Hill (@self_shadow), who deserves all
// credit for coming up with this fit and implementing it. Buy him a beer next time you see him. :)

fn RRTAndODTFit(v: vec3<f32>) -> vec3<f32> {
    let a = v * (v + 0.0245786) - 0.000090537;
    let b = v * (0.983729 * v + 0.4329510) + 0.238081;
    return a / b;
}

fn ACESFitted(color: vec3<f32>) -> vec3<f32> {    
    var fitted_color = color;

    // sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
    let rgb_to_rrt = mat3x3<f32>(
        vec3(0.59719, 0.35458, 0.04823),
        vec3(0.07600, 0.90834, 0.01566),
        vec3(0.02840, 0.13383, 0.83777)    
    );

    // ODT_SAT => XYZ => D60_2_D65 => sRGB
    let odt_to_rgb = mat3x3<f32>(
        vec3(1.60475, -0.53108, -0.07367),
        vec3(-0.10208, 1.10813, -0.00605),
        vec3(-0.00327, -0.07276, 1.07602)
    );

    fitted_color *= rgb_to_rrt;

    // Apply RRT and ODT
    fitted_color = RRTAndODTFit(fitted_color);

    fitted_color *= odt_to_rgb;

    // Clamp to [0, 1]
    fitted_color = saturate(fitted_color);

    return fitted_color;
}

// -------------------------------
// ------------- AgX -------------
// -------------------------------
// By Troy Sobotka
// https://github.com/MrLixm/AgXc
// https://github.com/sobotka/AgX

// pow() but safe for NaNs/negatives
fn powsafe(color: vec3<f32>, power: f32) -> vec3<f32> {
    return pow(abs(color), vec3(power)) * sign(color);
}


fn saturation(color: vec3<f32>, saturationAmount: f32) -> vec3<f32> {
    let luma = tonemapping_luminance(color);
    return mix(vec3(luma), color, vec3(saturationAmount));
}

// /*
//     Output log domain encoded data.
//     Similar to OCIO lg2 AllocationTransform.
//     ref[0]
// */
// fn convertOpenDomainToNormalizedLog2_(color: vec3<f32>, minimum_ev: f32, maximum_ev: f32) -> vec3<f32> {
//     let in_midgray = 0.18;

//     // remove negative before log transform
//     var normalized_color = max(vec3(0.0), color);
//     // avoid infinite issue with log -- ref[1]
//     normalized_color = select(normalized_color, 0.00001525878 + normalized_color, normalized_color  < vec3<f32>(0.00003051757));
//     normalized_color = clamp(
//         log2(normalized_color / in_midgray),
//         vec3(minimum_ev),
//         vec3(maximum_ev)
//     );
//     let total_exposure = maximum_ev - minimum_ev;

//     return (normalized_color - minimum_ev) / total_exposure;
// }

// // Inverse of above
// fn convertNormalizedLog2ToOpenDomain(color: vec3<f32>, minimum_ev: f32, maximum_ev: f32) -> vec3<f32> {
//     var open_color = color;
//     let in_midgray = 0.18;
//     let total_exposure = maximum_ev - minimum_ev;

//     open_color = (open_color * total_exposure) + minimum_ev;
//     open_color = pow(vec3(2.0), open_color);
//     open_color = open_color * in_midgray;

//     return open_color;
// }


// /*=================
//     Main processes
// =================*/

// // Prepare the data for display encoding. Converted to log domain.
// fn applyAgXLog(Image: vec3<f32>) -> vec3<f32> {
//     var prepared_image = max(vec3(0.0), Image); // clamp negatives
//     let r = dot(prepared_image, vec3(0.84247906, 0.0784336, 0.07922375));
//     let g = dot(prepared_image, vec3(0.04232824, 0.87846864, 0.07916613));
//     let b = dot(prepared_image, vec3(0.04237565, 0.0784336, 0.87914297));
//     prepared_image = vec3(r, g, b);

//     prepared_image = convertOpenDomainToNormalizedLog2_(prepared_image, -10.0, 6.5);
    
//     prepared_image = clamp(prepared_image, vec3(0.0), vec3(1.0));
//     return prepared_image;
// }

// fn applyLUT3D(Image: vec3<f32>, block_size: f32) -> vec3<f32> {
//     return sample_current_lut(Image * ((block_size - 1.0) / block_size) + 0.5 / block_size).rgb;
// }

// // -------------------------
// // -------------------------
// // -------------------------

// fn sample_blender_filmic_lut(stimulus: vec3<f32>) -> vec3<f32> {
//     let block_size = 64.0;
//     let normalized = saturate(convertOpenDomainToNormalizedLog2_(stimulus, -11.0, 12.0));
//     return applyLUT3D(normalized, block_size);
// }

// from https://64.github.io/tonemapping/
// reinhard on RGB oversaturates colors
fn tonemapping_reinhard(color: vec3<f32>) -> vec3<f32> {
    return color / (1.0 + color);
}

fn tonemapping_reinhard_extended(color: vec3<f32>, max_white: f32) -> vec3<f32> {
    let numerator = color * (1.0 + (color / vec3<f32>(max_white * max_white)));
    return numerator / (1.0 + color);
}

// luminance coefficients from Rec. 709.
// https://en.wikipedia.org/wiki/Rec._709
fn tonemapping_luminance(v: vec3<f32>) -> f32 {
    return dot(v, vec3<f32>(0.2126, 0.7152, 0.0722));
}

fn tonemapping_change_luminance(c_in: vec3<f32>, l_out: f32) -> vec3<f32> {
    let l_in = tonemapping_luminance(c_in);
    return c_in * (l_out / l_in);
}

fn tonemapping_reinhard_luminance(color: vec3<f32>) -> vec3<f32> {
    let l_old = tonemapping_luminance(color);
    let l_new = l_old / (1.0 + l_old);
    return tonemapping_change_luminance(color, l_new);
}

// fn rgb_to_srgb_simple(color: vec3<f32>) -> vec3<f32> {
//     return pow(color, vec3<f32>(1.0 / 2.2));
// }

// Source: Advanced VR Rendering, GDC 2015, Alex Vlachos, Valve, Slide 49
// https://media.steampowered.com/apps/valve/2015/Alex_Vlachos_Advanced_VR_Rendering_GDC2015.pdf
fn screen_space_dither(frag_coord: vec2<f32>) -> vec3<f32> {
    var dither = vec3<f32>(dot(vec2<f32>(171.0, 231.0), frag_coord)).xxx;
    dither = fract(dither.rgb / vec3<f32>(103.0, 71.0, 97.0));
    return (dither - 0.5) / 255.0;
}

fn tone_mapping(in: vec4<f32>, color_grading: ColorGrading) -> vec4<f32> {
    var color = max(in.rgb, vec3(0.0));

    // Possible future grading:

    // highlight gain gamma: 0..
    let luma = powsafe(vec3(tonemapping_luminance(color)), 1.0); 

    // highlight gain: 0.. 
    color += color * luma.xxx * 1.0; 

    // Linear pre tonemapping grading
    color = saturation(color, color_grading.pre_saturation);
    color = powsafe(color, color_grading.gamma);
    color = color * powsafe(vec3(2.0), color_grading.exposure);
    color = max(color, vec3(0.0));

    // tone_mapping
#ifdef TONEMAP_METHOD_NONE
    color = color;
#else ifdef TONEMAP_METHOD_REINHARD
    color = tonemapping_reinhard(color.rgb);
#else ifdef TONEMAP_METHOD_REINHARD_LUMINANCE
    color = tonemapping_reinhard_luminance(color.rgb);
#else ifdef TONEMAP_METHOD_ACES_FITTED
    color = ACESFitted(color.rgb);
// #else ifdef TONEMAP_METHOD_AGX
//     color = applyAgXLog(color);
//     color = applyLUT3D(color, 32.0);
#else ifdef TONEMAP_METHOD_SOMEWHAT_BORING_DISPLAY_TRANSFORM
    color = somewhat_boring_display_transform(color.rgb);
// #else ifdef TONEMAP_METHOD_TONY_MC_MAPFACE
//     color = sample_tony_mc_mapface_lut(color); 
// #else ifdef TONEMAP_METHOD_BLENDER_FILMIC
//     color = sample_blender_filmic_lut(color.rgb);
#endif

    // Perceptual post tonemapping grading
    color = saturation(color, color_grading.post_saturation);
    
    return vec4(color, in.a);
}

// This is an **incredibly crude** approximation of the inverse of the tone mapping function.
// We assume here that there's a simple linear relationship between the input and output
// which is not true at all, but useful to at least preserve the overall luminance of colors
// when sampling from an already tonemapped image. (e.g. for transmissive materials when HDR is off)
// fn approximate_inverse_tone_mapping(in: vec4<f32>, color_grading: ColorGrading) -> vec4<f32> {
//     let out = tone_mapping(in, color_grading);
//     let approximate_ratio = length(in.rgb) / length(out.rgb);
//     return vec4(in.rgb * approximate_ratio, in.a);
// }
`,Ug=`
#define_import_path pbr::gtao_utils

#import pbr::utils::{PI, HALF_PI}

// Approximates single-bounce ambient occlusion to multi-bounce ambient occlusion
// https://blog.selfshadow.com/publications/s2016-shading-course/activision/s2016_pbs_activision_occlusion.pdf#page=78
fn gtao_multibounce(visibility: f32, base_color: vec3<f32>) -> vec3<f32> {
    let a = 2.0404 * base_color - 0.3324;
    let b = -4.7951 * base_color + 0.6417;
    let c = 2.7552 * base_color + 0.6903;
    let x = vec3<f32>(visibility);
    return max(x, ((x * a + b) * x + c) * x);
}

fn fast_sqrt(x: f32) -> f32 {
    return bitcast<f32>(0x1fbd1df5 + (bitcast<i32>(x) >> 1u));
}

fn fast_acos(in_x: f32) -> f32 {
    let x = abs(in_x);
    var res = -0.156583 * x + HALF_PI;
    res *= fast_sqrt(1.0 - x);
    return select(PI - res, res, in_x >= 0.0);
}
`,Fg=`
#define_import_path pbr::pbr_fragment

#import pbr::{
    pbr_functions,
    pbr_bindings,
    pbr_types,
    prepass_utils,
    mesh_bindings::mesh,
    mesh_view_bindings::view,
    // parallax_mapping::parallaxed_uv,
}

#ifdef SCREEN_SPACE_AMBIENT_OCCLUSION
#import pbr::mesh_view_bindings::screen_space_ambient_occlusion_texture
#import pbr::gtao_utils::gtao_multibounce
#endif

#ifdef PREPASS_PIPELINE
#import pbr::prepass_io::VertexOutput
#else
#import pbr::forward_io::VertexOutput
#endif

// prepare a basic PbrInput from the vertex stage output, mesh binding and view binding
fn pbr_input_from_vertex_output(
    in: VertexOutput,
    is_front: bool,
    double_sided: bool,
) -> pbr_types::PbrInput {
    var pbr_input: pbr_types::PbrInput = pbr_types::pbr_input_new();
    
    pbr_input.flags = mesh[in.instance_index].flags;
    pbr_input.is_orthographic = view.projection[3].w == 1.0;
    pbr_input.V = pbr_functions::calculate_view(in.world_position, pbr_input.is_orthographic);
    pbr_input.frag_coord = in.position;
    pbr_input.world_position = in.world_position;

#ifdef VERTEX_COLORS
    pbr_input.material.base_color = in.color;
#endif

    pbr_input.world_normal = pbr_functions::prepare_world_normal(
        in.world_normal,
        double_sided,
        is_front,
    );

#ifdef LOAD_PREPASS_NORMALS
    pbr_input.N = prepass_utils::prepass_normal(in.position, 0u);
#else
    pbr_input.N = normalize(pbr_input.world_normal);
#endif

    return pbr_input;
}

// Prepare a full PbrInput by sampling all textures to resolve
// the material members
fn pbr_input_from_standard_material(
    in: VertexOutput,
    is_front: bool,
) -> pbr_types::PbrInput {
    let double_sided = (u32(pbr_bindings::material.flags) & pbr_types::STANDARD_MATERIAL_FLAGS_DOUBLE_SIDED_BIT) != 0u;

    var pbr_input: pbr_types::PbrInput = pbr_input_from_vertex_output(in, is_front, double_sided);
    pbr_input.material.flags = pbr_bindings::material.flags;
    pbr_input.material.base_color *= pbr_bindings::material.base_color;
    pbr_input.material.deferred_lighting_pass_id = pbr_bindings::material.deferred_lighting_pass_id;

#ifdef VERTEX_UVS
    var uv = in.uv;

// #ifdef VERTEX_TANGENTS
//     if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_DEPTH_MAP_BIT) != 0u) {
//         let V = pbr_input.V;
//         let N = in.world_normal;
//         let T = in.world_tangent.xyz;
//         let B = in.world_tangent.w * cross(N, T);
//         // Transform V from fragment to camera in world space to tangent space.
//         let Vt = vec3(dot(V, T), dot(V, B), dot(V, N));
//         uv = parallaxed_uv(
//             pbr_bindings::material.parallax_depth_scale,
//             pbr_bindings::material.max_parallax_layer_count,
//             pbr_bindings::material.max_relief_mapping_search_steps,
//             uv,
//             // Flip the direction of Vt to go toward the surface to make the
//             // parallax mapping algorithm easier to understand and reason
//             // about.
//             -Vt,
//         );
//     }
// #endif // VERTEX_TANGENTS

    if ((u32(pbr_bindings::material.flags) & pbr_types::STANDARD_MATERIAL_FLAGS_BASE_COLOR_TEXTURE_BIT) != 0u) {
        pbr_input.material.base_color *= textureSampleBias(
            pbr_bindings::base_color_texture, 
            pbr_bindings::base_color_sampler, 
            uv,
            view.mip_bias
        );
        // pbr_input.material.base_color = vec4(uv, 0.0, 1.0);
    }
#endif // VERTEX_UVS

    pbr_input.material.flags = pbr_bindings::material.flags;

//     // NOTE: Unlit bit not set means == 0 is true, so the true case is if lit
//     if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_UNLIT_BIT) == 0u) {
//         pbr_input.material.reflectance = pbr_bindings::material.reflectance;
//         pbr_input.material.ior = pbr_bindings::material.ior;
//         pbr_input.material.attenuation_color = pbr_bindings::material.attenuation_color;
//         pbr_input.material.attenuation_distance = pbr_bindings::material.attenuation_distance;
//         pbr_input.material.alpha_cutoff = pbr_bindings::material.alpha_cutoff;

//         // emissive
//         // TODO use .a for exposure compensation in HDR
//         var emissive: vec4<f32> = pbr_bindings::material.emissive;
// #ifdef VERTEX_UVS
//         if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_EMISSIVE_TEXTURE_BIT) != 0u) {
//             emissive = vec4<f32>(emissive.rgb * textureSampleBias(pbr_bindings::emissive_texture, pbr_bindings::emissive_sampler, uv, view.mip_bias).rgb, 1.0);
//         }
// #endif
//         pbr_input.material.emissive = emissive;

//         // metallic and perceptual roughness
//         var metallic: f32 = pbr_bindings::material.metallic;
//         var perceptual_roughness: f32 = pbr_bindings::material.perceptual_roughness;
// #ifdef VERTEX_UVS
//         if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_METALLIC_ROUGHNESS_TEXTURE_BIT) != 0u) {
//             let metallic_roughness = textureSampleBias(pbr_bindings::metallic_roughness_texture, pbr_bindings::metallic_roughness_sampler, uv, view.mip_bias);
//             // Sampling from GLTF standard channels for now
//             metallic *= metallic_roughness.b;
//             perceptual_roughness *= metallic_roughness.g;
//         }
// #endif
//         pbr_input.material.metallic = metallic;
//         pbr_input.material.perceptual_roughness = perceptual_roughness;

//         var specular_transmission: f32 = pbr_bindings::material.specular_transmission;
// #ifdef PBR_TRANSMISSION_TEXTURES_SUPPORTED
//         if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_SPECULAR_TRANSMISSION_TEXTURE_BIT) != 0u) {
//             specular_transmission *= textureSample(pbr_bindings::specular_transmission_texture, pbr_bindings::specular_transmission_sampler, uv).r;
//         }
// #endif
//         pbr_input.material.specular_transmission = specular_transmission;

//         var thickness: f32 = pbr_bindings::material.thickness;
// #ifdef PBR_TRANSMISSION_TEXTURES_SUPPORTED
//         if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_THICKNESS_TEXTURE_BIT) != 0u) {
//             thickness *= textureSample(pbr_bindings::thickness_texture, pbr_bindings::thickness_sampler, uv).g;
//         }
// #endif
//         // scale thickness, accounting for non-uniform scaling (e.g. a “squished” mesh)
//         thickness *= length(
//             (transpose(mesh[in.instance_index].model) * vec4(pbr_input.N, 0.0)).xyz
//         );
//         pbr_input.material.thickness = thickness;

//         var diffuse_transmission = pbr_bindings::material.diffuse_transmission;
// #ifdef PBR_TRANSMISSION_TEXTURES_SUPPORTED
//         if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_DIFFUSE_TRANSMISSION_TEXTURE_BIT) != 0u) {
//             diffuse_transmission *= textureSample(pbr_bindings::diffuse_transmission_texture, pbr_bindings::diffuse_transmission_sampler, uv).a;
//         }
// #endif
//         pbr_input.material.diffuse_transmission = diffuse_transmission;

//         // occlusion
//         // TODO: Split into diffuse/specular occlusion?
//         var occlusion: vec3<f32> = vec3(1.0);
// #ifdef VERTEX_UVS
//         if ((pbr_bindings::material.flags & pbr_types::STANDARD_MATERIAL_FLAGS_OCCLUSION_TEXTURE_BIT) != 0u) {
//             occlusion = vec3(textureSampleBias(pbr_bindings::occlusion_texture, pbr_bindings::occlusion_sampler, uv, view.mip_bias).r);
//         }
// #endif
// #ifdef SCREEN_SPACE_AMBIENT_OCCLUSION
//         let ssao = textureLoad(screen_space_ambient_occlusion_texture, vec2<i32>(in.position.xy), 0i).r;
//         let ssao_multibounce = gtao_multibounce(ssao, pbr_input.material.base_color.rgb);
//         occlusion = min(occlusion, ssao_multibounce);
// #endif
//         pbr_input.occlusion = occlusion;

//         // N (normal vector)
// #ifndef LOAD_PREPASS_NORMALS
//         pbr_input.N = pbr_functions::apply_normal_mapping(
//             pbr_bindings::material.flags,
//             pbr_input.world_normal,
//             double_sided,
//             is_front,
// #ifdef VERTEX_TANGENTS
// #ifdef STANDARDMATERIAL_NORMAL_MAP
//             in.world_tangent,
// #endif
// #endif
// #ifdef VERTEX_UVS
//             uv,
// #endif
//             view.mip_bias,
//         );
// #endif
//     }

    return pbr_input;
}
`;function Zc(t,e){return`#define ${t} ${e}`}function xs(t,e,r){const i=t.WGSLComposer,s=Object.keys(r).map(n=>Zc(n,"")).join(`
`)+`
`;return Object.keys(e).forEach(n=>{e[n].defines&&(e[n].wgsl=s+e[n].wgsl),e[n].wgsl=i.wgsl_compile(e[n].wgsl)}),t.createProgram(e)}class Yn extends x{constructor(){super(...arguments),this.appConfig=this.singleton.read($e)}async prepare(){const{canvas:e,shaderCompilerPath:r}=this.appConfig,s=await new Ad({shaderCompilerPath:r}).createSwapChain(e);this.swapChain=s,s.configureSwapChain(e.width,e.height);const n=s.getDevice();this.device=n,e.addEventListener("resize",()=>{s.configureSwapChain(e.width,e.height)}),this.registerShaderModule(fg),this.registerShaderModule(pg),this.registerShaderModule(gg),this.registerShaderModule(mg),this.registerShaderModule(Sg),this.registerShaderModule(Eg),this.registerShaderModule(yg),this.registerShaderModule(vg),this.registerShaderModule(Ag),this.registerShaderModule(wg),this.registerShaderModule(Tg),this.registerShaderModule(Rg),this.registerShaderModule(bg),this.registerShaderModule(xg),this.registerShaderModule(Bg),this.registerShaderModule(Uo),this.registerShaderModule(Dg),this.registerShaderModule(Ig),this.registerShaderModule(Og),this.registerShaderModule(Ng),this.registerShaderModule(Cg),this.registerShaderModule(Mg),this.registerShaderModule(Pg),this.registerShaderModule(Ug),this.registerShaderModule(Fg)}initialize(){const e=new lg;this.renderHelper=e,e.setDevice(this.device),e.renderInstManager.disableSimpleMode()}finalize(){this.renderHelper.destroy(),this.device.destroy(),this.device.checkForLeaks()}registerShaderModule(e,r={}){const i=Object.keys(r).map(n=>Zc(n,r[n]||"")).join(`
`)+`
`;return this.device.WGSLComposer.wgsl_compile(i+e)}}var Lg=Object.defineProperty,zg=Object.getOwnPropertyDescriptor,_a=(t,e,r,i)=>{for(var s=i>1?void 0:i?zg(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Lg(e,r,s),s};class qr{constructor(e,r,i){this.name=e,this.id=r,this.format=i}}const Pt=class Ji{static from(e){return e.toMesh()}constructor(e=we.TRIANGLES){this.primitive_topology=e,this.attributes=[]}with_inserted_attribute(e,r){return this.insert_attribute(e,r),this}insert_attribute(e,r){this.contains_attribute(e)&&this.remove_attribute(e),this.attributes.push([e,r])}with_removed_attribute(e){return this.remove_attribute(e),this}remove_attribute(e){const r=this.attributes.findIndex(([s,n])=>s.id===e.id),i=this.attributes[r][1];return this.attributes.splice(r,1),i}contains_attribute(e){return this.attributes.some(([r,i])=>r.id===e.id)}attribute(e){return this.attributes.find(([r,i])=>r.name===e.name)[1]}with_indices(e){return this.set_indices(e),this}set_indices(e){this.indices=e}count_vertices(){let e=0;return this.attributes.forEach(([r,i])=>{let s=i.length;e?s!==e&&(console.warn(`${r.name} has a different vertex count (${s}) than other attributes (${e}) in this mesh, all attributes will be truncated to match the smallest.`),e=Math.min(s,e)):e=s}),e}duplicate_vertices(){const e=(r,i)=>i.map(s=>r[s]);this.attributes.forEach(r=>{const[i,s]=r;this.indices&&(r[1]=e(s,this.indices))})}with_duplicated_vertices(){return this.duplicate_vertices(),this}compute_flat_normals(){if(this.indices)throw new Error("`compute_flat_normals` can't work on indexed geometry. Consider calling `Mesh::duplicate_vertices`.");if(this.primitive_topology!==we.TRIANGLES)throw new Error("`compute_flat_normals` can only work on `TriangleList`s");const e=this.attribute(Ji.ATTRIBUTE_POSITION),r=Nc(op(e,3).map(([i,s,n])=>{const o=Vg(i,s,n);return[o,o,o]}));this.insert_attribute(Ji.ATTRIBUTE_NORMAL,r)}with_computed_flat_normals(){return this.compute_flat_normals(),this}generate_tangents(){const e=Hg(this);this.insert_attribute(Ji.ATTRIBUTE_TANGENT,e)}with_generated_tangents(){return this.generate_tangents(),this}compute_aabb(){const e=this.attribute(Ji.ATTRIBUTE_POSITION);return Ht.enclosing(e)}};Pt.ATTRIBUTE_POSITION=new qr("Vertex_Position",0,R.F32_RGB);Pt.ATTRIBUTE_NORMAL=new qr("Vertex_Normal",1,R.F32_RGB);Pt.ATTRIBUTE_UV_0=new qr("Vertex_Uv",2,R.F32_RG);Pt.ATTRIBUTE_UV_1=new qr("Vertex_Uv_1",3,R.F32_RG);Pt.ATTRIBUTE_TANGENT=new qr("Vertex_Tangent",4,R.F32_RGBA);Pt.ATTRIBUTE_COLOR=new qr("Vertex_Color",5,R.F32_RGBA);Pt.ATTRIBUTE_JOINT_WEIGHT=new qr("Vertex_JointWeight",6,R.F32_RGBA);Pt.ATTRIBUTE_JOINT_INDEX=new qr("Vertex_JointIndex",7,R.U16_RGBA_5551);_a([y.object],Pt.prototype,"attributes",2);_a([y.object],Pt.prototype,"indices",2);_a([y.object],Pt.prototype,"primitive_topology",2);let j=Pt;function Vg(t,e,r){const i=new v(t[0],t[1],t[2]),s=new v(e[0],e[1],e[2]),n=new v(r[0],r[1],r[2]),o=s.sub(i).cross(n.sub(i)).normalize();return[o.x,o.y,o.z]}function Hg(t){if(t.primitive_topology!==we.TRIANGLES)throw new Error("Unsupported topology when generating tangents");const e=t.attribute(j.ATTRIBUTE_POSITION);t.attribute(j.ATTRIBUTE_NORMAL),t.attribute(j.ATTRIBUTE_UV_0);const r=e.length;return new Array(r).fill([0,0,0,0]),[]}class da{static from_corners(e,r){const i=e.max(r),s=e.min(r),n=i.x-s.x,o=i.y-s.y,a=i.z-s.z;return new da(n,o,a)}constructor(e=2,r=1,i=1){this.max_x=e/2,this.min_x=-e/2,this.max_y=r/2,this.min_y=-r/2,this.max_z=i/2,this.min_z=-i/2}toMesh(){const e=this,r=[[[e.min_x,e.min_y,e.max_z],[0,0,1],[0,0]],[[e.max_x,e.min_y,e.max_z],[0,0,1],[1,0]],[[e.max_x,e.max_y,e.max_z],[0,0,1],[1,1]],[[e.min_x,e.max_y,e.max_z],[0,0,1],[0,1]],[[e.min_x,e.max_y,e.min_z],[0,0,-1],[1,0]],[[e.max_x,e.max_y,e.min_z],[0,0,-1],[0,0]],[[e.max_x,e.min_y,e.min_z],[0,0,-1],[0,1]],[[e.min_x,e.min_y,e.min_z],[0,0,-1],[1,1]],[[e.max_x,e.min_y,e.min_z],[1,0,0],[0,0]],[[e.max_x,e.max_y,e.min_z],[1,0,0],[1,0]],[[e.max_x,e.max_y,e.max_z],[1,0,0],[1,1]],[[e.max_x,e.min_y,e.max_z],[1,0,0],[0,1]],[[e.min_x,e.min_y,e.max_z],[-1,0,0],[1,0]],[[e.min_x,e.max_y,e.max_z],[-1,0,0],[0,0]],[[e.min_x,e.max_y,e.min_z],[-1,0,0],[0,1]],[[e.min_x,e.min_y,e.min_z],[-1,0,0],[1,1]],[[e.max_x,e.max_y,e.min_z],[0,1,0],[1,0]],[[e.min_x,e.max_y,e.min_z],[0,1,0],[0,0]],[[e.min_x,e.max_y,e.max_z],[0,1,0],[0,1]],[[e.max_x,e.max_y,e.max_z],[0,1,0],[1,1]],[[e.max_x,e.min_y,e.max_z],[0,-1,0],[0,0]],[[e.min_x,e.min_y,e.max_z],[0,-1,0],[1,0]],[[e.min_x,e.min_y,e.min_z],[0,-1,0],[1,1]],[[e.max_x,e.min_y,e.min_z],[0,-1,0],[0,1]]],i=r.map(([a,l,c])=>a),s=r.map(([a,l,c])=>l),n=r.map(([a,l,c])=>c),o=[0,1,2,2,3,0,4,5,6,6,7,4,8,9,10,10,11,8,12,13,14,14,15,12,16,17,18,18,19,16,20,21,22,22,23,20];return new j(we.TRIANGLES).with_inserted_attribute(j.ATTRIBUTE_POSITION,i).with_inserted_attribute(j.ATTRIBUTE_NORMAL,s).with_inserted_attribute(j.ATTRIBUTE_UV_0,n).with_indices(o)}}class wr{constructor(e=1){this.size=e}toMesh(){return new da(this.size,this.size,this.size).toMesh()}}class fa{static from_size(e){return new fa(e,0)}constructor(e=1,r=0){this.size=e,this.subdivisions=r}toMesh(){const e=this.subdivisions+2,r=this.subdivisions+2,i=v.Y.to_array(),s=[],n=[],o=[],a=[];for(let l=0;l<e;l++)for(let c=0;c<r;c++){const u=c/(r-1),h=l/(e-1);s.push([(-.5+u)*this.size,0,(-.5+h)*this.size]),n.push(i),o.push([u,h])}for(let l=0;l<e-1;l++)for(let c=0;c<r-1;c++){const u=l*r+c;a.push(u+r+1),a.push(u+1),a.push(u+r),a.push(u),a.push(u+r),a.push(u+1)}return new j(we.TRIANGLES).with_indices(a).with_inserted_attribute(j.ATTRIBUTE_POSITION,s).with_inserted_attribute(j.ATTRIBUTE_NORMAL,n).with_inserted_attribute(j.ATTRIBUTE_UV_0,o)}}const kg=0,Wg=0;class Ss extends x{constructor(){super(),this.pipeline=this.attach(Tr),this.cameras=this.query(e=>e.addedOrChanged.with(Se,V,ye).trackWrites),this.query(e=>e.using(V).read)}execute(){this.cameras.addedOrChanged.forEach(e=>{const r=e.read(Se),i=e.read(V),s=e.read(ye),{exposure:n,gamma:o,pre_saturation:a,post_saturation:l}=s;this.pipeline.passesChanged=!0;const c=_t.copy(r.projection_matrix),u=r.target_info_physical_size,h=new q;h.from(i);const _=v.copy(h.translation),p=h.compute_matrix(),d=p.inverse(),g=c.mul(d);this.prepareUniforms=(m,E=Wg)=>{m.setUniforms(E,[{name:"view_proj",value:g.to_cols_array_2d()},{name:"unjittered_view_proj",value:g.to_cols_array_2d()},{name:"inverse_view_proj",value:g.inverse().to_cols_array_2d()},{name:"view",value:p.to_cols_array_2d()},{name:"inverse_view",value:d.to_cols_array_2d()},{name:"projection",value:c.to_cols_array_2d()},{name:"inverse_projection",value:c.inverse().to_cols_array_2d()},{name:"world_position",value:_.to_array()},{name:"viewport",value:[0,0,u[0],u[1]]},{name:"frustum",value:[...I.ZERO.to_array(),...I.ZERO.to_array(),...I.ZERO.to_array(),...I.ZERO.to_array(),...I.ZERO.to_array(),...I.ZERO.to_array()]},{name:"color_grading",value:[n,o,a,l]},{name:"mip_bias",value:0}])}})}}const Xg=0,$g=1,jg=2,qg=3,Yg=4;class Gc extends x{constructor(){super(...arguments),this.pipeline=this.attach(Tr),this.fogs=this.query(e=>e.addedOrChanged.with(Ge).trackWrites)}async prepare(){this.prepareUniforms=(e,r)=>{e.setUniforms(r,[{name:"padding",value:new Array(16).fill(0)}])}}execute(){this.fogs.addedOrChanged.forEach(e=>{this.pipeline.passesChanged=!0;const r=e.read(Ge),{color:i,directional_light_color:s,directional_light_exponent:n,falloff:o}=r;let a=Xg,l,c=[0,0,0];o instanceof Be.Linear?(a=$g,l=[o.start,o.end,0]):o instanceof Be.Exponential?(a=jg,l=[o.density,0,0]):o instanceof Be.ExponentialSquared?(a=qg,l=[o.density,0,0]):o instanceof Be.Atmospheric&&(a=Yg,l=o.extinction.to_array(),c=o.inscattering.to_array()),this.prepareUniforms=(u,h)=>{u.setUniforms(h,[{name:"base_color",value:i.as_linear_rgba_f32()},{name:"directional_light_color",value:s.as_linear_rgba_f32()},{name:"be",value:l},{name:"directional_light_exponent",value:n},{name:"bi",value:c},{name:"mode",value:a}])}})}}class pa{constructor(e,r,i,s=new Kc){this.renderInstManager=e,this.renderCache=r,this.pipeline=i,this.renderList=s,this.init()}draw(e){this.renderList.drawOnPassRenderer(this.renderCache,e)}}function Kg(t){switch(or(t)){case T.BC1:case T.BC4_SNORM:case T.BC4_UNORM:return 8;case T.BC2:case T.BC3:case T.BC5_SNORM:case T.BC5_UNORM:return 16;default:return _c(t)}}class Qg extends pa{init(){}prepare(){const e=this.pipeline.renderHelper.pushTemplateRenderInst();e.setBindingLayout({numUniformBuffers:4,numSamplers:1,numStorageBuffers:1,numStorageTextures:0}),e.setMegaStateFlags(Xh({depthWrite:!0,stencilWrite:!1,depthCompare:De.GREATER,blendConstant:pc,cullMode:Ur.BACK},{rgbBlendMode:yt.ADD,alphaBlendMode:yt.ADD,rgbBlendSrcFactor:ae.SRC_ALPHA,alphaBlendSrcFactor:ae.ONE,rgbBlendDstFactor:ae.ONE_MINUS_SRC_ALPHA,alphaBlendDstFactor:ae.ONE_MINUS_SRC_ALPHA})),this.viewUniforms.prepareUniforms(e,0),this.lightsUniforms.prepareUniforms(e,1),this.fogUniforms.prepareUniforms(e,2)}post(){this.renderInstManager.popTemplateRenderInst()}submit(e){const r=this.renderCache.device,i=e.read(j),{vertex_shader:s,fragment_shader:n,base_color:o,base_color_texture:a,emissive:l,emissive_texture:c,perceptual_roughness:u,metallic:h,metallic_roughness_texture:_,reflectance:p,diffuse_transmission:d,specular_transmission:g,thickness:m,ior:E,attenuation_distance:A,attenuation_color:S,alpha_mode:P,parallax_depth_scale:k,max_parallax_layer_count:C,deferred_lighting_pass_id:O,occlusion_texture:D,double_sided:X,fog_enabled:te,depth_map:K,unlit:ce,specular_transmission_texture:Ie,thickness_texture:_e,diffuse_transmission_texture:Oe}=e.read(H);let ie=Te.NONE;a&&(ie|=Te.BASE_COLOR_TEXTURE),c&&(ie|=Te.EMISSIVE_TEXTURE),_&&(ie|=Te.METALLIC_ROUGHNESS_TEXTURE),D&&(ie|=Te.OCCLUSION_TEXTURE),X&&(ie|=Te.DOUBLE_SIDED),ce&&(ie|=Te.UNLIT),te&&(ie|=Te.FOG_ENABLED),K&&(ie|=Te.DEPTH_MAP),Ie&&(ie|=Te.SPECULAR_TRANSMISSION_TEXTURE),_e&&(ie|=Te.THICKNESS_TEXTURE),Oe&&(ie|=Te.DIFFUSE_TRANSMISSION_TEXTURE);let Or=.5;P instanceof dr.Opaque?ie|=Te.ALPHA_MODE_OPAQUE:P instanceof dr.Mask?(Or=P.value,ie|=Te.ALPHA_MODE_MASK):P instanceof dr.Blend?ie|=Te.ALPHA_MODE_BLEND:P instanceof dr.Premultiplied?ie|=Te.ALPHA_MODE_PREMULTIPLIED:P instanceof dr.Add?ie|=Te.ALPHA_MODE_ADD:P instanceof dr.Multiply&&(ie|=Te.ALPHA_MODE_MULTIPLY);const Fi=0,Yr=q.copy(e.read(q)),ur=Yr.to_transpose().map(Tt=>Tt.to_array()).flat(),Ns=ur,[Cs,Ms]=Yr.inverse_transpose_3x3(),Li=[];Li.push(...ur,...Ns,...Cs,Ms,0,0,0);const ni=r.createBuffer({viewOrSize:new Float32Array(36),usage:re.STORAGE});ni.setSubData(0,new Uint8Array(new Float32Array(Li).buffer));const pt={};pt.MESH_PIPELINE=1,pt.VERTEX_OUTPUT_INSTANCE_INDEX=1,i.contains_attribute(j.ATTRIBUTE_POSITION)&&(pt.VERTEX_POSITIONS=1),i.contains_attribute(j.ATTRIBUTE_NORMAL)&&(pt.VERTEX_NORMALS=1),i.contains_attribute(j.ATTRIBUTE_UV_0)&&(pt.VERTEX_UVS=1),i.contains_attribute(j.ATTRIBUTE_UV_1)&&(pt.VERTEX_UVS_1=1),i.contains_attribute(j.ATTRIBUTE_TANGENT)&&(pt.VERTEX_TANGENTS=1),i.contains_attribute(j.ATTRIBUTE_COLOR)&&(pt.VERTEX_COLORS=1);const ct=this.renderInstManager.newRenderInst();ct.setAllowSkippingIfPipelineNotReady(!1);const oi=xs(r,{vertex:{wgsl:s,entryPoint:"vertex",defines:!0},fragment:{wgsl:n,entryPoint:"fragment",defines:!0}},pt),zi={vertexBufferDescriptors:[],indexBufferFormat:null,program:null};let ai=null;i.indices&&(zi.indexBufferFormat=R.U32_R,ai=r.createBuffer({viewOrSize:new Uint32Array(i.indices),usage:re.INDEX}));const Ps=[];i.attributes.forEach(([Tt,Yt])=>{const{format:Ds,id:li}=Tt,Us=r.createBuffer({viewOrSize:new Float32Array(Nc(Yt)),usage:re.VERTEX});Ps.push(Us),zi.vertexBufferDescriptors.push({arrayStride:Kg(Ds),stepMode:Ti.VERTEX,attributes:[{format:Ds,offset:0,shaderLocation:li}]})});const Jn=this.renderCache.createInputLayout({...zi,program:oi});ct.renderPipelineDescriptor.topology=i.primitive_topology,ct.setProgram(oi),ct.setStorageBuffers([ni],[kg]),ct.setVertexInput(Jn,Ps.map(Tt=>({buffer:Tt,byteOffset:0})),ai?{buffer:ai,offset:0}:null);const Bs=i.count_vertices();if(ai?ct.drawIndexesInstanced(i.indices.length,1):ct.drawPrimitives(Bs),a){const Tt=r.createTexture({format:R.U8_RGBA_NORM,width:a.width,height:a.height,dimension:Q.TEXTURE_2D,usage:Ot.SAMPLED,pixelStore:{unpackFlipY:!0}});Tt.setImageData([a]),r.setResourceName(Tt,"BaseColor");const Yt=new qn;Yt.texture=Tt,ct.setSamplerBindingsFromTextureMappings([Yt])}ct.setUniforms(3,[{name:"base_color",value:o.as_linear_rgba_f32()},{name:"emissive",value:l.as_linear_rgba_f32()},{name:"perceptual_roughness",value:u},{name:"metallic",value:h},{name:"reflectance",value:p},{name:"diffuse_transmission",value:d},{name:"specular_transmission",value:g},{name:"thickness",value:m},{name:"ior",value:E},{name:"attenuation_distance",value:A},{name:"attenuation_color",value:S.as_linear_rgba_f32()},{name:"flags",value:ie},{name:"alpha_cutoff",value:Or},{name:"parallax_depth_scale",value:k},{name:"max_parallax_layer_count",value:C},{name:"max_relief_mapping_search_steps",value:Fi},{name:"deferred_lighting_pass_id",value:O}]),this.renderInstManager.submitRenderInst(ct,this.renderList)}}const gl=10,Zg=4;class Jc extends x{constructor(){super(...arguments),this.pipeline=this.attach(Tr),this.ambient_lights=this.query(e=>e.addedOrChanged.with(Gt).trackWrites),this.ambient_lights_query=this.query(e=>e.current.with(Gt).read),this.directional_lights=this.query(e=>e.addedOrChanged.with(tt).trackWrites),this.directional_lights_query=this.query(e=>e.current.with(tt).read)}async prepare(){this.prepareUniforms=(e,r)=>{e.setUniforms(r,[{name:"padding",value:new Array(976).fill(0)}])}}execute(){const e=this.ambient_lights.addedOrChanged,r=this.directional_lights.addedOrChanged.slice(0,gl);if(e.length||r.length){let s=I.ZERO;this.ambient_lights_query.current.forEach(a=>{this.pipeline.passesChanged=!0;const l=a.read(Gt);s=new I(...l.color.as_linear_rgba_f32()).mul(l.brightness)});const n=new Array(gl).fill(void 0).map(()=>new Array(96).fill(0));let o=0;this.directional_lights_query.current.forEach((a,l)=>{const c=a.read(tt);this.pipeline.passesChanged=!0;let u=0;const h=4,_=1/250,p=100,d=Math.log2(h*h/_)-Math.log2(p/100),g=1/(Math.pow(2,d)*1.2),m=c.illuminance*g,E=Math.min(c.cascade_shadow_config.bounds.length,Zg),A=_t.copy(c.transform.compute_matrix()),S=V.from_matrix(A);n[l]=[...new Array(4).fill([...new Array(16).fill(0),0,0,0,0]).flat(),...c.color.as_linear_rgba_f32().map(P=>P*m),...S.back().to_array(),u,c.shadow_depth_bias,c.shadow_normal_bias,E,c.cascade_shadow_config.overlap_proportion,o,0,0,0]}),this.prepareUniforms=(a,l)=>{a.setUniforms(l,[{name:"directional_lights",value:n.flat()},{name:"ambient_color",value:s.to_array()},{name:"cluster_dimensions",value:[0,0,0,0]},{name:"cluster_factors",value:[0,0,0,0]},{name:"n_directional_lights",value:r.length},{name:"spot_light_shadowmap_offset",value:0},{name:"environment_map_smallest_specular_mip_level",value:0}])}}}}class Tr extends x{constructor(){super(...arguments),this.appConfig=this.singleton.read($e),this.rendererResource=this.attach(Yn),this.passes={},this.passesChanged=!0,this.nodes=[],this.viewUniforms=this.attach(Ss),this.lightsUniforms=this.attach(Jc),this.fogUniforms=this.attach(Gc),this.meshes_query=this.query(e=>e.current.with(j,H,V,q)),this.renderables=this.query(e=>e.addedOrChanged.with(j,H,V).trackWrites)}async prepare(){this.device=this.rendererResource.device,this.swapChain=this.rendererResource.swapChain,this.renderHelper=this.rendererResource.renderHelper;const e=new Qg(this.renderHelper.renderInstManager,this.renderHelper.renderCache,this);e.viewUniforms=this.viewUniforms,e.lightsUniforms=this.lightsUniforms,e.fogUniforms=this.fogUniforms,this.nodes.push(e)}run(e){const{canvas:r}=this.appConfig,i=this.renderHelper.renderInstManager,s=this.renderHelper.renderGraph.newGraphBuilder(),n=mc,o={backbufferWidth:r.width,backbufferHeight:r.height,antialiasingMode:Qc.None},a=ml(ht.Color0,o,ha(n)),l=ml(ht.DepthStencil,o,ug),c=s.createRenderTargetID(a,"Main Color"),u=s.createRenderTargetID(l,"Main Depth");s.pushPass(h=>{h.setDebugName("Main Render Pass"),h.attachRenderTargetID(ht.Color0,c),h.attachRenderTargetID(ht.DepthStencil,u),h.exec(_=>{this.nodes.forEach(p=>{p.draw(_)})})}),Object.keys(this.passes).forEach(h=>{const _=this.passes[h];_(s,this.renderHelper,o,c,u)}),s.resolveRenderTargetToExternalTexture(c,this.swapChain.getOnscreenTexture()),this.nodes.forEach(h=>{h.prepare(),e.forEach(_=>{h.submit(_)}),h.post()}),this.renderHelper.prepareToRender(),this.renderHelper.renderGraph.execute(),i.resetRenderInsts()}execute(){this.passesChanged&&this.meshes_query.current.length?(this.run(this.meshes_query.current),this.passesChanged=!1):this.renderables.addedOrChanged.length&&this.run(this.renderables.addedOrChanged)}registerPass(e,r){this.passes[e]=r}unregisterPass(e){delete this.passes[e]}}class Gg extends pa{constructor(){super(...arguments),this.textureMapping=Qr(1,()=>new qn)}init(){const{device:e}=this.renderCache;this.program=xs(e,{vertex:{wgsl:Uo,entryPoint:"skybox_vertex"},fragment:{wgsl:Uo,entryPoint:"skybox_fragment"}},{}),this.sampler=e.createSampler({addressModeU:Le.CLAMP_TO_EDGE,addressModeV:Le.CLAMP_TO_EDGE,minFilter:le.BILINEAR,magFilter:le.BILINEAR,mipmapFilter:Ee.LINEAR,lodMinClamp:0,lodMaxClamp:0})}prepare(){}post(){}submit(){const e=this.renderInstManager.newRenderInst();e.setAllowSkippingIfPipelineNotReady(!1),e.setMegaStateFlags({depthWrite:!1,depthCompare:De.GEQUAL,...In}),e.setBindingLayout({numUniformBuffers:1,numSamplers:1,numStorageBuffers:0,numStorageTextures:0}),e.setUniformBuffer(this.pipeline.renderHelper.uniformBuffer),this.viewUniforms.prepareUniforms(e,0),this.textureMapping[0].texture=this.cubemap,this.textureMapping[0].sampler=this.sampler,e.setSamplerBindingsFromTextureMappings(this.textureMapping),e.setProgram(this.program),e.drawPrimitives(3),this.renderInstManager.submitRenderInst(e,this.renderList)}}class Jg extends x{constructor(){super(...arguments),this.rendererResource=this.attach(Yn),this.viewUniforms=this.attach(Ss),this.pipeline=this.attach(Tr),this.skyboxs=this.query(e=>e.added.and.removed.and.changed.with(Mr).trackWrites)}execute(){for(const e of this.skyboxs.added){this.pipeline.passesChanged=!0,this.skyboxNode=new Gg(this.rendererResource.renderHelper.renderInstManager,this.rendererResource.renderHelper.renderCache,this.pipeline),this.skyboxNode.viewUniforms=this.viewUniforms,this.pipeline.nodes.unshift(this.skyboxNode),this.updateSkybox(e);break}for(const e of this.skyboxs.removed){this.pipeline.passesChanged=!0;const r=this.pipeline.nodes.indexOf(this.skyboxNode);this.pipeline.nodes.splice(r,1),this.skyboxNode=null;break}for(const e of this.skyboxs.changed)this.updateSkybox(e)}updateSkybox(e){this.pipeline.passesChanged=!0;const r=this.rendererResource.device,s=e.read(Mr).image_handle,n=r.createTexture({format:R.U8_RGBA_NORM,width:s[0].width,height:s[0].height,depthOrArrayLayers:6,dimension:Q.TEXTURE_CUBE_MAP,usage:Ot.SAMPLED});n.setImageData(s),r.setResourceName(n,"Skybox Cube map"),this.skyboxNode.cubemap=n}}const eu=`
#define_import_path fullscreen_vertex_shader

struct FullscreenVertexOutput {
    @builtin(position)
    position: vec4<f32>,
    @location(0)
    uv: vec2<f32>,
};

// This vertex shader produces the following, when drawn using indices 0..3:
//
//  1 |  0-----x.....2
//  0 |  |  s  |  . ´
// -1 |  x_____x´
// -2 |  :  .´
// -3 |  1´
//    +---------------
//      -1  0  1  2  3
//
// The axes are clip-space x and y. The region marked s is the visible region.
// The digits in the corners of the right-angled triangle are the vertex
// indices.
//
// The top-left has UV 0,0, the bottom-left has 0,2, and the top-right has 2,0.
// This means that the UV gets interpolated to 1,1 at the bottom-right corner
// of the clip-space rectangle that is at 1,-1 in clip space.
@vertex
fn fullscreen_vertex_shader(@builtin(vertex_index) vertex_index: u32) -> FullscreenVertexOutput {
    // See the explanation above for how this works
    let uv = vec2<f32>(f32(vertex_index >> 1u), f32(vertex_index & 1u)) * 2.0;
    let clip_position = vec4<f32>(uv * vec2<f32>(2.0, -2.0) + vec2<f32>(-1.0, 1.0), 0.0, 1.0);

    return FullscreenVertexOutput(clip_position, uv);
}
`,eE=`
#import render::view::View
#import fullscreen_vertex_shader::FullscreenVertexOutput
#import core_pipeline::tonemapping::{tone_mapping, powsafe, screen_space_dither}

@group(0) @binding(0) var<uniform> view: View;
@group(1) @binding(0) var hdr_texture: texture_2d<f32>;
@group(1) @binding(1) var hdr_sampler: sampler;

// @group(0) @binding(3) var dt_lut_texture: texture_3d<f32>;
// @group(0) @binding(4) var dt_lut_sampler: sampler;

@fragment
fn fragment(in: FullscreenVertexOutput) -> @location(0) vec4<f32> {
    let hdr_color = textureSample(hdr_texture, hdr_sampler, in.uv);
    var output_rgb = tone_mapping(hdr_color, view.color_grading).rgb;

#ifdef DEBAND_DITHER
    output_rgb = powsafe(output_rgb.rgb, 1.0 / 2.2);
    output_rgb = output_rgb + screen_space_dither(in.position.xy);
    // This conversion back to linear space is required because our output texture format is
    // SRGB; the GPU will assume our output is linear and will apply an SRGB conversion.
    output_rgb = powsafe(output_rgb.rgb, 2.2);
#endif

    return vec4<f32>(output_rgb, hdr_color.a);
}
`;class tE extends x{constructor(){super(...arguments),this.tonemapping=this.query(e=>e.addedOrChanged.with(it,at).trackWrites),this.pipeline=this.attach(Tr),this.viewUniforms=this.attach(Ss),this.textureMapping=Qr(1,()=>new qn),this.defines={},this.pushTonemappingPass=(e,r,i,s)=>{const n=r.getDevice();this.program||(this.program=xs(n,{vertex:{wgsl:eu,entryPoint:"fullscreen_vertex_shader"},fragment:{wgsl:eE,entryPoint:"fragment",defines:!0}},this.defines)),e.pushPass(o=>{o.setDebugName("Tonemapping"),o.attachRenderTargetID(ht.Color0,s);const a=e.resolveRenderTarget(s);o.attachResolveTexture(a),o.exec((l,c)=>{const u=r.renderInstManager.newRenderInst();u.setAllowSkippingIfPipelineNotReady(!1),u.setMegaStateFlags(In),u.setBindingLayout({numUniformBuffers:1,numSamplers:1,numStorageBuffers:0,numStorageTextures:0}),u.drawPrimitives(3),u.setProgram(this.program),u.setUniformBuffer(r.uniformBuffer),this.viewUniforms.prepareUniforms(u,0),this.textureMapping[0].texture=c.getResolveTextureForID(a),this.textureMapping[0].sampler=n.createSampler({addressModeU:Le.CLAMP_TO_EDGE,addressModeV:Le.CLAMP_TO_EDGE,minFilter:le.BILINEAR,magFilter:le.BILINEAR,mipmapFilter:Ee.LINEAR}),u.setSamplerBindingsFromTextureMappings(this.textureMapping),u.drawOnPass(r.renderCache,l)})})}}execute(){this.tonemapping.addedOrChanged.forEach(e=>{this.pipeline.passesChanged=!0,this.finalize();const{method:r}=e.read(it);r===Ue.None?this.defines.TONEMAP_METHOD_NONE=1:r===Ue.Reinhard?this.defines.TONEMAP_METHOD_REINHARD=1:r===Ue.ReinhardLuminance?this.defines.TONEMAP_METHOD_REINHARD_LUMINANCE=1:r===Ue.AcesFitted?this.defines.TONEMAP_METHOD_ACES_FITTED=1:r===Ue.AgX?this.defines.TONEMAP_METHOD_AGX=1:r===Ue.SomewhatBoringDisplayTransform?this.defines.TONEMAP_METHOD_SOMWHAT_BORING_DISPLAY_TRANSFORM=1:r===Ue.TonyMcMapface?this.defines.TONEMAP_METHOD_TONY_MC_MAPFACE=1:r===Ue.BlenderFilmic&&(this.defines.TONEMAP_METHOD_BLENDER_FILMIC=1);const{enabled:i}=e.read(at);i&&(this.defines.DEBAND_DITHER=1),this.pipeline.registerPass("Tonemapping",this.pushTonemappingPass)})}finalize(){this.program&&(this.program.destroy(),this.program=null,this.pipeline.unregisterPass("Tonemapping"),this.defines={})}}const rE=`
// NVIDIA FXAA 3.11
// Original source code by TIMOTHY LOTTES
// https://gist.github.com/kosua20/0c506b81b3812ac900048059d2383126
//
// Cleaned version - https://github.com/kosua20/Rendu/blob/master/resources/common/shaders/screens/fxaa.frag
//
// Tweaks by mrDIMAS - https://github.com/FyroxEngine/Fyrox/blob/master/src/renderer/shaders/fxaa_fs.glsl

#import fullscreen_vertex_shader::FullscreenVertexOutput

@group(1) @binding(0) var screenTexture: texture_2d<f32>;
@group(1) @binding(1) var samp: sampler;

// Trims the algorithm from processing darks.
#ifdef EDGE_THRESH_MIN_LOW
    const EDGE_THRESHOLD_MIN: f32 = 0.0833;
#endif

#ifdef EDGE_THRESH_MIN_MEDIUM
    const EDGE_THRESHOLD_MIN: f32 = 0.0625;
#endif

#ifdef EDGE_THRESH_MIN_HIGH
    const EDGE_THRESHOLD_MIN: f32 = 0.0312;
#endif

#ifdef EDGE_THRESH_MIN_ULTRA
    const EDGE_THRESHOLD_MIN: f32 = 0.0156;
#endif

#ifdef EDGE_THRESH_MIN_EXTREME
    const EDGE_THRESHOLD_MIN: f32 = 0.0078;
#endif

// The minimum amount of local contrast required to apply algorithm.
#ifdef EDGE_THRESH_LOW
    const EDGE_THRESHOLD_MAX: f32 = 0.250;
#endif

#ifdef EDGE_THRESH_MEDIUM
    const EDGE_THRESHOLD_MAX: f32 = 0.166;
#endif

#ifdef EDGE_THRESH_HIGH
    const EDGE_THRESHOLD_MAX: f32 = 0.125;
#endif

#ifdef EDGE_THRESH_ULTRA
    const EDGE_THRESHOLD_MAX: f32 = 0.063;
#endif

#ifdef EDGE_THRESH_EXTREME
    const EDGE_THRESHOLD_MAX: f32 = 0.031;
#endif

const ITERATIONS: i32 = 12; //default is 12
const SUBPIXEL_QUALITY: f32 = 0.75;
// #define QUALITY(q) ((q) < 5 ? 1.0 : ((q) > 5 ? ((q) < 10 ? 2.0 : ((q) < 11 ? 4.0 : 8.0)) : 1.5))
fn QUALITY(q: i32) -> f32 {
    switch (q) {
        //case 0, 1, 2, 3, 4: { return 1.0; }
        default:              { return 1.0; }
        case 5:               { return 1.5; }
        case 6, 7, 8, 9:      { return 2.0; }
        case 10:              { return 4.0; }
        case 11:              { return 8.0; }
    }
}

fn rgb2luma(rgb: vec3<f32>) -> f32 {
    return sqrt(dot(rgb, vec3<f32>(0.299, 0.587, 0.114)));
}

// Performs FXAA post-process anti-aliasing as described in the Nvidia FXAA white paper and the associated shader code.
@fragment
fn fragment(in: FullscreenVertexOutput) -> @location(0) vec4<f32> {
    let resolution = vec2<f32>(textureDimensions(screenTexture));
    let inverseScreenSize = 1.0 / resolution.xy;
    let texCoord = in.position.xy * inverseScreenSize;

    let centerSample = textureSampleLevel(screenTexture, samp, texCoord, 0.0);
    let colorCenter = centerSample.rgb;

    // Luma at the current fragment
    let lumaCenter = rgb2luma(colorCenter);

    // Luma at the four direct neighbors of the current fragment.
    let lumaDown = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(0, -1)).rgb);
    let lumaUp = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(0, 1)).rgb);
    let lumaLeft = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(-1, 0)).rgb);
    let lumaRight = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(1, 0)).rgb);

    // Find the maximum and minimum luma around the current fragment.
    let lumaMin = min(lumaCenter, min(min(lumaDown, lumaUp), min(lumaLeft, lumaRight)));
    let lumaMax = max(lumaCenter, max(max(lumaDown, lumaUp), max(lumaLeft, lumaRight)));

    // Compute the delta.
    let lumaRange = lumaMax - lumaMin;

    // If the luma variation is lower that a threshold (or if we are in a really dark area), we are not on an edge, don't perform any AA.
    if (lumaRange < max(EDGE_THRESHOLD_MIN, lumaMax * EDGE_THRESHOLD_MAX)) {
        return centerSample;
    }

    // Query the 4 remaining corners lumas.
    let lumaDownLeft  = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(-1, -1)).rgb);
    let lumaUpRight   = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(1, 1)).rgb);
    let lumaUpLeft    = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(-1, 1)).rgb);
    let lumaDownRight = rgb2luma(textureSampleLevel(screenTexture, samp, texCoord, 0.0, vec2<i32>(1, -1)).rgb);

    // Combine the four edges lumas (using intermediary variables for future computations with the same values).
    let lumaDownUp = lumaDown + lumaUp;
    let lumaLeftRight = lumaLeft + lumaRight;

    // Same for corners
    let lumaLeftCorners = lumaDownLeft + lumaUpLeft;
    let lumaDownCorners = lumaDownLeft + lumaDownRight;
    let lumaRightCorners = lumaDownRight + lumaUpRight;
    let lumaUpCorners = lumaUpRight + lumaUpLeft;

    // Compute an estimation of the gradient along the horizontal and vertical axis.
    let edgeHorizontal = abs(-2.0 * lumaLeft   + lumaLeftCorners)  + 
                         abs(-2.0 * lumaCenter + lumaDownUp) * 2.0 + 
                         abs(-2.0 * lumaRight  + lumaRightCorners);

    let edgeVertical =   abs(-2.0 * lumaUp     + lumaUpCorners)       + 
                         abs(-2.0 * lumaCenter + lumaLeftRight) * 2.0 + 
                         abs(-2.0 * lumaDown   + lumaDownCorners);

    // Is the local edge horizontal or vertical ?
    let isHorizontal = (edgeHorizontal >= edgeVertical);

    // Choose the step size (one pixel) accordingly.
    var stepLength = select(inverseScreenSize.x, inverseScreenSize.y, isHorizontal);

    // Select the two neighboring texels lumas in the opposite direction to the local edge.
    var luma1 = select(lumaLeft, lumaDown, isHorizontal);
    var luma2 = select(lumaRight, lumaUp, isHorizontal);

    // Compute gradients in this direction.
    let gradient1 = luma1 - lumaCenter;
    let gradient2 = luma2 - lumaCenter;

    // Which direction is the steepest ?
    let is1Steepest = abs(gradient1) >= abs(gradient2);

    // Gradient in the corresponding direction, normalized.
    let gradientScaled = 0.25 * max(abs(gradient1), abs(gradient2));

    // Average luma in the correct direction.
    var lumaLocalAverage = 0.0;
    if (is1Steepest) {
        // Switch the direction
        stepLength = -stepLength;
        lumaLocalAverage = 0.5 * (luma1 + lumaCenter);
    } else {
        lumaLocalAverage = 0.5 * (luma2 + lumaCenter);
    }

    // Shift UV in the correct direction by half a pixel.
    // Compute offset (for each iteration step) in the right direction.
    var currentUv = texCoord;
    var offset = vec2<f32>(0.0, 0.0);
    if (isHorizontal) {
        currentUv.y = currentUv.y + stepLength * 0.5;
        offset.x = inverseScreenSize.x;
    } else {
        currentUv.x = currentUv.x + stepLength * 0.5;
        offset.y = inverseScreenSize.y;
    }

    // Compute UVs to explore on each side of the edge, orthogonally. The QUALITY allows us to step faster.
    var uv1 = currentUv - offset; // * QUALITY(0); // (quality 0 is 1.0)
    var uv2 = currentUv + offset; // * QUALITY(0); // (quality 0 is 1.0)

    // Read the lumas at both current extremities of the exploration segment, and compute the delta wrt to the local average luma.
    var lumaEnd1 = rgb2luma(textureSampleLevel(screenTexture, samp, uv1, 0.0).rgb);
    var lumaEnd2 = rgb2luma(textureSampleLevel(screenTexture, samp, uv2, 0.0).rgb);
    lumaEnd1 = lumaEnd1 - lumaLocalAverage;
    lumaEnd2 = lumaEnd2 - lumaLocalAverage;

    // If the luma deltas at the current extremities is larger than the local gradient, we have reached the side of the edge.
    var reached1 = abs(lumaEnd1) >= gradientScaled;
    var reached2 = abs(lumaEnd2) >= gradientScaled;
    var reachedBoth = reached1 && reached2;

    // If the side is not reached, we continue to explore in this direction.
    uv1 = select(uv1 - offset, uv1, reached1); // * QUALITY(1); // (quality 1 is 1.0)
    uv2 = select(uv2 - offset, uv2, reached2); // * QUALITY(1); // (quality 1 is 1.0)

    // If both sides have not been reached, continue to explore.
    if (!reachedBoth) {
        for (var i: i32 = 2; i < ITERATIONS; i = i + 1) {
            // If needed, read luma in 1st direction, compute delta.
            if (!reached1) { 
                lumaEnd1 = rgb2luma(textureSampleLevel(screenTexture, samp, uv1, 0.0).rgb);
                lumaEnd1 = lumaEnd1 - lumaLocalAverage;
            }
            // If needed, read luma in opposite direction, compute delta.
            if (!reached2) { 
                lumaEnd2 = rgb2luma(textureSampleLevel(screenTexture, samp, uv2, 0.0).rgb);
                lumaEnd2 = lumaEnd2 - lumaLocalAverage;
            }
            // If the luma deltas at the current extremities is larger than the local gradient, we have reached the side of the edge.
            reached1 = abs(lumaEnd1) >= gradientScaled;
            reached2 = abs(lumaEnd2) >= gradientScaled;
            reachedBoth = reached1 && reached2;

            // If the side is not reached, we continue to explore in this direction, with a variable quality.
            if (!reached1) {
                uv1 = uv1 - offset * QUALITY(i);
            }
            if (!reached2) {
                uv2 = uv2 + offset * QUALITY(i);
            }

            // If both sides have been reached, stop the exploration.
            if (reachedBoth) { 
                break; 
            }
        }
    }

    // Compute the distances to each side edge of the edge (!).
    var distance1 = select(texCoord.y - uv1.y, texCoord.x - uv1.x, isHorizontal);
    var distance2 = select(uv2.y - texCoord.y, uv2.x - texCoord.x, isHorizontal);

    // In which direction is the side of the edge closer ?
    let isDirection1 = distance1 < distance2;
    let distanceFinal = min(distance1, distance2);

    // Thickness of the edge.
    let edgeThickness = (distance1 + distance2);

    // Is the luma at center smaller than the local average ?
    let isLumaCenterSmaller = lumaCenter < lumaLocalAverage;

    // If the luma at center is smaller than at its neighbor, the delta luma at each end should be positive (same variation).
    let correctVariation1 = (lumaEnd1 < 0.0) != isLumaCenterSmaller;
    let correctVariation2 = (lumaEnd2 < 0.0) != isLumaCenterSmaller;

    // Only keep the result in the direction of the closer side of the edge.
    var correctVariation = select(correctVariation2, correctVariation1, isDirection1);

    // UV offset: read in the direction of the closest side of the edge.
    let pixelOffset = - distanceFinal / edgeThickness + 0.5;

    // If the luma variation is incorrect, do not offset.
    var finalOffset = select(0.0, pixelOffset, correctVariation);

    // Sub-pixel shifting
    // Full weighted average of the luma over the 3x3 neighborhood.
    let lumaAverage = (1.0 / 12.0) * (2.0 * (lumaDownUp + lumaLeftRight) + lumaLeftCorners + lumaRightCorners);
    // Ratio of the delta between the global average and the center luma, over the luma range in the 3x3 neighborhood.
    let subPixelOffset1 = clamp(abs(lumaAverage - lumaCenter) / lumaRange, 0.0, 1.0);
    let subPixelOffset2 = (-2.0 * subPixelOffset1 + 3.0) * subPixelOffset1 * subPixelOffset1;
    // Compute a sub-pixel offset based on this delta.
    let subPixelOffsetFinal = subPixelOffset2 * subPixelOffset2 * SUBPIXEL_QUALITY;

    // Pick the biggest of the two offsets.
    finalOffset = max(finalOffset, subPixelOffsetFinal);

    // Compute the final UV coordinates.
    var finalUv = texCoord;
    if (isHorizontal) {
        finalUv.y = finalUv.y + finalOffset * stepLength;
    } else {
        finalUv.x = finalUv.x + finalOffset * stepLength;
    }

    // Read the color at the new UV coordinates, and use it.
    var finalColor = textureSampleLevel(screenTexture, samp, finalUv, 0.0).rgb;
    return vec4<f32>(finalColor, centerSample.a);
}
`,El={[Je.Low]:"LOW",[Je.Medium]:"MEDIUM",[Je.High]:"HIGH",[Je.Ultra]:"ULTRA",[Je.Extreme]:"EXTREME"};class iE extends x{constructor(){super(...arguments),this.fxaa=this.query(e=>e.addedOrChanged.with(Me).trackWrites),this.pipeline=this.attach(Tr),this.textureMapping=Qr(1,()=>new qn),this.defines={},this.pushFXAAPass=(e,r,i,s,n)=>{const o=r.getDevice();this.program||(this.program=xs(o,{vertex:{wgsl:eu,entryPoint:"fullscreen_vertex_shader"},fragment:{wgsl:rE,entryPoint:"fragment",defines:!0}},this.defines)),e.pushPass(a=>{a.setDebugName("FXAA"),a.attachRenderTargetID(ht.Color0,s);const l=e.resolveRenderTarget(s);a.attachResolveTexture(l),a.exec((c,u)=>{const h=r.renderInstManager.newRenderInst();h.setAllowSkippingIfPipelineNotReady(!1),h.setMegaStateFlags(In),h.setBindingLayout({numUniformBuffers:0,numSamplers:1,numStorageBuffers:0,numStorageTextures:0}),h.drawPrimitives(3),h.setProgram(this.program),this.textureMapping[0].texture=u.getResolveTextureForID(l),this.textureMapping[0].sampler=o.createSampler({addressModeU:Le.CLAMP_TO_EDGE,addressModeV:Le.CLAMP_TO_EDGE,minFilter:le.BILINEAR,magFilter:le.BILINEAR,mipmapFilter:Ee.LINEAR}),h.setSamplerBindingsFromTextureMappings(this.textureMapping),h.drawOnPass(r.renderCache,c)})})}}compileDefines(e){const{edge_threshold:r,edge_threshold_min:i}=e;this.defines={[`EDGE_THRESH_${El[r]}`]:!0,[`EDGE_THRESH_MIN_${El[i]}`]:!0}}execute(){this.fxaa.addedOrChanged.forEach(e=>{const r=e.read(Me);this.pipeline.passesChanged=!0,this.compileDefines(r),this.finalize(),r.enabled?this.pipeline.registerPass("Fxaa",this.pushFXAAPass):this.pipeline.unregisterPass("Fxaa")})}finalize(){this.program&&(this.program.destroy(),this.program=null)}}class sE extends x{constructor(){super(),this.queries=this.query(e=>e.addedOrChanged.with(V).without(It,zt).trackWrites),this.orphaned=this.query(e=>e.removed.with(It)),this.query(e=>e.using(q).write)}execute(){this.queries.addedOrChanged.forEach(e=>{const r=e.read(V);e.has(q)||e.add(q,{}),e.write(q).from(r)}),this.orphaned.removed.forEach(e=>{const r=e.read(V);e.write(q).from(r)})}}class nE extends x{constructor(){super(...arguments),this.root_query=this.query(e=>e.current.with(zt,V,q).without(It)),this.orphaned=this.query(e=>e.removed.with(It)),this.transform_query=this.query(e=>e.current.with(V,q,It).withAny(zt)),this.parent_query=this.query(e=>e.with(It)),this.orphaned_entities=[]}execute(){this.orphaned_entities=[],this.orphaned_entities.push(...this.orphaned.removed),this.root_query.current.forEach(e=>{e.read(V),e.read(zt),this.parent_query.current.forEach(r=>{})})}propagate_recursive(){}}class oE extends x{execute(){}}class aE extends x{constructor(){super(),this.without_aabb=this.query(e=>e.with(j).without(Ht,yn).current),this.query(e=>e.using(Ht).write)}execute(){this.without_aabb.current.forEach(e=>{const i=e.read(j).compute_aabb();e.add(Ht,i)})}}class lE extends x{constructor(){super(),this.views=this.query(e=>e.addedOrChanged.with(Se).trackWrites),this.query(e=>e.using(q,J,rt).read.and.using(ze).write)}execute(){this.views.addedOrChanged.forEach(e=>{const r=e.read(q),i=e.write(ze);let s;e.has(rt)?s=e.read(rt):e.has(J)&&(s=e.read(J));const n=_t.copy(r.compute_matrix()),o=s.get_projection_matrix().mul(n.inverse()),a=V.from_matrix(n),{half_spaces:l}=ze.from_view_projection_custom_far(o,a.translation,a.back(),s.far);i.half_spaces=l})}}class cE extends x{constructor(){super(),this.changed=this.query(e=>e.addedOrChanged.with(nt).withAny(It,zt).trackWrites),this.visibility_query=this.query(e=>e.current.with(nt,et)),this.children_query=this.query(e=>e.current.with(zt,nt,et)),this.query(e=>e.using(et).write)}execute(){this.changed.addedOrChanged.forEach(e=>{const r=e.read(nt),i=e.read(It),s=e.read(zt);let n;r.mode===Kr.Visible?n=!0:r.mode===Kr.Hidden?n=!1:r.mode===Kr.Inherited&&(!s.parent||!s.parent.has(nt))&&(n=!0);const o=e.write(et);o.visible!==n&&(o.visible=n,i.children.forEach(a=>{this.propagate_recursive(n,a)}))})}propagate_recursive(e,r){const i=r.read(nt),s=r.write(et);let n;i.mode===Kr.Visible?n=!0:i.mode===Kr.Hidden?n=!1:i.mode===Kr.Inherited&&(n=e),s.visible!==n&&(s.visible=n,r.read(It).children.forEach(a=>{this.propagate_recursive(n,a)}))}}class uE extends x{constructor(){super(),this.q=this.query(e=>e.current.with(xe)),this.query(e=>e.using(xe).write)}execute(){this.q.current.forEach(e=>{const r=e.write(xe);r.visible=xe.HIDDEN.visible})}}var hE=Object.defineProperty,_E=Object.getOwnPropertyDescriptor,tu=(t,e,r,i)=>{for(var s=i>1?void 0:i?_E(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&hE(e,r,s),s};class ma{constructor(e=v.ZERO,r=0){this.center=e,this.radius=r}intersects_obb(e,r){const s=r.transform_point3(e.center).sub(this.center),n=s._length(),o=e.relative_radius(s.div(n),r.matrix3);return n<this.radius+o}}tu([y(jt)],ma.prototype,"center",2);tu([y.float32],ma.prototype,"radius",2);class dE extends x{constructor(){super(),this.view_query=this.query(e=>e.current.with(Vt,ze,Y)),this.visible_aabb_query=this.query(e=>e.current.with(et,xe,q)),this.query(e=>e.using(Vt,xe).write),this.query(e=>e.using(Ut,yn,Ht).read)}execute(){this.view_query.current.forEach(e=>{const r=e.write(Vt),i=e.read(ze);if(!e.read(Y).is_active)return;let n;e.has(Ut)&&(n=e.read(Ut)),r.entities=[],this.visible_aabb_query.current.forEach(o=>{const a=o.read(et),l=o.write(xe),c=q.copy(o.read(q));if(!a.visible)return;if(o.has(Ut)){const h=n,_=o.read(Ut);if(!h.intersects(_))return}if(!o.has(yn)&&o.has(Ht)){const h=o.read(Ht),_=c.affine(),p=new ma(_.transform_point3(h.center),c.radius_vec3(h.half_extents));if(!i.intersects_sphere(p,!1)||!i.intersects_obb(h,_,!0,!1))return}l.visible=!0,r.entities.push(o)})})}}class yl extends x{constructor(){super(),this.appConfig=this.singleton.read($e),this.cameras=this.query(e=>e.addedOrChanged.with(Y).trackWrites),this.query(e=>e.using(Se,J,rt).write)}execute(){const{canvas:e}=this.appConfig,{width:r,height:i}=e;this.cameras.addedOrChanged.forEach(s=>{var u,h;const n=s.read(Y),o=s.write(Se),a=(u=n.viewport)==null?void 0:u.physical_size;o.target_info_physical_size=new oe(r,i),o.target_info_scale_factor=1;let l;const c=n.logical_viewport_size(o);s.has(rt)?l=s.write(rt):s.has(J)&&(l=s.write(J)),l.update(c.x,c.y),o.projection_matrix=l.get_projection_matrix(),a&&!((h=o.old_viewport_size)!=null&&h.eq(a))&&(o.old_viewport_size=a)})}}class Bi{}class fE{constructor(){this.events_a={events:[],start_event_count:0},this.events_b={events:[],start_event_count:0},this.event_count=0,this.reader=new Al}oldest_event_count(){return Math.min(this.events_a.start_event_count,this.events_b.start_event_count)}send(e){let r=new vl(this.event_count);const i={event_id:r,event:e};return this.events_b.events.push(i),this.event_count+=1,r}get_reader(){return new Al}update(){this.update_drain()}update_drain(){const e=this.events_a;this.events_a=this.events_b,this.events_b=e;const r=this.events_b.events.splice(0,this.events_b.events.length);return this.events_b.start_event_count=this.event_count,r.map(i=>i.event)}reset_start_event_count(){this.events_a.start_event_count=this.event_count,this.events_b.start_event_count=this.event_count}clear(){this.reset_start_event_count(),this.events_a.events=[],this.events_b.events=[]}len(){return this.events_a.events.length+this.events_b.events.length}is_empty(){return this.len()===0}drain(){return this.reset_start_event_count(),this.events_a.events.splice(0,this.events_a.events.length).concat(this.events_b.events.splice(0,this.events_b.events.length)).map(e=>e.event)}extend(e){this.event_count;let r=this.event_count,i=e.map(s=>{let n=new vl(r);return r+=1,{event_id:n,event:s}});this.events_b.events.push(...i),this.event_count=r}}class vl{constructor(e){this.id=e}eq(e){return this.id===e.id}}class Al{constructor(e=0){this.last_event_count=e}read(e){return this.read_with_id(e).without_id()}read_with_id(e){return new mE(this,e)}len(e){return Math.min(e.event_count-this.last_event_count,e.len())}}class pE{constructor(e){this.iter=e}*[Symbol.iterator](){for(const e of this.iter){const{event:r}=e;yield r}}next(){var e;return(e=this.iter.next())==null?void 0:e.event}}class mE{constructor(e,r){let i=e.last_event_count-r.events_a.start_event_count,s=e.last_event_count-r.events_b.start_event_count,n=r.events_a.events.slice(i),o=r.events_b.events.slice(s),a=n.length+o.length;if(a!==e.len(r))throw new Error("");e.last_event_count=r.event_count-a,this.reader=e,this.chain=n.concat(o),this.unread=a}without_id(){return new pE(this)}count(){return this.reader.last_event_count+=this.unread,this.unread}*[Symbol.iterator](){for(const e of this.chain)this.reader.last_event_count+=1,this.unread-=1,yield e}next(){if(this.unread!==0)return this.reader.last_event_count+=1,this.unread-=1,this.chain.shift()}}class gE{constructor(e,r){this.events=e,this.reader=r}read(){return this.reader.read(this.events)}iter(){return this.reader.read(this.events)}read_with_id(){return this.reader.read_with_id(this.events)}len(){return this.reader.len(this.events)}}class mr extends Bi{constructor(){super()}}(t=>{class e extends t{constructor(s){super(),this.value=s}}t.Rotate=e;class r extends t{constructor(s){super(),this.value=s}}t.TranslateEye=r})(mr||(mr={}));class EE{build(e){W(Nt),e.add_event(mr),e.add_systems(sr,Rl),e.add_systems(sr,TE),Ke(r=>r.before(ya))(Rl)}}class wl{constructor(){this._pressed=new Set,this._just_pressed=new Set,this._just_released=new Set}press(e){this._pressed.has(e)||this._just_pressed.add(e),this._pressed.add(e)}pressed(e){return this._pressed.has(e)}any_pressed(e){return e.some(r=>this.pressed(r))}release(e){this._pressed.delete(e)&&this._just_released.add(e)}release_all(){this._pressed.forEach(e=>{this._just_released.add(e)}),this._pressed.clear()}just_pressed(e){return this._just_pressed.has(e)}any_just_pressed(e){return e.some(r=>this.just_pressed(r))}clear_just_pressed(e){return this._just_pressed.delete(e)}just_released(e){return this._just_released.has(e)}any_just_released(e){return e.some(r=>this.just_released(r))}clear_just_released(e){return this._just_released.delete(e)}reset(e){this._pressed.delete(e),this._just_pressed.delete(e),this._just_released.delete(e)}reset_all(){this._pressed.clear(),this._just_pressed.clear(),this._just_released.clear()}clear(){this._just_pressed.clear(),this._just_released.clear()}}class ga extends Bi{}class Kn extends Bi{}class yE{build(e){e.add_systems(Es,wE).add_event(An).init_resource(Qn,new wl).add_systems(lt,AE).add_event(vn).add_event(ga).add_event(Kn).init_resource(Ea,new wl).add_systems(lt,vE)}}var ns=(t=>(t[t.Left=0]="Left",t[t.Right=1]="Right",t[t.Middle=2]="Middle",t))(ns||{}),vi=(t=>(t[t.Pressed=0]="Pressed",t[t.Released=1]="Released",t))(vi||{});class vn extends Bi{}class Ea{}class vE extends x{constructor(){super(...arguments),this.appConfig=this.singleton.read($e)}execute(){const e=this.appConfig.resources.get(Ea),r=this.appConfig.resources.get(vn);e.clear();for(const i of r.read())i.state===0?e.press(i.button):e.release(i.button)}}class Qn{}class An extends Bi{}class AE extends x{constructor(){super(...arguments),this.appConfig=this.singleton.read($e)}execute(){const e=this.appConfig.resources.get(Qn),r=this.appConfig.resources.get(An);e.clear();for(const i of r.read())i.state===vi.Pressed?e.press(i.key_code):e.release(i.key_code)}}const Tl={0:ns.Left,1:ns.Middle,2:ns.Right};class wE extends x{constructor(){super(...arguments),this.appConfig=this.singleton.read($e),this.onMouseDown=e=>{this.appConfig.resources.get(vn).events.send({button:Tl[e.button],state:vi.Pressed})},this.onMouseUp=e=>{this.appConfig.resources.get(vn).events.send({button:Tl[e.button],state:vi.Released})},this.onMouseMove=e=>{this.appConfig.resources.get(Kn).events.send({delta:new oe(e.movementX,e.movementY)})},this.onMousewheel=e=>{this.appConfig.resources.get(ga).events.send({x:e.deltaX,y:e.deltaY})},this.onKeyDown=e=>{this.appConfig.resources.get(An).events.send({key_code:e.code,state:vi.Pressed})},this.onKeyUp=e=>{this.appConfig.resources.get(An).events.send({key_code:e.code,state:vi.Released})}}async prepare(){const{canvas:e}=this.appConfig;window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),e.addEventListener("mousedown",this.onMouseDown),e.addEventListener("mouseup",this.onMouseUp),e.addEventListener("mousemove",this.onMouseMove),e.addEventListener("wheel",this.onMousewheel),e.addEventListener("contextmenu",r=>(r.preventDefault(),!1))}finalize(){const{canvas:e}=this.appConfig;window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),e.removeEventListener("mousedown",this.onMouseDown),e.removeEventListener("mouseup",this.onMouseUp),e.removeEventListener("mousemove",this.onMouseMove),e.removeEventListener("wheel",this.onMousewheel)}}class TE extends x{constructor(){super(),this.appConfig=this.singleton.read($e),this.orbitCameraController=this.query(e=>e.current.with(Nt)),this.query(e=>e.using(Nt).read)}execute(){var r;const e=(r=this.orbitCameraController.current)==null?void 0:r[0];if(e){const i=e.read(Nt);if(i.enabled){const{resources:s}=this.appConfig,{mouse_rotate_sensitivity:n,translate_sensitivity:o}=i,a=s.get(Qn),l=s.get(Kn),c=s.get(mr),u=oe.ZERO;for(const h of l.read())u.add_assign(h.delta);c.events.send(new mr.Rotate(n.mul(u))),[["KeyW",v.Z],["KeyA",v.X],["KeyS",v.Z.neg()],["KeyD",v.X.neg()],["ShiftLeft",v.Y.neg()],["Space",v.Y]].forEach(([h,_])=>{a.pressed(h)&&c.events.send(new mr.TranslateEye(_.mul(o)))})}}}}class Lt extends Bi{constructor(){super()}}(t=>{class e extends t{constructor(n){super(),this.value=n}}t.Orbit=e;class r extends t{constructor(n){super(),this.value=n}}t.TranslateTarget=r;class i extends t{constructor(n){super(),this.value=n}}t.Zoom=i})(Lt||(Lt={}));class RE{build(e){W(dt),e.add_event(Lt),e.add_systems(sr,bl),e.add_systems(sr,bE),Ke(r=>r.before(ya))(bl)}}class bE extends x{constructor(){super(),this.appConfig=this.singleton.read($e),this.orbitCameraController=this.query(e=>e.current.with(dt)),this.query(e=>e.using(dt).read)}execute(){var r;const e=(r=this.orbitCameraController.current)==null?void 0:r[0];if(e){const i=e.read(dt);if(i.enabled){const{resources:s}=this.appConfig,{mouse_rotate_sensitivity:n,mouse_translate_sensitivity:o,mouse_wheel_zoom_sensitivity:a,pixels_per_line:l}=i,c=s.get(Ea),u=s.get(Qn),h=s.get(ga),_=s.get(Kn),p=s.get(Lt),d=oe.ZERO;for(const m of _.read())d.add_assign(m.delta);u.pressed("ControlLeft")&&(console.log("ControlLeft..."),p.events.send(new Lt.Orbit(d.mul(n)))),c.pressed(ns.Right)&&p.events.send(new Lt.TranslateTarget(o.mul(d)));let g=1;for(const m of h.read()){const{y:E}=m,A=E/l;g*=1-A*a}g!==1&&p.events.send(new Lt.Zoom(g))}}}}class xE extends x{constructor(){super(...arguments),this.cameras=this.query(e=>e.using(Y).read)}execute(){}}class Rl extends x{constructor(){super(),this.appConfig=this.singleton.read($e),this.controls=this.query(e=>e.current.with(Nt)),this.query(e=>e.using(We).write.and.using(V).read)}execute(){for(const e of this.controls.current){const r=e.read(Nt),i=this.appConfig.resources.get(mr);if(r.enabled&&i.len()){const s=e.write(We),n=s.look_direction(),o=zn.from_vector(n),a=Fr.from_axis_angle(v.Y,o.get_yaw()),l=a.mul(v.X),c=a.mul(v.Y),u=a.mul(v.Z),h=this.delta;for(const _ of i.read())if(_ instanceof mr.Rotate){const p=_.value;o.add_yaw(h*-p.x),o.add_pitch(h*-p.y)}else if(_ instanceof mr.TranslateEye){const p=_.value;s.eye.add_assign(l.mul(h*p.x).add(c.mul(h*p.y)).add(u.mul(h*p.z)))}s.target=s.eye.add(o.unit_vector().mul(s.radius()));return}}}}class bl extends x{constructor(){super(),this.appConfig=this.singleton.read($e),this.controls=this.query(e=>e.current.with(dt)),this.query(e=>e.using(We).write.and.using(V).read)}execute(){for(const e of this.controls.current){const r=e.read(dt),i=this.appConfig.resources.get(Lt);if(r.enabled&&i.len()){const s=e.write(We),n=e.read(V),o=zn.from_vector(s.look_direction().neg());let a=1;const l=s.radius(),c=this.delta;for(const h of i.read())if(h instanceof Lt.Orbit){const _=h.value;console.log(c,_),o.add_yaw(c*-_.x),o.add_pitch(c*_.y)}else if(h instanceof Lt.TranslateTarget){const _=h.value,p=n.rotation.mul_vec3(v.X.neg()),d=n.rotation.mul_vec3(v.Y);s.target.add_assign(p.mul(c*_.x).add(d.mul(c*_.y)))}else h instanceof Lt.Zoom&&(a*=h.value);const u=Math.max(Math.min(a*l,1e6),.001);s.eye=s.target.add(o.unit_vector().mul(u));return}}}}class ya extends x{constructor(){super(),this.cameras=this.query(e=>e.addedOrChanged.with(We).trackWrites),this.query(e=>e.using(We).read.and.using(tr,V).write)}execute(){for(const e of this.cameras.addedOrChanged){const r=e.read(We),i=e.write(tr);if(i.enabled){const s=e.write(V),{translation:n,rotation:o,scale:a}=We.to_transform(i.smooth_transform(r));s.translation=n,s.rotation=o,s.scale=a}}}}class SE extends x{constructor(){super(),this.configs=this.query(e=>e.with(Y).addedOrChanged.with(ir).trackWrites),this.query(e=>e.using(Ft).write)}execute(){this.configs.addedOrChanged.forEach(e=>{if(!e.read(Y).is_active)return;e.read(ir);const{tile_size:i,dimensions:s,near:n,far:o}=new Ft;if(!e.has(Ft))e.add(Ft,{tile_size:i,dimensions:s,near:n,far:o});else{const a=e.write(Ft);a.tile_size=i,a.dimensions=s,a.near=n,a.far=o}})}}class IE extends x{constructor(){super(),this.point_lights_query=this.query(e=>e.with(Pc).addedOrChanged.trackWrites),this.query(e=>e.using(Y,Ft,ir,ze).read)}execute(){this.point_lights_query.addedOrChanged.forEach(e=>{})}}class ru extends x{constructor(){super(),this.lights=this.query(e=>e.current.with(Xe)),this.query(e=>e.using(vt).read)}execute(){this.lights.current.forEach(e=>{if(!e.read(Xe).shadows_enabled)return;e.read(vt).cascades.clear()})}}var OE=Object.defineProperty,NE=Object.getOwnPropertyDescriptor,CE=(t,e,r,i)=>{for(var s=i>1?void 0:i?NE(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&OE(e,r,s),s};let Fo=class extends x{constructor(){super(),this.appConfig=this.singleton.read($e),this.views=this.query(t=>t.with(Y,q).current),this.lights=this.query(t=>t.with(Xe,vt,Xt,q).current),this.query(t=>t.using(J,rt).read),this.query(t=>t.using(vt).read)}execute(){const t=this.appConfig.resources.get(Do),e=this.views.current.map(r=>{const i=r.read(Y),s=r.read(q);let n;return r.has(rt)?n=r.read(rt):r.has(J)&&(n=r.read(J)),i.is_active?[r,n,_t.copy(s.compute_matrix())]:[void 0,void 0,void 0]});this.lights.current.forEach(r=>{if(!r.read(Xe).shadows_enabled)return;const s=q.copy(r.read(q)),n=_t.from_quat(s.compute_transform().rotation),o=n.inverse();e.forEach(([a,l,c])=>{const u=o.mul(c),h=r.read(Xt),_=h.bounds.map((d,g)=>{const m=g>0?(1-h.overlap_proportion)*-h.bounds[g-1]:-h.minimum_distance,E=-d,A=l.get_frustum_corners(m,E);return ME(A,t.size,n,u)});r.read(vt).cascades.set(a,_)})})}};Fo=CE([Ke(t=>t.after(ru))],Fo);function ME(t,e,r,i){let s=v.splat(Number.MAX_VALUE),n=v.splat(Number.MIN_VALUE);for(const d of t){const g=i.transform_point3(d);s=s.min(g),n=n.max(g)}const o=Math.ceil(Math.max(t[0].sub(t[6])._length(),t[4].sub(t[6])._length())),a=o/e,l=new v(Math.floor(.5*(s.x+n.x)/a)*a,Math.floor(.5*(s.y+n.y)/a)*a,n.z),c=r.transpose(),u=_t.from_cols(c.x_axis,c.y_axis,c.z_axis,l.extend(1).neg()),h=1/(n.z-s.z),_=_t.from_cols(new I(2/o,0,0,0),new I(0,2/o,0,0),new I(0,0,h,0),new I(0,0,1,1)),p=_.mul(u);return new Ci({view_transform:u.inverse(),projection:_,view_projection:p,texel_size:a})}class PE extends x{constructor(){super(),this.views=this.query(e=>e.with(vt,Xe).current),this.query(e=>e.using(zr).write)}execute(){this.views.current.forEach(e=>{if(!e.read(Xe).shadows_enabled)return;const i=e.write(zr),s=e.read(vt),n=new Map;s.cascades.forEach((o,a)=>{n.set(a,o.map(l=>ze.from_view_projection(l.view_projection)))}),i.frusta=n})}}var BE=Object.defineProperty,DE=Object.getOwnPropertyDescriptor,UE=(t,e,r,i)=>{for(var s=i>1?void 0:i?DE(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&BE(e,r,s),s};let Lo=class extends x{constructor(){super(),this.directional_lights=this.query(t=>t.current.with(Xe,zr,Si,xe)),this.visible_entity_query=this.query(t=>t.current.with(et,xe).without(Xe)),this.query(t=>t.using(Ut,Ht,q).read),this.query(t=>t.using(xe).write)}execute(){this.directional_lights.current.forEach(t=>{const e=t.read(Xe),r=t.read(zr),i=t.read(Si),s=t.read(xe),n=[];if(i.entities.forEach((a,l)=>{const c=r.frusta.get(l);c?(a.length=c.length,a.forEach(u=>u.entities=[])):n.push(l)}),r.frusta.forEach((a,l)=>{i.entities.has(l)||i.entities.set(l,new Array(a.length).fill(new Vt))}),n.forEach(a=>i.entities.delete(a)),!e.shadows_enabled||!s.visible)return;let o;t.has(Ut)&&(o=t.read(Ut)),this.visible_entity_query.current.forEach(a=>{if(!a.read(et).visible)return;let c;if(o&&a.has(Ut)&&(c=a.read(Ut),!o.intersects(c)))return;let u;a.has(Ht)&&(u=a.read(Ht));let h;a.has(q)&&(h=q.copy(a.read(q)));const _=a.write(xe);u&&h?r.frusta.forEach((p,d)=>{const g=i.entities.get(d);p.forEach((m,E)=>{const A=g[E];m.intersects_obb(u,h.affine(),!1,!0)&&(_.visible=!0,A.entities.push(a))})}):(_.visible=!0,r.frusta.forEach((p,d)=>{const g=i.entities.get(d);for(const m of g)m.entities.push(a)}))})})}};Lo=UE([Ke(t=>t.afterWritersOf(xe))],Lo);class FE extends x{constructor(){super(),this.directional_lights=this.query(e=>e.addedOrChanged.with(Xe,q).trackWrites),this.query(e=>e.using(tt).write.using(q,Xt,vt).read)}execute(){this.directional_lights.addedOrChanged.forEach(e=>{const{color:r,illuminance:i,shadows_enabled:s,shadow_depth_bias:n,shadow_normal_bias:o}=e.read(Xe),a=e.read(q),l=e.read(Xt),c=e.read(vt);if(!e.has(tt))e.add(tt,{color:r,illuminance:i,shadows_enabled:s,shadow_depth_bias:n,shadow_normal_bias:o,transform:a,cascade_shadow_config:l,cascades:c.cascades});else{const u=e.write(tt);u.color=r,u.illuminance=i,u.shadows_enabled=s,u.shadow_depth_bias=n,u.shadow_normal_bias=o,u.transform=a,u.cascade_shadow_config=l,u.cascades=c.cascades}})}}const Es=x.group(),Bt=x.group(),Zn=x.group(),wn=x.group(),lt=x.group(),sr=x.group(),ii=x.group(),Di=x.group();Es.schedule(t=>t.before(Bt));Bt.schedule(t=>t.before(Zn));Zn.schedule(t=>t.before(wn));wn.schedule(t=>t.before(lt));lt.schedule(t=>t.before(sr));sr.schedule(t=>t.before(ii));ii.schedule(t=>t.before(Di));class LE{async build(e){W(j),W(H),e.add_systems(Es,Yn),e.add_systems(lt,Ss),e.add_systems(Di,Tr)}}var Tn;(t=>{t.TransformPropagate=x.group()})(Tn||(Tn={}));Tn.TransformPropagate.schedule(t=>t.after(ii).before(Di));class zE{async build(e){W(V),W(q),W(Ko),e.add_systems(Zn,oE),e.add_systems(Tn.TransformPropagate,sE,nE)}}class VE{build(e){W(It),W(zt)}}class HE{async build(e){W(Go)}}class kE{async build(e){W(Mr),e.add_systems(lt,Jg)}}class WE{async build(e){await new kE().build(e)}}class XE{async build(e){W(Me),e.add_systems(lt,iE)}}class $E{async build(e){W(it),e.add_systems(lt,tE)}}class jE{async build(e){W(tf),W(at),W(Kd),await new WE().build(e),await new $E().build(e),await new HE().build(e),await new XE().build(e)}}class qE{async build(e){W(Y),W(Pn),W(Se),W(rl)(J),W(rl)(rt),W(We),W(tr),e.add_systems(lt,yl),e.add_systems(lt,xE),e.add_systems(sr,ya),Ke(r=>r.afterWritersOf(Y))(yl)}}var ot;(t=>{t.CalculateBounds=x.group(),t.CalculateBoundsFlush=x.group(),t.UpdateProjectionFrusta=x.group(),t.VisibilityPropagate=x.group(),t.CheckVisibility=x.group()})(ot||(ot={}));ot.CalculateBounds.schedule(t=>t.before(ot.CalculateBoundsFlush).after(ii).before(Di));ot.CalculateBoundsFlush.schedule(t=>t.before(ot.UpdateProjectionFrusta));ot.UpdateProjectionFrusta.schedule(t=>t.before(ot.VisibilityPropagate));ot.VisibilityPropagate.schedule(t=>t.before(ot.CheckVisibility));class YE{async build(e){e.add_systems(ot.CalculateBounds,aE),e.add_systems(ot.CalculateBoundsFlush,class extends x{}),e.add_systems(ot.UpdateProjectionFrusta,lE),e.add_systems(ot.VisibilityPropagate,cE,uE),e.add_systems(ot.CheckVisibility,dE)}}class KE{async build(e){W(et),W(xe),W(yn),W(Ut),W(nt),W(Vt),W(ye),await new YE().build(e)}}var xl;(t=>{t.ExtractCommands=x.group(),t.PrepareAssets=x.group(),t.ManageViews=x.group(),t.ManageViewsFlush=x.group(),t.Queue=x.group(),t.QueueMeshes=x.group(),t.PhaseSort=x.group(),t.Prepare=x.group(),t.PrepareResources=x.group(),t.PrepareResourcesFlush=x.group(),t.PrepareBindGroups=x.group(),t.PrepareFlush=x.group(),t.Render=x.group(),t.RenderFlush=x.group(),t.Cleanup=x.group(),t.CleanupFlush=x.group()})(xl||(xl={}));class QE{async build(e){W(ze),W(zr),W(Dc),W(Ht),await new qE().build(e),await new KE().build(e)}}var Fe;(t=>{t.AddClusters=x.group(),t.AddClustersFlush=x.group(),t.AssignLightsToClusters=x.group(),t.UpdateDirectionalLightCascades=x.group(),t.UpdateLightFrusta=x.group(),t.CheckLightVisibility=x.group()})(Fe||(Fe={}));Fe.AddClusters.schedule(t=>t.before(Fe.AddClustersFlush).after(ii));Fe.AddClustersFlush.schedule(t=>t.before(Fe.AssignLightsToClusters));Fe.AssignLightsToClusters.schedule(t=>t.before(Fe.UpdateDirectionalLightCascades));Fe.UpdateDirectionalLightCascades.schedule(t=>t.before(Fe.UpdateLightFrusta));Fe.UpdateLightFrusta.schedule(t=>t.before(Fe.CheckLightVisibility).before(Di));class ZE{async build(e){W(Ge),e.add_systems(lt,Gc)}}class GE{async build(e){W(ir),W(Ft),W(Ci),W(vt),W(Xt),W(Si),W(Gt),W(Pc),W(Xe),W(tt),e.init_resource(Do,new Do),await new ZE().build(e),e.add_systems(lt,FE),e.add_systems(lt,Jc),e.add_systems(Fe.AddClusters,SE),e.add_systems(Fe.AddClustersFlush,class extends x{}),e.add_systems(Fe.AssignLightsToClusters,IE),e.add_systems(Fe.UpdateDirectionalLightCascades,ru,Fo),e.add_systems(Fe.UpdateLightFrusta,PE),e.add_systems(Fe.CheckLightVisibility,Lo)}}var JE=Object.defineProperty,ey=Object.getOwnPropertyDescriptor,ty=(t,e,r,i)=>{for(var s=i>1?void 0:i?ey(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&JE(e,r,s),s};let zo=class extends x{constructor(){super(),this.gaussian_clouds=this.query(t=>t.current.with(At,qe,Ct)),this.cameras=this.query(t=>t.current.with(Y,q)),this.last_camera_position=v.ZERO,this.query(t=>t.using(Ct).write)}execute(){this.cameras.current.forEach(t=>{let r=q.copy(t.read(q)).compute_transform().translation;if(!this.last_camera_position.eq(r))this.sort_done=!1,this.camera_debounce=!0;else if(this.sort_done)return;if(this.camera_debounce){this.last_camera_position=r,this.camera_debounce=!1;return}this.gaussian_clouds.current.forEach(s=>{const n=s.read(At),o=s.read(qe),a=s.write(Ct);o.sort_mode==qc.Std&&(this.sort_done=!0,n.position_visibility.forEach((l,c)=>{const u=a.sorted[c],h=l.position,_=r.sub(v.from_array(h));u.key=_.length_squared(),u.index=c}),a.sorted.sort(function(l,c){return c.key-l.key}))})})}};zo=ty([Ke(t=>t.afterWritersOf(Ct))],zo);class ry extends x{constructor(){super(),this.gaussian_clouds=this.query(e=>e.current.with(At,qe).without(Ct)),this.query(e=>e.using(Ct).write)}execute(){this.gaussian_clouds.current.forEach(e=>{const r=e.read(At);e.read(qe);const i=new Array(r.len()).fill(void 0).map((s,n)=>new ca({key:1,index:n}));e.add(Ct,{sorted:i})})}}const iy=`
#define_import_path gaussian_splatting::bindings

#import render::globals::Globals
#import render::view::View

@group(0) @binding(0) var<uniform> view: View;

// #define SH_COEFF_COUNT 4

struct GaussianUniforms {
    global_transform: mat4x4<f32>,
    global_scale: f32,
    count: f32,
    count_root_ceil: f32,
};

@group(0) @binding(1) var<uniform> gaussian_uniforms: GaussianUniforms;
@group(2) @binding(0) var<storage, read> position_visibility: array<vec4<f32>>;
@group(2) @binding(1) var<storage, read> spherical_harmonics: array<array<f32, 4>>;
@group(2) @binding(2) var<storage, read> rotation: array<vec4<f32>>;
@group(2) @binding(3) var<storage, read> scale_opacity: array<vec4<f32>>;

struct Entry {
    key: f32,
    value: f32,
}
`,sy=`
#define_import_path gaussian_splatting::spherical_harmonics

// #define SH_COEFF_COUNT 4

const shc = array<f32, 16>(
    0.28209479177387814,
    -0.4886025119029199,
    0.4886025119029199,
    -0.4886025119029199,
    1.0925484305920792,
    -1.0925484305920792,
    0.31539156525252005,
    -1.0925484305920792,
    0.5462742152960396,
    -0.5900435899266435,
    2.890611442640554,
    -0.4570457994644658,
    0.3731763325901154,
    -0.4570457994644658,
    1.445305721320277,
    -0.5900435899266435,
);

fn srgb_to_linear(srgb_color: vec3<f32>) -> vec3<f32> {
    var linear_color: vec3<f32>;
    for (var i = 0u; i < 3u; i = i + 1u) {
        if (srgb_color[i] <= 0.04045) {
            linear_color[i] = srgb_color[i] / 12.92;
        } else {
            linear_color[i] = pow((srgb_color[i] + 0.055) / 1.055, 2.4);
        }
    }
    return linear_color;
}

fn spherical_harmonics_lookup(
    ray_direction: vec3<f32>,
    sh: array<f32, 4>,
) -> vec3<f32> {
    let rds = ray_direction * ray_direction;
    var color = vec3<f32>(0.5);

    color += shc[ 0] * vec3<f32>(sh[0], sh[1], sh[2]);

// // #if SH_COEFF_COUNT > 11
//     color += shc[ 1] * vec3<f32>(sh[ 3], sh[ 4], sh[ 5]) * ray_direction.y;
//     color += shc[ 2] * vec3<f32>(sh[ 6], sh[ 7], sh[ 8]) * ray_direction.z;
//     color += shc[ 3] * vec3<f32>(sh[ 9], sh[10], sh[11]) * ray_direction.x;
// // #endif

// // #if SH_COEFF_COUNT > 26
//     color += shc[ 4] * vec3<f32>(sh[12], sh[13], sh[14]) * ray_direction.x * ray_direction.y;
//     color += shc[ 5] * vec3<f32>(sh[15], sh[16], sh[17]) * ray_direction.y * ray_direction.z;
//     color += shc[ 6] * vec3<f32>(sh[18], sh[19], sh[20]) * (2.0 * rds.z - rds.x - rds.y);
//     color += shc[ 7] * vec3<f32>(sh[21], sh[22], sh[23]) * ray_direction.x * ray_direction.z;
//     color += shc[ 8] * vec3<f32>(sh[24], sh[25], sh[26]) * (rds.x - rds.y);
// // #endif

// // #if SH_COEFF_COUNT > 47
//     color += shc[ 9] * vec3<f32>(sh[27], sh[28], sh[29]) * ray_direction.y * (3.0 * rds.x - rds.y);
//     color += shc[10] * vec3<f32>(sh[30], sh[31], sh[32]) * ray_direction.x * ray_direction.y * ray_direction.z;
//     color += shc[11] * vec3<f32>(sh[33], sh[34], sh[35]) * ray_direction.y * (4.0 * rds.z - rds.x - rds.y);
//     color += shc[12] * vec3<f32>(sh[36], sh[37], sh[38]) * ray_direction.z * (2.0 * rds.z - 3.0 * rds.x - 3.0 * rds.y);
//     color += shc[13] * vec3<f32>(sh[39], sh[40], sh[41]) * ray_direction.x * (4.0 * rds.z - rds.x - rds.y);
//     color += shc[14] * vec3<f32>(sh[42], sh[43], sh[44]) * ray_direction.z * (rds.x - rds.y);
//     color += shc[15] * vec3<f32>(sh[45], sh[46], sh[47]) * ray_direction.x * (rds.x - 3.0 * rds.y);
// // #endif

    return color;
}
`,ny=`
#define_import_path gaussian_splatting::planar

#import gaussian_splatting::bindings::{
    position_visibility,
    spherical_harmonics,
    rotation,
    scale_opacity,
}

#import gaussian_splatting::spherical_harmonics::{
    spherical_harmonics_lookup,
    srgb_to_linear,
}

// #define SH_COEFF_COUNT 4
// #define HALF_SH_COEFF_COUNT 2

fn get_color(
    index: u32,
    ray_direction: vec3<f32>,
) -> vec3<f32> {
    let sh = get_spherical_harmonics(index);
    let color = spherical_harmonics_lookup(ray_direction, sh);
    return srgb_to_linear(color);
}

fn get_position(index: u32) -> vec3<f32> {
    return position_visibility[index].xyz;
}

fn get_spherical_harmonics(index: u32) -> array<f32, 4> {
    return spherical_harmonics[index];
}

fn get_rotation(index: u32) -> vec4<f32> {
    return rotation[index];
}

fn get_scale(index: u32) -> vec3<f32> {
    return scale_opacity[index].xyz;
}

fn get_opacity(index: u32) -> f32 {
    return scale_opacity[index].w;
}

fn get_visibility(index: u32) -> f32 {
    return position_visibility[index].w;
}
`,oy=`
#define_import_path gaussian_splatting::transform

#import gaussian_splatting::bindings::view

fn world_to_clip(world_pos: vec3<f32>) -> vec4<f32> {
    let homogenous_pos = view.projection * view.inverse_view * vec4<f32>(world_pos, 1.0);
    return homogenous_pos / (homogenous_pos.w + 0.000000001);
}

fn in_frustum(clip_space_pos: vec3<f32>) -> bool {
    return abs(clip_space_pos.x) < 1.1
        && abs(clip_space_pos.y) < 1.1
        && abs(clip_space_pos.z - 0.5) < 0.5;
}
`,ay=`
#define_import_path gaussian_splatting::depth

fn depth_to_rgb(depth: f32, min_depth: f32, max_depth: f32) -> vec3<f32> {
    let normalized_depth = clamp((depth - min_depth) / (max_depth - min_depth), 0.0, 1.0);

    let r = smoothstep(0.5, 1.0, normalized_depth);
    let g = 1.0 - abs(normalized_depth - 0.5) * 2.0;
    let b = 1.0 - smoothstep(0.0, 0.5, normalized_depth);

    return vec3<f32>(r, g, b);
}
`,Sl=`
#import gaussian_splatting::bindings::{
    view,
    gaussian_uniforms,
    Entry,
}
#import gaussian_splatting::planar::{
    get_position,
    get_color,
    get_visibility,
    get_opacity,
    get_rotation,
    get_scale,
}

#import gaussian_splatting::depth::{
    depth_to_rgb,
}

#import gaussian_splatting::transform::{
    world_to_clip,
    in_frustum,
}

#define USE_OBB

@group(2) @binding(4) var<storage, read> sorted_entries: array<Entry>;

fn get_entry(index: u32) -> Entry {
    return sorted_entries[index];
}

struct GaussianVertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) @interpolate(flat) color: vec4<f32>,
    @location(1) @interpolate(flat) conic: vec3<f32>,
    @location(2) @interpolate(linear) uv: vec2<f32>,
    @location(3) @interpolate(linear) major_minor: vec2<f32>,
};

// https://github.com/cvlab-epfl/gaussian-splatting-web/blob/905b3c0fb8961e42c79ef97e64609e82383ca1c2/src/shaders.ts#L185
// TODO: precompute
fn compute_cov3d(scale: vec3<f32>, rotation: vec4<f32>) -> array<f32, 6> {
    let S = mat3x3<f32>(
        scale.x * gaussian_uniforms.global_scale, 0.0, 0.0,
        0.0, scale.y * gaussian_uniforms.global_scale, 0.0,
        0.0, 0.0, scale.z * gaussian_uniforms.global_scale,
    );

    let r = rotation.x;
    let x = rotation.y;
    let y = rotation.z;
    let z = rotation.w;

    let R = mat3x3<f32>(
        1.0 - 2.0 * (y * y + z * z),
        2.0 * (x * y - r * z),
        2.0 * (x * z + r * y),

        2.0 * (x * y + r * z),
        1.0 - 2.0 * (x * x + z * z),
        2.0 * (y * z - r * x),

        2.0 * (x * z - r * y),
        2.0 * (y * z + r * x),
        1.0 - 2.0 * (x * x + y * y),
    );

    let M = S * R;
    let Sigma = transpose(M) * M;

    return array<f32, 6>(
        Sigma[0][0],
        Sigma[0][1],
        Sigma[0][2],
        Sigma[1][1],
        Sigma[1][2],
        Sigma[2][2],
    );
}

fn compute_cov2d(
    position: vec3<f32>,
    index: u32,
) -> vec3<f32> {
#ifdef PRECOMPUTE_COVARIANCE_3D
    let cov3d = get_cov3d(index);
#else
    let rotation = get_rotation(index);
    let scale = get_scale(index);

    let cov3d = compute_cov3d(scale, rotation);
#endif

    let Vrk = mat3x3(
        cov3d[0], cov3d[1], cov3d[2],
        cov3d[1], cov3d[3], cov3d[4],
        cov3d[2], cov3d[4], cov3d[5],
    );

    var t = view.inverse_view * vec4<f32>(position, 1.0);

    let focal = vec2<f32>(
        view.projection.x.x * view.viewport.z,
        view.projection.y.y * view.viewport.w,
    );

    let s = 1.0 / (t.z * t.z);
    let J = mat3x3(
        focal.x / t.z, 0.0, -(focal.x * t.x) * s,
        0.0, -focal.y / t.z, (focal.y * t.y) * s,
        0.0, 0.0, 0.0,
    );

    let W = transpose(
        mat3x3<f32>(
            view.inverse_view.x.xyz,
            view.inverse_view.y.xyz,
            view.inverse_view.z.xyz,
        )
    );

    let T = W * J;

    var cov = transpose(T) * transpose(Vrk) * T;
    cov[0][0] += 0.3f;
    cov[1][1] += 0.3f;

    return vec3<f32>(cov[0][0], cov[0][1], cov[1][1]);
}

fn get_bounding_box(
    cov2d: vec3<f32>,
    direction: vec2<f32>,
) -> vec4<f32> {
    // return vec4<f32>(offset, uv);

    let det = cov2d.x * cov2d.z - cov2d.y * cov2d.y;
    let trace = cov2d.x + cov2d.z;
    let mid = 0.5 * trace;
    let discriminant = max(0.0, mid * mid - det);

    let term = sqrt(discriminant);

    let lambda1 = mid + term;
    let lambda2 = max(mid - term, 0.0);

    let x_axis_length = sqrt(lambda1);
    let y_axis_length = sqrt(lambda2);


#ifdef USE_AABB
    let radius_px = 3.5 * max(x_axis_length, y_axis_length);
    let radius_ndc = vec2<f32>(
        radius_px / view.viewport.zw,
    );

    return vec4<f32>(
        radius_ndc * direction,
        radius_px * direction,
    );
#endif

#ifdef USE_OBB

    let a = (cov2d.x - cov2d.z) * (cov2d.x - cov2d.z);
    let b = sqrt(a + 4.0 * cov2d.y * cov2d.y);
    let major_radius = sqrt((cov2d.x + cov2d.z + b) * 0.5);
    let minor_radius = sqrt((cov2d.x + cov2d.z - b) * 0.5);

    let bounds = 3.5 * vec2<f32>(
        major_radius,
        minor_radius,
    );

    let eigvec1 = normalize(vec2<f32>(
        -cov2d.y,
        lambda1 - cov2d.x,
    ));
    let eigvec2 = vec2<f32>(
        eigvec1.y,
        -eigvec1.x
    );

    let rotation_matrix = transpose(
        mat2x2(
            eigvec1,
            eigvec2,
        )
    );

    let scaled_vertex = direction * bounds;
    let rotated_vertex = scaled_vertex * rotation_matrix;

    let scaling_factor = 1.0 / view.viewport.zw;
    let ndc_vertex = rotated_vertex * scaling_factor;

    return vec4<f32>(
        ndc_vertex,
        rotated_vertex,
    );
#endif
}


@vertex
fn vs_points(
    @builtin(instance_index) instance_index: u32,
    @builtin(vertex_index) vertex_index: u32,
) -> GaussianVertexOutput {
    var output: GaussianVertexOutput;

    let entry = get_entry(instance_index);
    let splat_index = u32(entry.value);

    var discard_quad = false;

    discard_quad |= u32(entry.key) == 0xFFFFFFFFu; // || splat_index == 0u;

    let position = vec4<f32>(get_position(splat_index), 1.0);

    let transformed_position = (gaussian_uniforms.global_transform * position).xyz;
    let projected_position = world_to_clip(transformed_position);

    discard_quad |= !in_frustum(projected_position.xyz);

#ifdef DRAW_SELECTED
    discard_quad |= get_visibility(splat_index) < 0.5;
#endif

    if (discard_quad) {
        output.color = vec4<f32>(0.0, 0.0, 0.0, 0.0);
        output.position = vec4<f32>(0.0, 0.0, 0.0, 0.0);
        return output;
    }

    var quad_vertices = array<vec2<f32>, 4>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>(-1.0,  1.0),
        vec2<f32>( 1.0, -1.0),
        vec2<f32>( 1.0,  1.0),
    );

    let quad_index = vertex_index % 4u;
    let quad_offset = quad_vertices[quad_index];

    let ray_direction = normalize(transformed_position - view.world_position);

    var rgb = vec3<f32>(0.0);

#ifdef VISUALIZE_DEPTH
    let first_position = vec4<f32>(get_position(u32(get_entry(1u).value)), 1.0);
    let last_position = vec4<f32>(get_position(u32(get_entry(u32(gaussian_uniforms.count) - 1u).value)), 1.0);

    let min_position = (gaussian_uniforms.global_transform * first_position).xyz;
    let max_position = (gaussian_uniforms.global_transform * last_position).xyz;

    let camera_position = view.world_position;

    let min_distance = length(min_position - camera_position);
    let max_distance = length(max_position - camera_position);

    let depth = length(transformed_position - camera_position);
    // rgb = get_color(splat_index, ray_direction);
    rgb = depth_to_rgb(
        depth,
        min_distance,
        max_distance,
    );
#else
    rgb = get_color(splat_index, ray_direction);
#endif

    // TODO: verify color benefit for ray_direction computed at quad verticies instead of gaussian center (same as current complexity)
    output.color = vec4<f32>(
        rgb,
        get_opacity(splat_index),
    );

#ifdef HIGHLIGHT_SELECTED
    if (get_visibility(splat_index) > 0.5) {
        output.color = vec4<f32>(0.3, 1.0, 0.1, 1.0);
    }
#endif

    let cov2d = compute_cov2d(transformed_position, splat_index);

#ifdef USE_AABB
    let det = cov2d.x * cov2d.z - cov2d.y * cov2d.y;
    let det_inv = 1.0 / det;
    let conic = vec3<f32>(
        cov2d.z * det_inv,
        -cov2d.y * det_inv,
        cov2d.x * det_inv
    );
    output.conic = conic;
#endif

    let bb = get_bounding_box(
        cov2d,
        quad_offset,
    );

    output.uv = quad_offset;
    output.major_minor = bb.zw;
    output.position = vec4<f32>(
        projected_position.xy + bb.xy,
        projected_position.zw
    );

    return output;
}

@fragment
fn fs_main(input: GaussianVertexOutput) -> @location(0) vec4<f32> {
#ifdef USE_AABB
    let d = -input.major_minor;
    let conic = input.conic;
    let power = -0.5 * (conic.x * d.x * d.x + conic.z * d.y * d.y) + conic.y * d.x * d.y;

    if (power > 0.0) {
        discard;
    }
#endif

#ifdef USE_OBB
    let sigma = 1.0 / 3.5;
    let sigma_squared = 2.0 * sigma * sigma;
    let distance_squared = dot(input.uv, input.uv);

    let power = -distance_squared / sigma_squared;

    if (distance_squared > 3.5 * 3.5) {
        discard;
    }
#endif

#ifdef VISUALIZE_BOUNDING_BOX
    let uv = (input.uv + 1.0) / 2.0;
    let edge_width = 0.08;
    if (
        (uv.x < edge_width || uv.x > 1.0 - edge_width) ||
        (uv.y < edge_width || uv.y > 1.0 - edge_width)
    ) {
        return vec4<f32>(0.3, 1.0, 0.1, 1.0);
    }
#endif

    let alpha = exp(power);
    let final_alpha = alpha * input.color.a;

    // TODO: round final_alpha to terminate depth test?

    return vec4<f32>(
        input.color.rgb * final_alpha,
        final_alpha,
    );
}
`;class ly extends pa{init(){const{device:e}=this.renderCache;this.program=xs(e,{vertex:{wgsl:Sl,entryPoint:"vs_points"},fragment:{wgsl:Sl,entryPoint:"fs_main"}},{})}prepare(){const{device:e}=this.renderCache,{position_visibility:r,spherical_harmonic:i,rotation:s,scale_opacity:n}=this.cloud;this.positionVisibilityStorageBuffer||(this.positionVisibilityStorageBuffer=e.createBuffer({viewOrSize:new Float32Array(r.length*4),usage:re.STORAGE}),this.sphericalHarmonicsStorageBuffer=e.createBuffer({viewOrSize:new Float32Array(i.length*4),usage:re.STORAGE}),this.rotationStorageBuffer=e.createBuffer({viewOrSize:new Float32Array(s.length*4),usage:re.STORAGE}),this.scaleOpacityStorageBuffer=e.createBuffer({viewOrSize:new Float32Array(n.length*4),usage:re.STORAGE}),this.sortedEntriesStorageBuffer=e.createBuffer({viewOrSize:new Float32Array(this.sortedEntries.sorted.length*2),usage:re.STORAGE})),this.positionVisibilityStorageBuffer.setSubData(0,new Uint8Array(new Float32Array(r.flatMap(({position:o,visibility:a})=>[...o,a])).buffer)),this.sphericalHarmonicsStorageBuffer.setSubData(0,new Uint8Array(new Float32Array(i.flatMap(({coefficients:o})=>[...o,0])).buffer)),this.rotationStorageBuffer.setSubData(0,new Uint8Array(new Float32Array(s.flatMap(({rotation:o})=>o)).buffer)),this.scaleOpacityStorageBuffer.setSubData(0,new Uint8Array(new Float32Array(n.flatMap(({scale:o,opacity:a})=>[...o,a])).buffer)),this.sortedEntriesStorageBuffer.setSubData(0,new Uint8Array(new Float32Array(this.sortedEntries.sorted.flatMap(({key:o,index:a})=>[o,a])).buffer))}post(){}submit(){const e=this.renderInstManager.newRenderInst();e.setAllowSkippingIfPipelineNotReady(!1),e.setTopology(we.TRIANGLE_STRIP),e.setMegaStateFlags({attachmentsState:[{channelWriteMask:nn.ALL,rgbBlendState:{blendMode:yt.ADD,blendSrcFactor:ae.ONE,blendDstFactor:ae.ONE_MINUS_SRC_ALPHA},alphaBlendState:{blendMode:yt.ADD,blendSrcFactor:ae.ONE,blendDstFactor:ae.ONE_MINUS_SRC_ALPHA}}],depthWrite:!1,depthCompare:De.GEQUAL,cullMode:Ur.NONE,...In}),e.setBindingLayout({numUniformBuffers:2,numSamplers:0,numStorageBuffers:5,numStorageTextures:0}),e.setUniformBuffer(this.pipeline.renderHelper.uniformBuffer),e.setStorageBuffers([this.positionVisibilityStorageBuffer,this.sphericalHarmonicsStorageBuffer,this.rotationStorageBuffer,this.scaleOpacityStorageBuffer,this.sortedEntriesStorageBuffer],[0,1,2,3,4]),this.viewUniforms.prepareUniforms(e,0),this.settingsUniforms.prepareUniforms(e,1),e.setProgram(this.program),e.drawPrimitivesInstanced(4,this.cloud.len()),this.renderInstManager.submitRenderInst(e,this.renderList)}}class iu extends x{constructor(){super(...arguments),this.pipeline=this.attach(Tr),this.settings=this.query(e=>e.addedOrChanged.with(At,qe).trackWrites)}async prepare(){this.prepareUniforms=(e,r)=>{e.setUniforms(r,[{name:"padding",value:new Array(20).fill(0)}])}}execute(){this.settings.addedOrChanged.forEach(e=>{this.pipeline.passesChanged=!0;const r=e.read(At),i=e.read(qe),{global_transform:s,global_scale:n}=i,o=r.len(),a=r.len_sqrt_ceil(),l=q.copy(s).compute_matrix().to_cols_array_2d();this.prepareUniforms=(c,u)=>{c.setUniforms(u,[{name:"transform",value:l},{name:"global_scale",value:n},{name:"count",value:o},{name:"count_root_ceil",value:a}])}})}}class cy extends x{constructor(){super(),this.renderResource=this.attach(Yn),this.viewUniforms=this.attach(Ss),this.settingsUniforms=this.attach(iu),this.pipeline=this.attach(Tr),this.clouds=this.query(e=>e.added.and.changed.removed.with(Ct).trackWrites),this.query(e=>e.using(At,qe).read)}async prepare(){this.renderResource.registerShaderModule(iy),this.renderResource.registerShaderModule(sy),this.renderResource.registerShaderModule(ny),this.renderResource.registerShaderModule(oy),this.renderResource.registerShaderModule(ay)}execute(){this.clouds.added.forEach(e=>{const r=e.read(At),i=e.read(Ct);this.pipeline.passesChanged=!0,this.gaussianSplattingNode=new ly(this.renderResource.renderHelper.renderInstManager,this.renderResource.renderHelper.renderCache,this.pipeline),this.gaussianSplattingNode.cloud=r,this.gaussianSplattingNode.sortedEntries=i,this.gaussianSplattingNode.viewUniforms=this.viewUniforms,this.gaussianSplattingNode.settingsUniforms=this.settingsUniforms,this.pipeline.nodes.unshift(this.gaussianSplattingNode)}),this.clouds.changed.forEach(e=>{const r=e.read(At),i=e.read(Ct);this.pipeline.passesChanged=!0,this.gaussianSplattingNode.cloud=r,this.gaussianSplattingNode.sortedEntries=i,this.gaussianSplattingNode.viewUniforms=this.viewUniforms,this.gaussianSplattingNode.settingsUniforms=this.settingsUniforms})}}class uy{async build(e){}}class hy{async build(e){W(Ct),e.add_systems(sr,ry),e.add_systems(sr,zo)}}class _y{async build(e){await new hy().build(e),await new uy().build(e),e.add_systems(lt,iu),e.add_systems(ii,cy)}}class dy{async build(e){W(Rs),W(Pi),W(At),W(qe),await new _y().build(e)}}let fy=1;const py=()=>fy++,Jt=typeof self=="object"&&self.self==self?self:typeof global=="object"&&global.global==global?global:{},my=Date.now(),gy=()=>Jt.performance&&typeof Jt.performance.now=="function"?Jt.performance.now():Date.now()-my;let es={},Il=Date.now();const Ey=t=>{if(typeof t!="function")throw new TypeError(t+" is not a function");const e=Date.now(),r=e-Il,i=r>16?0:16-r,s=py();return es[s]=t,Object.keys(es).length>1||setTimeout(()=>{Il=e;const n=es;es={},Object.keys(n).forEach(o=>n[o](gy()))},i),s},yy=t=>{delete es[t]},vy=["","webkit","moz","ms","o"],su=t=>typeof t!="string"?Ey:t===""?Jt.requestAnimationFrame:Jt[t+"RequestAnimationFrame"],Ay=t=>typeof t!="string"?yy:t===""?Jt.cancelAnimationFrame:Jt[t+"CancelAnimationFrame"]||Jt[t+"CancelRequestAnimationFrame"],wy=(t,e)=>{let r=0;for(;t[r]!==void 0;){if(e(t[r]))return t[r];r=r+1}},nu=wy(vy,t=>!!su(t)),ou=su(nu),au=Ay(nu);Jt.requestAnimationFrame=ou;Jt.cancelAnimationFrame=au;var Ty=Object.defineProperty,Ry=Object.getOwnPropertyDescriptor,_r=(t,e,r,i)=>{for(var s=i>1?void 0:i?Ry(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ty(e,r,s),s};class Rr{constructor(e){this.config=e,this.plugins=[],this.systems=[],this.updateEventsSystemCounter=0,this.resources=new WeakMap}add_plugin(e){return this.plugins.push(e),this}add_plugins(...e){return e.forEach(r=>{this.add_plugin(r)}),this}add_event(e){const r=new fE,i=new gE(r,r.get_reader());this.init_resource(e,i);class s extends x{execute(){(r.events_a.events.length!==0||r.events_b.events.length!==0)&&r.update()}}return Object.defineProperty(s,"name",{value:`_UpdateEventsSystem${this.updateEventsSystemCounter++}`}),this.add_systems(wn,s),this}add_systems(e,...r){return this.systems.push(...r.map(i=>[e,i])),this}init_resource(e,r){return this.resources.set(e,r),this}get_resource(e){return this.resources.get(e)}async run(){const e=this.config,r=this.resources;let i=class extends x{constructor(){super(...arguments),this.config=this.singleton.write($e)}initialize(){this.config.canvas=e.canvas,this.config.shaderCompilerPath=e.shaderCompilerPath,this.config.resources=r}};i=_r([Ke(Es)],i);let s=class extends x{};s=_r([Ke(Es)],s);let n=class extends x{};n=_r([Ke(Bt)],n);let o=class extends x{};o=_r([Ke(Zn)],o);let a=class extends x{};a=_r([Ke(lt)],a);let l=class extends x{};l=_r([Ke(sr)],l);let c=class extends x{};c=_r([Ke(ii)],c);let u=class extends x{};u=_r([Ke(wn)],u);let h=class extends x{};h=_r([Ke(Di)],h),await Promise.all(this.plugins.map(d=>new d().build(this))),this.systems.forEach(([d,g],m)=>{Ke(d)(g)}),this.world=await Sn.create({threads:1});const _=ou,p=async()=>{await this.world.execute(),this.rafId=_(p)};return this.rafId=_(p),this}async exit(){au(this.rafId),await this.world.terminate()}}class by{constructor(e,r){this.parent=e,this.child=r}apply(e){this.parent.add(It),this.child.add(zt,{parent:this.parent})}}class xy{constructor(e,r){this.id=e,this.bundles=r}apply(e){this.bundles.forEach(r=>{this.addBundle(r)})}addBundle(e){e instanceof gr?Object.keys(e).forEach(r=>{e[r]instanceof gr?this.addBundle(e[r]):e[r]&&this.id.add(e[r].constructor,e[r])}):this.id.add(e.constructor,e)}}class lo{constructor(e,r){this.entity=e,this.commands=r}id(){return this.entity}insert(...e){return this.commands.add(new xy(this.entity,e)),this}remove(...e){}despawn(){}add_child(e){let r=this.id();if(e===r)throw new Error("Cannot add entity as a child of itself.");return this.commands.add(new by(r,e)),this}remove_children(...e){return this}}class Sy{constructor(e){this.resource=e}apply(){}}class Iy{constructor(e){this.resource=e}apply(){}}class br{constructor(e){this.system=e,this.queue=[]}execute(){this.queue.forEach(e=>{e.apply(this.system)}),this.queue=[]}entity(e){return new lo(e,this)}add(e){this.queue.push(e)}spawn_empty(){return new lo(this.system.createEntity(),this)}get_or_spawn(e){return new lo(e,this)}spawn(...e){const r=this.spawn_empty();return r.insert(...e),r}insert_resource(e){this.queue.push(new Sy(e))}remove_resource(e){this.queue.push(new Iy(e))}}const xr=[zE,VE,QE,jE,GE,LE,yE];async function yr(t){if(window.createImageBitmap){const e=await fetch(t);return await createImageBitmap(await e.blob())}else{const e=new window.Image;return new Promise(r=>{e.onload=()=>r(e),e.src=t,e.crossOrigin="Anonymous"})}}const Sr="/renderer/assets/glsl_wgsl_compiler_bg-c7f2a0ea.wasm";async function Oy(t,e){const r=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class i extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(o=>o.using(j,H,V,Y,Se,J,ze,ye,it,at,We,Nt,tr,Vt,nt,et,xe).write)}initialize(){this.commands.spawn(new vr({camera:new Y,projection:new J}),new Mp({controller:new Nt,eye:new v(-2.5,2,2),target:v.ZERO,up:v.Y})).entity.hold();const o=j.from(new wr(1)),a=new H({base_color_texture:r});this.commands.spawn(new rr({mesh:o,material:a,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const s=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_plugins(EE).add_systems(Bt,i);return s.run(),async()=>{await s.exit()}}async function Ny(t,e){const r=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class i extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(o=>o.using(j,H,V,Y,Se,J,ze,Me,Ge,ye,it,at,We,dt,tr,nt,Vt,et,xe).write)}initialize(){this.commands.spawn(new vr({camera:new Y,projection:new J}),new Op({controller:new dt,eye:new v(-2.5,2,2),target:v.ZERO,up:v.Y}),new Me({enabled:!0,edge_threshold:Je.High,edge_threshold_min:Je.High}),new Ge({color:be.BLUE,falloff:new Be.Linear({start:0,end:6})})).entity.hold();const o=j.from(new wr(1)),a=new H({base_color_texture:r});this.commands.spawn(new rr({mesh:o,material:a,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const s=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_plugins(RE).add_systems(Bt,i);return s.run(),async()=>{await s.exit()}}const Cy="/renderer/assets/posx-bfea380a.jpg",My="/renderer/assets/negx-047052e7.jpg",Py="/renderer/assets/posy-cc467777.jpg",By="/renderer/assets/negy-52b4b951.jpg",Dy="/renderer/assets/posz-d56085e5.jpg",Uy="/renderer/assets/negz-1bc79f44.jpg";async function Fy(t,e){let r;const i=await Promise.all([Cy,My,Py,By,Dy,Uy].map(async c=>yr(c))),s=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class n extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(u=>u.using(j,H,V,Y,Se,J,ze,Mr,ye,it,at).write)}initialize(){const u=i;r=this.commands.spawn(new vr({camera:new Y,projection:new J,transform:V.from_xyz(-2.5,1.5,2).look_at(v.ZERO,v.Y)}),new Mr({image_handle:u})).entity.hold();const h=j.from(new wr(1)),_=new H({base_color_texture:s});this.commands.spawn(new rr({mesh:h,material:_,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const o=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_systems(Bt,n);o.run();const a=e.addFolder("skybox"),l={enabled:!0};return a.add(l,"enabled").onChange(c=>{c?r.add(Mr,{image_handle:i}):r.remove(Mr)}),async()=>{await o.exit()}}async function Ly(t,e){let r;const i=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class s extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(c=>c.using(j,H,V,Y,Se,J,ze,Me,Go,Ge,ye,it,at).write)}initialize(){r=this.commands.spawn(new vr({camera:new Y,projection:new J,transform:V.from_xyz(-2.5,1.5,2).look_at(v.ZERO,v.Y)}),new Me({enabled:!0,edge_threshold:Je.High,edge_threshold_min:Je.High}),new Ge({color:be.rgb(206/255,206/255,238/255),falloff:new Be.Linear({start:1.89,end:3.12})})).entity.hold();const c=j.from(new wr(1)),u=new H({base_color_texture:i});this.commands.spawn(new rr({mesh:c,material:u,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const n=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_systems(Bt,s);n.run();const o=e.addFolder("fog"),a={color:"#ceceee",falloff:"Linear",start:1.89,end:3.12,density:0};return o.addColor(a,"color").onChange(l=>{const c=r.write(Ge);c.color=be.hex(l)}),o.add(a,"falloff",["Linear","Exponential","ExponentialSquared","Atmospheric"]).onChange(l=>{const c=r.write(Ge);l==="Linear"?c.falloff=new Be.Linear({start:a.start,end:a.end}):l==="Exponential"?c.falloff=new Be.Exponential({density:a.density}):l==="ExponentialSquared"?c.falloff=new Be.ExponentialSquared({density:a.density}):l==="Atmospheric"&&(c.falloff=new Be.Atmospheric({extinction:v.splat(a.density),inscattering:v.splat(a.density)}))}),o.add(a,"start",0,10).onChange(l=>{const c=r.write(Ge);c.falloff=new Be.Linear({start:l,end:a.end})}),o.add(a,"end",0,10).onChange(l=>{const c=r.write(Ge);c.falloff=new Be.Linear({start:a.start,end:l})}),o.add(a,"density",0,1).onChange(l=>{const c=r.write(Ge);a.falloff==="Exponential"?c.falloff=new Be.Exponential({density:l}):a.falloff==="ExponentialSquared"?c.falloff=new Be.ExponentialSquared({density:l}):a.falloff==="Atmospheric"&&(c.falloff=new Be.Atmospheric({extinction:v.splat(l),inscattering:v.splat(l)}))}),o.open(),async()=>{await n.exit()}}async function zy(t,e){let r;const i=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class s extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(u=>u.using(j,H,V,Y,Se,J,ze,Me,ye,it,at).write)}initialize(){r=this.commands.spawn(new vr({camera:new Y,projection:new J,transform:V.from_xyz(-2.5,1.5,2).look_at(v.ZERO,v.Y)}),new Me({enabled:!0,edge_threshold:Je.High,edge_threshold_min:Je.High})).entity.hold();const u=j.from(new wr(1)),h=new H({base_color_texture:i});this.commands.spawn(new rr({mesh:u,material:h,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const n=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_systems(Bt,s);n.run();const o=e.addFolder("fxaa"),a={enabled:!0,edge_threshold:"High",edge_threshold_min:"High"};o.add(a,"enabled").onChange(c=>{const u=r.write(Me);u.enabled=c});const l=["Low","Medium","High","Ultra","Extreme"];return o.add(a,"edge_threshold",l).onChange(c=>{const u=r.write(Me);u.edge_threshold=l.indexOf(c)}),o.add(a,"edge_threshold_min",l).onChange(c=>{const u=r.write(Me);u.edge_threshold_min=l.indexOf(c)}),o.open(),async()=>{await n.exit()}}async function Vy(t,e){let r;const i=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class s extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(g=>g.using(j,H,V,Y,Se,J,ze,Me,ye,it,at).write)}initialize(){r=this.commands.spawn(new vr({camera:new Y,projection:new J,transform:V.from_xyz(-2.5,1.5,2).look_at(v.ZERO,v.Y)}),new Me({enabled:!0,edge_threshold:Je.High,edge_threshold_min:Je.High})).entity.hold();const g=j.from(new wr(1)),m=new H({base_color_texture:i});this.commands.spawn(new rr({mesh:g,material:m,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const n=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_systems(Bt,s);n.run();const o=e.addFolder("tonemapping"),a={method:"Reinhard"},l=[Ue.None,Ue.Reinhard,Ue.ReinhardLuminance,Ue.AcesFitted],c=["None","Reinhard","ReinhardLuminance","AcesFitted"];o.add(a,"method",c).onChange(d=>{const g=r.write(it);g.method=l[c.indexOf(d)];const m=r.write(ye);g.method===Ue.None?m.exposure=0:g.method===Ue.Reinhard||g.method===Ue.ReinhardLuminance?m.exposure=.5:g.method===Ue.AcesFitted&&(m.exposure=.35),h.exposure=m.exposure});const u=e.addFolder("color grading"),h={exposure:0,gamma:1,pre_saturation:1,post_saturation:1};u.add(h,"exposure",0,1).onChange(d=>{const g=r.write(ye);g.exposure=d}).listen(),u.add(h,"gamma",0,8).onChange(d=>{const g=r.write(ye);g.gamma=d}),u.add(h,"pre_saturation",0,2).onChange(d=>{const g=r.write(ye);g.pre_saturation=d}),u.add(h,"post_saturation",0,2).onChange(d=>{const g=r.write(ye);g.post_saturation=d});const _=e.addFolder("deband dithering"),p={enabled:!0};return _.add(p,"enabled").onChange(d=>{const g=r.write(at);g.enabled=d}),async()=>{await n.exit()}}async function Hy(t,e){const r=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");let i;class s extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(c=>c.using(j,H,V,Y,Se,J,ze,ye,it,at).write)}initialize(){i=this.commands.spawn(new vr({camera:new Y,projection:new J,transform:V.from_xyz(-2.5,1.5,2).look_at(v.ZERO,v.Y)})).entity.hold();const c=j.from(new wr(1)),u=new H({base_color_texture:r});this.commands.spawn(new rr({mesh:c,material:u,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const n=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_systems(Bt,s);n.run();const o=e.addFolder("viewport"),a={width:6,height:0};return o.add(a,"width",50,500).onChange(l=>{i.write(Y).viewport}),async()=>{await n.exit()}}async function ky(t,e){let r,i;const s=await yr("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class n extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(_=>_.using(j,H,V,Y,Se,J,ze,Me,Go,ye,it,at,Xe,Gt,zr,vt,Xt,Si,nt,et,xe,Vt).write)}initialize(){r=this.commands.spawn(new Gt({color:be.ORANGE_RED,brightness:.02})).entity.hold(),i=this.commands.spawn(new fm({directional_light:new Xe({color:be.rgb(.98,.95,.82),shadows_enabled:!0,illuminance:1e4}),transform:V.from_xyz(0,0,0).look_at(new v(-1,-1,-1),v.Y),cascade_shadow_config:new am({first_cascade_far_bound:4,maximum_distance:10}).build()})).entity.hold(),this.commands.spawn(new vr({camera:new Y,projection:new J,transform:V.from_xyz(2,2,2).look_at(v.ZERO,v.Y)}),new Me({enabled:!0,edge_threshold:Je.High,edge_threshold_min:Je.High})).entity.hold();const _=j.from(fa.from_size(10)),p=new H({base_color:be.WHITE,perceptual_roughness:1});this.commands.spawn(new rr({mesh:_,material:p,transform:V.from_xyz(0,-.5,0)}));const d=j.from(new wr(1)),g=new H({base_color_texture:s,base_color:be.WHITE,perceptual_roughness:1});this.commands.spawn(new rr({mesh:d,material:g,transform:V.from_xyz(0,0,0)})),this.commands.execute()}}const o=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_systems(Bt,n);o.run();const a=e.addFolder("ambient"),l={color:"#FF4400",brightness:.05};a.addColor(l,"color").onChange(h=>{const _=r.write(Gt);_.color=be.hex(h)}),a.add(l,"brightness",0,1).onChange(h=>{const _=r.write(Gt);_.brightness=h});const c=e.addFolder("directional"),u={color:"#faf2d1",illuminance:1e4,dx:-2.5,dy:1.5,dz:2};return c.addColor(u,"color").onChange(h=>{const _=i.write(Xe);_.color=be.hex(h)}),c.add(u,"illuminance",0,1e5).onChange(h=>{const _=i.write(Xe);_.illuminance=h}),c.add(u,"dx",-5,5).onChange(h=>{const _=i.write(V),{translation:p,rotation:d,scale:g}=V.from_xyz(h,u.dy,u.dz).look_at(v.ZERO,v.Y);_.translation=p,_.rotation=d,_.scale=g}),c.add(u,"dy",-5,5).onChange(h=>{const _=i.write(V),{translation:p,rotation:d,scale:g}=V.from_xyz(u.dx,h,u.dz).look_at(v.ZERO,v.Y);_.translation=p,_.rotation=d,_.scale=g}),c.add(u,"dz",-5,5).onChange(h=>{const _=i.write(V),{translation:p,rotation:d,scale:g}=V.from_xyz(u.dx,u.dy,h).look_at(v.ZERO,v.Y);_.translation=p,_.rotation=d,_.scale=g}),async()=>{await o.exit()}}function Ol(t,e){if(!t)throw new Error(e||"loader assertion failed.")}const lu=!!(typeof process!="object"||String(process)!=="[object process]"||process.browser),Nl=typeof process<"u"&&process.version&&/v([0-9]*)/.exec(process.version);Nl&&parseFloat(Nl[1]);function Wy(t,e){return cu(t||{},e)}function cu(t,e){const r={...t};for(const[i,s]of Object.entries(e))s&&typeof s=="object"&&!Array.isArray(s)?r[i]=cu(r[i]||{},e[i]):r[i]=e[i];return r}const uu="latest";function Xy(){var t;return(t=globalThis._loadersgl_)!==null&&t!==void 0&&t.version||(globalThis._loadersgl_=globalThis._loadersgl_||{},typeof __VERSION__>"u"?(console.warn("loaders.gl: The __VERSION__ variable is not injected using babel plugin. Latest unstable workers would be fetched from the CDN."),globalThis._loadersgl_.version=uu):globalThis._loadersgl_.version=__VERSION__),globalThis._loadersgl_.version}const $y=Xy();function Vr(t,e){if(!t)throw new Error(e||"loaders.gl assertion failed.")}const Zr=typeof process!="object"||String(process)!=="[object process]"||process.browser,jy=typeof window<"u"&&typeof window.orientation<"u",Cl=typeof process<"u"&&process.version&&/v([0-9]*)/.exec(process.version);Cl&&parseFloat(Cl[1]);class qy{constructor(e,r){this.name=void 0,this.workerThread=void 0,this.isRunning=!0,this.result=void 0,this._resolve=()=>{},this._reject=()=>{},this.name=e,this.workerThread=r,this.result=new Promise((i,s)=>{this._resolve=i,this._reject=s})}postMessage(e,r){this.workerThread.postMessage({source:"loaders.gl",type:e,payload:r})}done(e){Vr(this.isRunning),this.isRunning=!1,this._resolve(e)}error(e){Vr(this.isRunning),this.isRunning=!1,this._reject(e)}}class co{terminate(){}}const uo=new Map;function Yy(t){Vr(t.source&&!t.url||!t.source&&t.url);let e=uo.get(t.source||t.url);return e||(t.url&&(e=Ky(t.url),uo.set(t.url,e)),t.source&&(e=hu(t.source),uo.set(t.source,e))),Vr(e),e}function Ky(t){if(!t.startsWith("http"))return t;const e=Qy(t);return hu(e)}function hu(t){const e=new Blob([t],{type:"application/javascript"});return URL.createObjectURL(e)}function Qy(t){return`try {
  importScripts('${t}');
} catch (error) {
  console.error(error);
  throw error;
}`}function _u(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=arguments.length>2?arguments[2]:void 0;const i=r||new Set;if(t){if(Ml(t))i.add(t);else if(Ml(t.buffer))i.add(t.buffer);else if(!ArrayBuffer.isView(t)){if(e&&typeof t=="object")for(const s in t)_u(t[s],e,i)}}return r===void 0?Array.from(i):[]}function Ml(t){return t?t instanceof ArrayBuffer||typeof MessagePort<"u"&&t instanceof MessagePort||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas:!1}const ho=()=>{};class Vo{static isSupported(){return typeof Worker<"u"&&Zr||typeof co<"u"&&!Zr}constructor(e){this.name=void 0,this.source=void 0,this.url=void 0,this.terminated=!1,this.worker=void 0,this.onMessage=void 0,this.onError=void 0,this._loadableURL="";const{name:r,source:i,url:s}=e;Vr(i||s),this.name=r,this.source=i,this.url=s,this.onMessage=ho,this.onError=n=>console.log(n),this.worker=Zr?this._createBrowserWorker():this._createNodeWorker()}destroy(){this.onMessage=ho,this.onError=ho,this.worker.terminate(),this.terminated=!0}get isRunning(){return!!this.onMessage}postMessage(e,r){r=r||_u(e),this.worker.postMessage(e,r)}_getErrorFromErrorEvent(e){let r="Failed to load ";return r+=`worker ${this.name} from ${this.url}. `,e.message&&(r+=`${e.message} in `),e.lineno&&(r+=`:${e.lineno}:${e.colno}`),new Error(r)}_createBrowserWorker(){this._loadableURL=Yy({source:this.source,url:this.url});const e=new Worker(this._loadableURL,{name:this.name});return e.onmessage=r=>{r.data?this.onMessage(r.data):this.onError(new Error("No data received"))},e.onerror=r=>{this.onError(this._getErrorFromErrorEvent(r)),this.terminated=!0},e.onmessageerror=r=>console.error(r),e}_createNodeWorker(){let e;if(this.url){const i=this.url.includes(":/")||this.url.startsWith("/")?this.url:`./${this.url}`;e=new co(i,{eval:!1})}else if(this.source)e=new co(this.source,{eval:!0});else throw new Error("no worker");return e.on("message",r=>{this.onMessage(r)}),e.on("error",r=>{this.onError(r)}),e.on("exit",r=>{}),e}}class Zy{static isSupported(){return Vo.isSupported()}constructor(e){this.name="unnamed",this.source=void 0,this.url=void 0,this.maxConcurrency=1,this.maxMobileConcurrency=1,this.onDebug=()=>{},this.reuseWorkers=!0,this.props={},this.jobQueue=[],this.idleQueue=[],this.count=0,this.isDestroyed=!1,this.source=e.source,this.url=e.url,this.setProps(e)}destroy(){this.idleQueue.forEach(e=>e.destroy()),this.isDestroyed=!0}setProps(e){this.props={...this.props,...e},e.name!==void 0&&(this.name=e.name),e.maxConcurrency!==void 0&&(this.maxConcurrency=e.maxConcurrency),e.maxMobileConcurrency!==void 0&&(this.maxMobileConcurrency=e.maxMobileConcurrency),e.reuseWorkers!==void 0&&(this.reuseWorkers=e.reuseWorkers),e.onDebug!==void 0&&(this.onDebug=e.onDebug)}async startJob(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:(n,o,a)=>n.done(a),i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:(n,o)=>n.error(o);const s=new Promise(n=>(this.jobQueue.push({name:e,onMessage:r,onError:i,onStart:n}),this));return this._startQueuedJob(),await s}async _startQueuedJob(){if(!this.jobQueue.length)return;const e=this._getAvailableWorker();if(!e)return;const r=this.jobQueue.shift();if(r){this.onDebug({message:"Starting job",name:r.name,workerThread:e,backlog:this.jobQueue.length});const i=new qy(r.name,e);e.onMessage=s=>r.onMessage(i,s.type,s.payload),e.onError=s=>r.onError(i,s),r.onStart(i);try{await i.result}catch(s){console.error(`Worker exception: ${s}`)}finally{this.returnWorkerToQueue(e)}}}returnWorkerToQueue(e){!Zr||this.isDestroyed||!this.reuseWorkers||this.count>this._getMaxConcurrency()?(e.destroy(),this.count--):this.idleQueue.push(e),this.isDestroyed||this._startQueuedJob()}_getAvailableWorker(){if(this.idleQueue.length>0)return this.idleQueue.shift()||null;if(this.count<this._getMaxConcurrency()){this.count++;const e=`${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;return new Vo({name:e,source:this.source,url:this.url})}return null}_getMaxConcurrency(){return jy?this.maxMobileConcurrency:this.maxConcurrency}}const Gy={maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:!0,onDebug:()=>{}};class pr{static isSupported(){return Vo.isSupported()}static getWorkerFarm(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return pr._workerFarm=pr._workerFarm||new pr({}),pr._workerFarm.setProps(e),pr._workerFarm}constructor(e){this.props=void 0,this.workerPools=new Map,this.props={...Gy},this.setProps(e),this.workerPools=new Map}destroy(){for(const e of this.workerPools.values())e.destroy();this.workerPools=new Map}setProps(e){this.props={...this.props,...e};for(const r of this.workerPools.values())r.setProps(this._getWorkerPoolProps())}getWorkerPool(e){const{name:r,source:i,url:s}=e;let n=this.workerPools.get(r);return n||(n=new Zy({name:r,source:i,url:s}),n.setProps(this._getWorkerPoolProps()),this.workerPools.set(r,n)),n}_getWorkerPoolProps(){return{maxConcurrency:this.props.maxConcurrency,maxMobileConcurrency:this.props.maxMobileConcurrency,reuseWorkers:this.props.reuseWorkers,onDebug:this.props.onDebug}}}pr._workerFarm=void 0;function Jy(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=e[t.id]||{},i=Zr?`${t.id}-worker.js`:`${t.id}-worker-node.js`;let s=r.workerUrl;if(!s&&t.id==="compression"&&(s=e.workerUrl),e._workerType==="test"&&(Zr?s=`modules/${t.module}/dist/${i}`:s=`modules/${t.module}/src/workers/${t.id}-worker-node.ts`),!s){let n=t.version;n==="latest"&&(n=uu);const o=n?`@${n}`:"";s=`https://unpkg.com/@loaders.gl/${t.module}${o}/dist/${i}`}return Vr(s),s}function ev(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$y;Vr(t,"no worker provided");const r=t.version;return!(!e||!r)}function tv(t,e){return!pr.isSupported()||!Zr&&!(e!=null&&e._nodeWorkers)?!1:t.worker&&(e==null?void 0:e.worker)}async function rv(t,e,r,i,s){const n=t.id,o=Jy(t,r),l=pr.getWorkerFarm(r).getWorkerPool({name:n,url:o});r=JSON.parse(JSON.stringify(r)),i=JSON.parse(JSON.stringify(i||{}));const c=await l.startJob("process-on-worker",iv.bind(null,s));return c.postMessage("process",{input:e,options:r,context:i}),await(await c.result).result}async function iv(t,e,r,i){switch(r){case"done":e.done(i);break;case"error":e.error(new Error(i.error));break;case"process":const{id:s,input:n,options:o}=i;try{const a=await t(n,o);e.postMessage("done",{id:s,result:a})}catch(a){const l=a instanceof Error?a.message:"unknown error";e.postMessage("error",{id:s,error:l})}break;default:console.warn(`parse-with-worker unknown message ${r}`)}}function sv(t,e,r){if(r=r||t.byteLength,t.byteLength<r||e.byteLength<r)return!1;const i=new Uint8Array(t),s=new Uint8Array(e);for(let n=0;n<i.length;++n)if(i[n]!==s[n])return!1;return!0}function nv(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];const i=e.map(a=>a instanceof ArrayBuffer?new Uint8Array(a):a),s=i.reduce((a,l)=>a+l.byteLength,0),n=new Uint8Array(s);let o=0;for(const a of i)n.set(a,o),o+=a.byteLength;return n.buffer}function ov(t){try{let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return async function*(){const r=new TextDecoder(void 0,e);for await(const i of t)yield typeof i=="string"?i:r.decode(i,{stream:!0})}()}catch(e){return Promise.reject(e)}}async function*av(t){let e="";for await(const r of t){e+=r;let i;for(;(i=e.indexOf(`
`))>=0;){const s=e.slice(0,i+1);e=e.slice(i+1),yield s}}e.length>0&&(yield e)}async function lv(t,e){for(;;){const{done:r,value:i}=await t.next();if(r){t.return();return}if(e(i))return}}async function cv(t){const e=[];for await(const r of t)e.push(r);return nv(...e)}let uv="";const Pl={};function hv(t){for(const e in Pl)if(t.startsWith(e)){const r=Pl[e];t=t.replace(e,r)}return!t.startsWith("http://")&&!t.startsWith("https://")&&(t=`${uv}${t}`),t}function _v(t){return t&&typeof t=="object"&&t.isBuffer}function du(t){if(_v(t))return t;if(t instanceof ArrayBuffer)return t;if(ArrayBuffer.isView(t))return t.byteOffset===0&&t.byteLength===t.buffer.byteLength?t.buffer:t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength);if(typeof t=="string"){const e=t;return new TextEncoder().encode(e).buffer}if(t&&typeof t=="object"&&t._toArrayBuffer)return t._toArrayBuffer();throw new Error("toArrayBuffer")}function fu(t){const e=t?t.lastIndexOf("/"):-1;return e>=0?t.substr(e+1):""}function dv(t){const e=t?t.lastIndexOf("/"):-1;return e>=0?t.substr(0,e):""}const fv=t=>typeof t=="boolean",os=t=>typeof t=="function",Is=t=>t!==null&&typeof t=="object",Bl=t=>Is(t)&&t.constructor==={}.constructor,pv=t=>!!t&&typeof t[Symbol.iterator]=="function",mv=t=>t&&typeof t[Symbol.asyncIterator]=="function",si=t=>typeof Response<"u"&&t instanceof Response||t&&t.arrayBuffer&&t.text&&t.json,Ui=t=>typeof Blob<"u"&&t instanceof Blob,gv=t=>t&&typeof t=="object"&&t.isBuffer,Ev=t=>typeof ReadableStream<"u"&&t instanceof ReadableStream||Is(t)&&os(t.tee)&&os(t.cancel)&&os(t.getReader),yv=t=>Is(t)&&os(t.read)&&os(t.pipe)&&fv(t.readable),pu=t=>Ev(t)||yv(t),vv=/^data:([-\w.]+\/[-\w.+]+)(;|,)/,Av=/^([-\w.]+\/[-\w.+]+)/;function wv(t){const e=Av.exec(t);return e?e[1]:t}function Dl(t){const e=vv.exec(t);return e?e[1]:""}const mu=/\?.*/;function Tv(t){const e=t.match(mu);return e&&e[0]}function va(t){return t.replace(mu,"")}function Gn(t){return si(t)?t.url:Ui(t)?t.name||"":typeof t=="string"?t:""}function Aa(t){if(si(t)){const e=t,r=e.headers.get("content-type")||"",i=va(e.url);return wv(r)||Dl(i)}return Ui(t)?t.type||"":typeof t=="string"?Dl(t):""}function Rv(t){return si(t)?t.headers["content-length"]||-1:Ui(t)?t.size:typeof t=="string"?t.length:t instanceof ArrayBuffer||ArrayBuffer.isView(t)?t.byteLength:-1}async function gu(t){if(si(t))return t;const e={},r=Rv(t);r>=0&&(e["content-length"]=String(r));const i=Gn(t),s=Aa(t);s&&(e["content-type"]=s);const n=await Sv(t);n&&(e["x-first-bytes"]=n),typeof t=="string"&&(t=new TextEncoder().encode(t));const o=new Response(t,{headers:e});return Object.defineProperty(o,"url",{value:i}),o}async function bv(t){if(!t.ok){const e=await xv(t);throw new Error(e)}}async function xv(t){let e=`Failed to fetch resource ${t.url} (${t.status}): `;try{const r=t.headers.get("Content-Type");let i=t.statusText;r!=null&&r.includes("application/json")&&(i+=` ${await t.text()}`),e+=i,e=e.length>60?`${e.slice(0,60)}...`:e}catch{}return e}async function Sv(t){if(typeof t=="string")return`data:,${t.slice(0,5)}`;if(t instanceof Blob){const r=t.slice(0,5);return await new Promise(i=>{const s=new FileReader;s.onload=n=>{var o;return i(n==null||(o=n.target)===null||o===void 0?void 0:o.result)},s.readAsDataURL(r)})}if(t instanceof ArrayBuffer){const r=t.slice(0,5);return`data:base64,${Iv(r)}`}return null}function Iv(t){let e="";const r=new Uint8Array(t);for(let i=0;i<r.byteLength;i++)e+=String.fromCharCode(r[i]);return btoa(e)}function Ov(t){return!Nv(t)&&!Cv(t)}function Nv(t){return t.startsWith("http:")||t.startsWith("https:")}function Cv(t){return t.startsWith("data:")}async function Ul(t,e){if(typeof t=="string"){const s=hv(t);if(Ov(s)){var r;if((r=globalThis.loaders)!==null&&r!==void 0&&r.fetchNode){var i;return(i=globalThis.loaders)===null||i===void 0?void 0:i.fetchNode(s,e)}}return await fetch(s,e)}return await gu(t)}function Mv(t){if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron)return!0;const e=typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent,r=t||e;return!!(r&&r.indexOf("Electron")>=0)}function Os(){return!(typeof process=="object"&&String(process)==="[object process]"&&!process.browser)||Mv()}const ks=globalThis.window||globalThis.self||globalThis.global,qi=globalThis.process||{},Eu=typeof __VERSION__<"u"?__VERSION__:"untranspiled source";Os();function Pv(t){try{const e=window[t],r="__storage_test__";return e.setItem(r,r),e.removeItem(r),e}catch{return null}}class Bv{constructor(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"sessionStorage";this.storage=void 0,this.id=void 0,this.config=void 0,this.storage=Pv(i),this.id=e,this.config=r,this._loadConfiguration()}getConfiguration(){return this.config}setConfiguration(e){if(Object.assign(this.config,e),this.storage){const r=JSON.stringify(this.config);this.storage.setItem(this.id,r)}}_loadConfiguration(){let e={};if(this.storage){const r=this.storage.getItem(this.id);e=r?JSON.parse(r):{}}return Object.assign(this.config,e),this}}function Dv(t){let e;return t<10?e="".concat(t.toFixed(2),"ms"):t<100?e="".concat(t.toFixed(1),"ms"):t<1e3?e="".concat(t.toFixed(0),"ms"):e="".concat((t/1e3).toFixed(2),"s"),e}function Uv(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:8;const r=Math.max(e-t.length,0);return"".concat(" ".repeat(r)).concat(t)}function _o(t,e,r){let i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:600;const s=t.src.replace(/\(/g,"%28").replace(/\)/g,"%29");t.width>i&&(r=Math.min(r,i/t.width));const n=t.width*r,o=t.height*r,a=["font-size:1px;","padding:".concat(Math.floor(o/2),"px ").concat(Math.floor(n/2),"px;"),"line-height:".concat(o,"px;"),"background:url(".concat(s,");"),"background-size:".concat(n,"px ").concat(o,"px;"),"color:transparent;"].join("");return["".concat(e," %c+"),a]}let Rn;(function(t){t[t.BLACK=30]="BLACK",t[t.RED=31]="RED",t[t.GREEN=32]="GREEN",t[t.YELLOW=33]="YELLOW",t[t.BLUE=34]="BLUE",t[t.MAGENTA=35]="MAGENTA",t[t.CYAN=36]="CYAN",t[t.WHITE=37]="WHITE",t[t.BRIGHT_BLACK=90]="BRIGHT_BLACK",t[t.BRIGHT_RED=91]="BRIGHT_RED",t[t.BRIGHT_GREEN=92]="BRIGHT_GREEN",t[t.BRIGHT_YELLOW=93]="BRIGHT_YELLOW",t[t.BRIGHT_BLUE=94]="BRIGHT_BLUE",t[t.BRIGHT_MAGENTA=95]="BRIGHT_MAGENTA",t[t.BRIGHT_CYAN=96]="BRIGHT_CYAN",t[t.BRIGHT_WHITE=97]="BRIGHT_WHITE"})(Rn||(Rn={}));const Fv=10;function Fl(t){return typeof t!="string"?t:(t=t.toUpperCase(),Rn[t]||Rn.WHITE)}function Lv(t,e,r){if(!Os&&typeof t=="string"){if(e){const i=Fl(e);t="\x1B[".concat(i,"m").concat(t,"\x1B[39m")}if(r){const i=Fl(r);t="\x1B[".concat(i+Fv,"m").concat(t,"\x1B[49m")}}return t}function zv(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:["constructor"];const r=Object.getPrototypeOf(t),i=Object.getOwnPropertyNames(r),s=t;for(const n of i){const o=s[n];typeof o=="function"&&(e.find(a=>n===a)||(s[n]=o.bind(t)))}}function bn(t,e){if(!t)throw new Error(e||"Assertion failed")}function hi(){let t;if(Os()&&ks.performance){var e,r;t=ks==null||(e=ks.performance)===null||e===void 0||(r=e.now)===null||r===void 0?void 0:r.call(e)}else if("hrtime"in qi){var i;const s=qi==null||(i=qi.hrtime)===null||i===void 0?void 0:i.call(qi);t=s[0]*1e3+s[1]/1e6}else t=Date.now();return t}const _i={debug:Os()&&console.debug||console.log,log:console.log,info:console.info,warn:console.warn,error:console.error},Vv={enabled:!0,level:0};function xt(){}const Ll={},zl={once:!0};class wa{constructor(){let{id:e}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{id:""};this.id=void 0,this.VERSION=Eu,this._startTs=hi(),this._deltaTs=hi(),this._storage=void 0,this.userData={},this.LOG_THROTTLE_TIMEOUT=0,this.id=e,this.userData={},this._storage=new Bv("__probe-".concat(this.id,"__"),Vv),this.timeStamp("".concat(this.id," started")),zv(this),Object.seal(this)}set level(e){this.setLevel(e)}get level(){return this.getLevel()}isEnabled(){return this._storage.config.enabled}getLevel(){return this._storage.config.level}getTotal(){return Number((hi()-this._startTs).toPrecision(10))}getDelta(){return Number((hi()-this._deltaTs).toPrecision(10))}set priority(e){this.level=e}get priority(){return this.level}getPriority(){return this.level}enable(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return this._storage.setConfiguration({enabled:e}),this}setLevel(e){return this._storage.setConfiguration({level:e}),this}get(e){return this._storage.config[e]}set(e,r){this._storage.setConfiguration({[e]:r})}settings(){console.table?console.table(this._storage.config):console.log(this._storage.config)}assert(e,r){bn(e,r)}warn(e){return this._getLogFunction(0,e,_i.warn,arguments,zl)}error(e){return this._getLogFunction(0,e,_i.error,arguments)}deprecated(e,r){return this.warn("`".concat(e,"` is deprecated and will be removed in a later version. Use `").concat(r,"` instead"))}removed(e,r){return this.error("`".concat(e,"` has been removed. Use `").concat(r,"` instead"))}probe(e,r){return this._getLogFunction(e,r,_i.log,arguments,{time:!0,once:!0})}log(e,r){return this._getLogFunction(e,r,_i.debug,arguments)}info(e,r){return this._getLogFunction(e,r,console.info,arguments)}once(e,r){return this._getLogFunction(e,r,_i.debug||_i.info,arguments,zl)}table(e,r,i){return r?this._getLogFunction(e,r,console.table||xt,i&&[i],{tag:Xv(r)}):xt}image(e){let{logLevel:r,priority:i,image:s,message:n="",scale:o=1}=e;return this._shouldLog(r||i)?Os()?Wv({image:s,message:n,scale:o}):kv():xt}time(e,r){return this._getLogFunction(e,r,console.time?console.time:console.info)}timeEnd(e,r){return this._getLogFunction(e,r,console.timeEnd?console.timeEnd:console.info)}timeStamp(e,r){return this._getLogFunction(e,r,console.timeStamp||xt)}group(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{collapsed:!1};const s=Vl({logLevel:e,message:r,opts:i}),{collapsed:n}=i;return s.method=(n?console.groupCollapsed:console.group)||console.info,this._getLogFunction(s)}groupCollapsed(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.group(e,r,Object.assign({},i,{collapsed:!0}))}groupEnd(e){return this._getLogFunction(e,"",console.groupEnd||xt)}withGroup(e,r,i){this.group(e,r)();try{i()}finally{this.groupEnd(e)()}}trace(){console.trace&&console.trace()}_shouldLog(e){return this.isEnabled()&&this.getLevel()>=yu(e)}_getLogFunction(e,r,i,s,n){if(this._shouldLog(e)){n=Vl({logLevel:e,message:r,args:s,opts:n}),i=i||n.method,bn(i),n.total=this.getTotal(),n.delta=this.getDelta(),this._deltaTs=hi();const o=n.tag||n.message;if(n.once&&o)if(!Ll[o])Ll[o]=hi();else return xt;return r=Hv(this.id,n.message,n),i.bind(console,r,...n.args)}return xt}}wa.VERSION=Eu;function yu(t){if(!t)return 0;let e;switch(typeof t){case"number":e=t;break;case"object":e=t.logLevel||t.priority||0;break;default:return 0}return bn(Number.isFinite(e)&&e>=0),e}function Vl(t){const{logLevel:e,message:r}=t;t.logLevel=yu(e);const i=t.args?Array.from(t.args):[];for(;i.length&&i.shift()!==r;);switch(typeof e){case"string":case"function":r!==void 0&&i.unshift(r),t.message=e;break;case"object":Object.assign(t,e);break}typeof t.message=="function"&&(t.message=t.message());const s=typeof t.message;return bn(s==="string"||s==="object"),Object.assign(t,{args:i},t.opts)}function Hv(t,e,r){if(typeof e=="string"){const i=r.time?Uv(Dv(r.total)):"";e=r.time?"".concat(t,": ").concat(i,"  ").concat(e):"".concat(t,": ").concat(e),e=Lv(e,r.color,r.background)}return e}function kv(t){return console.warn("removed"),xt}function Wv(t){let{image:e,message:r="",scale:i=1}=t;if(typeof e=="string"){const n=new Image;return n.onload=()=>{const o=_o(n,r,i);console.log(...o)},n.src=e,xt}const s=e.nodeName||"";if(s.toLowerCase()==="img")return console.log(..._o(e,r,i)),xt;if(s.toLowerCase()==="canvas"){const n=new Image;return n.onload=()=>console.log(..._o(n,r,i)),n.src=e.toDataURL(),xt}return xt}function Xv(t){for(const e in t)for(const r in t[e])return r||"untitled";return"empty"}const Hl=new wa({id:"loaders.gl"});class $v{log(){return()=>{}}info(){return()=>{}}warn(){return()=>{}}error(){return()=>{}}}class jv{constructor(){this.console=void 0,this.console=console}log(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.console.log.bind(this.console,...r)}info(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.console.info.bind(this.console,...r)}warn(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.console.warn.bind(this.console,...r)}error(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.console.error.bind(this.console,...r)}}const vu={fetch:null,mimeType:void 0,nothrow:!1,log:new jv,useLocalLibraries:!1,CDN:"https://unpkg.com/@loaders.gl",worker:!0,maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:lu,_nodeWorkers:!1,_workerType:"",limit:0,_limitMB:0,batchSize:"auto",batchDebounceMs:0,metadata:!1,transforms:[]},qv={throws:"nothrow",dataType:"(no longer used)",uri:"baseUri",method:"fetch.method",headers:"fetch.headers",body:"fetch.body",mode:"fetch.mode",credentials:"fetch.credentials",cache:"fetch.cache",redirect:"fetch.redirect",referrer:"fetch.referrer",referrerPolicy:"fetch.referrerPolicy",integrity:"fetch.integrity",keepalive:"fetch.keepalive",signal:"fetch.signal"};function Au(){globalThis.loaders=globalThis.loaders||{};const{loaders:t}=globalThis;return t._state=t._state||{},t._state}function wu(){const t=Au();return t.globalOptions=t.globalOptions||{...vu},t.globalOptions}function Yv(t,e,r,i){return r=r||[],r=Array.isArray(r)?r:[r],Kv(t,r),Zv(e,t,i)}function Kv(t,e){kl(t,null,vu,qv,e);for(const r of e){const i=t&&t[r.id]||{},s=r.options&&r.options[r.id]||{},n=r.deprecatedOptions&&r.deprecatedOptions[r.id]||{};kl(i,r.id,s,n,e)}}function kl(t,e,r,i,s){const n=e||"Top level",o=e?`${e}.`:"";for(const a in t){const l=!e&&Is(t[a]),c=a==="baseUri"&&!e,u=a==="workerUrl"&&e;if(!(a in r)&&!c&&!u){if(a in i)Hl.warn(`${n} loader option '${o}${a}' no longer supported, use '${i[a]}'`)();else if(!l){const h=Qv(a,s);Hl.warn(`${n} loader option '${o}${a}' not recognized. ${h}`)()}}}}function Qv(t,e){const r=t.toLowerCase();let i="";for(const s of e)for(const n in s.options){if(t===n)return`Did you mean '${s.id}.${n}'?`;const o=n.toLowerCase();(r.startsWith(o)||o.startsWith(r))&&(i=i||`Did you mean '${s.id}.${n}'?`)}return i}function Zv(t,e,r){const s={...t.options||{}};return Gv(s,r),s.log===null&&(s.log=new $v),Wl(s,wu()),Wl(s,e),s}function Wl(t,e){for(const r in e)if(r in e){const i=e[r];Bl(i)&&Bl(t[r])?t[r]={...t[r],...e[r]}:t[r]=e[r]}}function Gv(t,e){e&&!("baseUri"in t)&&(t.baseUri=e)}function Tu(t){var e;return t?(Array.isArray(t)&&(t=t[0]),Array.isArray((e=t)===null||e===void 0?void 0:e.extensions)):!1}function Ru(t){var e,r;Ol(t,"null loader"),Ol(Tu(t),"invalid loader");let i;return Array.isArray(t)&&(i=t[1],t=t[0],t={...t,options:{...t.options,...i}}),((e=t)!==null&&e!==void 0&&e.parseTextSync||(r=t)!==null&&r!==void 0&&r.parseText)&&(t.text=!0),t.text||(t.binary=!0),t}const Jv=()=>{const t=Au();return t.loaderRegistry=t.loaderRegistry||[],t.loaderRegistry};function eA(){return Jv()}const tA=new wa({id:"loaders.gl"}),rA=/\.([^.]+)$/;async function iA(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0;if(!bu(t))return null;let s=Xl(t,e,{...r,nothrow:!0},i);if(s)return s;if(Ui(t)&&(t=await t.slice(0,10).arrayBuffer(),s=Xl(t,e,r,i)),!s&&!(r!=null&&r.nothrow))throw new Error(xu(t));return s}function Xl(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0;if(!bu(t))return null;if(e&&!Array.isArray(e))return Ru(e);let s=[];e&&(s=s.concat(e)),r!=null&&r.ignoreRegisteredLoaders||s.push(...eA()),nA(s);const n=sA(t,s,r,i);if(!n&&!(r!=null&&r.nothrow))throw new Error(xu(t));return n}function sA(t,e,r,i){const s=Gn(t),n=Aa(t),o=va(s)||(i==null?void 0:i.url);let a=null,l="";if(r!=null&&r.mimeType&&(a=fo(e,r==null?void 0:r.mimeType),l=`match forced by supplied MIME type ${r==null?void 0:r.mimeType}`),a=a||oA(e,o),l=l||(a?`matched url ${o}`:""),a=a||fo(e,n),l=l||(a?`matched MIME type ${n}`:""),a=a||lA(e,t),l=l||(a?`matched initial data ${Su(t)}`:""),r!=null&&r.fallbackMimeType&&(a=a||fo(e,r==null?void 0:r.fallbackMimeType),l=l||(a?`matched fallback MIME type ${n}`:"")),l){var c;tA.log(1,`selectLoader selected ${(c=a)===null||c===void 0?void 0:c.name}: ${l}.`)}return a}function bu(t){return!(t instanceof Response&&t.status===204)}function xu(t){const e=Gn(t),r=Aa(t);let i="No valid loader found (";i+=e?`${fu(e)}, `:"no url provided, ",i+=`MIME type: ${r?`"${r}"`:"not provided"}, `;const s=t?Su(t):"";return i+=s?` first bytes: "${s}"`:"first bytes: not available",i+=")",i}function nA(t){for(const e of t)Ru(e)}function oA(t,e){const r=e&&rA.exec(e),i=r&&r[1];return i?aA(t,i):null}function aA(t,e){e=e.toLowerCase();for(const r of t)for(const i of r.extensions)if(i.toLowerCase()===e)return r;return null}function fo(t,e){for(const r of t)if(r.mimeTypes&&r.mimeTypes.includes(e)||e===`application/x.${r.id}`)return r;return null}function lA(t,e){if(!e)return null;for(const r of t)if(typeof e=="string"){if(cA(e,r))return r}else if(ArrayBuffer.isView(e)){if($l(e.buffer,e.byteOffset,r))return r}else if(e instanceof ArrayBuffer&&$l(e,0,r))return r;return null}function cA(t,e){return e.testText?e.testText(t):(Array.isArray(e.tests)?e.tests:[e.tests]).some(i=>t.startsWith(i))}function $l(t,e,r){return(Array.isArray(r.tests)?r.tests:[r.tests]).some(s=>uA(t,e,r,s))}function uA(t,e,r,i){if(i instanceof ArrayBuffer)return sv(i,t,i.byteLength);switch(typeof i){case"function":return i(t);case"string":const s=Ho(t,e,i.length);return i===s;default:return!1}}function Su(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:5;return typeof t=="string"?t.slice(0,e):ArrayBuffer.isView(t)?Ho(t.buffer,t.byteOffset,e):t instanceof ArrayBuffer?Ho(t,0,e):""}function Ho(t,e,r){if(t.byteLength<e+r)return"";const i=new DataView(t);let s="";for(let n=0;n<r;n++)s+=String.fromCharCode(i.getUint8(e+n));return s}const hA=256*1024;function*_A(t,e){const r=(e==null?void 0:e.chunkSize)||hA;let i=0;const s=new TextEncoder;for(;i<t.length;){const n=Math.min(t.length-i,r),o=t.slice(i,i+n);i+=n,yield s.encode(o)}}const dA=256*1024;function fA(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return function*(){const{chunkSize:r=dA}=e;let i=0;for(;i<t.byteLength;){const s=Math.min(t.byteLength-i,r),n=new ArrayBuffer(s),o=new Uint8Array(t,i,s);new Uint8Array(n).set(o),i+=s,yield n}}()}const pA=1024*1024;async function*mA(t,e){const r=(e==null?void 0:e.chunkSize)||pA;let i=0;for(;i<t.size;){const s=i+r,n=await t.slice(i,s).arrayBuffer();i=s,yield n}}function jl(t,e){return lu?gA(t,e):EA(t)}async function*gA(t,e){const r=t.getReader();let i;try{for(;;){const s=i||r.read();e!=null&&e._streamReadAhead&&(i=r.read());const{done:n,value:o}=await s;if(n)return;yield du(o)}}catch{r.releaseLock()}}async function*EA(t,e){for await(const r of t)yield du(r)}function yA(t,e){if(typeof t=="string")return _A(t,e);if(t instanceof ArrayBuffer)return fA(t,e);if(Ui(t))return mA(t,e);if(pu(t))return jl(t,e);if(si(t))return jl(t.body,e);throw new Error("makeIterator")}const Iu="Cannot convert supplied data type";function vA(t,e,r){if(e.text&&typeof t=="string")return t;if(gv(t)&&(t=t.buffer),t instanceof ArrayBuffer){const i=t;return e.text&&!e.binary?new TextDecoder("utf8").decode(i):i}if(ArrayBuffer.isView(t)){if(e.text&&!e.binary)return new TextDecoder("utf8").decode(t);let i=t.buffer;const s=t.byteLength||t.length;return(t.byteOffset!==0||s!==i.byteLength)&&(i=i.slice(t.byteOffset,t.byteOffset+s)),i}throw new Error(Iu)}async function AA(t,e,r){const i=t instanceof ArrayBuffer||ArrayBuffer.isView(t);if(typeof t=="string"||i)return vA(t,e);if(Ui(t)&&(t=await gu(t)),si(t)){const s=t;return await bv(s),e.binary?await s.arrayBuffer():await s.text()}if(pu(t)&&(t=yA(t,r)),pv(t)||mv(t))return cv(t);throw new Error(Iu)}function wA(t,e){const r=wu(),i=t||r;return typeof i.fetch=="function"?i.fetch:Is(i.fetch)?s=>Ul(s,i.fetch):e!=null&&e.fetch?e==null?void 0:e.fetch:Ul}function TA(t,e,r){if(r)return r;const i={fetch:wA(e,t),...t};if(i.url){const s=va(i.url);i.baseUrl=s,i.queryString=Tv(i.url),i.filename=fu(s),i.baseUrl=dv(s)}return Array.isArray(i.loaders)||(i.loaders=null),i}function RA(t,e){if(t&&!Array.isArray(t))return t;let r;if(t&&(r=Array.isArray(t)?t:[t]),e&&e.loaders){const i=Array.isArray(e.loaders)?e.loaders:[e.loaders];r=r?[...r,...i]:i}return r&&r.length?r:void 0}async function Ta(t,e,r,i){e&&!Array.isArray(e)&&!Tu(e)&&(i=void 0,r=e,e=void 0),t=await t,r=r||{};const s=Gn(t),o=RA(e,i),a=await iA(t,o,r);return a?(r=Yv(r,a,o,s),i=TA({url:s,_parse:Ta,loaders:o},r,i||null),await bA(a,t,r,i)):null}async function bA(t,e,r,i){if(ev(t),r=Wy(t.options,r),si(e)){const n=e,{ok:o,redirected:a,status:l,statusText:c,type:u,url:h}=n,_=Object.fromEntries(n.headers.entries());i.response={headers:_,ok:o,redirected:a,status:l,statusText:c,type:u,url:h}}e=await AA(e,t,r);const s=t;if(s.parseTextSync&&typeof e=="string")return s.parseTextSync(e,r,i);if(tv(t,r))return await rv(t,e,r,i,Ta);if(s.parseText&&typeof e=="string")return await s.parseText(e,r,i);if(s.parse)return await s.parse(e,r,i);throw Vr(!s.parseSync),new Error(`${t.id} loader - no parser found and worker is disabled`)}function xA(t){switch(t.constructor){case Int8Array:return"int8";case Uint8Array:case Uint8ClampedArray:return"uint8";case Int16Array:return"int16";case Uint16Array:return"uint16";case Int32Array:return"int32";case Uint32Array:return"uint32";case Float32Array:return"float32";case Float64Array:return"float64";default:return"null"}}function SA(t){let e=1/0,r=1/0,i=1/0,s=-1/0,n=-1/0,o=-1/0;const a=t.POSITION?t.POSITION.value:[],l=a&&a.length;for(let c=0;c<l;c+=3){const u=a[c],h=a[c+1],_=a[c+2];e=u<e?u:e,r=h<r?h:r,i=_<i?_:i,s=u>s?u:s,n=h>n?h:n,o=_>o?_:o}return[[e,r,i],[s,n,o]]}function IA(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return{fields:NA(t),metadata:e}}function OA(t,e,r){const i=xA(e.value),s=r||CA(e);return{name:t,type:{type:"fixed-size-list",listSize:e.size,children:[{name:"value",type:i}]},nullable:!1,metadata:s}}function NA(t){const e=[];for(const r in t){const i=t[r];e.push(OA(r,i))}return e}function CA(t){const e={};return"byteOffset"in t&&(e.byteOffset=t.byteOffset.toString(10)),"byteStride"in t&&(e.byteStride=t.byteStride.toString(10)),"normalized"in t&&(e.normalized=t.normalized.toString()),e}const MA=typeof __VERSION__<"u"?__VERSION__:"latest",PA={name:"PLY",id:"ply",module:"ply",version:MA,worker:!0,extensions:["ply"],mimeTypes:["text/plain","application/octet-stream"],text:!0,binary:!0,tests:["ply"],options:{ply:{}}};function BA(t,e){const r=DA(t);return IA(e,r)}function DA(t){const e={};return e.ply_comments=JSON.stringify(t.comments),e.ply_elements=JSON.stringify(t.elements),t.format!==void 0&&(e.ply_format=t.format),t.version!==void 0&&(e.ply_version=t.version),t.headerLength!==void 0&&(e.ply_headerLength=t.headerLength.toString(10)),e}function Ou(t,e,r){const i=UA(e),s=SA(i),n=e.indices.length||e.vertices.length/3,o=e.indices&&e.indices.length>0,a=o?4:0,l=o?"triangle-list":"point-list",c=BA(t,i),u={loader:"ply",loaderData:t,header:{vertexCount:n,boundingBox:s},schema:c,attributes:i,indices:{value:new Uint32Array(0),size:0},mode:a,topology:l};return e.indices.length>0&&(u.indices={value:new Uint32Array(e.indices),size:1}),u}function UA(t){const e={};for(const r of Object.keys(t))switch(r){case"vertices":t.vertices.length>0&&(e.POSITION={value:new Float32Array(t.vertices),size:3});break;case"normals":t.normals.length>0&&(e.NORMAL={value:new Float32Array(t.normals),size:3});break;case"uvs":t.uvs.length>0&&(e.TEXCOORD_0={value:new Float32Array(t.uvs),size:2});break;case"colors":t.colors.length>0&&(e.COLOR_0={value:new Uint8Array(t.colors),size:3,normalized:!0});break;case"indices":break;default:t[r].length>0&&(e[r]={value:new Float32Array(t[r]),size:1});break}return e}function po(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r,i;if(t instanceof ArrayBuffer){const s=new TextDecoder().decode(t);r=ql(s,e),i=r.format==="ascii"?Yl(s,r):HA(t,r)}else r=ql(t,e),i=Yl(t,r);return Ou(r,i)}function ql(t,e){const r=/ply([\s\S]*)end_header\s/;let i="",s=0;const n=r.exec(t);n!==null&&(i=n[1],s=n[0].length);const o=i.split(`
`);return FA(o,s,e)}function FA(t,e,r){const i={comments:[],elements:[],headerLength:e};let s,n,o=null;for(let a=0;a<t.length;a++){let l=t[a];if(l=l.trim(),l!=="")switch(n=l.split(/\s+/),s=n.shift(),l=n.join(" "),s){case"format":i.format=n[0],i.version=n[1];break;case"comment":i.comments.push(l);break;case"element":o&&i.elements.push(o),o={name:n[0],count:parseInt(n[1],10),properties:[]};break;case"property":if(o){const c=LA(n);r!=null&&r.propertyNameMapping&&c.name in(r==null?void 0:r.propertyNameMapping)&&(c.name=r==null?void 0:r.propertyNameMapping[c.name]),o.properties.push(c)}break;default:console.log("unhandled",s,n)}}return o&&i.elements.push(o),i}function Nu(t){const e={indices:[],vertices:[],normals:[],uvs:[],colors:[]};for(const r of t.elements)if(r.name==="vertex")for(const i of r.properties)switch(i.name){case"x":case"y":case"z":case"nx":case"ny":case"nz":case"s":case"t":case"red":case"green":case"blue":break;default:e[i.name]=[];break}return e}function LA(t){const e=t[0];switch(e){case"list":return{type:e,name:t[3],countType:t[1],itemType:t[2]};default:return{type:e,name:t[1]}}}function mo(t,e){switch(e){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(t,10);case"float":case"double":case"float32":case"float64":return parseFloat(t);default:throw new Error(e)}}function zA(t,e){const r=e.split(/\s+/),i={};for(let s=0;s<t.length;s++)if(t[s].type==="list"){const n=[],o=mo(r.shift(),t[s].countType);for(let a=0;a<o;a++)n.push(mo(r.shift(),t[s].itemType));i[t[s].name]=n}else i[t[s].name]=mo(r.shift(),t[s].type);return i}function Yl(t,e){const r=Nu(e);let i;const s=/end_header\s([\s\S]*)$/;let n="";(i=s.exec(t))!==null&&(n=i[1]);const o=n.split(`
`);let a=0,l=0;for(let c=0;c<o.length;c++){let u=o[c];if(u=u.trim(),u!==""){l>=e.elements[a].count&&(a++,l=0);const h=zA(e.elements[a].properties,u);Cu(r,e.elements[a].name,h),l++}}return r}function Cu(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(e==="vertex")for(const i of Object.keys(r))switch(i){case"x":t.vertices.push(r.x,r.y,r.z);break;case"y":case"z":break;case"nx":"nx"in r&&"ny"in r&&"nz"in r&&t.normals.push(r.nx,r.ny,r.nz);break;case"ny":case"nz":break;case"s":"s"in r&&"t"in r&&t.uvs.push(r.s,r.t);break;case"t":break;case"red":"red"in r&&"green"in r&&"blue"in r&&t.colors.push(r.red,r.green,r.blue);break;case"green":case"blue":break;default:t[i].push(r[i])}else if(e==="face"){const i=r.vertex_indices||r.vertex_index;i.length===3?t.indices.push(i[0],i[1],i[2]):i.length===4&&(t.indices.push(i[0],i[1],i[3]),t.indices.push(i[1],i[2],i[3]))}}function go(t,e,r,i){switch(r){case"int8":case"char":return[t.getInt8(e),1];case"uint8":case"uchar":return[t.getUint8(e),1];case"int16":case"short":return[t.getInt16(e,i),2];case"uint16":case"ushort":return[t.getUint16(e,i),2];case"int32":case"int":return[t.getInt32(e,i),4];case"uint32":case"uint":return[t.getUint32(e,i),4];case"float32":case"float":return[t.getFloat32(e,i),4];case"float64":case"double":return[t.getFloat64(e,i),8];default:throw new Error(r)}}function VA(t,e,r,i){const s={};let n,o=0;for(let a=0;a<r.length;a++)if(r[a].type==="list"){const l=[];n=go(t,e+o,r[a].countType,i);const c=n[0];o+=n[1];for(let u=0;u<c;u++)n=go(t,e+o,r[a].itemType,i),l.push(n[0]),o+=n[1];s[r[a].name]=l}else n=go(t,e+o,r[a].type,i),s[r[a].name]=n[0],o+=n[1];return[s,o]}function HA(t,e){const r=Nu(e),i=e.format==="binary_little_endian",s=new DataView(t,e.headerLength);let n,o=0;for(let a=0;a<e.elements.length;a++){const l=e.elements[a].count;for(let c=0;c<l;c++){n=VA(s,o,e.elements[a].properties,i),o+=n[1];const u=n[0];Cu(r,e.elements[a].name,u)}}return r}let di;async function*kA(t,e){const r=av(ov(t)),i=await WA(r,e);let s;switch(i.format){case"ascii":s=await $A(r,i);break;default:throw new Error("Binary PLY can not yet be parsed in streaming mode")}yield Ou(i,s)}async function WA(t,e){const r={comments:[],elements:[]};return await lv(t,i=>{if(i=i.trim(),i==="end_header")return!0;if(i==="")return!1;const s=i.split(/\s+/),n=s.shift();switch(i=s.join(" "),n){case"ply":break;case"format":r.format=s[0],r.version=s[1];break;case"comment":r.comments.push(i);break;case"element":di&&r.elements.push(di),di={name:s[0],count:parseInt(s[1],10),properties:[]};break;case"property":const o=XA(s,e.propertyNameMapping);di.properties.push(o);break;default:console.log("unhandled",n,s)}return!1}),di&&r.elements.push(di),r}function XA(t,e){const r=t[0];switch(r){case"list":return{type:r,name:t[3],countType:t[1],itemType:t[2]};default:return{type:r,name:t[1]}}}async function $A(t,e){const r={indices:[],vertices:[],normals:[],uvs:[],colors:[]};let i=0,s=0;for await(let n of t)if(n=n.trim(),n!==""){s>=e.elements[i].count&&(i++,s=0);const o=jA(e.elements[i].properties,n);qA(r,e.elements[i].name,o),s++}return r}function Eo(t,e){switch(e){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(t,10);case"float":case"double":case"float32":case"float64":return parseFloat(t);default:throw new Error(e)}}function jA(t,e){const r=e.split(/\s+/),i={};for(let s=0;s<t.length;s++)if(t[s].type==="list"){const n=[],o=Eo(r.shift(),t[s].countType);for(let a=0;a<o;a++)n.push(Eo(r.shift(),t[s].itemType));i[t[s].name]=n}else i[t[s].name]=Eo(r.shift(),t[s].type);return i}function qA(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};switch(e){case"vertex":t.vertices.push(r.x,r.y,r.z),"nx"in r&&"ny"in r&&"nz"in r&&t.normals.push(r.nx,r.ny,r.nz),"s"in r&&"t"in r&&t.uvs.push(r.s,r.t),"red"in r&&"green"in r&&"blue"in r&&t.colors.push(r.red/255,r.green/255,r.blue/255);break;case"face":const i=r.vertex_indices||r.vertex_index;i.length===3?t.indices.push(i[0],i[1],i[2]):i.length===4&&(t.indices.push(i[0],i[1],i[3]),t.indices.push(i[1],i[2],i[3]));break}}const YA={...PA,parse:async(t,e)=>po(t,e==null?void 0:e.ply),parseTextSync:(t,e)=>po(t,e==null?void 0:e.ply),parseSync:(t,e)=>po(t,e==null?void 0:e.ply),parseInBatches:(t,e)=>kA(t,e==null?void 0:e.ply)},Kl=5;async function KA(t,e){const r=await Ta(fetch("/icecream.ply"),YA),{header:i,attributes:s}=r;class n extends x{constructor(){super(...arguments),this.commands=new br(this),this.q=this.query(l=>l.using(j,H,V,Y,Se,J,ze,ye,it,at,Vt,nt,et,xe,At,qe).write)}initialize(){this.commands.spawn(new vr({camera:new Y,projection:new J,transform:V.from_xyz(0,1.5,5).look_at(v.ZERO,v.Y),tonemapping:new it(Ue.None)})).entity.hold();const l=[];for(let _=0;_<((i==null?void 0:i.vertexCount)||0);_++){const p=s.POSITION.value[_*3+0],d=s.POSITION.value[_*3+1],g=s.POSITION.value[_*3+2],m=s.f_dc_0.value[_],E=s.f_dc_1.value[_],A=s.f_dc_2.value[_],S=s.scale_0.value[_],P=s.scale_1.value[_],k=s.scale_2.value[_],C=1/(1+Math.exp(-s.opacity.value[_])),O=s.rot_0.value[_],D=s.rot_1.value[_],X=s.rot_2.value[_],te=s.rot_3.value[_],K=new Pi({rotation:new na({rotation:[O,D,X,te]}),position_visibility:new sa({position:[p,d,g]}),scale_opacity:new aa({scale:[S,P,k],opacity:C}),spherical_harmonic:new Rs({coefficients:[m,E,A]})});l.push(K),K.position_visibility.visibility=1;let ce=(K.scale_opacity.scale[0]+K.scale_opacity.scale[1]+K.scale_opacity.scale[2])/3;for(let _e=0;_e<3;_e++)K.scale_opacity.scale[_e]=Math.exp(Math.min(Math.max(K.scale_opacity.scale[_e],ce-Kl),ce+Kl));const Ie=Math.sqrt(new Array(4).fill(void 0).map((_e,Oe)=>Math.pow(K.rotation.rotation[Oe],2)).reduce((_e,Oe)=>_e+Oe,0));for(let _e=0;_e<4;_e++)K.rotation.rotation[_e]/=Ie}const c=j.from(new wr(0)),u=new H;this.commands.spawn(new rr({mesh:c,material:u,transform:V.from_xyz(0,0,0)}));const h=At.from_gaussians(l);this.commands.spawn(new zm({cloud:h})),this.commands.execute()}}const o=new Rr({canvas:t,shaderCompilerPath:Sr}).add_plugins(...xr).add_plugins(dy).add_systems(Bt,n);return o.run(),async()=>{await o.exit()}}const Ra=Object.freeze(Object.defineProperty({__proto__:null,FPSCameraController:Oy,FXAA:zy,Fog:Ly,GaussianSplatting:KA,Light:ky,MultiViews:Hy,OrbitCameraController:Ny,Skybox:Fy,ToneMapping:Vy},Symbol.toStringTag,{value:"Module"}));/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.16.1
 * @author George Michael Brower
 * @license MIT
 */class er{constructor(e,r,i,s,n="div"){this.parent=e,this.object=r,this.property=i,this._disabled=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),er.nextNameID=er.nextNameID||0,this.$name.id=`lil-gui-name-${++er.nextNameID}`,this.$widget=document.createElement(n),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}options(e){const r=this.parent.add(this.object,this.property,e);return r.name(this._name),this.destroy(),r}min(e){return this}max(e){return this}step(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class QA extends er{constructor(e,r,i){super(e,r,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ko(t){let e,r;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?r=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?r=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(r=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),r?"#"+r:!1}const ZA={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:ko,toHexString:ko},ys={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},GA={isPrimitive:!1,match:Array.isArray,fromHexString(t,e,r=1){const i=ys.fromHexString(t);e[0]=(i>>16&255)/255*r,e[1]=(i>>8&255)/255*r,e[2]=(i&255)/255*r},toHexString([t,e,r],i=1){i=255/i;const s=t*i<<16^e*i<<8^r*i<<0;return ys.toHexString(s)}},JA={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,r=1){const i=ys.fromHexString(t);e.r=(i>>16&255)/255*r,e.g=(i>>8&255)/255*r,e.b=(i&255)/255*r},toHexString({r:t,g:e,b:r},i=1){i=255/i;const s=t*i<<16^e*i<<8^r*i<<0;return ys.toHexString(s)}},ew=[ZA,ys,GA,JA];function tw(t){return ew.find(e=>e.match(t))}class rw extends er{constructor(e,r,i,s){super(e,r,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=tw(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=ko(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const r=this._format.fromHexString(e);this.setValue(r)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class yo extends er{constructor(e,r,i){super(e,r,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class iw extends er{constructor(e,r,i,s,n,o){super(e,r,i,"number"),this._initInput(),this.min(s),this.max(n);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,r=!0){return this._step=e,this._stepExplicit=r,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let r=(e-this._min)/(this._max-this._min);r=Math.max(0,Math.min(r,1)),this.$fill.style.width=r*100+"%"}return this._inputFocused||(this.$input.value=e),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{const E=parseFloat(this.$input.value);isNaN(E)||this.setValue(this._clamp(E))},r=E=>{const A=parseFloat(this.$input.value);isNaN(A)||(this._snapClampSetValue(A+E),this.$input.value=this.getValue())},i=E=>{E.code==="Enter"&&this.$input.blur(),E.code==="ArrowUp"&&(E.preventDefault(),r(this._step*this._arrowKeyMultiplier(E))),E.code==="ArrowDown"&&(E.preventDefault(),r(this._step*this._arrowKeyMultiplier(E)*-1))},s=E=>{this._inputFocused&&(E.preventDefault(),r(this._step*this._normalizeMouseWheel(E)))};let n=!1,o,a,l,c,u;const h=5,_=E=>{o=E.clientX,a=l=E.clientY,n=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",d)},p=E=>{if(n){const A=E.clientX-o,S=E.clientY-a;Math.abs(S)>h?(E.preventDefault(),this.$input.blur(),n=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(A)>h&&d()}if(!n){const A=E.clientY-l;u-=A*this._step*this._arrowKeyMultiplier(E),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}l=E.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",d)},g=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",_),this.$input.addEventListener("focus",g),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(E,A,S,P,k)=>(E-A)/(S-A)*(k-P)+P,r=E=>{const A=this.$slider.getBoundingClientRect();let S=e(E,A.left,A.right,this._min,this._max);this._snapClampSetValue(S)},i=E=>{this._setDraggingStyle(!0),r(E.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",n)},s=E=>{r(E.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",n)};let o=!1,a,l;const c=E=>{E.preventDefault(),this._setDraggingStyle(!0),r(E.touches[0].clientX),o=!1},u=E=>{E.touches.length>1||(this._hasScrollBar?(a=E.touches[0].clientX,l=E.touches[0].clientY,o=!0):c(E),window.addEventListener("touchmove",h),window.addEventListener("touchend",_))},h=E=>{if(o){const A=E.touches[0].clientX-a,S=E.touches[0].clientY-l;Math.abs(A)>Math.abs(S)?c(E):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",_))}else E.preventDefault(),r(E.touches[0].clientX)},_=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",_)},p=this._callOnFinishChange.bind(this),d=400;let g;const m=E=>{if(Math.abs(E.deltaX)<Math.abs(E.deltaY)&&this._hasScrollBar)return;E.preventDefault();const S=this._normalizeMouseWheel(E)*this._step;this._snapClampSetValue(this.getValue()+S),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(p,d)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,r="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${r}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:r,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(r=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),r+-i}_arrowKeyMultiplier(e){let r=this._stepExplicit?1:10;return e.shiftKey?r*=10:e.altKey&&(r/=10),r}_snap(e){const r=Math.round(e/this._step)*this._step;return parseFloat(r.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class sw extends er{constructor(e,r,i,s){super(e,r,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(s)?s:Object.values(s),this._names=Array.isArray(s)?s:Object.keys(s),this._names.forEach(n=>{const o=document.createElement("option");o.innerHTML=n,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),r=this._values.indexOf(e);return this.$select.selectedIndex=r,this.$display.innerHTML=r===-1?e:this._names[r],this}}class nw extends er{constructor(e,r,i){super(e,r,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const ow=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function aw(t){const e=document.createElement("style");e.innerHTML=t;const r=document.querySelector("head link[rel=stylesheet], head style");r?document.head.insertBefore(e,r):document.head.appendChild(e)}let Ql=!1;class ba{constructor({parent:e,autoPlace:r=e===void 0,container:i,width:s,title:n="Controls",injectStyles:o=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),a&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Ql&&o&&(aw(ow),Ql=!0),i?i.appendChild(this.domElement):r&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,r,i,s,n){if(Object(i)===i)return new sw(this,e,r,i);const o=e[r];switch(typeof o){case"number":return new iw(this,e,r,i,s,n);case"boolean":return new QA(this,e,r);case"string":return new nw(this,e,r);case"function":return new yo(this,e,r)}console.error(`gui.add failed
	property:`,r,`
	object:`,e,`
	value:`,o)}addColor(e,r,i=1){return new rw(this,e,r,i)}addFolder(e){return new ba({parent:this,title:e})}load(e,r=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof yo||i._name in e.controllers&&i.load(e.controllers[i._name])}),r&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const r={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof yo)){if(i._name in r.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);r.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in r.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);r.folders[i._title]=i.save()}),r}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const r=this.$children.clientHeight;this.$children.style.height=r+"px",this.domElement.classList.add("transition");const i=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(r=>{e=e.concat(r.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(r=>{e=e.concat(r.foldersRecursive())}),e}}async function lw(t,e){const{width:r,height:i}=e.params||{};let s=document.getElementById("canvas");s&&s.remove(),s=document.createElement("div"),s.id="canvas",t.appendChild(s),s.innerHTML="";const n=document.createElement("canvas");n.width=r||1e3,n.height=i||1e3,n.style.width=`${n.width/window.devicePixelRatio}px`,n.style.height=`${n.height/window.devicePixelRatio}px`,n.style.outline="none",n.style.padding="0px",n.style.margin="0px",s.appendChild(n);const o=new ba({autoPlace:!1});return t.appendChild(o.domElement),await e(n,o)}const Ir=document.createElement("select");Ir.id="example-select";Ir.style.margin="1em";Ir.onchange=uw;Ir.style.display="block";document.body.append(Ir);const cw=Object.keys(Ra).map(t=>{const e=document.createElement("option");return e.textContent=t,e.value=t,e});cw.forEach(t=>Ir.append(t));const Zl=new URL(location).searchParams.get("name");Ra[Zl]&&(Ir.value=Zl);const Gl=document.getElementById("container");let vo;Mu();async function Mu(){vo&&await vo(),Gl.innerHTML="";const t=Ra[Ir.value];vo=await lw(Gl,t),window.screenshot&&await window.screenshot()}function uw(){const{value:t}=Ir;history.pushState({value:t},"",`?name=${t}`),location.reload(),Mu()}

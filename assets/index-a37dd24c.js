var jo=Object.defineProperty;var qo=(t,e,n)=>e in t?jo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var d=(t,e,n)=>(qo(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const Pe=22,zn=9,hs=7,_s=2**Pe,at=_s-1,_i=2**zn,di=_i-1,Ss=2**hs,Yo=Ss-1;class F extends Error{constructor(e){super(`Internal error: ${e}. Please report a bug!`)}}class b extends Error{}const ea=new TextEncoder,Kr=new TextDecoder;function xe(t){throw new b(`Component is not writable; use entity.write(${t.type.name}) to acquire a writable version`)}function M(t,e){if(t.__invalid)throw new b(`Component instance for ${e.type.name} is no longer valid, as you already bound it to another entity`)}class N{constructor(e,n=!0){d(this,"defaultValue");d(this,"shared");this.defaultValue=e,this.shared=n}get internallyIndexed(){return!1}}d(N,"boolean"),d(N,"uint8"),d(N,"int8"),d(N,"uint16"),d(N,"int16"),d(N,"uint32"),d(N,"int32"),d(N,"float32"),d(N,"float64"),d(N,"vector"),d(N,"staticString"),d(N,"dynamicString"),d(N,"object"),d(N,"weakObject"),d(N,"ref"),d(N,"backrefs");class Ko extends N{constructor(){super(!1)}defineElastic(e,n){const r=`component.${e.type.id}.field.${n.seq}`;let i;n.updateBuffer=()=>{e.dispatcher.buffers.register(r,e.capacity,Uint8Array,s=>{i=s})},n.updateBuffer(),Object.defineProperty(e.writableMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),!!i[e.writableIndex]},set(s){M(this,e),i[e.writableIndex]=s?1:0}}),Object.defineProperty(e.readonlyMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),!!i[e.readonlyIndex]},set(s){xe(e)}})}defineFixed(e,n){const r=`component.${e.type.id}.field.${n.seq}`,i=e.dispatcher.buffers.register(r,e.capacity,Uint8Array);Object.defineProperty(e.writableMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),!!i[e.writableIndex]},set(s){M(this,e),i[e.writableIndex]=s?1:0}}),Object.defineProperty(e.readonlyMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),!!i[e.readonlyIndex]},set(s){xe(e)}})}}class pn extends N{constructor(n){super(0);d(this,"NumberArray");this.NumberArray=n}defineElastic(n,r){const i=`component.${n.type.id}.field.${r.seq}`;let s;r.updateBuffer=()=>{n.dispatcher.buffers.register(i,n.capacity,this.NumberArray,a=>{s=a})},r.updateBuffer(),Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),s[n.writableIndex]},set(a){M(this,n),s[n.writableIndex]=a}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),s[n.readonlyIndex]},set(a){xe(n)}})}defineFixed(n,r){const i=`component.${n.type.id}.field.${r.seq}`,s=n.dispatcher.buffers.register(i,n.capacity,this.NumberArray);Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),s[n.writableIndex]},set(a){M(this,n),s[n.writableIndex]=a}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),s[n.readonlyIndex]},set(a){xe(n)}})}}class Qo extends N{constructor(n,r,i){super(new Array(typeof r=="number"?r:r.length).fill(0));d(this,"type");d(this,"Class");d(this,"stride");d(this,"elementNames");this.type=n,this.Class=i,typeof r=="number"?this.stride=r:(this.stride=r.length,this.elementNames=r)}get internallyIndexed(){return!0}defineElastic(n,r){var m;const i=this.stride,s=this.elementNames,a=`component.${n.type.id}.field.${r.seq}`;let o,l=0,c=0;r.updateBuffer=()=>{n.dispatcher.buffers.register(a,n.capacity*i,this.type.NumberArray,E=>{o=E})},r.updateBuffer();const u={value:void 0,done:!0,next(){return l<i?(this.done=!1,this.value=o[n.writableIndex*i+l],l+=1):(this.done=!0,this.value=void 0),this}},h={value:void 0,done:!0,next(){return c<i?(this.done=!1,this.value=o[n.readonlyIndex*i+c],c+=1):(this.done=!0,this.value=void 0),this}},_=this.Class?new this.Class:{},p=this.Class?new this.Class:{};Object.defineProperty(_,"length",{value:i}),Object.defineProperty(p,"length",{value:i}),this.Class&&"asTypedArray"in this.Class.prototype||(Object.defineProperty(_,"asTypedArray",{value(){return M(this.__becsyComponent,n),o.subarray(n.writableIndex*i,(n.writableIndex+1)*i)}}),Object.defineProperty(p,"asTypedArray",{value(){return M(this.__becsyComponent,n),o.subarray(n.readonlyIndex*i,(n.readonlyIndex+1)*i)}})),Object.defineProperty(_,Symbol.iterator,{value(){return M(this.__becsyComponent,n),l=0,u}}),Object.defineProperty(p,Symbol.iterator,{value(){return M(this.__becsyComponent,n),c=0,h}}),Object.defineProperty(_,"__becsyComponent",{value:void 0,writable:!0}),Object.defineProperty(p,"__becsyComponent",{value:void 0,writable:!0});let f=Object.create(_);Object.seal(f);let g=Object.create(p);Object.seal(g);for(let E=0;E<this.stride;E++)Object.defineProperty(_,`${E}`,{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.writableIndex*i+E]},set(v){M(this.__becsyComponent,n),o[n.writableIndex*i+E]=v}}),Object.defineProperty(p,`${E}`,{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.readonlyIndex*i+E]},set(v){xe(n)}}),(m=this.elementNames)!=null&&m[E]&&(Object.defineProperty(_,this.elementNames[E],{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.writableIndex*i+E]},set(v){M(this.__becsyComponent,n),o[n.writableIndex*i+E]=v}}),Object.defineProperty(p,this.elementNames[E],{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.readonlyIndex*i+E]},set(v){xe(n)}}));Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),f=Object.create(_),f.__becsyComponent=this,Object.seal(f),f},set(E){if(M(this,n),E.length){if(E.length!==i)throw new b(`Value of length ${E.length} doesn't match vector of length ${i}`);for(let v=0;v<i;v++)o[n.writableIndex*i+v]=E[v]}else{if(!s)throw new b(`Value assigned to ${n.type.name}.${r.name} must be an array`);for(let v=0;v<i;v++){if(typeof E[s[v]]!="number")throw new b(`Value assigned to ${n.type.name}.${r.name} is missing element "${s[v]}`);o[n.writableIndex*i+v]=E[s[v]]}}}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),g=Object.create(p),g.__becsyComponent=this,Object.seal(g),g},set(E){xe(n)}})}defineFixed(n,r){var m;const i=this.stride,s=this.elementNames,a=`component.${n.type.id}.field.${r.seq}`,o=n.dispatcher.buffers.register(a,n.capacity*i,this.type.NumberArray);let l=0,c=0;const u={value:void 0,done:!0,next(){return l<i?(this.done=!1,this.value=o[n.writableIndex*i+l],l+=1):(this.done=!0,this.value=void 0),this}},h={value:void 0,done:!0,next(){return c<i?(this.done=!1,this.value=o[n.readonlyIndex*i+c],c+=1):(this.done=!0,this.value=void 0),this}},_=this.Class?new this.Class:{},p=this.Class?new this.Class:{};Object.defineProperty(_,"length",{value:i}),Object.defineProperty(p,"length",{value:i}),this.Class&&"asTypedArray"in this.Class.prototype||(Object.defineProperty(_,"asTypedArray",{value(){return M(this.__becsyComponent,n),o.subarray(n.writableIndex*i,(n.writableIndex+1)*i)}}),Object.defineProperty(p,"asTypedArray",{value(){return M(this.__becsyComponent,n),o.subarray(n.readonlyIndex*i,(n.readonlyIndex+1)*i)}})),Object.defineProperty(_,Symbol.iterator,{value(){return M(this.__becsyComponent,n),l=0,u}}),Object.defineProperty(p,Symbol.iterator,{value(){return M(this.__becsyComponent,n),c=0,h}}),Object.defineProperty(_,"__becsyComponent",{value:void 0,writable:!0}),Object.defineProperty(p,"__becsyComponent",{value:void 0,writable:!0});let f=Object.create(_);Object.seal(f);let g=Object.create(p);Object.seal(g);for(let E=0;E<this.stride;E++)Object.defineProperty(_,`${E}`,{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.writableIndex*i+E]},set(v){M(this.__becsyComponent,n),o[n.writableIndex*i+E]=v}}),Object.defineProperty(p,`${E}`,{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.readonlyIndex*i+E]},set(v){xe(n)}}),(m=this.elementNames)!=null&&m[E]&&(Object.defineProperty(_,this.elementNames[E],{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.writableIndex*i+E]},set(v){M(this.__becsyComponent,n),o[n.writableIndex*i+E]=v}}),Object.defineProperty(p,this.elementNames[E],{enumerable:!0,get(){return M(this.__becsyComponent,n),o[n.readonlyIndex*i+E]},set(v){xe(n)}}));Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),f=Object.create(_),f.__becsyComponent=this,Object.seal(f),f},set(E){if(M(this,n),E.length){if(E.length!==i)throw new b(`Value of length ${E.length} doesn't match vector of length ${i}`);for(let v=0;v<i;v++)o[n.writableIndex*i+v]=E[v]}else{if(!s)throw new b(`Value assigned to ${n.type.name}.${r.name} must be an array`);for(let v=0;v<i;v++){if(typeof E[s[v]]!="number")throw new b(`Value assigned to ${n.type.name}.${r.name} is missing element "${s[v]}`);o[n.writableIndex*i+v]=E[s[v]]}}}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){return M(this,n),g=Object.create(p),g.__becsyComponent=this,Object.seal(g),g},set(E){xe(n)}})}}class Zo extends N{constructor(n){super(n[0]);d(this,"choices");d(this,"choicesIndex",new Map);d(this,"TypedArray");if(this.choices=n,!(n!=null&&n.length))throw new b("No choices specified for Type.staticString");n.length<256?this.TypedArray=Uint8Array:n.length<65536?this.TypedArray=Uint16Array:this.TypedArray=Uint32Array;for(let r=0;r<n.length;r++)this.choicesIndex.set(n[r],r)}defineElastic(n,r){const i=`component.${n.type.id}.field.${r.seq}`;let s;const a=this.choices,o=this.choicesIndex;r.updateBuffer=()=>{n.dispatcher.buffers.register(i,n.capacity,this.TypedArray,l=>{s=l})},r.updateBuffer(),Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const l=s[n.writableIndex],c=a[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){M(this,n);const c=o.get(l);if(c===void 0)throw new b(`Static string not in set: "${l}"`);s[n.writableIndex]=c}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const l=s[n.readonlyIndex],c=a[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){xe(n)}})}defineFixed(n,r){const i=`component.${n.type.id}.field.${r.seq}`,s=this.choices,a=this.choicesIndex,o=n.dispatcher.buffers.register(i,n.capacity,this.TypedArray);Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const l=o[n.writableIndex],c=s[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){M(this,n);const c=a.get(l);if(c===void 0)throw new b(`Static string not in set: "${l}"`);o[n.writableIndex]=c}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const l=o[n.readonlyIndex],c=s[l];if(c===void 0)throw new b(`Invalid static string index: ${l}`);return c},set(l){xe(n)}})}}class Go extends N{constructor(n){super("");d(this,"maxUtf8Length");d(this,"lengthsStride");d(this,"bytesStride");this.maxUtf8Length=n+n%2,this.bytesStride=this.maxUtf8Length+2,this.lengthsStride=this.bytesStride/2}defineElastic(n,r){const i=`component.${n.type.id}.field.${r.seq}`;let s,a;const o=this.maxUtf8Length,l=this.lengthsStride,c=this.bytesStride;r.updateBuffer=()=>{const u=n.capacity*(this.maxUtf8Length+Uint16Array.BYTES_PER_ELEMENT);n.dispatcher.buffers.register(i,u,Uint8Array,h=>{a=h,s=new Uint16Array(a.buffer)})},r.updateBuffer(),Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const u=s[n.writableIndex*l];return Kr.decode(new Uint8Array(a.buffer,n.writableIndex*c+2,u))},set(u){M(this,n);const h=ea.encode(u);if(h.byteLength>o)throw new b(`Dynamic string length > ${o} after encoding: ${u}`);s[n.writableIndex*l]=h.byteLength,a.set(h,n.writableIndex*c+2)}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const u=s[n.readonlyIndex*l];return Kr.decode(new Uint8Array(a.buffer,n.readonlyIndex*c+2,u))},set(u){xe(n)}})}defineFixed(n,r){const i=`component.${n.type.id}.field.${r.seq}`,s=this.maxUtf8Length,a=this.lengthsStride,o=this.bytesStride,l=n.capacity*(this.maxUtf8Length+Uint16Array.BYTES_PER_ELEMENT),c=n.dispatcher.buffers.register(i,l,Uint8Array),u=new Uint16Array(c.buffer);Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const h=u[n.writableIndex*a];return Kr.decode(new Uint8Array(c.buffer,n.writableIndex*o+2,h))},set(h){M(this,n);const _=ea.encode(h);if(_.byteLength>s)throw new b(`Dynamic string length > ${s} after encoding: ${h}`);u[n.writableIndex*a]=_.byteLength,c.set(_,n.writableIndex*o+2)}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const h=u[n.readonlyIndex*a];return Kr.decode(new Uint8Array(c.buffer,n.readonlyIndex*o+2,h))},set(h){xe(n)}})}}const Ot=2**31;class Jo extends N{constructor(){super(void 0)}defineElastic(e,n){const r=`component.${e.type.id}.field.${n.seq}`;let i;const s=e.dispatcher.indexer,a=e.dispatcher.registry,o=a.pool;s.registerSelector(),n.updateBuffer=()=>{e.dispatcher.buffers.register(r,e.capacity,Int32Array,l=>{i=l},-1)},n.updateBuffer(),n.clearRef=(l,c,u)=>{if(u)throw new F("Ref fields have no internal index");if(i[e.writableIndex]===-1)return;const h=(i[e.writableIndex]&Ot)!==0;if(h&&!l)return;if(!h&&l)throw new F("Wrong ref stale state");const _=i[e.writableIndex]&at;c!==void 0&&_!==c||(l?i[e.writableIndex]=-1:i[e.writableIndex]|=Ot,s.trackRefChange(e.writableEntityId,e.type,n.seq,void 0,_,-1,!l,l))},Object.defineProperty(e.writableMaster,n.name,{enumerable:!0,configurable:!0,get(){M(this,e);const l=i[e.writableIndex];if(!(l===-1||l&Ot&&!a.includeRecentlyDeleted))return o.borrowTemporarily(l&at)},set(l){if(M(this,e),l&&!a.hasShape(l.__id,a.Alive,!1))throw new b("Referencing a deleted entity is not allowed");let c=i[e.writableIndex];c!==-1&&(c=c&at);const u=c!==-1&&!!(i[e.writableIndex]&Ot),h=(l==null?void 0:l.__id)??-1;c===h&&!u||(i[e.writableIndex]=h,s.trackRefChange(e.writableEntityId,e.type,n.seq,void 0,c,h,!u,!0))}}),Object.defineProperty(e.readonlyMaster,n.name,{enumerable:!0,configurable:!0,get(){M(this,e);const l=i[e.readonlyIndex];if(!(l===-1||l&Ot&&!a.includeRecentlyDeleted))return o.borrowTemporarily(l&at)},set(l){xe(e)}})}defineFixed(e,n){const r=`component.${e.type.id}.field.${n.seq}`,i=e.dispatcher.buffers.register(r,e.capacity,Int32Array,void 0,-1),s=e.dispatcher.indexer,a=e.dispatcher.registry,o=a.pool;s.registerSelector(),n.clearRef=(l,c,u)=>{if(u)throw new F("Ref fields have no internal index");if(i[e.writableIndex]===-1)return;const h=(i[e.writableIndex]&Ot)!==0;if(h&&!l)return;if(!h&&l)throw new F("Wrong ref stale state");const _=i[e.writableIndex]&at;c!==void 0&&_!==c||(l?i[e.writableIndex]=-1:i[e.writableIndex]|=Ot,s.trackRefChange(e.writableEntityId,e.type,n.seq,void 0,_,-1,!l,l))},Object.defineProperty(e.writableMaster,n.name,{enumerable:!0,configurable:!0,get(){M(this,e);const l=i[e.writableIndex];if(!(l===-1||l&Ot&&!a.includeRecentlyDeleted))return o.borrowTemporarily(l&at)},set(l){if(M(this,e),l&&!a.hasShape(l.__id,a.Alive,!1))throw new b("Referencing a deleted entity is not allowed");let c=i[e.writableIndex];c!==-1&&(c=c&at);const u=c!==-1&&!!(i[e.writableIndex]&Ot),h=(l==null?void 0:l.__id)??-1;c===h&&!u||(i[e.writableIndex]=h,s.trackRefChange(e.writableEntityId,e.type,n.seq,void 0,c,h,!u,!0))}}),Object.defineProperty(e.readonlyMaster,n.name,{enumerable:!0,configurable:!0,get(){M(this,e);const l=i[e.readonlyIndex];if(!(l===-1||l&Ot&&!a.includeRecentlyDeleted))return o.borrowTemporarily(l&at)},set(l){xe(e)}})}}const qn=[];class el extends N{constructor(n,r,i){super(qn);d(this,"type");d(this,"fieldName");d(this,"trackDeletedBackrefs");this.type=n,this.fieldName=r,this.trackDeletedBackrefs=i}defineElastic(n,r){var l;r.updateBuffer=()=>{};const i=this.fieldName?(l=this.type)==null?void 0:l.__binding.fields.find(c=>c.name===this.fieldName):void 0;{if(this.fieldName&&!i)throw new b(`Backrefs field ${n.type.name}.${r.name} refers to an unknown field ${this.type.name}.${this.fieldName}`);if(i&&i.type!==N.ref)throw new b(`Backrefs field ${n.type.name}.${r.name} refers to a field ${this.type.name}.${this.fieldName} that is not a ref`);if(this.fieldName&&!this.type)throw new b(`Backrefs selector has field but no component in ${n.type.name}.${r.name}`);if(this.type&&!this.fieldName&&!this.type.__binding.refFields.length)throw new b(`Backrefs field ${n.type.name}.${r.name} refers to component ${this.type.name} that has no ref fields`)}const s=this.trackDeletedBackrefs,a=n.dispatcher.indexer;a.registerSelector();const o=a.registerSelector(n.type,this.type,i==null?void 0:i.seq,this.trackDeletedBackrefs);Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){if(M(this,n),!s&&n.dispatcher.registry.includeRecentlyDeleted)throw new b(`Backrefs field ${n.type.name}.${r.name} not configured to track recently deleted refs`);return a.getBackrefs(n.writableEntityId,o)},set(c){if(M(this,n),c!==qn)throw new b("Backrefs properties are computed automatically, you cannot set them")}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){if(M(this,n),!s&&n.dispatcher.registry.includeRecentlyDeleted)throw new b(`Backrefs field ${n.type.name}.${r.name} not configured to track recently deleted refs`);return a.getBackrefs(n.readonlyEntityId,o)},set(c){if(M(this,n),c!==qn)throw new b("Backrefs properties are computed automatically, you cannot set them")}})}defineFixed(n,r){this.defineElastic(n,r)}}class tl extends N{constructor(){super(void 0,!1)}defineElastic(e,n){const r=[];n.updateBuffer=()=>{},Object.defineProperty(e.writableMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),r[e.writableIndex]},set(i){M(this,e),r[e.writableIndex]=i}}),Object.defineProperty(e.readonlyMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),r[e.readonlyIndex]},set(i){xe(e)}})}defineFixed(e,n){const r=new Array(e.capacity);n.updateBuffer=()=>{},Object.defineProperty(e.writableMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),r[e.writableIndex]},set(i){M(this,e),r[e.writableIndex]=i}}),Object.defineProperty(e.readonlyMaster,n.name,{enumerable:!0,configurable:!0,get(){return M(this,e),r[e.readonlyIndex]},set(i){xe(e)}})}}class nl extends N{constructor(){super(void 0,!1);d(this,"finalizers")}defineElastic(n,r){const i=[];r.updateBuffer=()=>{};const s=this.initFinalizers(n);Object.defineProperty(n.writableMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const a=i[n.writableIndex];return a==null?a:a.deref()},set(a){if(M(this,n),a!=null){const o=new WeakRef(a);s==null||s.register(a,{type:n.type,data:i,weakRef:o,id:n.writableEntityId,index:n.writableIndex}),a=o}i[n.writableIndex]=a}}),Object.defineProperty(n.readonlyMaster,r.name,{enumerable:!0,configurable:!0,get(){M(this,n);const a=i[n.readonlyIndex];return a==null?a:a.deref()},set(a){xe(n)}})}defineFixed(n,r){this.defineElastic(n,r)}initFinalizers(n){if(!n.trackedWrites)return;if(this.finalizers)return this.finalizers;const r=n.dispatcher;if(!(!r.writeLog||typeof FinalizationRegistry>"u"))return this.finalizers=new FinalizationRegistry(({type:i,data:s,weakRef:a,id:o,index:l})=>{s[l]===a&&r.registry.trackWrite(o,i)}),this.finalizers}}N.boolean=new Ko;N.uint8=new pn(Uint8Array);N.int8=new pn(Int8Array);N.uint16=new pn(Uint16Array);N.int16=new pn(Int16Array);N.uint32=new pn(Uint32Array);N.int32=new pn(Int32Array);N.float32=new pn(Float32Array);N.float64=new pn(Float64Array);N.vector=(t,e,n)=>new Qo(t,e,n);N.staticString=t=>new Zo(t);N.dynamicString=t=>new Go(t);N.ref=new Jo;N.backrefs=(t,e,n=!1)=>new el(t,e,n);N.object=new tl;N.weakObject=new nl;class rl{constructor(e,n,r,i,s,a,o){d(this,"type");d(this,"fields");d(this,"dispatcher");d(this,"capacity");d(this,"storage");d(this,"elastic");this.type=e,this.fields=n,this.dispatcher=i,this.capacity=s,this.storage=a,this.elastic=o,this.readonlyMaster=this.readonlyInstance=new e,this.writableMaster=this.writableInstance=new e,this.readonlyInstance=Object.create(this.readonlyMaster),this.readonlyInstance.__invalid=!this.elastic&&this.capacity>1,this.writableInstance=Object.create(this.writableMaster),this.writableInstance.__invalid=!this.elastic&&this.capacity>1,this.shapeOffset=r.offset,this.shapeMask=r.mask,this.shapeValue=r.value,this.refFields=n.filter(c=>c.type===N.ref),this.trackedWrites=!1,this.writableEntityId=0,this.writableIndex=0,this.readonlyEntityId=0,this.readonlyIndex=0,this.initDefault=new Function("component",n.filter(c=>c.default!==qn).map(c=>`component.${c.name} = ${JSON.stringify(c.default)};`).join(`
`));let l=[];l=n.filter(c=>c.default===qn).map(c=>`
          if (${JSON.stringify(c.name)} in values) {
            component.${c.name} = values.${c.name};
          }
        `),this.init=new Function("component","values",n.filter(c=>c.default!==qn).map(c=>`
          component.${c.name} = values.${c.name} === undefined ?
            ${JSON.stringify(c.default)} : values.${c.name};
        `).concat(l).join(`
`))}resetWritableInstance(e,n){if(n===-1)throw new F(`Attempt to bind unacquired entity ${e} to ${this.type.name}`);return this.writableEntityId=e,this.writableIndex=n,(this.elastic||this.capacity>1)&&(this.writableInstance.__invalid=!0,this.writableInstance=Object.create(this.writableMaster)),this.writableInstance}resetReadonlyInstance(e,n){if(n===-1)throw new F(`Attempt to bind unacquired entity ${e} to ${this.type.name}`);return this.readonlyEntityId=e,this.readonlyIndex=n,(this.elastic||this.capacity>1)&&(this.readonlyInstance.__invalid=!0,this.readonlyInstance=Object.create(this.readonlyMaster)),this.readonlyInstance}}function On(t){if(!t.__binding)throw new b(`Component ${t.name} not defined; add to world defs`)}class il{constructor(e,n,r){d(this,"maxEntities");d(this,"binding");d(this,"fields");this.maxEntities=e,this.binding=n,this.fields=r,this.growSpares(),this.growCapacity()}acquireIndex(e){let n=this.index[e];if(n===-1){if(this.spares[3]>0)n=this.spares[--this.spares[3]+4];else{if(this.spares[1]===this.spares[2]){if(!this.binding.elastic)throw new b(`Storage exhausted for component ${this.binding.type.name}; raise its capacity above ${this.binding.capacity}`);if(this.binding.capacity===this.maxEntities)throw new F(`Trying to grow storage index for component ${this.binding.type.name} beyond maxEntities`);this.binding.capacity=Math.min(this.maxEntities,this.binding.capacity*2),this.growCapacity()}n=this.spares[1]++}this.index[e]=n}return n}releaseIndex(e){if(this.index[e]===-1)throw new F(`Index for entity ${e} in component ${this.binding.type.name} not allocated`);this.spares[3]===this.spares.length-4&&this.growSpares(),this.spares[this.spares[3]+++4]=this.index[e],this.index[e]=-1}growCapacity(){var i;const e=this.binding.capacity;this.binding.dispatcher.stats.forComponent(this.binding.type).capacity=e;const n=this.ArrayType,r=n.BYTES_PER_ELEMENT!==((i=this.spares)==null?void 0:i[0]);if((!this.index||r)&&this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.index`,this.maxEntities,n,s=>{this.index=s},-1),r?this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.spares`,this.spares.length,n,this.updateSpares.bind(this)):this.spares[2]=e,this.binding.elastic)for(const s of this.fields)s.updateBuffer()}growSpares(){const e=this.spares?Math.min(this.maxEntities,(this.spares.length-4)*2):8;this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.spares`,4+e,this.ArrayType,this.updateSpares.bind(this))}updateSpares(e){e[2]=this.binding.capacity=Math.max(this.binding.capacity,e[2]),e[0]=this.ArrayType.BYTES_PER_ELEMENT,this.spares=e}get ArrayType(){var n;const e=Math.max(((n=this.spares)==null?void 0:n[2])??0,this.binding.capacity);return e<128?Int8Array:e<32768?Int16Array:Int32Array}}class sl{constructor(e,n,r){d(this,"maxEntities");d(this,"binding");d(this,"fields");this.maxEntities=e,this.binding=n,this.fields=r,this.growCapacity()}findIndex(e){for(let n=0;n<this.index.length;n++)if(this.index[n]===e)return n;return-1}acquireIndex(e){let n;for(let r=0;r<this.index.length;r++){if(this.index[r]===e)return r;n===void 0&&this.index[r]===-1&&(n=r)}if(n===void 0){if(!this.binding.elastic)throw new b(`Storage exhausted for component ${this.binding.type.name}; raise its capacity above ${this.binding.capacity}`);if(this.binding.capacity===this.maxEntities)throw new F(`Trying to grow storage index for component ${this.binding.type.name} beyond maxEntities`);n=this.index.length,this.binding.capacity=Math.min(this.maxEntities,this.binding.capacity*2),this.growCapacity()}return this.index[n]=e,n}releaseIndex(e){for(let n=0;n<this.index.length;n++)if(this.index[n]===e){this.index[n]=-1;return}throw new F(`Index for entity ${e} in component ${this.binding.type.name} not allocated`)}growCapacity(){const e=this.binding.capacity;if(this.binding.dispatcher.stats.forComponent(this.binding.type).capacity=e,this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.index`,e,Int32Array,this.updateIndex.bind(this),-1),this.binding.elastic)for(const n of this.fields)n.updateBuffer()}updateIndex(e){this.index=e,this.binding.capacity=this.index.length}}function Ja(t,e,n){var i;if(On(t),n!==void 0){for(const s in n)if(!((i=t.schema)!=null&&i[s]))throw new b(`Property ${s} not defined for component ${t.name}`)}const r=t.__allocate(e);n?t.__binding.init(r,n):t.__binding.initDefault(r)}function al(t){const e=t.schema,n=[];if(e){let r=0;for(const i in e){let s=e[i];(s instanceof N||typeof s=="function")&&(s={type:s}),typeof s.type=="function"&&(s.type=s.type()),"default"in s||(s.default=s.type.defaultValue),n.push({name:i,seq:r++,type:s.type,default:s.default})}if(r>Ss)throw new b(`Component ${t.name} declares too many fields`)}return n}function ta(t,e,n,r){var c,u,h,_,p;const i=al(e),s=i.length?((c=e.options)==null?void 0:c.storage)??r.defaultComponentStorage:"sparse",a=s==="sparse"?r.maxEntities:Math.min(r.maxEntities,((u=e.options)==null?void 0:u.capacity)??0),o=((h=e.options)==null?void 0:h.initialCapacity)??8;{if(typeof((_=e.options)==null?void 0:_.capacity)<"u"){if(s==="sparse")throw new b(`Component type ${e.name} cannot combine custom capacity with sparse storage`);if(e.options.capacity<=0)throw new b(`Component type ${e.name} capacity option must be great than zero: got ${a}`);if(typeof e.options.initialCapacity<"u")throw new b(`Component type ${e.name} cannot have both capacity and initialCapacity options`)}if((p=e.options)!=null&&p.restrictedToMainThread&&i.every(f=>f.type.shared))throw new b(`Component type ${e.name} is restrictedToMainThread but has no thread-exclusive fields`);if((typeof process>"u"||!0)&&e.__bind)throw new b(`Component type ${e.name} is already in use in another world`)}e.id=t;const l=new rl(e,i,n,r,a||o,s,!a);e.__binding=l}function ol(t){const e=t.__binding;for(const n of e.fields)e.elastic?n.type.defineElastic(e,n):n.type.defineFixed(e,n);switch(e.storage){case"sparse":e.dispatcher.stats.forComponent(t).capacity=e.capacity,t.__bind=(n,r)=>r?e.resetWritableInstance(n,n):e.resetReadonlyInstance(n,n),t.__allocate=n=>e.resetWritableInstance(n,n);break;case"packed":{const n=new il(e.dispatcher.maxEntities,e,e.fields);t.__bind=(r,i)=>i?e.resetWritableInstance(r,n.index[r]):e.resetReadonlyInstance(r,n.index[r]),t.__allocate=r=>e.resetWritableInstance(r,n.acquireIndex(r)),t.__free=r=>{n.releaseIndex(r)};break}case"compact":{const n=new sl(e.dispatcher.maxEntities,e,e.fields);t.__bind=(r,i)=>i?e.resetWritableInstance(r,n.findIndex(r)):e.resetReadonlyInstance(r,n.findIndex(r)),t.__allocate=r=>e.resetWritableInstance(r,n.acquireIndex(r)),t.__free=r=>{n.releaseIndex(r)};break}default:throw new b(`Invalid storage type "${e.storage}`)}}function ll(t){delete t.id,delete t.__binding,delete t.__bind,delete t.__allocate,delete t.__free}function na(t){t.options||(t.options={});{if(t.options.storage&&t.options.storage!=="compact")throw new b(`Component ${t.name} ${t.options.storage} storage is incompatible with singletons`);if(t.options.capacity&&t.options.capacity!==1)throw new b(`Component ${t.name} capacity of ${t.options.capacity} is incompatible with singletons`);if(t.options.initialCapacity)throw new b(`Component ${t.name} initial capacity of ${t.options.initialCapacity} is incompatible with singletons`)}t.options.storage="compact",t.options.capacity=1}class eo{constructor(e){d(this,"__registry");this.__registry=e,this.__id=void 0,this.__sortKey=void 0,this.__valid=!0}get alive(){return this.__checkValid(),this.__registry.hasShape(this.__id,this.__registry.Alive,!1)}get ordinal(){return this.__registry.entityOrdinals[this.__id]}add(e,n){{if(this.__checkValid(),this.__checkMask(e,"write"),!this.__registry.hasShape(this.__id,this.__registry.Alive,!1))throw new b("Entity has been deleted");if(this.__registry.hasShape(this.__id,e,!1))throw new b(`Entity already has a ${e.name} component`)}this.__registry.setShape(this.__id,e),this.__registry.dispatcher.stats.forComponent(e).numEntities+=1,Ja(e,this.__id,n)}addAll(...e){this.__checkValid();{const n=new Set;for(const r of e)if(typeof r=="function"&&r.enum){if(n.has(r.enum))throw new b("Can't add multiple components from the same enum");n.add(r.enum)}}for(let n=0;n<e.length;n++){const r=e[n];if(typeof r!="function")throw new b(`Bad arguments to addAll: expected component type, got: ${r}`);let i=e[n+1];typeof i=="function"?i=void 0:n++,this.add(r,i)}}remove(e){if(this.__checkValid(),this.__checkMask(e,"write"),typeof e=="function"&&this.__checkHas(e,!1),typeof e!="function"){const n=this.__registry.getEnumShape(this.__id,e,!1);if(!n)throw new b(`Entity doesn't have any components from ${e.name} enumeration`);e=n}this.__registry.clearShape(this.__id,e)}removeAll(...e){for(const n of e)this.remove(n)}has(e){return this.__checkValid(),this.__checkMask(e,"check"),typeof e=="function"?this.__registry.hasShape(this.__id,e,!0):!!this.__registry.getEnumShape(this.__id,e,!0)}hasSomeOf(...e){this.__checkValid();for(const n of e)if(this.has(n))return!0;return!1}hasAllOf(...e){this.__checkValid();for(const n of e)if(!this.has(n))return!1;return!0}hasAnyOtherThan(...e){this.__checkValid();const n=new Set(e);for(const r of this.__registry.types)if(this.__checkMask(r,"check"),!(n.has(r)||r.enum&&n.has(r.enum))&&this.__registry.hasShape(this.__id,r,!0))return!0;return!1}countHas(...e){this.__checkValid();let n=0;for(const r of e)this.has(r)&&(n+=1);return n}hasWhich(e){return this.__checkValid(),this.__checkMask(e,"check"),this.__registry.getEnumShape(this.__id,e,!0)}read(e){return this.__checkValid(),this.__checkMask(e,"read"),this.__checkHas(e,!0),e.__bind(this.__id,!1)}write(e){return this.__checkValid(),this.__checkMask(e,"write"),this.__checkHas(e,!0),e.__binding.trackedWrites&&this.__registry.trackWrite(this.__id,e),e.__bind(this.__id,!0)}delete(){this.__checkValid();const e=this.__registry.Alive;if(!this.__registry.hasShape(this.__id,e,!1))throw new b("Entity already deleted");for(const n of this.__registry.types)this.__registry.hasShape(this.__id,n,!1)&&(n!==e&&this.__checkMask(n,"write"),this.__registry.clearShape(this.__id,n));this.__registry.dispatcher.indexer.clearAllRefs(this.__id,!1)}hold(){return this.__checkValid(),this.__registry.holdEntity(this.__id)}isSame(e){return this.__checkValid(),this.__id===e.__id}__checkMask(e,n){ds(e,this.__registry.executingSystem,n)}__checkHas(e,n){if(!this.__registry.hasShape(this.__id,e,n))throw new b(`Entity doesn't have a ${e.name} component`)}__checkValid(){if(!this.__valid)throw new b("Entity handle no longer valid")}}function ds(t,e,n){On(t);const r=e==null?void 0:e.accessMasks[n];if(!r)return;const i=t.__binding;if(!((r[i.shapeOffset]??0)&i.shapeMask))throw new b(`System ${e.name} didn't mark component ${t.name} as ${n}able`)}function Ji(t,e){const n=e.__binding;return((t[n.shapeOffset]??0)&n.shapeMask)!==0}function ti(t,e,n=!1){On(e);const r=e.__binding.shapeOffset;if(r>=t.length){const i=t.length;t.length=r+1,t.fill(0,i,r)}t[r]|=n?e.__binding.shapeValue:e.__binding.shapeMask}const _e=2,ra=[];class fi{constructor(e,n,r,i={localProcessingAllowed:!1,sortedByComponentType:!1,numComponentTypes:0}){d(this,"maxEntries");d(this,"configParamName");d(this,"options");d(this,"data");d(this,"corral");d(this,"staging");d(this,"typeCounters");if(this.maxEntries=e,this.configParamName=n,this.options=i,r.register(`log.${n}.buffer`,e+_e,Uint32Array,s=>{this.data=s}),r.register(`log.${n}.corral`,e+_e,Uint32Array,s=>{this.corral=s}),i.sortedByComponentType){if(i.numComponentTypes===void 0)throw new F(`numComponentTypes required when ${this.configParamName} is sortedByComponentType`);r.register(`log.${n}.staging`,e+_e,Uint32Array,s=>{this.staging=s}),this.typeCounters=new Uint32Array(this.options.numComponentTypes)}}push(e,n){const r=this.corral[0];if(r>=this.maxEntries&&this.throwCapacityExceeded(),!(r&&this.corral[r]===e)){if(this.corral[r+_e]=e,this.corral[0]+=1,!!n!=!!this.options.sortedByComponentType)throw new F(`Pushing value ${n?"with":"without"} type to log ${this.configParamName} ${this.options.sortedByComponentType?"":"not "}sorted by component type`);n&&(this.typeCounters[n.id]+=1)}}commit(e){if(!e&&this.options.localProcessingAllowed)throw new F(`Cannot use blind commit when local processing is allowed in log ${this.configParamName}`);return this.corral[0]?e&&!(e.generation===this.data[1]&&e.index===this.data[0]&&e.corralGeneration===this.corral[1]&&e.corralIndex===this.corral[0])?!1:(this.copyToData(this.staging?this.sortCorral():this.corral),this.corral[0]=0,this.corral[1]+=1,e&&(e.index=this.data[0],e.generation=this.data[1]),!0):!0}sortCorral(){let e=_e,n=-1,r=0,i=0;for(let a=0;a<this.typeCounters.length;a++){const o=this.typeCounters[a];o&&(i+=1,n===-1?(n=a,r=o):n>=0&&(n=-2),o===1?(this.typeCounters[a]=e,e+=1):(this.typeCounters[a]=e+1,this.staging[e]=o|a<<Pe|2**31,e+=o+1))}if(n>=0)return r>1&&(this.corral[0]===this.maxEntries&&this.throwCapacityExceeded(),this.corral[this.corral[0]+_e]=this.corral[_e],this.corral[_e]=this.corral[0]|n<<Pe|2**31,this.corral[0]+=1),this.typeCounters.fill(0),this.corral;this.corral[0]+i>this.maxEntries&&this.throwCapacityExceeded();const s=this.corral[0]+_e;for(let a=_e;a<s;a++){const o=this.corral[a],l=o>>>Pe;this.staging[this.typeCounters[l]++]=o}return this.staging[0]=e-_e,this.typeCounters.fill(0),this.staging}copyToData(e){let n=this.data[0];const r=e[0],i=Math.min(r,this.maxEntries-n);for(this.data.set(e.subarray(_e,i+_e),n+_e),i<r&&this.data.set(e.subarray(i+_e,r+_e),_e),n+=r;n>=this.maxEntries;)n-=this.maxEntries,this.data[1]+=1;this.data[0]=n}createPointer(e){return e?(e.index=this.data[0],e.generation=this.data[1],e.corralIndex=this.corral[0],e.corralGeneration=this.corral[1],e):{index:this.data[0],generation:this.data[1],corralIndex:this.corral[0],corralGeneration:this.corral[1]}}copyPointer(e){return{index:e.index,generation:e.generation,corralIndex:e.corralIndex,corralGeneration:e.corralGeneration}}hasUpdatesSince(e){return this.checkPointer(e),!(e.index===this.data[0]&&e.generation===this.data[1]&&(e.corralGeneration===this.corral[1]?e.corralIndex===this.corral[0]:this.corral[0]===0))}processSince(e,n){this.checkPointers(e,n);let r=ra;const i=(n==null?void 0:n.index)??this.data[0],s=(n==null?void 0:n.generation)??this.data[1];if(e.generation===s)if(e.index<i)r=[this.data,e.index+_e,i+_e,!1],e.index=i;else{const a=this.corral[0],o=this.corral[1];(e.corralGeneration===o?e.corralIndex<a:a)&&(r=[this.corral,e.corralIndex+_e,a+_e,!0],e.corralIndex=a,e.corralGeneration=o)}else r=[this.data,e.index+_e,this.data.length,!1],e.index=0,e.generation=s;return r}processAndCommitSince(e){const n=this.processSince(e);return n[0]?n:this.commit(e)?ra:this.processSince(e)}countSince(e,n){if(this.checkPointers(e,n),this.corral[0])throw new F(`Should commit log ${this.configParamName} before counting`);const r=e.index,i=e.generation,s=(n==null?void 0:n.index)??this.data[0],a=(n==null?void 0:n.generation)??this.data[1];return e.index=s,e.generation=a,r===s&&i===a?0:r<s?s-r:this.maxEntries-(r-s)}checkPointers(e,n){if(this.checkPointer(e),n&&(this.checkPointer(n),e.index>n.index&&e.generation>=n.generation))throw new F(`Start pointer exceeds end pointer in log ${this.configParamName}`)}checkPointer(e){const n=this.data[0];let r=e.generation;e.index===n?r+1<this.data[1]&&this.throwCapacityExceeded():(e.index>n&&(r+=1),r!==this.data[1]&&this.throwCapacityExceeded());{if(e.corralGeneration>this.corral[1])throw new F(`Pointer corral generation older than corral in log ${this.configParamName}`);if(e.corralGeneration===this.corral[1]&&e.corralIndex>this.corral[0])throw new F(`Pointer past end of corral area in log ${this.configParamName}`)}}throwCapacityExceeded(){throw new b(`Log capacity exceeded, please raise ${this.configParamName} above ${this.maxEntries}`)}}class es{constructor(e){d(this,"size");d(this,"bytes");this.size=e,this.bytes=new Uint32Array(Math.ceil(e/32))}get(e){if(e<0||e>=this.size)throw new F(`Bit index out of bounds: ${e}`);return(this.bytes[e>>>5]&1<<(e&31))!==0}set(e){if(e<0||e>=this.size)throw new F(`Bit index out of bounds: ${e}`);this.bytes[e>>>5]|=1<<(e&31)}unset(e){if(e<0||e>=this.size)throw new F(`Bit index out of bounds: ${e}`);this.bytes[e>>>5]&=~(1<<(e&31))}clear(){this.bytes.fill(0)}}class cl{constructor(e,n){d(this,"pool");d(this,"orderBy");d(this,"entities",[]);d(this,"maxOrderKey",-1/0);d(this,"sorted",!0);this.pool=e,this.orderBy=n}add(e){const n=this.pool.borrowTemporarily(e);if(this.orderBy){const r=this.orderBy(n);r>=this.maxOrderKey?this.maxOrderKey=r:this.sorted=!1}this.entities.push(n)}clear(){this.entities.length&&(this.entities.length=0),this.maxOrderKey=-1/0,this.sorted=!0}sort(){if(this.sorted)return;const e=this.orderBy;for(const n of this.entities)n.__sortKey=e(n);this.entities.sort((n,r)=>n.__sortKey<r.__sortKey?-1:n.__sortKey>r.__sortKey?1:0),this.sorted=!0}}class ul{constructor(e,n,r){d(this,"pool");d(this,"orderBy");d(this,"entities",[]);d(this,"lookupTable");d(this,"maxOrderKey",-1/0);d(this,"sorted",!0);this.pool=e,this.orderBy=n,this.lookupTable=new Int32Array(r),this.lookupTable.fill(-1)}add(e){const n=this.pool.borrow(e);if(this.orderBy){const i=this.orderBy(n);i>=this.maxOrderKey?this.maxOrderKey=i:this.sorted=!1}const r=this.entities.push(n)-1;this.lookupTable[e]=r}remove(e){const n=this.lookupTable[e];if(n<0)throw new F("Entity not in list");this.pool.return(e),this.lookupTable[e]=-1;const r=this.entities.pop();n<this.entities.length&&(this.entities[n]=r,this.lookupTable[r.__id]=n,this.orderBy&&(this.sorted=!1))}has(e){return this.lookupTable[e]>=0}clear(){for(const e of this.entities)this.pool.return(e.__id);this.entities=[],this.lookupTable.fill(-1),this.maxOrderKey=-1/0,this.sorted=!0}sort(){if(this.sorted)return;const e=this.orderBy;for(const n of this.entities)n.__sortKey=e(n);this.entities.sort((n,r)=>n.__sortKey<r.__sortKey?-1:n.__sortKey>r.__sortKey?1:0);for(let n=0;n<this.entities.length;n++)this.lookupTable[this.entities[n].__id]=n;this.sorted=!0}}var G;(function(t){t[t.current=1]="current",t[t.added=2]="added",t[t.removed=4]="removed",t[t.changed=8]="changed",t[t.addedOrChanged=16]="addedOrChanged",t[t.changedOrRemoved=32]="changedOrRemoved",t[t.addedChangedOrRemoved=64]="addedChangedOrRemoved"})(G||(G={}));const hl=G.added|G.removed|G.changed|G.addedOrChanged|G.changedOrRemoved|G.addedChangedOrRemoved,_l=G.changed|G.addedOrChanged|G.changedOrRemoved|G.addedChangedOrRemoved,dl=G.added|G.removed|G.addedOrChanged|G.changedOrRemoved|G.addedChangedOrRemoved;class fl{constructor(e,n){d(this,"system");d(this,"results",{});d(this,"flavors",0);d(this,"withMask");d(this,"withValues");d(this,"withAnyRecords");d(this,"withoutMask");d(this,"withoutEnumTypes");d(this,"trackWritesMask");d(this,"orderBy");d(this,"hasTransientResults");d(this,"hasChangedResults");d(this,"hasShapeResults");d(this,"hasMatchTracking");d(this,"currentEntities");d(this,"processedEntities");d(this,"changedEntities");this.system=n,e.__results=this.results,e.__systemName=n.name}complete(){var n,r;const e=this.system.dispatcher;this.hasTransientResults=!!(this.flavors&hl),this.hasChangedResults=!!(this.flavors&_l),this.hasShapeResults=!!(this.flavors&dl),this.hasMatchTracking=!!((n=this.withAnyRecords)!=null&&n.some(i=>i.lastMatches));{if(this.withMask&&this.withoutMask){const s=Math.min(this.withMask.length,this.withoutMask.length);for(let a=0;a<s;a++)if(this.withMask[a]&this.withoutMask[a])throw new b("Query must not list a component type in both `with` and `without` clauses")}if(this.withAnyRecords&&this.withoutMask)for(const{mask:s}of this.withAnyRecords){const a=Math.min(s.length,this.withoutMask.length);for(let o=0;o<a;o++)if(s[o]&this.withoutMask[o])throw new b("Query must not list a component type in both `withAny` and `without` clauses")}const i=!!this.trackWritesMask||((r=this.withAnyRecords)==null?void 0:r.some(s=>s.lastMatches));if(this.hasChangedResults&&!i)throw new b("Query for changed entities must track at least one component");if(!this.hasChangedResults&&i)throw new b("You can only track components if you have a query for changed entities")}this.flavors&G.current?this.results.current=new ul(e.registry.pool,this.orderBy,e.maxEntities):this.currentEntities=new es(e.maxEntities),this.processedEntities=new es(e.maxEntities),this.hasTransientResults&&this.allocateTransientResultLists(),this.flavors&&this.system.shapeQueries.push(this),this.hasChangedResults&&(this.changedEntities=new es(e.maxEntities),this.system.writeQueries.push(this))}allocateTransientResultLists(){this.flavors&G.added&&this.allocateResult("added"),this.flavors&G.removed&&this.allocateResult("removed"),this.flavors&G.changed&&this.allocateResult("changed"),this.flavors&G.addedOrChanged&&this.allocateResult("addedOrChanged"),this.flavors&G.changedOrRemoved&&this.allocateResult("changedOrRemoved"),this.flavors&G.addedChangedOrRemoved&&this.allocateResult("addedChangedOrRemoved")}allocateResult(e){const n=this.system.dispatcher;this.results[e]=new cl(n.registry.pool,this.orderBy)}clearTransientResults(){var e,n,r,i,s,a,o;this.hasTransientResults&&((e=this.results.added)==null||e.clear(),(n=this.results.removed)==null||n.clear(),(r=this.results.changed)==null||r.clear(),(i=this.results.addedOrChanged)==null||i.clear(),(s=this.results.changedOrRemoved)==null||s.clear(),(a=this.results.addedChangedOrRemoved)==null||a.clear(),(o=this.changedEntities)==null||o.clear())}clearAllResults(){var e;this.clearTransientResults(),(e=this.results.current)==null||e.clear()}clearProcessedEntities(){this.processedEntities.clear()}handleShapeUpdate(e){var s,a,o,l,c,u,h,_,p,f,g,m,E,v,x,C,k;if(this.processedEntities.get(e))return;this.processedEntities.set(e);const n=this.system.dispatcher.registry,r=((s=this.results.current)==null?void 0:s.has(e))??this.currentEntities.get(e),i=n.matchShape(e,this.withMask,this.withValues,this.withAnyRecords,this.withoutMask,this.withoutEnumTypes);if(i&&!r)(a=this.currentEntities)==null||a.set(e),(o=this.changedEntities)==null||o.set(e),(l=this.results.current)==null||l.add(e),(c=this.results.added)==null||c.add(e),(u=this.results.addedOrChanged)==null||u.add(e),(h=this.results.addedChangedOrRemoved)==null||h.add(e);else if(!i&&r)(_=this.currentEntities)==null||_.unset(e),(p=this.changedEntities)==null||p.set(e),(f=this.results.current)==null||f.remove(e),(g=this.results.removed)==null||g.add(e),(m=this.results.changedOrRemoved)==null||m.add(e),(E=this.results.addedChangedOrRemoved)==null||E.add(e);else if(i&&r&&this.hasMatchTracking){for(const O of this.withAnyRecords)if(O.changed){this.changedEntities.set(e),(v=this.results.changed)==null||v.add(e),(x=this.results.addedOrChanged)==null||x.add(e),(C=this.results.changedOrRemoved)==null||C.add(e),(k=this.results.addedChangedOrRemoved)==null||k.add(e);break}}}handleWrite(e,n,r){var i,s,a,o,l;!this.changedEntities.get(e)&&(this.hasShapeResults?((i=this.results.current)==null?void 0:i.has(e))??this.currentEntities.get(e):this.system.dispatcher.registry.matchShape(e,this.withMask,this.withValues,this.withAnyRecords,this.withoutMask,this.withoutEnumTypes))&&(this.trackWritesMask[n]??0)&r&&(this.changedEntities.set(e),(s=this.results.changed)==null||s.add(e),(a=this.results.addedOrChanged)==null||a.add(e),(o=this.results.changedOrRemoved)==null||o.add(e),(l=this.results.addedChangedOrRemoved)==null||l.add(e))}sort(){var e,n,r,i,s,a,o;(e=this.results.current)==null||e.sort(),(n=this.results.added)==null||n.sort(),(r=this.results.removed)==null||r.sort(),(i=this.results.changed)==null||i.sort(),(s=this.results.addedOrChanged)==null||s.sort(),(a=this.results.changedOrRemoved)==null||a.sort(),(o=this.results.addedChangedOrRemoved)==null||o.sort()}}class pl{constructor(e,n){d(this,"__callback");d(this,"__userQuery");d(this,"__query");d(this,"__system");d(this,"__lastTypes");d(this,"__lastWasWithAny");this.__callback=e,this.__userQuery=n}__build(e){try{this.__system=e,this.__query=new fl(this.__userQuery,e),this.__callback(this),!this.__query.withMask&&this.__query.flavors&&this.set("withMask",[this.__system.dispatcher.registry.Alive]),this.__query.complete()}catch(n){throw n.message=`Failed to build query in system ${e.name}: ${n.message}`,n}}get and(){return this}get but(){return this}get also(){return this}get current(){return this.__query.flavors|=G.current,this}get added(){return this.__query.flavors|=G.added,this}get removed(){return this.__query.flavors|=G.removed,this}get changed(){return this.__query.flavors|=G.changed,this}get addedOrChanged(){return this.__query.flavors|=G.addedOrChanged,this}get changedOrRemoved(){return this.__query.flavors|=G.changedOrRemoved,this}get addedChangedOrRemoved(){return this.__query.flavors|=G.addedChangedOrRemoved,this}orderBy(e){return this.__query.orderBy=e,this}with(...e){return this.set(this.__system.accessMasks.read,e),this.set("withMask"),this}withAny(...e){for(const r of e)if(typeof r=="function"&&r.enum)throw new b(`Cannot use enum types in a withAny clause: ${r.name}`);this.set(this.__system.accessMasks.read,e),this.__query.withAnyRecords||(this.__query.withAnyRecords=[]);const n=[];return this.__query.withAnyRecords.push({mask:n,lastMatches:void 0,changed:!1}),this.set(n),this}without(...e){return this.set(this.__system.accessMasks.read,e),this.set("withoutMask"),this}using(...e){return this.__lastTypes=e,this}get usingAll(){return this.__lastTypes=this.__system.dispatcher.registry.types.slice(1),this}get trackWrites(){this.set("trackWritesMask");for(const e of this.__lastTypes)if(typeof e=="function")e.__binding.trackedWrites=!0;else for(const n of e.__types)n.__binding.trackedWrites=!0;return this}get trackMatches(){if(!this.__lastWasWithAny)throw new Error("You can only apply trackMatches to a withAny clause");return this.__query.withAnyRecords[this.__query.withAnyRecords.length-1].lastMatches=[],this}get read(){return this.set(this.__system.accessMasks.read),this}get create(){return this.set(this.__system.accessMasks.create),this}get update(){return this.set(this.__system.accessMasks.update),this}get write(){return this.set(this.__system.accessMasks.write),this.set(this.__system.accessMasks.read),this.set(this.__system.accessMasks.create),this.set(this.__system.accessMasks.update),this}set(e,n){var _;if(!e)return;if(n)for(const p of n)On(p);if(n||(n=this.__lastTypes),!n)throw new F("No component type to apply query modifier to");this.__lastTypes=n,typeof e=="string"&&(this.__query[e]||(this.__query[e]=[]),e=this.__query[e]),this.__lastWasWithAny=((_=this.__query.withAnyRecords)==null?void 0:_.some(p=>p.mask===e))??!1;const r=e===this.__system.accessMasks.read,i=e===this.__system.accessMasks.update,s=e===this.__system.accessMasks.create,a=e===this.__system.accessMasks.write,o=e===this.__query.withMask,l=e===this.__query.withoutMask,c=e===this.__query.withMask||e===this.__query.withoutMask||this.__lastWasWithAny,u=e===this.__query.trackWritesMask,h=r?this.__system.dispatcher.planner.readers:a||s||i?this.__system.dispatcher.planner.writers:void 0;for(const p of n){if(!Ji(this.__system.accessMasks.write,p)&&(r&&Ji(this.__system.accessMasks.create,p)||s&&Ji(this.__system.accessMasks.read,p)))throw new b(`Cannot combine create and read entitlements for component type ${p.name}; just use a write entitlement instead`);if(l&&typeof p=="function"&&p.enum?(this.__query.withoutEnumTypes=this.__query.withoutEnumTypes??[],this.__query.withoutEnumTypes.push(p)):(ti(e,p),o&&(this.__query.withValues||(this.__query.withValues=[]),ti(this.__query.withValues,p,!0))),r&&ti(this.__system.accessMasks.check,p),typeof p=="function")h&&h.get(p).add(this.__system),c&&this.categorize(this.__system.shapeQueriesByComponent,p),u&&this.categorize(this.__system.writeQueriesByComponent,p);else for(const f of p.__types)h&&h.get(f).add(this.__system),c&&this.categorize(this.__system.shapeQueriesByComponent,f),u&&this.categorize(this.__system.writeQueriesByComponent,f)}}categorize(e,n){const r=n.id;e[r]||(e[r]=[]),e[r].includes(this.__query)||e[r].push(this.__query)}}class ml{constructor(){d(this,"__results");d(this,"__systemName")}get current(){return this.__checkList("current"),this.__results.current.entities}get added(){return this.__checkList("added"),this.__results.added.entities}get removed(){return this.__checkList("removed"),this.__results.removed.entities}get changed(){return this.__checkList("changed"),this.__results.changed.entities}get addedOrChanged(){return this.__checkList("addedOrChanged"),this.__results.addedOrChanged.entities}get changedOrRemoved(){return this.__checkList("changedOrRemoved"),this.__results.changedOrRemoved.entities}get addedChangedOrRemoved(){return this.__checkList("addedChangedOrRemoved"),this.__results.addedChangedOrRemoved.entities}__checkList(e){if(!this.__results[e])throw new b(`Query '${e}' not configured, please add .${e} to your query definition in system ${this.__systemName}`)}}const kn=typeof window<"u"&&typeof window.performance<"u"?performance.now.bind(performance):Date.now.bind(Date);class to{constructor(e,n){d(this,"__callback");d(this,"__schedule");d(this,"__systems");d(this,"__dispatcher");this.__callback=e,this.__schedule=n}__build(e,n){try{this.__systems=e,this.__dispatcher=e[0].dispatcher,this.__callback(this)}catch(r){throw r.message=`Failed to build schedule in ${n}: ${r.message}`,r}}get allSystems(){return this.__dispatcher.defaultGroup}get onMainThread(){var e;return this.__checkNoLaneAssigned(),(e=this.__dispatcher.planner.mainLane)==null||e.add(...this.__systems),this}get onOneThread(){return this.__checkNoLaneAssigned(),this.__dispatcher.planner.createLane().add(...this.__systems),this}get onManyThreads(){var e;this.__checkNoLaneAssigned(),(e=this.__dispatcher.planner.replicatedLane)==null||e.add(...this.__systems);for(const n of this.__systems)n.stateless=!0;return this}__checkNoLaneAssigned(){if(this.__systems.some(e=>e.lane))throw new b("Threading semantics already specified")}before(...e){const n=new Set(this.__systems);for(const r of e)for(const i of this.__dispatcher.getSystems(r))if(!n.has(i))for(const s of this.__systems)this.__dispatcher.planner.graph.addEdge(s,i,5);return this}after(...e){const n=new Set(this.__systems);for(const r of e)for(const i of this.__dispatcher.getSystems(r))if(!n.has(i))for(const s of this.__systems)this.__dispatcher.planner.graph.addEdge(i,s,5);return this}inAnyOrderWith(...e){for(const n of e)for(const r of this.__dispatcher.getSystems(n))for(const i of this.__systems)this.__dispatcher.planner.graph.denyEdge(i,r,4);return this}beforeReadersOf(...e){for(const n of e)for(const r of this.__dispatcher.planner.readers.get(n))for(const i of this.__systems)this.__dispatcher.planner.graph.addEdge(i,r,3);return this}afterReadersOf(...e){for(const n of e)for(const r of this.__dispatcher.planner.readers.get(n))for(const i of this.__systems)this.__dispatcher.planner.graph.addEdge(r,i,3);return this}beforeWritersOf(...e){for(const n of e)for(const r of this.__dispatcher.planner.writers.get(n))for(const i of this.__systems)this.__dispatcher.planner.graph.addEdge(i,r,3);return this}afterWritersOf(...e){for(const n of e)for(const r of this.__dispatcher.planner.writers.get(n))for(const i of this.__systems)this.__dispatcher.planner.graph.addEdge(r,i,3);return this}inAnyOrderWithReadersOf(...e){for(const n of e)for(const r of this.__dispatcher.planner.readers.get(n))for(const i of this.__systems)this.__dispatcher.planner.graph.denyEdge(r,i,2);return this}inAnyOrderWithWritersOf(...e){for(const n of e)for(const r of this.__dispatcher.planner.writers.get(n))for(const i of this.__systems)this.__dispatcher.planner.graph.denyEdge(r,i,2);return this}}class no{}class Yn{constructor(e){d(this,"__contents");d(this,"__plan");d(this,"__executed",!1);d(this,"__systems");d(this,"__scheduleBuilder");this.__contents=e}__collectSystems(e){if(!this.__systems){this.__systems=[];for(const n of this.__contents)n instanceof Function&&n.__system?this.__systems.push(e.systemsByClass.get(n)):n instanceof Yn&&this.__systems.push(...n.__collectSystems(e))}return this.__systems}__buildSchedule(){var e;(e=this.__scheduleBuilder)==null||e.__build(this.__systems,"a group"),this.__scheduleBuilder=null}schedule(e){if(this.__scheduleBuilder===null)throw new b("Attempt to define group schedule after world initialized");if(this.__scheduleBuilder)throw new b("Attempt to define multiple schedules in a group");return this.__scheduleBuilder=new to(e,new no),this}}class ro{constructor(e,n){d(this,"dispatcher");d(this,"groups");d(this,"executing");d(this,"time",kn()/1e3);d(this,"delta");if(this.dispatcher=e,this.groups=n,n.length===0)throw new b("At least one system group needed");for(const r of n)if(!e.systemGroups.includes(r))throw new b("Some groups in the frame are not parts of the world defs")}async begin(){if(this.executing)throw new b("Frame already executing");this.executing=!0;const e=this.dispatcher.lastTime??this.time;this.time=kn()/1e3,this.delta=this.time-e,this.dispatcher.startFrame(this.time)}async end(){if(!this.executing)throw new b("Frame not executing");this.executing=!1;e:{for(const e of this.groups)if(!e.__executed)break e;for(const e of this.groups)e.__executed=!1;this.dispatcher.completeCycle()}await this.dispatcher.completeFrame()}execute(e,n,r){if(!this.groups.includes(e))throw new b("Group not included in this frame");if(!this.executing)throw new b("Frame not executing");return e.__plan.execute(n??this.time,r??this.delta)}}class ia extends Error{constructor(){super("Canceled");d(this,"canceled",!0)}}let wt;class gl{constructor(e,n,r){d(this,"__generator");d(this,"__fn");d(this,"__supervisor");d(this,"__cancellers",[]);d(this,"__blocker");d(this,"__scope");d(this,"__done",!1);d(this,"__awaited",!1);d(this,"__error");d(this,"__value");d(this,"__firstRun",!0);this.__generator=e,this.__fn=n,this.__supervisor=r}__checkCancelation(){if(!this.__done){for(const e of this.__cancellers)if(e()){this.cancel();break}}}__step(){var e,n,r,i,s,a;wt=this;try{if(!this.__done&&(((e=this.__blocker)==null?void 0:e.isReady())??!0))try{let o;if((n=this.__blocker)!=null&&n.error)o=this.__generator.throw(this.__blocker.error);else if(this.__firstRun)try{o=this.__generator.next((r=this.__blocker)==null?void 0:r.value)}finally{this.__firstRun=!1,this.__supervisor.cancelMatching(this,this.__scope,this.__fn)}else o=this.__generator.next((i=this.__blocker)==null?void 0:i.value);o.done?(this.__done=!0,this.__value=o.value,this.__blocker=void 0):(this.__blocker=o.value,(a=(s=this.__blocker)==null?void 0:s.markAwaited)==null||a.call(s))}catch(o){this.__done=!0,this.__error||(this.__error=o),this.__blocker=void 0}if(this.__error&&!(this.__awaited||this.__error instanceof ia))throw this.__error}finally{wt=void 0}}isReady(){return this.__done}get value(){return this.__value}get error(){return this.__error}markAwaited(){this.__awaited=!0}waitForFrames(e){if(e<=0)throw new b("Number of frames to wait for must be >0");return{isReady(){return--e<=0}}}waitForSeconds(e){const n=this.__supervisor.system,r=n.time+e;return{isReady(){return n.time>=r}}}waitUntil(e){return{isReady:e}}cancel(){var e;return(e=this.__blocker)!=null&&e.cancel?this.__blocker.cancel():(this.__error=new ia,this.__done=!0),this}cancelIf(e){return this.__cancellers.push(e),this}scope(e){if(this.__scope)throw new b("Scope already set for this coroutine");if(this.__cancellers.length)throw new b("Scope must be set before any cancelation conditions");return this.__scope=e,this.cancelIf(()=>!e.alive),this}cancelIfComponentMissing(e){if(!this.__scope)throw new b("Required scope not set for this coroutine");return this.cancelIf(()=>{var n;return!((n=this.__scope)!=null&&n.has(e))}),this}cancelIfCoroutineStarted(e){return this.__supervisor.registerCancelIfStarted(this,this.__scope,e===Lt.self?this.__fn:e),this}return(e){throw new b("Generator methods not available for coroutines")}throw(e){throw new b("Generator methods not available for coroutines")}next(...e){throw new b("Generator methods not available for coroutines")}[Symbol.iterator](){throw new b("Generator methods not available for coroutines")}}function Lt(t,e,n){const r=n.value;return{value(...i){return this.start(r,...i)}}}Lt.waitForFrames=function(t){return mn(),wt.waitForFrames(t)};Lt.waitForSeconds=function(t){return mn(),wt.waitForSeconds(t)};Lt.waitUntil=function(t){return mn(),wt.waitUntil(t)};Lt.cancel=function(){mn(),wt.cancel()};Lt.cancelIf=function(t){return mn(),wt.cancelIf(t)};Lt.scope=function(t){return mn(),wt.scope(t)};Lt.cancelIfComponentMissing=function(t){return mn(),wt.cancelIfComponentMissing(t)};Lt.cancelIfCoroutineStarted=function(t){return mn(),wt.cancelIfCoroutineStarted(t)};Lt.self=function*(){yield};function mn(){if(!wt)throw new b("Cannot call co methods outside coroutine context")}class El{constructor(e){d(this,"system");d(this,"coroutines",[]);d(this,"mutuallyExclusiveCoroutines",new Map);this.system=e}start(e,...n){const r=new gl(e.apply(this.system,n),e,this);return this.coroutines.push(r),r}execute(){let e=0;for(;e<this.coroutines.length;){const n=e;e=this.coroutines.length;for(let r=e-1;r>=n;r--)this.system.accessRecentlyDeletedData(!1),this.coroutines[r].__checkCancelation();for(let r=e-1;r>=n;r--){this.system.accessRecentlyDeletedData(!1);const i=this.coroutines[r];i.__step(),i.isReady()&&(this.coroutines.splice(r,1),e-=1)}}}registerCancelIfStarted(e,n,r){var s;const i=((n==null?void 0:n.__id)??"")+((r==null?void 0:r.name)??"");this.mutuallyExclusiveCoroutines.has(i)||this.mutuallyExclusiveCoroutines.set(i,[]),(s=this.mutuallyExclusiveCoroutines.get(i))==null||s.push(e)}cancelMatching(e,n,r){this.cancelMatchingKey(e,""),this.cancelMatchingKey(e,r.name),n&&(this.cancelMatchingKey(e,""+n.__id),this.cancelMatchingKey(e,""+n.__id+r.name))}cancelMatchingKey(e,n){const r=this.mutuallyExclusiveCoroutines.get(n);if(r){let i=!1;for(const s of r)s===e?i=!0:s.cancel();r.length=0,i&&r.push(e)}}}var ft;(function(t){t[t.RUNNING=0]="RUNNING",t[t.STOPPED=1]="STOPPED"})(ft||(ft={}));class fs{constructor(e,n,r){d(this,"access");d(this,"type");d(this,"initialValues");this.access=e,this.type=n,this.initialValues=r}}class io{constructor(e){d(this,"type");this.type=e}}class V{constructor(){d(this,"__queryBuilders",[]);d(this,"__scheduleBuilder");d(this,"__attachPlaceholders",[]);d(this,"__singletonPlaceholders",[]);d(this,"__supervisor",new El(this));d(this,"__dispatcher");d(this,"id");d(this,"time");d(this,"delta")}static group(...e){return new Yn(e)}get name(){return this.constructor.name}query(e){const n=new ml,r=new pl(e,n);if(!this.__queryBuilders)throw new b(`Attempt to create a new query after world initialized in system ${this.name}`);return this.__queryBuilders.push(r),n}schedule(e){if(this.__scheduleBuilder===null)throw new b(`Attempt to define schedule after world initialized in system ${this.name}`);if(this.__scheduleBuilder)throw new b(`Attempt to define multiple schedules in system ${this.name}`);const n=new no;return this.__scheduleBuilder=new to(e,n),n}attach(e){if(!this.__attachPlaceholders)throw new b(`Attempt to attach a system after world initialized in system ${this.name}`);const n=new io(e);return this.__attachPlaceholders.push(n),n}createEntity(...e){return this.__dispatcher.createEntity(e)}accessRecentlyDeletedData(e=!0){this.__dispatcher.registry.includeRecentlyDeleted=e}start(e,...n){return this.__supervisor.start(e,...n)}async prepare(){}initialize(){}execute(){}finalize(){}}d(V,"__system",!0);Object.defineProperty(V.prototype,"singleton",{get(){const t=this,e={read(n){if(!t.__singletonPlaceholders)throw new b(`Attempt to declare a singleton after world initialized in system ${t.name}`);na(n),t.query(i=>i.using(n).read);const r=new fs("read",n);return t.__singletonPlaceholders.push(r),r},write(n,r){if(!t.__singletonPlaceholders)throw new b(`Attempt to declare a singleton after world initialized in system ${t.name}`);na(n),t.query(s=>s.using(n).write);const i=new fs("write",n,r);return t.__singletonPlaceholders.push(i),i}};return Object.defineProperty(this,"singleton",{value:e,configurable:!0}),e}});class ts{constructor(e,n){d(this,"system");d(this,"dispatcher");this.system=e,this.dispatcher=n,e.__dispatcher=n,this.accessMasks={read:[],update:[],create:[],write:[],check:[]},this.shapeQueries=[],this.shapeQueriesByComponent=[],this.writeQueries=[],this.writeQueriesByComponent=[],this.state=ft.RUNNING,this.propsAssigned=!1,this.stateless=!1,this.weight=1,this.shapeLogPointer=n.shapeLog.createPointer(),this.stats=n.stats.forSystem(e.constructor),this.attachedSystems=this.system.__attachPlaceholders.map(r=>this.dispatcher.systemsByClass.get(r.type)),this.singletonComponentDefs=this.system.__singletonPlaceholders.flatMap(r=>r.initialValues?[r.type,r.initialValues]:[r.type]),this.singletonStandingWrites=this.system.__singletonPlaceholders.filter(r=>r.access==="write").map(r=>r.type)}get id(){return this.system.id}get name(){return this.system.name}toString(){return this.name}assignProps(e){if(this.propsAssigned)throw new b(`System ${this.name} has multiple props assigned in world defs`);Object.assign(this.system,e),this.propsAssigned=!0}buildQueries(){for(const e of this.system.__queryBuilders)e.__build(this);this.system.__queryBuilders=null,this.hasNegativeQueries=!!this.shapeQueriesByComponent[this.dispatcher.registry.Alive.id],this.hasWriteQueries=!!this.writeQueries.length,this.hasTransientQueries=this.shapeQueries.some(e=>e.hasTransientResults)}buildSchedule(){var n;const e=this.system.constructor.__staticScheduler;e&&this.system.schedule(e),(n=this.system.__scheduleBuilder)==null||n.__build([this],`system ${this.name}`),this.system.__scheduleBuilder=null}finishConstructing(){var e;this.writeLogPointer=(e=this.dispatcher.writeLog)==null?void 0:e.createPointer(),this.singletonStandingWrites=this.singletonStandingWrites.filter(n=>n.__binding.trackedWrites)}replacePlaceholders(){const e=this.system;for(const n in this.system){const r=e[n];if(r instanceof io){const i=r.type,s=this.dispatcher.systemsByClass.get(i);if(!s)throw new b(`Attached system ${i.name} not defined in this world`);e[n]=s.system}else r instanceof fs&&(e[n]=this.dispatcher.singleton[r.access](r.type))}this.system.__attachPlaceholders=null,this.system.__singletonPlaceholders=null,this.dispatcher.singleton&&Object.defineProperty(this.system,"singleton",{value:this.dispatcher.singleton})}prepare(){return this.system.prepare()}initialize(){this.dispatcher.registry.executingSystem=this,this.system.initialize(),this.trackStandingWrites()}finalize(){this.dispatcher.registry.executingSystem=this,this.system.finalize(),this.trackStandingWrites()}execute(e,n){if(this.state!==ft.RUNNING)return;this.dispatcher.registry.executingSystem=this,this.system.time=e,this.system.delta=n;let r,i,s,a;r=kn(),this.runQueries(),i=kn(),this.system.execute(),s=kn(),this.system.__supervisor.execute(),this.trackStandingWrites(),a=kn(),this.stats.lastQueryUpdateDuration=i-r,this.stats.lastExecutionDuration=s-i,this.stats.lastCoroutinesDuration=a-s}trackStandingWrites(){const e=this.dispatcher.singleton;for(const n of this.singletonStandingWrites)this.dispatcher.registry.trackWrite(e.__id,n)}runQueries(){const e=this.ranQueriesLastFrame;this.ranQueriesLastFrame=!1;const n=this.dispatcher.shapeLog.hasUpdatesSince(this.shapeLogPointer),r=this.hasWriteQueries&&this.dispatcher.writeLog.hasUpdatesSince(this.writeLogPointer);if(n||r||this.hasTransientQueries&&e){if(this.hasTransientQueries)for(const i of this.shapeQueries)i.clearTransientResults();if(n||r){this.ranQueriesLastFrame=!0,n&&this.__updateShapeQueries(),r&&this.__updateWriteQueries();for(const i of this.shapeQueries)i.sort()}}}__updateShapeQueries(){const e=this.dispatcher.shapeLog;if(!this.shapeQueries.length){e.createPointer(this.shapeLogPointer);return}for(const o of this.shapeQueries)o.clearProcessedEntities();let n,r=0,i,s,a;for(;[i,s,a]=e.processSince(this.shapeLogPointer),!!i;){r&&!n&&(s+=r,r=0);for(let o=s;o<a;o++){const l=i[o],c=l&at;if(!n){const u=l>>>Pe&di,h=l&2**31;if(n=this.shapeQueriesByComponent[u],h){if(r=c,!n){const _=Math.min(r,a-o);o+=_,r-=_}continue}if(!n)continue;r=1}if(l&2**31)throw new F("Trying to process run header as entry in shape log");for(let u=0;u<n.length;u++)n[u].handleShapeUpdate(c);--r===0&&(n=void 0)}}}__updateWriteQueries(){const e=this.dispatcher.writeLog;if(!this.writeQueries.length){e.createPointer(this.writeLogPointer);return}let n,r=0,i,s,a,o,l;for(;[a,o,l]=e.processSince(this.writeLogPointer),!!a;){r&&!n&&(o+=r,r=0);for(let c=o;c<l;c++){const u=a[c],h=u&at;if(!n){const _=u>>>Pe&di,p=u&2**31;if(i=_>>5,s=1<<(_&31),n=this.writeQueriesByComponent[_],p){if(r=h,!n){const f=Math.min(r,l-c);c+=f,r-=f}continue}if(!n)continue;r=1}if(u&2**31)throw new F("Trying to process run header as entry in write log");for(let _=0;_<n.length;_++)n[_].handleWrite(h,i,s);--r===0&&(n=void 0)}}}stop(){if(this.state!==ft.STOPPED){this.state=ft.STOPPED;for(const e of this.shapeQueries)e.clearAllResults()}}restart(){var e;if(this.state===ft.STOPPED){const n=this.dispatcher.registry,r=n.Alive;for(const i of this.shapeQueries)i.clearProcessedEntities();for(let i=0;i<this.dispatcher.maxEntities;i++)if(n.hasShape(i,r,!1))for(const s of this.shapeQueries)s.handleShapeUpdate(i);for(const i of this.shapeQueries)i.clearTransientResults(),i.sort();this.dispatcher.shapeLog.createPointer(this.shapeLogPointer),(e=this.dispatcher.writeLog)==null||e.createPointer(this.writeLogPointer)}this.state=ft.RUNNING}}class Ci{constructor(e,n){d(this,"name");d(this,"__types");d(this,"__binding");this.name=e,this.__types=Array.from(new Set(n))}}const Ke=2;class vl{constructor(e,n){d(this,"maxItems");d(this,"configParamName");d(this,"data");this.maxItems=e,this.configParamName=n,this.data=new Uint32Array(new ArrayBuffer((e+Ke)*Uint32Array.BYTES_PER_ELEMENT))}get length(){return this.data[0]}take(){const e=--this.data[0];if(e<0)throw new RangeError(`Pool capacity exceeded, please raise ${this.configParamName} above ${this.maxItems}`);return this.data[e+Ke]}return(e){if(this.length>=this.maxItems)throw new F("Internal error, returned entity ID exceeded pool capacity");this.data[this.length+Ke]=e,this.data[0]+=1}mark(){this.data[1]=this.data[0]}peekSinceMark(e){const n=this.data[1]+e;if(n<this.data[0])return this.data[n+Ke]}refill(e){if(!e.length)return;const n=this.length,r=n+e.length;if(r>this.maxItems)throw new F("Internal error, returned entity ID exceeded pool capacity");this.data.set(e,n+Ke),this.data[0]=r}fillWithDescendingIntegers(e){const n=this.length+Ke;for(let r=this.data.length-1;r>=n;r--)this.data[r]=e++;this.data[0]=this.data.length-Ke}}class Al{constructor(e,n,r){d(this,"maxItems");d(this,"configParamName");d(this,"data");this.maxItems=e,this.configParamName=n,r.register(`pool.${n}`,e+Ke,Uint32Array,i=>{this.data=i})}get length(){return this.data[0]}take(){const e=Atomics.sub(this.data,0,1);if(e<0)throw new RangeError(`Pool capacity exceeded, please raise ${this.configParamName} above ${this.maxItems}`);return this.data[e+Ke]}return(e){if(this.length>=this.maxItems)throw new F("Internal error, returned entity ID exceeded pool capacity");this.data[this.length+Ke]=e,this.data[0]+=1}mark(){this.data[1]=this.data[0]}peekSinceMark(e){const n=this.data[1]+e;if(n<this.data[0])return this.data[n+Ke]}refill(e){if(!e.length)return;const n=this.length,r=n+e.length;if(r>this.maxItems)throw new F("Internal error, returned entity ID exceeded pool capacity");this.data.set(e,n+Ke),this.data[0]=r}fillWithDescendingIntegers(e){const n=this.length+Ke;for(let r=this.data.length-1;r>=n;r--)this.data[r]=e++;this.data[0]=this.data.length-Ke}}class yl{constructor(e,n,r,i){d(this,"stride");d(this,"array");this.stride=Math.ceil(n/32),i.register(e,r*this.stride,Uint32Array,s=>{this.array=s})}syncThreads(){}set(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask,a=r.shapeValue;this.array[i]&=~s,this.array[i]|=a}unset(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask;this.array[i]&=~s}isSet(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask,a=r.shapeValue;return(this.array[i]&s)===a}get(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask;return(this.array[i]&s)>>>r.shapeShift}clear(){this.array.fill(0)}match(e,n,r){if(n.length!==r.length)throw new F(`Mismatched mask and value lengths: ${n.length} vs ${r.length}`);const i=this.array,s=e*this.stride;for(let a=0;a<n.length;a++)if((i[s+a]&n[a])!==r[a])return!1;return!0}matchNot(e,n){const r=this.array,i=e*this.stride;for(let s=0;s<n.length;s++)if(r[i+s]&n[s])return!1;return!0}matchAny(e,n){n.changed=!1;const r=n.mask,i=n.lastMatches[e]=n.lastMatches[e]||[],s=this.array,a=e*this.stride;let o=!1;for(let l=0;l<r.length;l++){const c=s[a+l]&r[l];c!==0&&(o=!0),c!==i[l]&&(n.changed=!0),i[l]=c}return o||delete n.lastMatches[e],o}}class Rl{constructor(e,n,r,i){d(this,"stride");d(this,"array");this.stride=Math.ceil(n/32),i.register(e,r*this.stride,Uint32Array,s=>{this.array=s})}syncThreads(){Atomics.load(this.array,0)}set(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask,a=r.shapeValue;s!==a&&Atomics.and(this.array,i,~s),Atomics.or(this.array,i,a)}unset(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask;Atomics.and(this.array,i,~s)}isSet(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask,a=r.shapeValue;return n.id===0?(Atomics.load(this.array,i)&s)===a:(this.array[i]&s)===a}get(e,n){const r=n.__binding,i=e*this.stride+r.shapeOffset,s=r.shapeMask;return(this.array[i]&s)>>>r.shapeShift}clear(){this.array.fill(0)}match(e,n,r){if(n.length!==r.length)throw new F(`Mismatched mask and value lengths: ${n.length} vs ${r.length}`);const i=this.array,s=e*this.stride;for(let a=0;a<n.length;a++)if((i[s+a]&n[a])!==r[a])return!1;return!0}matchNot(e,n){const r=this.array,i=e*this.stride;for(let s=0;s<n.length;s++)if(r[i+s]&n[s])return!1;return!0}matchAny(e,n){n.changed=!1;const r=n.mask,i=n.lastMatches[e]=n.lastMatches[e]||[],s=this.array,a=e*this.stride;for(let o=0;o<r.length;o++){const l=s[a+o]&r[o];if(l===0)return delete n.lastMatches[e],!1;l!==i[o]&&(n.changed=!0),i[o]=l}return!0}}const Tl=[EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AggregateError,b,F];class wl{constructor(e,n){d(this,"registry");d(this,"borrowed");d(this,"borrowCounts");d(this,"spares",[]);d(this,"temporarilyBorrowedIds",[]);this.registry=e,this.borrowed=Array.from({length:n}),this.borrowCounts=new Int32Array(n)}borrow(e){this.borrowCounts[e]+=1;let n=this.borrowed[e];return n||(n=this.borrowed[e]=this.spares.pop()??new eo(this.registry),n.__id=e),n}borrowTemporarily(e){const n=this.borrow(e);return this.temporarilyBorrowedIds.push(e),n}returnTemporaryBorrows(){for(const e of this.temporarilyBorrowedIds)this.return(e);this.temporarilyBorrowedIds.length=0}return(e){if(!this.borrowCounts[e])throw new F("Returning entity with no borrows");if(--this.borrowCounts[e]<=0){const n=this.borrowed[e];this.borrowed[e]=void 0;{n.__valid=!1;return}}}}var us;class bl{constructor(e,n,r,i,s){d(this,"types");d(this,"enums");d(this,"dispatcher");d(this,"allocationItems");d(this,"numShapeBits",0);d(this,"shapes");d(this,"staleShapes");d(this,"removedShapes");d(this,"entityIdPool");d(this,"pool");d(this,"heldEntities");d(this,"validators");d(this,"reshapedEntityIds",[]);d(this,"validateSystem");d(this,"executingSystem");d(this,"includeRecentlyDeleted",!1);d(this,"hasNegativeQueries",!1);d(this,"nextEntityOrdinal",0);d(this,"entityOrdinals");d(this,"removalLog");d(this,"prevRemovalPointer");d(this,"oldRemovalPointer");d(this,"Alive",(us=class{},d(us,"__internal",!0),us));this.types=r,this.enums=i,this.dispatcher=s,this.allocationItems=this.prepareComponentTypesAndEnums();for(const o of this.allocationItems)this.numShapeBits+=o.size;const a=s.threaded?Rl:yl;this.shapes=new a("registry.shapes",this.numShapeBits,e,s.buffers),this.staleShapes=new a("registry.staleShapes",this.numShapeBits,e,s.buffers),this.removedShapes=new a("registry.removedShapes",this.numShapeBits,e,s.buffers),this.entityIdPool=s.threaded?new Al(e,"maxEntities",s.buffers):new vl(e,"maxEntities"),this.entityOrdinals=s.buffers.register("registry.entityOrdinals",e,Uint32Array,o=>{this.entityOrdinals=o}),this.entityIdPool.fillWithDescendingIntegers(0),this.pool=new wl(this,e),this.heldEntities=[],this.validators=[],this.removalLog=new fi(n,"maxLimboComponents",s.buffers),this.prevRemovalPointer=this.removalLog.createPointer(),this.oldRemovalPointer=this.removalLog.createPointer()}initializeComponentTypes(){let e=0,n=0;for(;this.allocationItems.length;){const r=e%32,i=this.removeBiggestNoLargerThan(32-r);if(!i){e+=32-r;continue}const s={offset:e>>>5,mask:(1<<i.size)-1<<r,value:1<<r};if(e+=i.size,i.typeOrEnum instanceof Ci){const a=i.typeOrEnum;a.__binding={shapeOffset:s.offset,shapeMask:s.mask,shapeShift:r};for(const o of a.__types)ta(n++,o,s,this.dispatcher),o.validate&&this.validators.push(o),s.value+=1<<r}else{const a=i.typeOrEnum;ta(n++,a,s,this.dispatcher),a.validate&&this.validators.push(a)}}for(const r of this.types)ol(r);{const r=this.Alive.__binding;if(!(r.shapeOffset===0&&r.shapeMask===1&&r.shapeValue===1))throw new F("Alive component was not assigned first available shape mask")}}prepareComponentTypesAndEnums(){const e=[],n=new Set,r=new Set;let i=0;for(const s of this.types){if(s.name||Object.defineProperty(s,"name",{value:`Anonymous_${i++}`}),!s.__internal){if(r.has(s.name))throw new b(`Multiple component types named ${s.name}; names must be unique`);r.add(s.name)}if(s.enum){if(!this.enums.includes(s.enum))throw new b(`Component type ${s.name} references an enum that's not in the world's defs`);s.enum.__types.includes(s)||s.enum.__types.push(s)}this.dispatcher.stats.forComponent(s)}for(const s of this.enums){if(s.__types.length>2**31)throw new b(`Too many types in enum: ${s.__types.length}`);e.push({typeOrEnum:s,size:Math.ceil(Math.log2(s.__types.length+1))});for(const a of s.__types){if(n.has(a))throw new b(`Component type ${a.name} is a member of more than one enum`);a.enum=s,n.add(a)}}for(const s of this.types)n.has(s)||e.push({typeOrEnum:s,size:1});return e.sort((s,a)=>a.size-s.size),this.types.unshift(this.Alive),e.unshift({typeOrEnum:this.Alive,size:1}),e}removeBiggestNoLargerThan(e){const n=this.allocationItems.findIndex(r=>r.size<=e);if(n!==-1)return this.allocationItems.splice(n,1)[0]}releaseComponentTypes(){for(const e of this.types)ll(e);for(const e of this.enums)delete e.__binding}createEntity(e){const n=this.entityIdPool.take();this.entityOrdinals[n]=this.nextEntityOrdinal++,this.setShape(n,this.Alive);const r=this.pool.borrowTemporarily(n);return this.createComponents(n,e),this.dispatcher.stats.numEntities+=1,r}createComponents(e,n){var r,i;for(let s=0;s<n.length;s++){const a=n[s];{if(typeof a!="function")throw new b(`Bad arguments to createEntity: expected component type, got: ${a}`);On(a);const l=(r=this.executingSystem)==null?void 0:r.accessMasks.create;if(l){const c=a.__binding;if(!((l[c.shapeOffset]??0)&c.shapeMask))throw new b(`System ${(i=this.executingSystem)==null?void 0:i.name} didn't mark component ${a.name} as createable`)}if(a.enum){if(this.getEnumShape(e,a.enum,!1))throw new b("Can't add multiple components from the same enum when creating entity: "+a.name)}else if(this.hasShape(e,a,!1))throw new b(`Duplicate ${a.name} component when creating entity`)}let o=n[s+1];typeof o=="function"?o=void 0:s++,this.setShape(e,a),this.dispatcher.stats.forComponent(a).numEntities+=1,Ja(a,e,o)}}flush(){const e=this.executingSystem;this.includeRecentlyDeleted=!1,this.validateShapes(e),this.executingSystem=void 0,this.pool.returnTemporaryBorrows(),this.removalLog.commit()}completeCycle(){this.processRemovalLog(),this.invalidateDeletedHeldEntities()}validateShapes(e){this.executingSystem=this.validateSystem;for(const n of this.reshapedEntityIds)for(const r of this.validators)try{r.validate(this.pool.borrowTemporarily(n))}catch(i){if(!Tl.includes(i.constructor)){const s=e?` after system ${e.name} executed`:"",a=this.types.filter(o=>o!==this.Alive&&this.hasShape(n,o,!1)).map(o=>o.name).join(", ")||"none";i.message=`An entity failed to satisfy ${r.name}.validate${s}: ${i.message} (components: ${a})`}throw i}this.reshapedEntityIds.length=0}processRemovalLog(){var a;const e=this.dispatcher.indexer;this.removalLog.commit(),this.entityIdPool.mark();let n=0,r,i,s;for(this.dispatcher.stats.maxLimboComponents=this.removalLog.countSince(this.removalLog.copyPointer(this.oldRemovalPointer));[r,i,s]=this.removalLog.processSince(this.oldRemovalPointer,this.prevRemovalPointer),!!r;)for(let o=i;o<s;o++){const l=r[o],c=l&at,u=l>>>Pe&di,h=this.types[u];!this.shapes.isSet(c,h)&&!this.removedShapes.isSet(c,h)&&(this.staleShapes.unset(c,h),h===this.Alive?(e.clearAllRefs(c,!0),this.entityIdPool.return(c),n+=1):this.clearRefs(c,h,!0),(a=h.__free)==null||a.call(h,c),this.removedShapes.set(c,h))}this.dispatcher.stats.numEntities-=n,this.removedShapes.clear(),this.removalLog.createPointer(this.prevRemovalPointer)}invalidateDeletedHeldEntities(){let e=0,n;for(;(n=this.entityIdPool.peekSinceMark(e++))!==void 0;){const r=this.heldEntities[n];r&&(r.__valid=!1,delete this.heldEntities[n])}}holdEntity(e){let n;return n=this.heldEntities[e],n||(n=new eo(this),n.__id=e,this.heldEntities[e]=n),n}hasShape(e,n,r){return!!(this.shapes.isSet(e,n)||r&&this.includeRecentlyDeleted&&this.staleShapes.isSet(e,n))}getEnumShape(e,n,r){let i=this.shapes.get(e,n);if(i===0&&r&&this.includeRecentlyDeleted&&(i=this.staleShapes.get(e,n)),i>0)return n.__types[i-1]}setShape(e,n){if(n.enum){const r=this.getEnumShape(e,n.enum,!1);r&&this.clearShape(e,r)}this.shapes.set(e,n),this.staleShapes.set(e,n),this.reshapedEntityIds.push(e),(n!==this.Alive||this.hasNegativeQueries)&&this.dispatcher.shapeLog.push(e|n.id<<Pe,n)}clearShape(e,n){this.clearRefs(e,n,!1),this.shapes.unset(e,n),this.removedShapes.set(e,n),this.reshapedEntityIds.push(e);const r=e|n.id<<Pe;this.removalLog.push(r),(n!==this.Alive||this.hasNegativeQueries)&&this.dispatcher.shapeLog.push(r,n),this.dispatcher.stats.forComponent(n).numEntities-=1}trackWrite(e,n){this.dispatcher.writeLog.push(e|n.id<<Pe,n)}clearRefs(e,n,r){if(!!n.__binding.refFields.length){n.__bind(e,!0);for(const s of n.__binding.refFields)s.clearRef(r)}}matchShape(e,n,r,i,s,a){if(n&&r&&!this.shapes.match(e,n,r)||s&&!this.shapes.matchNot(e,s))return!1;if(a){for(const o of a)if(this.shapes.isSet(e,o))return!1}if(i){for(const o of i)if(o.lastMatches){if(!this.shapes.matchAny(e,o))return!1}else if(this.shapes.matchNot(e,o.mask))return!1}return!0}}const sa=.05;function ns(t,e){return e*sa+t*(1-sa)}class xl{constructor(e){d(this,"type");d(this,"_numEntities",0);d(this,"maxEntities",0);d(this,"capacity",0);this.type=e}get numEntities(){return this._numEntities}set numEntities(e){this._numEntities=e,e>this.maxEntities&&(this.maxEntities=e)}toString(){return`${this.numEntities.toLocaleString()} of ${this.maxEntities.toLocaleString()} peak (capacity ${this.capacity.toLocaleString()})`}}class Sl{constructor(e){d(this,"type");d(this,"worker");d(this,"_lastQueryUpdateDuration",0);d(this,"averageQueryUpdateDuration",0);d(this,"_lastExecutionDuration",0);d(this,"averageExecutionDuration",0);d(this,"_lastCoroutinesDuration",0);d(this,"averageCoroutinesDuration",0);this.type=e}get lastQueryUpdateDuration(){return this._lastQueryUpdateDuration}set lastQueryUpdateDuration(e){this._lastQueryUpdateDuration=e,this.averageQueryUpdateDuration=ns(this.averageQueryUpdateDuration,e)}get lastExecutionDuration(){return this._lastExecutionDuration}set lastExecutionDuration(e){this._lastExecutionDuration=e,this.averageExecutionDuration=ns(this.averageExecutionDuration,e)}get lastCoroutinesDuration(){return this._lastCoroutinesDuration}set lastCoroutinesDuration(e){this._lastCoroutinesDuration=e,this.averageCoroutinesDuration=ns(this.averageCoroutinesDuration,e)}}class Il{constructor(){d(this,"frames",0);d(this,"_numEntities",0);d(this,"_maxEntities",0);d(this,"_maxLimboComponents",0);d(this,"_maxRefChangesPerFrame",0);d(this,"_maxShapeChangesPerFrame",0);d(this,"_maxWritesPerFrame",0);d(this,"components",Object.create(null));d(this,"systems",Object.create(null))}get maxEntities(){return this._maxEntities}get numEntities(){return this._numEntities}set numEntities(e){this._numEntities=e,e>this._maxEntities&&(this._maxEntities=e)}get maxLimboComponents(){return this._maxLimboComponents}set maxLimboComponents(e){e>this._maxLimboComponents&&(this._maxLimboComponents=e)}get maxRefChangesPerFrame(){return this._maxRefChangesPerFrame}set maxRefChangesPerFrame(e){e>this._maxRefChangesPerFrame&&(this._maxRefChangesPerFrame=e)}get maxShapeChangesPerFrame(){return this._maxShapeChangesPerFrame}set maxShapeChangesPerFrame(e){e>this._maxShapeChangesPerFrame&&(this._maxShapeChangesPerFrame=e)}get maxWritesPerFrame(){return this._maxWritesPerFrame}set maxWritesPerFrame(e){e>this._maxWritesPerFrame&&(this._maxWritesPerFrame=e)}forComponent(e){const n=this.components[e.name]??new xl(e);return e.__internal||(this.components[e.name]=n),n}forSystem(e){const n=this.systems[e.name]??new Sl(e);return e.__internal||(this.systems[e.name]=n),n}toString(){return`World stats:
  frames: ${this.frames.toLocaleString()}
  entities: ${this.numEntities.toLocaleString()} of ${this.maxEntities.toLocaleString()} max
  refs: ${this.maxRefChangesPerFrame.toLocaleString()} ref changes/frame max
  logs: ${this.maxShapeChangesPerFrame.toLocaleString()} shape changes/frame max, ${this.maxWritesPerFrame.toLocaleString()} writes/frame max
  components: (${this.maxLimboComponents.toLocaleString()} limbo max)
`+Object.keys(this.components).map(e=>{const n=this.components[e];return`    ${e}: ${n.numEntities} (max ${n.maxEntities})`}).join(`
`)}}var dt;(function(t){t[t.REFERENCE=0]="REFERENCE",t[t.UNREFERENCE=1073741824]="UNREFERENCE",t[t.RELEASE=2147483648]="RELEASE",t[t.UNREFERENCE_AND_RELEASE=-1073741824]="UNREFERENCE_AND_RELEASE"})(dt||(dt={}));const Nl=dt.UNREFERENCE_AND_RELEASE;class aa{constructor(e,n,r,i){d(this,"targetEntityId");d(this,"selector");d(this,"trackStale");d(this,"dispatcher");d(this,"entities",[]);d(this,"tags");d(this,"entityIndex");d(this,"clearing",!1);d(this,"registry");var o;this.targetEntityId=e,this.selector=n,this.trackStale=r,this.dispatcher=i;const s=(o=n.sourceType)==null?void 0:o.__binding;n.matchType&&(n.matchSeq&&!s.fields[n.sourceSeq].type.internallyIndexed||s.refFields.length===1&&!s.refFields[0].type.internallyIndexed)||(this.tags=[]),this.registry=i.registry}clearAllRefs(e){if(!this.tags)throw new F("Unreferencing an untagged tracker");this.clearing=!0;for(let n=0;n<this.entities.length;n++){const r=this.entities[n].__id,i=this.tags[n];if(typeof i=="number")this.clearRef(r,i,e);else for(const s of i)this.clearRef(r,s,e)}this.entities=[],this.tags&&(this.tags=[]),this.entityIndex=void 0,this.clearing=!1}clearRef(e,n,r){const i=n&di,s=n>>>zn&Yo,a=n>>>zn+hs,o=this.registry.types[i];ds(o,this.registry.executingSystem,"write"),o.__bind(e,!0),o.__binding.fields[s].clearRef(r,this.targetEntityId,a)}trackReference(e,n,r,i,s){if(this.clearing)throw new F("Cannot track a new reference while clearing tracker");s&&this.checkUpdateMask();let a=this.getEntityIndex(e);a===void 0&&(a=this.addEntity(e,s)),this.addTag(a,this.makeTag(n,r,i))}trackUnreference(e,n,r,i,s){if(this.clearing)return;s&&this.checkUpdateMask();const a=this.getEntityIndex(e);if(a===void 0)throw new F("Entity backref not tracked");this.removeTag(a,this.makeTag(n,r,i))&&this.removeEntity(a,e,s)}getEntityIndex(e){if(this.entityIndex)return this.entityIndex[e];const n=this.entities.findIndex(r=>r.__id===e);if(n>=0)return n}indexEntities(){if(this.entityIndex)throw new F("Entities already indexed");this.entityIndex=new Array(this.dispatcher.maxEntities);for(let e=0;e<this.entities.length;e++)this.entityIndex[this.entities[e].__id]=e}addTag(e,n){if(!this.tags)return;const r=this.tags[e];if(r===void 0)this.tags[e]=n;else if(typeof r=="number"){if(r===n)throw new F(`Ref ${n} already tracked (single)`);this.tags[e]=[r,n]}else if(Array.isArray(r)){if(r.includes(n))throw new F(`Ref ${n} already tracked (array)`);r.length>=1e3?(this.tags[e]=new Set(r)).add(n):r.push(n)}else{if(r.has(n))throw new F(`Ref ${n} already tracked (set)`);r.add(n)}}removeTag(e,n){if(!this.tags)return!0;const r=this.tags[e];if(r===void 0)throw new F(`Ref ${n} not tracked (none)`);if(typeof r=="number"){if(r!==n)throw new F(`Ref ${n} not tracked (single ${r})`);return delete this.tags[e],!0}if(Array.isArray(r)){const i=r.indexOf(n);if(i===-1)throw new F(`Ref ${n} not tracked (array ${r})`);return r.splice(i,1),!this.tags.length}if(!r.has(n))throw new F(`Ref ${n} not tracked (set ${new Array(...r)})`);return r.delete(n),!r.size}makeTag(e,n,r){return e|n<<zn|(r===void 0?0:r<<zn+hs)}addEntity(e,n){const r=this.entities.length;return this.entities.push(this.registry.pool.borrow(e)),this.entityIndex?this.entityIndex[e]=r:r>100&&this.indexEntities(),n&&this.trackBackrefsChange(),r}removeEntity(e,n,r){this.registry.pool.return(n);const i=this.entities.pop();if(this.entityIndex&&delete this.entityIndex[n],this.entities.length>e&&(this.entities[e]=i,this.entityIndex&&(this.entityIndex[i.__id]=e)),this.tags){const s=this.tags.pop();this.tags.length>e&&(this.tags[e]=s)}r&&this.trackBackrefsChange()}trackBackrefsChange(){for(const e of this.selector.targetTypes)e.__binding.trackedWrites&&this.registry.trackWrite(this.targetEntityId,e)}checkUpdateMask(){const e=this.registry.executingSystem;for(const n of this.selector.targetTypes)this.registry.hasShape(this.targetEntityId,n,this.trackStale)&&ds(n,e,"update")}}class Ol{constructor(e,n){d(this,"dispatcher");d(this,"maxRefChangesPerFrame");d(this,"refLog");d(this,"refLogPointer");d(this,"refLogStatsPointer");d(this,"selectorIdsBySourceKey",new Map);d(this,"selectors",[]);d(this,"trackers",new Map);d(this,"registry");this.dispatcher=e,this.maxRefChangesPerFrame=n,this.registry=e.registry}completeCycle(){var e;this.flush(),this.dispatcher.stats.maxRefChangesPerFrame=((e=this.refLog)==null?void 0:e.countSince(this.refLogStatsPointer))??0}registerSelector(e,n,r,i=!1){e&&On(e),n&&On(n),this.refLog||(this.refLog=new fi(this.maxRefChangesPerFrame,"maxRefChangesPerFrame",this.dispatcher.buffers,{localProcessingAllowed:!0}),this.refLogPointer=this.refLog.createPointer(),this.refLogStatsPointer=this.refLog.createPointer());const s=n?r===void 0?-2-n.id:n.id|r<<zn:-1;let a=this.selectorIdsBySourceKey.get(s);if(a===void 0){this.selectors.length||(i=!0);const o={id:this.selectors.length,targetTypes:e?[e]:[],sourceType:n,matchType:!!n,matchSeq:r!==void 0,sourceTypeId:n==null?void 0:n.id,sourceSeq:r,trackStale:i};if(this.selectors.push(o),a=o.id,this.selectorIdsBySourceKey.set(s,a),a>_i)throw new b("Too many distinct backrefs selectors")}else{const o=this.selectors[a];o.trackStale=o.trackStale||i,e&&o.targetTypes.push(e)}return a}getBackrefs(e,n=0){const r=this.selectors[n];return this.getOrCreateTracker(r,e,this.registry.includeRecentlyDeleted).entities}trackRefChange(e,n,r,i,s,a,o,l){if(!this.refLog)throw new F("Trying to trackRefChange without a refLog");if(s===a&&o)throw new F("No-op call to trackRefChange");if(s!==-1){const c=(o?dt.UNREFERENCE:0)|(l?dt.RELEASE:0);if(!c)throw new F("Called trackRefChange with neither unreference nor release");this.pushRefLogEntry(e,n,r,i,s,c)}a!==-1&&this.pushRefLogEntry(e,n,r,i,a,dt.REFERENCE)}clearAllRefs(e,n){var r;this.selectors.length&&((r=this.getTracker(this.selectors[0],e,n))==null||r.clearAllRefs(n))}pushRefLogEntry(e,n,r,i,s,a){const o=typeof i<"u";if(o&&!n.__binding.fields[r].type.internallyIndexed)throw new F("Inconsistent internally indexed flag");this.refLog.push(e|n.id<<Pe),this.refLog.push(s|r<<Pe|a|(o?2**29:0)),o&&this.refLog.push(i),this.processEntry(e,n.id,r,i,s,a,!0)}getOrCreateTracker(e,n,r){let i=this.getTracker(e,n,r);if(i)return i;if(r&&!e.trackStale)throw new F("Selector not configured for stale tracking");let s;return i=new aa(n,e,!1,this.dispatcher),this.trackers.set(n|e.id<<Pe,i),e.trackStale&&(s=new aa(n,e,!0,this.dispatcher),this.trackers.set(n|e.id<<Pe|2**31,s)),r?s:i}getTracker(e,n,r){return this.trackers.get(n|e.id<<Pe|(r?2**31:0))}flush(){if(this.refLog)for(;;){const[e,n,r,i]=this.refLog.processAndCommitSince(this.refLogPointer);if(!e)break;if(!i)for(let s=n;s<r;s+=2){const a=e[s],o=e[s+1],l=a&at,c=a>>>Pe,u=o&at,h=o>>>Pe&Ss-1,_=o&Nl,p=(o&2**29)!==0,f=p?e[s+2]:void 0;p&&(s+=1),this.processEntry(l,c,h,f,u,_,!1)}}}processEntry(e,n,r,i,s,a,o){for(let l=0;l<this.selectors.length;l++){const c=this.selectors[l];if((!c.matchType||c.sourceTypeId===n)&&(!c.matchSeq||c.sourceSeq===r)){if(a===dt.REFERENCE||a&dt.UNREFERENCE){const u=this.getOrCreateTracker(c,s,!1);a===dt.REFERENCE?u.trackReference(e,n,r,i,o):u.trackUnreference(e,n,r,i,o)}if(c.trackStale&&(a===dt.REFERENCE||a&dt.RELEASE)){const u=this.getOrCreateTracker(c,s,!0);a===dt.REFERENCE?u.trackReference(e,n,r,i,o):u.trackUnreference(e,n,r,i,o)}}}}}class oa{constructor(){d(this,"buffer");d(this,"array");d(this,"update")}}const Cl=new Map([[Uint8Array,"u8"],[Int8Array,"i8"],[Uint16Array,"u16"],[Int16Array,"i16"],[Uint32Array,"u32"],[Int32Array,"i32"],[Float32Array,"f32"],[Float64Array,"f64"]]),Ml=new Map([["u8",Uint8Array],["i8",Int8Array],["u16",Uint16Array],["i16",Int16Array],["u32",Uint32Array],["i32",Int32Array],["f32",Float32Array],["f64",Float64Array]]);class Bl{constructor(e){d(this,"threaded");d(this,"items",new Map);d(this,"changes");this.threaded=e}register(e,n,r,i,s){const a=n*r.BYTES_PER_ELEMENT;let o=this.items.get(e);const l=!o||o.buffer.byteLength<a,c=l||o.array.constructor!==r;if(!o||l||c){const u=new oa;u.buffer=l?this.threaded?new SharedArrayBuffer(a):new ArrayBuffer(a):o.buffer,u.array=new r(u.buffer),o?(u.array.set(o.array),s!==void 0&&u.array.length>o.array.length&&u.array.fill(s,o.array.length)):s!==void 0&&u.array.fill(s),o=u,this.items.set(e,o),this.threaded&&(this.changes||(this.changes=new Map),this.changes.set(e,{buffer:o.buffer,arrayKind:Cl.get(r)})),i==null||i(o.array)}return o.update=i,o.array}makePatch(){if(!this.changes)return;const e=this.changes;return this.changes=void 0,e}applyPatch(e){var n,r;for(const[i,s]of e.entries()){const a=new oa;a.update=(n=this.items.get(i))==null?void 0:n.update,a.buffer=s.buffer;const o=Ml.get(s.arrayKind);a.array=new o(a.buffer),this.items.set(i,a),(r=a.update)==null||r.call(a,a.array)}}}function bt(t,e,n){e.constructor.schema||(e.constructor.schema={}),e.constructor.schema[n]=t}function A(t){return function(e,n){const r="type"in t?t:{type:t};bt(r,e,n)}}function gn(t){const e=bt.bind(null,{type:t});return e.vector=(n,r)=>(i,s)=>{bt({type:N.vector(t,n,r)},i,s)},e}function Dl(...t){if(typeof t[0]=="function"||t[0]===void 0)return bt.bind(null,{type:N.backrefs(...t)});bt({type:N.backrefs},t[0],t[1])}A.boolean=bt.bind(null,{type:N.boolean});A.uint8=gn(N.uint8);A.int8=gn(N.int8);A.uint16=gn(N.uint16);A.int16=gn(N.int16);A.uint32=gn(N.uint32);A.int32=gn(N.int32);A.float32=gn(N.float32);A.float64=gn(N.float64);A.staticString=function(t){return bt.bind(null,{type:N.staticString(t)})};A.dynamicString=function(t){return bt.bind(null,{type:N.dynamicString(t)})};A.ref=bt.bind(null,{type:N.ref});A.backrefs=Dl;A.object=bt.bind(null,{type:N.object});A.weakObject=bt.bind(null,{type:N.weakObject});const ni=[];function j(t,e){if(typeof t=="function")ni.push(t);else return t instanceof Ci?n=>{t.__types.includes(n)||t.__types.push(n),ni.push(t),e&&(n.options=e)}:n=>{n.options=t,ni.push(n)}}const dr=[];function st(t,e){if(typeof t=="function"&&!t.__system&&(e=t,t=void 0),typeof t=="function")dr.push(t);else return t&&!dr.includes(t)&&dr.push(t),n=>{t&&t.__contents.push(n),e&&(n.__staticScheduler=e),dr.push(n)}}class pi{constructor(e){d(this,"vertices");d(this,"numVertices");d(this,"edges");d(this,"paths");d(this,"vertexIndexMap",new Map);d(this,"sealed",!1);d(this,"sortedVertices");d(this,"dependencyCounts");d(this,"traversalCounts");d(this,"numTraversedVertices");this.vertices=e,this.numVertices=e.length;for(let n=0;n<e.length;n++)this.vertexIndexMap.set(e[n],n);this.edges=new Array(this.numVertices**2).fill(0),this.dependencyCounts=new Array(this.numVertices),this.traversalCounts=new Array(this.numVertices)}get topologicallySortedVertices(){if(!this.sealed)throw new F("Graph not yet sealed");return this.sortedVertices||(this.sortedVertices=this.sortTopologically()),this.sortedVertices}getEdgeIndex(e,n){const r=this.vertexIndexMap.get(e),i=this.vertexIndexMap.get(n);if(r===void 0)throw new F(`Unknown vertex: ${e}`);if(i===void 0)throw new F(`Unknown vertex: ${n}`);return r*this.numVertices+i}setEdge(e,n,r){if(this.sealed)throw new F("Graph already sealed");if(e===n)return;const i=this.getEdgeIndex(e,n),s=this.getEdgeIndex(n,e),a=Math.abs(r);a<Math.abs(this.edges[i])||a<Math.abs(this.edges[s])||(this.edges[i]=r,a>Math.abs(this.edges[s])&&(this.edges[s]=0))}addEdge(e,n,r){if(r<=0)throw new F(`Edge has non-positive weight: ${r}`);this.setEdge(e,n,r)}denyEdge(e,n,r){if(r<=0)throw new F(`Edge has non-positive weight: ${r}`);this.setEdge(e,n,-r)}hasEdge(e,n){return this.edges[this.getEdgeIndex(e,n)]>0}hasPath(e,n){if(!this.sealed)throw new F("Graph not yet sealed");return this.paths[this.getEdgeIndex(e,n)]>0}hasEdgeBetweenIds(e,n){if(e>this.numVertices)throw new F(`Vertex id out of range: ${e} > ${this.numVertices}`);if(n>this.numVertices)throw new F(`Vertex id out of range: ${n} > ${this.numVertices}`);return this.edges[e*this.numVertices+n]>0}seal(){if(this.sealed)throw new F("Graph already sealed");this.sealed=!0,this.derivePaths(),this.checkForCycles(),this.simplify(),this.countDependencies()}checkForCycles(){const e=this.findCycles();if(e.length)throw e.sort((n,r)=>n.length-r.length),new b("Precedence cycles detected for the following systems, please resolve by adjusting their schedules: "+e.map(n=>n.map(r=>r.toString()).join("—")).join(", "))}findCycles(){const e=new Array(this.numVertices).fill(!1),n=[],r=[],i=[];let s,a;for(let c=0;c<this.numVertices;c++)n[c]=new Set;const o=c=>{e[c]=!1;for(const u of n[c])n[c].delete(u),e[u]&&o(u)},l=c=>{let u=!1;r.push(c),e[c]=!0;for(let h=0;h<this.numVertices;h++)!a.has(h)||!this.hasEdgeBetweenIds(c,h)||(h===s?(i.push(r.map(_=>this.vertices[_])),u=!0):!e[h]&&l(h)&&(u=!0));if(u)o(c);else for(let h=0;h<this.numVertices;h++)!a.has(h)||!this.hasEdgeBetweenIds(c,h)||n[h].add(c);return r.pop(),u};for(s=0;s<this.numVertices;s++){const c=this.findLeastStronglyConnectedComponent(s);s=c[0];for(const u of c)e[u]=!1,n[u].clear();a=new Set(c),l(s)}return i}findLeastStronglyConnectedComponent(e){let n;const r=[],i=[],s=[],a=[];let o=0;const l=c=>{r[c]=++o,i.push(c),s.push(c);for(let u=e;u<this.numVertices;u++)if(this.hasEdgeBetweenIds(c,u))if(r[u]){if(!a[u])for(;s.length&&r[s[s.length-1]]>r[u];)s.pop()}else l(u);if(s[s.length-1]===c){const u=[];for(;;){const h=i.pop();if(u.push(h),a[h]=!0,h===c)break}s.pop(),u.sort((h,_)=>h-_),(!n||u[0]<n[0])&&(n=u)}};for(let c=e;c<this.numVertices;c++)r[c]||l(c);return n}induceSubgraph(e){const n=new pi(e);for(const r of e){if(!this.vertexIndexMap.has(r))throw new F(`Vertex not in graph: ${r}`);for(const i of e){const s=this.getEdgeIndex(r,i),a=this.edges[s];a>0?n.addEdge(r,i,a):a<0&&n.denyEdge(r,i,-a)}}return this.sealed&&n.seal(),n}sortTopologically(){const e=new Array(this.numVertices).fill(0);for(let i=0;i<this.numVertices;i++)for(let s=0;s<this.numVertices;s++)this.hasEdgeBetweenIds(i,s)&&(e[s]+=1);const n=[];let r;for(;n.length<this.numVertices;){r=!1;for(let i=0;i<e.length;i++)if(e[i]===0){r=!0,e[i]=-1,n.push(this.vertices[i]);for(let s=0;s<this.numVertices;s++)this.hasEdgeBetweenIds(i,s)&&(e[s]-=1)}if(!r)throw new F("Graph has a cycle, topological sort not possible")}return n}derivePaths(){const e=this.numVertices;for(let r=0;r<this.edges.length;r++)this.edges[r]<0&&(this.edges[r]=0);const n=this.edges.slice();for(let r=0;r<e;r++)for(let i=0;i<e;i++)if(r!==i)for(let s=0;s<e;s++){if(s===r||s===i)continue;const a=n[r*e+s],o=n[s*e+i];if(a&&o){const l=Math.min(a,o);n[r*e+i]<l&&n[i*e+r]<l&&(n[r*e+i]=l,n[i*e+r]=0)}}this.paths=n;for(let r=0;r<e;r++)for(let i=0;i<e;i++)this.edges[r*e+i]&&(this.edges[r*e+i]=n[r*e+i])}simplify(){const e=this.numVertices,n=this.paths.slice();for(let r=0;r<e;r++)for(let i=0;i<e;i++)if(n[i*e+r])for(let s=0;s<e;s++)n[r*e+s]&&(n[i*e+s]=0);this.edges=n}countDependencies(){for(let e=0;e<this.numVertices;e++){let n=0;for(let r=0;r<this.numVertices;r++)this.edges[r*this.numVertices+e]&&(n+=1);this.dependencyCounts[e]=n}}traverse(e){if(!this.sealed)throw new F("Graph not yet sealed");const n=[];if(e){this.numTraversedVertices+=1;const r=this.vertexIndexMap.get(e);if(r===void 0)throw new F(`Unknown vertex: ${e}`);for(let i=0;i<this.numVertices;i++)this.edges[r*this.numVertices+i]&&--this.traversalCounts[i]===0&&n.push(this.vertices[i])}else{this.numTraversedVertices=0;for(let r=0;r<this.numVertices;r++)(this.traversalCounts[r]=this.dependencyCounts[r])===0&&n.push(this.vertices[r])}if(this.numTraversedVertices!==this.numVertices)return n}printMatrix(e){const n=this.numVertices,r=[];for(let i=0;i<n;i++){const s=[];for(let a=0;a<n;a++)s.push(e[i*n+a]);r.push(s.join(" "))}return r.join(`
`)}static fromMatrix(e){typeof e=="string"&&(e=e.trim().split(/\s+/).map(s=>parseInt(s,10)));const n=Math.sqrt(e.length),r=[];for(let s=1;s<=n;s++)r.push(`v${s}`);const i=new pi(r);return i.edges=e,i}}class so{constructor(e,n){d(this,"planner");d(this,"group");d(this,"graph");this.planner=e,this.group=n,this.graph=e.graph.induceSubgraph(n.__systems)}}class Pl extends so{constructor(n,r){super(n,r);d(this,"planner");d(this,"group");d(this,"systems");if(this.planner=n,this.group=r,this.systems=this.graph.topologicallySortedVertices,this.systems.length>1&&typeof process>"u"){console.log("System execution order:");for(const i of this.systems)console.log(" ",i.name)}}execute(n,r){const i=this.planner.dispatcher,s=this.systems;this.group.__executed=!0;for(let a=0;a<s.length;a++)s[a].execute(n,r),i.flush();return Promise.resolve()}async initialize(){const n=this.planner.dispatcher;return this.group.__executed=!0,new Promise((r,i)=>{let s=!1;const a=async l=>{try{if(await l.prepare(),s)return;l.initialize(),n.flush();const c=this.graph.traverse(l);if(!c)return r();for(let u=0;u<c.length;u++)a(c[u])}catch(c){s=!0,i(c)}},o=this.graph.traverse();if(!o)return r();for(let l=0;l<o.length;l++)a(o[l])})}async finalize(){const n=this.planner.dispatcher;return this.group.__executed=!0,new Promise((r,i)=>{const s=o=>{try{o.finalize(),n.flush();const l=this.graph.traverse(o);if(!l)return r();for(let c=0;c<l.length;c++)s(l[c])}catch(l){i(l)}},a=this.graph.traverse();if(!a)return r();for(let o=0;o<a.length;o++)s(a[o])})}}class Ul extends so{execute(e,n){return Promise.resolve()}initialize(){return Promise.resolve()}finalize(){return Promise.resolve()}}class la{constructor(e){d(this,"id");d(this,"systems",[]);this.id=e}add(...e){for(const n of e)n.lane=this;this.systems.push(...e)}merge(e){return this===e?this:this.id===-1||e.id!==-1&&e.id<this.id?e.merge(this):(this.add(...e.systems),e.systems.length=0,this)}}class Fl{constructor(e,n,r){d(this,"dispatcher");d(this,"systems");d(this,"groups");d(this,"graph");d(this,"readers",new Map);d(this,"writers",new Map);d(this,"lanes",[]);d(this,"replicatedLane");d(this,"laneCount",0);this.dispatcher=e,this.systems=n,this.groups=r,this.graph=new pi(n);for(const i of e.registry.types)this.readers.set(i,new Set),this.writers.set(i,new Set);e.threaded&&(this.createLane(),this.replicatedLane=new la(-1))}get mainLane(){return this.lanes[0]}createLane(){const e=new la(this.laneCount++);return this.lanes.push(e),e}organize(){var e;for(const n of this.groups)n.__collectSystems(this.dispatcher);for(const n of this.systems)n.buildQueries();for(const n of this.systems)n.buildSchedule();for(const n of this.groups)n.__buildSchedule();this.addComponentEntitlementDependencies(),this.graph.seal(),this.dispatcher.threaded&&this.assignSystemsToLanes();for(const n of this.systems)n.stats.worker=((e=n.lane)==null?void 0:e.id)??0;delete this.readers,delete this.writers;for(const n of this.groups)n.__plan=this.dispatcher.threaded?new Ul(this,n):new Pl(this,n)}addComponentEntitlementDependencies(){for(const[e,n]of this.readers.entries())for(const r of n)for(const i of this.writers.get(e))this.graph.addEdge(i,r,1)}assignSystemsToLanes(){this.initSystemLanes(),this.mergeAccessorsOfUnsharedComponentTypes(),this.mergeAttachedSystems(),this.pruneEmptyLanes(),this.reduceLanes(this.dispatcher.threads+1),this.pruneEmptyLanes()}initSystemLanes(){for(const e of this.systems)e.lane||this.createLane().add(e)}mergeAccessorsOfUnsharedComponentTypes(){var e;for(const n of this.dispatcher.registry.types){if(n.__binding.fields.every(a=>a.type.shared))continue;const r=this.readers.get(n),i=this.writers.get(n);if(!r&&!i)continue;let s=(e=n.options)!=null&&e.restrictedToMainThread?this.mainLane:this.createLane();r==null||r.forEach(a=>{s=s.merge(a.lane)}),i==null||i.forEach(a=>{s=s.merge(a.lane)})}}mergeAttachedSystems(){for(const e of this.systems)for(const n of e.attachedSystems)n&&e.lane.merge(n.lane)}reduceLanes(e){if(this.lanes.length<=e)return;let n=[];for(let i=1;i<this.lanes.length-1;i++){const s=this.lanes[i];for(let a=i+1;a<this.lanes.length;a++){const o=this.lanes[a];n.push({laneA:s,laneB:o,independence:this.computeIndependence(s,o)})}}let r=this.lanes.length;for(;r>e;){n.sort((o,l)=>l.independence-o.independence);const i=n.pop(),s=i.laneA.merge(i.laneB),a=s===i.laneA?i.laneB:i.laneA;r-=1,r>e&&(n=n.filter(o=>o.laneA===a||o.laneB===a?!1:((o.laneA===s||o.laneB===s)&&(o.independence=this.computeIndependence(o.laneA,o.laneB)),!0)))}}computeIndependence(e,n){return Math.min(this.computeIndependentWeight(e,n),this.computeIndependentWeight(n,e))}computeIndependentWeight(e,n){let r=0;for(const i of e.systems){let s=0;for(const a of n.systems)!this.graph.hasPath(i,a)&&!this.graph.hasPath(a,i)&&(s+=a.weight);r+=Math.min(i.weight,s)}return r}pruneEmptyLanes(){this.lanes=this.lanes.filter(e=>e.id===0||e.systems.length);for(let e=1;e<this.lanes.length;e++)this.lanes[e].id=e}}class ri extends V{constructor(){super(...arguments);d(this,"__callback")}start(n,...r){throw new b("The build system cannot run coroutines")}execute(){this.__callback(this)}}d(ri,"__internal",!0);class ps extends V{}d(ps,"__internal",!0);var Me;(function(t){t[t.init=0]="init",t[t.setup=1]="setup",t[t.run=2]="run",t[t.finish=3]="finish",t[t.done=4]="done"})(Me||(Me={}));class Ll{constructor({defs:e,threads:n=1,maxEntities:r=1e4,maxLimboComponents:i=Math.ceil(r/5),maxShapeChangesPerFrame:s=r*2,maxWritesPerFrame:a=r*4,maxRefChangesPerFrame:o=r,defaultComponentStorage:l="packed"}){d(this,"maxEntities");d(this,"defaultComponentStorage");d(this,"registry");d(this,"systems");d(this,"systemsByClass",new Map);d(this,"systemGroups");d(this,"default");d(this,"lastTime");d(this,"executing");d(this,"executingSyncFrame");d(this,"state",Me.init);d(this,"shapeLog");d(this,"writeLog");d(this,"shapeLogFramePointer");d(this,"writeLogFramePointer");d(this,"stats");d(this,"indexer");d(this,"planner");d(this,"threads");d(this,"buffers");d(this,"singleton");d(this,"buildSystem");d(this,"deferredControls",new Map);if(n<1)throw new b("Minimum of one thread");if(n>1)throw new b("Multithreading not yet implemented");if(r>_s)throw new b(`maxEntities too high, the limit is ${_s}`);const{componentTypes:c,componentEnums:u,systemTypes:h,systemGroups:_}=this.splitDefs([e??[],ni,dr]);if(c.length>_i)throw new b(`Too many component types, the limit is ${_i}`);this.stats=new Il,this.threads=n,this.buffers=new Bl(n>1),this.maxEntities=r,this.defaultComponentStorage=l,this.registry=new bl(r,i,c,u,this),this.indexer=new Ol(this,o),this.shapeLog=new fi(s,"maxShapeChangesPerFrame",this.buffers,{sortedByComponentType:!0,numComponentTypes:this.registry.types.length}),this.shapeLogFramePointer=this.shapeLog.createPointer(),this.systemGroups=_,this.systems=this.createSystems(h),this.createBuildSystem(),this.registry.initializeComponentTypes(),this.registry.validateSystem=this.createValidateSystem(c),this.singleton=this.createSingletons();for(const p of this.systems)p.replacePlaceholders();this.planner=new Fl(this,this.systems,this.systemGroups),this.planner.organize(),this.registry.hasNegativeQueries=this.systems.some(p=>p.hasNegativeQueries),this.systems.some(p=>p.hasWriteQueries)&&(this.writeLog=new fi(a,"maxWritesPerFrame",this.buffers,{sortedByComponentType:!0,numComponentTypes:this.registry.types.length}),this.writeLogFramePointer=this.writeLog.createPointer());for(const p of this.systems)p.finishConstructing();this.state=Me.setup}get threaded(){return this.threads>1}get defaultGroup(){return this.default.group}createSystems(e){const n=[],r=[],i=new Set;let s=0;for(let a=0;a<e.length;a++){const o=e[a];let l=this.systemsByClass.get(o);if(!l){if(o.name||Object.defineProperty(o,"name",{value:`Anonymous_${s++}`}),!o.__internal){if(i.has(o.name))throw new b(`Multiple component types named ${o.name}; names must be unique`);i.add(o.name)}this.stats.forSystem(o),r.push(o);const u=new o;u.id=a+2,l=new ts(u,this),n.push(l),this.systemsByClass.set(o,l)}const c=e[a+1];c&&typeof c!="function"&&(l.assignProps(c),a++)}return this.default=this.createSingleGroupFrame(r),n}createBuildSystem(){this.buildSystem=new ri,this.buildSystem.id=0;const e=new ts(this.buildSystem,this);e.accessMasks.read=void 0,e.accessMasks.update=void 0,e.accessMasks.create=void 0,e.accessMasks.write=void 0,e.accessMasks.check=void 0,this.systems.push(e),this.systemsByClass.set(ri,e)}createValidateSystem(e){const n=new ps;n.id=1;const r=new ts(n,this);for(const i of e)ti(r.accessMasks.check,i);return this.systems.push(r),this.systemsByClass.set(ps,r),r}createSingleGroupFrame(e){const n=new Yn(e);this.systemGroups.push(n);const r=new ro(this,[n]);return{group:n,frame:r}}createSingletons(){const e=new Set,n=this.systems.flatMap(i=>i.singletonComponentDefs.filter((s,a)=>{let o=!0;return typeof s=="function"&&(o=a<i.singletonComponentDefs.length-1&&typeof i.singletonComponentDefs[a+1]!="function",o&&e.add(s)),o})).concat(this.systems.flatMap(i=>i.singletonComponentDefs.filter(s=>typeof s=="function"&&!e.has(s)?(e.add(s),!0):!1)));if(!n.length)return;this.executing=!0;const r=this.createEntity(n).hold();return this.executing=!1,this.flush(),r}splitDefs(e){const n=[],r=new Set,i=new Set,s=[],a=[];let o=!1;for(const c of e.flat(1/0))if(c instanceof Yn){a.push(c);const{componentTypes:u,systemTypes:h,systemGroups:_}=this.splitDefs(c.__contents);for(const p of u)l(p);s.push(...h),a.push(..._)}else if(typeof c=="function")o=!!c.__system,o?s.push(c):l(c);else if(c instanceof Ci){i.add(c);for(const u of c.__types)l(u)}else{if(!o)throw new b("Unexpected value in world defs: "+c);s.push(c),o=!1}return{componentTypes:n,componentEnums:Array.from(i),systemTypes:s,systemGroups:a};function l(c){if(c.enum&&!i.has(c.enum)){i.add(c.enum);for(const u of c.enum.__types)l(u)}else r.has(c)||(n.push(c),r.add(c))}}getSystems(e){if(e instanceof Yn)return e.__systems;const n=this.systemsByClass.get(e);if(!n)throw new b(`System ${e.name} not registered in world`);return[n]}async initialize(){await this.default.frame.begin(),this.state=Me.setup,await this.default.group.__plan.initialize(),await this.default.frame.end(),this.stats.frames-=1}async finalize(){await this.default.frame.begin(),this.state=Me.done,await this.default.group.__plan.finalize(),await this.default.frame.end(),this.stats.frames-=1,this.registry.releaseComponentTypes()}async execute(e,n){await this.default.frame.begin(),await this.default.frame.execute(this.default.group,e,n),await this.default.frame.end()}executeFunction(e){this.startFrame(this.lastTime),this.executingSyncFrame=!0,this.buildSystem.__callback=e,this.systemsByClass.get(ri).execute(this.lastTime,0),this.flush(),this.completeCycle(),this.completeFrame(),this.executingSyncFrame=!1,this.stats.frames-=1}completeCycle(){var e;this.registry.completeCycle(),this.indexer.completeCycle(),(e=this.writeLog)==null||e.commit()}startFrame(e){if(this.executing)throw new b("Another frame already executing");if(this.executing=!0,this.state!==Me.setup&&this.state!==Me.run&&this.state!==Me.finish)throw new b("World terminated");this.state=Me.run,this.lastTime=e}completeFrame(){if(!this.executing)throw new F("No frame executing");return this.executing=!1,this.gatherFrameStats(),this.processDeferredControls(),this.state===Me.finish?this.finalize():Promise.resolve()}gatherFrameStats(){var e;this.stats.frames+=1,this.stats.maxShapeChangesPerFrame=this.shapeLog.countSince(this.shapeLogFramePointer),this.stats.maxWritesPerFrame=((e=this.writeLog)==null?void 0:e.countSince(this.writeLogFramePointer))??0}flush(){var e;this.indexer.flush(),this.registry.flush(),this.shapeLog.commit(),(e=this.writeLog)==null||e.commit()}async terminate(){{if(this.state!==Me.setup&&this.state!==Me.run)throw new b("World terminated");if(this.executingSyncFrame)throw new b("Cannot terminate world from within build callback")}this.state=Me.finish,this.executing||await this.finalize()}createEntity(e){const n=this.registry.createEntity(e);return this.executing||this.flush(),n}control(e){this.checkControlOverlap(e),this.deferRequestedRunState(e.stop,ft.STOPPED),this.deferRequestedRunState(e.restart,ft.RUNNING),this.executing||this.processDeferredControls()}deferRequestedRunState(e,n){for(const r of this.splitDefs(e).systemTypes){if(!r.__system)continue;const i=this.systemsByClass.get(r);if(!i)throw new b(`System ${r.name} not defined for this world`);this.deferredControls.set(i,n)}}checkControlOverlap(e){const n=new Set;for(const r of this.splitDefs(e.stop).systemTypes)r.__system&&n.add(r);for(const r of this.splitDefs(e.restart).systemTypes)if(r.__system&&n.has(r))throw new b(`Request to both stop and restart system ${r.name}`)}processDeferredControls(){if(this.deferredControls.size){for(const[e,n]of this.deferredControls.entries())switch(n){case ft.STOPPED:e.stop();break;case ft.RUNNING:e.restart();break}this.deferredControls.clear()}}}const ca={};class Mi{constructor(e,n){d(this,"__dispatcher");if(n!==ca)throw new b("Don't call World constructor directly; use World.create instead");this.__dispatcher=new Ll(e)}static async create(e={}){const n=new Mi(e,ca);return await n.__dispatcher.initialize(),n}static defineEnum(e,...n){return typeof e=="function"&&(n.unshift(e),e=""),e=e||"<anonymous>",new Ci(e,n)}build(e){if(this.__dispatcher.state!==Me.setup&&(typeof process>"u"||!0))throw new b("This method cannot be called after the world has started executing");this.__dispatcher.executeFunction(e)}createEntity(...e){if(this.__dispatcher.state!==Me.setup&&(typeof process>"u"||!0))throw new b("This method cannot be called after the world has started executing");this.__dispatcher.createEntity(e)}execute(e,n){return this.__dispatcher.execute(e,n)}control(e){this.__dispatcher.control(e)}createCustomExecutor(...e){return new ro(this.__dispatcher,e)}async terminate(){await this.__dispatcher.terminate()}get stats(){return this.__dispatcher.stats}get alive(){return this.__dispatcher.state!==Me.done}}var Vl=function(t){return t==null};const hn=Vl;var Hl={}.toString,zl=function(t,e){return Hl.call(t)==="[object "+e+"]"};const kl=zl;var Xl=function(t,e,n){return t<e?e:t>n?n:t};const Wl=Xl;var $l=function(t){return kl(t,"Number")};const Xn=$l;var jl=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});function ao(t,e,n,r,i,s,a,o,l,c,u,h,_,p,f,g){var m=new jl(16);return m[0]=t,m[1]=e,m[2]=n,m[3]=r,m[4]=i,m[5]=s,m[6]=a,m[7]=o,m[8]=l,m[9]=c,m[10]=u,m[11]=h,m[12]=_,m[13]=p,m[14]=f,m[15]=g,m}var ms=function(t,e){return ms=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])},ms(t,e)};function ue(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");ms(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}var fe=function(){return fe=Object.assign||function(e){for(var n,r=1,i=arguments.length;r<i;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},fe.apply(this,arguments)};function ql(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function vr(t,e,n,r){function i(s){return s instanceof n?s:new n(function(a){a(s)})}return new(n||(n=Promise))(function(s,a){function o(u){try{c(r.next(u))}catch(h){a(h)}}function l(u){try{c(r.throw(u))}catch(h){a(h)}}function c(u){u.done?s(u.value):i(u.value).then(o,l)}c((r=r.apply(t,e||[])).next())})}function Ar(t,e){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,a;return a={next:o(0),throw:o(1),return:o(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function o(c){return function(u){return l([c,u])}}function l(c){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(n=0)),n;)try{if(r=1,i&&(s=c[0]&2?i.return:c[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,c[1])).done)return s;switch(i=0,s&&(c=[c[0]&2,s.value]),c[0]){case 0:case 1:s=c;break;case 4:return n.label++,{value:c[1],done:!1};case 5:n.label++,i=c[1],c=[0];continue;case 7:c=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(c[0]===6||c[0]===2)){n=0;continue}if(c[0]===3&&(!s||c[1]>s[0]&&c[1]<s[3])){n.label=c[1];break}if(c[0]===6&&n.label<s[1]){n.label=s[1],s=c;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(c);break}s[2]&&n.ops.pop(),n.trys.pop();continue}c=e.call(t,n)}catch(u){c=[6,u],i=0}finally{r=s=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function br(t){var e=typeof Symbol=="function"&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function gs(t,e){var n=typeof Symbol=="function"&&t[Symbol.iterator];if(!n)return t;var r=n.call(t),i,s=[],a;try{for(;(e===void 0||e-- >0)&&!(i=r.next()).done;)s.push(i.value)}catch(o){a={error:o}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(a)throw a.error}}return s}function Yl(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var oo={exports:{}};(function(t){var e=Object.prototype.hasOwnProperty,n="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(n=!1));function i(l,c,u){this.fn=l,this.context=c,this.once=u||!1}function s(l,c,u,h,_){if(typeof u!="function")throw new TypeError("The listener must be a function");var p=new i(u,h||l,_),f=n?n+c:c;return l._events[f]?l._events[f].fn?l._events[f]=[l._events[f],p]:l._events[f].push(p):(l._events[f]=p,l._eventsCount++),l}function a(l,c){--l._eventsCount===0?l._events=new r:delete l._events[c]}function o(){this._events=new r,this._eventsCount=0}o.prototype.eventNames=function(){var c=[],u,h;if(this._eventsCount===0)return c;for(h in u=this._events)e.call(u,h)&&c.push(n?h.slice(1):h);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(u)):c},o.prototype.listeners=function(c){var u=n?n+c:c,h=this._events[u];if(!h)return[];if(h.fn)return[h.fn];for(var _=0,p=h.length,f=new Array(p);_<p;_++)f[_]=h[_].fn;return f},o.prototype.listenerCount=function(c){var u=n?n+c:c,h=this._events[u];return h?h.fn?1:h.length:0},o.prototype.emit=function(c,u,h,_,p,f){var g=n?n+c:c;if(!this._events[g])return!1;var m=this._events[g],E=arguments.length,v,x;if(m.fn){switch(m.once&&this.removeListener(c,m.fn,void 0,!0),E){case 1:return m.fn.call(m.context),!0;case 2:return m.fn.call(m.context,u),!0;case 3:return m.fn.call(m.context,u,h),!0;case 4:return m.fn.call(m.context,u,h,_),!0;case 5:return m.fn.call(m.context,u,h,_,p),!0;case 6:return m.fn.call(m.context,u,h,_,p,f),!0}for(x=1,v=new Array(E-1);x<E;x++)v[x-1]=arguments[x];m.fn.apply(m.context,v)}else{var C=m.length,k;for(x=0;x<C;x++)switch(m[x].once&&this.removeListener(c,m[x].fn,void 0,!0),E){case 1:m[x].fn.call(m[x].context);break;case 2:m[x].fn.call(m[x].context,u);break;case 3:m[x].fn.call(m[x].context,u,h);break;case 4:m[x].fn.call(m[x].context,u,h,_);break;default:if(!v)for(k=1,v=new Array(E-1);k<E;k++)v[k-1]=arguments[k];m[x].fn.apply(m[x].context,v)}}return!0},o.prototype.on=function(c,u,h){return s(this,c,u,h,!1)},o.prototype.once=function(c,u,h){return s(this,c,u,h,!0)},o.prototype.removeListener=function(c,u,h,_){var p=n?n+c:c;if(!this._events[p])return this;if(!u)return a(this,p),this;var f=this._events[p];if(f.fn)f.fn===u&&(!_||f.once)&&(!h||f.context===h)&&a(this,p);else{for(var g=0,m=[],E=f.length;g<E;g++)(f[g].fn!==u||_&&!f[g].once||h&&f[g].context!==h)&&m.push(f[g]);m.length?this._events[p]=m.length===1?m[0]:m:a(this,p)}return this},o.prototype.removeAllListeners=function(c){var u;return c?(u=n?n+c:c,this._events[u]&&a(this,u)):(this._events=new r,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=n,o.EventEmitter=o,t.exports=o})(oo);var Kl=oo.exports;const lo=Yl(Kl);var R;(function(t){t[t.DEPTH_BUFFER_BIT=256]="DEPTH_BUFFER_BIT",t[t.STENCIL_BUFFER_BIT=1024]="STENCIL_BUFFER_BIT",t[t.COLOR_BUFFER_BIT=16384]="COLOR_BUFFER_BIT",t[t.POINTS=0]="POINTS",t[t.LINES=1]="LINES",t[t.LINE_LOOP=2]="LINE_LOOP",t[t.LINE_STRIP=3]="LINE_STRIP",t[t.TRIANGLES=4]="TRIANGLES",t[t.TRIANGLE_STRIP=5]="TRIANGLE_STRIP",t[t.TRIANGLE_FAN=6]="TRIANGLE_FAN",t[t.ZERO=0]="ZERO",t[t.ONE=1]="ONE",t[t.SRC_COLOR=768]="SRC_COLOR",t[t.ONE_MINUS_SRC_COLOR=769]="ONE_MINUS_SRC_COLOR",t[t.SRC_ALPHA=770]="SRC_ALPHA",t[t.ONE_MINUS_SRC_ALPHA=771]="ONE_MINUS_SRC_ALPHA",t[t.DST_ALPHA=772]="DST_ALPHA",t[t.ONE_MINUS_DST_ALPHA=773]="ONE_MINUS_DST_ALPHA",t[t.DST_COLOR=774]="DST_COLOR",t[t.ONE_MINUS_DST_COLOR=775]="ONE_MINUS_DST_COLOR",t[t.SRC_ALPHA_SATURATE=776]="SRC_ALPHA_SATURATE",t[t.CONSTANT_COLOR=32769]="CONSTANT_COLOR",t[t.ONE_MINUS_CONSTANT_COLOR=32770]="ONE_MINUS_CONSTANT_COLOR",t[t.CONSTANT_ALPHA=32771]="CONSTANT_ALPHA",t[t.ONE_MINUS_CONSTANT_ALPHA=32772]="ONE_MINUS_CONSTANT_ALPHA",t[t.FUNC_ADD=32774]="FUNC_ADD",t[t.FUNC_SUBTRACT=32778]="FUNC_SUBTRACT",t[t.FUNC_REVERSE_SUBTRACT=32779]="FUNC_REVERSE_SUBTRACT",t[t.BLEND_EQUATION=32777]="BLEND_EQUATION",t[t.BLEND_EQUATION_RGB=32777]="BLEND_EQUATION_RGB",t[t.BLEND_EQUATION_ALPHA=34877]="BLEND_EQUATION_ALPHA",t[t.BLEND_DST_RGB=32968]="BLEND_DST_RGB",t[t.BLEND_SRC_RGB=32969]="BLEND_SRC_RGB",t[t.BLEND_DST_ALPHA=32970]="BLEND_DST_ALPHA",t[t.BLEND_SRC_ALPHA=32971]="BLEND_SRC_ALPHA",t[t.BLEND_COLOR=32773]="BLEND_COLOR",t[t.ARRAY_BUFFER_BINDING=34964]="ARRAY_BUFFER_BINDING",t[t.ELEMENT_ARRAY_BUFFER_BINDING=34965]="ELEMENT_ARRAY_BUFFER_BINDING",t[t.LINE_WIDTH=2849]="LINE_WIDTH",t[t.ALIASED_POINT_SIZE_RANGE=33901]="ALIASED_POINT_SIZE_RANGE",t[t.ALIASED_LINE_WIDTH_RANGE=33902]="ALIASED_LINE_WIDTH_RANGE",t[t.CULL_FACE_MODE=2885]="CULL_FACE_MODE",t[t.FRONT_FACE=2886]="FRONT_FACE",t[t.DEPTH_RANGE=2928]="DEPTH_RANGE",t[t.DEPTH_WRITEMASK=2930]="DEPTH_WRITEMASK",t[t.DEPTH_CLEAR_VALUE=2931]="DEPTH_CLEAR_VALUE",t[t.DEPTH_FUNC=2932]="DEPTH_FUNC",t[t.STENCIL_CLEAR_VALUE=2961]="STENCIL_CLEAR_VALUE",t[t.STENCIL_FUNC=2962]="STENCIL_FUNC",t[t.STENCIL_FAIL=2964]="STENCIL_FAIL",t[t.STENCIL_PASS_DEPTH_FAIL=2965]="STENCIL_PASS_DEPTH_FAIL",t[t.STENCIL_PASS_DEPTH_PASS=2966]="STENCIL_PASS_DEPTH_PASS",t[t.STENCIL_REF=2967]="STENCIL_REF",t[t.STENCIL_VALUE_MASK=2963]="STENCIL_VALUE_MASK",t[t.STENCIL_WRITEMASK=2968]="STENCIL_WRITEMASK",t[t.STENCIL_BACK_FUNC=34816]="STENCIL_BACK_FUNC",t[t.STENCIL_BACK_FAIL=34817]="STENCIL_BACK_FAIL",t[t.STENCIL_BACK_PASS_DEPTH_FAIL=34818]="STENCIL_BACK_PASS_DEPTH_FAIL",t[t.STENCIL_BACK_PASS_DEPTH_PASS=34819]="STENCIL_BACK_PASS_DEPTH_PASS",t[t.STENCIL_BACK_REF=36003]="STENCIL_BACK_REF",t[t.STENCIL_BACK_VALUE_MASK=36004]="STENCIL_BACK_VALUE_MASK",t[t.STENCIL_BACK_WRITEMASK=36005]="STENCIL_BACK_WRITEMASK",t[t.VIEWPORT=2978]="VIEWPORT",t[t.SCISSOR_BOX=3088]="SCISSOR_BOX",t[t.COLOR_CLEAR_VALUE=3106]="COLOR_CLEAR_VALUE",t[t.COLOR_WRITEMASK=3107]="COLOR_WRITEMASK",t[t.UNPACK_ALIGNMENT=3317]="UNPACK_ALIGNMENT",t[t.PACK_ALIGNMENT=3333]="PACK_ALIGNMENT",t[t.MAX_TEXTURE_SIZE=3379]="MAX_TEXTURE_SIZE",t[t.MAX_VIEWPORT_DIMS=3386]="MAX_VIEWPORT_DIMS",t[t.SUBPIXEL_BITS=3408]="SUBPIXEL_BITS",t[t.RED_BITS=3410]="RED_BITS",t[t.GREEN_BITS=3411]="GREEN_BITS",t[t.BLUE_BITS=3412]="BLUE_BITS",t[t.ALPHA_BITS=3413]="ALPHA_BITS",t[t.DEPTH_BITS=3414]="DEPTH_BITS",t[t.STENCIL_BITS=3415]="STENCIL_BITS",t[t.POLYGON_OFFSET_UNITS=10752]="POLYGON_OFFSET_UNITS",t[t.POLYGON_OFFSET_FACTOR=32824]="POLYGON_OFFSET_FACTOR",t[t.TEXTURE_BINDING_2D=32873]="TEXTURE_BINDING_2D",t[t.SAMPLE_BUFFERS=32936]="SAMPLE_BUFFERS",t[t.SAMPLES=32937]="SAMPLES",t[t.SAMPLE_COVERAGE_VALUE=32938]="SAMPLE_COVERAGE_VALUE",t[t.SAMPLE_COVERAGE_INVERT=32939]="SAMPLE_COVERAGE_INVERT",t[t.COMPRESSED_TEXTURE_FORMATS=34467]="COMPRESSED_TEXTURE_FORMATS",t[t.VENDOR=7936]="VENDOR",t[t.RENDERER=7937]="RENDERER",t[t.VERSION=7938]="VERSION",t[t.IMPLEMENTATION_COLOR_READ_TYPE=35738]="IMPLEMENTATION_COLOR_READ_TYPE",t[t.IMPLEMENTATION_COLOR_READ_FORMAT=35739]="IMPLEMENTATION_COLOR_READ_FORMAT",t[t.BROWSER_DEFAULT_WEBGL=37444]="BROWSER_DEFAULT_WEBGL",t[t.STATIC_DRAW=35044]="STATIC_DRAW",t[t.STREAM_DRAW=35040]="STREAM_DRAW",t[t.DYNAMIC_DRAW=35048]="DYNAMIC_DRAW",t[t.ARRAY_BUFFER=34962]="ARRAY_BUFFER",t[t.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",t[t.BUFFER_SIZE=34660]="BUFFER_SIZE",t[t.BUFFER_USAGE=34661]="BUFFER_USAGE",t[t.CURRENT_VERTEX_ATTRIB=34342]="CURRENT_VERTEX_ATTRIB",t[t.VERTEX_ATTRIB_ARRAY_ENABLED=34338]="VERTEX_ATTRIB_ARRAY_ENABLED",t[t.VERTEX_ATTRIB_ARRAY_SIZE=34339]="VERTEX_ATTRIB_ARRAY_SIZE",t[t.VERTEX_ATTRIB_ARRAY_STRIDE=34340]="VERTEX_ATTRIB_ARRAY_STRIDE",t[t.VERTEX_ATTRIB_ARRAY_TYPE=34341]="VERTEX_ATTRIB_ARRAY_TYPE",t[t.VERTEX_ATTRIB_ARRAY_NORMALIZED=34922]="VERTEX_ATTRIB_ARRAY_NORMALIZED",t[t.VERTEX_ATTRIB_ARRAY_POINTER=34373]="VERTEX_ATTRIB_ARRAY_POINTER",t[t.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING=34975]="VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",t[t.CULL_FACE=2884]="CULL_FACE",t[t.FRONT=1028]="FRONT",t[t.BACK=1029]="BACK",t[t.FRONT_AND_BACK=1032]="FRONT_AND_BACK",t[t.BLEND=3042]="BLEND",t[t.DEPTH_TEST=2929]="DEPTH_TEST",t[t.DITHER=3024]="DITHER",t[t.POLYGON_OFFSET_FILL=32823]="POLYGON_OFFSET_FILL",t[t.SAMPLE_ALPHA_TO_COVERAGE=32926]="SAMPLE_ALPHA_TO_COVERAGE",t[t.SAMPLE_COVERAGE=32928]="SAMPLE_COVERAGE",t[t.SCISSOR_TEST=3089]="SCISSOR_TEST",t[t.STENCIL_TEST=2960]="STENCIL_TEST",t[t.NO_ERROR=0]="NO_ERROR",t[t.INVALID_ENUM=1280]="INVALID_ENUM",t[t.INVALID_VALUE=1281]="INVALID_VALUE",t[t.INVALID_OPERATION=1282]="INVALID_OPERATION",t[t.OUT_OF_MEMORY=1285]="OUT_OF_MEMORY",t[t.CONTEXT_LOST_WEBGL=37442]="CONTEXT_LOST_WEBGL",t[t.CW=2304]="CW",t[t.CCW=2305]="CCW",t[t.DONT_CARE=4352]="DONT_CARE",t[t.FASTEST=4353]="FASTEST",t[t.NICEST=4354]="NICEST",t[t.GENERATE_MIPMAP_HINT=33170]="GENERATE_MIPMAP_HINT",t[t.BYTE=5120]="BYTE",t[t.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",t[t.SHORT=5122]="SHORT",t[t.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",t[t.INT=5124]="INT",t[t.UNSIGNED_INT=5125]="UNSIGNED_INT",t[t.FLOAT=5126]="FLOAT",t[t.DOUBLE=5130]="DOUBLE",t[t.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",t[t.ALPHA=6406]="ALPHA",t[t.RGB=6407]="RGB",t[t.RGBA=6408]="RGBA",t[t.LUMINANCE=6409]="LUMINANCE",t[t.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",t[t.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",t[t.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",t[t.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",t[t.FRAGMENT_SHADER=35632]="FRAGMENT_SHADER",t[t.VERTEX_SHADER=35633]="VERTEX_SHADER",t[t.COMPILE_STATUS=35713]="COMPILE_STATUS",t[t.DELETE_STATUS=35712]="DELETE_STATUS",t[t.LINK_STATUS=35714]="LINK_STATUS",t[t.VALIDATE_STATUS=35715]="VALIDATE_STATUS",t[t.ATTACHED_SHADERS=35717]="ATTACHED_SHADERS",t[t.ACTIVE_ATTRIBUTES=35721]="ACTIVE_ATTRIBUTES",t[t.ACTIVE_UNIFORMS=35718]="ACTIVE_UNIFORMS",t[t.MAX_VERTEX_ATTRIBS=34921]="MAX_VERTEX_ATTRIBS",t[t.MAX_VERTEX_UNIFORM_VECTORS=36347]="MAX_VERTEX_UNIFORM_VECTORS",t[t.MAX_VARYING_VECTORS=36348]="MAX_VARYING_VECTORS",t[t.MAX_COMBINED_TEXTURE_IMAGE_UNITS=35661]="MAX_COMBINED_TEXTURE_IMAGE_UNITS",t[t.MAX_VERTEX_TEXTURE_IMAGE_UNITS=35660]="MAX_VERTEX_TEXTURE_IMAGE_UNITS",t[t.MAX_TEXTURE_IMAGE_UNITS=34930]="MAX_TEXTURE_IMAGE_UNITS",t[t.MAX_FRAGMENT_UNIFORM_VECTORS=36349]="MAX_FRAGMENT_UNIFORM_VECTORS",t[t.SHADER_TYPE=35663]="SHADER_TYPE",t[t.SHADING_LANGUAGE_VERSION=35724]="SHADING_LANGUAGE_VERSION",t[t.CURRENT_PROGRAM=35725]="CURRENT_PROGRAM",t[t.NEVER=512]="NEVER",t[t.ALWAYS=519]="ALWAYS",t[t.LESS=513]="LESS",t[t.EQUAL=514]="EQUAL",t[t.LEQUAL=515]="LEQUAL",t[t.GREATER=516]="GREATER",t[t.GEQUAL=518]="GEQUAL",t[t.NOTEQUAL=517]="NOTEQUAL",t[t.KEEP=7680]="KEEP",t[t.REPLACE=7681]="REPLACE",t[t.INCR=7682]="INCR",t[t.DECR=7683]="DECR",t[t.INVERT=5386]="INVERT",t[t.INCR_WRAP=34055]="INCR_WRAP",t[t.DECR_WRAP=34056]="DECR_WRAP",t[t.NEAREST=9728]="NEAREST",t[t.LINEAR=9729]="LINEAR",t[t.NEAREST_MIPMAP_NEAREST=9984]="NEAREST_MIPMAP_NEAREST",t[t.LINEAR_MIPMAP_NEAREST=9985]="LINEAR_MIPMAP_NEAREST",t[t.NEAREST_MIPMAP_LINEAR=9986]="NEAREST_MIPMAP_LINEAR",t[t.LINEAR_MIPMAP_LINEAR=9987]="LINEAR_MIPMAP_LINEAR",t[t.TEXTURE_MAG_FILTER=10240]="TEXTURE_MAG_FILTER",t[t.TEXTURE_MIN_FILTER=10241]="TEXTURE_MIN_FILTER",t[t.TEXTURE_WRAP_S=10242]="TEXTURE_WRAP_S",t[t.TEXTURE_WRAP_T=10243]="TEXTURE_WRAP_T",t[t.TEXTURE_2D=3553]="TEXTURE_2D",t[t.TEXTURE=5890]="TEXTURE",t[t.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",t[t.TEXTURE_BINDING_CUBE_MAP=34068]="TEXTURE_BINDING_CUBE_MAP",t[t.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",t[t.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",t[t.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",t[t.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",t[t.MAX_CUBE_MAP_TEXTURE_SIZE=34076]="MAX_CUBE_MAP_TEXTURE_SIZE",t[t.TEXTURE0=33984]="TEXTURE0",t[t.ACTIVE_TEXTURE=34016]="ACTIVE_TEXTURE",t[t.REPEAT=10497]="REPEAT",t[t.CLAMP_TO_EDGE=33071]="CLAMP_TO_EDGE",t[t.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",t[t.TEXTURE_WIDTH=4096]="TEXTURE_WIDTH",t[t.TEXTURE_HEIGHT=4097]="TEXTURE_HEIGHT",t[t.FLOAT_VEC2=35664]="FLOAT_VEC2",t[t.FLOAT_VEC3=35665]="FLOAT_VEC3",t[t.FLOAT_VEC4=35666]="FLOAT_VEC4",t[t.INT_VEC2=35667]="INT_VEC2",t[t.INT_VEC3=35668]="INT_VEC3",t[t.INT_VEC4=35669]="INT_VEC4",t[t.BOOL=35670]="BOOL",t[t.BOOL_VEC2=35671]="BOOL_VEC2",t[t.BOOL_VEC3=35672]="BOOL_VEC3",t[t.BOOL_VEC4=35673]="BOOL_VEC4",t[t.FLOAT_MAT2=35674]="FLOAT_MAT2",t[t.FLOAT_MAT3=35675]="FLOAT_MAT3",t[t.FLOAT_MAT4=35676]="FLOAT_MAT4",t[t.SAMPLER_2D=35678]="SAMPLER_2D",t[t.SAMPLER_CUBE=35680]="SAMPLER_CUBE",t[t.LOW_FLOAT=36336]="LOW_FLOAT",t[t.MEDIUM_FLOAT=36337]="MEDIUM_FLOAT",t[t.HIGH_FLOAT=36338]="HIGH_FLOAT",t[t.LOW_INT=36339]="LOW_INT",t[t.MEDIUM_INT=36340]="MEDIUM_INT",t[t.HIGH_INT=36341]="HIGH_INT",t[t.FRAMEBUFFER=36160]="FRAMEBUFFER",t[t.RENDERBUFFER=36161]="RENDERBUFFER",t[t.RGBA4=32854]="RGBA4",t[t.RGB5_A1=32855]="RGB5_A1",t[t.RGB565=36194]="RGB565",t[t.DEPTH_COMPONENT16=33189]="DEPTH_COMPONENT16",t[t.STENCIL_INDEX=6401]="STENCIL_INDEX",t[t.STENCIL_INDEX8=36168]="STENCIL_INDEX8",t[t.DEPTH_STENCIL=34041]="DEPTH_STENCIL",t[t.RENDERBUFFER_WIDTH=36162]="RENDERBUFFER_WIDTH",t[t.RENDERBUFFER_HEIGHT=36163]="RENDERBUFFER_HEIGHT",t[t.RENDERBUFFER_INTERNAL_FORMAT=36164]="RENDERBUFFER_INTERNAL_FORMAT",t[t.RENDERBUFFER_RED_SIZE=36176]="RENDERBUFFER_RED_SIZE",t[t.RENDERBUFFER_GREEN_SIZE=36177]="RENDERBUFFER_GREEN_SIZE",t[t.RENDERBUFFER_BLUE_SIZE=36178]="RENDERBUFFER_BLUE_SIZE",t[t.RENDERBUFFER_ALPHA_SIZE=36179]="RENDERBUFFER_ALPHA_SIZE",t[t.RENDERBUFFER_DEPTH_SIZE=36180]="RENDERBUFFER_DEPTH_SIZE",t[t.RENDERBUFFER_STENCIL_SIZE=36181]="RENDERBUFFER_STENCIL_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE=36048]="FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",t[t.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME=36049]="FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",t[t.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL=36050]="FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",t[t.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE=36051]="FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",t[t.COLOR_ATTACHMENT0=36064]="COLOR_ATTACHMENT0",t[t.DEPTH_ATTACHMENT=36096]="DEPTH_ATTACHMENT",t[t.STENCIL_ATTACHMENT=36128]="STENCIL_ATTACHMENT",t[t.DEPTH_STENCIL_ATTACHMENT=33306]="DEPTH_STENCIL_ATTACHMENT",t[t.NONE=0]="NONE",t[t.FRAMEBUFFER_COMPLETE=36053]="FRAMEBUFFER_COMPLETE",t[t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT=36054]="FRAMEBUFFER_INCOMPLETE_ATTACHMENT",t[t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT=36055]="FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",t[t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS=36057]="FRAMEBUFFER_INCOMPLETE_DIMENSIONS",t[t.FRAMEBUFFER_UNSUPPORTED=36061]="FRAMEBUFFER_UNSUPPORTED",t[t.FRAMEBUFFER_BINDING=36006]="FRAMEBUFFER_BINDING",t[t.RENDERBUFFER_BINDING=36007]="RENDERBUFFER_BINDING",t[t.READ_FRAMEBUFFER=36008]="READ_FRAMEBUFFER",t[t.DRAW_FRAMEBUFFER=36009]="DRAW_FRAMEBUFFER",t[t.MAX_RENDERBUFFER_SIZE=34024]="MAX_RENDERBUFFER_SIZE",t[t.INVALID_FRAMEBUFFER_OPERATION=1286]="INVALID_FRAMEBUFFER_OPERATION",t[t.UNPACK_FLIP_Y_WEBGL=37440]="UNPACK_FLIP_Y_WEBGL",t[t.UNPACK_PREMULTIPLY_ALPHA_WEBGL=37441]="UNPACK_PREMULTIPLY_ALPHA_WEBGL",t[t.UNPACK_COLORSPACE_CONVERSION_WEBGL=37443]="UNPACK_COLORSPACE_CONVERSION_WEBGL",t[t.READ_BUFFER=3074]="READ_BUFFER",t[t.UNPACK_ROW_LENGTH=3314]="UNPACK_ROW_LENGTH",t[t.UNPACK_SKIP_ROWS=3315]="UNPACK_SKIP_ROWS",t[t.UNPACK_SKIP_PIXELS=3316]="UNPACK_SKIP_PIXELS",t[t.PACK_ROW_LENGTH=3330]="PACK_ROW_LENGTH",t[t.PACK_SKIP_ROWS=3331]="PACK_SKIP_ROWS",t[t.PACK_SKIP_PIXELS=3332]="PACK_SKIP_PIXELS",t[t.TEXTURE_BINDING_3D=32874]="TEXTURE_BINDING_3D",t[t.UNPACK_SKIP_IMAGES=32877]="UNPACK_SKIP_IMAGES",t[t.UNPACK_IMAGE_HEIGHT=32878]="UNPACK_IMAGE_HEIGHT",t[t.MAX_3D_TEXTURE_SIZE=32883]="MAX_3D_TEXTURE_SIZE",t[t.MAX_ELEMENTS_VERTICES=33e3]="MAX_ELEMENTS_VERTICES",t[t.MAX_ELEMENTS_INDICES=33001]="MAX_ELEMENTS_INDICES",t[t.MAX_TEXTURE_LOD_BIAS=34045]="MAX_TEXTURE_LOD_BIAS",t[t.MAX_FRAGMENT_UNIFORM_COMPONENTS=35657]="MAX_FRAGMENT_UNIFORM_COMPONENTS",t[t.MAX_VERTEX_UNIFORM_COMPONENTS=35658]="MAX_VERTEX_UNIFORM_COMPONENTS",t[t.MAX_ARRAY_TEXTURE_LAYERS=35071]="MAX_ARRAY_TEXTURE_LAYERS",t[t.MIN_PROGRAM_TEXEL_OFFSET=35076]="MIN_PROGRAM_TEXEL_OFFSET",t[t.MAX_PROGRAM_TEXEL_OFFSET=35077]="MAX_PROGRAM_TEXEL_OFFSET",t[t.MAX_VARYING_COMPONENTS=35659]="MAX_VARYING_COMPONENTS",t[t.FRAGMENT_SHADER_DERIVATIVE_HINT=35723]="FRAGMENT_SHADER_DERIVATIVE_HINT",t[t.RASTERIZER_DISCARD=35977]="RASTERIZER_DISCARD",t[t.VERTEX_ARRAY_BINDING=34229]="VERTEX_ARRAY_BINDING",t[t.MAX_VERTEX_OUTPUT_COMPONENTS=37154]="MAX_VERTEX_OUTPUT_COMPONENTS",t[t.MAX_FRAGMENT_INPUT_COMPONENTS=37157]="MAX_FRAGMENT_INPUT_COMPONENTS",t[t.MAX_SERVER_WAIT_TIMEOUT=37137]="MAX_SERVER_WAIT_TIMEOUT",t[t.MAX_ELEMENT_INDEX=36203]="MAX_ELEMENT_INDEX",t[t.RED=6403]="RED",t[t.RGB8=32849]="RGB8",t[t.RGBA8=32856]="RGBA8",t[t.RGB10_A2=32857]="RGB10_A2",t[t.TEXTURE_3D=32879]="TEXTURE_3D",t[t.TEXTURE_WRAP_R=32882]="TEXTURE_WRAP_R",t[t.TEXTURE_MIN_LOD=33082]="TEXTURE_MIN_LOD",t[t.TEXTURE_MAX_LOD=33083]="TEXTURE_MAX_LOD",t[t.TEXTURE_BASE_LEVEL=33084]="TEXTURE_BASE_LEVEL",t[t.TEXTURE_MAX_LEVEL=33085]="TEXTURE_MAX_LEVEL",t[t.TEXTURE_COMPARE_MODE=34892]="TEXTURE_COMPARE_MODE",t[t.TEXTURE_COMPARE_FUNC=34893]="TEXTURE_COMPARE_FUNC",t[t.SRGB=35904]="SRGB",t[t.SRGB8=35905]="SRGB8",t[t.SRGB8_ALPHA8=35907]="SRGB8_ALPHA8",t[t.COMPARE_REF_TO_TEXTURE=34894]="COMPARE_REF_TO_TEXTURE",t[t.RGBA32F=34836]="RGBA32F",t[t.RGB32F=34837]="RGB32F",t[t.RGBA16F=34842]="RGBA16F",t[t.RGB16F=34843]="RGB16F",t[t.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",t[t.TEXTURE_BINDING_2D_ARRAY=35869]="TEXTURE_BINDING_2D_ARRAY",t[t.R11F_G11F_B10F=35898]="R11F_G11F_B10F",t[t.RGB9_E5=35901]="RGB9_E5",t[t.RGBA32UI=36208]="RGBA32UI",t[t.RGB32UI=36209]="RGB32UI",t[t.RGBA16UI=36214]="RGBA16UI",t[t.RGB16UI=36215]="RGB16UI",t[t.RGBA8UI=36220]="RGBA8UI",t[t.RGB8UI=36221]="RGB8UI",t[t.RGBA32I=36226]="RGBA32I",t[t.RGB32I=36227]="RGB32I",t[t.RGBA16I=36232]="RGBA16I",t[t.RGB16I=36233]="RGB16I",t[t.RGBA8I=36238]="RGBA8I",t[t.RGB8I=36239]="RGB8I",t[t.RED_INTEGER=36244]="RED_INTEGER",t[t.RGB_INTEGER=36248]="RGB_INTEGER",t[t.RGBA_INTEGER=36249]="RGBA_INTEGER",t[t.R8=33321]="R8",t[t.RG8=33323]="RG8",t[t.R16F=33325]="R16F",t[t.R32F=33326]="R32F",t[t.RG16F=33327]="RG16F",t[t.RG32F=33328]="RG32F",t[t.R8I=33329]="R8I",t[t.R8UI=33330]="R8UI",t[t.R16I=33331]="R16I",t[t.R16UI=33332]="R16UI",t[t.R32I=33333]="R32I",t[t.R32UI=33334]="R32UI",t[t.RG8I=33335]="RG8I",t[t.RG8UI=33336]="RG8UI",t[t.RG16I=33337]="RG16I",t[t.RG16UI=33338]="RG16UI",t[t.RG32I=33339]="RG32I",t[t.RG32UI=33340]="RG32UI",t[t.R8_SNORM=36756]="R8_SNORM",t[t.RG8_SNORM=36757]="RG8_SNORM",t[t.RGB8_SNORM=36758]="RGB8_SNORM",t[t.RGBA8_SNORM=36759]="RGBA8_SNORM",t[t.RGB10_A2UI=36975]="RGB10_A2UI",t[t.TEXTURE_IMMUTABLE_FORMAT=37167]="TEXTURE_IMMUTABLE_FORMAT",t[t.TEXTURE_IMMUTABLE_LEVELS=33503]="TEXTURE_IMMUTABLE_LEVELS",t[t.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",t[t.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",t[t.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",t[t.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",t[t.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",t[t.HALF_FLOAT=5131]="HALF_FLOAT",t[t.RG=33319]="RG",t[t.RG_INTEGER=33320]="RG_INTEGER",t[t.INT_2_10_10_10_REV=36255]="INT_2_10_10_10_REV",t[t.CURRENT_QUERY=34917]="CURRENT_QUERY",t[t.QUERY_RESULT=34918]="QUERY_RESULT",t[t.QUERY_RESULT_AVAILABLE=34919]="QUERY_RESULT_AVAILABLE",t[t.ANY_SAMPLES_PASSED=35887]="ANY_SAMPLES_PASSED",t[t.ANY_SAMPLES_PASSED_CONSERVATIVE=36202]="ANY_SAMPLES_PASSED_CONSERVATIVE",t[t.MAX_DRAW_BUFFERS=34852]="MAX_DRAW_BUFFERS",t[t.DRAW_BUFFER0=34853]="DRAW_BUFFER0",t[t.DRAW_BUFFER1=34854]="DRAW_BUFFER1",t[t.DRAW_BUFFER2=34855]="DRAW_BUFFER2",t[t.DRAW_BUFFER3=34856]="DRAW_BUFFER3",t[t.DRAW_BUFFER4=34857]="DRAW_BUFFER4",t[t.DRAW_BUFFER5=34858]="DRAW_BUFFER5",t[t.DRAW_BUFFER6=34859]="DRAW_BUFFER6",t[t.DRAW_BUFFER7=34860]="DRAW_BUFFER7",t[t.DRAW_BUFFER8=34861]="DRAW_BUFFER8",t[t.DRAW_BUFFER9=34862]="DRAW_BUFFER9",t[t.DRAW_BUFFER10=34863]="DRAW_BUFFER10",t[t.DRAW_BUFFER11=34864]="DRAW_BUFFER11",t[t.DRAW_BUFFER12=34865]="DRAW_BUFFER12",t[t.DRAW_BUFFER13=34866]="DRAW_BUFFER13",t[t.DRAW_BUFFER14=34867]="DRAW_BUFFER14",t[t.DRAW_BUFFER15=34868]="DRAW_BUFFER15",t[t.MAX_COLOR_ATTACHMENTS=36063]="MAX_COLOR_ATTACHMENTS",t[t.COLOR_ATTACHMENT1=36065]="COLOR_ATTACHMENT1",t[t.COLOR_ATTACHMENT2=36066]="COLOR_ATTACHMENT2",t[t.COLOR_ATTACHMENT3=36067]="COLOR_ATTACHMENT3",t[t.COLOR_ATTACHMENT4=36068]="COLOR_ATTACHMENT4",t[t.COLOR_ATTACHMENT5=36069]="COLOR_ATTACHMENT5",t[t.COLOR_ATTACHMENT6=36070]="COLOR_ATTACHMENT6",t[t.COLOR_ATTACHMENT7=36071]="COLOR_ATTACHMENT7",t[t.COLOR_ATTACHMENT8=36072]="COLOR_ATTACHMENT8",t[t.COLOR_ATTACHMENT9=36073]="COLOR_ATTACHMENT9",t[t.COLOR_ATTACHMENT10=36074]="COLOR_ATTACHMENT10",t[t.COLOR_ATTACHMENT11=36075]="COLOR_ATTACHMENT11",t[t.COLOR_ATTACHMENT12=36076]="COLOR_ATTACHMENT12",t[t.COLOR_ATTACHMENT13=36077]="COLOR_ATTACHMENT13",t[t.COLOR_ATTACHMENT14=36078]="COLOR_ATTACHMENT14",t[t.COLOR_ATTACHMENT15=36079]="COLOR_ATTACHMENT15",t[t.SAMPLER_3D=35679]="SAMPLER_3D",t[t.SAMPLER_2D_SHADOW=35682]="SAMPLER_2D_SHADOW",t[t.SAMPLER_2D_ARRAY=36289]="SAMPLER_2D_ARRAY",t[t.SAMPLER_2D_ARRAY_SHADOW=36292]="SAMPLER_2D_ARRAY_SHADOW",t[t.SAMPLER_CUBE_SHADOW=36293]="SAMPLER_CUBE_SHADOW",t[t.INT_SAMPLER_2D=36298]="INT_SAMPLER_2D",t[t.INT_SAMPLER_3D=36299]="INT_SAMPLER_3D",t[t.INT_SAMPLER_CUBE=36300]="INT_SAMPLER_CUBE",t[t.INT_SAMPLER_2D_ARRAY=36303]="INT_SAMPLER_2D_ARRAY",t[t.UNSIGNED_INT_SAMPLER_2D=36306]="UNSIGNED_INT_SAMPLER_2D",t[t.UNSIGNED_INT_SAMPLER_3D=36307]="UNSIGNED_INT_SAMPLER_3D",t[t.UNSIGNED_INT_SAMPLER_CUBE=36308]="UNSIGNED_INT_SAMPLER_CUBE",t[t.UNSIGNED_INT_SAMPLER_2D_ARRAY=36311]="UNSIGNED_INT_SAMPLER_2D_ARRAY",t[t.MAX_SAMPLES=36183]="MAX_SAMPLES",t[t.SAMPLER_BINDING=35097]="SAMPLER_BINDING",t[t.PIXEL_PACK_BUFFER=35051]="PIXEL_PACK_BUFFER",t[t.PIXEL_UNPACK_BUFFER=35052]="PIXEL_UNPACK_BUFFER",t[t.PIXEL_PACK_BUFFER_BINDING=35053]="PIXEL_PACK_BUFFER_BINDING",t[t.PIXEL_UNPACK_BUFFER_BINDING=35055]="PIXEL_UNPACK_BUFFER_BINDING",t[t.COPY_READ_BUFFER=36662]="COPY_READ_BUFFER",t[t.COPY_WRITE_BUFFER=36663]="COPY_WRITE_BUFFER",t[t.COPY_READ_BUFFER_BINDING=36662]="COPY_READ_BUFFER_BINDING",t[t.COPY_WRITE_BUFFER_BINDING=36663]="COPY_WRITE_BUFFER_BINDING",t[t.FLOAT_MAT2x3=35685]="FLOAT_MAT2x3",t[t.FLOAT_MAT2x4=35686]="FLOAT_MAT2x4",t[t.FLOAT_MAT3x2=35687]="FLOAT_MAT3x2",t[t.FLOAT_MAT3x4=35688]="FLOAT_MAT3x4",t[t.FLOAT_MAT4x2=35689]="FLOAT_MAT4x2",t[t.FLOAT_MAT4x3=35690]="FLOAT_MAT4x3",t[t.UNSIGNED_INT_VEC2=36294]="UNSIGNED_INT_VEC2",t[t.UNSIGNED_INT_VEC3=36295]="UNSIGNED_INT_VEC3",t[t.UNSIGNED_INT_VEC4=36296]="UNSIGNED_INT_VEC4",t[t.UNSIGNED_NORMALIZED=35863]="UNSIGNED_NORMALIZED",t[t.SIGNED_NORMALIZED=36764]="SIGNED_NORMALIZED",t[t.VERTEX_ATTRIB_ARRAY_INTEGER=35069]="VERTEX_ATTRIB_ARRAY_INTEGER",t[t.VERTEX_ATTRIB_ARRAY_DIVISOR=35070]="VERTEX_ATTRIB_ARRAY_DIVISOR",t[t.TRANSFORM_FEEDBACK_BUFFER_MODE=35967]="TRANSFORM_FEEDBACK_BUFFER_MODE",t[t.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS=35968]="MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS",t[t.TRANSFORM_FEEDBACK_VARYINGS=35971]="TRANSFORM_FEEDBACK_VARYINGS",t[t.TRANSFORM_FEEDBACK_BUFFER_START=35972]="TRANSFORM_FEEDBACK_BUFFER_START",t[t.TRANSFORM_FEEDBACK_BUFFER_SIZE=35973]="TRANSFORM_FEEDBACK_BUFFER_SIZE",t[t.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN=35976]="TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN",t[t.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS=35978]="MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",t[t.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS=35979]="MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",t[t.INTERLEAVED_ATTRIBS=35980]="INTERLEAVED_ATTRIBS",t[t.SEPARATE_ATTRIBS=35981]="SEPARATE_ATTRIBS",t[t.TRANSFORM_FEEDBACK_BUFFER=35982]="TRANSFORM_FEEDBACK_BUFFER",t[t.TRANSFORM_FEEDBACK_BUFFER_BINDING=35983]="TRANSFORM_FEEDBACK_BUFFER_BINDING",t[t.TRANSFORM_FEEDBACK=36386]="TRANSFORM_FEEDBACK",t[t.TRANSFORM_FEEDBACK_PAUSED=36387]="TRANSFORM_FEEDBACK_PAUSED",t[t.TRANSFORM_FEEDBACK_ACTIVE=36388]="TRANSFORM_FEEDBACK_ACTIVE",t[t.TRANSFORM_FEEDBACK_BINDING=36389]="TRANSFORM_FEEDBACK_BINDING",t[t.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING=33296]="FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING",t[t.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE=33297]="FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE",t[t.FRAMEBUFFER_ATTACHMENT_RED_SIZE=33298]="FRAMEBUFFER_ATTACHMENT_RED_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE=33299]="FRAMEBUFFER_ATTACHMENT_GREEN_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE=33300]="FRAMEBUFFER_ATTACHMENT_BLUE_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE=33301]="FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE=33302]="FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE",t[t.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE=33303]="FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE",t[t.FRAMEBUFFER_DEFAULT=33304]="FRAMEBUFFER_DEFAULT",t[t.DEPTH24_STENCIL8=35056]="DEPTH24_STENCIL8",t[t.DRAW_FRAMEBUFFER_BINDING=36006]="DRAW_FRAMEBUFFER_BINDING",t[t.READ_FRAMEBUFFER_BINDING=36010]="READ_FRAMEBUFFER_BINDING",t[t.RENDERBUFFER_SAMPLES=36011]="RENDERBUFFER_SAMPLES",t[t.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER=36052]="FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER",t[t.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE=36182]="FRAMEBUFFER_INCOMPLETE_MULTISAMPLE",t[t.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",t[t.UNIFORM_BUFFER_BINDING=35368]="UNIFORM_BUFFER_BINDING",t[t.UNIFORM_BUFFER_START=35369]="UNIFORM_BUFFER_START",t[t.UNIFORM_BUFFER_SIZE=35370]="UNIFORM_BUFFER_SIZE",t[t.MAX_VERTEX_UNIFORM_BLOCKS=35371]="MAX_VERTEX_UNIFORM_BLOCKS",t[t.MAX_FRAGMENT_UNIFORM_BLOCKS=35373]="MAX_FRAGMENT_UNIFORM_BLOCKS",t[t.MAX_COMBINED_UNIFORM_BLOCKS=35374]="MAX_COMBINED_UNIFORM_BLOCKS",t[t.MAX_UNIFORM_BUFFER_BINDINGS=35375]="MAX_UNIFORM_BUFFER_BINDINGS",t[t.MAX_UNIFORM_BLOCK_SIZE=35376]="MAX_UNIFORM_BLOCK_SIZE",t[t.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS=35377]="MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS",t[t.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS=35379]="MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",t[t.UNIFORM_BUFFER_OFFSET_ALIGNMENT=35380]="UNIFORM_BUFFER_OFFSET_ALIGNMENT",t[t.ACTIVE_UNIFORM_BLOCKS=35382]="ACTIVE_UNIFORM_BLOCKS",t[t.UNIFORM_TYPE=35383]="UNIFORM_TYPE",t[t.UNIFORM_SIZE=35384]="UNIFORM_SIZE",t[t.UNIFORM_BLOCK_INDEX=35386]="UNIFORM_BLOCK_INDEX",t[t.UNIFORM_OFFSET=35387]="UNIFORM_OFFSET",t[t.UNIFORM_ARRAY_STRIDE=35388]="UNIFORM_ARRAY_STRIDE",t[t.UNIFORM_MATRIX_STRIDE=35389]="UNIFORM_MATRIX_STRIDE",t[t.UNIFORM_IS_ROW_MAJOR=35390]="UNIFORM_IS_ROW_MAJOR",t[t.UNIFORM_BLOCK_BINDING=35391]="UNIFORM_BLOCK_BINDING",t[t.UNIFORM_BLOCK_DATA_SIZE=35392]="UNIFORM_BLOCK_DATA_SIZE",t[t.UNIFORM_BLOCK_ACTIVE_UNIFORMS=35394]="UNIFORM_BLOCK_ACTIVE_UNIFORMS",t[t.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES=35395]="UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES",t[t.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER=35396]="UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER",t[t.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER=35398]="UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER",t[t.OBJECT_TYPE=37138]="OBJECT_TYPE",t[t.SYNC_CONDITION=37139]="SYNC_CONDITION",t[t.SYNC_STATUS=37140]="SYNC_STATUS",t[t.SYNC_FLAGS=37141]="SYNC_FLAGS",t[t.SYNC_FENCE=37142]="SYNC_FENCE",t[t.SYNC_GPU_COMMANDS_COMPLETE=37143]="SYNC_GPU_COMMANDS_COMPLETE",t[t.UNSIGNALED=37144]="UNSIGNALED",t[t.SIGNALED=37145]="SIGNALED",t[t.ALREADY_SIGNALED=37146]="ALREADY_SIGNALED",t[t.TIMEOUT_EXPIRED=37147]="TIMEOUT_EXPIRED",t[t.CONDITION_SATISFIED=37148]="CONDITION_SATISFIED",t[t.WAIT_FAILED=37149]="WAIT_FAILED",t[t.SYNC_FLUSH_COMMANDS_BIT=1]="SYNC_FLUSH_COMMANDS_BIT",t[t.COLOR=6144]="COLOR",t[t.DEPTH=6145]="DEPTH",t[t.STENCIL=6146]="STENCIL",t[t.MIN=32775]="MIN",t[t.MAX=32776]="MAX",t[t.DEPTH_COMPONENT24=33190]="DEPTH_COMPONENT24",t[t.STREAM_READ=35041]="STREAM_READ",t[t.STREAM_COPY=35042]="STREAM_COPY",t[t.STATIC_READ=35045]="STATIC_READ",t[t.STATIC_COPY=35046]="STATIC_COPY",t[t.DYNAMIC_READ=35049]="DYNAMIC_READ",t[t.DYNAMIC_COPY=35050]="DYNAMIC_COPY",t[t.DEPTH_COMPONENT32F=36012]="DEPTH_COMPONENT32F",t[t.DEPTH32F_STENCIL8=36013]="DEPTH32F_STENCIL8",t[t.INVALID_INDEX=4294967295]="INVALID_INDEX",t[t.TIMEOUT_IGNORED=-1]="TIMEOUT_IGNORED",t[t.MAX_CLIENT_WAIT_TIMEOUT_WEBGL=37447]="MAX_CLIENT_WAIT_TIMEOUT_WEBGL",t[t.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE=35070]="VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE",t[t.UNMASKED_VENDOR_WEBGL=37445]="UNMASKED_VENDOR_WEBGL",t[t.UNMASKED_RENDERER_WEBGL=37446]="UNMASKED_RENDERER_WEBGL",t[t.MAX_TEXTURE_MAX_ANISOTROPY_EXT=34047]="MAX_TEXTURE_MAX_ANISOTROPY_EXT",t[t.TEXTURE_MAX_ANISOTROPY_EXT=34046]="TEXTURE_MAX_ANISOTROPY_EXT",t[t.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",t[t.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777]="COMPRESSED_RGBA_S3TC_DXT1_EXT",t[t.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778]="COMPRESSED_RGBA_S3TC_DXT3_EXT",t[t.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",t[t.COMPRESSED_R11_EAC=37488]="COMPRESSED_R11_EAC",t[t.COMPRESSED_SIGNED_R11_EAC=37489]="COMPRESSED_SIGNED_R11_EAC",t[t.COMPRESSED_RG11_EAC=37490]="COMPRESSED_RG11_EAC",t[t.COMPRESSED_SIGNED_RG11_EAC=37491]="COMPRESSED_SIGNED_RG11_EAC",t[t.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",t[t.COMPRESSED_RGBA8_ETC2_EAC=37493]="COMPRESSED_RGBA8_ETC2_EAC",t[t.COMPRESSED_SRGB8_ETC2=37494]="COMPRESSED_SRGB8_ETC2",t[t.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37495]="COMPRESSED_SRGB8_ALPHA8_ETC2_EAC",t[t.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37496]="COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2",t[t.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37497]="COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2",t[t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]="COMPRESSED_RGB_PVRTC_4BPPV1_IMG",t[t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]="COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",t[t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG=35841]="COMPRESSED_RGB_PVRTC_2BPPV1_IMG",t[t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG=35843]="COMPRESSED_RGBA_PVRTC_2BPPV1_IMG",t[t.COMPRESSED_RGB_ETC1_WEBGL=36196]="COMPRESSED_RGB_ETC1_WEBGL",t[t.COMPRESSED_RGB_ATC_WEBGL=35986]="COMPRESSED_RGB_ATC_WEBGL",t[t.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL=35986]="COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL",t[t.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL=34798]="COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL",t[t.UNSIGNED_INT_24_8_WEBGL=34042]="UNSIGNED_INT_24_8_WEBGL",t[t.HALF_FLOAT_OES=36193]="HALF_FLOAT_OES",t[t.RGBA32F_EXT=34836]="RGBA32F_EXT",t[t.RGB32F_EXT=34837]="RGB32F_EXT",t[t.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT=33297]="FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT",t[t.UNSIGNED_NORMALIZED_EXT=35863]="UNSIGNED_NORMALIZED_EXT",t[t.MIN_EXT=32775]="MIN_EXT",t[t.MAX_EXT=32776]="MAX_EXT",t[t.SRGB_EXT=35904]="SRGB_EXT",t[t.SRGB_ALPHA_EXT=35906]="SRGB_ALPHA_EXT",t[t.SRGB8_ALPHA8_EXT=35907]="SRGB8_ALPHA8_EXT",t[t.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT=33296]="FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT",t[t.FRAGMENT_SHADER_DERIVATIVE_HINT_OES=35723]="FRAGMENT_SHADER_DERIVATIVE_HINT_OES",t[t.COLOR_ATTACHMENT0_WEBGL=36064]="COLOR_ATTACHMENT0_WEBGL",t[t.COLOR_ATTACHMENT1_WEBGL=36065]="COLOR_ATTACHMENT1_WEBGL",t[t.COLOR_ATTACHMENT2_WEBGL=36066]="COLOR_ATTACHMENT2_WEBGL",t[t.COLOR_ATTACHMENT3_WEBGL=36067]="COLOR_ATTACHMENT3_WEBGL",t[t.COLOR_ATTACHMENT4_WEBGL=36068]="COLOR_ATTACHMENT4_WEBGL",t[t.COLOR_ATTACHMENT5_WEBGL=36069]="COLOR_ATTACHMENT5_WEBGL",t[t.COLOR_ATTACHMENT6_WEBGL=36070]="COLOR_ATTACHMENT6_WEBGL",t[t.COLOR_ATTACHMENT7_WEBGL=36071]="COLOR_ATTACHMENT7_WEBGL",t[t.COLOR_ATTACHMENT8_WEBGL=36072]="COLOR_ATTACHMENT8_WEBGL",t[t.COLOR_ATTACHMENT9_WEBGL=36073]="COLOR_ATTACHMENT9_WEBGL",t[t.COLOR_ATTACHMENT10_WEBGL=36074]="COLOR_ATTACHMENT10_WEBGL",t[t.COLOR_ATTACHMENT11_WEBGL=36075]="COLOR_ATTACHMENT11_WEBGL",t[t.COLOR_ATTACHMENT12_WEBGL=36076]="COLOR_ATTACHMENT12_WEBGL",t[t.COLOR_ATTACHMENT13_WEBGL=36077]="COLOR_ATTACHMENT13_WEBGL",t[t.COLOR_ATTACHMENT14_WEBGL=36078]="COLOR_ATTACHMENT14_WEBGL",t[t.COLOR_ATTACHMENT15_WEBGL=36079]="COLOR_ATTACHMENT15_WEBGL",t[t.DRAW_BUFFER0_WEBGL=34853]="DRAW_BUFFER0_WEBGL",t[t.DRAW_BUFFER1_WEBGL=34854]="DRAW_BUFFER1_WEBGL",t[t.DRAW_BUFFER2_WEBGL=34855]="DRAW_BUFFER2_WEBGL",t[t.DRAW_BUFFER3_WEBGL=34856]="DRAW_BUFFER3_WEBGL",t[t.DRAW_BUFFER4_WEBGL=34857]="DRAW_BUFFER4_WEBGL",t[t.DRAW_BUFFER5_WEBGL=34858]="DRAW_BUFFER5_WEBGL",t[t.DRAW_BUFFER6_WEBGL=34859]="DRAW_BUFFER6_WEBGL",t[t.DRAW_BUFFER7_WEBGL=34860]="DRAW_BUFFER7_WEBGL",t[t.DRAW_BUFFER8_WEBGL=34861]="DRAW_BUFFER8_WEBGL",t[t.DRAW_BUFFER9_WEBGL=34862]="DRAW_BUFFER9_WEBGL",t[t.DRAW_BUFFER10_WEBGL=34863]="DRAW_BUFFER10_WEBGL",t[t.DRAW_BUFFER11_WEBGL=34864]="DRAW_BUFFER11_WEBGL",t[t.DRAW_BUFFER12_WEBGL=34865]="DRAW_BUFFER12_WEBGL",t[t.DRAW_BUFFER13_WEBGL=34866]="DRAW_BUFFER13_WEBGL",t[t.DRAW_BUFFER14_WEBGL=34867]="DRAW_BUFFER14_WEBGL",t[t.DRAW_BUFFER15_WEBGL=34868]="DRAW_BUFFER15_WEBGL",t[t.MAX_COLOR_ATTACHMENTS_WEBGL=36063]="MAX_COLOR_ATTACHMENTS_WEBGL",t[t.MAX_DRAW_BUFFERS_WEBGL=34852]="MAX_DRAW_BUFFERS_WEBGL",t[t.VERTEX_ARRAY_BINDING_OES=34229]="VERTEX_ARRAY_BINDING_OES",t[t.QUERY_COUNTER_BITS_EXT=34916]="QUERY_COUNTER_BITS_EXT",t[t.CURRENT_QUERY_EXT=34917]="CURRENT_QUERY_EXT",t[t.QUERY_RESULT_EXT=34918]="QUERY_RESULT_EXT",t[t.QUERY_RESULT_AVAILABLE_EXT=34919]="QUERY_RESULT_AVAILABLE_EXT",t[t.TIME_ELAPSED_EXT=35007]="TIME_ELAPSED_EXT",t[t.TIMESTAMP_EXT=36392]="TIMESTAMP_EXT",t[t.GPU_DISJOINT_EXT=36795]="GPU_DISJOINT_EXT"})(R||(R={}));var te;(function(t){t[t.Buffer=0]="Buffer",t[t.Texture=1]="Texture",t[t.RenderTarget=2]="RenderTarget",t[t.Sampler=3]="Sampler",t[t.Program=4]="Program",t[t.Bindings=5]="Bindings",t[t.InputLayout=6]="InputLayout",t[t.RenderPipeline=7]="RenderPipeline",t[t.ComputePipeline=8]="ComputePipeline",t[t.Readback=9]="Readback",t[t.QueryPool=10]="QueryPool"})(te||(te={}));var Be;(function(t){t[t.NEVER=512]="NEVER",t[t.LESS=513]="LESS",t[t.EQUAL=514]="EQUAL",t[t.LEQUAL=515]="LEQUAL",t[t.GREATER=516]="GREATER",t[t.NOTEQUAL=517]="NOTEQUAL",t[t.GEQUAL=518]="GEQUAL",t[t.ALWAYS=519]="ALWAYS"})(Be||(Be={}));var xr;(function(t){t[t.CCW=2305]="CCW",t[t.CW=2304]="CW"})(xr||(xr={}));var In;(function(t){t[t.NONE=0]="NONE",t[t.FRONT=1]="FRONT",t[t.BACK=2]="BACK",t[t.FRONT_AND_BACK=3]="FRONT_AND_BACK"})(In||(In={}));var ce;(function(t){t[t.ZERO=0]="ZERO",t[t.ONE=1]="ONE",t[t.SRC=768]="SRC",t[t.ONE_MINUS_SRC=769]="ONE_MINUS_SRC",t[t.DST=774]="DST",t[t.ONE_MINUS_DST=775]="ONE_MINUS_DST",t[t.SRC_ALPHA=770]="SRC_ALPHA",t[t.ONE_MINUS_SRC_ALPHA=771]="ONE_MINUS_SRC_ALPHA",t[t.DST_ALPHA=772]="DST_ALPHA",t[t.ONE_MINUS_DST_ALPHA=773]="ONE_MINUS_DST_ALPHA",t[t.CONST=32769]="CONST",t[t.ONE_MINUS_CONSTANT=32770]="ONE_MINUS_CONSTANT",t[t.SRC_ALPHA_SATURATE=776]="SRC_ALPHA_SATURATE"})(ce||(ce={}));var yt;(function(t){t[t.ADD=32774]="ADD",t[t.SUBSTRACT=32778]="SUBSTRACT",t[t.REVERSE_SUBSTRACT=32779]="REVERSE_SUBSTRACT",t[t.MIN=32775]="MIN",t[t.MAX=32776]="MAX"})(yt||(yt={}));var Oe;(function(t){t[t.CLAMP_TO_EDGE=0]="CLAMP_TO_EDGE",t[t.REPEAT=1]="REPEAT",t[t.MIRRORED_REPEAT=2]="MIRRORED_REPEAT"})(Oe||(Oe={}));var ae;(function(t){t[t.POINT=0]="POINT",t[t.BILINEAR=1]="BILINEAR"})(ae||(ae={}));var me;(function(t){t[t.NO_MIP=0]="NO_MIP",t[t.NEAREST=1]="NEAREST",t[t.LINEAR=2]="LINEAR"})(me||(me={}));var Re;(function(t){t[t.POINTS=0]="POINTS",t[t.TRIANGLES=1]="TRIANGLES",t[t.TRIANGLE_STRIP=2]="TRIANGLE_STRIP",t[t.LINES=3]="LINES",t[t.LINE_STRIP=4]="LINE_STRIP"})(Re||(Re={}));var ie;(function(t){t[t.MAP_READ=1]="MAP_READ",t[t.MAP_WRITE=2]="MAP_WRITE",t[t.COPY_SRC=4]="COPY_SRC",t[t.COPY_DST=8]="COPY_DST",t[t.INDEX=16]="INDEX",t[t.VERTEX=32]="VERTEX",t[t.UNIFORM=64]="UNIFORM",t[t.STORAGE=128]="STORAGE",t[t.INDIRECT=256]="INDIRECT",t[t.QUERY_RESOLVE=512]="QUERY_RESOLVE"})(ie||(ie={}));var dn;(function(t){t[t.STATIC=1]="STATIC",t[t.DYNAMIC=2]="DYNAMIC"})(dn||(dn={}));var Kn;(function(t){t[t.VERTEX=1]="VERTEX",t[t.INSTANCE=2]="INSTANCE"})(Kn||(Kn={}));var ua;(function(t){t.LOADED="loaded"})(ua||(ua={}));var q;(function(t){t[t.TEXTURE_2D=0]="TEXTURE_2D",t[t.TEXTURE_2D_ARRAY=1]="TEXTURE_2D_ARRAY",t[t.TEXTURE_3D=2]="TEXTURE_3D",t[t.TEXTURE_CUBE_MAP=3]="TEXTURE_CUBE_MAP"})(q||(q={}));var mt;(function(t){t[t.SAMPLED=1]="SAMPLED",t[t.RENDER_TARGET=2]="RENDER_TARGET",t[t.STORAGE=4]="STORAGE"})(mt||(mt={}));var Es;(function(t){t[t.NONE=0]="NONE",t[t.RED=1]="RED",t[t.GREEN=2]="GREEN",t[t.BLUE=4]="BLUE",t[t.ALPHA=8]="ALPHA",t[t.RGB=7]="RGB",t[t.ALL=15]="ALL"})(Es||(Es={}));var He;(function(t){t[t.KEEP=7680]="KEEP",t[t.ZERO=0]="ZERO",t[t.REPLACE=7681]="REPLACE",t[t.INVERT=5386]="INVERT",t[t.INCREMENT_CLAMP=7682]="INCREMENT_CLAMP",t[t.DECREMENT_CLAMP=7683]="DECREMENT_CLAMP",t[t.INCREMENT_WRAP=34055]="INCREMENT_WRAP",t[t.DECREMENT_WRAP=34056]="DECREMENT_WRAP"})(He||(He={}));var ze;(function(t){t[t.Float=0]="Float",t[t.Uint=1]="Uint",t[t.Sint=2]="Sint",t[t.Depth=3]="Depth"})(ze||(ze={}));var mi;(function(t){t[t.LOWER_LEFT=0]="LOWER_LEFT",t[t.UPPER_LEFT=1]="UPPER_LEFT"})(mi||(mi={}));var gi;(function(t){t[t.NEGATIVE_ONE=0]="NEGATIVE_ONE",t[t.ZERO=1]="ZERO"})(gi||(gi={}));var Ei;(function(t){t[t.OcclusionConservative=0]="OcclusionConservative"})(Ei||(Ei={}));var T;(function(t){t[t.U8=1]="U8",t[t.U16=2]="U16",t[t.U32=3]="U32",t[t.S8=4]="S8",t[t.S16=5]="S16",t[t.S32=6]="S32",t[t.F16=7]="F16",t[t.F32=8]="F32",t[t.BC1=65]="BC1",t[t.BC2=66]="BC2",t[t.BC3=67]="BC3",t[t.BC4_UNORM=68]="BC4_UNORM",t[t.BC4_SNORM=69]="BC4_SNORM",t[t.BC5_UNORM=70]="BC5_UNORM",t[t.BC5_SNORM=71]="BC5_SNORM",t[t.U16_PACKED_5551=97]="U16_PACKED_5551",t[t.U16_PACKED_565=98]="U16_PACKED_565",t[t.D24=129]="D24",t[t.D32F=130]="D32F",t[t.D24S8=131]="D24S8",t[t.D32FS8=132]="D32FS8"})(T||(T={}));var D;(function(t){t[t.R=1]="R",t[t.RG=2]="RG",t[t.RGB=3]="RGB",t[t.RGBA=4]="RGBA",t[t.A=5]="A"})(D||(D={}));var I;(function(t){t[t.None=0]="None",t[t.Normalized=1]="Normalized",t[t.sRGB=2]="sRGB",t[t.Depth=4]="Depth",t[t.Stencil=8]="Stencil",t[t.RenderTarget=16]="RenderTarget",t[t.Luminance=32]="Luminance"})(I||(I={}));function L(t,e,n){return t<<16|e<<8|n}var w;(function(t){t[t.ALPHA=L(T.U8,D.A,I.None)]="ALPHA",t[t.U8_LUMINANCE=L(T.U8,D.A,I.Luminance)]="U8_LUMINANCE",t[t.F16_LUMINANCE=L(T.F16,D.A,I.Luminance)]="F16_LUMINANCE",t[t.F32_LUMINANCE=L(T.F32,D.A,I.Luminance)]="F32_LUMINANCE",t[t.F16_R=L(T.F16,D.R,I.None)]="F16_R",t[t.F16_RG=L(T.F16,D.RG,I.None)]="F16_RG",t[t.F16_RGB=L(T.F16,D.RGB,I.None)]="F16_RGB",t[t.F16_RGBA=L(T.F16,D.RGBA,I.None)]="F16_RGBA",t[t.F32_R=L(T.F32,D.R,I.None)]="F32_R",t[t.F32_RG=L(T.F32,D.RG,I.None)]="F32_RG",t[t.F32_RGB=L(T.F32,D.RGB,I.None)]="F32_RGB",t[t.F32_RGBA=L(T.F32,D.RGBA,I.None)]="F32_RGBA",t[t.U8_R=L(T.U8,D.R,I.None)]="U8_R",t[t.U8_R_NORM=L(T.U8,D.R,I.Normalized)]="U8_R_NORM",t[t.U8_RG=L(T.U8,D.RG,I.None)]="U8_RG",t[t.U8_RG_NORM=L(T.U8,D.RG,I.Normalized)]="U8_RG_NORM",t[t.U8_RGB=L(T.U8,D.RGB,I.None)]="U8_RGB",t[t.U8_RGB_NORM=L(T.U8,D.RGB,I.Normalized)]="U8_RGB_NORM",t[t.U8_RGB_SRGB=L(T.U8,D.RGB,I.sRGB|I.Normalized)]="U8_RGB_SRGB",t[t.U8_RGBA=L(T.U8,D.RGBA,I.None)]="U8_RGBA",t[t.U8_RGBA_NORM=L(T.U8,D.RGBA,I.Normalized)]="U8_RGBA_NORM",t[t.U8_RGBA_SRGB=L(T.U8,D.RGBA,I.sRGB|I.Normalized)]="U8_RGBA_SRGB",t[t.U16_R=L(T.U16,D.R,I.None)]="U16_R",t[t.U16_R_NORM=L(T.U16,D.R,I.Normalized)]="U16_R_NORM",t[t.U16_RG_NORM=L(T.U16,D.RG,I.Normalized)]="U16_RG_NORM",t[t.U16_RGBA_NORM=L(T.U16,D.RGBA,I.Normalized)]="U16_RGBA_NORM",t[t.U16_RGB=L(T.U16,D.RGB,I.None)]="U16_RGB",t[t.U32_R=L(T.U32,D.R,I.None)]="U32_R",t[t.U32_RG=L(T.U32,D.RG,I.None)]="U32_RG",t[t.S8_R=L(T.S8,D.R,I.None)]="S8_R",t[t.S8_R_NORM=L(T.S8,D.R,I.Normalized)]="S8_R_NORM",t[t.S8_RG_NORM=L(T.S8,D.RG,I.Normalized)]="S8_RG_NORM",t[t.S8_RGB_NORM=L(T.S8,D.RGB,I.Normalized)]="S8_RGB_NORM",t[t.S8_RGBA_NORM=L(T.S8,D.RGBA,I.Normalized)]="S8_RGBA_NORM",t[t.S16_R=L(T.S16,D.R,I.None)]="S16_R",t[t.S16_RG=L(T.S16,D.RG,I.None)]="S16_RG",t[t.S16_RG_NORM=L(T.S16,D.RG,I.Normalized)]="S16_RG_NORM",t[t.S16_RGB_NORM=L(T.S16,D.RGB,I.Normalized)]="S16_RGB_NORM",t[t.S16_RGBA=L(T.S16,D.RGBA,I.None)]="S16_RGBA",t[t.S16_RGBA_NORM=L(T.S16,D.RGBA,I.Normalized)]="S16_RGBA_NORM",t[t.S32_R=L(T.S32,D.R,I.None)]="S32_R",t[t.U16_RGBA_5551=L(T.U16_PACKED_5551,D.RGBA,I.Normalized)]="U16_RGBA_5551",t[t.U16_RGB_565=L(T.U16_PACKED_565,D.RGB,I.Normalized)]="U16_RGB_565",t[t.BC1=L(T.BC1,D.RGBA,I.Normalized)]="BC1",t[t.BC1_SRGB=L(T.BC1,D.RGBA,I.Normalized|I.sRGB)]="BC1_SRGB",t[t.BC2=L(T.BC2,D.RGBA,I.Normalized)]="BC2",t[t.BC2_SRGB=L(T.BC2,D.RGBA,I.Normalized|I.sRGB)]="BC2_SRGB",t[t.BC3=L(T.BC3,D.RGBA,I.Normalized)]="BC3",t[t.BC3_SRGB=L(T.BC3,D.RGBA,I.Normalized|I.sRGB)]="BC3_SRGB",t[t.BC4_UNORM=L(T.BC4_UNORM,D.R,I.Normalized)]="BC4_UNORM",t[t.BC4_SNORM=L(T.BC4_SNORM,D.R,I.Normalized)]="BC4_SNORM",t[t.BC5_UNORM=L(T.BC5_UNORM,D.RG,I.Normalized)]="BC5_UNORM",t[t.BC5_SNORM=L(T.BC5_SNORM,D.RG,I.Normalized)]="BC5_SNORM",t[t.D24=L(T.D24,D.R,I.Depth)]="D24",t[t.D24_S8=L(T.D24S8,D.RG,I.Depth|I.Stencil)]="D24_S8",t[t.D32F=L(T.D32F,D.R,I.Depth)]="D32F",t[t.D32F_S8=L(T.D32FS8,D.RG,I.Depth|I.Stencil)]="D32F_S8",t[t.U8_RGB_RT=L(T.U8,D.RGB,I.RenderTarget|I.Normalized)]="U8_RGB_RT",t[t.U8_RGBA_RT=L(T.U8,D.RGBA,I.RenderTarget|I.Normalized)]="U8_RGBA_RT",t[t.U8_RGBA_RT_SRGB=L(T.U8,D.RGBA,I.RenderTarget|I.Normalized|I.sRGB)]="U8_RGBA_RT_SRGB"})(w||(w={}));function co(t){return t>>>8&255}function Vt(t){return t>>>16&255}function Sr(t){return t&255}function uo(t){switch(t){case T.F32:case T.U32:case T.S32:return 4;case T.U16:case T.S16:case T.F16:return 2;case T.U8:case T.S8:return 1;default:throw new Error("whoops")}}function ho(t){return uo(Vt(t))}function _o(t){var e=uo(Vt(t)),n=co(t);return e*n}function fo(t){var e=Sr(t);if(e&I.Depth)return ze.Depth;if(e&I.Normalized)return ze.Float;var n=Vt(t);if(n===T.F16||n===T.F32)return ze.Float;if(n===T.U8||n===T.U16||n===T.U32)return ze.Uint;if(n===T.S8||n===T.S16||n===T.S32)return ze.Sint;throw new Error("whoops")}function U(t,e){if(e===void 0&&(e=""),!t)throw new Error("Assert fail: ".concat(e))}function be(t){if(t!=null)return t;throw new Error("Missing object")}function Ql(t,e){return t.r===e.r&&t.g===e.g&&t.b===e.b&&t.a===e.a}function Zl(t,e){t.r=e.r,t.g=e.g,t.b=e.b,t.a=e.a}function po(t){var e=t.r,n=t.g,r=t.b,i=t.a;return{r:e,g:n,b:r,a:i}}function Lr(t,e,n,r){return r===void 0&&(r=1),{r:t,g:e,b:n,a:r}}var mo=Lr(0,0,0,0);Lr(0,0,0,1);Lr(1,1,1,0);var go=Lr(1,1,1,1);function vi(t){return!!(t&&!(t&t-1))}function Vn(t,e){return t??e}function rs(t,e,n){t.length=e,t.fill(n)}function Ai(t,e){var n=e-1;return t+n&~n}function or(t,e){return((t+e-1)/e|0)*e}function Gl(t,e,n){for(var r=0,i=t.length;r<i;){var s=r+(i-r>>>1),a=n(e,t[s]);a<0?i=s:r=s+1}return r}function Jl(t,e,n){var r=Gl(t,e,n);t.splice(r,0,e)}function Qr(t,e,n){return n?t|=e:t&=~e,t}function Nn(t,e){for(var n=new Array(t),r=0;r<t;r++)n[r]=e();return n}function ha(t,e){t.blendDstFactor=e.blendDstFactor,t.blendSrcFactor=e.blendSrcFactor,t.blendMode=e.blendMode}function yi(t,e){return t===void 0&&(t={}),t.compare=e.compare,t.depthFailOp=e.depthFailOp,t.passOp=e.passOp,t.failOp=e.failOp,t}function Eo(t,e){return t===void 0&&(t={rgbBlendState:{},alphaBlendState:{},channelWriteMask:0}),ha(t.rgbBlendState,e.rgbBlendState),ha(t.alphaBlendState,e.alphaBlendState),t.channelWriteMask=e.channelWriteMask,t}function Is(t,e){t.length!==e.length&&(t.length=e.length);for(var n=0;n<e.length;n++)t[n]=Eo(t[n],e[n])}function vs(t,e){e.attachmentsState!==void 0&&Is(t.attachmentsState,e.attachmentsState),t.blendConstant&&e.blendConstant&&Zl(t.blendConstant,e.blendConstant),t.depthCompare=Vn(e.depthCompare,t.depthCompare),t.depthWrite=Vn(e.depthWrite,t.depthWrite),t.stencilWrite=Vn(e.stencilWrite,t.stencilWrite),t.stencilFront&&e.stencilFront&&yi(t.stencilFront,e.stencilFront),t.stencilBack&&e.stencilBack&&yi(t.stencilBack,e.stencilBack),t.cullMode=Vn(e.cullMode,t.cullMode),t.frontFace=Vn(e.frontFace,t.frontFace),t.polygonOffset=Vn(e.polygonOffset,t.polygonOffset)}function Vr(t){var e=Object.assign({},t);return e.attachmentsState=[],Is(e.attachmentsState,t.attachmentsState),e.blendConstant=e.blendConstant&&po(e.blendConstant),e.stencilFront=yi(void 0,t.stencilFront),e.stencilBack=yi(void 0,t.stencilBack),e}function ec(t,e){e.channelWriteMask!==void 0&&(t.channelWriteMask=e.channelWriteMask),e.rgbBlendMode!==void 0&&(t.rgbBlendState.blendMode=e.rgbBlendMode),e.alphaBlendMode!==void 0&&(t.alphaBlendState.blendMode=e.alphaBlendMode),e.rgbBlendSrcFactor!==void 0&&(t.rgbBlendState.blendSrcFactor=e.rgbBlendSrcFactor),e.alphaBlendSrcFactor!==void 0&&(t.alphaBlendState.blendSrcFactor=e.alphaBlendSrcFactor),e.rgbBlendDstFactor!==void 0&&(t.rgbBlendState.blendDstFactor=e.rgbBlendDstFactor),e.alphaBlendDstFactor!==void 0&&(t.alphaBlendState.blendDstFactor=e.alphaBlendDstFactor)}var _a={blendMode:yt.ADD,blendSrcFactor:ce.ONE,blendDstFactor:ce.ZERO},Jn={attachmentsState:[{channelWriteMask:Es.ALL,rgbBlendState:_a,alphaBlendState:_a}],blendConstant:po(mo),depthWrite:!0,depthCompare:Be.LEQUAL,stencilWrite:!1,stencilFront:{compare:Be.ALWAYS,passOp:He.KEEP,depthFailOp:He.KEEP,failOp:He.KEEP},stencilBack:{compare:Be.ALWAYS,passOp:He.KEEP,depthFailOp:He.KEEP,failOp:He.KEEP},cullMode:In.NONE,frontFace:xr.CCW,polygonOffset:!1};function tc(t,e){t===void 0&&(t=null),e===void 0&&(e=Jn);var n=Vr(e);return t!==null&&vs(n,t),n}var Ns=tc({depthCompare:Be.ALWAYS,depthWrite:!1},Jn);function nc(t,e){return t.attachmentsState===void 0&&(t.attachmentsState=[],Is(t.attachmentsState,Jn.attachmentsState)),ec(t.attachmentsState[0],e),t}var rc={texture:null,sampler:null,formatKind:ze.Float,dimension:q.TEXTURE_2D};function ln(t,e,n){if(t.length!==e.length)return!1;for(var r=0;r<t.length;r++)if(!n(t[r],e[r]))return!1;return!0}function Wn(t,e){for(var n=Array(t.length),r=0;r<t.length;r++)n[r]=e(t[r]);return n}function ic(t,e){return t.texture===e.texture&&t.binding===e.binding}function da(t,e){return t.buffer===e.buffer&&t.size===e.size&&t.binding===e.binding&&t.offset===e.offset}function sc(t,e){return t===null?e===null:e===null?!1:t.sampler===e.sampler&&t.texture===e.texture&&t.dimension===e.dimension&&t.formatKind===e.formatKind&&t.comparison===e.comparison}function ac(t,e){return t.samplerBindings=t.samplerBindings||[],t.uniformBufferBindings=t.uniformBufferBindings||[],t.storageBufferBindings=t.storageBufferBindings||[],t.storageTextureBindings=t.storageTextureBindings||[],e.samplerBindings=e.samplerBindings||[],e.uniformBufferBindings=e.uniformBufferBindings||[],e.storageBufferBindings=e.storageBufferBindings||[],e.storageTextureBindings=e.storageTextureBindings||[],!(t.samplerBindings.length!==e.samplerBindings.length||!ln(t.samplerBindings,e.samplerBindings,sc)||!ln(t.uniformBufferBindings,e.uniformBufferBindings,da)||!ln(t.storageBufferBindings,e.storageBufferBindings,da)||!ln(t.storageTextureBindings,e.storageTextureBindings,ic))}function fa(t,e){return t.blendMode==e.blendMode&&t.blendSrcFactor===e.blendSrcFactor&&t.blendDstFactor===e.blendDstFactor}function oc(t,e){return!(!fa(t.rgbBlendState,e.rgbBlendState)||!fa(t.alphaBlendState,e.alphaBlendState)||t.channelWriteMask!==e.channelWriteMask)}function pa(t,e){return t.compare==e.compare&&t.depthFailOp===e.depthFailOp&&t.failOp===e.failOp&&t.passOp===e.passOp}function lc(t,e){return!ln(t.attachmentsState,e.attachmentsState,oc)||t.blendConstant&&e.blendConstant&&!Ql(t.blendConstant,e.blendConstant)||t.stencilFront&&e.stencilFront&&!pa(t.stencilFront,e.stencilFront)||t.stencilBack&&e.stencilBack&&!pa(t.stencilBack,e.stencilBack)?!1:t.depthCompare===e.depthCompare&&t.depthWrite===e.depthWrite&&t.stencilWrite===e.stencilWrite&&t.cullMode===e.cullMode&&t.frontFace===e.frontFace&&t.polygonOffset===e.polygonOffset}function vo(t,e){return t.id===e.id}function cc(t,e){return t===e}function uc(t,e){return!(t.topology!==e.topology||t.inputLayout!==e.inputLayout||t.sampleCount!==e.sampleCount||t.megaStateDescriptor&&e.megaStateDescriptor&&!lc(t.megaStateDescriptor,e.megaStateDescriptor)||!vo(t.program,e.program)||!ln(t.colorAttachmentFormats,e.colorAttachmentFormats,cc)||t.depthStencilAttachmentFormat!==e.depthStencilAttachmentFormat)}function hc(t,e){return t.offset===e.offset&&t.shaderLocation===e.shaderLocation&&t.format===e.format&&t.divisor===e.divisor}function _c(t,e){return hn(t)?hn(e):hn(e)?!1:t.arrayStride===e.arrayStride&&t.stepMode===e.stepMode&&ln(t.attributes,e.attributes,hc)}function dc(t,e){return!(t.indexBufferFormat!==e.indexBufferFormat||!ln(t.vertexBufferDescriptors,e.vertexBufferDescriptors,_c)||!vo(t.program,e.program))}function fc(t,e){return t.addressModeU===e.addressModeU&&t.addressModeV===e.addressModeV&&t.minFilter===e.minFilter&&t.magFilter===e.magFilter&&t.mipmapFilter===e.mipmapFilter&&t.lodMinClamp===e.lodMinClamp&&t.lodMaxClamp===e.lodMaxClamp&&t.maxAnisotropy===e.maxAnisotropy&&t.compareFunction===e.compareFunction}function pc(t){var e=t.sampler,n=t.texture,r=t.dimension,i=t.formatKind,s=t.comparison;return{sampler:e,texture:n,dimension:r,formatKind:i,comparison:s}}function ma(t){var e=t.buffer,n=t.size,r=t.binding,i=t.offset;return{binding:r,buffer:e,offset:i,size:n}}function mc(t){var e=t.binding,n=t.texture;return{binding:e,texture:n}}function gc(t){var e=t.samplerBindings&&Wn(t.samplerBindings,pc),n=t.uniformBufferBindings&&Wn(t.uniformBufferBindings,ma),r=t.storageBufferBindings&&Wn(t.storageBufferBindings,ma),i=t.storageTextureBindings&&Wn(t.storageTextureBindings,mc);return{samplerBindings:e,uniformBufferBindings:n,storageBufferBindings:r,storageTextureBindings:i,pipeline:t.pipeline}}function Ec(t){var e=t.inputLayout,n=t.program,r=t.topology,i=t.megaStateDescriptor&&Vr(t.megaStateDescriptor),s=t.colorAttachmentFormats.slice(),a=t.depthStencilAttachmentFormat,o=t.sampleCount;return{inputLayout:e,megaStateDescriptor:i,program:n,topology:r,colorAttachmentFormats:s,depthStencilAttachmentFormat:a,sampleCount:o}}function vc(t){var e=t.shaderLocation,n=t.format,r=t.offset,i=t.divisor;return{shaderLocation:e,format:n,offset:r,divisor:i}}function Ac(t){if(hn(t))return t;var e=t.arrayStride,n=t.stepMode,r=Wn(t.attributes,vc);return{arrayStride:e,stepMode:n,attributes:r}}function yc(t){var e=Wn(t.vertexBufferDescriptors,Ac),n=t.indexBufferFormat,r=t.program;return{vertexBufferDescriptors:e,indexBufferFormat:n,program:r}}var X,Rc=/([^[]*)(\[[0-9]+\])?/;function Tc(t){if(t[t.length-1]!=="]")return{name:t,length:1,isArray:!1};var e=t.match(Rc);if(!e||e.length<2)throw new Error("Failed to parse GLSL uniform name ".concat(t));return{name:e[1],length:Number(e[2])||1,isArray:!!e[2]}}function qe(){var t=null;return function(e,n,r){var i=t!==r;return i&&(e.uniform1i(n,r),t=r),i}}function oe(t,e,n,r){var i=null,s=null;return function(a,o,l){var c=e(l,n),u=c.length,h=!1;if(i===null)i=new Float32Array(u),s=u,h=!0;else{U(s===u,"Uniform length cannot change.");for(var _=0;_<u;++_)if(c[_]!==i[_]){h=!0;break}}return h&&(r(a,t,o,c),i.set(c)),h}}function Ve(t,e,n,r){t[e](n,r)}function jt(t,e,n,r){t[e](n,!1,r)}var wc={},bc={},xc={},ga=[0];function Os(t,e,n,r){e===1&&typeof t=="boolean"&&(t=t?1:0),Number.isFinite(t)&&(ga[0]=t,t=ga);var i=t.length;if(t instanceof n)return t;var s=r[i];s||(s=new n(i),r[i]=s);for(var a=0;a<i;a++)s[a]=t[a];return s}function rt(t,e){return Os(t,e,Float32Array,wc)}function on(t,e){return Os(t,e,Int32Array,bc)}function Zr(t,e){return Os(t,e,Uint32Array,xc)}var Sc=(X={},X[R.FLOAT]=oe.bind(null,"uniform1fv",rt,1,Ve),X[R.FLOAT_VEC2]=oe.bind(null,"uniform2fv",rt,2,Ve),X[R.FLOAT_VEC3]=oe.bind(null,"uniform3fv",rt,3,Ve),X[R.FLOAT_VEC4]=oe.bind(null,"uniform4fv",rt,4,Ve),X[R.INT]=oe.bind(null,"uniform1iv",on,1,Ve),X[R.INT_VEC2]=oe.bind(null,"uniform2iv",on,2,Ve),X[R.INT_VEC3]=oe.bind(null,"uniform3iv",on,3,Ve),X[R.INT_VEC4]=oe.bind(null,"uniform4iv",on,4,Ve),X[R.BOOL]=oe.bind(null,"uniform1iv",on,1,Ve),X[R.BOOL_VEC2]=oe.bind(null,"uniform2iv",on,2,Ve),X[R.BOOL_VEC3]=oe.bind(null,"uniform3iv",on,3,Ve),X[R.BOOL_VEC4]=oe.bind(null,"uniform4iv",on,4,Ve),X[R.FLOAT_MAT2]=oe.bind(null,"uniformMatrix2fv",rt,4,jt),X[R.FLOAT_MAT3]=oe.bind(null,"uniformMatrix3fv",rt,9,jt),X[R.FLOAT_MAT4]=oe.bind(null,"uniformMatrix4fv",rt,16,jt),X[R.UNSIGNED_INT]=oe.bind(null,"uniform1uiv",Zr,1,Ve),X[R.UNSIGNED_INT_VEC2]=oe.bind(null,"uniform2uiv",Zr,2,Ve),X[R.UNSIGNED_INT_VEC3]=oe.bind(null,"uniform3uiv",Zr,3,Ve),X[R.UNSIGNED_INT_VEC4]=oe.bind(null,"uniform4uiv",Zr,4,Ve),X[R.FLOAT_MAT2x3]=oe.bind(null,"uniformMatrix2x3fv",rt,6,jt),X[R.FLOAT_MAT2x4]=oe.bind(null,"uniformMatrix2x4fv",rt,8,jt),X[R.FLOAT_MAT3x2]=oe.bind(null,"uniformMatrix3x2fv",rt,6,jt),X[R.FLOAT_MAT3x4]=oe.bind(null,"uniformMatrix3x4fv",rt,12,jt),X[R.FLOAT_MAT4x2]=oe.bind(null,"uniformMatrix4x2fv",rt,8,jt),X[R.FLOAT_MAT4x3]=oe.bind(null,"uniformMatrix4x3fv",rt,12,jt),X[R.SAMPLER_2D]=qe,X[R.SAMPLER_CUBE]=qe,X[R.SAMPLER_3D]=qe,X[R.SAMPLER_2D_SHADOW]=qe,X[R.SAMPLER_2D_ARRAY]=qe,X[R.SAMPLER_2D_ARRAY_SHADOW]=qe,X[R.SAMPLER_CUBE_SHADOW]=qe,X[R.INT_SAMPLER_2D]=qe,X[R.INT_SAMPLER_3D]=qe,X[R.INT_SAMPLER_CUBE]=qe,X[R.INT_SAMPLER_2D_ARRAY]=qe,X[R.UNSIGNED_INT_SAMPLER_2D]=qe,X[R.UNSIGNED_INT_SAMPLER_3D]=qe,X[R.UNSIGNED_INT_SAMPLER_CUBE]=qe,X[R.UNSIGNED_INT_SAMPLER_2D_ARRAY]=qe,X);function Ea(t,e,n){var r=Sc[n.type];if(!r)throw new Error("Unknown GLSL uniform type ".concat(n.type));return r().bind(null,t,e)}var Ic={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121};function Nc(t){return Object.prototype.toString.call(t)in Ic}function lr(t,e){return"#define ".concat(t," ").concat(e)}function Oc(t){var e={};return t.replace(/^\s*#define\s*(\S*)\s*(\S*)\s*$/gm,function(n,r,i){var s=Number(i);return e[r]=isNaN(s)?i:s,""}),e}function Cc(t,e){var n=[];return t.replace(/^\s*layout\(location\s*=\s*(\S*)\)\s*in\s+\S+\s*(.*);$/gm,function(r,i,s){var a=Number(i);return n.push({location:isNaN(a)?e[i]:a,name:s}),""}),n}function va(t){if(t===void 0)return null;var e=/binding\s*=\s*(\d+)/.exec(t);if(e!==null){var n=parseInt(e[1],10);if(!Number.isNaN(n))return n}return null}function Mc(t){var e="",n=t;return[n,e]}function Ri(t,e,n,r,i){var s;r===void 0&&(r=null),i===void 0&&(i=!0);var a=t.glslVersion==="#version 100",o=e==="frag"&&((s=n.match(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm))===null||s===void 0?void 0:s.length)>1,l=n.replace(`\r
`,`
`).split(`
`).map(function(O){return O.replace(/[/][/].*$/,"")}).filter(function(O){var S=!O||/^\s+$/.test(O);return!S}),c="";r!==null&&(c=Object.keys(r).map(function(O){return lr(O,r[O])}).join(`
`));var u=l.find(function(O){return O.startsWith("precision")})||"precision mediump float;",h=i?l.filter(function(O){return!O.startsWith("precision")}).join(`
`):l.join(`
`),_="";if(t.viewportOrigin===mi.UPPER_LEFT&&(_+="".concat(lr("VIEWPORT_ORIGIN_TL","1"),`
`)),t.clipSpaceNearZ===gi.ZERO&&(_+="".concat(lr("CLIPSPACE_NEAR_ZERO","1"),`
`)),t.explicitBindingLocations){var p=0,f=0,g=0;h=h.replace(/^\s*(layout\((.*)\))?\s*uniform(.+{)$/gm,function(O,S,B,W){var J=B?"".concat(B,", "):"";return"layout(".concat(J,"set = ").concat(p,", binding = ").concat(f++,") uniform ").concat(W)}),p++,f=0,U(t.separateSamplerTextures),h=h.replace(/^\s*(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(O,S,B,W,J){var se=va(B);se===null&&(se=f++);var he=gs(Mc(W),2),Ce=he[0],ct=he[1];return e==="frag"?`
layout(set = `.concat(p,", binding = ").concat(se*2+0,") uniform texture").concat(Ce," T_").concat(J,`;
layout(set = `).concat(p,", binding = ").concat(se*2+1,") uniform sampler").concat(ct," S_").concat(J,";").trim():""}),h=h.replace(e==="frag"?/^\s*\b(varying|in)\b/gm:/^\s*\b(varying|out)\b/gm,function(O,S){return"layout(location = ".concat(g++,") ").concat(S)}),_+="".concat(lr("gl_VertexID","gl_VertexIndex"),`
`),_+="".concat(lr("gl_InstanceID","gl_InstanceIndex"),`
`),u=u.replace(/^precision (.*) sampler(.*);$/gm,"")}else{var m=0;h=h.replace(/^\s*(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(O,S,B,W,J){var se=va(B);return se===null&&(se=m++),"uniform sampler".concat(W," ").concat(J,"; // BINDING=").concat(se)})}if(t.separateSamplerTextures)h=h.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(O,S,B){return"sampler".concat(S,"(T_").concat(B,", S_").concat(B,")")}),h=h.replace(/\bTEXTURE\((.*?)\)/g,function(O,S){return"T_".concat(S)});else{var E=[];h=h.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(O,S,B){return E.push([B,S]),B}),a&&E.forEach(function(O){var S=gs(O,2),B=S[0],W=S[1];h=h.replace(new RegExp("texture\\(".concat(B),"g"),function(){return"texture".concat(W,"(").concat(B)})}),h=h.replace(/\bTEXTURE\((.*?)\)/g,function(O,S){return S})}var v="".concat(a?"":t.glslVersion,`
`).concat(a&&o?`#extension GL_EXT_draw_buffers : require
`:"",`
`).concat(a&&e==="frag"?`#extension GL_OES_standard_derivatives : enable
`:"").concat(i?u:"",`
`).concat(_||"").concat(c?c+`
`:"",`
`).concat(h,`
`).trim();if(t.explicitBindingLocations&&e==="frag"&&(v=v.replace(/^\b(out)\b/g,function(O,S){return"layout(location = 0) ".concat(S)})),a){if(e==="frag"&&(v=v.replace(/^\s*in\s+(\S+)\s*(.*);$/gm,function(O,S,B){return"varying ".concat(S," ").concat(B,`;
`)})),e==="vert"&&(v=v.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(O,S,B){return"varying ".concat(S," ").concat(B,`;
`)}),v=v.replace(/^\s*layout\(location\s*=\s*\S*\)\s*in\s+(\S+)\s*(.*);$/gm,function(O,S,B){return"attribute ".concat(S," ").concat(B,`;
`)})),v=v.replace(/\s*uniform\s*.*\s*{((?:\s*.*\s*)*?)};/g,function(O,S){return S.trim().replace(/^.*$/gm,function(B){var W=B.trim();return W.startsWith("#")?W:B?"uniform ".concat(W):""})}),e==="frag")if(o){var x=[];v=v.replace(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm,function(O,S){return x.push(S),"vec4 ".concat(S,`;
`)});var C=v.lastIndexOf("}");v=v.substring(0,C)+`
    `.concat(x.map(function(O,S){return"gl_FragData[".concat(S,"] = ").concat(O,`;
    `)}).join(`
`))+v.substring(C)}else{var k;if(v=v.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(O,S,B){return k=B,"".concat(S," ").concat(B,`;
`)}),k){var C=v.lastIndexOf("}");v=v.substring(0,C)+`
  gl_FragColor = vec4(`.concat(k,`);
`)+v.substring(C)}}v=v.replace(/^\s*layout\((.*)\)/gm,"")}return v}function Bc(t,e,n,r){r===void 0&&(r=null);var i=Ri(t,"vert",e,r),s=Ri(t,"frag",n,r);return{vert:e,frag:n,preprocessedVert:i,preprocessedFrag:s}}var xt=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=t.call(this)||this;return s.id=r,s.device=i,s.device.resourceCreationTracker!==null&&s.device.resourceCreationTracker.trackResourceCreated(s),s}return e.prototype.destroy=function(){this.device.resourceCreationTracker!==null&&this.device.resourceCreationTracker.trackResourceDestroyed(this)},e}(lo);(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;a.type=te.Bindings;var o=s.uniformBufferBindings,l=s.samplerBindings;return a.uniformBufferBindings=o||[],a.samplerBindings=l||[],a.bindingLayouts=a.createBindingLayouts(),a}return e.prototype.createBindingLayouts=function(){var n=0,r=0,i=[],s=this.uniformBufferBindings.length,a=this.samplerBindings.length;return i.push({firstUniformBuffer:n,numUniformBuffers:s,firstSampler:r,numSamplers:a}),n+=s,r+=a,{numUniformBuffers:n,numSamplers:r,bindingLayoutTables:i}},e})(xt);function K(t){return typeof WebGL2RenderingContext<"u"&&t instanceof WebGL2RenderingContext?!0:!!(t&&t._version===2)}function Dc(t){var e=Vt(t);switch(e){case T.BC1:case T.BC2:case T.BC3:case T.BC4_UNORM:case T.BC4_SNORM:case T.BC5_UNORM:case T.BC5_SNORM:return!0;default:return!1}}function Pc(t){var e=Sr(t);if(e&I.Normalized)return!1;var n=Vt(t);return n===T.S8||n===T.S16||n===T.S32||n===T.U8||n===T.U16||n===T.U32}function Uc(t){switch(t){case dn.STATIC:return R.STATIC_DRAW;case dn.DYNAMIC:return R.DYNAMIC_DRAW}}function Aa(t){if(t&ie.INDEX)return R.ELEMENT_ARRAY_BUFFER;if(t&ie.VERTEX)return R.ARRAY_BUFFER;if(t&ie.UNIFORM)return R.UNIFORM_BUFFER}function Fc(t){switch(t){case Re.TRIANGLES:return R.TRIANGLES;case Re.POINTS:return R.POINTS;case Re.TRIANGLE_STRIP:return R.TRIANGLE_STRIP;case Re.LINES:return R.LINES;case Re.LINE_STRIP:return R.LINE_STRIP;default:throw new Error("Unknown primitive topology mode")}}function Lc(t){switch(t){case T.U8:return R.UNSIGNED_BYTE;case T.U16:return R.UNSIGNED_SHORT;case T.U32:return R.UNSIGNED_INT;case T.S8:return R.BYTE;case T.S16:return R.SHORT;case T.S32:return R.INT;case T.F16:return R.HALF_FLOAT;case T.F32:return R.FLOAT;default:throw new Error("whoops")}}function Vc(t){switch(t){case D.R:return 1;case D.RG:return 2;case D.RGB:return 3;case D.RGBA:return 4;default:return 1}}function Hc(t){var e=Vt(t),n=co(t),r=Sr(t),i=Lc(e),s=Vc(n),a=!!(r&I.Normalized);return{size:s,type:i,normalized:a}}function zc(t){switch(t){case w.U8_R:return R.UNSIGNED_BYTE;case w.U16_R:return R.UNSIGNED_SHORT;case w.U32_R:return R.UNSIGNED_INT;default:throw new Error("whoops")}}function cr(t){switch(t){case Oe.CLAMP_TO_EDGE:return R.CLAMP_TO_EDGE;case Oe.REPEAT:return R.REPEAT;case Oe.MIRRORED_REPEAT:return R.MIRRORED_REPEAT;default:throw new Error("whoops")}}function Gr(t,e){if(e===me.LINEAR&&t===ae.BILINEAR)return R.LINEAR_MIPMAP_LINEAR;if(e===me.LINEAR&&t===ae.POINT)return R.NEAREST_MIPMAP_LINEAR;if(e===me.NEAREST&&t===ae.BILINEAR)return R.LINEAR_MIPMAP_NEAREST;if(e===me.NEAREST&&t===ae.POINT)return R.NEAREST_MIPMAP_NEAREST;if(e===me.NO_MIP&&t===ae.BILINEAR)return R.LINEAR;if(e===me.NO_MIP&&t===ae.POINT)return R.NEAREST;throw new Error("Unknown texture filter mode")}function Cs(t,e){e===void 0&&(e=0);var n=t;return n.gl_buffer_pages[e/n.pageByteSize|0]}function kc(t){var e=t;return e.gl_texture}function Xc(t){var e=t;return e.gl_sampler}function Wc(t){switch(t){case Ei.OcclusionConservative:return R.ANY_SAMPLES_PASSED_CONSERVATIVE;default:throw new Error("whoops")}}(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;a.type=te.Buffer;var o=s.viewOrSize,l=s.usage,c=s.hint,u=c===void 0?dn.STATIC:c,h=i.uniformBufferMaxPageByteSize,_=i.gl,p=l&ie.UNIFORM;p||(K(_)?_.bindVertexArray(null):i.OES_vertex_array_object.bindVertexArrayOES(null));var f=Xn(o)?Ai(o,4):Ai(o.byteLength,4);a.gl_buffer_pages=[];var g;if(p){for(var m=f;m>0;)a.gl_buffer_pages.push(a.createBufferPage(Math.min(m,h),l,u)),m-=h;g=h}else a.gl_buffer_pages.push(a.createBufferPage(f,l,u)),g=f;return a.pageByteSize=g,a.byteSize=f,a.usage=l,a.gl_target=Aa(l),Xn(o)||a.setSubData(0,new Uint8Array(o.buffer)),p||(K(_)?_.bindVertexArray(a.device.currentBoundVAO):i.OES_vertex_array_object.bindVertexArrayOES(a.device.currentBoundVAO)),a}return e.prototype.setSubData=function(n,r,i,s){i===void 0&&(i=0),s===void 0&&(s=r.byteLength-i);for(var a=this.device.gl,o=this.pageByteSize,l=n+s,c=n,u=n%o;c<l;){var h=K(a)?a.COPY_WRITE_BUFFER:this.gl_target,_=Cs(this,c);if(_.ubo)return;a.bindBuffer(h,_),K(a)?a.bufferSubData(h,u,r,i,Math.min(l-c,o)):a.bufferSubData(h,u,r),c+=o,u=0,i+=o,this.device.debugGroupStatisticsBufferUpload()}},e.prototype.destroy=function(){t.prototype.destroy.call(this);for(var n=0;n<this.gl_buffer_pages.length;n++)this.gl_buffer_pages[n].ubo||this.device.gl.deleteBuffer(this.gl_buffer_pages[n]);this.gl_buffer_pages=[]},e.prototype.createBufferPage=function(n,r,i){var s=this.device.gl,a=r&ie.UNIFORM;if(!K(s)&&a)return{ubo:!0};var o=this.device.ensureResourceExists(s.createBuffer()),l=Aa(r),c=Uc(i);return s.bindBuffer(l,o),s.bufferData(l,n,c),o},e})(xt);(function(t){ue(e,t);function e(n){var r,i,s,a,o=n.id,l=n.device,c=n.descriptor,u,h=t.call(this,{id:o,device:l})||this;h.type=te.InputLayout;var _=c.vertexBufferDescriptors,p=c.indexBufferFormat,f=c.program;U(p===w.U16_R||p===w.U32_R||p===null);var g=p!==null?zc(p):null,m=p!==null?ho(p):null,E=h.device.gl,v=h.device.ensureResourceExists(K(E)?E.createVertexArray():l.OES_vertex_array_object.createVertexArrayOES());K(E)?E.bindVertexArray(v):l.OES_vertex_array_object.bindVertexArrayOES(v),E.bindBuffer(E.ARRAY_BUFFER,Cs(h.device.fallbackVertexBuffer));try{for(var x=br(c.vertexBufferDescriptors),C=x.next();!C.done;C=x.next()){var k=C.value,O=k.stepMode,S=k.attributes;try{for(var B=(s=void 0,br(S)),W=B.next();!W.done;W=B.next()){var J=W.value,se=J.shaderLocation,he=J.format,Ce=J.divisor,ct=Ce===void 0?1:Ce,je=K(E)?se:(u=f.attributes[se])===null||u===void 0?void 0:u.location,Z=Hc(he);if(J.vertexFormat=Z,!hn(je)){Pc(he);var an=Z.size,ir=Z.type,Sn=Z.normalized;E.vertexAttribPointer(je,an,ir,Sn,0,0),O===Kn.INSTANCE&&(K(E)?E.vertexAttribDivisor(je,ct):l.ANGLE_instanced_arrays.vertexAttribDivisorANGLE(je,ct)),E.enableVertexAttribArray(je)}}}catch($t){s={error:$t}}finally{try{W&&!W.done&&(a=B.return)&&a.call(B)}finally{if(s)throw s.error}}}}catch($t){r={error:$t}}finally{try{C&&!C.done&&(i=x.return)&&i.call(x)}finally{if(r)throw r.error}}return K(E)?E.bindVertexArray(null):l.OES_vertex_array_object.bindVertexArrayOES(null),h.vertexBufferDescriptors=_,h.vao=v,h.indexBufferFormat=p,h.indexBufferType=g,h.indexBufferCompByteSize=m,h.program=f,h}return e.prototype.destroy=function(){t.prototype.destroy.call(this),this.device.currentBoundVAO===this.vao&&(K(this.device.gl)?(this.device.gl.bindVertexArray(null),this.device.gl.deleteVertexArray(this.vao)):(this.device.OES_vertex_array_object.bindVertexArrayOES(null),this.device.OES_vertex_array_object.deleteVertexArrayOES(this.vao)),this.device.currentBoundVAO=null)},e})(xt);var $c=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=n.fake,o=t.call(this,{id:r,device:i})||this;o.type=te.Texture,s=fe({dimension:q.TEXTURE_2D,depthOrArrayLayers:1,mipLevelCount:1},s);var l=o.device.gl,c,u,h=o.clampmipLevelCount(s);if(o.immutable=s.usage===mt.RENDER_TARGET,o.pixelStore=s.pixelStore,o.format=s.format,o.dimension=s.dimension,o.formatKind=fo(s.format),o.width=s.width,o.height=s.height,o.depthOrArrayLayers=s.depthOrArrayLayers,o.mipmaps=h>=1,!a){u=o.device.ensureResourceExists(l.createTexture());var _=o.device.translateTextureType(s.format),p=o.device.translateTextureInternalFormat(s.format);if(o.device.setActiveTexture(l.TEXTURE0),o.device.currentTextures[0]=null,o.preprocessImage(),s.dimension===q.TEXTURE_2D){if(c=R.TEXTURE_2D,l.bindTexture(c,u),o.immutable)if(K(l))l.texStorage2D(c,h,p,s.width,s.height);else{var f=(p===R.DEPTH_COMPONENT||o.isNPOT(),0);(o.format===w.D32F||o.format===w.D24_S8)&&!K(l)&&!i.WEBGL_depth_texture||(l.texImage2D(c,f,p,s.width,s.height,0,p,_,null),o.mipmaps&&(o.mipmaps=!1,l.texParameteri(R.TEXTURE_2D,R.TEXTURE_MIN_FILTER,R.LINEAR),l.texParameteri(R.TEXTURE_2D,R.TEXTURE_WRAP_S,R.CLAMP_TO_EDGE),l.texParameteri(R.TEXTURE_2D,R.TEXTURE_WRAP_T,R.CLAMP_TO_EDGE)))}U(s.depthOrArrayLayers===1)}else if(s.dimension===q.TEXTURE_2D_ARRAY)c=R.TEXTURE_2D_ARRAY,l.bindTexture(c,u),o.immutable&&K(l)&&l.texStorage3D(c,h,p,s.width,s.height,s.depthOrArrayLayers);else if(s.dimension===q.TEXTURE_3D)c=R.TEXTURE_3D,l.bindTexture(c,u),o.immutable&&K(l)&&l.texStorage3D(c,h,p,s.width,s.height,s.depthOrArrayLayers);else if(s.dimension===q.TEXTURE_CUBE_MAP)c=R.TEXTURE_CUBE_MAP,l.bindTexture(c,u),o.immutable&&K(l)&&l.texStorage2D(c,h,p,s.width,s.height),U(s.depthOrArrayLayers===6);else throw new Error("whoops")}return o.gl_texture=u,o.gl_target=c,o.mipLevelCount=h,o}return e.prototype.setImageData=function(n,r){r===void 0&&(r=0);var i=this.device.gl;Dc(this.format);var s=this.gl_target===R.TEXTURE_3D||this.gl_target===R.TEXTURE_2D_ARRAY,a=this.gl_target===R.TEXTURE_CUBE_MAP,o=Nc(n[0]);this.device.setActiveTexture(i.TEXTURE0),this.device.currentTextures[0]=null;var l=n[0],c,u;o?(c=this.width,u=this.height):(c=l.width,u=l.height,this.width=c,this.height=u),i.bindTexture(this.gl_target,this.gl_texture);var h=this.device.translateTextureFormat(this.format),_=K(i)?this.device.translateInternalTextureFormat(this.format):h,p=this.device.translateTextureType(this.format);this.preprocessImage();for(var f=0;f<this.depthOrArrayLayers;f++){var g=n[f],m=this.gl_target;a&&(m=R.TEXTURE_CUBE_MAP_POSITIVE_X+f%6),this.immutable?i.texSubImage2D(m,r,0,0,c,u,h,p,g):K(i)?s?i.texImage3D(m,r,_,c,u,this.depthOrArrayLayers,0,h,p,g):i.texImage2D(m,r,_,c,u,0,h,p,g):o?i.texImage2D(m,r,h,c,u,0,h,p,g):i.texImage2D(m,r,h,h,p,g)}this.mipmaps&&this.generateMipmap(s)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.device.gl.deleteTexture(kc(this))},e.prototype.clampmipLevelCount=function(n){if(n.dimension===q.TEXTURE_2D_ARRAY&&n.depthOrArrayLayers>1){var r=Vt(n.format);if(r===T.BC1)for(var i=n.width,s=n.height,a=0;a<n.mipLevelCount;a++){if(i<=2||s<=2)return a-1;i=Math.max(i/2|0,1),s=Math.max(s/2|0,1)}}return n.mipLevelCount},e.prototype.preprocessImage=function(){var n=this.device.gl;this.pixelStore&&(this.pixelStore.unpackFlipY&&n.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,!0),this.pixelStore.packAlignment&&n.pixelStorei(R.PACK_ALIGNMENT,this.pixelStore.packAlignment),this.pixelStore.unpackAlignment&&n.pixelStorei(R.UNPACK_ALIGNMENT,this.pixelStore.unpackAlignment))},e.prototype.generateMipmap=function(n){n===void 0&&(n=!1);var r=this.device.gl;return!K(r)&&this.isNPOT()?this:(this.gl_texture&&this.gl_target&&(r.bindTexture(this.gl_target,this.gl_texture),n?(r.texParameteri(this.gl_target,R.TEXTURE_BASE_LEVEL,0),r.texParameteri(this.gl_target,R.TEXTURE_MAX_LEVEL,Math.log2(this.width)),r.texParameteri(this.gl_target,R.TEXTURE_MIN_FILTER,R.LINEAR_MIPMAP_LINEAR),r.texParameteri(this.gl_target,R.TEXTURE_MAG_FILTER,R.LINEAR)):r.texParameteri(R.TEXTURE_2D,R.TEXTURE_MIN_FILTER,R.NEAREST_MIPMAP_LINEAR),r.generateMipmap(this.gl_target),r.bindTexture(this.gl_target,null)),this)},e.prototype.isNPOT=function(){var n=this.device.gl;return K(n)?!1:!vi(this.width)||!vi(this.height)},e}(xt);(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;a.type=te.RenderTarget,a.gl_renderbuffer=null,a.texture=null;var o=a.device.gl,l=s.format,c=s.width,u=s.height,h=s.sampleCount,_=h===void 0?1:h,p=s.texture,f=!1;if((l===w.D32F||l===w.D24_S8)&&p&&!K(o)&&!i.WEBGL_depth_texture&&(p.destroy(),a.texture=null,f=!0),!f&&p)a.texture=p;else{a.gl_renderbuffer=a.device.ensureResourceExists(o.createRenderbuffer()),o.bindRenderbuffer(o.RENDERBUFFER,a.gl_renderbuffer);var g=a.device.translateTextureInternalFormat(l,!0);K(o)&&_>1?o.renderbufferStorageMultisample(R.RENDERBUFFER,_,g,c,u):o.renderbufferStorage(R.RENDERBUFFER,g,c,u)}return a.format=l,a.width=c,a.height=u,a.sampleCount=_,a}return e.prototype.destroy=function(){t.prototype.destroy.call(this),this.gl_renderbuffer!==null&&this.device.gl.deleteRenderbuffer(this.gl_renderbuffer),this.texture&&this.texture.destroy()},e})(xt);var yr;(function(t){t[t.NeedsCompile=0]="NeedsCompile",t[t.Compiling=1]="Compiling",t[t.NeedsBind=2]="NeedsBind",t[t.ReadyToUse=3]="ReadyToUse"})(yr||(yr={}));(function(t){ue(e,t);function e(n,r){var i=n.id,s=n.device,a=n.descriptor,o=t.call(this,{id:i,device:s})||this;o.rawVertexGLSL=r,o.type=te.Program,o.uniformSetters={},o.attributes=[];var l=o.device.gl;return o.descriptor=a,o.gl_program=o.device.ensureResourceExists(l.createProgram()),o.gl_shader_vert=null,o.gl_shader_frag=null,o.compileState=yr.NeedsCompile,o.tryCompileProgram(),o}return e.prototype.destroy=function(){t.prototype.destroy.call(this),this.device.gl.deleteProgram(this.gl_program),this.device.gl.deleteShader(this.gl_shader_vert),this.device.gl.deleteShader(this.gl_shader_frag)},e.prototype.tryCompileProgram=function(){var n,r;U(this.compileState===yr.NeedsCompile);var i=this.descriptor,s=this.device.gl;!((n=i.vertex)===null||n===void 0)&&n.glsl&&(!((r=i.fragment)===null||r===void 0)&&r.glsl)&&(this.gl_shader_vert=this.compileShader(i.vertex.glsl,s.VERTEX_SHADER),this.gl_shader_frag=this.compileShader(i.fragment.glsl,s.FRAGMENT_SHADER),s.attachShader(this.gl_program,this.gl_shader_vert),s.attachShader(this.gl_program,this.gl_shader_frag),s.linkProgram(this.gl_program),this.compileState=yr.Compiling,K(s)||(this.readUniformLocationsFromLinkedProgram(),this.readAttributesFromLinkedProgram()))},e.prototype.readAttributesFromLinkedProgram=function(){for(var n,r=this.device.gl,i=r.getProgramParameter(this.gl_program,r.ACTIVE_ATTRIBUTES),s=Oc(this.descriptor.vertex.glsl),a=Cc(this.rawVertexGLSL,s),o=function(u){var h=r.getActiveAttrib(l.gl_program,u),_=h.name,p=h.type,f=h.size,g=r.getAttribLocation(l.gl_program,_),m=(n=a.find(function(E){return E.name===_}))===null||n===void 0?void 0:n.location;g>=0&&!hn(m)&&(l.attributes[m]={name:_,location:g,type:p,size:f})},l=this,c=0;c<i;c++)o(c)},e.prototype.readUniformLocationsFromLinkedProgram=function(){for(var n=this.device.gl,r=n.getProgramParameter(this.gl_program,n.ACTIVE_UNIFORMS),i=0;i<r;i++){var s=n.getActiveUniform(this.gl_program,i),a=Tc(s.name).name,o=n.getUniformLocation(this.gl_program,a);if(this.uniformSetters[a]=Ea(n,o,s),s&&s.size>1)for(var l=0;l<s.size;l++)o=n.getUniformLocation(this.gl_program,"".concat(a,"[").concat(l,"]")),this.uniformSetters["".concat(a,"[").concat(l,"]")]=Ea(n,o,s)}},e.prototype.compileShader=function(n,r){var i=this.device.gl,s=this.device.ensureResourceExists(i.createShader(r));return i.shaderSource(s,n),i.compileShader(s),s},e.prototype.setUniformsLegacy=function(n){n===void 0&&(n={});var r=this.device.gl;if(!K(r)){var i=!1;for(var s in n){i||(r.useProgram(this.gl_program),i=!0);var a=n[s],o=this.uniformSetters[s];if(o){var l=a;l instanceof $c&&(l=l.textureIndex),o(l)}}}return this},e})(xt);(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;a.type=te.QueryPool;var o=a.device.gl;if(K(o)){var l=s.elemCount,c=s.type;a.gl_query=Nn(l,function(){return a.device.ensureResourceExists(o.createQuery())}),a.gl_query_type=Wc(c)}return a}return e.prototype.queryResultOcclusion=function(n){var r=this.device.gl;if(K(r)){var i=this.gl_query[n];return r.getQueryParameter(i,r.QUERY_RESULT_AVAILABLE)?!!r.getQueryParameter(i,r.QUERY_RESULT):null}return null},e.prototype.destroy=function(){t.prototype.destroy.call(this);var n=this.device.gl;if(K(n))for(var r=0;r<this.gl_query.length;r++)n.deleteQuery(this.gl_query[r])},e})(xt);(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=t.call(this,{id:r,device:i})||this;return s.type=te.Readback,s.gl_pbo=null,s.gl_sync=null,s}return e.prototype.clientWaitAsync=function(n,r,i){r===void 0&&(r=0),i===void 0&&(i=10);var s=this.device.gl;return new Promise(function(a,o){function l(){var c=s.clientWaitSync(n,r,0);if(c==s.WAIT_FAILED){o();return}if(c==s.TIMEOUT_EXPIRED){setTimeout(l,Wl(i,0,s.MAX_CLIENT_WAIT_TIMEOUT_WEBGL));return}a()}l()})},e.prototype.getBufferSubDataAsync=function(n,r,i,s,a,o){return vr(this,void 0,void 0,function(){var l;return Ar(this,function(c){switch(c.label){case 0:return l=this.device.gl,K(l)?(this.gl_sync=l.fenceSync(l.SYNC_GPU_COMMANDS_COMPLETE,0),l.flush(),[4,this.clientWaitAsync(this.gl_sync,0,10)]):[3,2];case 1:return c.sent(),l.bindBuffer(n,r),l.getBufferSubData(n,i,s,a,o),l.bindBuffer(n,null),[2,s];case 2:return[2]}})})},e.prototype.readTexture=function(n,r,i,s,a,o,l,c){return l===void 0&&(l=0),c===void 0&&(c=o.byteLength||0),vr(this,void 0,void 0,function(){var u,h,_,p,f;return Ar(this,function(g){return u=this.device.gl,h=n,_=this.device.translateTextureFormat(h.format),p=this.device.translateTextureType(h.format),f=_o(h.format),K(u)?(this.gl_pbo=this.device.ensureResourceExists(u.createBuffer()),u.bindBuffer(u.PIXEL_PACK_BUFFER,this.gl_pbo),u.bufferData(u.PIXEL_PACK_BUFFER,c,u.STREAM_READ),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),u.bindFramebuffer(R.READ_FRAMEBUFFER,this.device.readbackFramebuffer),u.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,h.gl_texture,0),u.bindBuffer(u.PIXEL_PACK_BUFFER,this.gl_pbo),u.readPixels(r,i,s,a,_,p,l*f),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),[2,this.getBufferSubDataAsync(u.PIXEL_PACK_BUFFER,this.gl_pbo,0,o,l,0)]):[2,this.readTextureSync(n,r,i,s,a,o,l,c)]})})},e.prototype.readTextureSync=function(n,r,i,s,a,o,l,c){c===void 0&&(c=o.byteLength||0);var u=this.device.gl,h=n,_=this.device.translateTextureType(h.format);return u.bindFramebuffer(R.FRAMEBUFFER,this.device.readbackFramebuffer),u.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,h.gl_texture,0),u.pixelStorei(u.PACK_ALIGNMENT,4),u.readPixels(r,i,s,a,u.RGBA,_,o),o},e.prototype.readBuffer=function(n,r,i,s,a){return vr(this,void 0,void 0,function(){var o;return Ar(this,function(l){return o=this.device.gl,K(o)?[2,this.getBufferSubDataAsync(o.ARRAY_BUFFER,Cs(n,r),r,i,s,a)]:[2,Promise.reject()]})})},e.prototype.destroy=function(){t.prototype.destroy.call(this),K(this.device.gl)&&(this.gl_sync!==null&&this.device.gl.deleteSync(this.gl_sync),this.gl_pbo!==null&&this.device.gl.deleteBuffer(this.gl_pbo))},e})(xt);(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a,o,l=t.call(this,{id:r,device:i})||this;return l.type=te.RenderPipeline,l.drawMode=Fc((a=s.topology)!==null&&a!==void 0?a:Re.TRIANGLES),l.program=s.program,l.inputLayout=s.inputLayout,l.megaState=fe(fe({},Vr(Jn)),s.megaStateDescriptor),l.colorAttachmentFormats=s.colorAttachmentFormats.slice(),l.depthStencilAttachmentFormat=s.depthStencilAttachmentFormat,l.sampleCount=(o=s.sampleCount)!==null&&o!==void 0?o:1,l}return e})(xt);(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;return a.type=te.ComputePipeline,a.descriptor=s,a}return e})(xt);(function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a,o,l=t.call(this,{id:r,device:i})||this;l.type=te.Sampler;var c=l.device.gl;if(K(c)){var u=l.device.ensureResourceExists(c.createSampler());c.samplerParameteri(u,R.TEXTURE_WRAP_S,cr(s.addressModeU)),c.samplerParameteri(u,R.TEXTURE_WRAP_T,cr(s.addressModeV)),c.samplerParameteri(u,R.TEXTURE_WRAP_R,cr((a=s.addressModeW)!==null&&a!==void 0?a:s.addressModeU)),c.samplerParameteri(u,R.TEXTURE_MIN_FILTER,Gr(s.minFilter,s.mipmapFilter)),c.samplerParameteri(u,R.TEXTURE_MAG_FILTER,Gr(s.magFilter,me.NO_MIP)),s.lodMinClamp!==void 0&&c.samplerParameterf(u,R.TEXTURE_MIN_LOD,s.lodMinClamp),s.lodMaxClamp!==void 0&&c.samplerParameterf(u,R.TEXTURE_MAX_LOD,s.lodMaxClamp),s.compareFunction!==void 0&&(c.samplerParameteri(u,c.TEXTURE_COMPARE_MODE,c.COMPARE_REF_TO_TEXTURE),c.samplerParameteri(u,c.TEXTURE_COMPARE_FUNC,s.compareFunction));var h=(o=s.maxAnisotropy)!==null&&o!==void 0?o:1;h>1&&l.device.EXT_texture_filter_anisotropic!==null&&(U(s.minFilter===ae.BILINEAR&&s.magFilter===ae.BILINEAR&&s.mipmapFilter===me.LINEAR),c.samplerParameterf(u,l.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,h)),l.gl_sampler=u}else l.descriptor=s;return l}return e.prototype.setTextureParameters=function(n,r,i){var s,a=this.device.gl,o=this.descriptor;this.isNPOT(r,i)?a.texParameteri(R.TEXTURE_2D,R.TEXTURE_MIN_FILTER,R.LINEAR):a.texParameteri(n,R.TEXTURE_MIN_FILTER,Gr(o.minFilter,o.mipmapFilter)),a.texParameteri(R.TEXTURE_2D,R.TEXTURE_WRAP_S,cr(o.addressModeU)),a.texParameteri(R.TEXTURE_2D,R.TEXTURE_WRAP_T,cr(o.addressModeV)),a.texParameteri(n,R.TEXTURE_MAG_FILTER,Gr(o.magFilter,me.NO_MIP));var l=(s=o.maxAnisotropy)!==null&&s!==void 0?s:1;l>1&&this.device.EXT_texture_filter_anisotropic!==null&&(U(o.minFilter===ae.BILINEAR&&o.magFilter===ae.BILINEAR&&o.mipmapFilter===me.LINEAR),a.texParameteri(n,this.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,l))},e.prototype.destroy=function(){t.prototype.destroy.call(this),K(this.device.gl)&&this.device.gl.deleteSampler(Xc(this))},e.prototype.isNPOT=function(n,r){return!vi(n)||!vi(r)},e})(xt);let pe;const Ao=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&Ao.decode();let fr=null;function ii(){return(fr===null||fr.byteLength===0)&&(fr=new Uint8Array(pe.memory.buffer)),fr}function Ti(t,e){return t=t>>>0,Ao.decode(ii().subarray(t,t+e))}const Kt=new Array(128).fill(void 0);Kt.push(void 0,null,!0,!1);let Rr=Kt.length;function jc(t){Rr===Kt.length&&Kt.push(Kt.length+1);const e=Rr;return Rr=Kt[e],Kt[e]=t,e}function si(t){return Kt[t]}function qc(t){t<132||(Kt[t]=Rr,Rr=t)}function Yc(t){const e=si(t);return qc(t),e}let Ir=0;const ai=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},Kc=typeof ai.encodeInto=="function"?function(t,e){return ai.encodeInto(t,e)}:function(t,e){const n=ai.encode(t);return e.set(n),{read:t.length,written:n.length}};function As(t,e,n){if(n===void 0){const o=ai.encode(t),l=e(o.length,1)>>>0;return ii().subarray(l,l+o.length).set(o),Ir=o.length,l}let r=t.length,i=e(r,1)>>>0;const s=ii();let a=0;for(;a<r;a++){const o=t.charCodeAt(a);if(o>127)break;s[i+a]=o}if(a!==r){a!==0&&(t=t.slice(a)),i=n(i,r,r=a+t.length*3,1)>>>0;const o=ii().subarray(i+a,i+r),l=Kc(t,o);a+=l.written}return Ir=a,i}let pr=null;function wi(){return(pr===null||pr.byteLength===0)&&(pr=new Int32Array(pe.memory.buffer)),pr}function Qc(t,e,n){let r,i;try{const o=pe.__wbindgen_add_to_stack_pointer(-16),l=As(t,pe.__wbindgen_malloc,pe.__wbindgen_realloc),c=Ir,u=As(e,pe.__wbindgen_malloc,pe.__wbindgen_realloc),h=Ir;pe.glsl_compile(o,l,c,u,h,n);var s=wi()[o/4+0],a=wi()[o/4+1];return r=s,i=a,Ti(s,a)}finally{pe.__wbindgen_add_to_stack_pointer(16),pe.__wbindgen_free(r,i,1)}}class Nr{static __wrap(e){e=e>>>0;const n=Object.create(Nr.prototype);return n.__wbg_ptr=e,n}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,e}free(){const e=this.__destroy_into_raw();pe.__wbg_wgslcomposer_free(e)}constructor(){const e=pe.wgslcomposer_new();return Nr.__wrap(e)}wgsl_compile(e){let n,r;try{const a=pe.__wbindgen_add_to_stack_pointer(-16),o=As(e,pe.__wbindgen_malloc,pe.__wbindgen_realloc),l=Ir;pe.wgslcomposer_wgsl_compile(a,this.__wbg_ptr,o,l);var i=wi()[a/4+0],s=wi()[a/4+1];return n=i,r=s,Ti(i,s)}finally{pe.__wbindgen_add_to_stack_pointer(16),pe.__wbindgen_free(n,r,1)}}}async function Zc(t,e){if(typeof Response=="function"&&t instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,e)}catch(r){if(t.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}else{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}function Gc(){const t={};return t.wbg={},t.wbg.__wbindgen_string_new=function(e,n){const r=Ti(e,n);return jc(r)},t.wbg.__wbindgen_object_drop_ref=function(e){Yc(e)},t.wbg.__wbg_log_1d3ae0273d8f4f8a=function(e){console.log(si(e))},t.wbg.__wbg_log_576ca876af0d4a77=function(e,n){console.log(si(e),si(n))},t.wbg.__wbindgen_throw=function(e,n){throw new Error(Ti(e,n))},t}function Jc(t,e){return pe=t.exports,yo.__wbindgen_wasm_module=e,pr=null,fr=null,pe}async function yo(t){if(pe!==void 0)return pe;const e=Gc();(typeof t=="string"||typeof Request=="function"&&t instanceof Request||typeof URL=="function"&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:r}=await Zc(await t,e);return Jc(n,r)}var Ae;(function(t){t[t.COPY_SRC=1]="COPY_SRC",t[t.COPY_DST=2]="COPY_DST",t[t.TEXTURE_BINDING=4]="TEXTURE_BINDING",t[t.STORAGE_BINDING=8]="STORAGE_BINDING",t[t.STORAGE=8]="STORAGE",t[t.RENDER_ATTACHMENT=16]="RENDER_ATTACHMENT"})(Ae||(Ae={}));var ys;(function(t){t[t.READ=1]="READ",t[t.WRITE=2]="WRITE"})(ys||(ys={}));function eu(t){var e=0;return t&mt.SAMPLED&&(e|=Ae.TEXTURE_BINDING|Ae.COPY_DST|Ae.COPY_SRC),t&mt.STORAGE&&(e|=Ae.TEXTURE_BINDING|Ae.STORAGE_BINDING|Ae.COPY_SRC|Ae.COPY_DST),t&mt.RENDER_TARGET&&(e|=Ae.RENDER_ATTACHMENT|Ae.TEXTURE_BINDING|Ae.COPY_SRC|Ae.COPY_DST),e}function Ms(t){if(t===w.U8_R_NORM)return"r8unorm";if(t===w.S8_R_NORM)return"r8snorm";if(t===w.U8_RG_NORM)return"rg8unorm";if(t===w.S8_RG_NORM)return"rg8snorm";if(t===w.U32_R)return"r32uint";if(t===w.F32_R)return"r32float";if(t===w.U8_RGBA_RT)return"bgra8unorm";if(t===w.U8_RGBA_RT_SRGB)return"bgra8unorm-srgb";if(t===w.U8_RGBA_NORM)return"rgba8unorm";if(t===w.U8_RGBA_SRGB)return"rgba8unorm-srgb";if(t===w.S8_RGBA_NORM)return"rgba8snorm";if(t===w.F16_RGBA)return"rgba16float";if(t===w.F32_RGBA)return"rgba32float";if(t===w.D24)return"depth24plus";if(t===w.D24_S8)return"depth24plus-stencil8";if(t===w.D32F)return"depth32float";if(t===w.D32F_S8)return"depth32float-stencil8";if(t===w.BC1)return"bc1-rgba-unorm";if(t===w.BC1_SRGB)return"bc1-rgba-unorm-srgb";if(t===w.BC2)return"bc2-rgba-unorm";if(t===w.BC2_SRGB)return"bc2-rgba-unorm-srgb";if(t===w.BC3)return"bc3-rgba-unorm";if(t===w.BC3_SRGB)return"bc3-rgba-unorm-srgb";if(t===w.BC4_SNORM)return"bc4-r-snorm";if(t===w.BC4_UNORM)return"bc4-r-unorm";if(t===w.BC5_SNORM)return"bc5-rg-snorm";if(t===w.BC5_UNORM)return"bc5-rg-unorm";throw"whoops"}function tu(t){if(t===q.TEXTURE_2D)return"2d";if(t===q.TEXTURE_CUBE_MAP)return"2d";if(t===q.TEXTURE_2D_ARRAY)return"2d";if(t===q.TEXTURE_3D)return"3d";throw new Error("whoops")}function nu(t){if(t===q.TEXTURE_2D)return"2d";if(t===q.TEXTURE_CUBE_MAP)return"cube";if(t===q.TEXTURE_2D_ARRAY)return"2d-array";if(t===q.TEXTURE_3D)return"3d";throw new Error("whoops")}function ru(t){var e=0;return t&ie.INDEX&&(e|=GPUBufferUsage.INDEX),t&ie.VERTEX&&(e|=GPUBufferUsage.VERTEX),t&ie.UNIFORM&&(e|=GPUBufferUsage.UNIFORM),t&ie.STORAGE&&(e|=GPUBufferUsage.STORAGE),t&ie.COPY_SRC&&(e|=GPUBufferUsage.COPY_SRC),e|=GPUBufferUsage.COPY_DST,e}function is(t){if(t===Oe.CLAMP_TO_EDGE)return"clamp-to-edge";if(t===Oe.REPEAT)return"repeat";if(t===Oe.MIRRORED_REPEAT)return"mirror-repeat";throw new Error("whoops")}function ya(t){if(t===ae.BILINEAR)return"linear";if(t===ae.POINT)return"nearest";throw new Error("whoops")}function iu(t){if(t===me.LINEAR)return"linear";if(t===me.NEAREST)return"nearest";if(t===me.NO_MIP)return"nearest";throw new Error("whoops")}function $n(t){var e=t;return e.gpuBuffer}function su(t){var e=t;return e.gpuSampler}function au(t){var e=t;return e.querySet}function ou(t){if(t===Ei.OcclusionConservative)return"occlusion";throw new Error("whoops")}function lu(t){switch(t){case Re.TRIANGLES:return"triangle-list";case Re.POINTS:return"point-list";case Re.TRIANGLE_STRIP:return"triangle-strip";case Re.LINES:return"line-list";case Re.LINE_STRIP:return"line-strip";default:throw new Error("Unknown primitive topology mode")}}function cu(t){if(t===In.NONE)return"none";if(t===In.FRONT)return"front";if(t===In.BACK)return"back";throw new Error("whoops")}function uu(t){if(t===xr.CCW)return"ccw";if(t===xr.CW)return"cw";throw new Error("whoops")}function hu(t,e){return{topology:lu(t),cullMode:cu(e.cullMode),frontFace:uu(e.frontFace)}}function Ra(t){if(t===ce.ZERO)return"zero";if(t===ce.ONE)return"one";if(t===ce.SRC)return"src";if(t===ce.ONE_MINUS_SRC)return"one-minus-src";if(t===ce.DST)return"dst";if(t===ce.ONE_MINUS_DST)return"one-minus-dst";if(t===ce.SRC_ALPHA)return"src-alpha";if(t===ce.ONE_MINUS_SRC_ALPHA)return"one-minus-src-alpha";if(t===ce.DST_ALPHA)return"dst-alpha";if(t===ce.ONE_MINUS_DST_ALPHA)return"one-minus-dst-alpha";if(t===ce.CONST)return"constant";if(t===ce.ONE_MINUS_CONSTANT)return"one-minus-constant";if(t===ce.SRC_ALPHA_SATURATE)return"src-alpha-saturated";throw new Error("whoops")}function _u(t){if(t===yt.ADD)return"add";if(t===yt.SUBSTRACT)return"subtract";if(t===yt.REVERSE_SUBSTRACT)return"reverse-subtract";if(t===yt.MIN)return"min";if(t===yt.MAX)return"max";throw new Error("whoops")}function Ta(t){return{operation:_u(t.blendMode),srcFactor:Ra(t.blendSrcFactor),dstFactor:Ra(t.blendDstFactor)}}function wa(t){return t.blendMode===yt.ADD&&t.blendSrcFactor===ce.ONE&&t.blendDstFactor===ce.ZERO}function du(t){if(!(wa(t.rgbBlendState)&&wa(t.alphaBlendState)))return{color:Ta(t.rgbBlendState),alpha:Ta(t.alphaBlendState)}}function fu(t,e){return{format:Ms(e),blend:du(t),writeMask:t.channelWriteMask}}function pu(t,e){return e.attachmentsState.map(function(n,r){return fu(n,t[r])})}function oi(t){if(t===Be.NEVER)return"never";if(t===Be.LESS)return"less";if(t===Be.EQUAL)return"equal";if(t===Be.LEQUAL)return"less-equal";if(t===Be.GREATER)return"greater";if(t===Be.NOTEQUAL)return"not-equal";if(t===Be.GEQUAL)return"greater-equal";if(t===Be.ALWAYS)return"always";throw new Error("whoops")}function Hn(t){if(t===He.KEEP)return"keep";if(t===He.REPLACE)return"replace";if(t===He.ZERO)return"zero";if(t===He.DECREMENT_CLAMP)return"decrement-clamp";if(t===He.DECREMENT_WRAP)return"decrement-wrap";if(t===He.INCREMENT_CLAMP)return"increment-clamp";if(t===He.INCREMENT_WRAP)return"increment-wrap";if(t===He.INVERT)return"invert";throw new Error("whoops")}function mu(t,e){if(!hn(t))return{format:Ms(t),depthWriteEnabled:!!e.depthWrite,depthCompare:oi(e.depthCompare),depthBias:e.polygonOffset?1:0,depthBiasSlopeScale:e.polygonOffset?1:0,stencilFront:{compare:oi(e.stencilFront.compare),passOp:Hn(e.stencilFront.passOp),failOp:Hn(e.stencilFront.failOp),depthFailOp:Hn(e.stencilFront.depthFailOp)},stencilBack:{compare:oi(e.stencilBack.compare),passOp:Hn(e.stencilBack.passOp),failOp:Hn(e.stencilBack.failOp),depthFailOp:Hn(e.stencilBack.depthFailOp)},stencilReadMask:1,stencilWriteMask:1}}function gu(t){if(t!==null){if(t===w.U16_R)return"uint16";if(t===w.U32_R)return"uint32";throw new Error("whoops")}}function Eu(t){if(t===Kn.VERTEX)return"vertex";if(t===Kn.INSTANCE)return"instance";throw new Error("whoops")}function vu(t){if(t===w.U8_R)return"uint8x2";if(t===w.U8_RG)return"uint8x2";if(t===w.U8_RGB)return"uint8x4";if(t===w.U8_RGBA)return"uint8x4";if(t===w.U8_RG_NORM)return"unorm8x2";if(t===w.U8_RGBA_NORM)return"unorm8x4";if(t===w.S8_RGB_NORM)return"snorm8x4";if(t===w.S8_RGBA_NORM)return"snorm8x4";if(t===w.U16_RG_NORM)return"unorm16x2";if(t===w.U16_RGBA_NORM)return"unorm16x4";if(t===w.S16_RG_NORM)return"snorm16x2";if(t===w.S16_RGBA_NORM)return"snorm16x4";if(t===w.S16_RG)return"uint16x2";if(t===w.F16_RG)return"float16x2";if(t===w.F16_RGBA)return"float16x4";if(t===w.F32_R)return"float32";if(t===w.F32_RG)return"float32x2";if(t===w.F32_RGB)return"float32x3";if(t===w.F32_RGBA)return"float32x4";throw"whoops"}function Au(t){var e=Vt(t);switch(e){case T.BC1:case T.BC2:case T.BC3:case T.BC4_SNORM:case T.BC4_UNORM:case T.BC5_SNORM:case T.BC5_UNORM:return!0;default:return!1}}function yu(t){var e=Vt(t);switch(e){case T.BC1:case T.BC2:case T.BC3:case T.BC4_SNORM:case T.BC4_UNORM:case T.BC5_SNORM:case T.BC5_UNORM:return 4;default:return 1}}function ba(t,e,n,r){switch(n===void 0&&(n=!1),t){case w.S8_R:case w.S8_R_NORM:case w.S8_RG_NORM:case w.S8_RGB_NORM:case w.S8_RGBA_NORM:{var i=e instanceof ArrayBuffer?new Int8Array(e):new Int8Array(e);return r&&i.set(new Int8Array(r)),i}case w.U8_R:case w.U8_R_NORM:case w.U8_RG:case w.U8_RG_NORM:case w.U8_RGB:case w.U8_RGB_NORM:case w.U8_RGB_SRGB:case w.U8_RGBA:case w.U8_RGBA_NORM:case w.U8_RGBA_SRGB:{var s=e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e);return r&&s.set(new Uint8Array(r)),s}case w.S16_R:case w.S16_RG:case w.S16_RG_NORM:case w.S16_RGB_NORM:case w.S16_RGBA:case w.S16_RGBA_NORM:{var a=e instanceof ArrayBuffer?new Int16Array(e):new Int16Array(n?e/2:e);return r&&a.set(new Int16Array(r)),a}case w.U16_R:case w.U16_RGB:case w.U16_RGBA_5551:case w.U16_RGBA_NORM:case w.U16_RG_NORM:case w.U16_R_NORM:{var o=e instanceof ArrayBuffer?new Uint16Array(e):new Uint16Array(n?e/2:e);return r&&o.set(new Uint16Array(r)),o}case w.S32_R:{var l=e instanceof ArrayBuffer?new Int32Array(e):new Int32Array(n?e/4:e);return r&&l.set(new Int32Array(r)),l}case w.U32_R:case w.U32_RG:{var c=e instanceof ArrayBuffer?new Uint32Array(e):new Uint32Array(n?e/4:e);return r&&c.set(new Uint32Array(r)),c}case w.F32_R:case w.F32_RG:case w.F32_RGB:case w.F32_RGBA:{var u=e instanceof ArrayBuffer?new Float32Array(e):new Float32Array(n?e/4:e);return r&&u.set(new Float32Array(r)),u}}var h=e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e);return r&&h.set(new Uint8Array(r)),h}function Ru(t){var e=(t&32768)>>15,n=(t&31744)>>10,r=t&1023;return n===0?(e?-1:1)*Math.pow(2,-14)*(r/Math.pow(2,10)):n==31?r?NaN:(e?-1:1)*(1/0):(e?-1:1)*Math.pow(2,n-15)*(1+r/Math.pow(2,10))}var Ht=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=t.call(this)||this;return s.id=r,s.device=i,s}return e.prototype.destroy=function(){},e}(lo),Tu=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a,o,l=t.call(this,{id:r,device:i})||this;l.type=te.Bindings;var c=s.pipeline;U(!!c);var u=s.uniformBufferBindings,h=s.storageBufferBindings,_=s.samplerBindings,p=s.storageTextureBindings;l.numUniformBuffers=(u==null?void 0:u.length)||0;var f=[[],[],[],[]],g=0;if(u&&u.length)for(var m=0;m<u.length;m++){var E=s.uniformBufferBindings[m],v=E.binding,x=E.size,C=E.offset,k=E.buffer,O={buffer:$n(k),offset:C??0,size:x};f[0].push({binding:v??g++,resource:O})}if(_&&_.length){g=0;for(var m=0;m<_.length;m++){var S=fe(fe({},_[m]),rc),v=s.samplerBindings[m],B=v.texture!==null?v.texture:l.device.getFallbackTexture(S);S.dimension=B.dimension,S.formatKind=fo(B.format);var W=B.gpuTextureView;if(f[1].push({binding:(a=v.textureBinding)!==null&&a!==void 0?a:g++,resource:W}),v.samplerBinding!==-1){var J=v.sampler!==null?v.sampler:l.device.getFallbackSampler(S),se=su(J);f[1].push({binding:(o=v.samplerBinding)!==null&&o!==void 0?o:g++,resource:se})}}}if(h&&h.length){g=0;for(var m=0;m<h.length;m++){var he=s.storageBufferBindings[m],v=he.binding,x=he.size,C=he.offset,k=he.buffer,O={buffer:$n(k),offset:C??0,size:x};f[2].push({binding:v??g++,resource:O})}}if(p&&p.length){g=0;for(var m=0;m<p.length;m++){var Ce=s.storageTextureBindings[m],v=Ce.binding,B=Ce.texture,W=B.gpuTextureView;f[3].push({binding:v??g++,resource:W})}}var ct=f.findLastIndex(function(je){return!!je.length});return l.gpuBindGroup=f.map(function(je,Z){return Z<=ct&&l.device.device.createBindGroup({layout:c.getBindGroupLayout(Z),entries:je})}),l}return e}(Ht),wu=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;a.type=te.Buffer;var o=s.usage,l=s.viewOrSize,c=!!(o&ie.MAP_READ);a.usage=ru(o),c&&(a.usage=ie.MAP_READ|ie.COPY_DST);var u=!Xn(l);if(a.view=Xn(l)?null:l,a.size=Xn(l)?Ai(l,4):Ai(l.byteLength,4),Xn(l))a.gpuBuffer=a.device.device.createBuffer({usage:a.usage,size:a.size,mappedAtCreation:c?u:!1});else{a.gpuBuffer=a.device.device.createBuffer({usage:a.usage,size:a.size,mappedAtCreation:!0});var h=l&&l.constructor||Float32Array;new h(a.gpuBuffer.getMappedRange()).set(l),a.gpuBuffer.unmap()}return a}return e.prototype.setSubData=function(n,r,i,s){i===void 0&&(i=0),s===void 0&&(s=0);var a=this.gpuBuffer;s=s||r.byteLength,s=Math.min(s,this.size-n);var o=r.byteOffset+i,l=o+s,c=s+3&-4;if(c!==s){var u=new Uint8Array(r.buffer.slice(o,l));r=new Uint8Array(c),r.set(u),i=0,o=0,l=c,s=c}for(var h=1024*1024*15,_=0;l-(o+_)>h;)this.device.device.queue.writeBuffer(a,n+_,r.buffer,o+_,h),_+=h;this.device.device.queue.writeBuffer(a,n+_,r.buffer,o+_,s-_)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.gpuBuffer.destroy()},e}(Ht),bu=function(){function t(){this.commandEncoder=null,this.gpuComputePassEncoder=null}return t.prototype.dispatchWorkgroups=function(e,n,r){this.gpuComputePassEncoder.dispatchWorkgroups(e,n,r)},t.prototype.dispatchWorkgroupsIndirect=function(e,n){this.gpuComputePassEncoder.dispatchWorkgroupsIndirect(e.gpuBuffer,n)},t.prototype.finish=function(){return this.gpuComputePassEncoder.end(),this.gpuComputePassEncoder=null,this.commandEncoder.finish()},t.prototype.beginComputePass=function(){U(this.gpuComputePassEncoder===null),this.gpuComputePassEncoder=this.commandEncoder.beginComputePass(this.gpuComputePassDescriptor)},t.prototype.setPipeline=function(e){var n=e,r=be(n.gpuComputePipeline);this.gpuComputePassEncoder.setPipeline(r)},t.prototype.setBindings=function(e){var n=this,r=e;r.gpuBindGroup.forEach(function(i,s){i&&n.gpuComputePassEncoder.setBindGroup(s,r.gpuBindGroup[s])})},t.prototype.pushDebugGroup=function(e){this.gpuComputePassEncoder.pushDebugGroup(e)},t.prototype.popDebugGroup=function(){this.gpuComputePassEncoder.popDebugGroup()},t.prototype.insertDebugMarker=function(e){this.gpuComputePassEncoder.insertDebugMarker(e)},t}(),xu=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;a.type=te.ComputePipeline,a.gpuComputePipeline=null,a.descriptor=s;var o=s.program,l=o.computeStage;if(l===null)return a;var c={layout:"auto",compute:fe({},l)};return a.gpuComputePipeline=a.device.device.createComputePipeline(c),a.name!==void 0&&(a.gpuComputePipeline.label=a.name),a}return e.prototype.getBindGroupLayout=function(n){return this.gpuComputePipeline.getBindGroupLayout(n)},e}(Ht),Su=function(t){ue(e,t);function e(n){var r,i,s,a,o=n.id,l=n.device,c=n.descriptor,u=t.call(this,{id:o,device:l})||this;u.type=te.InputLayout;var h=[];try{for(var _=br(c.vertexBufferDescriptors),p=_.next();!p.done;p=_.next()){var f=p.value,g=f.arrayStride,m=f.stepMode,E=f.attributes;h.push({arrayStride:g,stepMode:Eu(m),attributes:[]});try{for(var v=(s=void 0,br(E)),x=v.next();!x.done;x=v.next()){var C=x.value,k=C.shaderLocation,O=C.format,S=C.offset;h[h.length-1].attributes.push({shaderLocation:k,format:vu(O),offset:S})}}catch(B){s={error:B}}finally{try{x&&!x.done&&(a=v.return)&&a.call(v)}finally{if(s)throw s.error}}}}catch(B){r={error:B}}finally{try{p&&!p.done&&(i=_.return)&&i.call(_)}finally{if(r)throw r.error}}return u.indexFormat=gu(c.indexBufferFormat),u.buffers=h,u}return e}(Ht),xa=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;return a.type=te.Program,a.vertexStage=null,a.fragmentStage=null,a.computeStage=null,a.descriptor=s,s.vertex&&(a.vertexStage=a.createShaderStage(s.vertex,"vertex")),s.fragment&&(a.fragmentStage=a.createShaderStage(s.fragment,"fragment")),s.compute&&(a.computeStage=a.createShaderStage(s.compute,"compute")),a}return e.prototype.setUniformsLegacy=function(n){},e.prototype.createShaderStage=function(n,r){var i,s,a=n.glsl,o=n.wgsl,l=n.entryPoint,c=!1,u=o;if(!u)try{u=this.device.glsl_compile(a,r,c)}catch(m){throw console.error(m,a),new Error("whoops")}var h=function(m){if(!u.includes(m))return"continue";u=u.replace("var T_".concat(m,": texture_2d<f32>;"),"var T_".concat(m,": texture_depth_2d;")),u=u.replace(new RegExp("textureSample\\(T_".concat(m,"(.*)\\);$"),"gm"),function(E,v){return"vec4<f32>(textureSample(T_".concat(m).concat(v,"), 0.0, 0.0, 0.0);")})};try{for(var _=br(["u_TextureFramebufferDepth"]),p=_.next();!p.done;p=_.next()){var f=p.value;h(f)}}catch(m){i={error:m}}finally{try{p&&!p.done&&(s=_.return)&&s.call(_)}finally{if(i)throw i.error}}var g=this.device.device.createShaderModule({code:u});return{module:g,entryPoint:l||"main"}},e}(Ht),Iu=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;a.type=te.QueryPool;var o=s.elemCount,l=s.type;return a.querySet=a.device.device.createQuerySet({type:ou(l),count:o}),a.resolveBuffer=a.device.device.createBuffer({size:o*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),a.cpuBuffer=a.device.device.createBuffer({size:o*8,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),a.results=null,a}return e.prototype.queryResultOcclusion=function(n){return this.results===null?null:this.results[n]!==BigInt(0)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.querySet.destroy(),this.resolveBuffer.destroy(),this.cpuBuffer.destroy()},e}(Ht),Nu=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=t.call(this,{id:r,device:i})||this;return s.type=te.Readback,s}return e.prototype.readTexture=function(n,r,i,s,a,o,l,c){return l===void 0&&(l=0),vr(this,void 0,void 0,function(){var u,h,_,p,f,g,m,E;return Ar(this,function(v){return u=n,h=0,_=this.getBlockInformationFromFormat(u.gpuTextureformat),p=Math.ceil(s/_.width)*_.length,f=Math.ceil(p/256)*256,g=f*a,m=this.device.createBuffer({usage:ie.STORAGE|ie.MAP_READ|ie.COPY_DST,hint:dn.STATIC,viewOrSize:g}),E=this.device.device.createCommandEncoder(),E.copyTextureToBuffer({texture:u.gpuTexture,mipLevel:0,origin:{x:r,y:i,z:Math.max(h,0)}},{buffer:m.gpuBuffer,offset:0,bytesPerRow:f},{width:s,height:a,depthOrArrayLayers:1}),this.device.device.queue.submit([E.finish()]),[2,this.readBuffer(m,0,o.byteLength===g?o:null,l,g,u.format,!0,!1,p,f,a)]})})},e.prototype.readTextureSync=function(n,r,i,s,a,o,l,c){throw new Error("ERROR_MSG_METHOD_NOT_IMPLEMENTED")},e.prototype.readBuffer=function(n,r,i,s,a,o,l,c,u,h,_){var p=this;r===void 0&&(r=0),i===void 0&&(i=null),a===void 0&&(a=0),o===void 0&&(o=w.U8_RGB),l===void 0&&(l=!1),u===void 0&&(u=0),h===void 0&&(h=0),_===void 0&&(_=0);var f=n,g=a||f.size,m=i||f.view,E=m&&m.constructor&&m.constructor.BYTES_PER_ELEMENT||ho(o),v=f;if(!(f.usage&ie.MAP_READ&&f.usage&ie.COPY_DST)){var x=this.device.device.createCommandEncoder();v=this.device.createBuffer({usage:ie.STORAGE|ie.MAP_READ|ie.COPY_DST,hint:dn.STATIC,viewOrSize:g}),x.copyBufferToBuffer(f.gpuBuffer,r,v.gpuBuffer,0,g),this.device.device.queue.submit([x.finish()])}return new Promise(function(C,k){v.gpuBuffer.mapAsync(ys.READ,r,g).then(function(){var O=v.gpuBuffer.getMappedRange(r,g),S=m;if(l)S===null?S=ba(o,g,!0,O):S=ba(o,S.buffer,void 0,O);else if(S===null)switch(E){case 1:S=new Uint8Array(g),S.set(new Uint8Array(O));break;case 2:S=p.getHalfFloatAsFloatRGBAArrayBuffer(g/2,O);break;case 4:S=new Float32Array(g/4),S.set(new Float32Array(O));break}else switch(E){case 1:S=new Uint8Array(S.buffer),S.set(new Uint8Array(O));break;case 2:S=p.getHalfFloatAsFloatRGBAArrayBuffer(g/2,O,m);break;case 4:var B=m&&m.constructor||Float32Array;S=new B(S.buffer),S.set(new B(O));break}if(u!==h){E===1&&!l&&(u*=2,h*=2);for(var W=new Uint8Array(S.buffer),J=u,se=0,he=1;he<_;++he){se=he*h;for(var Ce=0;Ce<u;++Ce)W[J++]=W[se++]}E!==0&&!l?S=new Float32Array(W.buffer,0,J/4):S=new Uint8Array(W.buffer,0,J)}v.gpuBuffer.unmap(),C(S)},function(O){return k(O)})})},e.prototype.getHalfFloatAsFloatRGBAArrayBuffer=function(n,r,i){i||(i=new Float32Array(n));for(var s=new Uint16Array(r);n--;)i[n]=Ru(s[n]);return i},e.prototype.getBlockInformationFromFormat=function(n){switch(n){case"r8unorm":case"r8snorm":case"r8uint":case"r8sint":return{width:1,height:1,length:1};case"r16uint":case"r16sint":case"r16float":case"rg8unorm":case"rg8snorm":case"rg8uint":case"rg8sint":return{width:1,height:1,length:2};case"r32uint":case"r32sint":case"r32float":case"rg16uint":case"rg16sint":case"rg16float":case"rgba8unorm":case"rgba8unorm-srgb":case"rgba8snorm":case"rgba8uint":case"rgba8sint":case"bgra8unorm":case"bgra8unorm-srgb":case"rgb9e5ufloat":case"rgb10a2unorm":case"rg11b10ufloat":return{width:1,height:1,length:4};case"rg32uint":case"rg32sint":case"rg32float":case"rgba16uint":case"rgba16sint":case"rgba16float":return{width:1,height:1,length:8};case"rgba32uint":case"rgba32sint":case"rgba32float":return{width:1,height:1,length:16};case"stencil8":throw new Error("No fixed size for Stencil8 format!");case"depth16unorm":return{width:1,height:1,length:2};case"depth24plus":throw new Error("No fixed size for Depth24Plus format!");case"depth24plus-stencil8":throw new Error("No fixed size for Depth24PlusStencil8 format!");case"depth32float":return{width:1,height:1,length:4};case"depth32float-stencil8":return{width:1,height:1,length:5};case"bc7-rgba-unorm":case"bc7-rgba-unorm-srgb":case"bc6h-rgb-ufloat":case"bc6h-rgb-float":case"bc2-rgba-unorm":case"bc2-rgba-unorm-srgb":case"bc3-rgba-unorm":case"bc3-rgba-unorm-srgb":case"bc5-rg-unorm":case"bc5-rg-snorm":return{width:4,height:4,length:16};case"bc4-r-unorm":case"bc4-r-snorm":case"bc1-rgba-unorm":case"bc1-rgba-unorm-srgb":return{width:4,height:4,length:8};default:return{width:1,height:1,length:4}}},e}(Ht),Ou=function(){function t(e){this.device=e,this.commandEncoder=null,this.gpuRenderPassEncoder=null,this.gfxColorAttachment=[],this.gfxColorAttachmentLevel=[],this.gfxColorResolveTo=[],this.gfxColorResolveToLevel=[],this.gfxDepthStencilAttachment=null,this.gfxDepthStencilResolveTo=null,this.gpuColorAttachments=[],this.gpuDepthStencilAttachment={view:null,depthLoadOp:"load",depthStoreOp:"store",stencilLoadOp:"load",stencilStoreOp:"store"},this.gpuRenderPassDescriptor={colorAttachments:this.gpuColorAttachments,depthStencilAttachment:this.gpuDepthStencilAttachment}}return t.prototype.getTextureView=function(e,n){return U(n<e.mipLevelCount),e.mipLevelCount===1?e.gpuTextureView:e.gpuTexture.createView({baseMipLevel:n,mipLevelCount:1})},t.prototype.setRenderPassDescriptor=function(e){var n,r,i,s,a,o;this.descriptor=e,this.gpuRenderPassDescriptor.colorAttachments=this.gpuColorAttachments;var l=e.colorAttachment.length;this.gfxColorAttachment.length=l,this.gfxColorResolveTo.length=l;for(var c=0;c<e.colorAttachment.length;c++){var u=e.colorAttachment[c],h=e.colorResolveTo[c];if(u===null&&h!==null&&(u=h,h=null),this.gfxColorAttachment[c]=u,this.gfxColorResolveTo[c]=h,this.gfxColorAttachmentLevel[c]=((n=e.colorAttachmentLevel)===null||n===void 0?void 0:n[c])||0,this.gfxColorResolveToLevel[c]=((r=e.colorResolveToLevel)===null||r===void 0?void 0:r[c])||0,u!==null){this.gpuColorAttachments[c]===void 0&&(this.gpuColorAttachments[c]={});var _=this.gpuColorAttachments[c];_.view=this.getTextureView(u,((i=this.gfxColorAttachmentLevel)===null||i===void 0?void 0:i[c])||0);var p=(a=(s=e.colorClearColor)===null||s===void 0?void 0:s[c])!==null&&a!==void 0?a:"load";p==="load"?_.loadOp="load":(_.loadOp="clear",_.clearValue=p),_.storeOp=!((o=e.colorStore)===null||o===void 0)&&o[c]?"store":"discard",_.resolveTarget=void 0,h!==null&&(u.sampleCount>1?_.resolveTarget=this.getTextureView(h,this.gfxColorResolveToLevel[c]):_.storeOp="store")}else{this.gpuColorAttachments.length=c,this.gfxColorAttachment.length=c,this.gfxColorResolveTo.length=c;break}}if(this.gfxDepthStencilAttachment=e.depthStencilAttachment,this.gfxDepthStencilResolveTo=e.depthStencilResolveTo,e.depthStencilAttachment){var f=e.depthStencilAttachment,_=this.gpuDepthStencilAttachment;_.view=f.gpuTextureView;var g=!!(Sr(f.format)&I.Depth);g?(e.depthClearValue==="load"?_.depthLoadOp="load":(_.depthLoadOp="clear",_.depthClearValue=e.depthClearValue),e.depthStencilStore||this.gfxDepthStencilResolveTo!==null?_.depthStoreOp="store":_.depthStoreOp="discard"):(_.depthLoadOp=void 0,_.depthStoreOp=void 0);var m=!!(Sr(f.format)&I.Stencil);m?(e.stencilClearValue==="load"?_.stencilLoadOp="load":(_.stencilLoadOp="clear",_.stencilClearValue=e.stencilClearValue),e.depthStencilStore||this.gfxDepthStencilResolveTo!==null?_.stencilStoreOp="store":_.stencilStoreOp="discard"):(_.stencilLoadOp=void 0,_.stencilStoreOp=void 0),this.gpuRenderPassDescriptor.depthStencilAttachment=this.gpuDepthStencilAttachment}else this.gpuRenderPassDescriptor.depthStencilAttachment=void 0;this.gpuRenderPassDescriptor.occlusionQuerySet=hn(e.occlusionQueryPool)?void 0:au(e.occlusionQueryPool)},t.prototype.beginRenderPass=function(e){U(this.gpuRenderPassEncoder===null),this.setRenderPassDescriptor(e),this.gpuRenderPassEncoder=this.commandEncoder.beginRenderPass(this.gpuRenderPassDescriptor)},t.prototype.flipY=function(e,n){var r=this.device.swapChainHeight;return r-e-n},t.prototype.setViewport=function(e,n,r,i,s,a){s===void 0&&(s=0),a===void 0&&(a=1),this.gpuRenderPassEncoder.setViewport(e,this.flipY(n,i),r,i,s,a)},t.prototype.setScissorRect=function(e,n,r,i){this.gpuRenderPassEncoder.setScissorRect(e,this.flipY(n,i),r,i)},t.prototype.setPipeline=function(e){var n=e,r=be(n.gpuRenderPipeline);this.gpuRenderPassEncoder.setPipeline(r)},t.prototype.setVertexInput=function(e,n,r){if(e!==null){var i=e;r!==null&&this.gpuRenderPassEncoder.setIndexBuffer($n(r.buffer),be(i.indexFormat),r.offset);for(var s=0;s<n.length;s++){var a=n[s];a!==null&&this.gpuRenderPassEncoder.setVertexBuffer(s,$n(a.buffer),a.offset)}}},t.prototype.setBindings=function(e){var n=this,r=e;r.gpuBindGroup.forEach(function(i,s){i&&n.gpuRenderPassEncoder.setBindGroup(s,r.gpuBindGroup[s])})},t.prototype.setStencilReference=function(e){this.gpuRenderPassEncoder.setStencilReference(e)},t.prototype.draw=function(e,n,r,i){this.gpuRenderPassEncoder.draw(e,n,r,i)},t.prototype.drawIndexed=function(e,n,r,i,s){this.gpuRenderPassEncoder.drawIndexed(e,n,r,i,s)},t.prototype.drawIndirect=function(e,n){this.gpuRenderPassEncoder.drawIndirect($n(e),n)},t.prototype.drawIndexedIndirect=function(e,n){this.gpuRenderPassEncoder.drawIndexedIndirect($n(e),n)},t.prototype.beginOcclusionQuery=function(e){this.gpuRenderPassEncoder.beginOcclusionQuery(e)},t.prototype.endOcclusionQuery=function(){this.gpuRenderPassEncoder.endOcclusionQuery()},t.prototype.pushDebugGroup=function(e){this.gpuRenderPassEncoder.pushDebugGroup(e)},t.prototype.popDebugGroup=function(){this.gpuRenderPassEncoder.popDebugGroup()},t.prototype.insertDebugMarker=function(e){this.gpuRenderPassEncoder.insertDebugMarker(e)},t.prototype.finish=function(){this.gpuRenderPassEncoder.end(),this.gpuRenderPassEncoder=null;for(var e=0;e<this.gfxColorAttachment.length;e++){var n=this.gfxColorAttachment[e],r=this.gfxColorResolveTo[e];n!==null&&r!==null&&n.sampleCount===1&&this.copyAttachment(r,this.gfxColorAttachmentLevel[e],n,this.gfxColorResolveToLevel[e])}return this.gfxDepthStencilAttachment&&this.gfxDepthStencilResolveTo&&(this.gfxDepthStencilAttachment.sampleCount>1||this.copyAttachment(this.gfxDepthStencilResolveTo,0,this.gfxDepthStencilAttachment,0)),this.commandEncoder.finish()},t.prototype.copyAttachment=function(e,n,r,i){U(r.sampleCount===1);var s={texture:r.gpuTexture,mipLevel:i},a={texture:e.gpuTexture,mipLevel:n};U(r.width>>>i===e.width>>>n),U(r.height>>>i===e.height>>>n),U(!!(r.usage&Ae.COPY_SRC)),U(!!(e.usage&Ae.COPY_DST)),this.commandEncoder.copyTextureToTexture(s,a,[e.width,e.height,1])},t}(),Cu=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=t.call(this,{id:r,device:i})||this;return a.type=te.RenderPipeline,a.isCreatingAsync=!1,a.gpuRenderPipeline=null,a.descriptor=s,a.device.createRenderPipelineInternal(a,!1),a}return e.prototype.getBindGroupLayout=function(n){return this.gpuRenderPipeline.getBindGroupLayout(n)},e}(Ht),Mu=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a,o,l=t.call(this,{id:r,device:i})||this;l.type=te.Sampler;var c=s.lodMinClamp,u=s.mipmapFilter===me.NO_MIP?s.lodMinClamp:s.lodMaxClamp,h=(a=s.maxAnisotropy)!==null&&a!==void 0?a:1;return h>1&&U(s.minFilter===ae.BILINEAR&&s.magFilter===ae.BILINEAR&&s.mipmapFilter===me.LINEAR),l.gpuSampler=l.device.device.createSampler({addressModeU:is(s.addressModeU),addressModeV:is(s.addressModeV),addressModeW:is((o=s.addressModeW)!==null&&o!==void 0?o:s.addressModeU),lodMinClamp:c,lodMaxClamp:u,minFilter:ya(s.minFilter),magFilter:ya(s.magFilter),mipmapFilter:iu(s.mipmapFilter),compare:s.compareFunction!==void 0?oi(s.compareFunction):void 0,maxAnisotropy:h}),l}return e}(Ht),Jr=function(t){ue(e,t);function e(n){var r=n.id,i=n.device,s=n.descriptor,a=n.skipCreate,o=n.sampleCount,l=t.call(this,{id:r,device:i})||this;l.type=te.Texture,l.flipY=!1;var c=s.format,u=s.dimension,h=s.width,_=s.height,p=s.depthOrArrayLayers,f=s.mipLevelCount,g=s.usage,m=s.pixelStore;return l.flipY=!!(m!=null&&m.unpackFlipY),l.device.createTextureShared({format:c,dimension:u??q.TEXTURE_2D,width:h,height:_,depthOrArrayLayers:p??1,mipLevelCount:f??1,usage:g,sampleCount:o??1},l,a),l}return e.prototype.textureFromImageBitmapOrCanvas=function(n,r,i){for(var s=r[0].width,a=r[0].height,o={size:{width:s,height:a,depthOrArrayLayers:i},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT},l=n.createTexture(o),c=0;c<r.length;c++)n.queue.copyExternalImageToTexture({source:r[c],flipY:this.flipY},{texture:l,origin:[0,0,c]},[s,a]);return[l,s,a]},e.prototype.isImageBitmapOrCanvases=function(n){var r=n[0];return r instanceof ImageBitmap||r instanceof HTMLCanvasElement||r instanceof OffscreenCanvas},e.prototype.isVideo=function(n){var r=n[0];return r instanceof HTMLVideoElement},e.prototype.setImageData=function(n,r){var i,s=this,a=this.device.device,o,l,c;this.isImageBitmapOrCanvases(n)?(i=gs(this.textureFromImageBitmapOrCanvas(a,n,this.depthOrArrayLayers),3),o=i[0],l=i[1],c=i[2]):this.isVideo(n)?o=a.importExternalTexture({source:n[0]}):n.forEach(function(u){a.queue.writeTexture({texture:s.gpuTexture},u,{},{width:s.width,height:s.height})}),this.width=l,this.height=c,o&&(this.gpuTexture=o),this.gpuTextureView=this.gpuTexture.createView({dimension:nu(this.dimension)})},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.gpuTexture.destroy()},e}(Ht),Bu=function(){function t(e,n,r,i,s,a){this.swapChainWidth=0,this.swapChainHeight=0,this.swapChainTextureUsage=Ae.RENDER_ATTACHMENT|Ae.COPY_DST,this._resourceUniqueId=0,this.renderPassPool=[],this.computePassPool=[],this.featureTextureCompressionBC=!1,this.platformString="WebGPU",this.glslVersion="#version 440",this.explicitBindingLocations=!0,this.separateSamplerTextures=!0,this.viewportOrigin=mi.UPPER_LEFT,this.clipSpaceNearZ=gi.ZERO,this.supportsSyncPipelineCompilation=!1,this.supportMRT=!0,this.device=n,this.canvas=r,this.canvasContext=i,this.glsl_compile=s,this.WGSLComposer=a,this.fallbackTexture2D=this.createFallbackTexture(q.TEXTURE_2D,ze.Float),this.setResourceName(this.fallbackTexture2D,"Fallback Texture2D"),this.fallbackTexture2DDepth=this.createFallbackTexture(q.TEXTURE_2D,ze.Depth),this.setResourceName(this.fallbackTexture2DDepth,"Fallback Depth Texture2D"),this.fallbackTexture2DArray=this.createFallbackTexture(q.TEXTURE_2D_ARRAY,ze.Float),this.setResourceName(this.fallbackTexture2DArray,"Fallback Texture2DArray"),this.fallbackTexture3D=this.createFallbackTexture(q.TEXTURE_3D,ze.Float),this.setResourceName(this.fallbackTexture3D,"Fallback Texture3D"),this.fallbackTextureCube=this.createFallbackTexture(q.TEXTURE_CUBE_MAP,ze.Float),this.setResourceName(this.fallbackTextureCube,"Fallback TextureCube"),this.fallbackSamplerFiltering=this.createSampler({addressModeU:Oe.REPEAT,addressModeV:Oe.REPEAT,minFilter:ae.POINT,magFilter:ae.POINT,mipmapFilter:me.NEAREST}),this.setResourceName(this.fallbackSamplerFiltering,"Fallback Sampler Filtering"),this.fallbackSamplerComparison=this.createSampler({addressModeU:Oe.REPEAT,addressModeV:Oe.REPEAT,minFilter:ae.POINT,magFilter:ae.POINT,mipmapFilter:me.NEAREST,compareFunction:Be.ALWAYS}),this.setResourceName(this.fallbackSamplerComparison,"Fallback Sampler Comparison Filtering"),this.device.features&&(this.featureTextureCompressionBC=this.device.features.has("texture-compression-bc")),this.device.onuncapturederror=function(o){console.error(o.error)},this.swapChainFormat=navigator.gpu.getPreferredCanvasFormat(),this.canvasContext.configure({device:this.device,format:this.swapChainFormat,usage:this.swapChainTextureUsage,alphaMode:"premultiplied"})}return t.prototype.destroy=function(){},t.prototype.configureSwapChain=function(e,n){this.swapChainWidth===e&&this.swapChainHeight===n||(this.swapChainWidth=e,this.swapChainHeight=n)},t.prototype.getOnscreenTexture=function(){var e=this.canvasContext.getCurrentTexture(),n=e.createView(),r=new Jr({id:0,device:this,descriptor:{format:w.U8_RGBA_RT,width:this.swapChainWidth,height:this.swapChainHeight,depthOrArrayLayers:0,dimension:q.TEXTURE_2D,mipLevelCount:1,usage:this.swapChainTextureUsage},skipCreate:!0});return r.depthOrArrayLayers=1,r.sampleCount=1,r.gpuTexture=e,r.gpuTextureView=n,r.name="Onscreen",this.setResourceName(r,"Onscreen Texture"),r},t.prototype.getDevice=function(){return this},t.prototype.getCanvas=function(){return this.canvas},t.prototype.beginFrame=function(){},t.prototype.endFrame=function(){},t.prototype.getNextUniqueId=function(){return++this._resourceUniqueId},t.prototype.createBuffer=function(e){return new wu({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createTexture=function(e){return new Jr({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createSampler=function(e){return new Mu({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createRenderTarget=function(e){var n=new Jr({id:this.getNextUniqueId(),device:this,descriptor:fe(fe({},e),{dimension:q.TEXTURE_2D,mipLevelCount:1,depthOrArrayLayers:1,usage:mt.RENDER_TARGET}),sampleCount:e.sampleCount});return n.depthOrArrayLayers=1,n.type=te.RenderTarget,n},t.prototype.createRenderTargetFromTexture=function(e){var n=e,r=n.format,i=n.width,s=n.height,a=n.depthOrArrayLayers,o=n.sampleCount,l=n.mipLevelCount,c=n.gpuTexture,u=n.gpuTextureView,h=n.usage;U(!!(h&Ae.RENDER_ATTACHMENT));var _=new Jr({id:this.getNextUniqueId(),device:this,descriptor:{format:r,width:i,height:s,depthOrArrayLayers:a,dimension:q.TEXTURE_2D,mipLevelCount:l,usage:h},skipCreate:!0});return _.depthOrArrayLayers=a,_.sampleCount=o,_.gpuTexture=c,_.gpuTextureView=u,_},t.prototype.createProgram=function(e){var n,r;return!((n=e.vertex)===null||n===void 0)&&n.glsl&&(e.vertex.glsl=Ri(this.queryVendorInfo(),"vert",e.vertex.glsl)),!((r=e.fragment)===null||r===void 0)&&r.glsl&&(e.fragment.glsl=Ri(this.queryVendorInfo(),"frag",e.fragment.glsl)),new xa({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createProgramSimple=function(e){return new xa({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createTextureShared=function(e,n,r){var i={width:e.width,height:e.height,depthOrArrayLayers:e.depthOrArrayLayers},s=e.mipLevelCount,a=Ms(e.format),o=tu(e.dimension),l=eu(e.usage);if(n.gpuTextureformat=a,n.dimension=e.dimension,n.format=e.format,n.width=e.width,n.height=e.height,n.depthOrArrayLayers=e.depthOrArrayLayers,n.mipLevelCount=s,n.usage=l,n.sampleCount=e.sampleCount,!r){var c=this.device.createTexture({size:i,mipLevelCount:s,format:a,dimension:o,sampleCount:e.sampleCount,usage:l}),u=c.createView();n.gpuTexture=c,n.gpuTextureView=u}},t.prototype.getFallbackSampler=function(e){var n=e.formatKind;return n===ze.Depth&&e.comparison?this.fallbackSamplerComparison:this.fallbackSamplerFiltering},t.prototype.getFallbackTexture=function(e){var n=e.dimension,r=e.formatKind;if(n===q.TEXTURE_2D)return r===ze.Depth?this.fallbackTexture2DDepth:this.fallbackTexture2D;if(n===q.TEXTURE_2D_ARRAY)return this.fallbackTexture2DArray;if(n===q.TEXTURE_3D)return this.fallbackTexture3D;if(n===q.TEXTURE_CUBE_MAP)return this.fallbackTextureCube;throw new Error("whoops")},t.prototype.createFallbackTexture=function(e,n){var r=e===q.TEXTURE_CUBE_MAP?6:1,i=n===ze.Float?w.U8_RGBA_NORM:w.D24;return this.createTexture({dimension:e,format:i,usage:mt.SAMPLED,width:1,height:1,depthOrArrayLayers:r,mipLevelCount:1})},t.prototype.createBindings=function(e){return new Tu({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createInputLayout=function(e){return new Su({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createComputePipeline=function(e){return new xu({id:this.getNextUniqueId(),device:this,descriptor:e})},t.prototype.createRenderPipeline=function(e){return new Cu({id:this.getNextUniqueId(),device:this,descriptor:fe({},e)})},t.prototype.createQueryPool=function(e,n){return new Iu({id:this.getNextUniqueId(),device:this,descriptor:{type:e,elemCount:n}})},t.prototype.createRenderPipelineInternal=function(e,n){var r;if(e.gpuRenderPipeline===null){var i=e.descriptor,s=i.program,a=s.vertexStage,o=s.fragmentStage;if(!(a===null||o===null)){var l=i.megaStateDescriptor||{},c=l.stencilBack,u=l.stencilFront,h=ql(l,["stencilBack","stencilFront"]),_=Vr(Jn);i.megaStateDescriptor=fe(fe(fe({},_),{stencilBack:fe(fe({},_.stencilBack),c),stencilFront:fe(fe({},_.stencilFront),u)}),h);var p=i.megaStateDescriptor.attachmentsState[0];i.colorAttachmentFormats.forEach(function(C,k){i.megaStateDescriptor.attachmentsState[k]||(i.megaStateDescriptor.attachmentsState[k]=Eo(void 0,p))});var f=hu((r=i.topology)!==null&&r!==void 0?r:Re.TRIANGLES,i.megaStateDescriptor),g=pu(i.colorAttachmentFormats,i.megaStateDescriptor),m=mu(i.depthStencilAttachmentFormat,i.megaStateDescriptor),E=void 0;i.inputLayout!==null&&(E=i.inputLayout.buffers);var v=i.sampleCount,x={layout:"auto",vertex:fe(fe({},a),{buffers:E}),primitive:f,depthStencil:m,multisample:{count:v},fragment:fe(fe({},o),{targets:g})};e.gpuRenderPipeline=this.device.createRenderPipeline(x)}}},t.prototype.createReadback=function(){return new Nu({id:this.getNextUniqueId(),device:this})},t.prototype.createRenderPass=function(e){var n=this.renderPassPool.pop();return n===void 0&&(n=new Ou(this)),n.commandEncoder=this.device.createCommandEncoder(),n.beginRenderPass(e),n},t.prototype.createComputePass=function(){var e=this.computePassPool.pop();return e===void 0&&(e=new bu),e.commandEncoder=this.device.createCommandEncoder(),e.beginComputePass(),e},t.prototype.submitPass=function(e){var n=this.device.queue,r=e,i=r.finish();n.submit([i]),r.commandEncoder=null},t.prototype.copySubTexture2D=function(e,n,r,i,s,a,o){var l=this.device.createCommandEncoder(),c=e,u=i,h={texture:u.gpuTexture,origin:[s,a,0],mipLevel:0,aspect:"all"},_={texture:c.gpuTexture,origin:[n,r,0],mipLevel:0,aspect:"all"};U(!!(u.usage&Ae.COPY_SRC)),U(!!(c.usage&Ae.COPY_DST)),l.copyTextureToTexture(h,_,[u.width,u.height,o||1]),this.device.queue.submit([l.finish()])},t.prototype.queryLimits=function(){return{uniformBufferMaxPageWordSize:this.device.limits.maxUniformBufferBindingSize>>>2,uniformBufferWordAlignment:this.device.limits.minUniformBufferOffsetAlignment>>>2,supportedSampleCounts:[1],occlusionQueriesRecommended:!0,computeShadersSupported:!0}},t.prototype.queryTextureFormatSupported=function(e,n,r){if(Au(e)){if(!this.featureTextureCompressionBC)return!1;var i=yu(e);return n%i!==0||r%i!==0?!1:this.featureTextureCompressionBC}switch(e){case w.U16_RGBA_NORM:return!1;case w.F32_RGBA:return!1}return!0},t.prototype.queryPlatformAvailable=function(){return!0},t.prototype.queryVendorInfo=function(){return this},t.prototype.queryRenderPass=function(e){var n=e;return n.descriptor},t.prototype.queryRenderTarget=function(e){var n=e;return n},t.prototype.setResourceName=function(e,n){if(e.name=n,e.type===te.Buffer){var r=e;r.gpuBuffer.label=n}else if(e.type===te.Texture){var r=e;r.gpuTexture.label=n,r.gpuTextureView.label=n}else if(e.type===te.RenderTarget){var r=e;r.gpuTexture.label=n,r.gpuTextureView.label=n}else if(e.type===te.Sampler){var r=e;r.gpuSampler.label=n}else if(e.type===te.RenderPipeline){var r=e;r.gpuRenderPipeline!==null&&(r.gpuRenderPipeline.label=n)}},t.prototype.setResourceLeakCheck=function(e,n){},t.prototype.checkForLeaks=function(){},t.prototype.programPatched=function(e){},t.prototype.pipelineQueryReady=function(e){var n=e;return n.gpuRenderPipeline!==null},t.prototype.pipelineForceReady=function(e){var n=e;this.createRenderPipelineInternal(n,!1)},t}(),Du=function(){function t(e){this.pluginOptions=e}return t.prototype.createSwapChain=function(e){return vr(this,void 0,void 0,function(){var n,r,i,s,a,o,l,c;return Ar(this,function(u){switch(u.label){case 0:if(globalThis.navigator.gpu===void 0)return[2,null];n=null,u.label=1;case 1:return u.trys.push([1,3,,4]),r=this.pluginOptions.xrCompatible,[4,globalThis.navigator.gpu.requestAdapter({xrCompatible:r})];case 2:return n=u.sent(),[3,4];case 3:return i=u.sent(),console.log(i),[3,4];case 4:return n===null?[2,null]:(s=["depth32float-stencil8","texture-compression-bc"],a=s.filter(function(h){return n.features.has(h)}),[4,n.requestDevice({requiredFeatures:a})]);case 5:if(o=u.sent(),o&&(l=this.pluginOptions.onContextLost,o.lost.then(function(){l&&l()})),o===null)return[2,null];if(c=e.getContext("webgpu"),!c)return[2,null];u.label=6;case 6:return u.trys.push([6,8,,9]),[4,yo(this.pluginOptions.shaderCompilerPath)];case 7:return u.sent(),[3,9];case 8:return u.sent(),[3,9];case 9:return[2,new Bu(n,o,e,c,Qc,Nr&&new Nr)]}})})},t}();class fn{}var Pu=Object.defineProperty,Uu=Object.getOwnPropertyDescriptor,Bi=(t,e,n,r)=>{for(var i=r>1?void 0:r?Uu(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&Pu(e,n,i),i};let $e=class{};Bi([A.object],$e.prototype,"canvas",2);Bi([A.object],$e.prototype,"shaderCompilerPath",2);Bi([A.object],$e.prototype,"resources",2);$e=Bi([j],$e);const Or=class li{constructor(e,n){this.x=e,this.y=n}static splat(e){return new li(e,e)}any(){return this.x||this.y}all(){return this.x&&this.y}bitand(e){return new li(this.x&&e.x,this.y&&e.y)}bitand_assign(e){return this.x&&(this.x=e.x),this.y&&(this.y=e.y),this}bitor(e){return new li(this.x||e.x,this.y||e.y)}bitor_assign(e){return this.x||(this.x=e.x),this.y||(this.y=e.y),this}};Or.FALSE=Or.splat(!1);Or.TRUE=Or.splat(!0);let Sa=Or;const lt=class vt{constructor(e,n,r,i){this.x=e,this.y=n,this.z=r,this.w=i}static splat(e){return new vt(e,e,e,e)}static from(e){return new vt(e.x,e.y,e.z,e.w)}to_array(){return[this.x,this.y,this.z,this.w]}add(e){return new vt(this.x+e.x,this.y+e.y,this.z+e.z,this.w+e.w)}add_assign(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}sub(e){return new vt(this.x-e.x,this.y-e.y,this.z-e.z,this.w-e.w)}sub_assign(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}mul(e){return typeof e=="number"?new vt(this.x*e,this.y*e,this.z*e,this.w*e):new vt(this.x*e.x,this.y*e.y,this.z*e.z,this.w*e.w)}mul_assign(e){return typeof e=="number"?(this.x*=e,this.y*=e,this.z*=e,this.w*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w),this}div(e){return typeof e=="number"?new vt(this.x/e,this.y/e,this.z/e,this.w/e):new vt(this.x/e.x,this.y/e.y,this.z/e.z,this.w/e.w)}div_assign(e){return typeof e=="number"?(this.x/=e,this.y/=e,this.z/=e,this.w/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w),this}recip(){return new vt(1/this.x,1/this.y,1/this.z,1/this.w)}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}truncate(){return new y(this.x,this.y,this.z)}_length(){return Math.sqrt(this.dot(this))}normalize(){return this.mul(1/this._length())}eq(e){return this.x===e.x&&this.y===e.y&&this.z===e.z&&this.w===e.w}xyz(){return new y(this.x,this.y,this.z)}wwww(){return new vt(this.w,this.w,this.w,this.w)}};lt.ZERO=lt.splat(0);lt.ONE=lt.splat(1);lt.X=new lt(1,0,0,0);lt.Y=new lt(0,1,0,0);lt.Z=new lt(0,0,1,0);lt.W=new lt(0,0,1,0);let P=lt;N.vector(N.float32,["x","y","z","w"],P);const Cr=class ci{constructor(e,n,r){this.x=e,this.y=n,this.z=r}static splat(e){return new ci(e,e,e)}any(){return this.x||this.y||this.z}all(){return this.x&&this.y&&this.z}bitand(e){return new ci(this.x&&e.x,this.y&&e.y,this.z&&e.z)}bitand_assign(e){return this.x&&(this.x=e.x),this.y&&(this.y=e.y),this.z&&(this.z=e.z),this}bitor(e){return new ci(this.x||e.x,this.y||e.y,this.z||e.z)}bitor_assign(e){return this.x||(this.x=e.x),this.y||(this.y=e.y),this.z||(this.z=e.z),this}};Cr.FALSE=Cr.splat(!1);Cr.TRUE=Cr.splat(!0);let ss=Cr;const Le=class le{constructor(e,n,r){this.x=e,this.y=n,this.z=r}static splat(e){return new le(e,e,e)}static from_array(e){return new le(e[0],e[1],e[2])}static copy(e){return new le(e.x,e.y,e.z)}to_array(){return[this.x,this.y,this.z]}xxx(){return new le(this.x,this.x,this.x)}yyy(){return new le(this.y,this.y,this.y)}zzz(){return new le(this.z,this.z,this.z)}xy(){return new ee(this.x,this.y)}_length(){return Math.sqrt(this.dot(this))}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}cross(e){return new le(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)}min(e){return new le(Math.min(this.x,e.x),Math.min(this.y,e.y),Math.min(this.z,e.z))}max(e){return new le(Math.max(this.x,e.x),Math.max(this.y,e.y),Math.max(this.z,e.z))}abs(){return new le(Math.abs(this.x),Math.abs(this.y),Math.abs(this.z))}neg(){return this.mul(-1)}add(e){return typeof e=="number"?new le(this.x+e,this.y+e,this.z+e):new le(this.x+e.x,this.y+e.y,this.z+e.z)}add_assign(e){return typeof e=="number"?(this.x+=e,this.y+=e,this.z+=e):(this.x+=e.x,this.y+=e.y,this.z+=e.z),this}sub(e){return typeof e=="number"?new le(this.x-e,this.y-e,this.z-e):new le(this.x-e.x,this.y-e.y,this.z-e.z)}sub_assign(e){return typeof e=="number"?(this.x-=e,this.y-=e,this.z-=e):(this.x-=e.x,this.y-=e.y,this.z-=e.z),this}mul(e){return typeof e=="number"?new le(this.x*e,this.y*e,this.z*e):new le(this.x*e.x,this.y*e.y,this.z*e.z)}mul_assign(e){return typeof e=="number"?(this.x*=e,this.y*=e,this.z*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z),this}div(e){return typeof e=="number"?new le(this.x/e,this.y/e,this.z/e):new le(this.x/e.x,this.y/e.y,this.z/e.z)}div_assign(e){return typeof e=="number"?(this.x/=e,this.y/=e,this.z/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z),this}recip(){return new le(1/this.x,1/this.y,1/this.z)}eq(e){return this.x===e.x&&this.y===e.y&&this.z===e.z}cmpge(e){return new ss(this.x>=e.x,this.y>=e.y,this.z>=e.z)}cmple(e){return new ss(this.x<=e.x,this.y<=e.y,this.z<=e.z)}cmpne(e){return new ss(this.x!==this.x,this.y!==e.y,this.z!==e.z)}ceil(){return new le(Math.ceil(this.x),Math.ceil(this.y),Math.ceil(this.z))}truncate(){return new ee(this.x,this.y)}extend(e){return new P(this.x,this.y,this.z,e)}length_squared(){return this.dot(this)}length_recip(){return 1/this._length()}normalize(){return this.mul(this.length_recip())}angle_between(e){return Math.acos(this.dot(e)/Math.sqrt(this.length_squared()*e.length_squared()))}any_orthonormal_vector(){return Math.abs(this.x)>Math.abs(this.y)?new le(-this.z,0,this.x):new le(0,this.z,-this.y)}};Le.ZERO=Le.splat(0);Le.ONE=Le.splat(1);Le.MAX=Le.splat(Number.MAX_VALUE);Le.MIN=Le.splat(Number.MIN_VALUE);Le.NEG_Z=new Le(0,0,-1);Le.X=new Le(1,0,0);Le.Y=new Le(0,1,0);Le.Z=new Le(0,0,1);let y=Le;const zt=N.vector(N.float32,["x","y","z"],y),Zt=class it{constructor(e,n){this.x=e,this.y=n}static splat(e){return new it(e,e)}to_array(){return[this.x,this.y]}add(e){return typeof e=="number"?new it(this.x+e,this.y+e):new it(this.x+e.x,this.y+e.y)}add_assign(e){return typeof e=="number"?(this.x+=e,this.y+=e):(this.x+=e.x,this.y+=e.y),this}sub(e){return typeof e=="number"?new it(this.x-e,this.y-e):new it(this.x-e.x,this.y-e.y)}sub_assign(e){return typeof e=="number"?(this.x-=e,this.y-=e):(this.x-=e.x,this.y-=e.y),this}mul(e){return typeof e=="number"?new it(this.x*e,this.y*e):new it(this.x*e.x,this.y*e.y)}mul_assign(e){return typeof e=="number"?(this.x*=e,this.y*=e):(this.x*=e.x,this.y*=e.y),this}div(e){return typeof e=="number"?new it(this.x/e,this.y/e):new it(this.x/e.x,this.y/e.y)}div_assign(e){return typeof e=="number"?(this.x/=e,this.y/=e):(this.x/=e.x,this.y/=e.y),this}eq(e){return this.x===e.x&&this.y===e.y}min(e){return new it(Math.min(this.x,e.x),Math.min(this.y,e.y))}max(e){return new it(Math.max(this.x,e.x),Math.max(this.y,e.y))}ceil(){return new it(Math.ceil(this.x),Math.ceil(this.y))}cmpge(e){return new Sa(this.x>=e.x,this.y>=e.y)}cmple(e){return new Sa(this.x<=e.x,this.y<=e.y)}extend(e){return new y(this.x,this.y,e)}};Zt.ZERO=Zt.splat(0);Zt.ONE=Zt.splat(1);Zt.X=new Zt(1,0);Zt.Y=new Zt(0,1);let ee=Zt;const kt=N.vector(N.float32,["x","y"],ee),Mr=class de{constructor(e,n,r,i){this.x=e,this.y=n,this.z=r,this.w=i}static from_xyzw(e,n,r,i){return new de(e,n,r,i)}static from_mat3(e){return de.from_rotation_axes(e.x_axis,e.y_axis,e.z_axis)}static from_vec4(e){return de.from_xyzw(e.x,e.y,e.z,e.w)}static from_array(e){return de.from_xyzw(e[0],e[1],e[2],e[3])}static from_axis_angle(e,n){const r=Math.sin(n*.5),i=Math.cos(n*.5),s=e.mul(new y(r,r,r));return de.from_xyzw(s.x,s.y,s.z,i)}static from_scaled_axis(e){let n=e._length();return n===0?de.IDENTITY:de.from_axis_angle(new y(e.x/n,e.y/n,e.z/n),n)}static from_rotation_x(e){const n=Math.sin(e*.5),r=Math.cos(e*.5);return de.from_xyzw(n,0,0,r)}static from_rotation_y(e){const n=Math.sin(e*.5),r=Math.cos(e*.5);return de.from_xyzw(0,n,0,r)}static from_rotation_z(e){const n=Math.sin(e*.5),r=Math.cos(e*.5);return de.from_xyzw(0,0,n,r)}static from_rotation_axes(e,n,r){const{x:i,y:s,z:a}=e,{x:o,y:l,z:c}=n,{x:u,y:h,z:_}=r;if(_<=0){const p=l-i,f=1-_;if(p<=0){const g=f-p,m=.5/Math.sqrt(g);return de.from_xyzw(g*m,(s+o)*m,(a+u)*m,(c-h)*m)}else{const g=f+p,m=.5/Math.sqrt(g);return de.from_xyzw((s+o)*m,g*m,(c+h)*m,(u-a)*m)}}else{const p=l+i,f=1+_;if(p<=0){const g=f-p,m=.5/Math.sqrt(g);return de.from_xyzw((a+u)*m,(c+h)*m,g*m,(s-o)*m)}else{const g=f+p,m=.5/Math.sqrt(g);return de.from_xyzw((c-h)*m,(u-a)*m,(s-o)*m,g*m)}}}static from_euler(e,n,r,i){e.new_quat(n,r,i)}static from_affine3(e){return de.from_rotation_axes(e.matrix3.x_axis,e.matrix3.y_axis,e.matrix3.z_axis)}add(e){return de.from_vec4(P.from(this).add(P.from(e)))}sub(e){return de.from_vec4(P.from(this).sub(P.from(e)))}mul(e){return typeof e=="number"?de.from_vec4(P.from(this).mul(e)):e instanceof y?this.mul_vec3(e):this.mul_quat(e)}mul_assign(e){const n=this.mul_quat(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=n.w}div(e){return de.from_vec4(P.from(this).div(e))}neg(){return this.mul(-1)}eq(e){return P.from(this).eq(P.from(e))}normalize(){return de.from_vec4(P.from(this).normalize())}_length(){return P.from(this)._length()}dot(e){return P.from(this).dot(P.from(e))}mul_vec3(e){let n=this.w,r=new y(this.x,this.y,this.z),i=r.dot(r);return e.mul(n*n-i).add(r.mul(e.dot(r)*2)).add(r.cross(e).mul(n*2))}mul_quat(e){const{x:n,y:r,z:i,w:s}=this,{x:a,y:o,z:l,w:c}=e;return de.from_xyzw(s*a+n*c+r*l-i*o,s*o-n*l+r*c+i*a,s*l+n*o-r*a+i*c,s*c-n*a-r*o-i*l)}lerp(e,n){const r=this,s=r.dot(e)>=0?1:-1;return r.add(e.mul(s).sub(r)).mul(n).normalize()}slerp(e,n){let i=this.dot(e);if(i<0&&(e=e.neg(),i=-i),i>.9995)return this.lerp(e,n);{let s=Math.acos(i),a=Math.sin(s*(1-n)),o=Math.sin(s*n),l=Math.sin(s);return this.mul(a).add(e.mul(o)).mul(1/l)}}};Mr.ZERO=Mr.from_xyzw(0,0,0,0);Mr.IDENTITY=Mr.from_xyzw(0,0,0,1);let _n=Mr;const Fu=N.vector(N.float32,["x","y","z","w"],_n),Br=class mr{static from_cols(e,n){return new mr(e.x,e.y,n.x,n.y)}constructor(e,n,r,i){this.x_axis=new ee(e,n),this.y_axis=new ee(r,i)}mul_scalar(e){return mr.from_cols(this.x_axis.mul(e),this.y_axis.mul(e))}mul_vec2(e){return new ee(this.x_axis.x*e.x+this.y_axis.x*e.y,this.x_axis.y*e.x+this.y_axis.y*e.y)}mul_mat2(e){return mr.from_cols(this.mul_vec2(e.x_axis),this.mul_vec2(e.y_axis))}mul(e){return typeof e=="number"?this.mul_scalar(e):e instanceof ee?this.mul_vec2(e):mr.from_cols(this.mul(e.x_axis),this.mul(e.y_axis))}};Br.ZERO=Br.from_cols(ee.ZERO,ee.ZERO);Br.IDENTITY=Br.from_cols(ee.X,ee.Y);let Ro=Br;N.vector(N.float32,["m00","m01","m10","m11"],Ro);const Dr=class ge{constructor(e,n,r,i,s,a,o,l,c){this.m00=e,this.m01=n,this.m02=r,this.m10=i,this.m11=s,this.m12=a,this.m20=o,this.m21=l,this.m22=c,this.x_axis=new y(e,n,r),this.y_axis=new y(i,s,a),this.z_axis=new y(o,l,c)}static copy(e){const{m00:n,m01:r,m02:i,m10:s,m11:a,m12:o,m20:l,m21:c,m22:u}=e;return new ge(n,r,i,s,a,o,l,c,u)}static from_cols(e,n,r){return new ge(e.x,e.y,e.z,n.x,n.y,n.z,r.x,r.y,r.z)}static from_cols_array(e){return new ge(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])}static to_cols_array(e){return[e.x_axis.x,e.x_axis.y,e.x_axis.z,e.y_axis.x,e.y_axis.y,e.y_axis.z,e.z_axis.x,e.z_axis.y,e.z_axis.z]}static from_diagonal(e){return new ge(e.x,0,0,0,e.y,0,0,0,e.z)}static from_quat(e){let n=e.x+e.x,r=e.y+e.y,i=e.z+e.z,s=e.x*n,a=e.x*r,o=e.x*i,l=e.y*r,c=e.y*i,u=e.z*i,h=e.w*n,_=e.w*r,p=e.w*i;return ge.from_cols(new y(1-(l+u),a+p,o-_),new y(a-p,1-(s+u),c+h),new y(o+_,c-h,1-(s+l)))}static from_axis_angle(e,n){const r=Math.sin(n),i=Math.cos(n);let{x:s,y:a,z:o}=e.mul(r),{x:l,y:c,z:u}=e,{x:h,y:_,z:p}=e.mul(e),f=1-i,g=l*c*f,m=l*u*f,E=c*u*f;return ge.from_cols(new y(h*f+i,g+o,m-a),new y(g-o,_*f+i,E+s),new y(m+a,E-s,p*f+i))}static from_rotation_x(e){const n=Math.sin(e),r=Math.cos(e);return ge.from_cols(new y(1,0,0),new y(0,r,n),new y(0,-n,r))}static from_rotation_y(e){const n=Math.sin(e),r=Math.cos(e);return ge.from_cols(new y(r,0,-n),new y(0,1,0),new y(n,0,r))}static from_rotation_z(e){const n=Math.sin(e),r=Math.cos(e);return ge.from_cols(new y(r,n,0),new y(-n,r,0),new y(0,0,1))}static from_translation(e){return ge.from_cols(y.X,y.Y,new y(e.x,e.y,1))}static from_angle(e){const n=Math.sin(e),r=Math.cos(e);return ge.from_cols(new y(r,n,0),new y(-n,r,0),y.Z)}static from_scale_angle_translation(e,n,r){const i=Math.sin(n),s=Math.cos(n);return ge.from_cols(new y(e.x*s,e.x*i,0),new y(-e.y*i,e.y*s,0),new y(r.x,r.y,1))}static from_scale(e){return ge.from_cols(new y(e.x,0,0),new y(0,e.y,0),y.Z)}static from_mat2(e){return ge.from_cols(new y(e.x_axis.x,e.x_axis.y,0),new y(e.y_axis.x,e.y_axis.y,0),y.Z)}row(e){switch(e){case 0:return new y(this.x_axis.x,this.y_axis.x,this.z_axis.x);case 1:return new y(this.x_axis.y,this.y_axis.y,this.z_axis.y);case 2:return new y(this.x_axis.z,this.y_axis.z,this.z_axis.z);default:throw new Error("index out of bounds")}}transpose(){return ge.from_cols(new y(this.x_axis.x,this.y_axis.x,this.z_axis.x),new y(this.x_axis.y,this.y_axis.y,this.z_axis.y),new y(this.x_axis.z,this.y_axis.z,this.z_axis.z))}determinant(){return this.z_axis.dot(this.x_axis.cross(this.y_axis))}inverse(){const e=this;let n=e.y_axis.cross(e.z_axis),r=e.z_axis.cross(e.x_axis),i=e.x_axis.cross(e.y_axis),s=e.z_axis.dot(i);if(s===0)throw Error("determinant is zero");let a=y.splat(1/s);return ge.from_cols(n.mul(a),r.mul(a),i.mul(a)).transpose()}transform_point2(e){return Ro.from_cols(this.x_axis.truncate(),this.y_axis.truncate()).mul(e).add(this.z_axis.truncate())}mul_scalar(e){return ge.from_cols(this.x_axis.mul(e),this.y_axis.mul(e),this.z_axis.mul(e))}mul_vec3(e){let n=this.x_axis.mul(e.xxx());return n=n.add(this.y_axis.mul(e.yyy())),n=n.add(this.z_axis.mul(e.zzz())),n}mul_mat3(e){return ge.from_cols(this.mul_vec3(e.x_axis),this.mul_vec3(e.y_axis),this.mul_vec3(e.z_axis))}add_mat3(e){return ge.from_cols(this.x_axis.add(e.x_axis),this.y_axis.add(e.y_axis),this.z_axis.add(e.z_axis))}sub_mat3(e){return ge.from_cols(this.x_axis.sub(e.x_axis),this.y_axis.sub(e.y_axis),this.z_axis.sub(e.z_axis))}};Dr.ZERO=Dr.from_cols(y.ZERO,y.ZERO,y.ZERO);Dr.IDENTITY=Dr.from_cols(y.X,y.Y,y.Z);let we=Dr;const Lu=N.vector(N.float32,["m00","m01","m02","m10","m11","m12","m20","m21","m22"],we),Pr=class At{constructor(e,n,r,i,s,a,o,l,c,u,h,_,p,f,g,m){this.m00=e,this.m01=n,this.m02=r,this.m03=i,this.m10=s,this.m11=a,this.m12=o,this.m13=l,this.m20=c,this.m21=u,this.m22=h,this.m23=_,this.m30=p,this.m31=f,this.m32=g,this.m33=m,this.x_axis=new P(e,n,r,i),this.y_axis=new P(s,a,o,l),this.z_axis=new P(c,u,h,_),this.w_axis=new P(p,f,g,m)}static copy(e){const{m00:n,m01:r,m02:i,m03:s,m10:a,m11:o,m12:l,m13:c,m20:u,m21:h,m22:_,m23:p,m30:f,m31:g,m32:m,m33:E}=e;return new At(n,r,i,s,a,o,l,c,u,h,_,p,f,g,m,E)}static from(e){const{m00:n,m01:r,m02:i,m10:s,m11:a,m12:o,m20:l,m21:c,m22:u}=e.matrix3;return At.from_cols(new y(n,r,i).extend(0),new y(s,a,o).extend(0),new y(l,c,u).extend(0),e.translation.extend(1))}static from_cols(e,n,r,i){return new At(e.x,e.y,e.z,e.w,n.x,n.y,n.z,n.w,r.x,r.y,r.z,r.w,i.x,i.y,i.z,i.w)}static from_affine3(e){return At.from_cols(e.matrix3.x_axis.extend(0),e.matrix3.y_axis.extend(0),e.matrix3.z_axis.extend(0),e.translation.extend(1))}static perspective_infinite_rh(e,n,r){const i=1/Math.tan(.5*e);return At.from_cols(new P(i/n,0,0,0),new P(0,i,0,0),new P(0,0,-1,-1),new P(0,0,-r,0))}static perspective_infinite_reverse_rh(e,n,r){const i=1/Math.tan(.5*e);return At.from_cols(new P(i/n,0,0,0),new P(0,i,0,0),new P(0,0,0,-1),new P(0,0,r,0))}static orthographic_rh(e,n,r,i,s,a){const o=1/(n-e),l=1/(i-r),c=1/(s-a);return At.from_cols(new P(o+o,0,0,0),new P(0,l+l,0,0),new P(0,0,c,0),new P(-(e+n)*o,-(i+r)*l,c*s,1))}to_cols_array_2d(){return[...this.x_axis.to_array(),...this.y_axis.to_array(),...this.z_axis.to_array(),...this.w_axis.to_array()]}row(e){return e===0?new P(this.x_axis.x,this.y_axis.x,this.z_axis.x,this.w_axis.x):e===1?new P(this.x_axis.y,this.y_axis.y,this.z_axis.y,this.w_axis.y):e===2?new P(this.x_axis.z,this.y_axis.z,this.z_axis.z,this.w_axis.z):new P(this.x_axis.w,this.y_axis.w,this.z_axis.w,this.w_axis.w)}mul_scalar(e){return At.from_cols(this.x_axis.mul(e),this.y_axis.mul(e),this.z_axis.mul(e),this.w_axis.mul(e))}mul_vec4(e){const n=this.x_axis.mul(e.x);return n.add_assign(this.y_axis.mul(e.y)),n.add_assign(this.z_axis.mul(e.z)),n.add_assign(this.w_axis.mul(e.w)),n}mul_mat4(e){return At.from_cols(this.mul(e.x_axis),this.mul(e.y_axis),this.mul(e.z_axis),this.mul(e.w_axis))}mul(e){return typeof e=="number"?this.mul_scalar(e):e instanceof P?this.mul_vec4(e):this.mul_mat4(e)}mul_assign(e){return typeof e=="number"?(this.x_axis.mul_assign(e),this.y_axis.mul_assign(e),this.z_axis.mul_assign(e),this.w_axis.mul_assign(e)):e instanceof P?(this.x_axis.mul_assign(e.x),this.y_axis.mul_assign(e.y),this.z_axis.mul_assign(e.z),this.w_axis.mul_assign(e.w)):(this.x_axis=this.mul(e.x_axis),this.y_axis=this.mul(e.y_axis),this.z_axis=this.mul(e.z_axis),this.w_axis=this.mul(e.w_axis)),this}inverse(){let{x:e,y:n,z:r,w:i}=this.x_axis,{x:s,y:a,z:o,w:l}=this.y_axis,{x:c,y:u,z:h,w:_}=this.z_axis,{x:p,y:f,z:g,w:m}=this.w_axis,E=h*m-g*_,v=o*m-g*l,x=o*_-h*l,C=u*m-f*_,k=a*m-f*l,O=a*_-u*l,S=u*g-f*h,B=a*g-f*o,W=a*h-u*o,J=c*m-p*_,se=s*m-p*l,he=s*_-c*l,Ce=c*g-p*h,ct=s*g-p*o,je=s*h-c*o,Z=c*f-p*u,an=s*f-p*a,ir=s*u-c*a,Sn=new P(E,E,v,x),$t=new P(C,C,k,O),Xr=new P(S,S,B,W),Wr=new P(J,J,se,he),$r=new P(Ce,Ce,ct,je),sr=new P(Z,Z,an,ir),Pn=new P(s,e,e,e),ut=new P(a,n,n,n),Ye=new P(o,r,r,r),Un=new P(l,i,i,i),ar=ut.mul(Sn).sub(Ye.mul($t)).add(Un.mul(Xr)),Fn=Pn.mul(Sn).sub(Ye.mul(Wr)).add(Un.mul($r)),jr=Pn.mul($t).sub(ut.mul(Wr)).add(Un.mul(sr)),Gi=Pn.mul(Xr).sub(ut.mul($r)).add(Ye.mul(sr)),qr=new P(1,-1,1,-1),ht=new P(-1,1,-1,1),Nt=At.from_cols(ar.mul(qr),Fn.mul(ht),jr.mul(qr),Gi.mul(ht)),Yr=new P(Nt.x_axis.x,Nt.y_axis.x,Nt.z_axis.x,Nt.w_axis.x),Ln=this.x_axis.mul(Yr),$o=1/(Ln.x+Ln.y+Ln.z+Ln.w);return Nt.mul($o)}determinant(){let{x:e,y:n,z:r,w:i}=this.x_axis,{x:s,y:a,z:o,w:l}=this.y_axis,{x:c,y:u,z:h,w:_}=this.z_axis,{x:p,y:f,z:g,w:m}=this.w_axis,E=h*m-_*g,v=u*m-_*f,x=u*g-h*f,C=c*m-_*p,k=c*g-h*p,O=c*f-u*p;return e*(a*E-o*v+l*x)-n*(s*E-o*C+l*k)+r*(s*v-a*C+l*O)-i*(s*x-a*k+o*O)}to_scale_rotation_translation(){let e=this.determinant(),n=new y(this.x_axis._length()*Math.sign(e),this.y_axis._length(),this.z_axis._length()),r=y.ONE.div(n),i=_n.from_rotation_axes(this.x_axis.mul(r.x).xyz(),this.y_axis.mul(r.y).xyz(),this.z_axis.mul(r.z).xyz()),s=this.w_axis.xyz();return{scale:n,translation:s,rotation:i}}project_point3(e){const n=this;let r=n.x_axis.mul(e.x);return r=n.y_axis.mul(e.y).add(r),r=n.z_axis.mul(e.z).add(r),r=n.w_axis.add(r),r=r.mul(r.wwww().recip()),r.xyz()}};Pr.ZERO=Pr.from_cols(P.ZERO,P.ZERO,P.ZERO,P.ZERO);Pr.IDENTITY=Pr.from_cols(P.X,P.Y,P.Z,P.W);let Dt=Pr;const Di=N.vector(N.float32,["m00","m01","m02","m03","m10","m11","m12","m13","m20","m21","m22","m23","m30","m31","m32","m33"],Dt);var Vu=Object.defineProperty,Hu=Object.getOwnPropertyDescriptor,To=(t,e,n,r)=>{for(var i=r>1?void 0:r?Hu(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&Vu(e,n,i),i};const Cn=class _t{static from(e){return new _t(e.matrix3,e.translation)}static from_translation(e){return new _t(we.IDENTITY,e)}static from_scale(e){return new _t(we.from_diagonal(e),y.ZERO)}static from_quat(e){return new _t(we.from_quat(e),y.ZERO)}static from_axis_angle(e,n){return new _t(we.from_axis_angle(e,n),y.ZERO)}static from_rotation_x(e){return new _t(we.from_rotation_x(e),y.ZERO)}static from_rotation_y(e){return new _t(we.from_rotation_y(e),y.ZERO)}static from_rotation_z(e){return new _t(we.from_rotation_z(e),y.ZERO)}static from_scale_rotation_translation(e,n,r){const i=we.from_quat(n),s=we.from_cols(i.x_axis.mul(e.x),i.y_axis.mul(e.y),i.z_axis.mul(e.z));return new _t(s,r)}constructor(e=we.IDENTITY,n=y.ZERO){this.matrix3=e,this.translation=n}transform_point3(e){return this.matrix3.mul_vec3(e).add(this.translation)}inverse(){const e=this.matrix3.inverse(),n=e.mul_vec3(this.translation).neg();return new _t(e,n)}inverse_transpose_3x3(){const e=_t.from(this).inverse().matrix3.transpose(),{x_axis:n,y_axis:r,z_axis:i}=e;return[[...n.to_array(),r.x,r.y,r.z,i.x,i.y],e.z_axis.z]}to_transpose(){const e=this.matrix3.transpose();return[e.x_axis.extend(this.translation.x),e.y_axis.extend(this.translation.y),e.z_axis.extend(this.translation.z)]}to_cols_array_2d(){return[...this.matrix3.x_axis.to_array(),...this.matrix3.y_axis.to_array(),...this.matrix3.z_axis.to_array(),...this.translation.to_array()]}to_scale_rotation_translation(){const e=this.matrix3.determinant();if(e===0)return null;const n=new y(this.matrix3.x_axis._length()*Math.sign(e),this.matrix3.y_axis._length(),this.matrix3.z_axis._length());if(!n.cmpne(y.ZERO).all())return null;const r=n.recip(),i=_n.from_mat3(we.from_cols(this.matrix3.x_axis.mul(r.x),this.matrix3.y_axis.mul(r.y),this.matrix3.z_axis.mul(r.z)));return{scale:n,rotation:i,translation:this.translation}}};Cn.ZERO=new Cn(we.ZERO,y.ZERO);Cn.IDENTITY=new Cn(we.IDENTITY,y.ZERO);To([A(Lu)],Cn.prototype,"matrix3",2);To([A(zt)],Cn.prototype,"translation",2);let wo=Cn;class Mt{static from_corners(e,n){const r=e.min(n),i=e.max(n);return new Mt(r.x,r.y,i.x,i.y)}static from_center_size(e,n){const r=n.mul(.5);return Mt.from_center_half_size(e,r)}static from_center_half_size(e,n){return Mt.from_corners(e.sub(n),e.add(n))}constructor(e,n,r,i){this.min=new ee(e,n),this.max=new ee(r,i)}is_empty(){return this.min.cmpge(this.max).any()}width(){return this.max.x-this.min.x}height(){return this.max.y-this.min.y}size(){return this.max.sub(this.min)}half_size(){return this.size().mul(.5)}center(){return this.min.add(this.max).mul(.5)}contains(e){return e.cmpge(this.min).bitand_assign(e.cmple(this.max)).all()}union(e){return Mt.from_corners(this.min.min(e.min),this.max.max(e.max))}union_point(e){return Mt.from_corners(this.min.min(e),this.max.max(e))}intersection(e){const n=Mt.from_corners(this.min.max(e.min),this.max.min(e.max));return n.min=n.min.min(n.max),n}inset(e){const n=Mt.from_corners(this.min.sub(e),this.max.add(e));return n.min=n.min.min(n.max),n}normalize(e){const n=e.size();return Mt.from_corners(this.min.sub(e.min).div_assign(n),this.max.sub(e.min).div_assign(n))}}var zu=Object.defineProperty,ku=Object.getOwnPropertyDescriptor,Bs=(t,e,n,r)=>{for(var i=r>1?void 0:r?ku(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&zu(e,n,i),i};const Qn=class gr{constructor(e=y.ZERO,n=y.ONE,r=_n.IDENTITY){this.translation=e,this.scale=n,this.rotation=r}static from_translation(e){return new gr(e,y.ONE,_n.IDENTITY)}static from_xyz(e,n,r){return gr.from_translation(new y(e,n,r))}static from_matrix(e){const{scale:n,rotation:r,translation:i}=e.to_scale_rotation_translation();return new gr(i,n,r)}static from_rotation(e){return new gr(y.ZERO,y.ONE,e)}look_at(e,n){return this.look_to(e.sub(this.translation),n),this}look_to(e,n){let r;try{r=e.normalize().neg()}catch{r=y.NEG_Z}let i;try{i=n.normalize()}catch{i=y.Y}let s;try{s=i.cross(r).normalize()}catch{s=i.any_orthonormal_vector()}i=r.cross(s),this.rotation=_n.from_mat3(we.from_cols(s,i,r))}compute_affine(){return wo.from_scale_rotation_translation(this.scale,this.rotation,this.translation)}local_z(){return this.rotation.mul(y.Z)}back(){return this.local_z()}};Qn.IDENTITY=new Qn(y.ZERO,y.ONE,_n.IDENTITY);Bs([A(zt)],Qn.prototype,"translation",2);Bs([A(zt)],Qn.prototype,"scale",2);Bs([A(Fu)],Qn.prototype,"rotation",2);let z=Qn;class Te extends wo{static copy(e){return new Te(we.copy(e.affine()),y.copy(e.translation))}static from_translation(e){return new Te(we.IDENTITY,e)}compute_matrix(){return Dt.from(this)}compute_transform(){const{scale:e,rotation:n,translation:r}=this.to_scale_rotation_translation();return new z(r,e,n)}affine(){return this.matrix3}from(e){const{matrix3:n,translation:r}=e.compute_affine();this.matrix3=n,this.translation=r}}var Xu=Object.defineProperty,Wu=Object.getOwnPropertyDescriptor,bo=(t,e,n,r)=>{for(var i=r>1?void 0:r?Wu(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&Xu(e,n,i),i};class Ds{}bo([A.object],Ds.prototype,"local",2);bo([A.object],Ds.prototype,"global",2);var $u=Object.defineProperty,ju=Object.getOwnPropertyDescriptor,qu=(t,e,n,r)=>{for(var i=r>1?void 0:r?ju(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&$u(e,n,i),i};class Zn{}qu([A.ref],Zn.prototype,"parent",2);var Yu=Object.defineProperty,Ku=Object.getOwnPropertyDescriptor,Qu=(t,e,n,r)=>{for(var i=r>1?void 0:r?Ku(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&Yu(e,n,i),i};class Tr{}Qu([A.backrefs(Zn,"parent")],Tr.prototype,"children",2);var Zu=Object.defineProperty,Gu=Object.getOwnPropertyDescriptor,Pi=(t,e,n,r)=>{for(var i=r>1?void 0:r?Gu(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&Zu(e,n,i),i};class ne{to_logical(e,n){const r=e.target_info_scale_factor;return new ee(n.x/r,n.y/r)}physical_viewport_rect(e){const n=this.viewport?this.viewport.physical_position:ee.ZERO,r=new ee(n.x,n.y);return r.add_assign(this.physical_viewport_size(e)),{min:n,max:r}}logical_viewport_rect(e){const{min:n,max:r}=this.physical_viewport_rect(e);return{min:this.to_logical(e,n),max:this.to_logical(e,r)}}logical_viewport_size(e){return this.viewport?this.to_logical(e,this.viewport.physical_size):this.logical_target_size(e)}physical_viewport_size(e){return this.viewport?this.viewport.physical_size:this.physical_target_size(e)}logical_target_size(e){return this.to_logical(e,e.target_info_physical_size)}physical_target_size(e){return e.target_info_physical_size}projection_matrix(e){return e.projection_matrix}world_to_viewport(e,n,r){let i=this.logical_viewport_size(e),s=this.world_to_ndc(e,n,r);if(s.z<0||s.z>1)return null;let a=s.truncate().add(ee.ONE).div(2).mul(i);return a.y=i.y-a.y,a}world_to_ndc(e,n,r){return e.projection_matrix.mul(n.compute_matrix().inverse()).project_point3(r)}ndc_to_world(e,n,r){return n.compute_matrix().mul(e.projection_matrix.inverse()).project_point3(r)}}Pi([A.object],ne.prototype,"viewport",2);Pi([A.int32],ne.prototype,"order",2);Pi([A.boolean],ne.prototype,"is_active",2);Pi([A.boolean],ne.prototype,"hdr",2);var Ju=Object.defineProperty,eh=Object.getOwnPropertyDescriptor,Ui=(t,e,n,r)=>{for(var i=r>1?void 0:r?eh(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&Ju(e,n,i),i};class Ie{}Ui([A(Di)],Ie.prototype,"projection_matrix",2);Ui([A(kt)],Ie.prototype,"target_info_physical_size",2);Ui([A.float32],Ie.prototype,"target_info_scale_factor",2);Ui([A(kt)],Ie.prototype,"old_viewport_size",2);var th=Object.defineProperty,nh=Object.getOwnPropertyDescriptor,Xt=(t,e,n,r)=>{for(var i=r>1?void 0:r?nh(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&th(e,n,i),i};const Ia=Mi.defineEnum("Projection");class re{constructor(e=Math.PI/4,n=1,r=.1,i=1e3){this.fov=e,this.aspect_ratio=n,this.near=r,this.far=i}get_projection_matrix(){return Dt.perspective_infinite_reverse_rh(this.fov,this.aspect_ratio,this.near)}update(e,n){this.aspect_ratio=e/n}get_frustum_corners(e,n){let r=Math.tan(this.fov/2),i=Math.abs(e)*r,s=Math.abs(n)*r,a=this.aspect_ratio;return[new y(i*a,-i,e),new y(i*a,i,e),new y(-i*a,i,e),new y(-i*a,-i,e),new y(s*a,-s,n),new y(s*a,s,n),new y(-s*a,s,n),new y(-s*a,-s,n)]}}Xt([A.float32],re.prototype,"fov",2);Xt([A.float32],re.prototype,"aspect_ratio",2);Xt([A.float32],re.prototype,"near",2);Xt([A.float32],re.prototype,"far",2);class ot{get_projection_matrix(){return Dt.orthographic_rh(this.area.min.x,this.area.max.x,this.area.min.y,this.area.max.y,this.far,this.near)}update(e,n){const r=e,i=n;let s=r*this.viewport_origin.x,a=i*this.viewport_origin.y;this.area=new Mt(this.scale*-s,this.scale*-a,this.scale*(r-s),this.scale*(i-a))}}Xt([A.float32],ot.prototype,"near",2);Xt([A.float32],ot.prototype,"far",2);Xt([A(kt)],ot.prototype,"viewport_origin",2);Xt([A.object],ot.prototype,"scaling_mode",2);Xt([A.float32],ot.prototype,"scale",2);Xt([A.object],ot.prototype,"area",2);var rh=Object.defineProperty,ih=Object.getOwnPropertyDescriptor,Ps=(t,e,n,r)=>{for(var i=r>1?void 0:r?ih(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&rh(e,n,i),i};class Fi{constructor(e){const{physical_position:n=ee.ZERO,physical_size:r=ee.ZERO,depth:i=new ee(0,1)}=e||{};this.physical_position=n,this.physical_size=r,this.depth=i}}Ps([A(kt)],Fi.prototype,"physical_position",2);Ps([A(kt)],Fi.prototype,"physical_size",2);Ps([A(kt)],Fi.prototype,"depth",2);class Ct{constructor(e=P.ZERO){this.normal_d=e}normal(){return this.normal_d.xyz()}d(){return this.normal_d.w}}var sh=Object.defineProperty,ah=Object.getOwnPropertyDescriptor,oh=(t,e,n,r)=>{for(var i=r>1?void 0:r?ah(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&sh(e,n,i),i};const xo=class So{constructor(e){this.half_spaces=e||[new Ct,new Ct,new Ct,new Ct,new Ct,new Ct]}static from_view_projection(e){const n=this.from_view_projection_no_far(e);return n.half_spaces[5]=new Ct(e.row(2)),n}static from_view_projection_custom_far(e,n,r,i){const s=this.from_view_projection_no_far(e),a=n.sub(r.mul(i));return s.half_spaces[5]=new Ct(r.extend(-r.dot(a))),s}static from_view_projection_no_far(e){const n=e.row(3),r=new Array(6).fill(new Ct);for(let i=0;i<5;i++){let s=e.row(i/2);r[i]=new Ct(!(i&1)&&i!=4?n.add(s):n.sub(s))}return new So(r)}intersects_sphere(e,n){let r=e.center.extend(1),i=n?6:5;for(const s of this.half_spaces.slice(0,i))if(s.normal_d.dot(r)+e.radius<=0)return!1;return!0}intersects_obb(e,n,r,i){const s=n.transform_point3(e.center).extend(1);for(let a=0;a<this.half_spaces.length;a++){const o=this.half_spaces[a];if(a==4&&!r||a==5&&!i)continue;const l=o.normal(),c=e.relative_radius(l,n.matrix3);if(o.normal_d.dot(s)+c<=0)return!1}return!0}};oh([A.object],xo.prototype,"half_spaces",2);let Ze=xo;class lh{}var ch=Object.defineProperty,uh=Object.getOwnPropertyDescriptor,Us=(t,e,n,r)=>{for(var i=r>1?void 0:r?uh(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&ch(e,n,i),i},Xe=(t=>(t[t.Low=0]="Low",t[t.Medium=1]="Medium",t[t.High=2]="High",t[t.Ultra=3]="Ultra",t[t.Extreme=4]="Extreme",t))(Xe||{});class Se{constructor(e){const{enabled:n=!0,edge_threshold:r=2,edge_threshold_min:i=2}=e||{};this.enabled=n,this.edge_threshold=r,this.edge_threshold_min=i}}Us([A.boolean],Se.prototype,"enabled",2);Us([A.uint8],Se.prototype,"edge_threshold",2);Us([A.uint8],Se.prototype,"edge_threshold_min",2);var hh=Object.defineProperty,_h=Object.getOwnPropertyDescriptor,dh=(t,e,n,r)=>{for(var i=r>1?void 0:r?_h(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&hh(e,n,i),i};class Je{constructor(e=1){this.method=e}}dh([A.uint8],Je.prototype,"method",2);var De=(t=>(t[t.None=0]="None",t[t.Reinhard=1]="Reinhard",t[t.ReinhardLuminance=2]="ReinhardLuminance",t[t.AcesFitted=3]="AcesFitted",t[t.AgX=4]="AgX",t[t.SomewhatBoringDisplayTransform=5]="SomewhatBoringDisplayTransform",t[t.TonyMcMapface=6]="TonyMcMapface",t[t.BlenderFilmic=7]="BlenderFilmic",t))(De||{});class fh{}var ph=Object.defineProperty,mh=Object.getOwnPropertyDescriptor,Mn=(t,e,n,r)=>{for(var i=r>1?void 0:r?mh(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&ph(e,n,i),i};const et=class{constructor(e){const{intensity:n=.15,low_frequency_boost:r=0,low_frequency_boost_curvature:i=0,high_pass_frequency:s=1,prefilter_settings_threshold:a=0,prefilter_settings_threshold_softness:o=0,composite_mode:l=0}=e||{};this.intensity=n,this.low_frequency_boost=r,this.low_frequency_boost_curvature=i,this.high_pass_frequency=s,this.prefilter_settings_threshold=a,this.prefilter_settings_threshold_softness=o,this.composite_mode=l}};et.NATURAL=new et({intensity:.15,low_frequency_boost:.7,low_frequency_boost_curvature:.95,high_pass_frequency:1,prefilter_settings_threshold:0,prefilter_settings_threshold_softness:0,composite_mode:0});et.OLD_SCHOOL=new et({intensity:.05,low_frequency_boost:.7,low_frequency_boost_curvature:.95,high_pass_frequency:1,prefilter_settings_threshold:.6,prefilter_settings_threshold_softness:.2,composite_mode:1});et.SCREEN_BLUR=new et({intensity:1,low_frequency_boost:0,low_frequency_boost_curvature:0,high_pass_frequency:1/3,prefilter_settings_threshold:0,prefilter_settings_threshold_softness:0,composite_mode:0});Mn([A.float32],et.prototype,"intensity",2);Mn([A.float32],et.prototype,"low_frequency_boost",2);Mn([A.float32],et.prototype,"low_frequency_boost_curvature",2);Mn([A.float32],et.prototype,"high_pass_frequency",2);Mn([A.float32],et.prototype,"prefilter_settings_threshold",2);Mn([A.float32],et.prototype,"prefilter_settings_threshold_softness",2);Mn([A.int8],et.prototype,"composite_mode",2);let Fs=et;var gh=Object.defineProperty,Eh=Object.getOwnPropertyDescriptor,vh=(t,e,n,r)=>{for(var i=r>1?void 0:r?Eh(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&gh(e,n,i),i};class cn{constructor(e){const{image_handle:n}=e||{};this.image_handle=n}}vh([A.object],cn.prototype,"image_handle",2);var Ah=typeof global=="object"&&global&&global.Object===Object&&global;const yh=Ah;var Rh=typeof self=="object"&&self&&self.Object===Object&&self,Th=yh||Rh||Function("return this")();const wh=Th;var bh=wh.Symbol;const Gn=bh;var Io=Object.prototype,xh=Io.hasOwnProperty,Sh=Io.toString,ur=Gn?Gn.toStringTag:void 0;function Ih(t){var e=xh.call(t,ur),n=t[ur];try{t[ur]=void 0;var r=!0}catch{}var i=Sh.call(t);return r&&(e?t[ur]=n:delete t[ur]),i}var Nh=Object.prototype,Oh=Nh.toString;function Ch(t){return Oh.call(t)}var Mh="[object Null]",Bh="[object Undefined]",Na=Gn?Gn.toStringTag:void 0;function Li(t){return t==null?t===void 0?Bh:Mh:Na&&Na in Object(t)?Ih(t):Ch(t)}function Vi(t){return t!=null&&typeof t=="object"}var Dh="[object Symbol]";function Ph(t){return typeof t=="symbol"||Vi(t)&&Li(t)==Dh}var Uh=Array.isArray;const Fh=Uh;var Lh=/\s/;function Vh(t){for(var e=t.length;e--&&Lh.test(t.charAt(e)););return e}var Hh=/^\s+/;function zh(t){return t&&t.slice(0,Vh(t)+1).replace(Hh,"")}function bi(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var Oa=0/0,kh=/^[-+]0x[0-9a-f]+$/i,Xh=/^0b[01]+$/i,Wh=/^0o[0-7]+$/i,$h=parseInt;function ui(t){if(typeof t=="number")return t;if(Ph(t))return Oa;if(bi(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=bi(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=zh(t);var n=Xh.test(t);return n||Wh.test(t)?$h(t.slice(2),n?2:8):kh.test(t)?Oa:+t}var Ca=1/0,jh=17976931348623157e292;function qh(t){if(!t)return t===0?t:0;if(t=ui(t),t===Ca||t===-Ca){var e=t<0?-1:1;return e*jh}return t===t?t:0}function Yh(t){var e=qh(t),n=e%1;return e===e?n?e-n:e:0}var Kh="[object AsyncFunction]",Qh="[object Function]",Zh="[object GeneratorFunction]",Gh="[object Proxy]";function Jh(t){if(!bi(t))return!1;var e=Li(t);return e==Qh||e==Zh||e==Kh||e==Gh}var e_=9007199254740991,t_=/^(?:0|[1-9]\d*)$/;function n_(t,e){var n=typeof t;return e=e??e_,!!e&&(n=="number"||n!="symbol"&&t_.test(t))&&t>-1&&t%1==0&&t<e}function r_(t,e){return t===e||t!==t&&e!==e}var i_=9007199254740991;function s_(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=i_}function a_(t){return t!=null&&s_(t.length)&&!Jh(t)}function o_(t,e,n){if(!bi(n))return!1;var r=typeof e;return(r=="number"?a_(n)&&n_(e,n.length):r=="string"&&e in n)?r_(n[e],t):!1}var l_="[object Arguments]";function Ma(t){return Vi(t)&&Li(t)==l_}var No=Object.prototype,c_=No.hasOwnProperty,u_=No.propertyIsEnumerable,h_=Ma(function(){return arguments}())?Ma:function(t){return Vi(t)&&c_.call(t,"callee")&&!u_.call(t,"callee")};const __=h_;function d_(t,e){for(var n=-1,r=e.length,i=t.length;++n<r;)t[i+n]=e[n];return t}var Ba=Gn?Gn.isConcatSpreadable:void 0;function f_(t){return Fh(t)||__(t)||!!(Ba&&t&&t[Ba])}function Oo(t,e,n,r,i){var s=-1,a=t.length;for(n||(n=f_),i||(i=[]);++s<a;){var o=t[s];e>0&&n(o)?e>1?Oo(o,e-1,n,r,i):d_(i,o):r||(i[i.length]=o)}return i}function Co(t){var e=t==null?0:t.length;return e?Oo(t,1):[]}function p_(t,e,n){var r=-1,i=t.length;e<0&&(e=-e>i?0:i+e),n=n>i?i:n,n<0&&(n+=i),i=e>n?0:n-e>>>0,e>>>=0;for(var s=Array(i);++r<i;)s[r]=t[r+e];return s}var m_=Math.ceil,g_=Math.max;function E_(t,e,n){(n?o_(t,e,n):e===void 0)?e=1:e=g_(Yh(e),0);var r=t==null?0:t.length;if(!r||e<1)return[];for(var i=0,s=0,a=Array(m_(r/e));i<r;)a[s++]=p_(t,i,i+=e);return a}function v_(t,e,n){return t===t&&(n!==void 0&&(t=t<=n?t:n),e!==void 0&&(t=t>=e?t:e)),t}function hr(t,e,n){return n===void 0&&(n=e,e=void 0),n!==void 0&&(n=ui(n),n=n===n?n:0),e!==void 0&&(e=ui(e),e=e===e?e:0),v_(ui(t),e,n)}var A_="[object Number]";function Da(t){return typeof t=="number"||Vi(t)&&Li(t)==A_}function ei(t){return t*(Math.PI/180)}function y_(t){return t*(180/Math.PI)}function R_(t){return t=t-(t>>1&1431655765),t=(t&858993459)+(t>>2&858993459),(t+(t>>4)&252645135)*16843009>>24}var Ue;(t=>{function e(r){return r<=0?r:r<=.0031308?r*12.92:1.055*Math.pow(r,1/2.4)-.055}t.linear_to_nonlinear_srgb=e;function n(r){return r<=0?r:r<=.04045?r/12.92:Math.pow((r+.055)/1.055,2.4)}t.nonlinear_to_linear_srgb=n})(Ue||(Ue={}));var xi;(t=>{function e(r,i,s){const a=(1-Math.abs(2*s-1))*i,o=r/60,l=a*(1-Math.abs(o%2-1));let c=[0,0,0];o<1?c=[a,l,0]:o<2?c=[l,a,0]:o<3?c=[0,a,l]:o<4?c=[0,l,a]:o<5?c=[l,0,a]:c=[a,0,l];const u=s-a/2,[h,_,p]=c;return[h+u,_+u,p+u]}t.hsl_to_nonlinear_srgb=e;function n([r,i,s]){const a=Math.max(r,Math.max(i,s)),o=Math.min(r,Math.min(i,s)),l=a-o,c=(a+o)/2;let u;l==0?u=0:r==a?u=60*(i-s)/l:i==a?u=60*(2+(s-r)/l):u=60*(4+(r-i)/l),u=u<0?360+u:u;let h;return c<=0||c>=1?h=0:h=(a-c)/Math.min(c,1-c),[u,h,c]}t.nonlinear_srgb_to_hsl=n})(xi||(xi={}));var Si;(t=>{const e=.008856451679035631,n=24389/27,r=.95047,i=1,s=1.08883;function a(l,c,u){l=l*100,c=c*100;const h=l,_=c*Math.cos(ei(u)),p=c*Math.sin(ei(u)),f=(h+16)/116,g=_/500+f,m=f-p/200;let E;const v=Math.pow(g,3);v>e?E=v:E=(116*g-16)/n;let x;h>e*n?x=Math.pow((h+16)/116,3):x=h/n;let C;const k=Math.pow(m,3);k>e?C=k:C=(116*m-16)/n;const O=E*r,S=x*i,B=C*s,W=O*3.2404542+S*-1.5371385+B*-.4985314,J=O*-.969266+S*1.8760108+B*.041556,se=O*.0556434+S*-.2040259+B*1.0572252;return[hr(Ue.linear_to_nonlinear_srgb(W),0,1),hr(Ue.linear_to_nonlinear_srgb(J),0,1),hr(Ue.linear_to_nonlinear_srgb(se),0,1)]}t.lch_to_nonlinear_srgb=a;function o([l,c,u]){l=Ue.nonlinear_to_linear_srgb(l),c=Ue.nonlinear_to_linear_srgb(c),u=Ue.nonlinear_to_linear_srgb(u);const h=l*.4124564+c*.3575761+u*.1804375,_=l*.2126729+c*.7151522+u*.072175,p=l*.0193339+c*.119192+u*.9503041,f=h/r,g=_/i,m=p/s;let E;f>e?E=Math.cbrt(f):E=(n*f+16)/116;let v;g>e?v=Math.cbrt(g):v=(n*g+16)/116;let x;g>e?x=Math.cbrt(m):x=(n*m+16)/116;const C=116*v-16,k=500*(E-v),O=200*(v-x),S=Math.sqrt(Math.pow(k,2)+Math.pow(O,2));let B=y_(Math.atan2(ei(O),ei(k)));return B<0&&(B=B+360),[hr(C/100,0,1.5),hr(S/100,0,1.5),B]}t.nonlinear_srgb_to_lch=o})(Si||(Si={}));class Hi{is_fully_transparent(){return this.a()===0}}class zi extends Hi{constructor(e,n,r,i){super(),this.red=e,this.green=n,this.blue=r,this.alpha=i}a(){return this.alpha}as_rgba(){return this}as_linear_rgba_f32(){return[Ue.nonlinear_to_linear_srgb(this.red),Ue.nonlinear_to_linear_srgb(this.green),Ue.nonlinear_to_linear_srgb(this.blue),this.alpha]}}class Pa extends Hi{constructor(e,n,r,i){super(),this.red=e,this.green=n,this.blue=r,this.alpha=i}a(){return this.alpha}as_rgba(){return new zi(Ue.linear_to_nonlinear_srgb(this.red),Ue.linear_to_nonlinear_srgb(this.green),Ue.linear_to_nonlinear_srgb(this.blue),this.alpha)}as_linear_rgba_f32(){return[this.red,this.green,this.blue,this.alpha]}}class Ua extends Hi{constructor(e,n,r,i){super(),this.hue=e,this.saturation=n,this.lightness=r,this.alpha=i}a(){return this.alpha}as_rgba(){const[e,n,r]=xi.hsl_to_nonlinear_srgb(this.hue,this.saturation,this.lightness);return new zi(e,n,r,this.alpha)}as_linear_rgba_f32(){const[e,n,r]=xi.hsl_to_nonlinear_srgb(this.hue,this.saturation,this.lightness);return[e,n,r,this.alpha]}}class Fa extends Hi{constructor(e,n,r,i){super(),this.lightness=e,this.chroma=n,this.hue=r,this.alpha=i}a(){return this.alpha}as_rgba(){const[e,n,r]=Si.lch_to_nonlinear_srgb(this.lightness,this.chroma,this.hue);return new zi(e,n,r,this.alpha)}as_linear_rgba_f32(){const[e,n,r]=Si.lch_to_nonlinear_srgb(this.lightness,this.chroma,this.hue);return[Ue.nonlinear_to_linear_srgb(e),Ue.nonlinear_to_linear_srgb(n),Ue.nonlinear_to_linear_srgb(r),this.alpha]}}var ye;(t=>{function e(f,g,m){return t.rgba(f,g,m,1)}t.rgb=e;function n(f,g,m,E){return new zi(f,g,m,E)}t.rgba=n;function r(f,g,m,E){return t.rgba(f/255,g/255,m/255,E/255)}t.rgba_u8=r;function i(f,g,m){return t.rgba_u8(f,g,m,255)}t.rgb_u8=i;function s(f,g,m){return new Pa(f,g,m,1)}t.rgb_linear=s;function a(f,g,m,E){return new Pa(f,g,m,E)}t.rgba_linear=a;function o(f,g,m){return new Ua(f,g,m,1)}t.hsl=o;function l(f,g,m,E){return new Ua(f,g,m,E)}t.hsla=l;function c(f,g,m){return new Fa(f,g,m,1)}t.lch=c;function u(f,g,m,E){return new Fa(f,g,m,E)}t.lcha=u;function h(f){const g=f.slice(1),m=[];for(let E=0;E<g.length;E++)m.push(g.charCodeAt(E));if(m.length===3){let[E,v,x]=m;return[E,v,x]=_([E,E,v,v,x,x]),t.rgb_u8(E,v,x)}else if(m.length===4){let[E,v,x,C]=m;return[E,v,x,C]=_([E,E,v,v,x,x,C,C]),t.rgba_u8(E,v,x,C)}else if(m.length===6){let[E,v,x,C,k,O]=m;const[S,B,W]=_([E,v,x,C,k,O]);return t.rgb_u8(S,B,W)}else if(m.length===8){let[E,v,x,C,k,O,S,B]=m;const[W,J,se,he]=_([E,v,x,C,k,O,S,B]);return t.rgba_u8(W,J,se,he)}}t.hex=h;function _(f){let g=0;for(;g<f.length;){const m=p(f[g]);f[g]=m,g+=1}for(g=0;g<f.length/2;)f[g]=f[g*2]*16+f[g*2+1],g+=1;return f}t.decode_hex=_;function p(f){return f>=48&&f<=57?f-48:f>=65&&f<=70?f-55:f>=97&&f<=102?f-87:0}t.ALICE_BLUE=t.rgb(.94,.97,1),t.ANTIQUE_WHITE=t.rgb(.98,.92,.84),t.AQUAMARINE=t.rgb(.49,1,.83),t.AZURE=t.rgb(.94,1,1),t.BEIGE=t.rgb(.96,.96,.86),t.BISQUE=t.rgb(1,.89,.77),t.BLACK=t.rgb(0,0,0),t.BLUE=t.rgb(0,0,1),t.CRIMSON=t.rgb(.86,.08,.24),t.CYAN=t.rgb(0,1,1),t.DARK_GRAY=t.rgb(.25,.25,.25),t.DARK_GREEN=t.rgb(0,.5,0),t.FUCHSIA=t.rgb(1,0,1),t.GOLD=t.rgb(1,.84,0),t.GRAY=t.rgb(.5,.5,.5),t.GREEN=t.rgb(0,1,0),t.INDIGO=t.rgb(.29,0,.51),t.LIME_GREEN=t.rgb(.2,.8,.2),t.MAROON=t.rgb(.5,0,0),t.MIDNIGHT_BLUE=t.rgb(.1,.1,.44),t.NAVY=t.rgb(0,0,.5),t.NONE=t.rgba(0,0,0,0),t.OLIVE=t.rgb(.5,.5,0),t.ORANGE=t.rgb(1,.65,0),t.ORANGE_RED=t.rgb(1,.27,0),t.PINK=t.rgb(1,.08,.58),t.PURPLE=t.rgb(.5,0,.5),t.RED=t.rgb(1,0,0),t.SALMON=t.rgb(.98,.5,.45),t.SEA_GREEN=t.rgb(.18,.55,.34),t.SILVER=t.rgb(.75,.75,.75),t.TEAL=t.rgb(0,.5,.5),t.TOMATO=t.rgb(1,.39,.28),t.TURQUOISE=t.rgb(.25,.88,.82),t.VIOLET=t.rgb(.93,.51,.93),t.WHITE=t.rgb(1,1,1),t.YELLOW=t.rgb(1,1,0),t.YELLOW_GREEN=t.rgb(.6,.8,.2)})(ye||(ye={}));var T_=Object.defineProperty,w_=Object.getOwnPropertyDescriptor,ki=(t,e,n,r)=>{for(var i=r>1?void 0:r?w_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&T_(e,n,i),i};class Ee{constructor(e){const{exposure:n=0,gamma:r=1,pre_saturation:i=1,post_saturation:s=1}=e||{};this.exposure=n,this.gamma=r,this.pre_saturation=i,this.post_saturation=s}}ki([A.float32],Ee.prototype,"exposure",2);ki([A.float32],Ee.prototype,"gamma",2);ki([A.float32],Ee.prototype,"pre_saturation",2);ki([A.float32],Ee.prototype,"post_saturation",2);var b_=Object.defineProperty,x_=Object.getOwnPropertyDescriptor,S_=(t,e,n,r)=>{for(var i=r>1?void 0:r?x_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&b_(e,n,i),i};class tt{constructor(e){const{enabled:n=!0}=e||{};this.enabled=n}}S_([A.boolean],tt.prototype,"enabled",2);class En extends fn{constructor(e){super();const{camera:n=new ne,computed:r=new Ie,transform:i,projection:s=new re,tonemapping:a=new Je,color_grading:o=new Ee,dither:l=new tt,frustum:c=new Ze}=e||{};this.camera=n,this.computed=r,this.transform=i,this.projection=s,this.tonemapping=a,this.color_grading=o,this.dither=l,this.frustum=c}}var I_=Object.defineProperty,N_=Object.getOwnPropertyDescriptor,er=(t,e,n,r)=>{for(var i=r>1?void 0:r?N_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&I_(e,n,i),i};function O_(t,e,n){const r=e.sub(t).normalize(),i=t.add(r);return z.from_translation(t).look_at(i,n)}class Fe{static to_transform(e){return O_(e.eye,e.target,e.up)}constructor(e={}){this.eye=e.eye??y.ZERO,this.target=e.target??y.ZERO,this.up=e.up??y.Y}radius(){return this.target.sub(this.eye)._length()}look_direction(){return this.target.sub(this.eye).normalize()}}er([A(zt)],Fe.prototype,"eye",2);er([A(zt)],Fe.prototype,"target",2);er([A(zt)],Fe.prototype,"up",2);class Ut{constructor(e={}){this.lag_weight=e.lag_weight??.9,this.lerp_tfm=e.lerp_tfm,this.enabled=e.enabled??!0}set_enabled(e){this.enabled=e,this.enabled&&this.reset()}set_lag_weight(e){this.lag_weight=e}smooth_transform(e){const n=this.lerp_tfm??e,r=1-this.lag_weight,i=new Fe({eye:n.eye.mul(this.lag_weight).add(e.eye.mul(r)),target:n.target.mul(this.lag_weight).add(e.target.mul(r)),up:e.up});return this.lerp_tfm=i,i}reset(){this.lerp_tfm=void 0}}er([A.float32],Ut.prototype,"lag_weight",2);er([A.object],Ut.prototype,"lerp_tfm",2);er([A.boolean],Ut.prototype,"enabled",2);class Mo extends fn{constructor(e={}){super();const{transform:n=void 0,smoother:r=void 0}=e;this.transform=n,this.smoother=r}}class Xi{static from_vector(e){const n=new Xi;return n.set_direction(e),n}constructor(e={}){this.yaw=e.yaw??0,this.pitch=e.pitch??0}unit_vector(){return M_(this.yaw,this.pitch)}set_direction(e){const[n,r]=C_(e);this.set_yaw(n),this.set_pitch(r)}set_yaw(e){this.yaw=e%(2*Math.PI)}get_yaw(){return this.yaw}add_yaw(e){this.set_yaw(this.get_yaw()+e)}set_pitch(e){this.pitch=Math.max(Math.min(e,Math.PI/2-.01),-Math.PI/2+.01)}get_pitch(){return this.pitch}add_pitch(e){this.set_pitch(this.get_pitch()+e)}}function C_(t){const e=y.Y,n=y.Z,r=new y(t.x,0,t.z);if(r.eq(y.ZERO))return t.dot(e)>0?[0,Math.PI/2]:[0,-Math.PI/2];let i=r.angle_between(n);t.x<0&&(i*=-1);let s=r.angle_between(t);return t.y<0&&(s*=-1),[i,s]}function M_(t,e){let n=we.from_rotation_y(t).mul_vec3(y.Z),r=n.cross(y.Y);return we.from_axis_angle(r,e).mul_vec3(n)}class B_ extends fn{constructor(e){super();const{controller:n,eye:r,target:i,up:s}=e,a=z.from_translation(r).look_at(i,s);this.controller=n,this.look_transform=new Mo({transform:new Fe({eye:r,target:i,up:s}),smoother:new Ut({lag_weight:n.smoothing_weight})}),this.transform=a}}var D_=Object.defineProperty,P_=Object.getOwnPropertyDescriptor,tr=(t,e,n,r)=>{for(var i=r>1?void 0:r?P_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&D_(e,n,i),i};class Ge{constructor(e={}){const{enabled:n=!0,mouse_rotate_sensitivity:r=ee.splat(.08),mouse_translate_sensitivity:i=ee.splat(.01),mouse_wheel_zoom_sensitivity:s=.2,pixels_per_line:a=53,smoothing_weight:o=.8}=e;this.enabled=n,this.mouse_rotate_sensitivity=r,this.mouse_translate_sensitivity=i,this.mouse_wheel_zoom_sensitivity=s,this.pixels_per_line=a,this.smoothing_weight=o}}tr([A.boolean],Ge.prototype,"enabled",2);tr([A(kt)],Ge.prototype,"mouse_rotate_sensitivity",2);tr([A(kt)],Ge.prototype,"mouse_translate_sensitivity",2);tr([A.float32],Ge.prototype,"mouse_wheel_zoom_sensitivity",2);tr([A.float32],Ge.prototype,"pixels_per_line",2);tr([A.float32],Ge.prototype,"smoothing_weight",2);class U_ extends fn{constructor(e){super();const{controller:n,eye:r,target:i,up:s}=e,a=z.from_translation(r).look_at(i,s);this.controller=n,this.look_transform=new Mo({transform:new Fe({eye:r,target:i,up:s}),smoother:new Ut({lag_weight:n.smoothing_weight})}),this.transform=a}}var F_=Object.defineProperty,L_=Object.getOwnPropertyDescriptor,Wi=(t,e,n,r)=>{for(var i=r>1?void 0:r?L_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&F_(e,n,i),i};class gt{constructor(e={}){const{enabled:n=!0,mouse_rotate_sensitivity:r=ee.splat(.002),translate_sensitivity:i=2,smoothing_weight:s=.9}=e;this.enabled=n,this.mouse_rotate_sensitivity=r,this.translate_sensitivity=i,this.smoothing_weight=s}}Wi([A.boolean],gt.prototype,"enabled",2);Wi([A(kt)],gt.prototype,"mouse_rotate_sensitivity",2);Wi([A.float32],gt.prototype,"translate_sensitivity",2);Wi([A.float32],gt.prototype,"smoothing_weight",2);var Yt;(t=>{class e{}t.Opaque=e;class n{}t.Mask=n;class r{}t.Blend=r;class i{}t.Premultiplied=i;class s{}t.Add=s;class a{}t.Multiply=a})(Yt||(Yt={}));var Ne;(t=>{class e{constructor(g){const{start:m=0,end:E=100}=g||{};this.start=m,this.end=E}}t.Linear=e;class n{constructor(g){const{density:m=0}=g||{};this.density=m}}t.Exponential=n;class r{constructor(g){const{density:m=0}=g||{};this.density=m}}t.ExponentialSquared=r;class i{constructor(g){const{extinction:m,inscattering:E}=g||{};this.extinction=m,this.inscattering=E}}t.Atmospheric=i,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD=.05;function s(f,g){return Math.log(-g)/f}t.koschmieder=s;function a(f){return t.from_visibility_contrast(f,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD)}t.from_visibility=a;function o(f,g){return new n({density:t.koschmieder(f,g)})}t.from_visibility_contrast=o;function l(f){return t.from_visibility_contrast_squared(f,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD)}t.from_visibility_squared=l;function c(f,g){return new r({density:Math.sqrt(t.koschmieder(f,g)/f)})}t.from_visibility_contrast_squared=c;function u(f,g){return t.from_visibility_contrast_colors(f,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,g,g)}t.from_visibility_color=u;function h(f,g,m){return t.from_visibility_contrast_colors(f,t.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,g,m)}t.from_visibility_colors=h;function _(f,g,m){return t.from_visibility_contrast_colors(f,g,m,m)}t.from_visibility_contrast_color=_;function p(f,g,m,E){const v=Math.E;let[x,C,k,O]=m.as_linear_rgba_f32(),[S,B,W,J]=E.as_linear_rgba_f32();return new i({extinction:new y(Math.pow(1-x,v),Math.pow(1-C,v),Math.pow(1-k,v)).mul_assign(t.koschmieder(f,g)).mul_assign(Math.pow(O,v)),inscattering:new y(Math.pow(S,v),Math.pow(B,v),Math.pow(W,v)).mul_assign(t.koschmieder(f,g)).mul_assign(Math.pow(J,v))})}t.from_visibility_contrast_colors=p})(Ne||(Ne={}));var V_=Object.defineProperty,H_=Object.getOwnPropertyDescriptor,$i=(t,e,n,r)=>{for(var i=r>1?void 0:r?H_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&V_(e,n,i),i};class ke{constructor(e){const{color:n=ye.rgba(1,1,1,1),directional_light_color:r=ye.NONE,directional_light_exponent:i=8,falloff:s=new Ne.Linear({start:0,end:100})}=e||{};this.color=n,this.directional_light_color=r,this.directional_light_exponent=i,this.falloff=s}}$i([A.object],ke.prototype,"color",2);$i([A.object],ke.prototype,"directional_light_color",2);$i([A.float32],ke.prototype,"directional_light_exponent",2);$i([A.object],ke.prototype,"falloff",2);const z_=`#import pbr::{
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
`,k_=`#import pbr::{
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
`;var X_=Object.defineProperty,W_=Object.getOwnPropertyDescriptor,Q=(t,e,n,r)=>{for(var i=r>1?void 0:r?W_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&X_(e,n,i),i};class H{constructor(e){const{vertex_shader:n=z_,fragment_shader:r=k_,base_color:i=ye.WHITE,base_color_texture:s,emissive:a=ye.BLACK,emissive_texture:o,perceptual_roughness:l=.5,metallic:c=0,metallic_roughness_texture:u,reflectance:h=.5,diffuse_transmission:_=0,diffuse_transmission_texture:p,specular_transmission:f=0,specular_transmission_texture:g,thickness:m=0,thickness_texture:E,ior:v=1.5,attenuation_distance:x=1/0,attenuation_color:C=ye.WHITE,normal_map_texture:k,flip_normal_map_y:O=!1,occlusion_texture:S,double_sided:B=!1,fog_enabled:W=!0,alpha_mode:J=new Yt.Opaque,depth_bias:se=0,depth_map:he,parallax_depth_scale:Ce=.1,max_parallax_layer_count:ct=16,deferred_lighting_pass_id:je=1,opaque_render_method:Z=2,unlit:an=!1}=e||{};this.vertex_shader=n,this.fragment_shader=r,this.base_color=i,this.base_color_texture=s,this.emissive=a,this.emissive_texture=o,this.perceptual_roughness=l,this.metallic=c,this.metallic_roughness_texture=u,this.reflectance=h,this.diffuse_transmission=_,this.diffuse_transmission_texture=p,this.specular_transmission=f,this.specular_transmission_texture=g,this.thickness=m,this.thickness_texture=E,this.ior=v,this.attenuation_distance=x,this.attenuation_color=C,this.normal_map_texture=k,this.flip_normal_map_y=O,this.occlusion_texture=S,this.double_sided=B,this.fog_enabled=W,this.alpha_mode=J,this.depth_bias=se,this.depth_map=he,this.parallax_depth_scale=Ce,this.max_parallax_layer_count=ct,this.deferred_lighting_pass_id=je,this.opaque_render_method=Z,this.unlit=an}}Q([A.object],H.prototype,"vertex_shader",2);Q([A.object],H.prototype,"fragment_shader",2);Q([A.object],H.prototype,"base_color",2);Q([A.object],H.prototype,"base_color_texture",2);Q([A.object],H.prototype,"emissive",2);Q([A.object],H.prototype,"emissive_texture",2);Q([A.float32],H.prototype,"perceptual_roughness",2);Q([A.float32],H.prototype,"metallic",2);Q([A.object],H.prototype,"metallic_roughness_texture",2);Q([A.float32],H.prototype,"reflectance",2);Q([A.float32],H.prototype,"diffuse_transmission",2);Q([A.object],H.prototype,"diffuse_transmission_texture",2);Q([A.float32],H.prototype,"specular_transmission",2);Q([A.object],H.prototype,"specular_transmission_texture",2);Q([A.float32],H.prototype,"thickness",2);Q([A.object],H.prototype,"thickness_texture",2);Q([A.float32],H.prototype,"ior",2);Q([A.float32],H.prototype,"attenuation_distance",2);Q([A.object],H.prototype,"attenuation_color",2);Q([A.object],H.prototype,"normal_map_texture",2);Q([A.boolean],H.prototype,"flip_normal_map_y",2);Q([A.object],H.prototype,"occlusion_texture",2);Q([A.boolean],H.prototype,"double_sided",2);Q([A.uint8],H.prototype,"cull_mode",2);Q([A.boolean],H.prototype,"unlit",2);Q([A.boolean],H.prototype,"fog_enabled",2);Q([A.object],H.prototype,"alpha_mode",2);Q([A.float32],H.prototype,"depth_bias",2);Q([A.object],H.prototype,"depth_map",2);Q([A.float32],H.prototype,"parallax_depth_scale",2);Q([A.float32],H.prototype,"max_parallax_layer_count",2);Q([A.uint8],H.prototype,"opaque_render_method",2);Q([A.uint8],H.prototype,"deferred_lighting_pass_id",2);var ve;(t=>{const n=32-R_(7);t.BASE_COLOR_TEXTURE=1,t.EMISSIVE_TEXTURE=2,t.METALLIC_ROUGHNESS_TEXTURE=4,t.OCCLUSION_TEXTURE=8,t.DOUBLE_SIDED=16,t.UNLIT=32,t.TWO_COMPONENT_NORMAL_MAP=64,t.FLIP_NORMAL_MAP_Y=128,t.FOG_ENABLED=256,t.DEPTH_MAP=512,t.SPECULAR_TRANSMISSION_TEXTURE=1024,t.THICKNESS_TEXTURE=2048,t.DIFFUSE_TRANSMISSION_TEXTURE=4096,t.ATTENUATION_ENABLED=8192,t.ALPHA_MODE_RESERVED_BITS=7<<n,t.ALPHA_MODE_OPAQUE=0<<n,t.ALPHA_MODE_MASK=1<<n,t.ALPHA_MODE_BLEND=2<<n,t.ALPHA_MODE_PREMULTIPLIED=3<<n,t.ALPHA_MODE_ADD=4<<n,t.ALPHA_MODE_MULTIPLY=5<<n,t.NONE=0,t.UNINITIALIZED=65535})(ve||(ve={}));class Gt extends fn{constructor(e){super();const{mesh:n,material:r,transform:i}=e||{};this.mesh=n,this.material=r,this.transform=i}}var $_=Object.defineProperty,j_=Object.getOwnPropertyDescriptor,Bo=(t,e,n,r)=>{for(var i=r>1?void 0:r?j_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&$_(e,n,i),i};class Bt{constructor(e){const{color:n=ye.rgb(1,1,1),brightness:r=.05}=e||{};this.color=n,this.brightness=r}}Bo([A.object],Bt.prototype,"color",2);Bo([A.float32],Bt.prototype,"brightness",2);var q_=Object.defineProperty,Y_=Object.getOwnPropertyDescriptor,Bn=(t,e,n,r)=>{for(var i=r>1?void 0:r?Y_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&q_(e,n,i),i};const Wt=class Rs{constructor(e){const{color:n=ye.rgb(1,1,1),intensity:r=800,range:i=20,radius:s=0,shadows_enabled:a=!1,shadow_depth_bias:o=Rs.DEFAULT_SHADOW_DEPTH_BIAS,shadow_normal_bias:l=Rs.DEFAULT_SHADOW_NORMAL_BIAS}=e||{};this.color=n,this.intensity=r,this.range=i,this.radius=s,this.shadows_enabled=a,this.shadow_depth_bias=o,this.shadow_normal_bias=l}};Wt.DEFAULT_SHADOW_DEPTH_BIAS=.02;Wt.DEFAULT_SHADOW_NORMAL_BIAS=.6;Bn([A.object],Wt.prototype,"color",2);Bn([A.float32],Wt.prototype,"intensity",2);Bn([A.float32],Wt.prototype,"range",2);Bn([A.float32],Wt.prototype,"radius",2);Bn([A.boolean],Wt.prototype,"shadows_enabled",2);Bn([A.float32],Wt.prototype,"shadow_depth_bias",2);Bn([A.float32],Wt.prototype,"shadow_normal_bias",2);let Do=Wt;var K_=Object.defineProperty,Q_=Object.getOwnPropertyDescriptor,rn=(t,e,n,r)=>{for(var i=r>1?void 0:r?Q_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&K_(e,n,i),i};const St=class Ts{constructor(e){const{color:n=ye.rgb(1,1,1),intensity:r=800,range:i=20,radius:s=0,shadows_enabled:a=!1,shadow_depth_bias:o=Ts.DEFAULT_SHADOW_DEPTH_BIAS,shadow_normal_bias:l=Ts.DEFAULT_SHADOW_NORMAL_BIAS,outer_angle:c=Math.PI/4,inner_angle:u=0}=e||{};this.color=n,this.intensity=r,this.range=i,this.radius=s,this.shadows_enabled=a,this.shadow_depth_bias=o,this.shadow_normal_bias=l,this.outer_angle=c,this.inner_angle=u}};St.DEFAULT_SHADOW_DEPTH_BIAS=.02;St.DEFAULT_SHADOW_NORMAL_BIAS=1.8;rn([A.object],St.prototype,"color",2);rn([A.float32],St.prototype,"intensity",2);rn([A.float32],St.prototype,"range",2);rn([A.float32],St.prototype,"radius",2);rn([A.boolean],St.prototype,"shadows_enabled",2);rn([A.float32],St.prototype,"shadow_depth_bias",2);rn([A.float32],St.prototype,"shadow_normal_bias",2);rn([A.float32],St.prototype,"outer_angle",2);rn([A.float32],St.prototype,"inner_angle",2);var Z_=Object.defineProperty,G_=Object.getOwnPropertyDescriptor,Hr=(t,e,n,r)=>{for(var i=r>1?void 0:r?G_(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&Z_(e,n,i),i};const vn=class ws{constructor(e){const{color:n=ye.rgb(1,1,1),illuminance:r=1e5,shadows_enabled:i=!1,shadow_depth_bias:s=ws.DEFAULT_SHADOW_DEPTH_BIAS,shadow_normal_bias:a=ws.DEFAULT_SHADOW_NORMAL_BIAS}=e||{};this.color=n,this.illuminance=r,this.shadows_enabled=i,this.shadow_depth_bias=s,this.shadow_normal_bias=a}};vn.DEFAULT_SHADOW_DEPTH_BIAS=.02;vn.DEFAULT_SHADOW_NORMAL_BIAS=1.8;Hr([A.object],vn.prototype,"color",2);Hr([A.float32],vn.prototype,"illuminance",2);Hr([A.boolean],vn.prototype,"shadows_enabled",2);Hr([A.float32],vn.prototype,"shadow_depth_bias",2);Hr([A.float32],vn.prototype,"shadow_normal_bias",2);let pt=vn;var J_=Object.defineProperty,ed=Object.getOwnPropertyDescriptor,An=(t,e,n,r)=>{for(var i=r>1?void 0:r?ed(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&J_(e,n,i),i};class We{}An([A.object],We.prototype,"color",2);An([A.float32],We.prototype,"illuminance",2);An([A.boolean],We.prototype,"shadows_enabled",2);An([A.float32],We.prototype,"shadow_depth_bias",2);An([A.float32],We.prototype,"shadow_normal_bias",2);An([A.object],We.prototype,"transform",2);An([A.object],We.prototype,"cascade_shadow_config",2);An([A.object],We.prototype,"cascades",2);var td=Object.defineProperty,nd=Object.getOwnPropertyDescriptor,Po=(t,e,n,r)=>{for(var i=r>1?void 0:r?nd(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&td(e,n,i),i};const Ls=class hi{constructor(e=y.ZERO,n=y.ZERO){this.center=e,this.half_extents=n}static from(e){return new hi(e.center,y.splat(e.radius))}static from_min_max(e,n){const r=n.add(e).mul(.5),i=n.sub(e).mul(.5);return new hi(r,i)}static enclosing(e){let n=y.MIN,r=y.MAX;return e.forEach(i=>{n=n.min(y.from_array(i)),r=r.max(y.from_array(i))}),hi.from_min_max(n,r)}relative_radius(e,n){let r=this.half_extents;return new y(e.dot(n.x_axis),e.dot(n.y_axis),e.dot(n.z_axis)).abs().dot(r)}};Po([A(zt)],Ls.prototype,"center",2);Po([A(zt)],Ls.prototype,"half_extents",2);let rd=Ls;class Vs{}var id=Object.defineProperty,sd=Object.getOwnPropertyDescriptor,Hs=(t,e,n,r)=>{for(var i=r>1?void 0:r?sd(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&id(e,n,i),i};class Jt{constructor(e){const{bounds:n=[0,0,0,0],overlap_proportion:r=.4,minimum_distance:i=0}=e||{};this.bounds=n,this.overlap_proportion=r,this.minimum_distance=i}}Hs([A.object],Jt.prototype,"bounds",2);Hs([A.float32],Jt.prototype,"overlap_proportion",2);Hs([A.float32],Jt.prototype,"minimum_distance",2);class ad{constructor(e){const{num_cascades:n=4,minimum_distance:r=.1,maximum_distance:i=1e3,first_cascade_far_bound:s=5,overlap_proportion:a=.2}=e||{};this.num_cascades=n,this.minimum_distance=r,this.maximum_distance=i,this.first_cascade_far_bound=s,this.overlap_proportion=a}build(){return new Jt({bounds:od(this.num_cascades,this.first_cascade_far_bound,this.maximum_distance),overlap_proportion:this.overlap_proportion,minimum_distance:this.minimum_distance})}}function od(t,e,n){if(t===1)return[n];const r=Math.pow(n/e,1/(t-1));return new Array(t).map(i=>e*Math.pow(r,i))}var ld=Object.defineProperty,cd=Object.getOwnPropertyDescriptor,zr=(t,e,n,r)=>{for(var i=r>1?void 0:r?cd(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&ld(e,n,i),i};class kr{constructor(e){const{view_transform:n=Dt.IDENTITY,projection:r=Dt.IDENTITY,view_projection:i=Dt.IDENTITY,texel_size:s=0}=e||{};this.view_transform=n,this.projection=r,this.view_projection=i,this.texel_size=s}}zr([A(Di)],kr.prototype,"view_transform",2);zr([A(Di)],kr.prototype,"projection",2);zr([A(Di)],kr.prototype,"view_projection",2);zr([A.float32],kr.prototype,"texel_size",2);class en{constructor(e){const{cascades:n=new Map}=e||{};this.cascades=n}}zr([A.object],en.prototype,"cascades",2);class ud extends fn{constructor(e){super();const{directional_light:n=new pt,frusta:r=new Vs,cascades:i=new en,cascade_shadow_config:s=new Jt,transform:a}=e||{};this.directional_light=n,this.frusta=r,this.cascades=i,this.cascade_shadow_config=s,this.transform=a}}var hd=Object.defineProperty,_d=Object.getOwnPropertyDescriptor,ji=(t,e,n,r)=>{for(var i=r>1?void 0:r?_d(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&hd(e,n,i),i};class Rt{constructor(e){const{tile_size:n=ee.ONE,dimensions:r=y.ZERO,near:i=0,far:s=0}=e??{};this.tile_size=n,this.dimensions=r,this.near=i,this.far=s}update(e,n){let r=e.div(n.xy()).ceil().max(ee.ONE);this.tile_size=r,this.dimensions=e.div(r).ceil().extend(n.z).max(y.ONE)}clear(){this.tile_size=ee.ONE,this.dimensions=y.ZERO,this.near=0,this.far=0}}ji([A(kt)],Rt.prototype,"tile_size",2);ji([A(zt)],Rt.prototype,"dimensions",2);ji([A.float32],Rt.prototype,"near",2);ji([A.float32],Rt.prototype,"far",2);var dd=Object.defineProperty,fd=Object.getOwnPropertyDescriptor,nr=(t,e,n,r)=>{for(var i=r>1?void 0:r?fd(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&dd(e,n,i),i};class Ft{constructor(e){const{strategy:n=3,dimensions:r=y.ZERO,z_config:i={first_slice_depth:5,far_z_mode:0},dynamic_resizing:s=!0,total:a=4096,z_slices:o=24}=e??{};this.strategy=n,this.dimensions=r,this.z_config=i,this.dynamic_resizing=s,this.total=a,this.z_slices=o}dimensions_for_screen_size(e){if(this.strategy===0)return y.ZERO;if(this.strategy===1)return y.ONE;if(this.strategy===2)return this.dimensions;if(this.strategy===3){let{total:n,z_slices:r}=this,i=e.x/e.y;n<r&&(r=n);let s=n/r,a=Math.sqrt(s/i),o=a*i;return o==0&&(o=1,a=s),a==0&&(o=s,a=1),new y(o,a,r)}}first_slice_depth(){if(this.strategy===0||this.strategy===1)return 0;if(this.strategy===3||this.strategy===2)return this.z_config.first_slice_depth}far_z_mode(){if(this.strategy===0)return 1;if(this.strategy===1)return 0;{const{z_config:e}=this;return e.far_z_mode}}}nr([A.uint8],Ft.prototype,"strategy",2);nr([A(zt)],Ft.prototype,"dimensions",2);nr([A.object],Ft.prototype,"z_config",2);nr([A.boolean],Ft.prototype,"dynamic_resizing",2);nr([A.uint32],Ft.prototype,"total",2);nr([A.uint32],Ft.prototype,"z_slices",2);class pd{constructor(e){this.currentBufferWordSize=-1,this.currentWordOffset=0,this.buffer=null,this.shadowBufferF32=null,this.shadowBufferU8=null,this.device=e;const n=e.queryLimits();this.uniformBufferWordAlignment=n.uniformBufferWordAlignment,this.uniformBufferMaxPageWordSize=n.uniformBufferMaxPageWordSize}isSupportedUBO(){return this.device.queryVendorInfo().platformString!=="WebGL1"}findPageIndex(e){return e/this.uniformBufferMaxPageWordSize|0}allocateChunk(e){e=or(e,this.uniformBufferWordAlignment),U(e<this.uniformBufferMaxPageWordSize);let n=this.currentWordOffset;return this.findPageIndex(n)!==this.findPageIndex(n+e-1)&&(n=or(n,this.uniformBufferMaxPageWordSize)),this.currentWordOffset=n+e,this.ensureShadowBuffer(n,e),n}ensureShadowBuffer(e,n){if(this.shadowBufferU8===null||this.shadowBufferF32===null){const r=or(this.currentWordOffset,this.uniformBufferMaxPageWordSize);this.shadowBufferU8=new Uint8Array(r*4),this.shadowBufferF32=new Float32Array(this.shadowBufferU8.buffer)}else if(e+n>=this.shadowBufferF32.length){U(e<this.currentWordOffset&&e+n<=this.currentWordOffset);const r=or(Math.max(this.currentWordOffset,this.shadowBufferF32.length*2),this.uniformBufferMaxPageWordSize),i=new Uint8Array(r*4);if(i.set(this.shadowBufferU8,0),this.shadowBufferU8=i,this.shadowBufferF32=new Float32Array(this.shadowBufferU8.buffer),!(this.currentWordOffset<=r))throw new Error(`Assert fail: this.currentWordOffset [${this.currentWordOffset}] <= newWordCount [${r}]`)}}mapBufferF32(){return be(this.shadowBufferF32)}mapBufferU8(){return be(this.shadowBufferU8)}prepareToRender(){if(this.shadowBufferF32===null)return;const e=be(this.shadowBufferF32);e.length!==this.currentBufferWordSize&&(this.currentBufferWordSize=e.length,this.buffer!==null&&this.buffer.destroy(),this.buffer=this.device.createBuffer({viewOrSize:this.currentBufferWordSize*4,usage:ie.UNIFORM,hint:dn.DYNAMIC}));const n=or(this.currentWordOffset,this.uniformBufferMaxPageWordSize);if(!(n<=this.currentBufferWordSize))throw new Error(`Assert fail: wordCount [${n}] (${this.currentWordOffset} aligned ${this.uniformBufferMaxPageWordSize}) <= this.currentBufferWordSize [${this.currentBufferWordSize}]`);this.isSupportedUBO()&&be(this.buffer).setSubData(0,this.shadowBufferU8,0,n*4),this.currentWordOffset=0}destroy(){this.buffer!==null&&this.buffer.destroy(),this.shadowBufferF32=null,this.shadowBufferU8=null}}function Y(t,e){return t+=e,t+=t<<10,t+=t>>>6,t>>>0}function Uo(t){return t+=t<<3,t^=t>>>11,t+=t<<15,t>>>0}function as(t){return 0}class md{constructor(){this.keys=[],this.values=[]}}class _r{constructor(e,n){this.keyEqualFunc=e,this.keyHashFunc=n,this.buckets=new Map}findBucketIndex(e,n){for(let r=0;r<e.keys.length;r++)if(this.keyEqualFunc(n,e.keys[r]))return r;return-1}findBucket(e){const n=this.keyHashFunc(e);return this.buckets.get(n)}get(e){const n=this.findBucket(e);if(n===void 0)return null;const r=this.findBucketIndex(n,e);return r<0?null:n.values[r]}add(e,n){const r=this.keyHashFunc(e);this.buckets.get(r)===void 0&&this.buckets.set(r,new md);const i=this.buckets.get(r);i.keys.push(e),i.values.push(n)}delete(e){const n=this.findBucket(e);if(n===void 0)return;const r=this.findBucketIndex(n,e);r!==-1&&(n.keys.splice(r,1),n.values.splice(r,1))}clear(){this.buckets.clear()}size(){let e=0;for(const n of this.buckets.values())e+=n.values.length;return e}*values(){for(const e of this.buckets.values())for(let n=e.values.length-1;n>=0;n--)yield e.values[n]}}function gd(t,e){const n=e.defines!==void 0?e.defines:null,r=e.both!==void 0?e.both+e.vert:e.vert,i=e.both!==void 0?e.both+e.frag:e.frag;return Bc(t.queryVendorInfo(),r,i,n)}function Ed(t,e){return U(t.preprocessedVert!==""&&e.preprocessedVert!==""),U(t.preprocessedFrag!==""&&e.preprocessedFrag!==""),t.preprocessedVert===e.preprocessedVert&&t.preprocessedFrag===e.preprocessedFrag}function vd(t){const e=t.preprocessedVert,n=t.preprocessedFrag,r=t.vert,i=t.frag;return{preprocessedVert:e,preprocessedFrag:n,vert:r,frag:i}}function La(t,e){return t=Y(t,e.blendMode),t=Y(t,e.blendSrcFactor),t=Y(t,e.blendDstFactor),t}function Ad(t,e){return t=La(t,e.rgbBlendState),t=La(t,e.alphaBlendState),t=Y(t,e.channelWriteMask),t}function yd(t,e){return t=Y(t,e.r<<24|e.g<<16|e.b<<8|e.a),t}function Rd(t,e){var n,r,i,s,a,o,l,c;for(let u=0;u<e.attachmentsState.length;u++)t=Ad(t,e.attachmentsState[u]);return t=yd(t,e.blendConstant),t=Y(t,e.depthCompare),t=Y(t,e.depthWrite?1:0),t=Y(t,(n=e.stencilFront)==null?void 0:n.compare),t=Y(t,(r=e.stencilFront)==null?void 0:r.passOp),t=Y(t,(i=e.stencilFront)==null?void 0:i.failOp),t=Y(t,(s=e.stencilFront)==null?void 0:s.depthFailOp),t=Y(t,(a=e.stencilBack)==null?void 0:a.compare),t=Y(t,(o=e.stencilBack)==null?void 0:o.passOp),t=Y(t,(l=e.stencilBack)==null?void 0:l.failOp),t=Y(t,(c=e.stencilBack)==null?void 0:c.depthFailOp),t=Y(t,e.stencilWrite?1:0),t=Y(t,e.cullMode),t=Y(t,e.frontFace?1:0),t=Y(t,e.polygonOffset?1:0),t}function Td(t){let e=0;e=Y(e,t.program.id),t.inputLayout!==null&&(e=Y(e,t.inputLayout.id)),e=Rd(e,t.megaStateDescriptor);for(let n=0;n<t.colorAttachmentFormats.length;n++)e=Y(e,t.colorAttachmentFormats[n]||0);return e=Y(e,t.depthStencilAttachmentFormat||0),Uo(e)}function wd(t){let e=0;for(let n=0;n<t.samplerBindings.length;n++){const r=t.samplerBindings[n];r!==null&&r.texture!==null&&(e=Y(e,r.texture.id))}for(let n=0;n<t.uniformBufferBindings.length;n++){const r=t.uniformBufferBindings[n];r!==null&&r.buffer!==null&&(e=Y(e,r.buffer.id),e=Y(e,r.binding),e=Y(e,r.offset),e=Y(e,r.size))}for(let n=0;n<t.storageBufferBindings.length;n++){const r=t.storageBufferBindings[n];r!==null&&r.buffer!==null&&(e=Y(e,r.buffer.id),e=Y(e,r.binding),e=Y(e,r.offset),e=Y(e,r.size))}for(let n=0;n<t.storageTextureBindings.length;n++){const r=t.storageTextureBindings[n];r!==null&&r.texture!==null&&(e=Y(e,r.texture.id),e=Y(e,r.binding))}return Uo(e)}class bd{constructor(e){this.bindingsCache=new _r(ac,wd),this.renderPipelinesCache=new _r(uc,Td),this.inputLayoutsCache=new _r(dc,as),this.programCache=new _r(Ed,as),this.samplerCache=new _r(fc,as),this.device=e}createBindings(e){let n=this.bindingsCache.get(e);if(n===null){const r=gc(e);r.uniformBufferBindings=r.uniformBufferBindings.filter(({size:i})=>i>0),n=this.device.createBindings(r),this.bindingsCache.add(r,n)}return n}createRenderPipeline(e){let n=this.renderPipelinesCache.get(e);if(n===null){const r=Ec(e);r.colorAttachmentFormats=r.colorAttachmentFormats.filter(i=>i),n=this.device.createRenderPipeline(r),this.renderPipelinesCache.add(r,n)}return n}createInputLayout(e){e.vertexBufferDescriptors=e.vertexBufferDescriptors.filter(r=>!!r);let n=this.inputLayoutsCache.get(e);if(n===null){const r=yc(e);n=this.device.createInputLayout(r),this.inputLayoutsCache.add(r,n)}return n}createProgramSimple(e){const{vert:n,frag:r,preprocessedFrag:i,preprocessedVert:s}=e;let a=null;if(s&&i&&(a=this.programCache.get({vert:n,frag:r,preprocessedFrag:i,preprocessedVert:s})),a===null){const{preprocessedVert:o,preprocessedFrag:l}=gd(this.device,e);e.preprocessedVert=o,e.preprocessedFrag=l;const c=vd(e);a=this.device.createProgramSimple({vertex:{glsl:o},fragment:{glsl:l}},n),this.programCache.add(c,a)}return a}createSampler(e){let n=this.samplerCache.get(e);return n===null&&(n=this.device.createSampler(e),this.samplerCache.add(e,n)),n}destroy(){for(const e of this.bindingsCache.values())e.destroy();for(const e of this.renderPipelinesCache.values())e.destroy();for(const e of this.inputLayoutsCache.values())e.destroy();for(const e of this.programCache.values())e.destroy();for(const e of this.samplerCache.values())e.destroy();this.bindingsCache.clear(),this.renderPipelinesCache.clear(),this.inputLayoutsCache.clear(),this.programCache.clear(),this.samplerCache.clear()}}var Qe=(t=>(t[t.Color0=0]="Color0",t[t.Color1=1]="Color1",t[t.Color2=2]="Color2",t[t.Color3=3]="Color3",t[t.ColorMax=3]="ColorMax",t[t.DepthStencil=4]="DepthStencil",t))(Qe||{});class xd{constructor(){this.renderTargetIDs=[],this.renderTargetLevels=[],this.resolveTextureOutputIDs=[],this.resolveTextureOutputExternalTextures=[],this.resolveTextureOutputExternalTextureLevel=[],this.resolveTextureInputIDs=[],this.renderTargetExtraRefs=[],this.resolveTextureInputTextures=[],this.renderTargets=[],this.descriptor={colorAttachment:[],colorAttachmentLevel:[],colorResolveTo:[],colorResolveToLevel:[],colorStore:[],depthStencilAttachment:null,depthStencilResolveTo:null,depthStencilStore:!0,colorClearColor:["load"],depthClearValue:"load",stencilClearValue:"load",occlusionQueryPool:null},this.viewportX=0,this.viewportY=0,this.viewportW=1,this.viewportH=1,this.execFunc=null,this.postFunc=null,this.debugThumbnails=[]}setDebugName(e){this.debugName=e}pushDebugThumbnail(e){this.debugThumbnails[e]=!0}setViewport(e,n,r,i){this.viewportX=e,this.viewportY=n,this.viewportW=r,this.viewportH=i}attachRenderTargetID(e,n,r=0){U(this.renderTargetIDs[e]===void 0),this.renderTargetIDs[e]=n,this.renderTargetLevels[e]=r}attachResolveTexture(e){this.resolveTextureInputIDs.push(e)}attachOcclusionQueryPool(e){this.descriptor.occlusionQueryPool=e}exec(e){U(this.execFunc===null),this.execFunc=e}post(e){U(this.postFunc===null),this.postFunc=e}addExtraRef(e){this.renderTargetExtraRefs[e]=!0}}class Sd{constructor(e,n){this.dimension=q.TEXTURE_2D,this.depthOrArrayLayers=1,this.mipLevelCount=1,this.width=0,this.height=0,this.sampleCount=0,this.usage=mt.RENDER_TARGET,this.needsClear=!0,this.texture=null,this.age=0,this.format=n.format,this.width=n.width,this.height=n.height,this.sampleCount=n.sampleCount,U(this.sampleCount>=1),this.sampleCount>1?this.attachment=e.createRenderTarget(this):(this.texture=e.createTexture(this),this.attachment=e.createRenderTargetFromTexture(this.texture))}setDebugName(e,n){this.debugName=n,this.texture!==null&&e.setResourceName(this.texture,this.debugName),e.setResourceName(this.attachment,this.debugName)}matchesDescription(e){return this.format===e.format&&this.width===e.width&&this.height===e.height&&this.sampleCount===e.sampleCount}reset(e){U(this.matchesDescription(e)),this.age=0}destroy(){this.attachment.destroy()}}class Id{constructor(e,n){this.dimension=q.TEXTURE_2D,this.depthOrArrayLayers=1,this.mipLevelCount=1,this.usage=mt.RENDER_TARGET,this.width=0,this.height=0,this.age=0,this.format=n.format,this.width=n.width,this.height=n.height,this.texture=e.createTexture(this)}matchesDescription(e){return this.format===e.format&&this.width===e.width&&this.height===e.height}reset(e){U(this.matchesDescription(e)),this.age=0}destroy(){this.texture.destroy()}}class Nd{constructor(){this.renderTargetDescriptions=[],this.resolveTextureRenderTargetIDs=[],this.passes=[],this.renderTargetDebugNames=[]}}class Od{constructor(e){this.currentPass=null,this.renderTargetDeadPool=[],this.singleSampledTextureDeadPool=[],this.currentGraph=null,this.renderTargetOutputCount=[],this.renderTargetResolveCount=[],this.resolveTextureUseCount=[],this.renderTargetAliveForID=[],this.singleSampledTextureForResolveTextureID=[],this.device=e}acquireRenderTargetForDescription(e){for(let n=0;n<this.renderTargetDeadPool.length;n++){const r=this.renderTargetDeadPool[n];if(r.matchesDescription(e))return r.reset(e),this.renderTargetDeadPool.splice(n--,1),r}return new Sd(this.device,e)}acquireSingleSampledTextureForDescription(e){for(let n=0;n<this.singleSampledTextureDeadPool.length;n++){const r=this.singleSampledTextureDeadPool[n];if(r.matchesDescription(e))return r.reset(e),this.singleSampledTextureDeadPool.splice(n--,1),r}return new Id(this.device,e)}beginGraphBuilder(){U(this.currentGraph===null),this.currentGraph=new Nd}pushPass(e){const n=new xd;e(n),this.currentGraph.passes.push(n)}createRenderTargetID(e,n){return this.currentGraph.renderTargetDebugNames.push(n),this.currentGraph.renderTargetDescriptions.push(e)-1}createResolveTextureID(e){return this.currentGraph.resolveTextureRenderTargetIDs.push(e)-1}findMostRecentPassThatAttachedRenderTarget(e){for(let n=this.currentGraph.passes.length-1;n>=0;n--){const r=this.currentGraph.passes[n];if(r.renderTargetIDs.includes(e))return r}return null}resolveRenderTargetPassAttachmentSlot(e,n){const r=e;if(r.resolveTextureOutputIDs[n]===void 0){const i=r.renderTargetIDs[n],s=this.createResolveTextureID(i);r.resolveTextureOutputIDs[n]=s}return r.resolveTextureOutputIDs[n]}findPassForResolveRenderTarget(e){const n=be(this.findMostRecentPassThatAttachedRenderTarget(e)),r=n.renderTargetIDs.indexOf(e);return U(n.resolveTextureOutputExternalTextures[r]===void 0),n}resolveRenderTarget(e){const n=this.findPassForResolveRenderTarget(e),r=n.renderTargetIDs.indexOf(e);return this.resolveRenderTargetPassAttachmentSlot(n,r)}resolveRenderTargetToExternalTexture(e,n,r=0){const i=this.findPassForResolveRenderTarget(e),s=i.renderTargetIDs.indexOf(e);U(i.resolveTextureOutputIDs[s]===void 0),i.resolveTextureOutputExternalTextures[s]=n,i.resolveTextureOutputExternalTextureLevel[s]=r}getRenderTargetDescription(e){return be(this.currentGraph.renderTargetDescriptions[e])}scheduleAddUseCount(e,n){for(let r=0;r<n.renderTargetIDs.length;r++){const i=n.renderTargetIDs[r];i!==void 0&&(this.renderTargetOutputCount[i]++,n.renderTargetExtraRefs[r]&&this.renderTargetOutputCount[i]++)}for(let r=0;r<n.resolveTextureInputIDs.length;r++){const i=n.resolveTextureInputIDs[r];if(i===void 0)continue;this.resolveTextureUseCount[i]++;const s=e.resolveTextureRenderTargetIDs[i];this.renderTargetResolveCount[s]++}}acquireRenderTargetForID(e,n){if(n===void 0)return null;if(U(this.renderTargetOutputCount[n]>0),!this.renderTargetAliveForID[n]){const r=e.renderTargetDescriptions[n],i=this.acquireRenderTargetForDescription(r);i.setDebugName(this.device,e.renderTargetDebugNames[n]),this.renderTargetAliveForID[n]=i}return this.renderTargetAliveForID[n]}releaseRenderTargetForID(e,n){if(e===void 0)return null;const r=be(this.renderTargetAliveForID[e]);return n?(U(this.renderTargetOutputCount[e]>0),this.renderTargetOutputCount[e]--):(U(this.renderTargetResolveCount[e]>0),this.renderTargetResolveCount[e]--),this.renderTargetOutputCount[e]===0&&this.renderTargetResolveCount[e]===0&&(r.needsClear=!0,delete this.renderTargetAliveForID[e],this.renderTargetDeadPool.push(r)),r}acquireResolveTextureInputTextureForID(e,n){const r=e.resolveTextureRenderTargetIDs[n];U(this.resolveTextureUseCount[n]>0),this.resolveTextureUseCount[n]--;const i=be(this.releaseRenderTargetForID(r,!1));if(this.singleSampledTextureForResolveTextureID[n]!==void 0){const s=this.singleSampledTextureForResolveTextureID[n];return this.resolveTextureUseCount[n]===0&&this.singleSampledTextureDeadPool.push(s),s.texture}else return be(i.texture)}determineResolveParam(e,n,r){const i=n.renderTargetIDs[r],s=n.resolveTextureOutputIDs[r],a=n.resolveTextureOutputExternalTextures[r],o=s!==void 0,l=a!==void 0;U(!(o&&l));let c=null,u=!1,h=0;if(this.renderTargetOutputCount[i]>1&&(u=!0),o){U(e.resolveTextureRenderTargetIDs[s]===i),U(this.resolveTextureUseCount[s]>0),U(this.renderTargetOutputCount[i]>0);const _=be(this.renderTargetAliveForID[i]);if(_.texture!==null&&this.renderTargetOutputCount[i]===1)c=null,u=!0;else{if(!this.singleSampledTextureForResolveTextureID[s]){const p=be(e.renderTargetDescriptions[i]);this.singleSampledTextureForResolveTextureID[s]=this.acquireSingleSampledTextureForDescription(p),this.device.setResourceName(this.singleSampledTextureForResolveTextureID[s].texture,_.debugName+` (Resolve ${s})`)}c=this.singleSampledTextureForResolveTextureID[s].texture}}else l?(c=a,h=n.resolveTextureOutputExternalTextureLevel[r]):c=null;return{resolveTo:c,store:u,level:h}}schedulePass(e,n){const r=n.renderTargetIDs[Qe.DepthStencil];for(let u=Qe.Color0;u<=Qe.ColorMax;u++){const h=n.renderTargetIDs[u],_=this.acquireRenderTargetForID(e,h);n.renderTargets[u]=_,n.descriptor.colorAttachment[u]=_!==null?_.attachment:null,n.descriptor.colorAttachmentLevel[u]=n.renderTargetLevels[u];const{resolveTo:p,store:f,level:g}=this.determineResolveParam(e,n,u);n.descriptor.colorResolveTo[u]=p,n.descriptor.colorResolveToLevel[u]=g,n.descriptor.colorStore[u]=f,n.descriptor.colorClearColor[u]=_!==null&&_.needsClear?e.renderTargetDescriptions[h].colorClearColor:"load"}const i=this.acquireRenderTargetForID(e,r);n.renderTargets[Qe.DepthStencil]=i,n.descriptor.depthStencilAttachment=i!==null?i.attachment:null;const{resolveTo:s,store:a}=this.determineResolveParam(e,n,Qe.DepthStencil);n.descriptor.depthStencilResolveTo=s,n.descriptor.depthStencilStore=a,n.descriptor.depthClearValue=i!==null&&i.needsClear?e.renderTargetDescriptions[r].depthClearValue:"load",n.descriptor.stencilClearValue=i!==null&&i.needsClear?e.renderTargetDescriptions[r].stencilClearValue:"load";let o=0,l=0,c=0;for(let u=0;u<n.renderTargets.length;u++){const h=n.renderTargets[u];if(!h)continue;const _=h.width>>>n.renderTargetLevels[u],p=h.height>>>n.renderTargetLevels[u];o===0&&(o=_,l=p,c=h.sampleCount),U(_===o),U(p===l),U(h.sampleCount===c),h.needsClear=!1}o>0&&l>0&&(n.viewportX*=o,n.viewportY*=l,n.viewportW*=o,n.viewportH*=l);for(let u=0;u<n.resolveTextureInputIDs.length;u++){const h=n.resolveTextureInputIDs[u];n.resolveTextureInputTextures[u]=this.acquireResolveTextureInputTextureForID(e,h)}for(let u=0;u<n.renderTargetIDs.length;u++)this.releaseRenderTargetForID(n.renderTargetIDs[u],!0);for(let u=0;u<n.renderTargetExtraRefs.length;u++)n.renderTargetExtraRefs[u]&&this.releaseRenderTargetForID(n.renderTargetIDs[u],!0)}scheduleGraph(e){U(this.renderTargetOutputCount.length===0),U(this.renderTargetResolveCount.length===0),U(this.resolveTextureUseCount.length===0);for(let r=0;r<this.renderTargetDeadPool.length;r++)this.renderTargetDeadPool[r].age++;for(let r=0;r<this.singleSampledTextureDeadPool.length;r++)this.singleSampledTextureDeadPool[r].age++;rs(this.renderTargetOutputCount,e.renderTargetDescriptions.length,0),rs(this.renderTargetResolveCount,e.renderTargetDescriptions.length,0),rs(this.resolveTextureUseCount,e.resolveTextureRenderTargetIDs.length,0);for(let r=0;r<e.passes.length;r++)this.scheduleAddUseCount(e,e.passes[r]);for(let r=0;r<e.passes.length;r++)this.schedulePass(e,e.passes[r]);for(let r=0;r<this.renderTargetOutputCount.length;r++)U(this.renderTargetOutputCount[r]===0);for(let r=0;r<this.renderTargetResolveCount.length;r++)U(this.renderTargetResolveCount[r]===0);for(let r=0;r<this.resolveTextureUseCount.length;r++)U(this.resolveTextureUseCount[r]===0);for(let r=0;r<this.renderTargetAliveForID.length;r++)U(this.renderTargetAliveForID[r]===void 0);const n=1;for(let r=0;r<this.renderTargetDeadPool.length;r++)this.renderTargetDeadPool[r].age>=n&&(this.renderTargetDeadPool[r].destroy(),this.renderTargetDeadPool.splice(r--,1));for(let r=0;r<this.singleSampledTextureDeadPool.length;r++)this.singleSampledTextureDeadPool[r].age>=n&&(this.singleSampledTextureDeadPool[r].destroy(),this.singleSampledTextureDeadPool.splice(r--,1));this.renderTargetResolveCount.length=0,this.renderTargetOutputCount.length=0,this.resolveTextureUseCount.length=0}execPass(e){U(this.currentPass===null),this.currentPass=e;const n=this.device.createRenderPass(e.descriptor);n.pushDebugGroup(e.debugName),n.setViewport(e.viewportX,e.viewportY,e.viewportW,e.viewportH),e.execFunc!==null&&e.execFunc(n,this),n.popDebugGroup(),this.device.submitPass(n),e.postFunc!==null&&e.postFunc(this),this.currentPass=null}execGraph(e){this.scheduleGraph(e),this.device.beginFrame(),e.passes.forEach(n=>{this.execPass(n)}),this.device.endFrame(),this.singleSampledTextureForResolveTextureID.length=0}execute(){const e=be(this.currentGraph);this.execGraph(e),this.currentGraph=null}getDebug(){return this}getPasses(){return this.currentGraph.passes}getPassDebugThumbnails(e){return e.debugThumbnails}getPassRenderTargetID(e,n){return e.renderTargetIDs[n]}getRenderTargetIDDebugName(e){return this.currentGraph.renderTargetDebugNames[e]}getResolveTextureForID(e){const n=this.currentPass,r=n.resolveTextureInputIDs.indexOf(e);return U(r>=0),be(n.resolveTextureInputTextures[r])}getRenderTargetAttachment(e){const r=this.currentPass.renderTargets[e];return r?r.attachment:null}getRenderTargetTexture(e){const r=this.currentPass.renderTargets[e];return r?r.texture:null}newGraphBuilder(){return this.beginGraphBuilder(),this}destroy(){for(let e=0;e<this.renderTargetAliveForID.length;e++)U(this.renderTargetAliveForID[e]===void 0);for(let e=0;e<this.singleSampledTextureForResolveTextureID.length;e++)U(this.singleSampledTextureForResolveTextureID[e]===void 0);for(let e=0;e<this.renderTargetDeadPool.length;e++)this.renderTargetDeadPool[e].destroy();for(let e=0;e<this.singleSampledTextureDeadPool.length;e++)this.singleSampledTextureDeadPool[e].destroy()}}ao(1,0,0,0,0,1,0,0,0,0,2,0,0,0,-1,1);ao(1,0,0,0,0,1,0,0,0,0,.5,0,0,0,.5,1);function Cd(t,e,n,r=0,i=0,s=0){return t[e+0]=n,t[e+1]=r,t[e+2]=i,t[e+3]=s,4}var zs=(t=>(t[t.None=0]="None",t[t.Indexed=1]="Indexed",t[t.AllowSkippingIfPipelineNotReady=2]="AllowSkippingIfPipelineNotReady",t[t.Template=4]="Template",t[t.Draw=8]="Draw",t[t.InheritedFlags=3]="InheritedFlags",t))(zs||{});class Md{constructor(){this.sortKey=0,this.debug=null,this.uniforms=[],this.bindingDescriptors=Nn(1,()=>({bindingLayout:null,samplerBindings:[],uniformBufferBindings:[],storageBufferBindings:[],storageTextureBindings:[]})),this.dynamicUniformBufferByteOffsets=Nn(10,()=>0),this.flags=0,this.vertexBuffers=null,this.indexBuffer=null,this.drawStart=0,this.drawCount=0,this.drawInstanceCount=0,this.renderPipelineDescriptor={inputLayout:null,megaStateDescriptor:Vr(Jn),program:null,topology:Re.TRIANGLES,colorAttachmentFormats:[],depthStencilAttachmentFormat:null,sampleCount:1},this.reset()}reset(){this.sortKey=0,this.flags=2,this.vertexBuffers=null,this.indexBuffer=null,this.renderPipelineDescriptor.inputLayout=null,this.bindingDescriptors=Nn(1,()=>({bindingLayout:null,samplerBindings:[],uniformBufferBindings:[],storageBufferBindings:[],storageTextureBindings:[]}))}setFromTemplate(e){var i,s,a,o;vs(this.renderPipelineDescriptor.megaStateDescriptor,e.renderPipelineDescriptor.megaStateDescriptor),this.renderPipelineDescriptor.program=e.renderPipelineDescriptor.program,this.renderPipelineDescriptor.inputLayout=e.renderPipelineDescriptor.inputLayout,this.renderPipelineDescriptor.topology=e.renderPipelineDescriptor.topology,this.renderPipelineDescriptor.colorAttachmentFormats.length=Math.max(this.renderPipelineDescriptor.colorAttachmentFormats.length,e.renderPipelineDescriptor.colorAttachmentFormats.length);for(let l=0;l<e.renderPipelineDescriptor.colorAttachmentFormats.length;l++)this.renderPipelineDescriptor.colorAttachmentFormats[l]=e.renderPipelineDescriptor.colorAttachmentFormats[l];this.renderPipelineDescriptor.depthStencilAttachmentFormat=e.renderPipelineDescriptor.depthStencilAttachmentFormat,this.renderPipelineDescriptor.sampleCount=e.renderPipelineDescriptor.sampleCount,this.uniformBuffer=e.uniformBuffer,this.uniforms=[...e.uniforms],this.drawCount=e.drawCount,this.drawStart=e.drawStart,this.drawInstanceCount=e.drawInstanceCount,this.vertexBuffers=e.vertexBuffers,this.indexBuffer=e.indexBuffer,this.flags=this.flags&-4|e.flags&3,this.sortKey=e.sortKey;const n=this.bindingDescriptors[0],r=e.bindingDescriptors[0];this.setBindingLayout({numSamplers:(i=r.samplerBindings)==null?void 0:i.length,numUniformBuffers:(s=r.uniformBufferBindings)==null?void 0:s.length,numStorageBuffers:(a=r.storageBufferBindings)==null?void 0:a.length,numStorageTextures:(o=r.storageTextureBindings)==null?void 0:o.length});for(let l=0;l<Math.min(n.uniformBufferBindings.length,r.uniformBufferBindings.length);l++)n.uniformBufferBindings[l].size=e.bindingDescriptors[0].uniformBufferBindings[l].size;this.setSamplerBindingsFromTextureMappings(r.samplerBindings);for(let l=0;l<Math.min(n.storageBufferBindings.length,r.storageBufferBindings.length);l++)n.storageBufferBindings[l].size=e.bindingDescriptors[0].storageBufferBindings[l].size;for(let l=0;l<e.dynamicUniformBufferByteOffsets.length;l++)this.dynamicUniformBufferByteOffsets[l]=e.dynamicUniformBufferByteOffsets[l]}validate(){var e;for(let n=0;n<this.bindingDescriptors.length;n++){const r=this.bindingDescriptors[n];for(let i=0;i<((e=r.uniformBufferBindings)==null?void 0:e.length);i++)U(r.uniformBufferBindings[i].size>0)}U(this.drawCount>0)}setProgram(e){this.renderPipelineDescriptor.program=e}setMegaStateFlags(e){return vs(this.renderPipelineDescriptor.megaStateDescriptor,e),this.renderPipelineDescriptor.megaStateDescriptor}getMegaStateFlags(){return this.renderPipelineDescriptor.megaStateDescriptor}setVertexInput(e,n,r){this.vertexBuffers=n,this.indexBuffer=r,this.renderPipelineDescriptor.inputLayout=e}setBindingLayout(e){U(e.numUniformBuffers<this.dynamicUniformBufferByteOffsets.length);for(let n=this.bindingDescriptors[0].uniformBufferBindings.length;n<e.numUniformBuffers;n++)this.bindingDescriptors[0].uniformBufferBindings.push({binding:n,buffer:null,size:0});for(let n=this.bindingDescriptors[0].samplerBindings.length;n<e.numSamplers;n++)this.bindingDescriptors[0].samplerBindings.push({sampler:null,texture:null});for(let n=this.bindingDescriptors[0].storageBufferBindings.length;n<e.numStorageBuffers;n++)this.bindingDescriptors[0].storageBufferBindings.push({binding:n,buffer:null});for(let n=this.bindingDescriptors[0].storageTextureBindings.length;n<e.numStorageTextures;n++)this.bindingDescriptors[0].storageTextureBindings.push({binding:n,texture:null})}drawIndexes(e,n=0){this.flags=Qr(this.flags,1,!0),this.drawCount=e,this.drawStart=n,this.drawInstanceCount=1}drawIndexesInstanced(e,n,r=0){this.flags=Qr(this.flags,1,!0),this.drawCount=e,this.drawStart=r,this.drawInstanceCount=n}drawPrimitives(e,n=0){this.flags=Qr(this.flags,1,!1),this.drawCount=e,this.drawStart=n,this.drawInstanceCount=1}setUniforms(e,n){if(n.length===0)return;this.uniforms[e]=n;let r=0;const i=[];n.forEach(l=>{const{value:c}=l;if(Da(c)||Array.isArray(c)||c instanceof Float32Array){const u=Da(c)?[c]:c,h=u.length>4?4:u.length,_=4-r%4;if(_!==4&&!(_>=h)){r+=_;for(let p=0;p<_;p++)i.push(0)}r+=u.length,i.push(...u)}});const s=4-i.length%4;if(s!==4)for(let l=0;l<s;l++)i.push(0);let a=this.allocateUniformBuffer(e,i.length);const o=this.mapUniformBufferF32(e);for(let l=0;l<i.length;l+=4)a+=Cd(o,a,i[l],i[l+1],i[l+2],i[l+3])}setUniformBuffer(e){this.uniformBuffer=e}setStorageBuffers(e,n){if(this.bindingDescriptors[0].storageBufferBindings.length)for(let r=0;r<this.bindingDescriptors[0].storageBufferBindings.length;r++){const i=this.bindingDescriptors[0].storageBufferBindings[r];i.binding=n[r],i.buffer=e[r]}}allocateUniformBuffer(e,n){var i;U(((i=this.bindingDescriptors[0].uniformBufferBindings)==null?void 0:i.length)<this.dynamicUniformBufferByteOffsets.length),this.dynamicUniformBufferByteOffsets[e]=this.uniformBuffer.allocateChunk(n)<<2;const r=this.bindingDescriptors[0].uniformBufferBindings[e];return r.size=n<<2,this.getUniformBufferOffset(e)}getUniformBufferOffset(e){return this.dynamicUniformBufferByteOffsets[e]>>>2}mapUniformBufferF32(e){return this.uniformBuffer.mapBufferF32()}mapBufferU8(e){return this.uniformBuffer.mapBufferU8()}getUniformBuffer(){return this.uniformBuffer}setSamplerBindingsFromTextureMappings(e){e=e.filter(n=>n);for(let n=0;n<this.bindingDescriptors[0].samplerBindings.length;n++){const r=this.bindingDescriptors[0].samplerBindings[n],i=e[n];if(i==null){r.texture=null,r.sampler=null;continue}r.texture=i.texture,r.sampler=i.sampler}}setAllowSkippingIfPipelineNotReady(e){this.flags=Qr(this.flags,2,e)}setAttachmentFormatsFromRenderPass(e,n){const r=e.queryRenderPass(n);let i=-1;for(let a=0;a<r.colorAttachment.length;a++){const o=r.colorAttachment[a]!==null?e.queryRenderTarget(r.colorAttachment[a]):null;this.renderPipelineDescriptor.colorAttachmentFormats[a]=o!==null?o.format:null,o!==null&&(i===-1?i=o.sampleCount:U(i===o.sampleCount))}const s=r.depthStencilAttachment!==null?e.queryRenderTarget(r.depthStencilAttachment):null;this.renderPipelineDescriptor.depthStencilAttachmentFormat=s!==null?s.format:null,s!==null&&(i===-1?i=s.sampleCount:U(i==s.sampleCount)),U(i>0),this.renderPipelineDescriptor.sampleCount=i}drawOnPass(e,n){const r=e.device;this.setAttachmentFormatsFromRenderPass(r,n);const i=e.createRenderPipeline(this.renderPipelineDescriptor);if(!r.pipelineQueryReady(i)){if(this.flags&2)return!1;r.pipelineForceReady(i)}n.setPipeline(i),n.setVertexInput(this.renderPipelineDescriptor.inputLayout,this.vertexBuffers,this.indexBuffer);for(let o=0;o<this.bindingDescriptors[0].uniformBufferBindings.length;o++)this.bindingDescriptors[0].uniformBufferBindings[o].buffer=be(this.uniformBuffer.buffer),this.bindingDescriptors[0].uniformBufferBindings[o].offset=this.dynamicUniformBufferByteOffsets[o];this.renderPipelineDescriptor.program.gl_program&&this.uniforms.forEach(o=>{const l={};o.forEach(({name:c,value:u})=>{l[c]=u}),this.renderPipelineDescriptor.program.setUniformsLegacy(l)});const a=e.createBindings({...this.bindingDescriptors[0],pipeline:i});return n.setBindings(a),this.flags&1?n.drawIndexed(this.drawCount,this.drawInstanceCount,this.drawStart,0,0):n.draw(this.drawCount,this.drawInstanceCount,this.drawStart,0),!0}}function Bd(t,e){return t.sortKey-e.sortKey}class Fo{constructor(e=Bd,n=0){this.renderInsts=[],this.usePostSort=!1,this.compareFunction=e,this.executionOrder=n}checkUsePostSort(){this.usePostSort=this.compareFunction!==null&&this.renderInsts.length>=500}insertSorted(e){this.compareFunction===null?this.renderInsts.push(e):this.usePostSort?this.renderInsts.push(e):Jl(this.renderInsts,e,this.compareFunction),this.checkUsePostSort()}submitRenderInst(e){e.flags|=zs.Draw,this.insertSorted(e)}ensureSorted(){this.usePostSort&&(this.renderInsts.length!==0&&this.renderInsts.sort(this.compareFunction),this.usePostSort=!1)}drawOnPassRendererNoReset(e,n){if(this.ensureSorted(),this.executionOrder===0)for(let r=0;r<this.renderInsts.length;r++)this.renderInsts[r].drawOnPass(e,n);else for(let r=this.renderInsts.length-1;r>=0;r--)this.renderInsts[r].drawOnPass(e,n)}reset(){this.renderInsts.length=0}drawOnPassRenderer(e,n){this.drawOnPassRendererNoReset(e,n),this.reset()}}class Va{constructor(){this.pool=[],this.allocCount=0}allocRenderInstIndex(){return this.allocCount++,this.allocCount>this.pool.length&&this.pool.push(new Md),this.allocCount-1}popRenderInst(){this.allocCount--}reset(){for(let e=0;e<this.pool.length;e++)this.pool[e].reset();this.allocCount=0}destroy(){this.pool.length=0,this.allocCount=0}}class Dd{constructor(e){this.renderCache=e,this.instPool=new Va,this.templatePool=new Va,this.simpleRenderInstList=new Fo,this.currentRenderInstList=this.simpleRenderInstList}newRenderInst(){const e=this.templatePool.allocCount-1,n=this.instPool.allocRenderInstIndex(),r=this.instPool.pool[n];return r.debug=null,e>=0&&r.setFromTemplate(this.templatePool.pool[e]),r}submitRenderInst(e,n=this.currentRenderInstList){n.submitRenderInst(e)}setCurrentRenderInstList(e){U(this.simpleRenderInstList===null),this.currentRenderInstList=e}pushTemplateRenderInst(){const e=this.templatePool.allocCount-1,n=this.templatePool.allocRenderInstIndex(),r=this.templatePool.pool[n];return e>=0&&r.setFromTemplate(this.templatePool.pool[e]),r.flags|=zs.Template,r}popTemplateRenderInst(){this.templatePool.popRenderInst()}getTemplateRenderInst(){const e=this.templatePool.allocCount-1;return this.templatePool.pool[e]}resetRenderInsts(){this.instPool.reset(),this.simpleRenderInstList!==null&&this.simpleRenderInstList.reset(),U(this.templatePool.allocCount===0)}destroy(){this.instPool.destroy(),this.renderCache.destroy()}disableSimpleMode(){this.simpleRenderInstList=null}drawOnPassRenderer(e){be(this.simpleRenderInstList).drawOnPassRenderer(this.renderCache,e)}drawOnPassRendererNoReset(e){be(this.simpleRenderInstList).drawOnPassRendererNoReset(this.renderCache,e)}}class Pd{getDevice(){return this.device}setDevice(e){this.device=e,this.renderCache=new bd(e),this.renderGraph=new Od(this.device),this.renderInstManager=new Dd(this.renderCache),this.uniformBuffer=new pd(this.device)}pushTemplateRenderInst(){const e=this.renderInstManager.pushTemplateRenderInst();return e.setUniformBuffer(this.uniformBuffer),e}prepareToRender(){this.uniformBuffer.prepareToRender()}destroy(){this.uniformBuffer&&this.uniformBuffer.destroy(),this.renderInstManager&&this.renderInstManager.destroy(),this.renderCache&&this.renderCache.destroy(),this.renderGraph&&this.renderGraph.destroy()}getCache(){return this.renderCache}getDefines(){return{}}}class Ud{constructor(e){this.format=e,this.width=0,this.height=0,this.sampleCount=0,this.colorClearColor="load",this.depthClearValue="load",this.stencilClearValue="load"}setDimensions(e,n,r){this.width=e,this.height=n,this.sampleCount=r}copyDimensions(e){this.width=e.width,this.height=e.height,this.sampleCount=e.sampleCount}}function ks(t){return{colorClearColor:t,depthClearValue:0,stencilClearValue:0}}ks(Lr(.88,.88,.88,1));const Fd=ks(go);var Lo=(t=>(t[t.None=0]="None",t[t.FXAA=1]="FXAA",t[t.MSAAx4=2]="MSAAx4",t))(Lo||{});function Ld(t){if(t===Qe.Color0)return w.U8_RGBA_RT;if(t===Qe.DepthStencil)return w.D24_S8;throw new Error("whoops")}function Vd(t){return t.antialiasingMode===2?4:1}function Hd(t,e){const n=Vd(e);t.setDimensions(e.backbufferWidth,e.backbufferHeight,n)}function Ha(t,e,n){const r=Ld(t),i=new Ud(r);return Hd(i,e),n!==null&&(i.colorClearColor=n.colorClearColor,i.depthClearValue=n.depthClearValue,i.stencilClearValue=n.stencilClearValue),i}class qi{constructor(){this.texture=null,this.sampler=null,this.width=0,this.height=0,this.lodBias=0}reset(){this.texture=null,this.sampler=null,this.width=0,this.height=0,this.lodBias=0}copy(e){this.texture=e.texture,this.sampler=e.sampler,this.width=e.width,this.height=e.height,this.lodBias=e.lodBias}}const zd=`#define_import_path render::globals

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
};`,kd=`#define_import_path render::maths

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
`,Xd=`#define_import_path pbr::utils
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
`,Wd=`#define_import_path pbr::rgb9e5

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
`,bs=`#import render::view::View
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
`,$d=`#define_import_path render::view

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
`,jd=`#define_import_path render::instance_index

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
`,qd=`#define_import_path pbr::mesh_types

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
`,Yd=`#define_import_path pbr::mesh_bindings

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
`,Kd=`#define_import_path pbr::mesh_view_types

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
`,Qd=`#define_import_path pbr::mesh_view_bindings

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
`,Zd=`#define_import_path pbr::view_transformations

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
`,Gd=`#define_import_path pbr::prepass_utils

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
`,Jd=`#define_import_path pbr::prepass_io

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
`,ef=`#define_import_path pbr::forward_io

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
`,tf=`#define_import_path pbr::pbr_types

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
`,nf=`#define_import_path pbr::pbr_bindings

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
`,rf=`#define_import_path pbr::lighting

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
`,sf=`#define_import_path pbr::ambient

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
`,af=`#define_import_path pbr::fog

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
`,of=`#define_import_path pbr::pbr_functions

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
`,lf=`#define_import_path pbr::mesh_functions

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
`,cf=`#define_import_path core_pipeline::tonemapping

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
`,uf=`#define_import_path pbr::gtao_utils

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
`,hf=`#define_import_path pbr::pbr_fragment

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
`;class Xs extends V{constructor(){super(...arguments),this.appConfig=this.singleton.read($e)}async prepare(){const{canvas:e,shaderCompilerPath:n}=this.appConfig,i=await new Du({shaderCompilerPath:n}).createSwapChain(e);this.swapChain=i,i.configureSwapChain(e.width,e.height);const s=i.getDevice();this.device=s,e.addEventListener("resize",()=>{i.configureSwapChain(e.width,e.height)}),this.registerShaderModule(zd),this.registerShaderModule(kd),this.registerShaderModule(Wd),this.registerShaderModule(Xd),this.registerShaderModule(ef),this.registerShaderModule($d),this.registerShaderModule(jd),this.registerShaderModule(qd),this.registerShaderModule(Yd),this.registerShaderModule(Kd),this.registerShaderModule(Qd),this.registerShaderModule(Zd),this.registerShaderModule(Gd),this.registerShaderModule(Jd),this.registerShaderModule(lf),this.registerShaderModule(bs),this.registerShaderModule(cf),this.registerShaderModule(tf),this.registerShaderModule(nf),this.registerShaderModule(rf),this.registerShaderModule(sf),this.registerShaderModule(af),this.registerShaderModule(of),this.registerShaderModule(uf),this.registerShaderModule(hf)}initialize(){const e=new Pd;this.renderHelper=e,e.setDevice(this.device),e.renderInstManager.disableSimpleMode()}finalize(){this.renderHelper.destroy(),this.device.destroy(),this.device.checkForLeaks()}registerShaderModule(e){return this.device.WGSLComposer.wgsl_compile(e)}}var _f=Object.defineProperty,df=Object.getOwnPropertyDescriptor,Ws=(t,e,n,r)=>{for(var i=r>1?void 0:r?df(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&_f(e,n,i),i};class yn{constructor(e,n,r){this.name=e,this.id=n,this.format=r}}const Et=class Er{static from(e){return e.toMesh()}constructor(e=Re.TRIANGLES){this.primitive_topology=e,this.attributes=[]}with_inserted_attribute(e,n){return this.insert_attribute(e,n),this}insert_attribute(e,n){this.contains_attribute(e)&&this.remove_attribute(e),this.attributes.push([e,n])}with_removed_attribute(e){return this.remove_attribute(e),this}remove_attribute(e){const n=this.attributes.findIndex(([i,s])=>i.id===e.id),r=this.attributes[n][1];return this.attributes.splice(n,1),r}contains_attribute(e){return this.attributes.some(([n,r])=>n.id===e.id)}attribute(e){return this.attributes.find(([n,r])=>n.name===e.name)[1]}with_indices(e){return this.set_indices(e),this}set_indices(e){this.indices=e}count_vertices(){let e=0;return this.attributes.forEach(([n,r])=>{let i=r.length;e?i!==e&&(console.warn(`${n.name} has a different vertex count (${i}) than other attributes (${e}) in this mesh, all attributes will be truncated to match the smallest.`),e=Math.min(i,e)):e=i}),e}duplicate_vertices(){const e=(n,r)=>r.map(i=>n[i]);this.attributes.forEach(n=>{const[r,i]=n;this.indices&&(n[1]=e(i,this.indices))})}with_duplicated_vertices(){return this.duplicate_vertices(),this}compute_flat_normals(){if(this.indices)throw new Error("`compute_flat_normals` can't work on indexed geometry. Consider calling `Mesh::duplicate_vertices`.");if(this.primitive_topology!==Re.TRIANGLES)throw new Error("`compute_flat_normals` can only work on `TriangleList`s");const e=this.attribute(Er.ATTRIBUTE_POSITION),n=Co(E_(e,3).map(([r,i,s])=>{const a=ff(r,i,s);return[a,a,a]}));this.insert_attribute(Er.ATTRIBUTE_NORMAL,n)}with_computed_flat_normals(){return this.compute_flat_normals(),this}generate_tangents(){const e=pf(this);this.insert_attribute(Er.ATTRIBUTE_TANGENT,e)}with_generated_tangents(){return this.generate_tangents(),this}compute_aabb(){const e=this.attribute(Er.ATTRIBUTE_POSITION);return rd.enclosing(e)}};Et.ATTRIBUTE_POSITION=new yn("Vertex_Position",0,w.F32_RGB);Et.ATTRIBUTE_NORMAL=new yn("Vertex_Normal",1,w.F32_RGB);Et.ATTRIBUTE_UV_0=new yn("Vertex_Uv",2,w.F32_RG);Et.ATTRIBUTE_UV_1=new yn("Vertex_Uv_1",3,w.F32_RG);Et.ATTRIBUTE_TANGENT=new yn("Vertex_Tangent",4,w.F32_RGBA);Et.ATTRIBUTE_COLOR=new yn("Vertex_Color",5,w.F32_RGBA);Et.ATTRIBUTE_JOINT_WEIGHT=new yn("Vertex_JointWeight",6,w.F32_RGBA);Et.ATTRIBUTE_JOINT_INDEX=new yn("Vertex_JointIndex",7,w.U16_RGBA_5551);Ws([A.object],Et.prototype,"attributes",2);Ws([A.object],Et.prototype,"indices",2);Ws([A.object],Et.prototype,"primitive_topology",2);let $=Et;function ff(t,e,n){const r=new y(t[0],t[1],t[2]),i=new y(e[0],e[1],e[2]),s=new y(n[0],n[1],n[2]),a=i.sub(r).cross(s.sub(r)).normalize();return[a.x,a.y,a.z]}function pf(t){if(t.primitive_topology!==Re.TRIANGLES)throw new Error("Unsupported topology when generating tangents");const e=t.attribute($.ATTRIBUTE_POSITION);t.attribute($.ATTRIBUTE_NORMAL),t.attribute($.ATTRIBUTE_UV_0);const n=e.length;return new Array(n).fill([0,0,0,0]),[]}class $s{static from_corners(e,n){const r=e.max(n),i=e.min(n),s=r.x-i.x,a=r.y-i.y,o=r.z-i.z;return new $s(s,a,o)}constructor(e=2,n=1,r=1){this.max_x=e/2,this.min_x=-e/2,this.max_y=n/2,this.min_y=-n/2,this.max_z=r/2,this.min_z=-r/2}toMesh(){const e=this,n=[[[e.min_x,e.min_y,e.max_z],[0,0,1],[0,0]],[[e.max_x,e.min_y,e.max_z],[0,0,1],[1,0]],[[e.max_x,e.max_y,e.max_z],[0,0,1],[1,1]],[[e.min_x,e.max_y,e.max_z],[0,0,1],[0,1]],[[e.min_x,e.max_y,e.min_z],[0,0,-1],[1,0]],[[e.max_x,e.max_y,e.min_z],[0,0,-1],[0,0]],[[e.max_x,e.min_y,e.min_z],[0,0,-1],[0,1]],[[e.min_x,e.min_y,e.min_z],[0,0,-1],[1,1]],[[e.max_x,e.min_y,e.min_z],[1,0,0],[0,0]],[[e.max_x,e.max_y,e.min_z],[1,0,0],[1,0]],[[e.max_x,e.max_y,e.max_z],[1,0,0],[1,1]],[[e.max_x,e.min_y,e.max_z],[1,0,0],[0,1]],[[e.min_x,e.min_y,e.max_z],[-1,0,0],[1,0]],[[e.min_x,e.max_y,e.max_z],[-1,0,0],[0,0]],[[e.min_x,e.max_y,e.min_z],[-1,0,0],[0,1]],[[e.min_x,e.min_y,e.min_z],[-1,0,0],[1,1]],[[e.max_x,e.max_y,e.min_z],[0,1,0],[1,0]],[[e.min_x,e.max_y,e.min_z],[0,1,0],[0,0]],[[e.min_x,e.max_y,e.max_z],[0,1,0],[0,1]],[[e.max_x,e.max_y,e.max_z],[0,1,0],[1,1]],[[e.max_x,e.min_y,e.max_z],[0,-1,0],[0,0]],[[e.min_x,e.min_y,e.max_z],[0,-1,0],[1,0]],[[e.min_x,e.min_y,e.min_z],[0,-1,0],[1,1]],[[e.max_x,e.min_y,e.min_z],[0,-1,0],[0,1]]],r=n.map(([o,l,c])=>o),i=n.map(([o,l,c])=>l),s=n.map(([o,l,c])=>c),a=[0,1,2,2,3,0,4,5,6,6,7,4,8,9,10,10,11,8,12,13,14,14,15,12,16,17,18,18,19,16,20,21,22,22,23,20];return new $(Re.TRIANGLES).with_inserted_attribute($.ATTRIBUTE_POSITION,r).with_inserted_attribute($.ATTRIBUTE_NORMAL,i).with_inserted_attribute($.ATTRIBUTE_UV_0,s).with_indices(a)}}class Rn{constructor(e=1){this.size=e}toMesh(){return new $s(this.size,this.size,this.size).toMesh()}}class js{static from_size(e){return new js(e,0)}constructor(e=1,n=0){this.size=e,this.subdivisions=n}toMesh(){const e=this.subdivisions+2,n=this.subdivisions+2,r=y.Y.to_array(),i=[],s=[],a=[],o=[];for(let l=0;l<e;l++)for(let c=0;c<n;c++){const u=c/(n-1),h=l/(e-1);i.push([(-.5+u)*this.size,0,(-.5+h)*this.size]),s.push(r),a.push([u,h])}for(let l=0;l<e-1;l++)for(let c=0;c<n-1;c++){const u=l*n+c;o.push(u+n+1),o.push(u+1),o.push(u+n),o.push(u),o.push(u+n),o.push(u+1)}return new $(Re.TRIANGLES).with_indices(o).with_inserted_attribute($.ATTRIBUTE_POSITION,i).with_inserted_attribute($.ATTRIBUTE_NORMAL,s).with_inserted_attribute($.ATTRIBUTE_UV_0,a)}}const mf=0,gf=0;class Yi extends V{constructor(){super(),this.pipeline=this.attach(Dn),this.cameras=this.query(e=>e.addedOrChanged.with(Ie,z,Ee).trackWrites),this.query(e=>e.using(z).read)}execute(){this.cameras.addedOrChanged.forEach(e=>{const n=e.read(Ie),r=e.read(z),i=e.read(Ee),{exposure:s,gamma:a,pre_saturation:o,post_saturation:l}=i;this.pipeline.passesChanged=!0;const c=Dt.copy(n.projection_matrix),u=n.target_info_physical_size,h=new Te;h.from(r);const _=y.copy(h.translation),p=h.compute_matrix(),f=p.inverse(),g=c.mul(f);this.prepareUniforms=(m,E=gf)=>{m.setUniforms(E,[{name:"view_proj",value:g.to_cols_array_2d()},{name:"unjittered_view_proj",value:g.to_cols_array_2d()},{name:"inverse_view_proj",value:g.inverse().to_cols_array_2d()},{name:"view",value:p.to_cols_array_2d()},{name:"inverse_view",value:f.to_cols_array_2d()},{name:"projection",value:c.to_cols_array_2d()},{name:"inverse_projection",value:c.inverse().to_cols_array_2d()},{name:"world_position",value:_.to_array()},{name:"viewport",value:[0,0,u[0],u[1]]},{name:"frustum",value:[...P.ZERO.to_array(),...P.ZERO.to_array(),...P.ZERO.to_array(),...P.ZERO.to_array(),...P.ZERO.to_array(),...P.ZERO.to_array()]},{name:"color_grading",value:[s,a,o,l]},{name:"mip_bias",value:0}])}})}}const Ef=0,vf=1,Af=2,yf=3,Rf=4;class Vo extends V{constructor(){super(...arguments),this.pipeline=this.attach(Dn),this.fogs=this.query(e=>e.addedOrChanged.with(ke).trackWrites)}async prepare(){this.prepareUniforms=(e,n)=>{e.setUniforms(n,[{name:"padding",value:new Array(16).fill(0)}])}}execute(){this.fogs.addedOrChanged.forEach(e=>{this.pipeline.passesChanged=!0;const n=e.read(ke),{color:r,directional_light_color:i,directional_light_exponent:s,falloff:a}=n;let o=Ef,l,c=[0,0,0];a instanceof Ne.Linear?(o=vf,l=[a.start,a.end,0]):a instanceof Ne.Exponential?(o=Af,l=[a.density,0,0]):a instanceof Ne.ExponentialSquared?(o=yf,l=[a.density,0,0]):a instanceof Ne.Atmospheric&&(o=Rf,l=a.extinction.to_array(),c=a.inscattering.to_array()),this.prepareUniforms=(u,h)=>{u.setUniforms(h,[{name:"base_color",value:r.as_linear_rgba_f32()},{name:"directional_light_color",value:i.as_linear_rgba_f32()},{name:"be",value:l},{name:"directional_light_exponent",value:s},{name:"bi",value:c},{name:"mode",value:o}])}})}}class Ho{constructor(e,n,r,i=new Fo){this.renderInstManager=e,this.renderCache=n,this.pipeline=r,this.renderList=i,this.init()}draw(e){this.renderList.drawOnPassRenderer(this.renderCache,e)}}function Tf(t,e){return`#define ${t} ${e}`}function Ki(t,e,n){const r=t.WGSLComposer,i=Object.keys(n).map(s=>Tf(s,"")).join(`
`)+`
`;return Object.keys(e).forEach(s=>{e[s].defines&&(e[s].wgsl=i+e[s].wgsl),e[s].wgsl=r.wgsl_compile(e[s].wgsl)}),t.createProgram(e)}function wf(t){switch(Vt(t)){case T.BC1:case T.BC4_SNORM:case T.BC4_UNORM:return 8;case T.BC2:case T.BC3:case T.BC5_SNORM:case T.BC5_UNORM:return 16;default:return _o(t)}}class bf extends Ho{init(){}prepare(){const e=this.pipeline.renderHelper.pushTemplateRenderInst();e.setBindingLayout({numUniformBuffers:4,numSamplers:1,numStorageBuffers:1,numStorageTextures:0}),e.setMegaStateFlags(nc({depthWrite:!0,stencilWrite:!1,depthCompare:Be.GREATER,blendConstant:mo,cullMode:In.BACK},{rgbBlendMode:yt.ADD,alphaBlendMode:yt.ADD,rgbBlendSrcFactor:ce.SRC_ALPHA,alphaBlendSrcFactor:ce.ONE,rgbBlendDstFactor:ce.ONE_MINUS_SRC_ALPHA,alphaBlendDstFactor:ce.ONE_MINUS_SRC_ALPHA})),this.viewUniforms.prepareUniforms(e,0),this.lightsUniforms.prepareUniforms(e,1),this.fogUniforms.prepareUniforms(e,2)}post(){this.renderInstManager.popTemplateRenderInst()}submit(e){const n=this.renderCache.device,r=e.read($),{vertex_shader:i,fragment_shader:s,base_color:a,base_color_texture:o,emissive:l,emissive_texture:c,perceptual_roughness:u,metallic:h,metallic_roughness_texture:_,reflectance:p,diffuse_transmission:f,specular_transmission:g,thickness:m,ior:E,attenuation_distance:v,attenuation_color:x,alpha_mode:C,parallax_depth_scale:k,max_parallax_layer_count:O,deferred_lighting_pass_id:S,occlusion_texture:B,double_sided:W,fog_enabled:J,depth_map:se,unlit:he,specular_transmission_texture:Ce,thickness_texture:ct,diffuse_transmission_texture:je}=e.read(H);let Z=ve.NONE;o&&(Z|=ve.BASE_COLOR_TEXTURE),c&&(Z|=ve.EMISSIVE_TEXTURE),_&&(Z|=ve.METALLIC_ROUGHNESS_TEXTURE),B&&(Z|=ve.OCCLUSION_TEXTURE),W&&(Z|=ve.DOUBLE_SIDED),he&&(Z|=ve.UNLIT),J&&(Z|=ve.FOG_ENABLED),se&&(Z|=ve.DEPTH_MAP),Ce&&(Z|=ve.SPECULAR_TRANSMISSION_TEXTURE),ct&&(Z|=ve.THICKNESS_TEXTURE),je&&(Z|=ve.DIFFUSE_TRANSMISSION_TEXTURE);let an=.5;C instanceof Yt.Opaque?Z|=ve.ALPHA_MODE_OPAQUE:C instanceof Yt.Mask?(an=C.value,Z|=ve.ALPHA_MODE_MASK):C instanceof Yt.Blend?Z|=ve.ALPHA_MODE_BLEND:C instanceof Yt.Premultiplied?Z|=ve.ALPHA_MODE_PREMULTIPLIED:C instanceof Yt.Add?Z|=ve.ALPHA_MODE_ADD:C instanceof Yt.Multiply&&(Z|=ve.ALPHA_MODE_MULTIPLY);const ir=0,Sn=Te.copy(e.read(Te)),$t=Sn.to_transpose().map(ht=>ht.to_array()).flat(),Xr=$t,[Wr,$r]=Sn.inverse_transpose_3x3(),sr=[];sr.push(...$t,...Xr,...Wr,$r,0,0,0);const Pn=n.createBuffer({viewOrSize:new Float32Array(36),usage:ie.STORAGE});Pn.setSubData(0,new Uint8Array(new Float32Array(sr).buffer));const ut={};ut.VERTEX_OUTPUT_INSTANCE_INDEX=1,r.contains_attribute($.ATTRIBUTE_POSITION)&&(ut.VERTEX_POSITIONS=1),r.contains_attribute($.ATTRIBUTE_NORMAL)&&(ut.VERTEX_NORMALS=1),r.contains_attribute($.ATTRIBUTE_UV_0)&&(ut.VERTEX_UVS=1),r.contains_attribute($.ATTRIBUTE_UV_1)&&(ut.VERTEX_UVS_1=1),r.contains_attribute($.ATTRIBUTE_TANGENT)&&(ut.VERTEX_TANGENTS=1),r.contains_attribute($.ATTRIBUTE_COLOR)&&(ut.VERTEX_COLORS=1);const Ye=this.renderInstManager.newRenderInst();Ye.setAllowSkippingIfPipelineNotReady(!1);const Un=Ki(n,{vertex:{wgsl:i,entryPoint:"vertex",defines:!0},fragment:{wgsl:s,entryPoint:"fragment",defines:!0}},ut),ar={vertexBufferDescriptors:[],indexBufferFormat:null,program:null};let Fn=null;r.indices&&(ar.indexBufferFormat=w.U32_R,Fn=n.createBuffer({viewOrSize:new Uint32Array(r.indices),usage:ie.INDEX}));const jr=[];r.attributes.forEach(([ht,Nt])=>{const{format:Yr,id:Ln}=ht,Js=n.createBuffer({viewOrSize:new Float32Array(Co(Nt)),usage:ie.VERTEX});jr.push(Js),ar.vertexBufferDescriptors.push({arrayStride:wf(Yr),stepMode:Kn.VERTEX,attributes:[{format:Yr,offset:0,shaderLocation:Ln}]})});const Gi=this.renderCache.createInputLayout({...ar,program:Un});Ye.renderPipelineDescriptor.topology=r.primitive_topology,Ye.setProgram(Un),Ye.setStorageBuffers([Pn],[mf]),Ye.setVertexInput(Gi,jr.map(ht=>({buffer:ht,byteOffset:0})),Fn?{buffer:Fn,offset:0}:null);const qr=r.count_vertices();if(Fn?Ye.drawIndexesInstanced(r.indices.length,1):Ye.drawPrimitives(qr),o){const ht=n.createTexture({format:w.U8_RGBA_NORM,width:o.width,height:o.height,dimension:q.TEXTURE_2D,usage:mt.SAMPLED,pixelStore:{unpackFlipY:!0}});ht.setImageData([o]),n.setResourceName(ht,"BaseColor");const Nt=new qi;Nt.texture=ht,Ye.setSamplerBindingsFromTextureMappings([Nt])}Ye.setUniforms(3,[{name:"base_color",value:a.as_linear_rgba_f32()},{name:"emissive",value:l.as_linear_rgba_f32()},{name:"perceptual_roughness",value:u},{name:"metallic",value:h},{name:"reflectance",value:p},{name:"diffuse_transmission",value:f},{name:"specular_transmission",value:g},{name:"thickness",value:m},{name:"ior",value:E},{name:"attenuation_distance",value:v},{name:"attenuation_color",value:x.as_linear_rgba_f32()},{name:"flags",value:Z},{name:"alpha_cutoff",value:an},{name:"parallax_depth_scale",value:k},{name:"max_parallax_layer_count",value:O},{name:"max_relief_mapping_search_steps",value:ir},{name:"deferred_lighting_pass_id",value:S}]),this.renderInstManager.submitRenderInst(Ye,this.renderList)}}const za=10,xf=4;class zo extends V{constructor(){super(...arguments),this.pipeline=this.attach(Dn),this.ambient_lights=this.query(e=>e.addedOrChanged.with(Bt).trackWrites),this.ambient_lights_query=this.query(e=>e.current.with(Bt).read),this.directional_lights=this.query(e=>e.addedOrChanged.with(We).trackWrites),this.directional_lights_query=this.query(e=>e.current.with(We))}async prepare(){this.prepareUniforms=(e,n)=>{e.setUniforms(n,[{name:"padding",value:new Array(976).fill(0)}])}}execute(){const e=this.ambient_lights.addedOrChanged,n=this.directional_lights.addedOrChanged.slice(0,za);if(e.length||n.length){let i=P.ZERO;this.ambient_lights_query.current.forEach(o=>{this.pipeline.passesChanged=!0;const l=o.read(Bt);i=new P(...l.color.as_linear_rgba_f32()).mul(l.brightness)});const s=new Array(za).fill(void 0).map(()=>new Array(96).fill(0));let a=0;this.directional_lights_query.current.forEach((o,l)=>{const c=o.read(We);this.pipeline.passesChanged=!0;let u=0;const h=4,_=1/250,p=100,f=Math.log2(h*h/_)-Math.log2(p/100),g=1/(Math.pow(2,f)*1.2),m=c.illuminance*g,E=Math.min(c.cascade_shadow_config.bounds.length,xf),v=Dt.copy(c.transform.compute_matrix()),x=z.from_matrix(v);s[l]=[...new Array(4).fill([...new Array(16).fill(0),0,0,0,0]).flat(),...c.color.as_linear_rgba_f32().map(C=>C*m),...x.back().to_array(),u,c.shadow_depth_bias,c.shadow_normal_bias,E,c.cascade_shadow_config.overlap_proportion,a,0,0,0]}),this.prepareUniforms=(o,l)=>{o.setUniforms(l,[{name:"directional_lights",value:s.flat()},{name:"ambient_color",value:i.to_array()},{name:"cluster_dimensions",value:[0,0,0,0]},{name:"cluster_factors",value:[0,0,0,0]},{name:"n_directional_lights",value:n.length},{name:"spot_light_shadowmap_offset",value:0},{name:"environment_map_smallest_specular_mip_level",value:0}])}}}}class Dn extends V{constructor(){super(...arguments),this.appConfig=this.singleton.read($e),this.rendererResource=this.attach(Xs),this.passes={},this.passesChanged=!0,this.nodes=[],this.viewUniforms=this.attach(Yi),this.lightsUniforms=this.attach(zo),this.fogUniforms=this.attach(Vo),this.meshes_query=this.query(e=>e.current.with($,H,z,Te)),this.renderables=this.query(e=>e.addedOrChanged.with($,H,z).trackWrites)}async prepare(){this.device=this.rendererResource.device,this.swapChain=this.rendererResource.swapChain,this.renderHelper=this.rendererResource.renderHelper;const e=new bf(this.renderHelper.renderInstManager,this.renderHelper.renderCache,this);e.viewUniforms=this.viewUniforms,e.lightsUniforms=this.lightsUniforms,e.fogUniforms=this.fogUniforms,this.nodes.push(e)}run(e){const{canvas:n}=this.appConfig,r=this.renderHelper.renderInstManager,i=this.renderHelper.renderGraph.newGraphBuilder(),s=go,a={backbufferWidth:n.width,backbufferHeight:n.height,antialiasingMode:Lo.None},o=Ha(Qe.Color0,a,ks(s)),l=Ha(Qe.DepthStencil,a,Fd),c=i.createRenderTargetID(o,"Main Color"),u=i.createRenderTargetID(l,"Main Depth");i.pushPass(h=>{h.setDebugName("Main Render Pass"),h.attachRenderTargetID(Qe.Color0,c),h.attachRenderTargetID(Qe.DepthStencil,u),h.exec(_=>{this.nodes.forEach(p=>{p.draw(_)})})}),Object.keys(this.passes).forEach(h=>{const _=this.passes[h];_(i,this.renderHelper,a,c,u)}),i.resolveRenderTargetToExternalTexture(c,this.swapChain.getOnscreenTexture()),this.nodes.forEach(h=>{h.prepare(),e.forEach(_=>{h.submit(_)}),h.post()}),this.renderHelper.prepareToRender(),this.renderHelper.renderGraph.execute(),r.resetRenderInsts()}execute(){this.passesChanged&&this.meshes_query.current.length?(this.run(this.meshes_query.current),this.passesChanged=!1):this.renderables.addedOrChanged.length&&this.run(this.renderables.addedOrChanged)}registerPass(e,n){this.passes[e]=n}unregisterPass(e){delete this.passes[e]}}class Sf extends V{constructor(){super(),this.queries=this.query(e=>e.addedOrChanged.with(z).trackWrites),this.query(e=>e.using(Te).write)}execute(){this.queries.addedOrChanged.forEach(e=>{const n=e.read(z);e.has(Te)||e.add(Te,{}),e.write(Te).from(n)})}}class If extends V{constructor(){super(...arguments),this.root_query=this.query(e=>e.current.with(Zn,z,Te).without(Tr)),this.transform_query=this.query(e=>e.current.with(z,Te,Tr).withAny(Zn)),this.parent_query=this.query(e=>e.with(Tr))}execute(){this.root_query.current.forEach(e=>{})}propagate_recursive(){}}class Nf extends Ho{constructor(){super(...arguments),this.textureMapping=Nn(1,()=>new qi)}init(){const{device:e}=this.renderCache;this.program=Ki(e,{vertex:{wgsl:bs,entryPoint:"skybox_vertex"},fragment:{wgsl:bs,entryPoint:"skybox_fragment"}},{}),this.sampler=e.createSampler({addressModeU:Oe.CLAMP_TO_EDGE,addressModeV:Oe.CLAMP_TO_EDGE,minFilter:ae.BILINEAR,magFilter:ae.BILINEAR,mipmapFilter:me.LINEAR,lodMinClamp:0,lodMaxClamp:0})}prepare(){}post(){}submit(){const e=this.renderInstManager.newRenderInst();e.setAllowSkippingIfPipelineNotReady(!1),e.setMegaStateFlags({depthWrite:!1,depthCompare:Be.GEQUAL,...Ns}),e.setBindingLayout({numUniformBuffers:1,numSamplers:1,numStorageBuffers:0}),e.setUniformBuffer(this.pipeline.renderHelper.uniformBuffer),this.viewUniforms.prepareUniforms(e,0),this.textureMapping[0].texture=this.cubemap,this.textureMapping[0].sampler=this.sampler,e.setSamplerBindingsFromTextureMappings(this.textureMapping),e.setProgram(this.program),e.drawPrimitives(3),this.renderInstManager.submitRenderInst(e,this.renderList)}}class Of extends V{constructor(){super(...arguments),this.rendererResource=this.attach(Xs),this.viewUniforms=this.attach(Yi),this.pipeline=this.attach(Dn),this.skyboxs=this.query(e=>e.added.and.removed.and.changed.with(cn).trackWrites)}execute(){for(const e of this.skyboxs.added){this.pipeline.passesChanged=!0,this.skyboxNode=new Nf(this.rendererResource.renderHelper.renderInstManager,this.rendererResource.renderHelper.renderCache,this.pipeline),this.skyboxNode.viewUniforms=this.viewUniforms,this.pipeline.nodes.unshift(this.skyboxNode),this.updateSkybox(e);break}for(const e of this.skyboxs.removed){this.pipeline.passesChanged=!0;const n=this.pipeline.nodes.indexOf(this.skyboxNode);this.pipeline.nodes.splice(n,1),this.skyboxNode=null;break}for(const e of this.skyboxs.changed)this.updateSkybox(e)}updateSkybox(e){this.pipeline.passesChanged=!0;const n=this.rendererResource.device,i=e.read(cn).image_handle,s=n.createTexture({format:w.U8_RGBA_NORM,width:i[0].width,height:i[0].height,depthOrArrayLayers:6,dimension:q.TEXTURE_CUBE_MAP,usage:mt.SAMPLED});s.setImageData(i),n.setResourceName(s,"Skybox Cube map"),this.skyboxNode.cubemap=s}}const ko=`#define_import_path fullscreen_vertex_shader

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
`,Cf=`#import render::view::View
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
`;class Mf extends V{constructor(){super(...arguments),this.tonemapping=this.query(e=>e.addedOrChanged.with(Je,tt).trackWrites),this.pipeline=this.attach(Dn),this.viewUniforms=this.attach(Yi),this.textureMapping=Nn(1,()=>new qi),this.defines={},this.pushTonemappingPass=(e,n,r,i)=>{const s=n.getDevice();this.program||(this.program=Ki(s,{vertex:{wgsl:ko,entryPoint:"fullscreen_vertex_shader"},fragment:{wgsl:Cf,entryPoint:"fragment",defines:!0}},this.defines)),e.pushPass(a=>{a.setDebugName("Tonemapping"),a.attachRenderTargetID(Qe.Color0,i);const o=e.resolveRenderTarget(i);a.attachResolveTexture(o),a.exec((l,c)=>{const u=n.renderInstManager.newRenderInst();u.setAllowSkippingIfPipelineNotReady(!1),u.setMegaStateFlags(Ns),u.setBindingLayout({numUniformBuffers:1,numSamplers:1,numStorageBuffers:0,numStorageTextures:0}),u.drawPrimitives(3),u.setProgram(this.program),u.setUniformBuffer(n.uniformBuffer),this.viewUniforms.prepareUniforms(u,0),this.textureMapping[0].texture=c.getResolveTextureForID(o),this.textureMapping[0].sampler=s.createSampler({addressModeU:Oe.CLAMP_TO_EDGE,addressModeV:Oe.CLAMP_TO_EDGE,minFilter:ae.BILINEAR,magFilter:ae.BILINEAR,mipmapFilter:me.LINEAR}),u.setSamplerBindingsFromTextureMappings(this.textureMapping),u.drawOnPass(n.renderCache,l)})})}}execute(){this.tonemapping.addedOrChanged.forEach(e=>{this.pipeline.passesChanged=!0,this.finalize();const{method:n}=e.read(Je);n===De.None?this.defines.TONEMAP_METHOD_NONE=1:n===De.Reinhard?this.defines.TONEMAP_METHOD_REINHARD=1:n===De.ReinhardLuminance?this.defines.TONEMAP_METHOD_REINHARD_LUMINANCE=1:n===De.AcesFitted?this.defines.TONEMAP_METHOD_ACES_FITTED=1:n===De.AgX?this.defines.TONEMAP_METHOD_AGX=1:n===De.SomewhatBoringDisplayTransform?this.defines.TONEMAP_METHOD_SOMWHAT_BORING_DISPLAY_TRANSFORM=1:n===De.TonyMcMapface?this.defines.TONEMAP_METHOD_TONY_MC_MAPFACE=1:n===De.BlenderFilmic&&(this.defines.TONEMAP_METHOD_BLENDER_FILMIC=1);const{enabled:r}=e.read(tt);r&&(this.defines.DEBAND_DITHER=1),this.pipeline.registerPass("Tonemapping",this.pushTonemappingPass)})}finalize(){this.program&&(this.program.destroy(),this.program=null,this.pipeline.unregisterPass("Tonemapping"),this.defines={})}}const Bf=`// NVIDIA FXAA 3.11
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
`,ka={[Xe.Low]:"LOW",[Xe.Medium]:"MEDIUM",[Xe.High]:"HIGH",[Xe.Ultra]:"ULTRA",[Xe.Extreme]:"EXTREME"};class Df extends V{constructor(){super(...arguments),this.fxaa=this.query(e=>e.addedOrChanged.with(Se).trackWrites),this.pipeline=this.attach(Dn),this.textureMapping=Nn(1,()=>new qi),this.defines={},this.pushFXAAPass=(e,n,r,i,s)=>{const a=n.getDevice();this.program||(this.program=Ki(a,{vertex:{wgsl:ko,entryPoint:"fullscreen_vertex_shader"},fragment:{wgsl:Bf,entryPoint:"fragment",defines:!0}},this.defines)),e.pushPass(o=>{o.setDebugName("FXAA"),o.attachRenderTargetID(Qe.Color0,i);const l=e.resolveRenderTarget(i);o.attachResolveTexture(l),o.exec((c,u)=>{const h=n.renderInstManager.newRenderInst();h.setAllowSkippingIfPipelineNotReady(!1),h.setMegaStateFlags(Ns),h.setBindingLayout({numUniformBuffers:0,numSamplers:1,numStorageBuffers:0,numStorageTextures:0}),h.drawPrimitives(3),h.setProgram(this.program),this.textureMapping[0].texture=u.getResolveTextureForID(l),this.textureMapping[0].sampler=a.createSampler({addressModeU:Oe.CLAMP_TO_EDGE,addressModeV:Oe.CLAMP_TO_EDGE,minFilter:ae.BILINEAR,magFilter:ae.BILINEAR,mipmapFilter:me.LINEAR}),h.setSamplerBindingsFromTextureMappings(this.textureMapping),h.drawOnPass(n.renderCache,c)})})}}compileDefines(e){const{edge_threshold:n,edge_threshold_min:r}=e;this.defines={[`EDGE_THRESH_${ka[n]}`]:!0,[`EDGE_THRESH_MIN_${ka[r]}`]:!0}}execute(){this.fxaa.addedOrChanged.forEach(e=>{const n=e.read(Se);this.pipeline.passesChanged=!0,this.compileDefines(n),this.finalize(),n.enabled?this.pipeline.registerPass("Fxaa",this.pushFXAAPass):this.pipeline.unregisterPass("Fxaa")})}finalize(){this.program&&(this.program.destroy(),this.program=null)}}class Pf extends V{constructor(){super(),this.views=this.query(e=>e.addedOrChanged.with(Ie).trackWrites),this.query(e=>e.using(Te,re,ot).read.and.using(Ze).write)}execute(){this.views.addedOrChanged.forEach(e=>{const n=e.read(Te),r=e.write(Ze);let i;e.has(ot)?i=e.read(ot):e.has(re)&&(i=e.read(re));const s=Dt.copy(n.compute_matrix()),a=i.get_projection_matrix().mul(s.inverse()),o=z.from_matrix(s),{half_spaces:l}=Ze.from_view_projection_custom_far(a,o.translation,o.back(),i.far);r.half_spaces=l})}}class Xa extends V{constructor(){super(),this.appConfig=this.singleton.read($e),this.cameras=this.query(e=>e.addedOrChanged.with(ne).trackWrites),this.query(e=>e.using(Ie,re,ot).write)}execute(){const{canvas:e}=this.appConfig,{width:n,height:r}=e;this.cameras.addedOrChanged.forEach(i=>{var u,h;const s=i.read(ne),a=i.write(Ie),o=(u=s.viewport)==null?void 0:u.physical_size;a.target_info_physical_size=new ee(n,r),a.target_info_scale_factor=1;let l;const c=s.logical_viewport_size(a);i.has(ot)?l=i.write(ot):i.has(re)&&(l=i.write(re)),l.update(c.x,c.y),a.projection_matrix=l.get_projection_matrix(),o&&!((h=a.old_viewport_size)!=null&&h.eq(o))&&(a.old_viewport_size=o)})}}class rr{}class Uf{constructor(){this.events_a={events:[],start_event_count:0},this.events_b={events:[],start_event_count:0},this.event_count=0,this.reader=new $a}oldest_event_count(){return Math.min(this.events_a.start_event_count,this.events_b.start_event_count)}send(e){let n=new Wa(this.event_count);const r={event_id:n,event:e};return this.events_b.events.push(r),this.event_count+=1,n}get_reader(){return new $a}update(){this.update_drain()}update_drain(){const e=this.events_a;this.events_a=this.events_b,this.events_b=e;const n=this.events_b.events.splice(0,this.events_b.events.length);return this.events_b.start_event_count=this.event_count,n.map(r=>r.event)}reset_start_event_count(){this.events_a.start_event_count=this.event_count,this.events_b.start_event_count=this.event_count}clear(){this.reset_start_event_count(),this.events_a.events=[],this.events_b.events=[]}len(){return this.events_a.events.length+this.events_b.events.length}is_empty(){return this.len()===0}drain(){return this.reset_start_event_count(),this.events_a.events.splice(0,this.events_a.events.length).concat(this.events_b.events.splice(0,this.events_b.events.length)).map(e=>e.event)}extend(e){this.event_count;let n=this.event_count,r=e.map(i=>{let s=new Wa(n);return n+=1,{event_id:s,event:i}});this.events_b.events.push(...r),this.event_count=n}}class Wa{constructor(e){this.id=e}eq(e){return this.id===e.id}}class $a{constructor(e=0){this.last_event_count=e}read(e){return this.read_with_id(e).without_id()}read_with_id(e){return new Lf(this,e)}len(e){return Math.min(e.event_count-this.last_event_count,e.len())}}class Ff{constructor(e){this.iter=e}*[Symbol.iterator](){for(const e of this.iter){const{event:n}=e;yield n}}next(){var e;return(e=this.iter.next())==null?void 0:e.event}}class Lf{constructor(e,n){let r=e.last_event_count-n.events_a.start_event_count,i=e.last_event_count-n.events_b.start_event_count,s=n.events_a.events.slice(r),a=n.events_b.events.slice(i),o=s.length+a.length;if(o!==e.len(n))throw new Error("");e.last_event_count=n.event_count-o,this.reader=e,this.chain=s.concat(a),this.unread=o}without_id(){return new Ff(this)}count(){return this.reader.last_event_count+=this.unread,this.unread}*[Symbol.iterator](){for(const e of this.chain)this.reader.last_event_count+=1,this.unread-=1,yield e}next(){if(this.unread!==0)return this.reader.last_event_count+=1,this.unread-=1,this.chain.shift()}}class Vf{constructor(e,n){this.events=e,this.reader=n}read(){return this.reader.read(this.events)}iter(){return this.reader.read(this.events)}read_with_id(){return this.reader.read_with_id(this.events)}len(){return this.reader.len(this.events)}}class Qt extends rr{constructor(){super()}}(t=>{class e extends t{constructor(i){super(),this.value=i}}t.Rotate=e;class n extends t{constructor(i){super(),this.value=i}}t.TranslateEye=n})(Qt||(Qt={}));class Hf{build(e){j(gt),e.add_event(Qt),e.add_systems(tn,Ya),e.add_systems(tn,$f),st(n=>n.before(Ks))(Ya)}}class ja{constructor(){this._pressed=new Set,this._just_pressed=new Set,this._just_released=new Set}press(e){this._pressed.has(e)||this._just_pressed.add(e),this._pressed.add(e)}pressed(e){return this._pressed.has(e)}any_pressed(e){return e.some(n=>this.pressed(n))}release(e){this._pressed.delete(e)&&this._just_released.add(e)}release_all(){this._pressed.forEach(e=>{this._just_released.add(e)}),this._pressed.clear()}just_pressed(e){return this._just_pressed.has(e)}any_just_pressed(e){return e.some(n=>this.just_pressed(n))}clear_just_pressed(e){return this._just_pressed.delete(e)}just_released(e){return this._just_released.has(e)}any_just_released(e){return e.some(n=>this.just_released(n))}clear_just_released(e){return this._just_released.delete(e)}reset(e){this._pressed.delete(e),this._just_pressed.delete(e),this._just_released.delete(e)}reset_all(){this._pressed.clear(),this._just_pressed.clear(),this._just_released.clear()}clear(){this._just_pressed.clear(),this._just_released.clear()}}class qs extends rr{}class Qi extends rr{}class zf{build(e){e.add_systems(Ur,Wf).add_event(Ni).init_resource(Zi,new ja).add_systems(nt,Xf).add_event(Ii).add_event(qs).add_event(Qi).init_resource(Ys,new ja).add_systems(nt,kf)}}var wr=(t=>(t[t.Left=0]="Left",t[t.Right=1]="Right",t[t.Middle=2]="Middle",t))(wr||{}),jn=(t=>(t[t.Pressed=0]="Pressed",t[t.Released=1]="Released",t))(jn||{});class Ii extends rr{}class Ys{}class kf extends V{constructor(){super(...arguments),this.appConfig=this.singleton.read($e)}execute(){const e=this.appConfig.resources.get(Ys),n=this.appConfig.resources.get(Ii);e.clear();for(const r of n.read())r.state===0?e.press(r.button):e.release(r.button)}}class Zi{}class Ni extends rr{}class Xf extends V{constructor(){super(...arguments),this.appConfig=this.singleton.read($e)}execute(){const e=this.appConfig.resources.get(Zi),n=this.appConfig.resources.get(Ni);e.clear();for(const r of n.read())r.state===jn.Pressed?e.press(r.key_code):e.release(r.key_code)}}const qa={0:wr.Left,1:wr.Middle,2:wr.Right};class Wf extends V{constructor(){super(...arguments),this.appConfig=this.singleton.read($e),this.onMouseDown=e=>{this.appConfig.resources.get(Ii).events.send({button:qa[e.button],state:jn.Pressed})},this.onMouseUp=e=>{this.appConfig.resources.get(Ii).events.send({button:qa[e.button],state:jn.Released})},this.onMouseMove=e=>{this.appConfig.resources.get(Qi).events.send({delta:new ee(e.movementX,e.movementY)})},this.onMousewheel=e=>{this.appConfig.resources.get(qs).events.send({x:e.deltaX,y:e.deltaY})},this.onKeyDown=e=>{this.appConfig.resources.get(Ni).events.send({key_code:e.code,state:jn.Pressed})},this.onKeyUp=e=>{this.appConfig.resources.get(Ni).events.send({key_code:e.code,state:jn.Released})}}async prepare(){const{canvas:e}=this.appConfig;window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),e.addEventListener("mousedown",this.onMouseDown),e.addEventListener("mouseup",this.onMouseUp),e.addEventListener("mousemove",this.onMouseMove),e.addEventListener("wheel",this.onMousewheel),e.addEventListener("contextmenu",n=>(n.preventDefault(),!1))}finalize(){const{canvas:e}=this.appConfig;window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),e.removeEventListener("mousedown",this.onMouseDown),e.removeEventListener("mouseup",this.onMouseUp),e.removeEventListener("mousemove",this.onMouseMove),e.removeEventListener("wheel",this.onMousewheel)}}class $f extends V{constructor(){super(),this.appConfig=this.singleton.read($e),this.orbitCameraController=this.query(e=>e.current.with(gt)),this.query(e=>e.using(gt).read)}execute(){var n;const e=(n=this.orbitCameraController.current)==null?void 0:n[0];if(e){const r=e.read(gt);if(r.enabled){const{resources:i}=this.appConfig,{mouse_rotate_sensitivity:s,translate_sensitivity:a}=r,o=i.get(Zi),l=i.get(Qi),c=i.get(Qt),u=ee.ZERO;for(const h of l.read())u.add_assign(h.delta);c.events.send(new Qt.Rotate(s.mul(u))),[["KeyW",y.Z],["KeyA",y.X],["KeyS",y.Z.neg()],["KeyD",y.X.neg()],["ShiftLeft",y.Y.neg()],["Space",y.Y]].forEach(([h,_])=>{o.pressed(h)&&c.events.send(new Qt.TranslateEye(_.mul(a)))})}}}}class Tt extends rr{constructor(){super()}}(t=>{class e extends t{constructor(s){super(),this.value=s}}t.Orbit=e;class n extends t{constructor(s){super(),this.value=s}}t.TranslateTarget=n;class r extends t{constructor(s){super(),this.value=s}}t.Zoom=r})(Tt||(Tt={}));class jf{build(e){j(Ge),e.add_event(Tt),e.add_systems(tn,Ka),e.add_systems(tn,qf),st(n=>n.before(Ks))(Ka)}}class qf extends V{constructor(){super(),this.appConfig=this.singleton.read($e),this.orbitCameraController=this.query(e=>e.current.with(Ge)),this.query(e=>e.using(Ge).read)}execute(){var n;const e=(n=this.orbitCameraController.current)==null?void 0:n[0];if(e){const r=e.read(Ge);if(r.enabled){const{resources:i}=this.appConfig,{mouse_rotate_sensitivity:s,mouse_translate_sensitivity:a,mouse_wheel_zoom_sensitivity:o,pixels_per_line:l}=r,c=i.get(Ys),u=i.get(Zi),h=i.get(qs),_=i.get(Qi),p=i.get(Tt),f=ee.ZERO;for(const m of _.read())f.add_assign(m.delta);u.pressed("ControlLeft")&&(console.log("ControlLeft..."),p.events.send(new Tt.Orbit(f.mul(s)))),c.pressed(wr.Right)&&p.events.send(new Tt.TranslateTarget(a.mul(f)));let g=1;for(const m of h.read()){const{y:E}=m,v=E/l;g*=1-v*o}g!==1&&p.events.send(new Tt.Zoom(g))}}}}class Ya extends V{constructor(){super(),this.appConfig=this.singleton.read($e),this.controls=this.query(e=>e.current.with(gt)),this.query(e=>e.using(Fe).write.and.using(z).read)}execute(){for(const e of this.controls.current){const n=e.read(gt),r=this.appConfig.resources.get(Qt);if(n.enabled&&r.len()){const i=e.write(Fe),s=i.look_direction(),a=Xi.from_vector(s),o=_n.from_axis_angle(y.Y,a.get_yaw()),l=o.mul(y.X),c=o.mul(y.Y),u=o.mul(y.Z),h=this.delta;for(const _ of r.read())if(_ instanceof Qt.Rotate){const p=_.value;a.add_yaw(h*-p.x),a.add_pitch(h*-p.y)}else if(_ instanceof Qt.TranslateEye){const p=_.value;i.eye.add_assign(l.mul(h*p.x).add(c.mul(h*p.y)).add(u.mul(h*p.z)))}i.target=i.eye.add(a.unit_vector().mul(i.radius()));return}}}}class Ka extends V{constructor(){super(),this.appConfig=this.singleton.read($e),this.controls=this.query(e=>e.current.with(Ge)),this.query(e=>e.using(Fe).write.and.using(z).read)}execute(){for(const e of this.controls.current){const n=e.read(Ge),r=this.appConfig.resources.get(Tt);if(n.enabled&&r.len()){const i=e.write(Fe),s=e.read(z),a=Xi.from_vector(i.look_direction().neg());let o=1;const l=i.radius(),c=this.delta;for(const h of r.read())if(h instanceof Tt.Orbit){const _=h.value;a.add_yaw(c*-_.x),a.add_pitch(c*_.y)}else if(h instanceof Tt.TranslateTarget){const _=h.value,p=s.rotation.mul_vec3(y.X.neg()),f=s.rotation.mul_vec3(y.Y);i.target.add_assign(p.mul(c*_.x).add(f.mul(c*_.y)))}else h instanceof Tt.Zoom&&(o*=h.value);const u=Math.max(Math.min(o*l,1e6),.001);i.eye=i.target.add(a.unit_vector().mul(u));return}}}}class Ks extends V{constructor(){super(),this.cameras=this.query(e=>e.addedOrChanged.with(Fe).trackWrites),this.query(e=>e.using(Fe).read.and.using(Ut,z).write)}execute(){for(const e of this.cameras.addedOrChanged){const n=e.read(Fe),r=e.write(Ut);if(r.enabled){const i=e.write(z),{translation:s,rotation:a,scale:o}=Fe.to_transform(r.smooth_transform(n));i.translation=s,i.rotation=a,i.scale=o}}}}class Yf extends V{constructor(){super(),this.configs=this.query(e=>e.with(ne).addedOrChanged.with(Ft).trackWrites),this.query(e=>e.using(Rt).write)}execute(){this.configs.addedOrChanged.forEach(e=>{if(!e.read(ne).is_active)return;const r=e.read(Ft);console.log(r);const{tile_size:i,dimensions:s,near:a,far:o}=new Rt;if(!e.has(Rt))e.add(Rt,{tile_size:i,dimensions:s,near:a,far:o});else{const l=e.write(Rt);l.tile_size=i,l.dimensions=s,l.near=a,l.far=o}})}}class Kf extends V{constructor(){super(),this.point_lights_query=this.query(e=>e.with(Do).addedOrChanged.trackWrites),this.query(e=>e.using(ne,Rt,Ft,Ze).read)}execute(){this.point_lights_query.addedOrChanged.forEach(e=>{})}}class Qf extends V{constructor(){super(...arguments),this.lights=this.query(e=>e.current.with(pt).and.with(en).write)}execute(){this.lights.current.forEach(e=>{if(!e.read(pt).shadows_enabled)return;e.write(en).cascades.clear()})}}class Zf extends V{constructor(){super(...arguments),this.lights=this.query(e=>e.with(pt,en,Te).current)}execute(){this.lights.current.forEach(e=>{e.read(pt).shadows_enabled})}}class Gf extends V{constructor(){super(),this.directional_lights=this.query(e=>e.addedOrChanged.with(pt,Te).trackWrites),this.query(e=>e.using(We).write.using(Te,Jt,en).read)}execute(){this.directional_lights.addedOrChanged.forEach(e=>{const{color:n,illuminance:r,shadows_enabled:i,shadow_depth_bias:s,shadow_normal_bias:a}=e.read(pt),o=e.read(Te),l=e.read(Jt),c=e.read(en);if(!e.has(We))e.add(We,{color:n,illuminance:r,shadows_enabled:i,shadow_depth_bias:s,shadow_normal_bias:a,transform:o,cascade_shadow_config:l,cascades:c.cascades});else{const u=e.write(We);u.color=n,u.illuminance=r,u.shadows_enabled=i,u.shadow_depth_bias=s,u.shadow_normal_bias=a,u.transform=o,u.cascade_shadow_config=l,u.cascades=c.cascades}})}}const Ur=V.group(),It=V.group(),Qs=V.group(),Oi=V.group(),nt=V.group(),tn=V.group(),un=V.group(),Xo=V.group();Ur.schedule(t=>t.before(It));It.schedule(t=>t.before(Qs));Qs.schedule(t=>t.before(Oi));Oi.schedule(t=>t.before(nt));nt.schedule(t=>t.before(tn));tn.schedule(t=>t.before(un));un.schedule(t=>t.before(Xo));class Jf{async build(e){j($),j(H),e.add_systems(Ur,Xs),e.add_systems(nt,Yi),e.add_systems(tn,Dn)}}class ep{async build(e){j(z),j(Te),j(Ds),e.add_systems(nt,Sf,If)}}class tp{build(e){j(Tr),j(Zn)}}class np{async build(e){j(Ze),e.add_systems(un,Pf)}}class rp{async build(e){j(ne),j(Ie),j(Fi),j(Ia)(re),j(Ia)(ot),j(Fe),j(Ut),e.add_systems(nt,Xa),e.add_systems(tn,Ks),st(n=>n.afterWritersOf(ne))(Xa)}}class ip{async build(e){j(Fs)}}class sp{async build(e){j(ke),e.add_systems(nt,Vo)}}class ap{async build(e){j(cn),e.add_systems(nt,Of)}}class op{async build(e){j(Ft),j(Rt),j(kr),j(en),j(Vs),j(Jt),j(Bt),j(Do),j(pt),j(We),await new sp().build(e),await new ap().build(e),e.add_systems(nt,Gf),e.add_systems(nt,zo),e.add_systems(un,Yf),e.add_systems(un,Kf),e.add_systems(un,Qf),e.add_systems(un,Zf)}}class lp{async build(e){j(Se),e.add_systems(nt,Df)}}class cp{async build(e){j(Je),e.add_systems(nt,Mf)}}class up{async build(e){j(fh),j(Ee),j(tt),j(lh),await new op().build(e),await new cp().build(e),await new ip().build(e),await new lp().build(e)}}var hp=Object.defineProperty,_p=Object.getOwnPropertyDescriptor,qt=(t,e,n,r)=>{for(var i=r>1?void 0:r?_p(e,n):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,n,i):a(i))||i);return r&&i&&hp(e,n,i),i};class Tn{constructor(e){this.config=e,this.plugins=[],this.systems=[],this.updateEventsSystemCounter=0,this.resources=new WeakMap}add_plugin(e){return this.plugins.push(e),this}add_plugins(...e){return e.forEach(n=>{this.add_plugin(n)}),this}add_event(e){const n=new Uf,r=new Vf(n,n.get_reader());this.init_resource(e,r);class i extends V{execute(){(n.events_a.events.length!==0||n.events_b.events.length!==0)&&n.update()}}return Object.defineProperty(i,"name",{value:`_UpdateEventsSystem${this.updateEventsSystemCounter++}`}),this.add_systems(Oi,i),this}add_systems(e,...n){return this.systems.push(...n.map(r=>[e,r])),this}init_resource(e,n){return this.resources.set(e,n),this}async run(){const e=this.config,n=this.resources;let r=class extends V{constructor(){super(...arguments),this.config=this.singleton.write($e)}initialize(){this.config.canvas=e.canvas,this.config.shaderCompilerPath=e.shaderCompilerPath,this.config.resources=n}};r=qt([st(Ur)],r);let i=class extends V{};i=qt([st(Ur)],i);let s=class extends V{};s=qt([st(It)],s);let a=class extends V{};a=qt([st(Qs)],a);let o=class extends V{};o=qt([st(nt)],o);let l=class extends V{};l=qt([st(tn)],l);let c=class extends V{};c=qt([st(un)],c);let u=class extends V{};u=qt([st(Oi)],u);let h=class extends V{};h=qt([st(Xo)],h),await Promise.all(this.plugins.map(p=>new p().build(this))),this.systems.forEach(([p,f],g)=>{Object.defineProperty(f,"name",{value:`_System${g}`}),st(p)(f)}),this.world=await Mi.create({threads:1});const _=async()=>{await this.world.execute(),this.rafId=requestAnimationFrame(_)};return this.rafId=requestAnimationFrame(_),this}async exit(){cancelAnimationFrame(this.rafId),await this.world.terminate()}}class dp{constructor(e,n){this.parent=e,this.child=n}apply(e){this.child.add(Zn,{parent:this.parent})}}class fp{constructor(e,n){this.id=e,this.bundles=n}apply(e){this.bundles.forEach(n=>{this.addBundle(n)})}addBundle(e){e instanceof fn?Object.keys(e).forEach(n=>{e[n]instanceof fn?this.addBundle(e[n]):e[n]&&this.id.add(e[n].constructor,e[n])}):this.id.add(e.constructor,e)}}class os{constructor(e,n){this.entity=e,this.commands=n}id(){return this.entity}insert(...e){return this.commands.add(new fp(this.entity,e)),this}remove(...e){}despawn(){}add_child(e){let n=this.id();if(e===n)throw new Error("Cannot add entity as a child of itself.");return this.commands.add(new dp(n,e)),this}remove_children(...e){return this}}class pp{constructor(e){this.resource=e}apply(){}}class mp{constructor(e){this.resource=e}apply(){}}class wn{constructor(e){this.system=e,this.queue=[]}execute(){this.queue.forEach(e=>{e.apply(this.system)}),this.queue=[]}entity(e){return new os(e,this)}add(e){this.queue.push(e)}spawn_empty(){return new os(this.system.createEntity(),this)}get_or_spawn(e){return new os(e,this)}spawn(...e){const n=this.spawn_empty();return n.insert(...e),n}insert_resource(e){this.queue.push(new pp(e))}remove_resource(e){this.queue.push(new mp(e))}}const bn=[ep,tp,rp,up,Jf,zf,np];async function nn(t){if(window.createImageBitmap){const e=await fetch(t);return await createImageBitmap(await e.blob())}else{const e=new window.Image;return new Promise(n=>{e.onload=()=>n(e),e.src=t,e.crossOrigin="Anonymous"})}}const xn="/renderer/assets/glsl_wgsl_compiler_bg-c7f2a0ea.wasm";async function gp(t,e){const n=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class r extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(a=>a.using($,H,z,ne,Ie,re,Ze,Ee,Je,tt,Fe,gt,Ut).write)}initialize(){this.commands.spawn(new En({camera:new ne,projection:new re}),new U_({controller:new gt,eye:new y(-2.5,2,2),target:y.ZERO,up:y.Y})).entity.hold();const a=$.from(new Rn(1)),o=new H({base_color_texture:n});this.commands.spawn(new Gt({mesh:a,material:o,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const i=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_plugins(Hf).add_systems(It,r);return i.run(),async()=>{await i.exit()}}async function Ep(t,e){const n=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class r extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(a=>a.using($,H,z,ne,Ie,re,Ze,Se,ke,Ee,Je,tt,Fe,Ge,Ut).write)}initialize(){this.commands.spawn(new En({camera:new ne,projection:new re}),new B_({controller:new Ge,eye:new y(-2.5,2,2),target:y.ZERO,up:y.Y}),new Se({enabled:!0,edge_threshold:Xe.High,edge_threshold_min:Xe.High}),new ke({color:ye.BLUE,falloff:new Ne.Linear({start:0,end:6})})).entity.hold();const a=$.from(new Rn(1)),o=new H({base_color_texture:n});this.commands.spawn(new Gt({mesh:a,material:o,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const i=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_plugins(jf).add_systems(It,r);return i.run(),async()=>{await i.exit()}}const vp="/renderer/assets/posx-bfea380a.jpg",Ap="/renderer/assets/negx-047052e7.jpg",yp="/renderer/assets/posy-cc467777.jpg",Rp="/renderer/assets/negy-52b4b951.jpg",Tp="/renderer/assets/posz-d56085e5.jpg",wp="/renderer/assets/negz-1bc79f44.jpg";async function bp(t,e){let n;const r=await Promise.all([vp,Ap,yp,Rp,Tp,wp].map(async c=>nn(c))),i=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class s extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(u=>u.using($,H,z,ne,Ie,re,Ze,cn,Ee,Je,tt).write)}initialize(){const u=r;n=this.commands.spawn(new En({camera:new ne,projection:new re,transform:z.from_xyz(-2.5,1.5,2).look_at(y.ZERO,y.Y)}),new cn({image_handle:u})).entity.hold();const h=$.from(new Rn(1)),_=new H({base_color_texture:i});this.commands.spawn(new Gt({mesh:h,material:_,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const a=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_systems(It,s);a.run();const o=e.addFolder("skybox"),l={enabled:!0};return o.add(l,"enabled").onChange(c=>{c?n.add(cn,{image_handle:r}):n.remove(cn)}),async()=>{await a.exit()}}async function xp(t,e){let n;const r=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class i extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(c=>c.using($,H,z,ne,Ie,re,Ze,Se,Fs,ke,Ee,Je,tt).write)}initialize(){n=this.commands.spawn(new En({camera:new ne,projection:new re,transform:z.from_xyz(-2.5,1.5,2).look_at(y.ZERO,y.Y)}),new Se({enabled:!0,edge_threshold:Xe.High,edge_threshold_min:Xe.High}),new ke({color:ye.rgb(206/255,206/255,238/255),falloff:new Ne.Linear({start:1.89,end:3.12})})).entity.hold();const c=$.from(new Rn(1)),u=new H({base_color_texture:r});this.commands.spawn(new Gt({mesh:c,material:u,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const s=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_systems(It,i);s.run();const a=e.addFolder("fog"),o={color:"#ceceee",falloff:"Linear",start:1.89,end:3.12,density:0};return a.addColor(o,"color").onChange(l=>{const c=n.write(ke);c.color=ye.hex(l)}),a.add(o,"falloff",["Linear","Exponential","ExponentialSquared","Atmospheric"]).onChange(l=>{const c=n.write(ke);l==="Linear"?c.falloff=new Ne.Linear({start:o.start,end:o.end}):l==="Exponential"?c.falloff=new Ne.Exponential({density:o.density}):l==="ExponentialSquared"?c.falloff=new Ne.ExponentialSquared({density:o.density}):l==="Atmospheric"&&(c.falloff=new Ne.Atmospheric({extinction:y.splat(o.density),inscattering:y.splat(o.density)}))}),a.add(o,"start",0,10).onChange(l=>{const c=n.write(ke);c.falloff=new Ne.Linear({start:l,end:o.end})}),a.add(o,"end",0,10).onChange(l=>{const c=n.write(ke);c.falloff=new Ne.Linear({start:o.start,end:l})}),a.add(o,"density",0,1).onChange(l=>{const c=n.write(ke);o.falloff==="Exponential"?c.falloff=new Ne.Exponential({density:l}):o.falloff==="ExponentialSquared"?c.falloff=new Ne.ExponentialSquared({density:l}):o.falloff==="Atmospheric"&&(c.falloff=new Ne.Atmospheric({extinction:y.splat(l),inscattering:y.splat(l)}))}),a.open(),async()=>{await s.exit()}}async function Sp(t,e){let n;const r=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class i extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(u=>u.using($,H,z,ne,Ie,re,Ze,Se,Ee,Je,tt).write)}initialize(){n=this.commands.spawn(new En({camera:new ne,projection:new re,transform:z.from_xyz(-2.5,1.5,2).look_at(y.ZERO,y.Y)}),new Se({enabled:!0,edge_threshold:Xe.High,edge_threshold_min:Xe.High})).entity.hold();const u=$.from(new Rn(1)),h=new H({base_color_texture:r});this.commands.spawn(new Gt({mesh:u,material:h,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const s=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_systems(It,i);s.run();const a=e.addFolder("fxaa"),o={enabled:!0,edge_threshold:"High",edge_threshold_min:"High"};a.add(o,"enabled").onChange(c=>{const u=n.write(Se);u.enabled=c});const l=["Low","Medium","High","Ultra","Extreme"];return a.add(o,"edge_threshold",l).onChange(c=>{const u=n.write(Se);u.edge_threshold=l.indexOf(c)}),a.add(o,"edge_threshold_min",l).onChange(c=>{const u=n.write(Se);u.edge_threshold_min=l.indexOf(c)}),a.open(),async()=>{await s.exit()}}async function Ip(t,e){let n;const r=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class i extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(g=>g.using($,H,z,ne,Ie,re,Ze,Se,Ee,Je,tt).write)}initialize(){n=this.commands.spawn(new En({camera:new ne,projection:new re,transform:z.from_xyz(-2.5,1.5,2).look_at(y.ZERO,y.Y)}),new Se({enabled:!0,edge_threshold:Xe.High,edge_threshold_min:Xe.High})).entity.hold();const g=$.from(new Rn(1)),m=new H({base_color_texture:r});this.commands.spawn(new Gt({mesh:g,material:m,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const s=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_systems(It,i);s.run();const a=e.addFolder("tonemapping"),o={method:"Reinhard"},l=[De.None,De.Reinhard,De.ReinhardLuminance,De.AcesFitted],c=["None","Reinhard","ReinhardLuminance","AcesFitted"];a.add(o,"method",c).onChange(f=>{const g=n.write(Je);g.method=l[c.indexOf(f)];const m=n.write(Ee);g.method===De.None?m.exposure=0:g.method===De.Reinhard||g.method===De.ReinhardLuminance?m.exposure=.5:g.method===De.AcesFitted&&(m.exposure=.35),h.exposure=m.exposure});const u=e.addFolder("color grading"),h={exposure:0,gamma:1,pre_saturation:1,post_saturation:1};u.add(h,"exposure",0,1).onChange(f=>{const g=n.write(Ee);g.exposure=f}).listen(),u.add(h,"gamma",0,8).onChange(f=>{const g=n.write(Ee);g.gamma=f}),u.add(h,"pre_saturation",0,2).onChange(f=>{const g=n.write(Ee);g.pre_saturation=f}),u.add(h,"post_saturation",0,2).onChange(f=>{const g=n.write(Ee);g.post_saturation=f});const _=e.addFolder("deband dithering"),p={enabled:!0};return _.add(p,"enabled").onChange(f=>{const g=n.write(tt);g.enabled=f}),async()=>{await s.exit()}}async function Np(t,e){const n=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");let r;class i extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(c=>c.using($,H,z,ne,Ie,re,Ze,Ee,Je,tt).write)}initialize(){r=this.commands.spawn(new En({camera:new ne,projection:new re,transform:z.from_xyz(-2.5,1.5,2).look_at(y.ZERO,y.Y)})).entity.hold();const c=$.from(new Rn(1)),u=new H({base_color_texture:n});this.commands.spawn(new Gt({mesh:c,material:u,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const s=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_systems(It,i);s.run();const a=e.addFolder("viewport"),o={width:6,height:0};return a.add(o,"width",50,500).onChange(l=>{r.write(ne).viewport}),async()=>{await s.exit()}}async function Op(t,e){let n,r;const i=await nn("https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ");class s extends V{constructor(){super(...arguments),this.commands=new wn(this),this.q=this.query(_=>_.using($,H,z,ne,Ie,re,Ze,Se,Fs,Ee,Je,tt,pt,Bt,Vs,en,Jt).write)}initialize(){n=this.commands.spawn(new Bt({color:ye.ORANGE_RED,brightness:.02})).entity.hold(),r=this.commands.spawn(new ud({directional_light:new pt({color:ye.rgb(.98,.95,.82),shadows_enabled:!0,illuminance:1e4}),transform:z.from_xyz(0,0,0).look_at(new y(-1,-1,-1),y.Y),cascade_shadow_config:new ad({first_cascade_far_bound:4,maximum_distance:10}).build()})).entity.hold(),this.commands.spawn(new En({camera:new ne,projection:new re,transform:z.from_xyz(2,2,2).look_at(y.ZERO,y.Y)}),new Se({enabled:!0,edge_threshold:Xe.High,edge_threshold_min:Xe.High})).entity.hold();const _=$.from(js.from_size(10)),p=new H({base_color:ye.WHITE,perceptual_roughness:1});this.commands.spawn(new Gt({mesh:_,material:p,transform:z.from_xyz(0,-.5,0)}));const f=$.from(new Rn(1)),g=new H({base_color_texture:i,base_color:ye.WHITE,perceptual_roughness:1});this.commands.spawn(new Gt({mesh:f,material:g,transform:z.from_xyz(0,0,0)})),this.commands.execute()}}const a=new Tn({canvas:t,shaderCompilerPath:xn}).add_plugins(...bn).add_systems(It,s);a.run();const o=e.addFolder("ambient"),l={color:"#FF4400",brightness:.05};o.addColor(l,"color").onChange(h=>{const _=n.write(Bt);_.color=ye.hex(h)}),o.add(l,"brightness",0,1).onChange(h=>{const _=n.write(Bt);_.brightness=h});const c=e.addFolder("directional"),u={color:"#faf2d1",illuminance:1e4,dx:-2.5,dy:1.5,dz:2};return c.addColor(u,"color").onChange(h=>{const _=r.write(pt);_.color=ye.hex(h)}),c.add(u,"illuminance",0,1e5).onChange(h=>{const _=r.write(pt);_.illuminance=h}),c.add(u,"dx",-5,5).onChange(h=>{const _=r.write(z),{translation:p,rotation:f,scale:g}=z.from_xyz(h,u.dy,u.dz).look_at(y.ZERO,y.Y);_.translation=p,_.rotation=f,_.scale=g}),c.add(u,"dy",-5,5).onChange(h=>{const _=r.write(z),{translation:p,rotation:f,scale:g}=z.from_xyz(u.dx,h,u.dz).look_at(y.ZERO,y.Y);_.translation=p,_.rotation=f,_.scale=g}),c.add(u,"dz",-5,5).onChange(h=>{const _=r.write(z),{translation:p,rotation:f,scale:g}=z.from_xyz(u.dx,u.dy,h).look_at(y.ZERO,y.Y);_.translation=p,_.rotation=f,_.scale=g}),async()=>{await a.exit()}}const Zs=Object.freeze(Object.defineProperty({__proto__:null,FPSCameraController:gp,FXAA:Sp,Fog:xp,Light:Op,MultiViews:Np,OrbitCameraController:Ep,Skybox:bp,ToneMapping:Ip},Symbol.toStringTag,{value:"Module"}));/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.16.1
 * @author George Michael Brower
 * @license MIT
 */class Pt{constructor(e,n,r,i,s="div"){this.parent=e,this.object=n,this.property=r,this._disabled=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),Pt.nextNameID=Pt.nextNameID||0,this.$name.id=`lil-gui-name-${++Pt.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}options(e){const n=this.parent.add(this.object,this.property,e);return n.name(this._name),this.destroy(),n}min(e){return this}max(e){return this}step(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Cp extends Pt{constructor(e,n,r){super(e,n,r,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function xs(t){let e,n;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?n=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),n?"#"+n:!1}const Mp={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:xs,toHexString:xs},Fr={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},Bp={isPrimitive:!1,match:Array.isArray,fromHexString(t,e,n=1){const r=Fr.fromHexString(t);e[0]=(r>>16&255)/255*n,e[1]=(r>>8&255)/255*n,e[2]=(r&255)/255*n},toHexString([t,e,n],r=1){r=255/r;const i=t*r<<16^e*r<<8^n*r<<0;return Fr.toHexString(i)}},Dp={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,n=1){const r=Fr.fromHexString(t);e.r=(r>>16&255)/255*n,e.g=(r>>8&255)/255*n,e.b=(r&255)/255*n},toHexString({r:t,g:e,b:n},r=1){r=255/r;const i=t*r<<16^e*r<<8^n*r<<0;return Fr.toHexString(i)}},Pp=[Mp,Fr,Bp,Dp];function Up(t){return Pp.find(e=>e.match(t))}class Fp extends Pt{constructor(e,n,r,i){super(e,n,r,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Up(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=xs(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const n=this._format.fromHexString(e);this.setValue(n)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ls extends Pt{constructor(e,n,r){super(e,n,r,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Lp extends Pt{constructor(e,n,r,i,s,a){super(e,n,r,"number"),this._initInput(),this.min(i),this.max(s);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,n=!0){return this._step=e,this._stepExplicit=n,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let n=(e-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=e),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{const E=parseFloat(this.$input.value);isNaN(E)||this.setValue(this._clamp(E))},n=E=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+E),this.$input.value=this.getValue())},r=E=>{E.code==="Enter"&&this.$input.blur(),E.code==="ArrowUp"&&(E.preventDefault(),n(this._step*this._arrowKeyMultiplier(E))),E.code==="ArrowDown"&&(E.preventDefault(),n(this._step*this._arrowKeyMultiplier(E)*-1))},i=E=>{this._inputFocused&&(E.preventDefault(),n(this._step*this._normalizeMouseWheel(E)))};let s=!1,a,o,l,c,u;const h=5,_=E=>{a=E.clientX,o=l=E.clientY,s=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",f)},p=E=>{if(s){const v=E.clientX-a,x=E.clientY-o;Math.abs(x)>h?(E.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>h&&f()}if(!s){const v=E.clientY-l;u-=v*this._step*this._arrowKeyMultiplier(E),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}l=E.clientY},f=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",f)},g=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",_),this.$input.addEventListener("focus",g),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(E,v,x,C,k)=>(E-v)/(x-v)*(k-C)+C,n=E=>{const v=this.$slider.getBoundingClientRect();let x=e(E,v.left,v.right,this._min,this._max);this._snapClampSetValue(x)},r=E=>{this._setDraggingStyle(!0),n(E.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=E=>{n(E.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let a=!1,o,l;const c=E=>{E.preventDefault(),this._setDraggingStyle(!0),n(E.touches[0].clientX),a=!1},u=E=>{E.touches.length>1||(this._hasScrollBar?(o=E.touches[0].clientX,l=E.touches[0].clientY,a=!0):c(E),window.addEventListener("touchmove",h),window.addEventListener("touchend",_))},h=E=>{if(a){const v=E.touches[0].clientX-o,x=E.touches[0].clientY-l;Math.abs(v)>Math.abs(x)?c(E):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",_))}else E.preventDefault(),n(E.touches[0].clientX)},_=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",_)},p=this._callOnFinishChange.bind(this),f=400;let g;const m=E=>{if(Math.abs(E.deltaX)<Math.abs(E.deltaY)&&this._hasScrollBar)return;E.preventDefault();const x=this._normalizeMouseWheel(E)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(p,f)};this.$slider.addEventListener("mousedown",r),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,n="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${n}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:n,deltaY:r}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(n=0,r=-e.wheelDelta/120,r*=this._stepExplicit?1:10),n+-r}_arrowKeyMultiplier(e){let n=this._stepExplicit?1:10;return e.shiftKey?n*=10:e.altKey&&(n/=10),n}_snap(e){const n=Math.round(e/this._step)*this._step;return parseFloat(n.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Vp extends Pt{constructor(e,n,r,i){super(e,n,r,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(s=>{const a=document.createElement("option");a.innerHTML=s,this.$select.appendChild(a)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),n=this._values.indexOf(e);return this.$select.selectedIndex=n,this.$display.innerHTML=n===-1?e:this._names[n],this}}class Hp extends Pt{constructor(e,n,r){super(e,n,r,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const zp=`.lil-gui {
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
}`;function kp(t){const e=document.createElement("style");e.innerHTML=t;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(e,n):document.head.appendChild(e)}let Qa=!1;class Gs{constructor({parent:e,autoPlace:n=e===void 0,container:r,width:i,title:s="Controls",injectStyles:a=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),o&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Qa&&a&&(kp(zp),Qa=!0),r?r.appendChild(this.domElement):n&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,n,r,i,s){if(Object(r)===r)return new Vp(this,e,n,r);const a=e[n];switch(typeof a){case"number":return new Lp(this,e,n,r,i,s);case"boolean":return new Cp(this,e,n);case"string":return new Hp(this,e,n);case"function":return new ls(this,e,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,e,`
	value:`,a)}addColor(e,n,r=1){return new Fp(this,e,n,r)}addFolder(e){return new Gs({parent:this,title:e})}load(e,n=!0){return e.controllers&&this.controllers.forEach(r=>{r instanceof ls||r._name in e.controllers&&r.load(e.controllers[r._name])}),n&&e.folders&&this.folders.forEach(r=>{r._title in e.folders&&r.load(e.folders[r._title])}),this}save(e=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(r=>{if(!(r instanceof ls)){if(r._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${r._name}"`);n.controllers[r._name]=r.save()}}),e&&this.folders.forEach(r=>{if(r._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${r._title}"`);n.folders[r._title]=r.save()}),n}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("transition");const r=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",r))};this.$children.addEventListener("transitionend",r);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(r=>r.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(n=>{e=e.concat(n.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(n=>{e=e.concat(n.foldersRecursive())}),e}}async function Xp(t,e){const{width:n,height:r}=e.params||{};let i=document.getElementById("canvas");i&&i.remove(),i=document.createElement("div"),i.id="canvas",t.appendChild(i),i.innerHTML="";const s=document.createElement("canvas");s.width=n||1e3,s.height=r||1e3,s.style.width=`${s.width/window.devicePixelRatio}px`,s.style.height=`${s.height/window.devicePixelRatio}px`,s.style.outline="none",s.style.padding="0px",s.style.margin="0px",i.appendChild(s);const a=new Gs({autoPlace:!1});return t.appendChild(a.domElement),await e(s,a)}const sn=document.createElement("select");sn.id="example-select";sn.style.margin="1em";sn.onchange=$p;sn.style.display="block";document.body.append(sn);const Wp=Object.keys(Zs).map(t=>{const e=document.createElement("option");return e.textContent=t,e.value=t,e});Wp.forEach(t=>sn.append(t));const Za=new URL(location).searchParams.get("name");Zs[Za]&&(sn.value=Za);const Ga=document.getElementById("container");let cs;Wo();async function Wo(){cs&&await cs(),Ga.innerHTML="";const t=Zs[sn.value];cs=await Xp(Ga,t),window.screenshot&&await window.screenshot()}function $p(){const{value:t}=sn;history.pushState({value:t},"",`?name=${t}`),location.reload(),Wo()}

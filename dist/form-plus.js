!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FormPlus=t():e.FormPlus=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=23)}([function(e,t,n){"use strict";var r=n(3);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";function r(e,t,n){return"string"==typeof e?function(e,t,n){var r,i=[],o="";e=e.split("");for(var a=0;a<e.length;a++){var u=e[a];r||u!==t?r=!r&&u===n||(r&&u!==n&&u!==t&&(o+=n),o+=u,!1):(i.push(o),o="")}return r&&(o+=n),i.push(o),i}(e,t||".",n||"\\"):e}function i(e,t,n,i,o){var a=e;t=r(t,i,o);for(var u=0;u<t.length;u++){var s=t[u];if(void 0===a[s])return n;a=a[s]}return void 0!==a?a:n}function o(e,t,n,i,o){for(var a=e,u=(t=r(t,i,o)).length,s=0;s<u;s++){var c=t[s];s===u-1?a[c]=n:void 0===a[c]&&(a[c]={}),a=a[c]}}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){try{e=JSON.parse(e)}catch(e){if(t)throw e}return e}var s=function(e,t,n,r,s){var c,f=t.split("."),l="data-"+f.shift().replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}),d=f.join(".");if(e.hasAttribute(l)?(c=u(e.getAttribute(l),s),d&&(c=i(c,d,n))):c=n,r){var v=Array.isArray(r);(v?r:Object.keys(r)).forEach(function(t){var n=v?t:r[t];if(t="@"===t.charAt(0)?t.substr(1):l+"-"+t,e.hasAttribute(t)){var i=u(e.getAttribute(t),s);(n="string"==typeof n?n:n[a(i)]||n.other)&&o(c=c||{},n,i)}})}return c};function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){var n=e?s(e,t.namespace,{},t.shorthands):{};return"object"===c(n)?n:{enabled:!!n}}function l(e,t,n){var r=n({},t,f(e.target,t),f(i(e,"detail.activeButton"),t));o(e,"detail."+t.namespace,r)}function d(e,t){return i(e,"detail."+t.namespace,{})}n.d(t,"a",function(){return f}),n.d(t,"c",function(){return l}),n.d(t,"b",function(){return d})},,function(e,t,n){"use strict";var r,i={eventLast:"submitlast",eventBefore:"submitbefore",eventStart:"submitstart",eventEnd:"submitend"},o=document,a=o.defaultView,u=Element.prototype.closest,s=Object.assign,c=a.CustomEvent,f=null,l=null,d=!1,v=null;function m(e){var t=e.target;!(t=t&&u.call(t,"button,input"))||"submit"!==t.type&&"image"!==t.type||(l=t,setTimeout(function(){l=null},1))}function p(){f=null,d=!1,a.removeEventListener("submit",y),a.addEventListener("submit",y)}function b(e,t){var n={transport:"default"};return e===v.eventBefore&&(n.activeButton=l),void 0!==t&&(n.timeout=t),new c(e,{bubbles:!0,cancelable:!1,detail:n})}function g(e,t,n){var r=b(t,n);e.dispatchEvent(r)}function y(e){a.removeEventListener("submit",y);var t=e.target,n=new c(v.eventLast,{bubbles:!0,cancelable:!0,detail:{activeButton:l}});e.defaultPrevented&&n.preventDefault(),t.dispatchEvent(n),n.defaultPrevented?e.preventDefault():g(f=t,v.eventBefore)}function h(){f&&!d&&g(f,v.eventStart),d=!0,r=r||b(v.eventEnd)}function E(e){f&&(r?(r.detail.timeout=e,f.dispatchEvent(r)):g(f,v.eventEnd,e)),f=null,d=!1}function L(){E(!1)}t.a={setShim:function(e,t,n){u=e||u,s=t||s,c=n||c},getSendingForm:function(){return f},forceSubmitEnd:function(e){E(e)},getSettings:function(){return v},register:function(e){if(v)throw new Error("form-extra-events already registered");return v=s({},i,e||{}),a.addEventListener("click",m),o.addEventListener("submit",p),a.addEventListener("beforeunload",h),a.addEventListener("unload",L),v},unregister:function(){v=null,a.removeEventListener("click",m),o.removeEventListener("submit",p),a.removeEventListener("beforeunload",h),a.removeEventListener("unload",L)}}},function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var i="$context",o="$document",a=Element.prototype.closest;function u(e,t){var n=i,u=t.split("<<");if(1<u.length){var s=r(u,2);n=s[0],t=s[1],n=n.trim()||o,t=t.trim()}return[n===o?e.ownerDocument:n===i?e:a.call(e,n),t]}t.a={setShim:function(e){a=e||a},one:function(e,t){var n=r(u(e,t),2),i=n[0],o=n[1];return i?o?i.querySelector(o):i:null},all:function(e,t){var n=r(u(e,t),2),i=n[0],o=n[1];return i?o?Array.prototype.slice.call(i.querySelectorAll(o)):[i]:[]}}},,function(e,t,n){"use strict";var r=n(0),i=n(1);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var a,u,s={enabled:!1,value:"",mode:"name",namespace:"skipEmpty",shorthands:null},c=document.defaultView,f=Object.assign,l=[];function d(e){Object(i.c)(e,a,f)}function v(e){var t=e.target,n=Object(i.b)(e,a);l=[];for(var r=0;r<t.elements.length;r++){var o=t.elements[r];if(o.name&&!o.disabled&&-1===["reset","submit","button","image"].indexOf(o.type)){var u=f({},n,Object(i.a)(o,a));if(u.enabled&&o.value===u.value){var s=u.mode;l.push([o,s,o.name,o.form]),"name"===s?o.name="":"form"===s?o.setAttribute("form","_skipEmpty"):o.disabled=!0}}}}function m(){for(var e=0;e<l.length;e++){var t=o(l[e],4),n=t[0],r=t[1],i=t[2],a=t[3];"name"===r?n.name=i:"form"===r?n.setAttribute("form",a):n.disabled=!1}l=[]}t.a={setShim:function(e){f=e||f},register:function(e){if(a)throw new Error("skip-empty already registered");return(u=r.a.getSettings())||(u=r.a.register()),a=f({},s,e||{}),c.addEventListener(u.eventBefore,d,!0),c.addEventListener(u.eventBefore,v),c.addEventListener(u.eventStart,m),a},unregister:function(){a&&(c.removeEventListener(u.eventBefore,d,!0),c.removeEventListener(u.eventBefore,v),c.removeEventListener(u.eventStart,m),a=null)}}},function(e,t,n){"use strict";var r,i,o=n(0),a=n(1),u={enabled:!1,namespace:"submitLock",shorthands:null},s=document.defaultView,c="_submitLock",f=Object.assign;function l(e){Object(a.c)(e,r,f)}function d(e){Object(a.b)(e,r).enabled&&e.target[c]&&e.preventDefault()}function v(e){e.target[c]=!0}function m(e){e.target[c]=!1}t.a={setShim:function(e){f=e||f},register:function(e){if(r)throw new Error("submit-lock already registered");(i=o.a.getSettings())||(i=o.a.register()),r=f({},u,e||{}),s.addEventListener(i.eventLast,l,!0),s.addEventListener(i.eventLast,d),s.addEventListener(i.eventBefore,v),s.addEventListener(i.eventEnd,m)},unregister:function(){r&&(s.removeEventListener(i.eventLast,l,!0),s.removeEventListener(i.eventLast,d),s.removeEventListener(i.eventBefore,v),s.removeEventListener(i.eventEnd,m),r=null)}}},function(e,t,n){"use strict";var r,i,o,a,u,s,c,f=n(0),l=n(1),d={enabled:!1,param:"_requestId",interval:100,timeout:3e4,namespace:"catchDownload",shorthands:null},v=document,m=v.defaultView,p=Object.assign;function b(){-1!==v.cookie.indexOf(u.param+a+"=1")&&(y(),f.a.forceSubmitEnd(!1))}function g(){y(),f.a.forceSubmitEnd(!0)}function y(){r&&clearInterval(r),i&&clearTimeout(i),a&&(v.cookie="".concat(u.param).concat(a,"=; expires=").concat(new Date(0).toUTCString(),"; path=/")),a=r=i=null}function h(){a&&y()}function E(e){"default"===(e.detail||{}).transport&&Object(l.c)(e,s,p)}function L(e){(u=Object(l.b)(e,s)).enabled&&(a=Date.now(),(o=v.createElement("input")).type="hidden",o.name=u.param,o.value=a,e.target.appendChild(o))}function S(){a&&(o.parentNode.removeChild(o),r=setInterval(b,u.interval),i=setTimeout(g,u.timeout))}function w(){a&&y()}t.a={setShim:function(e){p=e||p},getRequestId:function(){return a},register:function(e){if(s)throw new Error("catch-download already registered");return(c=f.a.getSettings())||(c=f.a.register()),s=p({},d,e||{}),m.addEventListener("submit",h,!0),m.addEventListener(c.eventBefore,E,!0),m.addEventListener(c.eventBefore,L),m.addEventListener(c.eventStart,S),m.addEventListener(c.eventEnd,w),s},unregister:function(){s&&(m.removeEventListener("submit",h,!0),m.removeEventListener(c.eventBefore,E,!0),m.removeEventListener(c.eventBefore,L),m.removeEventListener(c.eventStart,S),m.removeEventListener(c.eventEnd,w),s=null)}}},function(e,t,n){"use strict";var r,i,o,a,u,s=n(0),c=n(1),f={enabled:!1,eventDone:"submitdone",eventFail:"submitfail",namespace:"ajaxSubmit",shorthands:null},l=document,d=l.defaultView,v=d.URLSearchParams,m=Object.assign,p=d.CustomEvent;function b(e){var t=e.target;if(t&&"image"===t.type){var n=t.getBoundingClientRect(),o=l.documentElement;r=Math.round(e.pageX-n.left-o.scrollLeft),i=Math.round(e.pageY-n.top-o.scrollTop),setTimeout(function(){r=i=0},1)}}function g(e){Object(c.c)(e,o,m)}function y(e){e.defaultPrevented||Object(c.b)(e,o).enabled&&(e.preventDefault(),function(e,t){var n,u=t&&t.getAttribute("formaction")||e.action,s=t&&t.getAttribute("formenctype")||e.enctype,c=t&&t.getAttribute("formmethod")||e.method,f=null,l="get"===c.toLowerCase(),d="multipart/form-data"===s,v=[];t&&""!==t.name&&(v.push(h(t)),"image"===t.type&&(v.push(h(t,t.name+".x",r)),v.push(h(t,t.name+".y",i))),n=t.name,t.name="");var m=new XMLHttpRequest;if(m.open(c,u,!0),l||d||m.setRequestHeader("Content-Type",s),E(e,a.eventBefore,m,t),l){var p=L(e);u=u.replace(/(?:\?.*)?$/,p?"?"+p:""),m.open(c,u,!0)}else f=d?new FormData(e):L(e);for(var b=0;b<v.length;b++){var g=v[b];g.parentNode.removeChild(g)}n&&(t.name=n),m.addEventListener("loadstart",function(t){E(e,a.eventStart,t.target)}),m.addEventListener("loadend",function(t){200===t.target.status?o.eventDone&&E(e,o.eventDone,t.target):o.eventFail&&E(e,o.eventFail,t.target),E(e,a.eventEnd,t.target)}),m.send(f)}(e.target,e.detail.activeButton))}function h(e,t,n){var r=l.createElement("input");r.type="hidden",r.name=t||e.name,r.value=n||e.value;var i=e.getAttribute("form");return i&&r.setAttribute("form",i),e.parentNode.insertBefore(r,e),r}function E(e,t,n,r){var i={transport:"ajax",xhr:n};r&&(i.activeButton=r);var o=new p(t,{bubbles:!0,cancelable:!1,detail:i});e.dispatchEvent(o)}function L(e){var t=window.URLSearchParams;return void 0===u&&(u=function(){if(v)try{var e=new FormData;return e.append("a",""),new v(e).has("a")}catch(e){return!1}return!1}()),u?new t(new FormData(e)).toString():function(e){for(var t="",n=0;n<e.elements.length;n++){var r=e.elements[n];if(A(r))if("select-multiple"===r.type)for(var i=0;i<r.options.length;i++){var o=r.options[i];o.selected&&(t+=S(r.name,o.value))}else t+=S(r.name,r.value)}return t.substr(1)}(e)}function S(e,t){return"&"+w(e)+"="+w(t)}function w(e){return encodeURIComponent(e).replace(/%20/g,"+")}function A(e){var t=e.type;return!!(e.checked||"checkbox"!==t&&"radio"!==t)&&""!==e.name&&!e.disabled&&-1===["submit","button","reset"].indexOf(t)}r=i=0,t.a={setShim:function(e,t){m=e||m,p=t||p},getSettings:function(){return o},register:function(e){if(o)throw new Error("ajax-submit already registered");return(a=s.a.getSettings())||(a=s.a.register()),o=m({},f,e||{}),d.addEventListener("click",b),d.addEventListener(a.eventLast,g,!0),d.addEventListener(a.eventLast,y),o},unregister:function(){o&&(d.removeEventListener("click",b),d.removeEventListener(a.eventLast,g,!0),d.removeEventListener(a.eventLast,y),o=null)}}},function(e,t,n){"use strict";var r,i,o,a=n(0),u=n(4),s={prepend:function(e,t){t.insertAdjacentHTML("afterbegin",e.innerHTML)},append:function(e,t){t.insertAdjacentHTML("beforeend",e.innerHTML)},before:function(e,t){t.insertAdjacentHTML("beforebegin",e.innerHTML)},after:function(e,t){t.insertAdjacentHTML("afterend",e.innerHTML)},replace:function(e,t){t.outerHTML=e.innerHTML},content:function(e,t){t.innerHTML=e.innerHTML},text:function(e,t){t.textContent=e.innerHTML},remove:function(e,t){t.parentNode.removeChild(t)},empty:function(e,t){t.innerHTML=""},addClass:function(e,t){t.classList.add(e.getAttribute("class"))},removeClass:function(e,t){t.classList.remove(e.getAttribute("class"))},toggleClass:function(e,t){t.classList.toggle(e.getAttribute("class"))},setAttr:function(e,t){t.setAttribute(e.getAttribute("attr"),e.getAttribute("value"))},removeAttr:function(e,t){t.removeAttribute(e.getAttribute("attr"))},setProp:function(e,t){var n=e.getAttribute("value");try{n=JSON.parse(n)}catch(e){}t[e.getAttribute("prop")]=n}},c=document.defaultView,f=Object.assign;function l(e,t){var n;if("string"==typeof e){var r=(new DOMParser).parseFromString(e,"text/html");n=r.body.childNodes}else n=e.childNodes;t=t||document.body;for(var o=function(e){var r=n[e];if("ACTION"===r.nodeName){var o=r.getAttribute("action"),a=i[o];if(a)if(r.hasAttribute("targets"))u.a.all(t,r.getAttribute("targets")).forEach(function(e){a(r,e,t)});else if(r.hasAttribute("target")){var s=u.a.one(t,r.getAttribute("target"));s&&a(r,s,t)}else a(r,null,t)}},a=0;a<n.length;a++)o(a)}function d(e){if(!e.defaultPrevented&&e.detail&&"ajax"===e.detail.transport){var t=e.detail||{},n=t.xhr&&t.xhr.getResponseHeader("Content-Type");n&&n.substr(0,30)===r&&l(t.xhr.response,e.target)}}t.a={setShim:function(e){f=e||f},registerAction:function(e,t){i[e]=t},registerActions:function(e){f(i,e)},runScenario:function(e,t){l(e,t)},register:function(e){if(o)throw new Error("ajax-response already registered");(o=a.a.getSettings())||(o=a.a.register()),i=f({},(e=e||{}).skipBuildIns?{}:s,e.actions||{}),r=e.contentType||"application/form-plus-response",c.addEventListener(o.eventEnd,d)},unregister:function(){o&&(c.removeEventListener(o.eventEnd,d),o=null)}}},,,,,,,,function(e,t,n){"use strict";var r=n(6);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";var r=n(7);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";var r=n(8);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";var r=n(9);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";var r=n(10);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";n.r(t);var r=n(18);n.d(t,"SkipEmpty",function(){return r.a});var i=n(19);n.d(t,"SubmitLock",function(){return i.a});var o=n(20);n.d(t,"CatchDownload",function(){return o.a});var a=n(21);n.d(t,"AjaxSubmit",function(){return a.a});var u=n(22);n.d(t,"AjaxResponse",function(){return u.a})}])});
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FormPlus=t():e.FormPlus=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=24)}([function(e,t,n){"use strict";var r=n(3);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";function r(e,t,n){return"string"==typeof e?function(e,t,n){var r,a=[],i="";e=e.split("");for(var o=0;o<e.length;o++){var u=e[o];r||u!==t?r=!r&&u===n||(r&&u!==n&&u!==t&&(i+=n),i+=u,!1):(a.push(i),i="")}return r&&(i+=n),a.push(i),a}(e,t||".",n||"\\"):e}function a(e,t,n,a,i){var o=e;t=r(t,a,i);for(var u=0;u<t.length;u++){var s=t[u];if(void 0===o[s])return n;o=o[s]}return void 0!==o?o:n}function i(e,t,n,a,i){for(var o=e,u=(t=r(t,a,i)).length,s=0;s<u;s++){var c=t[s];s===u-1?o[c]=n:void 0===o[c]&&(o[c]={}),o=o[c]}}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){try{e=JSON.parse(e)}catch(e){if(t)throw e}return e}var s=function(e,t,n,r,s){var c,f=t.split("."),l="data-"+f.shift().replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}),v=f.join(".");if(e.hasAttribute(l)?(c=u(e.getAttribute(l),s),v&&(c=a(c,v,n))):c=n,r){var d=Array.isArray(r);(d?r:Object.keys(r)).forEach(function(t){var n=d?t:r[t];if(t="@"===t.charAt(0)?t.substr(1):l+"-"+t,e.hasAttribute(t)){var a=u(e.getAttribute(t),s);(n="string"==typeof n?n:n[o(a)]||n.other)&&i(c=c||{},n,a)}})}return c};function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){var n=e?s(e,t.namespace,{},t.shorthands):{};return"object"===c(n)?n:{enabled:!!n}}function l(e,t,n){var r=n({},t,f(e.target,t),f(a(e,"detail.activeButton"),t));i(e,"detail."+t.namespace,r)}function v(e,t){return a(e,"detail."+t.namespace,{})}n.d(t,"a",function(){return f}),n.d(t,"c",function(){return l}),n.d(t,"b",function(){return v})},function(e,t,n){"use strict";t.a=Object.assign||function(e){if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=0;n<(arguments.length<=1?0:arguments.length-1);n++){var r=n+1<1||arguments.length<=n+1?void 0:arguments[n+1];if(null!=r)for(var a=Object.keys(Object(r)),i=0,o=a.length;i<o;i++){var u=a[i],s=Object.getOwnPropertyDescriptor(r,u);void 0!==s&&s.enumerable&&(t[u]=r[u])}}return t}},function(e,t,n){"use strict";var r,a={eventLast:"submitlast",eventBefore:"submitbefore",eventStart:"submitstart",eventEnd:"submitend"},i=document,o=i.defaultView,u=Element.prototype.closest,s=Object.assign,c=o.CustomEvent,f=null,l=null,v=!1,d=null;function m(e){var t=e.target;!(t=t&&u.call(t,"button,input"))||"submit"!==t.type&&"image"!==t.type||(l=t,setTimeout(function(){l=null},1))}function p(){f=null,v=!1,o.removeEventListener("submit",h),o.addEventListener("submit",h)}function b(e,t){var n={transport:"default"};return e===d.eventBefore&&(n.activeButton=l),void 0!==t&&(n.timeout=t),new c(e,{bubbles:!0,cancelable:!1,detail:n})}function g(e,t,n){var r=b(t,n);e.dispatchEvent(r)}function h(e){o.removeEventListener("submit",h);var t=e.target,n=new c(d.eventLast,{bubbles:!0,cancelable:!0,detail:{activeButton:l}});e.defaultPrevented&&n.preventDefault(),t.dispatchEvent(n),n.defaultPrevented?e.preventDefault():g(f=t,d.eventBefore)}function y(){f&&!v&&g(f,d.eventStart),v=!0,r=r||b(d.eventEnd)}function E(e){f&&(r?(r.detail.timeout=e,f.dispatchEvent(r)):g(f,d.eventEnd,e)),f=null,v=!1}function L(){E(!1)}t.a={setShim:function(e,t,n){u=e||u,s=t||s,c=n||c},getSendingForm:function(){return f},forceSubmitEnd:function(e){E(e)},getSettings:function(){return d},register:function(e){if(d)throw new Error("form-extra-events already registered");return d=s({},a,e||{}),o.addEventListener("click",m),i.addEventListener("submit",p),o.addEventListener("beforeunload",y),o.addEventListener("unload",L),d},unregister:function(){d=null,o.removeEventListener("click",m),i.removeEventListener("submit",p),o.removeEventListener("beforeunload",y),o.removeEventListener("unload",L)}}},function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(a)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var a="$context",i="$document",o=Element.prototype.closest;function u(e,t){var n=a,u=t.split("<<");if(1<u.length){var s=r(u,2);n=s[0],t=s[1],n=n.trim()||i,t=t.trim()}return[n===i?e.ownerDocument:n===a?e:o.call(e,n),t]}t.a={setShim:function(e){o=e||o},one:function(e,t){var n=r(u(e,t),2),a=n[0],i=n[1];return a?i?a.querySelector(i):a:null},all:function(e,t){var n=r(u(e,t),2),a=n[0],i=n[1];return a?i?Array.prototype.slice.call(a.querySelectorAll(i)):[a]:[]}}},function(e,t,n){"use strict";var r=n(11),a=n(2),i=n(12),o=n(3);o.a.setShim(r.a,a.a,i.a),o.a},function(e,t,n){"use strict";var r=n(0),a=n(1);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(a)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var o,u,s={enabled:!1,value:"",mode:"name",namespace:"skipEmpty",shorthands:null},c=document.defaultView,f=Object.assign,l=[];function v(e){Object(a.c)(e,o,f)}function d(e){var t=e.target,n=Object(a.b)(e,o);l=[];for(var r=0;r<t.elements.length;r++){var i=t.elements[r];if(i.name&&!i.disabled&&-1===["reset","submit","button","image"].indexOf(i.type)){var u=f({},n,Object(a.a)(i,o));if(u.enabled&&i.value===u.value){var s=u.mode;l.push([i,s,i.name,i.form]),"name"===s?i.name="":"form"===s?i.setAttribute("form","_skipEmpty"):i.disabled=!0}}}}function m(){for(var e=0;e<l.length;e++){var t=i(l[e],4),n=t[0],r=t[1],a=t[2],o=t[3];"name"===r?n.name=a:"form"===r?n.setAttribute("form",o):n.disabled=!1}l=[]}t.a={setShim:function(e){f=e||f},register:function(e){if(o)throw new Error("skip-empty already registered");return(u=r.a.getSettings())||(u=r.a.register()),o=f({},s,e||{}),c.addEventListener(u.eventBefore,v,!0),c.addEventListener(u.eventBefore,d),c.addEventListener(u.eventStart,m),o},unregister:function(){o&&(c.removeEventListener(u.eventBefore,v,!0),c.removeEventListener(u.eventBefore,d),c.removeEventListener(u.eventStart,m),o=null)}}},function(e,t,n){"use strict";var r,a,i=n(0),o=n(1),u={enabled:!1,namespace:"submitLock",shorthands:null},s=document.defaultView,c="_submitLock",f=Object.assign;function l(e){Object(o.c)(e,r,f)}function v(e){Object(o.b)(e,r).enabled&&e.target[c]&&e.preventDefault()}function d(e){e.target[c]=!0}function m(e){e.target[c]=!1}t.a={setShim:function(e){f=e||f},register:function(e){if(r)throw new Error("submit-lock already registered");(a=i.a.getSettings())||(a=i.a.register()),r=f({},u,e||{}),s.addEventListener(a.eventLast,l,!0),s.addEventListener(a.eventLast,v),s.addEventListener(a.eventBefore,d),s.addEventListener(a.eventEnd,m)},unregister:function(){r&&(s.removeEventListener(a.eventLast,l,!0),s.removeEventListener(a.eventLast,v),s.removeEventListener(a.eventBefore,d),s.removeEventListener(a.eventEnd,m),r=null)}}},function(e,t,n){"use strict";var r,a,i,o,u,s,c,f=n(0),l=n(1),v={enabled:!1,param:"_requestId",interval:100,timeout:3e4,namespace:"catchDownload",shorthands:null},d=document,m=d.defaultView,p=Object.assign;function b(){-1!==d.cookie.indexOf(u.param+o+"=1")&&(h(),f.a.forceSubmitEnd(!1))}function g(){h(),f.a.forceSubmitEnd(!0)}function h(){r&&clearInterval(r),a&&clearTimeout(a),o&&(d.cookie="".concat(u.param).concat(o,"=; expires=").concat(new Date(0).toUTCString(),"; path=/")),o=r=a=null}function y(){o&&h()}function E(e){"default"===(e.detail||{}).transport&&Object(l.c)(e,s,p)}function L(e){(u=Object(l.b)(e,s)).enabled&&(o=Date.now(),(i=d.createElement("input")).type="hidden",i.name=u.param,i.value=o,e.target.appendChild(i))}function S(){o&&(i.parentNode.removeChild(i),r=setInterval(b,u.interval),a=setTimeout(g,u.timeout))}function w(){o&&h()}t.a={setShim:function(e){p=e||p},getRequestId:function(){return o},register:function(e){if(s)throw new Error("catch-download already registered");return(c=f.a.getSettings())||(c=f.a.register()),s=p({},v,e||{}),m.addEventListener("submit",y,!0),m.addEventListener(c.eventBefore,E,!0),m.addEventListener(c.eventBefore,L),m.addEventListener(c.eventStart,S),m.addEventListener(c.eventEnd,w),s},unregister:function(){s&&(m.removeEventListener("submit",y,!0),m.removeEventListener(c.eventBefore,E,!0),m.removeEventListener(c.eventBefore,L),m.removeEventListener(c.eventStart,S),m.removeEventListener(c.eventEnd,w),s=null)}}},function(e,t,n){"use strict";var r,a,i,o,u,s=n(0),c=n(1),f={enabled:!1,eventDone:"submitdone",eventFail:"submitfail",namespace:"ajaxSubmit",shorthands:null},l=document,v=l.defaultView,d=v.URLSearchParams,m=Object.assign,p=v.CustomEvent;function b(e){var t=e.target;if(t&&"image"===t.type){var n=t.getBoundingClientRect(),i=l.documentElement;r=Math.round(e.pageX-n.left-i.scrollLeft),a=Math.round(e.pageY-n.top-i.scrollTop),setTimeout(function(){r=a=0},1)}}function g(e){Object(c.c)(e,i,m)}function h(e){e.defaultPrevented||Object(c.b)(e,i).enabled&&(e.preventDefault(),function(e,t){var n,u=t&&t.getAttribute("formaction")||e.action,s=t&&t.getAttribute("formenctype")||e.enctype,c=t&&t.getAttribute("formmethod")||e.method,f=null,l="get"===c.toLowerCase(),v="multipart/form-data"===s,d=[];t&&""!==t.name&&(d.push(y(t)),"image"===t.type&&(d.push(y(t,t.name+".x",r)),d.push(y(t,t.name+".y",a))),n=t.name,t.name="");var m=new XMLHttpRequest;if(m.open(c,u,!0),l||v||m.setRequestHeader("Content-Type",s),E(e,o.eventBefore,m,t),l){var p=L(e);u=u.replace(/(?:\?.*)?$/,p?"?"+p:""),m.open(c,u,!0)}else f=v?new FormData(e):L(e);for(var b=0;b<d.length;b++){var g=d[b];g.parentNode.removeChild(g)}n&&(t.name=n),m.addEventListener("loadstart",function(t){E(e,o.eventStart,t.target)}),m.addEventListener("loadend",function(t){200===t.target.status?i.eventDone&&E(e,i.eventDone,t.target):i.eventFail&&E(e,i.eventFail,t.target),E(e,o.eventEnd,t.target)}),m.send(f)}(e.target,e.detail.activeButton))}function y(e,t,n){var r=l.createElement("input");r.type="hidden",r.name=t||e.name,r.value=n||e.value;var a=e.getAttribute("form");return a&&r.setAttribute("form",a),e.parentNode.insertBefore(r,e),r}function E(e,t,n,r){var a={transport:"ajax",xhr:n};r&&(a.activeButton=r);var i=new p(t,{bubbles:!0,cancelable:!1,detail:a});e.dispatchEvent(i)}function L(e){var t=window.URLSearchParams;return void 0===u&&(u=function(){if(d)try{var e=new FormData;return e.append("a",""),new d(e).has("a")}catch(e){return!1}return!1}()),u?new t(new FormData(e)).toString():function(e){for(var t="",n=0;n<e.elements.length;n++){var r=e.elements[n];if(A(r))if("select-multiple"===r.type)for(var a=0;a<r.options.length;a++){var i=r.options[a];i.selected&&(t+=S(r.name,i.value))}else t+=S(r.name,r.value)}return t.substr(1)}(e)}function S(e,t){return"&"+w(e)+"="+w(t)}function w(e){return encodeURIComponent(e).replace(/%20/g,"+")}function A(e){var t=e.type;return!!(e.checked||"checkbox"!==t&&"radio"!==t)&&""!==e.name&&!e.disabled&&-1===["submit","button","reset"].indexOf(t)}r=a=0,t.a={setShim:function(e,t){m=e||m,p=t||p},getSettings:function(){return i},register:function(e){if(i)throw new Error("ajax-submit already registered");return(o=s.a.getSettings())||(o=s.a.register()),i=m({},f,e||{}),v.addEventListener("click",b),v.addEventListener(o.eventLast,g,!0),v.addEventListener(o.eventLast,h),i},unregister:function(){i&&(v.removeEventListener("click",b),v.removeEventListener(o.eventLast,g,!0),v.removeEventListener(o.eventLast,h),i=null)}}},function(e,t,n){"use strict";var r,a,i,o=n(0),u=n(4),s={prepend:function(e,t){t.insertAdjacentHTML("afterbegin",e.innerHTML)},append:function(e,t){t.insertAdjacentHTML("beforeend",e.innerHTML)},before:function(e,t){t.insertAdjacentHTML("beforebegin",e.innerHTML)},after:function(e,t){t.insertAdjacentHTML("afterend",e.innerHTML)},replace:function(e,t){t.outerHTML=e.innerHTML},content:function(e,t){t.innerHTML=e.innerHTML},text:function(e,t){t.textContent=e.innerHTML},remove:function(e,t){t.parentNode.removeChild(t)},empty:function(e,t){t.innerHTML=""},addClass:function(e,t){t.classList.add(e.getAttribute("class"))},removeClass:function(e,t){t.classList.remove(e.getAttribute("class"))},toggleClass:function(e,t){t.classList.toggle(e.getAttribute("class"))},setAttr:function(e,t){t.setAttribute(e.getAttribute("attr"),e.getAttribute("value"))},removeAttr:function(e,t){t.removeAttribute(e.getAttribute("attr"))},setProp:function(e,t){var n=e.getAttribute("value");try{n=JSON.parse(n)}catch(e){}t[e.getAttribute("prop")]=n}},c=document.defaultView,f=Object.assign;function l(e,t){var n;if("string"==typeof e){var r=(new DOMParser).parseFromString(e,"text/html");n=r.body.childNodes}else n=e.childNodes;t=t||document.body;for(var i=function(e){var r=n[e];if("ACTION"===r.nodeName){var i=r.getAttribute("action"),o=a[i];if(o)if(r.hasAttribute("targets"))u.a.all(t,r.getAttribute("targets")).forEach(function(e){o(r,e,t)});else if(r.hasAttribute("target")){var s=u.a.one(t,r.getAttribute("target"));s&&o(r,s,t)}else o(r,null,t)}},o=0;o<n.length;o++)i(o)}function v(e){if(!e.defaultPrevented&&e.detail&&"ajax"===e.detail.transport){var t=e.detail||{},n=t.xhr&&t.xhr.getResponseHeader("Content-Type");n&&n.substr(0,30)===r&&l(t.xhr.response,e.target)}}t.a={setShim:function(e){f=e||f},registerAction:function(e,t){a[e]=t},registerActions:function(e){f(a,e)},runScenario:function(e,t){l(e,t)},register:function(e){if(i)throw new Error("ajax-response already registered");(i=o.a.getSettings())||(i=o.a.register()),a=f({},(e=e||{}).skipBuildIns?{}:s,e.actions||{}),r=e.contentType||"application/form-plus-response",c.addEventListener(i.eventEnd,v)},unregister:function(){i&&(c.removeEventListener(i.eventEnd,v),i=null)}}},function(e,t,n){"use strict";var r,a;t.a=(a=Element.prototype,r=a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector,Element.prototype.closest||function(e){for(var t=this;t;){if(r.call(t,e))return t;t=t.parentElement}return null})},function(e,t,n){"use strict";var r,a;t.a=(r=CustomEvent.prototype,"function"!=typeof(a=CustomEvent)&&((a=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n.preventDefault=function(){if(r.preventDefault.apply(this),this.cancelable)try{Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}catch(e){}},n}).prototype=r),a)},function(e,t,n){"use strict";n(5);var r=n(2),a=n(6);a.a.setShim(r.a),t.a=a.a},function(e,t,n){"use strict";n(5);var r=n(2),a=n(7);a.a.setShim(r.a),t.a=a.a},function(e,t,n){"use strict";n(5);var r=n(2),a=n(8);a.a.setShim(r.a),t.a=a.a},function(e,t,n){"use strict";n(5);var r=n(2),a=n(12),i=n(9);i.a.setShim(r.a,a.a),t.a=i.a},function(e,t,n){"use strict";var r=n(11),a=n(4);a.a.setShim(r.a),a.a,n(5);var i=n(2),o=n(10);o.a.setShim(i.a),t.a=o.a},,,,,,,function(e,t,n){"use strict";n.r(t);var r=n(13);n.d(t,"SkipEmpty",function(){return r.a});var a=n(14);n.d(t,"SubmitLock",function(){return a.a});var i=n(15);n.d(t,"CatchDownload",function(){return i.a});var o=n(16);n.d(t,"AjaxSubmit",function(){return o.a});var u=n(17);n.d(t,"AjaxResponse",function(){return u.a})}])});
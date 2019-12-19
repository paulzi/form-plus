import ExtraEvents from 'form-extra-events/standard';
import {prepareSettings, getSettings} from "./prepare-settings";

const defaultSettings = {
    enabled:       false,
    requestedWith: 'XMLHttpRequest',
    eventDone:     'submitdone',
    eventFail:     'submitfail',
    namespace:     'ajaxSubmit',
    shorthands:    null,
};

// shorthands for uglify
const doc = document;
const win = doc.defaultView;
const URLSearchParams = win.URLSearchParams;

// can shim
let objectAssign = Object.assign;
let CustomEvent  = win.CustomEvent;

// data
let imageX, imageY, settings, evSettings, supportUSR;
imageX = imageY = 0;

/**
 * @param {Event} e
 */
function clickHandler(e) {
    let target = e.target;
    if (target && target.type === 'image') {
        let pos  = target.getBoundingClientRect();
        let html = doc.documentElement;
        imageX = Math.round(e.pageX - pos.left - html.scrollLeft);
        imageY = Math.round(e.pageY - pos.top  - html.scrollTop);
        setTimeout(() => { imageX = imageY = 0; }, 1);
    }
}

/**
 * @param {Event} e
 */
function lastInitHandler(e) {
    prepareSettings(e, settings, objectAssign);
}

/**
 * @param {Event} e
 */
function lastHandler(e) {
    if (!e.defaultPrevented) {
        let data = getSettings(e, settings);
        if (data.enabled) {
            e.preventDefault();
            runAjaxTransport(e.target, e.detail.activeButton, data);
        }
    }
}

/**
 * @param {HTMLInputElement} base
 * @param {String} [name]
 * @param {String} [value]
 * @returns {HTMLElement}
 */
function createHidden(base, name, value) {
    let hidden = doc.createElement('input');
    hidden.type  = 'hidden';
    hidden.name  = name  || base.name;
    hidden.value = value || base.value;
    let form = base.getAttribute('form');
    form && hidden.setAttribute('form', form);
    base.parentNode.insertBefore(hidden, base);
    return hidden;
}

/**
 * @param {HTMLFormElement} form
 * @param {String} eventName
 * @param {XMLHttpRequest} xhr
 * @param {HTMLElement} [activeButton]
 */
function trigger(form, eventName, xhr, activeButton) {
    let detail = {
        transport: 'ajax',
        xhr: xhr,
    };
    activeButton && (detail.activeButton = activeButton);
    let event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: false,
        detail,
    });
    form.dispatchEvent(event);
}

/**
 * @param {HTMLFormElement} form
 * @param {HTMLElement} btn
 * @param {Object} data
 */
function runAjaxTransport(form, btn, data) {
    let url     = btn && btn.getAttribute('formaction')  || form.getAttribute('action')  || form.action;
    let enctype = btn && btn.getAttribute('formenctype') || form.getAttribute('enctype') || form.enctype;
    let method  = btn && btn.getAttribute('formmethod')  || form.getAttribute('method')  || form.method;
    let body    = null;
    let isGet       = method.toLowerCase() === 'get';
    let isMultipart = enctype === 'multipart/form-data';

    // add active btn hiddens
    let hiddens = [];
    let oldName;
    if (btn && btn.name !== '') {
        hiddens.push(createHidden(btn));
        if (btn.type === 'image') {
            hiddens.push(createHidden(btn, btn.name + '.x', imageX));
            hiddens.push(createHidden(btn, btn.name + '.y', imageY));
        }
        oldName = btn.name;
		btn.name = '';
    }

    // make xhr
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    trigger(form, evSettings.eventBefore, xhr, btn);

    // prepare body
    if (isGet) {
        let params = buildUrlEncodedParams(form);
        url = url.replace(/(?:\?.*)?$/, params ? '?' + params : '');
        xhr.open(method, url, true);
    } else {
        if (isMultipart) {
            body = new FormData(form);
        } else {
            body = buildUrlEncodedParams(form);
        }
    }

    // add headers
    if (data.requestedWith) {
        xhr.setRequestHeader('X-Requested-With', data.requestedWith);
    }
    if (!isGet && !isMultipart) {
        xhr.setRequestHeader("Content-Type", enctype);
    }

    // remove active btn hiddens
    for (let i = 0; i < hiddens.length; i++) {
        let hidden = hiddens[i];
        hidden.parentNode.removeChild(hidden);
    }
    if (oldName) {
        btn.name = oldName;
    }

    // send xhr
    xhr.addEventListener('loadstart', (e) => {
        trigger(form, evSettings.eventStart, e.target);
    });
    xhr.addEventListener('loadend', (e) => {
        if (e.target.status === 200) {
            settings.eventDone && trigger(form, settings.eventDone, e.target);
        } else {
            settings.eventFail && trigger(form, settings.eventFail, e.target);
        }
        trigger(form, evSettings.eventEnd, e.target);
    });
    xhr.send(body);
}

/**
 * @returns {boolean}
 */
function supportURLSearchParams() {
    if (URLSearchParams) {
		try {
			let formData = new FormData();
			formData.append('a', '');
			return new URLSearchParams(formData).has('a');
		} catch (e) {
			return false;
		}
    }
    return false;
}

/**
 * @param {HTMLFormElement} form
 * @returns {String}
 */
function buildUrlEncodedParams(form) {
    const URLSearchParams = window.URLSearchParams;
    if (supportUSR === undefined) {
        supportUSR = supportURLSearchParams();
    }
    if (supportUSR) {
        return new URLSearchParams(new FormData(form)).toString();
    }
    return buildParamsFromFormElements(form);
}

/**
 * @param {HTMLFormElement} form
 * @returns {String}
 */
function buildParamsFromFormElements(form) {
    let result = '';
    for (let i = 0; i < form.elements.length; i++) {
        let item = form.elements[i];
        if (submittable(item)) {
            if (item.type === 'select-multiple') {
                for (let j = 0; j < item.options.length; j++) {
                    let option = item.options[j];
                    if (option.selected) {
                        result += buildParam(item.name, option.value);
                    }
                }
            } else {
                result += buildParam(item.name, item.value);
            }
        }
    }
    return result.substr(1);
}

/**
 * @param {String} name
 * @param {String} value
 * @returns {String}
 */
function buildParam(name, value) {
    return '&' + encode(name) + '=' + encode(value);
}

/**
 * @param {String} val
 * @returns {String}
 */
function encode(val) {
    return encodeURIComponent(val).replace(/%20/g, '+');
}

/**
 * @param {HTMLElement} element
 * @returns {Boolean}
 */
function submittable(element) {
    let type = element.type;
    if (!element.checked && (type === 'checkbox' || type === 'radio')) {
        return false;
    }
    return element.name !== '' && !element.disabled && ['submit', 'button', 'reset'].indexOf(type) === -1;
}

export default {
    /**
     * Set shims
     * @param {Function|null} [setObjectAssign]
     * @param {Function|null} [setCustomEvent]
     */
    setShim: function(setObjectAssign, setCustomEvent) {
        objectAssign = setObjectAssign || objectAssign;
        CustomEvent  = setCustomEvent  || CustomEvent;
    },

    /**
     * Return current settings
     * @returns {{}}
     */
    getSettings: () => {
        return settings;
    },

    /**
     * Register plugin
     * @param {{}} [setSettings]
     * @returns {{}}
     */
    register: (setSettings) => {
        if (settings) {
            throw new Error('ajax-submit already registered');
        }
        evSettings = ExtraEvents.getSettings();
        if (!evSettings) {
            evSettings = ExtraEvents.register();
        }
        settings = objectAssign({}, defaultSettings, setSettings || {});
        win.addEventListener('click',              clickHandler);
        win.addEventListener(evSettings.eventLast, lastInitHandler, true);
        win.addEventListener(evSettings.eventLast, lastHandler);
        return settings;
    },

    /**
     * Unregister plugin
     */
    unregister: () => {
        if (settings) {
            win.removeEventListener('click',              clickHandler);
            win.removeEventListener(evSettings.eventLast, lastInitHandler, true);
            win.removeEventListener(evSettings.eventLast, lastHandler);
            settings = null;
        }
    },
};
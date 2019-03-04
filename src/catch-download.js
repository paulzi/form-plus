import ExtraEvents from 'form-extra-events/standard';
import {prepareSettings, getSettings} from "./prepare-settings";

const defaultSettings = {
    enabled:        false,
    param:          '_requestId',
    interval:       100,
    timeout:        30000,
    namespace:      'catchDownload',
    shorthands:     null,
};

// shorthands for uglify
const doc = document;
const win = doc.defaultView;

// can shim
let objectAssign = Object.assign;

// data
let checkTimer, timeoutTimer, input, requestId, data, settings, evSettings;

/**
 */
function check() {
    if (doc.cookie.indexOf(data.param + requestId + '=1') !== -1) {
        cleanUp();
        ExtraEvents.forceSubmitEnd(false);
    }
}

/**
 */
function timeout() {
    cleanUp();
    ExtraEvents.forceSubmitEnd(true);
}

/**
 */
function cleanUp() {
    checkTimer && clearInterval(checkTimer);
    timeoutTimer && clearTimeout(timeoutTimer);
    if (requestId) {
        doc.cookie = `${data.param}${requestId}=; expires=${new Date(0).toUTCString()}; path=/`;
    }
    requestId = checkTimer = timeoutTimer = null;
}

/**
 */
function submitHandler() {
    requestId && cleanUp();
}

/**
 * @param {CustomEvent} e
 */
function beforeInitHandler(e) {
    let detail = e.detail || {};
    if (detail.transport === 'default') {
        prepareSettings(e, settings, objectAssign);
    }
}

/**
 * @param {CustomEvent} e
 */
function beforeHandler(e) {
    data = getSettings(e, settings);
    if (data.enabled) {
        requestId   = Date.now();
        input       = doc.createElement('input');
        input.type  = 'hidden';
        input.name  = data.param;
        input.value = requestId;
        e.target.appendChild(input);
    }
}

/**
 */
function startHandler() {
    if (requestId) {
        input.parentNode.removeChild(input);
        checkTimer   = setInterval(check,  data.interval);
        timeoutTimer = setTimeout(timeout, data.timeout);
    }
}

/**
 */
function endHandler() {
    if (requestId) {
        cleanUp();
    }
}

export default {
    /**
     * Set shims
     * @param {Function|null} [setObjectAssign]
     */
    setShim: function(setObjectAssign) {
        objectAssign = setObjectAssign || objectAssign;
    },

    /**
     * Return current request id
     * @returns {Number}
     */
    getRequestId: () => {
        return requestId;
    },

    /**
     * Register plugin
     * @param {{}} [setSettings]
     * @returns {{}}
     */
    register: (setSettings) => {
        if (settings) {
            throw new Error('catch-download already registered');
        }
        evSettings = ExtraEvents.getSettings();
        if (!evSettings) {
            evSettings = ExtraEvents.register();
        }
        settings = objectAssign({}, defaultSettings, setSettings || {});
        win.addEventListener('submit',               submitHandler,     true);
        win.addEventListener(evSettings.eventBefore, beforeInitHandler, true);
        win.addEventListener(evSettings.eventBefore, beforeHandler);
        win.addEventListener(evSettings.eventStart,  startHandler);
        win.addEventListener(evSettings.eventEnd,    endHandler);

        return settings;
    },

    /**
     * Unregister plugin
     */
    unregister: () => {
        if (settings) {
            win.removeEventListener('submit',               submitHandler,     true);
            win.removeEventListener(evSettings.eventBefore, beforeInitHandler, true);
            win.removeEventListener(evSettings.eventBefore, beforeHandler);
            win.removeEventListener(evSettings.eventStart,  startHandler);
            win.removeEventListener(evSettings.eventEnd,    endHandler);
            settings = null;
        }
    },
};
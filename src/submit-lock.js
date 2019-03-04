import ExtraEvents from 'form-extra-events/standard';
import {prepareSettings, getSettings} from "./prepare-settings";

const defaultSettings = {
    enabled:    false,
    namespace:  'submitLock',
    shorthands: null,
};

// shorthands for uglify
const win = document.defaultView;
const lockProp = '_submitLock';

// can shim
let objectAssign = Object.assign;

// data
let settings, evSettings;


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
    let data = getSettings(e, settings);
    if (data.enabled && e.target[lockProp]) {
        e.preventDefault();
    }
}

/**
 * @param {Event} e
 */
function beforeHandler(e) {
    e.target[lockProp] = true;
}

/**
 * @param {Event} e
 */
function endHandler(e) {
    e.target[lockProp] = false;
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
     * Register plugin
     * @param {{}} [setSettings]
     */
    register: (setSettings) => {
        if (settings) {
            throw new Error('submit-lock already registered');
        }
        evSettings = ExtraEvents.getSettings();
        if (!evSettings) {
            evSettings = ExtraEvents.register();
        }
        settings = objectAssign({}, defaultSettings, setSettings || {});
        win.addEventListener(evSettings.eventLast,   lastInitHandler, true);
        win.addEventListener(evSettings.eventLast,   lastHandler);
        win.addEventListener(evSettings.eventBefore, beforeHandler);
        win.addEventListener(evSettings.eventEnd,    endHandler);
    },

    /**
     * Unregister plugin
     */
    unregister: () => {
        if (settings) {
            win.removeEventListener(evSettings.eventLast,   lastInitHandler, true);
            win.removeEventListener(evSettings.eventLast,   lastHandler);
            win.removeEventListener(evSettings.eventBefore, beforeHandler);
            win.removeEventListener(evSettings.eventEnd,    endHandler);
            settings = null;
        }
    },
};
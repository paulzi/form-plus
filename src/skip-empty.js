import ExtraEvents from 'form-extra-events/standard';
import {elementSettings, prepareSettings, getSettings} from "./prepare-settings";

const defaultSettings = {
    enabled:    false,
    value:      '',
    mode:       'name', // name, disabled, form
    namespace:  'skipEmpty',
    shorthands: null,
};

// shorthands for uglify
const win = document.defaultView;

// can shim
let objectAssign = Object.assign;

// data
let list = [], settings, evSettings;

/**
 * @param {HTMLElement} element
 * @returns {Boolean}
 */
function isButton(element) {
    return ['reset', 'submit', 'button', 'image'].indexOf(element.type) !== -1;
}

/**
 * @param {CustomEvent} e
 */
function beforeInitHandler(e) {
    prepareSettings(e, settings, objectAssign);
}

/**
* @param {Event} e
*/
function beforeHandler(e) {
    let form = e.target;
    let data = getSettings(e, settings);
    list = [];
    for (let i = 0; i < form.elements.length; i++) {
        let item = form.elements[i];
        if (item.name && !item.disabled && !isButton(item)) {
            let itemData = objectAssign({}, data, elementSettings(item, settings));
            if (itemData.enabled && item.value === itemData.value) {
                let mode = itemData.mode;
                list.push([item, mode, item.name, item.form]);
                if (mode === 'name') {
                    item.name = '';
                } else if (mode === 'form') {
                    item.setAttribute('form', '_skipEmpty');
                } else {
                    item.disabled = true;
                }
            }
        }
    }
}

/**
 */
function startHandler() {
    for (let i = 0; i < list.length; i++) {
        let [item, mode, name, form] = list[i];
        if (mode === 'name') {
            item.name = name;
        } else if (mode === 'form') {
            item.setAttribute('form', form);
        } else {
            item.disabled = false;
        }
    }
    list = [];
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
     * @returns {{}}
     */
    register: (setSettings) => {
        if (settings) {
            throw new Error('skip-empty already registered');
        }
        evSettings = ExtraEvents.getSettings();
        if (!evSettings) {
            evSettings = ExtraEvents.register();
        }
        settings = objectAssign({}, defaultSettings, setSettings || {});
        win.addEventListener(evSettings.eventBefore, beforeInitHandler, true);
        win.addEventListener(evSettings.eventBefore, beforeHandler);
        win.addEventListener(evSettings.eventStart,  startHandler);

        return settings;
    },

    /**
     * Unregister plugin
     */
    unregister: () => {
        if (settings) {
            win.removeEventListener(evSettings.eventBefore, beforeInitHandler, true);
            win.removeEventListener(evSettings.eventBefore, beforeHandler);
            win.removeEventListener(evSettings.eventStart,  startHandler);
            settings = null;
        }
    },
};
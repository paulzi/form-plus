import getDataSettings from "data-settings";
import {getByPath, setByPath} from "access-by-path";

/**
 * @param {HTMLElement|null} element
 * @param {{}} settings
 * @returns {*}
 */
export function elementSettings(element, settings) {
    let result = element ? getDataSettings(element, settings.namespace, {}, settings.shorthands) : {};
    return typeof result === 'object' ? result : {enabled: !!result};
}

/**
 * @param {Event} e
 * @param {{}} settings
 * @param {Function} objectAssign
 */
export function prepareSettings(e, settings, objectAssign) {
    let data = objectAssign(
        {},
        settings,
        elementSettings(e.target, settings),
        elementSettings(getByPath(e, 'detail.activeButton'), settings)
    );
    setByPath(e, 'detail.' + settings.namespace, data);
}

/**
 * @param {Event} e
 * @param {{}} settings
 * @returns {{}}
 */
export function getSettings(e, settings) {
    return getByPath(e, 'detail.' + settings.namespace, {});
}
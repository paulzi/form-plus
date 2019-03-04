import ExtraEvents from 'form-extra-events/standard';
import ContextSelector from 'context-selector/standard';

const builtInActions = {
    'prepend':     actionPrepend,
    'append':      actionAppend,
    'before':      actionBefore,
    'after':       actionAfter,
    'replace':     actionReplace,
    'content':     actionContent,
    'text':        actionText,
    'remove':      actionRemove,
    'empty':       actionEmpty,
    'addClass':    actionAddClass,
    'removeClass': actionRemoveClass,
    'toggleClass': actionToggleClass,
    'setAttr':     actionSetAttr,
    'removeAttr':  actionRemoveAttr,
    'setProp':     actionSetProp,
};

// shorthands for uglify
const win = document.defaultView;

// can shim
let objectAssign = Object.assign;

// data
let contentType, actions, evSettings;

/**
 * @param {String|Element} scenario
 * @param {Element} [context]
 */
function process(scenario, context) {
    let children;
    if (typeof scenario === 'string') {
        let parser = new DOMParser();
        let html = parser.parseFromString(scenario, 'text/html');
        children = html.body.childNodes;
    } else {
        children = scenario.childNodes;
    }
    context = context || document.body;
    for (let i = 0; i < children.length; i++) {
        let node = children[i];
        if (node.nodeName === 'ACTION') {
            let actionName = node.getAttribute('action');
            let action     = actions[actionName];
            if (action) {
                if (node.hasAttribute('targets')) {
                    let targets = ContextSelector.all(context, node.getAttribute('targets'));
                    targets.forEach(target => {
                        action(node, target, context);
                    });
                } else if (node.hasAttribute('target')) {
                    let target = ContextSelector.one(context, node.getAttribute('target'));
                    target && action(node, target, context);
                } else {
                    action(node, null, context);
                }
            }
        }
    }
}

/**
 * @param {Event} e
 */
function endHandler(e) {
    if (!e.defaultPrevented && e.detail && e.detail.transport === 'ajax') {
        let detail = e.detail || {};
        let cType = detail.xhr && detail.xhr.getResponseHeader('Content-Type');
        if (cType && cType.substr(0, 30) === contentType) {
            process(detail.xhr.response, e.target);
        }
    }
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionPrepend(node, target) {
    target.insertAdjacentHTML('afterbegin', node.innerHTML);
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionAppend(node, target) {
    target.insertAdjacentHTML('beforeend', node.innerHTML);
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionBefore(node, target) {
    target.insertAdjacentHTML('beforebegin', node.innerHTML);
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionAfter(node, target) {
    target.insertAdjacentHTML('afterend', node.innerHTML);
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionReplace(node, target) {
    target.outerHTML = node.innerHTML;
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionContent(node, target) {
    target.innerHTML = node.innerHTML;
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionText(node, target) {
    target.textContent = node.innerHTML;
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionRemove(node, target) {
    target.parentNode.removeChild(target);
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionEmpty(node, target) {
    target.innerHTML = '';
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionAddClass(node, target) {
    target.classList.add(node.getAttribute('class'));
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionRemoveClass(node, target) {
    target.classList.remove(node.getAttribute('class'));
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionToggleClass(node, target) {
    target.classList.toggle(node.getAttribute('class'));
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionSetAttr(node, target) {
    target.setAttribute(node.getAttribute('attr'), node.getAttribute('value'));
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionRemoveAttr(node, target) {
    target.removeAttribute(node.getAttribute('attr'));
}

/**
 * @param {HTMLElement} node
 * @param {HTMLElement} target
 */
function actionSetProp(node, target) {
    let val = node.getAttribute('value');
    try {
        val = JSON.parse(val);
    } catch (e) {
        // continue regardless of error
    }
    target[node.getAttribute('prop')] = val;
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
     * Register action
     * @param {String} action
     * @param {Function|null} callback
     */
    registerAction: function(action, callback) {
        actions[action] = callback;
    },

    /**
     * Register actions
     * @param {{}} setActions
     */
    registerActions: function(setActions) {
        objectAssign(actions, setActions);
    },

    /**
     * Process scenario
     * @param {String|Element} scenario
     * @param {Element} [context]
     */
    runScenario: function(scenario, context) {
        process(scenario, context);
    },

    /**
     * Register plugin
     * @param {{}} [setSettings]
     */
    register: (setSettings) => {
        if (evSettings) {
            throw new Error('ajax-response already registered');
        }
        evSettings = ExtraEvents.getSettings();
        if (!evSettings) {
            evSettings = ExtraEvents.register();
        }
        setSettings = setSettings || {};
        actions     = objectAssign({}, setSettings.skipBuildIns ? {} : builtInActions, setSettings.actions || {});
        contentType = setSettings.contentType || 'application/form-plus-response';
        win.addEventListener(evSettings.eventEnd, endHandler);
    },

    /**
     * Unregister plugin
     */
    unregister: () => {
        if (evSettings) {
            win.removeEventListener(evSettings.eventEnd, endHandler);
            evSettings = null;
        }
    },
};
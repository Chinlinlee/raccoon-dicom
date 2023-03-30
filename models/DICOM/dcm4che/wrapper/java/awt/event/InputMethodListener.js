"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputMethodListener = exports.createInputMethodListenerProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link InputMethodListener} interface.
 * All required methods in {@link InputMethodListenerInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createInputMethodListenerProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.awt.event.InputMethodListener', methods, opts);
}
exports.createInputMethodListenerProxy = createInputMethodListenerProxy;
/**
 * Class java.awt.event.InputMethodListener.
 *
 * This actually imports the java class for further use.
 * The class {@link InputMethodListenerClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class InputMethodListener extends (0, java_bridge_1.importClass)('java.awt.event.InputMethodListener') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.InputMethodListener = InputMethodListener;
exports.default = InputMethodListener;
//# sourceMappingURL=InputMethodListener.js.map
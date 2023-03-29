"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibleIcon = exports.createAccessibleIconProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link AccessibleIcon} interface.
 * All required methods in {@link AccessibleIconInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createAccessibleIconProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('javax.accessibility.AccessibleIcon', methods, opts);
}
exports.createAccessibleIconProxy = createAccessibleIconProxy;
/**
 * Class javax.accessibility.AccessibleIcon.
 *
 * This actually imports the java class for further use.
 * The class {@link AccessibleIconClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class AccessibleIcon extends (0, java_bridge_1.importClass)('javax.accessibility.AccessibleIcon') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.AccessibleIcon = AccessibleIcon;
exports.default = AccessibleIcon;
//# sourceMappingURL=AccessibleIcon.js.map
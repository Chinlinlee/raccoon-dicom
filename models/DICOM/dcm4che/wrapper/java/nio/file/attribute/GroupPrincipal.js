"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupPrincipal = exports.createGroupPrincipalProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link GroupPrincipal} interface.
 * All required methods in {@link GroupPrincipalInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createGroupPrincipalProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.nio.file.attribute.GroupPrincipal', methods, opts);
}
exports.createGroupPrincipalProxy = createGroupPrincipalProxy;
/**
 * Class java.nio.file.attribute.GroupPrincipal.
 *
 * This actually imports the java class for further use.
 * The class {@link GroupPrincipalClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class GroupPrincipal extends (0, java_bridge_1.importClass)('java.nio.file.attribute.GroupPrincipal') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.GroupPrincipal = GroupPrincipal;
exports.default = GroupPrincipal;
//# sourceMappingURL=GroupPrincipal.js.map
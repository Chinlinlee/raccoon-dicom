"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilenameFilter = exports.createFilenameFilterProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link FilenameFilter} interface.
 * All required methods in {@link FilenameFilterInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createFilenameFilterProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.io.FilenameFilter', methods, opts);
}
exports.createFilenameFilterProxy = createFilenameFilterProxy;
/**
 * Class java.io.FilenameFilter.
 *
 * This actually imports the java class for further use.
 * The class {@link FilenameFilterClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class FilenameFilter extends (0, java_bridge_1.importClass)('java.io.FilenameFilter') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.FilenameFilter = FilenameFilter;
exports.default = FilenameFilter;
//# sourceMappingURL=FilenameFilter.js.map
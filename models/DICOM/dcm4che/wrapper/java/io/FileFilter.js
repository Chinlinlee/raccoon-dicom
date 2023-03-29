"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFilter = exports.createFileFilterProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link FileFilter} interface.
 * All required methods in {@link FileFilterInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createFileFilterProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.io.FileFilter', methods, opts);
}
exports.createFileFilterProxy = createFileFilterProxy;
/**
 * Class java.io.FileFilter.
 *
 * This actually imports the java class for further use.
 * The class {@link FileFilterClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class FileFilter extends (0, java_bridge_1.importClass)('java.io.FileFilter') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.FileFilter = FileFilter;
exports.default = FileFilter;
//# sourceMappingURL=FileFilter.js.map
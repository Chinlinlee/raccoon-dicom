"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathMatcher = exports.createPathMatcherProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link PathMatcher} interface.
 * All required methods in {@link PathMatcherInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createPathMatcherProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.nio.file.PathMatcher', methods, opts);
}
exports.createPathMatcherProxy = createPathMatcherProxy;
/**
 * Class java.nio.file.PathMatcher.
 *
 * This actually imports the java class for further use.
 * The class {@link PathMatcherClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class PathMatcher extends (0, java_bridge_1.importClass)('java.nio.file.PathMatcher') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.PathMatcher = PathMatcher;
exports.default = PathMatcher;
//# sourceMappingURL=PathMatcher.js.map
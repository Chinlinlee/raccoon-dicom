"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotatedType = exports.createAnnotatedTypeProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link AnnotatedType} interface.
 * All required methods in {@link AnnotatedTypeInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createAnnotatedTypeProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.lang.reflect.AnnotatedType', methods, opts);
}
exports.createAnnotatedTypeProxy = createAnnotatedTypeProxy;
/**
 * Class java.lang.reflect.AnnotatedType.
 *
 * This actually imports the java class for further use.
 * The class {@link AnnotatedTypeClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class AnnotatedType extends (0, java_bridge_1.importClass)('java.lang.reflect.AnnotatedType') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.AnnotatedType = AnnotatedType;
exports.default = AnnotatedType;

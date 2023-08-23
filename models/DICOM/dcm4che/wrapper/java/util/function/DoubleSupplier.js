"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleSupplier = exports.createDoubleSupplierProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link DoubleSupplier} interface.
 * All required methods in {@link DoubleSupplierInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createDoubleSupplierProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.function.DoubleSupplier', methods, opts);
}
exports.createDoubleSupplierProxy = createDoubleSupplierProxy;
/**
 * Class java.util.function.DoubleSupplier.
 *
 * This actually imports the java class for further use.
 * The class {@link DoubleSupplierClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class DoubleSupplier extends (0, java_bridge_1.importClass)('java.util.function.DoubleSupplier') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.DoubleSupplier = DoubleSupplier;
exports.default = DoubleSupplier;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntSupplier = exports.createIntSupplierProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link IntSupplier} interface.
 * All required methods in {@link IntSupplierInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createIntSupplierProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.function.IntSupplier', methods, opts);
}
exports.createIntSupplierProxy = createIntSupplierProxy;
/**
 * Class java.util.function.IntSupplier.
 *
 * This actually imports the java class for further use.
 * The class {@link IntSupplierClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class IntSupplier extends (0, java_bridge_1.importClass)('java.util.function.IntSupplier') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.IntSupplier = IntSupplier;
exports.default = IntSupplier;
//# sourceMappingURL=IntSupplier.js.map
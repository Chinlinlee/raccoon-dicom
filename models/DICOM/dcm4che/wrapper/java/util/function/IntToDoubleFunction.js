"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntToDoubleFunction = exports.createIntToDoubleFunctionProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link IntToDoubleFunction} interface.
 * All required methods in {@link IntToDoubleFunctionInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createIntToDoubleFunctionProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.function.IntToDoubleFunction', methods, opts);
}
exports.createIntToDoubleFunctionProxy = createIntToDoubleFunctionProxy;
/**
 * Class java.util.function.IntToDoubleFunction.
 *
 * This actually imports the java class for further use.
 * The class {@link IntToDoubleFunctionClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class IntToDoubleFunction extends (0, java_bridge_1.importClass)('java.util.function.IntToDoubleFunction') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.IntToDoubleFunction = IntToDoubleFunction;
exports.default = IntToDoubleFunction;
//# sourceMappingURL=IntToDoubleFunction.js.map
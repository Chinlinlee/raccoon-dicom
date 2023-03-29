"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjLongConsumer = exports.createObjLongConsumerProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link ObjLongConsumer} interface.
 * All required methods in {@link ObjLongConsumerInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createObjLongConsumerProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.function.ObjLongConsumer', methods, opts);
}
exports.createObjLongConsumerProxy = createObjLongConsumerProxy;
/**
 * Class java.util.function.ObjLongConsumer.
 *
 * This actually imports the java class for further use.
 * The class {@link ObjLongConsumerClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class ObjLongConsumer extends (0, java_bridge_1.importClass)('java.util.function.ObjLongConsumer') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.ObjLongConsumer = ObjLongConsumer;
exports.default = ObjLongConsumer;
//# sourceMappingURL=ObjLongConsumer.js.map
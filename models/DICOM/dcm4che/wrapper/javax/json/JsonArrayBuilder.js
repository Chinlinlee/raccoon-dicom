"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonArrayBuilder = exports.createJsonArrayBuilderProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link JsonArrayBuilder} interface.
 * All required methods in {@link JsonArrayBuilderInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createJsonArrayBuilderProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('javax.json.JsonArrayBuilder', methods, opts);
}
exports.createJsonArrayBuilderProxy = createJsonArrayBuilderProxy;
/**
 * Class javax.json.JsonArrayBuilder.
 *
 * This actually imports the java class for further use.
 * The class {@link JsonArrayBuilderClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class JsonArrayBuilder extends (0, java_bridge_1.importClass)('javax.json.JsonArrayBuilder') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.JsonArrayBuilder = JsonArrayBuilder;
exports.default = JsonArrayBuilder;
//# sourceMappingURL=JsonArrayBuilder.js.map
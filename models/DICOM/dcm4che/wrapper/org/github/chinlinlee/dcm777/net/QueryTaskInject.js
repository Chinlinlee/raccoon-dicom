"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTaskInject = exports.createQueryTaskInjectProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link QueryTaskInject} interface.
 * All required methods in {@link QueryTaskInjectInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createQueryTaskInjectProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('org.github.chinlinlee.dcm777.net.QueryTaskInject', methods, opts);
}
exports.createQueryTaskInjectProxy = createQueryTaskInjectProxy;
/**
 * Class org.github.chinlinlee.dcm777.net.QueryTaskInject.
 *
 * This actually imports the java class for further use.
 * The class {@link QueryTaskInjectClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class QueryTaskInject extends (0, java_bridge_1.importClass)('org.github.chinlinlee.dcm777.net.QueryTaskInject') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.QueryTaskInject = QueryTaskInject;
exports.default = QueryTaskInject;

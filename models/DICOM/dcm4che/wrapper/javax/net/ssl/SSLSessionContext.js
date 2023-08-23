"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSLSessionContext = exports.createSSLSessionContextProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link SSLSessionContext} interface.
 * All required methods in {@link SSLSessionContextInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createSSLSessionContextProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('javax.net.ssl.SSLSessionContext', methods, opts);
}
exports.createSSLSessionContextProxy = createSSLSessionContextProxy;
/**
 * Class javax.net.ssl.SSLSessionContext.
 *
 * This actually imports the java class for further use.
 * The class {@link SSLSessionContextClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class SSLSessionContext extends (0, java_bridge_1.importClass)('javax.net.ssl.SSLSessionContext') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.SSLSessionContext = SSLSessionContext;
exports.default = SSLSessionContext;

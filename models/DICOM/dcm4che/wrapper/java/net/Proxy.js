"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Class java.net.Proxy.
 *
 * This actually imports the java class for further use.
 * The class {@link ProxyClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Proxy extends (0, java_bridge_1.importClass)('java.net.Proxy') {
}
exports.Proxy = Proxy;
exports.default = Proxy;

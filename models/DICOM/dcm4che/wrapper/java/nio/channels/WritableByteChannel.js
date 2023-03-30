"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WritableByteChannel = exports.createWritableByteChannelProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link WritableByteChannel} interface.
 * All required methods in {@link WritableByteChannelInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createWritableByteChannelProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.nio.channels.WritableByteChannel', methods, opts);
}
exports.createWritableByteChannelProxy = createWritableByteChannelProxy;
/**
 * Class java.nio.channels.WritableByteChannel.
 *
 * This actually imports the java class for further use.
 * The class {@link WritableByteChannelClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class WritableByteChannel extends (0, java_bridge_1.importClass)('java.nio.channels.WritableByteChannel') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.WritableByteChannel = WritableByteChannel;
exports.default = WritableByteChannel;
//# sourceMappingURL=WritableByteChannel.js.map
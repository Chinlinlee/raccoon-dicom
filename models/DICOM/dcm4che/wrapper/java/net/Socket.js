"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Class java.net.Socket.
 *
 * This actually imports the java class for further use.
 * The class {@link SocketClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Socket extends (0, java_bridge_1.importClass)('java.net.Socket') {
}
exports.Socket = Socket;
exports.default = Socket;
//# sourceMappingURL=Socket.js.map
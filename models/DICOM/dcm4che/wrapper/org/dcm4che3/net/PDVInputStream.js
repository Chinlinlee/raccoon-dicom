"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDVInputStream = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Class org.dcm4che3.net.PDVInputStream.
 *
 * This actually imports the java class for further use.
 * The class {@link PDVInputStreamClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class PDVInputStream extends (0, java_bridge_1.importClass)('org.dcm4che3.net.PDVInputStream') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.PDVInputStream = PDVInputStream;
exports.default = PDVInputStream;

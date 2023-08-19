"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Class java.security.cert.Certificate.
 *
 * This actually imports the java class for further use.
 * The class {@link CertificateClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Certificate extends (0, java_bridge_1.importClass)('java.security.cert.Certificate') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.Certificate = Certificate;
exports.default = Certificate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChronoZonedDateTime = exports.createChronoZonedDateTimeProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link ChronoZonedDateTime} interface.
 * All required methods in {@link ChronoZonedDateTimeInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createChronoZonedDateTimeProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.time.chrono.ChronoZonedDateTime', methods, opts);
}
exports.createChronoZonedDateTimeProxy = createChronoZonedDateTimeProxy;
/**
 * Class java.time.chrono.ChronoZonedDateTime.
 *
 * This actually imports the java class for further use.
 * The class {@link ChronoZonedDateTimeClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class ChronoZonedDateTime extends (0, java_bridge_1.importClass)('java.time.chrono.ChronoZonedDateTime') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.ChronoZonedDateTime = ChronoZonedDateTime;
exports.default = ChronoZonedDateTime;
//# sourceMappingURL=ChronoZonedDateTime.js.map
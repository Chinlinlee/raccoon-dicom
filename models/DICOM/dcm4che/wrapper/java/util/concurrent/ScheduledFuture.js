"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledFuture = exports.createScheduledFutureProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link ScheduledFuture} interface.
 * All required methods in {@link ScheduledFutureInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createScheduledFutureProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.concurrent.ScheduledFuture', methods, opts);
}
exports.createScheduledFutureProxy = createScheduledFutureProxy;
/**
 * Class java.util.concurrent.ScheduledFuture.
 *
 * This actually imports the java class for further use.
 * The class {@link ScheduledFutureClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class ScheduledFuture extends (0, java_bridge_1.importClass)('java.util.concurrent.ScheduledFuture') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.ScheduledFuture = ScheduledFuture;
exports.default = ScheduledFuture;

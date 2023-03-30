"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragGestureListener = exports.createDragGestureListenerProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link DragGestureListener} interface.
 * All required methods in {@link DragGestureListenerInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createDragGestureListenerProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.awt.dnd.DragGestureListener', methods, opts);
}
exports.createDragGestureListenerProxy = createDragGestureListenerProxy;
/**
 * Class java.awt.dnd.DragGestureListener.
 *
 * This actually imports the java class for further use.
 * The class {@link DragGestureListenerClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class DragGestureListener extends (0, java_bridge_1.importClass)('java.awt.dnd.DragGestureListener') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.DragGestureListener = DragGestureListener;
exports.default = DragGestureListener;
//# sourceMappingURL=DragGestureListener.js.map
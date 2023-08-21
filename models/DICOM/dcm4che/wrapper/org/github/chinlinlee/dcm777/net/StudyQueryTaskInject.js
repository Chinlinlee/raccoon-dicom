"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyQueryTaskInject = exports.createStudyQueryTaskInjectProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link StudyQueryTaskInject} interface.
 * All required methods in {@link StudyQueryTaskInjectInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createStudyQueryTaskInjectProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('org.github.chinlinlee.dcm777.net.StudyQueryTaskInject', methods, opts);
}
exports.createStudyQueryTaskInjectProxy = createStudyQueryTaskInjectProxy;
/**
 * Class org.github.chinlinlee.dcm777.net.StudyQueryTaskInject.
 *
 * This actually imports the java class for further use.
 * The class {@link StudyQueryTaskInjectClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class StudyQueryTaskInject extends (0, java_bridge_1.importClass)('org.github.chinlinlee.dcm777.net.StudyQueryTaskInject') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.StudyQueryTaskInject = StudyQueryTaskInject;
exports.default = StudyQueryTaskInject;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DicomService = exports.createDicomServiceProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link DicomService} interface.
 * All required methods in {@link DicomServiceInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createDicomServiceProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('org.dcm4che3.net.service.DicomService', methods, opts);
}
exports.createDicomServiceProxy = createDicomServiceProxy;
/**
 * Class org.dcm4che3.net.service.DicomService.
 *
 * This actually imports the java class for further use.
 * The class {@link DicomServiceClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class DicomService extends (0, java_bridge_1.importClass)('org.dcm4che3.net.service.DicomService') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.DicomService = DicomService;
exports.default = DicomService;

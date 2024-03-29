"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Class java.lang.Enum.
 *
 * This actually imports the java class for further use.
 * The class {@link EnumClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Enum extends (0, java_bridge_1.importClass)('java.lang.Enum') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.Enum = Enum;
exports.default = Enum;

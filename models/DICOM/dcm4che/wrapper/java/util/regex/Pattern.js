"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pattern = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Class java.util.regex.Pattern.
 *
 * This actually imports the java class for further use.
 * The class {@link PatternClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Pattern extends (0, java_bridge_1.importClass)('java.util.regex.Pattern') {
}
exports.Pattern = Pattern;
exports.default = Pattern;

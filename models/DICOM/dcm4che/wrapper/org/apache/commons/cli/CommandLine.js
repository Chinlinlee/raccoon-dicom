"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLine = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Class org.apache.commons.cli.CommandLine.
 *
 * This actually imports the java class for further use.
 * The class {@link CommandLineClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class CommandLine extends (0, java_bridge_1.importClass)('org.apache.commons.cli.CommandLine') {
}
exports.CommandLine = CommandLine;
exports.default = CommandLine;

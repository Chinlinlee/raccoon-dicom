import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Device as org_dcm4che3_net_Device } from "./Device";
import { Connection as org_dcm4che3_net_Connection } from "./Connection";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link DeviceExtension} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DeviceExtensionClass extends JavaClass {
    /**
     * @return original return type: 'org.dcm4che3.net.Device'
     */
    getDevice(): Promise<org_dcm4che3_net_Device | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.Device'
     */
    getDeviceSync(): org_dcm4che3_net_Device | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.DeviceExtension'
     * @return original return type: 'void'
     */
    reconfigure(var0: DeviceExtensionClass | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.DeviceExtension'
     * @return original return type: 'void'
     */
    reconfigureSync(var0: DeviceExtensionClass | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @return original return type: 'void'
     */
    verifyNotUsed(var0: org_dcm4che3_net_Connection | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @return original return type: 'void'
     */
    verifyNotUsedSync(var0: org_dcm4che3_net_Connection | null): void;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    wait(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    waitSync(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    wait(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    waitSync(): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    wait(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    waitSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    equals(var0: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    equalsSync(var0: BasicOrJavaType | null): boolean;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'int'
     */
    hashCode(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    hashCodeSync(): number;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getClass(): Promise<java_lang_Class>;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getClassSync(): java_lang_Class;
    /**
     * @return original return type: 'void'
     */
    notify(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    notifySync(): void;
    /**
     * @return original return type: 'void'
     */
    notifyAll(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    notifyAllSync(): void;
    /**
     * @return original return type: 'org.dcm4che3.net.DeviceExtension'
     */
    static newInstanceAsync(): Promise<DeviceExtension>;
    constructor();
}
declare const DeviceExtension_base: typeof DeviceExtensionClass;
/**
 * Class org.dcm4che3.net.DeviceExtension.
 *
 * This actually imports the java class for further use.
 * The class {@link DeviceExtensionClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DeviceExtension extends DeviceExtension_base {
}
export default DeviceExtension;
//# sourceMappingURL=DeviceExtension.d.ts.map
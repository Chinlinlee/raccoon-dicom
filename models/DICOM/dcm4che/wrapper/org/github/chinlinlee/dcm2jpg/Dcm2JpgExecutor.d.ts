import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Dcm2JpgExecutor$ConvertStatus as org_github_chinlinlee_dcm2jpg_Dcm2JpgExecutor$ConvertStatus } from "./Dcm2JpgExecutor$ConvertStatus";
import { Dcm2JpgExecutor$Dcm2JpgOptions as org_github_chinlinlee_dcm2jpg_Dcm2JpgExecutor$Dcm2JpgOptions } from "./Dcm2JpgExecutor$Dcm2JpgOptions";
import { Long as java_lang_Long } from "./../../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link Dcm2JpgExecutor} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Dcm2JpgExecutorClass extends JavaClass {
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static main(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static mainSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor$Dcm2JpgOptions'
     * @return original return type: 'org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor$ConvertStatus'
     */
    static convertDcmToJpgFromFilename(var0: string | null, var1: string | null, var2: org_github_chinlinlee_dcm2jpg_Dcm2JpgExecutor$Dcm2JpgOptions | null): Promise<org_github_chinlinlee_dcm2jpg_Dcm2JpgExecutor$ConvertStatus | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor$Dcm2JpgOptions'
     * @return original return type: 'org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor$ConvertStatus'
     */
    static convertDcmToJpgFromFilenameSync(var0: string | null, var1: string | null, var2: org_github_chinlinlee_dcm2jpg_Dcm2JpgExecutor$Dcm2JpgOptions | null): org_github_chinlinlee_dcm2jpg_Dcm2JpgExecutor$ConvertStatus | null;
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
     * @return original return type: 'org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor'
     */
    static newInstanceAsync(): Promise<Dcm2JpgExecutor>;
    constructor();
}
declare const Dcm2JpgExecutor_base: typeof Dcm2JpgExecutorClass;
/**
 * Class org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor.
 *
 * This actually imports the java class for further use.
 * The class {@link Dcm2JpgExecutorClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Dcm2JpgExecutor extends Dcm2JpgExecutor_base {
}
export default Dcm2JpgExecutor;
//# sourceMappingURL=Dcm2JpgExecutor.d.ts.map
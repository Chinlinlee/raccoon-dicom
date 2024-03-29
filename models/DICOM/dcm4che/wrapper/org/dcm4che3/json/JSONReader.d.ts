import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Attributes as org_dcm4che3_data_Attributes } from "./../data/Attributes";
import { BulkData$Creator as org_dcm4che3_data_BulkData$Creator, BulkData$CreatorInterface as org_dcm4che3_data_BulkData$CreatorInterface } from "./../data/BulkData$Creator";
import { Boolean as java_lang_Boolean } from "./../../../java/lang/Boolean";
import { JSONReader$Callback as org_dcm4che3_json_JSONReader$Callback, JSONReader$CallbackInterface as org_dcm4che3_json_JSONReader$CallbackInterface } from "./JSONReader$Callback";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
import { JsonParser as javax_json_stream_JsonParser, JsonParserInterface as javax_json_stream_JsonParserInterface } from "./../../../javax/json/stream/JsonParser";
/**
 * This class just defines types, you should import {@link JSONReader} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JSONReaderClass extends JavaClass {
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    getFileMetaInformation(): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    getFileMetaInformationSync(): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.BulkData$Creator'
     * @return original return type: 'void'
     */
    setBulkDataCreator(var0: org_dcm4che3_data_BulkData$Creator | JavaInterfaceProxy<org_dcm4che3_data_BulkData$CreatorInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.BulkData$Creator'
     * @return original return type: 'void'
     */
    setBulkDataCreatorSync(var0: org_dcm4che3_data_BulkData$Creator | JavaInterfaceProxy<org_dcm4che3_data_BulkData$CreatorInterface> | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readDataset(var0: org_dcm4che3_data_Attributes | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readDatasetSync(var0: org_dcm4che3_data_Attributes | null): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'boolean'
     */
    isSkipBulkDataURI(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isSkipBulkDataURISync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setSkipBulkDataURI(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setSkipBulkDataURISync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'org.dcm4che3.json.JSONReader$Callback'
     * @return original return type: 'void'
     */
    readDatasets(var0: org_dcm4che3_json_JSONReader$Callback | JavaInterfaceProxy<org_dcm4che3_json_JSONReader$CallbackInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.json.JSONReader$Callback'
     * @return original return type: 'void'
     */
    readDatasetsSync(var0: org_dcm4che3_json_JSONReader$Callback | JavaInterfaceProxy<org_dcm4che3_json_JSONReader$CallbackInterface> | null): void;
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
     * @param var0 original type: 'javax.json.stream.JsonParser'
     * @return original return type: 'org.dcm4che3.json.JSONReader'
     */
    static newInstanceAsync(var0: javax_json_stream_JsonParser | JavaInterfaceProxy<javax_json_stream_JsonParserInterface> | null): Promise<JSONReader>;
    /**
     * @param var0 original type: 'javax.json.stream.JsonParser'
     */
    constructor(var0: javax_json_stream_JsonParser | JavaInterfaceProxy<javax_json_stream_JsonParserInterface> | null);
}
declare const JSONReader_base: typeof JSONReaderClass;
/**
 * Class org.dcm4che3.json.JSONReader.
 *
 * This actually imports the java class for further use.
 * The class {@link JSONReaderClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JSONReader extends JSONReader_base {
}
export default JSONReader;
//# sourceMappingURL=JSONReader.d.ts.map
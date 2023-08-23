import { JavaClass, BasicOrJavaType } from "java-bridge";
import { ResourceBundle as java_util_ResourceBundle } from "./../../../../java/util/ResourceBundle";
import { Attributes as org_dcm4che3_data_Attributes } from "./../../data/Attributes";
import { Integer as java_lang_Integer } from "./../../../../java/lang/Integer";
import { BasicBulkDataDescriptor as org_dcm4che3_io_BasicBulkDataDescriptor } from "./../../io/BasicBulkDataDescriptor";
import { Options as org_apache_commons_cli_Options } from "./../../../apache/commons/cli/Options";
import { Connection as org_dcm4che3_net_Connection } from "./../../net/Connection";
import { AAssociateRQ as org_dcm4che3_net_pdu_AAssociateRQ } from "./../../net/pdu/AAssociateRQ";
import { CommandLine as org_apache_commons_cli_CommandLine } from "./../../../apache/commons/cli/CommandLine";
import { Class as java_lang_Class } from "./../../../../java/lang/Class";
import { ApplicationEntity as org_dcm4che3_net_ApplicationEntity } from "./../../net/ApplicationEntity";
import { FilesetInfo as org_dcm4che3_tool_common_FilesetInfo } from "./FilesetInfo";
import { Properties as java_util_Properties } from "./../../../../java/util/Properties";
import { DicomEncodingOptions as org_dcm4che3_io_DicomEncodingOptions } from "./../../io/DicomEncodingOptions";
import { Long as java_lang_Long } from "./../../../../java/lang/Long";
/**
 * This class just defines types, you should import {@link CLIUtils} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CLIUtilsClass extends JavaClass {
    /**
     * Original type: 'java.util.ResourceBundle'
     */
    static rb: java_util_ResourceBundle | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addAttributes(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addAttributesSync(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'int[]'
     * @param var2 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addAttributes(var0: org_dcm4che3_data_Attributes | null, var1: (java_lang_Integer | number)[] | null, var2: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'int[]'
     * @param var2 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addAttributesSync(var0: org_dcm4che3_data_Attributes | null, var1: (java_lang_Integer | number)[] | null, var2: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String[]'
     */
    static toUIDs(var0: string | null): Promise<(string | null)[] | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String[]'
     */
    static toUIDsSync(var0: string | null): (string | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    static toUID(var0: string | null): Promise<string | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    static toUIDSync(var0: string | null): string | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addEmptyAttributes(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addEmptyAttributesSync(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    static updateAttributes(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: string | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    static updateAttributesSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: string | null): boolean;
    /**
     * @param var0 original type: 'org.dcm4che3.io.BasicBulkDataDescriptor'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addTagPaths(var0: org_dcm4che3_io_BasicBulkDataDescriptor | null, var1: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.io.BasicBulkDataDescriptor'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static addTagPathsSync(var0: org_dcm4che3_io_BasicBulkDataDescriptor | null, var1: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addConnectTimeoutOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addConnectTimeoutOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addSendTimeoutOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addSendTimeoutOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addStoreTimeoutOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addStoreTimeoutOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addRequestTimeoutOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addRequestTimeoutOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addResponseTimeoutOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addResponseTimeoutOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addRetrieveTimeoutOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addRetrieveTimeoutOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addTLSCipherOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addTLSCipherOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    static addBindClientOption(var0: org_apache_commons_cli_Options | null, var1: string | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    static addBindClientOptionSync(var0: org_apache_commons_cli_Options | null, var1: string | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addBindServerOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addBindServerOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addAcceptTimeoutOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addAcceptTimeoutOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addConnectOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addConnectOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addAEOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addAEOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addCommonOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addCommonOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    static addBindOption(var0: org_apache_commons_cli_Options | null, var1: string | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    static addBindOptionSync(var0: org_apache_commons_cli_Options | null, var1: string | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addSocketOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addSocketOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addTLSOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addTLSOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addMLLP2Option(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addMLLP2OptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addPriorityOption(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addPriorityOptionSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.dcm4che3.net.pdu.AAssociateRQ'
     * @param var2 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureConnect(var0: org_dcm4che3_net_Connection | null, var1: org_dcm4che3_net_pdu_AAssociateRQ | null, var2: org_apache_commons_cli_CommandLine | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.dcm4che3.net.pdu.AAssociateRQ'
     * @param var2 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureConnectSync(var0: org_dcm4che3_net_Connection | null, var1: org_dcm4che3_net_pdu_AAssociateRQ | null, var2: org_apache_commons_cli_CommandLine | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'boolean'
     */
    static isMLLP2(var0: org_apache_commons_cli_CommandLine | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'boolean'
     */
    static isMLLP2Sync(var0: org_apache_commons_cli_CommandLine | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @param var1 original type: 'org.apache.commons.cli.Options'
     * @param var2 original type: 'java.util.ResourceBundle'
     * @param var3 original type: 'java.lang.Class'
     * @return original return type: 'org.apache.commons.cli.CommandLine'
     */
    static parseComandLine(var0: (string | null)[] | null, var1: org_apache_commons_cli_Options | null, var2: java_util_ResourceBundle | null, var3: java_lang_Class | null): Promise<org_apache_commons_cli_CommandLine | null>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @param var1 original type: 'org.apache.commons.cli.Options'
     * @param var2 original type: 'java.util.ResourceBundle'
     * @param var3 original type: 'java.lang.Class'
     * @return original return type: 'org.apache.commons.cli.CommandLine'
     */
    static parseComandLineSync(var0: (string | null)[] | null, var1: org_apache_commons_cli_Options | null, var2: java_util_ResourceBundle | null, var3: java_lang_Class | null): org_apache_commons_cli_CommandLine | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.dcm4che3.net.ApplicationEntity'
     * @param var2 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureBindServer(var0: org_dcm4che3_net_Connection | null, var1: org_dcm4che3_net_ApplicationEntity | null, var2: org_apache_commons_cli_CommandLine | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.dcm4che3.net.ApplicationEntity'
     * @param var2 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureBindServerSync(var0: org_dcm4che3_net_Connection | null, var1: org_dcm4che3_net_ApplicationEntity | null, var2: org_apache_commons_cli_CommandLine | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addTransferSyntaxOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addTransferSyntaxOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addFilesetInfoOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addFilesetInfoOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.dcm4che3.net.ApplicationEntity'
     * @param var2 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureBind(var0: org_dcm4che3_net_Connection | null, var1: org_dcm4che3_net_ApplicationEntity | null, var2: org_apache_commons_cli_CommandLine | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.dcm4che3.net.ApplicationEntity'
     * @param var2 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureBindSync(var0: org_dcm4che3_net_Connection | null, var1: org_dcm4che3_net_ApplicationEntity | null, var2: org_apache_commons_cli_CommandLine | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'int'
     */
    static priorityOf(var0: org_apache_commons_cli_CommandLine | null): Promise<number>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'int'
     */
    static priorityOfSync(var0: org_apache_commons_cli_CommandLine | null): number;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'int'
     * @return original return type: 'int'
     */
    static getIntOption(var0: org_apache_commons_cli_CommandLine | null, var1: string | null, var2: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'int'
     * @return original return type: 'int'
     */
    static getIntOptionSync(var0: org_apache_commons_cli_CommandLine | null, var1: string | null, var2: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'int[]'
     */
    static getIntsOption(var0: org_apache_commons_cli_CommandLine | null, var1: string | null): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'int[]'
     */
    static getIntsOptionSync(var0: org_apache_commons_cli_CommandLine | null, var1: string | null): (number)[] | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configure(var0: org_dcm4che3_net_Connection | null, var1: org_apache_commons_cli_CommandLine | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureSync(var0: org_dcm4che3_net_Connection | null, var1: org_apache_commons_cli_CommandLine | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.tool.common.FilesetInfo'
     * @param var1 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configure(var0: org_dcm4che3_tool_common_FilesetInfo | null, var1: org_apache_commons_cli_CommandLine | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.tool.common.FilesetInfo'
     * @param var1 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'void'
     */
    static configureSync(var0: org_dcm4che3_tool_common_FilesetInfo | null, var1: org_apache_commons_cli_CommandLine | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.util.Properties'
     * @return original return type: 'java.util.Properties'
     */
    static loadProperties(var0: string | null, var1: java_util_Properties | null): Promise<java_util_Properties | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.util.Properties'
     * @return original return type: 'java.util.Properties'
     */
    static loadPropertiesSync(var0: string | null, var1: java_util_Properties | null): java_util_Properties | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'boolean'
     */
    static configureTLSCipher(var0: org_dcm4che3_net_Connection | null, var1: org_apache_commons_cli_CommandLine | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Connection'
     * @param var1 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'boolean'
     */
    static configureTLSCipherSync(var0: org_dcm4che3_net_Connection | null, var1: org_apache_commons_cli_CommandLine | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'int[]'
     */
    static toTags(var0: (string | null)[] | null): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'int[]'
     */
    static toTagsSync(var0: (string | null)[] | null): (number)[] | null;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'org.dcm4che3.io.DicomEncodingOptions'
     */
    static encodingOptionsOf(var0: org_apache_commons_cli_CommandLine | null): Promise<org_dcm4che3_io_DicomEncodingOptions | null>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'org.dcm4che3.io.DicomEncodingOptions'
     */
    static encodingOptionsOfSync(var0: org_apache_commons_cli_CommandLine | null): org_dcm4che3_io_DicomEncodingOptions | null;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addEncodingOptions(var0: org_apache_commons_cli_Options | null): Promise<void>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.Options'
     * @return original return type: 'void'
     */
    static addEncodingOptionsSync(var0: org_apache_commons_cli_Options | null): void;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'java.lang.String[]'
     */
    static transferSyntaxesOf(var0: org_apache_commons_cli_CommandLine | null): Promise<(string | null)[] | null>;
    /**
     * @param var0 original type: 'org.apache.commons.cli.CommandLine'
     * @return original return type: 'java.lang.String[]'
     */
    static transferSyntaxesOfSync(var0: org_apache_commons_cli_CommandLine | null): (string | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'int'
     */
    static toTag(var0: string | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'int'
     */
    static toTagSync(var0: string | null): number;
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
     * @return original return type: 'org.dcm4che3.tool.common.CLIUtils'
     */
    static newInstanceAsync(): Promise<CLIUtils>;
    constructor();
}
declare const CLIUtils_base: typeof CLIUtilsClass;
/**
 * Class org.dcm4che3.tool.common.CLIUtils.
 *
 * This actually imports the java class for further use.
 * The class {@link CLIUtilsClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CLIUtils extends CLIUtils_base {
}
export default CLIUtils;
//# sourceMappingURL=CLIUtils.d.ts.map
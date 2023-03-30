/// <reference types="node" />
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Boolean as java_lang_Boolean } from "./../../../java/lang/Boolean";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { SpecificCharacterSet as org_dcm4che3_data_SpecificCharacterSet } from "./SpecificCharacterSet";
import { Enum as java_lang_Enum } from "./../../../java/lang/Enum";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
import { StringBuilder as java_lang_StringBuilder } from "./../../../java/lang/StringBuilder";
import { Date as java_util_Date } from "./../../../java/util/Date";
import { TimeZone as java_util_TimeZone } from "./../../../java/util/TimeZone";
import { DatePrecision as org_dcm4che3_data_DatePrecision } from "./DatePrecision";
import { DatePrecisions as org_dcm4che3_data_DatePrecisions } from "./DatePrecisions";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Float as java_lang_Float } from "./../../../java/lang/Float";
import { Double as java_lang_Double } from "./../../../java/lang/Double";
import { Optional as java_util_Optional } from "./../../../java/util/Optional";
/**
 * This class just defines types, you should import {@link VR} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class VRClass extends JavaClass {
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly AE: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly AS: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly AT: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly CS: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly DA: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly DS: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly DT: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly FD: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly FL: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly IS: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly LO: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly LT: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly OB: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly OD: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly OF: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly OL: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly OV: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly OW: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly PN: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly SH: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly SL: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly SQ: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly SS: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly ST: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly SV: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly TM: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly UC: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly UI: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly UL: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly UN: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly UR: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly US: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly UT: VRClass | null;
    /**
     * Original type: 'org.dcm4che3.data.VR'
     */
    static readonly UV: VRClass | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    toString(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: string | null): Promise<string>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    toStringSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: string | null): string;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'org.dcm4che3.data.VR[]'
     */
    static values(): Promise<(VR | null)[] | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.VR[]'
     */
    static valuesSync(): (VR | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @return original return type: 'byte[]'
     */
    toBytes(var0: BasicOrJavaType | null, var1: org_dcm4che3_data_SpecificCharacterSet | null): Promise<Buffer | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @return original return type: 'byte[]'
     */
    toBytesSync(var0: BasicOrJavaType | null, var1: org_dcm4che3_data_SpecificCharacterSet | null): Buffer | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.data.VR'
     */
    static valueOf(var0: string | null): Promise<VR | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.data.VR'
     */
    static valueOfSync(var0: string | null): VR | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'org.dcm4che3.data.VR'
     */
    static valueOf(var0: java_lang_Integer | number): Promise<VR | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'org.dcm4che3.data.VR'
     */
    static valueOfSync(var0: java_lang_Integer | number): VR | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Enum'
     */
    static valueOf(var0: java_lang_Class | null, var1: string | null): Promise<java_lang_Enum | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Enum'
     */
    static valueOfSync(var0: java_lang_Class | null, var1: string | null): java_lang_Enum | null;
    /**
     * @return original return type: 'int'
     */
    code(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    codeSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isIntType(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isIntTypeSync(): boolean;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    vmOf(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    vmOfSync(var0: BasicOrJavaType | null): number;
    /**
     * @return original return type: 'boolean'
     */
    useSpecificCharacterSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    useSpecificCharacterSetSync(): boolean;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @return original return type: 'java.lang.Object'
     */
    toStrings(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_SpecificCharacterSet | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @return original return type: 'java.lang.Object'
     */
    toStringsSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_SpecificCharacterSet | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'boolean'
     * @return original return type: 'byte[]'
     */
    toggleEndian(var0: Buffer | null, var1: java_lang_Boolean | boolean): Promise<Buffer | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'boolean'
     * @return original return type: 'byte[]'
     */
    toggleEndianSync(var0: Buffer | null, var1: java_lang_Boolean | boolean): Buffer | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @param var3 original type: 'int'
     * @param var4 original type: 'java.lang.StringBuilder'
     * @return original return type: 'boolean'
     */
    prompt(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_SpecificCharacterSet | null, var3: java_lang_Integer | number, var4: java_lang_StringBuilder | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @param var3 original type: 'int'
     * @param var4 original type: 'java.lang.StringBuilder'
     * @return original return type: 'boolean'
     */
    promptSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_SpecificCharacterSet | null, var3: java_lang_Integer | number, var4: java_lang_StringBuilder | null): boolean;
    /**
     * @return original return type: 'int'
     */
    headerLength(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    headerLengthSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isStringType(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isStringTypeSync(): boolean;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'float[]'
     */
    toFloats(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'float[]'
     */
    toFloatsSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): (number)[] | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'double[]'
     */
    toDoubles(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'double[]'
     */
    toDoublesSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): (number)[] | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'java.util.TimeZone'
     * @param var2 original type: 'int'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'java.util.Date'
     * @param var5 original type: 'org.dcm4che3.data.DatePrecision'
     * @return original return type: 'java.util.Date'
     */
    toDate(var0: BasicOrJavaType | null, var1: java_util_TimeZone | null, var2: java_lang_Integer | number, var3: java_lang_Boolean | boolean, var4: java_util_Date | null, var5: org_dcm4che3_data_DatePrecision | null): Promise<java_util_Date | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'java.util.TimeZone'
     * @param var2 original type: 'int'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'java.util.Date'
     * @param var5 original type: 'org.dcm4che3.data.DatePrecision'
     * @return original return type: 'java.util.Date'
     */
    toDateSync(var0: BasicOrJavaType | null, var1: java_util_TimeZone | null, var2: java_lang_Integer | number, var3: java_lang_Boolean | boolean, var4: java_util_Date | null, var5: org_dcm4che3_data_DatePrecision | null): java_util_Date | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'java.util.TimeZone'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'org.dcm4che3.data.DatePrecisions'
     * @return original return type: 'java.util.Date[]'
     */
    toDates(var0: BasicOrJavaType | null, var1: java_util_TimeZone | null, var2: java_lang_Boolean | boolean, var3: org_dcm4che3_data_DatePrecisions | null): Promise<(java_util_Date | null)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'java.util.TimeZone'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'org.dcm4che3.data.DatePrecisions'
     * @return original return type: 'java.util.Date[]'
     */
    toDatesSync(var0: BasicOrJavaType | null, var1: java_util_TimeZone | null, var2: java_lang_Boolean | boolean, var3: org_dcm4che3_data_DatePrecisions | null): (java_util_Date | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'long'
     * @return original return type: 'long'
     */
    toLong(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Long | bigint | number): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'long'
     * @return original return type: 'long'
     */
    toLongSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Long | bigint | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'long[]'
     */
    toLongs(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'long[]'
     */
    toLongsSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): (number)[] | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'float'
     * @return original return type: 'float'
     */
    toFloat(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Float | number): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'float'
     * @return original return type: 'float'
     */
    toFloatSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Float | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'int'
     */
    toInt(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'int'
     */
    toIntSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'double'
     * @return original return type: 'double'
     */
    toDouble(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Double | number): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'double'
     * @return original return type: 'double'
     */
    toDoubleSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Double | number): number;
    /**
     * @return original return type: 'boolean'
     */
    isTemporalType(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isTemporalTypeSync(): boolean;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'int[]'
     */
    toInts(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'boolean'
     * @return original return type: 'int[]'
     */
    toIntsSync(var0: BasicOrJavaType | null, var1: java_lang_Boolean | boolean): (number)[] | null;
    /**
     * @param var0 original type: 'java.util.Date[]'
     * @param var1 original type: 'java.util.TimeZone'
     * @param var2 original type: 'org.dcm4che3.data.DatePrecision'
     * @return original return type: 'java.lang.Object'
     */
    toValue(var0: (java_util_Date | null)[] | null, var1: java_util_TimeZone | null, var2: org_dcm4che3_data_DatePrecision | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.util.Date[]'
     * @param var1 original type: 'java.util.TimeZone'
     * @param var2 original type: 'org.dcm4che3.data.DatePrecision'
     * @return original return type: 'java.lang.Object'
     */
    toValueSync(var0: (java_util_Date | null)[] | null, var1: java_util_TimeZone | null, var2: org_dcm4che3_data_DatePrecision | null): BasicOrJavaType | null;
    /**
     * @return original return type: 'int'
     */
    paddingByte(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    paddingByteSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isInlineBinary(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isInlineBinarySync(): boolean;
    /**
     * @return original return type: 'int'
     */
    numEndianBytes(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    numEndianBytesSync(): number;
    /**
     * @return original return type: 'java.lang.String'
     */
    name(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    nameSync(): string | null;
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
     * @return original return type: 'int'
     */
    hashCode(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    hashCodeSync(): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    compareTo(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    compareToSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @return original return type: 'int'
     */
    compareTo(var0: java_lang_Enum | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @return original return type: 'int'
     */
    compareToSync(var0: java_lang_Enum | null): number;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstable(): Promise<java_util_Optional | null>;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstableSync(): java_util_Optional | null;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getDeclaringClass(): Promise<java_lang_Class | null>;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getDeclaringClassSync(): java_lang_Class | null;
    /**
     * @return original return type: 'int'
     */
    ordinal(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    ordinalSync(): number;
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
}
declare const VR_base: typeof VRClass;
/**
 * Class org.dcm4che3.data.VR.
 *
 * This actually imports the java class for further use.
 * The class {@link VRClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class VR extends VR_base {
}
export default VR;
//# sourceMappingURL=VR.d.ts.map
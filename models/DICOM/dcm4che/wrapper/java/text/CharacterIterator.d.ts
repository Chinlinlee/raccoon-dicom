import { JavaClass, BasicOrJavaType, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Integer as java_lang_Integer } from "./../lang/Integer";
/**
 * This class just defines types, you should import {@link CharacterIterator} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CharacterIteratorClass extends JavaClass {
    /**
     * Original type: 'char'
     */
    static readonly DONE: string | null;
    /**
     * @return original return type: 'java.lang.Object'
     */
    clone(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    cloneSync(): BasicOrJavaType | null;
    /**
     * @return original return type: 'char'
     */
    next(): Promise<string | null>;
    /**
     * @return original return type: 'char'
     */
    nextSync(): string | null;
    /**
     * @return original return type: 'char'
     */
    last(): Promise<string | null>;
    /**
     * @return original return type: 'char'
     */
    lastSync(): string | null;
    /**
     * @return original return type: 'char'
     */
    first(): Promise<string | null>;
    /**
     * @return original return type: 'char'
     */
    firstSync(): string | null;
    /**
     * @return original return type: 'char'
     */
    current(): Promise<string | null>;
    /**
     * @return original return type: 'char'
     */
    currentSync(): string | null;
    /**
     * @return original return type: 'char'
     */
    previous(): Promise<string | null>;
    /**
     * @return original return type: 'char'
     */
    previousSync(): string | null;
    /**
     * @return original return type: 'int'
     */
    getIndex(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getIndexSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'char'
     */
    setIndex(var0: java_lang_Integer | number): Promise<string | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'char'
     */
    setIndexSync(var0: java_lang_Integer | number): string | null;
    /**
     * @return original return type: 'int'
     */
    getBeginIndex(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getBeginIndexSync(): number;
    /**
     * @return original return type: 'int'
     */
    getEndIndex(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getEndIndexSync(): number;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createCharacterIteratorProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface CharacterIteratorInterface {
    /**
     * @return original return type: 'java.lang.Object'
     */
    clone(): BasicOrJavaType | null;
    /**
     * @return original return type: 'char'
     */
    next(): string | null;
    /**
     * @return original return type: 'char'
     */
    last(): string | null;
    /**
     * @return original return type: 'char'
     */
    first(): string | null;
    /**
     * @return original return type: 'char'
     */
    current(): string | null;
    /**
     * @return original return type: 'char'
     */
    previous(): string | null;
    /**
     * @return original return type: 'int'
     */
    getIndex(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'char'
     */
    setIndex(var0: java_lang_Integer | number): string | null;
    /**
     * @return original return type: 'int'
     */
    getBeginIndex(): number;
    /**
     * @return original return type: 'int'
     */
    getEndIndex(): number;
}
/**
 * Create a proxy for the {@link CharacterIterator} interface.
 * All required methods in {@link CharacterIteratorInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createCharacterIteratorProxy(methods: CharacterIteratorInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<CharacterIteratorInterface>;
declare const CharacterIterator_base: typeof CharacterIteratorClass;
/**
 * Class java.text.CharacterIterator.
 *
 * This actually imports the java class for further use.
 * The class {@link CharacterIteratorClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CharacterIterator extends CharacterIterator_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default CharacterIterator;
//# sourceMappingURL=CharacterIterator.d.ts.map
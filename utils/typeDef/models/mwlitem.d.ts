import type { BaseDicomJson } from "@models/DICOM/dicom-json-model";
import type { GeneralDicomJson } from "../dicom";

export type MwlItemStatus =
    | "SCHEDULED"
    | "ARRIVED"
    | "READY"
    | "STARTED"
    | "DEPARTED"
    | "CANCELED"
    | "DISCONTINUED"
    | "COMPLETED";

export interface MwlItemModelConstructor {
    new (): MwlItemModel;
    public static getDimseResultCursor(query: any, keys: any): Promise<any>;
    public static getDicomJson(
        queryOptions: DicomJsonQueryOptions
    ): Promise<GeneralDicomJson[]>;
    /**
     *
     * @param query the query structure example { "00100010.Value": "foo" } or { "00100010.Value.00100010.Value": "bar" }
     */
    public static getCount(query: any): Promise<number>;
    public static createWithGeneralDicomJson(
        generalDicomJson: GeneralDicomJson
    ): Promise<MwlItemModel>;
    public static updateOneWithGeneralDicomJson(
        mwlItem: MwlItemModel,
        generalDicomJson: GeneralDicomJson
    ): Promise<MwlItemModel>;
    /**
     * 
     * @param query the query structure example { "00100010.Value": "foo" } or { "00100010.Value.00100010.Value": "bar" }
     * @param status 
     */
    public static updateStatusByQuery(query: any, status: MwlItemStatus);
    public static deleteByStudyInstanceUIDAndSpsID(
        studyUID: string,
        spsID: string
    ): Promise<number>;
    public static findOneByStudyInstanceUIDAndSpsID(
        studyUID: string,
        spsID: string
    ): Promise<MwlItemModel>;
    /**
     * 
     * @param query the query structure example { "00100010.Value": "foo" } or { "00100010.Value.00100010.Value": "bar" }
     */
    public static findMwlItems(query: any): Promise<MwlItemModel[]>;
}

export interface MwlItemModel {
    toGeneralDicomJson(): Promise<GeneralDicomJson>;
    toDicomJson(): Promise<BaseDicomJson>;
    getAttributes(): Promise<any>;
    updateStatus(status: MwlItemStatus): Promise<void>;
}

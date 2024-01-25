import type { BaseDicomJson } from "@models/DICOM/dicom-json-model";
import type { DicomJsonQueryOptions, GeneralDicomJson } from "../dicom";
import type { SUBSCRIPTION_STATE } from "@models/DICOM/ups";

export interface WorkItemModelConstructor {
    new(): WorkItemModel;
    public static findNotSubscribedWorkItems(): Promise<WorkItemModel[]>
    public static createWorkItemAndPatient(workItem: GeneralDicomJson): Promise<WorkItemModel>;
    public static findOneByUpsInstanceUID(upsInstanceUID: string): Promise<WorkItemModel>;
    public static updateOneByUpsInstanceUID(upsInstanceUID: string, generalDicomJson: GeneralDicomJson): Promise<WorkItemModel>;
    /**
     * 
     * @param query the query structure example { "00100010.Value": "foo" } or { "00100010.Value.00100010.Value": "bar" }
     * @param upsInstanceUID 
     */
    public static getCountWithQueryAndUpsInstanceUID(query: any, upsInstanceUID: string): Promise<number>;
    public static getDicomJson(queryOptions: DicomJsonQueryOptions): Promise<GeneralDicomJson[]>
}

export interface WorkItemModel {
    upsInstanceUID: string;
    patientID: string;
    transactionUID: string;
    subscribed: number;
    toGeneralDicomJson(): Promise<GeneralDicomJson>;
    toDicomJson(): Promise<BaseDicomJson>;
    subscribe(subscription: SUBSCRIPTION_STATE): Promise<WorkItemModel>;
}
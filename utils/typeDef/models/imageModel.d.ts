import type { DicomJsonQueryOptions, DicomUid, GeneralDicomJson } from "../dicom";
import type { ImagePathObj } from "../dicomImage";

export interface ImageModelConstructor {
    new (): ImageModel;
    public static getDimseResultCursor(query: any, keys: any): Promise<any>;
    public static getDicomJson(queryOptions: DicomJsonQueryOptions): Promise<GeneralDicomJson[]>;
    public static getPathGroupOfInstances(dicomUid: DicomUid): Promise<ImagePathObj[]>
    
}

export interface ImageModel {
    incrementDeleteStatus(): Promise<void>;
    deleteDicomInstances(): Promise<void>;
    getAttributes(): Promise<any>;
}
import type { ImagePathObj, InstanceFrameObj } from "../dicomImage";
import type { ImageModelConstructor, ImageModel } from "./imageModel";

export type AuditInstanceInfo = {
    sopClassUIDs: string[];
    accessionNumbers: string[];
    patientID: string;
    patientName: string;
};

export interface InstanceModelConstructor extends ImageModelConstructor {
    public static findOneByDicomUID(dicomUid: {
        studyUID: string;
        seriesUID: string;
        instanceUID: string;
    }): Promise<InstanceModel>;
    public static getAuditInstancesInfoFromStudyUID(
        studyUID: string
    ): Promise<AuditInstanceInfo>;

    public static getPathOfInstance(iParam: { studyUID: string, seriesUID: string, instanceUID: string }): Promise<ImagePathObj>;
    public static getInstanceOfMedianIndex(query: { studyUID: string }): Promise<InstanceModel>;
    public static getInstanceFrame(iParam: { studyUID: string, seriesUID: string, instanceUID: string }): Promise<InstanceFrameObj | undefined>;
}

export interface InstanceModel extends ImageModel {
    studyUID: string;
    seriesUID: string;
    instanceUID: string;
    studyPath: string;
    seriesPath: string;
    instancePath: string;
    deleteStatus: number;
}

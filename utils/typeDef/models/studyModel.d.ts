import type { ImageModel } from "./imageModel";

export interface StudyModelConstructor extends ImageModel {
    new (): StudyModel;
    public static findOneByDicomUID(dicomUid: {studyUID: string}): Promise<StudyModel>;
}

export interface StudyModel extends ImageModel {
    studyUID: string;
    deleteStatus: number;
}

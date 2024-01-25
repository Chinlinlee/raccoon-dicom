import type { ImageModelConstructor, ImageModel } from "./imageModel";

export interface SeriesModelConstructor extends ImageModelConstructor {
    new(): SeriesModel;
    findOneByDicomUID(dicomUid: { studyUID: string, seriesUID: string }): Promise<SeriesModel>;
}
export interface SeriesModel extends ImageModel {
    studyUID: string;
    seriesUID: string;
    seriesPath: string;
    deleteStatus: number;
}
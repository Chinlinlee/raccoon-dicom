import type { DicomJsonItem } from "./dicom";

export type ImagePathObj = {
    studyUID: string;
    seriesUID: string;
    instanceUID: string;
    instancePath: string;
};

export type InstanceFrameObj = {
    studyUID: string;
    seriesUID: string;
    instanceUID: string;
    instancePath: string;
    "00280008": DicomJsonItem;
    "00020010": DicomJsonItem;
    "00281050": DicomJsonItem;
    "00281051": DicomJsonItem;
};

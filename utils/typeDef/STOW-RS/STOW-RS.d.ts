import type { Fields, File } from "formidable";
import type { GeneralDicomJson } from "../dicom";

type Multipart = {
    fields?: Fields;
    files?: File[];
};

export type MultipartParseResult = {
    status: boolean;
    error?: string;
    multipart: Multipart;
};

export type SaveDicomFileResult = {
    /** The path of saved file's directory */
    fullPath: string;

    /** The relative path of saved DICOM instance file. e.g. /files/123.dcm */
    relativePath: string;

    /** The full path of saved DICOM instance file. e.g. /home/app/files/123.dcm */
    instancePath: string;

    /** The relative path of series level directory */
    seriesPath: string;

    /** The relative path of study level directory */
    studyPath: string;

    dicomJson: GeneralDicomJson;
};

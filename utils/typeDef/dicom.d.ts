export type DicomUid = {
    studyUID?: string;
    seriesUID?: string;
    instanceUID?: string;
    sopClass?: string;
    patientID: string;
};

export type DicomJsonQueryOptions = {
    query: any;
    limit?: number;
    skip?: number;
    retrieveBaseUrl?: string;
    includeFields?: string[];
    requestParams?: any;
    isRecycle?: boolean;
};

export type DicomJsonItem = {
    vr: string;
    Value: any[];
};

import type { BaseDicomJson } from "@models/DICOM/dicom-json-model";
import type { GeneralDicomJson } from "../dicom";
import type { ImageModel, ImageModelConstructor } from "./imageModel";

export interface PatientModelConstructor extends ImageModelConstructor {
    new(): PatientModel;
    /**
     * 
     * @param patientId 
     * @param patient should be general dicom json model
     */
    public static findOneOrCreatePatient(patientId: string, patient: GeneralDicomJson): Promise<PatientModel>;
    public static findOneByPatientID(patientID: string): Promise<PatientModel>;
    /**
     * 
     * @param patientID 
     * @param patient should be general dicom json model
     */
    public static createOrUpdatePatient(patientID: string, patient: GeneralDicomJson): Promise<PatientModel>;
    public static getCountByPatientID(patientID: string): Promise<number>;
}


export interface PatientModel extends ImageModel {
    patientID: string;
    deleteStatus: number;
    toGeneralDicomJson(): Promise<GeneralDicomJson>
    toDicomJson(): Promise<BaseDicomJson>
}
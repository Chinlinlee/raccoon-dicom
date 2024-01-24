import type { DicomJsonModel } from "@models/DICOM/dicom-json-model"
import type { DicomFileSaveInfo } from "@root/utils/typeDef/STOW-RS/STOW-RS"

export type StoreInfo = {
    dicomFileSaveInfo: DicomFileSaveInfo,
    dicomJsonModel: DicomJsonModel
}
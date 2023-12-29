const { Tag } = require("@dcm4che/data/Tag");

const queryTagsOfEachLevel = {
    "patient": [
        Tag.PatientName,
        Tag.PatientID,
        Tag.PatientBirthDate
    ],
    "study": [
        Tag.PatientID,
        Tag.StudyInstanceUID,
        Tag.StudyDate,
        Tag.StudyTime,
        Tag.AccessionNumber
    ],
    "series": [
        Tag.PatientID,
        Tag.StudyInstanceUID,
        Tag.SeriesInstanceUID,
        Tag.Modality,
        Tag.SeriesNumber
    ],
    "instance": [
        Tag.PatientID,
        Tag.StudyInstanceUID,
        Tag.SeriesInstanceUID,
        Tag.SOPInstanceUID,
        Tag.SOPClassUID,
        Tag.InstanceNumber
    ],
    "mwl": [
        Tag.AccessionNumber,
        Tag.ReferringPhysicianName,
        Tag.ReferencedStudySequence,
        Tag.ReferencedPatientSequence,
        Tag.PatientName,
        Tag.PatientID,
        Tag.IssuerOfPatientID,
        Tag.IssuerOfPatientIDQualifiersSequence,
        Tag.PatientBirthDate,
        Tag.PatientSex,
        Tag.OtherPatientIDsSequence,
        Tag.PatientWeight,
        Tag.MedicalAlerts,
        Tag.Allergies,
        Tag.PregnancyStatus,
        Tag.StudyInstanceUID,
        Tag.RequestingPhysician,
        Tag.RequestedProcedureDescription,
        Tag.RequestedProcedureCodeSequence,
        Tag.AdmissionID,
        Tag.SpecialNeeds,
        Tag.CurrentPatientLocation,
        Tag.PatientState,
        Tag.ScheduledProcedureStepSequence,
        Tag.RequestedProcedureID,
        Tag.RequestedProcedurePriority,
        Tag.PatientTransportArrangements,
        Tag.ConfidentialityConstraintOnPatientDataDescription,
        Tag.WorklistLabel
    ],
    "mwlSps": [
        Tag.Modality,
        Tag.AnatomicalOrientationType,
        Tag.RequestedContrastAgent,
        Tag.ScheduledStationAETitle,
        Tag.ScheduledProcedureStepStartDate,
        Tag.ScheduledProcedureStepStartTime,
        Tag.ScheduledPerformingPhysicianName,
        Tag.ScheduledProcedureStepDescription,
        Tag.ScheduledProtocolCodeSequence,
        Tag.ScheduledProcedureStepID,
        Tag.ScheduledProcedureStepStatus,
        Tag.ScheduledStationName,
        Tag.ScheduledProcedureStepLocation,
        Tag.PreMedication
    ]
};

module.exports.queryTagsOfEachLevel = queryTagsOfEachLevel;
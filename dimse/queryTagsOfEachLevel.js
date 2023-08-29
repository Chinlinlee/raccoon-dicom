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
    ]
};

module.exports.queryTagsOfEachLevel = queryTagsOfEachLevel;
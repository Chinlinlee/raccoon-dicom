const { EnumSet } = require("@java-wrapper/java/util/EnumSet");
const { QueryRetrieveLevel2 } = require("@dcm4che/net/service/QueryRetrieveLevel2");

const PATIENT_ROOT_LEVELS = EnumSet.ofSync(
    QueryRetrieveLevel2.PATIENT,
    QueryRetrieveLevel2.STUDY,
    QueryRetrieveLevel2.SERIES,
    QueryRetrieveLevel2.IMAGE
);

const STUDY_ROOT_LEVELS = EnumSet.ofSync(
    QueryRetrieveLevel2.STUDY,
    QueryRetrieveLevel2.SERIES,
    QueryRetrieveLevel2.IMAGE
);

const PATIENT_STUDY_ONLY_LEVELS = EnumSet.ofSync(
    QueryRetrieveLevel2.PATIENT,
    QueryRetrieveLevel2.STUDY
);

module.exports.PATIENT_ROOT_LEVELS = PATIENT_ROOT_LEVELS;
module.exports.STUDY_ROOT_LEVELS = STUDY_ROOT_LEVELS;
module.exports.PATIENT_STUDY_ONLY_LEVELS = PATIENT_STUDY_ONLY_LEVELS;
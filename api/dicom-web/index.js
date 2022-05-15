const { app } = require("../../app");

//#region QIDO-RS

/**
 *  @openapi
 *  /dicom-web/studies:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *      responses:
 *        200:
 *          description: Query successfully
 */
app.get("/studies", require("./controller/QIDO-RS/queryAllStudies"));

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for series from specific study's UID
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *      responses:
 *        200:
 *          description: Query successfully
 */
app.get(
    "/studies/:studyUID/series",
    require("./controller/QIDO-RS/queryStudies-Series")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/instances:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/SOPClassUID"
 *        - $ref: "#/components/parameters/InstanceNumber"
 *      responses:
 *        200:
 *          description: Query successfully
 */
app.get(
    "/studies/:studyUID/instances",
    require("./controller/QIDO-RS/queryStudies-Instances")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/SOPClassUID"
 *        - $ref: "#/components/parameters/InstanceNumber"
 *      responses:
 *        200:
 *          description: Query successfully
 */
app.get(
    "/studies/:studyUID/series/:seriesUID/instances",
    require("./controller/QIDO-RS/queryStudies-Series-Instance")
);

/**
 *  @openapi
 *  /dicom-web/series:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query all series in server
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *      responses:
 *        200:
 *          description: Query successfully
 */
app.get(
    "/series",
    require("./controller/QIDO-RS/queryAllSeries")
);

/**
 *  @openapi
 *  /dicom-web/instances:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query all instances in server
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/SOPClassUID"
 *        - $ref: "#/components/parameters/InstanceNumber"
 *      responses:
 *        200:
 *          description: Query successfully
 */
app.get(
    "/instances",
    require("./controller/QIDO-RS/queryAllInstances")
);

//#endregion

//#region STOW-RS

app.post("/studies", require("./controller/STOW-RS/storeInstance"));

//#endregion

//#region WADO-RS Retrieve Transaction Instance Resources

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's instances
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedDICOM"
 *          
 */
app.get(
    "/studies/:studyUID",
    require("./controller/WADO-RS/retrieveStudyInstances")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's series' instances
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedDICOM"
 *          
 */
app.get(
    "/studies/:studyUID/series/:seriesUID",
    require("./controller/WADO-RS/retrieveStudy-Series-Instances")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's instances
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedDICOM"
 *          
 */
app.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID",
    require("./controller/WADO-RS/retrieveInstance")
);

//#endregion

//#region WADO-RS Retrieve Transaction Metadata Resources

app.get(
    "/studies/:studyUID/metadata",
    require("./controller/WADO-RS/retrieveStudyMetadata")
);

//#endregion

module.exports = app;

const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

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
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 */
router.get("/studies", require("./controller/QIDO-RS/queryAllStudies"));

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
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 */
router.get(
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
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/InstanceRequiredMatchingAttributes"
 */
router.get(
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
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/InstanceRequiredMatchingAttributes"
 */
router.get(
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
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 * 
 */
router.get(
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
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/InstanceRequiredMatchingAttributes"
 */
router.get(
    "/instances",
    require("./controller/QIDO-RS/queryAllInstances")
);

/**
 *  @openapi
 *  /dicom-web/patients:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query all patients in server
 *      parameters:
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/PatientBirthDate"
 *        - $ref: "#/components/parameters/PatientBirthTime"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/PatientRequiredMatchingAttributes"
 */
router.get(
    "/patients",
    require("./controller/QIDO-RS/allPatient")
);

//#endregion

module.exports = router;
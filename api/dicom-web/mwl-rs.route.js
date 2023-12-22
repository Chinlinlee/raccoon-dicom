const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi, validateByJoi } = require("@root/api/validator");
const router = express();


/**
 *  @openapi
 *  /dicom-web/mwlitems:
 *    post:
 *      tags:
 *        - MWL-RS
 *      description: >
 *          This transaction create or update a Modality WorkList item.
 *      requestBody:
 *        content:
 *          application/dicom+json:
 *      parameters:
 *      responses:
 *        "200":
 *          description: The workitem create successfully
 */
router.post("/mwlitems",
    validateByJoi(Joi.array().items(
        Joi.object({
            "00100020": Joi.object({
                vr: Joi.string().valid("LO").required(),
                Value: Joi.array().items(Joi.string()).min(1).max(1).required()
            }).required(),
            "00400100": Joi.object({
                vr: Joi.string().valid("SQ").required(),
                Value: Joi.array().items(Joi.object()).min(1).required()
            }).required()
        })
    ).min(1).max(1), "body", {allowUnknown: true}),
    require("./controller/MWL-RS/create-mwlItem")
);

/**
 *  @openapi
 *  /dicom-web/mwlitems:
 *    get:
 *      tags:
 *        - MWL-RS
 *      description: >
 *          This transaction search Modality WorkList items.
 *      parameters:
 *        - $ref: "#/components/parameters/filter"
 *      responses:
 *        "200":
 *           description: Query successfully
 *           content:
 *             "application/dicom+json":
 *               schema:
 *                 type: array
 */
router.get("/mwlitems",require("./controller/MWL-RS/get-mwlItem"));

/**
 *  @openapi
 *  /dicom-web/mwlitems/count:
 *    get:
 *      tags:
 *        - MWL-RS
 *      description: >
 *          This transaction get Modality WorkList items count.
 *      parameters:
 *        - $ref: "#/components/parameters/filter"
 *      responses:
 *        "200":
 *           description: Query successfully
 *           content:
 *             "application/dicom+json":
 *                 schema:
 *                     properties:
 *                         count:
 *                             type: number
 */
router.get("/mwlitems/count",require("./controller/MWL-RS/count-mwlItem"));

/**
 *  @openapi
 *  /dicom-web/mwlitems/{studyUID}/{spsID}:
 *    delete:
 *      tags:
 *        - MWL-RS
 *      description: >
 *          This transaction deletes a Modality WorkList item.
 *      requestBody:
 *        content:
 *          application/dicom+json:
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/spsID"
 *      responses:
 *        "204":
 *           description: Delete successfully
 */
router.delete("/mwlitems/:studyUID/:spsID", validateParams({
    studyUID: Joi.string().required(),
    spsID: Joi.string().required()
}, "params", undefined), require("./controller/MWL-RS/delete-mwlItem"));


/**
 *  @openapi
 *  /dicom-web/mwlitems/{studyUID}/{spsID}/status/{spsStatus}:
 *    post:
 *      tags:
 *        - MWL-RS
 *      description: >
 *          This transaction create or update a Modality WorkList item.
 *      requestBody:
 *        content:
 *          application/dicom+json:
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/spsID"
 *        - $ref: "#/components/parameters/spsStatus"
 *      responses:
 *        "200":
 *          description: change status of mwl item successfully
 */
router.post("/mwlitems/:studyUID/:spsID/status/:status",
    validateByJoi(
        Joi.object({
            studyUID: Joi.string().required(),
            spsID: Joi.string().required(),
            status: Joi.string().valid("SCHEDULED", "ARRIVED", "READY", "STARTED", "DEPARTED", "CANCELED", "DISCONTINUED", "COMPLETED").required()
        }), "params", {allowUnknown: false}),
    require("./controller/MWL-RS/change-mwlItem-status")
);

/**
 *  @openapi
 *  /dicom-web/mwlitems/status/{spsStatus}:
 *    post:
 *      tags:
 *        - MWL-RS
 *      description: >
 *          This transaction create or update a Modality WorkList item.
 *      requestBody:
 *        content:
 *          application/dicom+json:
 *      parameters:
 *        - $ref: "#/components/parameters/spsStatus"
 *        - $ref: "#/components/parameters/filter"
 *      responses:
 *        "200":
 *          description: change status of mwl items successfully
 */
router.post("/mwlitems/status/:status",
    validateByJoi(
        Joi.object({
            status: Joi.string().valid("SCHEDULED", "ARRIVED", "READY", "STARTED", "DEPARTED", "CANCELED", "DISCONTINUED", "COMPLETED").required()
        }), "params", {allowUnknown: false}),
    require("./controller/MWL-RS/change-filtered-mwlItem-status")
);

module.exports = router;
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

module.exports = router;
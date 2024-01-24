const express = require("express");
const router = express();
const Joi = require("joi");
const { validateParams } = require("../validator");


/**
 * @openapi
 * /dicom-web/patients:
 *  post:
 *    tags:
 *      - PAM-RS
 *    description: Create new patient
 *    responses:
 *      200:
 *        description: Create patient successfully
 *        content:
 *          "application/dicom+json":
 *            schema:
 *              type: object
 *              properties:
 *                patientID:
 *                  type: string
 *              
 */
router.post("/patients", validateParams({
    "00100020": Joi.object({
        "vr": Joi.string().required().allow("LO"),
        "Value": Joi.array().items(Joi.string()).required().min(1)
    }).required()
}, "body", { allowUnknown: true }), require("./controller/PAM-RS/create-patient"));


/**
 * @openapi
 * /dicom-web/patients/{patientID}:
 *  put:
 *    tags:
 *      - PAM-RS
 *    description: Create new patient
 *    parameters:
 *      - $ref: "#/components/parameters/patientID"
 *    requestBody:
 *      required: true
 *      content:
 *        "application/dicom+json":
 *          schema:
 *            $ref: "#/components/schemas/PatientRequiredMatchingAttributes"
 *        "application/json":
 *          schema:
 *            $ref: "#/components/schemas/PatientRequiredMatchingAttributes"
 *    responses:
 *      200:
 *        description: Create patient successfully
 *        content:
 *          "application/dicom+json":
 *            schema:
 *              $ref: "#/components/schemas/PatientRequiredMatchingAttributes"
 *              
 */
router.put("/patients/:patientID", require("./controller/PAM-RS/update-patient"));

router.delete("/patients/:patientID", require("./controller/PAM-RS/delete-patient"));

module.exports = router;
/**
 * Route /fhir-convert
 * Implement `DICOM convert to FHIR ImagingStudy, Patient, Endpoint`
 * 
 * @author Chin-Lin Lee <a5566qq2581@gmail.com>
 */

const Joi = require("joi");
const { validateByJoi } = require("../validator");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");

const formMiddleWare = async (req, res, next) => {
    const form = formidable({});
    
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        req.fields = fields;
        req.files = files;
        next();
    });
};

/**
 *  @openapi
 *  /fhir-convert:
 *    post:
 *      tags:
 *        - fhir-convert
 *      description: Convert DICOM to FHIR ImagingStudy, Patient, Endpoint
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                file:
 *                  type: string
 *                  format: binary
 *            encoding:
 *              file:
 *                contentType: application/dicom;
 *      responses:
 *        "200":
 *          description: The DICOM instance store successfully
 */
router.post("/", formMiddleWare, require("./controller/dicom-to-fhir"));


module.exports = router;
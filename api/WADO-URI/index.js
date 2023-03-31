/**
 * Route
 * Implement https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_9.4
 * WADO-URI
 * @author Chin-Lin Lee <a5566qq2581@gmail.com>
 */

const { wadoUriValidationSchema } = require("./middleware/validation-schema");
const { defaultContentType } = require("./middleware/default-contentType");
const { validateByJoi} = require("../validator");
const express = require("express");
const router = express.Router();

/**
 *  @openapi
 *  /wado:
 *    get:
 *      tags:
 *        - WADO-URI
 *      description: Retrieve instance's metadata
 *      parameters:
 *        - $ref: "#/components/parameters/requestType"
 *        - $ref: "#/components/parameters/queryStudyUID"
 *        - $ref: "#/components/parameters/querySeriesUID"
 *        - $ref: "#/components/parameters/queryInstanceUID"
 *        - $ref: "#/components/parameters/contentType"
 *        - $ref: "#/components/parameters/frameNumber"
 *        - $ref: "#/components/parameters/imageQuality"
 *        - $ref: "#/components/parameters/region"
 *        - $ref: "#/components/parameters/rows"
 *        - $ref: "#/components/parameters/columns"
 *        - $ref: "#/components/parameters/windowCenter"
 *        - $ref: "#/components/parameters/windowWidth"
 *        - $ref: "#/components/parameters/iccprofile"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/WadoUriData"
 *          
 */
router.get("/", defaultContentType, validateByJoi(wadoUriValidationSchema, "query", {
    allowUnknown: false
}), require("./controller/retrieveInstance"));


module.exports = router;
const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

//#region STOW-RS

/**
 *  @openapi
 *  /dicom-web/studies:
 *    post:
 *      tags:
 *        - STOW-RS
 *      description: store DICOM instance
 *      requestBody:
 *        content:
 *          multipart/related:
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
router.post("/studies", require("./controller/STOW-RS/storeInstance"));

//#endregion

module.exports = router;
/**
 * https://dicom.nema.org/medical/dicom/current/output/html/part18.html#chapter_11
 * https://dicom.nema.org/medical/dicom/2019a/output/chtml/part18/sect_6.9.html
 * @author Chin-Lin, Lee <a5566qq2581@gmail.com>
 */
const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi, validateByJoi } = require("../validator");
const router = express();
const GLOBAL_SUBSCRIPTION_UIDS = [
    "1.2.840.10008.5.1.4.34.5",
    "1.2.840.10008.5.1.4.34.5.1"
];

//#region UPS-RS

/**
 *  @openapi
 *  /dicom-web/workitems:
 *    post:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction creates a Workitem on the target Worklist. It corresponds to the UPS DIMSE N-CREATE operation.
 *          See [Create Workitem Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.4)
 *      parameters:
 *        - $ref: "#/components/parameters/workitem"
 *      responses:
 *        "201":
 *          description: The workitem create successfully
 */
router.post("/workitems",
    validateParams({
        workitem: Joi.string().invalid(...GLOBAL_SUBSCRIPTION_UIDS).optional()
    }, "query", {
        allowUnknown: false
    }),
    validateByJoi(Joi.array().items(Joi.object()).min(1).max(1), "body"),
    require("./controller/UPS-RS/create-workItems")
);


/**
 *  @openapi
 *  /dicom-web/workitems:
 *    get:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction retrieves a Workitem. It corresponds to the UPS DIMSE N-GET operation.
 *          See [Retrieve Workitem Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.5)
 *      responses:
 *        "200":
 *           description: Query successfully
 *           content:
 *             "application/dicom+json":
 *               schema:
 *                 type: array
 */
router.get("/workitems",
    require("./controller/UPS-RS/get-workItem")
);

/**
 *  @openapi
 *  /dicom-web/workitems/{workitemUID}:
 *    get:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction retrieves a Workitem. It corresponds to the UPS DIMSE N-GET operation.
 *          See [Retrieve Workitem Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.5)
 *      responses:
 *        "200":
 *           description: Query successfully
 *           content:
 *             "application/dicom+json":
 *               schema:
 *                 type: array
 */
router.get("/workitems/:workItem",
    require("./controller/UPS-RS/get-workItem")
);

/**
 *  @openapi
 *  /dicom-web/workitems/{workitemUID}:
 *    get:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction modifies Attributes of an existing Workitem. It corresponds to the UPS DIMSE N-SET operation.
 *          See [Update Workitem Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.6)
 *      responses:
 *        "200":
 *           description: Query successfully
 *           content:
 *             "application/dicom+json":
 *               schema:
 *                 type: array
 */
router.post("/workitems/:workItem",
    require("./controller/UPS-RS/update-workItem")
);

//#endregion

module.exports = router;
/**
 * https://dicom.nema.org/medical/dicom/current/output/html/part18.html#chapter_11
 * https://dicom.nema.org/medical/dicom/2019a/output/chtml/part18/sect_6.9.html
 * @author Chin-Lin, Lee <a5566qq2581@gmail.com>
 */
const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi, validateByJoi } = require("../validator");
const router = express();
const { SUBSCRIPTION_FIXED_UIDS } = require("@models/DICOM/ups");

//#region UPS-RS

/**
 *  @openapi
 *  /dicom-web/workitems:
 *    post:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction creates a Workitem on the target Worklist. It corresponds to the UPS DIMSE N-CREATE operation.<br/><br/>
 *          See [Create Workitem Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.4)
 *      parameters:
 *        - $ref: "#/components/parameters/workitem"
 *      responses:
 *        "201":
 *          description: The workitem create successfully
 */
router.post("/workitems",
    validateParams({
        workitem: Joi.string().invalid(SUBSCRIPTION_FIXED_UIDS.FilteredGlobalUID, SUBSCRIPTION_FIXED_UIDS.GlobalUID).optional()
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
 *          This transaction retrieves a Workitem. It corresponds to the UPS DIMSE N-GET operation.<br/><br/>
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
 *          This transaction retrieves a Workitem. It corresponds to the UPS DIMSE N-GET operation.<br/><br/>
 *          See [Retrieve Workitem Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.5)
 *      parameters:
 *        - $ref: "#/components/parameters/workitemUID"
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
 *    post:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction modifies Attributes of an existing Workitem. It corresponds to the UPS DIMSE N-SET operation.<br/><br/>
 *          See [Update Workitem Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.6)
 *      parameters:
 *        - $ref: "#/components/parameters/workitemUID"
 *      responses:
 *        "200":
 *           description: modify successfully
 */
router.post("/workitems/:workItem",
    require("./controller/UPS-RS/update-workItem")
);

/**
 *  @openapi
 *  /dicom-web/workitems/{workitemUID}/state:
 *    put:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction is used to change the state of a Workitem. It corresponds to the UPS DIMSE N-ACTION operation "Change UPS State".<br/>
 *          State changes are used to claim ownership, complete, or cancel a Workitem.<br/><br/>
 *          See [Change Workitem State](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.7)
 *      parameters:
 *        - $ref: "#/components/parameters/workitemUID"
 *      responses:
 *        "200":
 *           description: The update was successful, and the response payload contains a Status Report document.
 */
router.put("/workitems/:workItem/state",
    validateByJoi(Joi.array().items(
        Joi.object({
            "00741000": Joi.object({
                vr: Joi.string().valid("CS"),
                Value: Joi.array().items(Joi.string().valid("IN PROGRESS", "COMPLETED", "CANCELED")).min(1).max(1)
            }),
            "00081195": Joi.object({
                vr: Joi.string().valid("UI"),
                Value: Joi.array().items(Joi.string()).min(1).max(1)
            })
        })
    ).min(1).max(1), "body"),
    require("./controller/UPS-RS/change-workItem-state")
);

/**
 *  @openapi
 *  /dicom-web/workitems/{workitemUID}/subscribers/{aeTitle}:
 *    post:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction creates a Subscription to a Worklist or Workitem resource. It corresponds to the UPS DIMSE N-ACTION operation "Subscribe to Receive UPS Event Reports".<br/><br/>
 *          See [Subscribe Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.10)
 *      parameters:
 *        - $ref: "#/components/parameters/workitemUID"
 *        - $ref: "#/components/parameters/aeTitle"
 *      responses:
 *        "201":
 *           description: The Subscription was created.
 */
router.post("/workitems/:workItem/subscribers/:subscriberAeTitle",
    validateParams({
        deletionlock: Joi.boolean().default(false)
    }, "query", { allowUnknown: true }),
    require("./controller/UPS-RS/subscribe")
);

/**
 *  @openapi
 *  /dicom-web/workitems/{workitemUID}/subscribers/{aeTitle}:
 *    delete:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction is used to stop the origin server from sending new Event Reports to the user agent and may also stop the origin server from subscribing the user agent to new Workitems.<br/><br/>
 *          See [Unsubscribe Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.11)
 *      parameters:
 *        - $ref: "#/components/parameters/workitemUID"
 *        - $ref: "#/components/parameters/aeTitle"
 *      responses:
 *        "200":
 *           description: The Subscription(s) were removed.
 */
router.delete("/workitems/:workItem/subscribers/:subscriberAeTitle",
    require("./controller/UPS-RS/unsubscribe")
);

/**
 *  @openapi
 *  /dicom-web/workitems/{workitemUID}/subscribers/{aeTitle}/suspend:
 *    post:
 *      tags:
 *        - UPS-RS
 *      description: >
 *          This transaction is used to stop the origin server from automatically subscribing the User-Agent to new Workitems. This does not delete any existing subscriptions to specific Workitems.<br/>
 *          See [Suspend Global Subscription Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.12)
 *      parameters:
 *        - $ref: "#/components/parameters/workitemUID"
 *        - $ref: "#/components/parameters/aeTitle"
 *      responses:
 *        "200":
 *           description: The Subscription(s) were removed.
 */
router.post("/workitems/:workItem/subscribers/:subscriberAeTitle/suspend", 
    validateParams({
        workItem: Joi.string().valid(SUBSCRIPTION_FIXED_UIDS.GlobalUID, SUBSCRIPTION_FIXED_UIDS.FilteredGlobalUID),
        subscriberAeTitle: Joi.string()
    }, "params"),
    require("./controller/UPS-RS/suspend-subscription")
);

router.post("/workitems/:workItem/cancelrequest",
    require("./controller/UPS-RS/cancel")
);

//#endregion

module.exports = router;
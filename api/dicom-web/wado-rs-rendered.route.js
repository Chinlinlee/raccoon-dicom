const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

const { BaseRetrieveRenderedController } = require("./controller/WADO-RS/rendered/retrieveRendered.controller");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyImagePathFactory, SeriesImagePathFactory, InstanceImagePathFactory } = require("./controller/WADO-RS/service/WADO-RS.service");
const { StudyFramesWriter, SeriesFramesWriter, InstanceFramesWriter, InstanceFramesListWriter } = require("./controller/WADO-RS/service/rendered.service");
const RetrieveRenderedController = async (req, res) => {
    let controller = new BaseRetrieveRenderedController(req, res);
    await controller.doPipeline();
};

//#region WADO-RS Retrieve Transaction Rendered Resources

const renderedQueryValidation = {
    quality: Joi.number().integer().min(1).max(100),
    iccprofile: Joi.string().default("no").valid("no", "yes", "srgb", "adobergb", "rommrgb"),
    viewport: Joi.string().custom((v, helper) => {
        let valueSplit = v.split(",");
        if (valueSplit.length == 2) {
            let [vw, vh] = valueSplit;
            if (!Joi.number().min(0).validate(vw).error &&
                !Joi.number().min(0).validate(vh).error) {
                return v;
            }
            return helper.message(`invalid viewport parameter, viewport=vw,vh. The vw and vh must be number`);
        } else if (valueSplit.length == 6) {
            let [vw, vh, sx, sy, sw, sh] = valueSplit;
            if (Joi.number().empty("").validate(sx).error) {
                return helper.message("invalid viewport parameter, sx must be number");
            } else if (Joi.number().empty("").validate(sy).error) {
                return helper.message("invalid viewport parameter, sy must be number");
            }
            [vw, vh, sx, sy, sw, sh] = valueSplit.map(v=> Number(v));
            if (!Joi.number().min(0).validate(vw).error &&
                !Joi.number().min(0).validate(vh).error &&
                !Joi.number().min(0).validate(sx).error &&
                !Joi.number().min(0).validate(sy).error &&
                !Joi.number().validate(sw).error &&
                !Joi.number().validate(sh).error
            ) {
                return v;
            }
        } 
        return helper.message("invalid viewport parameter, viewport=vw,vh or viewport=vw,vh,sx,sy,sw,sh");
    })
};

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/rendered:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's rendered images
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/quality"
 *        - $ref: "#/components/parameters/viewport"
 *        - $ref: "#/components/parameters/iccprofile"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedImageJpeg"
 *          
 */
router.get(
    "/studies/:studyUID/rendered",
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info();
        req.logger.logger.info(`Get study's rendered images, study UID: ${req.params.studyUID}`);
        req.imagePathFactory = StudyImagePathFactory;
        req.framesWriter = StudyFramesWriter;
        next();
    },
    RetrieveRenderedController
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/rendered:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's Series' rendered images
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/quality"
 *        - $ref: "#/components/parameters/viewport"
 *        - $ref: "#/components/parameters/iccprofile"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedImageJpeg"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/rendered",
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info();
        req.logger.logger.info(`Get study's series' rendered images, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}`);
        req.imagePathFactory = SeriesImagePathFactory;
        req.framesWriter = SeriesFramesWriter;
        next();
    },
    RetrieveRenderedController
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}/rendered:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's Series' instance's rendered images
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *        - $ref: "#/components/parameters/quality"
 *        - $ref: "#/components/parameters/viewport"
 *        - $ref: "#/components/parameters/iccprofile"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedImageJpeg"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/rendered",
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get study's series' instance rendered images, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}`+
        `, instance UID: ${req.params.instanceUID}`);
        req.imagePathFactory = InstanceImagePathFactory;
        req.framesWriter = InstanceFramesWriter;
        next();
    },
    RetrieveRenderedController
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}/frames/{frameNumbers}/rendered:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's rendered images
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *        - $ref: "#/components/parameters/frameNumbers"
 *        - $ref: "#/components/parameters/quality"
 *        - $ref: "#/components/parameters/viewport"
 *        - $ref: "#/components/parameters/iccprofile"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/RetrieveRenderedByFrameNumbers"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/frames/:frameNumber/rendered",
    validateParams({
        frameNumber : intArrayJoi.intArray().items(Joi.number().integer().min(1)).single()
    } , "params" , {allowUnknown : true}), 
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get instance' rendered frames, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}`+
        `, instance UID: ${req.params.instanceUID}, frame numbers: ${req.params.frameNumber}`);
        req.imagePathFactory = InstanceImagePathFactory;
        req.framesWriter = InstanceFramesListWriter;
        next();
    },
    RetrieveRenderedController
);

//#endregion

module.exports = router;
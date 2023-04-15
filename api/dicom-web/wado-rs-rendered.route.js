const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();


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

router.get(
    "/studies/:studyUID/rendered",
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    require("./controller/WADO-RS/rendered/study")
);

router.get(
    "/studies/:studyUID/series/:seriesUID/rendered",
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    require("./controller/WADO-RS/rendered/series")
);

router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/rendered",
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    require("./controller/WADO-RS/rendered/instances")
);

router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/frames/:frameNumber/rendered",
    validateParams({
        frameNumber : intArrayJoi.intArray().items(Joi.number().integer().min(1)).single()
    } , "params" , {allowUnknown : true}), 
    validateParams(renderedQueryValidation, "query", { allowUnknown: false }),
    require("./controller/WADO-RS/rendered/instanceFrames")
);

//#endregion

module.exports = router;
const moment = require("moment");

const vrValueTransform = {
    "DT": (v) => v ? moment(v, "YYYYMMDDhhmmss.SSSSSSZZ").toISOString(): undefined
};

module.exports.vrValueTransform = vrValueTransform;
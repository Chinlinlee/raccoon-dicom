const _ = require("lodash");

const { QidoRsService, convertAllQueryToDICOMTag } = require("@root/api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");

QidoRsService.prototype.initQuery_ = function () {
    let query = _.cloneDeep(this.request.query);
    let queryKeys = Object.keys(query).sort();
    for (let i = 0; i < queryKeys.length; i++) {
        let queryKey = queryKeys[i];
        if (!query[queryKey]) delete query[queryKey];
    }

    this.query = convertAllQueryToDICOMTag(query, false);
};

module.exports.QidoRsService = QidoRsService;
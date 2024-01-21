const _ = require("lodash");

const { QidoRsService } = require("@root/api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");

QidoRsService.prototype.initQuery_ = function () {
    let query = _.cloneDeep(this.request.query);
    let queryKeys = Object.keys(query).sort();
    for (let i = 0; i < queryKeys.length; i++) {
        let queryKey = queryKeys[i];
        if (!query[queryKey]) delete query[queryKey];
    }

    this.query = convertAllQueryToDicomTag(query, false);
};

module.exports.QidoRsService = QidoRsService;
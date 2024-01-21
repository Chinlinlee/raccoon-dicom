const { 
    QueryDicomJsonFactory, 
    QueryPatientDicomJsonFactory, 
    QueryStudyDicomJsonFactory, 
    QuerySeriesDicomJsonFactory, 
    QueryInstanceDicomJsonFactory 
} = require("@root/api/dicom-web/controller/QIDO-RS/service/query-dicom-json-factory");

QueryDicomJsonFactory.prototype.getDicomJson = async function () {
    return await this.model.getDicomJson(this.queryOptions);
};

module.exports.QueryDicomJsonFactory = QueryDicomJsonFactory;
module.exports.QueryPatientDicomJsonFactory = QueryPatientDicomJsonFactory;
module.exports.QueryStudyDicomJsonFactory = QueryStudyDicomJsonFactory;
module.exports.QuerySeriesDicomJsonFactory = QuerySeriesDicomJsonFactory;
module.exports.QueryInstanceDicomJsonFactory = QueryInstanceDicomJsonFactory;
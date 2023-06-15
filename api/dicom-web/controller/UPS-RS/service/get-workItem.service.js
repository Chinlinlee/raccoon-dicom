const _ = require("lodash");
const workItemsModel = require("@models/mongodb/models/workItems");
const { 
    convertAllQueryToDICOMTag,
    convertRequestQueryToMongoQuery
} = require("../../QIDO-RS/service/QIDO-RS.service");

class GetWorkItemService {
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.query = {};

        /**
         * @private
         */
        this.limit_ = parseInt(this.request.query.limit) || 100;
        delete this.request.query["limit"];

        /**
         * @private
         */
        this.skip_ = parseInt(this.request.query.offset) || 0;
        delete this.request.query["offset"];


        this.initQuery_();
    }

    async getUps() {
        let mongoQuery = (await convertRequestQueryToMongoQuery(this.query)).$match;

        let queryOptions = {
            query: mongoQuery,
            skip: this.skip_,
            limit: this.limit_,
            requestParams: this.request.params
        };

        let docs = await workItemsModel.getDicomJson(queryOptions);
        
        return this.adjustDocs(docs);
    }

    async adjustDocs(docs) {
        return docs.map( doc => {
            _.set(doc, "00080016", {
                vr: "UI",
                Value: ["1.2.840.10008.5.1.4.34.6.1"]
            });
            return doc;
        });
    }

    initQuery_() {
        let query = _.cloneDeep(this.request.query);
        let queryKeys = Object.keys(query).sort();
        for (let i = 0; i < queryKeys.length; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }

        this.query = convertAllQueryToDICOMTag(query);
    }

}

module.exports.GetWorkItemService = GetWorkItemService;
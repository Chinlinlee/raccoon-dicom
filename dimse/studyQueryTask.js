const _ = require("lodash");

const { StudyQueryTask } = require("@chinlinlee/dcm777/net/StudyQueryTask");
const { JsPatientQueryTask } = require("./patientQueryTask");
const { default: Tag } = require("@dcm4che/data/Tag");
const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { StudyQueryTaskInjectInterface, createStudyQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/StudyQueryTaskInject");
const { DimseQueryBuilder } = require("./queryBuilder");
const dicomStudyModel = require("@models/mongodb/models/dicomStudy");

class JsStudyQueryTask extends JsPatientQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.studyInit = false;
        this.studyCursor = false;
        this.study = null;
        this.studyAttr = null;
    }

    async get() {
        let studyQueryTask = await StudyQueryTask.newInstanceAsync(
            this.as,
            this.pc,
            this.rq,
            this.keys,
            this.getQueryTaskInjectProxy(),
            this.getPatientQueryTaskInjectProxy(),
            this.getStudyQueryTaskInjectProxy()
        );

        return studyQueryTask;
    }

    getQueryTaskInjectProxy() {
        /** @type { QueryTaskInjectInterface } */
        this.studyBasicQueryTaskInjectMethods = {
            hasMoreMatches: () => {
                return !_.isNull(this.studyAttr);
            },
            nextMatch: async () => {
                let tempRecord = this.studyAttr;
                await this.studyQueryTaskInjectMethods.wrappedFindNextStudy();
                return tempRecord;
            },
            adjust: async (match) => {
                return await this.patientAdjust(match);
            }
        };

        if (!this.queryTaskInjectProxy) {
            this.queryTaskInjectProxy = createQueryTaskInjectProxy(this.studyBasicQueryTaskInjectMethods);
        }

        return this.queryTaskInjectProxy;
    }

    getStudyQueryTaskInjectProxy() {
        /** @type { StudyQueryTaskInjectInterface } */
        this.studyQueryTaskInjectMethods = {
            wrappedFindNextStudy: async () => {
                await this.studyQueryTaskInjectMethods.findNextStudy();
            }, 
            getStudy: async () => {
                let queryBuilder = new DimseQueryBuilder(this.keys, "study");
                let normalQuery = await queryBuilder.toNormalQuery();
                let mongoQuery = await queryBuilder.getMongoQuery(normalQuery);

                if (_.isNull(this.studyAttr) && !this.studyInit) {
                    let returnKeys = this.getReturnKeys(normalQuery);

                    this.studyCursor = await dicomStudyModel.getDimseResultCursor({
                        ...mongoQuery.$match
                    }, returnKeys);

                    this.study = await this.studyCursor.next();
                    this.studyAttr = this.study ? await this.study.getAttributes() : null;
                } else {
                    this.study = await this.studyCursor.next();
                    this.studyAttr = this.study ? await this.study.getAttributes() : null;
                }
            },
            findNextStudy: async () => {
                await this.studyQueryTaskInjectMethods.getStudy();
                return !_.isNull(this.studyAttr);
            }
        };

        if (!this.studyQueryTaskInjectProxy) {
            this.studyQueryTaskInjectProxy = createStudyQueryTaskInjectProxy(this.studyQueryTaskInjectMethods);
        }

        return this.studyQueryTaskInjectProxy;
    }
}

module.exports.JsStudyQueryTask = JsStudyQueryTask;
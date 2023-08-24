const _ = require("lodash");

const { StudyQueryTask } = require("@chinlinlee/dcm777/net/StudyQueryTask");
const { JsPatientQueryTask } = require("./patientQueryTask");
const { Tag } = require("@dcm4che/data/Tag");
const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { StudyQueryTaskInjectInterface, createStudyQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/StudyQueryTaskInject");
const { DimseQueryBuilder } = require("./queryBuilder");
const dicomStudyModel = require("@models/mongodb/models/dicomStudy");
const { Attributes } = require("@dcm4che/data/Attributes");
const { logger } = require("@root/utils/logs/log");

class JsStudyQueryTask extends JsPatientQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.studyCursor = false;
        this.study = null;
        /** @type { Attributes | null } */
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

        await super.get();
        await this.studyQueryTaskInjectMethods.wrappedFindNextStudy();

        return studyQueryTask;
    }

    getQueryTaskInjectProxy() {
        /** @type { QueryTaskInjectInterface } */
        this.studyBasicQueryTaskInjectMethods = {
            hasMoreMatches: () => {
                return !_.isNull(this.studyAttr);
            },
            nextMatch: async () => {
                let returnAttr = await Attributes.newInstanceAsync(
                    await this.patientAttr.size() + await this.studyAttr.size()
                );
                await Attributes.unifyCharacterSets([this.patientAttr, this.studyAttr]);
                await returnAttr.addAll(this.patientAttr);
                await returnAttr.addAll(this.studyAttr);

                await this.studyQueryTaskInjectMethods.wrappedFindNextStudy();

                return returnAttr;
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
                this.study = await this.studyCursor.next();
                this.studyAttr = this.study ? await this.study.getAttributes() : null;
            },
            findNextStudy: async () => {
                if (!this.patientAttr)
                    return false;

                if (!this.studyAttr) {
                    await this.getNextStudyCursor();
                    await this.studyQueryTaskInjectMethods.getStudy();
                } else {
                    await this.studyQueryTaskInjectMethods.getStudy();
                }

                while (!this.studyAttr && await this.patientQueryTaskInjectMethods.findNextPatient()) {
                    await this.getNextStudyCursor();
                    await this.studyQueryTaskInjectMethods.getStudy();
                }

                return !_.isNull(this.studyAttr);
            }
        };

        if (!this.studyQueryTaskInjectProxy) {
            this.studyQueryTaskInjectProxy = createStudyQueryTaskInjectProxy(this.studyQueryTaskInjectMethods);
        }

        return this.studyQueryTaskInjectProxy;
    }

    async getNextStudyCursor() {
        let queryAttr = await Attributes.newInstanceAsync();
        await queryAttr.addAll(this.keys);
        await queryAttr.addSelected(this.patientAttr, [Tag.PatientID]);

        let queryBuilder = new DimseQueryBuilder(queryAttr, "study");
        let normalQuery = await queryBuilder.toNormalQuery();
        let mongoQuery = await queryBuilder.getMongoQuery(normalQuery);

        let returnKeys = this.getReturnKeys(normalQuery);

        logger.info(`do DIMSE Study query: ${JSON.stringify(mongoQuery.$match)}`);
        this.studyCursor = await dicomStudyModel.getDimseResultCursor({
            ...mongoQuery.$match
        }, returnKeys);
    }
}

module.exports.JsStudyQueryTask = JsStudyQueryTask;
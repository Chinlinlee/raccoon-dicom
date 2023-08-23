const _ = require("lodash");

const { StudyQueryTask } = require("@chinlinlee/dcm777/net/StudyQueryTask");
const { JsPatientQueryTask } = require("./patientQueryTask");
const { default: Tag } = require("@dcm4che/data/Tag");
const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { StudyQueryTaskInjectInterface, createStudyQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/StudyQueryTaskInject");
const { SqlDimseQueryBuilder: DimseQueryBuilder } = require("./queryBuilder");
const { Attributes } = require("@dcm4che/data/Attributes");
const { StudyQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/querybuilder");
const { StudyModel } = require("@models/sql/models/study.model");

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
                await this.getNextStudy();
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
        this.studyOffset = 0;
        let queryAttr = await Attributes.newInstanceAsync();
        await Attributes.unifyCharacterSets([this.keys, this.patientAttr]);
        await queryAttr.addAll(this.keys, true);
        await queryAttr.addSelected(this.patientAttr, [Tag.PatientID]);

        let queryBuilder = new DimseQueryBuilder(queryAttr, "study");
        let normalQuery = await queryBuilder.toNormalQuery();
        let sqlQuery = await queryBuilder.getSqlQuery(normalQuery);
        
        let studyQueryBuilder = new StudyQueryBuilder({
            query: {
                ...sqlQuery
            }
        });
        let q = studyQueryBuilder.build();
        this.studyQuery = {
            ...q
        };
    }

    async getNextStudy() {
        let study = await StudyModel.findOne({
            ...this.studyQuery,
            attributes: ["json"],
            limit: 1,
            offset: this.studyOffset++
        });

        this.study = study;
        this.studyAttr = this.study ? await this.study.getAttributes() : null;
    }
}

module.exports.JsStudyQueryTask = JsStudyQueryTask;
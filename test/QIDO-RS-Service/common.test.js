const mongoose = require("mongoose");
const patientModel = require("../../models/mongodb/models/patient.model");
const { DicomJsonModel } = require("../../models/DICOM/dicom-json-model");
const { expect } = require("chai");
const _ = require("lodash");
const { 
    convertAllQueryToDicomTag
} = require("../../api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { convertRequestQueryToMongoQuery } = require("../../api/dicom-web/controller/QIDO-RS/service/query-dicom-json-factory");
const moment = require("moment");


describe("QIDO-RS Service Common Function", () => {

    /**
     * Every Mongo query overview:
     * ```json
     * {
     *      $match: {
     *          $and: [
     *              {
     *                  $or: [
     *                      {
     *                          "tag1": "value1",
     *                      },
     *                      {
     *                          "tag1": "value2"
     *                      }
     *                  ]
     *              },
     *              {
     *                  $or: [
     *                      {
     *                          "tag2": "value1"
     *                      }
     *                  ]
     *              }
     *          ]
     *      }
     * }
     * ```
     */

    it("Should convert `00100010=foobar1234`, VR: `PN` to Mongo query", async ()=> {
        let query = convertAllQueryToDicomTag({
            "00100010": "foobar1234"
        });

        let mongoQuery = await convertRequestQueryToMongoQuery(query);

        let actual = {
            $match: {
                $and: [
                    {
                        $or: [
                            {
                                "00100010.Value.Alphabetic": "foobar1234"
                            }, 
                            {
                                "00100010.Value.familyName" : "foobar1234"
                            },
                            {
                                "00100010.Value.givenName" : "foobar1234"
                            } ,
                            {
                                "00100010.Value.middleName" :"foobar1234"
                            } ,
                            {
                                "00100010.Value.prefix" : "foobar1234"
                            },
                            {
                                "00100010.Value.suffix" : "foobar1234"
                            }
                        ]
                    }
                ]
            }
        };

        expect(mongoQuery).deep.equal(actual);
    });

    describe("Convert `Date` VR: `DA` query", ()=> {
        it("Should convert `00100030=19991111` to Mongo query", async ()=> {
            let query = convertAllQueryToDicomTag({
                "00100030": "19991111"
            });
    
            let actual = {
                $match: {
                    $and: [
                        {
                            $or: [
                                {
                                    "00100030.Value": {
                                        $gte: moment("1999-11-11").startOf("day").toDate(),
                                        $lte: moment("1999-11-11").endOf("day").toDate()
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
    
            let mongoQuery = await convertRequestQueryToMongoQuery(query);
    
            expect(mongoQuery).deep.equal(actual);
        });
    
        it("Should convert `00100030=19991111-` to Mongo query", async ()=> {
            let query = convertAllQueryToDicomTag({
                "00100030": "19991111-"
            });
    
            let actual = {
                $match: {
                    $and: [
                        {
                            $or: [
                                {
                                    "00100030.Value": {
                                        $gte: moment("1999-11-11").startOf("day").toDate()
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
    
            let mongoQuery = await convertRequestQueryToMongoQuery(query);
    
            expect(mongoQuery).deep.equal(actual);
        });
    
        it("Should convert `00100030=-19991111` to Mongo query", async ()=> {
            let query = convertAllQueryToDicomTag({
                "00100030": "-19991111"
            });
    
            let actual = {
                $match: {
                    $and: [
                        {
                            $or: [
                                {
                                    "00100030.Value": {
                                        $lte: moment("1999-11-11").endOf("day").toDate()
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
    
            let mongoQuery = await convertRequestQueryToMongoQuery(query);
    
            expect(mongoQuery).deep.equal(actual);
        });
    
        it("Should convert `00100030=19900101-19991111` to Mongo query", async ()=> {
            let query = convertAllQueryToDicomTag({
                "00100030": "19900101-19991111"
            });
    
            let mongoQuery = await convertRequestQueryToMongoQuery(query);

            let actual = {
                $match: {
                    $and: [
                        {
                            $or: [
                                {
                                    "00100030.Value": {
                                        $gte: moment("1990-01-01").startOf("day").toDate(),
                                        $lte: moment("1999-11-11").endOf("day").toDate()
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
    
            expect(mongoQuery).deep.equal(actual);
        });
    });


    describe("Convert string `00100020=foobar` VR: `LO`", () => {
        it("Should convert string completely", async ()=> {
            let query = convertAllQueryToDicomTag({
                "00100020": "foobar"
            });
    
            let mongoQuery = await convertRequestQueryToMongoQuery(query);

            let actual = {
                $match: {
                    $and: [
                        {
                            $or: [
                                {
                                    "00100020.Value": "foobar"
                                }
                            ]
                        }
                    ]
                }
            };
    
            expect(mongoQuery).deep.equal(actual);
        });
    });

});
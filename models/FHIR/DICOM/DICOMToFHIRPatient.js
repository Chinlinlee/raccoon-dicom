const dicomParser= require("dicom-parser");
const uuid = require('uuid');
const fsP = require('node:fs/promises');
const _ =require("lodash");
const moment = require("moment");
const { dcm2jsonV8 } = require('../../DICOM/dcmtk');

class HumanName {
    constructor() {
        this.use = "anonymous";
        this.text = undefined;
        this.family = undefined; //姓氏
        this.given = undefined; //名字或中間名
        this.prefix = undefined;
        this.suffix = undefined;
    }
    toJson()
    {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            if (this[b]) a[b] = this[b];
            return a;
        }, {}); 
    }
}

/**
 * 
 * @param {string} filename The filename of the DICOM.
 */
async function dicomFileToFHIRPatient(filename)
{
    try {
        let dicomFileBuffer = await fsP.readFile(filename);
        let dataset = dicomParser.parseDicom(dicomFileBuffer);
        let pName = dataset.string('x00100010');
        let pGender = dataset.string('x00100040') || "unknown";
        let FHIRGender = {
            "M": "male",
            "F": "female",
            "O": "other",
            "UNKNOWN": "unknown"
        };
        pGender = FHIRGender[pGender.toUpperCase()];
        let pBD = dataset.string('x00100030');
        let patientName = new HumanName();
        if (pName == undefined) {
            pName = "UNKNOWN";
        } else {
            patientName.use = "usual";
        }
        patientName.text = pName;
        let DICOMpName = _.pickBy(dicomParser.parsePN(pName) ,  _.identity); //remove undefined or null key
        
        patientName = patientName.toJson();
        let pJson = JSON.stringify(patientName);
        pJson = JSON.parse(pJson);
        let FHIRpName = {
            familyName: (pJson) => {
                pJson.family = DICOMpName.familyName;
            },
            givenName: (pJson) => {
                if (pJson.given) {
                    pJson.given.push(DICOMpName.givenName);
                } else {
                    pJson.given = [];
                    pJson.given.push(DICOMpName.givenName);
                }
            },
            middleName: (pJson) => {
                if (pJson.given) {
                    pJson.given.push(DICOMpName.middleName);
                } else {
                    pJson.given = [];
                    pJson.given.push(DICOMpName.middleName);
                }
            },
            prefix: (pJson) => {
                if (pJson.prefix) {
                    pJson.prefix.push(DICOMpName.middleName);
                } else {
                    pJson.prefix = [];
                    pJson.prefix.push(DICOMpName.middleName);
                }
            },
            suffix: (pJson) => {
                if (pJson.prefix) {
                    pJson.prefix.push(DICOMpName.middleName);
                } else {
                    pJson.prefix = [];
                    pJson.prefix.push(DICOMpName.middleName);
                }
            }
        };
        for (let key in DICOMpName) {
            FHIRpName[key](pJson);
        }
        let Patient = 
        {
            resourceType: "Patient",
            id: dataset.string('x00100020') || uuid.v4(),
            gender: pGender,
            active: true,
            name: [
                pJson
            ]
        };
        if (pBD) {
            Patient.birthDate = moment.utc(pBD).format("YYYY-MM-DD");
        }
        Patient.id = Patient.id.replace(/[\s\u0000]/gim , '');
        Patient.id = Patient.id.replace(/_/gim, '');
        return Patient;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

/**
 * 
 * @param {JSON} dcmJson 
 * @returns 
 */
function dicomJsonToFHIRPatient(dcmJson)
{
    let pName = dcm2jsonV8.dcmString(dcmJson , '00100010');
    let pGender = dcm2jsonV8.dcmString(dcmJson , '00100040') || "unknown";
    let FHIRGender = {
        "M" : "male" , 
        "F" : "female" , 
        "O" : "other" , 
        "UNKNOWN" : "unknown"
    };
    pGender = FHIRGender[pGender.toUpperCase()];
    let pBD = dcm2jsonV8.dcmString(dcmJson , '00100030');
    let patientName = new HumanName();
    if (pName == undefined) {
        pName = {};
        _.set(pName, "Alphabetic", "UNKNOWN");
    } else {
        patientName.use = "usual";
    }
    patientName.text = pName.Alphabetic;
    let DICOMpName = _.pickBy(dicomParser.parsePN(pName.Alphabetic) ,  _.identity); //remove undefined or null key
    
    patientName = patientName.toJson();
    let pJson = JSON.stringify(patientName);
    pJson = JSON.parse(pJson);
    let FHIRpName = {
        familyName: (pJson) => {
            pJson.family = DICOMpName.familyName;
        },
        givenName: (pJson) => {
            if (pJson.given) {
                pJson.given.push(DICOMpName.givenName);
            } else {
                pJson.given = [];
                pJson.given.push(DICOMpName.givenName);
            }
        },
        middleName: (pJson) => {
            if (pJson.given) {
                pJson.given.push(DICOMpName.middleName);
            } else {
                pJson.given = [];
                pJson.given.push(DICOMpName.middleName);
            }
        },
        prefix: (pJson) => {
            if (pJson.prefix) {
                pJson.prefix.push(DICOMpName.middleName);
            } else {
                pJson.prefix = [];
                pJson.prefix.push(DICOMpName.middleName);
            }
        },
        suffix: (pJson) => {
            if (pJson.prefix) {
                pJson.prefix.push(DICOMpName.middleName);
            } else {
                pJson.prefix = [];
                pJson.prefix.push(DICOMpName.middleName);
            }
        }
    };
    for (let key in DICOMpName) {
        FHIRpName[key](pJson);
    }
    let Patient = 
    {
        resourceType : "Patient" , 
        id : dcm2jsonV8.dcmString(dcmJson , '00100020') || uuid.v4(),
        gender : pGender , 
        active : true  ,
        name :[
            pJson
        ]
    };
    Patient.id = Patient.id.replace(/[\s\u0000]/gim , '');
    Patient.id = Patient.id.replace(/_/gim, '');
    if (pBD) {
        Patient.birthDate = moment.utc(pBD).format("YYYY-MM-DD");
    }
    return Patient;
}

module.exports.dicomJsonToFHIRPatient = dicomJsonToFHIRPatient;
module.exports.dicomFileToFHIRPatient = dicomFileToFHIRPatient;




const fs = require('fs');
const dicomParser = require('dicom-parser');
const moment = require("moment");
const flatten = require('flat');
const _ = require('lodash');
const { dcm2jsonV8 } = require('../DICOM/dcmtk');

/**
 * 將Class轉成Json的父類別
 */
 class ToJsonParent {
    constructor() {}
    toJson() {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            if (this[b]) a[b] = this[b];
            return a;
        }, {});
    }
}

/**
 * ImagingStudy類別
 */
class ImagingStudy extends ToJsonParent {
    constructor() {
        super();
        this.resourceType = "ImagingStudy";
        this.id = "";
        this.identifier = []; //0..* 
        this.status = "unknown"; //1..1 code registered | available | cancelled | entered-in-error | unknown
        this.modality = undefined; //0..* coding
        this.subject = new Reference(); //1..1 reference
        this.started = undefined; //0..1 dateTime
        this.endpoint = undefined; //0..* Reference don't have this now  (This is mean where the DicomWEB server)
        this.numberOfSeries = undefined; //0..1  int
        this.numberOfInstances = undefined; //0..1 int
        this.description = undefined; //0..1 string
        this.series = []; //0..* 放置ImagingStudy_Series
    }
}

class ImagingStudy_Series extends ToJsonParent {
    constructor() {
        super();
        this.uid = ""; //1..1 
        this.number = undefined;  //0..1 int 
        this.modality = new Coding(); //1..1 coding   //
        this.modality.system = "http://dicom.nema.org/resources/ontology/DCM";
        this.description = undefined; //0..1 string
        this.numberOfInstances = ""; //0..1 int
        this.endpoint = undefined; //0..* Reference
        this.bodySite =undefined; //0..1 Coding
        this.laterality = undefined;
        this.started = undefined; //0..1 dateTime
        this.performer = undefined; //0..* {function (Codeable) :0..1, actor:1..1 (Reference)}
        this.instance = []; //0..* 
    }
}

class ImagingStudy_Series_Instance extends ToJsonParent {
    constructor() {
        super();
        this.uid = ""; //1..1 
        this.sopClass = new Coding(); //1..1 coding
        this.number = ""; //0..1
        this.title = undefined; //0..1
    }
}

class Coding {
    constructor() {
        this.system = undefined;
        this.version = undefined;
        this.code = undefined;
        this.display = undefined;
        this.userSelected = undefined;
    }
}

class Identifier {
    constructor() {
        this.use = undefined;
        this.type = undefined;
        this.system = undefined;
        this.value = undefined;
        this.period = undefined;
    }
}

class Reference {
    constructor() {
        this.reference = undefined; //(Literal reference, Relative, internal or absolute URL)(string)
        this.type = undefined; //string
        this.identifier = undefined;
        this.display = undefined;
    }
}

class CodeableConcept {
    constructor() {
        this.Coding = [];
        this.text = undefined;
    }
}

class Period {
    constructor() {
        this.start = undefined;
        this.end = undefined;
    }
}

function dicomJsonToFHIRImagingStudy(dicomJson) {
    //#region study
    let studyObj = new ImagingStudy();
    let studyInstanceUID = dcm2jsonV8.dcmString(dicomJson, "0020000D");

    let ANandIssuer = getTagStringConcat(dicomJson, "00080050", "00080051");
    studyObj.id = studyInstanceUID;
    let identifiers = [studyInstanceUID, ANandIssuer, dcm2jsonV8.dcmString(dicomJson, "00200010")];
    studyObj.identifier = getStudyIdentifiers(identifiers);
    studyObj.modality = dcm2jsonV8.dcmString(dicomJson, "00080061");

    let patientId = dcm2jsonV8.dcmString(dicomJson, "00100020");
    studyObj.subject.identifier = new Identifier();
    if (patientId) {
        studyObj.subject.reference = "Patient/" + dcm2jsonV8.dcmString(dicomJson, '00100020');
        studyObj.subject.type = "Patient";
        studyObj.subject.identifier.use = "usual"
        studyObj.subject.identifier.value = dcm2jsonV8.dcmString(dicomJson, '00100020');
    } else {
        studyObj.subject.reference = "Patient/unknown"
        studyObj.subject.type = "Patient";
        studyObj.subject.identifier.use = "anonymous"
        studyObj.subject.identifier.value = "unknown";
    }

    let studyStartedStr = dcm2jsonV8.dcmString(dicomJson, "00080020") + dcm2jsonV8.dcmString(dicomJson, "00080030");
    studyObj.started = moment(studyStartedStr, "YYYYMMDDhhmmss").toISOString();
    studyObj.numberOfSeries = dcm2jsonV8.dcmString(dicomJson, "00201206");
    studyObj.numberOfInstances = dcm2jsonV8.dcmString(dicomJson, "00201208");
    studyObj.description = dcm2jsonV8.dcmString(dicomJson, "00081030");
    //#endregion

    //#region series
    let seriesObj = new ImagingStudy_Series();
    seriesObj.uid = dcm2jsonV8.dcmString(dicomJson, "0020000E");
    seriesObj.number = dcm2jsonV8.dcmString(dicomJson, "00200011");
    seriesObj.modality.code = dcm2jsonV8.dcmString(dicomJson, "00080060");
    seriesObj.description = dcm2jsonV8.dcmString(dicomJson, "0008103E");
    seriesObj.numberOfInstances = dcm2jsonV8.dcmString(dicomJson, "00201209");
    seriesObj.bodySite = new Coding();
    seriesObj.bodySite.display = dcm2jsonV8.dcmString(dicomJson, "00180015");

    let seriesStarted = dcm2jsonV8.dcmString(dicomJson, "00080021") + dcm2jsonV8.dcmString(dicomJson, "00080031");
    seriesObj.started = moment(seriesStarted, "YYYYMMDDhhmmss");
    seriesObj.started = seriesObj.started.isValid() ? seriesObj.started.toISOString() : undefined;
    seriesObj.performer = dcm2jsonV8.dcmString(dicomJson, "00081050") || 
                                 dcm2jsonV8.dcmString(dicomJson, "00081052") || 
                                 dcm2jsonV8.dcmString(dicomJson, "00081070") || 
                                 dcm2jsonV8.dcmString(dicomJson, "00081072");
    //#endregion

    //#region instance

    let instanceObj = new ImagingStudy_Series_Instance();
    instanceObj.uid = dcm2jsonV8.dcmString(dicomJson, "00080018");
    instanceObj.sopClass.system = "urn:ietf:rfc:3986"
    instanceObj.sopClass.code = "urn:oid:" + dcm2jsonV8.dcmString(dicomJson, "00080016");
    instanceObj.number = dcm2jsonV8.dcmString(dicomJson, "00200013");
    instanceObj.title = dcm2jsonV8.dcmString(dicomJson, "00080008") || 
                        dcm2jsonV8.dcmString(dicomJson, "00070080") || 
                        ((dcm2jsonV8.dcmString(dicomJson, "0040a043") != undefined) ? dcm2jsonV8.dcmString(dicomJson, "0040a043") + dcm2jsonV8.dcmString(dicomJson, "00080104") : undefined) || dcm2jsonV8.dcmString(dicomJson, "00420010");
    //#endregion

    let imagingStudyJson = combineImagingStudyClass(studyObj, seriesObj, instanceObj);
    return imagingStudyJson;
}

function getTagStringConcat(dicomJson, ...tags) {
    let result = "";
    for(let i = 0 ; i < tags.length ; i++) {
        let tag = tags[i];
        let tagValue = dcm2jsonV8.dcmString(dicomJson, tag);
        if (tagValue) result += tagValue;
    }
    if (!result) return undefined;
    return result;
}

function getStudyIdentifiers(identifiers) {
    let result = [];
    if (identifiers[0] != undefined) {
        let identifier1 = new Identifier();
        identifier1.use = "official";
        identifier1.system = "urn:dicom:uid";
        identifier1.value = "urn:oid:" + identifiers[0];
        result.push(identifier1);
    }
    //need sample dicom with the organization
    if (identifiers[1] != undefined) {
        let identifier2 = new Identifier();
        identifier2.type = new Coding();
        identifier2.use = "usual";
        identifier2.value = identifiers[1];
        result.push(identifier2);
    }
    if (identifiers[2] != undefined) {
        let identifier3 = new Identifier();
        identifier3.use = "secondary";
        identifier3.value = "s" + identifiers[2];
        result.push(identifier3);
    }
    return result;
}

function combineImagingStudyClass(imagingStudy, imagingStudySeries, imagingStudySeriesInstance) {
    try {
        let imagingStudyJson = imagingStudy.toJson();
        let seriesJson = imagingStudySeries.toJson();
        let instanceJson = imagingStudySeriesInstance.toJson();
        seriesJson.instance.push(instanceJson);
        imagingStudyJson.series.push(seriesJson);
        let flattenData = flatten(imagingStudyJson);
        flattenData = _.pickBy(flattenData, _.identity);
        imagingStudyJson = flatten.unflatten(flattenData);
        return imagingStudyJson;
    } catch (e) {
        console.error(e);
        return false;
    }
}


module.exports.dicomJsonToFHIRImagingStudy = dicomJsonToFHIRImagingStudy;
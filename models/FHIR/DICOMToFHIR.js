const fs = require('fs');
const dicomParser = require('dicom-parser');
const moment = require("moment");
const flatten = require('flat');
const _ = require('lodash');

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

function dicomJsonToFHIR(dicomJson) {

}

let fileBuffer = fs.readFileSync("./000000.dcm");
//將讀取後的Buffer轉成Uint8Array
let uint8FileBuffer = new Uint8Array(fileBuffer);
//使用DICOM Parser讀取DICOM檔
let dataSet = dicomParser.parseDicom(uint8FileBuffer);

let imagingStudyObj = new ImagingStudy();
let dicomInstanceUID = dataSet.string("x00080018");
imagingStudyObj.id = dicomInstanceUID;
//#region identifier
imagingStudyObj.identifier = [];
let identifier = new Identifier();
identifier.system = "urn:dicom:uid";
let dicomStudyInstanceUID = dataSet.string("x0020000d");
identifier.value = `urn:oid:${dicomStudyInstanceUID}`;
imagingStudyObj.identifier.push(identifier);
//#endregion
imagingStudyObj.status = "unknown";
imagingStudyObj.subject = new Reference();
let dicomPatientId = dataSet.string("x00100020");
imagingStudyObj.subject.reference = `Patient/${dicomPatientId}`;

//#region started
let dicomStudyDate = dataSet.string("x00080020");
let dicomStudyTime = dataSet.string("x00080030");
let momentStudyDate = moment(dicomStudyDate+dicomStudyTime, "YYYYMMDDHHmmss");
imagingStudyObj.started = momentStudyDate.toISOString();
//#endregion

imagingStudyObj.numberOfSeries = dataSet.intString("x00201206");
imagingStudyObj.numberOfInstances = dataSet.intString("x00201208");
imagingStudyObj.description = dataSet.string("x00081030");

//#region series
let seriesObj = new ImagingStudy_Series();
let dicomSeriesUID = dataSet.string("x0020000e");
seriesObj.uid = dicomSeriesUID;
let dicomSeriesNumber = dataSet.intString("x00200011");
seriesObj.number = dicomSeriesNumber;
let dicomSeriesModality = dataSet.string("x00080060");
seriesObj.modality.system = "http://dicom.nema.org/resources/ontology/DCM";
seriesObj.modality.code = dicomSeriesModality;
seriesObj.description = dataSet.string("x0008103e");
seriesObj.numberOfInstances = dataSet.intString("x00201209");
let seriesDate = dataSet.string("x00080021");
let seriesTime = dataSet.string("x00080031");
let momentSeriesDate = moment(seriesDate+seriesTime, "YYYYMMDDHHmmss");
seriesObj.started = momentSeriesDate.toISOString();

imagingStudyObj.series = [];
imagingStudyObj.series.push(seriesObj);
//#endregion

//#region instance
let instanceObj = new ImagingStudy_Series_Instance();
instanceObj.uid = dicomInstanceUID;
let sopClass = dataSet.string("x00080016");
instanceObj.sopClass.system = "urn:ietf:rfc:3986";
instanceObj.sopClass.code = `urn:oid:${sopClass}`;
instanceObj.number = dataSet.intString("x00200013");

imagingStudyObj.series[0].instance.push(instanceObj);
//#endregion


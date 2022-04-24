const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');


const dcmtkSupportTransferSyntax = [
    "1.2.840.10008.1.2",
    "1.2.840.10008.1.2.1",
    "1.2.840.10008.1.2.1.99",
    "1.2.840.10008.1.2.2",
    "1.2.840.10008.1.2.4.50",
    "1.2.840.10008.1.2.4.51",
    "1.2.840.10008.1.2.4.53",
    "1.2.840.10008.1.2.4.55",
    "1.2.840.10008.1.2.4.57",
    "1.2.840.10008.1.2.4.70",
    "1.2.840.10008.1.2.5"
];

const { dcm2json } = require('dicom-to-json');
const dcm2jsonV8 = {
    exec : function (dcmfile) {
        return new Promise((resolve) => {
            try {
                dcm2json(dcmfile , function (data) {
                    data = data.replace(/,\\u0000/g, '');
                    data = data.replace(/\\u0000/g, '');
                    let obj = JSON.parse(data);
                    return resolve(obj);
                });
            } catch (e) {
                console.error(e);
                return resolve(false);
            }
        })
    } , 
    dcmString : function (json , tag) {
        let data = _.get(json, tag);
        //console.log("d" , data);
        let value = _.get(data, "Value.0");
        //console.log(value);
        return value;
    }
}



module.exports = {
    dcm2jsonV8 : dcm2jsonV8 ,
    dcmtkSupportTransferSyntax: dcmtkSupportTransferSyntax
}

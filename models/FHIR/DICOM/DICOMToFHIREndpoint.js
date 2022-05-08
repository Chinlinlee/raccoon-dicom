/*connectionType
dicom-wado-rs
dicom-qido-rs
dicom-stow-rs
dicon-wado-uri
direct-project
*/

/**
 * 
 * @param {string} addressUrl The DICOMWeb URL of study level
 * @param {*} id The unique id of this DICOMWeb URL of PACS server.
 * @returns 
 */
function dicomJsonToFHIREndpoint(addressUrl, id) {
    let endpoint = {
        "resourceType" : "Endpoint" ,
        "status": "active",
        "id" : id ,
        connectionType : {
            system : "http://terminology.hl7.org/CodeSystem/endpoint-connection-type" , 
            code : "dicom-wado-rs"
        },
        "payloadType": [
            {
                "text": "DICOM"
            }
        ],
        "payloadMimeType": [
            "application/dicom"
        ],
        "address": addressUrl
    };
    return endpoint;
}

module.exports.dicomJsonToFHIREndpoint = dicomJsonToFHIREndpoint;
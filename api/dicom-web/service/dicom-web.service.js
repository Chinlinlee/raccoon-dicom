const _ = require("lodash");
const { raccoonConfig } = require("../../../config-class");
const urlObj = require("url");

class DicomWebService {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.protocol = req.secure ? "https" : "http";
    }

    
    getBasicURL() {

        let hostname = raccoonConfig.dicomWebConfig.host;

        if (raccoonConfig.dicomWebConfig.host.includes("{host}")) {
            hostname = raccoonConfig.dicomWebConfig.host.replace("{host}", this.request.headers.host);
        }

        let hostnameSplit = _.compact(hostname.split("/"));
        let realHostname = hostnameSplit.shift();
        let pathname = [...hostnameSplit, ...raccoonConfig.dicomWebConfig.apiPath.split("/")].join("/");
        let basicUrlObj = new urlObj.URL(`${this.protocol}://${realHostname}`);

        basicUrlObj.pathname = pathname;

        return basicUrlObj.href;
    }

}

module.exports.DicomWebService = DicomWebService;
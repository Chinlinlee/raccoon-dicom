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

    /**
     * 
     * @param {import('http').IncomingMessage} request 
     * @returns 
     */
    static getRemoteAddress(request) {
        return _.get(request, "socket.remoteAddress", "127.0.0.1");
    }

    static getRemoteHostname(request) {
        return request.headers.host.split(':')[0];
    }

    static getServerAddress() {
        return `${raccoonConfig.serverConfig.host}:${raccoonConfig.serverConfig.port}`;
    }

    static getServerHostname() {
        return `${raccoonConfig.serverConfig.host}`;
    }

    /**
    * 
    * @param {Pick<import("@root/utils/typeDef/dicom").DicomUid, "studyUID" | "seriesUID" | "instanceUID">} uids
    * @returns 
    */
    static getUidsString(uids) {
        let uidsKeys = Object.keys(uids);
        let strArr = [];
        for (let i = 0; i < uidsKeys.length; i++) {
            let key = uidsKeys[i];
            strArr.push(`${key}: ${uids[key]}`);
        }
        return strArr.join(", ");
    }
}

module.exports.DicomWebService = DicomWebService;
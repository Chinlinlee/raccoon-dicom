/**
 * @typedef Uids
 * @property {string} studyUID
 * @property {string} [seriesUID]
 * @property {string} [instanceUID]
 */

/**
 * @typedef {object} UIDObject
 * @property {string} studyUID
 * @property {string} seriesUID
 * @property {string} sopInstanceUID
 * @property {string} sopClass
 * @property {string} patientID
 *
 */

/**
 * @typedef DicomJsonMongoQueryOptions
 * @property {object} query
 * @property {number} limit
 * @property {number} skip
 * @property {string} retrieveBaseUrl
 * @property {object} requestParams?
 * @property {string[]} includeFields
 * @property {boolean} [isRecycle]
 */

/**
 * @typedef DicomJsonItem
 * @property {string} vr
 * @property {any[]} Value
 */

const DICOM = true;

module.exports.unUse = {};

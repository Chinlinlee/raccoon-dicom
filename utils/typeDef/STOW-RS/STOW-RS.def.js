/**
 * @typedef {object} MultipartParseResult
 * @property {boolean} status
 * @property {string | undefined} error
 * @property {object} multipart
 * @property {import('formidable').Fields | undefined} multipart.fields
 * @property {import('formidable').File[] | undefined} multipart.files
 *
 */

/**
 * @typedef {object} SaveDicomFileResult
 * @property {string} fullPath The path of saved file's directory
 * @property {string} relativePath The relative path of saved DICOM instance file. e.g. /files/123.dcm
 * @property {string} instancePath The full path of saved DICOM instance file. e.g. /home/app/files/123.dcm
 * @property {string} seriesPath The relative path of series level directory
 * @property {string} studyPath The relative path of study level directory
 * @property {Object} dicomJson 
 */

const STOW_RS = true;

module.exports.unUse = {};

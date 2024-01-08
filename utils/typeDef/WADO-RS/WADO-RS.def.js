/**
 * @typedef { Object } ImagePathObj
 * @property { string } studyUID
 * @property { string } seriesUID
 * @property { string } instanceUID
 * @property { string } instancePath
 */

/**
 * @typedef { {
 *     studyUID: string,
 *     seriesUID: string,
 *     instanceUID: string,
 *     instancePath: string,
 *     "00280008": import("../dicom").DicomJsonItem,
 *     "00020010": import("../dicom").DicomJsonItem,
 *     "00281050": import("../dicom").DicomJsonItem,
 *     "00281051": import("../dicom").DicomJsonItem
 * } } InstanceFrameObj
 */

module.exports.unUse = {};
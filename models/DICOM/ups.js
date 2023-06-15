/**
 * see: {@link https://dicom.nema.org/medical/dicom/current/output/chtml/part04/sect_CC.2.3.html | Subscribe/Unsubscribe to Receive UPS Event Reports (N-ACTION) }
 */

/**
 * Enum for UPS 
 * @readonly
 * @enum {number}
 */
const SUBSCRIPTION_STATE = {
    NOT_SUBSCRIBED: 0,
    SUBSCRIBED_LOCK: 1,
    SUBSCRIBED_NO_LOCK: 2
};

/**
 * @readonly
 * @enum {string}
 */
const SUBSCRIPTION_FIXED_UIDS = {
    GlobalUID: "1.2.840.10008.5.1.4.34.5",
    FilteredGlobalUID: "1.2.840.10008.5.1.4.34.5.1"
};

module.exports.SUBSCRIPTION_STATE = SUBSCRIPTION_STATE;
module.exports.SUBSCRIPTION_FIXED_UIDS = SUBSCRIPTION_FIXED_UIDS;
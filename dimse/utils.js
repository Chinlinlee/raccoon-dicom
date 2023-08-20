/**
 * 
 * @param {number} tag 
 */
function intTagToString(tag) {
    return tag.toString(16).padStart(8, "0").toUpperCase();
}

module.exports.intTagToString = intTagToString;
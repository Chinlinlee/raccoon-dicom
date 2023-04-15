module.exports = {
    "diff": true,
    "extension": ["js", "cjs", "mjs"],
    "package": "./package.json",
    "reporter": "spec",
    "slow": "75",
    "timeout": "300000",
    "ui": "bdd",
    "parallel": false,
    "sort": false,
    "recursive": true,
    "file": [
        "test/before.js",
        "test/QIDO-RS-Service/common.test.js",
        "test/QIDO-RS-Service/patient.test.js",
        "test/patient.mongo.test.js",
        "test/store-instances.test.js",
        "test/query.test.js"
    ]
};

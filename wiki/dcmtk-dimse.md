# DCMTK DIMSE Plugin

Raccoon-DICOM offers another option for using DIMSE (i.e., DCMTK DIMSE). The following will explain how to enable the DCMTK DIMSE Plugin.

Branch: dcmtk-dimse

## Preparations
- Disable the DCM4CHE DIMSE in Raccoon.
- Set the `ENABLE_DIMSE` environment variable in the `.env` file to `false`.
```text
...
ENABLE_DIMSE=false
...
```

## Switch to dcmtk-dimse branch
```bash
git checkout dcmtk-dimse
```

## DCMTK DIMSE Configuration
### dcmqrscp Configuration File
- Path: `plugins/dcm4raccoon/dcmqrscp.cfg`
- You can copy `plugins/dcm4raccoon/dcmqrscp.example.cfg` and rename it as `dcmqrscp.cfg`.

## Plugin Configuration File
- Path: `plugins/config.js`
```js
module.exports.pluginsConfig = {
    "dcm4raccoon": {
        // Please setup the dcmqrscp config in the plugin's dcmtk folder if needed.
        // Please config the HostTable in dcmqrscp.cfg in order for people to connect.
        enable: true,
        before: false,
        routers: [],
        // this is temp folder for storing files from c-store.
        storepath: "./plugins/dcm4raccoon/dicomFiles/",
        port: 6066
    }
};
```
- If you need to use a different port, you can modify the listening port as needed.

## Start
- Start Raccoon-DICOM as usual.
```bash
node server.js
```
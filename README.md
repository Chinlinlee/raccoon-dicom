# raccoon-dicom
Another Raccoon focus on DICOM.

[English](README.md) | [繁體中文](README.zh-TW.md)

---

**Raccoon-DICOM** is a noSQL-based medical image archive designed for managing DICOM images, utilizing MongoDB to store and manage the images while providing RESTful APIs that support [DICOMweb](https://www.dicomstandard.org/dicomweb/") protocols for querying, retrieving, and managing DICOM images.

# Environment Requirements
- Before starting Raccoon, MongoDB, imagemagick, node.js, and JAVA JDK must be installed.
- node.js >= 16
- Java JDK >= 11
- MongoDB >= 4.4
- [imagemagick](https://imagemagick.org/script/download.php)

> **Note**
> - You must copy opencv_java library to JDK's lib directory
> - In windows, copy `opencv_java.dll`
> - In linux, copy `libclib_jiio.so` and `libopencv_java.so`

# Configuration
## dotenv `.env`
- The `.env` file at project root.
- You can copy the `.env.template` and modify it.

```dotenv
# MongoDB
MONGODB_NAME="raccoon-dicom"
MONGODB_HOSTS=["mongodb"]
MONGODB_PORTS=[27017]
MONGODB_USER="root"
MONGODB_PASSWORD="root"
MONGODB_AUTH_SOURCE="admin"
MONGODB_IS_SHARDING_MODE=false

# Server
SERVER_PORT=8081
SERVER_SESSION_SECRET_KEY="secret-key"

# DICOM Web
DICOM_STORE_ROOTPATH="/dicomFiles"
DICOMWEB_HOST="{host}"
DICOMWEB_PORT=8081
DICOMWEB_API="dicom-web"

# DICOM DIMSE
ENABLE_DIMSE=false
DCM4CHE_QRSCP_COMMAND=`[
    "-b",
    "DCMQRSCP:11112",
    "--dicomdir",
    "{project}/config/DICOMDIR",
    "--ae-config",
    "{project}/config/ae.properties",
    "--all-storage",
    "--filepath",
    "DICOM/{0020000D,hash}/{0020000E,hash}/{00080018,hash}.dcm",
    "--raccoon",
    "{project}/config/raccoon-dimse-app.example.json"
]`

# FHIR
SYCN_TO_FHIR_SERVER=false
FHIRSERVER_BASE_URL="http://localhost:8088/fhir"

```

<details>
 <summary><h3>Environment Variables Info</h3></summary>


| Field Name | Type of Value | Description |
| --- | --- | --- |
| #MongoDB | |
| MONGODB_NAME | string | The name of the MongoDB database. |
| MONGODB_HOSTS | array of strings | A list of hostnames or IP addresses where the MongoDB server is running. |
| MONGODB_PORTS | array of numbers | A list of port numbers corresponding to the MongoDB servers specified in MONGODB_HOSTS. |
| MONGODB_USER | string | The username to use when connecting to the MongoDB server. |
| MONGODB_PASSWORD | string | The password to use when connecting to the MongoDB server. |
| MONGODB_AUTH_SOURCE | string | The name of the MongoDB database to authenticate against. |
| MONGODB_IS_SHARDING_MODE | boolean | A flag indicating whether or not the MongoDB instance is running in sharding mode. |
|#Server | |
| SERVER_PORT | number | The port number on which the server will run.
| SERVER_SESSION_SECRET_KEY | string | The secret key of session
| #DICOMweb | |
| DICOM_STORE_ROOTPATH | string | The root directory where DICOM files will be stored.
| DICOMWEB_HOST | string | The hostname of the DICOM Web server. Which use to combine 00081190 (Retrieve URL).<br/><br/>You can use {host} in string that will replace to `request.headers.host`
| DICOMWEB_PORT | number | The port number on which the DICOM Web server will run. Which use to combine 00081190 (Retrieve URL)<br/><br/>e.g. 8088, will be http://example.com:8088/dicom-web/studies
| #DIMSE | |
| ENABLE_DIMSE | boolean | A flag indicating whether or not the DICOM DIMSE service should be enabled.
| DCM4CHE_QRSCP_COMMAND | string | The command to start the DCM4CHE QRSCP service. Please see the usage from[dcm4che-tool-dcmqrscp](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md), and you must pass `--raccoon {json-config-file}` to allow DCM4CHE QRSCP communicate with raccoon.<br/><br/>DIMSE config of racoon please see <a href="#dimse-app">DIMSE APP</a>.<br/><br/>You can use {project} in string that will replace to __dirname


</details>

## DIMSE APP
- Raccoon-DICOM use [DCM4CHE QRSCP Tool](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md) to provide DIMSE services
- You can set `ENABLE_DIMSE=true` to enable DICOM DIMSE service
- And you must pass `--raccoon {json-config-file}` in `DCM4CHE_QRSCP_COMMAND` environment
- Example config file can found at `config/raccoon-dimse-app.example.json`
- Please use absolute path in raccoon.dicomStoreRoot and raccoon.raccoonUploadScriptPath 

```json
{
  "mongodb": {
    "hosts": ["127.0.0.1"],
    "ports": [27017],
    "username": "root",
    "password": "root",
    "authSource": "admin",
    "database": "raccoon-dicom",
    "debug": false
  },
  "raccoon": {
    "dicomStoreRoot": "./",
    "raccoonUploadScriptPath": "local/dicom-uploader-stow.js",
    "mode": "STOW",
    "stowUrl": "http://127.0.0.1:8081/dicom-web/studies"
  }
}
```

<details>
    <summary><h3>Config Properties Info</h3></summary>

| Field Name | Type of Value | Description |
| --- | --- | --- |
| mongodb.hosts | array of strings | A list of hostnames or IP addresses where the MongoDB server is running. |
| mongodb.ports | array of numbers | A list of port numbers corresponding to the MongoDB servers specified in mongodb.hosts. |
| mongodb.username | string | The username to use when connecting to the MongoDB server. |
| mongodb.password | string | The password to use when connecting to the MongoDB server. |
| mongodb.authSource | string | The name of the MongoDB database to authenticate against. |
| mongodb.database | string | The name of the MongoDB database. |
| mongodb.debug | boolean | A flag indicating whether or not debug mode is enabled for MongoDB. Which setting logger level of mongodb |
| raccoon.dicomStoreRoot | string | The root directory of Raccoon-DICOM that use in C-MOVE <br/><br/>⚠️Please use absolute path|
| raccoon.raccoonUploadScriptPath | string | The path to the DICOM uploader script (i.e. local/dicom-uploader-stow.js or local/dicom-uploader.js) of the Raccoon-DICOM. <br/><br/>⚠️Please use absolute path|
| raccoon.mode | string | The mode of operation of upload script ("STOW" or "LOCAL") |
| raccoon.stowUrl | string | The URL for the STOW endpoint of the Raccoon-DICOM. |

</details>

# Deploy
## Local
- Run command below to deploy Raccoon-DICOM

```bash
node server.js
```

## Docker-compose
- You can also use Docker-compose to deploy
- ⚠️ You should do [Configuration](#Configuration) first
- Run command below to deploy Raccoon-DICOM

```bash
sudo docker compose up
```

> **Note**
> You may need to copy docker-compose.yaml to another directory and modify path of raccoon.build.context
> To prevent mapping too much data in volumes (i.e. mongodb, raccoon-storage)
# Troubleshooting on linux
- `Unknown VR: Tag not found in data dictionary` when using `STOW-RS`
    - You need set the `DCMDICTPATH` environment variable
    - The `dicom.dic` can find in the `/usr/share/libdcmtk{version}` or `./models/DICOM/dcmtk/dicom.dic`
    > The {version} corresponds to dcmtk version, e.g. 3.6.5 => libdcmtk15

    - Set `DCMDICTPATH` environment variable using command or you can add the command to profile file(`~/.bashrc`,`~/.profile` etc.), example **with dcmtk 3.6.5**:
    ```sh
    export DCMDICTPATH=/usr/share/libdcmtk15/dicom.dic
    ```
    - Check the environment variable
    ```sh
    echo $DCMDICTPATH
    ```

# Features
The features implemented here:
## [QIDO-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6)
### Support Format (Media Types)

Format | Support |
---------|----------|
 application/dicom+json | ✅ | 
 multipart/related; type="application/dicom+xml | ❌ |

### Support Query Parameter

Query Parameter | Support |
---------|----------|
 fuzzymatching | ❌ |
 includefield | ✅ |
 limit | ✅ |
 offset | ✅ |


## [STOW-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5)
- You can set `SYCN_TO_FHIR_SERVER=true` in .env to convert DICOM to ImagingStudy, Endpoint, Patient of FHIR resources and sync FHIR resources to FHIR server
## [WADO-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4.1.1.1)
- [Retrieve Transaction Instance Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-1)
- [Retrieve Transaction Metadata Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-2)
- [Retrieve Transaction Rendered Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-3)
- [Retrieve Transaction Thumbnail Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-4)
- [Retrieve Transaction Bulkdata Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1.5-1)


# API Documentation
- raccoon-dicom uses swagger ui hosting openapi.json to generate documentation
- [API Documentation](https://chinlinlee.github.io/raccoon-dicom/)




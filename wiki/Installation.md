# Installation
## Environment Requirements
- Before starting Raccoon, MongoDB, imagemagick, node.js, and JAVA JDK must be installed.
- node.js >= 16
- Java JDK >= 11
- [imagemagick](https://imagemagick.org/script/download.php)
- MongoDB >= 4.4

📢📢📢
- You must copy opencv_java library into JDK's `lib` folder (on windows is `bin` folder)
- On Windows, please copy `opencv_java.dll`, you can find this file at `models/DICOM/dcm4che/javaNode/dcm4chee/lib/windows-x86-64`
- On Linux, please copy `libclib_jiio.so` and `libopencv_java.so`, you can find this file at `models/DICOM/dcm4che/javaNode/dcm4chee/lib/linux-x86-64`

## Install Node.js Packages
- ⚠️ Please enter Raccoon-DICOM project folder first
```bash
npm install
```

## Configuration
### dotenv `.env`
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
DIMSE_AE_TITLE="RACCOONQRSCP" # default: RACCOONQRSCP
DIMSE_HOSTNAME="0.0.0.0" # default: 127.0.0.1
DIMSE_PORT=11112 # default: 11112
DIMSE_MAX_PDULEN_RCV=16378
DIMSE_MAX_PDULEN_SND=16378
DIMSE_NOT_ASYNC=false
DIMSE_MAX_OPS_INVOKED=0
DIMSE_MAX_OPS_PERFORMED=0
DIMSE_NOT_PACK_PDV=false
DIMSE_CONNECT_TIMEOUT=0
DIMSE_REQUEST_TIMEOUT=0
DIMSE_ACCEPT_TIMEOUT=0
DIMSE_RELEASE_TIMEOUT=0
DIMSE_SEND_TIMEOUT=0
DIMSE_STORE_TIMEOUT=0
DIMSE_RESPONSE_TIMEOUT=0
DIMSE_RETRIEVE_TIMEOUT=0
DIMSE_RETRIEVE_TIMEOUT_TOTAL=0
DIMSE_IDLE_TIMEOUT=0
DIMSE_SOCLOSE_DELAY=50
DIMSE_SOSND_BUFFER=0
DIMSE_SORCV_BUFFER=0
DIMSE_TCP_DELAY=false

# DIMSE TLS
DIMSE_TLS=false
DIMSE_TLS_NULL=false
DIMSE_TLS_3DES=false
DIMSE_TLS_AES=false
DIMSE_TLS_CIPHER=""

DIMSE_TLS13=false
DIMSE_TLS12=false
DIMSE_TLS11=false
DIMSE_TLS1=false
DIMSE_SSL3=false
DIMSE_SSL2HELLO=false
DIMSE_TLS_PROTOCOL=""
DIMSE_TLS_EIA_HTTPS=false
DIMSE_TLS_EIA_LDAPS=false
DIMSE_TLS_NOAUTH=false
DIMSE_KEY_STORE="./config/certs/key.p12"
DIMSE_KEY_STORE_TYPE="PKCS12"
DIMSE_KEY_STORE_PASS="secret"
DIMSE_KEY_PASS="secret"
DIMSE_TRUST_STORE="./config/certs/cacerts.p12"
DIMSE_TRUST_STORE_TYPE="PKCS12"
DIMSE_TRUST_STORE_PASS="secret"

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
| DICOMWEB_AE | string | Set returned Retrieve AE Title (0008,0054) in QIDO-RS. If the DIMSE service is enabled, the AE Title use from DIMSE.
| #DIMSE | |
| ENABLE_DIMSE | boolean | A flag indicating whether or not the DICOM DIMSE service should be enabled.
| DIMSE_AE_TITLE             | string        | DICOM Application Entity title.              |
| DIMSE_HOSTNAME             | string        | Hostname to bind DICOM DIMSE to.             |
| DIMSE_PORT                 | number       | Port number for DICOM DIMSE communication.   |
| DIMSE_MAX_PDULEN_RCV       | number       |  specifies maximal length of received P-DATA TF PDUs communicated during association establishment. 0 indicates that no maximum length is specified. 16378 by default            |
| DIMSE_MAX_PDULEN_SND       | number       | specifies maximal length of sent P-DATA-TF PDUs by this AE. The actual maximum length of sent P-DATA-TF PDUs is also limited by the maximal length of received P-DATA-TF PDUs of the peer AE communicated during association establishment. 16378 by default              |
| DIMSE_NOT_ASYNC            | boolean       | do not use asynchronous mode; equivalent to --max-ops-invoked=1 and --max-ops-performed=1         |
| DIMSE_MAX_OPS_INVOKED      | number       | maximum number of operations this AE may invoke asynchronously, unlimited by default            |
| DIMSE_MAX_OPS_PERFORMED    | number       | maximum number of operations this AE may perform asynchronously, unlimited by default          |
| DIMSE_NOT_PACK_PDV         | boolean       | send only one PDV in one P-Data-TF PDU; pack command and data PDV in one P-DATA-TF PDU by default                         |
| DIMSE_CONNECT_TIMEOUT      | number       |  timeout in ms for TCP connect, no timeout by default |
| DIMSE_REQUEST_TIMEOUT      | number       | timeout in ms for receiving A-ASSOCIATE-RQ, no timeout by default          |
| DIMSE_ACCEPT_TIMEOUT       | number       | timeout in ms for receiving A-ASSOCIATE-AC, no timeout by default    |
| DIMSE_RELEASE_TIMEOUT      | number       | timeout in ms for receiving A-RELEASE-RP, no timeout by default       |
| DIMSE_SEND_TIMEOUT         | number       |  timeout in ms for sending other DIMSE RQs than C-STORE RQs, no timeout by default |
| DIMSE_STORE_TIMEOUT        | number       | timeout in ms for sending C-STOREsRQ, no timeout by default |
| DIMSE_RESPONSE_TIMEOUT     | number       | timeout in ms for receiving other outstanding DIMSE RSPs than C-MOVE or C-GET RSPs, no timeout by default |
| DIMSE_RETRIEVE_TIMEOUT     | number       | Timeout for retrieving DIMSE objects.        |
| DIMSE_RETRIEVE_TIMEOUT_TOTAL | number     | Total timeout for retrieving DIMSE objects.  |
| DIMSE_IDLE_TIMEOUT         | number       |  timeout in ms for aborting idle Associations, no timeout by default |
| DIMSE_SOCLOSE_DELAY        | number       | delay in ms after sending A-ASSOCATE-RJ, A-RELEASE-RQ or A-ABORT before the socket is closed; 50ms by default |
| DIMSE_SOSND_BUFFER         | number       |  set SO_SNDBUF socket option to specified value |
| DIMSE_SORCV_BUFFER         | number       |  set SO_RCVBUF socket option to specified value |
| DIMSE_TCP_DELAY            | boolean       | set TCP_NODELAY socket option to false, true by default |
| DIMSE_TLS                  | boolean       | enable TLS connection without encryption or with AES or 3DES encryption; equivalent to --tls-cipher SSL_RSA_WITH_NULL_SHA --tls-cipher TLS_RSA_WITH_AES_128_CBC_SHA --tls-cipher SSL_RSA_WITH_3DES_EDE_CBC_SHA |
| DIMSE_TLS_NULL             | boolean       | enable TLS connection without encryption; equivalent to --tls-cipher SSL_RSA_WITH_NULL_SHA |
| DIMSE_TLS_3DES             | boolean       | enable TLS connection with 3DES encryption; equivalent to --tls-cipher SSL_RSA_WITH_3DES_EDE_CBC_SHA |
| DIMSE_TLS_AES              | boolean       | enable TLS connection with AES or 3DES encryption; equivalent to --tls-cipher TLS_RSA_WITH_AES_128_CBC_SHA --tls-cipher SSL_RSA_WITH_3DES_EDE_CBC_SHA |
| DIMSE_TLS_CIPHER           | string        | enable TLS connection with specified Cipher Suite. Multiple Cipher Suites may be enabled by multiple --tls-cipher options |
| DIMSE_TLS13                | boolean       | enable only TLS/SSL protocol TLSv1.3; equivalent to --tls-protocol TLSv1.3 |
| DIMSE_TLS12                | boolean       | enable only TLS/SSL protocol TLSv1.2; equivalent to --tls-protocol TLSv1.2 |
| DIMSE_TLS11                | boolean       | enable only TLS/SSL protocol TLSv1.1; equivalent to --tls-protocol TLSv1.1 |
| DIMSE_TLS1                 | boolean       | enable only TLS/SSL protocol TLSv1; equivalent to --tls-protocol TLSv1 |
| DIMSE_SSL3                 | boolean       | enable only TLS/SSL protocol SSLv3; equivalent to --tls-protocol SSLv3 |
| DIMSE_SSL2HELLO            | boolean       | send/accept SSLv3/TLS ClientHellos encapsulated in a SSLv2 ClientHello packet; equivalent to --tls-protocol SSLv2Hello --tls-protocol SSLv3 --tls-protocol TLSv1 --tls-protocol TLSv1.1 --tls-protocol TLSv1.2 |
| DIMSE_TLS_PROTOCOL         | string        | TLS/SSL protocol to use. Multiple TLS/SSL protocols may be enabled by multiple --tls-protocol options. Supported values by Java 11: TLSv1, TLSv1.1, TLSv1.2, TLSv1.3, SSLv3, SSLv2Hello. By default, only TLSv1.2 is enabled. |
| DIMSE_TLS_EIA_HTTPS        | boolean       | enable server endpoint identification according RFC 2818: HTTP Over TLS |
| DIMSE_TLS_EIA_LDAPS        | boolean       | enable server endpoint identification according RFC 2830: LDAP Extension for TLS |
| DIMSE_TLS_NOAUTH           | boolean       | disable client authentication for TLS |
| DIMSE_KEY_STORE            | string        | file path or URL of key store containing the private key, `config/certs/key.p12` by default |
| DIMSE_KEY_STORE_TYPE       | string        | type of key store containing the private key, PKCS12 by default |
| DIMSE_KEY_STORE_PASS       | string        | password for key store containing the private key, 'secret' by default |
| DIMSE_KEY_PASS             | string        | password for accessing the key in the key store, key store password by default |
| DIMSE_TRUST_STORE          | string        | file path of key store containing trusted certificates, `config/certs/cacerts.p12` by default |
| DIMSE_TRUST_STORE_TYPE     | string        | type of key store with trusted certificates, PKCS12 by default |
| DIMSE_TRUST_STORE_PASS     | string        | password for key store with trusted certificates, 'secret' by default |


</details>

### Plugins Config
- The `config.js` file is located at project `plugins` folder.
- You can copy the `config.template.js` and modify it.
- **You may just copy & rename without editing this config**

#### For for `plugins/config.js` Properties Info
👉 See [this documentation](https://github.com/Chinlinlee/raccoon-dicom/blob/main/plugins/README.md)

### DIMSE APP
- Raccoon-DICOM use [DCM4CHE QRSCP Tool](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md) to provide DIMSE services
- You can set `ENABLE_DIMSE=true` to enable DICOM DIMSE service
- Raccoon-dicom will automatically generate `logback.xml` config for logging DIMSE service
- Raccoon-dicom's DIMSE service configuration is mostly the same as DCM4CHE, except for `DIMSE_AE_TITLE`, `DIMSE_HOSTNAME`, and `DIMSE_PORT`. If needed, please refer to [dcm4che-tool-dcmqrscp / README.md](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md).
## Deploy
### Local
- Run command below to deploy Raccoon-DICOM

```bash
node server.js
```

### Docker-compose
- You can also use Docker-compose to deploy
- ⚠️ You should do [Configuration](#Configuration) first
- Run command below to deploy Raccoon-DICOM

```bash
sudo docker compose up
```

> **Note**
> You may need to copy docker-compose.yaml to another directory and modify path of raccoon.build.context
> To prevent mapping too much data in volumes (i.e. mongodb, raccoon-storage)
## Troubleshooting on linux
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

## Test
### Upload DICOM (STOW-RS)
- Following use the file at `test/dicomFiles/jpeg2000/example-jpeg-2000.dcm` to test upload
- use curl to upload
```powershell
curl --location --request POST "http://localhost:8081/dicom-web/studies" ^
--header "Accept: application/dicom+json" ^
--header "Content-Type: multipart/related; type=\"application/dicom\"" ^
--form "file=@example-jpeg-2000.dcm; type=application/dicom"
```
- The successful message 
```json
{"00081190":{"vr":"UT","Value":["http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543"]},"00081198":{"vr":"SQ","Value":[]},"00081199":{"vr":"SQ","Value":[{"00081150":{"vr":"UI","Value":["1.2.840.10008.5.1.4.1.1.77.1.6"]},"00081155":{"vr":"UI","Value":["1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0"]},"00081190":{"vr":"UT","Value":["http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0"]}}]}}
```

### GET DICOM Info (QIDO-RS)
- Open browser or Postman
- GET http://localhost:8081/dicom-web/studies to get DICOM Json


### Retrieve-DICOM-Frame (WADO-RS)
- Open browser or Postman
- Access http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0/frames/1/rendered

![image](https://user-images.githubusercontent.com/49154622/236471229-5ea2fad0-3781-4075-a755-66712d9ef44f.png)

- You can also test imagemagick is working normally：Access http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0/frames/1/rendered?iccprofile=rommrgb 
- Check whether the color changes

![image](https://user-images.githubusercontent.com/49154622/236471143-9af313c4-e6ca-42c8-a5e7-6a5de66e2005.png)

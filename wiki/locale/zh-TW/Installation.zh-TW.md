# 安裝手冊
如果您是新手，請參閱[從 0 開始部屬 Raccoon - Windows](From-zero-to-deploy.zh-TW)
## 環境所需
- node.js >= 16
- Java JDK >= 11
- [imagemagick](https://imagemagick.org/script/download.php)
- MongoDB >= 4

📢📢📢
- 您必須複製 opencv_java 函式庫至 JDK 的 `lib` 資料夾 (Windows 為 `bin` 資料夾)
- Windows，請複製 `opencv_java.dll`，您可以在 `models/DICOM/dcm4che/javaNode/dcm4chee/lib/windows-x86-64` 找到此檔案
- Linux，請複製 `libclib_jiio.so` 以及 `libopencv_java.so`，您可以在 `models/DICOM/dcm4che/javaNode/dcm4chee/lib/linux-x86-64` 找到這兩個檔案

## 安裝 Node.js 套件
- ⚠️ 請先進到 Raccoon-DICOM 專案目錄
```bash
npm install
```

## 設定
### dotenv `.env`
- 您可以在專案根目錄找到 .env 檔案進行設定，並請您務必在實際環境使用較安全的設定
- 您可以直接複製 .env.template 並命名為 .env 進行修改

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
 <summary><h3>環境變數資訊</h3></summary>


| Field Name | Type of Value | Description |
| --- | --- | --- |
| #MongoDB | |
| MONGODB_NAME | string | MongoDB 資料庫名稱 |
| MONGODB_HOSTS | array of strings | MongoDB 伺服器運行的主機名稱或 IP 位址列表。 |
| MONGODB_PORTS | array of numbers | 對應於 MONGODB_HOSTS 中指定的 MongoDB 伺服器的連接埠號列表。 |
| MONGODB_USER | string | 連接到 MongoDB 伺服器時要使用的使用者名稱 |
| MONGODB_PASSWORD | string | 連接到 MongoDB 伺服器時要使用的密碼 |
| MONGODB_AUTH_SOURCE | string | 要進行身份驗證的 MongoDB 資料庫名稱 |
| MONGODB_IS_SHARDING_MODE | boolean | MongoDB 是否為 sharding 模式 |
|#Server | |
| SERVER_PORT | number | 伺服器運行的埠(port)號
| SERVER_SESSION_SECRET_KEY | string | 用於 session 的保密金鑰
| #DICOMweb | |
| DICOM_STORE_ROOTPATH | string | 存放 DICOM 檔案的根目錄
| DICOMWEB_HOST | string | DICOM Web 伺服器的主機名稱。用於組合 00081190 (Retrieve URL)。<br/><br/>您可以在字串中使用 {host}，它將替換為 request.headers.host
| DICOMWEB_PORT | number | DICOM Web 伺服器運行的埠(port)號。用於組合 00081190 (Retrieve URL)<br/><br/> e.g. 8088，將會產生 http://example.com:8088/dicom-web/studies
| DICOMWEB_AE | string | 設定要回傳的 Retrieve AE Title (0008,0054)，若 DIMSE 服務為開啟狀態，將優先使用 DIMSE 的 AE Title
| #DIMSE | |
| ENABLE_DIMSE | boolean | 是否啟用 DICOM DIMSE 服務
| DIMSE_AE_TITLE             | string        | DICOM DIMSE 的 Application Entity title (AETitle).              |
| DIMSE_HOSTNAME             | string        | DICOM DIMSE 的 Hostname             |
| DIMSE_PORT                 | number       |  DICOM DIMSE 的 port 號   |
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

### Plugins 設定
- 您必須在 `plugins` 資料夾中創建以及設定 `config.js` 檔案
- 您可以參考 `config.template.js` 進行修改
- **如果您不需要使用 plugin，您可以直接複製 `config.template.js`並命名為 `config.js` 即可**

#### `plugins/config.js` 屬性資訊
👉 請參閱[此文件](https://github.com/Chinlinlee/raccoon-dicom/blob/main/plugins/README.md)

#### For for `plugins/config.js` Properties Info
👉 See [this documentation](https://github.com/Chinlinlee/raccoon-dicom/blob/main/plugins/README.md)

### DIMSE APP
- Raccoon-DICOM 使用 [DCM4CHE QRSCP Tool](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md) 以提供 DIMSE 服務
- 您可以設定 `ENABLE_DIMSE=true` 以啟動 DICOM DIMSE 服務
- Raccoon-dicom 將會為 DIMSE 服務自動產生 `logback.xml` 設定檔以進行日誌記錄的動作
- Raccoon-dicom 的 DIMSE 服務設定除了 `DIMSE_AE_TITLE`、`DIMSE_HOSTNAME` 和 `DIMSE_PORT` 之外，其餘大多與 DCM4CHE 相同，若有需要請參考 [dcm4che-tool-dcmqrscp / README.md](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md)

## 部屬
### Local
- 運行以下指令部屬 Raccoon-DICOM

```bash
node server.js
```

### Docker-compose
- 您也可以使用 Docker-compose 進行部屬
- ⚠️ 建議您先進行[設定](#設定)再進行部屬
- 運行以下指令部屬 Raccoon-DICOM

```bash
sudo docker compose up
```

> **Note**
> 您可能會需要把 docker-compose.yaml 複製至另一個資料夾，並更改 raccoon.build.context 的路徑
> 以防止在 volumes 當中映射過多資料 (i.e. mongodb, raccoon-storage)

## Troubleshooting on linux
- `Unknown VR: Tag not found in data dictionary` when using `STOW-RS`
    - 您必須設定 `DCMDICTPATH` 環境變數
    - `dicom.dic` 檔案可以在`/usr/share/libdcmtk{version}`或 `./models/DICOM/dcmtk/dicom.dic`找到
    > {version} 對應到dcmtk的版本, e.g. 3.6.5 => libdcmtk15

    - 使用指令設定 `DCMDICTPATH` 或者您可以將指令加入到profile檔案中(`~/.bashrc`,`~/.profile` etc.), example **with dcmtk 3.6.5**:
    ```sh
    export DCMDICTPATH=/usr/share/libdcmtk15/dicom.dic
    ```
    - 檢查環境變數
    ```sh
    echo $DCMDICTPATH
    ```

## Test
### 上傳影像 (STOW-RS)
- 以下將使用來自 `test/dicomFiles/jpeg2000/example-jpeg-2000.dcm` 的檔案做上傳測試
- 使用 curl 進行上傳
```powershell
curl --location --request POST "http://localhost:8081/dicom-web/studies" ^
--header "Accept: application/dicom+json" ^
--header "Content-Type: multipart/related; type=\"application/dicom\"" ^
--form "file=@example-jpeg-2000.dcm; type=application/dicom"
```
- 出現以下訊息則代表成功
```json
{"00081190":{"vr":"UT","Value":["http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543"]},"00081198":{"vr":"SQ","Value":[]},"00081199":{"vr":"SQ","Value":[{"00081150":{"vr":"UI","Value":["1.2.840.10008.5.1.4.1.1.77.1.6"]},"00081155":{"vr":"UI","Value":["1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0"]},"00081190":{"vr":"UT","Value":["http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0"]}}]}}
```

### 獲取影像資訊 (QIDO-RS)
- 開啟瀏覽器 or Postman
- 造訪 http://localhost:8081/dicom-web/studies 以取得 DICOM Json


### 調閱影像-Frame (WADO-RS)
- 開啟瀏覽器 or Postman
- 造訪 http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0/frames/1/rendered

![image](https://user-images.githubusercontent.com/49154622/236471229-5ea2fad0-3781-4075-a755-66712d9ef44f.png)

- 您也可以測試 imagemagick 是否正常：造訪 http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0/frames/1/rendered?iccprofile=rommrgb 確認顏色是否變更

![image](https://user-images.githubusercontent.com/49154622/236471143-9af313c4-e6ca-42c8-a5e7-6a5de66e2005.png)

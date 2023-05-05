# raccoon-dicom
Another Raccoon focus on DICOM.

[English](README.md) | [繁體中文](README.zh-TW.md)

---

**Raccoon-DICOM** 是使用 no-SQL 資料庫實作的醫學影像儲存系統(DICOMweb PACS)，其使用 MongoDB 管理 DICOM 影像並提供 [DICOMweb](https://www.dicomstandard.org/dicomweb/") RESTful API 功能進行儲存、查詢以及調閱


# 環境必要軟體
- 請注意！在使用 Raccoon 前，務必安裝 MongoDB、ImageMagick
- node.js >= 16
- Java JDK >= 11
- [imagemagick](https://imagemagick.org/script/download.php)

> **Note**
> - 您必須複製 opencv_java library 至 JDK's lib 資料夾
> - Windows，請複製 `opencv_java.dll`
> - Linux，請複製 `libclib_jiio.so` 以及 `libopencv_java.so`

# 設定
## dotenv `.env`
- 您可以在專案根目錄找到 `.env` 檔案進行設定，並請您務必在實際環境使用較安全的設定
- 您可以直接複製 `.env.template` 並命名為 `.env` 進行修改

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
| #DIMSE | |
| ENABLE_DIMSE | boolean | 是否啟用 DICOM DIMSE 服務
| DCM4CHE_QRSCP_COMMAND | string | 啟動 DCM4CHE QRSCP 服務的命令。請參閱[dcm4che-tool-dcmqrscp](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md)的用法，並且您必須傳遞 `--raccoon {json-config-file}`，以讓 DCM4CHE QRSCP 與 raccoon 溝通。<br/><br/>racoon 的 DIMSE 設定請參閱 <a href="#dimse-app">DIMSE APP</a>。<br/><br/>您可以在字串中使用 {project}，它將替換為 __dirname。


</details>

## DIMSE APP
- Raccoon-DICOM 使用 [DCM4CHE QRSCP Tool](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md) 以提供 DIMSE 服務
- 您可以設定 `ENABLE_DIMSE=true` 以啟動 DICOM DIMSE 服務
- 您必須在 `DCM4CHE_QRSCP_COMMAND` 環境變數傳遞 `--raccoon {json-config-file}` 指令
- 範例檔可參閱 `config/raccoon-dimse-app.example.json`
- raccoon.dicomStoreRoot 以及 raccoon.raccoonUploadScriptPath 請務必使用絕對路徑

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
    <summary><h3>Config properties</h3></summary>

| Field Name | Type of Value | Description |
| --- | --- | --- |
| mongodb.hosts | array of strings | MongoDB 伺服器運行的主機名稱或 IP 位址列表 |
| mongodb.ports | array of numbers | 對應於 mongodb.hosts 中 MongoDB 伺服器的埠號列表 |
| mongodb.username | string | 連接 MongoDB 伺服器時使用的使用者名稱 |
| mongodb.password | string | 連接 MongoDB 伺服器時使用的密碼 |
| mongodb.authSource | string | 用於驗證的 MongoDB 資料庫名稱 |
| mongodb.database | string | MongoDB 資料庫的名稱 |
| mongodb.debug | boolean | MongoDB 是否為 Debug 模式，用於設定 logger level |
| raccoon.dicomStoreRoot | string | Raccoon-DICOM 的根目錄，用於 C-MOVE。 <br/><br/>⚠️請使用絕對路徑|
| raccoon.raccoonUploadScriptPath | string | Raccoon-DICOM 的 DICOM 上傳腳本的路徑（即 local/dicom-uploader-stow.js 或 local/dicom-uploader.js）。 <br/><br/>⚠️請使用絕對路徑|
| raccoon.mode | string | 上傳腳本的操作模式（"STOW" 或 "LOCAL"） |
| raccoon.stowUrl | string | Raccoon-DICOM 的 STOW 端點的 URL |

</details>

# 部屬
## Local
- 運行以下指令部屬 Raccoon-DICOM

```bash
node server.js
```

## Docker-compose
- 您也可以使用 Docker-compose 進行部屬
- ⚠️ 建議您先進行[設定](#設定)再進行部屬
- 運行以下指令部屬 Raccoon-DICOM

```bash
sudo docker compose up
```

> **Note**
> 您可能會需要把 docker-compose.yaml 複製至另一個資料夾，並更改 raccoon.build.context 的路徑
> 以防止在 volumes 當中映射過多資料 (i.e. mongodb, raccoon-storage)

# Troubleshooting on linux
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

# 提供之功能
目前以實作的功能如下：
## [QIDO-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6)
### 支援的格式 (Media Types)

Format | Support |
---------|----------|
 application/dicom+json | ✅ | 
 multipart/related; type="application/dicom+xml | ❌ |

### 支援的查詢參數

Query Parameter | Support |
---------|----------|
 fuzzymatching | ❌ |
 includefield | ✅ |
 limit | ✅ |
 offset | ✅ |


## [STOW-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5)
- 您可以在 .env 設定 `SYCN_TO_FHIR_SERVER=true` 以將 DICOM 轉換為 FHIR ImagingStudy, Endpoint 以及 Patient，並同步這些 Resources 至 FHIR server
## [WADO-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4.1.1.1)
- [Retrieve Transaction Instance Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-1)
- [Retrieve Transaction Metadata Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-2)
- [Retrieve Transaction Rendered Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-3)
- [Retrieve Transaction Thumbnail Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-4)
- [Retrieve Transaction Bulkdata Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1.5-1)


# API Documentation
- raccoon-dicom uses swagger ui hosting openapi.json to generate documentation
- [API Documentation](https://chinlinlee.github.io/raccoon-dicom/)




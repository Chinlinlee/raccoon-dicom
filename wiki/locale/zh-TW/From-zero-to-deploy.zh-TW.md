# 從 0 開始部屬 Raccoon - Windows
## 下載 Raccoon-DICOM
- 進到 [Raccoon-DICOM](https://github.com/Chinlinlee/raccoon-dicom) 的 GitHub
### Use git
```bash
git clone https://github.com/Chinlinlee/raccoon-dicom.git
```
### 或者 Download ZIP
![image](https://user-images.githubusercontent.com/49154622/236482211-a976d3a6-443e-4bc8-8934-80ec21aa0d14.png)

> ⚠️請自行做解壓縮的動作喔！

## 安裝所需軟體
### 環境所需
以下是 Raccoon-DICOM 列出的需求軟體，接下來會一項一項進行安裝。
- [Node.js](https://nodejs.org/zh-tw/download) >= 16
- [Mongodb](https://www.mongodb.com/try/download/community) >= 4
- [Imagemagick](https://imagemagick.org/script/download.php)
- [OpenJDK]()

### 安裝 Node.js 16
- [點此下載 Node.js 16 版本安裝檔](https://nodejs.org/download/release/v16.20.0/node-v16.20.0-x64.msi)
- 打開下載的 `node-v16.20.0-x64.msi` 進行安裝

![image](https://user-images.githubusercontent.com/49154622/236499884-fa642d85-52da-400e-96a9-2ef9eb182a27.png)


- **選擇安裝目錄**並點擊 Next

![image](https://user-images.githubusercontent.com/49154622/236484132-ac3eac5e-1a7b-4e21-9723-b4ee4219318b.png)

- 點擊 Install

![image](https://user-images.githubusercontent.com/49154622/236484658-e44012a3-483f-433b-8be3-6615a36c044e.png)

#### 測試是否安裝完成
開啟 cmd (命令提示字元)，並輸入 node -v，出現 v16.20.0 就代表完整安裝成功囉！

![image](https://user-images.githubusercontent.com/49154622/236499777-8c053649-9017-47bb-a098-b1a1a9c28018.png)


### 安裝 MongoDB
- 進到 MongoDB主頁，網址：https://www.mongodb.com/try/download/community
- 選擇 Version → `4.4.21`，`Platform` → `Windows`，`Package` → `msi` 並點擊 Download

![image](https://user-images.githubusercontent.com/49154622/236500530-0a54eb24-d129-4f23-a061-4cb39ef01b11.png)

- 打開下載的 `mongodb-windows-x86_64-4.4.21-signed.msi` 進行安裝

![image](https://user-images.githubusercontent.com/49154622/236500743-67feca07-f8e8-40c2-92ed-02b59cef7cb1.png)

- 選擇 Complete

![image](https://user-images.githubusercontent.com/49154622/236500947-7981d72a-ae48-4e8c-bdb2-a77bcb2e4c6a.png)

- 設定 Data Directory (資料存放位置) 以及 Log Directory (紀錄存放位置)，選擇完畢後按 Next

![image](https://user-images.githubusercontent.com/49154622/236501004-aa9d5045-f76b-47a6-bd22-87efde381268.png)

- 安裝 MongoDB Compass

![image](https://user-images.githubusercontent.com/49154622/236501025-a262ec70-6b90-4e2b-98aa-d79deff57c49.png)

- 點擊 Install

![image](https://user-images.githubusercontent.com/49154622/236501069-ef6c13b2-0bf1-4b43-868f-ae040bd62df0.png)

- 安裝完畢囉！

![image](https://user-images.githubusercontent.com/49154622/236501222-5940691f-1264-4e4a-b277-0baddb11be10.png)

#### 創建使用者帳號
由於 Raccoon-DICOM 內的 MongoDB 連接需要帳號密碼，您必須創建 MongoDB 的帳號密碼以讓 Raccoon-DICOM 正常運作。
- 打開 MongoDB Compass
- 在 New Connection 的 connection string 輸入以下內容，並點擊 Connect

```bash
mongodb://localhost:27017
```

![image](https://user-images.githubusercontent.com/49154622/236501408-6e8f2de7-e210-4fc5-a689-30611600fa9e.png)

- 點開下方的 `>_MONGOSH`

![image](https://user-images.githubusercontent.com/49154622/236501469-29e00407-a9ce-4735-9fbf-bf5900a6f9c0.png)

- 輸入以下指令切換到 admin 資料庫
```bash
use admin;
```

![image](https://user-images.githubusercontent.com/49154622/236501573-27d25a7d-58b0-4d2d-80f1-376da370c46f.png)

- 輸入以下指令創建 root 帳號

> **Warning**
> ⚠️請自行更改成安全的帳號以及密碼！

```js
db.createUser({
    user : "root",
    pwd : "root" ,
    roles : [{role : "root" , db:"admin"}]
});
```
> 出現 { ok: 1 } 就代表創建成功囉！

### 安裝 ImageMagick
- 進到 ImageMagick 下載頁面，網址：https://imagemagick.org/script/download.php
- 點擊 `Windows Binary Release` 跳轉到 Windows 下載相關的段落

![image](https://user-images.githubusercontent.com/49154622/236501838-3d3ea957-0e34-4e97-a318-51040d2ca9c9.png)

- 點擊第一項 `ImageMagick-7.1.0-27-Q16-HDRI-x64-dll.exe` 下載

![image](https://user-images.githubusercontent.com/49154622/236501885-394fcb02-20f2-424d-afd5-1230667a823d.png)

- 開啟下載的 `ImageMagick-7.1.0-27-Q16-HDRI-x64-dll` 進行安裝

![image](https://user-images.githubusercontent.com/49154622/236501961-84e2b3ae-8c1b-44d1-aaa9-1b14c7530236.png)

- 選擇安裝目錄，並點擊 Next

![image](https://user-images.githubusercontent.com/49154622/236502088-65574950-384f-4a7b-af52-d10823ec1605.png)

- 點擊 Install

![image](https://user-images.githubusercontent.com/49154622/236502936-e57bf08b-7d76-49b2-a9ae-987653429f07.png)

- 點擊 Next ， 並把 View Index.html 取消，最後 Finish，安裝完成！

![image](https://user-images.githubusercontent.com/49154622/236502971-09bbffd9-b83c-42d5-b476-a5c8689764b2.png)
![image](https://user-images.githubusercontent.com/49154622/236502991-c1bec239-b8a0-4668-adc8-9ee29caf8045.png)

#### 測試是否安裝完成
開啟 cmd (命令提示字元)，並輸入 magick -version ， 出現以下訊息就代表安裝成功囉！

![image](https://user-images.githubusercontent.com/49154622/236503048-9944480f-39ee-4986-ae94-86725de5c8a4.png)

### 安裝 JAVA JDK
- 進入 https://adoptium.net/temurin/releases/
- 選擇 Operating System: Windows
- Architecture: x64
- Package Type: JDK
- Version: 11
- 點擊下載

![image](https://user-images.githubusercontent.com/49154622/236673675-1d43e668-c5c0-4fbd-b047-97e2ecab7825.png)

- 打開下載的 `OpenJDK11U-jdk_x64_windows_hotspot_11.0.19_7`

![image](https://user-images.githubusercontent.com/49154622/236673749-35fcc2fb-c5d9-4437-8b95-d99c905eda70.png)

- 選擇安裝目錄並點擊下一步

![image](https://user-images.githubusercontent.com/49154622/236674005-a3c0709f-d003-460e-bcc6-c0c91dafb30c.png)

- 點擊安裝

![image](https://user-images.githubusercontent.com/49154622/236674021-a18032da-e8d5-42e2-b0e2-451a0128e7da.png)

- 完成！

![image](https://user-images.githubusercontent.com/49154622/236674041-972c0bd1-ee2a-4d97-bc21-49e6965d186f.png)

> ⚠️完成後請先重新啟動

#### 測試 JAVA 是否完成安裝
- 打開 cmd 並輸入 `javac --version`，出現版本訊息就代表成功囉！

![image](https://user-images.githubusercontent.com/49154622/236674166-2e96a631-077b-4f6f-b265-dab2d527a412.png)

## 設定 Raccoon
以上所需的軟體已經完畢了，您可以開始進行設定 Raccoon 的步驟啦！
⚠️注意！進行以下步驟前，請先進到 Raccoon 的專案目錄

### 安裝依賴
開啟 cmd (命令提示字元) 進到 Raccoon 專案目錄並執行以下指令
```bash
npm i --only=production
```

> **Note**
> --only=production 代表只安裝 package.json 內 dependencies 區塊的依賴

### 設定 .env 檔案
- 複製根目錄的 .env.template ，貼上並更名為 .env

![image](https://user-images.githubusercontent.com/49154622/236503587-74797412-4dd9-412f-a685-24a7cb4aed97.png)

- 更改 .env 內的內容
```text
# MongoDB
MONGODB_NAME="raccoon-dicom"
MONGODB_HOSTS=["mongodb"]
MONGODB_PORTS=[27017]
MONGODB_USER="root"
MONGODB_PASSWORD="root"
MONGODB_AUTH_SOURCE="admin"
MONGODB_OPTIONS=""
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
ENABLE_DIMSE=true
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

## 部屬 Raccoon-DICOM
- 開啟 cmd (命令提示字元) 進到 Raccoon 專案目錄並執行以下指令
```
node server.js
```
執行後看到以下訊息就代表架設成功囉！
[TODO:加入啟動訊息圖]()

## 測試 Raccoon-DICOM
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


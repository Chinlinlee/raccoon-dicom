# Step by Step guide to installing - Windows

## Download Raccoon
### Use git
```bash
git clone https://github.com/Chinlinlee/raccoon-dicom.git
```

### Alternative, Download ZIP
![image](https://user-images.githubusercontent.com/49154622/236674835-6f2f3c09-6892-49cd-8939-0dfbfd747094.png)

> ⚠️ Please unzip by yourself

## Install Environment Requirements

### Environment Requirements
The following is a list of requirements, we will install each software next.
- [Node.js](https://nodejs.org/zh-tw/download) >= 16
- [Mongodb](https://www.mongodb.com/try/download/community) >= 4
- [Imagemagick](https://imagemagick.org/script/download.php)
- openJDK >= 11


### Install Node.js 16
- [Click here to download Node.js 16 installer](https://nodejs.org/download/release/v16.20.0/node-v16.20.0-x64.msi)
- Open `node-v16.20.0-x64.msi` that you downloaded

![image](https://user-images.githubusercontent.com/49154622/236499884-fa642d85-52da-400e-96a9-2ef9eb182a27.png)

- **Select Install Destination** and click Next

![image](https://user-images.githubusercontent.com/49154622/236484132-ac3eac5e-1a7b-4e21-9723-b4ee4219318b.png)

- Click Install

![image](https://user-images.githubusercontent.com/49154622/236484658-e44012a3-483f-433b-8be3-6615a36c044e.png)

#### Verify Node.js has been installed successfully
Open cmd and type `node -v`.
If present v16.20.0, congratulations install successfully.

![image](https://user-images.githubusercontent.com/49154622/236499777-8c053649-9017-47bb-a098-b1a1a9c28018.png)

### Install MongoDB
- Enter Home of MongoDB: https://www.mongodb.com/try/download/community
- Select Version → `4.4.21`，`Platform` → `Windows` -> `Package` → `msi` and click Download

![image](https://user-images.githubusercontent.com/49154622/236500530-0a54eb24-d129-4f23-a061-4cb39ef01b11.png)

- Open `mongodb-windows-x86_64-4.4.21-signed.msi` that you downloaded

![image](https://user-images.githubusercontent.com/49154622/236500743-67feca07-f8e8-40c2-92ed-02b59cef7cb1.png)

- Select Complete

![image](https://user-images.githubusercontent.com/49154622/236500947-7981d72a-ae48-4e8c-bdb2-a77bcb2e4c6a.png)

- Set Data Directory and Log Directory and then click Next

![image](https://user-images.githubusercontent.com/49154622/236501004-aa9d5045-f76b-47a6-bd22-87efde381268.png)

- Install MongoDB Compass

![image](https://user-images.githubusercontent.com/49154622/236501025-a262ec70-6b90-4e2b-98aa-d79deff57c49.png)

- Click Install

![image](https://user-images.githubusercontent.com/49154622/236501069-ef6c13b2-0bf1-4b43-868f-ae040bd62df0.png)

- Installation Completed!

![image](https://user-images.githubusercontent.com/49154622/236501222-5940691f-1264-4e4a-b277-0baddb11be10.png)

#### Create User in MongoDB
Since the MongoDB connection with Raccoon-DICOM requires username and password.
You need to create a user in the MongoDB to use Raccoon-DICOM.
- Open MongoDB Compass
- Enter the following connection string in New Connection and click Connect.

```bash
mongodb://localhost:27017
```

![image](https://user-images.githubusercontent.com/49154622/236501408-6e8f2de7-e210-4fc5-a689-30611600fa9e.png)

- Click `>_MONGOSH` below.

![image](https://user-images.githubusercontent.com/49154622/236501469-29e00407-a9ce-4735-9fbf-bf5900a6f9c0.png)

- Enter the following command to switch to admin database
```bash
use admin;
```

![image](https://user-images.githubusercontent.com/49154622/236501573-27d25a7d-58b0-4d2d-80f1-376da370c46f.png)

- Enter the following command to create root user

> **Warning**
> ⚠️Please change the username and password to a secure one by yourself!

```js
db.createUser({
    user : "root",
    pwd : "root" ,
    roles : [{role : "root" , db:"admin"}]
});
```

> If present { ok: 1 }, it means the creation was successful!

### Install ImageMagick
- Enter Download page of ImageMagick: https://imagemagick.org/script/download.php
- Click `Windows Binary Release` to redirect to Windows paragraph

![image](https://user-images.githubusercontent.com/49154622/236501838-3d3ea957-0e34-4e97-a318-51040d2ca9c9.png)

- Click `ImageMagick-7.1.0-27-Q16-HDRI-x64-dll.exe` to download

![image](https://user-images.githubusercontent.com/49154622/236501885-394fcb02-20f2-424d-afd5-1230667a823d.png)

- Open `ImageMagick-7.1.0-27-Q16-HDRI-x64-dll` that you downloaded

![image](https://user-images.githubusercontent.com/49154622/236501961-84e2b3ae-8c1b-44d1-aaa9-1b14c7530236.png)

- Select install destination and click Next

![image](https://user-images.githubusercontent.com/49154622/236502088-65574950-384f-4a7b-af52-d10823ec1605.png)

- Click Install

![image](https://user-images.githubusercontent.com/49154622/236502936-e57bf08b-7d76-49b2-a9ae-987653429f07.png)

- Click Next, and uncheck `View Index.html`, and click Finish

![image](https://user-images.githubusercontent.com/49154622/236502971-09bbffd9-b83c-42d5-b476-a5c8689764b2.png)
![image](https://user-images.githubusercontent.com/49154622/236502991-c1bec239-b8a0-4668-adc8-9ee29caf8045.png)

#### Verify installation is complete
Open cmd (command prompt) and enter "magick -version". If you see the following message, the installation is successful!

![image](https://user-images.githubusercontent.com/49154622/236503048-9944480f-39ee-4986-ae94-86725de5c8a4.png)

### Install JAVA JDK
- Go to https://adoptium.net/temurin/releases/
- Select Operating System: Windows
- Architecture: x64
- Package Type: JDK
- Version: 11
- Click to download

![image](https://user-images.githubusercontent.com/49154622/236673675-1d43e668-c5c0-4fbd-b047-97e2ecab7825.png)

- Open `OpenJDK11U-jdk_x64_windows_hotspot_11.0.19_7` that you downloaded one

![image](https://user-images.githubusercontent.com/49154622/236673749-35fcc2fb-c5d9-4437-8b95-d99c905eda70.png)

- Select install destination and click Next

![image](https://user-images.githubusercontent.com/49154622/236674541-ecbbd581-6b33-4304-9f82-8b815df3f493.png)

- Click Install

![image](https://user-images.githubusercontent.com/49154622/236674557-e9f8b8e6-c8d4-4528-b7a7-86024e96d8aa.png)

- Completed!

![image](https://user-images.githubusercontent.com/49154622/236674566-639c8b4e-f132-45c1-827a-fbac5cdf16d1.png)

> ⚠️Please reboot after installation

#### Verify JAVA is installed successfully
- Open the command prompt and enter `javac --version`
- If present version info on cmd, congrats!

![image](https://user-images.githubusercontent.com/49154622/236674166-2e96a631-077b-4f6f-b265-dab2d527a412.png)

## Raccoon-DICOM Installation
The required software has been installed, and you can now proceed with setting up Raccoon!
⚠️ Note: Before the following steps, please navigate to the Raccoon project directory.
### Install Node.js Packages
Open the command prompt and navigate to the Raccoon project directory, then execute the following command:
```bash
npm i --only=production
```

> **Note**
> --only=production means only install dependencies in the `dependencies` block of package.json file

### Configure dotenv `.env` file
- Copy `.env.template` in the project root and rename it to `.env`

![image](https://user-images.githubusercontent.com/49154622/236674914-fe62c2eb-d176-4606-967d-c3439a7c7b00.png)

- Modify `.env`
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

## Deploy Raccoon-DICOM
- Open command prompt and enter Raccoon project directory, then execute following command
```
node server.js
```

## Test Raccoon-DICOM features
### Upload DICOM Instance (STOW-RS)
- The following steps will use the file test/dicomFiles/jpeg2000/example-jpeg-2000.dcm for uploading test
- Use curl for uploading

```powershell
curl --location --request POST "http://localhost:8081/dicom-web/studies" ^
--header "Accept: application/dicom+json" ^
--header "Content-Type: multipart/related; type=\"application/dicom\"" ^
--form "file=@example-jpeg-2000.dcm; type=application/dicom"
```

- If present message following, congrats upload successful!!
```json
{"00081190":{"vr":"UT","Value":["http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543"]},"00081198":{"vr":"SQ","Value":[]},"00081199":{"vr":"SQ","Value":[{"00081150":{"vr":"UI","Value":["1.2.840.10008.5.1.4.1.1.77.1.6"]},"00081155":{"vr":"UI","Value":["1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0"]},"00081190":{"vr":"UT","Value":["http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0"]}}]}}
```

### Get Image info (QIDO-RS)
- Open browser or Postman
- Access http://localhost:8081/dicom-web/studies and get DICOM Json


### Retrieve Image (WADO-RS)
- Open browser or Postman
- Access http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0/frames/1/rendered
- Result:

![image](https://user-images.githubusercontent.com/49154622/236471229-5ea2fad0-3781-4075-a755-66712d9ef44f.png)

- You can also test imagemagick is working normally：Access http://localhost:8081/dicom-web/studies/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543/series/1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3/instances/1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0/frames/1/rendered?iccprofile=rommrgb 
- Check whether the color changes

![image](https://user-images.githubusercontent.com/49154622/236471143-9af313c4-e6ca-42c8-a5e7-6a5de66e2005.png)

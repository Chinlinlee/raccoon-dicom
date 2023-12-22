# raccoon-dicom

<p align="center">
    <img src="https://user-images.githubusercontent.com/49154622/236814496-a87eb89f-9cbe-4898-a7bf-aa2b27d97596.svg" alt="logo" width="10%"/>
</p>
<br/>

Another Raccoon focus on DICOM.

[English](README.md) | [繁體中文](README.zh-TW.md)

---

**Raccoon-DICOM** 是使用 no-SQL 資料庫實作的醫學影像儲存系統(DICOMweb PACS)，其使用 MongoDB 管理 DICOM 影像並提供 [DICOMweb](https://www.dicomstandard.org/dicomweb/") RESTful API 功能進行儲存、查詢以及調閱


# 安裝
- [安裝手冊](https://github.com/Chinlinlee/raccoon-dicom/wiki/Installation.zh-TW)
- [從 0 開始部屬 Raccoon - Windows](https://github.com/Chinlinlee/raccoon-dicom/wiki/From-zero-to-deploy.zh-TW): 在 Windows 上，一步一步從安裝到部屬
- 從 0 開始部屬 Raccoon - Ubuntu (WIP🚧)

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

# Wiki
我們的[Wiki](https://github.com/Chinlinlee/raccoon-dicom/wiki)含有更多與 Raccoon-DICOM 更多的資訊，非常建議您閱讀一下

# raccoon-dicom
Another Raccoon focus on DICOM.

[English](README.md) | [繁體中文](README.zh-TW.md)

---

**Raccoon-DICOM** is a noSQL-based medical image archive designed for managing DICOM images, utilizing MongoDB to store and manage the images while providing RESTful APIs that support [DICOMweb](https://www.dicomstandard.org/dicomweb/") protocols for querying, retrieving, and managing DICOM images.

# Installation
- [Installation](https://github.com/Chinlinlee/raccoon-dicom/wiki/Installation)
- Step by Step guide to installing Raccoon-DICOM - Windows (WIP🚧)
- Step by Step guide to installing Raccoon-DICOM - Ubuntu (WIP🚧)

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

# Wiki
Our [wiki](https://github.com/Chinlinlee/raccoon-dicom/wiki) includes a lot of information about raccoon-dicom, we heavily encourage you to take a look!!


# raccoon-only-dicom
Another raccoon focus on dicom. The original raccoon combine the FHIR and DICOM together in MongoDB, I think it will cause performance and maintenance issues. So, here start a new project only for DICOM.

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
- [Retrieve Transaction Bulkdata Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1.5-1)

# Environment Requirements
- node.js >= 16
- Java JDK >= 11

> **Note**
> - You should copy opencv_java library to JDK's lib directory
> - In windows, copy `opencv_java.dll`
> - In linux, copy `libclib_jiio.so` and `libopencv_java.so`

# API Documentation
- raccoon-dicom uses swagger ui hosting openapi.json to generate documentation
- [API Documentation](https://chinlinlee.github.io/raccoon-dicom/)




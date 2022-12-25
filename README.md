# raccoon-only-dicom
Another raccoon focus on dicom. The original raccoon combine the FHIR and DICOM together in MongoDB, I think it will cause performance and maintenance issues. So, here start a new project only for DICOM.
- Using polka instead of express. (might change to express in the future

# Features
The features implemented here:
- [QIDO-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6)
- [STOW-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5)
    - Convert DICOM to ImagingStudy, Endpoint, Patient of FHIR resources and sync FHIR resources to FHIR server
- [WADO-RS](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4.1.1.1)
    - [Retrieve Transaction Instance Resources](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#table_10.4.1-1)

# APIs
## example

|path|method|description              |
|:--:|:----:|:-----------------------:|
| /example  | get  |return "{ 'msg' : 'hi' }"|

## user
### create user

|path|method|description|
|:--:|:----:|:---------:|
| /user  | post |create user|

#### Body
- content-type: application/json
```json
{
    "username": "string",
    "password": "string",
    "email": "string",
    "firstname": "string",
    "lastname": "string",
    "gender": "string"
}
```
### login

|path|method|description|
|:--:|:----:|:---------:|
|/user/login| post |   login   |

```sh
POST http://localhost:8080/user/login?username=123&password=123
```




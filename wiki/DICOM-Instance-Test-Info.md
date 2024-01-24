# DICOM Instance Test Info
- This page about test info of raccoon-dicom

## DICOM Instances' Info
| Patient ID   | Procedure Code | Modality | Series Count | Image Count   |
|--------------|----------------|----------|--------------|---------------|
| C3L-00277    | 36643-5        | DX       | 1            | 1             |
| C3N-00953    | 42274-1        | CT       | 3            | 11            |
| TCGA-G4-6304 | 42274-1        | CT       | 3            | 14            |
| 123456       |                | SM       | 1            | 1 (Frame: 15) |

## Test Search For Studies
### Query By `StudyDate (0008, 0020)`
#### Step 100
- StudyDate=19990101-19991231
  - Expect 2 matches
#### Step 110
- StudyDate=20220101-20221231
  - Expect 0 match
### Step 170: Query By `PatientID (0010, 0020)`
- PatientID=TCGA-G4-6304
  - Expect 1 match

### Step 120: Query By `PatientName (0010, 0010)` & `StudyDate (0008, 0020)`
- PatientName=TCGA\*&StudyDate=20100101-20101231
  - Expect 0 match
- PatientName=TCGA\*&StudyDate=19990101-19991231
  - Expect 1 match

### Step 130: Query By `PatientName (0010, 0010)` & `PatientBirthDate (0010, 0030)`
- PatientName=ChestXR\*&PatientBirthDate=19590101
  - Expect 0 match
- PatientName=ChestXR\*&PatientBirthDate=19601218
  - Expect 1 match

### Step 140: Query By `PatientID (0010, 0020)` & `AccessionNumber (0008, 0050)`
- PatientID=C3N-00953&AccessionNumber=4444
  - Expect 0 match
- PatientID=C3N-00953&AccessionNumber=2794663908550664

## Test Search For Series
### Step 150
- Use StudyInstanceUID from [Query By `PatientID (0010, 0020)` & `AccessionNumber (0008, 0050)`](https://github.com/Chinlinlee/raccoon-dicom/wiki/DICOM-Instance-Test-Info#query-by-patientid-0010-0020--accessionnumber-0008-0050) to search
  - Expect 3 series
### Step 180
- Use StudyInstanceUID from [170](https://github.com/Chinlinlee/raccoon-dicom/wiki/DICOM-Instance-Test-Info#query-by-patientid-0010-0020-170) to search
  - Expect 3 series

## Test Search For Instances
### Step 160
- Use response's SeriesInstanceUIDs from [150](https://github.com/Chinlinlee/raccoon-dicom/wiki/DICOM-Instance-Test-Info#150)
  - Expect 1 image, 5 images, and 5 images in 3 series, respectively

## Test limit
- Query limit=1 in study level
  - Expect 1 match
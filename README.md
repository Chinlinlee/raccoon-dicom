# raccoon-only-dicom
Another raccoon focus on dicom.

The [polka](https://github.com/lukeed/polka) example.

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




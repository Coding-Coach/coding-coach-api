### Implementing User signup on FE

The backend application has been configured to retrieve user profiles when the following endpoint is queried

#### Facebook
```
GET https://api.codingcoach.io/auth/facebook?code=<one-time code retrieved from FB in callback>
```
#### Twitter
```
GET https://api.codingcoach.io/auth/twitter?oauth_token=<one-time token retrieved from TWITTER in callback>&oauth_verifier=<one-time verifier retrieved from TWITTER in callback>
```
#### Github
```
GET https://api.codingcoach.io/auth/github?code=<one-time code retrieved from GITHUB in callback>
```

While developing the server should be acessible as 'https://api.codingcoach.dev`

The JSON response of these calls will contain the saved user profile like this :
```json
{
  "failedLogin": {
    "numFailed": 0
  },
  "activationStatus": false,
  "_id": "",
  "email": "john.d@email.com",
  "firstName": "John",
  "lastName": "Doe",
  "github": {
    "id": "",
    "email": "john.d@email.com",
    "firstName": "John",
    "lastName": "Doe",
    "provider": "github",
    "accessToken": "",
    "username": "johndoe"
  },
  "__v": 0,
  "facebook": {
    "id": "",
    "email": "john.d@email.com",
    "firstName": "Jagdish",
    "lastName": "Doe Jane",
    "provider": "facebook",
    "accessToken": "",
    "refreshToken": null
  }
}
```

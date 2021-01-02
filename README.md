# _nodemailer-mail-service_

_Nodemailer mail service with TypeScript._

**_Subscribe User Route_**

```json
  POST Request:
    /subscribe/
    JSON Input:
        {
            "fullName": "Your Recipient Name",
            "email": "Your Recipient Email"
        }
    Success Response:
            "Thank you!😊",
    Failure Response: (Status 409 Conflict)
        {
           "message": "Hey user, You have already subscribed!",
           "success": false
        }
```

**_Local Run_**

```javascript
 npm start
```

# _nodemailer-mail-service_

_Nodemailer mail service with TypeScript._

**_Subscribe User Route_**

```json
  POST Request:
    /register-user/
    JSON Input:
        {
            "username": "Your Recipient Name",
            "email": "Your Recipient Email"
        }
    Success Response: 
            "message": ""Thank you!😊"",
    Failure Response: (Status 409 Conflict)
        {
           "message": Hey user, You have already subscribed!
           "success": false
        }
```

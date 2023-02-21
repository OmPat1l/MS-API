# MS-API

MindSpark is the Annual tech fest of College of engineering pune.
Usually every year, passes for various events are distributed in offline mode, which is very tedious process demanding man power and time.
This API is an effort to discard this conventional process and automate the task, this API will be updated again and again until its final version is not
ready to be deployed and manage multiple users.

To access the api directly jump onto MailAuthentication directory, you would find two files, admin.js and app.js, admin.js is for the admin side and
app.js is for the client side.
The api is developed in express over node js (Install all the dependencies required first)

1)Turn on both app and admin js using command {node fileName}
2)Use POST on "/mindspark/v1/data" on desired port say http://localhost:3003 in this case
3)POST {mail:val,mis:val}
4)if the given info is present in data bas with hasDownloade parameter to be false then the api generates a 6 digit random otp
{
"status": "success",
"url": "http://localhost:3002/mindspark/v1/data/verified", //this url is to post the otp in second part
"otp": "357723"
}

5)POST this otp on "/mindspark/v1/data/verified" to verify the otp and get the pass number (If the number of passes left becomes 0, the server stops) 6) The database (data.js) would be updated with object like {
"mis": 112107040,
"mail": "omap21.extc@coep.ac.in",
"hasdownloaded": true,
"hasEntered": false, //this parameter is only accessible for the admin purpose
"date": "21/02/2023",
"time": "19:09:58",
"passnumber": 202301025
}

7. After this you can jump onto the admin.js (admin side portal)
8. Admin portal is made to be used by the authorities at the time of the event when people are entering the arena, many more parameter
   like gate number, coordinator alloted etc can also be added to the individual object, but as of now these parameters are included
   {
   "mis": 112107040,
   "mail": "omap21.extc@coep.ac.in",
   "hasdownloaded": true,
   "hasEntered": true,
   "entryDate": "21/02/2023",
   "entryTime": "19:22:21",
   "passnumber": 202301025
   }
9. POST req to http://localhost:3004/mindspark/admin with object
   { mis:val, mail:val, passnumber:val}
   10)After parsing through all the conditions user would be allowed entry and a count of total users entered would also be maintained.

//feel free to make changes and optimise code (you may push it, if its a better version i would be happy to merge it), as of now only raw data and
primary brute force code is implemented here with litelary no consideration of time and space complexity, but it would be optimised with time.

Status code in the API are still to be properly alloted, but still if you want to refactor it for personal purpose, use this

200 OK: The request has succeeded, and the response includes the requested data.
201 Created: The request has been fulfilled, and a new resource has been created.
204 No Content: The request has succeeded, but there is no response to be sent back.
400 Bad Request: The server cannot or will not process the request due to an error in the request, such as missing parameters or invalid data.
401 Unauthorized: The request requires authentication or the authentication failed.
403 Forbidden: The server understood the request but refused to authorize it. This status code is often used when the user doesn't have the necessary permissions.
404 Not Found: The requested resource could not be found on the server.
500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.

How I further plan to extrapolate this API and deploy it for users?
High level System design:-


User enters MIS number and email: A web or mobile interface will allow the user to enter their MIS number and email.

1)API checks database for user: When the user submits the MIS number and email, the system will query a database to see if a user exists with those parameters. The database should be designed to handle high traffic and scale horizontally as needed.

2)Check if user has downloaded the pass: If the user exists in the database, the system checks whether the user has previously downloaded the pass or not. This information should be stored in the user's profile in the database.

3)Send OTP to mail: If the user has not previously downloaded the pass, an OTP is sent to the user's email using a third-party email service API.

4)Receive OTP and generate pass: The user will receive an OTP in their email, and will need to enter it into the web or mobile interface. If the OTP is correct, the system will generate a pass for the user and store it in their profile in the database.

5)Send pass to user: Once the pass has been generated, it is sent to the user's email using the third-party email service API.

6)Load balancing and servers: The system should be designed to handle 500 concurrent users. Load balancers and multiple servers can be used to distribute the load across different machines, ensuring that the system remains responsive and available.

7)External API for sending mail: A third-party email service API can be used to send OTPs and passes to users via email. Some popular options include SendGrid, Mailgun, and Amazon SES.

Happy Developing :)

# MS-API
MindSpark is the Annual tech fest of College of engineering pune.
Usually every year, passes for various events are distributed in offline mode, which is very tedious process demanding man power and time.
This API is an effort to discard this conventional process and automate the task, this API will be updated again and again untill its final versiion is not 
ready to be deployed and manage multiple users.

To access the api directly jump onto MailAuthentication directory, you would find two files, admin.js and app.js, admis.js is for the admin side and
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

5)POST this otp on "/mindspark/v1/data/verified" to verify the otp and get the pass number (If the number of passes left becomes 0, the server stops)
6) The database (data.js) would be updated with object like  {
    "mis": 112107040,
    "mail": "omap21.extc@coep.ac.in",
    "hasdownloaded": true,
    "hasEntered": false, //this parameter is only accessible for the admin purpose
    "date": "21/02/2023",
    "time": "19:09:58",
    "passnumber": 202301025
  }
  
  7) After this you can jump onto the admin.js (admin side portal) 
  8) Admin portal is made to be used by the authorities at the time of the event when people are entering the arena, many more parameter
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
  9) POST req to http://localhost:3004/mindspark/admin with object
  { mis:val, mail:val, passnumber:val}
  10)After parsing through all the conditions user would be allowed entry and a count of total users entered would also be maintained.
  
  //feel free to make changes and optimise code (you may push it, if its a better version i would be happy to merge it), as of now only raw data and 
primary  brute force code is implemented here with litelary no consideration of time and space complexity, but it would be optimised with time.

const express = require("express");
const app = express();
const fs = require("fs");
const nodemailer = require("nodemailer");
// const sendMail=require('./')
let data1 = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
let datag = JSON.parse(fs.readFileSync(`${__dirname}/generaldata.json`));

app.use(express.json());
//get req not for users
app.get("/mindspark/v1/data", (req, res) => {
  res.status(200).json({
    status: "success",

    data1,
  });
});
//post req to api with obj {
// "mis":111111111
// "mail":trial@coep.ac.in
// }
app.post("/mindspark/v1/data", (req, res) => {
  var currentDate = new Date();
  var dateString = currentDate.toLocaleDateString();
  var timeString = currentDate.toLocaleTimeString();
  for (let i = 1; i < data1.length; i++) {
    const jsonObject = data1[i];
    const datamis = jsonObject.mis;
    const datamail = jsonObject.mail;
    const hasDownloaded = jsonObject.hasdownloaded;
    let inputMis = req.body.mis;
    let inputMail = req.body.mail;

    //checking whether user is in database
    if (inputMis == datamis && inputMail == datamail) {
      let buffprime = datag.totalpasses;
      if (buffprime > 0) {
        let otp = Math.floor(Math.random() * 1000000);
        otp = otp.toString().padStart(6, "0");
        buffprime--;
        let buffObject = { totalpasses: buffprime };
        Object.assign(datag, buffObject);
        const updatedJsonString = JSON.stringify(datag);
        fs.writeFileSync(`${__dirname}/generaldata.json`, updatedJsonString);
        res.status(201).json({
          status: "success",
          url: "http://localhost:3002/mindspark/v1/data/verified",
          otp: `${otp}`,
        });

        //sending mail

        return;
      } else {
        res.status(201).json({
          status: "fail",
          message: "passes exhausted",
        });
      }
    } else if (i >= data1.length - 1) {
      res.status(201).json({
        status: "fail",
      });
    }
  }

  // If the function has not returned at this point, no matching object was found
});
app.listen(3002);

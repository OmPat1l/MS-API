const express = require("express");
const app = express();
const fs = require("fs");
let otp = 0;
let data1 = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
let datag = JSON.parse(fs.readFileSync(`${__dirname}/generaldata.json`));
var currentDate = new Date();
var dateString = currentDate.toLocaleDateString();
var timeString = currentDate.toLocaleTimeString();
app.use(express.json());
app.get("/mindspark/v1/data", (req, res) => {
  res.status(200).json({
    status: "success",

    data1,
  });
});
let index = 0;

app.post("/mindspark/v1/data", (req, res) => {
  for (let i = 0; i < data1.length; i++) {
    let jsonObject = data1[i];
    let datamis = jsonObject.mis;
    let datamail = jsonObject.mail;
    // const hasDownloaded = jsonObject.hasdownloaded;
    let inputMis = req.body.mis;
    let inputMail = req.body.mail;

    //checking whether user is in database
    if (inputMis == datamis && inputMail == datamail) {
      if (jsonObject.hasdownloaded) {
        res.status(201).json({
          status: "fail",
          message: "already downloaded",
        });
        return;
      }
      let buffprime = datag.totalpasses;
      index = i;
      if (buffprime > 0) {
        otp = Math.floor(Math.random() * 1000000);
        otp = otp.toString().padStart(6, "0");

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
        message: "wrong credentials",
      });
    }
  }

  // If the function has not returned at this point, no matching object was found
});

app.post("/mindspark/v1/data/verified", (req, res) => {
  let reqotp = req.body.otp;
  if (otp == reqotp) {
    data1[index].hasdownloaded = true;
    data1[index].date = dateString;
    data1[index].time = timeString;

    let buffprime = datag.totalpasses;
    let passnumber1 = datag.passnumber;
    passnumber1++;
    data1[index].passnumber = passnumber1;

    buffprime--;
    let buffObject = { totalpasses: buffprime, passnumber: passnumber1 };
    Object.assign(datag, buffObject);
    const updatedJsonString = JSON.stringify(datag);
    const updatedJsonData = JSON.stringify(data1);
    fs.writeFileSync(`${__dirname}/generaldata.json`, updatedJsonString);
    fs.writeFileSync(`${__dirname}/data.json`, updatedJsonData);

    res.status(201).json({
      status: "success",
      passnumber: `${buffObject.passnumber}`,
    });
    return;
  } else {
    res.status(404).json({
      status: "fail",
      message: "wrong otp",
    });
    return;
  }
});

app.listen(3003);

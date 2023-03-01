// const { time } = require("console");
// const { json } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");
// let otp = 0;

var currentDate = new Date();
var dateString = currentDate.toLocaleDateString();
var timeString = currentDate.toLocaleTimeString();
app.use(express.json());
// sample json should be
//{mis:val,mail:val;,pass:val}
app.post("/mindspark/admin", (req, res) => {
  let dataAdmin = JSON.parse(fs.readFileSync(`${__dirname}/admin.json`));
  let dataUser = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
  let entered = JSON.parse(fs.readFileSync(`${__dirname}/entered.json`));
  let mis = req.body.mis;
  let mail = req.body.mail;
  let passnumber = req.body.passnumber;
  let hasEntered1 = req.body.hasEntered;
  for (let i = 0; i < dataUser.length; i++) {
    let jsonUser = dataUser[i];
    let misUser = jsonUser.mis;
    let mailUser = jsonUser.mail;
    let passnumberUser = jsonUser.passnumber;
    if (mis == misUser && mail == mailUser && passnumber == passnumberUser) {
      if (hasEntered1) {
        res.status(201).json({
          status: "fail",
          message: "Already entered",
        });
        return;
      } else {
        dataAdmin.uersEntered++;
        let buffObject = {
          mis: misUser,
          mail: mailUser,
          hasdownloaded: true,
          hasEntered: true,
          entryDate: dateString,
          entryTime: timeString,
          passnumber: passnumberUser,
        };
        entered.push(buffObject);
        jsonUser.hasEntered = true;
        const updatedJsonDataUser = JSON.stringify(dataUser);
        const updatedJsonDataEntryAdmin = JSON.stringify(dataAdmin);
        const updatedJsonentered = JSON.stringify(entered);

        fs.writeFileSync(`${__dirname}/data.json`, updatedJsonDataUser);
        fs.writeFileSync(`${__dirname}/admin.json`, updatedJsonDataEntryAdmin);
        fs.writeFileSync(`${__dirname}/entered.json`, updatedJsonentered);

        res.status(201).json({
          status: "success",
          message: "Enjoy the event",
        });
        return;
      }
    } else if (i >= dataUser.length) {
      res.status(201).json({
        status: "fail",
        message: "wrond credentials",
      });
      return;
    }
  }
});
// app.get("/mindspark/admin", (req, res) => {
//   res.end("ended");
// });
app.listen(3004);

const express = require("express");
// const morgan = require("morgan");
const app = express();
const fs = require("fs");
let data1 = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

// let pdfNumber = 202310001;
// app.use(morgan("dev"));
app.use(express.json());
app.get("/mindspark/v1/data", (req, res) => {
  res.status(200).json({
    status: "success",

    data1,
  });
});
// app.post("/mindspark/v1/data", (req, res) => {
//   var currentDate = new Date();
//   var dateString = currentDate.toLocaleDateString();
//   var timeString = currentDate.toLocaleTimeString();
//   for (let i = 0; i < data1.length; i++) {
//     const jsonObject = data1[i];
//     const datamis = jsonObject.mis;
//     const datamail = jsonObject.mail;
//     const hasDownloaded = jsonObject.hasdownloaded;
//     let inputMis = req.mis;
//     let inputMail = req.mail;
//     if (inputMis == datamis && inputMail == datamail) {
//       res.status(201).json({
//         status: "success",
//       });
//     } else {
//       continue;
//     }
//   }

//   //while calling api first check the status code and then parse json
//   res.status(201).json({
//     status: "fail",
//   });

// });
app.post("/mindspark/v1/data", (req, res) => {
  var currentDate = new Date();
  var dateString = currentDate.toLocaleDateString();
  var timeString = currentDate.toLocaleTimeString();
  for (let i = 0; i < data1.length; i++) {
    const jsonObject = data1[i];
    const datamis = jsonObject.mis;
    const datamail = jsonObject.mail;
    const hasDownloaded = jsonObject.hasdownloaded;
    let inputMis = req.body.mis; // use req.body.mis instead of req.mis
    let inputMail = req.body.mail; // use req.body.mail instead of req.mail
    if (inputMis == datamis && inputMail == datamail) {
      res.status(201).json({
        status: "success",
      });
      return; // exit the function once a matching object is found
    } else if (i >= data1.length - 1) {
      res.status(201).json({
        status: "fail",
      });
    }
  }

  // If the function has not returned at this point, no matching object was found
});

app.listen(3002);

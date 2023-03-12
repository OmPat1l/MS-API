const express = require("express");
// const morgan = require("morgan");
const app = express();
const fs = require("fs");
let data1 = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
// let pdfNumber = 202310001;
// app.use(morgan("dev"));
app.use(express.json());
app.get("/api/v1/data", (req, res) => {
  res.status(200).json({
    status: "success",

    data1,
  });
});
app.post("/api/v1/data", (req, res) => {
  var currentDate = new Date();
  var dateString = currentDate.toLocaleDateString();
  var timeString = currentDate.toLocaleTimeString();
  const newId = data1[data1.length - 1].id + 1;
  let buffNumber = data1[data1.length - 1].pdf + 1;

  const newData = Object.assign(
    { id: newId },
    req.body,
    { pdf: buffNumber },
    { data: dateString },
    { time: timeString }
  );
  data1.push(newData);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(data1), (err) => {
    // if (err) {
    //   res.status(404).json({
    //     status: "fail",
    //   });
    // }
    let data1 = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
    let buff = data1[data1.length - 1];

    res.status(201).json({
      status: "success",
      data: {
        buff,
      },
    });
  });

  //   app.patch("/api/v1/tours/:x", (req, res) => {
  //     const buff = req.params.x * 1;
  //     if (buff > tours.length - 1) {
  //       res.status(404).json({
  //         status: "fail",
  //         tour: "invalid",
  //       });
  //     }
  //   });

  //   app.get("/api/v1/tours/:x", (req, res) => {
  //     const id = parseInt(req.params.x, 10);
  //     let tour = tours[0].id;
  //     // const tour = tours.find((el) => el.id === id);
  //     for (let i = 0; i < tours.length; i++) {
  //       if (tours[i].id === id) {
  //         tour = tours[i].id;
  //         return;
  //       }
  //     }
  //     if (!tour) {
  //       return res.status(404).json({
  //         status: "fail",
  //         message: "invalid id",
  //       });
  //     }
  //     res.status(200).json({
  //       status: "success",
  //       data: {
  //         tour,
  //       },
  //     });
  //   });

  // const name1=req.name;
  // res.send("done");
  // res.status(200).json({

  //     "name":name1
  // }
  // );
});

app.listen(3001);

const express = require("express");
const app = express();
const fs = require("fs");
let data1 = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
app.use(express.json());
app.post("/api/v1/data", (req, res) => {
    let phoneNumber = req.number;
    for (let i = 0; i < data1.length; i++){
        if (data1[i].number === phoneNumber) {
            //start otp authentication
            
        }
    }

    res.status(404).json({
  "status":"fail"
});

app.listen(3002);
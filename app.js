const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student");

let port = 3000;

app.set("view engine", "ejs");

mongoose
  .connect("mongodb://127.0.0.1:27017/exampleDB")
  .then(() => {
    console.log("成功連結mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/students", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.send(studentData);
  } catch (e) {
    return res.status(500).send("尋找資料時發生錯誤...");
  }
});

app.get("/students/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundStudent = await Student.find({
      _id,
    }).exec();
    return res.send(foundStudent);
  } catch (e) {
    return res.status(500).send("尋找資料時發生錯誤...");
  }
});

app.listen(port, () => {
  console.log("伺服器正在聆聽" + port + "...");
});

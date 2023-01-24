const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student");

let port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/exampleDB")
  .then(() => {
    console.log("成功連結mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extende: true }));

//get
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

//post
app.post("/students", async (req, res) => {
  try {
    let { name, age, major, merit, other } = req.body;
    console.log(name, age, major, merit, other);
    let newStudent = new Student({
      name,
      age,
      major,
      scholarship: { merit, other },
    });
    let savedStudent = await newStudent.save();
    return res.send({
      msg: "資料儲存成功",
      savedObject: savedStudent,
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

app.listen(port, () => {
  console.log("伺服器正在聆聽" + port + "...");
});

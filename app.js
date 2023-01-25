const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const studentRoutes = require("./routes/student-routes");
const facultyRoutes = require("./routes/faculty-routes");

let port = 3025;

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
app.use(methodOverride("_method"));

app.use("/students", studentRoutes);
app.use("/faculty", facultyRoutes);

// app.use(cors());

// function myMiddleware(req, res, next) {
//   console.log("正在執行myMiddleware...");
//   next();
// }

app.use((err, req, res, next) => {
  console.log("正在使用這個middleware...");
  return res.status(400).render("error");
});

app.listen(port, () => {
  console.log("伺服器正在聆聽" + port + "...");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
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

app.listen(port, () => {
  console.log("伺服器正在聆聽" + port + "...");
});

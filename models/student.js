const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 25 },
  age: { type: Number, min: [0, "年齡不能小於0"] },
  //   major: { type: String, required: [true, "每個學生都需要選至少一個主修"] },
  major: {
    type: String,
    required: true,
    minLength: 2,
  },
  age: {
    type: Number,
    default: 18,
    max: [80, "可能有點太老了..."],
    min: [0, "年齡不能小於０..."],
  },
  scholarship: {
    merit: {
      type: Number,
      min: 0,
      max: [5000, "學生merit scholarship 也太多了"],
      default: 0,
    },
    other: { type: Number, min: 0, default: 0 },
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

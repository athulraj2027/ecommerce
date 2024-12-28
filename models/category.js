const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description:{type:String, required:true},
  image:{type:String,required:true},
  products:{type:Array,}
});

module.exports = mongoose.model("Category", categorySchema);

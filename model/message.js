const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

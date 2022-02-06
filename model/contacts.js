const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  title: String,
  image: String,
  description: String,
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

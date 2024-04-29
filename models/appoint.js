const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//schema for verification
const appointSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    age: {
        type: Number, 
        required: true,
      },
    phone: {
        type: Number, 
        required: true,
        validate: {
          validator: function(v) {
              // Regular expression to validate mobile number format (10 digits)
              return /^[0-9]{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid mobile number!`
      }
      },
    address: {
        type: String,
        required: true,
      },
    
  });
  

const Patient = mongoose.model("Patient", appointSchema);
module.exports = Patient;
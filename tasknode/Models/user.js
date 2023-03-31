const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var UserSchema = mongoose.Schema(
  {
    FirstName: { type: String, required: true, minlength: 3 },
    LastName: { type: String, required: true, minlength: 3 },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, minlength: 6, required: true },
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    var salt = await bcrypt.genSalt(10);
    var hashdata = bcrypt.hashSync(this.Password, salt);
    this.Password = hashdata;
    next();
  } catch (error) {
    next(error);
  }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;

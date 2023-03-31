const User = require("../Models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function Register(RequestData) {
  const newUser = new User({
    FirstName: RequestData.FirstName,
    LastName: RequestData.LastName,
    Email: RequestData.Email,
    Password: RequestData.Password,
  });
  return newUser.save();
}

async function Login(RequestData) {
  const StoredUser = await User.findOne({ Email: RequestData.Email });
  if (StoredUser === null) {
    return { status: 401, result: "InCorrect Email" };
  } else {
    const VerifyPassword = bcrypt.compareSync(
      RequestData.Password,
      StoredUser.Password
    );
    if (VerifyPassword === false) {
      return { status: 401, result: "InCorrect Password" };
    } else {
      if (StoredUser.Active) {
        const { Password, IsAdmin, NumberOFLogin, IsActive, ...others } =
          StoredUser._doc;
        const AccessToken = jwt.sign(
          {
            id: StoredUser.id,
            IsAdmin: StoredUser.IsAdmin,
            FirstName: StoredUser.FirstName,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "10d",
          }
        );
        await User.findByIdAndUpdate(StoredUser.id, {
          $set: { NumberOFLogin: StoredUser.NumberOFLogin + 1, IsActive: true },
        });
        return { status: 200, result: { ...others, AccessToken } };
      } else {
        return { status: 401, result: "Now You Are Not activeted" };
      }
    }
  }
}

module.exports = {
  Register,
  Login,
};

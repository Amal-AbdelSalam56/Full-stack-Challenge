const express = require("express");
const router = express.Router();
const { Register, Login } = require("../Controlers/userControlers");

router.post("/Register", async function (request, response, next) {
  try {
    const SavedUser = await Register(request.body);
    const { Password, IsAdmin, ...others } = SavedUser._doc;
    response.status(202).json(others);
  } catch (error) {
    response.status(401).json(error.message);
  }
});

router.post("/Login", async function (request, response, next) {
  const { status, result } = await Login(request.body);

  response.status(status).json(result);
});

module.exports = router;

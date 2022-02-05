const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const User = require("../models/User");

// const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({
    msg: "signup success",
    status: 1,
    user: { name: user.name },
    token,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.status(StatusCodes.OK).json({ msg: "login success" });
};

module.exports = {
  login,
  signUp,
};

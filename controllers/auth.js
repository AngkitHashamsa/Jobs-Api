const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
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
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    throw new BadRequestError("please Provide email and password");
  }
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new UnauthenticatedError("No user exist with this username");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  // console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }
  const token = user.createJwt();
  // console.log(user);
  res.status(StatusCodes.OK).json({
    msg: "login success",
    status: 1,
    user: { name: user.name },
    token,
  });
};

module.exports = {
  login,
  signUp,
};

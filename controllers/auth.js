const login = async (req, res) => {
  res.status(200).json({ msg: "login success" });
};
const signUp = async (req, res) => {
  res.status(200).json({ msg: "signUp success" });
};
module.exports = {
  login,
  signUp,
};

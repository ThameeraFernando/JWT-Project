const CustomerAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  //check the user name and password
  if (!username || !password) {
    throw new CustomerAPIError("Please provide email and password.", 400);
  }
  //sample id
  const id = new Date().getDate();

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user Created.", token });
  // res.send("Fake Login/Register/SignUp");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello Thameera`,
    secret: `Here is your luckyNumber ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};

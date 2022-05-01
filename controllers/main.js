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
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomerAPIError("No token block provided.", 401);
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}.`,
      secret: `Here is your luckyNumber ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomerAPIError("Not authorize to access this route.", 401);
  }
};

module.exports = {
  login,
  dashboard,
};

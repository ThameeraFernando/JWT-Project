const login = async (req, res) => {
  res.send("Fake Login/Register/SignUp");
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

const CustomerAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  //   console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomerAPIError("No token block provided.", 401);
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomerAPIError("Not authorize to access this route.", 401);
  }
};

module.exports = authenticationMiddleware;

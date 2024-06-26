const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.token;
  console.log("The token is", token);
  if (!token) {
    return res.status(500).json({ success: false, message: "Not authorized, please log in again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.studentId = token_decode.id;
    console.log("The ID of the student is", req.body.studentId);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Token error" });
  }
};

module.exports = authenticateToken;

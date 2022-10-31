const { getNodeText } = require('@testing-library/react')
var jwt = require("jsonwebtoken");
JWT_SECRET = "yashwantsinghisagood$oy";
const fetchuser = (req, res, next) => {
  //get user id
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    // localStorage.setItem('token', token)
    next();
  } catch {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;

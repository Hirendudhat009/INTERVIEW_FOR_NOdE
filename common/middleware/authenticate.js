// jwt AUTHENTICATION
import jwt from "jsonwebtoken";
import { JWT } from "../constants/constant";

export default (req, res, next) => {
  if (req.session.token) {
    jwt.verify(req.session.token, JWT.SECRET, function (err, decoded) {
      if (err) {
        if (req.xhr) {
          return res.status(401).send("unauthorized");
        }
        res.redirect("/login");
      } else {
        req.user = decoded.user
        next();
      }
    });
  } else {
    if (req.xhr) {
      return res.status(401).send("unauthorized");
    }
    return res.redirect("/login");
  }
};

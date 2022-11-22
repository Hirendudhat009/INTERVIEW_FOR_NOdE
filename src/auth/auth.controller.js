
import Joi from "joi";
import commonService from "../../utils/commonService";
import jwt from "jsonwebtoken";
import { JWT } from "../../common/constants/constant";
import authService from "./auth.service";
import User from "../../models/user";


class authController {


  /**
   * Get Register page
   * @param {*} req 
   * @param {*} res 
   */
  static async getRegisterPage(req, res) {
    res.render('auth/register')
  }

  /**
   * Get Login page
   * @param {*} req 
   * @param {*} res 
   */
  static async getLoginPage(req, res) {
    res.render('auth/login')
  }

  /**
   * Register
   * @param {*} req 
   * @param {*} res 
   */
  static async register(req, res) {
    const data = await authService.checkEmailExistOrRegister(req.body, req.file)
    res.send(data)
  }

  /**
    * Admin login
    * @param Request req
    * @param Response res
    */
  static async login(req, res, next) {
    try {
      const request = req.body;
      const user = await commonService.findOne(User, { email: request.email }, { raw: false, plain: true })

      if (user) {
        const hashedPasswordMatch = await user.isPasswordMatch(request.password)

        if (hashedPasswordMatch) {
          const payload = {
            user: user,
          };
          await jwt.sign(
            payload,
            JWT.SECRET,
            { expiresIn: JWT.EXPIRES_IN },
            (err, token) => {
              if (err) {
                return res.render("errors/500");
              }
              req.session.token = token;
              return res.redirect("/dashboard");
            }
          );
        } else {
          return res.render("auth/login", {
            message: "Email or Password is incorrect.",
            data: request,
          });
        }
      } else {
        return res.render("auth/login", {
          message: "Email or Password is incorrect.",
          data: request,
        });
      }
    } catch (err) {
      return res.render("errors/500");
    }
  }


  /**
 * Admin logout
 * @param Request req
 * @param Response res
 */
  static async logout(req, res, next) {
    delete req.session.token;
    return res.render("/login");
  }
}
export default authController



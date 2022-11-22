import User from "../../models/user"
import commonService from "../../utils/commonService"
import usersService from "./users.service"

class userController {


  /**
   * Get Dashboard
   * @param {*} req 
   * @param {*} res 
   */
  static async getUserData(req, res) {
    const users = await usersService.getUserData()
    res.send({
      draw: req.draw,
      iTotalRecords: users.length,
      iTotalDisplayRecords: users.length,
      aaData: users
    })
  }


  static async userProfile(req, res) {
    const user = await commonService.findByPk(User, req.user.userId)
    res.render('profile', { user })
  }
}
export default userController



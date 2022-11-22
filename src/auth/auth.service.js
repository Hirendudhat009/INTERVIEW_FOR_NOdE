import commonService from "../../utils/commonService"
import User from "../../models/user"

class authService {

  static async checkEmailExistOrRegister(reqData, file) {
    reqData.profileImage = file ? file.destination + '/' + file.filename : null
    const data = await commonService.findOne(User, { email: reqData.email })
    if (data) {
      return { success: false }
    }
    await commonService.createOne(User, reqData)
    return { success: true }
  }
}


export default authService
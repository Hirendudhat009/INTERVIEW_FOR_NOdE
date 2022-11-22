import commonService from "../../utils/commonService"
import User from "../../models/user"

class usersService {

  static async getUserData() {
    const data = await commonService.findAllRecords(User, {})
    return data
  }
}


export default usersService
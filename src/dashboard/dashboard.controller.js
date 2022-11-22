
class dashboardController {


  /**
   * Get Dashboard
   * @param {*} req 
   * @param {*} res 
   */
  static async getDashboard(req, res) {
    res.render('users')
  }
}
export default dashboardController



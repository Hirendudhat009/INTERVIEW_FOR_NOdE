import express from "express"
import { logo } from "../common/helper";
const router = express.Router();
const apisRoutes = require('./apis/index')
const adminRoutes = require('./admin/admin')
const webRoutes = require('./web/index')


router.use('/api/v1', apisRoutes)
router.use('/admin', adminRoutes)
router.use('/', webRoutes)


// change logs 
router.get('/changelog', (req, res) => {
  res.render('api/changelogs', {
    logo: logo()
  })
})


module.exports = router
